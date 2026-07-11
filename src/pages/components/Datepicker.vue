<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useDatepicker } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useDatepicker(root);

// Engine-specific wiring (the HTML markup + data-* are identical across engines).
const vue3Wiring = `// Vue 3 — the useDatepicker composable wires every
// [data-vd-datepicker] input inside the root ref.
import { ref } from 'vue';
import { useDatepicker } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useDatepicker(root);   // cleanup is automatic on unmount

// listen for picks
root.value?.addEventListener('datepicker:select', (e) => {
  console.log(e.detail.date, e.detail.formatted);
});`;

const vanillaWiring = `// Vanilla — the global runtime scans the document (or a root)
// for [data-vd-datepicker] inputs.
VanduoDatepicker.init();

// listen for picks
input.addEventListener('datepicker:select', (e) => {
  console.log(e.detail.date, e.detail.formatted);
});`;

const vue3Api: [string, string][] = [
  [
    "useDatepicker(root)",
    "Composable — attaches a calendar to every [data-vd-datepicker] input inside the root ref. Call once in setup().",
  ],
  [
    "(automatic cleanup)",
    "The popup and listeners are removed on component unmount via onUnmounted — there is no manual destroy step.",
  ],
];

const basicHtml = `<input type="text"
  class="vd-input"
  placeholder="YYYY-MM-DD"
  data-vd-datepicker
  readonly>`;

const preselectHtml = `<input type="text"
  class="vd-input"
  value="01/15/2026"
  data-vd-datepicker
  data-vd-datepicker-format="MM/DD/YYYY"
  readonly>`;

const minmaxHtml = `<input type="text"
  class="vd-input"
  data-vd-datepicker
  data-vd-datepicker-min="2026-05-01"
  data-vd-datepicker-max="2026-05-31"
  readonly>`;

const navHtml = `<input type="text"
  class="vd-input"
  value="18.04.2026"
  placeholder="DD.MM.YYYY"
  data-vd-datepicker
  data-vd-datepicker-format="DD.MM.YYYY"
  readonly>`;

const cssClasses: [string, string][] = [
  [
    ".vd-datepicker-popup",
    "The floating calendar container positioned below the input",
  ],
  [
    ".vd-datepicker-header",
    "Header row with month/year label and navigation arrows",
  ],
  [
    ".vd-datepicker-grid",
    'Wraps the weekday row and week rows (<code>role="grid"</code>)',
  ],
  [
    ".vd-datepicker-days",
    "Legacy 7-column grid class (week rows use <code>.vd-datepicker-row</code>)",
  ],
  [".vd-datepicker-day", "Individual day cell button"],
  [
    ".vd-datepicker-day.is-today",
    "Highlights today's date with a ring indicator",
  ],
  [
    ".vd-datepicker-day.is-selected",
    "The currently selected date (filled primary color)",
  ],
  [
    ".vd-datepicker-day.is-disabled",
    "Dates outside the min/max range (greyed out, not clickable)",
  ],
  [
    ".vd-datepicker-day.is-outside",
    "Days from the previous/next month shown for grid continuity",
  ],
];

const dataAttrs: [string, string][] = [
  ["data-vd-datepicker", "Activates the datepicker on the input"],
  [
    "data-vd-datepicker-format",
    'Date format string. Tokens: <code>YYYY</code>, <code>MM</code>, <code>DD</code> (matched case-insensitively). Default: <code>"YYYY-MM-DD"</code>',
  ],
  [
    "data-vd-datepicker-min",
    "Earliest selectable date in <code>YYYY-MM-DD</code> format",
  ],
  [
    "data-vd-datepicker-max",
    "Latest selectable date in <code>YYYY-MM-DD</code> format",
  ],
];

const jsMethods: [string, string][] = [
  [
    "VanduoDatepicker.init()",
    "Scans for all [data-vd-datepicker] inputs and attaches calendar popups",
  ],
  [
    "VanduoDatepicker.destroy(el)",
    "Removes the calendar popup and event listeners from the given input",
  ],
];

const events: [string, string][] = [
  [
    "datepicker:select",
    "Fired on the input when a date is picked. <code>event.detail</code> contains <code>{ date: Date, formatted: string }</code>",
  ],
];
</script>

