<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useParallax } from "@vanduo-oss/vd3";
import Vd3Mark from "@/components/Vd3Mark.vue";
import {
  VD3_COMPONENT_EXPORTS,
  VD3_COMPOSABLE_MODULES,
} from "@/constants/vd3Catalog";
import { HERO_LOGO_FX } from "@/utils/logoFx";
import "@/styles/logo-fx.css";
import "@/styles/hero-display-font.css";

const homeRoot = ref<HTMLElement | null>(null);
useParallax(homeRoot);

const heroPills = [
  "Fibonacci 1 : 1.618",
  "v1.9 Motion (55–987ms)",
  "Vue 3.3+ · 0 Runtime Deps",
  "WCAG AA Ready",
] as const;

interface FibStep {
  name: string;
  token: string;
  ms: number;
  widthPct: number;
}

const fibonacciSteps: FibStep[] = [
  { name: "instant", token: "--vd-duration-instant", ms: 55, widthPct: 12 },
  { name: "fast", token: "--vd-duration-fast", ms: 89, widthPct: 18 },
  { name: "snappy", token: "--vd-duration-snappy", ms: 144, widthPct: 26 },
  { name: "normal", token: "--vd-duration-normal", ms: 233, widthPct: 38 },
  { name: "moderate", token: "--vd-duration-moderate", ms: 377, widthPct: 54 },
  { name: "slow", token: "--vd-duration-slow", ms: 610, widthPct: 74 },
  { name: "gentle", token: "--vd-duration-gentle", ms: 987, widthPct: 100 },
];

const spatialSteps = [
  { step: 3, px: "3px" },
  { step: 5, px: "5px" },
  { step: 8, px: "8px" },
  { step: 13, px: "13px" },
  { step: 21, px: "21px" },
  { step: 34, px: "34px" },
  { step: 55, px: "55px" },
  { step: 89, px: "89px" },
] as const;

// Open Color hues — the default palette, shown from the palette-independent
// --vd-oc-* scales so the strip always reflects Open Color regardless of the
// active theme.
const swatches = [
  { label: "Red", bg: "var(--vd-oc-red-6)" },
  { label: "Orange", bg: "var(--vd-oc-orange-6)" },
  { label: "Yellow", bg: "var(--vd-oc-yellow-6)" },
  { label: "Green", bg: "var(--vd-oc-green-6)" },
  { label: "Teal", bg: "var(--vd-oc-teal-6)" },
  { label: "Blue", bg: "var(--vd-oc-blue-6)" },
  { label: "Violet", bg: "var(--vd-oc-violet-6)", ink: "#ffffff" },
  { label: "Pink", bg: "var(--vd-oc-pink-6)" },
];

const fibSwatches = [
  { label: "Fib Teal · 137.5°", bg: "var(--vd-fib-teal-3)" },
  { label: "Fib Pink · 275°", bg: "var(--vd-fib-pink-3)" },
  { label: "Fib Gold · 52.5°", bg: "var(--vd-fib-yellow-3)" },
  { label: "Fib Blue · 190°", bg: "var(--vd-fib-blue-3)" },
];

const glassSteps = [
  {
    cls: ".vd-glass-3",
    surfaceCls: ".vd-surface-3",
    label: "Soft Step",
    detail: "Subtle frost & low-contrast pattern",
  },
  {
    cls: ".vd-glass-5",
    surfaceCls: ".vd-surface-5",
    label: "Default Step",
    detail: "Balanced refractive blur & contrast",
  },
  {
    cls: ".vd-glass-8",
    surfaceCls: ".vd-surface-8",
    label: "Deep Step",
    detail: "Floating hero glass & bold surface punch",
  },
] as const;

const rootAttributes = [
  'data-theme="light|dark"',
  'data-primary="13 hues"',
  'data-neutral="5 scales"',
  'data-palette="oc|fibonacci"',
] as const;

interface EcosystemPkg {
  name: string;
  version: string;
  icon: string;
  meta: string;
  summary: string;
  to: string;
}

