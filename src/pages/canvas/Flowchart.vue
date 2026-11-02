<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useTooltips } from "@vanduo-oss/vd3";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import {
  FLOWCHART_DOCUMENT_VERSION,
  VD_FLOWCHART_VERSION,
  VdFlowchart,
  type FlowchartViewportEvent,
  type VdFlowchartExposed,
} from "@vanduo-oss/vd3-flowchart";

type FlowchartInstance = NonNullable<
  ReturnType<VdFlowchartExposed["getInstance"]>
>;

/**
 * Branching workflow diagram — Start → Decision ("Yes" / "No"), with the
 * approved branch fanning out into 8 parallel curved pipelines (keeping
 * `start` first and `proc-8` last for keyboard Home/End navigation).
 */
const seedDoc = {
  version: FLOWCHART_DOCUMENT_VERSION,
  nodes: [
    {
      id: "start",
      type: "circle",
      x: 127.35,
      y: 403.04,
      width: 128,
      height: 128,
      text: "Start",
    },
    {
      id: "decision",
      type: "diamond",
      x: 340.19,
      y: 407.04,
      width: 184,
      height: 120,
      text: "Decision",
    },
    {
      id: "yes",
      type: "rounded-rect",
      x: 342.19,
      y: 226.69,
      width: 180,
      height: 96,
      text: "Yes",
    },
    {
      id: "no",
      type: "rounded-rect",
      x: 344.19,
      y: 611.97,
      width: 180,
      height: 96,
      text: "No",
    },
    {
      id: "proc-1",
      type: "rect",
      x: 1023.42,
      y: -193.31,
      width: 180,
      height: 96,
      text: "Validate tokens",
    },
    {
      id: "proc-2",
      type: "rect",
      x: 1023.42,
      y: -73.31,
      width: 180,
      height: 96,
      text: "Build CSS layer",
    },
    {
      id: "proc-3",
      type: "rect",
      x: 1023.42,
      y: 46.69,
      width: 180,
      height: 96,
      text: "Compile SFCs",
    },
    {
      id: "proc-4",
      type: "rect",
      x: 1023.42,
      y: 166.69,
      width: 180,
      height: 96,
      text: "Emit TypeScript d.ts",
    },
    {
      id: "proc-5",
      type: "rect",
      x: 1023.42,
      y: 286.69,
      width: 180,
      height: 96,
      text: "Check class coverage",
    },
    {
      id: "proc-6",
      type: "rect",
      x: 1023.42,
      y: 406.69,
      width: 180,
      height: 96,
      text: "Run Vitest suite",
    },
    {
      id: "proc-7",
      type: "rect",
      x: 1023.42,
      y: 526.69,
      width: 180,
      height: 96,
      text: "Verify bundle budget",
    },
    {
      id: "proc-8",
      type: "rect",
      x: 1023.42,
      y: 646.69,
      width: 180,
      height: 96,
      text: "Publish release",
    },
  ],
  edges: [
    {
      id: "edge-74",
      from: { nodeId: "start", port: "right" },
      to: { nodeId: "decision", port: "left" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
    {
      id: "edge-264",
      from: { nodeId: "decision", port: "bottom" },
      to: { nodeId: "no", port: "top" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
    {
      id: "edge-289",
      from: { nodeId: "decision", port: "top" },
      to: { nodeId: "yes", port: "bottom" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
    {
      id: "edge-374",
      from: { nodeId: "yes", port: "right" },
      to: { nodeId: "proc-1", port: "left" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
    {
      id: "edge-410",
      from: { nodeId: "yes", port: "right" },
      to: { nodeId: "proc-2", port: "left" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
    {
      id: "edge-435",
      from: { nodeId: "yes", port: "right" },
      to: { nodeId: "proc-3", port: "left" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
    {
      id: "edge-460",
      from: { nodeId: "yes", port: "right" },
      to: { nodeId: "proc-4", port: "left" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
    {
      id: "edge-485",
      from: { nodeId: "yes", port: "right" },
      to: { nodeId: "proc-5", port: "left" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
    {
      id: "edge-511",
      from: { nodeId: "yes", port: "right" },
      to: { nodeId: "proc-6", port: "left" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
    {
      id: "edge-537",
      from: { nodeId: "yes", port: "right" },
      to: { nodeId: "proc-7", port: "left" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
    {
      id: "edge-563",
      from: { nodeId: "yes", port: "right" },
      to: { nodeId: "proc-8", port: "left" },
      kind: "arrow",
      startMarker: "none",
      endMarker: "arrow",
      strokeWidth: 2.25,
      route: "curve",
      label: "",
    },
  ],
};

const stageRoot = ref<HTMLElement | null>(null);
const editor = ref<VdFlowchartExposed | null>(null);
const cameraScale = ref("1.0000");
let fitFrame: number | undefined;
let userAdjustedViewport = false;

const TOOLBAR_TOOLTIPS: Record<string, string> = {
  "zoom-out": "Zoom out (Cmd/Ctrl + -)",
  "zoom-in": "Zoom in (Cmd/Ctrl + =)",
  "reset-view": "Reset zoom to 100% (Cmd/Ctrl + 0)",
  "zoom-reset": "Reset zoom to 100% (Cmd/Ctrl + 0)",
  "fit-view": "Fit diagram to view (Shift + 1)",
  undo: "Undo last change (Cmd/Ctrl + Z)",
  redo: "Redo change (Shift + Cmd/Ctrl + Z)",
  clear: "Clear canvas",
  delete: "Delete selection (Delete / Backspace)",
  outline: "Toggle graph outline",
  minimap: "Toggle overview minimap",
  shortcuts: "Keyboard shortcuts (?)",
};

function stampToolbarTooltips(): void {
  const root = stageRoot.value;
  if (!root) return;
  const controls = root.querySelectorAll<HTMLElement>(
    ".vd-flowchart-toolbar button, .vd-flowchart-toolbar select[data-flowchart-arrange]",
  );
  for (const control of controls) {
    const action = control.getAttribute("data-flowchart-action") ?? "";
    const isArrange = control.hasAttribute("data-flowchart-arrange");
    const label = isArrange
      ? "Auto-arrange layout (Tree, Radial, Grid)"
      : TOOLBAR_TOOLTIPS[action] ||
        control.getAttribute("data-tooltip") ||
        control.getAttribute("title") ||
        control.getAttribute("aria-label") ||
        "";
    if (label) {
      control.setAttribute("data-tooltip", label);
      control.setAttribute("data-tooltip-placement", "bottom");
    }
    control.removeAttribute("title");
  }
}

function fitInitialView(instance?: FlowchartInstance | null): void {
  const core = instance ?? editor.value?.getInstance();
  if (!core) return;
  core.fitView();
  cameraScale.value = core.toJSON().viewport.scale.toFixed(4);
}

function onReady(instance: FlowchartInstance): void {
  stampToolbarTooltips();
  fitInitialView(instance);
  if (typeof requestAnimationFrame === "function") {
    if (fitFrame !== undefined) cancelAnimationFrame(fitFrame);
    fitFrame = requestAnimationFrame(() => {
      fitFrame = undefined;
      if (!userAdjustedViewport) {
        fitInitialView(instance);
      }
    });
  }
}

onMounted(() => {
  stampToolbarTooltips();
  fitInitialView();
});

useTooltips(stageRoot);

/* Full-screen editor mode — inset from the fixed site dock, which stays
   visible above the stage. */
const fullscreen = ref(false);

function onKeydown(event: KeyboardEvent) {
  // The editor uses Escape to cancel editing and deselect first.
  if (event.key === "Escape" && !event.defaultPrevented) exitFullscreen();
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

onBeforeUnmount(() => {
  if (fitFrame !== undefined && typeof cancelAnimationFrame === "function") {
    cancelAnimationFrame(fitFrame);
    fitFrame = undefined;
  }
  exitFullscreen();
});

function onViewport(payload: FlowchartViewportEvent) {
  cameraScale.value = payload.viewport.scale.toFixed(4);
  if (payload.reason && payload.reason !== "viewport:fit") {
    userAdjustedViewport = true;
  }
}

function showOverview() {
  userAdjustedViewport = true;
  editor.value?.getInstance()?.zoomTo(0.05);
}

const installShell = `pnpm add @vanduo-oss/vd3-flowchart`;

const vue3Usage = `<script setup lang="ts">
import { ref } from 'vue';
import { VdFlowchart, type VdFlowchartDocument, type VdFlowchartExposed } from '@vanduo-oss/vd3-flowchart';
import '@vanduo-oss/vd3-flowchart/css';
const editor = ref<VdFlowchartExposed | null>(null);
const readonly = ref(false);
const document = ref<VdFlowchartDocument>({
  nodes: [
    { id: 'start', text: 'Start', x: 40, y: 100 },
    { id: 'note', text: 'Note', x: 280, y: 120, width: 16, height: 16 },
  ],
  edges: [{ id: 'next', from: { nodeId: 'start', port: 'right' }, to: { nodeId: 'note', port: 'left' } }],
});
<\/script>
<template>
  <button type="button" @click="readonly = !readonly">Toggle read-only</button>
  <button type="button" :disabled="!editor?.canUndo()" @click="editor?.undo()">Undo</button>
  <button type="button" @click="editor?.fitNode('note')">Fit note</button>
  <VdFlowchart ref="editor" :data="document" :readonly="readonly"
    :min-scale="0.05" :max-scale="20" :min-node-size="6" :max-node-size="4800"
    auto-fit style="height: 560px" @change="document = $event.document" />
</template>`;

const nodeTypes: [string, string][] = [
  ["rounded-rect", "Primary flow step"],
  ["rect", "Sharp process block"],
  ["diamond", "Decision"],
  ["circle", "Start or end state"],
  ["textbox", "Notes or descriptive payload"],
  ["label", "Free text annotation"],
  [
    "junction",
    "Branch or merge point. Stays 28×28. Node-size bounds do not resize it.",
  ],
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
    ":keyboardShortcuts",
    "'mindmap' (default): Tab adds a child, Enter adds a sibling, F2/Space/typing edits. 'basic': Enter edits and Tab moves focus.",
  ],
  [
    ":snapGuides",
    "Snap dragged nodes to other nodes' edges and centres; hold Alt to bypass (default true).",
  ],
  [
    ":minimap",
    "Show the overview minimap in the canvas corner. It is pointer-only, aria-hidden, and hides below 480px wide (default true).",
  ],
  [
    ":autoLayout",
    "Re-run the current tree or radial layout after keyboard or handle insertions, in the same undo step (default false).",
  ],
  [
    ":minScale / :maxScale",
    "Camera bounds. Defaults are 0.35 and 3. Pass both ends. This demo uses 0.05 and 20. Omitting one end on a later update keeps that end's current value. An invalid pair (missing, non-finite, non-positive, or min not below max) falls back to the whole default pair.",
  ],
  [
    ":minNodeSize / :maxNodeSize",
    "Resizable-node sides. Defaults are 56 and 420. Pass both ends. This demo uses 6 and 4800. Junctions stay 28. The same omit-one-end and invalid-pair rules apply. Changing the bounds later does not resize nodes already on the canvas.",
  ],
  [
    "@change",
    "Document mutations and camera changes. Pan and zoom fire change as well as viewport. Pan and zoom are not undoable.",
  ],
  [
    "@select / @viewport / @connect",
    "Selection, camera, and edge-added events. viewport is the camera event. connect fires for every added edge, not only edges created with the pointer.",
  ],
  ["@ready", "Emitted once with the underlying VdFlowchart core instance."],
];

const events: [string, string][] = [
  [
    "change",
    "A document mutation or a camera change. The payload includes reason and document. Resize completion uses reason node:resize. Pan and zoom also emit change; they are not history entries.",
  ],
  [
    "select",
    "Selection changed. The payload carries the primary selection snapshot and nodeIds for every selected node.",
  ],
  [
    "viewport",
    "The camera event. The payload includes reason, viewport (x, y, and scale to four decimal places), and document. fitNode uses reason viewport:fit-node.",
  ],
  [
    "connect",
    "An edge was added. Pointer drags, handle clicks, keyboard insertion, Graph outline, and addEdge all emit it. It is not limited to pointer-created edges.",
  ],
  [
    "history",
    "Core only: editor.on('history', …) with reason, canUndo, and canRedo. The Vue component does not emit history. Read canUndo() and canRedo() from the template ref.",
  ],
];

const methods: [string, string][] = [
  ["undo() / redo()", "Step through the whole-document history."],
  [
    "canUndo() / canRedo()",
    "Whether the template ref can step backward or forward. False when history is empty or disabled.",
  ],
  [
    "fitNode(nodeId, padding?)",
    "Frame one visible node. Padding is screen pixels and defaults to 48. Unknown or hidden nodes do nothing. Also available as getInstance().fitNode().",
  ],
  [
    "layout(mode?)",
    "Auto-arrange nodes — exactly three modes: 'tree', 'radial', or 'grid' (default 'tree'). The toolbar select mirrors the active mode.",
  ],
  [
    "getInstance()",
    "The underlying core: fitView(), zoomTo(), fitNode(), toJSON(), load(), canUndo(), canRedo(), addNode(), addEdge(), insertBranchNode(), and the rest of the core API.",
  ],
];

const shortcuts: [string, string][] = [
  ["Arrow keys", "Select the nearest node in that direction"],
  ["Home / End", "Select the first or last visible node in document order"],
  ["Shift+Arrow", "Select a connection on that side (repeat to cycle)"],
  [
    "Enter, F2, or typing on a connection",
    "Edit the connection label (or double-click it)",
  ],
  [
    "Shift+click, Shift+drag",
    "Add nodes to the selection, or select with a box",
  ],
  ["Cmd/Ctrl+A", "Select all nodes"],
  ["Cmd/Ctrl+C / X / V", "Copy, cut, or paste the selection"],
  ["Cmd/Ctrl+/", "Collapse or expand the branch (or click its badge)"],
  ["Tab", "Add a child node and edit it"],
  ["Enter / Shift+Enter", "Add a sibling below / above and edit it"],
  ["F2, Space, or start typing", "Edit the label"],
  ["Enter while editing", "Save the label (Shift+Enter adds a new line)"],
  ["Tab while editing", "Save and add a child"],
  ["Alt+Arrow", "Nudge the selection one grid step (add Shift for 1 px)"],
  ["Alt while dragging", "Turn off alignment snapping for that drag"],
  [
    "Delete / Backspace",
    "Delete the selection (a single node selects its parent)",
  ],
  ["Cmd/Ctrl+D", "Duplicate the selection"],
  ["Cmd/Ctrl+Z, Shift+Cmd/Ctrl+Z", "Undo, redo"],
  ["Cmd/Ctrl + = / - / 0", "Zoom in, out, to 100%"],
  ["Shift+1", "Fit the diagram to the view"],
  ["Esc", "Cancel editing, then the active tool, then deselect"],
  ["Shift+Tab, or Esc then Tab", "Leave the canvas"],
  ["?", "Show every shortcut in the editor"],
];
</script>

<template>
  <section id="vd-flowchart">
    <h5 class="demo-title"><i class="ph ph-flow-arrow"></i>Flowchart</h5>
    <p class="vd-mb-8">
      <strong>VdFlowchart</strong> edits a flat diagram of nodes and edges, with
      layouts, inline labels, and undo/redo. This page runs package
      <code>{{ VD_FLOWCHART_VERSION }}</code
      >. The live editor opts into camera scales <code>0.05</code>–<code
        >20</code
      >
      and resizable node sides <code>6</code>–<code>4800</code>. Defaults stay
      <code>0.35</code>–<code>3</code> and <code>56</code>–<code>420</code> when
      you omit both ends of a pair.
    </p>

    <div
      ref="stageRoot"
      class="vd-card demo-card vd-mb-6 flowchart-stage"
      :class="{ 'is-fullscreen docs-stage-fullscreen': fullscreen }"
    >
      <div class="vd-card-header flowchart-stage-header">
        <h6><i class="ph ph-flow-arrow"></i> Editor</h6>
        <div class="flowchart-stage-actions">
          <span class="flowchart-scale">
            Scale
            <output data-flowchart-scale>{{ cameraScale }}</output>
          </span>
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            data-flowchart-demo="overview"
            @click="showOverview"
          >
            Overview
          </button>
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
      </div>
      <div class="vd-card-body flowchart-stage-body">
        <VdFlowchart
          ref="editor"
          :data="seedDoc"
          :min-scale="0.05"
          :max-scale="20"
          :min-node-size="6"
          :max-node-size="4800"
          auto-fit
          :style="fullscreen ? undefined : { height: '560px' }"
          @ready="onReady"
          @viewport="onViewport"
        />
      </div>
    </div>

    <p>
      <strong>Overview</strong> sets the camera to <code>0.05</code>, so the
      whole workspace is visible at once. The editor toolbar still zooms, fits,
      and undoes. Every step is a flat node rather than a nested container.
      Hover a node to show a handle outside each side: drag a handle to connect,
      or click it to add a connected node.
    </p>
    <p>
      A node resized smaller than its default size scales its text, wrapping,
      radius, stroke, markers, curve arms, orthogonal routes, labels, and inline
      editor with it. Default-size steps keep their standard chrome, and larger
      nodes do not grow that chrome. Junctions stay <code>28×28</code>. With
      these wider camera bounds the background grid covers 240,000 units and
      keeps a readable screen spacing. The default <code>0.35</code>–<code
        >3</code
      >
      camera keeps the 12,000-unit grid.
    </p>
    <p class="vd-text-sm vd-text-muted">
      Saved JSON uses document format
      <code>{{ FLOWCHART_DOCUMENT_VERSION }}</code
      >, which is separate from package <code>{{ VD_FLOWCHART_VERSION }}</code
      >. Format 1.3.0 may write <code>collapsed: true</code> on a collapsed node
      and does not add a parent id. <code>viewport.scale</code> is stored to
      four decimal places; positions and sizes stay at two. Every older 1.x
      document still loads. Malformed JSON and unsupported future versions throw
      before the current diagram changes. Catch errors when calling
      <code>load()</code> directly. This release does not add nested containers,
      suggestion overlays, floating panels, or an export API.
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
        <DocCodeSnippet :vue="vue3Usage" :default-open="true" />

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

        <h4 class="vd-mt-6">Ports</h4>
        <p>
          Edges attach on the four cardinal ports only:
          <code>top</code>, <code>right</code>, <code>bottom</code>, and
          <code>left</code>. Any other port name is dropped. When a port is
          omitted, <code>from</code> falls back to <code>right</code> and
          <code>to</code> falls back to <code>left</code>, unless
          <code>autoPort</code> aims each end at the other node.
        </p>

        <h4 class="vd-mt-6">Keyboard shortcuts</h4>
        <p>
          With the canvas focused and the default
          <code>keyboard-shortcuts="mindmap"</code>. Home, End, and
          Cmd/Ctrl+C/X/V work in <code>basic</code> as well. Copy, cut, and
          paste are ignored while a field is being edited.
        </p>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Keys</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in shortcuts" :key="row[0]">
                <td>
                  <kbd>{{ row[0] }}</kbd>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="vd-text-sm vd-text-muted">
          A node and its connection undo as one step, and naming a node you just
          added joins that step. Use
          <code>keyboard-shortcuts="basic"</code> when Tab must always move
          focus: Enter or F2 then edits a label and Ctrl/Cmd+Enter saves it.
        </p>

        <h4 class="vd-mt-6">Accessibility</h4>
        <p>
          The canvas is a keyboard surface (<code>tabindex="0"</code>). Arrow
          keys, Home, and End move the selection when the canvas itself is
          focused. Graph outline lists nodes and connections behind labelled
          Edit and Connect controls. Press <kbd>?</kbd> for the shortcut dialog.
          The minimap is pointer-only (click and drag) and
          <code>aria-hidden</code>, so it is not a keyboard or screen-reader
          control; use the canvas keys and Graph outline instead. These notes
          describe the controls that ship. They are not a WCAG conformance
          claim.
        </p>

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

.flowchart-stage-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.flowchart-scale {
  color: var(--vd-text-secondary);
  font-size: 0.875rem;
}

.flowchart-scale output {
  font-variant-numeric: tabular-nums;
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
