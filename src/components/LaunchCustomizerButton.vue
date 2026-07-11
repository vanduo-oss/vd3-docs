<script setup lang="ts">
/**
 * Opens the Live Component Customizer for a given registry component id by
 * dispatching a window event the globally-mounted `LiveCustomizer` listens for.
 * Uses `vd:open-live-customizer` (NOT `vd:open-customizer`, which belongs to
 * the theme customizer).
 */
const props = defineProps<{ component: string }>();

const launch = (): void => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("vd:open-live-customizer", {
      detail: { component: props.component },
    }),
  );
};
</script>

<template>
  <button
    type="button"
    class="vd-btn vd-btn-sm vd-btn-outline-primary lcc-launch"
    @click="launch"
  >
    <i class="ph ph-sliders-horizontal" aria-hidden="true"></i>
    Customize live
  </button>
</template>
