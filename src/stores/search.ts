import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  HybridSearch,
  type MergedHit,
  type SearchDocument,
} from "@vanduo-oss/vdl-hybrid-search";
import type { GlobalSearchAdapter, GlobalSearchHit } from "@vanduo-oss/vd3";
import Fuse from "fuse.js";
import {
  DOCS_FUSE_THRESHOLD,
  DOCS_FUZZY_MIN_SCORE,
  DOCS_SEARCH_STORAGE_KEY,
  DOCS_SEMANTIC_THRESHOLD,
  DOCS_TITLE_EXACT_BOOST,
} from "@/search/docsSearchTuning";

export interface SearchEntry {
  id: string;
  title: string;
  route: string;
  icon: string;
  category: string;
  categoryPath: string;
  keywords: string[];
}

export interface SearchResult {
  entry: SearchEntry;
  score: number;
  source?: "fuzzy" | "semantic";
}

export interface SearchGroup {
  category: string;
  categoryPath: string;
  results: SearchResult[];
}

const INDEX_URL = "/search/search-index.json";
const VECTORS_URL = "/search/vectors.json";

function loadAiEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(DOCS_SEARCH_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as { aiEnabled?: boolean }) : null;
    return parsed?.aiEnabled === true;
  } catch {
    return false;
  }
}

function persistAiEnabled(aiEnabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      DOCS_SEARCH_STORAGE_KEY,
      JSON.stringify({ aiEnabled }),
    );
  } catch {
    /* storage may be unavailable */
  }
}

function docToEntry(doc: SearchDocument): SearchEntry {
  const tabTitle = String(doc.tabTitle ?? "");
  const categoryRaw = String(doc.category ?? "Other");
  const isPage =
    doc.tab === "pages" ||
    categoryRaw === "Page" ||
    categoryRaw === "Pages" ||
    tabTitle === "Pages";
  const category = isPage ? "Pages" : categoryRaw;
  const categoryPath = isPage
    ? "Pages"
    : tabTitle
      ? `${tabTitle} › ${category}`
      : category;

  return {
    id: String(doc.id),
    title: String(doc.title ?? doc.id),
    route: String(doc.route ?? "/"),
    icon: String(doc.icon || "file").replace(/^ph-/, "") || "file",
    category,
    categoryPath,
    keywords: Array.isArray(doc.keywords) ? doc.keywords.map(String) : [],
  };
}

function entryToHit(entry: SearchEntry, hit: MergedHit): GlobalSearchHit {
  return {
    id: entry.id,
    title: entry.title,
    route: entry.route,
    icon: entry.icon,
    category: entry.category,
    categoryPath: entry.categoryPath,
    score: hit.score,
    source: hit.source,
  };
}

function hitsToResults(hits: MergedHit[]): SearchResult[] {
  return hits.map((hit) => ({
    entry: docToEntry(hit.doc),
    score: hit.score,
    source: hit.source,
  }));
}

function groupResults(list: SearchResult[]): SearchGroup[] {
  const map = new Map<string, SearchGroup>();
  for (const result of list) {
    const key = result.entry.categoryPath;
    let group = map.get(key);
    if (!group) {
      group = {
        category: result.entry.category,
        categoryPath: key,
        results: [],
      };
      map.set(key, group);
    }
    group.results.push(result);
  }
  return [...map.values()];
}

/** Optional test injectors — unit tests set these instead of real HybridSearch. */
let testEngineFactory: (() => HybridSearch) | null = null;

export function __setSearchEngineFactoryForTests(
  factory: (() => HybridSearch) | null,
): void {
  testEngineFactory = factory;
}

