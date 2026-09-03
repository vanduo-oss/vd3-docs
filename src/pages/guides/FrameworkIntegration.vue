<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";
import { RouterLink } from "vue-router";

const installShell = `# The Vue 3 component library (tokens + CSS + components)
pnpm add @vanduo-oss/vd3

# Optional — canvas widgets (charts, code-editor, draw, flowchart, hex-grid, music-player)
pnpm add @vanduo-oss/vd3-cbun`;

const mainJs = `// main.ts — register the plugin and the stylesheet once
import { createApp } from 'vue';
import { VanduoVue } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';
import App from './App.vue';

createApp(App).use(VanduoVue).mount('#app');`;

const optionsJs = `// Plugin options apply synchronously on install, before the first storage read.
app.use(VanduoVue, {
  storagePrefix: 'my-app-',           // default 'vanduo-'
  themeDefaults: { PRIMARY_DARK: 'green' },
});`;

const usageJs = `<script setup lang="ts">
import { VdCard, VdButton } from '@vanduo-oss/vd3';
<\/script>

<template>
  <VdCard>
    <h1>Build fast with vd3</h1>
    <p class="vd-text-lg vd-text-muted">First-class Vue 3 components.</p>
    <VdButton variant="primary" size="lg">Get started</VdButton>
  </VdCard>
</template>`;

const cbunJs = `// Each widget lives on its own subpath. Most ship a matching /css entry.
import { VdChart } from '@vanduo-oss/vd3-cbun/charts';
import '@vanduo-oss/vd3-cbun/charts/css';

import { VdCodeEditor } from '@vanduo-oss/vd3-cbun/code-editor';
import '@vanduo-oss/vd3-cbun/code-editor/css';

import { VdDraw } from '@vanduo-oss/vd3-cbun/draw';
import '@vanduo-oss/vd3-cbun/draw/css';

import { VdFlowchart } from '@vanduo-oss/vd3-cbun/flowchart';
import '@vanduo-oss/vd3-cbun/flowchart/css';

import { VdHexGrid } from '@vanduo-oss/vd3-cbun/hex-grid';
// hex-grid is canvas-rendered — it ships no stylesheet.

import { VdMusicPlayer } from '@vanduo-oss/vd3-cbun/music-player';
import '@vanduo-oss/vd3-cbun/music-player/css';`;

const ssgJs = `// main.ts — SSR / SSG entry with vite-ssg
import { ViteSSG } from 'vite-ssg';
import { VanduoVue } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';
import App from './App.vue';
import { routes } from './routes';

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(VanduoVue, {
    storagePrefix: 'my-app-',
    themeDefaults: { PRIMARY_DARK: 'green' },
  });
});`;

const nuxtConfigJs = `// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@vanduo-oss/vd3/css'],
});`;

const nuxtPluginJs = `// plugins/vanduo.client.ts
import { VanduoVue } from '@vanduo-oss/vd3';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VanduoVue, {
    storagePrefix: 'my-app-',
    themeDefaults: { PRIMARY_DARK: 'green' },
  });
});`;

const nuxtBridgeJs = `// Optional: keep vd3 in sync with @nuxtjs/color-mode
import { computed } from 'vue';
import { useThemeBridge } from '@vanduo-oss/vd3';
import { useColorMode } from '#imports';

const colorMode = useColorMode();
useThemeBridge(computed(() => colorMode.preference as 'light' | 'dark' | 'system'));`;

const pluginOptions: [string, string, string][] = [
  [
    "themeDefaults",
    "Partial<ThemeDefaults>",
    "Site-specific overrides shallow-merged over the generated theme baseline (e.g. { PRIMARY_DARK: 'green' }). Applied synchronously on install, before the theme model first reads its defaults. Optional.",
  ],
  [
    "storagePrefix",
    "string",
    'localStorage key prefix for theme preferences (default "vanduo-"). Applied synchronously on install, before the first storage read. Use a unique prefix when two apps share an origin so keys do not collide. Example: "labs-" → labs-theme-preference, labs-palette, …',
  ],
];
</script>

