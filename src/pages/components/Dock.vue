<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import {
  DOCK_GLASS_STEPS,
  DOCK_PLACEMENTS,
  DOCK_RADIUS_OPTIONS,
  DOCK_TINTS,
  VdDock,
  VdDockItem,
  VdIcon,
  VdThemeSwitcher,
  dockOrientationOf,
  dockPlacementOf,
  type DockGlass,
  type DockItemLayout,
  type DockOrientation,
  type DockPlacement,
  type DockRadius,
  type DockTint,
} from "@vanduo-oss/vd3";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import OolaUMark from "@/components/OolaUMark.vue";
import {
  DOCS_DOCK_RADIUS,
  useDocsColorScheme,
} from "@/composables/useDocsColorScheme";

const { dockTint: themeTint } = useDocsColorScheme();
const tintFollowsTheme = ref(true);

const orientation = ref<DockOrientation>("horizontal");
const placement = ref<DockPlacement>("bottom");
const tint = ref<DockTint | "">(themeTint.value);
const glass = ref<DockGlass>(34);
const radius = ref<DockRadius>(DOCS_DOCK_RADIUS);
const itemLayout = ref<DockItemLayout>("stack");
const brandId = ref("u");
const activeItem = ref("home");
const expanded = ref(false);
const navOffset = ref(64);
const navOffsetPx = computed(() => `${navOffset.value}px`);

const brandChoices = [
  { id: "u", label: "ū" },
  { id: "house", label: "House" },
  { id: "compass", label: "Compass" },
  { id: "planet", label: "Planet" },
  { id: "anchor", label: "Anchor" },
] as const;

const demoItems = [
  { id: "home", icon: "house", label: "Home" },
  { id: "docs", icon: "book-open-text", label: "Docs" },
  { id: "about", icon: "info", label: "About" },
] as const;

function setPlacement(edge: DockPlacement): void {
  placement.value = edge;
  orientation.value = dockOrientationOf(edge);
}

function toggleOrientation(): void {
  const next: DockOrientation =
    orientation.value === "horizontal" ? "vertical" : "horizontal";
  orientation.value = next;
  placement.value = dockPlacementOf(next, placement.value);
}

function setTint(next: DockTint | ""): void {
  tintFollowsTheme.value = false;
  tint.value = next;
}

watch(themeTint, (next) => {
  if (tintFollowsTheme.value) tint.value = next;
});

function resetPlayground(): void {
  orientation.value = "horizontal";
  placement.value = "bottom";
  tintFollowsTheme.value = true;
  tint.value = themeTint.value;
  glass.value = 34;
  radius.value = DOCS_DOCK_RADIUS;
  itemLayout.value = "stack";
  brandId.value = "u";
  activeItem.value = "home";
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape") exitExpanded();
}

function measureNavOffset(): number {
  const nav = document.querySelector(".vd-navbar");
  if (!nav) return 64;
  const rect = nav.getBoundingClientRect();
  // Floating/glass chrome is inset from the viewport top — height alone
  // tucks the overlay under the pill. bottom is the first clear pixel.
  return Math.ceil(Math.max(rect.height, rect.bottom));
}

function enterExpanded(): void {
  navOffset.value = measureNavOffset();
  expanded.value = true;
  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", onKeydown);
}

function exitExpanded(): void {
  if (!expanded.value) return;
  expanded.value = false;
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeydown);
}

function toggleExpanded(): void {
  if (expanded.value) exitExpanded();
  else enterExpanded();
}

onBeforeUnmount(exitExpanded);

const liveSnippet = computed(() => {
  const tintLine = tint.value ? `\n  tint="${tint.value}"` : "";
  return `<script setup lang="ts">
import { ref } from "vue";
import { VdDock, VdDockItem } from "@vanduo-oss/vd3";

const orientation = ref("${orientation.value}");
const placement = ref("${placement.value}");
<\/script>

<template>
  <VdDock
    v-model:orientation="orientation"
    v-model:placement="placement"
    position="contained"
    :glass="${glass.value}"
    radius="${radius.value}"
    item-layout="${itemLayout.value}"${tintLine}
  >
    <template #brand>
      <!-- Swap ū for any logo, Phosphor icon, or wordmark -->
    </template>
    <VdDockItem icon="house" label="Home" active />
    <VdDockItem icon="book-open-text" label="Docs" />
    <VdDockItem icon="info" label="About" />
  </VdDock>
</template>`;
});

