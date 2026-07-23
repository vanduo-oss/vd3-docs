<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdDraw } from "@vanduo-oss/vd3-cbun/draw";

const seedDoc = {
  version: "1.1.0",
  viewport: { x: 0, y: 0, scale: 1 },
  shapes: [
    {
      id: "m1",
      type: "freehand",
      brush: "marker",
      color: "#1971c2",
      size: 14,
      points: [
        [70, 120],
        [130, 90],
        [190, 130],
        [250, 95],
      ],
    },
    {
      id: "h1",
      type: "freehand",
      brush: "highlighter",
      color: "#f2c200",
      size: 24,
      points: [
        [70, 170],
        [260, 170],
      ],
    },
    {
      id: "p1",
      type: "freehand",
      brush: "pencil",
      color: "#e03131",
      size: 5,
      points: [
        [320, 90],
        [340, 140],
        [370, 100],
        [400, 150],
      ],
    },
    {
      id: "n1",
      type: "sticky",
      x: 470,
      y: 90,
      w: 160,
      h: 110,
      text: "Sketch it out",
    },
  ],
};

/* Full-screen sketch mode — the canvas fills the viewport beneath the fixed
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
import { VdDraw } from '@vanduo-oss/vd3-cbun/draw';
import '@vanduo-oss/vd3-cbun/draw/css';
<\/script>

<template>
  <!-- The toolbar (brushes, colors, size, eraser) is built in. -->
  <VdDraw tool="draw" @change="onChange" />
</template>`;

const tools: [string, string][] = [
  ["brush", "Paint variable-width strokes with the active brush + color."],
  ["eraser", "Drag to erase whole strokes / shapes you cross."],
  ["select / hand", "Select, move, resize (select); pan the canvas (hand)."],
  [
    "rectangle / ellipse / arrow",
    "Secondary vector shapes in the current color.",
  ],
  ["text / sticky", "Editable text and sticky notes."],
];

const brushes: [string, string][] = [
  ["pen", "Crisp, pressure-tapered ink."],
  ["pencil", "Thin, slightly textured, softer opacity."],
  ["marker", "Thick, flat, semi-opaque."],
  ["highlighter", "Wide, translucent, multiply blend (overlaps darken)."],
  ["calligraphy", "Fixed-angle nib — width follows stroke direction."],
];

const vue3Api: [string, string][] = [
  [
    ":data",
    "Drawing document ({ shapes, viewport }); updates flow through load().",
  ],
  [
    "tool",
    "Active tool — 'draw', 'eraser', 'select', 'hand', shapes… (default 'draw').",
  ],
  [":readonly", "Render as a non-editable viewer (no toolbar)."],
  [":gridSize / :snap", "Background grid size; snap-to-edges (default on)."],
  [
    ":history / :historyLimit",
    "Toggle undo history and cap the snapshot count.",
  ],
  [
    "@change / @select / @viewport",
    "Forwarded editor events (pan/zoom is not undoable).",
  ],
  ["@ready", "Emitted once with the underlying VdDraw instance."],
];

const methods: [string, string][] = [
  [
    "setColor / setBrush",
    "Set the current color / brush preset for the next mark.",
  ],
  ["setBrushSize / setOpacity", "Set the current brush size / opacity."],
  ["setGridSize / toggleGrid", "Resize the grid cells / show + hide the grid."],
  ["undo / redo", "Step through the whole-document history."],
  [
    "toSVG / toPNG",
    "Export the drawing (self-contained SVG string / PNG data URL).",
  ],
  ["getInstance", "The underlying VdDrawCore for imperative use."],
];
</script>

<template>
  <section id="vd-draw">
    <h5 class="demo-title"><i class="ph ph-paint-brush"></i>Draw</h5>
    <p class="vd-mb-8">
      <strong>Vanduo Draw</strong> is a standalone SVG
      <strong>drawing tool</strong> from <code>@vanduo-oss/vd3-cbun/draw</code>.
      Its dependency-free brush engine turns freehand strokes into smooth,
      variable-width marks (pressure- and velocity-aware). Pick a
      <strong>brush</strong> (pen, pencil, marker, highlighter, calligraphy) and
      a <strong>color</strong> from the built-in palette, set size and opacity,
      and paint — or switch to the eraser, shapes, or sticky notes. Want room to
      think? Hit <strong>Full screen</strong> to sketch across the whole
      viewport (<kbd>Esc</kbd> to come back). The chrome themes with the active
      <code>--vd-*</code> palette and light / dark mode; your marks keep the
      color you pick.
    </p>

    <div
      class="vd-card demo-card vd-mb-6 draw-stage"
      :class="{ 'is-fullscreen': fullscreen }"
      :style="fullscreen ? { top: `${navOffset}px` } : undefined"
    >
      <div class="vd-card-header draw-stage-header">
        <h6><i class="ph ph-paint-brush"></i> Sketchpad</h6>
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
      <div class="vd-card-body draw-stage-body">
        <VdDraw
          :data="seedDoc"
          tool="draw"
          :style="fullscreen ? { height: '100%' } : undefined"
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

        <h4 class="vd-mt-6">Brushes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Preset</th>
                <th>Feel</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in brushes" :key="row[0]">
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
.draw-stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Full-screen sketch mode: fills the viewport under the fixed navbar, which
   stays visible on purpose (z-index sits below the navbar's). */
.draw-stage.is-fullscreen {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  border-radius: 0;
  z-index: 900;
  display: flex;
  flex-direction: column;
  background: var(--vd-bg-primary);
}

.draw-stage.is-fullscreen .draw-stage-body {
  flex: 1;
  min-height: 0;
  padding: 0.5rem;
}
</style>
