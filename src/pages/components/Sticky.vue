<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useAffix } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useAffix(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useAffix } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useAffix(root);   // wires .vd-affix / [data-vd-affix] inside root; cleanup on unmount

// react to pin / unpin
root.value?.addEventListener('affix:stuck', () => { /* … */ });`;

const vanillaWiring = `// Wire every affix element (document, or a root element)
VanduoAffix.init();

// tear one down
VanduoAffix.destroy(affixEl);`;

const vue3Api: [string, string][] = [
  [
    "useAffix(root)",
    "Composable — wires every .vd-affix / [data-vd-affix] inside the root ref; toggles .is-stuck via a sentinel + IntersectionObserver. Call once in setup().",
  ],
  [
    "(automatic cleanup)",
    "The observer and generated sentinel are removed on component unmount.",
  ],
];

const offsetHtml = `<div
  class="vd-affix vd-affix-bordered"
  data-vd-affix
  data-vd-affix-offset="60">
  <p>I stick 60px below the top of my scroll container</p>
</div>`;

const cssClasses: [string, string][] = [
  [
    ".vd-affix",
    "Base class for affix-enabled elements. Pairs with data-vd-affix.",
  ],
  [
    ".vd-sticky",
    "Alias for .vd-affix. It participates in the same JS-driven affix behavior.",
  ],
  [
    ".is-stuck",
    "Applied automatically while the element is pinned inside its active scroll context.",
  ],
  [
    ".vd-affix-no-shadow",
    "Modifier that removes the default box-shadow applied in the stuck state.",
  ],
  [
    ".vd-affix-bordered",
    "Modifier that adds a subtle bottom border instead of a shadow when stuck.",
  ],
];

const dataAttrs: [string, string][] = [
  [
    "data-vd-affix",
    "Enables the affix behavior on the element. Detected by VanduoAffix.init().",
  ],
  [
    "data-vd-affix-offset",
    "Distance in pixels from the top of the nearest scrollable container, or the viewport when no scrollable parent exists. Defaults to 0.",
  ],
];

const jsMethods: [string, string][] = [
  [
    "VanduoAffix.init()",
    "Scans the DOM for affix elements, detects their nearest scrollable parent, and sets up IntersectionObserver sentinels.",
  ],
  [
    "VanduoAffix.destroy(el)",
    "Removes the observer, the .is-stuck class, and the generated sentinel element.",
  ],
];

const events: [string, string][] = [
  [
    "affix:stuck",
    "Fired on the element when it becomes pinned. event.detail includes the offset and active root.",
  ],
  [
    "affix:unstuck",
    "Fired on the element when it returns to its natural position.",
  ],
];
</script>

<template>
  <section id="sticky" ref="root">
    <h5 class="demo-title"><i class="ph ph-push-pin"></i>Sticky / Affix</h5>
    <p class="vd-mb-8">
      Pin elements inside the nearest scrollable container as the user scrolls.
      If no scrollable parent exists, the element falls back to the viewport.
    </p>

    <!-- Sticky Navigation Bar Demo -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div id="demo-sticky-nav" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-navigation-arrow"></i> Sticky Navigation Bar
            </h6>
          </div>
          <div class="vd-card-body">
            <div
              style="
                position: relative;
                height: 280px;
                overflow-y: auto;
                border: 1px solid var(--vd-border-color);
                border-radius: var(--vd-radius-fib-5);
                padding: 0;
              "
            >
              <div
                style="
                  padding: 1rem 1.25rem;
                  background: var(--vd-bg-secondary);
                "
              >
                <p class="vd-text-sm vd-text-muted">
                  Scroll down inside this container to see the sticky bar pin
                  itself. The component automatically uses this panel as its
                  scroll context.
                </p>
              </div>
              <div style="padding: 1.25rem">
                <p class="vd-text-sm vd-text-muted">
                  Place content before the affix element so it can scroll
                  naturally into position, then let <code>VanduoAffix</code>
                  pin it within the nearest scrollable parent.
                </p>
                <p class="vd-text-sm vd-text-muted vd-mt-3">
                  If you drop the same markup into a normal page without an
                  overflow container, it will stick against the browser viewport
                  instead.
                </p>
              </div>
              <nav
                class="vd-affix vd-affix-bordered"
                data-vd-affix
                data-vd-affix-offset="0"
                style="
                  background: var(--vd-card-bg);
                  padding: 0.75rem 1.25rem;
                  border-bottom: 1px solid var(--vd-border-color);
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                  z-index: 10;
                "
              >
                <strong style="color: var(--vd-color-primary)"
                  ><i class="ph ph-compass"></i> Nav</strong
                >
                <a href="#" class="vd-text-sm" @click.prevent>Home</a>
                <a href="#" class="vd-text-sm" @click.prevent>Features</a>
                <a href="#" class="vd-text-sm" @click.prevent>Pricing</a>
                <a href="#" class="vd-text-sm" @click.prevent>Contact</a>
              </nav>
              <div style="padding: 1.25rem">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p class="vd-mt-4">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p class="vd-mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
                <p class="vd-mt-4">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </p>
                <p class="vd-mt-4">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </p>
                <p class="vd-mt-4">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt.
                </p>
                <p class="vd-mt-4">
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit, sed quia non numquam eius
                  modi tempora incidunt ut labore et dolore magnam aliquam
                  quaerat voluptatem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky with Custom Offset -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-sticky-offset" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-arrows-vertical"></i> Custom Offset</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-4">
              Use <code>data-vd-affix-offset</code> to control when the element
              becomes stuck. The value is the distance in pixels from the top of
              the active scroll context.
            </p>
            <DocCodeSnippet :html="offsetHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-sticky-variants" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-paint-brush"></i> Style Variants</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-4">
              Combine modifier classes to fine-tune the look when the element
              becomes stuck.
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem">
              <div
                class="vd-affix-bordered"
                style="
                  padding: 0.5rem 1rem;
                  border-radius: var(--vd-radius-fib-5);
                  border: 1px solid var(--vd-border-color);
                "
              >
                <code>.vd-affix-bordered</code> — adds a bottom border when
                stuck
              </div>
              <div
                class="vd-affix-no-shadow"
                style="
                  padding: 0.5rem 1rem;
                  border-radius: var(--vd-radius-fib-5);
                  background: var(--vd-bg-secondary);
                "
              >
                <code>.vd-affix-no-shadow</code> — suppresses the default drop
                shadow
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>API Reference</h6></div>
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
                    <td>{{ row[1] }}</td>
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
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-wheelchair"></i> Accessibility</h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>
                Sticky elements do not trap focus — keyboard navigation
                continues naturally past them.
              </li>
              <li>
                The auto-generated placeholder prevents content from jumping,
                avoiding disorientation for screen magnifier users.
              </li>
              <li>
                Use <code>aria-label</code> on sticky navigation to distinguish
                it from the main page nav (e.g.
                <code>aria-label="Sticky toolbar"</code>).
              </li>
              <li>
                Stuck state changes are visual-only; ensure the element's
                purpose is clear without relying on position.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
