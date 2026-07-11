<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useSuggest } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useSuggest(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useSuggest } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useSuggest(root);   // wires [data-vd-suggest] inside root; cleanup on unmount

// react to a selection
root.value?.addEventListener('suggest:select', (e) => {
  console.log(e.detail.value);
});`;

const vanillaWiring = `// Wire every [data-vd-suggest] / [data-vd-autocomplete] input
VanduoSuggest.init();

// tear one down
VanduoSuggest.destroy(inputEl);`;

const vue3Api: [string, string][] = [
  [
    "useSuggest(root)",
    "Composable — attaches type-ahead suggestions to every [data-vd-suggest] / [data-vd-autocomplete] input inside the root ref. Call once in setup().",
  ],
  [
    "(automatic cleanup)",
    "The dropdown, debounce timer and listeners are removed on component unmount.",
  ],
];

const fruits =
  '["Apple","Apricot","Avocado","Banana","Blackberry","Blueberry","Cherry","Coconut","Cranberry","Date","Dragonfruit","Fig","Grape","Guava","Kiwi","Lemon","Lime","Lychee","Mango","Melon","Nectarine","Orange","Papaya","Peach","Pear","Pineapple","Plum","Pomegranate","Raspberry","Strawberry","Watermelon"]';
const capitals =
  '["Amsterdam","Athens","Berlin","Bratislava","Brussels","Bucharest","Budapest","Copenhagen","Dublin","Helsinki","Lisbon","Ljubljana","Luxembourg","Madrid","Nicosia","Paris","Prague","Riga","Rome","Sofia","Stockholm","Tallinn","Valletta","Vienna","Vilnius","Warsaw","Zagreb"]';
const countries =
  '["Austria","Belgium","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Ireland","Italy","Latvia","Lithuania","Luxembourg","Malta","Netherlands","Poland","Portugal","Romania","Slovakia","Slovenia","Spain","Sweden"]';
const colors =
  '["Red","Orange","Yellow","Green","Blue","Indigo","Violet","Cyan","Magenta","Teal","Coral","Crimson","Gold","Lime","Navy","Olive","Pink","Salmon","Silver","Turquoise"]';

const basicHtml = `<input type="text"
  class="vd-input"
  placeholder="Type a fruit name…"
  data-vd-suggest='["Apple","Banana","Cherry","Grape","Mango","Orange","Peach","Strawberry"]'>`;

const capitalsHtml = `<input type="text"
  class="vd-input"
  placeholder="Type an EU capital…"
  data-vd-suggest='["Amsterdam","Athens","Berlin","Brussels","Dublin","Paris","Rome","Vienna"]'>`;

const minCharsHtml = `<input type="text"
  class="vd-input"
  placeholder="Type at least 2 letters…"
  data-vd-suggest='["Austria","Belgium","France",…]'
  data-vd-suggest-min-chars="2">`;

const aliasHtml = `<!-- data-vd-autocomplete is an alias for data-vd-suggest -->
<input type="text"
  class="vd-input"
  data-vd-autocomplete='["Red","Orange","Yellow","Green","Blue"]'>`;

const cssClasses: [string, string][] = [
  [
    ".vd-suggest-wrapper",
    "Auto-generated wrapper around the input; positions the dropdown list",
  ],
  [
    ".vd-suggest-list",
    "The dropdown <code>&lt;ul&gt;</code> containing suggestion items",
  ],
  [
    ".vd-suggest-item",
    "Individual suggestion <code>&lt;li&gt;</code> inside the list",
  ],
  [
    ".vd-suggest-match",
    "Wraps the matched substring within each suggestion item (bold highlight)",
  ],
  [".vd-suggest-empty", "Shown when no results match the current query"],
];

const dataAttrs: [string, string][] = [
  [
    "data-vd-suggest",
    "Activates the component. Optionally holds an inline JSON array of strings",
  ],
  [
    "data-vd-suggest-url",
    "URL to fetch suggestions from a JSON endpoint. Overrides inline data",
  ],
  [
    "data-vd-suggest-min-chars",
    "Minimum characters before the dropdown appears (default: 1)",
  ],
  ["data-vd-autocomplete", "Alias for data-vd-suggest — works identically"],
];

const jsMethods: [string, string][] = [
  [
    "VanduoSuggest.init()",
    "Scans the DOM for [data-vd-suggest] and [data-vd-autocomplete] inputs and wires them up",
  ],
  [
    "VanduoSuggest.destroy(el)",
    "Removes event listeners, dropdown, and wrapper from the given input element",
  ],
];

const events: [string, string][] = [
  [
    "suggest:select",
    "Fired on the input when the user picks a suggestion. event.detail contains the selected value string",
  ],
];
</script>

<template>
  <section id="autocomplete" ref="root">
    <h5 class="demo-title">
      <i class="ph ph-magnifying-glass"></i>Autocomplete / Suggest
    </h5>
    <p class="vd-mb-5">
      The <strong>VanduoSuggest</strong> component adds type-ahead suggestions
      to any text input. Feed it a static JSON array or point it at a remote
      JSON endpoint — results filter as the user types. Alias:
      <code>data-vd-autocomplete</code>.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-suggest-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic — Static JSON Array</h6></div>
          <div class="vd-card-body">
            <div class="vd-form-group">
              <label for="suggest-fruits">Search Fruits</label>
              <div class="vd-suggest-wrapper">
                <input
                  type="text"
                  id="suggest-fruits"
                  class="vd-input"
                  placeholder="Type a fruit name…"
                  :data-vd-suggest="fruits"
                />
              </div>
            </div>
            <DocCodeSnippet :html="basicHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-suggest-capitals" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>EU Capitals</h6></div>
          <div class="vd-card-body">
            <div class="vd-form-group">
              <label for="suggest-cities">Search EU Capitals</label>
              <div class="vd-suggest-wrapper">
                <input
                  type="text"
                  id="suggest-cities"
                  class="vd-input"
                  placeholder="Type an EU capital…"
                  :data-vd-suggest="capitals"
                />
              </div>
            </div>
            <DocCodeSnippet :html="capitalsHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-suggest-min-chars" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Minimum Characters (2)</h6></div>
          <div class="vd-card-body">
            <div class="vd-form-group">
              <label for="suggest-countries">Search EU Countries</label>
              <div class="vd-suggest-wrapper">
                <input
                  type="text"
                  id="suggest-countries"
                  class="vd-input"
                  placeholder="Type at least 2 letters…"
                  :data-vd-suggest="countries"
                  data-vd-suggest-min-chars="2"
                />
              </div>
            </div>
            <DocCodeSnippet :html="minCharsHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-suggest-alias" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Alias: <code>data-vd-autocomplete</code></h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-form-group">
              <label for="suggest-colors">Search Colors</label>
              <div class="vd-suggest-wrapper">
                <input
                  type="text"
                  id="suggest-colors"
                  class="vd-input"
                  placeholder="Type a color…"
                  :data-vd-autocomplete="colors"
                />
              </div>
            </div>
            <DocCodeSnippet :html="aliasHtml" />
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
            The input receives <code>role="combobox"</code> and
            <code>aria-autocomplete="list"</code>
          </li>
          <li>
            The suggestion list has <code>role="listbox"</code>; each item has
            <code>role="option"</code>
          </li>
          <li>
            <code>aria-expanded</code> toggles <code>true</code>/<code
              >false</code
            >
            as the dropdown opens and closes
          </li>
          <li>
            <code>aria-activedescendant</code> tracks the currently highlighted
            option for screen readers
          </li>
          <li>
            <kbd>↑</kbd> / <kbd>↓</kbd> arrow keys navigate the list;
            <kbd>Enter</kbd> selects; <kbd>Escape</kbd> closes
          </li>
          <li>
            Focus returns to the input after selection, preserving natural tab
            order
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
