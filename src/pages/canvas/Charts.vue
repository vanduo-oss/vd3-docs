<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdChart, type ClickEvent } from "@vanduo-oss/vd3-charts";

// ---------------------------------------------------------------------------
// Demo Datasets
// ---------------------------------------------------------------------------

// 1. Accessibility & Interactive Keyboard demo
const quarterlyRevenue = [
  { quarter: "Q1", revenue: 145 },
  { quarter: "Q2", revenue: 210 },
  { quarter: "Q3", revenue: 185 },
  { quarter: "Q4", revenue: 290 },
];
const lastBarClick = ref<string | null>(null);
const onBarClick = (e: ClickEvent<(typeof quarterlyRevenue)[number]>): void => {
  lastBarClick.value = `${e.datum.quarter}: $${e.datum.revenue}k (bar #${e.index + 1})`;
};

// 2. Core Chart Types
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

const areaData = [
  { month: "Jan", sessions: 2800 },
  { month: "Feb", sessions: 3600 },
  { month: "Mar", sessions: 3300 },
  { month: "Apr", sessions: 4700 },
];

const lastSliceClick = ref<string | null>(null);
const onSliceClick = (e: ClickEvent<(typeof donutData)[number]>): void => {
  lastSliceClick.value = `${e.datum.channel}: $${e.datum.revenue} (slice #${e.index + 1})`;
};

// 3. Negative Values (Profit / Loss)
const profitLossData = [
  { quarter: "Q1", profit: 45 },
  { quarter: "Q2", profit: -25 },
  { quarter: "Q3", profit: -15 },
  { quarter: "Q4", profit: 60 },
];

// 4. Multi-Series Grouped Bar
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

// 5. Annotations & Targets
const trendData = [
  { week: "W1", mrr: 120 },
  { week: "W2", mrr: 168 },
  { week: "W3", mrr: 153 },
  { week: "W4", mrr: 244 },
];
const targetLine = [{ y: 200, label: "Target ($200k)", color: "#e5484d" }];

// 6. Scatter Plot
const scatterData = [
  { x: 10, y: 25 },
  { x: 25, y: 55 },
  { x: 40, y: 35 },
  { x: 55, y: 85 },
  { x: 70, y: 65 },
  { x: 90, y: 110 },
];
const lastPointClick = ref<string | null>(null);
const onPointClick = (e: ClickEvent<(typeof scatterData)[number]>): void => {
  lastPointClick.value = `(${e.datum.x}, ${e.datum.y}) at index #${e.index + 1}`;
};

// 7. Data Labels & Per-Datum Coloring (Funnel)
const funnelData = [
  { stage: "Visit", users: 4200 },
  { stage: "Signup", users: 2600 },
  { stage: "Trial", users: 1500 },
  { stage: "Paid", users: 820 },
];
const barColor = (row: Record<string, unknown>): string =>
  Number(row.users) >= 2600 ? "#22c55e" : "#64748b";

// ---------------------------------------------------------------------------
// Documentation Snippets & Reference
// ---------------------------------------------------------------------------

const installShell = `pnpm add @vanduo-oss/vd3-charts`;

const a11yUsage = `<!-- WAI-ARIA Graphics, keyboard navigation, and data table fallback -->
<script setup lang="ts">
import { VdChart, type ClickEvent } from '@vanduo-oss/vd3-charts';
import '@vanduo-oss/vd3-charts/css';

const data = [
  { quarter: 'Q1', revenue: 145 },
  { quarter: 'Q2', revenue: 210 },
  { quarter: 'Q3', revenue: 185 },
  { quarter: 'Q4', revenue: 290 },
];

const onClick = (e: ClickEvent) => console.log('Clicked:', e.datum);
<\/script>

<template>
  <!-- data-table default is true (sr-only). Use "visible" to show the
       data table in layout, or false to suppress it. -->
  <VdChart
    type="bar"
    :data="data"
    x="quarter"
    y="revenue"
    title="Quarterly Revenue"
    data-table="visible"
    @bar-click="onClick"
  />
</template>`;

const advancedUsage = `<!-- Multi-series grouped bars with legend -->
<VdChart type="bar" :data="data" x="month" legend
         :series="[{ name: 'Product', y: 'product' },
                   { name: 'Service', y: 'service' }]" />

<!-- Mixed positive/negative values with zero baseline -->
<VdChart type="bar" :data="profitLoss" x="quarter" y="profit"
         title="Quarterly Profit/Loss" />

<!-- Annotations + target reference line -->
<VdChart type="line" :data="trend" x="week" y="mrr" :y-min="0" :y-max="300"
         :annotations="[{ y: 200, label: 'Target', color: '#e5484d' }]" />`;

