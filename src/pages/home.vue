<script setup lang="ts">
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { useMorph } from "@vanduo-oss/vd3";
import HomeOolaSection from "@/components/HomeOolaSection.vue";
import Vd3Mark from "@/components/Vd3Mark.vue";
import { HERO_LOGO_FX, vd3MarkSize } from "@/utils/logoFx";
import "@/styles/logo-fx.css";

/** Previous hero mark was 2.5em — scaled up 2.5× for the home hero. */
const HERO_MARK_EM = 6.25;

interface Feature {
  icon: string;
  title: string;
  body: string;
  /** Where "Read the guide" on the revealed card face leads. */
  guide: { to: string; label: string };
}

const features: Feature[] = [
  {
    icon: "ph-package",
    title: "One Complete System",
    body: "vd3 is a standalone Vue 3 design system — typed components, a composable for every interaction, and design tokens, all shipped in a single package. No extra runtime, no configuration ceremony.",
    guide: { to: "/guides/vd3-ecosystem", label: "The vd3 Ecosystem" },
  },
  {
    icon: "ph-atom",
    title: "Built for Vue 3",
    body: "Typed <script setup> components, a composable for every interaction, Pinia-free reactive stores, and static rendering via vite-ssg. It's tree-shakeable ESM, so you pull in only the pieces you actually use.",
    guide: {
      to: "/guides/runtime-architecture",
      label: "vd3 Architecture",
    },
  },
  {
    icon: "ph-squares-four",
    title: "The vd3-cbun Bundle",
    body: "Need more than the core kit? @vanduo-oss/vd3-cbun adds production-ready charts, an interactive flowchart canvas, hex grids, and a full music player — each a typed Vue 3 component that inherits the same tokens.",
    guide: { to: "/cbun", label: "vd3 Components Bundle" },
  },
  {
    icon: "ph-database",
    title: "One Source of Truth",
    body: "Design tokens ship with @vanduo-oss/vd3 as DTCG JSON and compile to the CSS variables every component reads. Change a token once and the whole system re-skins in lockstep — never drifting out of sync.",
    guide: { to: "/guides/css-variables", label: "CSS Variables & Theming" },
  },
  {
    icon: "ph-spiral",
    title: "Fibonacci & Golden Ratio",
    body: "Spacing, type scale, shadows, and grid layouts are derived from the Fibonacci sequence and the Golden Ratio, so layouts feel balanced without manual tweaking.",
    guide: { to: "/guides/fibonacci", label: "The Fibonacci Scale" },
  },
  {
    icon: "ph-wheelchair",
    title: "Accessible by Default",
    body: "ARIA roles, visible focus rings, semantic markup, keyboard-first interactions, and prefers-reduced-motion support ship with every component. Accessibility is on from the start — never a bolt-on.",
    guide: { to: "/guides/accessibility", label: "Accessibility Essentials" },
  },
  {
    icon: "ph-moon-stars",
    title: "Dark Mode & Live Theming",
    body: "Light, dark, and system-synced themes driven by CSS variables, with a drop-in switcher and a live customizer. Theme once at the token layer and every component re-skins instantly.",
    guide: { to: "/guides/theme-customizer", label: "Theme Customizer" },
  },
  {
    icon: "ph-shield-check",
    title: "Conflict-Free",
    body: "Every class is namespaced with vd- and the components scope cleanly, so vd3 coexists with Bootstrap, Tailwind, or legacy styles without cascade surprises.",
    guide: {
      to: "/guides/framework-integration",
      label: "Installation & Integration",
    },
  },
  {
    icon: "ph-code",
    title: "Docs Built for Copy-Paste",
    body: "Every component and composable comes with a live demo, a typed API table, and copy-paste-ready snippets — written to read like the platform itself, so you can lift examples straight into your app.",
    guide: { to: "/guides/getting-started", label: "Getting Started" },
  },
];

/** Features grid root — useMorph wires wave/shine + current⇄next swap. */
const featuresRoot = ref<HTMLElement | null>(null);
useMorph(featuresRoot);

/** A11y face state only; morph face classes are owned by useMorph (DOM). */
const flipped = reactive<boolean[]>(features.map(() => false));
const morphBusy = reactive<boolean[]>(features.map(() => false));

function morphDurationMs(el: HTMLElement): number {
  const custom = getComputedStyle(el)
    .getPropertyValue("--vd-morph-duration")
    .trim();
  if (custom) {
    const parsed = parseFloat(custom);
    if (!Number.isNaN(parsed)) {
      return parsed * (custom.includes("ms") ? 1 : 1000);
    }
  }
  return 600;
}

