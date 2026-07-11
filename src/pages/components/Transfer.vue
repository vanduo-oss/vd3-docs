<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { VdTransfer } from "@vanduo-oss/vue";

const items = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "ruby", label: "Ruby" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "java", label: "Java" },
  { id: "csharp", label: "C#" },
  { id: "php", label: "PHP" },
  { id: "swift", label: "Swift" },
  { id: "kotlin", label: "Kotlin" },
  { id: "dart", label: "Dart" },
  { id: "scala", label: "Scala" },
];

const transferHtml = `<div data-vd-transfer='[
  { "id": "html",       "label": "HTML" },
  { "id": "css",        "label": "CSS" },
  { "id": "javascript", "label": "JavaScript" },
  { "id": "typescript", "label": "TypeScript" },
  { "id": "python",     "label": "Python" }
]'></div>`;

const transferJs = `const el = document.querySelector('[data-vd-transfer]');

// Get selected item IDs
const selected = VanduoTransfer.getSelected(el);
console.log(selected); // ["javascript", "python"]

// Listen for changes
el.addEventListener('transfer:change', (e) => {
  console.log('Selected:', e.detail.selected);
});`;

const cssClasses: [string, string][] = [
  [
    ".vd-transfer",
    "Auto-generated root container (flex layout with two panels)",
  ],
  [".vd-transfer-panel", "Each side panel (Available / Selected)"],
  [".vd-transfer-header", "Panel header showing title and item count"],
  [".vd-transfer-search", "Search input inside each panel for filtering items"],
  [".vd-transfer-list", "Scrollable list container holding items"],
  [".vd-transfer-item", "Individual item row with a checkbox"],
  [
    ".vd-transfer-item.is-selected",
    "Selected state on an item (ready to move)",
  ],
  [".vd-transfer-actions", "Center column holding the move buttons"],
  [".vd-transfer-btn", "Arrow button to move checked items between panels"],
];

const jsMethods: [string, string][] = [
  [
    "VanduoTransfer.init()",
    "Scans for all [data-vd-transfer] elements and renders dual-list widgets",
  ],
  [
    "VanduoTransfer.getSelected(el)",
    'Returns an array of id strings currently in the "Selected" panel',
  ],
  [
    "VanduoTransfer.destroy(el)",
    "Removes the rendered widget and event listeners from the element",
  ],
];

const events: [string, string][] = [
  [
    "transfer:change",
    "Fired on the element when items are moved. event.detail contains { selected: string[], available: string[] }",
  ],
];

// Vue 3 usage (the Vanilla data-attribute form is shown via transferHtml/transferJs).
const vue3Usage = `<script setup lang="ts">
import { VdTransfer } from "@vanduo-oss/vue";
const items = [
  { id: 'html', label: 'HTML' },
  { id: 'css',  label: 'CSS' },
];
<\/script>

<template>
  <VdTransfer :items="items" />
</template>`;

const vue3Api: [string, string][] = [
  [":items", "Array of { id, label } objects; all start in the Source panel."],
  [
    "transfer:change",
    "Native event on the root; detail = { selected, available } (id arrays).",
  ],
  [
    "ref.getSelected()",
    "Exposed method — returns the current Target-panel id array.",
  ],
];
</script>

<template>
  <section id="transfer">
    <h5 class="demo-title">
      <i class="ph ph-arrows-left-right"></i>Transfer / Dual List
    </h5>
    <p class="vd-mb-5">
      The <strong>VanduoTransfer</strong> component renders a dual-panel picker
      — users move items from a "Source" list to a "Target" list using arrow
      buttons. Search filtering is built into both panels automatically, and
      selected items are accessible programmatically at any time.
    </p>

    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-transfer" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Transfer</h6></div>
          <div class="vd-card-body">
            <VdTransfer :items="items" />
            <DocCodeSnippet :html="transferHtml" :js="transferJs" />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
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
            ><DocCodeSnippet
              :html="transferHtml"
              :js="transferJs"
              :default-open="true"
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
              <tr v-for="row in cssClasses" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

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
              <tr>
                <td><code>data-vd-transfer</code></td>
                <td>
                  JSON array of <code>{id, label}</code> objects. All items
                  start in the "Available" panel
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <EngineSwitch>
          <template #vue3>
            <h4 class="vd-mt-6">Component API</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Prop / event / method</th>
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
            <h4 class="vd-mt-6">JavaScript Methods</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in jsMethods" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </EngineSwitch>

        <h4 class="vd-mt-6">Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in events" :key="row[0]">
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

    <!-- Accessibility -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-wheelchair mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >Accessibility
        </h6>
      </div>
      <div class="vd-card-body">
        <ul>
          <li>
            Each panel list has <code>role="listbox"</code> with
            <code>aria-multiselectable="true"</code>
          </li>
          <li>
            Items use <code>role="option"</code> with
            <code>aria-selected</code> reflecting checked state
          </li>
          <li>
            Move buttons have descriptive <code>aria-label</code>s (e.g. "Move
            selected to right")
          </li>
          <li>
            <kbd>Space</kbd> toggles item selection; <kbd>↑</kbd>/<kbd>↓</kbd>
            navigate the list
          </li>
          <li>
            <kbd>Ctrl+A</kbd> selects all visible items in the focused panel
          </li>
          <li>
            Search inputs are labelled with
            <code>aria-label="Search source"</code> /
            <code>"Search target"</code>
          </li>
          <li>
            Panel headers use <code>aria-live="polite"</code> to announce count
            changes
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
