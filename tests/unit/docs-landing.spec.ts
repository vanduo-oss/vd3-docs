import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import DocsLanding from "@/pages/docs-landing.vue";

describe("docs-landing resources", () => {
  it("exposes About, GitHub, NPM, and License with safe external attrs", () => {
    const wrapper = mount(DocsLanding, {
      global: {
        stubs: {
          RouterLink: {
            props: ["to"],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    });

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
});