/** Sync aria/tabindex after useMorph finishes its current⇄next swap. */
function onFeatureMorph(index: number, event: MouseEvent): void {
  if (morphBusy[index]) return;
  const el = event.currentTarget;
  if (!(el instanceof HTMLElement)) return;
  // Match useMorph debounce: ignore while the wave/settle classes are active.
  if (
    el.classList.contains("is-morphing") ||
    el.classList.contains("is-morph-settling")
  ) {
    return;
  }
  morphBusy[index] = true;
  window.setTimeout(
    () => {
      flipped[index] = !flipped[index];
      morphBusy[index] = false;
    },
    morphDurationMs(el) + 80,
  );
}

function onFeatureKeydown(index: number, event: KeyboardEvent): void {
  const el = event.currentTarget;
  if (!(el instanceof HTMLElement)) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    el.click();
    return;
  }
  if (event.key === "Escape" && flipped[index]) {
    event.preventDefault();
    el.click();
  }
}

const iconWeights = [
  { cls: "ph", label: "Regular" },
  { cls: "ph-fill", label: "Fill" },
  { cls: "ph-bold", label: "Bold" },
  { cls: "ph-light", label: "Light" },
  { cls: "ph-thin", label: "Thin" },
  { cls: "ph-duotone", label: "Duotone" },
];

const sampleIcons = [
  { cls: "ph ph-house" },
  { cls: "ph ph-user" },
  { cls: "ph ph-gear" },
  { cls: "ph ph-bell" },
  { cls: "ph ph-envelope" },
  { cls: "ph ph-magnifying-glass" },
  { cls: "ph ph-download" },
  { cls: "ph ph-upload" },
  { cls: "ph ph-trash" },
  { cls: "ph ph-pencil" },
  { cls: "ph-fill ph-heart", color: "var(--vd-color-error)" },
  { cls: "ph-fill ph-star", color: "var(--vd-color-warning)" },
  { cls: "ph ph-check-circle", color: "var(--vd-color-success)" },
  { cls: "ph ph-warning", color: "var(--vd-color-warning)" },
  { cls: "ph ph-x-circle", color: "var(--vd-color-error)" },
  { cls: "ph ph-info", color: "var(--vd-color-info)" },
];

// Open Color hues — the default palette, shown from the palette-independent
// --vd-oc-* scales so the strip always reflects Open Color regardless of the
// active theme.
const swatches = [
  { label: "Red", bg: "var(--vd-oc-red-6)" },
  { label: "Orange", bg: "var(--vd-oc-orange-6)" },
  { label: "Yellow", bg: "var(--vd-oc-yellow-6)", light: true },
  { label: "Green", bg: "var(--vd-oc-green-6)" },
  { label: "Teal", bg: "var(--vd-oc-teal-6)" },
  { label: "Blue", bg: "var(--vd-oc-blue-6)" },
  { label: "Violet", bg: "var(--vd-oc-violet-6)" },
  { label: "Pink", bg: "var(--vd-oc-pink-6)" },
];
</script>

