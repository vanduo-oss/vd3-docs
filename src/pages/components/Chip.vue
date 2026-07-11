<script setup lang="ts">
import { reactive } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const removed = reactive<Record<string, boolean>>({});
const remove = (id: string): void => {
  removed[id] = true;
};

const vue3Usage = `<script setup lang="ts">
import { VdChip } from "@vanduo-oss/vue";
<\/script>

<template>
  <VdChip variant="primary">Default</VdChip>
  <VdChip variant="success" outline>Outline</VdChip>
  <VdChip variant="danger" dismissible @dismiss="onRemove">Removable</VdChip>
</template>`;

const vue3Api: [string, string][] = [
  [
    ":variant",
    'primary | secondary | success | warning | danger | info (default "primary").',
  ],
  [":size", "sm | md | lg."],
  [":outline", "Transparent background with a coloured border."],
  [":dismissible", "Renders a close button that emits dismiss."],
  [":clickable", "Makes the chip emit click on activation."],
  [":avatar", "Image src rendered as a leading avatar."],
  ["default slot", "Chip label."],
  ["@dismiss / @click", "Emitted on close / click (when clickable)."],
];

const usageHtml = `<!-- Chip Variants -->
<span class="vd-chip vd-chip-primary">Primary</span>
<span class="vd-chip vd-chip-success">Success</span>
<span class="vd-chip vd-chip-warning">Warning</span>
<span class="vd-chip vd-chip-danger">Danger</span>
<span class="vd-chip vd-chip-info">Info</span>

<!-- Dismissible Chip -->
<span class="vd-chip vd-chip-primary vd-chip-dismissible">
  Removable
  <button type="button" class="vd-chip-close" aria-label="Remove"></button>
</span>`;

const apiRows: [string, string, string][] = [
  [
    ".vd-chip",
    "Base component class required for all Vanduo chips and tags.",
    "Component",
  ],
  [
    ".vd-chip-[variant]",
    "Solid color modifier on the unified status vocabulary (-primary, -secondary, -success, -warning, -danger, -info). -error is a retained alias for -danger.",
    "Modifier",
  ],
  [
    ".vd-chip-outline-[variant]",
    "Outline color modifier featuring a transparent background with colored border.",
    "Modifier",
  ],
  [
    ".vd-chip-[size]",
    "Size modifier class (e.g., -sm for small, -lg for large). Defaults to medium if omitted.",
    "Modifier",
  ],
  [
    ".vd-chip-dismissible",
    "Modifier class that adjusts right padding to accommodate a close button.",
    "Modifier",
  ],
  [
    ".vd-chip-close",
    "Component class for the 'X' close icon inside a dismissible chip.",
    "Sub-component",
  ],
];
</script>

<template>
  <section id="chips">
    <h5 class="demo-title"><i class="ph ph-tag"></i>Chips &amp; Tags</h5>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Chip Variants</h6></div>
          <div class="vd-card-body">
            <span class="vd-chip">Default</span>
            <span class="vd-chip vd-chip-primary">Primary</span>
            <span class="vd-chip vd-chip-secondary">Secondary</span>
            <span class="vd-chip vd-chip-success">Success</span>
            <span class="vd-chip vd-chip-warning">Warning</span>
            <span class="vd-chip vd-chip-danger">Danger</span>
            <span class="vd-chip vd-chip-info">Info</span>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Chip Sizes &amp; Outline</h6></div>
          <div class="vd-card-body">
            <span class="vd-chip vd-chip-sm vd-chip-primary">Small</span>
            <span class="vd-chip vd-chip-primary">Default</span>
            <span class="vd-chip vd-chip-lg vd-chip-primary">Large</span>
            <br /><br />
            <span class="vd-chip vd-chip-outline vd-chip-primary"
              >Outline Primary</span
            >
            <span class="vd-chip vd-chip-outline vd-chip-success"
              >Outline Success</span
            >
            <span class="vd-chip vd-chip-outline vd-chip-danger"
              >Outline Danger</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Dismissible Chips</h6></div>
          <div class="vd-card-body">
            <span
              v-if="!removed.a"
              class="vd-chip vd-chip-primary vd-chip-dismissible"
            >
              Removable
              <button
                type="button"
                class="vd-chip-close"
                aria-label="Remove"
                @click="remove('a')"
              ></button>
            </span>
            <span
              v-if="!removed.b"
              class="vd-chip vd-chip-success vd-chip-dismissible"
            >
              Tag
              <button
                type="button"
                class="vd-chip-close"
                aria-label="Remove"
                @click="remove('b')"
              ></button>
            </span>
            <span
              v-if="!removed.c"
              class="vd-chip vd-chip-info vd-chip-dismissible"
            >
              Category
              <button
                type="button"
                class="vd-chip-close"
                aria-label="Remove"
                @click="remove('c')"
              ></button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Usage</h6></div>
          <div class="vd-card-body">
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :html="vue3Usage" :default-open="true"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :html="usageHtml" :default-open="true"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <h4 id="api" class="docs-heading">API Reference</h4>
    <div class="vd-table-responsive">
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

    <EngineSwitch>
      <template #vue3>
        <h4 class="docs-heading vd-mt-6">Component API (Vue 3)</h4>
        <div class="vd-table-responsive" style="margin-bottom: 3rem">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th style="width: 25%">Prop / slot / event</th>
                <th style="width: 75%">Description</th>
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
      </template>
      <template #vanilla><div style="margin-bottom: 3rem"></div></template>
    </EngineSwitch>
  </section>
</template>
