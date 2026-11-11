<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";
import { RouterLink } from "vue-router";

const relatedComponents = [
  {
    to: "/core/motion",
    icon: "ph-wave-sine",
    title: "Motion",
    desc: "Fibonacci duration tokens and golden easing curves.",
    badge: "Core",
  },
  {
    to: "/core/color-palette",
    icon: "ph-palette",
    title: "Color palette",
    desc: "Every palette and semantic token you can override.",
    badge: "Core",
  },
  {
    to: "/components/theme-switcher",
    icon: "ph-palette",
    title: "Theme switcher",
    desc: "Drop-in light / dark / system toggle.",
    badge: "Component",
  },
  {
    to: "/components/theme-customizer",
    icon: "ph-sliders",
    title: "Theme customizer",
    desc: "Live-edit tokens and preview the result instantly.",
    badge: "Component",
  },
];

const overrideCss = `/* Override tokens in your own stylesheet — cascades everywhere */
:root {
  --vd-color-primary: #6366f1;
  --vd-color-primary-dark: #4f46e5;
  --vd-text-on-primary: #ffffff;
  --vd-radius-fib-5: 0.5rem;
  --vd-font-family-sans: 'Inter', sans-serif;
}`;

const scopedCss = `/* Scope overrides to a subtree — e.g. a "danger zone" panel */
.danger-zone {
  --vd-color-primary: var(--vd-color-danger);
}`;

const darkCss = `/* Flipping data-theme (or useThemePreference().setTheme) is enough.
   The stylesheet already remaps --vd-bg-primary, --vd-text-primary, and
   related tokens. Hex overrides below are optional brand tweaks. */
[data-theme="dark"] {
  --vd-color-primary: #6366f1; /* optional brand override */
}`;

// useThemeBridge — sync an app-owned light/dark toggle onto vd3.
const bridgeJs = `import { computed } from 'vue';
import { useThemeBridge } from '@vanduo-oss/vd3';
import { useColorMode } from '@nuxtjs/color-mode'; // any owner of light/dark

// vd3 keys dark mode off [data-theme] on <html>. When another system owns
// the toggle, hand it that system's mode ref and vd3 follows along:
const colorMode = useColorMode();
useThemeBridge(computed(() => colorMode.preference));

// On mount and on every change, the bridge sets [data-theme] AND re-derives
// the default accent for the active scheme — no duplicate toggle UI needed.`;

const tiers: [string, string][] = [
  [
    "Palette",
    "--vd-blue-6, --vd-gray-0…9 — active scales (Open Color by default; --vd-oc-*/--vd-fib-* are the raw palette sources)",
  ],
  [
    "Semantic",
    "--vd-color-primary, --vd-bg-primary, --vd-text-primary, --vd-border-color",
  ],
  ["Component", "--vd-btn-border-radius, --vd-card-bg — per-component knobs"],
];
</script>

