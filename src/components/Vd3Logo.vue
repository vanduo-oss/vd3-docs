<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    theme?: "light" | "dark";
    withText?: boolean;
    width?: number | string;
    alt?: string;
  }>(),
  {
    theme: "light",
    withText: true,
    width: 240,
    alt: "VD3 UI",
  },
);

const src = computed(() => {
  const kind = props.withText ? "lockup" : "mark";

  return (
    `${import.meta.env.BASE_URL}brand/vd3-ui/` +
    `vd3-ui-${kind}-${props.theme}.svg`
  );
});

const imageStyle = computed(() => ({
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
}));
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :style="imageStyle"
    :width="withText ? 533 : 204"
    height="204"
    class="vd3-logo"
    decoding="async"
    draggable="false"
  />
</template>

<style scoped>
.vd3-logo {
  display: block;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}
</style>
