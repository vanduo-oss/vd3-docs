<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const vueJs = `// Vue 3 — use the vd2 engine directly
import '@vanduo-oss/framework/css';
import { createApp } from 'vue';
import App from './App.vue';
createApp(App).mount('#app');`;

const reactJs = `// React / Svelte / Angular — use the framework CSS + run init after mount
import '@vanduo-oss/framework/css';
import { Vanduo } from '@vanduo-oss/framework';
import { useEffect, useRef } from 'react';

function Panel() {
  const ref = useRef(null);
  useEffect(() => {
    Vanduo.init(ref.current);          // wire the subtree
    return () => Vanduo.destroy(ref.current); // tear down on unmount
  }, []);
  return <div ref={ref} data-tooltip="Hi">…</div>;
}`;

const staticHtml = `<!-- Plain HTML / server-rendered — the IIFE bundle -->
<link rel="stylesheet" href="dist/vanduo.min.css">
<script src="dist/vanduo.min.js"><\/script>
<script>Vanduo.init();<\/script>`;
</script>

<template>
  <section id="framework-integration">
    <h5 class="demo-title">
      <i class="ph ph-puzzle-piece"></i>Framework Integration
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Vanduo's styling is just CSS, so it drops into any stack. How you wire the
      <em>behaviour</em> depends on the host framework: Vue apps use the vd2
      engine, other frameworks use the Vanilla runtime scoped to a mounted
      subtree, and static pages use the IIFE bundle.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-atom"></i> Vue 3</h6>
          </div>
          <div class="vd-card-body">
            <p>
              Use vd2 components and composables — no global runtime needed.
            </p>
            <DocCodeSnippet :js="vueJs" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-atom-simple"></i> React / others</h6>
          </div>
          <div class="vd-card-body">
            <p>
              Load the CSS, then scope <code>Vanduo.init</code> to the mounted
              node and destroy on unmount.
            </p>
            <DocCodeSnippet :js="reactJs" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-file-html"></i> Plain HTML / SSR templates</h6>
      </div>
      <div class="vd-card-body">
        <DocCodeSnippet :html="staticHtml" :default-open="true" />
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          The key rule across stacks: initialise <strong>after</strong> the host
          framework has rendered the DOM, and tear down before it removes it.
          See
          <a href="/guides/lifecycle-manager">Lifecycle &amp; cleanup</a> and
          <a href="/guides/esm-vs-iife">ESM vs IIFE</a>.
        </p>
      </div>
    </div>
  </section>
</template>
