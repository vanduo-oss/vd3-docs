<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useThemeStore } from "@/stores/theme";
import { VdHexGrid } from "@vanduo-oss/hex-grid/vue";
import { TerrainType, getAdjacentHexes } from "@vanduo-oss/hex-grid/hex-math";

const DEFAULT_SIZE = 30;
const DEFAULT_WIDTH = 15;
const DEFAULT_HEIGHT = 10;

interface HexCell {
  q: number;
  r: number;
  x: number;
  y: number;
  fill: string;
  stroke?: string;
  terrain?: string | null;
  adjacent?: Array<{ q: number; r: number }>;
}

interface GridInstance {
  width: number;
  height: number;
  resetView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  fillRandom: () => void;
  generateRandomTerrain: () => void;
  setHexTerrain: (q: number, r: number, type: string) => void;
  getHexTerrain: (q: number, r: number) => string | null;
  getHexYields: (
    q: number,
    r: number,
  ) => { food: number; production: number; gold: number };
  getHexMovementCost: (q: number, r: number) => number;
  isHexPassable: (q: number, r: number) => boolean;
  hasHex: (q: number, r: number) => boolean;
  getHex: (q: number, r: number) => HexCell | undefined;
  getPath: (
    startQ: number,
    startR: number,
    endQ: number,
    endR: number,
  ) => Array<{ q: number; r: number }>;
  setHexFill: (q: number, r: number, color: string) => void;
  getAllHexes: () => HexCell[];
  setCustomRender: (
    callback: (
      ctx: CanvasRenderingContext2D,
      hex: HexCell,
      size: number,
    ) => void,
  ) => void;
  clearCustomRender: () => void;
  _getThemeColors?: () => Record<string, string>;
  _render?: () => void;
  themeColors?: Record<string, string>;
}

const size = ref(DEFAULT_SIZE);
const width = ref(DEFAULT_WIDTH);
const height = ref(DEFAULT_HEIGHT);
const rotationDeg = ref(0);
const rotationRad = computed(() => (rotationDeg.value * Math.PI) / 180);

const zoomPercent = ref(100);
const showInfo = ref(false);
const selectedCoords = ref("");
const pixelX = ref(0);
const pixelY = ref(0);
const adjacentCount = ref(0);
const selectedQ = ref<number | null>(null);
const selectedR = ref<number | null>(null);

const pathMode = ref(false);
const pathStartLabel = ref("");
const pathLength = ref<number | null>(null);
const pathNoRoute = ref(false);
const pathHexes = ref<Array<{ q: number; r: number }>>([]);
let pathKeyIndex = new Map<string, number>();
let pathStart: { q: number; r: number } | null = null;

const showCoords = ref(false);
const pickedTerrain = ref<string>(TerrainType.GRASSLAND);
const terrainTypes = Object.values(TerrainType) as string[];

const terrainName = ref<string | null>(null);
const terrainYields = ref<{
  food: number;
  production: number;
  gold: number;
} | null>(null);
const terrainMovement = ref<number | null>(null);
const terrainPassable = ref<boolean | null>(null);

let gridInstance: GridInstance | null = null;

const themeStore = useThemeStore();
const { theme, primary } = storeToRefs(themeStore);

const lightFills = [
  "#f0f0f0",
  "#d4e5d4",
  "#e5d4d4",
  "#d4d4e5",
  "#e5e5d4",
  "#d4e5e5",
  "#e8e8e8",
  "#d0d0d0",
];
const darkFills = [
  "#37474f",
  "#2e3b2e",
  "#3b2e2e",
  "#2e2e3b",
  "#3b3b2e",
  "#2e3b3b",
  "#3a3a3a",
  "#455a64",
];
const PATH_FILL = "rgba(255, 159, 28, 0.5)";
const PATH_ACCENT = "#ff9f1c";

const readToken = (token: string, fallback: string): string => {
  if (typeof document === "undefined") return fallback;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(token).trim() ||
    fallback
  );
};

