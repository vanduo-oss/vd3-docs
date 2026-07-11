<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

// Grid-mode toggle. The original docs ship a `data-grid-toggle` button + a
// `data-layout-mode` target, but nothing in the framework CSS/JS reacts to it
// (a no-op). We wire it and add scoped CSS so it actually applies the
// documented Fibonacci proportions.
const mode = ref<"standard" | "fibonacci">("standard");
const toggleMode = (): void => {
  mode.value = mode.value === "standard" ? "fibonacci" : "standard";
};

const breakpointHtml = `<!-- Responsive Grid with 6 Breakpoints -->
<div class="vd-row">
  <div class="vd-col-12 vd-col-sm-6 vd-col-md-4 vd-col-lg-3 vd-col-xl-2 vd-col-2xl-1">
    Column
  </div>
</div>`;

const containersHtml = `<!-- Responsive Containers -->
<div class="vd-container-sm">Fixed from 576px</div>
<div class="vd-container-md">Fixed from 768px</div>
<div class="vd-container-lg">Fixed from 992px</div>
<div class="vd-container-xl">Fixed from 1200px</div>
<div class="vd-container-2xl">Fixed from 1400px</div>`;

const breakpointCols = [
  "primary",
  "primary",
  "primary",
  "primary",
  "secondary",
  "secondary",
  "secondary",
  "secondary",
  "info",
  "info",
  "info",
  "info",
];

const containers = [
  {
    cls: "vd-container-sm",
    bg: "vd-bg-primary vd-text-white",
    desc: "fixed from 576px (540px, scales up)",
  },
  {
    cls: "vd-container-md",
    bg: "vd-bg-secondary",
    desc: "fixed from 768px (720px, scales up)",
  },
  {
    cls: "vd-container-lg",
    bg: "vd-bg-info vd-text-white",
    desc: "fixed from 992px (960px, scales up)",
  },
  {
    cls: "vd-container-xl",
    bg: "vd-bg-success vd-text-white",
    desc: "fixed from 1200px (1140px, scales up)",
  },
  {
    cls: "vd-container-2xl",
    bg: "vd-bg-warning",
    desc: "fixed from 1400px (1320px)",
  },
];
</script>

