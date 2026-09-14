import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { VdCodeEditor } from "@vanduo-oss/vdl-cbun/code-editor";

beforeAll(() => {
  if (typeof (globalThis as { ResizeObserver?: unknown }).ResizeObserver === "undefined") {
    (globalThis as { ResizeObserver?: unknown }).ResizeObserver = class {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    };
  }
});

describe("VdCodeEditor (@vanduo-oss/vdl-cbun/code-editor integration in docs)", () => {
  it("mounts with Vue language and renders the editor shell", async () => {
    const wrapper = mount(VdCodeEditor, {
      props: {
        modelValue: "const x = 1;\n",
        language: "javascript",
        lineNumbers: true,
        autoClose: true,
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".vd-code-editor").exists()).toBe(true);
    expect(wrapper.find("textarea").exists()).toBe(true);
    wrapper.unmount();
  });
});
