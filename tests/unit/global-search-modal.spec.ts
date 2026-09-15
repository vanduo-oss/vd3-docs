import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { createRouter, createMemoryHistory } from "vue-router";
import GlobalSearchModal from "@/overlays/GlobalSearchModal.vue";
import { __setSearchDocumentsForTests } from "@/stores/search";

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
    __setSearchDocumentsForTests([
      {
        id: "button",
        title: "Button",
        route: "/button",
        icon: "cube",
        category: "Actions",
        tab: "components",
        tabTitle: "Components",
        keywords: ["click"],
      },
      {
        id: "button-groups",
        title: "Button Groups",
        route: "/button-groups",
        icon: "cube",
        category: "Actions",
        tab: "components",
        tabTitle: "Components",
        keywords: ["group"],
      },
    ]);
  });

  afterEach(() => {
    __setSearchDocumentsForTests(null);
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

    expect(
      document.body.querySelector(".vd-global-search-modal.is-open"),
    ).toBeNull();

    pressKey({ key: "k", metaKey: true });
    await wrapper.vm.$nextTick();
    expect(
      document.body.querySelector(".vd-global-search-modal.is-open"),
    ).toBeTruthy();

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
    expect(
      document.body.querySelector(".vd-global-search-modal.is-open"),
    ).toBeNull();

    wrapper.unmount();
  });

  it("does not show an AI toggle when semantic search is disabled", async () => {
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

    expect(
      document.body.querySelector('.vd-form-switch input[role="switch"]'),
    ).toBeNull();
    expect(
      document.body.querySelector(".vd-global-search-ai-notice"),
    ).toBeNull();

    wrapper.unmount();
  });
});
