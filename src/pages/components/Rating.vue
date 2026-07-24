<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdRating } from "@vanduo-oss/vd3";

const basic = ref(0);
const preset = ref(3);
const max10 = ref(7);
const sizeSm = ref(4);
const sizeMd = ref(4);
const sizeLg = ref(4);

const basicHtml = `<VdRating v-model="rating" />`;
const presetHtml = `<!-- rating = ref(3) → three stars filled on load -->
<VdRating v-model="rating" />`;
const readonlyHtml = `<!-- Display-only: not focusable, no hover/click -->
<VdRating :model-value="4" readonly />`;
const maxHtml = `<!-- Ten stars instead of the default five -->
<VdRating v-model="rating" :max="10" />`;
const sizesHtml = `<!-- Small -->
<VdRating v-model="a" size="sm" />

<!-- Default -->
<VdRating v-model="b" />

<!-- Large -->
<VdRating v-model="c" size="lg" />`;

const cssClasses: [string, string][] = [
  [".vd-rating", "Container wrapping the star elements"],
  [
    ".vd-rating-star",
    "Individual star element (filled or empty depending on value)",
  ],
  [
    ".vd-rating-readonly",
    "Added to the container when readonly; disables hover/click interactions",
  ],
  [".vd-rating-sm", 'Small size variant — rendered when the size prop is "sm"'],
  [".vd-rating-lg", 'Large size variant — rendered when the size prop is "lg"'],
  [
    ".vd-rating-value",
    'Optional text element displaying the numeric value (e.g. "4 / 5")',
  ],
];

const vue3Usage = `<script setup lang="ts">
import { ref } from "vue";
import { VdRating } from "@vanduo-oss/vd3";
const value = ref(3);
<\/script>

<template>
  <VdRating v-model="value" :max="5" @change="onChange" />
</template>`;

const vue3Api: [string, string][] = [
  ["v-model (modelValue)", "Two-way bound rating value (number)."],
  [":max", "Number of stars (default 5)."],
  [":size", "'sm' | 'lg' size variant."],
  [":readonly", "Display-only, non-interactive when true."],
  [
    "@update:modelValue / @change",
    "Fired with the new value when the user picks a star.",
  ],
];
</script>

<template>
  <section id="rating">
    <h5 class="demo-title"><i class="ph ph-star"></i>Rating</h5>
    <p class="vd-mb-5">
      The <strong>VdRating</strong> component renders an interactive star-rating
      widget. Configure the maximum number of stars, pre-set a value, make it
      read-only, or pick a size variant — all through component props.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-rating-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic 5-Star Rating</h6></div>
          <div class="vd-card-body">
            <VdRating v-model="basic" />
            <DocCodeSnippet :html="basicHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-rating-preset" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Pre-set Value (3 of 5)</h6></div>
          <div class="vd-card-body">
            <VdRating v-model="preset" />
            <DocCodeSnippet :html="presetHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-4">
        <div id="demo-rating-readonly" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Read-Only</h6></div>
          <div class="vd-card-body">
            <VdRating :model-value="4" readonly />
            <DocCodeSnippet :html="readonlyHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4">
        <div id="demo-rating-max" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Custom Max (10 Stars)</h6></div>
          <div class="vd-card-body">
            <VdRating v-model="max10" :max="10" />
            <DocCodeSnippet :html="maxHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4">
        <div id="demo-rating-sizes" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Size Variants</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">Small</p>
            <VdRating v-model="sizeSm" size="sm" />
            <p class="vd-text-sm vd-text-muted vd-mb-3 vd-mt-4">Default</p>
            <VdRating v-model="sizeMd" />
            <p class="vd-text-sm vd-text-muted vd-mb-3 vd-mt-4">Large</p>
            <VdRating v-model="sizeLg" size="lg" />
            <DocCodeSnippet :html="sizesHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
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
        <DocCodeSnippet :html="vue3Usage" :default-open="true" />

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
              <tr v-for="row in cssClasses" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Component API</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Prop / event</th>
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

    <!-- Accessibility -->
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
            The container has <code>role="radiogroup"</code> with an
            <code>aria-label</code> like "Rating: 3 out of 5"
          </li>
          <li>
            Each star has <code>role="radio"</code> with
            <code>aria-checked</code> and <code>aria-label</code> (e.g. "3
            stars")
          </li>
          <li>
            <kbd>←</kbd> / <kbd>→</kbd> arrow keys change the value;
            <kbd>Home</kbd> sets to 1; <kbd>End</kbd> sets to max
          </li>
          <li>
            Read-only ratings use <code>aria-readonly="true"</code> and are not
            focusable
          </li>
          <li>
            The widget is fully operable without a mouse via <kbd>Tab</kbd> +
            arrow keys
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
