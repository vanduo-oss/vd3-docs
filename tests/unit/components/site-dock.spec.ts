import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import { DOCK_NARROW_QUERY } from "@vanduo-oss/vd3";
import VdSiteDock from "@/layout/VdSiteDock.vue";

function stubMatchMedia(narrow: boolean): typeof window.matchMedia {
  return (query: string) =>
    ({
      matches: query === DOCK_NARROW_QUERY ? narrow : false,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }) as unknown as MediaQueryList;
}

const mountDock = async (options?: {
  narrow?: boolean;
}): Promise<{
  wrapper: ReturnType<typeof mount>;
  router: Router;
}> => {
  if (options?.narrow) {
    vi.stubGlobal("matchMedia", stubMatchMedia(true));
  }

  setActivePinia(createPinia());
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: { template: "<div>home</div>" } },
      { path: "/docs-landing", component: { template: "<div>docs</div>" } },
      { path: "/cbun", component: { template: "<div>cbun</div>" } },
      { path: "/showcase", component: { template: "<div>showcase</div>" } },
    ],
  });
  await router.push("/");
  await router.isReady();

  const wrapper = mount(VdSiteDock, {
    attachTo: document.body,
    global: {
      plugins: [router],
      stubs: {
        Vd3BrandMark: {
          template: '<span class="vd-brand-mark">vd3</span>',
        },
        VdThemeSwitcher: {
          template: '<button type="button" aria-label="Theme switcher" />',
        },
        VdThemeCustomizer: {
          template:
            '<button type="button" aria-label="Choose theme color" />',
        },
        VdIcon: true,
      },
    },
  });
  return { wrapper, router };
};

