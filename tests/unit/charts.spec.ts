import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { VdChart } from "@vanduo-oss/charts/vue";

describe("VdChart (@vanduo-oss/charts/vue integration)", () => {
  it("mounts and renders an SVG into a .vd-chart container", async () => {
    const wrapper = mount(VdChart, {
      props: {
        type: "bar",
        data: [
          { month: "Jan", sales: 10 },
          { month: "Feb", sales: 20 },
        ],
        x: "month",
        y: "sales",
        height: 200,
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".vd-chart").exists()).toBe(true);
    expect(wrapper.find("svg").exists()).toBe(true);
    wrapper.unmount();
  });

  it("renders a donut chart via label/value accessors", async () => {
    const wrapper = mount(VdChart, {
      props: {
        type: "donut",
        data: [
          { channel: "A", revenue: 5 },
          { channel: "B", revenue: 7 },
        ],
        label: "channel",
        value: "revenue",
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find("svg").exists()).toBe(true);
    wrapper.unmount();
  });
});
