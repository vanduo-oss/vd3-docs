<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import { useClickOutside } from "@/composables/useClickOutside";
import { useDocsColorScheme } from "@/composables/useDocsColorScheme";
import { docsPrimarySwatches } from "@/constants/docsPrimary";

type FanDirection = "up" | "down" | "left" | "right";
type DockEdge = "bottom" | "top" | "left" | "right";

const theme = useThemeStore();
const { scheme } = useDocsColorScheme();
const primarySwatches = computed(() => docsPrimarySwatches(scheme.value));
const FAN_SPREAD = 120;
const FAN_SPREAD_MIN = 30;
const HINGE_GAP = 26;
const VIEWPORT_GAP = 12;

const isOpen = ref(false);
const fanRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const dockEdge = ref<DockEdge>("bottom");
const fanBaseOffset = ref(0);
const fanSpread = ref(FAN_SPREAD);
const snapshotPrimary = ref("");
const finalized = ref(false);
const hoverKey = ref<string | null>(null);
const FAN_BASE_ANGLES: Record<FanDirection, number> = {
  up: -90,
  down: 90,
  left: 180,
  right: 0,
};

const getDockEdge = (): DockEdge => {
  const edge = document.documentElement.getAttribute("data-docs-dock");
  if (edge === "top" || edge === "left" || edge === "right") return edge;
  return "bottom";
};

const syncDockEdge = (): void => {
  dockEdge.value = getDockEdge();
};

const fanDir = computed<FanDirection>(() => {
  const map: Record<DockEdge, FanDirection> = {
    bottom: "up",
    top: "down",
    left: "right",
    right: "left",
  };
  return map[dockEdge.value];
});

const swatchCount = computed(() => primarySwatches.value.length);

const toDeg = (rad: number): number => (rad * 180) / Math.PI;
const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v));

/**
 * Fit the fan inside the viewport. Blades spread along the axis perpendicular
 * to the fan direction (x for up/down, y for left/right); a blade at offset
 * δ° from the fan axis reaches c + sign · L · sin δ along that axis, where L is
 * the blade length from the hinge. Solve for the largest symmetric arc and the
 * base-angle tilt that keeps every blade tip on screen.
 */
const fitFanToViewport = (cx: number, cy: number, dir: FanDirection): void => {
  const blade = fanRef.value?.querySelector<HTMLElement>(".tc-fan-item");
  const bladeLength = HINGE_GAP + (blade?.offsetWidth ?? 96) + 10;

  const horizontal = dir === "up" || dir === "down";
  const sign = dir === "up" || dir === "right" ? 1 : -1;
  const c = horizontal ? cx : cy;
  const minC = VIEWPORT_GAP;
  const maxC = (horizontal ? window.innerWidth : window.innerHeight) - VIEWPORT_GAP;

  let lo = toDeg(Math.asin(clamp(((minC - c) * sign) / bladeLength, -1, 1)));
  let hi = toDeg(Math.asin(clamp(((maxC - c) * sign) / bladeLength, -1, 1)));
  if (lo > hi) [lo, hi] = [hi, lo];

  const spread = clamp(
    Math.min(FAN_SPREAD, hi - lo),
    FAN_SPREAD_MIN,
    FAN_SPREAD,
  );
  fanSpread.value = spread;
  fanBaseOffset.value = (lo + hi) / 2;
};

/** Anchor teleported fan at the dock action trigger for any edge. */
const positionFan = (): void => {
  const fan = fanRef.value;
  const trigger = triggerRef.value;
  if (!fan || !trigger) return;

  syncDockEdge();

  const rect = trigger.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  fan.style.left = `${cx}px`;
  fan.style.top = `${cy}px`;
  fitFanToViewport(cx, cy, fanDir.value);
};

const fanItemAngle = (index: number): number => {
  const count = swatchCount.value;
  const mid = (count - 1) / 2;
  const step = count > 1 ? fanSpread.value / (count - 1) : 0;
  const base = FAN_BASE_ANGLES[fanDir.value] + fanBaseOffset.value;
  return base + (index - mid) * step;
};

/**
 * Hand-fan pose: every pill is hinged at the trigger center (its own
 * left-center via CSS) and stays tilted at its fan angle — like the Oola
 * home demo clones. Closed: all blades folded along the fan axis.
 */
