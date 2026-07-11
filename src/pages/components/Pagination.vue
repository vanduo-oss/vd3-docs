<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { VdPagination } from "@vanduo-oss/vue";

// Authored page — there is no original `pagination.html`; demos are built from the
// real framework component (framework/js/components/pagination.js + CSS).
const basicPage = ref(1);
const sizeSmPage = ref(2);
const sizeMdPage = ref(2);
const sizeLgPage = ref(2);
const alignLeftPage = ref(3);
const alignCenterPage = ref(3);
const alignRightPage = ref(3);
const ellipsisPage = ref(10);
const disabledPage = ref(3);

const basicHtml = `<!-- Framework markup: the JS expands data-pagination into the list -->
<ul class="vd-pagination"
    data-pagination
    data-total-pages="5"
    data-current-page="1"></ul>`;

const sizesHtml = `<ul class="vd-pagination vd-pagination-sm" data-pagination data-total-pages="5"></ul>
<ul class="vd-pagination"           data-pagination data-total-pages="5"></ul>
<ul class="vd-pagination vd-pagination-lg" data-pagination data-total-pages="5"></ul>`;

const alignHtml = `<ul class="vd-pagination"               data-pagination data-total-pages="6"></ul>
<ul class="vd-pagination vd-pagination-center" data-pagination data-total-pages="6"></ul>
<ul class="vd-pagination vd-pagination-right"  data-pagination data-total-pages="6"></ul>`;

const ellipsisHtml = `<!-- Large sets collapse to first/last + a window around the current page -->
<ul class="vd-pagination"
    data-pagination
    data-total-pages="20"
    data-current-page="10"
    data-max-visible="7"></ul>`;

const jsHtml = `const el = document.querySelector('[data-pagination]');

// Jump programmatically
VanduoPagination.goToPage(el, 4);

// React to page changes
el.addEventListener('pagination:change', (e) => {
  console.log('Now on page', e.detail.page, 'of', e.detail.totalPages);
});`;

const props: [string, string, string][] = [
  [
    "data-pagination",
    "Activates the component on a .vd-pagination element",
    "—",
  ],
  ["data-total-pages", "Total number of pages to render", "1"],
  ["data-current-page", "The initially active page", "1"],
  [
    "data-max-visible",
    "Maximum page links shown before collapsing to ellipses",
    "7",
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

const jsMethods: [string, string][] = [
  [
    "VanduoPagination.init()",
    "Scans for all [data-pagination] elements and renders them",
  ],
  [
    "VanduoPagination.goToPage(el, page)",
    "Activates the given page and fires pagination:change",
  ],
  [
    "VanduoPagination.update(el, options)",
    "Updates totalPages / currentPage / maxVisible and re-renders",
  ],
  [
    "VanduoPagination.destroy(el)",
    "Removes listeners from the given pagination element",
  ],
];

const events: [string, string][] = [
  [
    "pagination:change",
    "Fired on the element when the page changes. event.detail contains { page, totalPages }",
  ],
];

// Engine-specific usage: the Vue component vs the Vanilla data-attribute markup.
const vue3Usage = `<script setup lang="ts">
import { VdPagination } from "@vanduo-oss/vue";
const page = ref(1);
<\/script>

<template>
  <VdPagination v-model="page" :total="20" :max-visible="7" />
</template>`;

const vanillaUsage = `<!-- The JS expands data-pagination into the list -->
<ul class="vd-pagination"
    data-pagination
    data-total-pages="20"
    data-current-page="1"
    data-max-visible="7"></ul>

<script>VanduoPagination.init();<\/script>`;

const vue3Api: [string, string][] = [
  ["v-model (modelValue)", "Two-way bound current page (number)."],
  [":total", "Total number of pages."],
  [":max-visible", "Max page links before collapsing to ellipses (default 7)."],
  [
    ":size / :align / :disabled",
    "'sm'|'md'|'lg' size, 'left'|'center'|'right' align, and a disabled flag.",
  ],
  [
    "@update:modelValue / pagination:change",
    "Fired with the new page; a native pagination:change { page, totalPages } also bubbles.",
  ],
];
</script>

<template>
  <section id="pagination">
    <h5 class="demo-title">
      <i class="ph ph-dots-three-outline"></i>Pagination
    </h5>
    <p class="vd-mb-5">
      Page-by-page navigation for lists, tables, and search results. The
      <strong>VanduoPagination</strong> component renders a numbered control
      from a few data attributes, automatically collapsing long ranges with
      ellipses and emitting a <code>pagination:change</code> event as the user
      navigates.
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
            <DocCodeSnippet :html="basicHtml" />
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
            <DocCodeSnippet :html="sizesHtml" />
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
            <DocCodeSnippet :html="alignHtml" />
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
              With more than <code>data-max-visible</code> pages, the control
              always shows the first and last page plus a window around the
              current page, separated by “…”.
            </p>
            <VdPagination v-model="ellipsisPage" :total="20" :max-visible="7" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Current page: {{ ellipsisPage }}
            </p>
            <DocCodeSnippet :html="ellipsisHtml" />
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
        <EngineSwitch>
          <template #vue3
            ><DocCodeSnippet :html="vue3Usage" :default-open="true"
          /></template>
          <template #vanilla
            ><DocCodeSnippet :html="vanillaUsage" :default-open="true"
          /></template>
        </EngineSwitch>

        <h4 class="vd-mt-6">Data Attributes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in props" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
                <td>
                  <code>{{ row[2] }}</code>
                </td>
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

        <EngineSwitch>
          <template #vue3>
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
          </template>
          <template #vanilla>
            <h4 class="vd-mt-6">JavaScript Methods</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in jsMethods" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </EngineSwitch>

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

        <h4 class="vd-mt-6">Programmatic Control</h4>
        <DocCodeSnippet :html="jsHtml" />
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
