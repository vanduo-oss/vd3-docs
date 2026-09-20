<script setup lang="ts">
import type { Component } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import CbunShowcaseRow from "@/components/cbun/CbunShowcaseRow.vue";
import CbunPreviewCharts from "@/components/cbun/CbunPreviewCharts.vue";
import CbunPreviewFlowchart from "@/components/cbun/CbunPreviewFlowchart.vue";

interface CbunEntry {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  strengths: string[];
  docsTo: string;
  preview: Component;
  installShell: string;
  /** Brief CSS import shown beside the shell tab. */
  installCss: string;
}

/** vd3 line — docs stay on this site. */
const vd3Entries: CbunEntry[] = [
  {
    id: "charts",
    title: "Charts",
    icon: "chart-donut",
    blurb:
      "Six SVG chart types with keyboard navigation, tooltips, and a data table.",
    strengths: [
      "SVG-first rendering — no canvas, no d3 dependency",
      "Labelled marks and keyboard navigation",
      "A data table for every chart type",
      "Reads the same --vd-* tokens as the rest of vd3",
    ],
    docsTo: "/canvas/charts",
    preview: CbunPreviewCharts,
    installShell: `pnpm add @vanduo-oss/vd3-charts`,
    installCss: `import '@vanduo-oss/vd3-charts/css';`,
  },
  {
    id: "flowchart",
    title: "Flowchart",
    icon: "flow-arrow",
    blurb:
      "Edit diagrams with connected nodes, automatic layouts, and undo/redo.",
    strengths: [
      "Auto-fit viewport so diagrams stay readable",
      "Orthogonal and curved edge routing",
      "Theme-aware chrome on --vd-* backgrounds",
      "Built for workflows, architecture sketches, and interactive docs",
    ],
    docsTo: "/canvas/flowchart",
    preview: CbunPreviewFlowchart,
    installShell: `pnpm add @vanduo-oss/vd3-flowchart`,
    installCss: `import '@vanduo-oss/vd3-flowchart/css';`,
  },
];
</script>

<template>
  <section id="cbun">
    <div class="about-header">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-tree-structure"></i> Canvas Components Bundle
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Add data visualization and diagram editing to your Vue app. Both
          packages use Vanduo theme tokens and install separately.
        </p>
      </div>
    </div>

    <div class="vd-container-responsive cbun-showcase">
      <template v-for="(entry, index) in vd3Entries" :key="entry.id">
        <CbunShowcaseRow
          :title="entry.title"
          :icon="entry.icon"
          :blurb="entry.blurb"
          :strengths="entry.strengths"
          :docs-to="entry.docsTo"
          :reversed="index % 2 === 1"
        >
          <component :is="entry.preview" />
        </CbunShowcaseRow>
        <DocCodeSnippet
          class="cbun-install"
          :shell="entry.installShell"
          :js="entry.installCss"
          toggle-label="Installation"
          :default-open="true"
        />
      </template>
    </div>
  </section>
</template>

<style scoped>
.cbun-showcase {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.cbun-install {
  max-width: 48rem;
  margin: -0.5rem 0 2rem;
}
</style>
