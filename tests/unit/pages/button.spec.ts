import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ButtonPage from "@/pages/components/Button.vue";

describe("Button docs page", () => {
  const mountPage = () =>
    mount(ButtonPage, {
      global: {
        stubs: {
          LaunchCustomizerButton: true,
          DocCodeSnippet: true,
        },
      },
    });

  it("renders a 9-cell equal variants grid", () => {
    const wrapper = mountPage();
    const grid = wrapper.get('[data-demo="variants"]');
    expect(grid.classes()).toContain("btn-demo-grid");
    expect(grid.findAll(".vd-btn")).toHaveLength(9);
    wrapper.unmount();
  });

  it("orders ink and loading demos small to large", () => {
    const wrapper = mountPage();
    const ink = wrapper
      .findAll('[data-demo="ink-sizes"] > .vd-btn')
      .map((node) => node.classes());
    expect(ink[0]).toContain("vd-btn-sm");
    expect(ink[1]).not.toContain("vd-btn-sm");
    expect(ink[1]).not.toContain("vd-btn-lg");
    expect(ink[2]).toContain("vd-btn-lg");

    const loading = wrapper
      .findAll('[data-demo="loading-sizes"] > .vd-btn')
      .map((node) => node.classes());
    expect(loading[0]).toContain("vd-btn-sm");
    expect(loading[1]).not.toContain("vd-btn-sm");
    expect(loading[1]).not.toContain("vd-btn-lg");
    expect(loading[2]).toContain("vd-btn-lg");
    wrapper.unmount();
  });
});
