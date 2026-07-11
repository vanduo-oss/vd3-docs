<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

const relatedComponents = [
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
  --vd-radius-fib-5: 0.5rem;
  --vd-font-family-base: 'Inter', sans-serif;
}`;

const scopedCss = `/* Scope overrides to a subtree — e.g. a "danger zone" panel */
.danger-zone {
  --vd-color-primary: var(--vd-color-danger);
}`;

const darkCss = `/* Dark mode just remaps the same token names */
[data-theme="dark"] {
  --vd-bg-primary: #0f1117;
  --vd-text-primary: #e6e8ee;
}`;

// useThemeBridge — sync an app-owned light/dark toggle onto Vanduo (vue 0.3.0).
const bridgeJs = `import { computed } from 'vue';
import { useThemeBridge } from '@vanduo-oss/vue';
import { useColorMode } from '@nuxtjs/color-mode'; // any owner of light/dark

// Vanduo keys dark mode off [data-theme] on <html>. When another system owns
// the toggle, hand it that system's mode ref and Vanduo follows along:
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
      <i class="ph ph-paint-roller"></i>CSS Variables &amp; Theming
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Every colour, space, radius, and font in Vanduo is a CSS custom property
      (<code>--vd-*</code>). Override them in your own stylesheet and the whole
      system updates — no recompile, no JavaScript. This token layer is shared
      by both engines and is owned by <code>@vanduo-oss/core</code>.
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
          In vd2 you rarely write this by hand — the
          <a href="/guides/theme-customizer">theme store</a> flips
          <code>data-theme</code> for you.
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
          <code>@vanduo-oss/vue</code> keeps Vanduo in sync with it instead of
          adding a second source of truth.
        </p>
        <DocCodeSnippet :js="bridgeJs" :default-open="true" />
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          Pass a <code>Ref&lt;'light' | 'dark' | 'system'&gt;</code>. The bridge
          re-syncs on mount and whenever the ref changes — useful for SSR / Nuxt
          apps where the host framework owns colour mode.
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