const fixedSnippet = `<VdDock
  position="fixed"
  v-model:orientation="orientation"
  v-model:placement="placement"
>
  <template #brand><!-- your mark — morph-origin corner --></template>
  <VdDockItem icon="house" label="Home" active />
  <VdDockItem icon="book-open-text" label="Docs" />
  <template #actions>
    <VdThemeSwitcher :menu="false" />
  </template>
</VdDock>`;

const vue3Api: [string, string][] = [
  [
    "v-model:orientation",
    '"horizontal" | "vertical". Brand click morphs through a square waypoint (480ms / 720ms) on the current pair.',
  ],
  [
    "v-model:placement",
    '"bottom" | "top" | "left" | "right" (default bottom). Source of truth for the edge. Pairs: bottom ↔ left, top ↔ right.',
  ],
  [
    ":position",
    '"fixed" (viewport chrome, default) | "contained" (absolute in a relative parent — use this in docs and cards).',
  ],
  [":dark", "Always-dark near-black frost (default true)."],
  [
    ":tint",
    "Optional Open Color wash: red | orange | yellow | green | teal | blue | violet | pink.",
  ],
  [":glass", "Seemore step 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 (default 34)."],
  [
    ":radius",
    "Dock-own scale — not theme RadiusOption (max 0.5). 0.5 | 0.75 | 1 | 1.25 (default) | 1.5 | 2 | 9999 (pill). Sets --vd-dock-radius.",
  ],
  [
    ":itemLayout",
    '"stack" icon-above-label (default) | "inline" icon-then-label.',
  ],
  [":brandToggles", "Brand click toggles the paired edge (default true)."],
  [
    ":cycle",
    '"pair" (default) keeps bottom ↔ left / top ↔ right. "edges" walks bottom → left → top → right. This playground uses edges.',
  ],
  [
    ":persist",
    'Opt-in. Writes getStoragePrefix() + "dock-orient" as the placement string. Default false.',
  ],
  [":label", 'aria-label for the nav (default "Primary").'],
  [
    "#brand",
    "Morph-origin corner. Demos use ū; swap any icon or wordmark. Bottom/left: brand left or bottom. Top/right: brand right or top.",
  ],
  ["default", "Items — VdDockItem or any .vd-dock-item."],
  ["#actions", 'Trailing controls. Theme switcher should use :menu="false".'],
];

const itemApi: [string, string][] = [
  [":icon", "Phosphor name via VdIcon. Omit for a label-only item."],
  [":label", "Visible label and accessible name."],
  [":active", 'Adds .is-active and aria-current="page".'],
];
</script>

