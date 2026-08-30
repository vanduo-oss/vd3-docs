<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  VdThemeCustomizer as VdThemeCustomizerBase,
  type SwatchFanDirection,
} from "@vanduo-oss/vd3";
import { useThemeStore } from "@/stores/theme";
import { DOCS_PRIMARY_SWATCH_KEYS } from "@/constants/docsPrimary";

type DockEdge = "bottom" | "top" | "left" | "right";

/**
 * Docs-site lock-in around the package swatches fan: only Primary Color is
 * user-editable here. Palette / Neutral / Radius / Font stay forced to docs
 * defaults, so the fan runs controlled — `primary` in, `update:primary` out
 * through the store, which clamps to the docs-allowed hues (Ink + eight dock
 * tints) instead of writing the package's `useThemePreference()` singleton.
 */
const props = withDefaults(
  defineProps<{
    /** When set, wires a site-dock tooltip on the swatches trigger. */
    tooltipPlacement?: string;
  }>(),
  {},
);

const theme = useThemeStore();

/**
 * The fan follows the dock, not the viewport: `direction="auto"` would aim it
 * away from the nearest edge, which is the same answer only while the dock is
 * pinned to that edge.
 */
const FAN_DIRECTION: Record<DockEdge, SwatchFanDirection> = {
  bottom: "up",
  top: "down",
  left: "right",
  right: "left",
};

const dockEdge = ref<DockEdge>("bottom");

const syncDockEdge = (): void => {
  const edge = document.documentElement.getAttribute("data-docs-dock");
  dockEdge.value =
    edge === "top" || edge === "left" || edge === "right" ? edge : "bottom";
};

const direction = computed<SwatchFanDirection>(
  () => FAN_DIRECTION[dockEdge.value],
);

const base = ref<InstanceType<typeof VdThemeCustomizerBase> | null>(null);

let dockObserver: MutationObserver | null = null;

onMounted(() => {
  syncDockEdge();
  dockObserver = new MutationObserver(syncDockEdge);
  dockObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-docs-dock"],
  });
});

onUnmounted(() => {
  dockObserver?.disconnect();
  dockObserver = null;
});

const dockTooltipBind = computed(() =>
  props.tooltipPlacement
    ? {
        "data-tooltip": "Theme color",
        "data-tooltip-placement": props.tooltipPlacement,
        "data-tooltip-variant": "dock",
      }
    : {},
);

defineExpose({
  open: (): void => base.value?.open(),
  close: (): void => base.value?.close(),
  toggle: (): void => base.value?.toggle(),
});
</script>

<template>
  <VdThemeCustomizerBase
    ref="base"
    variant="swatches"
    :swatches="DOCS_PRIMARY_SWATCH_KEYS"
    :direction="direction"
    :primary="theme.primary"
    v-bind="dockTooltipBind"
    @update:primary="theme.setPrimary"
  />
</template>
