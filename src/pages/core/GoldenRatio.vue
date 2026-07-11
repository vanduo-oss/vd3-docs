<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

// Interactive Fibonacci spacing slider (a docs demo — no framework JS backs it).
const fib = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
const fibStep = ref(5);
const fibPx = computed(() => fib[fibStep.value] ?? 13);
const fibToken = computed(() => `--vd-space-fib-${fibPx.value}`);
const fibRatio = computed(() => {
  const prev = fib[fibStep.value - 1];
  if (!prev) return "base step";
  return `×${(fibPx.value / prev).toFixed(3).replace(/0+$/, "").replace(/\.$/, "")} vs previous step`;
});

const goldenHtml = `<!-- Golden Split Layout (38.2% / 61.8%) -->
<div class="vd-row-golden">
  <div class="vd-col-golden-minor">
    <div class="vd-bg-secondary vd-p-6 vd-rounded-md vd-text-center">
      <strong>Minor</strong><br>38.2% (1/phi)
    </div>
  </div>
  <div class="vd-col-golden-major">
    <div class="vd-bg-primary vd-text-white vd-p-6 vd-rounded-md vd-text-center">
      <strong>Major</strong><br>61.8% (1 - 1/phi)
    </div>
  </div>
</div>`;

const fib3Html = `<!-- Fibonacci 3-Column Layout (2:3:5 ratio) -->
<div class="vd-row-fib-3">
  <div class="vd-col-fib-2">2</div>
  <div class="vd-col-fib-3">3</div>
  <div class="vd-col-fib-5">5</div>
</div>`;

const gridGoldenHtml = `<!-- CSS Grid Golden Layout (1:1.618 ratio) -->
<div class="vd-grid-golden">
  <div>1fr</div>
  <div>1.618fr</div>
</div>`;

const fibCss = `/* Fibonacci Spacing Scale CSS Variables */
:root {
  --vd-space-fib-1: 0.125rem;
  --vd-space-fib-2: 0.25rem;
  --vd-space-fib-3: 0.375rem;
  --vd-space-fib-5: 0.5rem;
  --vd-space-fib-8: 0.75rem;
  --vd-space-fib-13: 0.8125rem;
  --vd-space-fib-21: 1.3125rem;
  --vd-space-fib-34: 2.125rem;
  --vd-space-fib-55: 3.4375rem;
}`;

const fibScale = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

const aspects: [string, string, "success" | "secondary"][] = [
  [
    "Spacing scale (--vd-space-fib-*)",
    "Fibonacci — 1, 2, 3, 5, 8, 13, 21…",
    "success",
  ],
  ["Radius scale", "Fibonacci", "success"],
  [
    "Shadows & elevation",
    "Fibonacci offset/blur pairs (1/2, 2/3, 3/5…)",
    "success",
  ],
  ["Type scale", "Golden scale at √φ (≈1.272) steps", "success"],
  ["Line-heights", "φ-derived — 1.236, 1.382, 1.618", "success"],
  ["Button / card padding", "Fibonacci pairs (~φ ratio)", "success"],
  ["Container widths", "Fibonacci / Lucas — 610, 987, 1597", "success"],
  [
    "Golden & Fibonacci grids",
    "Opt-in (.vd-grid-golden, .vd-row-fib-*)",
    "success",
  ],
  [
    "Default 12-column grid",
    "Equal columns — φ grids are a class away",
    "secondary",
  ],
  [
    "Responsive breakpoints",
    "Familiar 576 / 768 / 992 / 1200 / 1400",
    "secondary",
  ],
  ["z-index & transition timings", "Standard increments", "secondary"],
];
const aspectBadge = (v: "success" | "secondary"): string =>
  v === "success" ? "φ" : "conventional";
</script>

