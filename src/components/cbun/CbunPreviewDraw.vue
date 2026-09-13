<script setup lang="ts">
import { VdDraw } from "@vanduo-oss/vd3-cbun/draw";
import { drawSeedDoc, fitDrawDemoView } from "@/constants/drawSeed";
</script>

<template>
  <!--
    VdDraw's .vd-draw-host defaults to 560px and .vd-draw-shell to min-height
    380px. Force the host/shell to fill this frame so toolbar + canvas stay
    inside the showcase card.
  -->
  <div class="cbun-draw-wrap">
    <VdDraw :data="drawSeedDoc" tool="draw" @ready="fitDrawDemoView" />
  </div>
</template>

<style scoped>
.cbun-draw-wrap {
  display: flex;
  flex-direction: column;
  height: 420px;
  min-height: 420px;
  overflow: hidden;
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
