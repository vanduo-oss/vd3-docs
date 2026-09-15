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

// The repositories that make up the vd3 line.
const repos: [string, string, string][] = [
  [
    "vd3",
    "@vanduo-oss/vd3",
    "The design system and Vue 3 component library. Ships its own DTCG design tokens, the full CSS tree (@vanduo-oss/vd3/css), and typed Vd* components + composables. Standalone — its sole peer dependency is vue >=3.3.",
  ],
  [
    "vd3-charts",
    "@vanduo-oss/vd3-charts",
    "Dedicated SVG charts package (bar, line, area, scatter, donut, pie). Same tokens as vd3. These docs dogfood 1.1.0.",
  ],
  [
    "vd3-flowchart",
    "@vanduo-oss/vd3-flowchart",
    "Dedicated SVG flowchart editor. Same tokens as vd3. These docs dogfood 1.2.0.",
  ],
  [
    "vdl-cbun",
    "@vanduo-oss/vdl-cbun (link: — not on npm)",
    "Labs canvas bundle: code-editor, draw, hex-grid, and music-player, each on its own subpath (hex-grid ships no CSS). Documented on labs.vanduo.dev; this site keeps theme-aware /cbun screenshots.",
  ],
  [
    "vd3-docs",
    "— (not published to npm)",
    "This documentation site. It dogfoods the published packages — every live demo on these pages renders the real shipped component.",
  ],
];

const installVd3 = `# The design system + components (tokens & CSS included)
pnpm add @vanduo-oss/vd3`;

const installCbun = `# Dedicated charts and flowchart packages
pnpm add @vanduo-oss/vd3-charts @vanduo-oss/vd3-flowchart

# Remaining canvas widgets (code-editor / draw / hex-grid / music-player)
# Labs sibling — in package.json:
# "@vanduo-oss/vdl-cbun": "link:../vdl-cbun"`;

const usageJs = `// Components, composables, tokens and CSS all come from one package:
import { VdButton } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';

// Charts and flowchart ship as dedicated packages:
import { VdChart } from '@vanduo-oss/vd3-charts';
import { VdFlowchart } from '@vanduo-oss/vd3-flowchart';

// Remaining canvas widgets come from the labs bundle's per-widget subpaths:
import { VdCodeEditor } from '@vanduo-oss/vdl-cbun/code-editor';
import { VdDraw } from '@vanduo-oss/vdl-cbun/draw';
import { VdHexGrid } from '@vanduo-oss/vdl-cbun/hex-grid';
import { VdMusicPlayer } from '@vanduo-oss/vdl-cbun/music-player';`;
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
      under the <code>@vanduo-oss</code> scope. There is no separate token / CSS
      / JS split to wire together — one component library, dedicated charts and
      flowchart packages, plus an optional canvas bundle, documented by this
      site.
    </p>

    <!-- The vd3 line repos -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-git-branch"></i> The vd3 line</h6>
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
              against both — all inside <code>@vanduo-oss/vd3</code>. Dedicated
              <code>@vanduo-oss/vd3-charts</code> and
              <code>@vanduo-oss/vd3-flowchart</code> packages sit alongside it
              for those widgets; <code>@vanduo-oss/vdl-cbun</code> covers the
              remaining canvas tools (docs on
              <a href="https://labs.vanduo.dev/" rel="noopener noreferrer"
                >labs</a
              >). <RouterLink to="/cbun">Browse the CBUN showcase</RouterLink>.
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
              Start with the design system; add charts, flowchart, or the
              remaining canvas bundle only if you need them:
            </p>
            <DocCodeSnippet :shell="installVd3" :default-open="true" />
            <DocCodeSnippet
              class="vd-mt-3"
              :shell="installCbun"
              :default-open="true"
            />
            <p class="vd-mt-5 vd-mb-3">
              Then import from the packages you need:
            </p>
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
