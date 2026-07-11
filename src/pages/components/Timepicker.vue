<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useTimepicker } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useTimepicker(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useTimepicker } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useTimepicker(root);   // wires [data-vd-timepicker] inside root; cleanup on unmount

// react to a time being chosen
root.value?.addEventListener('timepicker:select', (e) => {
  console.log(e.detail.time, e.detail.hours, e.detail.minutes);
});`;

const vanillaWiring = `// Wire every [data-vd-timepicker] input (document, or a root element)
VanduoTimepicker.init();

// tear one down
VanduoTimepicker.destroy(inputEl);`;

const vue3Api: [string, string][] = [
  [
    "useTimepicker(root)",
    "Composable — attaches a time dropdown to every [data-vd-timepicker] input inside the root ref. Call once in setup().",
  ],
  [
    "(automatic cleanup)",
    "The popup and listeners are removed on component unmount.",
  ],
];

const html12 = `<input type="text"
  class="vd-input"
  placeholder="hh:mm AM/PM"
  data-vd-timepicker
  readonly>`;

const html24 = `<input type="text"
  class="vd-input"
  placeholder="HH:mm"
  data-vd-timepicker
  data-vd-timepicker-format="24h"
  readonly>`;

const htmlStep = `<input type="text"
  class="vd-input"
  placeholder="Select time…"
  data-vd-timepicker
  data-vd-timepicker-step="15"
  readonly>`;

const cssClasses: [string, string][] = [
  [
    ".vd-timepicker-popup",
    "The scrollable dropdown container positioned below the input",
  ],
  [".vd-timepicker-item", "Individual time slot option"],
  [
    ".vd-timepicker-item.is-selected",
    "The currently selected time slot (highlighted)",
  ],
];

const dataAttrs: [string, string][] = [
  ["data-vd-timepicker", "Activates the timepicker on the input"],
  [
    "data-vd-timepicker-format",
    'Set to "24h" for 24-hour format. Default is 12-hour with AM/PM',
  ],
  [
    "data-vd-timepicker-step",
    "Minute interval between time slots (default: 30). Common values: 15, 30, 60",
  ],
];

const jsMethods: [string, string][] = [
  [
    "VanduoTimepicker.init()",
    "Scans for all [data-vd-timepicker] inputs and attaches time dropdowns",
  ],
  [
    "VanduoTimepicker.destroy(el)",
    "Removes the time dropdown and event listeners from the given input",
  ],
];

const events: [string, string][] = [
  [
    "timepicker:select",
    "Fired on the input when a time is chosen. event.detail contains { time: string, hours: number, minutes: number }",
  ],
];
</script>

<template>
  <section id="timepicker" ref="root">
    <h5 class="demo-title"><i class="ph ph-clock"></i>Timepicker</h5>
    <p class="vd-mb-5">
      The <strong>VanduoTimepicker</strong> component adds a scrollable
      time-selection dropdown to any text input. Choose between 12-hour and
      24-hour formats, and configure the minute step interval.
    </p>

    <div class="vd-row" style="margin-bottom: var(--vd-grid-gutter)">
      <div class="vd-col-12 vd-col-md-4" style="display: flex">
        <div
          id="demo-timepicker-12h"
          class="vd-card vd-card-glow demo-card"
          style="display: flex; flex-direction: column; height: 100%"
        >
          <div class="vd-card-header"><h6>12-Hour Format (Default)</h6></div>
          <div
            class="vd-card-body"
            style="display: flex; flex: 1; flex-direction: column"
          >
            <div
              class="vd-form-group"
              style="display: flex; align-items: center; gap: 1.25rem"
            >
              <label for="tp-12h">Meeting Time</label>
              <input
                type="text"
                id="tp-12h"
                class="vd-input"
                placeholder="hh:mm AM/PM"
                data-vd-timepicker
                readonly
                style="flex: 1"
              />
            </div>
            <div style="margin-top: auto">
              <DocCodeSnippet :html="html12" />
            </div>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-4" style="display: flex">
        <div
          id="demo-timepicker-24h"
          class="vd-card vd-card-glow demo-card"
          style="display: flex; flex-direction: column; height: 100%"
        >
          <div class="vd-card-header"><h6>24-Hour Format</h6></div>
          <div
            class="vd-card-body"
            style="display: flex; flex: 1; flex-direction: column"
          >
            <div
              class="vd-form-group"
              style="display: flex; align-items: center; gap: 1.25rem"
            >
              <label for="tp-24h">Departure Time</label>
              <input
                type="text"
                id="tp-24h"
                class="vd-input"
                placeholder="HH:mm"
                data-vd-timepicker
                data-vd-timepicker-format="24h"
                readonly
                style="flex: 1"
              />
            </div>
            <div style="margin-top: auto">
              <DocCodeSnippet :html="html24" />
            </div>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-4" style="display: flex">
        <div
          id="demo-timepicker-step"
          class="vd-card vd-card-glow demo-card"
          style="display: flex; flex-direction: column; height: 100%"
        >
          <div class="vd-card-header"><h6>15-Minute Step</h6></div>
          <div
            class="vd-card-body"
            style="display: flex; flex: 1; flex-direction: column"
          >
            <div
              class="vd-form-group"
              style="display: flex; align-items: center; gap: 1.25rem"
            >
              <label for="tp-step">Appointment Slot</label>
              <input
                type="text"
                id="tp-step"
                class="vd-input"
                placeholder="Select time…"
                data-vd-timepicker
                data-vd-timepicker-step="15"
                readonly
                style="flex: 1"
              />
            </div>
            <div style="margin-top: auto">
              <DocCodeSnippet :html="htmlStep" />
            </div>
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
        <h4>Wiring</h4>
        <EngineSwitch>
          <template #vue3
            ><DocCodeSnippet :js="vue3Wiring" :default-open="true"
          /></template>
          <template #vanilla
            ><DocCodeSnippet :js="vanillaWiring" :default-open="true"
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

        <h4 class="vd-mt-6">Data Attributes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in dataAttrs" :key="row[0]">
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
            <h4 class="vd-mt-6">Composable API</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Symbol</th>
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
            <h4 class="vd-mt-6">JavaScript Methods</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in jsMethods" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
              <tr v-for="row in events" :key="row[0]">
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
            The dropdown has <code>role="listbox"</code>; each time slot has
            <code>role="option"</code>
          </li>
          <li>
            The input receives <code>aria-haspopup="listbox"</code> and
            <code>aria-expanded</code> state
          </li>
          <li>
            <kbd>↑</kbd> / <kbd>↓</kbd> arrow keys navigate time slots;
            <kbd>Enter</kbd> selects; <kbd>Escape</kbd> closes
          </li>
          <li>
            <code>aria-activedescendant</code> tracks the focused time slot for
            screen readers
          </li>
          <li>Selected slot receives <code>aria-selected="true"</code></li>
          <li>Focus returns to the input after selection or dismissal</li>
        </ul>
      </div>
    </div>
  </section>
</template>