<template>
  <section id="golden-ratio">
    <h5 class="demo-title"><i class="ph ph-spiral"></i>Golden Ratio Grid</h5>
    <p class="vd-mb-8">
      This framework uses the <strong>Fibonacci sequence</strong> and
      <strong>Golden Ratio (phi = 1.618)</strong> as its proportional
      foundation. Spacing, typography, component dimensions, and grid layouts
      all derive from these mathematical relationships.
    </p>

    <!-- Golden Split -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>Golden Split (38.2% / 61.8%)</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-row-golden">
              <div class="vd-col-golden-minor">
                <div
                  class="vd-bg-secondary vd-p-6 vd-rounded-md vd-text-center"
                >
                  <strong>Minor</strong><br />38.2% (1/phi)
                </div>
              </div>
              <div class="vd-col-golden-major">
                <div
                  class="vd-bg-primary vd-text-white vd-p-6 vd-rounded-md vd-text-center"
                >
                  <strong>Major</strong><br />61.8% (1 - 1/phi)
                </div>
              </div>
            </div>
            <DocCodeSnippet class="vd-mt-5" :html="goldenHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Fib 3-col + CSS grid golden -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>Fibonacci 3-Column (2:3:5)</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-row-fib-3">
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
            <DocCodeSnippet class="vd-mt-5" :html="fib3Html" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>CSS Grid Golden Layout</h6></div>
          <div class="vd-card-body">
            <div class="vd-grid-golden">
              <div
                class="vd-bg-warning vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
              >
                1fr
              </div>
              <div
                class="vd-bg-primary vd-text-white vd-p-5 vd-rounded-md vd-text-center vd-text-sm"
              >
                1.618fr
              </div>
            </div>
            <DocCodeSnippet class="vd-mt-5" :html="gridGoldenHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Fib spacing scale + type scale -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Fibonacci Spacing Scale</h6></div>
          <div class="vd-card-body">
            <div class="vd-d-flex vd-flex-col vd-gap-2">
              <div
                v-for="n in fibScale"
                :key="n"
                class="vd-d-flex items-center vd-gap-5"
              >
                <code class="vd-text-sm">{{ n }}px</code>
                <div
                  class="vd-bg-primary"
                  :style="`width: ${n}px; height: 13px;`"
                ></div>
              </div>
            </div>
            <DocCodeSnippet class="vd-mt-5" :css="fibCss" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Golden Ratio Type Scale</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-xs vd-mb-3">xs — base / phi</p>
            <p class="vd-text-sm vd-mb-3">sm — base / sqrt(phi)</p>
            <p class="vd-text-base vd-mb-3">base — 16px</p>
            <p class="vd-text-lg vd-mb-3">lg — base x sqrt(phi)</p>
            <p class="vd-text-xl vd-mb-3">xl — base x phi</p>
            <p class="vd-text-2xl vd-mb-3">2xl — base x phi^2</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive spacing slider -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>Feel the ratio — interactive spacing scale</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-5">
              Drag through the Fibonacci spacing scale. Each step's ratio to the
              one before it sits near <strong>φ (1.618)</strong> — that
              convergence is why the rhythm feels balanced without manual
              tuning.
            </p>
            <div>
              <input
                v-model.number="fibStep"
                type="range"
                class="vd-range"
                min="0"
                max="10"
                style="width: 100%"
                aria-label="Fibonacci spacing step"
              />
              <div
                class="vd-mt-6"
                style="display: flex; align-items: center; gap: 1.25rem"
              >
                <div
                  :style="`height: 28px; width: ${fibPx}px; background: var(--vd-color-primary); border-radius: var(--vd-radius-fib-3); transition: width 0.15s ease;`"
                ></div>
                <div>
                  <strong class="vd-text-xl">{{ fibPx }}px</strong>
                  <div class="vd-text-sm vd-text-muted">
                    <code>{{ fibToken }}</code> · <span>{{ fibRatio }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Where golden ratio lives -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>Where the golden ratio lives — and where it doesn't</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-5">
              Vanduo is Fibonacci/φ-first in its <em>design language</em>, and
              pragmatically conventional where familiarity beats math. We'd
              rather be honest than dogmatic.
            </p>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-hover">
                <thead>
                  <tr>
                    <th style="width: 45%">Aspect</th>
                    <th style="width: 40%">Basis</th>
                    <th style="width: 15%"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in aspects" :key="row[0]">
                    <td>{{ row[0] }}</td>
                    <td>{{ row[1] }}</td>
                    <td>
                      <span class="vd-badge" :class="`vd-badge-${row[2]}`">{{
                        aspectBadge(row[2])
                      }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-5">
              Compare layouts side by side in
              <RouterLink to="/guides/fibonacci"
                >Fibonacci vs Standard</RouterLink
              >, or flip the live toggle on the
              <RouterLink to="/core/grid-system">Grid System</RouterLink>
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