const chartTypes: [string, string][] = [
  [
    'type="bar"',
    "Category bars with band scale, axes, grid lines, negative y handling, keyboard arrow navigation, and data table fallback.",
  ],
  [
    'type="line"',
    "Line path with interactive circle marks over category, numeric, or date-like x values.",
  ],
  [
    'type="area"',
    "Filled area path closing to zero baseline plus line path, sharing the cartesian scale engine.",
  ],
  [
    'type="scatter"',
    "Circle marks over 2D numeric, date-like, or categorical scales with point click handling.",
  ],
  [
    'type="donut"',
    "Arc slices with inner-radius ratio (default 0.62), percentage tooltips, center total summary, and legend.",
  ],
  [
    'type="pie"',
    'Solid pie wedges. Both VdChart type="pie" and VdPieChart default to an inner-radius ratio of 0.',
  ],
];

const vue3Api: [string, string][] = [
  [
    ":type",
    "'bar' | 'line' | 'area' | 'scatter' | 'donut' | 'pie' (default 'bar').",
  ],
  [":data", "Array of row objects."],
  [
    "x / y",
    "Cartesian accessors — field key string or (datum) => value function.",
  ],
  ["label / value", "Pie / donut accessors."],
  [
    "refresh() (template ref)",
    "Redraw after changing CSS theme variables. Data and responsive prop changes update automatically.",
  ],
  [
    "title / description",
    "Rendered into SVG accessibility metadata (<title> and <desc> tags).",
  ],
  [
    ":data-table",
    "true (sr-only, default) | 'visible' | false. Generates an HTML data table.",
  ],
  [
    ":inner-radius-ratio",
    "Hole size (0–0.9): donut defaults to 0.62; pie defaults to 0.",
  ],
  [
    ":aria-role-description",
    "Custom ARIA role description override for the SVG shell (defaults to `${type} chart`).",
  ],
  [
    ":svg-role",
    "Override the inner SVG graphics role. The standard role attribute still falls through to the wrapper root; core factories use the role option directly.",
  ],
  [":height", "Container min-height in px (default 300)."],
  [
    ":theme / :tooltip / :responsive",
    "Theme overrides, custom/disabled tooltip, responsive resize observer.",
  ],
  [
    ":series",
    "Multiple series — grouped bars, or one line/area path each (Series[]).",
  ],
  [
    ":color",
    "A CSS color string, category-field name, or per-datum (row) => color callback.",
  ],
  [
    ":data-labels",
    "true or { format, color } — draw value labels on each mark.",
  ],
  [":annotations", "Reference lines: [{ y?, x?, label?, color?, dash? }]."],
  [
    ":y-min / :y-max / :y-tick-count",
    "Pin axis bounds and tick density (supports negative floors and clamped baselines).",
  ],
  [
    ":legend",
    "true or { position: 'top' | 'right' } — shown by default for multi-series charts.",
  ],
  [
    "@bar-click / @point-click / @slice-click",
    "Mark-click events — each carries ClickEvent { event, datum, index }.",
  ],
];

const keyboardShortcuts: [string, string][] = [
  ["Tab / Shift+Tab", "Enter or leave the interactive chart mark group."],
  [
    "ArrowRight / ArrowDown",
    "Move focus to the next data mark (cycles with wraparound) and displays its tooltip.",
  ],
  [
    "ArrowLeft / ArrowUp",
    "Move focus to the previous data mark (cycles with wraparound) and displays its tooltip.",
  ],
  ["Home", "Jump keyboard focus directly to the first data mark."],
  ["End", "Jump keyboard focus directly to the last data mark."],
  [
    "Enter / Space",
    "Trigger the mark's click callback (e.g. @bar-click, @point-click, @slice-click).",
  ],
  ["Escape", "Blur the focused mark and dismiss the active tooltip."],
];
</script>

