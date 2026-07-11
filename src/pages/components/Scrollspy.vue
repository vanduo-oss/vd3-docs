<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useWaypoint } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useWaypoint(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useWaypoint } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useWaypoint(root);   // wires [data-vd-waypoint-nav] inside root; cleanup on unmount

// react to the active section changing
root.value?.addEventListener('waypoint:change', (e) => {
  console.log('active', e.detail.activeId);
});`;

const vanillaWiring = `// Wire every [data-vd-waypoint-nav] (document, or a root element)
VanduoWaypoint.init();

// after dynamic content changes
VanduoWaypoint.refresh(navEl);`;

const vue3Api: [string, string][] = [
  [
    "useWaypoint(root)",
    "Composable — wires every [data-vd-waypoint-nav] inside the root ref; highlights the link of the topmost visible section. Call once in setup().",
  ],
  [
    "(automatic cleanup)",
    "The IntersectionObserver and click listeners are removed on component unmount.",
  ],
];

// Port of the docs `data-waypoint-demo-nav` handler (docs/js/modules/demos.js):
// the underline / pill previews toggle the active button + update the panel
// copy. Kept as a delegated listener so the markup stays 1-to-1 with the docs.
let onDemoClick: ((e: Event) => void) | null = null;
onMounted(() => {
  const host = root.value;
  if (!host) return;
  onDemoClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    const button = target.closest<HTMLButtonElement>(
      "[data-waypoint-demo-nav] button",
    );
    if (!button) return;
    const nav = button.closest<HTMLElement>("[data-waypoint-demo-nav]");
    if (!nav) return;
    nav.querySelectorAll("button").forEach((b) => {
      const isActive = b === button;
      b.classList.toggle("is-active", isActive);
      b.setAttribute("aria-selected", String(isActive));
    });
    const panel = nav.parentElement?.querySelector<HTMLElement>(
      "[data-waypoint-demo-panel]",
    );
    const nextCopy = button.getAttribute("data-waypoint-demo-copy");
    if (panel && nextCopy) panel.textContent = nextCopy;
  };
  host.addEventListener("click", onDemoClick);
});
onUnmounted(() => {
  if (onDemoClick) root.value?.removeEventListener("click", onDemoClick);
  onDemoClick = null;
});

const sidebarHtml = `<!-- Sidebar scrollspy navigation -->
<nav class="vd-waypoint-nav"
     data-vd-waypoint-nav="#scroll-container">
  <a href="#section-1" class="is-active">Section 1</a>
  <a href="#section-2">Section 2</a>
  <a href="#section-3">Section 3</a>
</nav>

<div id="scroll-container" style="overflow-y:auto;">
  <div id="section-1">...</div>
  <div id="section-2">...</div>
  <div id="section-3">...</div>
</div>`;

const underlineHtml = `<nav class="vd-waypoint-nav vd-waypoint-underline"
     data-vd-waypoint-nav="window">
  <a href="#overview" class="is-active">Overview</a>
  <a href="#features">Features</a>
  <a href="#pricing">Pricing</a>
</nav>`;

const pillHtml = `<nav class="vd-waypoint-nav vd-waypoint-pill"
     data-vd-waypoint-nav="#content">
  <a href="#start" class="is-active">Getting Started</a>
  <a href="#components">Components</a>
  <a href="#utilities">Utilities</a>