<template>
  <section id="grid-system">
    <h5 class="demo-title"><i class="ph ph-grid-four"></i>Grid System</h5>
    <p class="vd-mb-8">
      A comprehensive 12-column flexbox grid with Fibonacci/Golden Ratio
      proportional layouts, responsive containers, order utilities, and an
      interactive toggle between standard and Fibonacci modes.
    </p>

    <!-- Standard vs Fibonacci -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>Standard vs Fibonacci — when to choose</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-5">
              Both share the same 12-column flexbox engine — reach for whichever
              fits the content. You can flip the live toggle in the demos below
              to feel the difference.
            </p>
            <div class="vd-row">
              <div class="vd-col-12 vd-col-md-6 vd-mb-4">
                <div
                  class="vd-box"
                  data-pad="fib-13"
                  data-bg="secondary"
                  data-round="md"
                  style="height: 100%"
                >
                  <p class="vd-mb-2">
                    <strong
                      ><i class="ph ph-grid-four"></i> Standard
                      12-column</strong
                    >
                  </p>
                  <ul class="vd-mb-0 vd-text-sm">
                    <li>Forms, dashboards, and data tables</li>
                    <li>
                      Equal or simple fractions (halves, thirds, quarters)
                    </li>
                    <li>Familiar, predictable responsive control</li>
                  </ul>
                </div>
              </div>
              <div class="vd-col-12 vd-col-md-6 vd-mb-4">
                <div
                  class="vd-box"
                  data-pad="fib-13"
                  data-bg="secondary"
                  data-round="md"
                  style="height: 100%"
                >
                  <p class="vd-mb-2">
                    <strong
                      ><i class="ph ph-spiral"></i> Golden / Fibonacci</strong
                    >
                  </p>
                  <ul class="vd-mb-0 vd-text-sm">
                    <li>Editorial, hero, and marketing layouts</li>
                    <li>Content + sidebar at a natural ≈1.618:1 split</li>
                    <li>Galleries and asymmetric, organic emphasis</li>
                  </ul>
                </div>
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              New to the proportion system? See
              <RouterLink to="/core/golden-ratio">Golden Ratio</RouterLink>
              and
              <RouterLink to="/guides/fibonacci"
                >Fibonacci vs Standard</RouterLink
              >.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 2XL Breakpoint -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>2XL Breakpoint (1400px)</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-5 vd-text-sm vd-text-muted">
              The grid now supports all 6 breakpoints: base, sm (576px), md
              (768px), lg (992px), xl (1200px), and 2xl (1400px).
            </p>
            <div class="vd-row">
              <div
                v-for="(bg, i) in breakpointCols"
                :key="i"
                class="vd-col-12 vd-col-sm-6 vd-col-md-4 vd-col-lg-3 vd-col-xl-2 vd-col-2xl-1"
              >
                <div
                  :class="`vd-bg-${bg} ${bg !== 'secondary' ? 'vd-text-white' : ''} vd-p-3 vd-mb-3 vd-rounded-md vd-text-center vd-text-sm`"
                >
                  2xl-1
                </div>
              </div>
            </div>
            <DocCodeSnippet class="vd-mt-5" :html="breakpointHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Responsive Containers -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>Responsive Containers</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-5 vd-text-sm vd-text-muted">
              Responsive containers are fluid below their breakpoint and
              fixed-width above. They scale up at each subsequent breakpoint.
            </p>
            <div class="vd-d-flex vd-flex-col vd-gap-5">
              <div
                v-for="c in containers"
                :key="c.cls"
                :class="`${c.cls} ${c.bg} vd-p-5 vd-rounded-md vd-text-center`"
              >
                <code>.{{ c.cls }}</code> — {{ c.desc }}
              </div>
            </div>
            <DocCodeSnippet class="vd-mt-5" :html="containersHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Order Utilities -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>Order Utilities</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-5 vd-text-sm vd-text-muted">
              Reorder columns visually without changing HTML source order.
              Responsive variants available at all breakpoints.
            </p>
            <div class="vd-row">
              <div class="vd-col-4 vd-order-3">
                <div
                  class="vd-bg-primary vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-mb-3"
                >
                  <strong>1st in HTML</strong><br /><code>.vd-order-3</code>
                </div>
              </div>
              <div class="vd-col-4 vd-order-1">
                <div
                  class="vd-bg-success vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-mb-3"
                >
                  <strong>2nd in HTML</strong><br /><code>.vd-order-1</code>
                </div>
              </div>
              <div class="vd-col-4 vd-order-2">
                <div
                  class="vd-bg-info vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-mb-3"
                >
                  <strong>3rd in HTML</strong><br /><code>.vd-order-2</code>
                </div>
              </div>
            </div>
            <div class="vd-row vd-mt-5">
              <div class="vd-col-6 vd-order-last">
                <div
                  class="vd-bg-warning vd-p-5 vd-rounded-md vd-text-center vd-mb-3"
                >
                  <strong>1st in HTML</strong><br /><code>.vd-order-last</code>
                </div>
              </div>
              <div class="vd-col-6 vd-order-first">
                <div
                  class="vd-bg-secondary vd-p-5 vd-rounded-md vd-text-center vd-mb-3"
                >
                  <strong>2nd in HTML</strong><br /><code>.vd-order-first</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fibonacci flex layouts -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>Fibonacci 4-Column (1:2:3:5)</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-row-fib-4">
              <div class="vd-col-fib-1">
                <div
                  class="vd-bg-error vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
                >
                  1
                </div>
              </div>
              <div class="vd-col-fib-2">
                <div
                  class="vd-bg-info vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
                >
                  2
                </div>
              </div>
              <div class="vd-col-fib-3">
                <div
                  class="vd-bg-success vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
                >
                  3
                </div>
              </div>
              <div class="vd-col-fib-5">
                <div
                  class="vd-bg-primary vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
                >
                  5
                </div>
              </div>
            </div>
            <p class="vd-mt-3 vd-text-sm vd-text-muted">
              Ratio 1:2:3:5 (total 11 parts). Use
              <code>.vd-row-fib-4</code> with <code>.vd-col-fib-1</code>,
              <code>.vd-col-fib-2</code>, <code>.vd-col-fib-3</code>,
              <code>.vd-col-fib-5</code>.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>Fibonacci 3-Column (3:5:8)</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-row-fib-3-alt">
              <div class="vd-col-fib-3">
                <div
                  class="vd-bg-info vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
                >
                  3
                </div>
              </div>
              <div class="vd-col-fib-5">
                <div
                  class="vd-bg-success vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
                >
                  5
                </div>
              </div>
              <div class="vd-col-fib-8">
                <div
                  class="vd-bg-primary vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
                >
                  8
                </div>
              </div>
            </div>
            <p class="vd-mt-3 vd-text-sm vd-text-muted">
              Ratio 3:5:8 (total 16 parts). Use
              <code>.vd-row-fib-3-alt</code> with <code>.vd-col-fib-3</code>,
              <code>.vd-col-fib-5</code>, <code>.vd-col-fib-8</code>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CSS Grid Fibonacci variants -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>CSS Grid: 4-Column Fibonacci</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-grid-fib-4">
              <div
                class="vd-bg-error vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
              >
                1fr
              </div>
              <div
                class="vd-bg-info vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
              >
                2fr
              </div>
              <div
                class="vd-bg-success vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
              >
                3fr
              </div>
              <div
                class="vd-bg-primary vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
              >
                5fr
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>CSS Grid: 3:5:8 Fibonacci</h6></div>
          <div class="vd-card-body">
            <div class="vd-grid-fib-3-alt">
              <div
                class="vd-bg-info vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
              >
                3fr
              </div>
              <div
                class="vd-bg-success vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
              >
                5fr
              </div>
              <div
                class="vd-bg-primary vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
              >
                8fr
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fibonacci Gap Utilities -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>Fibonacci Gap Utilities</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-5 vd-text-sm vd-text-muted">
              Gap utilities using Fibonacci values. Works with CSS Grid and flex
              containers using the <code>gap</code> property.
            </p>
            <div class="vd-d-flex vd-flex-col vd-gap-5">
              <div>
                <code class="vd-text-sm">.vd-gap-fib-3</code> (3px)
                <div class="vd-grid-fib-3 vd-gap-fib-3 vd-mt-2">
                  <div
                    class="vd-bg-primary vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                  >
                    A
                  </div>
                  <div
                    class="vd-bg-primary vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                  >
                    B
                  </div>
                  <div
                    class="vd-bg-primary vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                  >
                    C
                  </div>
                </div>
              </div>
              <div>
                <code class="vd-text-sm">.vd-gap-fib-8</code> (8px)
                <div class="vd-grid-fib-3 vd-gap-fib-8 vd-mt-2">
                  <div
                    class="vd-bg-success vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                  >
                    A
                  </div>
                  <div
                    class="vd-bg-success vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                  >
                    B
                  </div>
                  <div
                    class="vd-bg-success vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                  >
                    C
                  </div>
                </div>
              </div>
              <div>
                <code class="vd-text-sm">.vd-gap-fib-21</code> (21px)
                <div class="vd-grid-fib-3 vd-gap-fib-21 vd-mt-2">
                  <div
                    class="vd-bg-info vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                  >
                    A
                  </div>
                  <div
                    class="vd-bg-info vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                  >
                    B
                  </div>
                  <div
                    class="vd-bg-info vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                  >
                    C
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid Mode Toggle -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>Grid Mode Toggle</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-5 vd-text-sm vd-text-muted">
              Toggle between standard 12-column flexbox and Fibonacci CSS Grid
              proportions. Uses <code>data-layout-mode</code> attribute with a
              <code>data-grid-toggle</code> button. The Fibonacci mode
              auto-detects column count and applies golden ratio (2 cols), 2:3:5
              (3 cols), or 1:2:3:5 (4 cols) proportions.
            </p>

            <button
              class="vd-btn vd-btn-primary vd-mb-5"
              data-grid-toggle="#grid-toggle-demo"
              @click="toggleMode"
            >
              Toggle Fibonacci / Standard
            </button>

            <div
              id="grid-toggle-demo"
              class="grid-toggle-demo"
              :data-layout-mode="mode"
            >
              <p class="vd-mb-3 vd-text-sm"><strong>3-column row:</strong></p>
              <div class="vd-row vd-mb-5 gt-row-3">
                <div class="vd-col-4">
                  <div
                    class="vd-bg-info vd-text-white vd-p-5 vd-rounded-md vd-text-center"
                  >
                    Col 1
                  </div>
                </div>
                <div class="vd-col-4">
                  <div
                    class="vd-bg-success vd-text-white vd-p-5 vd-rounded-md vd-text-center"
                  >
                    Col 2
                  </div>
                </div>
                <div class="vd-col-4">
                  <div
                    class="vd-bg-primary vd-text-white vd-p-5 vd-rounded-md vd-text-center"
                  >
                    Col 3
                  </div>
                </div>
              </div>

              <p class="vd-mb-3 vd-text-sm">
                <strong>2-column row (becomes golden ratio):</strong>
              </p>
              <div class="vd-row vd-mb-5 gt-row-2">
                <div class="vd-col-6">
                  <div
                    class="vd-bg-warning vd-p-5 vd-rounded-md vd-text-center"
                  >
                    Col 1
                  </div>
                </div>
                <div class="vd-col-6">
                  <div
                    class="vd-bg-secondary vd-p-5 vd-rounded-md vd-text-center"
                  >
                    Col 2
                  </div>
                </div>
              </div>

              <p class="vd-mb-3 vd-text-sm">
                <strong>4-column row (becomes 1:2:3:5):</strong>
              </p>
              <div class="vd-row gt-row-4">
                <div class="vd-col-3">
                  <div
                    class="vd-bg-error vd-text-white vd-p-5 vd-rounded-md vd-text-center"
                  >
                    1
                  </div>
                </div>
                <div class="vd-col-3">
                  <div
                    class="vd-bg-info vd-text-white vd-p-5 vd-rounded-md vd-text-center"
                  >
                    2
                  </div>
                </div>
                <div class="vd-col-3">
                  <div
                    class="vd-bg-success vd-text-white vd-p-5 vd-rounded-md vd-text-center"
                  >
                    3
                  </div>
                </div>
                <div class="vd-col-3">
                  <div
                    class="vd-bg-primary vd-text-white vd-p-5 vd-rounded-md vd-text-center"
                  >
                    5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Offsets -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>Offset Utilities</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-5 vd-text-sm vd-text-muted">
              Complete offset utilities from 0-11 at all breakpoints. Use
              <code>.vd-offset-0</code> to reset an offset at a specific
              breakpoint.
            </p>
            <div class="vd-row vd-mb-2">
              <div class="vd-col-4 vd-offset-0">
                <div
                  class="vd-bg-primary vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                >
                  .vd-offset-0 .vd-col-4
                </div>
              </div>
            </div>
            <div class="vd-row vd-mb-2">
              <div class="vd-col-4 vd-offset-2">
                <div
                  class="vd-bg-success vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                >
                  .vd-offset-2 .vd-col-4
                </div>
              </div>
            </div>
            <div class="vd-row vd-mb-2">
              <div class="vd-col-3 vd-offset-4">
                <div
                  class="vd-bg-info vd-text-white vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                >
                  .vd-offset-4 .vd-col-3
                </div>
              </div>
            </div>
            <div class="vd-row vd-mb-2">
              <div class="vd-col-2 vd-offset-8">
                <div
                  class="vd-bg-warning vd-p-3 vd-rounded-md vd-text-center vd-text-sm"
                >
                  .vd-offset-8 .vd-col-2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * Fibonacci grid-mode override. The original `data-grid-toggle` was a no-op
 * (no backing CSS); here it applies the documented proportions per row.
 */