<template>
  <section id="vd-charts">
    <h5 class="demo-title charts-page-title">
      <i class="ph ph-chart-donut"></i>Charts
    </h5>
    <div class="vd-badge-group vd-mt-8 vd-mb-8">
      <span class="a11y-pill"
        ><i class="ph ph-shield-check"></i> Labelled SVG marks</span
      >
      <span class="a11y-pill"
        ><i class="ph ph-keyboard"></i> Arrow Key Navigation</span
      >
      <span class="a11y-pill"><i class="ph ph-table"></i> Data table</span>
    </div>

    <p class="vd-mb-6">
      <strong>VdChart</strong> renders bar, line, area, scatter, donut, and pie
      charts. Supply data and field names. Each chart includes labelled marks,
      keyboard navigation, tooltips, and an optional data table.
    </p>

    <!-- ===================================================================== -->
    <!-- Feature Showcase: Accessibility & Keyboard Navigation                -->
    <!-- ===================================================================== -->
    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i
                class="ph ph-keyboard"
                style="color: var(--vd-color-primary)"
              ></i>
              Keyboard navigation and data table
            </h6>
          </div>
          <div class="vd-card-body">
            <div class="a11y-instructions vd-mb-4">
              <div class="instruction-item">
                <i class="ph ph-cursor-click"></i>
                <span
                  ><strong>Tab</strong> into the chart or click a bar to focus
                  it.</span
                >
              </div>
              <div class="instruction-item">
                <i class="ph ph-arrows-horizontal"></i>
                <span
                  >Use <kbd>→</kbd> / <kbd>←</kbd> or <kbd>↓</kbd> /
                  <kbd>↑</kbd> to cycle between bars with roving focus and live
                  tooltip.</span
                >
              </div>
              <div class="instruction-item">
                <i class="ph ph-arrow-fat-lines-right"></i>
                <span
                  >Use <kbd>Home</kbd> / <kbd>End</kbd> to jump to first/last
                  bar; press <kbd>Enter</kbd> or <kbd>Space</kbd> to
                  select.</span
                >
              </div>
            </div>

            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Show the data table with
              <code>data-table="visible"</code>. Production default is
              <code>true</code> (sr-only, for assistive tech only);
              <code>false</code> suppresses it.
            </p>

            <VdChart
              type="bar"
              :data="quarterlyRevenue"
              x="quarter"
              y="revenue"
              title="Quarterly Revenue ($k)"
              data-table="visible"
              :height="260"
              @bar-click="onBarClick"
            />

            <div class="chart-status-bar vd-mt-3">
              <span class="status-chip">
                <i class="ph ph-hand-pointing"></i>
                <template v-if="lastBarClick"
                  >Last selection: <strong>{{ lastBarClick }}</strong></template
                >
                <template v-else
                  >No bar selected yet — press <kbd>Enter</kbd> on a focused
                  bar.</template
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- Core Chart Types Grid                                                 -->
    <!-- ===================================================================== -->
    <h3 class="vd-mb-2" style="color: var(--vd-color-primary)">
      <i class="ph ph-chart-line-up" aria-hidden="true"></i> Core Chart Types
    </h3>
    <p class="vd-text-muted vd-mb-6">
      Bar, line, area, scatter, donut, and pie — automatic dimension measurement
      and responsive resize. Click a donut or pie slice to see
      <code>@slice-click</code>.
    </p>

    <div class="vd-row vd-mb-8">
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
              :height="280"
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
              :height="280"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-4 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-chart-line"></i> Area Chart</h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="area"
              :data="areaData"
              x="month"
              y="sessions"
              title="Sessions"
              :height="280"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-6 vd-mb-4">
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
              :height="280"
              @slice-click="onSliceClick"
            />
            <div class="chart-status-bar vd-mt-2">
              <span class="status-chip">
                <i class="ph ph-hand-pointing"></i>
                <template v-if="lastSliceClick"
                  >Last slice: <strong>{{ lastSliceClick }}</strong></template
                >
                <template v-else>Click a slice to emit @slice-click.</template>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-6 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-chart-pie"></i> Pie Chart</h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="pie"
              :data="donutData"
              label="channel"
              value="revenue"
              title="Revenue mix (pie)"
              :inner-radius-ratio="0"
              :height="280"
              @slice-click="onSliceClick"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- Data Accuracy & Advanced Features                                    -->
    <!-- ===================================================================== -->
    <h3 class="vd-mb-2" style="color: var(--vd-color-primary)">
      <i class="ph ph-sparkle" aria-hidden="true"></i> Data Accuracy & Advanced
      Features
    </h3>
    <p class="vd-text-muted vd-mb-6">
      Handles mixed positive and negative values from zero baseline,
      multi-series grouped bars with legends, reference line annotations, and 2D
      scatter plots.
    </p>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12 vd-col-lg-4 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-trend-up"></i> Profit & Loss (Negative Y-values)
            </h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="bar"
              :data="profitLossData"
              x="quarter"
              y="profit"
              title="Net Profit / Loss ($k)"
              :height="280"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-4 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-chart-bar"></i> Multi-Series Grouped Bar</h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="bar"
              :data="seriesData"
              x="month"
              :series="series"
              legend
              title="Product vs service revenue"
              :height="280"
            />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-4 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-target"></i> Annotations & Pinned Range</h6>
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
              title="MRR vs Target"
              :height="280"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-8">
      <div class="vd-col-12 vd-col-lg-6 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-dots-nine"></i> Scatter Plot (2D Coordinates)
            </h6>
          </div>
          <div class="vd-card-body">
            <VdChart
              type="scatter"
              :data="scatterData"
              x="x"
              y="y"
              title="Scatter correlation"
              :height="260"
              @point-click="onPointClick"
            />
            <div class="chart-status-bar vd-mt-2">
              <span class="status-chip">
                <i class="ph ph-crosshair"></i>
                <template v-if="lastPointClick"
                  >Point clicked:
                  <strong>{{ lastPointClick }}</strong></template
                >
                <template v-else
                  >Click a scatter point to inspect coordinates.</template
                >
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-6 vd-mb-4">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-funnel"></i> Data Labels & Stage Colors</h6>
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
              :height="260"
            />
            <div class="chart-status-bar vd-mt-2">
              <span class="status-chip">
                <i class="ph ph-tag"></i> Top conversion stages highlighted in
                green via per-row color callback.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card vd-mb-8">
      <div class="vd-card-header"><h6>Accessibility</h6></div>
      <div class="vd-card-body">
        <p>
          Give the chart a title and a description of the takeaway. Marks expose
          value labels; the generated table exposes the data through standard
          table navigation. Test your labels, colors, and interactions with your
          users’ assistive technology.
        </p>
        <p>
          Graphics roles and a data table are features, not a claim of WCAG
          conformance for the finished page.
        </p>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- Code Snippets & API Reference                                         -->
    <!-- ===================================================================== -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-list-dashes"
            style="color: var(--vd-color-primary)"
          ></i>
          API & Keyboard Reference
        </h6>
      </div>
      <div class="vd-card-body">
        <h4>Installation</h4>
        <DocCodeSnippet :shell="installShell" class="vd-mb-6" />

        <h4>Accessible Chart Usage</h4>
        <DocCodeSnippet
          :html="a11yUsage"
          :default-open="true"
          class="vd-mb-6"
        />

        <h4>Advanced Features Usage</h4>
        <DocCodeSnippet
          :html="advancedUsage"
          :default-open="false"
          class="vd-mb-6"
        />

        <h4 class="vd-mt-6">Keyboard Navigation Shortcuts</h4>
        <div class="vd-table-responsive vd-mb-6">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 280px">Key</th>
                <th>Behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in keyboardShortcuts" :key="row[0]">
                <td>
                  <kbd>{{ row[0] }}</kbd>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Chart Types</h4>
        <div class="vd-table-responsive vd-mb-6">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 200px">Type</th>
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

        <h4 class="vd-mt-6">Component API (Props & Events)</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 240px">Prop / Event</th>
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
      </div>
    </div>
  </section>
