<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdTree } from "@vanduo-oss/vd3";
import type { TreeNode } from "@vanduo-oss/vd3";

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

const basicHtml = `<script setup lang="ts">
import { VdTree } from "@vanduo-oss/vd3";
import type { TreeNode } from "@vanduo-oss/vd3";

const nodes: TreeNode[] = [
  { id: "src", label: "src", icon: "ph ph-folder", children: [
    { id: "btn",  label: "Button.vue", icon: "ph ph-file-vue" },
    { id: "card", label: "Card.vue",   icon: "ph ph-file-vue" },
  ]},
  { id: "pkg", label: "package.json", icon: "ph ph-file" },
];
<\/script>

<template>
  <VdTree :nodes="nodes" />
</template>`;

const checkboxHtml = `<!-- checkbox + cascade: checking a parent checks all descendants -->
<VdTree :nodes="permissions" checkbox cascade />`;

const checkboxJs = `import { ref } from 'vue';

const treeRef = ref();

// Get all checked node IDs via the exposed method
const checked = treeRef.value?.getChecked();
console.log(checked); // ["users-read", "users-create"]

// VdTree also dispatches a native tree:check event
// ({ checked, node }) on its root — listen via a template ref.`;

const openHtml = `<!-- set "open": true on any node to expand it on render -->
<VdTree :nodes="docs" />`;

const structureHtml = `<!-- Rendered structure (VdTree + recursive VdTreeNode) -->
<div class="vd-tree" role="tree">
  <li class="vd-tree-node is-open" role="treeitem" aria-expanded="true">
    <div class="vd-tree-node-content">
      <button type="button" class="vd-tree-toggle" aria-label="Toggle"></button>
      <input type="checkbox" class="vd-tree-checkbox" aria-label="Parent Node" />
      <span class="vd-tree-icon ph ph-folder"></span>
      <span class="vd-tree-label" tabindex="-1">Parent Node</span>
    </div>
    <ul class="vd-tree-children" role="group">
      <li class="vd-tree-node" role="treeitem">
        <div class="vd-tree-node-content">
          <span class="vd-tree-toggle-placeholder"></span>
          <span class="vd-tree-label" tabindex="-1">Leaf Node</span>
        </div>
      </li>
    </ul>
  </li>
</div>`;

const cssClasses: [string, string][] = [
  [".vd-tree", "Auto-generated root container for the tree"],
  [
    ".vd-tree-node",
    "Individual tree node <li> (renders .is-open when expanded)",
  ],
  [
    ".vd-tree-node-content",
    "The clickable row wrapper (toggle + icon + label)",
  ],
  [".vd-tree-toggle", "Expand/collapse <button> for branch nodes"],
  [
    ".vd-tree-toggle-placeholder",
    "Spacer that aligns leaf nodes with branch toggles",
  ],
  [".vd-tree-icon", "Optional file/folder icon span before the label"],
  [".vd-tree-label", "Text label of the node"],
  [
    ".vd-tree-checkbox",
    "Checkbox input rendered next to each node when the checkbox prop is set",
  ],
  [
    ".vd-tree-children",
    "Child <ul> wrapper around nested VdTreeNode items (collapsed/expanded via CSS)",
  ],
];

const nodeShape: [string, string, string][] = [
  [
    "id",
    "string?",
    "Optional unique identifier for the node (falls back to label or index)",
  ],
  ["label", "string?", "Display text and checkbox aria-label"],
  ["icon", "string?", 'CSS class(es) for an icon (e.g. "ph ph-folder")'],
  [
    "open",
    "boolean?",
    "If true, branch node renders expanded (.is-open) on init",
  ],
  [
    "checked",
    "boolean?",
    "Initial or reactive checked state when checkbox mode is enabled",
  ],
  ["children", "TreeNode[]?", "Nested child nodes (makes this a branch node)"],
];

const events: [string, string][] = [
  [
    "tree:check",
    "Fired on the element when a checkbox changes. event.detail contains { checked: string[], node: string | undefined }",
  ],
  [
    "tree:toggle",
    "Fired when a node is expanded or collapsed. event.detail contains { id: string | undefined, open: boolean }",
  ],
];

const vue3Usage = `<script setup lang="ts">
import { VdTree } from "@vanduo-oss/vd3";
const nodes = [
  { id: 'src', label: 'src', icon: 'ph ph-folder', children: [
    { id: 'btn', label: 'Button.vue', icon: 'ph ph-file-vue' },
  ]},
];
<\/script>

<template>
  <VdTree :nodes="nodes" checkbox cascade />
</template>`;

const vue3Api: [string, string][] = [
  [
    ":nodes",
    "TreeNode[] — hierarchical array of { id?, label?, icon?, open?, checked?, children? }.",
  ],
  [
    ":checkbox / :cascade",
    "boolean — render checkboxes on every node; cascade (default true) propagates parent check changes to all descendants.",
  ],
  [
    "VdTreeNode (:node, :checkbox, @toggle, @check)",
    "Recursive child component used internally by VdTree and exported from @vanduo-oss/vd3 for custom tree compositions.",
  ],
  [
    "tree:check / tree:toggle",
    "Native CustomEvents bubbling from the root element (detail shapes documented below).",
  ],
  [
    "ref.getChecked()",
    "Exposed method — returns string[] of checked node ids (or labels).",
  ],
];
</script>

<template>
  <section id="tree-view">
    <h5 class="demo-title"><i class="ph ph-tree-structure"></i>Tree View</h5>
    <p class="vd-mb-8">
      The <strong>VdTree</strong> component renders hierarchical data as an
      expandable/collapsible tree. Supports checkbox selection with parent-child
      cascade and initial open state — all driven by the
      <code>:nodes</code> prop plus the boolean <code>checkbox</code> /
      <code>cascade</code> props.
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
        <DocCodeSnippet :vue="vue3Usage" :default-open="true" />

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
            The root container has <code>role="tree"</code>; each
            <code>VdTreeNode</code> renders a
            <code>&lt;li role="treeitem"&gt;</code> and wraps child lists in
            <code>&lt;ul role="group"&gt;</code>.
          </li>
          <li>
            Branch nodes set <code>aria-expanded="true"</code> or
            <code>"false"</code> to reflect open state, and toggle buttons carry
            <code>aria-label="Toggle"</code>.
          </li>
          <li>
            Keyboard navigation on the tree: <kbd>ArrowDown</kbd> and
            <kbd>ArrowUp</kbd> move focus between visible node rows;
            <kbd>ArrowRight</kbd> expands a closed branch node;
            <kbd>ArrowLeft</kbd> collapses an open branch node.
          </li>
          <li>
            Native <code>&lt;button class="vd-tree-toggle"&gt;</code> and
            <code>&lt;input type="checkbox" class="vd-tree-checkbox"&gt;</code>
            controls support <kbd>Enter</kbd> and <kbd>Space</kbd> activation
            with <code>:aria-label="node.label"</code> on checkboxes.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
