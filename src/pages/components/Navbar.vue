<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdNavbar } from "@vanduo-oss/vd3";

// The live demos render the real VdNavbar. `@toggle` reports the mobile-menu
// state (visible when the viewport is below the lg breakpoint / the hamburger
// shows), and the dark variant is toggled to show the `dark` prop.
const menuOpen = ref(false);
const dark = ref(false);

const usageVue = `<script setup lang="ts">
import { VdNavbar } from "@vanduo-oss/vd3";
<\/script>

<template>
  <VdNavbar position="sticky">
    <template #brand>
      <a href="/">Vanduo</a>
    </template>

    <!-- Default slot: the collapsible menu content -->
    <ul class="vd-navbar-nav">
      <li><a class="vd-nav-link active" href="/">Home</a></li>
      <li><a class="vd-nav-link" href="/docs">Docs</a></li>
      <li><a class="vd-nav-link" href="/about">About</a></li>
    </ul>

    <template #actions>
      <button class="vd-btn vd-btn-primary vd-btn-sm">Sign in</button>
    </template>
  </VdNavbar>
</template>`;

const dropdownVue = `<VdNavbar>
  <ul class="vd-navbar-nav">
    <li><a class="vd-nav-link active" href="/">Home</a></li>
    <li class="vd-navbar-dropdown">
      <a class="vd-nav-link" href="#">Products</a>
      <div class="vd-navbar-dropdown-menu">
        <a class="vd-navbar-dropdown-item" href="/app">App</a>
        <a class="vd-navbar-dropdown-item" href="/api">API</a>
      </div>
    </li>
  </ul>
</VdNavbar>`;

const propsRows: [string, string, string][] = [
  [
    "variant",
    '"solid" | "transparent" | "glass"',
    'Surface treatment (default "solid"). glass/transparent gain scroll-activated framing (the .vd-navbar-scrolled class engages once you scroll past the threshold).',
  ],
  [
    "dark",
    "boolean",
    "Applies the dark navbar theme (.vd-navbar-dark). Orthogonal to variant. Default false.",
  ],
  [
    "position",
    '"static" | "fixed" | "fixed-bottom" | "sticky"',
    'Positioning modifier (default "static"). fixed / fixed-bottom / sticky attach the bar to the viewport.',
  ],
  [
    "scrollThreshold",
    "number",
    "Scroll distance in px before .vd-navbar-scrolled engages for glass/transparent variants (default: component-resolved).",
  ],
  [
    "toggleLabel",
    "string",
    'Accessible label for the mobile hamburger toggle (default "Toggle navigation").',
  ],
  [
    "closeOnNavigate",
    "boolean",
    "Close the mobile menu when a non-dropdown nav link is clicked (default true).",
  ],
];

const eventsRows: [string, string, string][] = [
  ["open", "—", "Emitted when the mobile menu opens."],
  ["close", "—", "Emitted when the mobile menu closes."],
  [
    "toggle",
    "open: boolean",
    "Emitted on every open/close with the new menu state.",
  ],
];

const slotRows: [string, string][] = [
  [
    "brand",
    "Brand / logo area, rendered inside .vd-navbar-brand. Omitted from the DOM when empty.",
  ],
  [
    "default",
    'The collapsible menu content — place your <ul class="vd-navbar-nav"> here. Rendered inside .vd-navbar-menu.',
  ],
  [
    "actions",
    "Trailing CTA area (buttons, theme switcher…), rendered inside .vd-navbar-actions. Omitted when empty.",
  ],
];

const exposedRows: [string, string][] = [
  ["isOpen", "Reactive boolean reflecting the mobile-menu open state."],
  ["open()", "Imperatively open the mobile menu."],
  ["close()", "Imperatively close the mobile menu."],
  ["toggle()", "Imperatively toggle the mobile menu."],
];

const cssClassRows: [string, string][] = [
  [
    ".vd-navbar-nav",
    "List wrapper for a group of navigation links (place in the default slot).",
  ],
  [
    ".vd-nav-link",
    "Individual link within the menu. Append .active for the current route.",
  ],
  [
    ".vd-navbar-dropdown",
    "Wraps a nav item that owns a nested menu; below the breakpoint its link toggles the submenu instead of navigating.",
  ],
  [
    ".vd-navbar-dropdown-menu",
    "Container for the nested dropdown items (add .is-open is handled for you on mobile).",
  ],
  [".vd-navbar-dropdown-item", "Individual link inside a dropdown menu."],
];

const cssVars: [string, string][] = [
  ["--vd-navbar-bg", "var(--vd-color-white)"],
  ["--vd-navbar-text-color", "var(--vd-text-primary)"],
  ["--vd-navbar-link-color", "var(--vd-text-primary)"],
  ["--vd-navbar-link-hover-color", "var(--vd-color-primary)"],
  ["--vd-navbar-link-active-color", "var(--vd-color-primary)"],
  ["--vd-navbar-height", "3.4375rem (55px, fib)"],
  ["--vd-navbar-padding-x", "1.3125rem (21px, fib)"],
  ["--vd-navbar-nav-gap", "1.3125rem (21px, fib)"],
  ["--vd-navbar-actions-gap", "2.125rem (34px, fib)"],
  ["--vd-navbar-mobile-menu-width", "233px (fib)"],
];
</script>