<template>
  <section id="framework-integration">
    <h5 class="demo-title">
      <i class="ph ph-plug"></i>Installation &amp; Integration
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Reference for installing <code>@vanduo-oss/vd3</code>: plugin options, the
      optional canvas bundle, vite-ssg, and Nuxt. For a five-minute first page,
      start at
      <RouterLink to="/guides/getting-started">Getting started</RouterLink>. vd3
      is Vue 3 only.
    </p>

    <div class="vd-alert vd-alert-info vd-mb-6">
      <i class="ph ph-tree"></i>
      <div>
        <strong>What tree-shakes.</strong> Named JS imports tree-shake.
        <code>VanduoVue</code> does not register components globally — import
        each <code>Vd*</code> you use. <code>@vanduo-oss/vd3/css</code> is the
        full stylesheet; <code>/css/core</code> is the same tree without bundled
        icon fonts, not a tokens-only sheet.
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-number-circle-one"></i> Install the package</h6>
          </div>
          <div class="vd-card-body">
            <p>
              Add the core package. Reach for
              <code>@vanduo-oss/vd3-cbun</code> only when you need a canvas
              widget (charts, code-editor, draw, flowchart, hex-grid,
              music-player).
            </p>
            <DocCodeSnippet :shell="installShell" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-number-circle-two"></i> Register the plugin &amp;
              styles
            </h6>
          </div>
          <div class="vd-card-body">
            <p>
              Import <code>@vanduo-oss/vd3/css</code> once in your entry file so
              the whole stylesheet is loaded, then install the plugin:
            </p>
            <DocCodeSnippet :js="mainJs" :default-open="true" />
            <p class="vd-mt-4">
              <code>VanduoVue</code> only applies theme defaults and the storage
              prefix — it does not register components globally:
            </p>
            <DocCodeSnippet :js="optionsJs" />
            <div class="vd-table-responsive vd-mt-4">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in pluginOptions" :key="row[0]">
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
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-number-circle-three"></i> Use the components
            </h6>
          </div>
          <div class="vd-card-body">
            <p>
              Import <code>Vd*</code> components from
              <code>@vanduo-oss/vd3</code> — typed, tree-shakeable, ready to
              compose:
            </p>
            <DocCodeSnippet :js="usageJs" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Canvas components come from the
              <code>@vanduo-oss/vd3-cbun</code> subpaths. Five of six ship a
              matching <code>/css</code> file; hex-grid does not:
            </p>
            <DocCodeSnippet :js="cbunJs" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-cloud-arrow-up"></i> vite-ssg &amp; SSR</h6>
      </div>
      <div class="vd-card-body">
        <p>
          Every <code>Vd*</code> component is SSR-safe — no
          <code>window</code> or DOM access at module or setup scope, with
          browser-only work (observers, listeners) deferred to
          <code>onMounted</code>. Register the plugin inside the
          <code>vite-ssg</code> setup callback:
        </p>
        <DocCodeSnippet :js="ssgJs" :default-open="true" />
        <ul class="vd-mt-4">
          <li>
            Import <code>@vanduo-oss/vd3/css</code> in the entry so the
            stylesheet is baked into the prerendered HTML (no flash of unstyled
            content).
          </li>
          <li>
            Set <code>themeDefaults</code> (and <code>storagePrefix</code> if
            you need it) in the setup callback so the first server-rendered
            paint matches the client.
          </li>
        </ul>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-app-window"></i> Nuxt</h6>
      </div>
      <div class="vd-card-body">
        <p>
          Load the stylesheet from <code>nuxt.config</code>, then install
          <code>VanduoVue</code> in a <strong>client</strong> plugin so
          localStorage theming stays off the server:
        </p>
        <DocCodeSnippet :js="nuxtConfigJs" :default-open="true" />
        <DocCodeSnippet
          class="vd-mt-3"
          :js="nuxtPluginJs"
          :default-open="true"
        />
        <p class="vd-mt-4">
          If <code>@nuxtjs/color-mode</code> already owns light/dark, bridge it
          instead of adding a second toggle:
        </p>
        <DocCodeSnippet :js="nuxtBridgeJs" />
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          More on the bridge:
          <RouterLink to="/guides/css-variables"
            >CSS variables &amp; theming</RouterLink
          >.
        </p>
      </div>
    </div>

    <GuideLinkCards
      icon="ph-compass"
      title="Next steps"
      :links="[
        {
          to: '/guides/getting-started',
          icon: 'ph-rocket-launch',
          title: 'Getting started',
          desc: 'Scaffold a Vue app and add vd3 in a few minutes.',
          badge: 'Guide',
        },
        {
          to: '/guides/runtime-architecture',
          icon: 'ph-circuitry',
          title: 'vd3 Architecture',
          desc: 'Tokens to CSS to components — how the package is built.',
          badge: 'Guide',
        },
        {
          to: '/components/button',
          icon: 'ph-cursor-click',
          title: 'Browse components',
          desc: 'Start with Button and explore the reference.',
          badge: 'Component',
        },
      ]"
    />
  </section>
</template>
