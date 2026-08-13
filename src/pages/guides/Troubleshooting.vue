<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const issues: [string, string, string][] = [
  [
    "Components look unstyled",
    "The vd3 stylesheet is not loaded.",
    "Add import '@vanduo-oss/vd3/css'; once in your entry file (or '@vanduo-oss/vd3/css/core' if you supply your own icon fonts).",
  ],
  [
    "A Vd* component renders but does nothing",
    "Unexpected — VdButton, VdModal, VdTabs, and the other Vd* components self-wire on mount.",
    "You do not call useX(root) for a Vd* component. Check that the component is imported from '@vanduo-oss/vd3' and that VanduoVue is installed if the issue is theme persistence.",
  ],
  [
    "Class-markup (data-vd-*) does nothing",
    "No composable is wired to that subtree.",
    'This is the vanilla-host path. Call the matching useX(root) composable (useSuggest, useLazyLoad, useGlass, …) and bind ref="root" on an ancestor.',
  ],
  [
    "Build fails: 'window is not defined'",
    "Code touches window or document at module scope or in setup().",
    "Do not put typeof window guards inside onMounted — that hook never runs on the server. Keep window/document off module and setup scope; defer to onMounted.",
  ],
  [
    "Bare import won't resolve in the browser",
    "The package needs a bundler (Vite, Rollup, webpack, …).",
    "It is not ESM-only: dist/index.js (ESM) and dist/index.cjs (CJS) both ship. There is no IIFE/CDN bundle.",
  ],
  [
    "Theme doesn't persist on reload",
    "The VanduoVue plugin isn't installed, storage is blocked, or another app on this origin collides on keys.",
    "Install via app.use(VanduoVue). useThemePreference() re-hydrates from storage on the client — there is no init() to call. Pass storagePrefix if two apps share an origin.",
  ],
  [
    "Popup appears in the wrong place",
    "Body-appended overlays position on scroll/resize.",
    "Ensure the page is mounted and the input is visible before opening.",
  ],
  [
    "Hydration mismatch warning",
    "Server and client rendered different markup.",
    "Keep render output deterministic; defer client-only DOM work to onMounted.",
  ],
];

const vdVsComposable = `<script setup lang="ts">
import { ref } from 'vue';
import { VdButton, useSuggest } from '@vanduo-oss/vd3';

// Vd* components self-wire — no composable call.
const root = ref<HTMLElement | null>(null);
useSuggest(root); // only needed for [data-vd-suggest] markup
<\/script>

<template>
  <VdButton variant="primary">Works on its own</VdButton>

  <div ref="root">
    <input class="vd-input" data-vd-suggest='["Alpha","Beta"]'>
  </div>
</template>`;
</script>

<template>
  <section id="troubleshooting">
    <h5 class="demo-title">
      <i class="ph ph-wrench"></i>Troubleshooting
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      The most common issues when building with vd3, and the one-line fix for
      each. Most trace back to a missing CSS import, mixing the Vd* component
      model with class-markup composables, or touching the DOM during server
      rendering.
    </p>

    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-first-aid-kit"></i> Symptoms &amp; fixes</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Likely cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in issues" :key="row[0]">
                <td>
                  <strong>{{ row[0] }}</strong>
                </td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          Still stuck? The
          <RouterLink to="/guides/runtime-architecture"
            >vd3 Architecture</RouterLink
          >
          guide explains the wiring model in depth.
        </p>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-plugs-connected"></i> Vd* vs class-markup</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-3">
          If you copied Getting started, you are on the Vd* path. Class names
          like <code>data-vd-suggest</code> need a composable; a
          <code>VdButton</code> does not.
        </p>
        <DocCodeSnippet :js="vdVsComposable" :default-open="true" />
      </div>
    </div>
  </section>
</template>
