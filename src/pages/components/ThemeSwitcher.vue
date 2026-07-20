<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdThemeSwitcher, useThemePreference } from "@vanduo-oss/vd3";
import type { ThemeMode } from "@vanduo-oss/vd3";

// The live demos render the real VdThemeSwitcher, which drives the shared
// useThemePreference() singleton — so picking a mode here re-themes the whole
// page (and persists to localStorage), exactly like the navbar switcher.
const theme = useThemePreference();
const current = computed<ThemeMode>(() => theme.state.theme);
const lastChange = ref<ThemeMode | null>(null);
const onChange = (mode: ThemeMode): void => {
  lastChange.value = mode;
};

const usageVue = `<script setup lang="ts">
import { VdThemeSwitcher } from "@vanduo-oss/vd3";

const onChange = (mode: "system" | "light" | "dark") => {
  console.log("theme changed:", mode);
};
<\/script>

<template>
  <!-- Icon menu (default) — recommended for navbars -->
  <VdThemeSwitcher align="end" @change="onChange" />
<\/template>`;

const cycleVue = `<!-- Single button that cycles System -> Light -> Dark -->
<VdThemeSwitcher :menu="false" />`;

const defaultsVue = `import { VanduoVue, setThemeDefaults } from "@vanduo-oss/vd3";

// Option A — pass themeDefaults to the plugin once, at bootstrap:
app.use(VanduoVue, {
  themeDefaults: {
    PRIMARY_LIGHT: "black",
    PRIMARY_DARK: "green",
  },
});

// Option B — call the helper directly, before the theme first reads defaults:
setThemeDefaults({ PRIMARY_DARK: "violet" });`;

const propsRows: [string, string, string][] = [
  [
    "menu",
    "boolean",
    "Icon-menu variant, recommended for navbars (default true). When false, a single cycling button is rendered.",
  ],
  [
    "align",
    '"start" | "end"',
    'Menu alignment (default "start"). "end" aligns the dropdown to the toggle\'s trailing edge (adds .vd-theme-switcher-menu-end).',
  ],
];

const eventsRows: [string, string, string][] = [
  [
    "change",
    'mode: "system" | "light" | "dark"',
    "Emitted whenever the user selects (menu) or cycles to (button) a mode.",
  ],
];

const cssApi: [string, string, string][] = [
  [".vd-theme-switcher", "Root wrapper for the icon-menu variant.", "Class"],
  [
    'data-theme-ui="menu"',
    'Marks the menu variant; also .vd-theme-switcher-menu-end when align="end".',
    "Attribute",
  ],
  [
    ".vd-theme-switcher-toggle",
    "The toggle button (and the standalone cycle button when menu=false).",
    "Class",
  ],
  [
    ".vd-theme-switcher-menu",
    'The role="menu" popup holding the three mode options.',
    "Class",
  ],
  [
    ".vd-theme-switcher-option",
    'A single role="menuitemradio" option; .is-active marks the current mode.',
    "Class",
  ],
  [
    "[data-theme-value]",
    "Set on each option to its mode value: system, light, or dark.",
    "Attribute",
  ],
  [
    "[data-theme-icon]",
    "Marks the toggle's Phosphor icon element that reflects the current mode.",
    "Attribute",
  ],
  [
    'data-theme="light|dark"',
    "Applied to <html> by the theme layer. Drives the CSS variable overrides; removed for system preference.",
    "State Attribute",
  ],
];

const compareRows: [string, boolean | string, boolean | string][] = [
  ["Light / Dark / System mode", true, true],
  ["Per-theme primary defaults", "(follows scheme)", true],
  ["Palette selection (Open Color / Fibonacci)", false, "(via show-palette)"],
  ["Primary color selection", false, "(18 colors)"],
  ["Neutral scale", false, "(6 options)"],
  ["Border radius", false, "(5 presets)"],
  ["Font family", false, "(5 options)"],
  ["Footprint", "Toggle only", "Full panel"],
  ["Use case", "Quick toggle", "Full customization"],
];
</script>

