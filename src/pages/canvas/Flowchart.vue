<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdFlowchart } from "@vanduo-oss/vd3-flowchart";

const seedDoc = {
  version: "1.2.0",
  viewport: { x: 0, y: 0, scale: 1 },
  nodes: [
    {
      id: "root",
      type: "circle",
      x: 450,
      y: 320,
      width: 170,
      height: 170,
      text: "Project Ideas",
      data: { level: 0 },
    },
    {
      id: "branch-design",
      type: "rounded-rect",
      x: 657,
      y: 153,
      width: 180,
      height: 80,
      text: "Design",
      data: { level: 1 },
    },
    {
      id: "sub-design-ui",
      type: "rect",
      x: 752,
      y: -42,
      width: 140,
      height: 56,
      text: "UI/UX",
      data: { level: 2 },
    },
    {
      id: "sub-design-branding",
      type: "rect",
      x: 833,
      y: 9,
      width: 140,
      height: 56,
      text: "Branding",
      data: { level: 2 },
    },
    {
      id: "sub-design-wireframes",
      type: "rect",
      x: 884,
      y: 90,
      width: 140,
      height: 56,
      text: "Wireframes",
      data: { level: 2 },
    },
    {
      id: "branch-development",
      type: "rounded-rect",
      x: 657,
      y: 577,
      width: 180,
      height: 80,
      text: "Development",
      data: { level: 1 },
    },
    {
      id: "sub-dev-frontend",
      type: "rect",
      x: 884,
      y: 664,
      width: 140,
      height: 56,
      text: "Frontend",
      data: { level: 2 },
    },
    {
      id: "sub-dev-backend",
      type: "rect",
      x: 833,
      y: 745,
      width: 140,
      height: 56,
      text: "Backend",
      data: { level: 2 },
    },
    {
      id: "sub-dev-devops",
      type: "rect",
      x: 752,
      y: 796,
      width: 140,
      height: 56,
      text: "DevOps",
      data: { level: 2 },
    },
    {
      id: "branch-marketing",
      type: "rounded-rect",
      x: 233,
      y: 577,
      width: 180,
      height: 80,
      text: "Marketing",
      data: { level: 1 },
    },
    {
      id: "sub-mkt-social",
      type: "rect",
      x: 178,
      y: 796,
      width: 140,
      height: 56,
      text: "Social Media",
      data: { level: 2 },
    },
    {
      id: "sub-mkt-seo",
      type: "rect",
      x: 97,
      y: 745,
      width: 140,
      height: 56,
      text: "SEO",
      data: { level: 2 },
    },
    {
      id: "sub-mkt-content",
      type: "rect",
      x: 46,
      y: 664,
      width: 140,
      height: 56,
      text: "Content",
      data: { level: 2 },
    },
    {
      id: "branch-research",
      type: "rounded-rect",
      x: 233,
      y: 153,
      width: 180,
      height: 80,
      text: "Research",
      data: { level: 1 },
    },
    {
      id: "sub-research-studies",
      type: "rect",
      x: 46,
      y: 90,
      width: 140,
      height: 56,
      text: "User Studies",
      data: { level: 2 },
    },
    {
      id: "sub-research-analytics",
      type: "rect",
      x: 97,
      y: 9,
      width: 140,
      height: 56,
      text: "Analytics",
      data: { level: 2 },
    },
    {
      id: "sub-research-trends",
      type: "rect",
      x: 178,
      y: -42,
      width: 140,
      height: 56,
      text: "Trends",
      data: { level: 2 },
    },
  ],
  edges: [
    {
      id: "edge-1",
      from: { nodeId: "root", port: "top" },
      to: { nodeId: "branch-design", port: "bottom" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 3,
      label: "",
    },
    {
      id: "edge-2",
      from: { nodeId: "branch-design", port: "top" },
      to: { nodeId: "sub-design-ui", port: "bottom" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-3",
      from: { nodeId: "branch-design", port: "top" },
      to: { nodeId: "sub-design-branding", port: "bottom" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-4",
      from: { nodeId: "branch-design", port: "right" },
      to: { nodeId: "sub-design-wireframes", port: "left" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-5",
      from: { nodeId: "root", port: "bottom" },
      to: { nodeId: "branch-development", port: "top" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 3,
      label: "",
    },
    {
      id: "edge-6",
      from: { nodeId: "branch-development", port: "right" },
      to: { nodeId: "sub-dev-frontend", port: "left" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-7",
      from: { nodeId: "branch-development", port: "bottom" },
      to: { nodeId: "sub-dev-backend", port: "top" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-8",
      from: { nodeId: "branch-development", port: "bottom" },
      to: { nodeId: "sub-dev-devops", port: "top" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-9",
      from: { nodeId: "root", port: "bottom" },
      to: { nodeId: "branch-marketing", port: "top" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 3,
      label: "",
    },
    {
      id: "edge-10",
      from: { nodeId: "branch-marketing", port: "bottom" },
      to: { nodeId: "sub-mkt-social", port: "top" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-11",
      from: { nodeId: "branch-marketing", port: "bottom" },
      to: { nodeId: "sub-mkt-seo", port: "top" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-12",
      from: { nodeId: "branch-marketing", port: "left" },
      to: { nodeId: "sub-mkt-content", port: "right" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-13",
      from: { nodeId: "root", port: "top" },
      to: { nodeId: "branch-research", port: "bottom" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 3,
      label: "",
    },
    {
      id: "edge-14",
      from: { nodeId: "branch-research", port: "left" },
      to: { nodeId: "sub-research-studies", port: "right" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-15",
      from: { nodeId: "branch-research", port: "top" },
      to: { nodeId: "sub-research-analytics", port: "bottom" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
    {
      id: "edge-16",
      from: { nodeId: "branch-research", port: "top" },
      to: { nodeId: "sub-research-trends", port: "bottom" },
      kind: "arrow",
      route: "curve",
      strokeWidth: 2,
      label: "",
    },
  ],
};

/* Full-screen editor mode — inset from the fixed site dock, which stays
   visible above the stage. */
const fullscreen = ref(false);

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") exitFullscreen();
}

function enterFullscreen() {
  fullscreen.value = true;
  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", onKeydown);
}

function exitFullscreen() {
  if (!fullscreen.value) return;
  fullscreen.value = false;
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeydown);
}

function toggleFullscreen() {
  if (fullscreen.value) exitFullscreen();
  else enterFullscreen();
}

onBeforeUnmount(exitFullscreen);

/** Align Arrange with the mind-map seed (Tree/Radial/Grid — three modes). */
function onFlowchartReady(editor: { layout?: (mode?: string) => unknown }) {
  editor.layout?.("radial");
}

const installShell = `pnpm add @vanduo-oss/vd3-flowchart`;

const vue3Usage = `<script setup lang="ts">
import { ref } from 'vue';
import { VdFlowchart, type VdFlowchartDocument, type VdFlowchartExposed } from '@vanduo-oss/vd3-flowchart';
import '@vanduo-oss/vd3-flowchart/css';
const editor = ref<VdFlowchartExposed | null>(null);
const readonly = ref(false);
const document = ref<VdFlowchartDocument>({
  nodes: [{ id: 'start', text: 'Start', x: 40, y: 100 }, { id: 'end', text: 'End', x: 300, y: 100 }],
  edges: [{ id: 'next', from: { nodeId: 'start', port: 'right' }, to: { nodeId: 'end', port: 'left' } }],
});
<\/script>
<template>
  <button type="button" @click="readonly = !readonly">Toggle read-only</button>
  <button type="button" :disabled="readonly" @click="editor?.undo()">Undo</button>
  <VdFlowchart ref="editor" :data="document" :readonly="readonly" auto-fit
    style="height: 560px" @change="document = $event.document" />
</template>`;

const nodeTypes: [string, string][] = [
  ["rounded-rect", "Primary flow step"],
  ["rect", "Sharp process block"],
  ["diamond", "Decision"],
  ["circle", "Start or end state"],
  ["textbox", "Notes or descriptive payload"],
  ["label", "Free text annotation"],
  ["junction", "Fixed-size branch or merge point"],
];

const vue3Api: [string, string][] = [
  [
    ":data",
    "External document replacement. Echoing @change back into :data is safe and does not emit again.",
  ],
  [
    ":readonly",
    "Disable editing; preserve the document, view, selection, and history.",
  ],
  [":gridSize", "Background grid size in px."],
  [
    ":preserveSelection",
    "Keep the current selection across data-driven reloads when possible.",
  ],
  [
    ":autoFit",
    "Fit the view to content once the editor reports a measurable size.",
  ],
  [
    ":history / :historyLimit",
    "Limit retained snapshots. Disabling history clears it; reenabling starts from the current document.",
  ],
  [
    "@change / @select / @viewport / @connect",
    "Forwarded editor events (pan/zoom is not undoable).",
  ],
  ["@ready", "Emitted once with the underlying VdFlowchart instance."],
];

const events: [string, string][] = [
  [
    "change",
    "Document mutated (add/move/edit). Resize completion fires with reason: 'node:resize'.",
  ],
  ["select", "Selection changed; payload carries the selection snapshot."],
  ["viewport", "Pan/zoom changed."],
  ["connect", "A pointer-created edge connected two ports."],
];

const methods: [string, string][] = [
  ["undo / redo", "Step through the whole-document history."],
  [
    "layout(mode?)",
    "Auto-arrange nodes — exactly three modes: 'tree', 'radial', or 'grid' (default 'tree'). The toolbar select mirrors the active mode.",
  ],
  [
    "getInstance()",
    "The underlying VdFlowchartCore — fitView(), toJSON(), addNode(), etc.",
  ],
];
</script>

<template>
  <section id="vd-flowchart">
    <h5 class="demo-title"><i class="ph ph-flow-arrow"></i>Flowchart</h5>
    <p class="vd-mb-8">
      <strong>VdFlowchart</strong> edits connected diagrams with layouts, inline
      labels, and undo/redo. Save and restore documents as JSON. Try the editor
      below; use Full screen for more space.
    </p>

    <div
      class="vd-card demo-card vd-mb-6 flowchart-stage"
      :class="{ 'is-fullscreen docs-stage-fullscreen': fullscreen }"
    >
      <div class="vd-card-header flowchart-stage-header">
        <h6><i class="ph ph-flow-arrow"></i> Editor</h6>
        <button
          type="button"
          class="vd-btn vd-btn-outline vd-btn-sm"
          :aria-pressed="fullscreen"
          @click="toggleFullscreen"
        >
          <i :class="fullscreen ? 'ph ph-arrows-in' : 'ph ph-arrows-out'"></i>
          {{ fullscreen ? "Exit full screen" : "Full screen" }}
        </button>
      </div>
      <div class="vd-card-body flowchart-stage-body">
        <VdFlowchart
          :data="seedDoc"
          auto-fit
          :style="fullscreen ? undefined : { minHeight: '420px' }"
          @ready="onFlowchartReady"
        />
      </div>
    </div>

    <p>
      Keyboard: Tab to the canvas; arrows select nodes, Enter edits a label, and
      Delete removes the selection. Use Ctrl/Cmd+Z to undo. Open Graph outline
      to read connections or connect nodes with the labelled controls.
    </p>
    <p class="vd-text-sm vd-text-muted">
      Saved JSON uses document format 1.2.0 independently of the package
      version. Malformed or unsupported future documents are rejected without
      replacing the current diagram. Catch errors when calling
      <code>load()</code> directly.
    </p>

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
        <h4>Install</h4>
        <DocCodeSnippet :shell="installShell" />

        <h4 class="vd-mt-6">Usage</h4>
        <DocCodeSnippet :html="vue3Usage" :default-open="true" />

        <h4 class="vd-mt-6">Component API</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Prop / event</th>
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

        <h4 class="vd-mt-6">Node Types</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in nodeTypes" :key="row[0]">
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

        <h4 class="vd-mt-6">Exposed methods (template ref)</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in methods" :key="row[0]">
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
  </section>
</template>

<style scoped>
.flowchart-stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Flex-grow instead of height: 100% so the shell stays inside the padded
   body and the bottom border remains visible. */
.flowchart-stage.is-fullscreen .flowchart-stage-body {
  display: flex;
  flex-direction: column;
}

.flowchart-stage.is-fullscreen .flowchart-stage-body :deep(.vd-flowchart-host) {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  height: auto;
}
</style>
