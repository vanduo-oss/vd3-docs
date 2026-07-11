<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useTabs } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useTabs(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useTabs } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useTabs(root);   // wires [data-tab-target] inside root; cleanup on unmount`;

const vanillaWiring = `// Wire every [data-tab-target] trigger (document, or a root element)
VanduoTabs.init();

// switch programmatically (pass a tab id or the trigger element)
VanduoTabs.show('pane-2');`;

const vue3Api: [string, string][] = [
  [
    "useTabs(root)",
    "Composable — wires every [data-tab-target] trigger inside the root ref; clicking a tab shows its pane. Call once in setup().",
  ],
  [
    "(automatic cleanup)",
    "Click listeners are removed on component unmount — no manual teardown.",
  ],
];

const defaultHtml = `<!-- Default underline tabs -->
<div class="vd-tabs">
  <ul class="vd-tab-list" role="tablist">
    <li class="vd-tab-item" role="presentation">
      <button class="vd-tab-link is-active" role="tab"
              aria-selected="true" data-tab-target="pane-1">Tab 1</button>
    </li>
    <li class="vd-tab-item" role="presentation">
      <button class="vd-tab-link" role="tab"
              aria-selected="false" data-tab-target="pane-2">Tab 2</button>
    </li>
  </ul>
  <div class="vd-tab-content">
    <div class="vd-tab-pane is-active" id="pane-1" role="tabpanel">...</div>
    <div class="vd-tab-pane" id="pane-2" role="tabpanel">...</div>
  </div>
</div>`;

const stylesHtml = `<!-- Boxed tabs -->
<div class="vd-tabs vd-tabs-boxed">...</div>

<!-- Pill tabs -->
<div class="vd-tabs vd-tabs-pills">...</div>

<!-- Bordered tabs -->
<div class="vd-tabs vd-tabs-bordered">...</div>`;

const verticalHtml = `<!-- Vertical tabs -->
<div class="vd-tabs vd-tabs-vertical">...</div>

<!-- Fade animation -->
<div class="vd-tabs vd-tabs-fade">...</div>

<!-- Small / Large tabs -->
<div class="vd-tabs vd-tabs-sm">...</div>
<div class="vd-tabs vd-tabs-lg">...</div>`;

const cssVars: [string, string, string][] = [
  ["--vd-tab-padding-x", "1.3125rem (21px)", "Horizontal padding (Fibonacci)"],
  [
    "--vd-tab-padding-y",
    "0.8125rem (13px)",
    "Vertical padding (Fibonacci, ratio ~phi)",
  ],
  ["--vd-tab-padding-x-sm", "0.8125rem", "Small variant horizontal"],
  ["--vd-tab-padding-y-sm", "0.5rem", "Small variant vertical"],
  ["--vd-tab-padding-x-lg", "2.125rem (34px)", "Large variant horizontal"],
  ["--vd-tab-padding-y-lg", "1.3125rem (21px)", "Large variant vertical"],
  ["--vd-tab-border-width", "2px", "Active underline thickness"],
  ["--vd-tab-text", "var(--vd-text-secondary)", "Inactive tab text color"],
  ["--vd-tab-text-hover", "var(--vd-text-primary)", "Hover text color"],
  ["--vd-tab-text-active", "var(--vd-color-primary)", "Active tab text color"],
  ["--vd-tab-border", "var(--vd-border-color)", "Tab list bottom border"],
  [
    "--vd-tab-border-active",
    "var(--vd-color-primary)",
    "Active indicator color",
  ],
  ["--vd-tab-bg-hover", "var(--vd-bg-secondary)", "Hover background"],
];
const classRows: [string, string][] = [
  [
    ".vd-tabs",
    "Base container. Flex column wrapping the tab list and content.",
  ],
  [
    ".vd-tab-list",
    "Horizontal list of tab buttons. Wraps to multiple lines on small screens.",
  ],
  [".vd-tab-item", "List item wrapper for each tab button."],
  [
    ".vd-tab-link",
    "The clickable tab button. Use .is-active for the selected tab.",
  ],
  [
    ".vd-tab-link.disabled",
    "Non-interactive tab with muted styling and not-allowed cursor.",
  ],
  [".vd-tab-content", "Wrapper around all tab panes with top padding."],
  [".vd-tab-pane", "Individual content panel. Use .is-active to show."],
  [".vd-tabs-fade", "Adds cross-fade animation when switching panes."],
  [".vd-tabs-boxed", "Rounded pill container with elevated active tab."],
  [".vd-tabs-pills", "Solid fill active state on rounded buttons."],
  [".vd-tabs-bordered", "Framed tab list with border wrapping all tabs."],
  [
    ".vd-tabs-vertical",
    "Stacks tab list on the left, content on the right (desktop).",
  ],
  [".vd-tabs-sm", "Compact tab sizing."],
  [".vd-tabs-lg", "Large tab sizing."],
  [".is-active", "State class on both the tab link and its matching pane."],
];
</script>

