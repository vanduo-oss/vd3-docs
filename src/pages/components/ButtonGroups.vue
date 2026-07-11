<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const horizontalHtml = `<!-- Horizontal Button Group -->
<div class="vd-btn-group">
  <button class="vd-btn vd-btn-primary">Left</button>
  <button class="vd-btn vd-btn-primary">Middle</button>
  <button class="vd-btn vd-btn-primary">Right</button>
</div>

<!-- Outline Buttons with Active State -->
<div class="vd-btn-group">
  <button class="vd-btn vd-btn-outline">One</button>
  <button class="vd-btn vd-btn-outline is-active">Two</button>
  <button class="vd-btn vd-btn-outline">Three</button>
</div>

<!-- Full Width Button Group -->
<div class="vd-btn-group vd-btn-group-full">
  <button class="vd-btn vd-btn-secondary">A</button>
  <button class="vd-btn vd-btn-secondary">B</button>
  <button class="vd-btn vd-btn-secondary">C</button>
</div>`;

const verticalHtml = `<!-- Vertical Button Group -->
<div class="vd-btn-group-vertical">
  <button class="vd-btn vd-btn-primary">Top</button>
  <button class="vd-btn vd-btn-primary">Middle</button>
  <button class="vd-btn vd-btn-primary">Bottom</button>
</div>

<!-- Small Button Group -->
<div class="vd-btn-group vd-btn-group-sm">
  <button class="vd-btn vd-btn-outline">S1</button>
  <button class="vd-btn vd-btn-outline">S2</button>
  <button class="vd-btn vd-btn-outline">S3</button>
</div>

<!-- Large Button Group -->
<div class="vd-btn-group vd-btn-group-lg">
  <button class="vd-btn vd-btn-outline">L1</button>
  <button class="vd-btn vd-btn-outline">L2</button>
  <button class="vd-btn vd-btn-outline">L3</button>
</div>`;

const apiRows: [string, string, string][] = [
  [
    ".vd-btn-group",
    "Base container for grouping buttons horizontally and removing inner border-radii.",
    "Layout",
  ],
  [
    ".vd-btn-group-vertical",
    "Base container for grouping buttons vertically.",
    "Layout",
  ],
  [
    ".vd-btn-group-full",
    "Makes the horizontal button group stretch to 100% of its container width.",
    "Utility",
  ],
  [
    ".vd-btn-group-sm",
    "Applies small sizing to all buttons within the group.",
    "Modifier",
  ],
  [
    ".vd-btn-group-lg",
    "Applies large sizing to all buttons within the group.",
    "Modifier",
  ],
];
</script>

<template>
  <section id="button-groups">
    <h5 class="demo-title"><i class="ph ph-squares-four"></i>Button Groups</h5>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Horizontal Group</h6></div>
          <div class="vd-card-body">
            <div class="vd-btn-group vd-mb-5">
              <button class="vd-btn vd-btn-primary">Left</button>
              <button class="vd-btn vd-btn-primary">Middle</button>
              <button class="vd-btn vd-btn-primary">Right</button>
            </div>
            <br />
            <div class="vd-btn-group vd-mb-5">
              <button class="vd-btn vd-btn-outline">One</button>
              <button class="vd-btn vd-btn-outline is-active">Two</button>
              <button class="vd-btn vd-btn-outline">Three</button>
            </div>
            <br />
            <p class="vd-mt-3">Full width (<code>.vd-btn-group-full</code>):</p>
            <div class="vd-btn-group vd-btn-group-full">
              <button class="vd-btn vd-btn-secondary">A</button>
              <button class="vd-btn vd-btn-secondary">B</button>
              <button class="vd-btn vd-btn-secondary">C</button>
            </div>
            <DocCodeSnippet :html="horizontalHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Vertical Group &amp; Sizes</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-btn-group-vertical vd-mb-5">
              <button class="vd-btn vd-btn-primary">Top</button>
              <button class="vd-btn vd-btn-primary">Middle</button>
              <button class="vd-btn vd-btn-primary">Bottom</button>
            </div>
            <br />
            <p class="vd-mt-3">Small group (<code>.vd-btn-group-sm</code>):</p>
            <div class="vd-btn-group vd-btn-group-sm vd-mb-3">
              <button class="vd-btn vd-btn-outline">S1</button>
              <button class="vd-btn vd-btn-outline">S2</button>
              <button class="vd-btn vd-btn-outline">S3</button>
            </div>
            <br />
            <p class="vd-mt-3">Large group (<code>.vd-btn-group-lg</code>):</p>
            <div class="vd-btn-group vd-btn-group-lg">
              <button class="vd-btn vd-btn-outline">L1</button>
              <button class="vd-btn vd-btn-outline">L2</button>
              <button class="vd-btn vd-btn-outline">L3</button>
            </div>
            <DocCodeSnippet :html="verticalHtml" />
          </div>
        </div>

        <h4 id="api" class="docs-heading">API Reference</h4>
        <div class="vd-table-responsive" style="margin-bottom: 3rem">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th style="width: 25%">Class Name</th>
                <th style="width: 55%">Description</th>
                <th style="width: 20%">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in apiRows" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
