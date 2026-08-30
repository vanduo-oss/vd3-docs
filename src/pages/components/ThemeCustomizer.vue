<script setup lang="ts">
import { computed, ref } from "vue";
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
const showPalette = ref(false);

// Controlled-mode demo: this ref is the source of truth, so the fan never
// touches the site theme — nothing below writes <html data-primary>.
const DEMO_SWATCHES = [
  "black",
  "red",
  "orange",
  "green",
  "blue",
  "violet",
] as const;
const demoPrimary = ref("violet");
const demoSwatchColor = computed(
  () =>
    PRIMARY_COLORS.find((c) => c.key === demoPrimary.value)?.color ?? "#000000",
);

const openPanel = (): void => customizerRef.value?.open();
const closePanel = (): void => customizerRef.value?.close();
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

const swatchesVue = `<template>
  <!-- Primary-only fan, hinged at the trigger -->
  <VdThemeCustomizer
    variant="swatches"
    :swatches="['black', 'red', 'orange', 'green', 'blue', 'violet']"
    direction="up"
  />
<\/template>`;

const controlledVue = `<script setup lang="ts">
import { ref } from "vue";
import { VdThemeCustomizer } from "@vanduo-oss/vd3";

// Your store owns the value — the fan only reports intent.
const primary = ref("violet");
const onPrimary = (next: string) => {
  primary.value = clampToBrandHues(next);
};
<\/script>

<template>
  <VdThemeCustomizer
    variant="swatches"
    :primary="primary"
    @update:primary="onPrimary"
  />
<\/template>`;

const propsRows: [string, string, string][] = [
  [
    "showPalette",
    "boolean",
    "Render the palette-selection section (Open Color / Fibonacci). Default true. panel variant only.",
  ],
  [
    "variant",
    '"panel" | "swatches"',
    'Default "panel" — the full palette / primary / neutral / radius / font editor. "swatches" replaces it with a primary-only fan hinged at the trigger, for dock and toolbar chrome with no room for a 320px panel.',
  ],
  [
    "swatches",
    "readonly string[]",
    "Restrict the fan to these PRIMARY_COLORS keys. Unknown keys are ignored; unset or empty offers all 18, which makes for a crowded fan. Blades always render in PRIMARY_COLORS order, not the order you pass.",
  ],
  [
    "direction",
    '"auto" | "up" | "down" | "left" | "right"',
    'Fan axis, default "auto". Auto points away from the nearest viewport edge — which matches the dock edge only while the trigger is pinned there, so chrome that moves between edges should set this explicitly.',
  ],
  [
    "preview",
    "boolean",
    "Default true. Applies a hue on hover and restores the previous one if the fan closes without a pick. Set false when previewing is too expensive or too jumpy.",
  ],
  [
    "primary",
    "string",
    "Bind to take control: the component renders from this value and reports changes through update:primary instead of writing the useThemePreference() singleton. Leave unbound for the singleton-backed default.",
  ],
];