<template>
  <section id="navbar">
    <h5 class="demo-title"><i class="ph ph-list"></i>Navbar</h5>
    <p class="vd-mb-8">
      <strong>VdNavbar</strong> is a responsive top navigation bar with
      <code>brand</code>, <code>default</code>, and <code>actions</code> slots,
      a built-in mobile hamburger + slide-in menu, optional dropdowns, and
      scroll-aware glass/transparent framing. It emits
      <code>open</code>/<code>close</code>/<code>toggle</code> and exposes
      imperative <code>open() / close() / toggle()</code> controls.
    </p>

    <!-- Live Demo (solid) -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-play-circle"></i>Live Demo</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              A real <code>&lt;VdNavbar&gt;</code> (rendered
              <code>position="static"</code> so it stays inside the card).
              Narrow the viewport to reveal the hamburger and slide-in menu.
            </p>
            <div
              style="
                border: 1px solid var(--vd-border-color);
                border-radius: var(--vd-radius-fib-5);
                overflow: hidden;
              "
            >
              <VdNavbar @toggle="menuOpen = $event">
                <template #brand>
                  <a href="#" @click.prevent>Brand</a>
                </template>
                <ul class="vd-navbar-nav">
                  <li>
                    <a href="#" class="vd-nav-link active" @click.prevent
                      >Home</a
                    >
                  </li>
                  <li>
                    <a href="#" class="vd-nav-link" @click.prevent>Docs</a>
                  </li>
                  <li>
                    <a href="#" class="vd-nav-link" @click.prevent>About</a>
                  </li>
                </ul>
                <template #actions>
                  <button class="vd-btn vd-btn-primary vd-btn-sm">
                    Sign in
                  </button>
                </template>
              </VdNavbar>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Mobile menu is
              <span class="vd-font-semibold">{{
                menuOpen ? "open" : "closed"
              }}</span>
              (from the <code>@toggle</code> event).
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dark variant -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Dark Theme (dark prop)</h6></div>
          <div class="vd-card-body">
            <div class="vd-d-flex vd-mb-4" style="gap: 0.75rem">
              <label class="vd-form-switch">
                <input
                  v-model="dark"
                  type="checkbox"
                  class="vd-form-switch-input"
                  role="switch"
                />
                <span class="vd-form-switch-label"
                  >{{ dark ? "Dark" : "Light" }} navbar</span
                >
              </label>
            </div>
            <div
              style="
                border: 1px solid var(--vd-border-color);
                border-radius: var(--vd-radius-fib-5);
                overflow: hidden;
              "
            >
              <VdNavbar :dark="dark">
                <template #brand>
                  <a href="#" @click.prevent>Vanduo</a>
                </template>
                <ul class="vd-navbar-nav">
                  <li>
                    <a href="#" class="vd-nav-link active" @click.prevent
                      >Home</a
                    >
                  </li>
                  <li>
                    <a href="#" class="vd-nav-link" @click.prevent>Features</a>
                  </li>
                  <li>
                    <a href="#" class="vd-nav-link" @click.prevent>Pricing</a>
                  </li>
                </ul>
                <template #actions>
                  <button class="vd-btn vd-btn-secondary vd-btn-sm">
                    Log in
                  </button>
                </template>
              </VdNavbar>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage + Props -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Usage</h6></div>
          <div class="vd-card-body">
            <p>
              Compose the bar with the three named slots. The default slot is
              the collapsible menu — drop a <code>.vd-navbar-nav</code> list
              inside it:
            </p>
            <DocCodeSnippet :html="usageVue" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Nested Dropdowns</h6></div>
          <div class="vd-card-body">
            <p>
              Wrap a nav item in <code>.vd-navbar-dropdown</code> with a
              <code>.vd-navbar-dropdown-menu</code> child. Below the collapse
              breakpoint the parent link toggles the submenu instead of
              navigating:
            </p>
            <DocCodeSnippet :html="dropdownVue" />
          </div>
        </div>
      </div>
    </div>

    <!-- CSS Variables -->
    <div class="vd-row">
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
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in cssVars" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>
                      <code>{{ row[1] }}</code>
                    </td>
                  </tr>
                </tbody>
              </table>
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
        <h4>Props</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 22%">Prop</th>
                <th style="width: 30%">Type</th>
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
                <th style="width: 22%">Event</th>
                <th style="width: 30%">Payload</th>
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

        <h4 class="vd-mt-6">Slots</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 22%">Slot</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in slotRows" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
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

        <h4 class="vd-mt-6">CSS Classes (slot content)</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th style="width: 30%">Class</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in cssClassRows" :key="row[0]">
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
  </section>
</template>
