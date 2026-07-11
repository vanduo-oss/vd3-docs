<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useGlass } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useGlass(root);

// Engine-specific wiring (the markup, classes and data-* are identical; the
// scroll-activation observer logic runs automatically in both engines).
const vue3Wiring = `import { ref } from 'vue';
import { useGlass } from "@vanduo-oss/vue";
import { useNavbarGlassScroll } from "@vanduo-oss/vue";

// Generic scroll-activated glass (data-glass-scroll)
const root = ref<HTMLElement | null>(null);
useGlass(root);   // IntersectionObserver toggles .is-glass-active; cleanup on unmount

// Navbar scroll-activated glass (.vd-navbar-glass)
const navRef = ref<HTMLElement | null>(null);
const isScrolled = useNavbarGlassScroll(navRef);
// <nav ref="navRef" class="vd-navbar vd-navbar-fixed vd-navbar-glass" :class="{ 'vd-navbar-scrolled': isScrolled }">`;

const vanillaWiring = `// The framework auto-initialises scroll-activated glass on Vanduo.init()
VanduoGlass.init();`;

const glassModalOpen = ref(false);

const heroHtml = `<div class="vd-glass vd-glass-lg vd-glass-tinted vd-glass-floating">
  <h4>GlassSurface</h4>
  <p>Use <code>.vd-glass</code> for frosted surfaces over rich backgrounds,
     then add size and behavior modifiers as needed.</p>
  <button class="vd-btn vd-btn-primary">Primary Action</button>
  <button class="vd-btn vd-btn-outline">Secondary</button>
</div>`;

const sizesHtml = `<!-- Size variants: sm / md / lg / xl -->
<div class="vd-glass vd-glass-sm">…</div>
<div class="vd-glass vd-glass-md">…</div>  <!-- == .vd-glass -->
<div class="vd-glass vd-glass-lg">…</div>
<div class="vd-glass vd-glass-xl">…</div>`;

const modifiersHtml = `<!-- Modifiers -->
<div class="vd-glass vd-glass-tinted">…</div>     <!-- tint wash -->
<div class="vd-glass vd-glass-floating">…</div>   <!-- lift on hover -->
<div class="vd-glass vd-glass-contrast">…</div>   <!-- stronger border -->`;

const componentsHtml = `<nav class="vd-navbar vd-navbar-glass">…</nav>
<div class="vd-card vd-card-glass">…</div>
<div class="vd-toast vd-toast-glass">…</div>
<button class="vd-fab vd-fab-glass"><i class="ph ph-plus"></i></button>
<div class="vd-modal vd-modal-glass">…</div>`;

const themingCss = `:root {
  --vd-glass-blur: 14px;
  --vd-glass-bg-opacity: 0.7;
  --vd-glass-shadow: 0 14px 40px rgba(0, 0, 0, 0.2);
}

.marketing-hero .vd-glass {
  --vd-glass-tint: rgba(34, 184, 207, 0.18);
}`;

const navbarGlassHtml = `<nav class="vd-navbar vd-navbar-fixed vd-navbar-glass">
  ...
</nav>

<!-- Custom scroll threshold (px) -->
<nav class="vd-navbar vd-navbar-fixed vd-navbar-glass"
     data-scroll-threshold="120">
  ...
</nav>`;

const scrollHtml = `<!-- Sentinel: the element whose disappearance triggers glass activation -->
<div id="my-sentinel">...</div>

<!-- Glass element: transparent at rest, frosted once sentinel leaves view -->
<div class="vd-glass"
     data-glass-scroll
     data-glass-sentinel="#my-sentinel">
  Sticky panel content
</div>

<!-- Without explicit sentinel: uses the previous sibling automatically -->
<div id="hero">...</div>
<div class="vd-glass" data-glass-scroll>
  Activates when #hero scrolls out of view
</div>`;

