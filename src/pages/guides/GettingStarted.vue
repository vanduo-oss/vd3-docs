<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

const nextLinks = [
  {
    to: "/guides/first-layout",
    icon: "ph-layout",
    title: "Your first layout",
    desc: "Grid, containers, and breakpoints.",
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
    to: "/guides/utilities-cheat-sheet",
    icon: "ph-list-bullets",
    title: "Utilities cheat sheet",
    desc: "The spacing and text helpers at a glance.",
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

// ── Vue 3 path ──────────────────────────────────────────────
const scaffoldShell = `pnpm create vite my-app --template vue-ts
cd my-app
pnpm add @vanduo-oss/vue`;

const mainJs = `// main.ts — register VD2 and its styles
import { createApp } from 'vue';
import { VanduoVue } from '@vanduo-oss/vue';
import '@vanduo-oss/vue/css';
import App from './App.vue';

createApp(App).use(VanduoVue).mount('#app');`;

const pageHtml = `<!-- App.vue — import VD2 components and compose -->
<script setup lang="ts">
import { VdCard, VdButton } from '@vanduo-oss/vue';
<\/script>

<template>
  <VdCard>
    <h1 class="vd-h1">Build fast with Vanduo</h1>
    <p class="vd-lead vd-text-muted">First-class Vue 3 components.</p>
    <VdButton variant="primary" size="lg">Get started</VdButton>
  </VdCard>
</template>`;
</script>

<template>
  <section id="getting-started">
    <h5 class="demo-title">
      <i class="ph ph-rocket-launch"></i>Getting Started
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Get a Vanduo-styled page running in a few minutes. The same design system
      ships two ways — pick yours with the engine toggle in the sidebar:
      <strong>Vue 3</strong> (Vite + components) or <strong>Vanilla</strong>
      (drop-in CSS/JS, no build step).
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
              <i class="ph ph-number-circle-two"></i> Register VD2 &amp; its
              styles
            </h6>
          </div>
          <div class="vd-card-body">
            <p>
              Add the <code>VanduoVue</code> plugin and the stylesheet once in
              your entry file:
            </p>
            <DocCodeSnippet :js="mainJs" :default-open="true" />
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
              <code>@vanduo-oss/vue</code> — typed, tree-shakeable, ready to
              use:
            </p>
            <DocCodeSnippet :html="pageHtml" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <GuideLinkCards icon="ph-compass" title="Next steps" :links="nextLinks" />
  </section>
</template>
