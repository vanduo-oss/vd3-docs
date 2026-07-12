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
    desc: "The source of truth lives as DTCG-format JSON under tokens/ (primitive scales, semantic colors, customizer metadata). Nothing above this layer hard-codes a hex value.",
  },
  {
    n: "2",
    icon: "ph-swatches",
    title: "Generated color CSS",
    desc: "The token build turns that JSON into --vd-* custom-property layers — raw scales plus an active palette with a [data-palette] switch — and a flat tokens.json for design tooling.",
  },
  {
    n: "3",
    icon: "ph-file-css",
    title: "Absorbed component CSS",
    desc: "The CSS build inlines the generated token layers together with the core, primitive, component, utility and effect stylesheets into one bundle — the whole design system in a single import.",
  },
  {
    n: "4",
    icon: "ph-atom",
    title: "Vue components & composables",
    desc: "Typed Vd* single-file components and useX composables read those same tokens/classes at runtime. They ship as a tree-shakeable ESM/CJS barrel with .d.ts types.",
  },
];

// The public entry points a consumer imports — each maps to one dist artifact.
const entryPoints: [string, string][] = [
  [
    "@vanduo-oss/vd3",
    "The typed, tree-shakeable barrel: every Vd* component, every useX composable, the VanduoVue plugin, and shared types.",
  ],
  [
    "@vanduo-oss/vd3/css",
    "The full absorbed stylesheet — tokens, layout, every component, utilities, effects, and the bundled icon font. Import once.",
  ],
  [
    "@vanduo-oss/vd3/css/core",
    "The same stylesheet without the bundled Phosphor icon fonts, for apps that supply their own icons.",
  ],
  [
    "@vanduo-oss/vd3/tokens.json",
    'The flat { "--vd-name": value } token map (Figma-ready), for design tooling and codegen.',
  ],
];

const buildChain = `# How the package is built (you consume the prebuilt dist/)
clean-dist         # wipe dist/
build-tokens.mjs   # DTCG JSON  ->  generated color CSS + tokens.json
build-css.mjs      # inline every layer  ->  vd3.min.css (+ core, icon-free)
vite build         # SFCs  ->  ESM/CJS barrel
vue-tsc            # emit .d.ts types
check-class-coverage.mjs   # verify every documented class ships`;

const consumerJs = `// main.ts — the entire vd3 wiring, no runtime to bootstrap
import { createApp } from 'vue';
import { VanduoVue } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';          // absorbed component CSS, one import
import App from './App.vue';

createApp(App).use(VanduoVue).mount('#app');`;

const behaviourJs = `// Behaviour ships as plain Vue — components own their own lifecycle
import { VdModal, VdToast } from '@vanduo-oss/vd3';
import { useToast, useTheme } from '@vanduo-oss/vd3';

// A composable wires listeners on mount and tears them down on unmount;
// there is no global registry and no imperative DOM scan to remember.
const toast = useToast();
toast.success('Saved');`;
</script>

<template>
  <section id="runtime-architecture">
    <h5 class="demo-title">
      <i class="ph ph-circuitry"></i>vd3 Architecture
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      vd3 is a single, standalone Vue 3 package. Everything is generated in one
      direction —
      <strong
        >design tokens → generated color CSS → absorbed component CSS → typed
        components &amp; composables</strong
      >
      — so the styling and the behaviour always agree on the same
      <code>--vd-*</code> tokens and <code>vd-*</code> classes. There is no
      separate runtime to boot: the components <em>are</em> the runtime.
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
              Each layer above surfaces as a stable published entry point. A Vue
              app only ever touches two of them; the rest are there for tooling.
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
            <h6><i class="ph ph-gear"></i> The build chain</h6>
          </div>
          <div class="vd-card-body">
            <p>
              The layers are produced by a deterministic, top-to-bottom build.
              You never run it — you install the prebuilt <code>dist/</code> —
              but it shows how one source of tokens becomes CSS and components:
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
              Consuming it is two imports: the stylesheet once, and the
              <code>VanduoVue</code> plugin for theme defaults. That is the
              whole setup.
            </p>
            <DocCodeSnippet :js="consumerJs" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-atom"></i> No global runtime</h6>
      </div>
      <div class="vd-card-body">
        <p>
          Behaviour is not injected by a global object that scans the DOM. Every
          interactive piece is a Vue component or composable that wires its own
          listeners on mount and cleans them up on unmount — reactive,
          tree-shakeable, and tied to the component lifecycle.
        </p>
        <DocCodeSnippet :js="behaviourJs" :default-open="true" />
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          There is no standalone script to load and no global object to
          initialise — the package is pure Vue, so it tree-shakes with your app
          and cleans up with your components.
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
          desc: 'Install the package, import the CSS, register the plugin.',
          badge: 'Guide',
        },
        {
          to: '/guides/vanduo-ecosystem',
          icon: 'ph-stack',
          title: 'The Vanduo ecosystem',
          desc: 'How vd3-docs, vd3, and vd3-cbun fit together.',
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
