<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

const installShell = `# The Vue 3 component library (tokens + CSS + components)
pnpm add @vanduo-oss/vd3

# Optional — the canvas bundle (charts, flowchart, hex-grid, music-player)
pnpm add @vanduo-oss/vd3-cbun`;

const mainJs = `// main.ts — register the plugin and the stylesheet once
import { createApp } from 'vue';
import { VanduoVue } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';
import App from './App.vue';

createApp(App).use(VanduoVue).mount('#app');`;

const optionsJs = `// The plugin takes an optional themeDefaults override, shallow-merged
// over the generated baseline and applied synchronously on install.
app.use(VanduoVue, {
  themeDefaults: { PRIMARY_DARK: 'green' },
});`;

const usageHtml = `<!-- App.vue — import typed Vd* components and compose -->
<script setup lang="ts">
import { VdCard, VdButton } from '@vanduo-oss/vd3';
<\/script>

<template>
  <VdCard>
    <h1 class="vd-h1">Build fast with Vanduo</h1>
    <p class="vd-lead vd-text-muted">First-class Vue 3 components.</p>
    <VdButton variant="primary" size="lg">Get started</VdButton>
  </VdCard>
</template>`;

const cbunJs = `// Canvas components live under @vanduo-oss/vd3-cbun subpaths,
// each with its own stylesheet.
import { VdChart } from '@vanduo-oss/vd3-cbun/charts';
import '@vanduo-oss/vd3-cbun/charts/css';`;

const ssgJs = `// main.ts — SSR / SSG entry with vite-ssg
import { ViteSSG } from 'vite-ssg';
import { VanduoVue } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';
import App from './App.vue';
import { routes } from './routes';

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  // Set your theme default here so the first prerendered paint matches.
  app.use(VanduoVue, { themeDefaults: { PRIMARY_DARK: 'green' } });
});`;

const pluginOptions: [string, string, string][] = [
  [
    "themeDefaults",
    "Partial<ThemeDefaults>",
    "Site-specific overrides shallow-merged over the generated theme baseline (e.g. { PRIMARY_DARK: 'green' }). Applied synchronously on install, before the theme model first reads its defaults. Optional.",
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
      vd3 is a standalone Vue 3 package. Getting a Vanduo-styled app running is
      three steps: install <code>@vanduo-oss/vd3</code>, import its stylesheet
      once, and register the <code>VanduoVue</code> plugin. No global runtime,
      no build-tool plugin, no post-mount initialisation.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-number-circle-one"></i> Install the package</h6>
          </div>
          <div class="vd-card-body">
            <p>
              Add the core package. Reach for
              <code>@vanduo-oss/vd3-cbun</code> only when you need the canvas
              components (charts, flowchart, hex-grid, music-player).
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
              <code>VanduoVue</code> only applies theme defaults — pass
              <code>themeDefaults</code> to override the generated baseline:
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
            <DocCodeSnippet :html="usageHtml" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Canvas components come from the <code>@vanduo-oss/vd3-cbun</code>
              subpaths and carry their own CSS:
            </p>
            <DocCodeSnippet :js="cbunJs" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-cloud-arrow-up"></i> vite-ssg &amp; SSR</h6>
      </div>
      <div class="vd-card-body">
        <p>
          Every <code>Vd*</code> component is SSR-safe — no
          <code>window</code> or DOM access at module or setup scope, with
          browser-only work (observers, listeners) deferred to
          <code>onMounted</code>. So the components prerender and hydrate
          cleanly under vite-ssg, Nuxt, or your own SSR. Register the plugin
          inside the <code>vite-ssg</code> setup callback:
        </p>
        <DocCodeSnippet :js="ssgJs" :default-open="true" />
        <ul class="vd-mt-4">
          <li>
            Import <code>@vanduo-oss/vd3/css</code> in the entry so the
            stylesheet is baked into the prerendered HTML (no flash of unstyled
            content).
          </li>
          <li>
            Set your theme default via <code>themeDefaults</code> in the setup
            callback so the first server-rendered paint matches the client.
          </li>
          <li>
            This very site is built with <code>vite-ssg</code> and prerenders
            every route against these components.
          </li>
        </ul>
      </div>
    </div>

    <GuideLinkCards
      icon="ph-compass"
      title="Next steps"
      :links="[
        {
          to: '/guides/runtime-architecture',
          icon: 'ph-circuitry',
          title: 'vd3 Architecture',
          desc: 'Tokens to CSS to components — how the package is built.',
          badge: 'Guide',
        },
        {
          to: '/guides/migration',
          icon: 'ph-arrows-left-right',
          title: 'Migrating from vanduo v2 to vd3',
          desc: 'Package map, import changes, and API diffs.',
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
