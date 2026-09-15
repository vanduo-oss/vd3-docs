import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import {
  useSearchStore,
  __setSearchDocumentsForTests,
} from "@/stores/search";

describe("Fuse-only docs search", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    __setSearchDocumentsForTests([
      {
        id: "modal",
        title: "Modal",
        route: "/components/modal",
        icon: "browsers",
        category: "Overlay",
        tab: "components",
        tabTitle: "Components",
        keywords: ["dialog", "overlay"],
        headings: ["Modal dialog"],
        bodyText: "A modal dialog overlays the page.",
      },
      {
        id: "button",
        title: "Button",
        route: "/components/button",
        icon: "hand-pointing",
        category: "Actions",
        tab: "components",
        tabTitle: "Components",
        keywords: ["click"],
        bodyText: "Buttons trigger actions.",
      },
    ]);
  });

  afterEach(() => {
    __setSearchDocumentsForTests(null);
  });

  it("returns fuzzy hits for a title query", async () => {
    const search = useSearchStore();
    const hits = await search.runSearchNow("modal");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0]?.id).toBe("modal");
    expect(hits[0]?.source).toBe("fuzzy");
  });

  it("returns empty for short queries", async () => {
    const search = useSearchStore();
    expect(await search.runSearchNow("m")).toEqual([]);
  });

  it("exposes a GlobalSearchAdapter without AI warmup", async () => {
    const search = useSearchStore();
    const hits = await search.searchAdapter.search("button", { ai: false });
    expect(hits.some((h) => h.id === "button")).toBe(true);
    expect(search.searchAdapter.warmup).toBeUndefined();
  });
});
