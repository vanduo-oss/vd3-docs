import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import ChangelogPage from "@/pages/changelog.vue";

function headerText(card: { find: (sel: string) => { text: () => string } }) {
  return card.find(".version-header").text();
}

describe("package changelog", () => {
  it("marks one Latest per column and Initial on vd3 1.0.0", () => {
    const wrapper = mount(ChangelogPage, {
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    const columns = wrapper.findAll(".changelog-col");
    expect(columns).toHaveLength(3);

    const vd3Cards = columns[0].findAll(".version-card");
    expect(headerText(vd3Cards[0])).toContain("v1.7.3");
    expect(headerText(vd3Cards[0])).toContain("Latest");
    expect(headerText(vd3Cards[1])).toContain("v1.7.2");
    expect(headerText(vd3Cards[1])).not.toContain("Latest");
    expect(headerText(vd3Cards.at(-1)!)).toContain("v1.0.0");
    expect(headerText(vd3Cards.at(-1)!)).toContain("Initial");
    expect(
      vd3Cards.filter((card) => headerText(card).includes("Latest")),
    ).toHaveLength(1);

    expect(columns[0].text()).not.toContain("@vanduo-oss/vd3-cbun");

    const chartsCards = columns[1].findAll(".version-card");
    expect(headerText(chartsCards[0])).toContain("v1.1.0");
    expect(headerText(chartsCards[0])).toContain("Latest");
    expect(headerText(chartsCards[1])).toContain("v1.0.1");
    expect(headerText(chartsCards[1])).not.toContain("Latest");
    expect(headerText(chartsCards[2])).toContain("v1.0.0");
    expect(headerText(chartsCards[2])).toContain("Initial");
    expect(
      chartsCards.filter((card) => headerText(card).includes("Latest")),
    ).toHaveLength(1);
    expect(columns[1].text()).toContain("@vanduo-oss/vd3-charts");

    const flowchartCards = columns[2].findAll(".version-card");
    expect(headerText(flowchartCards[0])).toContain("v1.2.0");
    expect(headerText(flowchartCards[0])).toContain("Latest");
    expect(headerText(flowchartCards[1])).toContain("v1.2.0");
    expect(headerText(flowchartCards[1])).toContain("Initial");
    expect(headerText(flowchartCards[1])).not.toContain("Latest");
    expect(
      flowchartCards.filter((card) => headerText(card).includes("Latest")),
    ).toHaveLength(1);
    expect(columns[2].text()).toContain("@vanduo-oss/vd3-flowchart");

    expect(wrapper.findAll(".changelog-col-title").map((t) => t.text())).toEqual(
      [
        "@vanduo-oss/vd3",
        "@vanduo-oss/vd3-charts",
        "@vanduo-oss/vd3-flowchart",
      ],
    );
  });
});
