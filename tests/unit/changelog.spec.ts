import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import ChangelogPage from "@/pages/changelog.vue";

describe("package changelog", () => {
  it("marks cbun 1.4.2 latest in the cbun column only", () => {
    const wrapper = mount(ChangelogPage, {
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    const columns = wrapper.findAll(".changelog-col");
    expect(columns).toHaveLength(2);

    expect(columns[0].text()).not.toContain("v1.4.2");
    expect(columns[1].find(".version-card").text()).toContain("v1.4.2");
    expect(columns[1].find(".version-card").text()).toContain("Latest");
    expect(columns[1].text()).toContain("v1.4.1");
  });
});