<template>
  <section id="theme-switcher">
    <h5 class="demo-title"><i class="ph ph-moon"></i>Theme Switcher</h5>
    <p class="vd-mb-8">
      <strong>VdThemeSwitcher</strong> is a lightweight control for toggling
      between light, dark, and system color modes. It drives the shared
      <code>useThemePreference()</code> singleton, so it stays in sync with
      <RouterLink to="/components/theme-customizer"
        >VdThemeCustomizer</RouterLink
      >
      and persists to <code>localStorage</code>. Render it as an icon menu
      (default) or a single cycling button.
    </p>

    <!-- Live Demo -->
    <div class="vd-card vd-card-glow demo-card vd-mb-8">
      <div class="vd-card-header">
        <h6><i class="ph ph-play-circle"></i>Live Demo</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-5">
          These are real <code>&lt;VdThemeSwitcher&gt;</code> instances —
          picking a mode re-themes this whole page:
        </p>
        <div class="vd-row vd-mb-5">
          <div class="vd-col-12 vd-col-md-4 vd-text-center">
            <p class="vd-text-sm vd-font-semibold vd-mb-3">
              Icon Menu (default)
            </p>
            <VdThemeSwitcher @change="onChange" />
          </div>
          <div class="vd-col-12 vd-col-md-4 vd-text-center">
            <p class="vd-text-sm vd-font-semibold vd-mb-3">Menu, align="end"</p>
            <VdThemeSwitcher align="end" @change="onChange" />
          </div>
          <div class="vd-col-12 vd-col-md-4 vd-text-center">
            <p class="vd-text-sm vd-font-semibold vd-mb-3">Cycle Button</p>
            <VdThemeSwitcher :menu="false" @change="onChange" />
          </div>
        </div>
        <p class="vd-text-sm vd-text-muted vd-text-center">
          Current theme: <span class="vd-font-semibold">{{ current }}</span>
          <template v-if="lastChange">
            &nbsp;·&nbsp; last <code>@change</code>:
            <span class="vd-font-semibold">{{ lastChange }}</span>
          </template>
        </p>
      </div>
    </div>

    <div class="vd-alert vd-alert-info vd-mb-8">
      <i class="ph ph-info"></i>
      <div>
        <strong>Coordination with VdThemeCustomizer:</strong> both components
        read and write the same <code>useThemePreference()</code> singleton, so
        a mode change in either is immediately visible in the other. If the
        primary color is still the auto default, switching modes re-derives it
        for the new scheme (see <code>setThemeDefaults</code> below).
      </div>
    </div>

    <!-- Variant cards -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Icon Menu (Recommended)</h6></div>
          <div class="vd-card-body">
            <p>
              The default variant. The toggle opens an icon-only picker; the
              theme only changes once the user chooses an option — ideal for a
              navbar. Use <code>align="end"</code> to hang the menu off the
              toggle's trailing edge:
            </p>
            <DocCodeSnippet :html="usageVue" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Cycle Button</h6></div>
          <div class="vd-card-body">
            <p>
              Pass <code>:menu="false"</code> for a single button that cycles
              System → Light → Dark on each click — best for minimal apps where
              a one-click toggle beats a menu:
            </p>
            <DocCodeSnippet :html="cycleVue" />
            <p class="vd-mt-5 vd-text-sm vd-text-muted">
              The cycle button changes the theme immediately on each click, so
              it can flash between modes — prefer the menu in navbars.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison + per-theme defaults -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>VdThemeSwitcher vs VdThemeCustomizer</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-hover">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Switcher</th>
                    <th>Customizer</th>
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
                      <template v-else>{{ row[1] }}</template>
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
          <div class="vd-card-header"><h6>Per-Theme Primary Defaults</h6></div>
          <div class="vd-card-body">
            <p>
              The theme layer derives a default primary per scheme (<code
                >PRIMARY_LIGHT</code
              >
              / <code>PRIMARY_DARK</code>). Override them at bootstrap so
              switching modes swaps the accent automatically:
            </p>
            <DocCodeSnippet :js="defaultsVue" />
            <p class="vd-mt-5 vd-text-sm vd-text-muted">
              While the primary is still one of these defaults, switching modes
              re-derives it. Once a user picks a specific color in the
              customizer, it sticks across mode changes.
            </p>
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
                <th style="width: 20%">Prop</th>
                <th style="width: 28%">Type</th>
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

        <h4 class="vd-mt-6">Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 20%">Event</th>
                <th style="width: 28%">Payload</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in eventsRows" :key="row[0]">
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

        <h4 class="vd-mt-6">CSS API</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th style="width: 28%">Class / Attribute</th>
                <th style="width: 52%">Description</th>
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

        <h4 class="vd-mt-6">localStorage Key</h4>
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
        <p class="vd-mt-4 vd-text-sm vd-text-muted">
          The preference is persisted by the theme singleton and restored on the
          next load.
        </p>
      </div>
    </div>

    <!-- Best practices -->
    <h4 class="docs-heading">Best Practices</h4>
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card demo-card">
          <div class="vd-card-body">
            <h4>
              <i class="ph ph-check-circle vd-text-success"></i> Use the
              Switcher when…
            </h4>
            <ul class="vd-mt-4">
              <li>You only need a light/dark/system toggle</li>
              <li>Navbar space is limited</li>
              <li>Quick integration matters most</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card demo-card">
          <div class="vd-card-body">
            <h4>
              <i class="ph ph-check-circle vd-text-success"></i> Use the
              Customizer when…
            </h4>
            <ul class="vd-mt-4">
              <li>Users need color / neutral choices</li>
              <li>Radius and font customization matter</li>
              <li>You're building a theme-aware app</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card demo-card">
          <div class="vd-card-body">
            <h4>
              <i class="ph ph-check-circle vd-text-success"></i> Use both when…
            </h4>
            <ul class="vd-mt-4">
              <li>Quick toggle lives in the navbar</li>
              <li>Full panel lives in settings</li>
              <li>They coordinate through one singleton</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
