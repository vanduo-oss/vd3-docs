<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useTooltips } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useTooltips(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useTooltips } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useTooltips(root);   // wires [data-tooltip] inside root; cleanup on unmount`;

const vanillaWiring = `// Wire every [data-tooltip] element (document, or a root element)
VanduoTooltips.init();

// show / hide programmatically
VanduoTooltips.show(el);
VanduoTooltips.hide(el);`;

const vue3Api: [string, string][] = [
  [
    "useTooltips(root)",
    "Composable — wires every [data-tooltip] / [data-tooltip-html] element inside the root ref. Call once in setup().",
  ],
  [
    "(automatic cleanup)",
    "Hover listeners and the tooltip node are removed on component unmount.",
  ],
];

const placementsHtml = `<!-- Placement via data attribute -->
<button class="vd-btn"
        data-tooltip="Tooltip on top"
        data-tooltip-placement="top">
  Top
</button>

<button class="vd-btn"
        data-tooltip="Tooltip on bottom"
        data-tooltip-placement="bottom">
  Bottom
</button>

<button class="vd-btn" data-tooltip="Tooltip on left" data-tooltip-placement="left">Left</button>
<button class="vd-btn" data-tooltip="Tooltip on right" data-tooltip-placement="right">Right</button>`;

const variantsHtml = `<!-- Color variants -->
<button data-tooltip="Default tooltip">Default</button>
<button data-tooltip="Dark tooltip" data-tooltip-variant="dark">Dark</button>
<button data-tooltip="Light tooltip" data-tooltip-variant="light">Light</button>
<button data-tooltip="Glass tooltip" data-tooltip-variant="glass">Glass</button>

<!-- Size variants -->
<button data-tooltip="Small tooltip" data-tooltip-size="sm">Small</button>
<button data-tooltip="Large tooltip" data-tooltip-size="lg">Large</button>`;

const htmlContentHtml = `<!-- HTML content tooltip -->
<button class="vd-btn vd-btn-outline-primary"
        data-tooltip-html="<div class='vd-text-sm vd-font-semibold'>Quick Tip</div>
<div class='vd-text-xs vd-mt-1'>Use <kbd>Ctrl+K</kbd> to open search.</div>">
  Rich Tooltip
</button>`;

const cssVars: [string, string, string][] = [
  ["--vd-tooltip-bg", "var(--vd-color-white)", "Default tooltip background"],
  [
    "--vd-tooltip-bg-light",
    "var(--vd-color-gray-100)",
    "Light variant background",
  ],
  [
    "--vd-tooltip-bg-dark",
    "var(--vd-color-gray-900)",
    "Dark variant background",
  ],
  ["--vd-tooltip-text-color", "var(--vd-color-gray-900)", "Default text color"],
  [
    "--vd-tooltip-text-color-light",
    "var(--vd-color-gray-800)",
    "Light variant text",
  ],
  [
    "--vd-tooltip-text-color-dark",
    "var(--vd-color-white)",
    "Dark variant text",
  ],
  ["--vd-tooltip-padding-y", "0.5rem (8px)", "Vertical padding (Fibonacci)"],
  [
    "--vd-tooltip-padding-x",
    "0.8125rem (13px)",
    "Horizontal padding (Fibonacci, ratio ~phi)",
  ],
  ["--vd-tooltip-arrow-size", "5px", "Arrow dimensions (Fibonacci)"],
  ["--vd-tooltip-max-width", "233px", "Max width (Fibonacci)"],
  ["--vd-tooltip-z-index", "1070", "Stacking above most components"],
];

const classRows: [string, string][] = [
  [
    ".vd-tooltip",
    "Base tooltip element. Positioned absolutely with arrow, shadow, and max-width.",
  ],
  [
    '.vd-tooltip-top / [data-placement="top"]',
    "Tooltip appears above the trigger.",
  ],
  [
    '.vd-tooltip-bottom / [data-placement="bottom"]',
    "Tooltip appears below the trigger.",
  ],
  [
    '.vd-tooltip-left / [data-placement="left"]',
    "Tooltip appears to the left.",
  ],
  [
    '.vd-tooltip-right / [data-placement="right"]',
    "Tooltip appears to the right.",
  ],
  [".vd-tooltip-light", "Light gray background with dark text."],
  [".vd-tooltip-dark", "Dark background with white text."],
  [
    ".vd-tooltip-glass",
    "Frosted glass background with blur and translucent border.",
  ],
  [".vd-tooltip-sm", "Compact padding and smaller font."],
  [".vd-tooltip-lg", "More spacious padding and larger font."],
  [".vd-tooltip-html", "Allows HTML content inside the tooltip body."],
  [
    ".vd-tooltip-wrapper",
    "Optional inline-block wrapper for positioning context.",
  ],
];

const dataAttrs: [string, string][] = [
  [
    'data-tooltip="text"',
    "Plain text content for the tooltip. Auto-initialized by Vanduo.init().",
  ],
  [
    'data-tooltip-html="HTML"',
    "HTML content for the tooltip. Escaped automatically if the attribute contains plain text with entities.",
  ],
  [
    'data-tooltip-placement="top|bottom|left|right"',
    "Tooltip position relative to the trigger. Default: top.",
  ],
  [
    'data-tooltip-variant="light|dark|glass"',
    "Visual style variant. Default: standard (white).",
  ],
  ['data-tooltip-size="sm|lg"', "Size modifier. Default: medium."],
];

