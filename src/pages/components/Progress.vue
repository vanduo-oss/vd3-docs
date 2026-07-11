<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const vue3Usage = `<script setup lang="ts">
import { VdProgress } from "@vanduo-oss/vue";
<\/script>

<template>
  <VdProgress :value="60" :max="100" label="Uploading" />
  <VdProgress indeterminate label="Working…" />
</template>`;

const vue3Api: [string, string][] = [
  [":value", "Current value (default 0)."],
  [":max", "Maximum value (default 100)."],
  [":indeterminate", "Animated indeterminate bar (ignores value)."],
  [":label", "Accessible label / visible text for the bar."],
];

const variantsHtml = `<!-- Primary (default) -->
<div class="vd-progress">
  <div class="vd-progress-bar" style="width: 45%;"></div>
</div>

<!-- Success, Warning, Error, Info -->
<div class="vd-progress-bar vd-progress-success" style="width: 75%;"></div>
<div class="vd-progress-bar vd-progress-warning" style="width: 60%;"></div>
<div class="vd-progress-bar vd-progress-error" style="width: 90%;"></div>
<div class="vd-progress-bar vd-progress-info" style="width: 30%;"></div>`;

const sizesHtml = `<!-- Sizes -->
<div class="vd-progress vd-progress-xs">...</div>
<div class="vd-progress vd-progress-sm">...</div>
<div class="vd-progress vd-progress-lg">...</div>
<div class="vd-progress vd-progress-xl">...</div>

<!-- Striped + Animated -->
<div class="vd-progress vd-progress-striped vd-progress-animated">
  <div class="vd-progress-bar" style="width: 75%;"></div>
</div>

<!-- Indeterminate (animated loading bar) -->
<div class="vd-progress vd-progress-indeterminate">
  <div class="vd-progress-bar"></div>
</div>`;

const indeterminateHtml = `<!-- Indeterminate (no width needed) -->
<div class="vd-progress vd-progress-indeterminate">
  <div class="vd-progress-bar"></div>
</div>`;

const multipleHtml = `<!-- Multiple bars -->
<div class="vd-progress vd-progress-lg">
  <div class="vd-progress-bar vd-progress-success"
       style="width: 25%;">25%</div>
  <div class="vd-progress-bar vd-progress-warning"
       style="width: 15%;">15%</div>
  <div class="vd-progress-bar"
       style="width: 10%;">10%</div>
</div>

<!-- Labeled (XL) -->
<div class="vd-progress vd-progress-xl">
  <div class="vd-progress-bar vd-progress-success"
       style="width: 82%;">82%</div>
</div>`;

const variants = [
  { label: "Primary (default)", bar: "", width: "45%", mb: "vd-mb-5" },
  { label: "Success", bar: "vd-progress-success", width: "75%", mb: "vd-mb-5" },
  { label: "Warning", bar: "vd-progress-warning", width: "60%", mb: "vd-mb-5" },
  { label: "Error", bar: "vd-progress-error", width: "90%", mb: "vd-mb-5" },
  { label: "Info", bar: "vd-progress-info", width: "30%", mb: "vd-mb-0" },
];

const cssVars: [string, string, string][] = [
  ["--vd-progress-height", "8px", "Default track height"],
  ["--vd-progress-bg", "var(--vd-bg-tertiary)", "Track background color"],
  ["--vd-progress-bar-bg", "var(--vd-color-primary)", "Default bar fill color"],
  [
    "--vd-progress-border-radius",
    "var(--vd-radius-fib-5, 5px)",
    "Track and bar rounding",
  ],
];

const apiRows: [string, string][] = [
  [".vd-progress", "Base track container with rounded overflow."],
  [
    ".vd-progress-bar",
    "The colored fill bar. Width controlled via inline style or utility class.",
  ],
  [".vd-progress-success", "Green fill variant."],
  [".vd-progress-warning", "Amber fill variant."],
  [".vd-progress-error", "Red fill variant."],
  [".vd-progress-info", "Cyan fill variant."],
  [".vd-progress-xs", "Extra small track height (3px)."],
  [".vd-progress-sm", "Small track height (5px)."],
  [".vd-progress-lg", "Large track height (13px)."],
  [
    ".vd-progress-xl",
    "Extra large track height (21px). Supports text labels inside the bar.",
  ],
  [".vd-progress-striped", "Diagonal stripe overlay on the bar."],
  [".vd-progress-animated", "Animates the stripes scrolling horizontally."],
  [
    ".vd-progress-indeterminate",
    "Animates a partial-width bar back and forth across the track.",
  ],
];
</script>

