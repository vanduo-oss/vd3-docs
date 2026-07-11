<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { VdTree } from "@vanduo-oss/vue";
import type { TreeNode } from "@vanduo-oss/vue";

const basicTree: TreeNode[] = [
  {
    id: "src",
    label: "src",
    icon: "ph ph-folder",
    children: [
      {
        id: "components",
        label: "components",
        icon: "ph ph-folder",
        children: [
          { id: "btn", label: "Button.vue", icon: "ph ph-file-vue" },
          { id: "card", label: "Card.vue", icon: "ph ph-file-vue" },
          { id: "modal", label: "Modal.vue", icon: "ph ph-file-vue" },
        ],
      },
      {
        id: "utils",
        label: "utils",
        icon: "ph ph-folder",
        children: [
          { id: "helpers", label: "helpers.js", icon: "ph ph-file-js" },
          { id: "api", label: "api.js", icon: "ph ph-file-js" },
        ],
      },
      { id: "app", label: "App.vue", icon: "ph ph-file-vue" },
      { id: "main", label: "main.js", icon: "ph ph-file-js" },
    ],
  },
  {
    id: "public",
    label: "public",
    icon: "ph ph-folder",
    children: [
      { id: "index", label: "index.html", icon: "ph ph-file-html" },
      { id: "favicon", label: "favicon.ico", icon: "ph ph-image" },
    ],
  },
  { id: "pkg", label: "package.json", icon: "ph ph-file" },
  { id: "readme", label: "README.md", icon: "ph ph-file-text" },
];

const checkboxTree: TreeNode[] = [
  {
    id: "permissions",
    label: "Permissions",
    children: [
      {
        id: "users",
        label: "User Management",
        children: [
          { id: "users-read", label: "View Users" },
          { id: "users-create", label: "Create Users" },
          { id: "users-edit", label: "Edit Users" },
          { id: "users-delete", label: "Delete Users" },
        ],
      },
      {
        id: "content",
        label: "Content Management",
        children: [
          { id: "content-read", label: "View Content" },
          { id: "content-create", label: "Create Content" },
          { id: "content-edit", label: "Edit Content" },
          { id: "content-publish", label: "Publish Content" },
        ],
      },
      {
        id: "settings",
        label: "System Settings",
        children: [
          { id: "settings-general", label: "General Settings" },
          { id: "settings-security", label: "Security Settings" },
          { id: "settings-billing", label: "Billing Settings" },
        ],
      },
    ],
  },
];

const openTree: TreeNode[] = [
  {
    id: "docs",
    label: "Documentation",
    open: true,
    children: [
      {
        id: "getting-started",
        label: "Getting Started",
        open: true,
        children: [
          { id: "install", label: "Installation" },
          { id: "getting-started-guide", label: "Getting Started Guide" },
          { id: "config", label: "Configuration" },
        ],
      },
      {
        id: "api-ref",
        label: "API Reference",
        children: [
          { id: "components-api", label: "Components" },
          { id: "utilities-api", label: "Utilities" },
          { id: "plugins-api", label: "Plugins" },
        ],
      },
      {
        id: "examples",
        label: "Examples",
        children: [
          { id: "basic-examples", label: "Basic" },
          { id: "advanced-examples", label: "Advanced" },
        ],
      },
    ],
  },
];

const basicHtml = `<div data-vd-tree='[
  {
    "id": "src",
    "label": "src",
    "icon": "ph ph-folder",
    "children": [
      { "id": "btn",  "label": "Button.vue", "icon": "ph ph-file-vue" },
      { "id": "card", "label": "Card.vue",   "icon": "ph ph-file-vue" }
    ]
  },
  { "id": "pkg", "label": "package.json", "icon": "ph ph-file" }
]'></div>`;

