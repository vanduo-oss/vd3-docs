import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { VdDraw } from "@vanduo-oss/vd3-cbun/draw";
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

describe("VdDraw (@vanduo-oss/vd3-cbun/draw integration in docs)", () => {
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

  it("drawSeedDoc contains all required sample entities", () => {
    expect(drawSeedDoc.shapes.length).toBeGreaterThan(5);
    const types = new Set(drawSeedDoc.shapes.map((s) => s.type));
    expect(types.has("rectangle")).toBe(true);
    expect(types.has("sticky")).toBe(true);
    expect(types.has("line")).toBe(true);
    expect(types.has("freehand")).toBe(true);
  });
});
