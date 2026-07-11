<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const iifeHtml = `<!-- IIFE: a single global, no build step, perfect for static HTML -->
<link rel="stylesheet" href="dist/vanduo.min.css">
<script src="dist/vanduo.min.js"><\/script>
<script>Vanduo.init();<\/script>`;

const esmJs = `// ESM: bare specifiers, resolved by a bundler (Vite/Rollup/webpack)
import '@vanduo-oss/framework/css';
import { Vanduo } from '@vanduo-oss/framework';
Vanduo.init(document);`;

const vueJs = `// vd2 (Vue engine): ESM-only, no Vanduo.init at all
import '@vanduo-oss/framework/css';
// behaviour comes from Vue components + composables, not a global runtime
import VdButton from '@vanduo-oss/vd2/components/VdButton.vue';`;

const matrix: [string, string, string][] = [
  ["Build step", "None (drop-in)", "Bundler required"],
  ["Module system", "Global Vanduo (IIFE)", "ESM bare imports"],
  ["Tree-shaking", "No (whole bundle)", "Yes (per import)"],
  ["Best for", "Static HTML, CDN, embeds", "SPAs / SSR with a bundler"],
];
</script>

<template>
  <section id="esm-vs-iife">
    <h5 class="demo-title">
      <i class="ph ph-brackets-curly"></i>ESM vs IIFE vs Vue
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      The Vanilla framework ships <strong>two builds</strong> from one codebase:
      an IIFE bundle for plain HTML and an ESM build for bundlers. vd2 adds a
      third path entirely — a Vue 3 engine that is ESM-only and has no global
      runtime. Pick the one that matches how your app is built.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-file-html"></i> IIFE (no build)</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="iifeHtml" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-package"></i> ESM (bundler)</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="esmJs" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-atom"></i> Vue (vd2)</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="vueJs" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-table"></i> Choosing a build</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Concern</th>
                    <th>IIFE</th>
                    <th>ESM / Vue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in matrix" :key="row[0]">
                    <td>
                      <strong>{{ row[0] }}</strong>
                    </td>
                    <td>{{ row[1] }}</td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-warning"></i> Common pitfall</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-alert vd-alert-warning vd-mb-0">
          <i class="ph ph-warning"></i>
          <div>
            Bare specifiers like <code>@vanduo-oss/framework</code> cannot be
            resolved by a browser on their own — they need a bundler. If you are
            writing static HTML with no build step, use the IIFE bundle (or the
            CDN) instead. See
            <RouterLink to="/guides/getting-started">Getting started</RouterLink
            >.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
