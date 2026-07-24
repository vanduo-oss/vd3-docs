<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdButtonGroup, VdButton } from "@vanduo-oss/vd3";

const vdBtnGroupUsage = `<script setup lang="ts">
import { VdButtonGroup, VdButton } from "@vanduo-oss/vd3";
<\/script>

<template>
  <VdButtonGroup size="md">
    <VdButton variant="primary">Left</VdButton>
    <VdButton variant="primary">Middle</VdButton>
    <VdButton variant="primary">Right</VdButton>
  </VdButtonGroup>

  <!-- vertical stack, full-width, large -->
  <VdButtonGroup vertical full-width size="lg">
    <VdButton variant="secondary">A</VdButton>
    <VdButton variant="secondary">B</VdButton>
  </VdButtonGroup>
</template>`;

const vdBtnGroupApi: [string, string][] = [
  [
    ":size",
    "'sm' | 'md' | 'lg' — sizes every button in the group (default 'md').",
  ],
  [":vertical", "Stacks the buttons vertically (adds .vd-btn-group-vertical)."],
  [
    ":full-width",
    "Stretches the group to 100% width (adds .vd-btn-group-full).",
  ],
  ["default slot", "The VdButton (or .vd-btn) children to group."],
];

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
    <p class="vd-mb-8">
      Cluster related buttons so they share edges and read as a single control —
      horizontal or vertical, in three sizes, and optionally full-width.
    </p>

    <!-- VdButtonGroup component (Vue 3) -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i
                class="ph ph-cursor-click mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >VdButtonGroup component (Vue 3)
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-muted vd-mb-5">
              <code>&lt;VdButtonGroup&gt;</code> wraps
              <code>&lt;VdButton&gt;</code> children and applies the group
              layout through the <code>size</code>, <code>vertical</code>, and
              <code>full-width</code> props.
            </p>

            <p class="vd-text-sm vd-text-muted vd-mb-2">Horizontal (default)</p>
            <VdButtonGroup class="vd-mb-4">
              <VdButton variant="primary">Left</VdButton>
              <VdButton variant="primary">Middle</VdButton>
              <VdButton variant="primary">Right</VdButton>
            </VdButtonGroup>

            <p class="vd-text-sm vd-text-muted vd-mb-2">Vertical</p>
            <VdButtonGroup vertical class="vd-mb-4">
              <VdButton variant="secondary">Top</VdButton>
              <VdButton variant="secondary">Middle</VdButton>
              <VdButton variant="secondary">Bottom</VdButton>
            </VdButtonGroup>

            <p class="vd-text-sm vd-text-muted vd-mb-2">Full width · large</p>
            <VdButtonGroup full-width size="lg" class="vd-mb-5">
              <VdButton variant="primary">A</VdButton>
              <VdButton variant="primary">B</VdButton>
              <VdButton variant="primary">C</VdButton>
            </VdButtonGroup>

            <h4 class="vd-mt-4">Usage</h4>
            <DocCodeSnippet :html="vdBtnGroupUsage" :default-open="true" />

            <h4 class="vd-mt-6">Component API (Vue 3)</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Prop / slot</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in vdBtnGroupApi" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-4 vd-mb-0">
              The raw <code>.vd-btn-group</code> classes below ship in vd3's CSS
              and back the same layout for non-Vue markup.
            </p>
          </div>
        </div>
      </div>
    </div>

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
