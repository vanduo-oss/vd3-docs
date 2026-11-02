<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdPagination } from "@vanduo-oss/vd3";

// Authored page — demos use VdPagination from @vanduo-oss/vd3.
const basicPage = ref(1);
const sizeSmPage = ref(2);
const sizeMdPage = ref(2);
const sizeLgPage = ref(2);
const alignLeftPage = ref(3);
const alignCenterPage = ref(3);
const alignRightPage = ref(3);
const ellipsisPage = ref(10);
const disabledPage = ref(3);

const basicHtml = `<script setup lang="ts">
import { ref } from 'vue';
import { VdPagination } from '@vanduo-oss/vd3';
const page = ref(1);
<\/script>

<template>
  <VdPagination v-model="page" :total="5" />
</template>`;

const sizesHtml = `<VdPagination v-model="pageSm" :total="5" size="sm" />
<VdPagination v-model="pageMd" :total="5" size="md" />
<VdPagination v-model="pageLg" :total="5" size="lg" />`;

const alignHtml = `<VdPagination v-model="pageLeft" :total="6" align="left" />
<VdPagination v-model="pageCenter" :total="6" align="center" />
<VdPagination v-model="pageRight" :total="6" align="right" />`;

const ellipsisHtml = `<!-- Large sets collapse to first/last + a window around the current page -->
<VdPagination v-model="page" :total="20" :max-visible="7" />`;

const jsHtml = `import { ref } from 'vue';

const page = ref(1);

// Jump programmatically — set the v-model ref, no global API needed
page.value = 4;

// React to page changes with @update:modelValue on the component,
// e.g. <VdPagination v-model="page" @update:modelValue="onPage" />
function onPage(p) {
  console.log('Now on page', p);
}`;

const propsRows: [string, string, string, string][] = [
  [
    "v-model (modelValue)",
    "number",
    "1",
    "Two-way bound active page (1-indexed).",
  ],
  [":total", "number", "—", "Total number of pages to render."],
  [
    ":maxVisible",
    "number",
    "7",
    "Maximum page buttons shown before collapsing distant ranges to ellipses.",
  ],
  [
    ":size",
    '"sm" | "md" | "lg"',
    '"md"',
    "Size modifier applied to the pagination list.",
  ],
  [
    ":align",
    '"left" | "center" | "right"',
    '"left"',
    "Horizontal alignment modifier on the pagination list.",
  ],
  [
    ":disabled",
    "boolean",
    "false",
    "Disables all page and previous/next buttons.",
  ],
  [
    "@update:modelValue",
    "(page: number) => void",
    "—",
    "Emitted when the user selects a new page.",
  ],
  [
    "pagination:change",
    "CustomEvent<{ page: number, totalPages: number }>",
    "—",
    "Native DOM event bubbling from the pagination root when the page changes.",
  ],
];

const cssClasses: [string, string][] = [
  [".vd-pagination", "Flex list container for the pagination items"],
  [".vd-pagination-item", "An individual page slot (wraps a link or ellipsis)"],
  [".vd-pagination-link", "The clickable anchor inside a page item"],
  [".vd-pagination-item.active", "The current page (filled primary colour)"],
  [
    ".vd-pagination-item.disabled",
    "A non-interactive item (e.g. Previous on page 1)",
  ],
  [
    ".vd-pagination-prev / .vd-pagination-next",
    "The previous / next navigation items",
  ],
  [".vd-pagination-ellipsis", "The “…” gap shown between distant page ranges"],
  [".vd-pagination-sm / .vd-pagination-lg", "Size modifiers on the container"],
  [
    ".vd-pagination-center / .vd-pagination-right",
    "Alignment modifiers on the container",
  ],
];

const vue3Usage = `<script setup lang="ts">
import { VdPagination } from "@vanduo-oss/vd3";
const page = ref(1);
<\/script>

<template>
  <VdPagination v-model="page" :total="20" :max-visible="7" />
</template>`;
</script>

