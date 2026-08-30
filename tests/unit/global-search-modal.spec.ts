import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { createRouter, createMemoryHistory } from "vue-router";
import GlobalSearchModal from "@/overlays/GlobalSearchModal.vue";
import {
  __setSearchEngineFactoryForTests,
} from "@/stores/search";
import type { HybridSearch, MergedHit } from "@vanduo-oss/vdl-hybrid-search";

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
    document.body.innerHTML = "";
  });

  it("opens on cmd+k, filters on input, and arrow-navigates the listbox", async () => {
    const pinia = createPinia();
    const wrapper = mount(GlobalSearchModal, {
      global: {
        plugins: [pinia, makeRouter()],
        stubs: { Teleport: false },
      },
      attachTo: document.body,
    });

    expect(document.body.querySelector(".vd-global-search-modal.is-open")).toBeNull();

    pressKey({ key: "k", metaKey: true });
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector(".vd-global-search-modal.is-open")).toBeTruthy();

    const input = document.body.querySelector(
      ".vd-global-search-input",
    ) as HTMLInputElement;
    input.value = "button";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await wrapper.vm.$nextTick();
    await vi.advanceTimersByTimeAsync(400);
    await Promise.resolve();
    await wrapper.vm.$nextTick();

    const listbox = document.body.querySelector('[role="listbox"]');
    expect(listbox).toBeTruthy();
    const options = listbox!.querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(1);

    pressKey({ key: "ArrowDown" });
    await wrapper.vm.$nextTick();
    expect(listbox!.querySelector('[aria-selected="true"]')).toBeTruthy();

    pressKey({ key: "Escape" });
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector(".vd-global-search-modal.is-open")).toBeNull();

    wrapper.unmount();
  });

  it("shows AI toggle off by default and disclaimer when enabled", async () => {
    const pinia = createPinia();
    const wrapper = mount(GlobalSearchModal, {
      global: {
        plugins: [pinia, makeRouter()],
        stubs: { Teleport: false },
      },
      attachTo: document.body,
    });

    pressKey({ key: "k", metaKey: true });
    await wrapper.vm.$nextTick();

    const toggle = document.body.querySelector(
      '.vd-form-switch input[role="switch"]',
    ) as HTMLInputElement;
    expect(toggle.checked).toBe(false);
    expect(document.body.querySelector(".vd-global-search-ai-notice")).toBeNull();

    toggle.click();
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector(".vd-global-search-ai-notice")).toBeTruthy();
    expect(
      document.body.querySelector(".vd-global-search-ai-notice")?.textContent,
    ).toContain("EU AI Act");

    wrapper.unmount();
  });
});
