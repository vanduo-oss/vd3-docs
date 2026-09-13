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
    expect(columns).toHaveLength(2);

    const vd3Cards = columns[0].findAll(".version-card");
    expect(headerText(vd3Cards[0])).toContain("v1.7.2");
    expect(headerText(vd3Cards[0])).toContain("Latest");
    expect(headerText(vd3Cards.at(-1)!)).toContain("v1.0.0");
    expect(headerText(vd3Cards.at(-1)!)).toContain("Initial");
    expect(
      vd3Cards.filter((card) => headerText(card).includes("Latest")),
    ).toHaveLength(1);

    expect(columns[0].text()).not.toContain("v1.4.2");

    const cbunCards = columns[1].findAll(".version-card");
    expect(headerText(cbunCards[0])).toContain("v1.4.2");
    expect(headerText(cbunCards[0])).toContain("Latest");
    expect(headerText(cbunCards[1])).toContain("v1.4.1");
    expect(headerText(cbunCards[1])).not.toContain("Latest");
    expect(
      cbunCards.filter((card) => headerText(card).includes("Latest")),
    ).toHaveLength(1);
  });
});
