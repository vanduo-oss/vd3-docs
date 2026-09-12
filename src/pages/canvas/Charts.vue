<script setup lang="ts">
import { ref } from "vue";
import { VdSwitch } from "@vanduo-oss/vd3";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdChart, type ClickEvent } from "@vanduo-oss/vd3-cbun/charts";

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
const showDataTable = ref(false);
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

const installShell = `pnpm add @vanduo-oss/vd3-cbun`;

const a11yUsage = `<!-- WAI-ARIA Graphics, keyboard navigation, and data table fallback -->
<script setup lang="ts">
import { ref } from 'vue';
import { VdChart, type ClickEvent } from '@vanduo-oss/vd3-cbun/charts';

const data = [
  { quarter: 'Q1', revenue: 145 },
  { quarter: 'Q2', revenue: 210 },
  { quarter: 'Q3', revenue: 185 },
  { quarter: 'Q4', revenue: 290 },
];

const showTable = ref(false);
const onClick = (e: ClickEvent) => console.log('Clicked:', e.datum);
<\/script>

<template>
  <VdChart
    type="bar"
    :data="data"
    x="quarter"
    y="revenue"
    title="Quarterly Revenue"
    :data-table="showTable ? 'visible' : true"
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
  ['type="pie"', "Full pie polar renderer with inner-radius ratio 0."],
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
    "title / description",
    "Rendered into SVG accessibility metadata (<title> and <desc> tags).",
  ],
  [
    ":data-table",
    "true (sr-only, default) | 'visible' | false. Auto-generates an accessible HTML <table> fulfilling WCAG 1.1.1 Level A.",
  ],
  [
    ":aria-role-description",
    "Custom ARIA role description override for the SVG shell (defaults to `${type} chart`).",
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
    <div class="vd-d-flex vd-justify-between vd-align-center vd-mb-2">
      <h5 class="demo-title" style="margin: 0">
        <i class="ph ph-chart-donut"></i>Charts
      </h5>
      <div class="vd-badge-group">
        <span class="a11y-pill"
          ><i class="ph ph-shield-check"></i> WAI-ARIA Graphics 1.0</span
        >
        <span class="a11y-pill"
          ><i class="ph ph-keyboard"></i> Arrow Key Navigation</span
        >
        <span class="a11y-pill"
          ><i class="ph ph-table"></i> WCAG 1.1.1 Table</span
        >
      </div>
    </div>

    <p class="vd-mb-6">
      <strong>vd3 Charts</strong> is the SVG-first data visualization widget
      from <code>@vanduo-oss/vd3-cbun</code>
      (<code>@vanduo-oss/vd3-cbun/charts</code>). It features full
      <strong>WAI-ARIA Graphics Module 1.0</strong> semantics, roving
      <strong>keyboard arrow navigation</strong> with live focus rings, an
      auto-generated <strong>accessible HTML data table fallback</strong> (WCAG
      1.1.1), and native dark/light theme integration.
    </p>

    <!-- ===================================================================== -->
    <!-- Feature Showcase: Accessibility & Keyboard Navigation                -->
    <!-- ===================================================================== -->
    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div
            class="vd-card-header vd-d-flex vd-justify-between vd-align-center"
          >
            <h6>
              <i
                class="ph ph-keyboard"
                style="color: var(--vd-color-primary)"
              ></i>
              Accessibility & Keyboard Navigation (WCAG 2.1 AA & WAI-ARIA
              Graphics 1.0)
            </h6>
            <div class="vd-d-flex vd-align-center vd-gap-3">
              <VdSwitch
                v-model="showDataTable"
                label="Inspect Data Table (WCAG 1.1.1)"
              />
            </div>
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

            <VdChart
              type="bar"
              :data="quarterlyRevenue"
              x="quarter"
              y="revenue"
              title="Quarterly Revenue ($k)"
              :data-table="showDataTable ? 'visible' : true"
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
              <span v-if="showDataTable" class="status-chip is-active">
                <i class="ph ph-table"></i> Data table rendered visibly below
                chart (default is sr-only).
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

    <!-- ===================================================================== -->
    <!-- WAI-ARIA Graphics & WCAG Explainer                                   -->
    <!-- ===================================================================== -->
    <div class="vd-card vd-card-glow demo-card vd-mb-8">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-shield-check"
            style="color: var(--vd-color-primary)"
          ></i>
          WAI-ARIA Graphics Module 1.0 Architecture
        </h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-4">
          Most web chart libraries apply <code>role="img"</code> to the entire
          SVG, which instructs screen readers to treat the chart as a static
          flattened image and ignore all internal data marks.
          <strong>vd3 Charts</strong> implements the official W3C
          <strong>WAI-ARIA Graphics Module 1.0</strong> specification:
        </p>

        <div class="a11y-grid vd-mb-4">
          <div class="a11y-card">
            <code>role="graphics-document document"</code>
            <p>
              Applied to the root <code>&lt;svg&gt;</code> with
              <code>aria-roledescription="[type] chart"</code> so screen readers
              recognize it as a structured graphical document containing
              interactive objects.
            </p>
          </div>
          <div class="a11y-card">
            <code>role="graphics-object"</code>
            <p>
              Applied to mark containers, series groups, and annotations with
              contextual <code>aria-roledescription</code> (e.g.
              <code>"data points"</code>, <code>"grouped bars"</code>).
            </p>
          </div>
          <div class="a11y-card">
            <code>role="graphics-symbol"</code>
            <p>
              Applied to individual marks (bars, points, slices) with
              descriptive <code>aria-roledescription</code> and accessible value
              labels (e.g. <code>"Jan: $120k"</code>).
            </p>
          </div>
          <div class="a11y-card">
            <code>aria-hidden="true"</code>
            <p>
              Applied to decorative Cartesian axes, tick marks, and background
              grid lines to prevent screen reader clutter.
            </p>
          </div>
        </div>

        <p class="vd-text-sm vd-text-muted">
          <i class="ph ph-info"></i> In addition to SVG graphics roles, every
          chart generates a semantic HTML <code>&lt;table&gt;</code> (with
          <code>&lt;caption&gt;</code>, <code>&lt;th scope="col"&gt;</code>, and
          <code>&lt;th scope="row"&gt;</code>) matching
          <strong>WCAG 1.1.1 Technique G73/G74</strong>. Assistive technology
          users can navigate the full dataset with native table reading
          shortcuts.
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