<template>
  <section id="pagination">
    <h5 class="demo-title">
      <i class="ph ph-dots-three-outline"></i>Pagination
    </h5>
    <p class="vd-mb-8">
      Page-by-page navigation for lists, tables, and search results. The
      <strong>VdPagination</strong> component renders a numbered control bound
      via <code>v-model</code> and <code>:total</code>, automatically collapsing
      long ranges with ellipses and emitting <code>@update:modelValue</code> and
      a <code>pagination:change</code> event as the user navigates.
    </p>

    <!-- Basic -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-pagination-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic</h6></div>
          <div class="vd-card-body">
            <VdPagination v-model="basicPage" :total="5" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Current page: {{ basicPage }}
            </p>
            <DocCodeSnippet :vue="basicHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-pagination-sizes" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Sizes</h6></div>
          <div
            class="vd-card-body"
            style="display: flex; flex-direction: column; gap: 1rem"
          >
            <VdPagination v-model="sizeSmPage" :total="5" size="sm" />
            <VdPagination v-model="sizeMdPage" :total="5" size="md" />
            <VdPagination v-model="sizeLgPage" :total="5" size="lg" />
            <DocCodeSnippet :vue="sizesHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Alignment -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-pagination-align" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Alignment</h6></div>
          <div
            class="vd-card-body"
            style="display: flex; flex-direction: column; gap: 1rem"
          >
            <VdPagination v-model="alignLeftPage" :total="6" align="left" />
            <VdPagination v-model="alignCenterPage" :total="6" align="center" />
            <VdPagination v-model="alignRightPage" :total="6" align="right" />
            <DocCodeSnippet :vue="alignHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Ellipsis (large set) -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div
          id="demo-pagination-ellipsis"
          class="vd-card vd-card-glow demo-card"
        >
          <div class="vd-card-header"><h6>Large Sets with Ellipsis</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              With more than <code>:max-visible</code> pages, the control always
              shows the first and last page plus a window around the current
              page, separated by “…”.
            </p>
            <VdPagination v-model="ellipsisPage" :total="20" :max-visible="7" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Current page: {{ ellipsisPage }}
            </p>
            <DocCodeSnippet :vue="ellipsisHtml" />
          </div>
        </div>
      </div>

      <!-- Disabled -->
      <div class="vd-col-12 vd-col-md-6">
        <div
          id="demo-pagination-disabled"
          class="vd-card vd-card-glow demo-card"
        >
          <div class="vd-card-header"><h6>Disabled</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Add <code>disabled</code> to make the whole control
              non-interactive while data is loading.
            </p>
            <VdPagination v-model="disabledPage" :total="6" disabled />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
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
        <h4>Usage</h4>
        <DocCodeSnippet :vue="vue3Usage" :default-open="true" />

        <h4 class="vd-mt-6">VdPagination Props &amp; Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Prop / Event</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in propsRows" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>
                  <code>{{ row[1] }}</code>
                </td>
                <td>
                  <code>{{ row[2] }}</code>
                </td>
                <td>{{ row[3] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">CSS Classes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Class</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in cssClasses" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Programmatic Control</h4>
        <DocCodeSnippet :js="jsHtml" />
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-wheelchair mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >Accessibility
        </h6>
      </div>
      <div class="vd-card-body">
        <ul>
          <li>
            The control is wrapped in
            <code>&lt;nav aria-label="Pagination"&gt;</code>
          </li>
          <li>The active page link carries <code>aria-current="page"</code></li>
          <li>
            Each page link has a descriptive <code>aria-label</code> (e.g.
            <code>"Page 4"</code>)
          </li>
          <li>
            Ellipses use <code>aria-hidden="true"</code> so they are skipped by
            screen readers
          </li>
          <li>
            Previous / Next become <code>.disabled</code> (and non-interactive)
            at the range boundaries
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
