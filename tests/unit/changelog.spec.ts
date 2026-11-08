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
    expect(vd3Cards[0].attributes("id")).toBe("vd3-1-8-2");
    expect(headerText(vd3Cards[0])).toContain("v1.8.2");
    expect(headerText(vd3Cards[0])).toContain("November 2026");
    expect(vd3Cards[0].text()).not.toContain("not published");
    expect(vd3Cards[0].text()).not.toContain("release candidate");
    expect(headerText(vd3Cards[0])).toContain("Latest");
    expect(vd3Cards[0].text()).toContain("fontOptions");
    expect(vd3Cards[0].text()).toContain("useDatepicker");
    expect(vd3Cards[0].text()).toContain(".vd-sidenav-body");
    expect(vd3Cards[0].text()).toContain("useWaypoint");
    expect(vd3Cards[1].attributes("id")).toBe("vd3-1-8-1");
    expect(headerText(vd3Cards[1])).toContain("v1.8.1");
    expect(headerText(vd3Cards[1])).toContain("November 2026");
    expect(headerText(vd3Cards[1])).not.toContain("Latest");
    expect(vd3Cards[1].text()).toContain("VdImageBox");
    expect(vd3Cards[1].text()).toContain("useDockBrandSpin");
    expect(vd3Cards[1].text()).toContain("@layer vd3");
    expect(vd3Cards[2].attributes("id")).toBe("vd3-1-8-0");
    expect(headerText(vd3Cards[2])).toContain("v1.8.0");
    expect(headerText(vd3Cards[2])).toContain("October 2026");
    expect(headerText(vd3Cards[2])).not.toContain("Latest");
    expect(vd3Cards[3].attributes("id")).toBe("vd3-1-7-6");
    expect(headerText(vd3Cards[3])).toContain("v1.7.6");
    expect(headerText(vd3Cards[3])).not.toContain("Latest");
    expect(vd3Cards[4].attributes("id")).toBe("vd3-1-7-5");
    expect(headerText(vd3Cards[4])).toContain("v1.7.5");
    expect(headerText(vd3Cards[4])).not.toContain("Latest");
    expect(headerText(vd3Cards[5])).toContain("v1.7.4");
    expect(headerText(vd3Cards[5])).not.toContain("Latest");
    expect(headerText(vd3Cards.at(-1)!)).toContain("v1.0.0");
    expect(headerText(vd3Cards.at(-1)!)).toContain("Initial");
    expect(
      vd3Cards.filter((card) => headerText(card).includes("Latest")),
    ).toHaveLength(1);

    expect(columns[0].text()).not.toContain("@vanduo-oss/vd3-cbun");

    const chartsCards = columns[1].findAll(".version-card");
    expect(chartsCards[0].attributes("id")).toBe("charts-1-2-0");
    expect(headerText(chartsCards[0])).toContain("v1.2.0");
    expect(headerText(chartsCards[0])).toContain("November 2026");
    expect(headerText(chartsCards[0])).toContain("Latest");
    expect(chartsCards[0].text()).toContain("centerLabel");
    expect(chartsCards[0].text()).toContain("MutationObserver");
    expect(chartsCards[0].text()).toContain("xScale: 'band'");
    expect(chartsCards[0].text()).toContain("Multi-series area honors");
    expect(chartsCards[0].text()).toContain("Right-side legends reserve");
    expect(chartsCards[0].text()).toContain("coalesces");
    expect(chartsCards[0].text()).toContain("update()");
    expect(headerText(chartsCards[1])).toContain("v1.1.1");
    expect(headerText(chartsCards[1])).not.toContain("Latest");
    expect(headerText(chartsCards[2])).toContain("v1.1.0");
    expect(headerText(chartsCards[2])).not.toContain("Latest");
    expect(headerText(chartsCards[3])).toContain("v1.0.1");
    expect(headerText(chartsCards[3])).not.toContain("Latest");
    expect(headerText(chartsCards.at(-1)!)).toContain("v1.0.0");
    expect(headerText(chartsCards.at(-1)!)).toContain("Initial");
    expect(
      chartsCards.filter((card) => headerText(card).includes("Latest")),
    ).toHaveLength(1);
    expect(columns[1].text()).toContain("@vanduo-oss/vd3-charts");

    const flowchartCards = columns[2].findAll(".version-card");
    expect(flowchartCards[0].attributes("id")).toBe("flowchart-1-6-0");
    expect(headerText(flowchartCards[0])).toContain("v1.6.0");
    expect(headerText(flowchartCards[0])).toContain("November 2026");
    expect(headerText(flowchartCards[0])).toContain("Latest");
    expect(flowchartCards[0].text()).toContain("FLOWCHART_COLOR_PRESETS");
    expect(flowchartCards[0].text()).toContain("1.3.0");
    expect(flowchartCards[1].attributes("id")).toBe("flowchart-1-5-1");
    expect(headerText(flowchartCards[1])).toContain("v1.5.1");
    expect(headerText(flowchartCards[1])).toContain("November 2026");
    expect(headerText(flowchartCards[1])).not.toContain("Latest");
    expect(flowchartCards[1].text()).toContain("silhouette");
    expect(flowchartCards[1].text()).toContain("1.3.0");
    expect(flowchartCards[2].attributes("id")).toBe("flowchart-1-5-0");
    expect(headerText(flowchartCards[2])).toContain("v1.5.0");
    expect(headerText(flowchartCards[2])).toContain("October 2026");
    expect(headerText(flowchartCards[2])).not.toContain("Latest");
    expect(flowchartCards[2].text()).toContain("fitNode");
    expect(flowchartCards[2].text()).toContain("240,000");
    expect(headerText(flowchartCards[3])).toContain("v1.4.0");
    expect(headerText(flowchartCards[3])).not.toContain("Latest");
    expect(headerText(flowchartCards[4])).toContain("v1.3.0");
    expect(headerText(flowchartCards[4])).not.toContain("Latest");
    expect(headerText(flowchartCards[5])).toContain("v1.2.0");
    expect(headerText(flowchartCards[5])).not.toContain("Latest");
    expect(headerText(flowchartCards.at(-1)!)).toContain("v1.2.0");
    expect(headerText(flowchartCards.at(-1)!)).toContain("Initial");
    expect(
      flowchartCards.filter((card) => headerText(card).includes("Latest")),
    ).toHaveLength(1);
    expect(columns[2].text()).toContain("@vanduo-oss/vd3-flowchart");

    expect(
      wrapper.findAll(".changelog-col-title").map((t) => t.text()),
    ).toEqual([
      "@vanduo-oss/vd3",
      "@vanduo-oss/vd3-charts",
      "@vanduo-oss/vd3-flowchart",
    ]);
  });

  it("enforces uniform card structure, shipped Phosphor icons, unique IDs, and RouterLinks across all entries", () => {
    const wrapper = mount(ChangelogPage, {
      global: { stubs: { RouterLink: RouterLinkStub } },
    });

    expect(wrapper.findAll(".ph-bold")).toHaveLength(0);

    const allCards = wrapper.findAll(".version-card");
    expect(allCards.length).toBeGreaterThanOrEqual(28);

    const seenIds = new Set<string>();
    for (const card of allCards) {
      const id = card.attributes("id") ?? "";
      expect(id).toMatch(/^(vd3|charts|flowchart)-\d+-\d+-\d+(-initial)?$/);
      expect(seenIds.has(id)).toBe(false);
      seenIds.add(id);

      const header = card.find(".version-header");
      expect(header.exists()).toBe(true);
      expect(header.find("i.ph.ph-calendar").exists()).toBe(true);
      expect(header.text()).toMatch(
        /(January|February|March|April|May|June|July|August|September|October|November|December) 202\d\b/,
      );

      const body = card.find(".version-body");
      expect(body.exists()).toBe(true);
      expect(body.find("p.vd-text-muted").exists()).toBe(true);

      const groups = body.findAll(".change-group");
      expect(groups.length).toBeGreaterThanOrEqual(1);
      for (const group of groups) {
        expect(group.find("h5").exists()).toBe(true);
        expect(group.find("ul.change-list").exists()).toBe(true);
      }

      const allUls = body.findAll("ul");
      expect(allUls.length).toBe(groups.length);
      for (const ul of allUls) {
        expect(ul.classes()).toContain("change-list");
      }

      const allLis = body.findAll("li");
      expect(allLis.length).toBeGreaterThanOrEqual(1);
      for (const li of allLis) {
        expect(li.classes()).toContain("change-item");
        expect(li.find("i.ph").exists()).toBe(true);
        expect(li.find("strong").exists()).toBe(true);
        expect(li.find("p").exists()).toBe(true);
      }

      const links = card.findAllComponents(RouterLinkStub);
      expect(links.length).toBeGreaterThanOrEqual(1);
      for (const link of links) {
        expect(String(link.props("to"))).toMatch(/^\//);
      }
    }
  });
});
