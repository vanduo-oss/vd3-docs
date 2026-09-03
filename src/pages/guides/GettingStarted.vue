<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";
import { VdButton, VdCard } from "@vanduo-oss/vd3";
import { RouterLink } from "vue-router";

const nextLinks = [
  {
    to: "/guides/framework-integration",
    icon: "ph-plug",
    title: "Installation & Integration",
    desc: "Plugin options, CBUN widgets, vite-ssg, and Nuxt.",
    badge: "Guide",
  },
  {
    to: "/guides/first-layout",
    icon: "ph-layout",
    title: "Your first layout",
    desc: "Grid, containers, and a minimal page shell.",
    badge: "Guide",
  },
  {
    to: "/guides/css-variables",
    icon: "ph-sliders",
    title: "CSS variables & theming",
    desc: "Make the system yours with token overrides.",
    badge: "Guide",
  },
  {
    to: "/components/button",
    icon: "ph-cursor-click",
    title: "Browse components",
    desc: "Start with Button and explore the reference.",
    badge: "Component",
  },
];

const scaffoldShell = `pnpm create vite my-app --template vue-ts
cd my-app
pnpm add @vanduo-oss/vd3`;

const mainJs = `// main.ts — register vd3 and its styles
import { createApp } from 'vue';
import { VanduoVue } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';
import App from './App.vue';

createApp(App).use(VanduoVue).mount('#app');`;

const pageJs = `<script setup lang="ts">
import { VdCard, VdButton } from '@vanduo-oss/vd3';
<\/script>

<template>
  <VdCard>
    <h1>Build fast with vd3</h1>
    <p class="vd-text-lg vd-text-muted">First-class Vue 3 components.</p>
    <VdButton variant="primary" size="lg">Get started</VdButton>
  </VdCard>
</template>`;
</script>

<template>
  <section id="getting-started">
    <h5 class="demo-title">
      <i class="ph ph-rocket-launch"></i>Getting started
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      A five-minute path to a vd3-styled page with <strong>Vue 3</strong> —
      Vite, one CSS import, the <code>VanduoVue</code> plugin, and a named
      <code>VdCard</code> / <code>VdButton</code>. For plugin options, Nuxt, and
      the canvas bundle, use
      <RouterLink to="/guides/framework-integration"
        >Installation &amp; Integration</RouterLink
      >.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-number-circle-one"></i> Scaffold a Vue project
            </h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :shell="scaffoldShell" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-number-circle-two"></i> Register vd3 &amp; its
              styles
            </h6>
          </div>
          <div class="vd-card-body">
            <p>
              Add the <code>VanduoVue</code> plugin and the stylesheet once in
              your entry file. The plugin applies theme defaults and a storage
              prefix — it does <strong>not</strong> register components
              globally.
            </p>
            <DocCodeSnippet :js="mainJs" :default-open="true" />
            <div class="vd-alert vd-alert-info vd-mt-4">
              <i class="ph ph-tree"></i>
              <div>
                <strong>What tree-shakes.</strong> Named JS imports
                (<code>VdButton</code>, <code>useToast</code>) tree-shake.
                <code>@vanduo-oss/vd3/css</code> is the full stylesheet — not a
                PurgeCSS slice. Use <code>@vanduo-oss/vd3/css/core</code> only
                if you want the same tree without bundled icon fonts.
              </div>
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
              Import each <code>Vd*</code> you use from
              <code>@vanduo-oss/vd3</code>:
            </p>
            <VdCard class="vd-mb-4">
              <h1>Build fast with vd3</h1>
              <p class="vd-text-lg vd-text-muted">
                First-class Vue 3 components.
              </p>
              <VdButton variant="primary" size="lg">Get started</VdButton>
            </VdCard>
            <DocCodeSnippet :js="pageJs" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Optional:
              <code>@vanduo-oss/vd3-cbun</code> adds charts, code-editor, draw,
              flowchart, hex-grid, and music-player on their own subpaths. See
              Installation for the full list.
            </p>
          </div>
        </div>
      </div>
    </div>

    <GuideLinkCards icon="ph-compass" title="Next steps" :links="nextLinks" />
  </section>
</template>
