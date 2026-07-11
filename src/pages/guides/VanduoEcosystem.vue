<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

const nextLinks = [
  {
    to: "/guides/runtime-architecture",
    icon: "ph-cpu",
    title: "Runtime architecture",
    desc: "How vd2 replaces Vanduo.init with Vue composables.",
    badge: "Guide",
  },
  {
    to: "/guides/esm-vs-iife",
    icon: "ph-package",
    title: "ESM vs IIFE",
    desc: "The Vanilla engine's two builds vs vd2's ESM-only Vue.",
    badge: "Guide",
  },
  {
    to: "/guides/css-variables",
    icon: "ph-sliders",
    title: "CSS variables & theming",
    desc: "The token layer both engines share.",
    badge: "Guide",
  },
  {
    to: "/core/color-palette",
    icon: "ph-palette",
    title: "Color palette",
    desc: "The core tokens that feed every engine.",
    badge: "Core",
  },
];

// Two interchangeable engines + the shared token core.
const core: [string, string, string][] = [
  [
    "@vanduo-oss/core",
    "Design-token source of truth",
    "Framework-agnostic DTCG tokens compiled to CSS variables, typed TS, and JSON. No runtime — both engines consume it, so the palette, spacing, radii, and fonts never drift.",
  ],
  [
    "@vanduo-oss/framework",
    "Vanilla (zero-build) engine",
    "Pure HTML/CSS/JS you drop in over a CDN or a bundler. Owns the component CSS and an imperative runtime driven by data-* attributes.",
  ],
  [
    "@vanduo-oss/vue",
    "Vue 3 engine",
    "First-class typed Vd* components and composables (the engine these docs are built on). Tree-shakeable ESM, SSR/SSG-ready; consumes core tokens + framework CSS.",
  ],
];

// Standalone, framework-agnostic add-on packages — install only what you need.
const addons: [string, string, string][] = [
  [
    "@vanduo-oss/charts",
    "SVG charts",
    "Data-in, SVG-out bar / line / area / scatter / donut charts. Token-themed and SSR-safe, with an optional typed ./vue subpath.",
  ],
  [
    "@vanduo-oss/hex-grid",
    "Canvas hex grids",
    "VdHexGrid — interactive canvas hex grids with terrain, pathfinding, and theme-aware rendering.",
  ],
  [
    "@vanduo-oss/music-player",
    "HTML5 audio player",
    "A drop-in audio player (playlist, shuffle, repeat) styled with the Vanduo design language.",
  ],
  [
    "@vanduo-oss/flowchart",
    "SVG flowchart editor",
    "A standalone SVG flowchart / diagram editor for documentation and tools.",
  ],
];

const vanillaShell = `# Vanilla engine — drop-in CSS + JS (or a CDN <link> / <script>)
pnpm add @vanduo-oss/core @vanduo-oss/framework`;

const vueShell = `# Vue 3 engine — pulls core + framework as dependencies
pnpm add @vanduo-oss/vue`;

const addonsShell = `# Optional standalone packages — work with either engine
pnpm add @vanduo-oss/charts
pnpm add @vanduo-oss/hex-grid
pnpm add @vanduo-oss/music-player
pnpm add @vanduo-oss/flowchart`;
</script>

<template>
  <section id="vanduo-ecosystem">
    <h5 class="demo-title">
      <i class="ph ph-planet"></i>The Vanduo Ecosystem
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Vanduo is a <strong>dual-engine</strong> design system — one look and one
      Fibonacci-based design language, served either by a zero-build Vanilla
      engine or by first-class Vue 3, both fed from a single token core. Around
      that core sits a small family of <strong>standalone packages</strong> you
      install only when you need them. Everything ships under the
      <code>@vanduo-oss</code> scope.
    </p>

    <!-- Core trio -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-stack"></i> The core trio</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Package</th>
                    <th>Role</th>
                    <th>What it owns</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in core" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              <code>core</code> feeds tokens to both engines, so the palette,
              spacing scale, radii, and fonts never drift between them.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Standalone packages -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-puzzle-piece"></i> Standalone packages</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-4">
              Self-contained, framework-agnostic add-ons. They follow the same
              tokens and theme, and work whether you ship the Vanilla or the Vue
              engine.
            </p>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Package</th>
                    <th>What it is</th>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in addons" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- When to use which engine -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-feather"></i> When to use the Vanilla engine
            </h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>Static HTML pages with <strong>no build step</strong></li>
              <li>Dropping styles into an existing server-rendered app</li>
              <li>CDN / single-file prototypes and embeds</li>
              <li>
                Teams that want components driven entirely by
                <code>data-*</code> attributes
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-atom"></i> When to use the Vue 3 engine</h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>Vue 3 single-page or SSR / SSG applications</li>
              <li>
                You want reactive state, typed props, and component composition
              </li>
              <li>Tree-shaking and route-level code splitting via Vite</li>
              <li>Theming through a Pinia store instead of global JS calls</li>
            </ul>
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
            <p class="vd-mb-3">Pick an engine:</p>
            <DocCodeSnippet :shell="vanillaShell" :default-open="true" />
            <DocCodeSnippet
              class="vd-mt-3"
              :shell="vueShell"
              :default-open="true"
            />
            <p class="vd-mt-5 vd-mb-3">Then add any standalone packages:</p>
            <DocCodeSnippet :shell="addonsShell" :default-open="true" />
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
