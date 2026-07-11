<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

const relatedComponents = [
  {
    to: "/components/button",
    icon: "ph-cursor-click",
    title: "Button",
    desc: ".btn → .vd-btn, same variants and sizes.",
    badge: "Component",
  },
  {
    to: "/components/card",
    icon: "ph-credit-card",
    title: "Card",
    desc: ".card / .card-body map straight to vd- equivalents.",
    badge: "Component",
  },
  {
    to: "/components/alert",
    icon: "ph-warning",
    title: "Alert",
    desc: ".alert → .vd-alert with the same contextual colours.",
    badge: "Component",
  },
  {
    to: "/components/badge",
    icon: "ph-tag",
    title: "Badge",
    desc: ".badge → .vd-badge, pills and counters included.",
    badge: "Component",
  },
];

const beforeHtml = `<!-- Bootstrap -->
<button class="btn btn-primary btn-lg">Save</button>
<div class="card"><div class="card-body">…</div></div>`;

const afterHtml = `<!-- Vanduo -->
<button class="vd-btn vd-btn-primary vd-btn-lg">Save</button>
<div class="vd-card"><div class="vd-card-body">…</div></div>`;

const vanillaToVueJs = `// Vanilla → vd2: same classes, behaviour moves to components/composables
// Before (Vanilla):
//   <div data-vd-tooltip>…</div>   + Vanduo.init()
// After (vd2):
const root = ref<HTMLElement | null>(null);
useTooltips(root);   // the markup/classes stay identical`;

const classMap: [string, string][] = [
  [".btn / .btn-primary", ".vd-btn / .vd-btn-primary"],
  [".card / .card-body", ".vd-card / .vd-card-body"],
  [".row / .col-md-6", ".vd-row / .vd-col-md-6"],
  [".badge / .alert", ".vd-badge / .vd-alert"],
  ["utility: .mt-3 / .text-center", ".vd-mt-3 / .vd-text-center"],
];
</script>

<template>
  <section id="migration-comparison">
    <h5 class="demo-title">
      <i class="ph ph-arrows-down-up"></i>Migration
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Two migrations matter here: moving <strong>to Vanduo</strong> from another
      CSS framework, and moving <strong>from the Vanilla engine to vd2</strong>.
      Both are low-friction because Vanduo's class names are predictable and the
      DOM contract is shared across engines.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-arrow-bend-down-right"></i> From Bootstrap /
              Tailwind
            </h6>
          </div>
          <div class="vd-card-body">
            <p>
              Mostly a prefix change — Vanduo namespaces everything under
              <code>vd-</code>:
            </p>
            <DocCodeSnippet :html="beforeHtml" :default-open="true" />
            <DocCodeSnippet :html="afterHtml" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-arrows-left-right"></i> Common class map</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Other framework</th>
                    <th>Vanduo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in classMap" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>
                      <code>{{ row[1] }}</code>
                    </td>
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
        <h6><i class="ph ph-atom"></i> Vanilla engine → vd2</h6>
      </div>
      <div class="vd-card-body">
        <p>
          Keep your markup and classes. Replace global
          <code>Vanduo.init</code>
          calls with the matching composable, and swap theming for the Pinia
          store:
        </p>
        <DocCodeSnippet :js="vanillaToVueJs" :default-open="true" />
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          See
          <a href="/guides/runtime-architecture">Runtime architecture</a> for
          the full mapping and
          <a href="/guides/theme-customizer">Theme customizer</a> for theming.
        </p>
      </div>
    </div>

    <GuideLinkCards
      class="vd-mt-6"
      icon="ph-arrows-left-right"
      title="The components you'll re-prefix first"
      :links="relatedComponents"
    />
  </section>
</template>
