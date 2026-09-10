<script setup lang="ts">
import { VdDraw } from "@vanduo-oss/vd3-cbun/draw";
import { drawSeedDoc } from "@/constants/drawSeed";

defineProps<{ fullscreen?: boolean }>();
</script>

<template>
  <!--
    VdDraw's .vd-draw-host defaults to 560px and .vd-draw-shell to min-height
    380px. Force the host/shell to fill this frame so toolbar + canvas stay
    inside the showcase card (and fullscreen still stretches).
  -->
  <div class="cbun-draw-wrap" :class="{ 'is-fullscreen': fullscreen }">
    <VdDraw :data="drawSeedDoc" tool="draw" />
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