const ecosystemPackages: EcosystemPkg[] = [
  {
    name: "@vanduo-oss/vd3",
    version: "v1.9.0",
    icon: "ph-cube",
    meta: `${VD3_COMPONENT_EXPORTS} components · ${VD3_COMPOSABLE_MODULES} composables`,
    summary:
      "Core Vue 3 design system, Fibonacci CSS layer, Seemore Glass, and decorative surfaces.",
    to: "/components/button",
  },
  {
    name: "@vanduo-oss/vd3-charts",
    version: "v1.2.0",
    icon: "ph-chart-bar",
    meta: "6 SVG chart types · 0 deps",
    summary:
      "Bar, line, area, pie, donut, and scatter charts with keyboard navigation and data tables.",
    to: "/canvas/charts",
  },
  {
    name: "@vanduo-oss/vd3-flowchart",
    version: "v1.6.0",
    icon: "ph-flow-arrow",
    meta: "Interactive diagram editor",
    summary:
      "Node-and-edge canvas with tree, radial, and grid auto-layouts, minimap, and undo/redo.",
    to: "/canvas/flowchart",
  },
];

const iconWeights = [
  { cls: "ph", label: "Regular" },
  { cls: "ph-fill", label: "Fill" },
  { cls: "ph-bold", label: "Bold" },
  { cls: "ph-light", label: "Light" },
  { cls: "ph-thin", label: "Thin" },
  { cls: "ph-duotone", label: "Duotone" },
] as const;
</script>