const emitsRows: [string, string, string][] = [
  [
    "update:primary",
    "(value: string)",
    "Emitted instead of writing the theme singleton whenever primary is bound — on hover preview, on preview restore, and on commit. Unbound, the component never emits.",
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
    ".vd-theme-customizer-fan",
    'Teleported swatches fan <div role="listbox">; .is-open while open, plus a fan-up / fan-down / fan-left / fan-right direction class.',
    "Class",
  ],
  [
    ".tc-fan-item",
    'One blade <button role="option">; .is-active for the current hue, .is-hovered while previewing. Carries data-color with the hue key.',
    "Class",
  ],
  [
    "--vd-customizer-fan-blade-width / -dot-size / -label-size",
    "Blade geometry: 6.25rem, 1.2rem, 0.68rem by default.",
    "CSS Variable",
  ],
  [
    "--vd-customizer-fan-stagger / -z-index / -blade-radius",
    "Per-blade transition delay (30ms), stacking context (1100), and blade rounding (999px).",
    "CSS Variable",
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
  [
    "vanduo-neutral-color",
    "stone / charcoal",
    "Neutral / gray scale (docs: stone light, charcoal dark)",
  ],
  ["vanduo-radius", "0.5", "Border radius scale"],
  ["vanduo-font-preference", "nunito", "Font family"],
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
      for the full story. Two presentations ship:
      <code>variant="panel"</code> (the default editor below) and
      <code>variant="swatches"</code>, a primary-only fan for dock and toolbar
      chrome.
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
        <div
          class="vd-d-flex vd-flex-wrap vd-gap-3 vd-align-items-center theme-customizer-demo-row"
        >
          <VdThemeCustomizer ref="customizerRef" :show-palette="showPalette" />
          <div
            class="theme-customizer-demo-actions vd-d-flex vd-flex-wrap vd-gap-3 vd-align-items-center"
          >
            <button
              type="button"
              class="vd-btn vd-btn-sm vd-btn-primary"
              @click="openPanel"
            >
              open()
            </button>
            <button
              type="button"
              class="vd-btn vd-btn-sm vd-btn-outline-secondary"
              @click="closePanel"
            >
              close()
            </button>
            <button
              type="button"
              class="vd-btn vd-btn-sm vd-btn-secondary"
              @click="togglePanel"
            >
              toggle()
            </button>
          </div>
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
          <code>close()</code> / <code>toggle()</code> methods.
        </p>
        <p class="vd-text-sm vd-text-muted vd-mt-2" style="margin: 0">
          <strong>show-palette</strong> — When enabled, the panel adds a Palette
          section so users can switch between Open Color and Fibonacci. Off by
          default in this demo (open the panel and flip the switch to see it).
        </p>
      </div>
    </div>

    <!-- Swatches variant -->
    <div class="vd-card vd-card-glow demo-card vd-mb-8">
      <div class="vd-card-header">
        <h6><i class="ph ph-swatches"></i>Swatches variant</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-5">
          <code>variant="swatches"</code> drops the 320px panel for a
          primary-only fan hinged at the trigger — the presentation this site's
          own dock uses. <code>swatches</code> curates which hues appear,
          <code>direction</code> sets the axis, and <code>preview</code> (on by
          default) applies a hue on hover and puts the old one back if you leave
          without picking.
        </p>
        <p class="vd-text-sm vd-text-muted vd-mb-5">
          Blades always render in <code>PRIMARY_COLORS</code> order rather than
          the order you list them, and that order is not alphabetical —
          <code>teal</code> comes before <code>blue</code>.
          <code>direction="auto"</code> aims the fan away from the
          <em>nearest viewport edge</em>, which is not the same as aiming it
          where there is the most room; chrome that migrates between edges (a
          dock, say) should pass an explicit direction.
        </p>
        <div
          class="vd-d-flex vd-flex-wrap vd-gap-5 vd-align-items-center theme-customizer-demo-row"
        >
          <VdThemeCustomizer
            variant="swatches"
            :swatches="DEMO_SWATCHES"
            direction="right"
            :primary="demoPrimary"
            @update:primary="demoPrimary = $event"
          />
          <div class="vd-d-flex vd-gap-3 vd-align-items-center">
            <span
              aria-hidden="true"
              style="
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 999px;
                border: 1px solid var(--vd-border-color);
              "
              :style="{ background: demoSwatchColor }"
            ></span>
            <code>primary = "{{ demoPrimary }}"</code>
          </div>
        </div>
        <p class="vd-text-sm vd-text-muted vd-mt-4" style="margin: 0">
          This fan runs <strong>controlled</strong>, so it writes the local ref
          beside it and leaves the site theme alone — the page colors do not
          change when you pick.
        </p>
        <DocCodeSnippet class="vd-mt-5" :vue="swatchesVue" />
      </div>
    </div>

    <!-- Controlled mode -->
    <div class="vd-card vd-card-glow demo-card vd-mb-8">
      <div class="vd-card-header">
        <h6><i class="ph ph-arrows-left-right"></i>Controlled primary</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-5">
          Unbound, the component both reads and writes
          <code>useThemePreference()</code>. Bind <code>:primary</code> and it
          switches to controlled mode: it renders from your value and reports
          every change — hover previews included — through
          <code>@update:primary</code>, touching the singleton never.
        </p>
        <p class="vd-text-sm vd-text-muted vd-mb-5">
          Reach for this when the app already owns the hue and needs to clamp or
          transform it. This site does exactly that: its store narrows primary
          to Ink plus the eight dock tints and forces palette, font, radius, and
          neutral to docs defaults, so an uncontrolled customizer writing the
          singleton would slip past both rules.
        </p>
        <DocCodeSnippet :vue="controlledVue" />
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
                }}{{
                  c.key === "stone"
                    ? " (light default)"
                    : c.key === "charcoal"
                      ? " (dark default)"
                      : ""
                }}</span
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

        <h4 class="vd-mt-6">Emits</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 22%">Event</th>
                <th style="width: 20%">Payload</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in emitsRows" :key="row[0]">
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

<style scoped>
.theme-customizer-demo-actions {
  margin-left: 0.25rem;
  padding-left: 0.85rem;
  border-left: 1px solid var(--vd-border-color);
}
</style>
