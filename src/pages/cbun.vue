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

/** vd3 line — docs stay on this site. */
const vd3Entries: CbunEntry[] = [
  {
    id: "charts",
    title: "Charts",
    icon: "chart-donut",
    blurb:
      "SVG-first charts with WAI-ARIA Graphics 1.0 semantics, keyboard arrow navigation, and WCAG 1.1.1 data table fallback. Also published as @vanduo-oss/vd3-charts — the package these docs dogfood.",
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
    id: "flowchart",
    title: "Flowchart",
    icon: "flow-arrow",
    blurb:
      "Node-and-edge diagram editing with auto-fit, routing, and theme-aware chrome. Also published as @vanduo-oss/vd3-flowchart — the package these docs dogfood.",
    strengths: [
      "Auto-fit viewport so diagrams stay readable",
      "Orthogonal and curved edge routing",
      "Theme-aware chrome on --vd-* backgrounds",
      "Built for workflows, architecture sketches, and interactive docs",
    ],
    docsTo: "/canvas/flowchart",
    preview: CbunPreviewFlowchart,
  },
];

/** vdl line — live previews here; full docs on labs.vanduo.dev. */
const vdlEntries: CbunEntry[] = [
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
    docsTo: "https://labs.vanduo.dev/#widgets/draw",
    preview: CbunPreviewDraw,
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
    docsTo: "https://labs.vanduo.dev/#widgets/code-editor",
    preview: CbunPreviewCodeEditor,
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
    docsTo: "https://labs.vanduo.dev/#widgets/music-player",
    preview: CbunPreviewMusic,
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
    docsTo: "https://labs.vanduo.dev/#widgets/hex",
    preview: CbunPreviewHex,
  },
];

const installShell = `pnpm add @vanduo-oss/vd3-charts @vanduo-oss/vd3-flowchart @vanduo-oss/vdl-cbun`;
</script>

<template>
  <section id="cbun">
    <div class="about-header">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-package"></i> Canvas &amp; media widgets
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Charts and flowchart stay on the vd3 line —
          <code>@vanduo-oss/vd3-charts</code> and
          <code>@vanduo-oss/vd3-flowchart</code> — with full docs on this site.
          Draw, code-editor, hex-grid, and music-player live in
          <code>@vanduo-oss/vdl-cbun</code>; live previews stay here, full
          documentation is on
          <a href="https://labs.vanduo.dev/" rel="noopener noreferrer"
            >labs.vanduo.dev</a
          >.
        </p>
      </div>
    </div>

    <div class="vd-container-responsive cbun-intro">
      <p>
        <strong>CBUN</strong> is the optional companion layer beside
        <code>@vanduo-oss/vd3</code>. Scroll the showcase below — vd3 widgets
        first, then the vdl line — and open Documentation for the full demo.
      </p>
      <DocCodeSnippet
        :shell="installShell"
        toggle-label="Installation"
        :default-open="true"
      />
    </div>

    <div class="vd-container-responsive cbun-showcase">
      <p class="cbun-line-label">vd3</p>
      <CbunShowcaseRow
        v-for="(entry, index) in vd3Entries"
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

      <div class="cbun-separator" role="separator" aria-label="vd3 and vdl">
        <span class="cbun-separator-line" />
        <span class="cbun-separator-label">
          <span>vd3</span>
          <span class="cbun-separator-pipe" aria-hidden="true">|</span>
          <span>vdl</span>
        </span>
        <span class="cbun-separator-line" />
      </div>

      <p class="cbun-line-label">vdl</p>
      <CbunShowcaseRow
        v-for="(entry, index) in vdlEntries"
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

.cbun-line-label {
  margin: 0 0 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vd-text-muted);
}

.cbun-separator {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2.5rem 0 2rem;
}

.cbun-separator-line {
  flex: 1 1 auto;
  height: 1px;
  background: var(--vd-border-color);
}

.cbun-separator-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vd-text-secondary);
}

.cbun-separator-pipe {
  color: var(--vd-color-primary);
  font-weight: 700;
}
</style>
