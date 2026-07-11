<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

// The sequence, each value tinted with a status colour so the pattern reads at a
// glance (ported from the old docs' "what is Fibonacci" panel).
const sequence: { n: number; tone: string }[] = [
  { n: 1, tone: "muted" },
  { n: 1, tone: "muted" },
  { n: 2, tone: "info" },
  { n: 3, tone: "success" },
  { n: 5, tone: "primary" },
  { n: 8, tone: "warning" },
  { n: 13, tone: "error" },
  { n: 21, tone: "muted" },
  { n: 34, tone: "muted" },
];
const toneColor = (tone: string): string =>
  tone === "muted" ? "var(--vd-text-muted)" : `var(--vd-color-${tone})`;

// Proportional spacing bars (Fibonacci px steps), 1 → 144.
const fibBars = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

// Fibonacci layout-class reference.
const layouts: { cls: string; cols: string; ratio: string; use: string }[] = [
  {
    cls: "vd-row-fib-3",
    cols: "fib-2 + fib-3 + fib-5",
    ratio: "2 : 3 : 5  (20 / 30 / 50%)",
    use: "Sidebar + secondary + main",
  },
  {
    cls: "vd-row-fib-3-alt",
    cols: "fib-3 + fib-5 + fib-8",
    ratio: "3 : 5 : 8  (~19 / 31 / 50%)",
    use: "More dramatic hierarchy",
  },
  {
    cls: "vd-row-fib-4",
    cols: "fib-1 + fib-2 + fib-3 + fib-5",
    ratio: "1 : 2 : 3 : 5  (~9 / 18 / 27 / 45%)",
    use: "Four columns with strong visual flow",
  },
];

const scale: [string, string][] = [
  ["1, 2, 3", "Fine adjustments — borders, tight gaps"],
  ["5, 8", "Component padding, gaps between elements"],
  ["13, 21", "Section spacing, card padding"],
  ["34, 55, 89", "Page rhythm, hero spacing"],
];

const spacingHtml = `<!-- Fibonacci spacing utilities (rem-based) -->
<div class="vd-p-fib-5">  <!-- padding -->
  <h2 class="vd-mb-fib-3">Title</h2>
  <p class="vd-mb-fib-2">Body copy with harmonious rhythm.</p>
</div>`;

const varCss = `:root {
  /* The scale every spacing/size token derives from */
  --vd-space-fib-1: 0.125rem;
  --vd-space-fib-2: 0.25rem;
  --vd-space-fib-3: 0.5rem;
  --vd-space-fib-5: 1rem;
  --vd-space-fib-8: 2rem;
  --vd-space-fib-13: 4rem;
}`;

const fib4Html = `<!-- 4-column Fibonacci (1:2:3:5) -->
<div class="vd-row-fib-4">
  <div>Narrow (1)</div>
  <div>Small (2)</div>
  <div>Medium (3)</div>
  <div>Wide (5)</div>
</div>`;

const fib3Html = `<!-- 3-column Fibonacci (3:5:8) -->
<div class="vd-row-fib-3-alt">
  <div>Sidebar (3)</div>
  <div>Secondary (5)</div>
  <div>Main content (8)</div>
</div>`;

const relatedComponents = [
  {
    to: "/core/golden-ratio",
    icon: "ph-shapes",
    title: "Golden ratio",
    desc: "The φ scale the type and layout rhythm is built on.",
    badge: "Core",
  },
  {
    to: "/core/grid-system",
    icon: "ph-grid-four",
    title: "Grid system",
    desc: "12-column grid with Fibonacci-tuned gutters.",
    badge: "Core",
  },
  {
    to: "/core/shadows-glow",
    icon: "ph-square",
    title: "Shadows & glow",
    desc: "Elevation steps that follow the same proportional scale.",
    badge: "Core",
  },
  {
    to: "/core/typography",
    icon: "ph-text-aa",
    title: "Typography",
    desc: "A modular type scale derived from the sequence.",
    badge: "Core",
  },
];
</script>

