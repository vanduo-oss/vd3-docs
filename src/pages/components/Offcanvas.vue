<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useSidenav } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useSidenav(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useSidenav } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useSidenav(root);   // wires [data-sidenav-toggle] triggers; cleanup on unmount`;

const vanillaWiring = `// Wire every [data-sidenav-toggle] trigger (document, or a root element)
VanduoSidenav.init();

// control programmatically
VanduoSidenav.open(offcanvasEl);
VanduoSidenav.close(offcanvasEl);`;

const vue3Api: [string, string][] = [
  [
    "useSidenav(root)",
    "Composable — wires every [data-sidenav-toggle] trigger inside the root ref (overlay, close button, ESC, scroll-lock). Call once in setup().",
  ],
  [
    "(automatic cleanup)",
    "Listeners and the body overlay are removed on component unmount.",
  ],
];

const topHtml = `<!-- Top offcanvas panel -->
<button data-sidenav-toggle="#offcanvas-top">
  Open Top
</button>

<aside class="vd-offcanvas vd-offcanvas-top"
       id="offcanvas-top"
       data-vd-position="top">
  <div class="vd-sidenav-header">
    <h3 class="vd-sidenav-title">Top Panel</h3>
    <button class="vd-sidenav-close">&times;</button>
  </div>
  <div class="vd-sidenav-body">...</div>
</aside>`;

const bottomHtml = `<!-- Bottom offcanvas panel -->
<aside class="vd-offcanvas vd-offcanvas-bottom"
       data-vd-position="bottom">
  ...
</aside>`;

const dataPosHtml = `<!-- Direction via data attribute only -->
<aside class="vd-offcanvas" data-vd-position="top">...</aside>
<aside class="vd-offcanvas" data-vd-position="right">...</aside>
<aside class="vd-offcanvas" data-vd-position="bottom">...</aside>
<aside class="vd-offcanvas" data-vd-position="left">...</aside>`;

const cssClasses: [string, string, string][] = [
  [
    ".vd-offcanvas",
    "Base offcanvas panel — extends .vd-sidenav behaviour",
    "Base",
  ],
  [".vd-offcanvas-top", "Slide from the top edge (full-width)", "Modifier"],
  [
    ".vd-offcanvas-bottom",
    "Slide from the bottom edge (full-width)",
    "Modifier",
  ],
  [".vd-offcanvas-right", "Slide from the right edge", "Modifier"],
  [".vd-sidenav-top", "Legacy alias for .vd-offcanvas-top", "Modifier"],
  [".vd-sidenav-bottom", "Legacy alias for .vd-offcanvas-bottom", "Modifier"],
  [".is-open", "Applied when the panel is visible", "State"],
];

const dataAttrs: [string, string, string][] = [
  [
    "data-vd-position",
    "Set slide direction: top, right, bottom, or left",
    "left",
  ],
  [
    "data-sidenav-toggle",
    'Place on trigger element — value is the selector for the offcanvas (e.g. "#my-panel")',
    "—",
  ],
];

const jsMethods: [string, string][] = [
  ["VanduoSidenav.open(el)", "Open the offcanvas panel programmatically"],
  ["VanduoSidenav.close(el)", "Close the offcanvas panel programmatically"],
  ["VanduoSidenav.toggle(el)", "Toggle the offcanvas panel open or closed"],
];

const events: [string, string, string][] = [
  [
    "sidenav:open",
    "Fired on the offcanvas element after it becomes visible",
    "{ position }",
  ],
  [
    "sidenav:close",
    "Fired on the offcanvas element after it is hidden",
    "{ position }",
  ],
];
</script>

