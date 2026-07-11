<script setup lang="ts">
import { computed, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useThemeStore } from "@/stores/theme";
import type { ThemeMode } from "@vanduo-oss/vue";

// The live demos drive the real global theme store, exactly like the docs
// switcher (which toggles the whole site).
const themeStore = useThemeStore();
const cycle: ThemeMode[] = ["system", "light", "dark"];
const icons: Record<string, string> = {
  system: "ph-desktop",
  light: "ph-sun",
  dark: "ph-moon",
};
const current = computed(() => themeStore.theme);
const currentIcon = computed(() => icons[current.value] ?? "ph-desktop");

const menuOpen = ref(false);
const pick = (value: ThemeMode): void => {
  themeStore.setTheme(value);
  menuOpen.value = false;
};
const cycleTheme = (): void => {
  const i = cycle.indexOf(current.value as ThemeMode);
  pick(cycle[(i + 1) % cycle.length] ?? "system");
  menuOpen.value = false;
};

const menuCodeHtml = `<!-- Icon menu (recommended for navbar) -->
<div class="vd-theme-switcher vd-theme-switcher-menu-end" data-theme-ui="menu">
  <button type="button" class="vd-theme-switcher-toggle"
          aria-label="Theme: System" data-tooltip="Theme: System">
    <i class="ph ph-desktop" data-theme-icon aria-hidden="true"></i>
  </button>
  <div class="vd-theme-switcher-menu" role="menu">
    <button type="button" role="menuitemradio" data-theme-value="system"
            data-tooltip="Use system preference" aria-checked="true">
      <i class="ph ph-desktop" aria-hidden="true"></i>
    </button>
    <!-- ... light, dark -->
  </div>
</div>`;

const cycleCodeHtml = `<!-- Simple icon button -->
<button class="vd-btn vd-btn-icon"
        data-toggle="theme"
        aria-label="Toggle theme">
  <i class="ph ph-moon"></i>
</button>

<!-- Button with label -->
<button class="vd-btn vd-btn-secondary"
        data-toggle="theme">
  Theme: <span class="theme-current-label">System</span>
</button>

<!-- Include the JS component -->
<script src="js/components/theme-switcher.js"><\/script>`;

const selectCodeHtml = `<!-- Select dropdown -->
<select class="vd-input" data-toggle="theme">
  <option value="system">System</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>`;

const perThemeJs = `// Override defaults before init
Object.assign(window.ThemeCustomizer.DEFAULTS, {
  // Primary color in light mode
  PRIMARY_LIGHT: 'black',
  // Primary color in dark mode
  PRIMARY_DARK: 'blue'
});

// Initialize Vanduo
Vanduo.init();`;

const programmaticJs = `// Access the component
const switcher = Vanduo.getComponent('themeSwitcher');

// Get current preference
const pref = switcher.getPreference();
// Returns: 'system', 'light', or 'dark'

// Set preference programmatically
switcher.setPreference('dark');

// Apply without changing preference
switcher.applyTheme();`;

const programmaticVue3 = `import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();

// Current preference: 'system' | 'light' | 'dark'
theme.theme;

// Set preference programmatically (persists + applies to <html>)
theme.setTheme('dark');

// Hydrate from storage + apply (call once in App.vue onMounted)
theme.init();`;

const compareRows: [string, boolean | string, boolean | string][] = [
  ["Light/Dark/System mode", true, true],
  ["Per-theme primary colors", "(follows system)", true],
  ["Color palette selection", false, "(18 colors)"],
  ["Neutral scale", false, "(5 options)"],
  ["Border radius", false, true],
  ["Font family", false, true],
  ["File size", "~3KB", "~15KB"],
  ["Use case", "Simple toggle", "Full customization"],
];

