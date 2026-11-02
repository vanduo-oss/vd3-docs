<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdAvatar, VdBadge, VdDataTable, VdTable } from "@vanduo-oss/vd3";
import type { DataTableColumn } from "@vanduo-oss/vd3";
import { VdChart } from "@vanduo-oss/vd3-charts";

interface MemberRow {
  [key: string]: unknown;
  id: string;
  name: string;
  initials: string;
  role: string;
  status: "Active" | "Pending" | "Paused";
  seats: number;
}

const members: MemberRow[] = [
  {
    id: "1",
    name: "Ada Lovelace",
    initials: "AL",
    role: "Admin",
    status: "Active",
    seats: 3,
  },
  {
    id: "2",
    name: "Grace Hopper",
    initials: "GH",
    role: "Editor",
    status: "Active",
    seats: 2,
  },
  {
    id: "3",
    name: "Alan Turing",
    initials: "AT",
    role: "Viewer",
    status: "Pending",
    seats: 1,
  },
  {
    id: "4",
    name: "Katherine Johnson",
    initials: "KJ",
    role: "Editor",
    status: "Active",
    seats: 2,
  },
  {
    id: "5",
    name: "Dorothy Vaughan",
    initials: "DV",
    role: "Viewer",
    status: "Paused",
    seats: 1,
  },
  {
    id: "6",
    name: "Margaret Hamilton",
    initials: "MH",
    role: "Admin",
    status: "Active",
    seats: 4,
  },
  {
    id: "7",
    name: "Tim Berners-Lee",
    initials: "TB",
    role: "Editor",
    status: "Pending",
    seats: 2,
  },
  {
    id: "8",
    name: "Radia Perlman",
    initials: "RP",
    role: "Viewer",
    status: "Active",
    seats: 1,
  },
];

const columns: DataTableColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "role", label: "Role", sortable: true, variant: "info" },
  { key: "status", label: "Status", sortable: true },
  { key: "seats", label: "Seats", sortable: true, align: "right" },
];

const selected = ref<string[]>([]);
const emptyRows: MemberRow[] = [];

const chartRows = [
  { role: "Admin", count: 2 },
  { role: "Editor", count: 3 },
  { role: "Viewer", count: 3 },
];

const statusVariant = (
  status: MemberRow["status"],
): "success" | "warning" | "secondary" => {
  if (status === "Active") return "success";
  if (status === "Pending") return "warning";
  return "secondary";
};

const vue3Usage = `<script setup lang="ts">
import { VdAvatar, VdDataTable, VdTable } from "@vanduo-oss/vd3";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "status", label: "Status", variant: "success" },
];
const rows = [{ id: "1", name: "Build", status: "Passing", initials: "B" }];
<\/script>

<template>
  <!-- Presentational CSS table — columns.variant is unused here -->
  <VdTable :columns="columns" :rows="rows" striped hover caption="CI status" />

  <!-- Interactive grid — variant applies vd-table-{variant} on headers -->
  <VdDataTable
    :columns="columns"
    :rows="rows"
    row-key="id"
    searchable
    selectable="multiple"
    striped
    hover
    caption="Team"
  >
    <template #cell-name="{ row }">
      <VdAvatar :initials="row.initials" size="sm" />
      {{ row.name }}
    </template>
  </VdDataTable>
</template>`;

const vue3Api: [string, string][] = [
  [
    ":columns",
    "Array of { key, label }. Optional variant is typed but not applied — VdTable is presentational markup.",
  ],
  [":rows", "Array of plain row objects keyed by each column's key."],
  [":striped", "Zebra row striping."],
  [":bordered", "Cell borders."],
  [":hover", "Row hover highlight."],
  [":caption", "Accessible table caption."],
];