<template>
  <section id="datepicker" ref="root">
    <h5 class="demo-title"><i class="ph ph-calendar-dots"></i>Datepicker</h5>
    <p class="vd-mb-5">
      The <strong>VanduoDatepicker</strong> component attaches a calendar popup
      to any text input. Supports custom date formats, min/max date constraints,
      and month/year navigation — all driven by data attributes.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-datepicker-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic Datepicker</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Minimal setup: add <code>data-vd-datepicker</code> to a text input
              (these demos use <code>readonly</code> so typing is off). With no
              format attribute, picked dates are written as
              <code>YYYY-MM-DD</code>. Focus the field to open the calendar and
              choose a day.
            </p>
            <div class="vd-form-group">
              <label for="dp-basic">Select a Date</label>
              <div class="vd-suggest-wrapper">
                <input
                  type="text"
                  id="dp-basic"
                  class="vd-input"
                  placeholder="YYYY-MM-DD"
                  data-vd-datepicker
                  readonly
                />
              </div>
            </div>
            <DocCodeSnippet :html="basicHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div
          id="demo-datepicker-preselect"
          class="vd-card vd-card-glow demo-card"
        >
          <div class="vd-card-header">
            <h6>Pre-selected Value &amp; Custom Format</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Beyond basic: set <code>value</code> and
              <code>data-vd-datepicker-format</code> so the initial string is
              parsed and new picks match that pattern. Tokens:
              <code>YYYY</code>, <code>MM</code>, <code>DD</code>
              (case-insensitive).
            </p>
            <div class="vd-form-group">
              <label for="dp-preselect">Birthday</label>
              <div class="vd-suggest-wrapper">
                <input
                  type="text"
                  id="dp-preselect"
                  class="vd-input"
                  value="01/15/2026"
                  data-vd-datepicker
                  data-vd-datepicker-format="MM/DD/YYYY"
                  readonly
                />
              </div>
            </div>
            <DocCodeSnippet :html="preselectHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-datepicker-minmax" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Min / Max Date Constraints</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Use <code>data-vd-datepicker-min</code> and
              <code>data-vd-datepicker-max</code> with <code>YYYY-MM-DD</code>
              bounds. Out-of-range days are disabled; the view snaps to a month
              that contains selectable dates.
            </p>
            <div class="vd-form-group">
              <label for="dp-minmax">Appointment (May 2026 only)</label>
              <div class="vd-suggest-wrapper">
                <input
                  type="text"
                  id="dp-minmax"
                  class="vd-input"
                  placeholder="Pick a date…"
                  data-vd-datepicker
                  data-vd-datepicker-min="2026-05-01"
                  data-vd-datepicker-max="2026-05-31"
                  readonly
                />
              </div>
            </div>
            <DocCodeSnippet :html="minmaxHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div
          id="demo-datepicker-navigation"
          class="vd-card vd-card-glow demo-card"
        >
          <div class="vd-card-header"><h6>Month / Year Navigation</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              This card uses <code>DD.MM.YYYY</code> to show a non-default
              format; navigation is the same as everywhere. Click the month/year
              title to switch day → month → year (decade) views; arrows step by
              month, year, or decade depending on the level.
            </p>
            <div class="vd-form-group">
              <label for="dp-nav">Event Date</label>
              <div class="vd-suggest-wrapper">
                <input
                  type="text"
                  id="dp-nav"
                  class="vd-input"
                  value="18.04.2026"
                  placeholder="DD.MM.YYYY"
                  data-vd-datepicker
                  data-vd-datepicker-format="DD.MM.YYYY"
                  readonly
                />
              </div>
            </div>
            <DocCodeSnippet :html="navHtml" />
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
                <td v-html="row[1]"></td>
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
                <td v-html="row[1]"></td>
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
                <td v-html="row[1]"></td>
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
            The popup has <code>role="dialog"</code> and
            <code>aria-label="Choose date"</code>
          </li>
          <li>
            Calendar uses <code>role="grid"</code>; weekday labels use
            <code>role="columnheader"</code>; in-month days use
            <code>role="gridcell"</code>
          </li>
          <li>
            <kbd>←</kbd> / <kbd>→</kbd> move by day; <kbd>↑</kbd> /
            <kbd>↓</kbd> move by week
          </li>
          <li>
            <kbd>Home</kbd> / <kbd>End</kbd> jump to start/end of the current
            week
          </li>
          <li><kbd>Page Up</kbd> / <kbd>Page Down</kbd> navigate by month</li>
          <li>
            <kbd>Enter</kbd> selects the focused date; <kbd>Escape</kbd> closes
            the popup and returns focus to the input
          </li>
          <li>
            Disabled dates have <code>aria-disabled="true"</code> and are
            skipped during keyboard navigation
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
