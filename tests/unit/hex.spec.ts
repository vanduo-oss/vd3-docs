import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { VdHexGrid } from "@vanduo-oss/vdl-cbun/hex-grid";

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

describe("VdHexGrid (@vanduo-oss/vdl-cbun/hex-grid)", () => {
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