<template>
  <section id="tabs" ref="root">
    <h5 class="demo-title"><i class="ph ph-tabs"></i>Tabs</h5>
    <p class="vd-mb-8">
      Organize content into switchable panes. Tabs support horizontal and
      vertical layouts, multiple visual styles (default underline, boxed, pills,
      bordered), size variants, and fade animations — all CSS-driven with
      optional JavaScript for pane switching.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Default (Underline)</h6></div>
          <div class="vd-card-body">
            <div class="vd-tabs">
              <ul class="vd-tab-list" role="tablist">
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link is-active"
                    role="tab"
                    aria-selected="true"
                    data-tab-target="tab-default-1"
                  >
                    Overview
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    role="tab"
                    aria-selected="false"
                    data-tab-target="tab-default-2"
                  >
                    Features
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    role="tab"
                    aria-selected="false"
                    data-tab-target="tab-default-3"
                  >
                    Settings
                  </button>
                </li>
              </ul>
              <div class="vd-tab-content">
                <div
                  class="vd-tab-pane is-active"
                  id="tab-default-1"
                  role="tabpanel"
                >
                  <p class="vd-mb-0">
                    The default tab style uses an underline indicator on the
                    active tab. Clean and minimal.
                  </p>
                </div>
                <div class="vd-tab-pane" id="tab-default-2" role="tabpanel">
                  <p class="vd-mb-0">
                    Each tab pane can contain any HTML content — text, forms,
                    tables, or cards.
                  </p>
                </div>
                <div class="vd-tab-pane" id="tab-default-3" role="tabpanel">
                  <p class="vd-mb-0">
                    Tab content is lazy-loaded by default: only the active pane
                    is visible until switched.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="defaultHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Boxed Tabs</h6></div>
          <div class="vd-card-body">
            <div class="vd-tabs vd-tabs-boxed">
              <ul class="vd-tab-list" role="tablist">
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link is-active"
                    role="tab"
                    aria-selected="true"
                    data-tab-target="tab-boxed-1"
                  >
                    Account
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    role="tab"
                    aria-selected="false"
                    data-tab-target="tab-boxed-2"
                  >
                    Security
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    role="tab"
                    aria-selected="false"
                    data-tab-target="tab-boxed-3"
                  >
                    Billing
                  </button>
                </li>
              </ul>
              <div class="vd-tab-content">
                <div
                  class="vd-tab-pane is-active"
                  id="tab-boxed-1"
                  role="tabpanel"
                >
                  <p class="vd-mb-0">
                    Boxed tabs sit inside a rounded container with a subtle
                    background. The active tab gets an elevated card appearance.
                  </p>
                </div>
                <div class="vd-tab-pane" id="tab-boxed-2" role="tabpanel">
                  <p class="vd-mb-0">
                    Security settings include two-factor authentication, session
                    management, and API keys.
                  </p>
                </div>
                <div class="vd-tab-pane" id="tab-boxed-3" role="tabpanel">
                  <p class="vd-mb-0">
                    Billing history, upcoming invoices, and payment method
                    management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="stylesHtml" />
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Pills &amp; Bordered</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">Pills</p>
            <div class="vd-tabs vd-tabs-pills vd-mb-5">
              <ul class="vd-tab-list" role="tablist">
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link is-active"
                    role="tab"
                    aria-selected="true"
                    data-tab-target="tab-pill-1"
                  >
                    Active
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    role="tab"
                    aria-selected="false"
                    data-tab-target="tab-pill-2"
                  >
                    Link
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link disabled"
                    role="tab"
                    aria-selected="false"
                    tabindex="-1"
                  >
                    Disabled
                  </button>
                </li>
              </ul>
              <div class="vd-tab-content">
                <div
                  class="vd-tab-pane is-active"
                  id="tab-pill-1"
                  role="tabpanel"
                >
                  <p class="vd-mb-0">
                    Pill tabs use a solid background fill for the active state —
                    great for dashboards and toolbars.
                  </p>
                </div>
                <div class="vd-tab-pane" id="tab-pill-2" role="tabpanel">
                  <p class="vd-mb-0">
                    Inactive pills blend into the background until hovered or
                    selected.
                  </p>
                </div>
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Bordered</p>
            <div class="vd-tabs vd-tabs-bordered">
              <ul class="vd-tab-list" role="tablist">
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link is-active"
                    role="tab"
                    aria-selected="true"
                    data-tab-target="tab-bordered-1"
                  >
                    Home
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    role="tab"
                    aria-selected="false"
                    data-tab-target="tab-bordered-2"
                  >
                    Profile
                  </button>
                </li>
              </ul>
              <div class="vd-tab-content">
                <div
                  class="vd-tab-pane is-active"
                  id="tab-bordered-1"
                  role="tabpanel"
                >
                  <p class="vd-mb-0">
                    Bordered tabs wrap the entire list in a frame for a more
                    defined look.
                  </p>
                </div>
                <div class="vd-tab-pane" id="tab-bordered-2" role="tabpanel">
                  <p class="vd-mb-0">
                    Useful when tabs sit inside a card or panel with other
                    content nearby.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Vertical Tabs</h6></div>
          <div class="vd-card-body">
            <div class="vd-tabs vd-tabs-vertical">
              <ul class="vd-tab-list" role="tablist">
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link is-active"
                    role="tab"
                    aria-selected="true"
                    data-tab-target="tab-v-1"
                  >
                    <i class="ph ph-user mr-2"></i>Profile
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    role="tab"
                    aria-selected="false"
                    data-tab-target="tab-v-2"
                  >
                    <i class="ph ph-gear mr-2"></i>Settings
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    role="tab"
                    aria-selected="false"
                    data-tab-target="tab-v-3"
                  >
                    <i class="ph ph-bell mr-2"></i>Notifications
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    role="tab"
                    aria-selected="false"
                    data-tab-target="tab-v-4"
                  >
                    <i class="ph ph-credit-card mr-2"></i>Billing
                  </button>
                </li>
              </ul>
              <div class="vd-tab-content">
                <div class="vd-tab-pane is-active" id="tab-v-1" role="tabpanel">
                  <p class="vd-mb-0">
                    Vertical tabs stack the tab list on the left and content on
                    the right — ideal for settings pages and multi-step forms.
                  </p>
                </div>
                <div class="vd-tab-pane" id="tab-v-2" role="tabpanel">
                  <p class="vd-mb-0">
                    Settings include theme, language, password, and connected
                    apps.
                  </p>
                </div>
                <div class="vd-tab-pane" id="tab-v-3" role="tabpanel">
                  <p class="vd-mb-0">
                    Notification preferences for email, push, and in-app alerts.
                  </p>
                </div>
                <div class="vd-tab-pane" id="tab-v-4" role="tabpanel">
                  <p class="vd-mb-0">
                    Payment methods, invoices, and subscription details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="verticalHtml" />
      </div>
    </div>

    <!-- CSS Variables -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>CSS Variables</h6></div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in cssVars" :key="r[0]">
                    <td>
                      <code>{{ r[0] }}</code>
                    </td>
                    <td>
                      <code>{{ r[1] }}</code>
                    </td>
                    <td>{{ r[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
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
                  <tr v-for="r in classRows" :key="r[0]">
                    <td>
                      <code>{{ r[0] }}</code>
                    </td>
                    <td>{{ r[1] }}</td>
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
                  <tr>
                    <td><code>data-tab-target="id"</code></td>
                    <td>
                      On a <code>.vd-tab-link</code>, specifies the pane
                      <code>id</code> to activate.
                    </td>
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
                      <tr v-for="r in vue3Api" :key="r[0]">
                        <td>
                          <code>{{ r[0] }}</code>
                        </td>
                        <td>{{ r[1] }}</td>
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
                      <tr>
                        <td><code>VanduoTabs.init()</code></td>
                        <td>
                          Wires up all <code>[data-tab-target]</code> triggers
                          for automatic pane switching.
                        </td>
                      </tr>
                      <tr>
                        <td><code>VanduoTabs.show(target)</code></td>
                        <td>
                          Programmatically switch tabs. <code>target</code> is a
                          tab id (matched against
                          <code>[data-tab-target]</code>) or the trigger
                          element.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
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
                Use <code>role="tablist"</code> on <code>.vd-tab-list</code>,
                <code>role="tab"</code> on each button, and
                <code>role="tabpanel"</code> on each pane.
              </li>
              <li>
                Set <code>aria-selected="true"</code> on the active tab and
                <code>aria-selected="false"</code> on inactive tabs.
              </li>
              <li>
                Connect tabs to panes with
                <code>aria-controls</code> (pointing to pane <code>id</code>)
                and <code>aria-labelledby</code> (on the pane pointing to tab
                <code>id</code>).
              </li>
              <li>
                <kbd>←</kbd> / <kbd>→</kbd> arrow keys move focus between tabs
                when focus is inside the tab list.
              </li>
              <li>
                <kbd>Home</kbd> focuses the first tab; <kbd>End</kbd> focuses
                the last.
              </li>
              <li>
                Disabled tabs should have <code>tabindex="-1"</code> and
                <code>aria-disabled="true"</code>.
              </li>
              <li>
                Tab content should be focusable (or contain focusable elements)
                so keyboard users can reach it.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
