<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { VdFlowchart } from "@vanduo-oss/vd3-flowchart";

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

/** Matches the mobile chrome collapse in this wrapper's scoped CSS. */
const MOBILE_SHOWCASE_MQ = "(max-width: 768px)";

interface FlowchartShowcaseInstance {
  fitView?: () => void;
  setViewport?: (viewport: { x: number; y: number; scale: number }) => void;
  toJSON?: () => {
    nodes?: Array<{ x: number; y: number; width: number; height: number }>;
  };
  canvasEl?: HTMLElement;
}

let canvasObserver: ResizeObserver | undefined;
let fitFrame: number | undefined;

function stopObserving(): void {
  canvasObserver?.disconnect();
  if (fitFrame !== undefined) cancelAnimationFrame(fitFrame);
}

onBeforeUnmount(stopObserving);

function isMobileShowcase(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(MOBILE_SHOWCASE_MQ).matches
  );
}

/**
 * Built-in fitView() always pads 80px and clamps to 35% — on a narrow
 * showcase canvas that leaves a tiny, left-weighted diagram. Re-center
 * with tighter padding after the mobile palette is hidden.
 */
function applyShowcaseFit(
  instance: FlowchartShowcaseInstance,
  coreFit?: () => void,
): void {
  if (!isMobileShowcase()) {
    coreFit?.();
    return;
  }
  const width = instance.canvasEl?.clientWidth ?? 0;
  const height = instance.canvasEl?.clientHeight ?? 0;
  const nodes = instance.toJSON?.()?.nodes ?? [];
  if (!instance.setViewport || !width || !height || !nodes.length) {
    coreFit?.();
    return;
  }
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const node of nodes) {
    left = Math.min(left, node.x);
    top = Math.min(top, node.y);
    right = Math.max(right, node.x + node.width);
    bottom = Math.max(bottom, node.y + node.height);
  }
  const contentWidth = Math.max(1, right - left);
  const contentHeight = Math.max(1, bottom - top);
  const padding = 28;
  const scale = Math.min(
    (width - padding * 2) / contentWidth,
    (height - padding * 2) / contentHeight,
    3,
  );
  instance.setViewport({
    x: width / 2 - ((left + right) / 2) * scale,
    y: height / 2 - ((top + bottom) / 2) * scale,
    scale,
  });
}

function onReady(instance: FlowchartShowcaseInstance | null): void {
  if (!instance) return;
  stopObserving();
  // This compact preview omits the outline referenced by the editor's label.
  instance.canvasEl?.setAttribute(
    "aria-label",
    "Diagram canvas. Arrow keys select nodes; Enter edits a label.",
  );
  const coreFit = instance.fitView?.bind(instance);
  if (coreFit) {
    instance.fitView = () => {
      applyShowcaseFit(instance, coreFit);
    };
  }
  applyShowcaseFit(instance, coreFit);
  const scheduleFit = () => {
    if (fitFrame !== undefined) cancelAnimationFrame(fitFrame);
    fitFrame = requestAnimationFrame(() => {
      fitFrame = undefined;
      applyShowcaseFit(instance, coreFit);
    });
  };
  // The showcase changes width when its outer row stacks/un-stacks. Observe
  // the canvas itself so toolbar wrapping and parent-only resizes also refit.
  if (instance.canvasEl && typeof ResizeObserver !== "undefined") {
    canvasObserver = new ResizeObserver(scheduleFit);
    canvasObserver.observe(instance.canvasEl);
  }
  scheduleFit();
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

.cbun-flowchart-wrap :deep(.vd-flowchart-shell) {
  grid-template-rows: auto minmax(0, 1fr);
}

/* Keep the showcase focused on the diagram and its editing toolbar. */
.cbun-flowchart-wrap :deep(.vd-flowchart-panel--inspector),
.cbun-flowchart-wrap :deep(.vd-flowchart-outline) {
  display: none;
}

.cbun-flowchart-wrap :deep(.vd-flowchart-body) {
  grid-template-columns: 88px minmax(0, 1fr);
  /* The full editor stacks its inspector below 1180px. This preview hides it,
     so its reserved rows must also go at every width, not just on phones. */
  grid-template-rows: minmax(0, 1fr);
}

/* Keep the retained desktop-style side palette vertical even when the full
   editor's <=840px stylesheet expects a horizontal palette above the canvas. */
.cbun-flowchart-wrap :deep(.vd-flowchart-palette) {
  grid-template-columns: minmax(0, 1fr);
}

.cbun-flowchart-wrap :deep(.vd-flowchart-panel--palette) {
  border-right: 1px solid var(--vd-flowchart-border);
  border-bottom: 0;
}

@media (max-width: 768px) {
  .cbun-flowchart-wrap :deep(.vd-flowchart-panel--palette) {
    display: none;
  }

  .cbun-flowchart-wrap :deep(.vd-flowchart-body) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }

  .cbun-flowchart-wrap :deep(.vd-flowchart-canvas) {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
  }

  .cbun-flowchart-wrap :deep(.vd-flowchart-toolbar) {
    justify-content: center;
    flex-wrap: nowrap;
    gap: 0.35rem;
    padding: 0.4rem 0.45rem;
  }

  .cbun-flowchart-wrap :deep(.vd-flowchart-toolbar-group) {
    justify-content: center;
    flex-wrap: nowrap;
    flex: 0 1 auto;
    gap: 0.25rem;
  }

  .cbun-flowchart-wrap :deep(.vd-flowchart-icon-btn) {
    width: 1.8rem;
    height: 1.8rem;
    min-height: 1.8rem;
  }

  /* Drop arrange + clear so zoom/fit/history stay on one row. */
  .cbun-flowchart-wrap :deep(.vd-flowchart-arrange),
  .cbun-flowchart-wrap :deep([data-flowchart-action="clear"]) {
    display: none;
  }
}
</style>
