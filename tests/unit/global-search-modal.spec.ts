import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { createRouter, createMemoryHistory } from "vue-router";
import GlobalSearchModal from "@/overlays/GlobalSearchModal.vue";
import {
  useSearchStore,
  __setSearchEngineFactoryForTests,
} from "@/stores/search";
import type { HybridSearch, MergedHit } from "@vanduo-oss/vdl-hybrid-search";

/**
 * Interaction test for the command-palette search overlay. The search STORE is
 * unit-tested separately (useGlobalSearch.spec.ts); this exercises the MODAL
 * component itself: the global cmd+k keydown, typing to filter, arrow-key
 * navigation, and the ARIA listbox/option structure the results render into.
 *
 * HybridSearch is mocked so CI never downloads MiniLM.
 */

const makeHit = (title: string, id: string): MergedHit => ({
  score: 0.9,
  source: "fuzzy",
  doc: {
    id,
    title,
    route: `/${id}`,
    icon: "cube",
    category: "Actions",
    tab: "components",
    tabTitle: "Components",
    keywords: [],
  },
});

const createMockEngine = (): HybridSearch =>
  ({
    queryMinLength: 2,
    queryMaxLength: 240,
    onSemanticProgress: vi.fn(() => () => {}),
    initFuzzy: vi.fn(async () => {}),
    initSemantic: vi.fn(async () => {}),
    isSemanticReady: vi.fn(() => false),
    search: vi.fn(async (query: string) => {
      const q = query.toLowerCase();
      const all = [
        makeHit("Button", "button"),
        makeHit("Button Groups", "button-groups"),
      ];
      const merged = all.filter((h) => h.doc.title.toLowerCase().includes(q));
      return { query, mode: "fuzzy" as const, fuzzy: [], semantic: [], merged };
    }),
  }) as unknown as HybridSearch;

const makeRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/:pathMatch(.*)*", component: { template: "<div />" } }],
  });

const pressKey = (init: KeyboardEventInit): void => {
  window.dispatchEvent(
    new KeyboardEvent("keydown", { bubbles: true, ...init }),
  );
};

describe("GlobalSearchModal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    __setSearchEngineFactoryForTests(() => createMockEngine());
  });

  afterEach(() => {
    __setSearchEngineFactoryForTests(null);
    vi.useRealTimers();
  });

  it("opens on cmd+k, filters on input, and arrow-navigates the listbox", async () => {
    const pinia = createPinia();
    const wrapper = mount(GlobalSearchModal, {
      global: { plugins: [pinia, makeRouter()] },
      attachTo: document.body,
    });
    const store = useSearchStore(pinia);

    expect(store.isOpen).toBe(false);
    expect(document.body.querySelector('[role="listbox"]')).toBeNull();

    pressKey({ key: "k", metaKey: true });
    await wrapper.vm.$nextTick();
    expect(store.isOpen).toBe(true);

    const input = document.body.querySelector(
      ".global-search-input",
    ) as HTMLInputElement | null;
    expect(input).not.toBeNull();
    input!.value = "button";
    input!.dispatchEvent(new Event("input"));
    await wrapper.vm.$nextTick();
    expect(store.query).toBe("button");

    await vi.advanceTimersByTimeAsync(400);
    await Promise.resolve();
    await wrapper.vm.$nextTick();
    expect(store.ordered.length).toBeGreaterThan(1);

    const listbox = document.body.querySelector(
      '[role="listbox"]',
    ) as HTMLElement | null;
    expect(listbox).not.toBeNull();
    const options = listbox!.querySelectorAll('[role="option"]');
    expect(options.length).toBe(store.ordered.length);

    expect(store.activeIndex).toBe(0);
    pressKey({ key: "ArrowDown" });
    await wrapper.vm.$nextTick();
    expect(store.activeIndex).toBe(1);
    expect(listbox!.querySelector('[aria-selected="true"]')).not.toBeNull();

    pressKey({ key: "Escape" });
    await wrapper.vm.$nextTick();
    expect(store.isOpen).toBe(false);
    expect(store.query).toBe("");

    wrapper.unmount();
  });
});
