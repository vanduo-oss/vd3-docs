import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import {
  FLOWCHART_DOCUMENT_VERSION,
  VD_FLOWCHART_VERSION,
  VdFlowchart,
  type VdFlowchartExposed,
} from "@vanduo-oss/vd3-flowchart";
import FlowchartPage from "@/pages/canvas/Flowchart.vue";

beforeAll(() => {
  // jsdom lacks ResizeObserver, which the editor observes its host with.
  if (
    typeof (globalThis as { ResizeObserver?: unknown }).ResizeObserver ===
    "undefined"
  ) {
    (globalThis as { ResizeObserver?: unknown }).ResizeObserver = class {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    };
  }
});

describe("VdFlowchart (@vanduo-oss/vd3-flowchart)", () => {
  it("mounts and builds the editor shell into the container", async () => {
    const wrapper = mount(VdFlowchart, {
      props: {
        data: {
          nodes: [
            {
              id: "a",
              type: "rounded-rect",
              x: 80,
              y: 80,
              width: 160,
              height: 90,
              text: "Step",
            },
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
            {
              id: "a",
              type: "rounded-rect",
              x: 80,
              y: 80,
              width: 160,
              height: 90,
              text: "Step",
            },
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
    expect(options.map((o) => o.element.value)).toEqual([
      "tree",
      "radial",
      "grid",
    ]);
    expect(options.every((o) => !o.element.disabled)).toBe(true);
    expect((arrange.element as HTMLSelectElement).value).toBe("tree");
    wrapper.unmount();
  });

  it("keeps the legacy camera unless both ends of a valid pair are set", () => {
    expect(VD_FLOWCHART_VERSION).toBe("1.5.0");
    expect(FLOWCHART_DOCUMENT_VERSION).toBe("1.3.0");

    const legacy = mountEditor();
    legacy.core.zoomTo(0.05);
    expect(legacy.core.toJSON().viewport.scale).toBe(0.35);
    legacy.core.zoomTo(20);
    expect(legacy.core.toJSON().viewport.scale).toBe(3);
    legacy.wrapper.unmount();

    const wide = mountEditor({ minScale: 0.05, maxScale: 20 });
    wide.core.zoomTo(0.05);
    expect(wide.core.toJSON().viewport.scale).toBe(0.05);
    wide.core.zoomOut();
    expect(wide.core.toJSON().viewport.scale).toBe(0.05);
    wide.core.zoomTo(20);
    expect(wide.core.toJSON().viewport.scale).toBe(20);
    wide.core.zoomIn();
    expect(wide.core.toJSON().viewport.scale).toBe(20);
    wide.wrapper.unmount();
  });

  it("exposes fitNode, canUndo, and canRedo, and ignores unknown or hidden nodes", () => {
    const mounted = mountEditor({
      minScale: 0.05,
      maxScale: 20,
      minNodeSize: 6,
      maxNodeSize: 4800,
      data: {
        nodes: [
          {
            id: "start",
            type: "rounded-rect",
            x: 40,
            y: 40,
            width: 180,
            height: 96,
            text: "Start",
          },
          {
            id: "note",
            type: "rect",
            x: 300,
            y: 80,
            width: 6,
            height: 6,
            text: "Note",
          },
        ],
        edges: [
          {
            id: "link",
            from: { nodeId: "start", port: "right" },
            to: { nodeId: "note", port: "left" },
          },
        ],
      },
    });
    const { wrapper, api, core } = mounted;
    expect(api.canUndo()).toBe(false);
    expect(api.canRedo()).toBe(false);
    expect(core.toJSON().version).toBe("1.3.0");
    expect(core.toJSON().nodes.find((node) => node.id === "note")?.width).toBe(
      6,
    );

    const before = core.toJSON().viewport;
    api.fitNode("missing");
    expect(core.toJSON().viewport).toEqual(before);
    core.setCollapsed("start", true);
    core.fitNode("note");
    expect(core.toJSON().viewport).toEqual(before);

    core.setCollapsed("start", false);
    api.fitNode("note");
    expect(core.toJSON().viewport.scale).toBe(20);
    core.addNode({ type: "label", text: "Extra" });
    expect(api.canUndo()).toBe(true);
    wrapper.unmount();
  });

  it("rejects an invalid load without replacing the current diagram", () => {
    const { wrapper, core } = mountEditor();
    const before = core.toJSON();
    expect(() => core.load("{")).toThrow(/not changed/);
    expect(core.toJSON()).toEqual(before);
    expect(() => core.load({ version: "9.0.0", nodes: [], edges: [] })).toThrow(
      /Unsupported flowchart document version/,
    );
    expect(core.toJSON()).toEqual(before);
    wrapper.unmount();
  });

  it("documents the 1.5.0 editor without an infinite-canvas or WCAG claim", () => {
    const wrapper = mount(FlowchartPage, { attachTo: document.body });
    const text = wrapper.text();
    expect(text).toContain("1.5.0");
    expect(text).toContain("1.3.0");
    expect(text).toContain("0.05");
    expect(text).toContain("fitNode");
    expect(text).toContain("canUndo");
    expect(text).toContain("top");
    expect(text).toContain("right");
    expect(text).toContain("bottom");
    expect(text).toContain("left");
    expect(text).toContain("Home / End");
    expect(text).toContain("Cmd/Ctrl+C / X / V");
    expect(text).toContain("aria-hidden");
    expect(text).toContain("not a WCAG conformance claim");
    expect(text).not.toMatch(/unbounded|infinite canvas/i);
    expect(text).not.toMatch(/conforms to WCAG|WCAG\s+2/i);
    expect(wrapper.find("[data-flowchart-demo='overview']").exists()).toBe(
      true,
    );
    expect(wrapper.find("[data-flowchart-demo='detail']").exists()).toBe(true);
    wrapper.unmount();
  });
});

function mountEditor(props: Record<string, unknown> = {}) {
  const wrapper = mount(VdFlowchart, {
    props: {
      data: {
        nodes: [
          {
            id: "a",
            type: "rounded-rect",
            x: 80,
            y: 80,
            width: 160,
            height: 90,
            text: "Step",
          },
        ],
        edges: [],
      },
      ...props,
    },
    attachTo: document.body,
  });
  const api = wrapper.vm as unknown as VdFlowchartExposed;
  const instance = api.getInstance();
  if (!instance) throw new Error("flowchart instance missing");
  return { wrapper, api, core: instance };
}
