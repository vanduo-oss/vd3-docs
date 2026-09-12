<script setup lang="ts">
import type { Component } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import CbunShowcaseRow from "@/components/cbun/CbunShowcaseRow.vue";
import CbunPreviewCharts from "@/components/cbun/CbunPreviewCharts.vue";
import CbunPreviewCodeEditor from "@/components/cbun/CbunPreviewCodeEditor.vue";
import CbunPreviewDraw from "@/components/cbun/CbunPreviewDraw.vue";
import CbunPreviewFlowchart from "@/components/cbun/CbunPreviewFlowchart.vue";
import CbunPreviewHex from "@/components/cbun/CbunPreviewHex.vue";
import CbunPreviewMusic from "@/components/cbun/CbunPreviewMusic.vue";

interface CbunEntry {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  strengths: string[];
  docsTo: string;
  preview: Component;
}

/** Alphabetical showcase order for the optional @vanduo-oss/vd3-cbun widgets. */
const entries: CbunEntry[] = [
  {
    id: "charts",
    title: "Charts",
    icon: "chart-donut",
    blurb:
      "SVG-first charts with WAI-ARIA Graphics 1.0 semantics, keyboard arrow navigation, and WCAG 1.1.1 data table fallback. Reads the same --vd-* theme tokens.",
    strengths: [
      "SVG-first rendering — no canvas, no d3 dependency",
      "WAI-ARIA Graphics 1.0 roles plus keyboard arrow navigation",
      "WCAG 1.1.1 data table fallback for every chart type",
      "Reads the same --vd-* tokens as the rest of vd3",
    ],
    docsTo: "/canvas/charts",
    preview: CbunPreviewCharts,
  },
  {
    id: "code-editor",
    title: "Code editor",
    icon: "code",
    blurb:
      "A lightweight syntax-highlighted editor for docs, playgrounds, and inline snippets — JavaScript, TypeScript, Python, JSON, Markdown, and more.",
    strengths: [
      "First-party highlighter — drop highlight.js for docs snippets",
      "Tokenizer-only subpath for highlight without the editor core",
      "Multi-language support including real Vue SFC tokenization",
      "Lightweight embed for playgrounds and inline examples",
    ],
    docsTo: "/editors/code-editor",
    preview: CbunPreviewCodeEditor,
  },
  {
    id: "draw",
    title: "Draw",
    icon: "pencil-simple",
    blurb:
      "An SVG whiteboard with pressure-aware brushes, shapes, sticky notes, and export. Use it when a page needs freehand sketching without a heavy canvas stack.",
    strengths: [
      "Pressure-aware brushes for freehand sketching",
      "Shapes, sticky notes, and structured export",
      "SVG whiteboard — no heavy canvas stack",
      "Theme-aware chrome that matches vd3 surfaces",
    ],
    docsTo: "/canvas/draw",
    preview: CbunPreviewDraw,
  },
  {
    id: "flowchart",
    title: "Flowchart",
    icon: "flow-arrow",
    blurb:
      "Node-and-edge diagram editing with auto-fit, routing, and theme-aware chrome. Ideal for workflows, architecture sketches, and interactive docs.",
    strengths: [
      "Auto-fit viewport so diagrams stay readable",
      "Orthogonal and curved edge routing",
      "Theme-aware chrome on --vd-* backgrounds",
      "Built for workflows, architecture sketches, and interactive docs",
    ],
    docsTo: "/canvas/flowchart",
    preview: CbunPreviewFlowchart,
  },
  {
    id: "hex-grid",
    title: "Hex grid",
    icon: "hexagon",
    blurb:
      "Axial hex canvases with terrain helpers and pathfinding math. Canvas-based, no CSS bundle — it picks up --vd-* colors from the page.",
    strengths: [
      "Axial hex math with terrain helpers and pathfinding",
      "DPR-aware backing store and viewport culling for large grids",
      "Canvas-based with no CSS bundle to ship",
      "Picks up --vd-* colors from the page theme",
    ],
    docsTo: "/canvas/hex",
    preview: CbunPreviewHex,
  },
  {
    id: "music-player",
    title: "Music player",
    icon: "music-note",
    blurb:
      "An HTML5 audio player with playlist, progress, shuffle, and detachable floating modes — styled to match the rest of the vd3 surface.",
    strengths: [
      "Playlist, progress, and shuffle controls",
      "Detachable floating playback modes",
      "HTML5 audio — no third-party player dependency",
      "Chrome styled to match the rest of the vd3 surface",
    ],
    docsTo: "/media/music-player",
    preview: CbunPreviewMusic,
  },
];

const installShell = `pnpm add @vanduo-oss/vd3-cbun`;
</script>

<template>
  <section id="cbun">
    <div class="about-header">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-package"></i> vd3 Components Bundle
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Auxiliary optional widgets from
          <code>@vanduo-oss/vd3-cbun</code> — install only when a page needs
          charts, editors, or canvas tools.
        </p>
      </div>
    </div>

    <div class="vd-container-responsive cbun-intro">
      <p>
        <strong>CBUN</strong> is the optional companion to
        <code>@vanduo-oss/vd3</code>. Each family lives on its own
        tree-shakeable subpath, so importing one never pulls in another. Scroll
        the showcase below for a live preview of every widget, then open the
        full docs demo.
      </p>
      <DocCodeSnippet
        :shell="installShell"
        toggle-label="Installation"
        :default-open="true"
      />
    </div>

    <div class="vd-container-responsive cbun-showcase">
      <CbunShowcaseRow
        v-for="(entry, index) in entries"
        :key="entry.id"
        :title="entry.title"
        :icon="entry.icon"
        :blurb="entry.blurb"
        :strengths="entry.strengths"
        :docs-to="entry.docsTo"
        :reversed="index % 2 === 1"
      >
        <component :is="entry.preview" />
      </CbunShowcaseRow>
    </div>
  </section>
</template>

<style scoped>
.cbun-intro {
  padding-block: 3.5rem 2.5rem;
  max-width: 48rem;
  margin-inline: auto;
}

.cbun-showcase {
  padding-top: 1rem;
  padding-bottom: 4rem;
}
</style>