<template>
  <section id="home" ref="homeRoot">
    <!-- Top Hero on Clean Canvas -->
    <div class="hero-zone">
      <div id="hero" class="hero home-hero-stage">
        <div class="hero-content">
          <h2
            class="hero-title"
            style="display: flex; align-items: center; justify-content: center"
          >
            <span class="hero-title-logo-wrap">
              <span
                class="hero-title-logo-stage logo-fx-tile"
                :data-fx="HERO_LOGO_FX"
              >
                <Vd3Mark size="100%" />
              </span>
            </span>
            <span class="hero-title-copy">
              <span class="hero-title-text">
                <span class="hero-title-brand">vd3</span>
                <span class="hero-title-ui">UI</span>
              </span>
              <span class="hero-tagline">
                A Vue 3 design system and component library
              </span>
            </span>
          </h2>

          <div class="hero-proof-strip">
            <p class="hero-proof-lead">
              {{ VD3_COMPONENT_EXPORTS }} components,
              {{ VD3_COMPOSABLE_MODULES }} composables, one install.
            </p>
            <ul class="hero-proof-pills" aria-label="Key capabilities">
              <li v-for="pill in heroPills" :key="pill" class="hero-proof-pill">
                {{ pill }}
              </li>
            </ul>
          </div>

          <div class="vd-mt-6 hero-cta-buttons">
            <RouterLink
              to="/guides/getting-started"
              class="vd-btn vd-btn-outline vd-btn-ring"
            >
              <i class="ph ph-rocket" aria-hidden="true"></i> Getting Started
            </RouterLink>
            <RouterLink to="/components/button" class="vd-btn vd-btn-ink">
              <i class="ph ph-cube" aria-hidden="true"></i> Browse Components
            </RouterLink>
            <a
              href="https://github.com/vanduo-oss/vd3"
              class="vd-btn vd-btn-ink"
              target="_blank"
              rel="noopener"
            >
              <i class="ph ph-github-logo" aria-hidden="true"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 1 / 3: Architecture & Motion on .vd-surface-grid -->
    <section
      id="home-architecture"
      class="home-stage-section"
      aria-labelledby="home-architecture-heading"
    >
      <div class="vd-container vd-container-responsive">
        <div
          class="home-stage-card vd-parallax vd-parallax-slow vd-parallax-disable-mobile"
        >
          <div
            class="vd-parallax-bg vd-surface vd-surface-5 vd-surface-grid home-surface-grid"
            data-parallax-speed="0.4"
            aria-hidden="true"
          ></div>

          <div class="vd-parallax-content home-stage-grid">
            <!-- Left Glass Panel: Copy + CTAs (1fr) -->
            <div
              class="home-stage-copy home-glass-panel vd-glass vd-glass-8 vd-glass-adaptive vd-glass-floating"
            >
              <div class="home-stage-header-row">
                <span class="home-stage-eyebrow">
                  <i class="ph ph-spiral" aria-hidden="true"></i>
                  01 · PROPORTION &amp; MOTION
                </span>
                <code class="home-surface-tag">.vd-surface-grid</code>
              </div>
              <h3 id="home-architecture-heading" class="home-stage-title">
                Built on the Fibonacci Spine
              </h3>
              <p class="home-stage-lead">
                Every spacing step, container width (<code>987px</code> and
                <code>1597px</code>), elevation shadow, and transition duration
                follows the Fibonacci sequence and the
                <code>1 : 1.618</code> golden ratio.
              </p>

              <ul class="home-stage-list">
                <li>
                  <strong>v1.9 Motion System (55–987ms)</strong> — Seven
                  Fibonacci duration tokens, golden cubic-bezier easing curves,
                  and height-adaptive <code>&lt;VdExpandTransition&gt;</code>.
                </li>
                <li>
                  <strong>Golden Ratio Layout Primitives</strong> — Responsive
                  <code>1 : 1.618</code> split grids, 12-column flex/grid
                  containers, and mathematical typographic rhythm.
                </li>
                <li>
                  <strong>Motion-Preference Aware</strong> — Automatically
                  collapses durations under
                  <code>prefers-reduced-motion: reduce</code> or
                  <code>data-motion="reduce|off"</code>.
                </li>
              </ul>

              <div class="home-stage-ctas">
                <RouterLink to="/core/motion" class="vd-btn vd-btn-ink">
                  <i class="ph ph-waveform" aria-hidden="true"></i> Motion
                  System
                </RouterLink>
                <RouterLink to="/guides/fibonacci" class="vd-btn vd-btn-ink">
                  <i class="ph ph-spiral" aria-hidden="true"></i> Fibonacci
                  Scale
                </RouterLink>
                <RouterLink to="/core/golden-ratio" class="vd-btn vd-btn-ink">
                  <i class="ph ph-ruler" aria-hidden="true"></i> Golden Ratio
                </RouterLink>
              </div>
            </div>

            <!-- Right Glass Panel: Spec Showcase (1.618fr) -->
            <div
              class="home-spec-panel home-glass-panel vd-glass vd-glass-8 vd-glass-adaptive vd-glass-floating"
            >
              <div class="home-spec-block">
                <div class="home-spec-header">
                  <span class="home-spec-title">
                    <i class="ph ph-timer" aria-hidden="true"></i>
                    Fibonacci Duration Ladder
                  </span>
                  <code class="home-spec-badge">--vd-duration-*</code>
                </div>
                <div
                  class="home-fib-bars"
                  role="list"
                  aria-label="Fibonacci duration tokens from 55ms to 987ms"
                >
                  <div
                    v-for="step in fibonacciSteps"
                    :key="step.name"
                    class="home-fib-row"
                    role="listitem"
                  >
                    <code class="home-fib-name">{{ step.name }}</code>
                    <div class="home-fib-track" aria-hidden="true">
                      <span
                        class="home-fib-fill"
                        :style="{ width: `${step.widthPct}%` }"
                      ></span>
                    </div>
                    <code class="home-fib-ms">{{ step.ms }}ms</code>
                  </div>
                </div>
                <div class="home-spec-meta">
                  <span>
                    Easing: <code>--vd-ease-out</code> ·
                    <code>cubic-bezier(0.16, 1, 0.3, 1)</code>
                  </span>
                  <span>Golden Split: <code>1 : 1.618</code></span>
                </div>
              </div>

              <hr class="home-spec-divider" />

              <div class="home-spec-block">
                <div class="home-spec-header">
                  <span class="home-spec-title">
                    <i class="ph ph-ruler" aria-hidden="true"></i>
                    Fibonacci Spatial Scale
                  </span>
                  <RouterLink to="/core/grid-system" class="home-spec-link">
                    Grid system &rarr;
                  </RouterLink>
                </div>
                <div
                  class="home-spatial-grid"
                  role="list"
                  aria-label="Fibonacci spacing tokens"
                >
                  <div
                    v-for="item in spatialSteps"
                    :key="item.step"
                    class="home-spatial-chip"
                    role="listitem"
                  >
                    <code class="home-spatial-token">fib-{{ item.step }}</code>
                    <span class="home-spatial-px">{{ item.px }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2 / 3: Theming, Palettes & Glass on .vd-surface-dots (Reversed 1.618 : 1) -->
    <section
      id="home-theming"
      class="home-stage-section"
      aria-labelledby="home-theming-heading"
    >
      <div class="vd-container vd-container-responsive">
        <div
          class="home-stage-card vd-parallax vd-parallax-slow vd-parallax-disable-mobile"
        >
          <div
            class="vd-parallax-bg vd-surface vd-surface-5 vd-surface-dots home-surface-dots"
            data-parallax-speed="0.4"
            aria-hidden="true"
          ></div>

          <div class="vd-parallax-content home-stage-grid is-reversed">
            <!-- Left Glass Panel: Palette & Glass Showcase (1.618fr) -->
            <div
              class="home-spec-panel home-glass-panel vd-glass vd-glass-8 vd-glass-adaptive vd-glass-floating"
            >
              <div class="home-spec-block">
                <div class="home-spec-header">
                  <span class="home-spec-title">
                    <i class="ph ph-palette" aria-hidden="true"></i>
                    Open Color &amp; 137.5° Fibonacci Palettes
                  </span>
                  <RouterLink to="/core/color-palette" class="home-spec-link">
                    Color palette &rarr;
                  </RouterLink>
                </div>
                <div
                  class="home-swatch-strip"
                  role="list"
                  aria-label="Open Color palette hues"
                >
                  <span
                    v-for="s in swatches"
                    :key="s.label"
                    class="home-swatch-pill"
                    role="listitem"
                    :style="{
                      backgroundColor: s.bg,
                      color: s.ink ?? '#000000',
                    }"
                  >
                    {{ s.label }}
                  </span>
                </div>
                <div
                  class="home-swatch-strip"
                  role="list"
                  aria-label="Fibonacci golden-angle palette hues"
                >
                  <span
                    v-for="f in fibSwatches"
                    :key="f.label"
                    class="home-swatch-pill"
                    role="listitem"
                    :style="{
                      backgroundColor: f.bg,
                      color: '#000000',
                    }"
                  >
                    {{ f.label }}
                  </span>
                </div>
              </div>

              <hr class="home-spec-divider" />

              <div class="home-spec-block">
                <div class="home-spec-header">
                  <span class="home-spec-title">
                    <i class="ph ph-sparkle" aria-hidden="true"></i>
                    Seemore Glass &amp; Surface Steps
                  </span>
                  <RouterLink to="/effects/surfaces" class="home-spec-link">
                    Surfaces docs &rarr;
                  </RouterLink>
                </div>

                <div
                  class="home-glass-tiers"
                  role="list"
                  aria-label="Fibonacci glass and surface intensity steps"
                >
                  <div
                    v-for="tier in glassSteps"
                    :key="tier.cls"
                    class="home-glass-tier-card"
                    role="listitem"
                  >
                    <div class="home-glass-tier-codes">
                      <code>{{ tier.cls }}</code>
                      <code>{{ tier.surfaceCls }}</code>
                    </div>
                    <strong class="home-glass-tier-label">{{
                      tier.label
                    }}</strong>
                    <span class="home-glass-tier-detail">{{
                      tier.detail
                    }}</span>
                  </div>
                </div>

                <div
                  class="home-attr-pills"
                  role="list"
                  aria-label="Root theme attributes"
                >
                  <code
                    v-for="attr in rootAttributes"
                    :key="attr"
                    class="home-attr-pill"
                    role="listitem"
                  >
                    {{ attr }}
                  </code>
                </div>
              </div>
            </div>

            <!-- Right Glass Panel: Copy + CTAs (1fr) -->
            <div
              class="home-stage-copy home-glass-panel vd-glass vd-glass-8 vd-glass-adaptive vd-glass-floating"
            >
              <div class="home-stage-header-row">
                <span class="home-stage-eyebrow">
                  <i class="ph ph-paint-brush-broad" aria-hidden="true"></i>
                  02 · THEMING, PALETTES &amp; GLASS
                </span>
                <code class="home-surface-tag">.vd-surface-dots</code>
              </div>
              <h3 id="home-theming-heading" class="home-stage-title">
                Surface + Seemore Glass
              </h3>
              <p class="home-stage-lead">
                Put rich color and pattern in the decorative
                <code>.vd-surface-*</code> backdrop and float content over one
                Fibonacci step of <code>.vd-glass</code> for effortless depth
                and crisp legibility.
              </p>

              <ul class="home-stage-list">
                <li>
                  <strong>Dual Palette Engine</strong> — Switch at runtime
                  between Open Color and the <code>137.5°</code> golden-angle
                  Fibonacci palette across 13 primary hues and 5 neutral scales.
                </li>
                <li>
                  <strong>Six Decorative Surfaces</strong> — Mesh, Stripe,
                  Noise, Aurora, Dots, and Grid backdrops with Fibonacci
                  intensity steps (<code>.vd-surface-3|5|8</code>).
                </li>
                <li>
                  <strong>Zero-Flash Runtime Switching</strong> — Flip
                  <code>data-theme</code>, <code>data-primary</code>, or
                  <code>data-palette</code> on <code>&lt;html&gt;</code> and
                  every token re-skins in a single frame.
                </li>
              </ul>

              <div class="home-stage-ctas">
                <RouterLink to="/effects/surfaces" class="vd-btn vd-btn-ink">
                  <i class="ph ph-checkerboard" aria-hidden="true"></i>
                  Surfaces Demo
                </RouterLink>
                <RouterLink to="/effects/glass" class="vd-btn vd-btn-ink">
                  <i class="ph ph-sparkle" aria-hidden="true"></i> Seemore Glass
                </RouterLink>
                <RouterLink
                  to="/guides/css-variables"
                  class="vd-btn vd-btn-ink"
                >
                  <i class="ph ph-sliders-horizontal" aria-hidden="true"></i>
                  CSS Tokens
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3 / 3: Ecosystem & Documentation on .vd-surface-noise (1 : 1.618) -->
    <section
      id="home-ecosystem"
      class="home-stage-section home-stage-section-last"
      aria-labelledby="home-ecosystem-heading"
    >
      <div class="vd-container vd-container-responsive">
        <div
          class="home-stage-card vd-parallax vd-parallax-slow vd-parallax-disable-mobile"
        >
          <div
            class="vd-parallax-bg vd-surface vd-surface-5 vd-surface-noise home-surface-noise"
            data-parallax-speed="0.4"
            aria-hidden="true"
          ></div>

          <div class="vd-parallax-content home-stage-grid">
            <!-- Left Glass Panel: Copy + CTAs (1fr) -->
            <div
              class="home-stage-copy home-glass-panel vd-glass vd-glass-8 vd-glass-adaptive vd-glass-floating"
            >
              <div class="home-stage-header-row">
                <span class="home-stage-eyebrow">
                  <i class="ph ph-stack" aria-hidden="true"></i>
                  03 · ECOSYSTEM &amp; DOCUMENTATION
                </span>
                <code class="home-surface-tag">.vd-surface-noise</code>
              </div>
              <h3 id="home-ecosystem-heading" class="home-stage-title">
                One Complete System, Ready to Ship
              </h3>
              <p class="home-stage-lead">
                Typed <code>&lt;Vd*&gt;</code> components, a matching
                <code>use*</code> composable behind every interaction, and
                first-party SVG charts and flowchart packages. Nothing to wire
                up first, no state library to install, and no external runtime.
              </p>

              <ul class="home-stage-list">
                <li>
                  <strong>Vue 3 and Nothing Else</strong> — One peer dependency,
                  zero runtime dependencies, SSR-safe, and tree-shakeable.
                </li>
                <li>
                  <strong>Accessible by Default</strong> — Keyboard navigation,
                  focus management, ARIA roles, and WCAG 2.1 AA contrast across
                  every widget.
                </li>
                <li>
                  <strong>90+ Copy-Paste Reference Pages</strong> — Live demos,
                  typed API tables, and production-ready code snippets.
                </li>
              </ul>

              <div class="home-stage-ctas">
                <RouterLink to="/docs-landing" class="vd-btn vd-btn-ink">
                  <i class="ph ph-book-open" aria-hidden="true"></i> Explore
                  Documentation
                </RouterLink>
                <RouterLink to="/cbun" class="vd-btn vd-btn-ink">
                  <i class="ph ph-graph" aria-hidden="true"></i> Canvas Bundle
                </RouterLink>
                <RouterLink to="/about" class="vd-btn vd-btn-ink">
                  <i class="ph ph-compass" aria-hidden="true"></i> About vd3
                </RouterLink>
              </div>
            </div>

            <!-- Right Glass Panel: Ecosystem Ledger + Icons (1.618fr) -->
            <div
              class="home-spec-panel home-glass-panel vd-glass vd-glass-8 vd-glass-adaptive vd-glass-floating"
            >
              <div class="home-spec-block">
                <div class="home-spec-header">
                  <span class="home-spec-title">
                    <i class="ph ph-stack" aria-hidden="true"></i>
                    @vanduo-oss Ecosystem
                  </span>
                  <code class="home-spec-badge">MIT · ESM + d.ts</code>
                </div>

                <div class="home-pkg-list">
                  <RouterLink
                    v-for="pkg in ecosystemPackages"
                    :key="pkg.name"
                    :to="pkg.to"
                    class="home-pkg-item"
                  >
                    <span class="home-pkg-icon" aria-hidden="true">
                      <i class="ph" :class="pkg.icon"></i>
                    </span>
                    <span class="home-pkg-body">
                      <span class="home-pkg-top">
                        <code class="home-pkg-name">{{ pkg.name }}</code>
                        <span class="home-pkg-version">{{ pkg.version }}</span>
                        <span class="home-pkg-meta">{{ pkg.meta }}</span>
                      </span>
                      <span class="home-pkg-summary">{{ pkg.summary }}</span>
                    </span>
                    <i
                      class="ph ph-arrow-up-right home-pkg-arrow"
                      aria-hidden="true"
                    ></i>
                  </RouterLink>
                </div>
              </div>

              <hr class="home-spec-divider" />

              <div class="home-spec-block">
                <div class="home-spec-header">
                  <span class="home-spec-title">
                    <i class="ph ph-sparkle" aria-hidden="true"></i>
                    Phosphor Icons · 1,500+ Local Glyphs
                  </span>
                  <RouterLink to="/core/icons" class="home-spec-link">
                    Icons docs &rarr;
                  </RouterLink>
                </div>
                <div
                  class="home-icon-weights"
                  role="list"
                  aria-label="Six bundled Phosphor icon weights"
                >
                  <div
                    v-for="w in iconWeights"
                    :key="w.cls"
                    class="home-icon-weight-pill"
                    role="listitem"
                  >
                    <i
                      :class="[w.cls, 'ph-heart']"
                      class="home-icon-sample"
                      aria-hidden="true"
                    ></i>
                    <span class="home-icon-label">{{ w.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.hero-title {
  /* Wordmark 1.2em + tagline margin + tagline line box — logo wrap keys off this. */
  --hero-copy-height: calc(1.2em + 0.5rem + 0.9375rem * 1.4);
}

.hero-title-ui {
  color: var(--vd-text-muted);
  font-size: 1.2em;
  line-height: 1;
  text-transform: uppercase;
}

.hero-title-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  text-align: left;
}

.hero-tagline {
  margin-top: 0.5rem;
  font-family: var(--vd-font-family-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.4;
  text-transform: none;
  color: var(--vd-text-secondary);
}

@media (max-width: 600px) {
  .hero-title-copy {
    align-items: center;
    text-align: center;
  }
}
</style>