</nav>`;

const cssClasses: [string, string, string][] = [
  [
    ".vd-waypoint-nav",
    "Base scrollspy navigation container — required",
    "Base",
  ],
  [
    ".vd-waypoint-border",
    "Adds a left border highlight on the active link (sidebar style)",
    "Modifier",
  ],
  [
    ".vd-waypoint-pill",
    "Rounded pill-shaped background on the active link",
    "Modifier",
  ],
  [
    ".vd-waypoint-underline",
    "Bottom underline indicator on the active link (tab style)",
    "Modifier",
  ],
  [
    ".is-active",
    "Applied automatically to the currently visible section's link",
    "State",
  ],
];

const dataAttrs: [string, string, string][] = [
  [
    "data-vd-waypoint-nav",
    'Selector for the scrollable container to observe (e.g. "#content" or "window")',
    "window",
  ],
  [
    "data-vd-waypoint-offset",
    "Pixel offset from the top to trigger activation earlier or later",
    "0",
  ],
  ["data-vd-scrollspy-nav", "Alias for data-vd-waypoint-nav", "—"],
];

const jsMethods: [string, string][] = [
  [
    "VanduoWaypoint.init()",
    "Initialize all [data-vd-waypoint-nav] elements on the page",
  ],
  [
    "VanduoWaypoint.refresh(nav)",
    "Recalculate section positions after dynamic content changes",
  ],
  [
    "VanduoWaypoint.destroy(nav)",
    "Remove scroll listeners and IntersectionObservers for the given nav",
  ],
];

const events: [string, string, string][] = [
  [
    "waypoint:change",
    "Fired on the nav element when the active section changes",
    "{ activeId, link }",
  ],
];
</script>

<template>
  <section id="scrollspy" ref="root">
    <h5 class="demo-title">
      <i class="ph ph-map-trifold"></i>Waypoint / Scrollspy
    </h5>

    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-waypoint-sidebar" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Sidebar Navigation Scrollspy</h6>
          </div>
          <div class="vd-card-body">
            <div class="waypoint-demo-layout">
              <nav
                class="vd-waypoint-nav vd-waypoint-border waypoint-demo-sidebar-nav"
                data-vd-waypoint-nav="#waypoint-demo-scroll"
                aria-label="Scrollspy sections"
              >
                <a href="#wp-section-intro" class="is-active">Introduction</a>
                <a href="#wp-section-setup">Setup</a>
                <a href="#wp-section-usage">Usage</a>
                <a href="#wp-section-api">API</a>
              </nav>
              <div id="waypoint-demo-scroll" class="waypoint-demo-scroll">
                <div id="wp-section-intro" class="waypoint-demo-section">
                  <h4 class="waypoint-demo-section-title">Introduction</h4>
                  <p>
                    Waypoint automatically highlights navigation links as the
                    user scrolls through corresponding content sections. It
                    observes section visibility and updates the
                    <code>.is-active</code> class on the matching nav link.
                  </p>
                </div>
                <div id="wp-section-setup" class="waypoint-demo-section">
                  <h4>Setup</h4>
                  <p>
                    Add <code>data-vd-waypoint-nav</code> to the nav container
                    and point it to the scrollable parent. Each link
                    <code>href</code> should reference a section ID within the
                    scroll container.
                  </p>
                </div>
                <div id="wp-section-usage" class="waypoint-demo-section">
                  <h4>Usage</h4>
                  <p>
                    Waypoint supports vertical scroll containers of any height.
                    Links are highlighted top-down - the topmost visible section
                    wins. Works with both window scroll and overflow containers.
                  </p>
                </div>
                <div id="wp-section-api" class="waypoint-demo-section">
                  <h4>API</h4>
                  <p>
                    Call <code>VanduoWaypoint.refresh(nav)</code> after dynamic
                    content changes. Destroy with
                    <code>VanduoWaypoint.destroy(nav)</code> to clean up
                    observers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="sidebarHtml" />
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div
          id="demo-waypoint-underline"
          class="vd-card vd-card-glow demo-card"
        >
          <div class="vd-card-header"><h6>Underline Variant</h6></div>
          <div class="vd-card-body">
            <nav
              class="vd-waypoint-nav vd-waypoint-underline waypoint-demo-tab-nav waypoint-demo-tab-nav-underline"
              data-waypoint-demo-nav
              aria-label="Underline variant preview"
              role="tablist"
            >
              <button
                type="button"
                class="is-active"
                role="tab"
                aria-selected="true"
                data-waypoint-demo-copy="Overview of the current section with a compact underline indicator."
              >
                Overview
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                data-waypoint-demo-copy="Feature-focused tab labels can switch active state without moving the page."
              >
                Features
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                data-waypoint-demo-copy="Pricing can stay in-place while the active item updates visually."
              >
                Pricing
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                data-waypoint-demo-copy="FAQ remains clickable without sending the reader somewhere else on the docs page."
              >
                FAQ
              </button>
            </nav>
            <p
              class="vd-text-sm vd-text-muted vd-mt-4"
              data-waypoint-demo-panel
            >
              Overview of the current section with a compact underline
              indicator.
            </p>
          </div>
        </div>
        <DocCodeSnippet :html="underlineHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-waypoint-pill" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Pill Variant</h6></div>
          <div class="vd-card-body">
            <nav
              class="vd-waypoint-nav vd-waypoint-pill waypoint-demo-tab-nav waypoint-demo-tab-nav-pill"
              data-waypoint-demo-nav
              aria-label="Pill variant preview"
              role="tablist"
            >
              <button
                type="button"
                class="is-active"
                role="tab"
                aria-selected="true"
                data-waypoint-demo-copy="Getting started stays selected while the card remains anchored in place."
              >
                Getting Started
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                data-waypoint-demo-copy="Components can be previewed as pills without triggering a page jump."
              >
                Components
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                data-waypoint-demo-copy="Utilities now behave like local controls instead of placeholder links."
              >
                Utilities
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                data-waypoint-demo-copy="Theming is shown as another selectable state in the same card."
              >
                Theming
              </button>
            </nav>
            <p
              class="vd-text-sm vd-text-muted vd-mt-4"
              data-waypoint-demo-panel
            >
              Getting started stays selected while the card remains anchored in
              place.
            </p>
          </div>
        </div>
        <DocCodeSnippet :html="pillHtml" />
      </div>
    </div>

    <!-- API Reference -->
    <div id="demo-waypoint-api" class="vd-card vd-card-glow demo-card">
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
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in cssClasses" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>Data Attributes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in dataAttrs" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
                <td>
                  <code>{{ row[2] }}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <EngineSwitch>
          <template #vue3>
            <h4>Composable API</h4>
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
            <h4>JavaScript Methods</h4>
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

        <h4>Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in events" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
                <td>
                  <code>{{ row[2] }}</code>
                </td>
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
            Navigation container uses <code>role="navigation"</code> with
            <code>aria-label="Table of contents"</code>
          </li>
          <li>
            Active link receives <code>aria-current="true"</code> in addition to
            the <code>.is-active</code> class
          </li>
          <li>
            Links use standard anchor elements for native keyboard navigation
            and focus management
          </li>
          <li>
            Smooth scrolling respects
            <code>prefers-reduced-motion</code> media query
          </li>
          <li>
            Section targets use semantic heading hierarchy for screen reader
            landmark navigation
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
#scrollspy .waypoint-demo-layout {
  display: grid;
  grid-template-columns: minmax(10rem, 12rem) minmax(0, 1fr);
  gap: 1.5rem;
  min-height: 280px;
  align-items: start;
}

#scrollspy .waypoint-demo-sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-self: start;
}

#scrollspy .waypoint-demo-sidebar-nav a {
  display: block;
  padding: 0.35rem 0.875rem;
  color: var(--vd-text-secondary);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

#scrollspy .waypoint-demo-sidebar-nav a:hover {
  color: var(--vd-color-primary);
  background: var(--vd-bg-secondary);
}

#scrollspy .waypoint-demo-scroll {
  overflow-y: auto;
  max-height: 280px;
  padding-right: 1rem;
  scroll-behavior: smooth;
}

#scrollspy .waypoint-demo-section {
  padding-bottom: 2rem;
}

#scrollspy .waypoint-demo-section:last-child {
  padding-bottom: 0;
}

#scrollspy .waypoint-demo-section-title {
  margin-top: 0;
}

#scrollspy .waypoint-demo-tab-nav {
  display: flex;
  gap: 0.5rem;
}

#scrollspy .waypoint-demo-tab-nav button {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--vd-text-primary);
  white-space: nowrap;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

#scrollspy .waypoint-demo-tab-nav button:hover {
  color: var(--vd-color-primary);
}

#scrollspy .waypoint-demo-tab-nav button:focus-visible {
  outline: 2px solid var(--vd-color-primary);
  outline-offset: 2px;
}

#scrollspy .waypoint-demo-tab-nav-underline {
  border-bottom: 2px solid var(--vd-border-color);
  padding-bottom: 0;
}

#scrollspy .waypoint-demo-tab-nav-underline button {
  padding: 0.5rem 1rem;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

#scrollspy .waypoint-demo-tab-nav-underline button.is-active {
  color: var(--vd-waypoint-active-color);
  font-weight: 600;
  border-bottom-color: var(--vd-waypoint-active-color);
}

#scrollspy .waypoint-demo-tab-nav-pill {
  flex-wrap: wrap;
}

#scrollspy .waypoint-demo-tab-nav-pill button {
  padding: 0.4rem 1rem;
  border-radius: 999px;
}

#scrollspy .waypoint-demo-tab-nav-pill button.is-active {
  background-color: var(--vd-waypoint-active-color);
  color: #fff;
  font-weight: 600;
}

@media (max-width: 767.98px) {
  #scrollspy .waypoint-demo-layout {
    grid-template-columns: 1fr;
  }

  #scrollspy .waypoint-demo-sidebar-nav {
    width: 100%;
  }

  #scrollspy .waypoint-demo-tab-nav {
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }
}
</style>