const checkboxHtml = `<div
  data-vd-tree='[
    {
      "id": "permissions",
      "label": "Permissions",
      "children": [
        {
          "id": "users",
          "label": "User Management",
          "children": [
            { "id": "users-read",   "label": "View Users" },
            { "id": "users-create", "label": "Create Users" }
          ]
        }
      ]
    }
  ]'
  data-vd-tree-checkbox
  data-vd-tree-cascade>
</div>`;

const checkboxJs = `const tree = document.querySelector('[data-vd-tree-checkbox]');

// Get all checked node IDs
const checked = VanduoTree.getChecked(tree);
console.log(checked); // ["users-read", "users-create"]

// Listen for check changes
tree.addEventListener('tree:check', (e) => {
  console.log('Checked nodes:', e.detail.checked);
});`;

const openHtml = `<div data-vd-tree='[
  {
    "id": "docs",
    "label": "Documentation",
    "open": true,
    "children": [
      {
        "id": "getting-started",
        "label": "Getting Started",
        "open": true,
        "children": [
          { "id": "install", "label": "Installation" },
          { "id": "getting-started-guide", "label": "Getting Started" }
        ]
      }
    ]
  }
]'></div>`;

const structureHtml = `<!-- Auto-generated structure -->
<div class="vd-tree vd-tree-lines" role="tree">
  <div class="vd-tree-node" role="treeitem" aria-expanded="true">
    <span class="vd-tree-toggle">▶</span>
    <input type="checkbox" class="vd-tree-checkbox">
    <span class="vd-tree-label">Parent Node</span>
    <div class="vd-tree-children" role="group">
      <div class="vd-tree-node" role="treeitem">
        <span class="vd-tree-label">Leaf Node</span>
      </div>
    </div>
  </div>
</div>`;

const cssClasses: [string, string][] = [
  [".vd-tree", "Auto-generated root container for the tree"],
  [".vd-tree-node", "Individual tree node (may contain children)"],
  [
    ".vd-tree-node-content",
    "The clickable row wrapper (toggle + icon + label)",
  ],
  [".vd-tree-toggle", "Expand/collapse arrow for branch nodes"],
  [
    ".vd-tree-toggle-placeholder",
    "Spacer that aligns leaf nodes with branch toggles",
  ],
  [".vd-tree-icon", "Optional file/folder icon span before the label"],
  [".vd-tree-label", "Text label of the node"],
  [
    ".vd-tree-checkbox",
    "Checkbox input rendered when data-vd-tree-checkbox is set",
  ],
  [
    ".vd-tree-children",
    "Wrapper around child nodes (collapsed/expanded via CSS)",
  ],
  [".vd-tree-lines", "Adds vertical/horizontal connection lines between nodes"],
];

const dataAttrs: [string, string][] = [
  [
    "data-vd-tree",
    "JSON array of tree nodes. Each node: { id, label, icon?, open?, children? }",
  ],
  ["data-vd-tree-checkbox", "Renders checkboxes next to each node label"],
  [
    "data-vd-tree-cascade",
    "When combined with data-vd-tree-checkbox, checking a parent auto-checks all descendants, and vice-versa",
  ],
];

const nodeShape: [string, string, string][] = [
  ["id", "string", "Unique identifier for the node"],
  ["label", "string", "Display text"],
  ["icon", "string?", 'CSS class(es) for an icon (e.g. "ph ph-folder")'],
  ["open", "boolean?", "If true, node renders expanded on init"],
  ["children", "Node[]?", "Nested child nodes (makes this a branch node)"],
];

const jsMethods: [string, string][] = [
  [
    "VanduoTree.init()",
    "Scans for all [data-vd-tree] elements and renders tree widgets",
  ],
  [
    "VanduoTree.getChecked(el)",
    "Returns an array of id strings for all checked nodes (checkbox trees only)",
  ],
  [
    "VanduoTree.destroy(el)",
    "Removes the rendered tree and event listeners from the element",
  ],
];

const events: [string, string][] = [
  [
    "tree:check",
    "Fired on the element when a checkbox changes. event.detail contains { checked: string[], node: string }",
  ],
  [
    "tree:toggle",
    "Fired when a node is expanded or collapsed. event.detail contains { id: string, open: boolean }",
  ],
];