describe("VdSiteDock", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.removeItem("vd3-docs-site-dock");
  });

  it("renders brand, icon-only nav items with tooltips, and action triggers", async () => {
    const { wrapper } = await mountDock();
    await flushPromises();
    expect(wrapper.find(".vd-brand-mark").exists()).toBe(true);

    for (const label of ["Home", "Docs", "CBUN", "Showcase"] as const) {
      const item = wrapper.get(`button.vd-dock-item[aria-label="${label}"]`);
      expect(item.attributes("data-tooltip")).toBe(label);
      expect(item.attributes("data-tooltip-placement")).toBe("right");
      expect(item.attributes("data-tooltip-variant")).toBe("dock");
    }

    const search = wrapper.get('button[aria-label="Open global search"]');
    expect(search.attributes("data-tooltip")).toBe("Search");
    expect(search.attributes("data-tooltip-variant")).toBe("dock");

    const brand = wrapper.find(".vd-dock-brand");
    expect(brand.exists()).toBe(true);
    expect(brand.attributes("data-tooltip")).toBe("Move dock to top");

    expect(wrapper.find(".vd-dock-links .vd-dock-label").exists()).toBe(true);
    expect(
      wrapper.find('button[aria-label="Open global search"]').exists(),
    ).toBe(true);
    expect(wrapper.find('button[aria-label="Theme switcher"]').exists()).toBe(
      true,
    );
    expect(
      wrapper.find('button[aria-label="Choose theme color"]').exists(),
    ).toBe(true);
    expect(wrapper.find(".vd-dock").classes()).toContain("vd-dock-fixed");
    wrapper.unmount();
  });

  it("navigates when a dock item is clicked", async () => {
    const { wrapper, router } = await mountDock();
    const docs = wrapper.get('button.vd-dock-item[aria-label="Docs"]');
    await docs.trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/docs-landing");
    wrapper.unmount();
  });

  it("sets data-docs-dock on html for edge padding", async () => {
    const { wrapper } = await mountDock();
    expect(document.documentElement.getAttribute("data-docs-dock")).toBe(
      "left",
    );
    wrapper.unmount();
    expect(document.documentElement.getAttribute("data-docs-dock")).toBeNull();
  });

  it("uses radius 1.5 and stacked item layout on vertical default edge", async () => {
    const { wrapper } = await mountDock();
    const dock = wrapper.find(".vd-dock");
    expect(dock.attributes("style") ?? "").toMatch(
      /--vd-dock-radius:\s*1\.5(?:rem)?/,
    );
    expect(dock.classes()).toContain("vd-dock-items-stack");
    expect(dock.classes()).not.toContain("vd-dock-items-inline");
    wrapper.unmount();
  });

  it("uses inline item layout on horizontal edges without tooltips", async () => {
    const { wrapper } = await mountDock();
    const vm = wrapper.vm as unknown as { placement: string };
    vm.placement = "bottom";
    await flushPromises();
    const dock = wrapper.find(".vd-dock");
    expect(dock.classes()).toContain("vd-dock-items-inline");
    expect(dock.classes()).not.toContain("vd-dock-items-stack");

    const home = wrapper.get('button.vd-dock-item[aria-label="Home"]');
    expect(home.attributes("data-tooltip")).toBeUndefined();
    expect(home.find(".vd-dock-label").text()).toBe("Home");
    wrapper.unmount();
  });

  it("switches to stacked item layout on vertical edges", async () => {
    const { wrapper } = await mountDock();
    const vm = wrapper.vm as unknown as { placement: string };
    vm.placement = "left";
    await flushPromises();
    const dock = wrapper.find(".vd-dock");
    expect(dock.classes()).toContain("vd-dock-items-stack");
    expect(dock.classes()).not.toContain("vd-dock-items-inline");

    const home = wrapper.get('button.vd-dock-item[aria-label="Home"]');
    expect(home.attributes("data-tooltip-placement")).toBe("right");
    wrapper.unmount();
  });

  it("keeps Home in the narrow dock link strip without tooltips", async () => {
    const { wrapper } = await mountDock({ narrow: true });
    const vm = wrapper.vm as unknown as { placement: string };
    vm.placement = "bottom";
    await flushPromises();

    const home = wrapper.get('button.vd-dock-item[aria-label="Home"]');
    expect(home.attributes("data-tooltip")).toBeUndefined();
    expect(home.attributes("data-tooltip-placement")).toBeUndefined();
    expect(home.attributes("data-tooltip-variant")).toBeUndefined();
    expect(home.classes()).toContain("is-active");
    expect(home.find(".vd-dock-label").text()).toBe("Home");

    const search = wrapper.get('button[aria-label="Open global search"]');
    expect(search.attributes("data-tooltip")).toBeUndefined();

    const brand = wrapper.find(".vd-dock-brand");
    expect(brand.exists()).toBe(true);
    expect(brand.attributes("data-tooltip")).toBeUndefined();

    expect(wrapper.find(".vd-site-dock-strip-divider").exists()).toBe(true);
    expect(
      wrapper.find('.vd-dock-links button[aria-label="Theme switcher"]').exists(),
    ).toBe(true);
    expect(
      wrapper.find('.vd-dock-actions button[aria-label="Theme switcher"]').exists(),
    ).toBe(false);

    wrapper.unmount();
  });

  it("maps tooltip placement away from vertical dock edges", async () => {
    const { wrapper } = await mountDock();
    const vm = wrapper.vm as unknown as { placement: string };
    const home = () =>
      wrapper.get('button.vd-dock-item[aria-label="Home"]');

    const cases: Array<[string, string]> = [
      ["left", "right"],
      ["right", "left"],
    ];
    for (const [edge, tip] of cases) {
      vm.placement = edge;
      await flushPromises();
      expect(home().attributes("data-tooltip")).toBe("Home");
      expect(home().attributes("data-tooltip-placement")).toBe(tip);
    }
    wrapper.unmount();
  });

  it("omits chrome tooltips on horizontal desktop edges", async () => {
    const { wrapper } = await mountDock();
    const vm = wrapper.vm as unknown as { placement: string };

    for (const edge of ["bottom", "top"] as const) {
      vm.placement = edge;
      await flushPromises();

      const home = wrapper.get('button.vd-dock-item[aria-label="Home"]');
      expect(home.attributes("data-tooltip")).toBeUndefined();
      expect(home.find(".vd-dock-label").text()).toBe("Home");

      const search = wrapper.get('button[aria-label="Open global search"]');
      expect(search.attributes("data-tooltip")).toBeUndefined();

      const brand = wrapper.find(".vd-dock-brand");
      expect(brand.attributes("data-tooltip")).toBeUndefined();
    }

    wrapper.unmount();
  });

  it("restores narrow top placement from localStorage on remount", async () => {
    localStorage.setItem("vd3-docs-site-dock", "top");

    const { wrapper } = await mountDock({ narrow: true });
    await flushPromises();

    expect(wrapper.find(".vd-dock").classes()).toContain("vd-dock-edge-top");
    expect(document.documentElement.getAttribute("data-docs-dock")).toBe("top");
    wrapper.unmount();

    const { wrapper: remount } = await mountDock({ narrow: true });
    await flushPromises();

    expect(remount.find(".vd-dock").classes()).toContain("vd-dock-edge-top");
    remount.unmount();
  });

  it("persists top when the brand toggles on narrow", async () => {
    vi.useFakeTimers();
    localStorage.removeItem("vd3-docs-site-dock");

    const { wrapper } = await mountDock({ narrow: true });
    await flushPromises();
    expect(wrapper.find(".vd-dock").classes()).toContain("vd-dock-edge-bottom");

    await wrapper.find(".vd-dock-brand").trigger("click");
    await vi.advanceTimersByTimeAsync(480 + 720 + 50);
    await flushPromises();

    expect(localStorage.getItem("vd3-docs-site-dock")).toBe("top");
    expect(wrapper.find(".vd-dock").classes()).toContain("vd-dock-edge-top");

    vi.useRealTimers();
    wrapper.unmount();
  });
});
