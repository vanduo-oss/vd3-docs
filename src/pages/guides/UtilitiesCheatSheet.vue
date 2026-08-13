<script setup lang="ts">
import { RouterLink } from "vue-router";

const spacing: [string, string][] = [
  [
    "vd-p-0 … vd-p-24",
    "Padding on all sides. Steps map to --vd-spacing-* (Fibonacci px: 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144).",
  ],
  [
    "vd-m-0 … vd-m-24",
    "Margin on all sides, same --vd-spacing-* scale as padding.",
  ],
  [
    "vd-m-auto",
    "Margin: auto (centre a block horizontally when it has a width).",
  ],
  [
    "vd-mt-2 … vd-mt-8",
    "Top margin (vd- prefix). Unprefixed mt-* / mb-* / ml-* / mr-* aliases also exist.",
  ],
  ["vd-mb-0 … vd-mb-8", "Bottom margin (vd- prefix)."],
  ["vd-ml-5", "Left margin (vd- prefix; directional set is a subset)."],
  ["vd-mr-3", "Right margin (vd- prefix; directional set is a subset)."],
  ["vd-gap-0 … vd-gap-12", "Flex/grid gap on the same --vd-spacing-* scale."],
  [
    "vd-gap-fib-2 … vd-gap-fib-21",
    "Flex/grid gap on the Fibonacci token scale (--vd-gap-fib-*).",
  ],
];

const typography: [string, string][] = [
  ["vd-text-xs", "Font size --vd-font-size-xs (0.625rem)."],
  ["vd-text-sm", "Font size --vd-font-size-sm (0.8125rem)."],
  ["vd-text-base", "Font size --vd-font-size-base (1rem)."],
  ["vd-text-lg", "Font size --vd-font-size-lg (fluid)."],
  ["vd-text-xl … vd-text-6xl", "Larger fluid type steps."],
  ["vd-text-left", "text-align: left"],
  ["vd-text-center", "text-align: center"],
  ["vd-text-right", "text-align: right"],
  ["vd-text-muted", "Muted body color (--vd-text-muted)."],
  [
    "vd-text-primary",
    "Brand/accent color (--vd-color-primary), not the body-text token.",
  ],
  ["vd-font-light", "Font weight 300"],
  ["vd-font-normal", "Font weight 400 (also resets font-style)."],
  ["vd-font-medium", "Font weight 500"],
  ["vd-font-semibold", "Font weight 600"],
  ["vd-font-bold", "Font weight 700"],
  ["vd-font-extrabold", "Font weight 800"],
];

const layout: [string, string][] = [
  ["vd-container", "Fixed max-width container that steps at each breakpoint."],
  [
    "vd-container-responsive",
    "Fluid width with responsive gutters (used across these docs).",
  ],
  ["vd-container-fluid", "Full viewport width, edge to edge."],
  ["vd-row", "12-column grid row."],
  [
    "vd-col-12",
    "Full-width column (pair with vd-col-md-* etc. for breakpoints).",
  ],
  ["vd-col-sm-*", "Column span from the sm breakpoint (≥ 576px)."],
  ["vd-col-md-*", "Column span from the md breakpoint (≥ 768px)."],
  ["vd-col-lg-*", "Column span from the lg breakpoint (≥ 992px)."],
  ["vd-col-xl-*", "Column span from the xl breakpoint (≥ 1200px)."],
  ["vd-col-2xl-*", "Column span from the 2xl breakpoint (≥ 1400px)."],
  ["vd-d-none", "display: none"],
  ["vd-d-block", "display: block"],
  ["vd-d-flex", "display: flex"],
  ["vd-d-grid", "display: grid"],
  ["justify-start", "justify-content: flex-start (no vd- prefix)."],
  ["justify-center", "justify-content: center"],
  ["justify-between", "justify-content: space-between"],
  ["items-center", "align-items: center (no vd- prefix)."],
  ["items-start", "align-items: flex-start"],
];

const color: [string, string][] = [
  [
    "vd-bg-primary",
    "Brand fill (--vd-color-primary), not the page-surface token --vd-bg-primary.",
  ],
  ["vd-bg-secondary", "Secondary brand fill (--vd-color-secondary)."],
  ["vd-bg-light", "Light surface (--vd-bg-secondary)."],
  ["vd-bg-dark", "Dark surface (--vd-bg-dark)."],
  ["vd-text-success", "Semantic success color"],
  ["vd-text-warning", "Semantic warning color"],
  ["vd-text-error", "Semantic error color (there is no vd-text-danger)."],
  ["vd-text-info", "Semantic info color"],
  ["vd-border", "1px solid --vd-border-color"],
  ["vd-rounded-none", "border-radius: 0"],
  ["vd-rounded-sm", "Radius --vd-radius-fib-2"],
  ["vd-rounded", "Radius --vd-radius-fib-3"],
  ["vd-rounded-md", "Radius --vd-radius-fib-5"],
  ["vd-rounded-lg", "Radius --vd-radius-fib-8"],
  ["vd-rounded-xl", "Radius --vd-radius-fib-13"],
  ["vd-rounded-2xl", "Radius --vd-radius-fib-21"],
  ["vd-rounded-full", "Pill / circle (9999px)"],
  ["vd-shadow-sm", "Small elevation"],
  ["vd-shadow-md", "Medium elevation"],
  ["vd-shadow-lg", "Large elevation"],
  ["vd-glow", "Primary glow"],
  ["vd-glow-sm", "Small glow"],
  ["vd-glow-md", "Medium glow"],
  ["vd-glow-lg", "Large glow"],
];

const sections: [string, [string, string][]][] = [
  ["Spacing", spacing],
  ["Typography", typography],
  ["Layout & display", layout],
  ["Color, border & elevation", color],
];
</script>

<template>
  <section id="utilities-cheat-sheet">
    <h5 class="demo-title">
      <i class="ph ph-list-magnifying-glass"></i>Utilities cheat sheet
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      A quick reference to vd3 utility classes from
      <code>helpers.css</code>, <code>typography.css</code>,
      <code>colors.css</code>, and <code>shadow.css</code>. These are pure CSS
      and work the same in static HTML and Vue templates. Spacing, gaps, and
      radii follow the
      <RouterLink to="/guides/fibonacci">Fibonacci scale</RouterLink>.
    </p>

    <div v-for="[title, rows] in sections" :key="title" class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>{{ title }}</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Effect</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in rows" :key="row[0]">
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
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-info"></i> Tip</h6>
      </div>
      <div class="vd-card-body">
        <p>
          Reach for utilities for one-off spacing and alignment; reach for
          component classes (<code>vd-card</code>, <code>vd-btn</code>) for
          recurring patterns. Native <code>h1</code>–<code>h6</code> already
          pick up the type scale from the stylesheet — there are no
          <code>vd-h1</code> classes. For the color ramps behind these
          utilities, see
          <RouterLink to="/core/color-palette">the color palette</RouterLink>.
        </p>
      </div>
    </div>
  </section>
</template>