<template>
  <section id="offcanvas" ref="root">
    <h5 class="demo-title"><i class="ph ph-arrows-out"></i>Offcanvas</h5>
    <p class="vd-mb-8">
      Extend the Sidenav into a full offcanvas panel that slides in from any
      edge. Uses the existing <code>VanduoSidenav</code> API with positional
      modifiers.
    </p>

    <!-- Left + Right -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-offcanvas-left" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Left (Default)</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <button
              class="vd-btn vd-btn-primary"
              data-sidenav-toggle="#offcanvas-left-demo"
            >
              <i class="ph ph-arrow-line-left mr-2"></i>Open Left
            </button>
          </div>
        </div>
        <aside class="vd-offcanvas" id="offcanvas-left-demo">
          <div class="vd-sidenav-header">
            <h4 class="vd-sidenav-title">Left Panel</h4>
            <button class="vd-sidenav-close" aria-label="Close">&times;</button>
          </div>
          <div class="vd-sidenav-body">
            <p>Default offcanvas slides in from the left edge.</p>
          </div>
        </aside>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-offcanvas-right" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Right</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <button
              class="vd-btn vd-btn-primary"
              data-sidenav-toggle="#offcanvas-right-demo"
            >
              Open Right<i class="ph ph-arrow-line-right ml-2"></i>
            </button>
          </div>
        </div>
        <aside
          class="vd-offcanvas vd-offcanvas-right"
          id="offcanvas-right-demo"
          data-vd-position="right"
        >
          <div class="vd-sidenav-header">
            <h4 class="vd-sidenav-title">Right Panel</h4>
            <button class="vd-sidenav-close" aria-label="Close">&times;</button>
          </div>
          <div class="vd-sidenav-body">
            <p>
              Add <code>.vd-offcanvas-right</code> or
              <code>data-vd-position="right"</code>.
            </p>
          </div>
        </aside>
      </div>
    </div>

    <!-- Top + Bottom -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-offcanvas-top" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Top</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <button
              class="vd-btn vd-btn-outline-primary"
              data-sidenav-toggle="#offcanvas-top-demo"
            >
              <i class="ph ph-arrow-line-up mr-2"></i>Open Top
            </button>
          </div>
        </div>
        <aside
          class="vd-offcanvas vd-offcanvas-top vd-sidenav-top"
          id="offcanvas-top-demo"
          data-vd-position="top"
        >
          <div class="vd-sidenav-header">
            <h4 class="vd-sidenav-title">Top Panel</h4>
            <button class="vd-sidenav-close" aria-label="Close">&times;</button>
          </div>
          <div class="vd-sidenav-body">
            <p>
              Full-width panel sliding down from the top edge — great for search
              overlays or notification trays.
            </p>
          </div>
        </aside>
        <DocCodeSnippet :html="topHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-offcanvas-bottom" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Bottom</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <button
              class="vd-btn vd-btn-outline-primary"
              data-sidenav-toggle="#offcanvas-bottom-demo"
            >
              <i class="ph ph-arrow-line-down mr-2"></i>Open Bottom
            </button>
          </div>
        </div>
        <aside
          class="vd-offcanvas vd-offcanvas-bottom vd-sidenav-bottom"
          id="offcanvas-bottom-demo"
          data-vd-position="bottom"
        >
          <div class="vd-sidenav-header">
            <h4 class="vd-sidenav-title">Bottom Panel</h4>
            <button class="vd-sidenav-close" aria-label="Close">&times;</button>
          </div>
          <div class="vd-sidenav-body">
            <p>
              Full-width panel sliding up from the bottom — ideal for mobile
              action sheets.
            </p>
          </div>
        </aside>
        <DocCodeSnippet :html="bottomHtml" />
      </div>
    </div>

    <!-- data-vd-position -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-offcanvas-data" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Using <code>data-vd-position</code></h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-4">
              You can set the slide direction entirely through the
              <code>data-vd-position</code> attribute instead of adding
              directional CSS classes. The JS reads this attribute at init time
              and applies the correct transform.
            </p>
            <DocCodeSnippet :html="dataPosHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div id="demo-offcanvas-api" class="vd-card vd-card-glow demo-card">
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
            Offcanvas uses <code>role="dialog"</code> and
            <code>aria-modal="true"</code> when open
          </li>
          <li>
            Close button includes <code>aria-label="Close"</code> for assistive
            technology
          </li>
          <li>
            Focus is trapped within the panel while open and returned to the
            trigger on close
          </li>
          <li>Pressing <kbd>Escape</kbd> closes the offcanvas panel</li>
          <li>Overlay backdrop blocks interaction with the page beneath</li>
          <li>
            The trigger button uses <code>aria-expanded</code> reflecting
            open/closed state
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