export const useSearchStore = defineStore("search", () => {
  const aiEnabled = ref(false);
  const prefsReady = ref(false);
  const modelLoading = ref(false);
  const modelProgressMessage = ref("");
  const fuzzyReady = ref(false);
  const semanticReady = ref(false);

  let engine: HybridSearch | null = null;
  let engineInit: Promise<HybridSearch> | null = null;
  let semanticInit: Promise<void> | null = null;
  let unsubscribeSemantic: (() => void) | null = null;

  const init = (): void => {
    if (prefsReady.value) return;
    aiEnabled.value = loadAiEnabled();
    prefsReady.value = true;
  };

  async function ensureEngine(): Promise<HybridSearch> {
    if (engine) return engine;
    if (engineInit) return engineInit;

    engineInit = (async () => {
      const next = testEngineFactory
        ? testEngineFactory()
        : new HybridSearch({
            indexUrl: INDEX_URL,
            vectorsUrl: VECTORS_URL,
            embeddingPreset: "embeddinggemma",
            fuseThreshold: DOCS_FUSE_THRESHOLD,
            semanticThreshold: DOCS_SEMANTIC_THRESHOLD,
            fuzzyMinScore: DOCS_FUZZY_MIN_SCORE,
            titleExactBoost: DOCS_TITLE_EXACT_BOOST,
            loadFuse: async () => ({ default: Fuse }),
            loadTransformers: async () => import("@huggingface/transformers"),
          });

      unsubscribeSemantic?.();
      unsubscribeSemantic = next.onSemanticProgress((ev) => {
        if (!aiEnabled.value) return;
        const stage = ev?.stage;
        if (stage === "ready") {
          modelLoading.value = false;
          modelProgressMessage.value = "";
          semanticReady.value = true;
          return;
        }
        if (stage === "error") {
          modelLoading.value = false;
          modelProgressMessage.value = "";
          return;
        }
        modelLoading.value = true;
        modelProgressMessage.value = ev?.message || "Loading semantic model…";
      });

      await next.initFuzzy();
      fuzzyReady.value = true;
      engine = next;
      return next;
    })();

    try {
      return await engineInit;
    } catch (err) {
      engineInit = null;
      engine = null;
      fuzzyReady.value = false;
      throw err;
    }
  }

  async function ensureSemantic(): Promise<void> {
    if (!aiEnabled.value) return;
    const eng = await ensureEngine();
    if (eng.isSemanticReady()) {
      semanticReady.value = true;
      return;
    }
    if (semanticInit) return semanticInit;

    semanticInit = eng.initSemantic().catch((err: unknown) => {
      semanticInit = null;
      const message = err instanceof Error ? err.message : String(err);
      console.warn("[search] Semantic preload failed:", message);
      modelLoading.value = false;
      modelProgressMessage.value = "";
    });

    await semanticInit;
  }

  async function runSearch(raw: string): Promise<GlobalSearchHit[]> {
    const q = raw.trim();
    if (q.length < 2) return [];

    const eng = await ensureEngine();
    const mode = aiEnabled.value && eng.isSemanticReady() ? "hybrid" : "fuzzy";
    const { merged } = await eng.search(q, { mode });
    semanticReady.value = eng.isSemanticReady();
    return merged.map((hit) => entryToHit(docToEntry(hit.doc), hit));
  }

  const searchAdapter: GlobalSearchAdapter = {
    search: async (query, ctx) => {
      const prev = aiEnabled.value;
      if (ctx.ai !== prev) {
        aiEnabled.value = ctx.ai;
        persistAiEnabled(ctx.ai);
      }
      try {
        return await runSearch(query);
      } catch (err) {
        console.warn("[search] search failed:", err);
        return [];
      }
    },
    warmup: async (ai) => {
      if (!ai) return;
      aiEnabled.value = true;
      await ensureSemantic();
    },
  };

  function setAiEnabled(enabled: boolean): void {
    aiEnabled.value = enabled;
    persistAiEnabled(enabled);
    if (!enabled) {
      modelLoading.value = false;
      modelProgressMessage.value = "";
    } else {
      void ensureSemantic();
    }
  }

  const progressMessage = computed(
    () =>
      modelProgressMessage.value ||
      (modelLoading.value ? "Loading semantic…" : ""),
  );

  return {
    aiEnabled,
    init,
    setAiEnabled,
    searchAdapter,
    progressMessage,
    fuzzyReady,
    semanticReady,
    modelLoading,
    modelProgressMessage,
    /** Legacy helpers for unit tests */
    runSearchNow: runSearch,
    hitsToResults,
    groupResults,
  };
});
