import { describe, expect, it } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import VdSiteDock from "@/layout/VdSiteDock.vue";

const mountDock = async (): Promise<{
  wrapper: ReturnType<typeof mount>;
  router: Router;
}> => {
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
            '<button type="button" aria-label="Open theme customizer" />',
        },
        VdIcon: true,
      },
    },
  });
  return { wrapper, router };
};

describe("VdSiteDock", () => {
  it("renders brand, icon-only nav items with tooltips, and action triggers", async () => {
    const { wrapper } = await mountDock();
    expect(wrapper.find(".vd-brand-mark").exists()).toBe(true);

    for (const label of ["Home", "Docs", "CBUN", "Showcase"] as const) {
      const item = wrapper.get(`button.vd-dock-item[aria-label="${label}"]`);
      expect(item.attributes("data-tooltip")).toBe(label);
      expect(item.attributes("data-tooltip-placement")).toBe("top");
      expect(item.attributes("data-tooltip-variant")).toBe("dock");
    }

    expect(wrapper.find(".vd-dock-links .vd-dock-label").exists()).toBe(true);
    expect(
      wrapper.find('button[aria-label="Open global search"]').exists(),
    ).toBe(true);
    expect(wrapper.find('button[aria-label="Theme switcher"]').exists()).toBe(
      true,
    );
    expect(
      wrapper.find('button[aria-label="Open theme customizer"]').exists(),
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
      "bottom",
    );
    wrapper.unmount();
    expect(document.documentElement.getAttribute("data-docs-dock")).toBeNull();
  });

  it("uses radius 1.5 and inline item layout on horizontal edges", async () => {
    const { wrapper } = await mountDock();
    const dock = wrapper.find(".vd-dock");
    expect(dock.attributes("style") ?? "").toMatch(
      /--vd-dock-radius:\s*1\.5(?:rem)?/,
    );
    expect(dock.classes()).toContain("vd-dock-items-inline");
    expect(dock.classes()).not.toContain("vd-dock-items-stack");
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

  it("maps tooltip placement away from each dock edge", async () => {
    const { wrapper } = await mountDock();
    const vm = wrapper.vm as unknown as { placement: string };
    const home = () =>
      wrapper.get('button.vd-dock-item[aria-label="Home"]');

    const cases: Array<[string, string]> = [
      ["bottom", "top"],
      ["top", "bottom"],
      ["left", "right"],
      ["right", "left"],
    ];
    for (const [edge, tip] of cases) {
      vm.placement = edge;
      await flushPromises();
      expect(home().attributes("data-tooltip-placement")).toBe(tip);
    }
    wrapper.unmount();
  });
});
