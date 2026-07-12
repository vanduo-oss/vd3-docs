<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import {
  VdThemeCustomizer,
  PRIMARY_COLORS,
  NEUTRAL_COLORS,
} from "@vanduo-oss/vd3";

// Live demo drives the real VdThemeCustomizer. It renders its own paint-roller
// trigger + a teleported panel, and every control writes through the shared
// useThemePreference() singleton — so changes apply to <html> immediately and
// stay in sync with VdThemeSwitcher.
const customizerRef = ref<InstanceType<typeof VdThemeCustomizer> | null>(null);
const showPalette = ref(true);

const openPanel = (): void => customizerRef.value?.open();
const togglePanel = (): void => customizerRef.value?.toggle();

// The color chips below are sourced from the real exported token data, so they
// can never drift from what the customizer actually offers.
const primaryColors = PRIMARY_COLORS;
const neutralColors = NEUTRAL_COLORS;

const chipText = (hex: string): string => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#212529" : "white";
};

const usageVue = `<script setup lang="ts">
import { VdThemeCustomizer } from "@vanduo-oss/vd3";
<\/script>

<template>
  <!-- Renders its own trigger button + teleported panel -->
  <VdThemeCustomizer :show-palette="true" />
<\/template>`;

const controlVue = `import { ref } from "vue";
import { VdThemeCustomizer } from "@vanduo-oss/vd3";

const customizer = ref<InstanceType<typeof VdThemeCustomizer>>();

// Drive a specific instance via its exposed methods:
customizer.value?.open();
customizer.value?.close();
customizer.value?.toggle();

// …or open any mounted instance from anywhere via the window event
// (e.g. a navbar button):
window.dispatchEvent(new CustomEvent("vd:open-customizer"));`;

const singletonVue = `import { useThemePreference } from "@vanduo-oss/vd3";
const theme = useThemePreference();

// Reactive current state (six fields):
theme.state.palette; theme.state.primary; theme.state.neutral;
theme.state.radius;  theme.state.font;    theme.state.theme;

// Setters — each persists to localStorage + applies to <html>:
theme.setPalette("fibonacci");
theme.setPrimary("violet");
theme.setNeutral("slate");
theme.setRadius("0.375");
theme.setFont("open-sans");
theme.setTheme("dark");

// Reset every field to the defaults:
theme.reset();`;

const propsRows: [string, string, string][] = [
  [
    "showPalette",
    "boolean",
    "Render the palette-selection section (Open Color / Fibonacci). Default true.",
  ],
];

const exposedRows: [string, string][] = [
  ["open()", "Open the customizer panel."],
  ["close()", "Close the customizer panel."],
  ["toggle()", "Toggle the customizer panel."],
];

const cssApi: [string, string, string][] = [
  [
    ".vd-theme-customizer",
    "Root wrapper; gains .is-open while the panel is open.",
    "Class",
  ],
  [
    ".vd-theme-customizer-trigger",
    "The built-in paint-roller trigger button (also carries data-theme-customizer-trigger).",
    "Class",
  ],
  [
    ".vd-theme-customizer-overlay",
    "Teleported backdrop; .is-active while open.",
    "Class",
  ],
  [
    ".vd-theme-customizer-panel",
    'Teleported panel <aside role="dialog">; .is-open while open.',
    "Class",
  ],
  [
    "data-primary / data-neutral",
    "Applied to <html>. Remap the --vd-primary-* / --vd-gray-* CSS variables.",
    "State Attribute",
  ],
  [
    "data-radius / data-font",
    "Applied to <html>. Set --vd-radius-scale and the font stack (data-font removed for system).",
    "State Attribute",
  ],
  [
    "data-palette",
    "Applied to <html>. Selects the Open Color or Fibonacci palette.",
    "State Attribute",
  ],
];

const storageRows: [string, string, string][] = [
  ["vanduo-palette", "open-color", "Active palette (Open Color / Fibonacci)"],
  [
    "vanduo-primary-color",
    "black / amber",
    "Primary brand color (auto default per scheme)",
  ],
  ["vanduo-neutral-color", "charcoal", "Neutral / gray scale"],
  ["vanduo-radius", "0.5", "Border radius scale"],
  ["vanduo-font-preference", "ubuntu", "Font family"],
  [
    "vanduo-theme-preference",
    "system",
    "Color mode (shared with VdThemeSwitcher)",
  ],
];
</script>

