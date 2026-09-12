<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdDraw } from "@vanduo-oss/vd3-cbun/draw";
import { drawSeedDoc, fitDrawDemoView } from "@/constants/drawSeed";

const drawRef = ref<any>(null);

/* Full-screen sketch mode — canvas fills the viewport inset from the fixed
   site dock, which deliberately stays visible above the stage. */
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

// ── Sketchpad Stage Actions ────────────────────────────────────────────────
function resetToSeed() {
  const inst = drawRef.value?.getInstance();
  inst?.load(drawSeedDoc);
  fitDrawDemoView(inst);
  shapeCount.value = drawSeedDoc.shapes.length;
  lastAction.value = "reset (seed loaded)";
}

function clearCanvas() {
  drawRef.value?.getInstance()?.clear();
  shapeCount.value = 0;
  lastAction.value = "canvas cleared";
}

function toggleGrid() {
  drawRef.value?.getInstance()?.toggleGrid();
  lastAction.value = "grid toggled";
}

function selectBrush(brushName: string) {
  const inst = drawRef.value?.getInstance();
  if (!inst) return;
  inst.setBrush(brushName);
  inst.setTool("draw");
  activeBrush.value = brushName;
  lastAction.value = `brush: ${brushName}`;
  if (typeof document !== "undefined") {
    document
      .getElementById("sketchpad-stage")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// ── Live Reactive State ────────────────────────────────────────────────────
const shapeCount = ref(drawSeedDoc.shapes.length);
const selectionCount = ref(0);
const activeBrush = ref("pen");
const zoomPercent = ref(100);
const panPos = ref({ x: 0, y: 0 });
const lastAction = ref("mounted");
const readonly = ref(false);
const snap = ref(true);
const canUndo = ref(false);
const canRedo = ref(false);

function refreshHistoryFlags() {
  const inst = drawRef.value?.getInstance();
  if (!inst) return;
  canUndo.value = Boolean(inst.canUndo?.());
  canRedo.value = Boolean(inst.canRedo?.());
}

function undoDraw() {
  drawRef.value?.undo?.() ?? drawRef.value?.getInstance()?.undo();
  refreshHistoryFlags();
  lastAction.value = "undo";
}

function redoDraw() {
  drawRef.value?.redo?.() ?? drawRef.value?.getInstance()?.redo();
  refreshHistoryFlags();
  lastAction.value = "redo";
}

function onChange(payload: { reason?: string } | undefined) {
  lastAction.value = payload?.reason || "change";
  const inst = drawRef.value?.getInstance();
  if (inst) {
    shapeCount.value = inst.getShapes().length;
  }
  refreshHistoryFlags();
}

function onSelect(payload: { ids?: string[] } | undefined) {
  const count = payload?.ids?.length ?? 0;
  selectionCount.value = count;
  lastAction.value = count
    ? `select (${count} item${count > 1 ? "s" : ""})`
    : "deselect";
}

function onViewport(payload: any) {
  const vp = payload?.viewport;
  if (vp) {
    zoomPercent.value = Math.round((vp.scale || 1) * 100);
    panPos.value = { x: Math.round(vp.x || 0), y: Math.round(vp.y || 0) };
  }
}

function onReady(instance: any) {
  if (instance) {
    fitDrawDemoView(instance);
    shapeCount.value = instance.getShapes().length;
    refreshHistoryFlags();
  }
}

// ── Live Export Studio ─────────────────────────────────────────────────────
const exportedSvg = ref<string>("");
const exportedPng = ref<string>("");
const exportFormat = ref<"svg" | "png">("svg");
const copied = ref(false);
const isExporting = ref(false);

function formatByteSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function dataUrlByteLength(dataUrl: string): number {
  const comma = dataUrl.indexOf(",");
  const b64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
  const padding = b64.endsWith("==") ? 2 : b64.endsWith("=") ? 1 : 0;
  return Math.max(0, Math.floor((b64.length * 3) / 4) - padding);
}

const exportByteLabel = computed(() => {
  if (exportFormat.value === "svg" && exportedSvg.value) {
    return formatByteSize(new TextEncoder().encode(exportedSvg.value).length);
  }
  if (exportFormat.value === "png" && exportedPng.value) {
    return formatByteSize(dataUrlByteLength(exportedPng.value));
  }
  return "";
});

async function triggerExport(format: "svg" | "png") {
  exportFormat.value = format;
  isExporting.value = true;
  const inst = drawRef.value?.getInstance();
  if (!inst) {
    isExporting.value = false;
    return;
  }
  try {
    if (format === "svg") {
      exportedSvg.value = inst.toSVG();
    } else {
      exportedPng.value = await inst.toPNG({ scale: 2 });
    }
  } catch (err) {
    console.error("Export failed", err);
  } finally {
    isExporting.value = false;
  }
}

async function copySvgToClipboard() {
  if (!exportedSvg.value || typeof navigator === "undefined") return;
  await navigator.clipboard.writeText(exportedSvg.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

function downloadExport() {
  if (typeof document === "undefined") return;
  const a = document.createElement("a");
  if (exportFormat.value === "svg" && exportedSvg.value) {
    const blob = new Blob([exportedSvg.value], { type: "image/svg+xml" });
    a.href = URL.createObjectURL(blob);
    a.download = "sketchpad.svg";
    a.click();
    URL.revokeObjectURL(a.href);
  } else if (exportFormat.value === "png" && exportedPng.value) {
    a.href = exportedPng.value;
    a.download = "sketchpad.png";
    a.click();
  }
}

// ── Multi-Brush Showcase Data ──────────────────────────────────────────────
const brushDetails = [
  {
    name: "pen",
    label: "Pen",
    icon: "ph ph-pen-nib",
    feel: "Crisp, pressure-tapered ink.",
    badge: "Dynamic Taper",
    color: "#245f52",
    specs: "Thinning: 0.6 · Smoothing: 0.5 · Streamline: 0.5",
  },
  {
    name: "pencil",
    label: "Pencil",
    icon: "ph ph-pencil-simple",
    feel: "Thin, textured, softer opacity for expressive sketch lines.",
    badge: "Graphite Feel",
    color: "#868e96",
    specs: "Thinning: 0.2 · Smoothing: 0.3 · Opacity: 0.85",
  },
  {
    name: "marker",
    label: "Marker",
    icon: "ph ph-paint-brush",
    feel: "Thick, flat, semi-opaque stroke with bold weight.",
    badge: "Bold Stroke",
    color: "#1971c2",
    specs: "Thinning: 0.1 · Smoothing: 0.6 · Opacity: 0.9",
  },
  {
    name: "highlighter",
    label: "Highlighter",
    icon: "ph ph-highlighter",
    feel: "Wide, translucent, multiply blend mode (overlaps darken).",
    badge: "Multiply Blend",
    color: "#fab005",
    specs: "Thinning: 0 · Smoothing: 0.8 · Blend: multiply",
  },
  {
    name: "calligraphy",
    label: "Calligraphy",
    icon: "ph ph-scribble-loop",
    feel: "Fixed 45° chisel nib — line width responds to stroke angle.",
    badge: "Chisel Nib 45°",
    color: "#7048e8",
    specs: "Thinning: 0.4 · Nib Angle: 45° · Streamline: 0.5",
  },
];

const installShell = `pnpm add @vanduo-oss/vd3-cbun`;

const vue3Usage = `<script setup lang="ts">
import { VdDraw } from '@vanduo-oss/vd3-cbun/draw';
import '@vanduo-oss/vd3-cbun/draw/css';
<\/script>

<template>
  <!-- Built-in toolbar (brushes, swatches, size, eraser, shapes, sticky notes) -->
  <VdDraw tool="draw" @change="onChange" />
</template>`;

const tools: [string, string][] = [
  ["brush", "Paint variable-width strokes with the active brush + color."],
  ["eraser", "Drag to erase whole strokes / shapes with visual radius circle."],
  ["select", "Select, move, and resize shapes with compass direction cursors."],
  ["hand", "Pan the infinite canvas with grab / grabbing cursor feedback."],
  [
    "rectangle / ellipse / arrow",
    "Secondary vector shapes and arrows with matching arrowhead colors.",
  ],
  [
    "text / sticky",
    "Editable text and sticky notes with automatic word wrapping.",
  ],
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
    "Forwarded editor events (`change.reason`, `select.ids`, viewport pan/zoom).",
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
      <strong>vd3 Draw</strong> is a vector
      <strong>drawing & sketchpad tool</strong> from
      <code>@vanduo-oss/vd3-cbun</code>
      (<code>@vanduo-oss/vd3-cbun/draw</code>). Its dependency-free brush engine
      turns freehand strokes into smooth, variable-width marks (pressure- and
      velocity-aware). Pick from 5 <strong>artistic brushes</strong> (pen,
      pencil, marker, highlighter, calligraphy) and a
      <strong>color</strong> from the built-in palette, or switch to geometric
      shapes, arrows, and auto-wrapping sticky notes. The chrome themes
      seamlessly with the active <code>--vd-*</code> palette and light / dark
      mode; your marks preserve their true vector colors.
    </p>

    <!-- Main Sketchpad Stage -->
    <div
      id="sketchpad-stage"
      class="vd-card demo-card vd-mb-4 draw-stage"
      :class="{ 'is-fullscreen docs-stage-fullscreen': fullscreen }"
    >
      <div class="vd-card-header draw-stage-header">
        <h6><i class="ph ph-paint-brush"></i> Interactive Sketchpad</h6>
        <div class="draw-stage-actions">
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            title="Undo last change"
            :disabled="!canUndo || readonly"
            @click="undoDraw"
          >
            <i class="ph ph-arrow-u-up-left"></i> Undo
          </button>
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            title="Redo"
            :disabled="!canRedo || readonly"
            @click="redoDraw"
          >
            <i class="ph ph-arrow-u-up-right"></i> Redo
          </button>
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            title="Reload initial showcase illustration"
            @click="resetToSeed"
          >
            <i class="ph ph-arrow-counter-clockwise"></i> Reset Demo
          </button>
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            title="Clear all shapes"
            :disabled="readonly"
            @click="clearCanvas"
          >
            <i class="ph ph-trash"></i> Clear
          </button>
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            title="Toggle background grid"
            @click="toggleGrid"
          >
            <i class="ph ph-grid-four"></i> Grid
          </button>
          <label class="vd-btn vd-btn-outline vd-btn-sm draw-toggle">
            <input v-model="snap" type="checkbox" /> Snap
          </label>
          <label class="vd-btn vd-btn-outline vd-btn-sm draw-toggle">
            <input v-model="readonly" type="checkbox" /> Readonly
          </label>
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            :aria-pressed="fullscreen"
            @click="toggleFullscreen"
          >
            <i
              :class="fullscreen ? 'ph ph-arrows-in' : 'ph ph-arrows-out'"
            ></i>
            {{ fullscreen ? "Exit full screen" : "Full screen" }}
          </button>
        </div>
      </div>
      <div class="vd-card-body draw-stage-body">
        <VdDraw
          ref="drawRef"
          :data="drawSeedDoc"
          tool="draw"
          :readonly="readonly"
          :snap="snap"
          :style="fullscreen ? { height: '100%' } : undefined"
          @change="onChange"
          @select="onSelect"
          @viewport="onViewport"
          @ready="onReady"
        />
      </div>
    </div>

    <!-- Live Event & State Ribbon -->
    <div class="draw-state-bar vd-mb-6">
      <div class="state-chip">
        <i class="ph ph-shapes"></i>
        <span
          >Shapes: <strong>{{ shapeCount }}</strong></span
        >
      </div>
      <div class="state-chip">
        <i class="ph ph-selection"></i>
        <span
          >Selection: <strong>{{ selectionCount }}</strong></span
        >
      </div>
      <div class="state-chip">
        <i class="ph ph-magnifying-glass"></i>
        <span
          >Zoom: <strong>{{ zoomPercent }}%</strong></span
        >
      </div>
      <div class="state-chip">
        <i class="ph ph-arrows-out-cardinal"></i>
        <span
          >Pan: <strong>{{ panPos.x }}, {{ panPos.y }}</strong></span
        >
      </div>
      <div class="state-chip">
        <i class="ph ph-activity"></i>
        <span
          >Last event: <code>{{ lastAction }}</code></span
        >
      </div>
    </div>

    <!-- Multi-Brush Showcase Section -->
    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-paint-brush-broad mr-2"
            style="color: var(--vd-color-primary)"
          ></i>
          Brush Presets & Physics
        </h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-4">
          Each brush preset uses customized velocity smoothing, streamline
          interpolation, and taper curves. Click any preset to activate it
          immediately on the sketchpad above:
        </p>
        <div class="brush-grid">
          <div
            v-for="b in brushDetails"
            :key="b.name"
            class="brush-card"
            :class="{ 'is-active': activeBrush === b.name }"
          >
            <div class="brush-card-header">
              <div class="brush-title">
                <i :class="b.icon" :style="{ color: b.color }"></i>
                <strong>{{ b.label }}</strong>
              </div>
              <span
                class="brush-badge"
                :style="{ borderColor: b.color, color: b.color }"
              >
                {{ b.badge }}
              </span>
            </div>
            <p class="brush-feel">{{ b.feel }}</p>
            <div class="brush-specs">{{ b.specs }}</div>
            <button
              type="button"
              class="vd-btn vd-btn-outline vd-btn-sm brush-select-btn"
              @click="selectBrush(b.name)"
            >
              <i class="ph ph-check"></i> Try {{ b.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Export Studio Card -->
    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-export mr-2"
            style="color: var(--vd-color-primary)"
          ></i>
          Export Studio (SVG & PNG)
        </h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-4">
          Export standalone, self-contained vector SVGs or high-resolution PNGs
          directly from the canvas. Arrow markers, colors, and multi-line texts
          are preserved in the export:
        </p>
        <div class="export-actions vd-mb-4">
          <button
            type="button"
            class="vd-btn vd-btn-primary vd-btn-sm"
            :disabled="isExporting"
            @click="triggerExport('svg')"
          >
            <i class="ph ph-file-svg"></i> Export SVG
          </button>
          <button
            type="button"
            class="vd-btn vd-btn-outline vd-btn-sm"
            :disabled="isExporting"
            @click="triggerExport('png')"
          >
            <i class="ph ph-image"></i> Export PNG (2×)
          </button>
        </div>

        <div v-if="exportedSvg || exportedPng" class="export-preview-box">
          <div class="export-preview-header">
            <span class="export-format-tag">
              Format: <strong>{{ exportFormat.toUpperCase() }}</strong>
              <template v-if="exportByteLabel">
                · <strong>{{ exportByteLabel }}</strong>
              </template>
            </span>
            <div class="export-preview-buttons">
              <button
                v-if="exportFormat === 'svg'"
                type="button"
                class="vd-btn vd-btn-outline vd-btn-sm"
                @click="copySvgToClipboard"
              >
                <i :class="copied ? 'ph ph-check' : 'ph ph-copy'"></i>
                {{ copied ? "Copied!" : "Copy SVG" }}
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-primary vd-btn-sm"
                @click="downloadExport"
              >
                <i class="ph ph-download-simple"></i> Download
              </button>
            </div>
          </div>
          <div class="export-preview-stage">
            <div
              v-if="exportFormat === 'svg'"
              class="svg-rendered-preview"
              v-html="exportedSvg"
            ></div>
            <img
              v-else-if="exportFormat === 'png'"
              :src="exportedPng"
              alt="Exported drawing"
              class="png-rendered-preview"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- API Documentation -->
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
}

.draw-stage-header h6 {
  flex: 0 0 auto;
  white-space: nowrap;
  margin: 0;
}

.draw-stage-actions {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  flex: 1 1 auto;
  min-width: 0;
}

.draw-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  margin: 0;
}

.draw-toggle input {
  margin: 0;
}

/* ── Live State Ribbon ─────────────────────────────────────────────────── */
.draw-state-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0.6rem 1rem;
  background: var(--vd-bg-secondary, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--vd-border-color, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
  font-size: 0.85rem;
}

.state-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--vd-text-muted, #67746a);
}

.state-chip i {
  color: var(--vd-color-primary, #245f52);
}

.state-chip strong {
  color: var(--vd-text-primary, #1f2720);
}

.state-chip code {
  font-size: 0.8rem;
  padding: 0.1rem 0.3rem;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}

/* ── Multi-Brush Cards ─────────────────────────────────────────────────── */
.brush-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.brush-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--vd-border-color, rgba(0, 0, 0, 0.1));
  background: var(--vd-bg-primary, #fff);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.brush-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  border-color: var(--vd-color-primary, #245f52);
}

.brush-card.is-active {
  border-color: var(--vd-color-primary, #245f52);
  box-shadow: 0 0 0 1.5px var(--vd-color-primary, #245f52);
}

.brush-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.brush-title {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
}

.brush-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border: 1px solid currentColor;
  border-radius: 20px;
  letter-spacing: 0.02em;
}

.brush-feel {
  font-size: 0.82rem;
  color: var(--vd-text-muted, #67746a);
  margin-bottom: 0.5rem;
  flex: 1 1 auto;
}

.brush-specs {
  font-size: 0.72rem;
  color: var(--vd-text-muted, #868e96);
  background: var(--vd-bg-secondary, rgba(0, 0, 0, 0.03));
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  font-family: monospace;
}

.brush-select-btn {
  width: 100%;
  justify-content: center;
}

/* ── Export Studio ─────────────────────────────────────────────────────── */
.export-actions {
  display: inline-flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.export-preview-box {
  margin-top: 1rem;
  border: 1px solid var(--vd-border-color, rgba(0, 0, 0, 0.1));
  border-radius: 8px;
  overflow: hidden;
}

.export-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  background: var(--vd-bg-secondary, rgba(0, 0, 0, 0.03));
  border-bottom: 1px solid var(--vd-border-color, rgba(0, 0, 0, 0.08));
  gap: 1rem;
  flex-wrap: wrap;
}

.export-format-tag {
  font-size: 0.85rem;
  color: var(--vd-text-muted, #67746a);
}

.export-preview-buttons {
  display: inline-flex;
  gap: 0.5rem;
}

.export-preview-stage {
  padding: 1.5rem;
  background: var(--vd-bg-primary, #fff);
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 400px;
  overflow: auto;
}

.svg-rendered-preview :deep(svg) {
  max-width: 100%;
  max-height: 360px;
  height: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vd-border-color, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
}

.png-rendered-preview {
  max-width: 100%;
  max-height: 360px;
  height: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vd-border-color, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
}
</style>
