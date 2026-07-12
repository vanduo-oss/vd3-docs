<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useThemeStore } from "@/stores/theme";
import type { RadiusOption, ThemeMode } from "@vanduo-oss/vd3";

const themeStore = useThemeStore();

const openCustomizer = (): void => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("vd:open-customizer"));
  }
};

const modes: { value: ThemeMode; icon: string; label: string }[] = [
  { value: "system", icon: "ph-desktop", label: "System" },
  { value: "light", icon: "ph-sun", label: "Light" },
  { value: "dark", icon: "ph-moon", label: "Dark" },
];

const primaryColors: { key: string; hex: string; label: string }[] = [
  { key: "black", hex: "#212529", label: "Black" },
  { key: "red", hex: "#fa5252", label: "Red" },
  { key: "orange", hex: "#fd7e14", label: "Orange" },
  { key: "amber", hex: "#fab005", label: "Amber" },
  { key: "yellow", hex: "#fcc419", label: "Yellow" },
  { key: "lime", hex: "#a9e34b", label: "Lime" },
  { key: "green", hex: "#40c057", label: "Green" },
  { key: "emerald", hex: "#10b981", label: "Emerald" },
  { key: "teal", hex: "#20c997", label: "Teal" },
  { key: "cyan", hex: "#22b8cf", label: "Cyan" },
  { key: "sky", hex: "#0ea5e9", label: "Sky" },
  { key: "blue", hex: "#228be6", label: "Blue" },
  { key: "indigo", hex: "#4c6ef5", label: "Indigo" },
  { key: "violet", hex: "#7950f2", label: "Violet" },
  { key: "purple", hex: "#9333ea", label: "Purple" },
  { key: "fuchsia", hex: "#e64980", label: "Fuchsia" },
  { key: "pink", hex: "#f06595", label: "Pink" },
  { key: "rose", hex: "#f43f5e", label: "Rose" },
];

const neutrals: { key: string; hex: string; label: string }[] = [
  { key: "charcoal", hex: "#0d1117", label: "Charcoal" },
  { key: "gray", hex: "#868e96", label: "Gray" },
  { key: "slate", hex: "#64748b", label: "Slate" },
  { key: "zinc", hex: "#71717a", label: "Zinc" },
  { key: "neutral", hex: "#737373", label: "Neutral" },
  { key: "stone", hex: "#78716c", label: "Stone" },
];

const radii: RadiusOption[] = ["0", "0.125", "0.25", "0.375", "0.5"];

const fonts = [
  { value: "jetbrains-mono", label: "JetBrains Mono" },
  { value: "system", label: "System Default" },
  { value: "ubuntu", label: "Ubuntu" },
  { value: "lato", label: "Lato" },
  { value: "open-sans", label: "Open Sans" },
];

const quickStartHtml = `<!-- Trigger button -->
<button class="vd-theme-customizer-trigger"
        data-theme-customizer-trigger
        aria-label="Open theme customizer">
  <i class="ph ph-paint-roller"></i>
</button>

<!-- Include the JS component -->
<script src="js/components/theme-customizer.js"><\/script>`;

const apiVue3 = `import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();

// Reactive current state
theme.theme; theme.primary; theme.neutral; theme.radius; theme.font;

// Set values (each persists to localStorage + applies to <html>)
theme.setPrimary('violet');
theme.setNeutral('slate');
theme.setRadius('0.375');
theme.setFont('open-sans');
theme.setTheme('dark');

// Reset to defaults
theme.reset();

// Open the navbar customizer panel
window.dispatchEvent(new CustomEvent('vd:open-customizer'));`;

const coordinationHtml = `<!-- Navbar: Quick toggle via ThemeSwitcher -->
<button class="vd-btn vd-btn-icon" data-toggle="theme">
  <i class="ph ph-moon"></i>
</button>

<!-- Settings: Full panel via ThemeCustomizer -->
<button class="vd-theme-customizer-trigger" data-theme-customizer-trigger>
  <i class="ph ph-paint-roller"></i>
</button>

<!-- Both components coordinate automatically -->`;

const cssCustomCss = `/* Panel dimensions */
:root {
  --vd-customizer-width: 320px;
  --vd-customizer-padding: 1rem;
}

/* Panel surface */
:root {
  --vd-customizer-bg: var(--vd-bg-primary);
  --vd-customizer-border: var(--vd-border-color);
  --vd-customizer-shadow: var(--vd-shadow-lg);
}

/* Color swatches */
:root {
  --vd-customizer-swatch-size: 28px;
}`;

const eventsJs = `// Panel opened
document.addEventListener('theme:panel-open', () => {
  console.log('Customizer opened');
});

// Panel closed
document.addEventListener('theme:panel-close', () => {
  console.log('Customizer closed');
});

// Any setting changed
document.addEventListener('theme:change', (e) => {
  console.log('Changed:', e.detail);
  // { type: 'primary-change', value: 'violet', state: { ... } }
});

// Settings reset
document.addEventListener('theme:reset', () => {
  console.log('Settings reset to defaults');
});`;

