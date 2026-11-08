import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import DocsLanding from "@/pages/docs-landing.vue";
import {
  VD3_COMPONENT_EXPORTS,
  VD3_COMPOSABLE_MODULES,
} from "@/constants/vd3Catalog";
import { nav } from "@/nav";

const mountLanding = () =>
  mount(DocsLanding, {
    global: {
      stubs: {
        Teleport: true,
        RouterLink: {
          props: ["to"],
          template: '<a :href="to"><slot /></a>',
        },
      },
    },
  });

describe("docs-landing resources", () => {
  it("exposes About, GitHub, NPM, and License with safe external attrs and multi-package modals", async () => {
    const wrapper = mountLanding();

    const resourcesNav = wrapper.find('nav[aria-label="Resources"]');
    expect(resourcesNav.exists()).toBe(true);
    expect(resourcesNav.text()).toContain("About");
    expect(resourcesNav.text()).toContain("GitHub");
    expect(resourcesNav.text()).toContain("NPM");
    expect(resourcesNav.text()).toContain("License");

    const externals = resourcesNav.findAll('a[target="_blank"]');
    expect(externals.length).toBe(3);
    for (const link of externals) {
      expect(link.attributes("rel")).toBe("noopener");
    }

    // Clicking GitHub opens the multi-package GitHub repositories modal
    await resourcesNav.find('[data-resource-modal="github"]').trigger("click");
    const githubDialog = wrapper.find('[role="dialog"]');
    expect(githubDialog.exists()).toBe(true);
    expect(githubDialog.classes()).not.toContain("vd-modal-glass");
    expect(githubDialog.findAll(".docs-landing-modal-pkg").length).toBe(3);
    expect(
      githubDialog.find(".vd-modal-footer button.vd-btn-outline").exists(),
    ).toBe(true);
    expect(githubDialog.text()).toContain("@vanduo-oss/vd3");
    expect(githubDialog.text()).toContain("@vanduo-oss/vd3-charts");
    expect(githubDialog.text()).toContain("@vanduo-oss/vd3-flowchart");
    expect(
      githubDialog.find('a[href="https://github.com/vanduo-oss"]').exists(),
    ).toBe(true);
    for (const link of githubDialog.findAll('a[target="_blank"]')) {
      expect(link.attributes("rel")).toBe("noopener");
    }

    // Clicking NPM opens the multi-package npm modal
    await resourcesNav.find('[data-resource-modal="npm"]').trigger("click");
    const npmDialog = wrapper.find('[role="dialog"]');
    expect(npmDialog.exists()).toBe(true);
    expect(npmDialog.text()).toContain("pnpm add @vanduo-oss/vd3");
    expect(npmDialog.text()).toContain("pnpm add @vanduo-oss/vd3-charts");
    expect(npmDialog.text()).toContain("pnpm add @vanduo-oss/vd3-flowchart");
    expect(
      npmDialog
        .find('a[href="https://www.npmjs.com/org/vanduo-oss"]')
        .exists(),
    ).toBe(true);
    for (const link of npmDialog.findAll('a[target="_blank"]')) {
      expect(link.attributes("rel")).toBe("noopener");
    }

    // Clicking License opens the MIT license modal for all 3 packages
    await resourcesNav.find('[data-resource-modal="license"]').trigger("click");
    const licenseDialog = wrapper.find('[role="dialog"]');
    expect(licenseDialog.exists()).toBe(true);
    expect(licenseDialog.text()).toContain("MIT License");
    expect(
      licenseDialog
        .find('a[href="https://github.com/vanduo-oss/vd3/blob/main/LICENSE"]')
        .exists(),
    ).toBe(true);
    expect(
      licenseDialog
        .find(
          'a[href="https://github.com/vanduo-oss/vd3-charts/blob/main/LICENSE"]',
        )
        .exists(),
    ).toBe(true);
    expect(
      licenseDialog
        .find(
          'a[href="https://github.com/vanduo-oss/vd3-flowchart/blob/main/LICENSE"]',
        )
        .exists(),
    ).toBe(true);
    for (const link of licenseDialog.findAll('a[target="_blank"]')) {
      expect(link.attributes("rel")).toBe("noopener");
    }
  });

  it("uses package export count for components, presents all 3 packages, and uses nav counts for pages", () => {
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
    expect(wrapper.find("#docs-component-count").text()).toContain(
      `${VD3_COMPOSABLE_MODULES} composables`,
    );
    expect(wrapper.find("#docs-component-count").text()).not.toContain("47+");
    expect(wrapper.text()).toContain("@vanduo-oss/vd3-charts");
    expect(wrapper.text()).toContain("@vanduo-oss/vd3-flowchart");
    expect(wrapper.text()).toContain(`${referenceCount} reference pages`);
    expect(wrapper.text()).toContain(`${guideCount} guided walkthroughs`);
    expect(wrapper.text()).toContain(`Documentation v${__APP_VERSION__}`);
    expect(wrapper.text()).toContain(
      "Latest: vd3 1.8.2 · charts 1.2.0 · flowchart 1.6.0",
    );
  });
});
