<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useSidenav } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useSidenav(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useSidenav } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useSidenav(root);   // wires [data-sidenav-toggle] triggers; cleanup on unmount`;

const vanillaWiring = `// Wire every [data-sidenav-toggle] trigger (document, or a root element)
VanduoSidenav.init();

// control programmatically
VanduoSidenav.open(sidenavEl);
VanduoSidenav.close(sidenavEl);`;

const structureHtml = `<!-- Trigger button -->
<button class="vd-btn vd-btn-primary" data-sidenav-toggle="#demo-sidenav">
  Open Sidenav
</button>

<aside class="vd-sidenav" id="demo-sidenav" aria-label="Menu">
  <div class="vd-sidenav-header">
    <h3 class="vd-sidenav-title">Menu</h3>
    <button class="vd-sidenav-close" aria-label="Close">&times;</button>
  </div>
  <div class="vd-sidenav-body">
    <ul class="vd-sidenav-nav">
      <li class="vd-sidenav-item active"><a class="vd-sidenav-link" href="#">Overview</a></li>
      <li class="vd-sidenav-item"><a class="vd-sidenav-link" href="#">Settings</a></li>
    </ul>
  </div>
</aside>`;

const variants: [string, string][] = [
  [".vd-sidenav-right", "Open from right side"],
  [".vd-sidenav-push", "Push content on desktop"],
  [".vd-sidenav-fixed", "Persistent desktop sidebar"],
  [".vd-sidenav-sm", "Small width (233px)"],
  [".vd-sidenav-lg", "Large width (377px)"],
];

const cssVars: [string, string][] = [
  ["--vd-sidenav-width", "233px"],
  ["--vd-sidenav-width-lg", "377px"],
  ["--vd-sidenav-bg", "var(--vd-color-white)"],
  ["--vd-sidenav-overlay-bg", "rgba(0, 0, 0, 0.35)"],
  ["--vd-sidenav-z-index", "1040"],
  ["--vd-sidenav-overlay-z-index", "1030"],
  [
    "--vd-sidenav-transition",
    "transform var(--vd-transition-duration-slow) var(--vd-transition-ease)",
  ],
];

const apiRows: [string, string, string][] = [
  [
    ".vd-sidenav",
    "Base container for the off-canvas side drawer.",
    "Component",
  ],
  [
    ".vd-sidenav-header",
    "Header area containing the title and close button.",
    "Layout",
  ],
  [
    ".vd-sidenav-title",
    "Typography class for the sidenav header text.",
    "Element",
  ],
  [".vd-sidenav-close", "Button to explicitly close the sidenav.", "Action"],
  [
    ".vd-sidenav-body",
    "Scrollable content container for the main drawer area.",
    "Layout",
  ],
  [
    ".vd-sidenav-nav",
    "Wrapper for an unordered list of navigation items.",
    "Layout",
  ],
  [
    ".vd-sidenav-item",
    "Individual list item. Add .active for current state.",
    "Component",
  ],
  [
    ".vd-sidenav-link",
    "Clickable anchor element within a sidenav item.",
    "Element",
  ],
  [
    ".vd-sidenav-[variant]",
    "Modifiers defining behavior/positioning (-right, -push, -fixed, -sm, -lg).",
    "Modifier",
  ],
  [
    'data-sidenav-toggle="#id"',
    "Attribute placed on any trigger element (like a button) to open/close the targeted sidenav.",
    "Attribute",
  ],
];
</script>

<template>
  <section id="sidenav" ref="root">
    <h5 class="demo-title"><i class="ph ph-sidebar"></i>Sidenav</h5>
    <p class="vd-mb-8">
      Create overlay, push, or fixed side drawers with canonical
      <code>vd-sidenav-*</code> variants.
    </p>

    <!-- Rendered Demo -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Sidenav Demo</h6></div>
          <div class="vd-card-body">
            <button
              class="vd-btn vd-btn-primary"
              data-sidenav-toggle="#demo-sidenav-inline"
            >
              <i class="ph ph-sidebar"></i> Open Sidenav
            </button>
          </div>
        </div>
        <aside class="vd-sidenav" id="demo-sidenav-inline" aria-label="Menu">
          <div class="vd-sidenav-header">
            <h3 class="vd-sidenav-title">Menu</h3>
            <button class="vd-sidenav-close" aria-label="Close">&times;</button>
          </div>
          <div class="vd-sidenav-body">
            <ul class="vd-sidenav-nav">
              <li class="vd-sidenav-item active">
                <a class="vd-sidenav-link" href="#" @click.prevent
                  ><i class="ph ph-house"></i> Home</a
                >
              </li>
              <li class="vd-sidenav-item">
                <a class="vd-sidenav-link" href="#" @click.prevent
                  ><i class="ph ph-user"></i> Profile</a
                >
              </li>
              <li class="vd-sidenav-item">
                <a class="vd-sidenav-link" href="#" @click.prevent
                  ><i class="ph ph-gear"></i> Settings</a
                >
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>

    <!-- Basic Structure + Variants -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic Structure</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="structureHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Variants</h6></div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in variants" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-4">
              Runtime state classes: <code>.is-open</code> on sidenav and
              <code>.body-sidenav-open</code> on body.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CSS Variables -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>CSS Variables</h6></div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in cssVars" :key="row[0]">
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

    <h4 class="docs-heading">Wiring</h4>
    <div style="margin-bottom: 2rem">
      <EngineSwitch>
        <template #vue3
          ><DocCodeSnippet :js="vue3Wiring" :default-open="true"
        /></template>
        <template #vanilla
          ><DocCodeSnippet :js="vanillaWiring" :default-open="true"
        /></template>
      </EngineSwitch>
    </div>

    <h4 id="api" class="docs-heading">API Reference</h4>
    <div class="vd-table-responsive" style="margin-bottom: 3rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 25%">Class Name / Attribute</th>
            <th style="width: 55%">Description</th>
            <th style="width: 20%">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in apiRows" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
            <td>{{ row[2] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
