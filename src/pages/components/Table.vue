<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const vue3Usage = `<script setup lang="ts">
import { VdTable } from "@vanduo-oss/vue";
const columns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status", variant: "success" },
];
const rows = [{ name: "Build", status: "Passing" }];
<\/script>

<template>
  <VdTable :columns="columns" :rows="rows" striped hover caption="CI status" />
</template>`;

const vue3Api: [string, string][] = [
  [
    ":columns",
    "Array of { key, label, variant? } — variant tints the column header (primary|secondary|success|warning|error|info).",
  ],
  [":rows", "Array of plain row objects keyed by each column's key."],
  [":striped", "Zebra row striping."],
  [":bordered", "Cell borders."],
  [":hover", "Row hover highlight."],
  [":caption", "Accessible table caption."],
];

const borderedHtml = `<!-- Bordered Table -->
<table class="vd-table vd-table-bordered">
  <thead>
    <tr><th>Name</th><th>Email</th><th>Role</th></tr>
  </thead>
  <tbody>
    <tr><td>John Doe</td><td>john@example.com</td><td>Admin</td></tr>
    <tr><td>Jane Smith</td><td>jane@example.com</td><td>User</td></tr>
    <tr><td>Mike Johnson</td><td>mike@example.com</td><td>User</td></tr>
  </tbody>
</table>`;

const stripedHtml = `<!-- Striped Table -->
<table class="vd-table vd-table-striped">
  <thead>
    <tr><th>Product</th><th>Price</th><th>Stock</th></tr>
  </thead>
  <tbody>
    <tr><td>Product A</td><td>$29.99</td><td>50</td></tr>
    <tr><td>Product B</td><td>$39.99</td><td>30</td></tr>
    <tr><td>Product C</td><td>$49.99</td><td>20</td></tr>
  </tbody>
</table>`;

const hoverHtml = `<!-- Hover Table -->
<table class="vd-table vd-table-hover">
  <thead>
    <tr><th>ID</th><th>Status</th><th>Date</th></tr>
  </thead>
  <tbody>
    <tr><td>#001</td><td><span class="vd-badge vd-badge-success">Active</span></td><td>2024-01-15</td></tr>
    <tr><td>#002</td><td><span class="vd-badge vd-badge-warning">Pending</span></td><td>2024-01-16</td></tr>
    <tr><td>#003</td><td><span class="vd-badge vd-badge-danger">Failed</span></td><td>2024-01-17</td></tr>
  </tbody>
</table>`;

const apiRows: [string, string, string][] = [
  [
    ".vd-table",
    "Base component class required for all Vanduo tables.",
    "Component",
  ],
  [
    ".vd-table-bordered",
    "Modifier class that adds borders to all outer boundaries and internal cells.",
    "Modifier",
  ],
  [
    ".vd-table-striped",
    "Modifier class that adds alternating background colors to body rows (zebra striping).",
    "Modifier",
  ],
  [
    ".vd-table-hover",
    "Modifier class that enables a hover background color effect on body rows.",
    "Modifier",
  ],
  [
    ".vd-table-responsive",
    "Wrapper class that enables horizontal scrolling on small screens.",
    "Layout",
  ],
];
</script>

<template>
  <section id="tables">
    <h5 class="demo-title"><i class="ph ph-table"></i>Tables</h5>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Bordered Table</h6></div>
          <div class="vd-card-body" style="overflow-x: auto">
            <table class="vd-table vd-table-bordered vd-text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>Admin</td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td>User</td>
                </tr>
                <tr>
                  <td>Mike Johnson</td>
                  <td>mike@example.com</td>
                  <td>User</td>
                </tr>
              </tbody>
            </table>
            <DocCodeSnippet :html="borderedHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Striped Table</h6></div>
          <div class="vd-card-body" style="overflow-x: auto">
            <table class="vd-table vd-table-striped vd-text-center">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product A</td>
                  <td>$29.99</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>Product B</td>
                  <td>$39.99</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td>Product C</td>
                  <td>$49.99</td>
                  <td>20</td>
                </tr>
              </tbody>
            </table>
            <DocCodeSnippet :html="stripedHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Hover Table</h6></div>
          <div class="vd-card-body" style="overflow-x: auto">
            <table class="vd-table vd-table-hover vd-text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#001</td>
                  <td>
                    <span class="vd-badge vd-badge-success">Active</span>
                  </td>
                  <td>2024-01-15</td>
                </tr>
                <tr>
                  <td>#002</td>
                  <td>
                    <span class="vd-badge vd-badge-warning">Pending</span>
                  </td>
                  <td>2024-01-16</td>
                </tr>
                <tr>
                  <td>#003</td>
                  <td><span class="vd-badge vd-badge-danger">Failed</span></td>
                  <td>2024-01-17</td>
                </tr>
              </tbody>
            </table>
            <DocCodeSnippet :html="hoverHtml" />
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
                ><DocCodeSnippet :html="borderedHtml" :default-open="true"
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