<template>
  <section id="progress">
    <h5 class="demo-title"><i class="ph ph-chart-bar"></i>Progress</h5>
    <p class="vd-mb-8">
      Linear progress bars with semantic color variants, multiple sizes, striped
      and animated styles, and indeterminate mode. Progress bars are fully
      CSS-driven — set the width via inline style or utility classes and the bar
      animates smoothly.
    </p>

    <!-- Variants + Sizes -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-progress-variants" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Semantic Variants</h6></div>
          <div class="vd-card-body">
            <template v-for="v in variants" :key="v.label">
              <p class="vd-text-sm vd-text-muted vd-mb-2">{{ v.label }}</p>
              <div class="vd-progress" :class="v.mb">
                <div
                  class="vd-progress-bar"
                  :class="v.bar"
                  :style="`width: ${v.width};`"
                ></div>
              </div>
            </template>
          </div>
        </div>
        <DocCodeSnippet :html="variantsHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-progress-sizes" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Sizes &amp; Striped</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-2">Extra Small (3px)</p>
            <div class="vd-progress vd-progress-xs vd-mb-5">
              <div class="vd-progress-bar" style="width: 60%"></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-2">Small (5px)</p>
            <div class="vd-progress vd-progress-sm vd-mb-5">
              <div class="vd-progress-bar" style="width: 60%"></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-2">Default (8px)</p>
            <div class="vd-progress vd-mb-5">
              <div class="vd-progress-bar" style="width: 60%"></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-2">Large (13px)</p>
            <div class="vd-progress vd-progress-lg vd-mb-5">
              <div class="vd-progress-bar" style="width: 60%"></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-2">Extra Large (21px)</p>
            <div class="vd-progress vd-progress-xl vd-mb-5">
              <div class="vd-progress-bar" style="width: 60%">60%</div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-2">
              Striped &amp; Animated
            </p>
            <div
              class="vd-progress vd-progress-lg vd-progress-striped vd-progress-animated vd-mb-0"
            >
              <div class="vd-progress-bar" style="width: 75%"></div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="sizesHtml" />
      </div>
    </div>

    <!-- Indeterminate + Multiple -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div
          id="demo-progress-indeterminate"
          class="vd-card vd-card-glow demo-card"
        >
          <div class="vd-card-header"><h6>Indeterminate</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Use when the exact progress percentage is unknown.
            </p>
            <div
              class="vd-progress vd-progress-lg vd-progress-indeterminate vd-mb-0"
            >
              <div class="vd-progress-bar"></div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="indeterminateHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-progress-multiple" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Multiple Bars &amp; Labeled</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Stack multiple bars to show segmented progress.
            </p>
            <div class="vd-progress vd-progress-lg vd-mb-5">
              <div
                class="vd-progress-bar vd-progress-success"
                style="width: 25%"
              >
                25%
              </div>
              <div
                class="vd-progress-bar vd-progress-warning"
                style="width: 15%"
              >
                15%
              </div>
              <div class="vd-progress-bar" style="width: 10%">10%</div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              With percentage label (XL size only)
            </p>
            <div class="vd-progress vd-progress-xl vd-mb-0">
              <div
                class="vd-progress-bar vd-progress-success"
                style="width: 82%"
              >
                82%
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="multipleHtml" />
      </div>
    </div>

    <!-- CSS Variables -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>CSS Variables</h6></div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in cssVars" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>
                      <code>{{ row[1] }}</code>
                    </td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
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
            <h4>Usage</h4>
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :html="vue3Usage" :default-open="true"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :html="variantsHtml" :default-open="true"
              /></template>
            </EngineSwitch>

            <h4 class="vd-mt-6">CSS Classes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in apiRows" :key="row[0]">
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
                <h4 class="vd-mt-6">Component API (Vue 3)</h4>
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
                <p class="vd-text-muted vd-mt-6">
                  Pure CSS — apply the classes above. No JavaScript API.
                </p>
              </template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
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
                Wrap progress bars in an element with
                <code>role="progressbar"</code>, <code>aria-valuenow</code>,
                <code>aria-valuemin="0"</code>, and
                <code>aria-valuemax="100"</code>.
              </li>
              <li>
                Provide an <code>aria-label</code> or
                <code>aria-labelledby</code> describing what is progressing
                (e.g., "Uploading file.jpg").
              </li>
              <li>
                For indeterminate bars, omit <code>aria-valuenow</code> and add
                <code>aria-valuetext="Loading..."</code> instead.
              </li>
              <li>
                Animations respect
                <code>prefers-reduced-motion: reduce</code> — stripes and
                indeterminate motion are disabled.
              </li>
              <li>
                Dark mode automatically adjusts
                <code>--vd-progress-bg</code> for sufficient contrast.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
