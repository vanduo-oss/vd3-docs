<script setup lang="ts">
import { VdCodeSnippet } from "@vanduo-oss/vd3";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { highlightCode } from "@/utils/highlight";

const simpleDemo = `const greet = (name: string) => \`hello, \${name}\`;`;

const vue3Usage = `<script setup lang="ts">
import { VdCodeSnippet } from "@vanduo-oss/vd3";
import { highlight } from "@vanduo-oss/vd3-cbun/code-editor/highlight";

const code = "const x = 1;";
const highlightCode = (src: string, language: string) =>
  highlight(src, language);
<\/script>

<template>
  <VdCodeSnippet :code="code" language="js" :highlight="highlightCode" />
</template>`;

const vue3Api: [string, string][] = [
  [":code", "Simple mode: the source string shown in the block."],
  [
    ":language",
    'Simple-mode id passed to `highlight` (default "html"). Not a highlighter by itself.',
  ],
  [":copyable", "Show a copy button in the header (default true)."],
  [
    ":html / :css / :js / :shell / :vue / :json",
    "Chrome mode: one tab per non-empty string. Presence of any tab prop selects chrome over simple mode.",
  ],
  [":default-open", "Chrome mode: expand the block on load (default false)."],
  [":toggle-label", 'Chrome mode: collapsed-row label (default "View Code").'],
  [
    ":collapsible",
    "Chrome mode: show the toggle and start from `defaultOpen` (default true).",
  ],
  [
    ":highlight",
    "Optional `(code, language) => escaped HTML`. These docs pass the cbun tokenizer; without it the snippet is plain text. Copy always uses the raw source.",
  ],
];

const singleHtml = `<button class="vd-btn vd-btn-primary">Save</button>`;

const demoCss = `.my-element {
  color: var(--vd-color-primary);
  border-radius: var(--vd-radius-fib-5);
}`;

const demoJs = `import { VdCodeSnippet } from "@vanduo-oss/vd3";

const code = "const x = 1;";
// <VdCodeSnippet :code="code" language="js" :highlight="highlightCode" />`;

const classRows: [string, string][] = [
  [
    ".vd-code-snippet",
    "Root. Simple mode is a <figure>; chrome mode is a <div>.",
  ],
  [
    ".vd-code-snippet-simple / .vd-code-snippet-single",
    "Simple-mode modifiers. The header is copy-only (no tabs).",
  ],
  [
    ".vd-code-snippet-toggle",
    "Chrome “View Code” row. Hidden when collapsible is false.",
  ],
  [
    ".vd-code-snippet-toggle-icon",
    "Chevron inside the toggle; rotated when expanded.",
  ],
  [
    ".vd-code-snippet-content",
    "Chrome region for the header and panes. Shown when data-visible is true.",
  ],
  [
    ".vd-code-snippet-header",
    "Top row: language tabs (chrome) and the copy button (both modes).",
  ],
  [
    ".vd-code-snippet-tabs",
    "Tablist wrapping one .vd-code-snippet-tab per language.",
  ],
  [
    ".vd-code-snippet-tab",
    "A language tab. .is-active marks the visible pane.",
  ],
  [
    ".vd-code-snippet-copy",
    "Copy-to-clipboard control, always in the header (top-right).",
  ],
  [".vd-code-snippet-body", "Chrome container for the code panes."],
  [
    ".vd-code-snippet-pane",
    "Chrome <pre> per language (data-lang). .is-active shows it.",
  ],
  [".vd-code-snippet-pre", "Simple-mode <pre> wrapping the code."],
];
</script>

<template>
  <section id="code-snippet">
    <h5 class="demo-title"><i class="ph ph-code"></i>Code Snippet</h5>
    <p class="vd-mb-8">
      <code>VdCodeSnippet</code> is a copyable source block with two modes. Pass
      <code>:code</code> and <code>:language</code> for a simple figure. Pass
      any tab prop (<code>html</code>, <code>css</code>, <code>js</code>,
      <code>shell</code>, <code>vue</code>, <code>json</code>) for collapsible
      multi-tab chrome — the same “View Code” control used throughout these docs
      via <code>DocCodeSnippet</code>. The component does
      <strong>not</strong> color tokens unless you pass <code>highlight</code>.
      These pages pass the cbun tokenizer (<code>highlightCode</code>).
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Simple mode (live VdCodeSnippet)</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-3 vd-text-sm vd-text-muted">
              Figure + header Copy (top-right). Color comes from
              <code>:highlight</code> (cbun), not from the component.
            </p>
            <VdCodeSnippet
              :code="simpleDemo"
              language="js"
              :highlight="highlightCode"
            />
            <p class="vd-mt-4 vd-mb-3 vd-text-sm vd-text-muted">
              Same source without <code>highlight</code> — plain text.
            </p>
            <VdCodeSnippet :code="simpleDemo" language="js" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Collapsible (single language)</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-3 vd-text-sm vd-text-muted">
              The “View Code” toggle stays visible. Expand to reveal HTML and
              Copy in the header.
            </p>
            <DocCodeSnippet :html="singleHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Multiple language tabs</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-3 vd-text-sm vd-text-muted">
              More than one tab prop yields HTML / CSS / JavaScript tabs. Copy
              sends the active tab’s raw source.
            </p>
            <DocCodeSnippet :html="singleHtml" :css="demoCss" :js="demoJs" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Expanded by default</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-3 vd-text-sm vd-text-muted">
              <code>default-open</code> renders the chrome open on load.
            </p>
            <DocCodeSnippet :js="demoJs" default-open />
          </div>
        </div>
      </div>
    </div>

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
            <DocCodeSnippet :vue="vue3Usage" :default-open="true" />

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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