const fanItemStyle = (index: number): Record<string, string | number> => {
  const count = swatchCount.value;
  const mid = (count - 1) / 2;
  const angle = fanItemAngle(index);
  const baseAngle = FAN_BASE_ANGLES[fanDir.value] + fanBaseOffset.value;
  const staggerIndex = isOpen.value ? index : count - 1 - index;
  const openTransform = `rotate(${angle.toFixed(2)}deg) translateX(${HINGE_GAP}px)`;
  const closedTransform = `rotate(${baseAngle.toFixed(2)}deg) translateX(${HINGE_GAP}px) scale(0.5)`;

  return {
    "--i": staggerIndex,
    "--fan-transform-open": openTransform,
    "--fan-transform-closed": closedTransform,
    zIndex: String(count - Math.abs(index - mid)),
  };
};

const open = (): void => {
  snapshotPrimary.value = theme.primary;
  finalized.value = false;
  hoverKey.value = null;
  isOpen.value = true;
};
const close = (): void => {
  if (isOpen.value && !finalized.value) {
    theme.setPrimary(snapshotPrimary.value);
  }
  hoverKey.value = null;
  isOpen.value = false;
};
const toggle = (): void => {
  isOpen.value ? close() : open();
};

const preview = (key: string): void => {
  if (!isOpen.value) return;
  hoverKey.value = key;
  theme.setPrimary(key);
};

const clearPreview = (): void => {
  if (!isOpen.value || finalized.value) return;
  hoverKey.value = null;
  theme.setPrimary(snapshotPrimary.value);
};

const onFanPointerLeave = (event: MouseEvent): void => {
  const related = event.relatedTarget;
  if (related instanceof Node && fanRef.value?.contains(related)) return;
  clearPreview();
};

const select = (key: string): void => {
  theme.setPrimary(key);
  finalized.value = true;
  hoverKey.value = null;
  isOpen.value = false;
};

useClickOutside([fanRef, triggerRef], close, isOpen);

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === "Escape" && isOpen.value) close();
};

const onReposition = (): void => {
  positionFan();
};

watch(isOpen, async (open) => {
  if (open) {
    await nextTick();
    positionFan();
  }
});

watch(fanDir, () => {
  if (isOpen.value) positionFan();
});

let dockObserver: MutationObserver | null = null;

onMounted(() => {
  syncDockEdge();

  dockObserver = new MutationObserver(() => {
    syncDockEdge();
    positionFan();
  });
  dockObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-docs-dock"],
  });

  window.addEventListener("keydown", onKeydown);
  window.addEventListener("vd:open-customizer", open);
  window.addEventListener("resize", onReposition);
  window.addEventListener("scroll", onReposition, true);

  // Pre-fit so the first open already animates to the correct pose.
  void nextTick(() => positionFan());
});
onUnmounted(() => {
  dockObserver?.disconnect();
  dockObserver = null;
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("vd:open-customizer", open);
  window.removeEventListener("resize", onReposition);
  window.removeEventListener("scroll", onReposition, true);
});

defineExpose({ open, close, toggle });
</script>

<template>
  <div class="vd-theme-customizer" :class="{ 'is-open': isOpen }">
    <button
      ref="triggerRef"
      type="button"
      class="vd-theme-customizer-trigger"
      data-theme-customizer-trigger
      aria-label="Choose theme color"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <i class="ph-bold ph-swatches" aria-hidden="true"></i>
    </button>

    <Teleport to="body">
      <!--
        Docs-site lock-in: only Primary Color is user-editable here.
        Palette / Neutral / Radius / Font stay forced to docs defaults
        (see theme store applyDocsLockedPrefs). Both schemes offer Ink
        (black) + eight DOCK_TINTS; default primary for new visitors is blue.
      -->
      <div
        ref="fanRef"
        class="vd-theme-customizer-fan"
        :class="[`fan-${fanDir}`, { 'is-open': isOpen }]"
        role="listbox"
        aria-label="Primary color"
        @mouseleave="onFanPointerLeave"
      >
        <button
          v-for="(c, i) in primarySwatches"
          :key="c.key"
          type="button"
          class="tc-fan-item"
          :class="{
            'is-active': theme.primary === c.key,
            'is-hovered': hoverKey === c.key,
          }"
          :data-color="c.key"
          :style="fanItemStyle(i)"
          role="option"
          :aria-selected="theme.primary === c.key"
          :aria-label="c.name"
          @mouseenter="preview(c.key)"
          @click="select(c.key)"
        >
          <span class="tc-fan-label">{{ c.name }}</span>
          <span
            class="tc-fan-swatch"
            :style="{ '--vd-swatch-color': c.color }"
          ></span>
        </button>
      </div>
    </Teleport>
  </div>
</template>
