<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const pinShell = `# Pin exact versions so visual output is reproducible
pnpm add @vanduo-oss/vd3@1.3.0
# Optional canvas widgets
pnpm add @vanduo-oss/vd3-cbun@1.3.1`;

const entryJs = `// main.ts — CSS once, plugin once, named JS imports elsewhere
import { createApp } from 'vue';
import { VanduoVue } from '@vanduo-oss/vd3';
import '@vanduo-oss/vd3/css';
import App from './App.vue';

createApp(App)
  .use(VanduoVue, {
    storagePrefix: 'my-app-',
    themeDefaults: { PRIMARY_DARK: 'green' },
  })
  .mount('#app');`;

const practices: [string, string][] = [
  [
    "Pin package versions",
    "Lock @vanduo-oss/vd3 and @vanduo-oss/vd3-cbun so visual output is reproducible.",
  ],
  [
    "Import CSS once",
    "@vanduo-oss/vd3/css is the full stylesheet. /css/core drops icon fonts only — it is not a tokens-only or per-component slice. Do not duplicate the bundle in your app CSS.",
  ],
  [
    "Named JS imports",
    "Import the Vd* components and composables you use. VanduoVue does not register them globally, which is what lets unused JS tree-shake.",
  ],
  [
    "Prefetch theme defaults",
    "Pass themeDefaults (and storagePrefix on shared origins) at app.use time so the first paint matches.",
  ],
  [
    "SSR guards at module/setup scope",
    "Do not read window or document until onMounted. A typeof window check inside onMounted never runs on the server.",
  ],
  [
    "Code-split heavy widgets",
    "Dynamic import() for routes and defineAsyncComponent for CBUN widgets. See Lazy loading.",
  ],
];
</script>

<template>
  <section id="production-best-practices">
    <h5 class="demo-title">
      <i class="ph ph-rocket"></i>Production
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      How to ship an app that consumes vd3: pin versions, import CSS once, keep
      JS named so it tree-shakes, and keep DOM work off the server. This is not
      a runbook for building these docs.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-package"></i> Pin versions</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :shell="pinShell" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-plug"></i> Entry file</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="entryJs" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Mount <code>VdToastContainer</code> once in
              <code>App.vue</code> if you call <code>useToast()</code>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-list-checks"></i> Production checklist</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Practice</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in practices" :key="row[0]">
                <td>
                  <strong>{{ row[0] }}</strong>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          See also
          <RouterLink to="/guides/lazy-loading">Lazy loading</RouterLink>
          and
          <RouterLink to="/guides/troubleshooting">Troubleshooting</RouterLink>.
        </p>
      </div>
    </div>
  </section>
</template>