const jsMethods: [string, string][] = [
  [
    "VanduoTooltips.init()",
    "Scans for [data-tooltip] and [data-tooltip-html] elements and wires hover events.",
  ],
  [
    "VanduoTooltips.show(el)",
    "Programmatically show a tooltip for an initialized element.",
  ],
  [
    "VanduoTooltips.hide(el)",
    "Hide the tooltip currently attached to the element.",
  ],
  ["VanduoTooltips.destroy(el)", "Remove tooltip listeners from the element."],
];
</script>

<template>
  <section id="tooltips" ref="root">
    <h5 class="demo-title"><i class="ph ph-chat-centered"></i>Tooltips</h5>
    <p class="vd-mb-8">
      Contextual hover overlays that display supplementary information. Tooltips
      support four directional placements (top, bottom, left, right),
      light/dark/glass variants, size tiers, and HTML content. All positioning
      and visibility are handled via data attributes and CSS — minimal
      JavaScript is required for initialization.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Placements</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              min-height: 120px;
            "
          >
            <button
              class="vd-btn vd-btn-outline"
              data-tooltip="Tooltip on top"
              data-tooltip-placement="top"
            >
              Top
            </button>
            <button
              class="vd-btn vd-btn-outline"
              data-tooltip="Tooltip on bottom"
              data-tooltip-placement="bottom"
            >
              Bottom
            </button>
            <button
              class="vd-btn vd-btn-outline"
              data-tooltip="Tooltip on left"
              data-tooltip-placement="left"
            >
              Left
            </button>
            <button
              class="vd-btn vd-btn-outline"
              data-tooltip="Tooltip on right"
              data-tooltip-placement="right"
            >
              Right
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="placementsHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Variants &amp; Sizes</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              min-height: 120px;
            "
          >
            <button
              class="vd-btn vd-btn-primary"
              data-tooltip="Default tooltip"
            >
              Default
            </button>
            <button
              class="vd-btn vd-btn-outline"
              data-tooltip="Dark tooltip"
              data-tooltip-variant="dark"
            >
              Dark
            </button>
            <button
              class="vd-btn vd-btn-outline"
              data-tooltip="Light tooltip"
              data-tooltip-variant="light"
            >
              Light
            </button>
            <button
              class="vd-btn vd-btn-outline"
              data-tooltip="Glass tooltip with backdrop blur"
              data-tooltip-variant="glass"
            >
              Glass
            </button>
          </div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              border-top: 1px solid var(--vd-border-color);
            "
          >
            <button
              class="vd-btn vd-btn-sm vd-btn-outline"
              data-tooltip="Small tooltip"
              data-tooltip-size="sm"
            >
              Small
            </button>
            <button
              class="vd-btn vd-btn-outline"
              data-tooltip="Default tooltip"
            >
              Default
            </button>
            <button
              class="vd-btn vd-btn-lg vd-btn-outline"
              data-tooltip="Large tooltip with more padding"
              data-tooltip-size="lg"
            >
              Large
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="variantsHtml" />
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>HTML Content</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              min-height: 120px;
            "
          >
            <button
              class="vd-btn vd-btn-outline-primary"
              data-tooltip-html="<div class='vd-text-sm vd-font-semibold'>Quick Tip</div><div class='vd-text-xs vd-mt-1'>Use <kbd>Ctrl+K</kbd> to open search.</div>"
            >
              Rich Tooltip
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="htmlContentHtml" />
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
                  <tr v-for="row in cssVars" :key="row[0]">
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
                  <tr v-for="row in classRows" :key="row[0]">
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
            <div class="vd-alert vd-alert-info vd-mt-4">
              <i class="ph ph-shield-check"></i>
              <div>
                v1.4.1 sanitizes tooltip HTML with inline styles disabled by
                default for framework call sites. Prefer
                <code>data-tooltip</code> for user-provided text and reserve
                <code>data-tooltip-html</code> for trusted markup.
              </div>
            </div>
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
                Tooltips should not contain critical information — ensure the
                same content is available via visible text or an
                <code>aria-label</code> on the trigger.
              </li>
              <li>
                For keyboard users, tooltips should appear on
                <code>focus</code> and hide on <code>blur</code>, not just on
                hover.
              </li>
              <li>
                Use <code>aria-describedby</code> on the trigger pointing to the
                tooltip element so screen readers announce the tooltip content
                when focus lands on it.
              </li>
              <li>
                Tooltips with interactive content (links, buttons) should use a
                popover or modal instead — tooltips are not focus traps.
              </li>
              <li>
                Avoid tooltips that exceed <code>--vd-tooltip-max-width</code>
                with large amounts of text. Break complex content into shorter
                lines or use a popover.
              </li>
              <li>
                Ensure sufficient color contrast for all variant combinations
                (dark-on-light, light-on-dark, glass text on varying
                backgrounds).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