const isDarkTheme = (): boolean => {
  if (typeof document === "undefined") return false;
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark") return true;
  if (attr === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const hexPalette = () => {
  const dark = isDarkTheme();
  const outline = readToken("--vd-color-primary", dark ? "#3bc9db" : "#000000");
  return {
    outline,
    canvasBg: readToken("--vd-bg-primary", dark ? "#111418" : "#ffffff"),
    hexFill: "transparent",
    textColor: readToken("--vd-text-primary", dark ? "#e9ecef" : "#1f2937"),
    textMuted: readToken("--vd-text-muted", "#868e96"),
  };
};

const applyHexTheme = (): void => {
  if (!gridInstance?._getThemeColors || !gridInstance._render) return;
  const p = hexPalette();
  gridInstance._getThemeColors = () => ({
    bgPrimary: p.canvasBg,
    bgSecondary: p.hexFill,
    borderColor: p.outline,
    colorPrimary: p.outline,
    textColor: p.textColor,
    textMuted: p.textMuted,
  });
  const colors = gridInstance._getThemeColors();
  gridInstance.themeColors = colors;
  gridInstance.getAllHexes().forEach((h) => {
    if (!h.terrain) {
      h.fill = colors.bgSecondary;
      if (h.stroke !== undefined) h.stroke = colors.borderColor;
    }
  });
  gridInstance._render();
};

const themeAwareFillRandom = (): void => {
  if (!gridInstance) return;
  const palette = isDarkTheme() ? darkFills : lightFills;
  gridInstance.getAllHexes().forEach((h) => {
    if (!h.terrain)
      h.fill = palette[Math.floor(Math.random() * palette.length)];
  });
  gridInstance._render?.();
};

const requestRender = (): void => gridInstance?._render?.();

/**
 * Single custom-render hook driving both the coordinate-label toggle and the
 * pathfinding overlay (connector polyline + node markers). It is installed once
 * in onReady and reads the reactive flags at draw time, so toggling either
 * feature only needs a re-render.
 */
const overlayRender = (
  ctx: CanvasRenderingContext2D,
  hex: HexCell,
  hexSize: number,
): void => {
  const key = `${hex.q},${hex.r}`;
  const idx = pathKeyIndex.get(key);

  if (idx !== undefined && gridInstance) {
    ctx.save();
    // Connector segment back to the previous path hex (drawn over hex bodies).
    if (idx > 0) {
      const prev = pathHexes.value[idx - 1];
      const prevHex = gridInstance.getHex(prev.q, prev.r);
      if (prevHex) {
        ctx.strokeStyle = PATH_ACCENT;
        ctx.lineWidth = Math.max(2, hexSize * 0.12);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(prevHex.x, prevHex.y);
        ctx.lineTo(hex.x, hex.y);
        ctx.stroke();
      }
    }
    // Node marker; start/end are a touch larger.
    const isEnd = idx === 0 || idx === pathHexes.value.length - 1;
    ctx.fillStyle = PATH_ACCENT;
    ctx.beginPath();
    ctx.arc(
      hex.x,
      hex.y,
      Math.max(3, hexSize * (isEnd ? 0.26 : 0.16)),
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.restore();
  }

  if (showCoords.value) {
    const muted = gridInstance?.themeColors?.textMuted ?? "#868e96";
    ctx.save();
    ctx.fillStyle = muted;
    ctx.font = `${Math.max(8, hexSize * 0.32)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${hex.q},${hex.r}`, hex.x, hex.y + hexSize * 0.42);
    ctx.restore();
  }
};

const clearPathHighlight = (): void => {
  pathHexes.value = [];
  pathKeyIndex = new Map();
  applyHexTheme();
};

const highlightPath = (path: Array<{ q: number; r: number }>): void => {
  if (!gridInstance) return;
  clearPathHighlight();
  pathHexes.value = path;
  pathKeyIndex = new Map(path.map((p, i) => [`${p.q},${p.r}`, i]));
  // Solid body fill for non-terrain hexes; terrain tiles keep their color but
  // still get the connector/markers from overlayRender.
  path.forEach(({ q, r }) => gridInstance!.setHexFill(q, r, PATH_FILL));
  requestRender();
};

/**
 * BFS over existing hexes. Unlike the core's getPath (which treats a hex with no
 * terrain as impassable), terrainless hexes are passable here so the demo grid
 * routes out of the box; assigned terrain still blocks impassable tiles.
 */
const computePath = (
  start: { q: number; r: number },
  end: { q: number; r: number },
): Array<{ q: number; r: number }> => {
  if (!gridInstance) return [];
  const passable = (q: number, r: number): boolean => {
    if (!gridInstance!.hasHex(q, r)) return false;
    const terrain = gridInstance!.getHexTerrain(q, r);
    return terrain ? gridInstance!.isHexPassable(q, r) : true;
  };
  if (!passable(start.q, start.r) || !passable(end.q, end.r)) return [];

  const startKey = `${start.q},${start.r}`;
  const endKey = `${end.q},${end.r}`;
  const queue: Array<{ q: number; r: number }> = [start];
  const visited = new Set<string>([startKey]);
  const parent = new Map<string, string>();

  while (queue.length > 0) {
    const cur = queue.shift()!;
    const curKey = `${cur.q},${cur.r}`;
    if (curKey === endKey) {
      const path: Array<{ q: number; r: number }> = [];
      let key: string | undefined = endKey;
      while (key) {
        const [q, r] = key.split(",").map(Number);
        path.unshift({ q, r });
        key = parent.get(key);
      }
      return path;
    }
    for (const n of getAdjacentHexes(cur.q, cur.r)) {
      const nKey = `${n.q},${n.r}`;
      if (!visited.has(nKey) && passable(n.q, n.r)) {
        visited.add(nKey);
        parent.set(nKey, curKey);
        queue.push(n);
      }
    }
  }
  return [];
};

const updateTerrainInfo = (q: number, r: number): void => {
  if (!gridInstance) return;
  const t = gridInstance.getHexTerrain(q, r);
  terrainName.value = t;
  if (t) {
    terrainYields.value = gridInstance.getHexYields(q, r);
    terrainMovement.value = gridInstance.getHexMovementCost(q, r);
    terrainPassable.value = gridInstance.isHexPassable(q, r);
  } else {
    terrainYields.value = null;
    terrainMovement.value = null;
    terrainPassable.value = null;
  }
};

const onReady = (instance: GridInstance): void => {
  gridInstance = instance;
  zoomPercent.value = 100;
  instance.fillRandom = themeAwareFillRandom;
  instance.setCustomRender(overlayRender);
  applyHexTheme();
  // App.vue applies the theme/primary attributes in its onMounted, which runs
  // after this child mounts — re-read the resolved primary once that settles so
  // the outline tracks the global primary color instead of the SSR default.
  nextTick(() => applyHexTheme());
};

const onZoom = (data: { scale: number }): void => {
  zoomPercent.value = Math.round(data.scale * 100);
};

const onSelect = (hex: HexCell): void => {
  showInfo.value = true;
  selectedCoords.value = `(${hex.q}, ${hex.r})`;
  pixelX.value = Math.round(hex.x);
  pixelY.value = Math.round(hex.y);
  selectedQ.value = hex.q;
  selectedR.value = hex.r;
  adjacentCount.value = (hex.adjacent ?? []).filter((a) =>
    gridInstance?.hasHex(a.q, a.r),
  ).length;
  updateTerrainInfo(hex.q, hex.r);

  if (!pathMode.value || !gridInstance) return;

  if (!pathStart) {
    pathStart = { q: hex.q, r: hex.r };
    pathStartLabel.value = `(${hex.q}, ${hex.r})`;
    pathLength.value = null;
    pathNoRoute.value = false;
    clearPathHighlight();
    return;
  }

  const path = computePath(pathStart, { q: hex.q, r: hex.r });
  if (path.length > 0) {
    pathLength.value = path.length - 1;
    pathNoRoute.value = false;
    highlightPath(path);
  } else {
    pathLength.value = null;
    pathNoRoute.value = true;
    clearPathHighlight();
  }
  pathStart = null;
  pathStartLabel.value = "";
};

const resetGrid = (): void => {
  size.value = DEFAULT_SIZE;
  width.value = DEFAULT_WIDTH;
  height.value = DEFAULT_HEIGHT;
  rotationDeg.value = 0;
  gridInstance?.resetView();
  zoomPercent.value = 100;
  showInfo.value = false;
  selectedCoords.value = "";
  selectedQ.value = null;
  selectedR.value = null;
  pathStart = null;
  pathStartLabel.value = "";
  pathLength.value = null;
  pathNoRoute.value = false;
  clearPathHighlight();
  terrainName.value = null;
  terrainYields.value = null;
  terrainMovement.value = null;
  terrainPassable.value = null;
};

const zoomIn = (): void => gridInstance?.zoomIn();
const zoomOut = (): void => gridInstance?.zoomOut();
const resetView = (): void => gridInstance?.resetView();

const fillRandom = (): void => gridInstance?.fillRandom();

const generateTerrain = (): void => {
  gridInstance?.generateRandomTerrain();
  if (selectedQ.value !== null && selectedR.value !== null) {
    updateTerrainInfo(selectedQ.value, selectedR.value);
  }
};

const applyTerrainToSelected = (): void => {
  if (!gridInstance || selectedQ.value === null || selectedR.value === null)
    return;
  gridInstance.setHexTerrain(
    selectedQ.value,
    selectedR.value,
    pickedTerrain.value,
  );
  updateTerrainInfo(selectedQ.value, selectedR.value);
};

// Re-bake the grid palette whenever theme/primary change, and once the theme
// store finishes hydrating (which sets data-theme/data-primary on <html>).
watch([theme, primary, () => themeStore.ready], () => applyHexTheme());

watch(showCoords, () => requestRender());

watch(pathMode, (on) => {
  if (!on) {
    pathStart = null;
    pathStartLabel.value = "";
    pathLength.value = null;
    pathNoRoute.value = false;
    clearPathHighlight();
  }
});

const installShell = `pnpm add @vanduo-oss/hex-grid`;

const vue3Usage = `<script setup lang="ts">
import { ref } from 'vue';
import { VdHexGrid } from '@vanduo-oss/hex-grid/vue';
import { TerrainType } from '@vanduo-oss/hex-grid/hex-math';

const size = ref(30);
const width = ref(15);
const height = ref(10);
const rotationDeg = ref(0);
let grid = null;

const onReady = (instance) => { grid = instance; };
const onSelect = (hex) => console.log('Selected', hex.q, hex.r);
<\/script>

<template>
  <div style="height: 420px;">
    <VdHexGrid
      :size="size"
      :width="width"
      :height="height"
      :rotation="rotationDeg * Math.PI / 180"
      @ready="onReady"
      @select="onSelect"
      @zoom="({ scale }) => console.log('Zoom', scale)"
    />
  </div>
</template>`;

const vanillaJs = `import { VdHexGrid } from '@vanduo-oss/hex-grid';

const grid = new VdHexGrid({
  element: document.getElementById('hex-container'),
  size: 30,
  width: 15,
  height: 10,
});

grid.on('select', (hex) => console.log(hex.q, hex.r));
grid.on('zoom', ({ scale }) => console.log('Zoom', scale));
grid.setHexTerrain(0, 0, 'Grassland');
grid.generateRandomTerrain();
grid.setRotation(-Math.PI / 6);
grid.zoomIn();`;

const mathUsage = `// Pure axial math — no canvas, no DOM, no Vue.
import { hexDistance, getAdjacentHexes, TerrainType } from '@vanduo-oss/hex-grid/hex-math';

hexDistance(0, 0, 2, -1); // → 2
getAdjacentHexes(0, 0);   // → 6 neighbors`;

const vue3Api: [string, string][] = [
  [":size", "Hexagon size in px (default 30)."],
  [":width / :height", "Grid columns / rows in hexes (default 10)."],
  [":rotation", "Grid rotation in radians (default 0)."],
  ["@select / @zoom / @pan", "Forwarded interaction events."],
  ["@ready", "Emitted once with the underlying VdHexGrid instance."],
  ["getInstance()", "Template ref expose — call imperative API methods."],
];

const methods: [string, string][] = [
  [
    "setSize(size) / setDimensions(w, h) / setRotation(rad)",
    "Reconfigure the grid; re-renders in place.",
  ],
  [
    "getHex(q, r) / getAllHexes() / hasHex(q, r) / getHexCount()",
    "Query hexes by axial coordinate.",
  ],
  [
    "setHexTerrain(q, r, type) / getHexTerrain(q, r) / generateRandomTerrain()",
    "Per-hex terrain (type values like 'Grassland').",
  ],
  [
    "getHexYields / getHexMovementCost / isHexPassable",
    "Terrain-derived attributes.",
  ],
  [
    "getPath(startQ, startR, endQ, endR)",
    "BFS path between hexes respecting passability.",
  ],
  [
    "setHexData(q, r, data) / getHexData / clearHexData",
    "Arbitrary per-hex data.",
  ],
  [
    "hexDistance(q1, r1, q2, r2) / resetView() / fillRandom()",
    "Distance, reset pan/zoom, demo fill.",
  ],
  [
    "setCustomRender(cb) / clearCustomRender()",
    "Draw custom overlays per hex.",
  ],
  [
    "zoomIn() / zoomOut() / on(event, cb)",
    "Zoom controls and event subscription.",
  ],
];

const events: [string, string][] = [
  ["select", "A hex was clicked; payload is the hex (with q, r)."],
  ["zoom", "Zoom changed; payload { scale }."],
  ["pan", "Pan reset; payload { x, y } (emitted on resetView)."],
];
</script>

<template>
  <section id="vd-hex">
    <h5 class="demo-title"><i class="ph ph-hexagon"></i>Hex Grid</h5>
    <p class="vd-mb-8">
      <strong>Vanduo Hex Grid</strong> is a standalone, canvas-rendered axial
      hex grid, installed separately from the framework. Pan, zoom, select
      hexes, and attach terrain or custom data. It reads Vanduo theme tokens,
      ships a pure <code>@vanduo-oss/hex-grid/hex-math</code> subexport, and an
      optional Vue 3 binding (<code>@vanduo-oss/hex-grid/vue</code>) used here.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-lg-8 vd-mb-6" style="align-self: flex-start">
        <div class="vd-card demo-card" style="padding: 1rem">
          <div
            class="hex-demo-container"
            style="
              position: relative;
              width: 100%;
              height: 420px;
              background: var(--vd-bg-primary);
            "
          >
            <VdHexGrid
              :size="size"
              :width="width"
              :height="height"
              :rotation="rotationRad"
              @ready="onReady"
              @select="onSelect"
              @zoom="onZoom"
            />
            <div
              class="canvas-toolbar"
              style="
                position: absolute;
                top: 10px;
                right: 10px;
                display: flex;
                gap: 8px;
                z-index: 10;
              "
            >
              <button
                type="button"
                class="vd-btn vd-btn-sm vd-btn-outline"
                title="Zoom out"
                aria-label="Zoom out"
                @click="zoomOut"
              >
                <i class="ph ph-minus"></i>
              </button>
              <span
                class="vd-text-sm vd-text-muted hex-zoom-level"
                style="
                  padding: 6px 8px;
                  background: var(--vd-bg-primary);
                  border-radius: 4px;
                  min-width: 50px;
                  text-align: center;
                "
                >{{ zoomPercent }}%</span
              >
              <button
                type="button"
                class="vd-btn vd-btn-sm vd-btn-outline"
                title="Zoom in"
                aria-label="Zoom in"
                @click="zoomIn"
              >
                <i class="ph ph-plus"></i>
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-sm vd-btn-outline"
                title="Reset view"
                aria-label="Reset view"
                @click="resetView"
              >
                <i class="ph ph-arrows-counter-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-lg-4 vd-mb-6">
        <div class="vd-card demo-card" style="height: 100%">
          <div class="vd-card-body">
            <h4 class="vd-mb-4">Grid Controls</h4>

            <div class="vd-mb-4">
              <label class="vd-form-label" for="hex-size-slider"
                >Hex Size</label
              >
              <input
                id="hex-size-slider"
                v-model.number="size"
                type="range"
                class="vd-range"
                min="10"
                max="50"
                style="width: 100%"
              />
              <span class="vd-text-sm vd-text-muted">{{ size }}px</span>
            </div>

            <div class="vd-mb-4">
              <label class="vd-form-label" for="hex-width-slider"
                >Grid Width</label
              >
              <input
                id="hex-width-slider"
                v-model.number="width"
                type="range"
                class="vd-range"
                min="5"
                max="30"
                style="width: 100%"
              />
              <span class="vd-text-sm vd-text-muted">{{ width }}</span>
            </div>

            <div class="vd-mb-4">
              <label class="vd-form-label" for="hex-height-slider"
                >Grid Height</label
              >
              <input
                id="hex-height-slider"
                v-model.number="height"
                type="range"
                class="vd-range"
                min="5"
                max="20"
                style="width: 100%"
              />
              <span class="vd-text-sm vd-text-muted">{{ height }}</span>
            </div>

            <div class="vd-mb-4">
              <label class="vd-form-label" for="hex-rotation-slider"
                >Grid Rotation</label
              >
              <input
                id="hex-rotation-slider"
                v-model.number="rotationDeg"
                type="range"
                class="vd-range"
                min="-180"
                max="180"
                step="1"
                style="width: 100%"
              />
              <span class="vd-text-sm vd-text-muted">{{ rotationDeg }}°</span>
            </div>

            <div class="vd-inline vd-mt-2" data-gap="fib-5">
              <button
                type="button"
                class="vd-btn vd-btn-outline"
                @click="resetGrid"
              >
                <i class="ph ph-arrows-counter-clockwise"></i> Reset Grid
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline"
                @click="fillRandom"
              >
                <i class="ph ph-paint-bucket"></i> Fill Random
              </button>
            </div>

            <hr class="vd-my-5" />

            <h5 class="vd-mb-3">Terrain &amp; pathfinding</h5>

            <div class="vd-mb-4">
              <button
                type="button"
                class="vd-btn vd-btn-outline vd-w-100"
                @click="generateTerrain"
              >
                <i class="ph ph-globe-hemisphere-west"></i> Generate Terrain
              </button>
            </div>

            <div class="vd-mb-4">
              <label class="vd-form-label" for="hex-terrain-picker"
                >Paint terrain (select hex first)</label
              >
              <select
                id="hex-terrain-picker"
                v-model="pickedTerrain"
                class="vd-form-select"
                :disabled="selectedQ === null"
              >
                <option v-for="t in terrainTypes" :key="t" :value="t">
                  {{ t }}
                </option>
              </select>
              <button
                type="button"
                class="vd-btn vd-btn-sm vd-btn-outline vd-mt-2"
                :disabled="selectedQ === null"
                @click="applyTerrainToSelected"
              >
                Apply to selected
              </button>
            </div>

            <div class="vd-mb-3">
              <label class="vd-form-check">
                <input
                  v-model="pathMode"
                  type="checkbox"
                  class="vd-form-check-input"
                />
                <span class="vd-form-check-label">Path mode</span>
              </label>
              <p
                v-if="pathMode"
                class="vd-text-sm vd-text-muted vd-mt-2 vd-mb-0"
              >
                Click start hex, then end hex.
                <span v-if="pathStartLabel"> Start: {{ pathStartLabel }}</span>
                <span v-if="pathLength !== null">
                  · Path length: {{ pathLength }} hexes</span
                >
                <span v-else-if="pathNoRoute"> · No route found</span>
              </p>
            </div>

            <div>
              <label class="vd-form-check">
                <input
                  v-model="showCoords"
                  type="checkbox"
                  class="vd-form-check-input"
                />
                <span class="vd-form-check-label"
                  >Show coordinates on all hexes</span
                >
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="showInfo" class="vd-card vd-mb-6 demo-card">
      <div class="vd-card-body">
        <h4 class="vd-mb-4"><i class="ph ph-cursor-click"></i> Selected Hex</h4>
        <div class="vd-row">
          <div class="vd-col-6 vd-col-md-3 vd-mb-2">
            <span class="vd-text-sm vd-text-muted">Coordinates:</span>
            <span class="vd-text-bold vd-ml-2">{{
              selectedCoords || "—"
            }}</span>
          </div>
          <div class="vd-col-6 vd-col-md-3 vd-mb-2">
            <span class="vd-text-sm vd-text-muted">Pixel X:</span>
            <span class="vd-text-bold vd-ml-2">{{
              showInfo ? pixelX : "—"
            }}</span>
          </div>
          <div class="vd-col-6 vd-col-md-3 vd-mb-2">
            <span class="vd-text-sm vd-text-muted">Pixel Y:</span>
            <span class="vd-text-bold vd-ml-2">{{
              showInfo ? pixelY : "—"
            }}</span>
          </div>
          <div class="vd-col-6 vd-col-md-3 vd-mb-2">
            <span class="vd-text-sm vd-text-muted">Adjacent:</span>
            <span class="vd-text-bold vd-ml-2">{{
              showInfo ? adjacentCount : "—"
            }}</span>
          </div>
        </div>
        <div v-if="terrainName" class="vd-row vd-mt-3">
          <div class="vd-col-6 vd-col-md-3 vd-mb-2">
            <span class="vd-text-sm vd-text-muted">Terrain:</span>
            <span class="vd-text-bold vd-ml-2">{{ terrainName }}</span>
          </div>
          <div class="vd-col-6 vd-col-md-3 vd-mb-2">
            <span class="vd-text-sm vd-text-muted">Yields:</span>
            <span class="vd-text-bold vd-ml-2">
              F{{ terrainYields?.food ?? 0 }} P{{
                terrainYields?.production ?? 0
              }}
              G{{ terrainYields?.gold ?? 0 }}
            </span>
          </div>
          <div class="vd-col-6 vd-col-md-3 vd-mb-2">
            <span class="vd-text-sm vd-text-muted">Movement:</span>
            <span class="vd-text-bold vd-ml-2">{{ terrainMovement }}</span>
          </div>
          <div class="vd-col-6 vd-col-md-3 vd-mb-2">
            <span class="vd-text-sm vd-text-muted">Passable:</span>
            <span class="vd-text-bold vd-ml-2">{{
              terrainPassable ? "Yes" : "No"
            }}</span>
          </div>
        </div>
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
        <EngineSwitch>
          <template #vue3
            ><DocCodeSnippet :html="vue3Usage" :default-open="true"
          /></template>
          <template #vanilla
            ><DocCodeSnippet :js="vanillaJs" :default-open="true"
          /></template>
        </EngineSwitch>

        <EngineSwitch>
          <template #vue3>
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
          </template>
          <template #vanilla>
            <h4 class="vd-mt-6">Instance Methods</h4>
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

        <h4 class="vd-mt-6">Pure math (<code>/hex-math</code>)</h4>
        <p class="vd-text-muted vd-mb-3">
          Axial coordinate math and terrain tables, importable without a canvas
          or the DOM — handy for game logic, tests, or Node.
        </p>
        <DocCodeSnippet :js="mathUsage" />
      </div>
    </div>
  </section>
</template>
