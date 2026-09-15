import { defineStore } from "pinia";
import type { GlobalSearchAdapter, GlobalSearchHit } from "@vanduo-oss/vd3";
import Fuse from "fuse.js";
import {
  DOCS_FUSE_THRESHOLD,
  DOCS_FUZZY_MIN_SCORE,
  DOCS_TITLE_EXACT_BOOST,
} from "@/search/docsSearchTuning";

export interface SearchDocument {
  id: string;
  title: string;
  route: string;
  icon?: string;
  category?: string;
  tab?: string;
  tabTitle?: string;
  keywords?: string[];
  headings?: string[];
  bodyText?: string;
}

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
  source?: "fuzzy";
}

export interface SearchGroup {
  category: string;
  categoryPath: string;
  results: SearchResult[];
}

const INDEX_URL = "/search/search-index.json";

type IndexPayload = { documents?: SearchDocument[] } | SearchDocument[];

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

function entryToHit(entry: SearchEntry, score: number): GlobalSearchHit {
  return {
    id: entry.id,
    title: entry.title,
    route: entry.route,
    icon: entry.icon,
    category: entry.category,
    categoryPath: entry.categoryPath,
    score,
    source: "fuzzy",
  };
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

interface FuseDoc {
  entry: SearchEntry;
  title: string;
  keywords: string;
  headings: string;
  bodyText: string;
}

let fuse: Fuse<FuseDoc> | null = null;
let fuseInit: Promise<Fuse<FuseDoc>> | null = null;
/** Optional test injector — unit tests set this instead of fetching the index. */
let testDocuments: SearchDocument[] | null = null;

export function __setSearchDocumentsForTests(
  docs: SearchDocument[] | null,
): void {
  testDocuments = docs;
  fuse = null;
  fuseInit = null;
}

async function ensureFuse(): Promise<Fuse<FuseDoc>> {
  if (fuse) return fuse;
  if (fuseInit) return fuseInit;

  fuseInit = (async () => {
    let documents: SearchDocument[];
    if (testDocuments) {
      documents = testDocuments;
    } else {
      const res = await fetch(INDEX_URL);
      if (!res.ok)
        throw new Error(`Failed to load search index: ${res.status}`);
      const payload = (await res.json()) as IndexPayload;
      documents = Array.isArray(payload)
        ? payload
        : Array.isArray(payload.documents)
          ? payload.documents
          : [];
    }

    const rows: FuseDoc[] = documents.map((doc) => {
      const entry = docToEntry(doc);
      return {
        entry,
        title: entry.title,
        keywords: entry.keywords.join(" "),
        headings: Array.isArray(doc.headings) ? doc.headings.join(" ") : "",
        bodyText: String(doc.bodyText ?? ""),
      };
    });

    const next = new Fuse(rows, {
      includeScore: true,
      threshold: DOCS_FUSE_THRESHOLD,
      ignoreLocation: true,
      keys: [
        { name: "title", weight: 0.45 },
        { name: "keywords", weight: 0.25 },
        { name: "headings", weight: 0.15 },
        { name: "bodyText", weight: 0.15 },
      ],
    });
    fuse = next;
    return next;
  })();

  try {
    return await fuseInit;
  } catch (err) {
    fuseInit = null;
    fuse = null;
    throw err;
  }
}

export const useSearchStore = defineStore("search", () => {
  const init = (): void => {
    /* prefs no longer needed without AI toggle */
  };

  async function runSearch(raw: string): Promise<GlobalSearchHit[]> {
    const q = raw.trim();
    if (q.length < 2) return [];

    const engine = await ensureFuse();
    const hits = engine.search(q);
    const qLower = q.toLowerCase();
    const out: GlobalSearchHit[] = [];

    for (const hit of hits) {
      const fuseScore = hit.score ?? 1;
      let score = 1 - fuseScore;
      if (hit.item.title.toLowerCase() === qLower) {
        score = Math.min(1, score + DOCS_TITLE_EXACT_BOOST);
      }
      if (score < DOCS_FUZZY_MIN_SCORE) continue;
      out.push(entryToHit(hit.item.entry, score));
    }

    return out;
  }

  const searchAdapter: GlobalSearchAdapter = {
    search: async (query) => {
      try {
        return await runSearch(query);
      } catch (err) {
        console.warn("[search] search failed:", err);
        return [];
      }
    },
  };

  return {
    init,
    searchAdapter,
    runSearchNow: runSearch,
    groupResults,
  };
});