<template>
  <section id="theme-customizer">
    <h5 class="demo-title">
      <i class="ph ph-paint-roller"></i>Theme Customizer
    </h5>
    <p class="vd-mb-8">
      <strong>VdThemeCustomizer</strong> lets users personalize the theme in
      real time — palette, primary color, neutral scale, border radius, and font
      family — all on top of the default <strong>Open Color</strong> palette.
      Every control writes through the shared
      <code>useThemePreference()</code> singleton, so it stays in sync with the
      <RouterLink to="/components/theme-switcher">Theme Switcher</RouterLink>
      and persists to <code>localStorage</code>. Color mode itself lives in the
      switcher; see the
      <RouterLink to="/guides/theme-customizer"
        >Theme Customizer walkthrough</RouterLink
      >
      for the full story.
    </p>

    <!-- Live Demo: real component -->
    <div class="vd-card vd-card-glow demo-card vd-mb-8">
      <div class="vd-card-header">
        <h6><i class="ph ph-play-circle"></i>Live Demo</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-5">
          This is a real <code>&lt;VdThemeCustomizer&gt;</code>. It renders its
          own paint-roller trigger (click it) and teleports the panel under it —
          every change applies to this page immediately:
        </p>
        <div class="vd-d-flex vd-flex-wrap vd-gap-3 vd-align-items-center">
          <VdThemeCustomizer ref="customizerRef" :show-palette="showPalette" />
          <button
            type="button"
            class="vd-btn vd-btn-sm vd-btn-primary"
            @click="openPanel"
          >
            open()
          </button>
          <button
            type="button"
            class="vd-btn vd-btn-sm vd-btn-secondary"
            @click="togglePanel"
          >
            toggle()
          </button>
          <label class="vd-form-switch" style="margin-left: auto">
            <input
              v-model="showPalette"
              type="checkbox"
              class="vd-form-switch-input"
              role="switch"
            />
            <span class="vd-form-switch-label"
              >show-palette: {{ showPalette }}</span
            >
          </label>
        </div>
        <p class="vd-text-sm vd-text-muted vd-mt-4">
          The buttons dogfood the exposed <code>open()</code> /
          <code>toggle()</code> methods; the switch flips the
          <code>show-palette</code> prop (watch the Palette section appear /
          disappear inside the panel).
        </p>
      </div>
    </div>

    <!-- Usage + Features -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Usage</h6></div>
          <div class="vd-card-body">
            <p>
              Drop the component anywhere — it brings its own trigger and panel:
            </p>
            <DocCodeSnippet :html="usageVue" :default-open="true" />
            <p class="vd-mt-5 vd-text-sm vd-text-muted">
              Mount it once (typically in your navbar). Any other button can
              open it by dispatching the <code>vd:open-customizer</code> window
              event.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Panel Sections</h6></div>
          <div class="vd-card-body">
            <ul>
              <li>
                <strong>Palette:</strong> Open Color (default) or Fibonacci
                (golden-angle) — shown when <code>show-palette</code> is true
              </li>
              <li><strong>Primary Color:</strong> 18 color options</li>
              <li>
                <strong>Neutral Color:</strong> 6 scales (Charcoal, Slate, Gray,
                Zinc, Neutral, Stone)
              </li>
              <li>
                <strong>Border Radius:</strong> 5 presets (0, 0.125, 0.25,
                0.375, 0.5)
              </li>
              <li>
                <strong>Font Family:</strong> 5 options (JetBrains Mono, System
                Default, Ubuntu, Lato, Open Sans)
              </li>
              <li><strong>Reset:</strong> restore every field to defaults</li>
            </ul>
            <p class="vd-mt-4 vd-text-sm vd-text-muted">
              Color mode (light / dark / system) is owned by
              <RouterLink to="/components/theme-switcher"
                >VdThemeSwitcher</RouterLink
              >; both share the same singleton.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Available colors (from real token data) -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Available Primary Colors</h6></div>
          <div class="vd-card-body">
            <div class="vd-d-flex vd-flex-wrap vd-gap-3">
              <span
                v-for="c in primaryColors"
                :key="c.key"
                class="vd-chip"
                :style="`background: ${c.color}; color: ${chipText(c.color)};`"
                >{{ c.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Available Neutral Colors</h6></div>
          <div class="vd-card-body">
            <div class="vd-d-flex vd-flex-wrap vd-gap-3 vd-mb-5">
              <span
                v-for="c in neutralColors"
                :key="c.key"
                class="vd-chip"
                :style="`background: ${c.color}; color: ${chipText(c.color)};`"
                >{{ c.name
                }}{{ c.key === "charcoal" ? " (default)" : "" }}</span
              >
            </div>
            <p class="vd-text-sm vd-text-muted">
              Neutral colors affect backgrounds, borders, and text throughout
              the framework.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Programmatic control + singleton -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Programmatic Control</h6></div>
          <div class="vd-card-body">
            <p>Open/close a specific instance, or any mounted one:</p>
            <DocCodeSnippet :js="controlVue" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Theme Singleton API</h6></div>
          <div class="vd-card-body">
            <p>
              The customizer is a thin UI over <code>useThemePreference()</code>
              — you can read or drive the same state directly:
            </p>
            <DocCodeSnippet :js="singletonVue" />
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
        <h4>Props</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 22%">Prop</th>
                <th style="width: 20%">Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in propsRows" :key="row[0]">
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

        <h4 class="vd-mt-6">Exposed (template ref)</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 22%">Member</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in exposedRows" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Window Event</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 30%">Event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>vd:open-customizer</code></td>
                <td>
                  A mounted VdThemeCustomizer opens its panel when this
                  <code>window</code> event is dispatched — wire it to a navbar
                  trigger.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">CSS API</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th style="width: 30%">Class / Attribute</th>
                <th style="width: 50%">Description</th>
                <th style="width: 20%">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in cssApi" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">localStorage Keys</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Key</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in storageRows" :key="row[0]">
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

    <!-- Coordination -->
    <h4 class="docs-heading">Coordination with VdThemeSwitcher</h4>
    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-body">
            <p>
              Both components read and write the same
              <code>useThemePreference()</code> singleton, so they never clobber
              each other:
            </p>
            <ul class="vd-mt-4">
              <li>
                Picking a color/neutral/radius/font in the
                <strong>customizer</strong> leaves the switcher's mode untouched
              </li>
              <li>
                Switching mode in the <strong>switcher</strong> re-derives the
                auto-default primary but never overwrites a color you chose
              </li>
              <li>Every field is shared via <code>localStorage</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
