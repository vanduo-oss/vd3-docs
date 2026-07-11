<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { VdChart } from "@vanduo-oss/charts/vue";

const barData = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 180 },
  { month: "Mar", sales: 150 },
  { month: "Apr", sales: 220 },
];
const lineData = [
  { month: "Jan", visits: 3200 },
  { month: "Feb", visits: 4100 },
  { month: "Mar", visits: 3700 },
  { month: "Apr", visits: 5200 },
];
const donutData = [
  { channel: "Direct", revenue: 4200 },
  { channel: "Referral", revenue: 3100 },
  { channel: "Social", revenue: 2400 },
  { channel: "Email", revenue: 1800 },
];

// New in @vanduo-oss/charts 0.2.0 — multi-series, data labels, annotations.
const seriesData = [
  { month: "Jan", product: 120, service: 80 },
  { month: "Feb", product: 180, service: 110 },
  { month: "Mar", product: 150, service: 130 },
  { month: "Apr", product: 220, service: 160 },
];
const series = [
  { name: "Product", y: "product" },
  { name: "Service", y: "service" },
];
const funnelData = [
  { stage: "Visit", users: 4200 },
  { stage: "Signup", users: 2600 },
  { stage: "Trial", users: 1500 },
  { stage: "Paid", users: 820 },
];
// Per-datum colour: highlight the strong stages.
const barColor = (row: Record<string, unknown>): string =>
  Number(row.users) >= 2600 ? "#22c55e" : "#64748b";
const trendData = [
  { week: "W1", mrr: 120 },
  { week: "W2", mrr: 168 },
  { week: "W3", mrr: 153 },
  { week: "W4", mrr: 244 },
];
const targetLine = [{ y: 200, label: "Target", color: "#e5484d" }];

const featuresUsage = `<!-- Multiple series (grouped bars) -->
<VdChart type="bar" :data="data" x="month" legend
         :series="[{ name: 'Product', y: 'product' },
                   { name: 'Service', y: 'service' }]" />

<!-- Value labels + per-point colour -->
<VdChart type="bar" :data="data" x="stage" y="users" :data-labels="true"
         :color="(row) => row.users >= 2600 ? '#22c55e' : '#64748b'" />

<!-- Reference line + pinned axis range -->
<VdChart type="line" :data="data" x="week" y="mrr" :y-min="0" :y-max="300"
         :annotations="[{ y: 200, label: 'Target', color: '#e5484d' }]" />`;

const installShell = `pnpm add @vanduo-oss/charts`;

const vue3Usage = `<script setup lang="ts">
import { VdChart } from '@vanduo-oss/charts/vue';

const data = [
  { month: 'Jan', sales: 120 },
  { month: 'Feb', sales: 180 },
];
<\/script>

<template>
  <VdChart type="bar" :data="data" x="month" y="sales"
           title="Monthly sales" :height="300" />
</template>`;

const vanillaJs = `import { init } from '@vanduo-oss/charts';
import '@vanduo-oss/charts/css';

// Declarative: scan the DOM for [data-vd-chart] and render SVG.
init();`;

const vanillaHtml = `<div
  data-vd-chart="donut"
  data-vd-label="channel"
  data-vd-value="revenue"
  data-vd-title="Revenue mix"
  data-vd-height="300">
[
  { "channel": "Direct",   "revenue": 4200 },
  { "channel": "Referral", "revenue": 3100 }
]
</div>`;

const chartTypes: [string, string][] = [
  [
    'type="bar"',
    "Category bars with band scale, axes, grid lines, tooltips, bar-click events.",
  ],
  [
    'type="line"',
    "Line path with optional points over category, number, or date-like x.",
  ],
  [
    'type="area"',
    "Filled area plus line path, sharing the cartesian infrastructure.",
  ],
  ['type="scatter"', "Circle marks over numeric, date-like, or categorical x."],
  [
    'type="donut"',
    "Arc slices, default inner-radius-ratio 0.62, center total, legend.",
  ],
  ['type="pie"', "Same polar renderer with inner-radius-ratio 0."],
];

