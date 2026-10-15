<script setup lang="ts">
import { reactive } from "vue";
import { VdChip } from "@vanduo-oss/vd3";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const removed = reactive<Record<string, boolean>>({});
const remove = (id: string): void => {
  removed[id] = true;
};

const vue3Usage = `<script setup lang="ts">
import { VdChip } from "@vanduo-oss/vd3";
<\/script>

<template>
  <VdChip variant="primary">Default</VdChip>
  <VdChip variant="success" outline>Outline</VdChip>
  <VdChip variant="danger" dismissible @dismiss="onRemove">Removable</VdChip>
  <VdChip variant="info" avatar="/avatar.png" clickable @click="onClick">With avatar</VdChip>
  <VdChip size="sm">Small</VdChip>
  <VdChip size="lg">Large</VdChip>
</template>`;

const vue3Api: [string, string][] = [
  [
    ":variant",
    'primary | secondary | success | warning | danger | info (default "primary").',
  ],
  [":size", 'sm | md | lg (default "md").'],
  [":outline", "Transparent background with a coloured border."],
  [":dismissible", "Renders a close button that emits dismiss."],
  [":clickable", "Makes the chip emit click on activation."],
  [":avatar", "Image src rendered as a leading avatar."],
  ["default slot", "Chip label."],
  ["@dismiss / @click", "Emitted on close / click (when clickable)."],
];

const apiRows: [string, string, string][] = [
  [
    ".vd-chip",
    "Base component class required for all vd3 chips and tags.",
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
    <p class="vd-mb-8">
      Compact tokens for tags, filters, and selections, with contextual colors,
      optional icons, and a removable (dismissible) variant.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Chip Variants</h6></div>
          <div class="vd-card-body">
            <VdChip>Primary</VdChip>
            <VdChip variant="secondary">Secondary</VdChip>
            <VdChip variant="success">Success</VdChip>
            <VdChip variant="warning">Warning</VdChip>
            <VdChip variant="danger">Danger</VdChip>
            <VdChip variant="info">Info</VdChip>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Chip Sizes &amp; Outline</h6></div>
          <div class="vd-card-body">
            <VdChip size="sm">Small</VdChip>
            <VdChip>Default</VdChip>
            <VdChip size="lg">Large</VdChip>
            <br /><br />
            <VdChip outline>Outline Primary</VdChip>
            <VdChip variant="success" outline>Outline Success</VdChip>
            <VdChip variant="danger" outline>Outline Danger</VdChip>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Dismissible Chips</h6></div>
          <div class="vd-card-body">
            <VdChip v-if="!removed.a" dismissible @dismiss="remove('a')">
              Removable
            </VdChip>
            <VdChip
              v-if="!removed.b"
              variant="success"
              dismissible
              @dismiss="remove('b')"
            >
              Tag
            </VdChip>
            <VdChip
              v-if="!removed.c"
              variant="info"
              dismissible
              @dismiss="remove('c')"
            >
              Category
            </VdChip>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Usage</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :vue="vue3Usage" :default-open="true" />
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
  </section>
</template>