const tokens: [string, string, string][] = [
  ["--vd-glass-blur", "Backdrop blur amount", "12px"],
  ["--vd-glass-saturate", "Backdrop saturation boost", "1.8"],
  ["--vd-glass-bg-opacity", "Glass opacity base", "0.65"],
  [
    "--vd-glass-bg-light",
    "Light translucent surface",
    "rgba(255,255,255,var(--vd-glass-bg-opacity))",
  ],
  [
    "--vd-glass-bg-dark",
    "Dark translucent surface",
    "rgba(30,30,30,var(--vd-glass-bg-opacity))",
  ],
  [
    "--vd-glass-border-light",
    "Glass edge stroke",
    "rgba(255,255,255,var(--vd-glass-border-alpha))",
  ],
  ["--vd-glass-highlight-alpha", "Specular sheen intensity", "0.25"],
  [
    "--vd-glass-shadow",
    "Depth shadow for floating glass",
    "0 8px 32px rgba(0,0,0,0.12)",
  ],
  ["--vd-glass-noise-opacity", "Noise grain overlay strength", "0.03"],
];

const sizeVariants = [
  {
    cls: "vd-glass-sm",
    spec: "blur 6px, saturate 1.4, opacity 0.55",
    glassSub: "Lower blur, lighter opacity",
    note: "Look for sharper background detail and a lighter frosted layer.",
  },
  {
    cls: "vd-glass-md",
    spec: "blur 12px, saturate 1.8, opacity 0.65",
    glassSub: "Framework default profile",
    note: "Equivalent to .vd-glass default; use it for explicit readability.",
  },
  {
    cls: "vd-glass-lg",
    spec: "blur 20px, saturate 2.0, opacity 0.72",
    glassSub: "Softer and richer blend",
    note: "Background texture softens while color bleed feels denser.",
  },
  {
    cls: "vd-glass-xl",
    spec: "blur 28px, saturate 2.2, opacity 0.78",
    glassSub: "Strongest soft-focus panel",
    note: "Strongest frosted depth; best for hero overlays and modal foregrounds.",
  },
];
</script>

