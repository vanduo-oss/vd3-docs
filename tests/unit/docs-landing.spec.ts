import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import DocsLanding from "@/pages/docs-landing.vue";
import { VD3_COMPONENT_EXPORTS } from "@/constants/vd3Catalog";
import { nav } from "@/nav";

const mountLanding = () =>
  mount(DocsLanding, {
    global: {
      stubs: {
        RouterLink: {
          props: ["to"],
          template: '<a :href="to"><slot /></a>',
        },
      },
    },
  });

describe("docs-landing resources", () => {
  it("exposes About, GitHub, NPM, and License with safe external attrs", () => {
    const wrapper = mountLanding();

    const nav = wrapper.find('nav[aria-label="Resources"]');
    expect(nav.exists()).toBe(true);
    expect(nav.text()).toContain("About");
    expect(nav.text()).toContain("GitHub");
    expect(nav.text()).toContain("NPM");
    expect(nav.text()).toContain("License");

    const externals = nav.findAll('a[target="_blank"]');
    expect(externals.length).toBe(3);
    for (const link of externals) {
      expect(link.attributes("rel")).toBe("noopener");
    }
  });

  it("uses package export count for components and nav counts for pages", () => {
    const wrapper = mountLanding();
    const componentsTab = nav.tabs.find((t) => t.id === "components");
    const guideCount =
      componentsTab?.categories.find((c) => c.id === "guides")?.sections
        .length ?? 0;
    const referenceCount =
      componentsTab?.categories
        .filter((c) => c.id !== "guides")
        .reduce((n, c) => n + c.sections.length, 0) ?? 0;

    expect(wrapper.find("#docs-component-count").text()).toContain(
      `${VD3_COMPONENT_EXPORTS} components`,
    );
    expect(wrapper.find("#docs-component-count").text()).not.toContain("47+");
    expect(wrapper.text()).toContain(`${referenceCount} reference pages`);
    expect(wrapper.text()).toContain(`${guideCount} guided walkthroughs`);
    expect(wrapper.text()).toContain(`Documentation v${__APP_VERSION__}`);
    expect(wrapper.text()).toContain(
      "Latest: vd3 1.7.4 · charts 1.1.1 · flowchart 1.3.0",
    );
  });
});