const storageRows: [string, string, string][] = [
  ["vanduo-primary-color", "cyan", "Primary brand color"],
  ["vanduo-neutral-color", "charcoal", "Neutral/gray scale"],
  ["vanduo-radius", "0.5", "Border radius scale"],
  ["vanduo-font-preference", "ubuntu", "Font family"],
  ["vanduo-theme-preference", "system", "Color mode"],
];

const apiRows: [string, string, string][] = [
  [
    ".vd-theme-customizer-trigger",
    "Optional base styling component for the trigger button.",
    "Component",
  ],
  [
    "data-theme-customizer-trigger",
    "Attribute required on the trigger button to bind the click event that opens the panel.",
    "Attribute",
  ],
  [
    "data-primary",
    "Applied to <html>. Remaps --vd-primary-* CSS variables to the selected color.",
    "State Attribute",
  ],
  [
    "data-neutral",
    "Applied to <html>. Remaps --vd-gray-* CSS variables to the selected neutral scale.",
    "State Attribute",
  ],
  [
    "data-radius",
    "Applied to <html>. Sets --vd-radius-scale for component border-radius.",
    "State Attribute",
  ],
  [
    "data-font",
    "Applied to <html>. Sets --vd-font-family-base to the selected font stack.",
    "State Attribute",
  ],
  [
    "data-theme",
    "Applied to <html>. Forces light or dark mode. Removed when using system preference.",
    "State Attribute",
  ],
];

const chipText = (hex: string): string =>
  ["#fab005", "#fcc419", "#a9e34b"].includes(hex) ? "#212529" : "white";
</script>