<template>
  <section id="glass" ref="root">
    <h5 class="demo-title">
      <i class="ph ph-drop-half-bottom"></i>Glass Effects
    </h5>
    <p class="vd-mb-6">
      Vanduo glass effects provide an opt-in frosted surface system built with
      <code>backdrop-filter</code>, translucent layers, highlight sheen, and
      accessibility fallbacks.
    </p>

    <!-- Hero Surface -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-glass-hero" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Hero Surface</h6></div>
          <div
            class="vd-card-body"
            style="
              background:
                radial-gradient(
                  circle at 25% 18%,
                  rgba(255, 255, 255, 0.42) 0%,
                  transparent 30%
                ),
                radial-gradient(
                  circle at 80% 82%,
                  rgba(0, 0, 0, 0.35) 0%,
                  transparent 40%
                ),
                repeating-linear-gradient(
                  120deg,
                  rgba(255, 255, 255, 0.16) 0 18px,
                  rgba(0, 0, 0, 0.09) 18px 36px
                ),
                linear-gradient(
                  130deg,
                  #4f46e5 0%,
                  #8b5cf6 38%,
                  #ec4899 68%,
                  #fb923c 100%
                );
              border-radius: var(--vd-btn-border-radius-lg);
              min-height: 300px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2rem;
            "
          >
            <div
              class="vd-glass vd-glass-lg vd-glass-tinted vd-glass-floating"
              style="
                max-width: 520px;
                width: 100%;
                border-radius: var(--vd-btn-border-radius-lg);
                padding: 1.5rem;
              "
            >
              <h4 style="margin-top: 0">GlassSurface</h4>
              <p style="margin-bottom: 1rem">
                Use <code>.vd-glass</code> for frosted surfaces over rich
                backgrounds, then add size and behavior modifiers as needed.
              </p>
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap">
                <button class="vd-btn vd-btn-primary">Primary Action</button>
                <button class="vd-btn vd-btn-outline">Secondary</button>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="heroHtml" />
      </div>
    </div>

    <!-- Why subtle -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Why Distinctions Can Look Subtle</h6>
          </div>
          <div class="vd-card-body">
            <p class="glass-insight vd-mb-2">
              Blur and opacity are context-dependent. Smooth or homogeneous
              backgrounds can hide what each class changes.
            </p>
            <ul class="vd-mb-0">
              <li>
                <code>.vd-glass-md</code> matches base <code>.vd-glass</code>,
                so they are intentionally equivalent.
              </li>
              <li>
                <code>.vd-glass-floating</code> is primarily an interaction
                state, so static examples can under-sell it.
              </li>
              <li>
                Use textured backdrops and side-by-side comparisons to make
                blur, tint, and contrast differences obvious.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Diagnostics controls (pure-CSS :has) -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card glass-controls-card">
          <div class="vd-card-header">
            <h6>Visual Diagnostics Controls</h6>
          </div>
          <div class="vd-card-body">
            <p class="glass-insight">
              Switch backdrop modes and force floating hover state to inspect
              class differences under the same conditions.
            </p>
            <div
              class="glass-controls"
              role="group"
              aria-label="Glass demo controls"
            >
              <label class="glass-control-chip"
                ><input
                  type="radio"
                  id="glass-bg-mesh"
                  name="glass-backdrop"
                  checked
                />Mesh backdrop</label
              >
              <label class="glass-control-chip"
                ><input
                  type="radio"
                  id="glass-bg-stripes"
                  name="glass-backdrop"
                />Striped backdrop</label
              >
              <label class="glass-control-chip"
                ><input
                  type="radio"
                  id="glass-bg-noise"
                  name="glass-backdrop"
                />Noise backdrop</label
              >
              <label class="glass-control-chip"
                ><input type="checkbox" id="glass-force-hover" />Force floating
                hover</label
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Size + Modifier comparison grids -->
    <div class="vd-row glass-demo-grid">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-glass-sizes" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Size Variants</h6></div>
          <div class="vd-card-body">
            <div class="glass-demo-stage">
              <div
                v-for="v in sizeVariants"
                :key="v.cls"
                class="glass-comparison-row"
              >
                <div class="glass-comparison-head">
                  <strong>.{{ v.cls }}</strong>
                  <small>{{ v.spec }}</small>
                </div>
                <div class="glass-surface-pair">
                  <div class="glass-surface glass-surface-base">
                    <strong>Baseline</strong><span>No glass filter</span>
                  </div>
                  <div class="glass-surface vd-glass" :class="v.cls">
                    <strong>Glass</strong><span>{{ v.glassSub }}</span>
                  </div>
                </div>
                <p class="glass-note">{{ v.note }}</p>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="sizesHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-glass-modifiers" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Modifiers</h6></div>
          <div class="vd-card-body">
            <div class="glass-demo-stage">
              <div class="glass-comparison-row">
                <div class="glass-comparison-head">
                  <strong>.vd-glass-tinted</strong
                  ><small>Adds tint gradient overlay</small>
                </div>
                <div class="glass-surface-pair">
                  <div class="glass-surface vd-glass">
                    <strong>Base glass</strong
                    ><span>Neutral translucent layer</span>
                  </div>
                  <div class="glass-surface vd-glass vd-glass-tinted">
                    <strong>Tinted glass</strong
                    ><span>Adds primary tone wash</span>
                  </div>
                </div>
                <p class="glass-note">
                  Watch for color cast shift while blur and depth remain
                  similar.
                </p>
              </div>
              <div class="glass-comparison-row">
                <div class="glass-comparison-head">
                  <strong>.vd-glass-floating</strong
                  ><small>Lift + shadow on hover/focus</small>
                </div>
                <div class="glass-surface-pair">
                  <div class="glass-surface vd-glass">
                    <strong>Base glass</strong><span>Resting state</span>
                  </div>
                  <div
                    class="glass-surface vd-glass vd-glass-floating glass-floating-target"
                  >
                    <strong>Floating glass</strong
                    ><span>Use control to force hover preview</span>
                  </div>
                </div>
                <p class="glass-note">
                  State-driven modifier; turn on
                  <em>Force floating hover</em> to preview motion cue.
                </p>
              </div>
              <div class="glass-comparison-row">
                <div class="glass-comparison-head">
                  <strong>.vd-glass-contrast</strong
                  ><small>Higher opacity + stronger border</small>
                </div>
                <div class="glass-surface-pair">
                  <div class="glass-surface vd-glass">
                    <strong>Base glass</strong><span>Default legibility</span>
                  </div>
                  <div class="glass-surface vd-glass vd-glass-contrast">
                    <strong>Contrast glass</strong
                    ><span>Better text separation</span>
                  </div>
                </div>
                <p class="glass-note">
                  Use on busy imagery where stronger edge and body contrast
                  improves readability.
                </p>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="modifiersHtml" />
      </div>
    </div>

    <!-- Glass tokens -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i
                class="ph ph-sliders mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >Glass Tokens
            </h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Purpose</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in tokens" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                    <td>
                      <code>{{ row[2] }}</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Component integration -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-glass-components" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Component Integration</h6></div>
          <div
            class="vd-card-body"
            style="
              background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
              border-radius: var(--vd-btn-border-radius);
              padding: 1rem;
            "
          >
            <div
              class="vd-navbar vd-navbar-glass"
              style="
                border-radius: var(--vd-btn-border-radius);
                margin-bottom: 1rem;
              "
            >
              <a class="vd-navbar-brand" href="#" @click.prevent>Vanduo</a>
              <ul
                class="vd-navbar-nav"
                style="position: static; transform: none"
              >
                <li>
                  <a class="vd-nav-link active" href="#" @click.prevent
                    >Glass</a
                  >
                </li>
                <li>
                  <a class="vd-nav-link" href="#" @click.prevent>Docs</a>
                </li>
              </ul>
            </div>
            <div class="vd-row">
              <div class="vd-col-12 vd-col-md-6">
                <div
                  class="vd-card vd-card-glass"
                  style="border-radius: var(--vd-btn-border-radius)"
                >
                  <div class="vd-card-header">Card Glass</div>
                  <div class="vd-card-body">
                    Apply <code>.vd-card-glass</code> for elevated frosted
                    cards.
                  </div>
                </div>
              </div>
              <div class="vd-col-12 vd-col-md-6">
                <div
                  class="vd-toast vd-toast-glass is-visible"
                  style="position: static; transform: none; width: 100%"
                >
                  <div class="vd-toast-content">
                    <div class="vd-toast-title">Toast Glass</div>
                    <div class="vd-toast-message">
                      Use <code>.vd-toast-glass</code> for floating
                      notifications.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="display: flex; justify-content: flex-end; margin-top: 1rem"
            >
              <button class="vd-fab vd-fab-glass" aria-label="Glass action">
                <i class="ph ph-plus"></i>
              </button>
            </div>
            <button
              class="vd-btn vd-btn-primary vd-mt-3"
              @click="glassModalOpen = true"
            >
              Open Glass Modal
            </button>
            <div
              class="vd-modal vd-modal-glass"
              :class="{ 'is-open': glassModalOpen }"
              id="glass-modal-demo"
            >
              <div
                class="vd-modal-backdrop vd-modal-glass-backdrop"
                @click="glassModalOpen = false"
              ></div>
              <div class="vd-modal-dialog">
                <div class="vd-modal-content">
                  <div class="vd-modal-header">
                    <h4 class="vd-modal-title">Modal Glass</h4>
                    <button
                      class="vd-modal-close"
                      aria-label="Close"
                      @click="glassModalOpen = false"
                    >
                      &times;
                    </button>
                  </div>
                  <div class="vd-modal-body">
                    The <code>.vd-modal-glass</code> variant applies frosted
                    glass styling to modal surfaces.
                  </div>
                  <div class="vd-modal-footer">
                    <button
                      class="vd-btn vd-btn-secondary"
                      @click="glassModalOpen = false"
                    >
                      Close
                    </button>
                    <button class="vd-btn vd-btn-primary">Confirm</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="componentsHtml" />
      </div>
    </div>

    <!-- Accessibility + Theming -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i
                class="ph ph-wheelchair mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >Accessibility
            </h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>
                Glass classes include
                <code>prefers-reduced-transparency: reduce</code> fallbacks that
                disable blur and return to solid surfaces.
              </li>
              <li>
                Floating interactions respect
                <code>prefers-reduced-motion: reduce</code>.
              </li>
              <li>
                Use <code>.vd-glass-contrast</code> on busy backgrounds to
                improve text legibility.
              </li>
              <li>
                Keep body text contrast above WCAG AA by testing overlays in
                both light and dark themes.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i
                class="ph ph-paint-brush mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >Theming
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-3">
              Override glass tokens per app, theme, or component scope.
            </p>
            <DocCodeSnippet :css="themingCss" default-open />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll-activated glass -->
    <div class="vd-row vd-mt-8">
      <div class="vd-col-12">
        <h5 class="vd-mb-2">
          <i
            class="ph ph-arrow-up mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >Scroll-Activated Glass
        </h5>
        <p class="vd-mb-4">
          Two complementary APIs let you activate glass effects on scroll rather
          than at page-load time. The framework handles all the
          observer/listener logic — no custom JavaScript required beyond a
          single wiring call.
        </p>
        <EngineSwitch>
          <template #vue3
            ><DocCodeSnippet :js="vue3Wiring" :default-open="true"
          /></template>
          <template #vanilla
            ><DocCodeSnippet :js="vanillaWiring" :default-open="true"
          /></template>
        </EngineSwitch>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6 class="vd-mb-0">
              <code>.vd-navbar-glass</code> — Navbar scroll activation
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-3">
              Add <code>.vd-navbar-glass</code> to any
              <code>.vd-navbar-fixed</code> or <code>.vd-navbar-sticky</code>.
              The navbar starts fully transparent and gains the frosted glass
              surface once the user scrolls past its height (or a custom
              threshold set with <code>data-scroll-threshold</code>). The
              <code>.vd-navbar-scrolled</code> class is toggled automatically by
              the framework.
            </p>
            <DocCodeSnippet :html="navbarGlassHtml" default-open />
            <p
              class="vd-mt-3 vd-mb-0"
              style="font-size: 0.875rem; color: var(--vd-text-secondary)"
            >
              The docs navbar above is a live example — scroll this page to see
              the effect.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card" style="height: 100%">
          <div class="vd-card-header">
            <h6 class="vd-mb-0">
              <code>data-glass-scroll</code> — Generic activation
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-3">
              Any element — sidebar, floating panel, sticky header — can adopt
              scroll-aware glass by pairing <code>.vd-glass</code> with the
              <code>data-glass-scroll</code> attribute. The framework uses
              <code>IntersectionObserver</code> to watch a sentinel element
              (previous sibling by default, or a CSS selector via
              <code>data-glass-sentinel</code>) and toggles
              <code>.is-glass-active</code> automatically.
            </p>
            <ul class="vd-mb-0" style="font-size: 0.9rem">
              <li>No JavaScript required in your markup</li>
              <li>Works on any scrollable container, not just the window</li>
              <li>
                CSS handles the inactive→active transition via
                <code>transition</code>
              </li>
              <li>Falls back to always-active when no sentinel is found</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-glass-scroll" class="vd-card demo-card">
          <div class="vd-card-header"><h6 class="vd-mb-0">Live demo</h6></div>
          <div
            class="vd-card-body"
            style="
              padding: 0;
              overflow: hidden;
              border-radius: 0 0 var(--vd-btn-border-radius-lg)
                var(--vd-btn-border-radius-lg);
            "
          >
            <div
              style="height: 260px; overflow-y: auto; position: relative"
              id="glass-scroll-demo-container"
            >
              <div
                id="glass-scroll-sentinel"
                style="
                  height: 80px;
                  background: linear-gradient(135deg, #8ec5fc 0%, #e0c3fc 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <span style="font-size: 0.8rem; opacity: 0.75"
                  >↑ scroll sentinel</span
                >
              </div>
              <div
                style="
                  padding: 1.5rem;
                  background: linear-gradient(160deg, #d9afd9 0%, #97d9e1 100%);
                  min-height: 400px;
                "
              >
                <div
                  class="vd-glass vd-glass-tinted"
                  data-glass-scroll
                  data-glass-sentinel="#glass-scroll-sentinel"
                  style="
                    position: sticky;
                    top: 0;
                    padding: 0.75rem 1rem;
                    border-radius: var(--vd-btn-border-radius);
                    z-index: 10;
                    margin-bottom: 1rem;
                  "
                >
                  <span style="font-size: 0.875rem; font-weight: 500"
                    >Sticky glass panel — activates on scroll</span
                  >
                </div>
                <p style="font-size: 0.875rem; opacity: 0.8; margin: 0">
                  Scroll inside this box to see the glass surface activate once
                  the sentinel element above leaves the viewport.
                </p>
                <div style="height: 300px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <DocCodeSnippet :html="scrollHtml" />
      </div>
    </div>
  </section>
</template>

<style>
#glass .glass-insight {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vd-text-secondary);
}
#glass .glass-controls-card .vd-card-body {
  display: grid;
  gap: 0.75rem;
}
#glass .glass-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
}
#glass .glass-control-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--vd-border-primary);
  background: var(--vd-bg-secondary);
  font-size: 0.82rem;
  cursor: pointer;
  user-select: none;
}
#glass .glass-control-chip input {
  accent-color: var(--vd-color-primary);
}
#glass .glass-demo-grid .vd-card-body {
  border-radius: var(--vd-btn-border-radius);
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
}
#glass .glass-demo-stage {
  --glass-stage-bg: linear-gradient(
    140deg,
    #5b8cff 0%,
    #a65eea 38%,
    #e05f8b 70%,
    #f7b267 100%
  );
  background:
    radial-gradient(
      circle at 78% 20%,
      rgba(255, 255, 255, 0.22),
      transparent 36%
    ),
    radial-gradient(circle at 20% 75%, rgba(10, 26, 76, 0.36), transparent 46%),
    repeating-linear-gradient(
      115deg,
      rgba(255, 255, 255, 0.12) 0 18px,
      rgba(0, 0, 0, 0.07) 18px 36px
    ),
    var(--glass-stage-bg);
  border-radius: var(--vd-btn-border-radius);
  padding: 0.8rem;
  display: grid;
  gap: 0.75rem;
}
#glass .glass-comparison-row {
  border-radius: calc(var(--vd-btn-border-radius) - 2px);
  background: rgba(6, 8, 17, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.65rem;
  color: #f4f7ff;
}
#glass .glass-comparison-head {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: baseline;
  margin-bottom: 0.55rem;
}
#glass .glass-comparison-head small {
  font-size: 0.72rem;
  opacity: 0.9;
}
#glass .glass-surface-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}
#glass .glass-surface {
  border-radius: var(--vd-btn-border-radius);
  padding: 0.6rem;
  min-height: 74px;
  display: grid;
  align-content: center;
  gap: 0.25rem;
  font-size: 0.78rem;
}
#glass .glass-surface-base {
  background: rgba(14, 20, 38, 0.43);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgba(245, 247, 255, 0.92);
}
#glass .glass-note {
  margin: 0.55rem 0 0;
  font-size: 0.75rem;
  color: rgba(245, 247, 255, 0.88);
}
#glass:has(#glass-bg-stripes:checked) .glass-demo-grid .glass-demo-stage {
  --glass-stage-bg: linear-gradient(
    135deg,
    #2563eb 0%,
    #9333ea 52%,
    #f97316 100%
  );
  background:
    repeating-linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.18) 0 16px,
      rgba(0, 0, 0, 0.11) 16px 32px
    ),
    linear-gradient(135deg, #2563eb 0%, #9333ea 52%, #f97316 100%);
}
#glass:has(#glass-bg-noise:checked) .glass-demo-grid .glass-demo-stage {
  --glass-stage-bg: linear-gradient(
    155deg,
    #334155 0%,
    #4338ca 48%,
    #be185d 100%
  );
  background:
    radial-gradient(
      circle at 12% 14%,
      rgba(255, 255, 255, 0.18),
      transparent 28%
    ),
    radial-gradient(circle at 82% 78%, rgba(0, 0, 0, 0.34), transparent 44%),
    repeating-radial-gradient(
      circle at 18% 15%,
      rgba(255, 255, 255, 0.065) 0 2px,
      rgba(0, 0, 0, 0.055) 2px 5px
    ),
    var(--glass-stage-bg);
}
#glass:has(#glass-force-hover:checked) .glass-demo-grid .glass-floating-target {
  transform: translateY(var(--vd-glass-float-translate-y));
  box-shadow: var(--vd-glass-float-shadow);
}
</style>