<template>
  <section id="dock">
    <h5 class="demo-title"><i class="ph ph-rows"></i>Oola Dock</h5>
    <p class="vd-mb-8">
      <strong>VdDock</strong> is a fat Seemore glass pill that morphs
      <code>horizontal</code> ↔ <code>vertical</code> through a square waypoint.
      Package defaults stay <code>placement="bottom"</code>, no tint, radius
      <code>1.25</code>, glass <code>34</code>. This playground starts at
      <strong
        >bottom / theme ink (light black, dark green) / radius 2 / glass 34 / ū
        / stack</strong
      >. Brand click here cycles <code>bottom</code> → <code>left</code> →
      <code>top</code> → <code>right</code>. The package still morphs the paired
      edge (<code>bottom</code> ↔ <code>left</code>, <code>top</code> ↔
      <code>right</code>). The <code>#brand</code> slot sits on the morph-origin
      corner — these demos use the oola <strong>ū</strong> mark. Replace it with
      your logo. Radius is dock-own and goes past the theme 0.5rem cap.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div
          class="vd-card vd-card-glow demo-card dock-customizer"
          :class="{ 'is-expanded': expanded }"
          :style="expanded ? { top: `${navOffset}px` } : undefined"
        >
          <div class="vd-card-header dock-customizer-header">
            <h6><i class="ph ph-sliders-horizontal"></i>Live customizer</h6>
            <button
              type="button"
              class="vd-btn vd-btn-outline vd-btn-sm"
              :aria-pressed="expanded"
              @click="toggleExpanded"
            >
              <i :class="expanded ? 'ph ph-arrows-in' : 'ph ph-arrows-out'"></i>
              {{ expanded ? "Exit full screen" : "Full screen" }}
            </button>
          </div>
          <div class="vd-card-body dock-customizer-body">
            <p v-if="!expanded" class="vd-text-sm vd-text-muted vd-mb-4">
              Page-local knobs bound to real <code>VdDock</code> props — they do
              not write the site theme. Click ū (or your chosen brand) to cycle
              the four edges. Toggle orientation still morphs the pair. Full
              screen expands this playground only (not the browser).
            </p>
            <div class="dock-stage" data-dock-playground>
              <VdDock
                v-model:orientation="orientation"
                v-model:placement="placement"
                position="contained"
                :tint="tint || undefined"
                :glass="glass"
                :radius="radius"
                :item-layout="itemLayout"
                cycle="edges"
              >
                <template #brand>
                  <OolaUMark v-if="brandId === 'u'" :size="28" />
                  <VdIcon v-else :name="brandId" />
                </template>
                <VdDockItem
                  v-for="item in demoItems"
                  :key="item.id"
                  :icon="item.icon"
                  :label="item.label"
                  :active="activeItem === item.id"
                  @click="activeItem = item.id"
                />
                <template #actions>
                  <VdThemeSwitcher :menu="false" />
                </template>
              </VdDock>
            </div>

            <div class="dock-play">
              <div class="dock-play-row">
                <span class="dock-play-label">Place</span>
                <div class="dock-play-chips">
                  <button
                    v-for="edge in DOCK_PLACEMENTS"
                    :key="edge"
                    type="button"
                    class="dock-chip"
                    :class="{ 'is-active': placement === edge }"
                    @click="setPlacement(edge)"
                  >
                    {{ edge }}
                  </button>
                </div>
              </div>
              <div class="dock-play-row">
                <span class="dock-play-label">Color</span>
                <div class="dock-play-chips">
                  <button
                    type="button"
                    class="dock-chip"
                    :class="{ 'is-active': tint === '' }"
                    @click="setTint('')"
                  >
                    Ink
                  </button>
                  <button
                    v-for="hue in DOCK_TINTS"
                    :key="hue"
                    type="button"
                    class="dock-chip"
                    :class="{ 'is-active': tint === hue }"
                    :data-tint="hue"
                    @click="setTint(hue)"
                  >
                    {{ hue }}
                  </button>
                </div>
              </div>
              <div class="dock-play-row">
                <span class="dock-play-label">Radius</span>
                <div class="dock-play-chips">
                  <button
                    v-for="step in DOCK_RADIUS_OPTIONS"
                    :key="step"
                    type="button"
                    class="dock-chip"
                    :class="{ 'is-active': radius === step }"
                    @click="radius = step"
                  >
                    {{ step === "9999" ? "pill" : step }}
                  </button>
                </div>
              </div>
              <div class="dock-play-row">
                <span class="dock-play-label">Glass</span>
                <div class="dock-play-chips">
                  <button
                    v-for="step in DOCK_GLASS_STEPS"
                    :key="step"
                    type="button"
                    class="dock-chip"
                    :class="{ 'is-active': glass === step }"
                    @click="glass = step"
                  >
                    {{ step }}
                  </button>
                </div>
              </div>
              <div class="dock-play-row">
                <span class="dock-play-label">Brand</span>
                <div class="dock-play-chips">
                  <button
                    v-for="choice in brandChoices"
                    :key="choice.id"
                    type="button"
                    class="dock-chip"
                    :class="{ 'is-active': brandId === choice.id }"
                    @click="brandId = choice.id"
                  >
                    {{ choice.label }}
                  </button>
                </div>
              </div>
              <div class="dock-play-row">
                <span class="dock-play-label">Icons</span>
                <div class="dock-play-chips">
                  <button
                    type="button"
                    class="dock-chip"
                    :class="{ 'is-active': itemLayout === 'stack' }"
                    @click="itemLayout = 'stack'"
                  >
                    Stack
                  </button>
                  <button
                    type="button"
                    class="dock-chip"
                    :class="{ 'is-active': itemLayout === 'inline' }"
                    @click="itemLayout = 'inline'"
                  >
                    Inline
                  </button>
                </div>
              </div>
              <div class="dock-play-actions">
                <button
                  type="button"
                  class="vd-btn vd-btn-outline vd-btn-sm"
                  @click="toggleOrientation"
                >
                  Toggle orientation
                </button>
                <button
                  type="button"
                  class="vd-btn vd-btn-ghost vd-btn-sm"
                  @click="resetPlayground"
                >
                  Reset
                </button>
              </div>
              <DocCodeSnippet :vue="liveSnippet" class="vd-mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-palette"></i>Open Color tints</h6>
          </div>
          <div class="vd-card-body">
            <div class="dock-tint-grid">
              <div
                v-for="hue in DOCK_TINTS"
                :key="hue"
                class="dock-stage dock-stage-sm"
              >
                <VdDock position="contained" :tint="hue">
                  <template #brand>
                    <OolaUMark :size="22" />
                  </template>
                  <VdDockItem icon="house" label="Home" active />
                  <VdDockItem icon="info" label="About" />
                </VdDock>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-code"></i>Fixed app chrome</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              <code>position="fixed"</code> pins to the viewport like oolasite.
              Default edge is <code>placement="bottom"</code>. Offset your main
              with <code>--vd-dock-height</code> and
              <code>--vd-dock-inset</code>. Use <code>:menu="false"</code> on
              <code>VdThemeSwitcher</code> so the menu cannot clip under the
              pill.
            </p>
            <DocCodeSnippet :vue="fixedSnippet" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>VdDock API</h6></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Prop / slot</th>
                  <th>Notes</th>
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
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>VdDockItem API</h6></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in itemApi" :key="row[0]">
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
    </div>
  </section>
