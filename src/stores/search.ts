import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import {
  HybridSearch,
  type MergedHit,
  type SearchDocument,
} from "@vanduo-oss/vdl-hybrid-search";
import Fuse from "fuse.js";
import {
  EMBEDDING_MODEL_ID,
  filterConfidentHits,
  loadEmbeddingGemmaTransformers,
} from "@/search/embeddinggemma";

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

const DEBOUNCE_MS = 350;
const INDEX_URL = "/search/search-index.json";
const VECTORS_URL = "/search/vectors.json";

/** Fuse stays strict so character-soup matches stay rare. */
const FUSE_THRESHOLD = 0.3;
/**
 * EmbeddingGemma cosines are stronger than MiniLM; keep a moderate floor and
 * let adaptive display cutoff trim the tail.
 */
const SEMANTIC_THRESHOLD = 0.28;
const FUZZY_MIN_SCORE = 0.55;
const TITLE_EXACT_BOOST = 0.1;

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

function hitsToResults(hits: MergedHit[]): SearchResult[] {
  return filterConfidentHits(hits).map((hit) => ({
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
        categoryPath: result.entry.categoryPath,
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
  const isOpen = ref(false);
  const query = ref("");
  const activeIndex = ref(0);
  const results = ref<SearchResult[]>([]);
  const searching = ref(false);
  const fuzzyReady = ref(false);
  const semanticReady = ref(false);
  const modelLoading = ref(false);
  const modelProgressMessage = ref("");

  let engine: HybridSearch | null = null;
  let engineInit: Promise<HybridSearch> | null = null;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let searchSeq = 0;
  let unsubscribeSemantic: (() => void) | null = null;

  const groups = computed<SearchGroup[]>(() => groupResults(results.value));

  const ordered = computed<SearchResult[]>(() =>
    groups.value.flatMap((g) => g.results),
  );

  async function ensureEngine(): Promise<HybridSearch> {
    if (engine) return engine;
    if (engineInit) return engineInit;

    engineInit = (async () => {
      const next = testEngineFactory
        ? testEngineFactory()
        : new HybridSearch({
            indexUrl: INDEX_URL,
            vectorsUrl: VECTORS_URL,
            modelName: EMBEDDING_MODEL_ID,
            fuseThreshold: FUSE_THRESHOLD,
            semanticThreshold: SEMANTIC_THRESHOLD,
            fuzzyMinScore: FUZZY_MIN_SCORE,
            titleExactBoost: TITLE_EXACT_BOOST,
            loadFuse: async () => ({ default: Fuse }),
            loadTransformers: loadEmbeddingGemmaTransformers,
          });

      unsubscribeSemantic?.();
      unsubscribeSemantic = next.onSemanticProgress((ev) => {
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

      void next.initSemantic().catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        console.warn("[search] Semantic preload failed:", message);
        modelLoading.value = false;
      });

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

  async function runSearch(raw: string): Promise<void> {
    const q = raw.trim();
    if (q.length < 2) {
      results.value = [];
      searching.value = false;
      return;
    }

    const seq = ++searchSeq;
    searching.value = true;
    try {
      const eng = await ensureEngine();
      if (seq !== searchSeq) return;
      const mode = eng.isSemanticReady() ? "hybrid" : "fuzzy";
      const { merged } = await eng.search(q, { mode });
      if (seq !== searchSeq) return;
      results.value = hitsToResults(merged);
      semanticReady.value = eng.isSemanticReady();
    } catch (err) {
      if (seq !== searchSeq) return;
      console.warn("[search] search failed:", err);
      results.value = [];
    } finally {
      if (seq === searchSeq) searching.value = false;
    }
  }

  function scheduleSearch(raw: string): void {
    if (debounceTimer) clearTimeout(debounceTimer);
    searchSeq += 1;
    const q = raw.trim();
    if (q.length < 2) {
      results.value = [];
      searching.value = false;
      return;
    }
    debounceTimer = setTimeout(() => {
      void runSearch(raw);
    }, DEBOUNCE_MS);
  }

  watch(query, (value) => {
    activeIndex.value = 0;
    if (!isOpen.value) return;
    scheduleSearch(value);
  });

  const open = (): void => {
    isOpen.value = true;
    activeIndex.value = 0;
    void ensureEngine().catch((err: unknown) => {
      console.warn("[search] Failed to init search engine:", err);
    });
    if (query.value.trim().length >= 2) scheduleSearch(query.value);
  };

  const close = (): void => {
    isOpen.value = false;
    query.value = "";
    activeIndex.value = 0;
    results.value = [];
    searching.value = false;
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
    searchSeq += 1;
  };

  const move = (delta: number): void => {
    const count = ordered.value.length;
    if (count === 0) return;
    activeIndex.value = (activeIndex.value + delta + count) % count;
  };

  return {
    isOpen,
    query,
    activeIndex,
    results,
    groups,
    ordered,
    searching,
    fuzzyReady,
    semanticReady,
    modelLoading,
    modelProgressMessage,
    open,
    close,
    move,
    /** Flush debounce immediately (e.g. tests). */
    runSearchNow: () => runSearch(query.value),
  };
});
