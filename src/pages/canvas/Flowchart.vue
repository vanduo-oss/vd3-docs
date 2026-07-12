<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdFlowchart } from "@vanduo-oss/vd3-cbun/flowchart";

const seedDoc = {
  version: "1.0.0",
  viewport: { x: 0, y: 0, scale: 1 },
  nodes: [
    {
      id: "start",
      type: "circle",
      x: 60,
      y: 140,
      width: 96,
      height: 96,
      text: "Start",
    },
    {
      id: "review",
      type: "rounded-rect",
      x: 220,
      y: 140,
      width: 180,
      height: 96,
      text: "Review request",
    },
    {
      id: "decision",
      type: "diamond",
      x: 470,
      y: 128,
      width: 150,
      height: 120,
      text: "Approved?",
    },
    {
      id: "done",
      type: "circle",
      x: 700,
      y: 140,
      width: 96,
      height: 96,
      text: "Done",
    },
  ],
  edges: [
    {
      id: "e1",
      from: { nodeId: "start", port: "right" },
      to: { nodeId: "review", port: "left" },
      kind: "arrow",
      route: "orthogonal",
    },
    {
      id: "e2",
      from: { nodeId: "review", port: "right" },
      to: { nodeId: "decision", port: "left" },
      kind: "arrow",
      route: "orthogonal",
    },
    {
      id: "e3",
      from: { nodeId: "decision", port: "right" },
      to: { nodeId: "done", port: "left" },
      kind: "arrow",
      route: "orthogonal",
      label: "yes",
    },
  ],
};

const installShell = `pnpm add @vanduo-oss/vd3-cbun`;

const vue3Usage = `<script setup lang="ts">
import { VdFlowchart } from '@vanduo-oss/vd3-cbun/flowchart';

const doc = {
  nodes: [{ id: 'a', type: 'rounded-rect', x: 80, y: 80, text: 'Step' }],
  edges: [],
};
<\/script>

<template>
  <VdFlowchart :data="doc" @change="onChange" />
</template>`;

const nodeTypes: [string, string][] = [
  ["rounded-rect", "Primary flow step"],
  ["rect", "Sharp process block"],
  ["diamond", "Decision"],
  ["circle", "Start or end state"],
  ["textbox", "Notes or descriptive payload"],
  ["label", "Free text annotation"],
  ["junction", "Fixed-size branch or merge point"],
];

const vue3Api: [string, string][] = [
  [
    ":data",
    "Flowchart document ({ nodes, edges }); updates flow through the editor's load().",
  ],
  [":readonly", "Render as a non-editable viewer."],
  [":gridSize", "Background grid size in px."],
  ["@change / @select / @viewport / @connect", "Forwarded editor events."],
  ["@ready", "Emitted once with the underlying VdFlowchart instance."],
];

const events: [string, string][] = [
  [
    "change",
    "Document mutated (add/move/edit). Resize completion fires with reason: 'node:resize'.",
  ],
  ["select", "Selection changed; payload carries the selection snapshot."],
  ["viewport", "Pan/zoom changed."],
  ["connect", "A pointer-created edge connected two ports."],
];
</script>

<template>
  <section id="vd-flowchart">
    <h5 class="demo-title"><i class="ph ph-flow-arrow"></i>Flowchart</h5>
    <p class="vd-mb-8">
      <strong>Vanduo Flowchart</strong> is a standalone SVG flowchart editor,
      installed separately from the framework. Drag from the palette, connect
      ports, edit text inline, and export/import JSON. It ships an optional Vue
      3 binding (<code>@vanduo-oss/vd3-cbun/flowchart</code>) used here.
    </p>

    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-flow-arrow"></i> Editor</h6>
      </div>
      <div class="vd-card-body">
        <VdFlowchart :data="seedDoc" style="min-height: 420px" />
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-list-dashes mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >API Reference
        </h6>
      </div>
      <div class="vd-card-body">
        <h4>Install</h4>
        <DocCodeSnippet :shell="installShell" />

        <h4 class="vd-mt-6">Usage</h4>
        <DocCodeSnippet :html="vue3Usage" :default-open="true" />

        <h4 class="vd-mt-6">Component API</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Prop / event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in vue3Api" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Node Types</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in nodeTypes" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in events" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
