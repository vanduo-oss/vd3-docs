import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { VdFlowchart } from "@vanduo-oss/vd3-cbun/flowchart";

beforeAll(() => {
  // jsdom lacks ResizeObserver, which the editor observes its host with.
  if (typeof (globalThis as { ResizeObserver?: unknown }).ResizeObserver === "undefined") {
    (globalThis as { ResizeObserver?: unknown }).ResizeObserver = class {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    };
  }
});

describe("VdFlowchart (@vanduo-oss/flowchart/vue integration)", () => {
  it("mounts and builds the editor shell into the container", async () => {
    const wrapper = mount(VdFlowchart, {
      props: {
        data: {
          nodes: [
            { id: "a", type: "rounded-rect", x: 80, y: 80, width: 160, height: 90, text: "Step" },
          ],
          edges: [],
        },
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".vd-flowchart").exists()).toBe(true);
    expect(wrapper.find(".vd-flowchart-host").exists()).toBe(true);
    expect(wrapper.find("svg").exists()).toBe(true);
    wrapper.unmount();
  });

  it("Arrange select exposes exactly three layout modes (no placeholder)", async () => {
    const wrapper = mount(VdFlowchart, {
      props: {
        data: {
          nodes: [
            { id: "a", type: "rounded-rect", x: 80, y: 80, width: 160, height: 90, text: "Step" },
          ],
          edges: [],
        },
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    const arrange = wrapper.find("[data-flowchart-arrange]");
    expect(arrange.exists()).toBe(true);
    const options = arrange.findAll("option");
    expect(options).toHaveLength(3);
    expect(options.map((o) => o.element.value)).toEqual(["tree", "radial", "grid"]);
    expect(options.every((o) => !o.element.disabled)).toBe(true);
    expect((arrange.element as HTMLSelectElement).value).toBe("tree");
    wrapper.unmount();
  });
});