.grid-toggle-demo[data-layout-mode="fibonacci"] .vd-row > [class*="vd-col-"] {
  transition:
    flex-basis 0.3s ease,
    max-width 0.3s ease;
}
/* 3-column → 2 : 3 : 5 (total 10) */
.grid-toggle-demo[data-layout-mode="fibonacci"] .gt-row-3 > :nth-child(1) {
  flex: 0 0 20%;
  max-width: 20%;
}
.grid-toggle-demo[data-layout-mode="fibonacci"] .gt-row-3 > :nth-child(2) {
  flex: 0 0 30%;
  max-width: 30%;
}
.grid-toggle-demo[data-layout-mode="fibonacci"] .gt-row-3 > :nth-child(3) {
  flex: 0 0 50%;
  max-width: 50%;
}
/* 2-column → golden 38.2 : 61.8 */
.grid-toggle-demo[data-layout-mode="fibonacci"] .gt-row-2 > :nth-child(1) {
  flex: 0 0 38.2%;
  max-width: 38.2%;
}
.grid-toggle-demo[data-layout-mode="fibonacci"] .gt-row-2 > :nth-child(2) {
  flex: 0 0 61.8%;
  max-width: 61.8%;
}
/* 4-column → 1 : 2 : 3 : 5 (total 11) */
.grid-toggle-demo[data-layout-mode="fibonacci"] .gt-row-4 > :nth-child(1) {
  flex: 0 0 9.0909%;
  max-width: 9.0909%;
}
.grid-toggle-demo[data-layout-mode="fibonacci"] .gt-row-4 > :nth-child(2) {
  flex: 0 0 18.1818%;
  max-width: 18.1818%;
}
.grid-toggle-demo[data-layout-mode="fibonacci"] .gt-row-4 > :nth-child(3) {
  flex: 0 0 27.2727%;
  max-width: 27.2727%;
}
.grid-toggle-demo[data-layout-mode="fibonacci"] .gt-row-4 > :nth-child(4) {
  flex: 0 0 45.4545%;
  max-width: 45.4545%;
}
</style>