<template>
  <section id="css-variables">
    <h5 class="demo-title">
      <i class="ph ph-paint-roller"></i>CSS variables &amp; theming
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Every color, space, radius, and font in vd3 is a CSS custom property
      (<code>--vd-*</code>). Override them in your own stylesheet and the whole
      system updates — no recompile, no JavaScript. This token layer ships with
      <code>@vanduo-oss/vd3</code>.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-globe"></i> Global overrides</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :css="overrideCss" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-selection"></i> Scoped overrides</h6>
          </div>
          <div class="vd-card-body">
            <p>Custom properties cascade, so you can re-theme one subtree:</p>
            <DocCodeSnippet :css="scopedCss" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-stack"></i> The three token tiers</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Tier</th>
                    <th>Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in tiers" :key="row[0]">
                    <td>
                      <strong>{{ row[0] }}</strong>
                    </td>
                    <td>
                      <code>{{ row[1] }}</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Semantic tokens reference palette tokens; component tokens
              reference semantic ones. Override at the tier that matches your
              intent.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-moon"></i> Dark mode is the same mechanism</h6>
      </div>
      <div class="vd-card-body">
        <DocCodeSnippet :css="darkCss" :default-open="true" />
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          You rarely write this by hand —
          <code>useThemePreference().setTheme('dark')</code> or the
          <RouterLink to="/guides/theme-customizer"
            >theme customizer</RouterLink
          >
          flips <code>data-theme</code> and the stylesheet remaps the tokens.
        </p>
      </div>
    </div>

    <div id="theme-bridge" class="vd-card demo-card vd-mt-6">
      <div class="vd-card-header">
        <h6>
          <i class="ph ph-arrows-left-right"></i> Bridge an app-owned toggle
          <code class="vd-text-sm">Vue 3</code>
        </h6>
      </div>
      <div class="vd-card-body">
        <p>
          Already have a light/dark toggle (e.g.
          <code>@nuxtjs/color-mode</code>, a Pinia store, or your own ref)? The
          <code>useThemeBridge</code> composable from
          <code>@vanduo-oss/vd3</code> keeps vd3 in sync with it instead of
          adding a second source of truth.
        </p>
        <DocCodeSnippet :js="bridgeJs" :default-open="true" />
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          Pass a <code>Ref&lt;'light' | 'dark' | 'system'&gt;</code>. The bridge
          re-syncs on mount and whenever the ref changes — useful for SSR / Nuxt
          apps where the host framework owns color mode.
        </p>
      </div>
    </div>

    <div id="motion-tokens" class="vd-card demo-card vd-mt-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-wave-sine"></i> Motion &amp; Animation Tokens</h6>
      </div>
      <div class="vd-card-body">
        <p>
          vd3 transitions are driven by <code>--vd-duration-*</code> tokens
          based on the Fibonacci sequence and <code>--vd-ease-*</code> tokens
          based on golden-ratio cubic-bezier curves:
        </p>
        <div class="vd-table-responsive vd-mb-4">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Default Value</th>
                <th>Recommended Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>--vd-duration-instant</code></td>
                <td><code>55ms</code></td>
                <td>Active states, tap feedback</td>
              </tr>
              <tr>
                <td><code>--vd-duration-fast</code></td>
                <td><code>89ms</code></td>
                <td>Toggles, icons, reduced-motion crossfades</td>
              </tr>
              <tr>
                <td><code>--vd-duration-snappy</code></td>
                <td><code>144ms</code></td>
                <td>Tooltips, small badges</td>
              </tr>
              <tr>
                <td><code>--vd-duration-normal</code></td>
                <td><code>233ms</code></td>
                <td>Dropdowns, selects, chips</td>
              </tr>
              <tr>
                <td><code>--vd-duration-moderate</code></td>
                <td><code>377ms</code></td>
                <td>Drawers, modals, offcanvas</td>
              </tr>
              <tr>
                <td><code>--vd-duration-slow</code></td>
                <td><code>610ms</code></td>
                <td>Accordions, code snippets, large unfolds</td>
              </tr>
              <tr>
                <td><code>--vd-duration-gentle</code></td>
                <td><code>987ms</code></td>
                <td>Page transitions, hero unfolds</td>
              </tr>
              <tr>
                <td><code>--vd-ease-out</code></td>
                <td><code>cubic-bezier(0.16, 1, 0.3, 1)</code></td>
                <td>Entrances, reveals, unfolds (golden curve)</td>
              </tr>
              <tr>
                <td><code>--vd-ease-in</code></td>
                <td><code>cubic-bezier(0.7, 0, 0.84, 0)</code></td>
                <td>Exits, dismissals, closing dialogs</td>
              </tr>
              <tr>
                <td><code>--vd-ease-in-out</code></td>
                <td><code>cubic-bezier(0.65, 0, 0.35, 1)</code></td>
                <td>Symmetric transitions (tabs, loops)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="vd-text-sm vd-text-muted vd-mb-0">
          Override any duration token globally on <code>:root</code> or locally
          within a component wrapper. See the
          <RouterLink to="/core/motion">Motion foundation guide</RouterLink> for
          live demos.
        </p>
      </div>
    </div>

    <GuideLinkCards
      class="vd-mt-6"
      icon="ph-paint-roller"
      title="Theming in action"
      :links="relatedComponents"
    />
  </section>
</template>
