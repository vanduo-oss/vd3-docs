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
  QUERY_PREFIX,
} from "@/search/embeddinggemma";
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
    search: vi.fn(async (query: string) => {
      const q = query.toLowerCase();
      const merged = hits.filter((h) => h.doc.title.toLowerCase().includes(q));
      return { query, mode: "fuzzy" as const, fuzzy: [], semantic: [], merged };
    }),
  } as unknown as HybridSearch;
}

describe("embeddinggemma helpers", () => {
  it("prefixes queries for EmbeddingGemma retrieval", () => {
    expect(prefixQuery("transparent")).toBe(`${QUERY_PREFIX}transparent`);
  });

  it("adaptive cutoff scales with top score", () => {
    expect(adaptiveCutoff(0.8)).toBeCloseTo(0.36, 5);
    expect(adaptiveCutoff(0.3)).toBe(0.22);
  });

  it("filterConfidentHits requires a strong top hit and drops weak tails", () => {
    expect(
      filterConfidentHits([{ score: 0.4, source: "semantic" as const }]),
    ).toEqual([]);

    const kept = filterConfidentHits([
      { score: 0.25, source: "semantic" as const },
      { score: 0.7, source: "semantic" as const },
      { score: 0.55, source: "semantic" as const },
      {
        score: 0.5,
        source: "fuzzy" as const,
        weakMatch: true,
        titleMatch: "none" as const,
      },
    ]);
    expect(kept.map((h) => h.score)).toEqual([0.7, 0.55]);
  });
});

describe("useSearchStore (hybrid)", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    __setSearchEngineFactoryForTests(null);
    vi.useRealTimers();
  });

  it("returns no results for queries shorter than 2 chars", async () => {
    const engine = createMockEngine([makeHit({ id: "modal", title: "Modal" })]);
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    search.open();
    search.query = "b";
    await vi.advanceTimersByTimeAsync(400);
    expect(search.results).toHaveLength(0);
  });

  it("matches via hybrid engine and maps entry fields", async () => {
    const engine = createMockEngine([
      makeHit({
        id: "modal",
        title: "Modal",
        category: "Overlay",
        tabTitle: "Components",
        keywords: ["dialog"],
      }),
    ]);
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    search.open();
    search.query = "modal";
    await vi.advanceTimersByTimeAsync(400);
    await Promise.resolve();
    expect(search.ordered.some((r) => r.entry.title === "Modal")).toBe(true);
    const modal = search.ordered.find((r) => r.entry.title === "Modal");
    expect(modal?.entry.categoryPath).toBe("Components › Overlay");
    expect(engine.search).toHaveBeenCalled();
  });

  it("groups results by category path", async () => {
    const engine = createMockEngine([
      makeHit({
        id: "button",
        title: "Button",
        category: "Actions",
        tabTitle: "Components",
      }),
      makeHit({
        id: "button-groups",
        title: "Button Groups",
        category: "Actions",
        tabTitle: "Components",
      }),
    ]);
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    search.open();
    search.query = "button";
    await vi.advanceTimersByTimeAsync(400);
    await Promise.resolve();
    expect(search.groups.length).toBeGreaterThan(0);
    expect(search.ordered.length).toBe(
      search.groups.reduce((sum, g) => sum + g.results.length, 0),
    );
  });

  it("clears results on close", async () => {
    const engine = createMockEngine([
      makeHit({ id: "button", title: "Button" }),
    ]);
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    search.open();
    search.query = "but";
    await vi.advanceTimersByTimeAsync(400);
    await Promise.resolve();
    search.close();
    expect(search.isOpen).toBe(false);
    expect(search.query).toBe("");
    expect(search.results).toHaveLength(0);
  });

  it("initFuzzy runs on open", async () => {
    const engine = createMockEngine();
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    search.open();
    await Promise.resolve();
    await Promise.resolve();
    expect(engine.initFuzzy).toHaveBeenCalled();
  });

  it("drops low-confidence and weak body-only fuzzy hits", async () => {
    const engine = createMockEngine();
    (engine.search as ReturnType<typeof vi.fn>).mockImplementation(
      async (query: string) => ({
        query,
        mode: "hybrid" as const,
        fuzzy: [],
        semantic: [],
        merged: [
          {
            score: 0.19,
            source: "semantic" as const,
            doc: {
              id: "alert",
              title: "Alert",
              route: "/components/alert",
              category: "Core",
              tab: "components",
              tabTitle: "Components",
            },
          },
          {
            score: 0.4,
            source: "fuzzy" as const,
            weakMatch: true,
            titleMatch: "none" as const,
            doc: {
              id: "preloader",
              title: "Preloader",
              route: "/components/preloader",
              category: "Feedback",
              tab: "components",
              tabTitle: "Components",
            },
          },
          {
            score: 0.9,
            source: "fuzzy" as const,
            titleMatch: "partial" as const,
            weakMatch: true,
            doc: {
              id: "modal",
              title: "Modal",
              route: "/components/modal",
              category: "Overlay",
              tab: "components",
              tabTitle: "Components",
            },
          },
        ],
      }),
    );
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    search.open();
    search.query = "banana";
    await vi.advanceTimersByTimeAsync(400);
    await Promise.resolve();
    expect(search.ordered.map((r) => r.entry.title)).toEqual(["Modal"]);
  });

  it("keeps solid semantic hits for intent queries", async () => {
    const engine = createMockEngine();
    (engine.search as ReturnType<typeof vi.fn>).mockImplementation(
      async (query: string) => ({
        query,
        mode: "hybrid" as const,
        fuzzy: [],
        semantic: [],
        merged: [
          {
            score: 0.62,
            source: "semantic" as const,
            doc: {
              id: "glass",
              title: "Glass",
              route: "/effects/glass",
              category: "Effects",
              tab: "components",
              tabTitle: "Components",
            },
          },
          {
            score: 0.5,
            source: "semantic" as const,
            doc: {
              id: "surfaces",
              title: "Surfaces",
              route: "/effects/surfaces",
              category: "Effects",
              tab: "components",
              tabTitle: "Components",
            },
          },
        ],
      }),
    );
    __setSearchEngineFactoryForTests(() => engine);
    const search = useSearchStore();
    search.open();
    search.query = "how to make objects transparent?";
    await vi.advanceTimersByTimeAsync(400);
    await Promise.resolve();
    expect(search.ordered.some((r) => r.entry.title === "Glass")).toBe(true);
  });
});
