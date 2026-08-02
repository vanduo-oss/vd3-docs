<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdFlowchart } from "@vanduo-oss/vd3-cbun/flowchart";

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

/* Full-screen editor mode — the canvas fills the viewport beneath the fixed
   navbar (which deliberately stays visible); everything else is covered.
   All DOM access happens in handlers/lifecycle, so SSG prerender stays safe. */
const fullscreen = ref(false);
const navOffset = ref(64);

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") exitFullscreen();
}

function enterFullscreen() {
  const nav = document.querySelector(".vd-navbar");
  navOffset.value = nav ? Math.round(nav.getBoundingClientRect().height) : 64;
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

const installShell = `pnpm add @vanduo-oss/vd3-cbun`;

const vue3Usage = `<script setup lang="ts">
import { VdFlowchart } from '@vanduo-oss/vd3-cbun/flowchart';
import '@vanduo-oss/vd3-cbun/flowchart/css';
<\/script>

<template>
  <!-- Palette, toolbar, inspector, and history are built in. -->
  <VdFlowchart :data="doc" auto-fit @change="onChange" />
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
    "Flowchart document ({ nodes, edges, viewport? }); updates flow through the editor's load().",
  ],
  [":readonly", "Render as a non-editable viewer (hides palette and inspector)."],
  [":gridSize", "Background grid size in px."],
  [
    ":preserveSelection",
    "Keep the current selection across data-driven reloads when possible.",
  ],
  [":autoFit", "Fit the view to content once the editor reports a measurable size."],
  [
    ":history / :historyLimit",
    "Toggle undo history and cap the snapshot count.",
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
    "Auto-arrange nodes — 'tree', 'radial', or 'grid' (default 'tree').",
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
      <strong>Vanduo Flowchart</strong> is a standalone SVG flowchart editor from
      <code>@vanduo-oss/vd3-cbun/flowchart</code>. Drag from the palette,
      connect ports, edit text inline, auto-arrange layouts, and export/import
      JSON. The demo below loads a radial mind map with branches and sub-topics.
      Hit <strong>Full screen</strong> to work across the whole viewport
      (<kbd>Esc</kbd> to come back). The chrome themes with the active
      <code>--vd-flowchart-*</code> tokens and the site light / dark mode.
    </p>

    <div
      class="vd-card demo-card vd-mb-6 flowchart-stage"
      :class="{ 'is-fullscreen': fullscreen }"
      :style="fullscreen ? { top: `${navOffset}px` } : undefined"
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
        />
      </div>
    </div>

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

/* Full-screen editor mode: fills the viewport under the fixed navbar, which
   stays visible on purpose (z-index sits below the navbar's). */
.flowchart-stage.is-fullscreen {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  border-radius: 0;
  z-index: 900;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--vd-bg-primary);
}

.flowchart-stage.is-fullscreen .flowchart-stage-body {
  flex: 1;
  min-height: 0;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Flex-grow instead of height: 100% so the shell stays inside the padded
   body and the bottom border remains visible. */
.flowchart-stage.is-fullscreen .flowchart-stage-body :deep(.vd-flowchart-host) {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  height: auto;
}
</style>
