<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const routeJs = `// vd2 splits each route into its own chunk — loaded on demand
const routes = [
  { path: '/components/datepicker',
    component: () => import('@/pages/components/Datepicker.vue') },
  { path: '/changelog',
    component: () => import('@/pages/changelog.vue') }, // heavy → its own chunk
];`;

const componentJs = `// Defer a heavy widget until it is actually rendered
import { defineAsyncComponent } from 'vue';
const VdChart = defineAsyncComponent(
  () => import('@/components/VdChart.vue'),
);`;

const imgHtml = `<!-- Native lazy images need no JS at all -->
<img src="hero.jpg" loading="lazy" decoding="async" alt="…">`;

const tactics: [string, string][] = [
  [
    "Route-level splitting",
    "Dynamic import() in the router — each page is its own chunk.",
  ],
  [
    "Async components",
    "defineAsyncComponent for heavy below-the-fold widgets.",
  ],
  ["Native lazy images", 'loading="lazy" — zero JavaScript, browser-driven.'],
  [
    "IntersectionObserver",
    "Activate effects (glass, parallax) only when scrolled into view.",
  ],
];
</script>

<template>
  <section id="lazy-loading">
    <h5 class="demo-title">
      <i class="ph ph-spinner-gap"></i>Lazy Loading
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      The Vanilla engine lazy-loads component modules from a global registry. In
      vd2 the bundler does the heavy lifting: Vite splits code along dynamic
      <code>import()</code> boundaries, so you ship only what a route needs and
      defer the rest until it is rendered or scrolled into view.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-signpost"></i> Route-level code splitting</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="routeJs" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              The ~4,000-line changelog, for example, lives in its own chunk and
              never loads on other pages.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-cube"></i> Async components</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="componentJs" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-image"></i> Native lazy assets</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="imgHtml" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-list-checks"></i> Tactics at a glance</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Tactic</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tactics" :key="row[0]">
                <td>
                  <strong>{{ row[0] }}</strong>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
