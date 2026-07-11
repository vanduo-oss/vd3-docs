<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { VdSlider } from "@vanduo-oss/vue";

const volume = ref(60);
const brightness = ref(40);
const price = ref(250);
const zoom = ref(2);
const fixed = ref(50);

const basicHtml = `<div class="vd-slider-field">
  <label for="volume" class="vd-form-label">Volume</label>
  <div class="vd-slider-row">
    <input id="volume" type="range" class="vd-slider" min="0" max="100" value="60" />
    <span class="vd-slider-value">60</span>
  </div>
</div>`;

const rangeHtml = `<input
  type="range"
  class="vd-slider"
  min="0"
  max="500"
  step="10"
  value="250" />`;

const stepHtml = `<input
  type="range"
  class="vd-slider"
  min="1"
  max="5"
  step="0.5"
  value="2" />`;

const disabledHtml = `<input type="range" class="vd-slider" value="50" disabled />`;

const cssClasses: [string, string][] = [
  [
    ".vd-slider",
    'Styles a native <input type="range"> — track, fill and thumb',
  ],
  [
    ".vd-slider-field",
    "Optional wrapper grouping a label above the slider row",
  ],
  [".vd-slider-row", "Flex row that aligns the slider with its value read-out"],
  [".vd-slider-value", "Text element showing the current numeric value"],
];

const vue3Usage = `<script setup lang="ts">
import { VdSlider } from "@vanduo-oss/vue";
const volume = ref(60);
<\/script>

<template>
  <VdSlider v-model="volume" label="Volume" :min="0" :max="100" show-value />
</template>`;

const vanillaUsage = `<div class="vd-slider-field">
  <label for="volume" class="vd-form-label">Volume</label>
  <div class="vd-slider-row">
    <input id="volume" type="range" class="vd-slider" min="0" max="100" value="60" />
    <span class="vd-slider-value">60</span>
  </div>
</div>

<!-- No JavaScript required — it's a styled native range input. -->`;

const vue3Api: [string, string][] = [
  ["v-model (modelValue)", "Two-way bound value (number)."],
  [":min / :max", "Range bounds (defaults 0 / 100)."],
  [":step", "Increment between stops (default 1; accepts decimals)."],
  [":label", "Optional label rendered above the slider."],
  [":show-value", "Renders the live numeric value beside the track."],
  [":disabled", "Greys out and blocks interaction when true."],
  [":name / :id", "Forwarded to the underlying input for forms / labels."],
  ["@update:modelValue", "Fired with the new number as the user drags."],
];
</script>

<template>
  <section id="slider">
    <h5 class="demo-title"><i class="ph ph-sliders-horizontal"></i>Slider</h5>
    <p class="vd-mb-5">
      <strong>VdSlider</strong> styles a native
      <code>&lt;input type="range"&gt;</code> with a themed track, fill and
      thumb. It's CSS-only in the Vanilla engine and binds with
      <code>v-model</code> (numbers) in Vue&nbsp;3 — with optional label and
      live value read-out.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-slider-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic With Value</h6></div>
          <div class="vd-card-body">
            <VdSlider
              v-model="volume"
              label="Volume"
              :min="0"
              :max="100"
              show-value
            />
            <VdSlider
              v-model="brightness"
              label="Brightness"
              :min="0"
              :max="100"
              show-value
              class="vd-mt-4"
            />
            <DocCodeSnippet :html="basicHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-slider-range" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Custom Range &amp; Step</h6></div>
          <div class="vd-card-body">
            <VdSlider
              v-model="price"
              label="Price"
              :min="0"
              :max="500"
              :step="10"
              show-value
            />
            <VdSlider
              v-model="zoom"
              label="Zoom (0.5 steps)"
              :min="1"
              :max="5"
              :step="0.5"
              show-value
              class="vd-mt-4"
            />
            <DocCodeSnippet :html="rangeHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-slider-disabled" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Disabled</h6></div>
          <div class="vd-card-body">
            <VdSlider v-model="fixed" label="Read-only level" disabled />
            <DocCodeSnippet :html="disabledHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-slider-decimal" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Decimal Steps</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Current zoom: <strong>{{ zoom }}×</strong>
            </p>
            <VdSlider v-model="zoom" :min="1" :max="5" :step="0.5" show-value />
            <DocCodeSnippet :html="stepHtml" />
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
        <EngineSwitch>
          <template #vue3
            ><DocCodeSnippet :html="vue3Usage" :default-open="true"
          /></template>
          <template #vanilla
            ><DocCodeSnippet :html="vanillaUsage" :default-open="true"
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
              <tr v-for="row in cssClasses" :key="row[0]">
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
          </template>
          <template #vanilla>
            <h4 class="vd-mt-6">JavaScript</h4>
            <p class="vd-text-muted">
              None — read <code>input.valueAsNumber</code> and listen for the
              native <code>input</code> event to react to changes.
            </p>
          </template>
        </EngineSwitch>

        <h4 class="vd-mt-6">Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>input</code></td>
                <td>
                  Native event fired continuously as the thumb moves. In Vue,
                  prefer <code>@update:modelValue</code> (via
                  <code>v-model</code>), which emits a <code>number</code>.
                </td>
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
            Built on a native range input, so it's fully keyboard operable:
            <kbd>←</kbd> / <kbd>→</kbd> step by <code>step</code>;
            <kbd>Home</kbd> / <kbd>End</kbd> jump to min / max.
          </li>
          <li>
            The component mirrors <code>min</code>/<code>max</code>/value into
            <code>aria-valuemin</code> / <code>aria-valuemax</code> /
            <code>aria-valuenow</code>.
          </li>
          <li>
            Pass a <code>label</code> (or wire <code>id</code>) so screen
            readers announce what the slider controls.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