const dataTableApi: [string, string][] = [
  [
    ":columns",
    "{ key, label, sortable?, align?, width?, variant? }. variant adds vd-table-{variant} on the header cell.",
  ],
  [
    ":rows",
    "Row objects. Apps own fetch; pass already-sliced rows with :manual.",
  ],
  [":row-key", "String key or (row, index) => id (default 'id')."],
  [
    ":selectable",
    "'none' | 'single' | 'multiple'. Row + select-all checkboxes are labelled.",
  ],
  [
    "v-model:sort / v-model:selected / v-model:page",
    "Controlled sort, selection, page.",
  ],
  [
    ":searchable / :search-keys / :search-placeholder",
    "Toolbar VdInput filters client-side unless :manual.",
  ],
  [
    ":page-size / :manual / :loading",
    "Paging; skip client pipeline; skeleton rows.",
  ],
  [
    ":empty-title / :empty-description / :max-height",
    "Empty copy; sticky-header scrollport.",
  ],
  [
    ":striped / :bordered / :hover / :sm / :caption",
    "Same visual language as VdTable.",
  ],
  [
    "#cell-{key} / #header-{key} / #toolbar / #empty / #loading / #footer",
    "Cell/header overrides plus chrome. Default footer is VdPagination (total = page count).",
  ],
  ["@row-click", "Fired with the row object."],
];

const emptyApi: [string, string][] = [
  [":icon", "Phosphor icon name."],
  [":title / :description", "Heading and supporting copy."],
  ["#action", "Optional call-to-action slot."],
];

const tableStateApi: [string, string][] = [
  [
    "options.rows",
    "Ref<readonly T[]> | (() => readonly T[]) — source row array.",
  ],
  [
    "options.getRowId",
    "(row: T, index: number) => string — unique row identifier resolver.",
  ],
  [
    "options.pageSize",
    "Ref<number> | number (default 10) — rows per page in client mode.",
  ],
  [
    "options.searchKeys",
    "readonly string[] | Ref<readonly string[] | undefined> | (() => readonly string[] | undefined) — keys to match against search query (defaults to all row values).",
  ],
  [
    "options.manual",
    "Ref<boolean> | boolean (default false) — bypasses client filter/sort/slice when rows are already paginated server-side.",
  ],
  [
    "viewRows / total / totalPages",
    "Ref<T[]> of current page rows, Ref<number> filtered row count, and Ref<number> total page count.",
  ],
  [
    "page / search / sort",
    "Reactive controls: page (Ref<number>), search (Ref<string>), and sort (Ref<{ key: string, dir: 'asc' | 'desc' | 'none' }>).",
  ],
  [
    "selectedIds / toggle(id) / toggleAll()",
    "Selection state (Ref<string[]>) and helpers to toggle one row or all visible rows.",
  ],
  [
    "allVisibleSelected / someVisibleSelected",
    "Computed Ref<boolean> flags for header select-all checkbox checked and indeterminate states.",
  ],
];

const simpleColumns = [
  { key: "service", label: "Service" },
  { key: "region", label: "Region" },
  { key: "uptime", label: "Uptime" },
];

const simpleRows = [
  { service: "API Gateway", region: "eu-central", uptime: "99.98%" },
  { service: "Auth Worker", region: "us-east", uptime: "99.95%" },
  { service: "Realtime Hub", region: "ap-south", uptime: "99.99%" },
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
    "Base component class required for all vd3 tables.",
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
  [
    ".vd-data-table",
    "Interactive grid chrome wrapping .vd-table (toolbar, sticky header, footer).",
    "Component",
  ],
  [
    ".vd-empty",
    "Reusable empty-state stack (icon, title, description, action).",
    "Component",
  ],
];
</script>