</template>

<style scoped>
.dock-customizer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 0.75rem;
  flex-wrap: nowrap;
  padding: 0.3rem 0.75rem;
  min-height: 0;
}

.dock-customizer-header h6 {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.2;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.dock-customizer-header h6 i {
  font-size: 1em;
}

.dock-customizer-header .vd-btn {
  flex-shrink: 0;
  padding-block: 0.12rem;
  font-size: 0.75rem;
  line-height: 1.2;
}

.dock-stage {
  position: relative;
  height: 26rem;
  border: 1px solid var(--vd-border-color);
  border-radius: var(--vd-radius-fib-5);
  overflow: hidden;
  /* Shadow is 0 10px 36px — keep the full pill inside the canvas. */
  --vd-dock-inset: 2.75rem;
  background:
    radial-gradient(
      ellipse 70% 50% at 50% 80%,
      color-mix(in srgb, var(--vd-color-primary) 12%, transparent),
      transparent 60%
    ),
    var(--vd-bg-secondary);
}

.dock-stage-sm {
  height: 8.5rem;
  --vd-dock-inset: 0.75rem;
}

.dock-tint-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 0.75rem;
}

.dock-play {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-top: 1.25rem;
}

.dock-play-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  align-items: center;
}

.dock-play-label {
  flex: 0 0 4.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vd-text-muted);
}

.dock-play-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.dock-chip {
  appearance: none;
  border: 1px solid var(--vd-border-color);
  background: var(--vd-bg-primary);
  color: var(--vd-text-primary);
  border-radius: var(--vd-radius, var(--vd-btn-border-radius));
  padding: 0.2rem 0.65rem;
  font: inherit;
  font-size: 0.75rem;
  text-transform: capitalize;
  cursor: pointer;
}

.dock-chip.is-active {
  border-color: var(--vd-color-primary);
  color: var(--vd-color-primary);
  font-weight: 600;
  box-shadow: 0 0 0 2px var(--vd-color-primary);
}

.dock-chip:focus-visible {
  outline: 2px solid var(--vd-color-primary);
  outline-offset: 2px;
}

.dock-chip.is-active:focus-visible {
  outline-offset: 3px;
}

.dock-play-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.dock-play-actions .vd-btn {
  border-radius: var(--vd-radius, var(--vd-btn-border-radius));
}

.dock-customizer.is-expanded {
  position: fixed;
  top: v-bind(navOffsetPx);
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
  /* .vd-card uses translateZ(0); keep this overlay viewport-fixed. */
  transform: none;
}

.dock-customizer.is-expanded .dock-customizer-header {
  flex: 0 0 auto;
}

.dock-customizer.is-expanded .dock-customizer-body {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
  grid-template-areas: "play stage";
  gap: 1rem;
  overflow: hidden;
}

.dock-customizer.is-expanded .dock-stage {
  grid-area: stage;
  height: 100%;
  min-height: 0;
}

.dock-customizer.is-expanded .dock-play {
  grid-area: play;
  margin-top: 0;
  min-height: 0;
  overflow: auto;
  /* overflow clips the first row’s 2px active ring + focus outline. */
  padding-top: 0.5rem;
  padding-inline: 0.35rem;
  padding-bottom: 0.25rem;
}

@media (max-width: 900px) {
  .dock-customizer.is-expanded .dock-customizer-body {
    display: flex;
    flex-direction: column;
  }

  .dock-customizer.is-expanded .dock-stage {
    flex: 1 1 40%;
    min-height: 14rem;
  }

  .dock-customizer.is-expanded .dock-play {
    flex: 1 1 60%;
  }
}
</style>