<template>
  <section id="home">
    <!-- Hero -->
    <div class="hero-zone">
      <div
        id="hero"
        class="hero vd-parallax"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          padding-top: 268px;
          padding-bottom: 89px;
        "
      >
        <div class="vd-parallax-layer" data-parallax-speed="0.5"></div>
        <div class="vd-parallax-content hero-content">
          <h2
            class="hero-title"
            style="display: flex; align-items: center; justify-content: center"
          >
            <span class="hero-title-logo-wrap">
              <span
                class="hero-title-logo-stage logo-fx-tile"
                :data-fx="HERO_LOGO_FX"
              >
                <Vd3Mark :size="vd3MarkSize(HERO_MARK_EM)" />
              </span>
            </span>
            <span class="hero-title-text">
              <span class="hero-title-brand">vd3</span>
            </span>
          </h2>
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

    <div class="vd-container-responsive">
      <!-- Features -->
      <div
        id="home-features"
        ref="featuresRoot"
        style="padding: 4rem 0; scroll-margin-top: var(--docs-main-offset)"
      >
        <h3
          class="vd-text-center vd-mb-2"
          style="color: var(--vd-color-primary)"
        >
          Features
        </h3>
        <p class="vd-text-center vd-text-muted vd-mb-8">
          A standalone Vue 3 design system — components, composables, and tokens
          in one package, with the vd3-cbun bundle for charts, flowcharts, and
          more. Tap a card to dig in.
        </p>
        <div class="vd-row philosophy-cards" style="align-items: stretch">
          <div
            v-for="(feature, i) in features"
            :key="feature.title"
            class="vd-col-12 vd-col-md-6 vd-col-lg-4"
          >
            <div
              class="vd-card vd-card-glow vd-glass vd-glass-floating vd-text-center vd-morph feature-morph-card"
              data-vd-morph
              role="button"
              tabindex="0"
              :aria-expanded="flipped[i]"
              :aria-label="
                flipped[i]
                  ? `${feature.title} — hide details`
                  : `${feature.title} — reveal details`
              "
              @click="onFeatureMorph(i, $event)"
              @keydown="onFeatureKeydown(i, $event)"
            >
              <!-- Face classes stay static; useMorph swaps current⇄next in the DOM. -->
              <span
                class="vd-morph-content feature-morph-face vd-morph-current"
              >
                <i
                  :class="`ph ${feature.icon} feature-icon`"
                  aria-hidden="true"
                ></i>
                <h4 class="feature-morph-title">{{ feature.title }}</h4>
                <span class="feature-morph-hint vd-text-muted"
                  >Tap to learn more</span
                >
              </span>
              <span class="vd-morph-content feature-morph-face vd-morph-next">
                <h4 class="feature-morph-title">{{ feature.title }}</h4>
                <p class="feature-morph-body">{{ feature.body }}</p>
                <RouterLink
                  :to="feature.guide.to"
                  class="vd-btn vd-btn-outline vd-btn-ring feature-morph-link"
                  :tabindex="flipped[i] ? 0 : -1"
                  :aria-hidden="flipped[i] ? undefined : 'true'"
                  :aria-label="`Read the guide: ${feature.guide.label}`"
                  @click.stop
                  @keydown.enter.stop
                  @keydown.space.stop
                >
                  <i class="ph ph-book-open-text" aria-hidden="true"></i>
                  Read the guide
                  <i class="ph ph-arrow-right" aria-hidden="true"></i>
                </RouterLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seemore Glass story -->
    <section
      id="home-seemore"
      class="seemore-home"
      aria-labelledby="seemore-home-title"
    >
      <div class="vd-container-responsive seemore-home-inner">
        <div class="vd-row" style="align-items: center">
          <div class="vd-col-12 vd-col-lg-5">
            <h2 id="seemore-home-title" class="seemore-home-title">
              See more glass.
            </h2>
            <p class="seemore-home-lead">
              <strong>Seemore Glass</strong>: every strength step follows the
              Fibonacci sequence — the same harmonic spine as vd3’s spacing,
              radius, and golden-ratio DNA — so blur, tint, edge, and elevation
              thicken together as one material.
            </p>
            <p class="seemore-home-lead vd-text-muted">
              Pair it with decorative Surfaces (mesh, stripe, noise, aurora,
              dots, grid) and your frosted UI finally has a stage worthy of the
              frost.
            </p>
            <div class="seemore-home-cta">
              <RouterLink
                to="/effects/glass"
                class="vd-btn vd-btn-outline vd-btn-ring"
              >
                Explore Seemore Glass
              </RouterLink>
              <RouterLink to="/effects/surfaces" class="vd-btn vd-btn-ink">
                Browse Surfaces
              </RouterLink>
            </div>
          </div>
          <div class="vd-col-12 vd-col-lg-7">
            <div
              class="vd-surface vd-surface-stripe vd-surface-5 seemore-surface-motion seemore-home-stage"
            >
              <div
                class="vd-glass vd-glass-8 vd-glass-adaptive vd-glass-floating seemore-home-panel"
              >
                <span class="seemore-home-kicker">.vd-glass-8</span>
                <p>
                  Fibonacci step eight — navigation-grade frost over a live
                  <code>.vd-surface-stripe</code> backdrop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <HomeOolaSection />

    <div class="vd-container-responsive">
      <!-- Icons Overview -->
      <div
        id="home-icons"
        style="padding: 4rem 0; scroll-margin-top: var(--docs-main-offset)"
      >
        <h3
          class="icons-section-title vd-mb-3"
          style="color: var(--vd-color-primary)"
        >
          Phosphor Icons
        </h3>
        <p class="icons-section-subtitle vd-text-muted vd-mb-8">
          1,500+ icons in 6 weights, bundled locally. No CDN required.
        </p>
        <div class="vd-row">
          <div class="vd-col-12">
            <div
              class="vd-card vd-card-glow vd-card-interactive vd-glass icons-card home-card-no-glow"
            >
              <div class="icons-weights">
                <div
                  v-for="w in iconWeights"
                  :key="w.label"
                  class="icons-weight-item"
                >
                  <i :class="`${w.cls} ph-heart`"></i>
                  <p class="vd-text-sm vd-text-muted">{{ w.label }}</p>
                </div>
              </div>
              <div class="icons-sample-row">
                <i
                  v-for="(icon, idx) in sampleIcons"
                  :key="idx"
                  :class="icon.cls"
                  :style="icon.color ? { color: icon.color } : undefined"
                ></i>
              </div>
              <p class="icons-footer vd-text-sm vd-text-muted">
                <i
                  class="ph ph-heart-straight"
                  style="color: var(--vd-color-error)"
                ></i>
                Icons by
                <a
                  href="https://phosphoricons.com"
                  target="_blank"
                  rel="noopener"
                  ><strong>Phosphor Icons</strong></a
                >
                — MIT Licensed.
                <RouterLink to="/core/icons"
                  >See full documentation &rarr;</RouterLink
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Open Color Overview -->
      <div
        id="open-color"
        style="padding: 4rem 0; scroll-margin-top: var(--docs-main-offset)"
      >
        <h3
          class="open-color-title vd-mb-3"
          style="color: var(--vd-color-primary)"
        >
          Open Color Palette
        </h3>
        <p class="open-color-subtitle vd-text-muted vd-mb-8">
          vd3 ships with <strong>Open Color</strong> (MIT) as its default
          palette — the friendly, battle-tested scale you already know. Prefer
          color that shares the golden-angle DNA of vd3's spacing and grid?
          The <strong>Fibonacci</strong> palette is one toggle away.
        </p>
        <div class="vd-row">
          <div class="vd-col-12">
            <div
              class="vd-card vd-card-glow vd-card-interactive vd-glass open-color-card home-card-no-glow"
            >
              <div class="open-color-grid">
                <div
                  v-for="s in swatches"
                  :key="s.label"
                  class="open-color-swatch"
                  :class="{ 'is-light': s.light }"
                  :style="{ background: s.bg }"
                >
                  {{ s.label }}
                </div>
              </div>
              <p class="open-color-footer vd-text-sm vd-text-muted">
                <a
                  href="https://yeun.github.io/open-color/"
                  target="_blank"
                  rel="noopener"
                  ><strong>Open Color</strong></a
                >
                by Heeyeun Jeong (MIT), shipped through
                <code>@vanduo-oss/vd3</code>. The optional golden-angle
                Fibonacci palette is one toggle away.
                <RouterLink to="/core/color-palette"
                  >See the full palette in the documentation &rarr;</RouterLink
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div id="cta" style="padding: 5rem 0">
        <div class="vd-row">
          <div class="vd-col-12">
            <div
              class="vd-card vd-card-glow vd-card-interactive vd-glass vd-text-center home-card-no-glow"
              style="padding: 3rem 2rem"
            >
              <i
                class="ph ph-book-open"
                style="
                  font-size: 3rem;
                  color: var(--vd-color-primary);
                  margin-bottom: 1rem;
                "
              ></i>
              <h4 style="color: var(--vd-color-primary)">
                Browse Documentation
              </h4>
              <p class="vd-text-muted vd-mb-5">
                Explore all components, utilities, and code examples.
              </p>
              <RouterLink
                to="/docs-landing"
                class="vd-btn vd-btn-outline vd-btn-ring"
              >
                Documentation
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.seemore-home {
  padding: 4.5rem 0 3.5rem;
  background:
    radial-gradient(
      ellipse 70% 60% at 85% 20%,
      color-mix(in srgb, var(--vd-color-primary) 14%, transparent),
      transparent 55%
    ),
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--vd-bg-secondary) 55%, transparent),
      transparent
    );
}
.seemore-home-title {
  margin: 0 0 1rem;
  font-size: clamp(1.85rem, 3.2vw, 2.75rem);
  line-height: 1.15;
  color: var(--vd-color-primary);
}
.seemore-home-lead {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  line-height: 1.55;
  max-width: 36rem;
}
.seemore-home-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* Extra room for 2px ring + 6px gap on the primary CTA */
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.seemore-home-cta .vd-btn + .vd-btn {
  margin-left: 0;
}

@media (max-width: 991px) {
  .seemore-home-cta {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
  }

  .seemore-home-cta .vd-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-self: center;
    width: 100%;
    box-sizing: border-box;
  }
}

.seemore-home-stage {
  min-height: 16rem;
  border-radius: var(--vd-radius-fib-8, 0.75rem);
  padding: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
}
.seemore-home-panel {
  max-width: 22rem;
  width: 100%;
  border-radius: var(--vd-radius-fib-8, 0.75rem);
  padding: 1.35rem 1.5rem;
}
.seemore-home-kicker {
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vd-color-primary);
}
@media (min-width: 992px) {
  .seemore-home-stage {
    margin-top: 0;
  }
}
</style>
