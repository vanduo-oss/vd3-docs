import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { VdHexGrid, VdHexGridCore } from "@vanduo-oss/vd3-cbun/hex-grid";
import HexPage from "@/pages/canvas/Hex.vue";

const demoGrid = (wrapper: ReturnType<typeof mount>): VdHexGridCore => {
  const instance = (
    wrapper.findComponent(VdHexGrid).vm as unknown as {
      getInstance: () => VdHexGridCore;
    }
  ).getInstance();
  expect(instance).toBeTruthy();
  return instance;
};

beforeAll(() => {
  type G = Record<string, unknown>;
  if (typeof (globalThis as G).ResizeObserver === "undefined") {
    (globalThis as G).ResizeObserver = class {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    };
  }
  // jsdom has no canvas 2D context; stub it so the grid can construct.
  const make2d = (): unknown =>
    new Proxy(
      {},
      {
        get(_t, p) {
          if (p === "measureText") return () => ({ width: 0 });
          if (p === "getImageData") return () => ({ data: [] });
          return () => {};
        },
        set() {
          return true;
        },
      },
    );
  (
    HTMLCanvasElement.prototype as unknown as { getContext: () => unknown }
  ).getContext = () => make2d();
});

describe("VdHexGrid (@vanduo-oss/vd3-cbun/hex-grid)", () => {
  it("mounts and renders the grid container + canvas", async () => {
    const wrapper = mount(VdHexGrid, {
      props: { size: 24, width: 8, height: 6 },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".vd-hex-grid").exists()).toBe(true);
    expect(wrapper.find("canvas").exists()).toBe(true);
    wrapper.unmount();
  });
});

describe("Hex canvas page (/canvas/hex)", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders interactive demo controls and grid container", async () => {
    const wrapper = mount(HexPage, {
      global: {
        stubs: {
          DocsLayout: { template: "<div><slot /></div>" },
          DocCodeSnippet: true,
        },
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".hex-demo-container").exists()).toBe(true);
    expect(wrapper.find(".vd-hex-grid").exists()).toBe(true);
    expect(wrapper.find(".canvas-toolbar").exists()).toBe(true);
    expect(wrapper.find("#hex-size-slider").exists()).toBe(true);
    expect(wrapper.find("#hex-width-slider").exists()).toBe(true);
    expect(wrapper.find("#hex-height-slider").exists()).toBe(true);
    expect(wrapper.find("#hex-rotation-slider").exists()).toBe(true);
    expect(wrapper.find("#hex-terrain-picker").exists()).toBe(true);
    expect(wrapper.text()).toContain("Grid Controls");
    expect(wrapper.text()).toContain("Path mode");
    expect(wrapper.text()).toContain("Show coordinates on all hexes");

    wrapper.unmount();
  });

  it("defaults empty hexes to transparent fill and the current primary stroke", async () => {
    document.documentElement.style.setProperty("--vd-color-primary", "#228be6");
    const wrapper = mount(HexPage, {
      global: {
        stubs: {
          DocsLayout: { template: "<div><slot /></div>" },
          DocCodeSnippet: true,
        },
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();

    const sample = demoGrid(wrapper).getAllHexes()[0];
    expect(sample.fill).toBe("transparent");
    expect(sample.stroke).toBe("#228be6");

    wrapper.unmount();
    document.documentElement.style.removeProperty("--vd-color-primary");
  });

  it("Fill Random still paints cell fills", async () => {
    const wrapper = mount(HexPage, {
      global: {
        stubs: {
          DocsLayout: { template: "<div><slot /></div>" },
          DocCodeSnippet: true,
        },
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();

    const instance = demoGrid(wrapper);
    instance.fillRandom();
    const fills = new Set(instance.getAllHexes().map((hex) => hex.fill));
    expect(fills.has("transparent")).toBe(false);
    expect(fills.size).toBeGreaterThan(0);

    wrapper.unmount();
  });
});
