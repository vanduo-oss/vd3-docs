<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

const nextLinks = [
  {
    to: "/guides/getting-started",
    icon: "ph-rocket-launch",
    title: "Getting started",
    desc: "Scaffold a Vue app and add vd3 in a few minutes.",
    badge: "Guide",
  },
  {
    to: "/guides/framework-integration",
    icon: "ph-download",
    title: "Installation & integration",
    desc: "Install the packages and wire the VanduoVue plugin.",
    badge: "Guide",
  },
  {
    to: "/guides/runtime-architecture",
    icon: "ph-stack",
    title: "vd3 architecture",
    desc: "Tokens → generated CSS → components & composables.",
    badge: "Guide",
  },
  {
    to: "/guides/hybrid-search",
    icon: "ph-brain",
    title: "Hybrid search",
    desc: "Fuse + in-browser semantic search with vdl-hybrid-search.",
    badge: "Guide",
  },
  {
    to: "/components/global-search",
    icon: "ph-magnifying-glass-plus",
    title: "Global search",
    desc: "VdGlobalSearch palette wired to an injected adapter.",
    badge: "Component",
  },
];

// The three repositories that make up the vd3 line.
const repos: [string, string, string][] = [
  [
    "vd3",
    "@vanduo-oss/vd3",
    "The design system and Vue 3 component library. Ships its own DTCG design tokens, the full CSS tree (@vanduo-oss/vd3/css), and typed Vd* components + composables. Standalone — its sole peer dependency is vue >=3.3.",
  ],
  [
    "vd3-cbun",
    "@vanduo-oss/vd3-cbun",
    "The canvas bundle: charts, code-editor, draw, flowchart, hex-grid, and music-player, each on its own subpath (hex-grid ships no CSS). Install it only when a page needs a canvas widget; it shares the same tokens and theme as vd3.",
  ],
  [
    "vd3-docs",
    "— (not published to npm)",
    "This documentation site. It dogfoods both packages — every live demo on these pages renders the real shipped component.",
  ],
];

const installVd3 = `# The design system + components (tokens & CSS included)
pnpm add @vanduo-oss/vd3`;

const installCbun = `# Optional — canvas widgets (charts / code-editor / draw / flowchart / hex-grid / music-player)
pnpm add @vanduo-oss/vd3-cbun`;

const usageJs = `// Components, composables, tokens and CSS all come from one package:
import { VdButton } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';

// Canvas widgets come from the bundle's per-widget subpaths:
import { VdChart } from '@vanduo-oss/vd3-cbun/charts';
import { VdCodeEditor } from '@vanduo-oss/vd3-cbun/code-editor';
import { VdDraw } from '@vanduo-oss/vd3-cbun/draw';
import { VdFlowchart } from '@vanduo-oss/vd3-cbun/flowchart';
import { VdHexGrid } from '@vanduo-oss/vd3-cbun/hex-grid';
import { VdMusicPlayer } from '@vanduo-oss/vd3-cbun/music-player';`;
</script>

<template>
  <section id="vd3-ecosystem">
    <h5 class="demo-title">
      <i class="ph ph-planet"></i>vd3 ecosystem
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      <strong>vd3</strong> is the Vue 3 design system from
      <code>vanduo-oss</code>, shipped as a small, standalone set of packages
      under the <code>@vanduo-oss</code> scope. There is no separate token /
      CSS / JS split to wire together — one component library, plus one optional
      canvas bundle, documented by this site.
    </p>

    <!-- The three repos -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-git-branch"></i> Three repositories</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Repo</th>
                    <th>Package</th>
                    <th>What it is</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in repos" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>
                      <code>{{ row[1] }}</code>
                    </td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Design tokens generate the CSS, the CSS is themed by the same
              tokens, and the <code>Vd*</code> components and composables render
              against both — all inside <code>@vanduo-oss/vd3</code>.
              <code>@vanduo-oss/vd3-cbun</code> sits alongside it for the
              heavier canvas widgets.
              <RouterLink to="/cbun">Browse the CBUN showcase</RouterLink>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Install -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-package"></i> Install</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-3">
              Start with the design system; add the canvas bundle only if you
              need it:
            </p>
            <DocCodeSnippet :shell="installVd3" :default-open="true" />
            <DocCodeSnippet
              class="vd-mt-3"
              :shell="installCbun"
              :default-open="true"
            />
            <p class="vd-mt-5 vd-mb-3">Then import from the two packages:</p>
            <DocCodeSnippet :js="usageJs" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <GuideLinkCards
      icon="ph-compass"
      title="Where to go next"
      :links="nextLinks"
    />
  </section>
</template>
