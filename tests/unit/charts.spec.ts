import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { VdChart } from "@vanduo-oss/vd3-cbun/charts";

describe("VdChart (@vanduo-oss/vd3-cbun/charts integration)", () => {
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

    // WAI-ARIA Graphics semantics
    const svg = wrapper.find("svg");
    expect(svg.attributes("role")).toBe("graphics-document document");
    expect(svg.attributes("aria-roledescription")).toBe("bar chart");

    wrapper.unmount();
  });

  it("renders an accessible HTML data table when dataTable: 'visible'", async () => {
    const wrapper = mount(VdChart, {
      props: {
        type: "bar",
        data: [
          { month: "Jan", sales: 10 },
          { month: "Feb", sales: 20 },
        ],
        x: "month",
        y: "sales",
        dataTable: "visible",
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();

    const table = wrapper.find("table.vd-chart-data-table");
    expect(table.exists()).toBe(true);
    expect(table.classes()).not.toContain("vd-chart-sr-only");
    expect(table.find("caption").text()).toContain("bar chart data");

    const rows = table.findAll("tbody tr");
    expect(rows).toHaveLength(2);

    wrapper.unmount();
  });

  it("keeps root role fallthrough separate from the SVG role override", async () => {
    const wrapper = mount(VdChart, {
      props: {
        type: "bar",
        data: [{ month: "Jan", sales: 10 }],
        x: "month",
        y: "sales",
        svgRole: "graphics-object",
      },
      attrs: { role: "region" },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.attributes("role")).toBe("region");
    expect(wrapper.find("svg").attributes("role")).toBe("graphics-object");

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
    const svg = wrapper.find("svg");
    expect(svg.attributes("aria-roledescription")).toBe("donut chart");
    wrapper.unmount();
  });
});
