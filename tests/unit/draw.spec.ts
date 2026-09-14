import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { VdDraw } from "@vanduo-oss/vdl-cbun/draw";
import { drawSeedDoc } from "../../src/constants/drawSeed";

beforeAll(() => {
  if (typeof (globalThis as { ResizeObserver?: unknown }).ResizeObserver === "undefined") {
    (globalThis as { ResizeObserver?: unknown }).ResizeObserver = class {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    };
  }
});

describe("VdDraw (@vanduo-oss/vdl-cbun/draw integration in docs)", () => {
  it("mounts and builds the draw editor shell with drawSeedDoc", async () => {
    const wrapper = mount(VdDraw, {
      props: {
        data: drawSeedDoc,
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".vd-draw").exists()).toBe(true);
    expect(wrapper.find(".vd-draw-canvas").exists()).toBe(true);
    expect(wrapper.find("svg").exists()).toBe(true);
    wrapper.unmount();
  });

  it("drawSeedDoc contains the hello + smiley showcase artwork", () => {
    expect(drawSeedDoc.shapes).toHaveLength(9);
    const types = new Set(drawSeedDoc.shapes.map((s) => s.type));
    expect(types.has("freehand")).toBe(true);
    expect(types.has("ellipse")).toBe(true);
    expect(drawSeedDoc.shapes.some((s) => s.id === "smile-fill")).toBe(true);
    expect(drawSeedDoc.shapes.filter((s) => s.type === "freehand")).toHaveLength(6);
  });
});
