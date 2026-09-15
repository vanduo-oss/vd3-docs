<script setup lang="ts">
import type { Component } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import CbunShowcaseRow from "@/components/cbun/CbunShowcaseRow.vue";
import CbunPreviewCharts from "@/components/cbun/CbunPreviewCharts.vue";
import CbunPreviewFlowchart from "@/components/cbun/CbunPreviewFlowchart.vue";
import CbunVdlRow from "@/components/cbun/CbunVdlRow.vue";

interface CbunEntry {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  strengths: string[];
  docsTo: string;
  preview: Component;
}

interface VdlShotEntry {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  lightSrc: string;
  darkSrc: string;
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

/** vdl line — theme-aware screenshots; full docs on labs.vanduo.dev. */
const vdlEntries: VdlShotEntry[] = [
  {
    id: "draw",
    title: "Draw",
    icon: "pencil-simple",
    blurb:
      "SVG whiteboard with pressure-aware brushes, shapes, sticky notes, and export — freehand sketching without a heavy canvas stack.",
    lightSrc: "images/cbun/draw-light.png",
    darkSrc: "images/cbun/draw-dark.png",
  },
  {
    id: "hex",
    title: "Hex grid",
    icon: "hexagon",
    blurb:
      "Axial hex canvases with terrain helpers and pathfinding. Canvas-based, no CSS bundle — picks up --vd-* colors from the page.",
    lightSrc: "images/cbun/hex-light.png",
    darkSrc: "images/cbun/hex-dark.png",
  },
  {
    id: "music-player",
    title: "Music player",
    icon: "music-note",
    blurb:
      "HTML5 audio with playlist, progress, shuffle, and detachable floating modes — styled to match the vd3 surface.",
    lightSrc: "images/cbun/music-player-light.png",
    darkSrc: "images/cbun/music-player-dark.png",
  },
  {
    id: "code-editor",
    title: "Code editor",
    icon: "code",
    blurb:
      "Lightweight syntax-highlighted editor for docs and playgrounds — JS, TS, Python, JSON, Markdown, Vue SFC, and more.",
    lightSrc: "images/cbun/code-editor-light.png",
    darkSrc: "images/cbun/code-editor-dark.png",
  },
];

const vdlLinks = [
  {
    href: "https://labs.vanduo.dev/#widgets",
    label: "Labs widgets",
    icon: "squares-four",
  },
  {
    href: "https://github.com/vanduo-oss/labs",
    label: "Labs on GitHub",
    icon: "github-logo",
  },
  {
    href: "https://github.com/vanduo-oss/vdl-cbun",
    label: "vdl-cbun on GitHub",
    icon: "package",
  },
] as const;

const installShell = `pnpm add @vanduo-oss/vd3-charts @vanduo-oss/vd3-flowchart
# Labs sibling — "@vanduo-oss/vdl-cbun": "link:../vdl-cbun"`;
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
          Draw, hex-grid, music-player, and code-editor live in
          <code>@vanduo-oss/vdl-cbun</code>; screenshots are here, full
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
        first (live demos), then the vdl line (theme-aware screenshots).
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
      <div class="cbun-vdl-stack">
        <CbunVdlRow
          v-for="entry in vdlEntries"
          :key="entry.id"
          :title="entry.title"
          :icon="entry.icon"
          :blurb="entry.blurb"
          :light-src="entry.lightSrc"
          :dark-src="entry.darkSrc"
        />
      </div>
      <nav class="cbun-vdl-links" aria-label="vdl resources">
        <a
          v-for="link in vdlLinks"
          :key="link.href"
          :href="link.href"
          class="vd-btn vd-btn-outline"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i :class="`ph ph-${link.icon}`"></i>
          {{ link.label }}
        </a>
      </nav>
    </div>

    <div class="vd-container-responsive cbun-why">
      <h3>Why the split?</h3>
      <div class="cbun-why-contrast" role="list">
        <div class="cbun-why-card" role="listitem">
          <p class="cbun-why-card-label">vd3</p>
          <p class="cbun-why-card-body">
            Published on npm, documented here, kept in focus.
          </p>
        </div>
        <div class="cbun-why-card" role="listitem">
          <p class="cbun-why-card-label">vdl / Labs</p>
          <p class="cbun-why-card-body">
            Best-effort — no promise of steady updates.
          </p>
        </div>
      </div>
      <p>
        Attention is limited. Charts and flowchart stay on the
        <strong>vd3</strong> line — <code>@vanduo-oss/vd3-charts</code> and
        <code>@vanduo-oss/vd3-flowchart</code> — because that is the set we can
        keep in proper focus: reviewed, documented on this site, and published
        on npm.
      </p>
      <p>
        The rest of the canvas work lives in <strong>Labs</strong>. Draw, hex
        grid, music player, and code editor in
        <code>@vanduo-oss/vdl-cbun</code> are real and usable, but there is no
        promise they will keep pace. Treat them as best-effort: screenshots
        here, full docs on
        <a href="https://labs.vanduo.dev/" rel="noopener noreferrer"
          >labs.vanduo.dev</a
        >, source on GitHub.
      </p>
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
  padding-bottom: 2rem;
}

.cbun-why {
  max-width: 48rem;
  margin-inline: auto;
  padding-block: 2rem 4rem;
  border-top: 1px solid var(--vd-border-color);
}

.cbun-why h3 {
  margin: 0 0 1.25rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vd-color-primary);
}

.cbun-why p {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--vd-text-secondary);
}

.cbun-why p:last-child {
  margin-bottom: 0;
}

.cbun-why strong {
  color: var(--vd-text-primary);
}

.cbun-why a {
  color: var(--vd-color-primary);
  text-decoration: underline;
}

.cbun-why-contrast {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.cbun-why-card {
  padding: 0.875rem 1rem;
  border: 1px solid var(--vd-border-color);
  border-radius: var(--vd-radius-md, 0.5rem);
  background: var(--vd-bg-secondary);
}

.cbun-why-card-label {
  margin: 0 0 0.35rem !important;
  font-size: 0.75rem !important;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vd-text-muted) !important;
}

.cbun-why-card-body {
  margin: 0 !important;
  font-size: 0.9375rem !important;
  line-height: 1.5 !important;
  color: var(--vd-text-secondary);
}

@media (max-width: 575.98px) {
  .cbun-why-contrast {
    grid-template-columns: 1fr;
  }

  .cbun-why h3 {
    font-size: 1.2rem;
  }

  .cbun-why p {
    font-size: 0.95rem;
  }
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

.cbun-vdl-stack {
  max-width: 52rem;
}

.cbun-vdl-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 0.25rem;
}
</style>
