import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import {
  useSearchStore,
  __setSearchEngineFactoryForTests,
} from "@/stores/search";
import {
  adaptiveCutoff,
  filterConfidentHits,
  prefixQuery,
  EMBEDDING_PRESETS,
  DEFAULT_CONFIDENCE,
} from "@vanduo-oss/vdl-hybrid-search";
import type { HybridSearch, MergedHit } from "@vanduo-oss/vdl-hybrid-search";

function makeHit(
  overrides: Partial<MergedHit["doc"]> & { title: string; id: string },
): MergedHit {
  return {
    score: 0.9,
    source: "fuzzy",
    doc: {
      id: overrides.id,
      title: overrides.title,
      route: overrides.route ?? `/${overrides.id}`,
      icon: overrides.icon ?? "cube",
      category: overrides.category ?? "Overlay",
      tab: overrides.tab ?? "components",
      tabTitle: overrides.tabTitle ?? "Components",
      keywords: overrides.keywords ?? ["dialog"],
    },
  };
}

function createMockEngine(hits: MergedHit[] = []): HybridSearch {
  const semanticReady = { value: false };
  return {
    queryMinLength: 2,
    queryMaxLength: 240,
    onSemanticProgress: vi.fn(() => () => {}),
    initFuzzy: vi.fn(async () => {}),
    initSemantic: vi.fn(async () => {
      semanticReady.value = true;
    }),
    isSemanticReady: vi.fn(() => semanticReady.value),
    search: vi.fn(async (query: string, opts?: { mode?: string }) => {
      const q = query.toLowerCase();
      const merged = hits.filter((h) => h.doc.title.toLowerCase().includes(q));
      return {
        query,
        mode: (opts?.mode ?? "fuzzy") as "fuzzy",
        fuzzy: [],
        semantic: [],
        merged,
      };
    }),
  } as unknown as HybridSearch;
}

describe("vdl-hybrid-search helpers", () => {
  it("prefixes queries for EmbeddingGemma retrieval", () => {
    const prefix = EMBEDDING_PRESETS.embeddinggemma.queryPrefix;
    expect(prefixQuery("transparent", prefix)).toBe(`${prefix}transparent`);
  });

  it("adaptive cutoff scales with top score", () => {
    expect(adaptiveCutoff(0.8, DEFAULT_CONFIDENCE)).toBeCloseTo(0.36, 5);
    expect(adaptiveCutoff(0.3, DEFAULT_CONFIDENCE)).toBe(0.22);
  });

  it("filterConfidentHits requires a strong top hit and drops weak tails", () => {
    expect(
      filterConfidentHits([
        {
          score: 0.4,
          source: "semantic",
          doc: { id: "a", title: "A", route: "/" },
        },
      ]),
    ).toEqual([]);

    const kept = filterConfidentHits([
      {
        score: 0.25,
        source: "semantic",
        doc: { id: "a", title: "A", route: "/" },
      },
      {
        score: 0.7,
        source: "semantic",
        doc: { id: "b", title: "B", route: "/" },
      },
      {
        score: 0.55,
        source: "semantic",
        doc: { id: "c", title: "C", route: "/" },
      },
    ]);
    expect(kept.map((h) => h.score)).toEqual([0.7, 0.55]);
  });
});

describe("useSearchStore adapter", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    __setSearchEngineFactoryForTests(null);
  });

  it("returns no results for queries shorter than 2 chars", async () => {
    const engine = createMockEngine([makeHit({ id: "modal", title: "Modal" })]);
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    const hits = await search.searchAdapter.search("b", { ai: false });
    expect(hits).toHaveLength(0);
  });

  it("matches via hybrid engine and maps hit fields", async () => {
    const engine = createMockEngine([
      makeHit({
        id: "modal",
        title: "Modal",
        category: "Overlay",
        tabTitle: "Components",
      }),
    ]);
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    const hits = await search.searchAdapter.search("modal", { ai: false });
    expect(hits.some((h) => h.title === "Modal")).toBe(true);
    expect(hits.find((h) => h.title === "Modal")?.categoryPath).toBe(
      "Components › Overlay",
    );
  });

  it("does not init semantic until AI search is enabled", async () => {
    const engine = createMockEngine();
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    await search.searchAdapter.search("ab", { ai: false });
    expect(engine.initSemantic).not.toHaveBeenCalled();
    expect(search.aiEnabled).toBe(false);
  });

  it("initSemantic runs when AI warmup is requested", async () => {
    const engine = createMockEngine();
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    await search.searchAdapter.warmup?.(true);
    await Promise.resolve();
    expect(engine.initSemantic).toHaveBeenCalled();
  });

  it("uses hybrid mode when AI is enabled and semantic is ready", async () => {
    const engine = createMockEngine([makeHit({ id: "modal", title: "Modal" })]);
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    await search.searchAdapter.warmup?.(true);
    await Promise.resolve();
    await search.searchAdapter.search("modal", { ai: true });
    expect(engine.search).toHaveBeenLastCalledWith(
      "modal",
      expect.objectContaining({ mode: "hybrid" }),
    );
  });

  it("persists AI preference to localStorage", () => {
    const storage: Record<string, string> = {};
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => {
        storage[key] = value;
      },
      removeItem: (key: string) => {
        delete storage[key];
      },
    });

    const engine = createMockEngine();
    __setSearchEngineFactoryForTests(() => engine);

    setActivePinia(createPinia());
    const search = useSearchStore();
    search.setAiEnabled(true);
    expect(JSON.parse(storage["vd3-docs-search"] ?? "{}")).toEqual({
      aiEnabled: true,
    });

    setActivePinia(createPinia());
    __setSearchEngineFactoryForTests(() => engine);
    const search2 = useSearchStore();
    search2.init();
    expect(search2.aiEnabled).toBe(true);

    vi.unstubAllGlobals();
  });
});
