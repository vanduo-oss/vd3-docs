<script setup lang="ts">
import { VdFlowchart } from "@vanduo-oss/vd3-cbun/flowchart";

defineProps<{ fullscreen?: boolean }>();

const seedDoc = {
  version: "1.2.0",
  viewport: { x: 0, y: 0, scale: 1 },
  nodes: [
    {
      id: "start",
      type: "circle",
      x: 80,
      y: 120,
      width: 88,
      height: 88,
      text: "Start",
    },
    {
      id: "build",
      type: "rounded-rect",
      x: 220,
      y: 130,
      width: 140,
      height: 64,
      text: "Build",
    },
    {
      id: "ship",
      type: "diamond",
      x: 420,
      y: 110,
      width: 120,
      height: 100,
      text: "Ready?",
    },
    {
      id: "done",
      type: "circle",
      x: 600,
      y: 120,
      width: 88,
      height: 88,
      text: "Ship",
    },
  ],
  edges: [
    {
      id: "e1",
      from: { nodeId: "start", port: "right" },
      to: { nodeId: "build", port: "left" },
      kind: "arrow",
      route: "orthogonal",
    },
    {
      id: "e2",
      from: { nodeId: "build", port: "right" },
      to: { nodeId: "ship", port: "left" },
      kind: "arrow",
      route: "orthogonal",
    },
    {
      id: "e3",
      from: { nodeId: "ship", port: "right" },
      to: { nodeId: "done", port: "left" },
      kind: "arrow",
      route: "orthogonal",
      label: "yes",
    },
  ],
};
</script>

<template>
  <VdFlowchart
    :data="seedDoc"
    auto-fit
    :style="
      fullscreen ? { height: '100%' } : { minHeight: '280px', height: '280px' }
    "
  />
</template>
