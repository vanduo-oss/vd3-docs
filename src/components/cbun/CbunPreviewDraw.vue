<script setup lang="ts">
import { VdDraw } from "@vanduo-oss/vdl-cbun/draw";
import { drawSeedDoc, fitDrawDemoView } from "@/constants/drawSeed";

function onReady(instance: Parameters<typeof fitDrawDemoView>[0]): void {
  fitDrawDemoView(instance);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => fitDrawDemoView(instance));
  });
}
</script>

<template>
  <!--
    VdDraw's .vd-draw-host defaults to 560px and .vd-draw-shell to min-height
    380px. Force the host/shell to fill this frame so toolbar + canvas stay
    inside the showcase card.
  -->
  <div class="cbun-draw-wrap">
    <VdDraw :data="drawSeedDoc" tool="draw" @ready="onReady" />
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

@media (max-width: 768px) {
  /* Showcase only: colors + canvas. Hide the rest of the editor chrome. */
  .cbun-draw-wrap :deep(.vd-draw-toolbar) {
    display: none;
  }

  .cbun-draw-wrap :deep(.vd-draw-shell) {
    grid-template-rows: auto minmax(0, 1fr);
  }

  .cbun-draw-wrap :deep(.vd-draw-panel) {
    justify-content: center;
    gap: 0.35rem;
    padding: 0.45rem 0.55rem;
  }

  .cbun-draw-wrap :deep(.vd-draw-panel-group) {
    display: none;
    border-right: none;
    padding-right: 0;
  }

  /* Color swatches + native picker — second group in VdDraw's style panel. */
  .cbun-draw-wrap :deep(.vd-draw-panel-group:nth-child(2)) {
    display: flex;
    justify-content: center;
    flex: 1 1 auto;
  }

  .cbun-draw-wrap :deep(.vd-draw-panel-label) {
    display: none;
  }
}
</style>
