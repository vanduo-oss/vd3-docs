import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import * as vd3 from "@vanduo-oss/vd3";
import About from "@/pages/about.vue";
import Home from "@/pages/home.vue";
import {
  VD3_COMPONENT_EXPORTS,
  VD3_COMPOSABLE_MODULES,
} from "@/constants/vd3Catalog";

describe("vd3 catalog constants", () => {
  it("matches Vd* default exports on the published barrel", () => {
    const components = Object.keys(vd3).filter((k) => k.startsWith("Vd"));
    expect(components).toHaveLength(VD3_COMPONENT_EXPORTS);
    expect(VD3_COMPONENT_EXPORTS).toBe(63);
    expect(VD3_COMPOSABLE_MODULES).toBe(39);
  });

  it("home and about use the same catalog numbers", () => {
    const home = mount(Home, {
      global: {
        stubs: {
          RouterLink: true,
          HomeOolaSection: true,
          Vd3Mark: true,
        },
      },
    });
    const about = mount(About, {
      global: {
        stubs: {
          Vd3Mark: true,
        },
      },
    });

    expect(home.text()).toContain(
      `${VD3_COMPONENT_EXPORTS} components, ${VD3_COMPOSABLE_MODULES} composables, one install.`,
    );
    expect(about.text()).toContain(`${VD3_COMPONENT_EXPORTS}`);
    expect(about.text()).toContain(`${VD3_COMPOSABLE_MODULES} composables`);
  });
});