<template>
  <section id="theme-customizer">
    <h5 class="demo-title">
      <i class="ph ph-paint-roller"></i>Theme Customizer
    </h5>
    <p class="vd-mb-8">
      The Theme Customizer is a powerful component that allows users to
      personalize the framework's appearance in real-time. It provides controls
      for primary color, neutral color, border radius, font family, and color
      mode (light/dark/system), all on top of the default
      <strong>Open Color</strong> palette. For color-mode-only needs, see the
      <RouterLink to="/components/theme-switcher">Theme Switcher</RouterLink>
      or the
      <RouterLink to="/guides/theme-customizer"
        >Theme Customizer walkthrough</RouterLink
      >.
    </p>

    <!-- Live Demo: inline customizer -->
    <div
      class="vd-card vd-card-glow demo-card vd-mb-8 theme-customizer-demo-card"
    >
      <div class="vd-card-header">
        <h6><i class="ph ph-play-circle"></i>Live Demo</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-5">
          Try all the theme options below. Changes apply immediately:
        </p>
        <div class="vd-mb-5 theme-customizer-demo-trigger-row">
          <span class="vd-text-sm vd-text-muted"
            >Open the same dropdown panel used in the navbar.</span
          >
          <button
            type="button"
            class="vd-theme-customizer-trigger"
            aria-label="Open theme customizer"
            @click="openCustomizer"
          >
            <i class="ph ph-paint-roller"></i>
          </button>
        </div>

        <div class="theme-customizer-inline">
          <!-- Color Mode -->
          <div class="customizer-section vd-mb-5">
            <label
              class="customizer-label vd-d-block vd-mb-3 vd-text-sm vd-font-semibold"
              >Color Mode</label
            >
            <div class="vd-d-flex vd-gap-2">
              <button
                v-for="m in modes"
                :key="m.value"
                class="vd-btn vd-btn-sm vd-btn-secondary theme-mode-btn"
                :class="{ active: themeStore.theme === m.value }"
                @click="themeStore.setTheme(m.value)"
              >
                <i class="ph" :class="m.icon"></i> {{ m.label }}
              </button>
            </div>
          </div>

          <!-- Primary Color -->
          <div class="customizer-section vd-mb-5">
            <label
              class="customizer-label vd-d-block vd-mb-3 vd-text-sm vd-font-semibold"
              >Primary Color</label
            >
            <div class="vd-d-flex vd-flex-wrap vd-gap-2">
              <button
                v-for="c in primaryColors"
                :key="c.key"
                class="color-swatch"
                :class="{ active: themeStore.primary === c.key }"
                :style="`background: ${c.hex};`"
                :title="c.label"
                @click="themeStore.setPrimary(c.key)"
              ></button>
            </div>
          </div>

          <!-- Neutral Color -->
          <div class="customizer-section vd-mb-5">
            <label
              class="customizer-label vd-d-block vd-mb-3 vd-text-sm vd-font-semibold"
              >Neutral Color</label
            >
            <div class="vd-d-flex vd-gap-2">
              <button
                v-for="n in neutrals"
                :key="n.key"
                class="vd-btn vd-btn-sm vd-btn-secondary neutral-btn"
                :class="{ active: themeStore.neutral === n.key }"
                @click="themeStore.setNeutral(n.key)"
              >
                {{ n.label }}
              </button>
            </div>
          </div>

          <!-- Border Radius -->
          <div class="customizer-section vd-mb-5">
            <label
              class="customizer-label vd-d-block vd-mb-3 vd-text-sm vd-font-semibold"
              >Border Radius</label
            >
            <div class="vd-d-flex vd-gap-2 vd-align-items-center">
              <button
                v-for="r in radii"
                :key="r"
                class="vd-btn vd-btn-sm vd-btn-secondary radius-btn"
                :class="{ active: themeStore.radius === r }"
                @click="themeStore.setRadius(r)"
              >
                {{ r }}
              </button>
            </div>
          </div>

          <!-- Font Family -->
          <div class="customizer-section">
            <label
              class="customizer-label vd-d-block vd-mb-3 vd-text-sm vd-font-semibold"
              >Font Family</label
            >
            <select
              class="vd-input vd-input-sm font-select"
              style="max-width: 250px"
              :value="themeStore.font"
              @change="
                themeStore.setFont(($event.target as HTMLSelectElement).value)
              "
            >
              <option v-for="f in fonts" :key="f.value" :value="f.value">
                {{ f.label }}
              </option>
            </select>
          </div>

          <div class="theme-customizer-inline-footer vd-mt-5">
            <button
              type="button"
              class="vd-btn vd-btn-sm vd-btn-secondary customizer-reset"
              @click="themeStore.reset()"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Start + Features -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Quick Start</h6></div>
          <div class="vd-card-body">
            <p>
              Add a trigger button anywhere in your page to open the customizer
              panel:
            </p>
            <DocCodeSnippet :html="quickStartHtml" />
            <p class="vd-mt-5">
              <strong>Try it:</strong> Click the
              <i class="ph ph-paint-roller"></i> icon in the navbar to open the
              Theme Customizer.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Features</h6></div>
          <div class="vd-card-body">
            <ul>
              <li>
                <strong>Palette:</strong> Open Color (default) or Fibonacci
                (golden-angle, optional)
              </li>
              <li>
                <strong>Primary Color:</strong> 18 color options re-toned on the
                active palette
              </li>
              <li>
                <strong>Neutral Color:</strong> 6 gray scale variants (Charcoal,
                Gray, Slate, Zinc, Neutral, Stone)
              </li>
              <li>
                <strong>Border Radius:</strong> 5 presets (0, 0.125rem, 0.25rem,
                0.375rem, 0.5rem)
              </li>
              <li>
                <strong>Font Family:</strong> 5 curated options (JetBrains Mono,
                System, Ubuntu, Lato, Open Sans)
              </li>
              <li>
                <strong>Color Mode:</strong> System (default), Dark, or Light
              </li>
            </ul>
            <p class="vd-mt-5 vd-text-sm vd-text-muted">
              All preferences are persisted to <code>localStorage</code> and
              restored on page load.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Available colors -->
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
                :style="`background: ${c.hex}; color: ${chipText(c.hex)};`"
                >{{ c.label }}</span
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
                v-for="n in neutrals"
                :key="n.key"
                class="vd-chip"
                :style="`background: ${n.hex}; color: white;`"
                >{{ n.label
                }}{{ n.key === "charcoal" ? " (default)" : "" }}</span
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

    <!-- localStorage + JS API -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>localStorage Keys</h6></div>
          <div class="vd-card-body">
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
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>JavaScript API</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="apiVue3" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <h4 id="api" class="docs-heading">API Reference</h4>
    <div class="vd-table-responsive" style="margin-bottom: 3rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 25%">Class Name / Attribute</th>
            <th style="width: 55%">Description</th>
            <th style="width: 20%">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in apiRows" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
            <td>{{ row[2] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Coordination -->
    <h4 class="docs-heading">Coordination with ThemeSwitcher</h4>
    <div class="vd-row vd-mb-8">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Auto-Coordination</h6></div>
          <div class="vd-card-body">
            <p>
              When both ThemeCustomizer and ThemeSwitcher are present on the
              same page, they automatically stay in sync:
            </p>
            <ul class="vd-mt-4">
              <li>
                Changing theme via <strong>ThemeSwitcher</strong> button
                triggers primary color swap if using defaults
              </li>
              <li>
                Changing theme via <strong>ThemeCustomizer</strong> panel
                updates ThemeSwitcher state
              </li>
              <li>Preferences are shared via <code>localStorage</code></li>
            </ul>
            <DocCodeSnippet class="vd-mt-5" :html="coordinationHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- CSS customization + Events -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>CSS Customization</h6></div>
          <div class="vd-card-body">
            <p>Override the customizer panel styles:</p>
            <DocCodeSnippet :css="cssCustomCss" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Events</h6></div>
          <div class="vd-card-body">
            <p>Listen for customizer events:</p>
            <DocCodeSnippet :js="eventsJs" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
