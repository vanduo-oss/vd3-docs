<script setup lang="ts">
import { VdFlowchart } from "@vanduo-oss/vd3-cbun/flowchart";

const seedDoc = {
  version: "1.2.0",
  viewport: { x: 0, y: 0, scale: 1 },
  nodes: [
    {
      id: "idea",
      type: "circle",
      x: 16,
      y: 40,
      width: 156,
      height: 156,
      text: "Your great idea",
    },
    {
      id: "build",
      type: "rounded-rect",
      x: 240,
      y: 8,
      width: 148,
      height: 56,
      text: "Build it",
    },
    {
      id: "share",
      type: "rounded-rect",
      x: 240,
      y: 172,
      width: 148,
      height: 56,
      text: "Tell someone",
    },
  ],
  edges: [
    {
      id: "e-build",
      from: { nodeId: "idea", port: "right" },
      to: { nodeId: "build", port: "left" },
      kind: "arrow",
      route: "curve",
    },
    {
      id: "e-share",
      from: { nodeId: "idea", port: "right" },
      to: { nodeId: "share", port: "left" },
      kind: "arrow",
      route: "curve",
    },
  ],
};

function onReady(instance: { fitView?: (padding?: number) => void } | null) {
  instance?.fitView?.(28);
}
</script>

<template>
  <div class="cbun-flowchart-wrap">
    <VdFlowchart
      :data="seedDoc"
      auto-fit
      :style="{ minHeight: '420px', height: '420px' }"
      @ready="onReady"
    />
  </div>
</template>

<style scoped>
.cbun-flowchart-wrap {
  height: 420px;
  min-height: 420px;
}

.cbun-flowchart-wrap :deep(.vd-flowchart-host),
.cbun-flowchart-wrap :deep(.vd-flowchart-shell) {
  height: 100%;
  min-height: 0;
}

/* Showcase only: drop the JSON inspector so the fork can fill the canvas. */
.cbun-flowchart-wrap :deep(.vd-flowchart-panel--inspector) {
  display: none;
}

.cbun-flowchart-wrap :deep(.vd-flowchart-body) {
  grid-template-columns: 88px minmax(0, 1fr);
}
</style>
