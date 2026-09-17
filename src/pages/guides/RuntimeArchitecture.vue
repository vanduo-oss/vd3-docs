<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

// Single-package (vd3) architecture: one standalone Vue 3 line. Each layer is
// generated from the one below it, ending in typed components + composables.
const layers: {
  n: string;
  icon: string;
  title: string;
  desc: string;
}[] = [
  {
    n: "1",
    icon: "ph-palette",
    title: "Design tokens (DTCG)",
    desc: "DTCG JSON defines color scales and theme metadata.",
  },
  {
    n: "2",
    icon: "ph-swatches",
    title: "Generated color CSS",
    desc: "The token build generates color variables and tokens.json for tooling.",
  },
  {
    n: "3",
    icon: "ph-file-css",
    title: "Component CSS",
    desc: "Authored layout, component, utility, and effect styles share the generated colors.",
  },
  {
    n: "4",
    icon: "ph-atom",
    title: "Vue components & composables",
    desc: "Typed Vue components and composables use the shared styles and manage their own listeners.",
  },
];

// The public entry points a consumer imports — each maps to one dist artifact.
const entryPoints: [string, string][] = [
  [
    "@vanduo-oss/vd3",
    "Named components, composables, the optional configuration plugin, and types.",
  ],
  ["@vanduo-oss/vd3/css", "Full CSS, including icons. Import once."],
  [
    "@vanduo-oss/vd3/css/core",
    "Full CSS without bundled icons. Supply your own icons.",
  ],
  [
    "@vanduo-oss/vd3/tokens.json",
    'Flat { "--vd-name": value } map for tooling.',
  ],
];

const buildChain = `# How the package is built (you consume the prebuilt dist/)
clean-dist         # wipe dist/
build-tokens.mjs   # DTCG JSON  ->  generated color CSS + tokens.json
build-css.mjs      # inline every layer  ->  vd3.min.css (+ core, icon-free)
vite build         # SFCs  ->  ESM/CJS barrel
vue-tsc            # emit .d.ts types
check-class-coverage.mjs   # verify every documented class ships`;

const consumerJs = `// main.ts — optional theme defaults; import components in your .vue files
import { createApp } from 'vue';
import { VanduoVue } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';          // choose one stylesheet
import App from './App.vue';

createApp(App).use(VanduoVue).mount('#app');`;

const behaviourJs = `// Theme and toast state is currently shared within the loaded module.
import { VdToastContainer, useToast, useThemePreference } from '@vanduo-oss/vd3';

// Mount <VdToastContainer /> once (e.g. in App.vue) so toasts have somewhere to go.
const toast = useToast();
toast.success('Saved');

const theme = useThemePreference();
theme.setTheme('dark');`;
</script>

<template>
  <section id="runtime-architecture">
    <h5 class="demo-title">
      <i class="ph ph-circuitry"></i>vd3 Architecture
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      vd3 combines design tokens, CSS, and typed Vue components. Import the
      components you use and one stylesheet. The layers below explain how they
      fit together.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div
          v-for="layer in layers"
          :key="layer.n"
          class="vd-card demo-card layer-card"
        >
          <div class="vd-card-body layer-body">
            <span class="layer-index">{{ layer.n }}</span>
            <div>
              <h6 class="layer-head">
                <i :class="`ph ${layer.icon}`"></i> {{ layer.title }}
              </h6>
              <p class="vd-text-sm vd-text-muted vd-mb-0 vd-mt-2">
                {{ layer.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-package"></i> What you import</h6>
          </div>
          <div class="vd-card-body">
            <p>
              Start with named component imports and either the full or
              icon-free stylesheet.
            </p>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Entry point</th>
                    <th>What it is</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in entryPoints" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-gear"></i> How the package is built</h6>
          </div>
          <div class="vd-card-body">
            <p>
              Maintainers run this pipeline. Applications install its prebuilt
              output.
            </p>
            <DocCodeSnippet :shell="buildChain" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-plug"></i> Wiring an app</h6>
          </div>
          <div class="vd-card-body">
            <p>
              <code>VanduoVue</code> sets optional theme defaults. Import each
              component where you use it; the plugin does not register
              components.
            </p>
            <DocCodeSnippet :js="consumerJs" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-atom"></i> Lifecycle and shared state</h6>
      </div>
      <div class="vd-card-body">
        <p>
          Components attach listeners on mount and clean them up on unmount.
          Theme preferences and toast queues use module-wide state.
        </p>
        <DocCodeSnippet :js="behaviourJs" :default-open="true" />
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          A storage prefix changes persistence keys; it does not isolate apps.
          Avoid writing request-specific theme or toast state during SSR.
        </p>
      </div>
    </div>

    <GuideLinkCards
      icon="ph-compass"
      title="Next steps"
      :links="[
        {
          to: '/guides/framework-integration',
          icon: 'ph-plug',
          title: 'Installation & Integration',
          desc: 'Install, choose CSS, and import components.',
          badge: 'Guide',
        },
        {
          to: '/guides/vd3-ecosystem',
          icon: 'ph-stack',
          title: 'vd3 ecosystem',
          desc: 'How the design system, charts, flowchart, and docs fit together.',
          badge: 'Guide',
        },
        {
          to: '/guides/css-variables',
          icon: 'ph-sliders',
          title: 'CSS variables & theming',
          desc: 'Override the generated token layer for your brand.',
          badge: 'Guide',
        },
      ]"
    />
  </section>
</template>

<style scoped>
.layer-card {
  margin-bottom: 1rem;
}

.layer-body {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.layer-index {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  font-weight: 700;
  color: var(--vd-color-primary);
  background: rgba(var(--vd-color-primary-rgb), 0.12);
}

.layer-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
}
</style>