const cssApi: [string, string, string][] = [
  [
    'data-theme-ui="menu"',
    "On .vd-theme-switcher — enables icon menu variant (recommended for navbar).",
    "Attribute",
  ],
  [
    ".vd-theme-switcher-toggle",
    "Menu toggle button; icon synced via [data-theme-icon].",
    "Class",
  ],
  [
    "[data-theme-value]",
    "Menu option value: system, light, or dark.",
    "Attribute",
  ],
  [
    "data-tooltip",
    "Optional tooltips on toggle and menu options (requires Tooltips component).",
    "Attribute",
  ],
  [
    'data-toggle="theme"',
    "Required attribute on button or select element to bind theme switching behavior.",
    "Attribute",
  ],
  [
    'data-theme="light|dark"',
    "Applied to <html> element. Controls CSS variable overrides for dark/light mode. In system preference, this is set to the resolved light/dark value.",
    "State Attribute",
  ],
  [
    ".theme-current-label",
    "Class for span inside button to auto-update with current theme label (System, Light, Dark).",
    "Utility Class",
  ],
  [
    "data-theme-initialized",
    "Added to elements after ThemeSwitcher binds events. Used for testing and debugging.",
    "State Attribute",
  ],
];
</script>

<template>
  <section id="theme-switcher">
    <h5 class="demo-title"><i class="ph ph-moon"></i>Theme Switcher</h5>
    <p class="vd-mb-8">
      The Theme Switcher is a lightweight component for toggling between light,
      dark, and system color modes. Unlike the full Theme Customizer, it focuses
      solely on the color mode toggle without additional customization options.
      Perfect for when you need a simple dark mode button.
    </p>

    <!-- Live Demo -->
    <div class="vd-card vd-card-glow demo-card vd-mb-8">
      <div class="vd-card-header">
        <h6><i class="ph ph-play-circle"></i>Live Demo</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-5">
          Try both variants — icon menu for navbars, cycle button for one-click
          toggling:
        </p>
        <div id="theme-switcher-demo" class="vd-row vd-mb-5">
          <div class="vd-col-12 vd-col-md-6">
            <p class="vd-text-sm vd-font-semibold vd-text-center vd-mb-3">
              Icon Menu
            </p>
            <div class="theme-switcher-demo-strip">
              <div class="theme-switcher-demo-slot">
                <div
                  class="vd-theme-switcher vd-theme-switcher-menu-end"
                  :class="{ 'is-open': menuOpen }"
                  data-theme-ui="menu"
                >
                  <button
                    type="button"
                    class="vd-theme-switcher-toggle"
                    :aria-label="`Theme: ${current}`"
                    @click="menuOpen = !menuOpen"
                  >
                    <i
                      class="ph"
                      :class="currentIcon"
                      data-theme-icon
                      aria-hidden="true"
                    ></i>
                  </button>
                  <div
                    class="vd-theme-switcher-menu"
                    role="menu"
                    :aria-hidden="!menuOpen"
                  >
                    <button
                      v-for="opt in cycle"
                      :key="opt"
                      type="button"
                      role="menuitemradio"
                      :data-theme-value="opt"
                      :aria-checked="current === opt"
                      @click="pick(opt)"
                    >
                      <i class="ph" :class="icons[opt]" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="vd-col-12 vd-col-md-6">
            <p class="vd-text-sm vd-font-semibold vd-text-center vd-mb-3">
              Cycle Button
            </p>
            <div class="theme-switcher-demo-strip">
              <div class="theme-switcher-demo-slot">
                <button
                  type="button"
                  class="vd-theme-switcher-toggle"
                  :aria-label="`Theme: ${current}`"
                  @click="cycleTheme"
                >
                  <i
                    class="ph"
                    :class="currentIcon"
                    data-theme-icon
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <p class="vd-text-sm vd-text-muted vd-text-center">
          Current theme: <span class="vd-font-semibold">{{ current }}</span>
        </p>
      </div>
    </div>

    <div class="vd-alert vd-alert-info vd-mb-8">
      <i class="ph ph-info"></i>
      <div>
        <strong>Coordination with ThemeCustomizer:</strong> When both components
        are present, they automatically stay in sync. Changing the theme via
        ThemeSwitcher will also swap the primary color if you're using the
        default per-theme colors (PRIMARY_LIGHT / PRIMARY_DARK).
      </div>
    </div>

    <!-- Variant code cards -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Icon Menu (Recommended)</h6></div>
          <div class="vd-card-body">
            <p>
              Use the menu variant for navbars — toggle opens an icon-only
              picker without changing theme until the user chooses:
            </p>
            <DocCodeSnippet :html="menuCodeHtml" />
            <p class="vd-mt-5">
              <strong>Try it:</strong> Use the theme switcher in the navbar or
              the live demo above.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Cycle Button</h6></div>
          <div class="vd-card-body">
            <p>
              Add <code>data-toggle="theme"</code> to cycle System → Light →
              Dark on each click:
            </p>
            <DocCodeSnippet :html="cycleCodeHtml" />
            <p class="vd-mt-5">
              <strong>Note:</strong> Cycle buttons change theme immediately on
              each click — best for minimal one-click apps, not navbars where
              accidental flashes matter.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Select Dropdown</h6></div>
          <div class="vd-card-body">
            <p>Use a select element for explicit theme selection:</p>
            <DocCodeSnippet :html="selectCodeHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison + per-theme -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>ThemeSwitcher vs ThemeCustomizer</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-hover">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>ThemeSwitcher</th>
                    <th>ThemeCustomizer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in compareRows" :key="row[0]">
                    <td>{{ row[0] }}</td>
                    <td>
                      <template v-if="row[1] === true"
                        ><i class="ph ph-check vd-text-success"></i
                      ></template>
                      <template v-else-if="row[1] === false"
                        ><i class="ph ph-x vd-text-muted"></i
                      ></template>
                      <template v-else
                        ><i class="ph ph-x vd-text-muted"></i>
                        {{ row[1] }}</template
                      >
                    </td>
                    <td>
                      <template v-if="row[2] === true"
                        ><i class="ph ph-check vd-text-success"></i
                      ></template>
                      <template v-else-if="row[2] === false"
                        ><i class="ph ph-x vd-text-muted"></i
                      ></template>
                      <template
                        v-else-if="
                          typeof row[2] === 'string' && row[2].startsWith('(')
                        "
                        ><i class="ph ph-check vd-text-success"></i>
                        {{ row[2] }}</template
                      >
                      <template v-else>{{ row[2] }}</template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Per-Theme Primary Colors</h6></div>
          <div class="vd-card-body">
            <p>
              When using ThemeCustomizer with ThemeSwitcher, you can define
              different primary colors for light and dark modes:
            </p>
            <DocCodeSnippet :js="perThemeJs" />
            <p class="vd-mt-5 vd-text-sm vd-text-muted">
              When the user switches themes, the primary color automatically
              changes if they're using the default. If they've manually selected
              a color, it stays unchanged.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- JS API -->
    <h4 id="api" class="docs-heading">JavaScript API</h4>
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Programmatic Control</h6></div>
          <div class="vd-card-body">
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :js="programmaticVue3" :default-open="true"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :js="programmaticJs" :default-open="true"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>localStorage Key</h6></div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Default</th>
                    <th>Values</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>vanduo-theme-preference</code></td>
                    <td><code>system</code></td>
                    <td>system, light, dark</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vd-mt-5 vd-text-sm vd-text-muted">
              The preference is automatically saved and restored on page load.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CSS API -->
    <h4 class="docs-heading">CSS API</h4>
    <div class="vd-table-responsive" style="margin-bottom: 3rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 25%">Attribute</th>
            <th style="width: 55%">Description</th>
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

    <!-- Best practices -->
    <h4 class="docs-heading">Best Practices</h4>
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card demo-card">
          <div class="vd-card-body">
            <h4>
              <i class="ph ph-check-circle vd-text-success"></i> Use
              ThemeSwitcher when...
            </h4>
            <ul class="vd-mt-4">
              <li>You only need light/dark toggle</li>
              <li>File size is critical</li>
              <li>Quick integration needed</li>
              <li>Navbar space is limited</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card demo-card">
          <div class="vd-card-body">
            <h4>
              <i class="ph ph-check-circle vd-text-success"></i> Use
              ThemeCustomizer when...
            </h4>
            <ul class="vd-mt-4">
              <li>Users need color customization</li>
              <li>You want per-theme primary colors</li>
              <li>Font/radius customization needed</li>
              <li>Building a theme-aware app</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card demo-card">
          <div class="vd-card-body">
            <h4>
              <i class="ph ph-check-circle vd-text-success"></i> Use Both
              when...
            </h4>
            <ul class="vd-mt-4">
              <li>Quick toggle in navbar</li>
              <li>Full panel in settings</li>
              <li>Auto-coordination provided</li>
              <li>Best of both worlds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
