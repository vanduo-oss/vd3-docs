<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdDraw } from "@vanduo-oss/vd3-cbun/draw";

const seedDoc = {
  version: "1.0.0",
  viewport: { x: 0, y: 0, scale: 1 },
  shapes: [
    { id: "r1", type: "rectangle", x: 80, y: 90, w: 180, h: 110 },
    { id: "e1", type: "ellipse", x: 320, y: 100, w: 130, h: 130 },
    {
      id: "a1",
      type: "line",
      points: [
        [262, 145],
        [318, 160],
      ],
      arrowEnd: true,
    },
    {
      id: "n1",
      type: "sticky",
      x: 520,
      y: 100,
      w: 170,
      h: 120,
      text: "Sticky note",
    },
    {
      id: "ink1",
      type: "freehand",
      points: [
        [110, 260],
        [150, 240],
        [190, 270],
        [230, 244],
        [270, 268],
      ],
    },
  ],
};

const installShell = `pnpm add @vanduo-oss/vd3-cbun`;

const vue3Usage = `<script setup lang="ts">
import { VdDraw } from '@vanduo-oss/vd3-cbun/draw';
import '@vanduo-oss/vd3-cbun/draw/css';

const doc = {
  shapes: [{ id: 'r1', type: 'rectangle', x: 80, y: 80, w: 160, h: 100 }],
};
<\/script>

<template>
  <VdDraw :data="doc" tool="select" @change="onChange" />
</template>`;

const tools: [string, string][] = [
  ["select", "Click / marquee select, then move, resize, or delete."],
  ["hand", "Pan the infinite canvas (wheel to zoom to the cursor)."],
  ["rectangle / ellipse", "Drag to draw a box shape."],
  ["line", "Drag to draw an arrow."],
  ["draw", "Freehand pen stroke."],
  ["text / sticky", "Click to place editable text or a sticky note."],
];

const vue3Api: [string, string][] = [
  [
    ":data",
    "Drawing document ({ shapes, viewport }); updates flow through the editor's load().",
  ],
  [
    "tool",
    "Active tool — updated live (select, hand, rectangle, ellipse, line, draw, text, sticky).",
  ],
  [":readonly", "Render as a non-editable viewer (no toolbar)."],
  [":gridSize", "Background grid size in px."],
  [
    ":snap",
    "Snap to nearby edges / centres while moving or resizing (default true).",
  ],
  [
    ":history / :historyLimit",
    "Toggle undo history and cap the retained snapshot count.",
  ],
  [
    "@change / @select / @viewport",
    "Forwarded editor events (viewport pan/zoom is not undoable).",
  ],
  ["@ready", "Emitted once with the underlying VdDraw instance."],
];

const methods: [string, string][] = [
  ["undo() / redo()", "Step through the whole-document history."],
  ["canUndo() / canRedo()", "History availability."],
  ["toSVG()", "A standalone, self-contained SVG string of the document."],
  [
    "toPNG()",
    "A promise resolving to a PNG data URL (rasterized via an offscreen canvas).",
  ],
  ["getInstance()", "The underlying VdDrawCore for imperative use."],
];
</script>

<template>
  <section id="vd-draw">
    <h5 class="demo-title"><i class="ph ph-pencil-simple"></i>Draw</h5>
    <p class="vd-mb-8">
      <strong>Vanduo Draw</strong> is a standalone SVG infinite-canvas
      whiteboard from <code>@vanduo-oss/vd3-cbun/draw</code>. Pick a tool from
      the built-in toolbar to draw shapes and freehand ink, add text and sticky
      notes, then select, move, resize, group, and reorder — with snapping
      guides, undo / redo, and PNG / SVG export. It themes automatically from
      the active <code>--vd-*</code> palette and light / dark mode.
    </p>

    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-pencil-simple"></i> Whiteboard</h6>
      </div>
      <div class="vd-card-body">
        <VdDraw :data="seedDoc" style="min-height: 460px" />
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

        <h4 class="vd-mt-6">Tools</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tools" :key="row[0]">
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