<template>
  <section id="tables">
    <h5 class="demo-title"><i class="ph ph-table"></i>Tables</h5>
    <p class="vd-mb-8">
      Presentational <code>VdTable</code> (CSS table) plus
      <code>VdDataTable</code> — client search, sort, selection, and paging via
      <code>useTableState</code>. Apps own fetch. Cell slots compose
      <code>VdAvatar</code> / <code>VdBadge</code>; a dashboard recipe can sit a
      <code>VdChart</code> above the grid. <code>useTableState</code> takes
      <code>rows</code>, <code>getRowId</code>, <code>pageSize</code>,
      <code>searchKeys</code>, and <code>manual</code>, and returns
      <code>viewRows</code>, <code>total</code>, <code>totalPages</code>,
      <code>page</code>, <code>search</code>, <code>sort</code>,
      <code>selectedIds</code>, <code>toggle</code>, <code>toggleAll</code>,
      <code>allVisibleSelected</code>, and <code>someVisibleSelected</code>.
    </p>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>VdTable (Presentational)</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Lightweight presentational wrapper that renders a responsive
              <code>.vd-table</code> with optional <code>striped</code>,
              <code>bordered</code>, <code>hover</code>, and
              <code>caption</code> props.
            </p>
            <VdTable
              :columns="simpleColumns"
              :rows="simpleRows"
              striped
              hover
              caption="Service status overview"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>VdDataTable</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Sortable headers expose <code>aria-sort</code>.
              <code>columns.variant</code> tints headers here (not on
              <code>VdTable</code>). Search is client-side unless
              <code>:manual</code>.
            </p>
            <VdDataTable
              v-model:selected="selected"
              :columns="columns"
              :rows="members"
              row-key="id"
              searchable
              selectable="multiple"
              striped
              hover
              :page-size="5"
              caption="Team"
            >
              <template #cell-name="{ row }">
                <span
                  style="display: inline-flex; align-items: center; gap: 0.5rem"
                >
                  <VdAvatar :initials="String(row.initials)" size="sm" />
                  {{ row.name }}
                </span>
              </template>
              <template #cell-status="{ value }">
                <VdBadge
                  :variant="statusVariant(String(value) as MemberRow['status'])"
                >
                  {{ value }}
                </VdBadge>
              </template>
            </VdDataTable>
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Selected:
              {{ selected.length ? selected.join(", ") : "none" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Empty state</h6></div>
          <div class="vd-card-body">
            <VdDataTable
              :columns="columns"
              :rows="emptyRows"
              empty-title="No teammates yet"
              empty-description="Invite someone to populate this grid."
            />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Dashboard recipe</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Composition only — charts come from
              <code>@vanduo-oss/vd3-charts</code>; the table stays in vd3.
            </p>
            <VdChart
              type="bar"
              :data="chartRows"
              x="role"
              y="count"
              title="Seats by role"
              :height="220"
            />
            <VdDataTable
              class="vd-mt-4"
              :columns="columns"
              :rows="members"
              row-key="id"
              striped
              sm
              :page-size="4"
              caption="Same rows, denser page"
            />
          </div>
        </div>
      </div>
    </div>

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
            <DocCodeSnippet :vue="vue3Usage" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div id="api" class="vd-card vd-card-glow demo-card vd-mt-6">
      <div class="vd-card-header"><h6>CSS Classes</h6></div>
      <div class="vd-card-body">
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
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mt-6">
      <div class="vd-card-header"><h6>VdTable API (Vue 3)</h6></div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
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
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mt-6">
      <div class="vd-card-header"><h6>VdDataTable API (Vue 3)</h6></div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th style="width: 25%">Prop / slot / event</th>
                <th style="width: 75%">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in dataTableApi" :key="row[0]">
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

    <div class="vd-card vd-card-glow demo-card vd-mt-6">
      <div class="vd-card-header">
        <h6>useTableState(options) Composable API</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th style="width: 30%">Option / Return Member</th>
                <th style="width: 70%">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tableStateApi" :key="row[0]">
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

    <div class="vd-card vd-card-glow demo-card vd-mt-6">
      <div class="vd-card-header"><h6>VdEmptyState API (Vue 3)</h6></div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th style="width: 25%">Prop / slot</th>
                <th style="width: 75%">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in emptyApi" :key="row[0]">
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

    <div class="vd-card vd-card-glow demo-card vd-mt-6">
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
            <code>VdTable</code> and <code>VdDataTable</code> render semantic
            <code>&lt;table&gt;</code>, <code>&lt;caption&gt;</code>, and
            <code>&lt;th scope="col"&gt;</code> header cells.
          </li>
          <li>
            Sortable column headers in <code>VdDataTable</code> use
            <code>&lt;button type="button"&gt;</code> triggers and expose
            <code>aria-sort="ascending" | "descending" | "none"</code> on the
            parent <code>&lt;th&gt;</code>.
          </li>
          <li>
            Row selection checkboxes and the header select-all checkbox provide
            explicit <code>aria-label</code> attributes (e.g.
            <code>"Select all rows"</code> and <code>"Select row {id}"</code>)
            along with indeterminate state support.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
