<script setup lang="ts">
const spacing: [string, string][] = [
  [
    "vd-p-fib-{1..13} / vd-m-fib-{1..13}",
    "Fibonacci padding / margin (all sides)",
  ],
  [
    "vd-pt / vd-pr / vd-pb / vd-pl-*",
    "Padding per side (top/right/bottom/left)",
  ],
  ["vd-mt / vd-mr / vd-mb / vd-ml-*", "Margin per side"],
  ["vd-mx-auto", "Centre horizontally with auto side margins"],
  [
    "vd-pad-xs … vd-pad-3xl",
    "Named padding steps (3 / 5 / 8 / 13 / 21 / 34 / 55 px)",
  ],
];

const typography: [string, string][] = [
  ["vd-text-xs … vd-text-xl", "Font size (0.75 → 1.3125rem)"],
  ["vd-h1 … vd-h6", "Heading type scale"],
  ["vd-lead", "Larger lead paragraph"],
  ["vd-text-center / -left / -right", "Text alignment"],
  ["vd-text-muted / vd-text-primary", "Text colour (semantic)"],
  ["vd-fw-bold / vd-fw-medium", "Font weight"],
];

const layout: [string, string][] = [
  ["vd-container / -responsive / -fluid", "Page containers"],
  ["vd-row / vd-col-{12}", "12-column grid"],
  ["vd-col-{sm,md,lg,xl,2xl}-*", "Responsive column spans"],
  ["vd-d-flex / vd-d-block / vd-d-none", "Display"],
  ["vd-justify-* / vd-align-*", "Flex alignment"],
  ["vd-gap-fib-*", "Flex/grid gap on the Fibonacci scale"],
];

const color: [string, string][] = [
  ["vd-bg-primary / -secondary", "Surface backgrounds"],
  ["vd-text-{success,warning,danger,info}", "Semantic text colours"],
  ["vd-border / vd-border-color", "Borders"],
  ["vd-rounded / vd-rounded-fib-*", "Corner radius"],
  ["vd-shadow-fib-* / vd-glow-*", "Elevation & glow"],
];

const sections: [string, [string, string][]][] = [
  ["Spacing", spacing],
  ["Typography", typography],
  ["Layout & display", layout],
  ["Colour, border & elevation", color],
];
</script>

<template>
  <section id="utilities-cheat-sheet">
    <h5 class="demo-title">
      <i class="ph ph-list-magnifying-glass"></i>Utilities Cheat Sheet
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      A quick reference to Vanduo's utility classes. These are pure CSS and work
      the same in static HTML and vd2 templates. Spacing, gaps, and radii all
      follow the <a href="/guides/fibonacci">Fibonacci scale</a>.
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
          recurring patterns. For deeper colour reference, see
          <a href="/core/color-palette">the colour palette</a>.
        </p>
      </div>
    </div>
  </section>
</template>
