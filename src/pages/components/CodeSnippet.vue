<script setup lang="ts">
// NOTE: there is no `components/code-snippet.html` in the original docs (nav.ts
// points the route at a non-existent file). This page is authored from the
// real component — framework/css/components/code-snippet.css +
// framework/js/components/code-snippet.js — which powers every "View Code"
// block across these docs (the DocCodeSnippet component used below).
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const vue3Usage = `<script setup lang="ts">
import { VdCodeSnippet } from "@vanduo-oss/vue";
const code = "const x = 1;";
<\/script>

<template>
  <VdCodeSnippet :code="code" language="javascript" />
</template>`;

const vue3Api: [string, string][] = [
  [":code", "The code string to display."],
  [":language", 'Highlight language (default "html").'],
  [":copyable", "Show a copy button (default true)."],
];

const basicHtml = `<div class="vd-code-snippet" data-collapsible>
  <button class="vd-code-snippet-toggle" aria-expanded="false">
    <span class="vd-code-snippet-toggle-icon"></span>
    <span>View Code</span>
  </button>
  <div class="vd-code-snippet-content">
    <div class="vd-code-snippet-body">
      <pre class="vd-code-snippet-pane is-active" data-lang="html"><code>...</code></pre>
    </div>
  </div>
</div>`;

const demoCss = `.my-element {
  color: var(--vd-color-primary);
  border-radius: var(--vd-radius-fib-5);
}`;

const demoJs = `VanduoCodeSnippet.init();

document.addEventListener('codesnippet:toggle', (e) => {
  console.log('expanded:', e.detail.expanded);
});`;

const classRows: [string, string][] = [
  [
    ".vd-code-snippet",
    "Root wrapper. Add data-collapsible to make it a togglable View Code block.",
  ],
  [
    ".vd-code-snippet-toggle",
    "The “View Code” button that expands/collapses the content.",
  ],
  [
    ".vd-code-snippet-toggle-icon",
    "Chevron indicator inside the toggle, rotated by state.",
  ],
  [
    ".vd-code-snippet-content",
    "The collapsible region holding the header and body.",
  ],
  [
    ".vd-code-snippet-header",
    "Row holding the language tabs and the copy button.",
  ],
  [
    ".vd-code-snippet-tabs",
    "Tablist wrapping one .vd-code-snippet-tab per language.",
  ],
  [
    ".vd-code-snippet-tab",
    "A language tab. Add is-active to mark the visible pane.",
  ],
  [".vd-code-snippet-copy", "Copy-to-clipboard button for the active pane."],
  [".vd-code-snippet-body", "Container for the code panes."],
  [
    ".vd-code-snippet-pane",
    "One <pre> per language (data-lang). is-active shows it.",
  ],
  [".vd-code-snippet-single", "Modifier for a snippet with no language tabs."],
  [".vd-code-snippet-inline", "Inline, non-collapsible code presentation."],
  [".vd-code-snippet-line-numbers", "Adds a gutter with line numbers."],
];

const attrRows: [string, string][] = [
  ["data-collapsible", "Makes the snippet a collapsible View Code block."],
  ["data-expanded", 'Set to "true" to render the snippet expanded on load.'],
  [
    "data-lang",
    "Language key on each tab and pane (e.g. html, css, javascript).",
  ],
  [
    "data-extract",
    "Selector on a pane — pulls its HTML from the live demo it documents.",
  ],
];

const jsRows: [string, string][] = [
  [
    "VanduoCodeSnippet.init(root)",
    "Scans root for .vd-code-snippet blocks and wires toggle, tabs, and copy.",
  ],
  [
    "codesnippet:toggle",
    "Event fired on the snippet when expanded/collapsed. detail.expanded is a boolean.",
  ],
];
</script>

<template>
  <section id="code-snippet">
    <h5 class="demo-title"><i class="ph ph-code"></i>Code Snippet</h5>
    <p class="vd-mb-8">
      The collapsible “View Code” block used throughout these docs. It supports
      a togglable reveal, multiple language tabs, one-click copy, and pulling
      markup straight from the live demo it documents. Styles ship in
      <code>framework/css/components/code-snippet.css</code> and behavior in
      <code>framework/js/components/code-snippet.js</code>.
    </p>

    <!-- Basic collapsible -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Collapsible (single language)</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-3 vd-text-sm vd-text-muted">
              Click “View Code” to expand the block.
            </p>
            <DocCodeSnippet :html="basicHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Multiple language tabs</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-3 vd-text-sm vd-text-muted">
              Provide more than one language to get HTML / CSS / JavaScript
              tabs.
            </p>
            <DocCodeSnippet :html="basicHtml" :css="demoCss" :js="demoJs" />
          </div>
        </div>
      </div>
    </div>

    <!-- Expanded by default -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Expanded by default</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-3 vd-text-sm vd-text-muted">
              Add <code>data-expanded="true"</code> to render the snippet open
              on load.
            </p>
            <DocCodeSnippet :js="demoJs" default-open />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i
                class="ph ph-list-dashes mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >API Reference
            </h6>
          </div>
          <div class="vd-card-body">
            <h4>Usage</h4>
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :html="vue3Usage" :default-open="true"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :html="basicHtml" :default-open="true"
              /></template>
            </EngineSwitch>

            <h4 class="vd-mt-6">CSS Classes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in classRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <EngineSwitch>
              <template #vue3>
                <h4 class="vd-mt-6">Component API (Vue 3)</h4>
                <div class="vd-table-responsive">
                  <table class="vd-table vd-table-striped">
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in vue3Api" :key="row[0]">
                        <td>
                          <code>{{ row[0] }}</code>
                        </td>
                        <td>{{ row[1] }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
              <template #vanilla>
                <p class="vd-text-muted vd-mt-6">
                  Vanilla uses the .vd-code-snippet markup with the collapsible
                  runtime; see the classes above.
                </p>
              </template>
            </EngineSwitch>

            <h4 class="vd-mt-6">Data Attributes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in attrRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="vd-mt-6">JavaScript &amp; Events</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Method / Event</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in jsRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