</template>

<style scoped>
.charts-page-title {
  margin-bottom: 0;
}

.a11y-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: color-mix(
    in srgb,
    var(--vd-color-primary, #5c7cfa) 12%,
    transparent
  );
  color: var(--vd-color-primary, #5c7cfa);
  border: 1px solid
    color-mix(in srgb, var(--vd-color-primary, #5c7cfa) 28%, transparent);
}

.vd-badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.a11y-instructions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: color-mix(
    in srgb,
    var(--vd-bg-secondary, #f8f9fa) 80%,
    transparent
  );
  border: 1px solid var(--vd-border-color, #dee2e6);
  font-size: 0.8125rem;
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vd-text-primary, #1a1d20);
}

.instruction-item i {
  color: var(--vd-color-primary, #5c7cfa);
  font-size: 1.1rem;
}

.chart-status-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: var(--vd-text-muted, #64748b);
  padding: 0.25rem 0.6rem;
  border-radius: 0.375rem;
  background: color-mix(
    in srgb,
    var(--vd-bg-secondary, #f8f9fa) 60%,
    transparent
  );
}

.status-chip.is-active {
  color: var(--vd-color-primary, #5c7cfa);
  font-weight: 600;
}

.a11y-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.a11y-card {
  padding: 0.85rem;
  border-radius: 0.5rem;
  border: 1px solid var(--vd-border-color, #dee2e6);
  background: color-mix(
    in srgb,
    var(--vd-bg-secondary, #f8f9fa) 50%,
    transparent
  );
}

.a11y-card code {
  display: inline-block;
  font-size: 0.8125rem;
  color: var(--vd-color-primary, #5c7cfa);
  margin-bottom: 0.4rem;
  font-weight: 600;
}

.a11y-card p {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--vd-text-muted, #64748b);
}

kbd {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  font-size: 0.75rem;
  font-family: inherit;
  line-height: 1;
  color: var(--vd-text-primary, #1a1d20);
  background: color-mix(
    in srgb,
    var(--vd-bg-primary, #ffffff) 90%,
    var(--vd-border-color, #dee2e6)
  );
  border: 1px solid var(--vd-border-color, #dee2e6);
  border-bottom-width: 2px;
  border-radius: 0.25rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] kbd {
  background: color-mix(
    in srgb,
    var(--vd-bg-secondary, #25282c) 90%,
    var(--vd-border-color, #495057)
  );
}
</style>
