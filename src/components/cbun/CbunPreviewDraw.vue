<script setup lang="ts">
import { VdDraw } from "@vanduo-oss/vd3-cbun/draw";

defineProps<{ fullscreen?: boolean }>();

const seedDoc = {
  version: "1.1.0",
  viewport: { x: 0, y: 0, scale: 1 },
  shapes: [
    {
      id: "sine-green",
      type: "freehand",
      brush: "pen",
      color: "#2f9e44",
      size: 8,
      points: Array.from({ length: 49 }, (_, i) => {
        const t = i / 48;
        const x = 60 + t * 520;
        const y = 160 + Math.sin(t * Math.PI * 2.5) * 48;
        return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
      }),
    },
  ],
};
</script>

<template>
  <!--
    VdDraw's .vd-draw-host defaults to 560px and .vd-draw-shell to min-height
    380px. Force the host/shell to fill this frame so toolbar + canvas stay
    inside the showcase card (and fullscreen still stretches).
  -->
  <div class="cbun-draw-wrap" :class="{ 'is-fullscreen': fullscreen }">
    <VdDraw :data="seedDoc" tool="draw" />
  </div>
</template>

<style scoped>
.cbun-draw-wrap {
  display: flex;
  flex-direction: column;
  height: 400px;
  min-height: 400px;
  overflow: hidden;
}

.cbun-draw-wrap.is-fullscreen {
  height: 100%;
  min-height: 0;
}

.cbun-draw-wrap :deep(.vd-draw),
.cbun-draw-wrap :deep(.vd-draw-host) {
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.cbun-draw-wrap :deep(.vd-draw-shell) {
  height: 100%;
  min-height: 0;
}
</style>
