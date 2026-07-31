import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Vd3BrandMark from "@/components/Vd3BrandMark.vue";

describe("Vd3BrandMark", () => {
  it("renders an inline vd3 mark SVG, not an img", () => {
    const wrapper = mount(Vd3BrandMark, { props: { size: "2.25rem" } });
    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.find("svg.vd3-mark").exists()).toBe(true);
  });

  it("passes the size prop through to Vd3Mark", () => {
    const wrapper = mount(Vd3BrandMark, { props: { size: "3.25rem" } });
    const svg = wrapper.find("svg.vd3-mark");
    expect(svg.attributes("style")).toContain("3.25rem");
  });
});