// Engine-specific usage: the Vue component vs the Vanilla data-attribute markup.
const vue3Usage = `<script setup lang="ts">
import { VdTree } from "@vanduo-oss/vue";
const nodes = [
  { id: 'src', label: 'src', icon: 'ph ph-folder', children: [
    { id: 'btn', label: 'Button.vue', icon: 'ph ph-file-vue' },
  ]},
];
<\/script>

<template>
  <VdTree :nodes="nodes" checkbox cascade />
</template>`;

const vanillaUsage = `<div data-vd-tree='[
  { "id": "src", "label": "src", "icon": "ph ph-folder", "children": [
    { "id": "btn", "label": "Button.vue", "icon": "ph ph-file-vue" }
  ]}
]' data-vd-tree-checkbox data-vd-tree-cascade></div>

<script>VanduoTree.init();<\/script>`;

const vue3Api: [string, string][] = [
  [
    ":nodes",
    "Array of TreeNode objects ({ id, label, icon?, open?, children? }).",
  ],
  [
    ":checkbox / :cascade",
    "Render checkboxes; cascade a parent check to descendants.",
  ],
  [
    "tree:check / tree:toggle",
    "Native events on the root (detail shapes as documented below).",
  ],
  [
    "ref.getChecked()",
    "Exposed method — returns the array of checked node ids.",
  ],
];
</script>

<template>
  <section id="tree-view">
    <h5 class="demo-title"><i class="ph ph-tree-structure"></i>Tree View</h5>
    <p class="vd-mb-5">
      The <strong>VanduoTree</strong> component renders hierarchical data as an
      expandable/collapsible tree. Supports checkbox selection with parent-child
      cascade, connection lines, and initial open state — all configured via a
      single JSON data attribute.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-tree-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic File Tree</h6></div>
          <div class="vd-card-body">
            <VdTree :nodes="basicTree" />
            <DocCodeSnippet :html="basicHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-tree-checkbox" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Checkbox Tree with Cascade</h6>
          </div>
          <div class="vd-card-body">
            <VdTree :nodes="checkboxTree" checkbox cascade />
            <DocCodeSnippet :html="checkboxHtml" :js="checkboxJs" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-tree-open" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Initially Open Nodes</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Set <code>"open": true</code> on any node in the JSON data to
              expand it on render.
            </p>
            <VdTree :nodes="openTree" />
            <DocCodeSnippet :html="openHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-tree-structure" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Generated HTML Structure</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              The component generates the following DOM structure from the JSON
              data. You can style each part using the CSS classes listed in the
              API reference.
            </p>
            <DocCodeSnippet :html="structureHtml" :default-open="true" />
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
            ><DocCodeSnippet :html="vanillaUsage" :default-open="true"
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
              <tr v-for="row in dataAttrs" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Node Object Shape</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in nodeShape" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>
                  <code>{{ row[1] }}</code>
                </td>
                <td>{{ row[2] }}</td>
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
            The root container has <code>role="tree"</code>; each node has
            <code>role="treeitem"</code>
          </li>
          <li>Child groups are wrapped in <code>role="group"</code></li>
          <li>
            Branch nodes set <code>aria-expanded="true"</code> or
            <code>"false"</code> to reflect open state
          </li>
          <li>
            <kbd>↑</kbd> / <kbd>↓</kbd> navigate between visible nodes;
            <kbd>→</kbd> expands a branch; <kbd>←</kbd> collapses it
          </li>
          <li>
            <kbd>Home</kbd> jumps to the first node; <kbd>End</kbd> jumps to the
            last visible node
          </li>
          <li><kbd>Space</kbd> toggles the checkbox on checkbox trees</li>
          <li><kbd>Enter</kbd> activates (selects/expands) the focused node</li>
          <li>
            Type-ahead: pressing a letter key jumps to the next node whose label
            starts with that character
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
