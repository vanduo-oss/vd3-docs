import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import DockPage from "@/pages/components/Dock.vue";
import { highlightCode } from "@/utils/highlight";

const vueSfc = `<script setup lang="ts">
import { VdDock } from "@vanduo-oss/vd3";
</script>

<template>
  <VdDock position="contained" />
</template>`;

describe("DocCodeSnippet vue tab", () => {
  it("maps vue to highlight.js xml (not the unknown-key fallback)", () => {
    const html = highlightCode('<VdDock tint="green" />', "vue");
    expect(html).toContain("hljs-tag");
    expect(html).not.toBe("&lt;VdDock tint=&quot;green&quot; /&gt;");
  });

  it("renders a non-empty Vue tab from the vue prop", async () => {
    const wrapper = mount(DocCodeSnippet, {
      props: { vue: vueSfc, defaultOpen: true },
    });
    const tab = wrapper.find('[role="tab"][data-lang="vue"]');
    expect(tab.exists()).toBe(true);
    expect(tab.text()).toBe("Vue");
    const pane = wrapper.find('pre.vd-code-snippet-pane[data-lang="vue"]');
    expect(pane.exists()).toBe(true);
    expect(pane.text()).toContain("VdDock");
    expect(pane.text()).toContain("position");
  });
});

describe("Dock page View Code snippets", () => {
  it("passes non-empty Vue SFCs to both DocCodeSnippet instances", () => {
    const wrapper = mount(DockPage, {
      global: {
        stubs: {
          VdDock: true,
          VdDockItem: true,
          VdIcon: true,
          VdThemeSwitcher: true,
          OolaUMark: true,
        },
      },
    });
    const snippets = wrapper.findAllComponents(DocCodeSnippet);
    expect(snippets).toHaveLength(2);
    for (const snippet of snippets) {
      const vue = snippet.props("vue") as string;
      expect(vue).toContain("<VdDock");
      expect(vue).toContain("</template>");
      const tab = snippet.find('[role="tab"][data-lang="vue"]');
      expect(tab.exists()).toBe(true);
      expect(tab.text()).toBe("Vue");
      expect(snippet.find('pre[data-lang="vue"]').text()).toContain("VdDock");
    }
    wrapper.unmount();
  });
});
