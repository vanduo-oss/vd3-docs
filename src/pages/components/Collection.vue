<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const vue3Usage = `<script setup lang="ts">
import { VdCollection } from "@vanduo-oss/vue";
const items = [
  { id: 1, title: "Ada Lovelace", subtitle: "Engineer", avatar: "/ada.jpg" },
  { id: 2, title: "Alan Turing", subtitle: "Mathematician" },
];
<\/script>

<template>
  <VdCollection :items="items" header="Team" hoverable bordered />
</template>`;

const vue3Api: [string, string][] = [
  [":items", "Array of { id, title, subtitle?, avatar?, action? }."],
  [":header", "Optional list header text."],
  [":hoverable", "Hover highlight on rows."],
  [":bordered", "Adds an outer border."],
  [":size", "sm | md | lg (default md)."],
];

const avatarStyle =
  "display: flex; align-items: center; justify-content: center; font-weight: bold; color: white;";

const usageHtml = `<!-- Basic Collection -->
<ul class="vd-collection">
  <li class="vd-collection-item">
    <div class="vd-collection-content">
      <div class="vd-collection-title">Item Title</div>
      <div class="vd-collection-text">Subtitle</div>
    </div>
  </li>
</ul>

<!-- With Avatar -->
<ul class="vd-collection">
  <li class="vd-collection-item">
    <div class="vd-collection-avatar">JD</div>
    <div class="vd-collection-content">
      <div class="vd-collection-title">John Doe</div>
      <div class="vd-collection-text">Role</div>
    </div>
    <div class="vd-collection-action">
      <button class="vd-btn vd-btn-sm vd-btn-outline">View</button>
    </div>
  </li>
</ul>`;

const apiRows: [string, string, string][] = [
  [
    ".vd-collection",
    "Base component container class, typically applied to <ul>.",
    "Component",
  ],
  [
    ".vd-collection-item",
    "Child element representing a single list item, typically <li>. Add .active to show selected state.",
    "Sub-component",
  ],
  [
    ".vd-collection-avatar",
    "Container for leading visual media like avatars or icons.",
    "Sub-component",
  ],
  [
    ".vd-collection-content",
    "Wrapper for textual content inside an item (title and subtitle).",
    "Sub-component",
  ],
  [
    ".vd-collection-title",
    "The primary heading or text of the collection item.",
    "Sub-component",
  ],
  [
    ".vd-collection-text",
    "The secondary descriptive text of the collection item.",
    "Sub-component",
  ],
  [
    ".vd-collection-action",
    "Container for trailing actions like buttons or icons.",
    "Sub-component",
  ],
];

const people = [
  {
    initials: "JD",
    name: "John Doe",
    role: "Software Engineer",
    bg: "var(--vd-color-primary)",
    active: false,
  },
  {
    initials: "JS",
    name: "Jane Smith",
    role: "Designer",
    bg: "var(--vd-color-success)",
    active: false,
  },
  {
    initials: "MJ",
    name: "Mike Johnson",
    role: "Product Manager",
    bg: "var(--vd-color-warning)",
    active: true,
  },
];
</script>

<template>
  <section id="collections">
    <h5 class="demo-title"><i class="ph ph-list"></i>Collections</h5>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Collection List</h6></div>
          <div class="vd-card-body" style="padding: 0">
            <ul class="vd-collection">
              <li
                v-for="p in people"
                :key="p.initials"
                class="vd-collection-item"
                :class="{ active: p.active }"
              >
                <div
                  class="vd-collection-avatar"
                  :style="`background: ${p.bg}; ${avatarStyle}`"
                >
                  {{ p.initials }}
                </div>
                <div class="vd-collection-content">
                  <div class="vd-collection-title">{{ p.name }}</div>
                  <div class="vd-collection-text">{{ p.role }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Collection with Actions</h6></div>
          <div class="vd-card-body" style="padding: 0">
            <ul class="vd-collection">
              <li class="vd-collection-item">
                <div class="vd-collection-content">
                  <div class="vd-collection-title">Item with action</div>
                  <div class="vd-collection-text">Click to view details</div>
                </div>
                <div class="vd-collection-action">
                  <button class="vd-btn vd-btn-sm vd-btn-outline">View</button>
                </div>
              </li>
              <li class="vd-collection-item">
                <div class="vd-collection-content">
                  <div class="vd-collection-title">Another item</div>
                  <div class="vd-collection-text">With action button</div>
                </div>
                <div class="vd-collection-action">
                  <button class="vd-btn vd-btn-sm vd-btn-outline">View</button>
                </div>
              </li>
            </ul>
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

    <EngineSwitch>
      <template #vue3>
        <h4 class="docs-heading vd-mt-6">Component API (Vue 3)</h4>
        <div class="vd-table-responsive" style="margin-bottom: 3rem">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th style="width: 25%">Prop</th>
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