const vue3Api: [string, string][] = [
  [
    ":type",
    "'bar' | 'line' | 'area' | 'scatter' | 'donut' | 'pie' (default 'bar').",
  ],
  [":data", "Array of row objects."],
  ["x / y", "Cartesian accessors — key string or function."],
  ["label / value", "Pie / donut accessors."],
  ["title / description", "Rendered into SVG accessibility metadata."],
  [":height", "Container min-height in px (default 300)."],
  [
    ":theme / :tooltip / :responsive",
    "Theme overrides, custom/disabled tooltip, responsive resize.",
  ],
  [
    ":series",
    "Multiple series — grouped bars, or one line/area path each (Series[]). New in 0.2.0.",
  ],
  [
    ":color",
    "A CSS color, a category-field name, or a per-datum (row) => color. New in 0.2.0.",
  ],
  [
    ":data-labels",
    "true or { format, color } — draw value labels on each mark. New in 0.2.0.",
  ],
  [
    ":annotations",
    "Reference lines: [{ y?, x?, label?, color?, dash? }]. New in 0.2.0.",
  ],
  [
    ":y-min / :y-max / :y-tick-count",
    "Pin axis bounds and tick density (otherwise auto-scaled). New in 0.2.0.",
  ],
  [
    ":legend",
    "true or { position } — shown by default for multi-series charts. New in 0.2.0.",
  ],
];

const vanillaOptions: [string, string][] = [
  ["target", "Element | selector — required mount element."],
  ["data", "Array; null x/y/value rows are skipped."],
  ["x, y", "string | function — cartesian accessors."],
  ["label, value", "string | function — pie/donut accessors."],
  ["title, description", "Rendered into SVG accessibility metadata."],
  ["tooltip", "function | string | false — custom or disabled tooltips."],
  ["theme", "object — override token-derived colors / text / grid / axis."],
];
</script>

<template>
  <section id="vd-charts">
    <h5 class="demo-title"><i class="ph ph-chart-donut"></i>Charts</h5>
    <p class="vd-mb-8">
      <strong>Vanduo Charts</strong> is a standalone SVG-first package for
      common dashboard charts, installed separately from the framework. It
      renders accessible SVG, reads Vanduo theme tokens, and ships an optional
      Vue 3 binding (<code>@vanduo-oss/charts/vue</code>) used here.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-lg-4 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-chart-bar"></i> Bar Chart</h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="bar"
              :data="barData"
              x="month"
              y="sales"
              title="Monthly sales"
              :height="300"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-4 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-chart-line-up"></i> Line Chart</h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="line"
              :data="lineData"
              x="month"
              y="visits"
              title="Site visits"
              :height="300"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-4 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-chart-donut"></i> Donut Chart</h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="donut"
              :data="donutData"
              label="channel"
              value="revenue"
              title="Revenue mix"
              :height="300"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- New in 0.2.0 — multi-series, data labels, per-point colour, annotations -->
    <h3 class="vd-mb-2" style="color: var(--vd-color-primary)">
      <i class="ph ph-sparkle" aria-hidden="true"></i> New in 0.2.0
    </h3>
    <p class="vd-text-muted vd-mb-6">
      Multi-series, value labels, per-point colour, reference-line annotations
      and pinned axis ranges — all opt-in, so default charts render unchanged.
    </p>
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-lg-4 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-chart-bar"></i> Multi-Series</h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="bar"
              :data="seriesData"
              x="month"
              :series="series"
              legend
              title="Product vs service"
              :height="300"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-4 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-tag"></i> Labels + Per-Point Colour</h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="bar"
              :data="funnelData"
              x="stage"
              y="users"
              :data-labels="true"
              :color="barColor"
              title="Activation funnel"
              :height="300"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-4 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-chart-line-up"></i> Annotation + Axis Range</h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="line"
              :data="trendData"
              x="week"
              y="mrr"
              :y-min="0"
              :y-max="300"
              :annotations="targetLine"
              title="MRR vs target"
              :height="300"
            />
          </div>
        </div>
      </div>
    </div>
    <DocCodeSnippet
      class="vd-mb-8"
      :html="featuresUsage"
      :default-open="true"
    />

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
        <EngineSwitch>
          <template #vue3
            ><DocCodeSnippet :html="vue3Usage" :default-open="true"
          /></template>
          <template #vanilla>
            <DocCodeSnippet :js="vanillaJs" :default-open="true" />
            <DocCodeSnippet :html="vanillaHtml" />
          </template>
        </EngineSwitch>

        <h4 class="vd-mt-6">Chart Types</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in chartTypes" :key="row[0]">
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
                    <th>Prop</th>
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
            <h4 class="vd-mt-6">Options</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in vanillaOptions" :key="row[0]">
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

        <h4 class="vd-mt-6">Notes</h4>
        <ul>
          <li>
            Each chart renders an <code>&lt;svg role="img"&gt;</code> with
            title/description metadata when provided.
          </li>
          <li>
            The vanilla bundle exposes <code>window.VanduoCharts</code> and
            registers with <code>Vanduo.init(root)</code> when the framework is
            present.
          </li>
          <li>
            Charts read Vanduo theme tokens, so they follow the active theme
            automatically.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