<template>
  <section id="fibonacci">
    <h5 class="demo-title">
      <i class="ph ph-spiral"></i>The Fibonacci Scale
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Vanduo's spacing, type, and radius scales follow the Fibonacci sequence
      (1, 2, 3, 5, 8, 13, 21…) instead of a linear 4/8px grid. Because each step
      is the sum of the two before it, sizes relate to one another the way they
      do in nature — rhythm that feels balanced without manual tuning. It's a
      design philosophy, so it is identical across both engines.
    </p>

    <!-- What is the sequence -->
    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6>
          <i class="ph ph-math-operations"></i> What is the Fibonacci sequence?
        </h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-4">Each number is the sum of the two before it:</p>
        <div class="fib-sequence vd-mb-4">
          <template v-for="(item, i) in sequence" :key="i">
            <span :style="{ color: toneColor(item.tone) }">{{ item.n }}</span>
            <span class="fib-sequence-dot" aria-hidden="true">·</span>
          </template>
          <span class="fib-sequence-dot" aria-hidden="true">…</span>
        </div>
        <p class="vd-mb-0">
          As the numbers grow, the ratio between neighbours approaches
          <strong>≈ 1.618</strong> — the <strong>golden ratio (φ)</strong>, the
          same proportion found in shells, sunflowers, and classical
          architecture. Our eyes read those proportions as balanced, which is
          why a φ-tuned scale feels right without fiddling.
        </p>
      </div>
    </div>

    <!-- Before / after -->
    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6>
          <i class="ph ph-swap"></i> Before / after: equal vs Fibonacci columns
        </h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-row">
          <div class="vd-col-12 vd-col-md-6 vd-mb-4">
            <p class="vd-text-sm vd-text-muted vd-mb-2">
              Standard — equal columns
            </p>
            <div style="display: flex; gap: 4px">
              <div class="fib-block fib-block-flat" style="flex: 1">33%</div>
              <div class="fib-block fib-block-flat" style="flex: 1">33%</div>
              <div class="fib-block fib-block-flat" style="flex: 1">33%</div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Balanced, but uniform — every section gets the same emphasis.
            </p>
          </div>
          <div class="vd-col-12 vd-col-md-6 vd-mb-4">
            <p class="vd-text-sm vd-text-muted vd-mb-2">
              Fibonacci — 3 : 5 : 8
            </p>
            <div style="display: flex; gap: 4px">
              <div
                class="fib-block"
                style="
                  flex: 3;
                  background: var(--vd-color-success);
                  opacity: 0.8;
                "
              >
                3fr
              </div>
              <div
                class="fib-block"
                style="flex: 5; background: var(--vd-color-success)"
              >
                5fr
              </div>
              <div
                class="fib-block"
                style="
                  flex: 8;
                  background: var(--vd-color-success);
                  opacity: 0.62;
                "
              >
                8fr
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              ~19% + ~31% + ~50%. Natural hierarchy — the eye flows from small
              to large.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Visual spacing scale + utilities/tokens -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6 vd-mb-4">
        <div class="vd-card demo-card fib-fill">
          <div class="vd-card-header">
            <h6><i class="ph ph-ruler"></i> The spacing scale, to scale</h6>
          </div>
          <div class="vd-card-body">
            <div class="fib-bars">
              <div v-for="n in fibBars" :key="n" class="fib-bar-row">
                <code class="vd-text-sm fib-bar-label">{{ n }}px</code>
                <div class="fib-bar" :style="{ width: `${n}px` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6 vd-mb-4">
        <div class="vd-card demo-card fib-fill">
          <div class="vd-card-header">
            <h6><i class="ph ph-brackets-curly"></i> Utilities &amp; tokens</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="spacingHtml" :default-open="true" />
            <DocCodeSnippet
              class="vd-mt-4"
              :css="varCss"
              :default-open="true"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Layout classes -->
    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-grid-four"></i> Fibonacci layout classes</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-4">
          Swap a single row class to get golden proportions — no custom CSS:
        </p>

        <p class="vd-text-sm vd-text-muted vd-mb-2">4-column (1 : 2 : 3 : 5)</p>
        <div class="vd-row-fib-4 fib-demo-row vd-mb-3">
          <div class="fib-block" style="background: var(--vd-color-error)">
            1
          </div>
          <div class="fib-block" style="background: var(--vd-color-warning)">
            2
          </div>
          <div class="fib-block" style="background: var(--vd-color-info)">
            3
          </div>
          <div class="fib-block" style="background: var(--vd-color-primary)">
            5
          </div>
        </div>
        <DocCodeSnippet :html="fib4Html" class="vd-mb-6" />

        <p class="vd-text-sm vd-text-muted vd-mb-2">3-column (3 : 5 : 8)</p>
        <div class="vd-row-fib-3-alt fib-demo-row vd-mb-3">
          <div class="fib-block" style="background: var(--vd-color-success)">
            3
          </div>
          <div class="fib-block" style="background: var(--vd-color-primary)">
            5
          </div>
          <div class="fib-block" style="background: var(--vd-color-info)">
            8
          </div>
        </div>
        <DocCodeSnippet :html="fib3Html" class="vd-mb-6" />

        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped vd-text-sm">
            <thead>
              <tr>
                <th>Class</th>
                <th>Columns</th>
                <th>Ratio</th>
                <th>Use case</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in layouts" :key="row.cls">
                <td>
                  <code>{{ row.cls }}</code>
                </td>
                <td>
                  <code>{{ row.cols }}</code>
                </td>
                <td>{{ row.ratio }}</td>
                <td>{{ row.use }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Reach-for table + why not linear -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6 vd-mb-4">
        <div class="vd-card demo-card fib-fill">
          <div class="vd-card-header">
            <h6><i class="ph ph-stack"></i> How to reach for each step</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Steps</th>
                    <th>Typical use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in scale" :key="row[0]">
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
      <div class="vd-col-12 vd-col-md-6 vd-mb-4">
        <div class="vd-card demo-card fib-fill">
          <div class="vd-card-header">
            <h6><i class="ph ph-info"></i> Why not a linear scale?</h6>
          </div>
          <div class="vd-card-body">
            <p>
              A linear 4/8/12/16 scale gives every step the same visual jump,
              which flattens hierarchy. A Fibonacci scale grows proportionally,
              so small and large spaces stay distinct and the eye reads
              structure faster.
            </p>
            <p class="vd-mb-0">
              Want the proportions in layout form? The
              <RouterLink to="/core/golden-ratio">Golden ratio</RouterLink>
              page has an interactive φ slider and grid demos.
            </p>
          </div>
        </div>
      </div>
    </div>

    <GuideLinkCards
      class="vd-mt-6"
      icon="ph-spiral"
      title="See the scale in practice"
      :links="relatedComponents"
    />
  </section>
</template>

<style scoped>
.fib-fill {
  height: 100%;
}

/* Colored sequence */
.fib-sequence {
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.06em;
  line-height: 1.5;
}

.fib-sequence-dot {
  color: var(--vd-text-muted);
  opacity: 0.45;
  margin: 0 0.12em;
}

/* Demo blocks (before/after + layout classes) */
.fib-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 72px;
  padding: 0.75rem;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: var(--vd-radius-fib-3, 0.5rem);
}

.fib-block-flat {
  background: var(--vd-color-primary);
  opacity: 0.7;
}

.fib-demo-row {
  gap: 4px;
}

/* Proportional spacing bars */
.fib-bars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fib-bar-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.fib-bar-label {
  min-width: 3.5ch;
  text-align: right;
  color: var(--vd-text-secondary);
}

.fib-bar {
  height: 13px;
  max-width: 100%;
  background: var(--vd-color-primary);
  border-radius: 3px;
}
</style>
