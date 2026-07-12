<script setup lang="ts">
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
    to: "/guides/migration",
    icon: "ph-arrows-down-up",
    title: "Migrating from v2",
    desc: "Move a vanduo v2 app across to the vd3 line.",
    badge: "Guide",
  },
  {
    to: "/guides/runtime-architecture",
    icon: "ph-stack",
    title: "vd3 architecture",
    desc: "Tokens → generated CSS → components & composables.",
    badge: "Guide",
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
    "The canvas bundle: charts, flowchart, hex-grid, and music-player, each on its own subpath. Install it only when a page needs a canvas widget; it shares the same tokens and theme as vd3.",
  ],
  [
    "vd3-docs",
    "— (not published to npm)",
    "This documentation site. It dogfoods both packages — every live demo on these pages renders the real shipped component.",
  ],
];

const installVd3 = `# The design system + components (tokens & CSS included)
pnpm add @vanduo-oss/vd3`;

const installCbun = `# Optional — the canvas widgets (charts / flowchart / hex-grid / music-player)
pnpm add @vanduo-oss/vd3-cbun`;

const usageJs = `// Components, composables, tokens and CSS all come from one package:
import { VdButton } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';

// Canvas widgets come from the bundle's per-widget subpaths:
import { VdChart } from '@vanduo-oss/vd3-cbun/charts';
import { VdFlowchart } from '@vanduo-oss/vd3-cbun/flowchart';`;
</script>

<template>
  <section id="vanduo-ecosystem">
    <h5 class="demo-title">
      <i class="ph ph-planet"></i>The vd3 Line
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      <strong>vd3</strong> is the Vue-3-only line of Vanduo, shipped as a small,
      standalone set of packages under the <code>@vanduo-oss</code> scope. There
      is no separate token / CSS / JS split to wire together — one component
      library, plus one optional canvas bundle, documented by this site.
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

    <!-- Maintenance note -->
    <div class="vd-card demo-card ecosystem-legacy vd-mb-6">
      <div class="vd-card-header">
        <h6>
          <i class="ph ph-archive"></i> The earlier line is in maintenance
        </h6>
      </div>
      <div class="vd-card-body">
        <p>
          vd3 supersedes <strong>vanduo v2</strong> — the earlier vanilla
          (zero-build) line of <code>core</code> + <code>framework</code> +
          <code>vue</code> packages, together with the four standalone add-ons
          (<code>charts</code>, <code>flowchart</code>, <code>hex-grid</code>,
          <code>music-player</code>) and the v2 documentation site.
        </p>
        <p class="vd-mb-0">
          That line is now in <strong>maintenance mode</strong>: it still works
          and receives critical fixes, but new components, composables, and
          design work land on vd3. New projects should start here; existing v2
          apps can move across with the
          <a href="/guides/migration">Migration guide</a>.
        </p>
      </div>
    </div>

    <GuideLinkCards
      icon="ph-compass"
      title="Where to go next"
      :links="nextLinks"
    />
  </section>
</template>

<style scoped>
.ecosystem-legacy {
  border-color: rgba(var(--vd-color-info-rgb), 0.4);
}
</style>
