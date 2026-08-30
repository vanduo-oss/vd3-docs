<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useTooltips } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useTooltips(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useTooltips } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);

// wires [data-tooltip] inside root; cleanup on unmount
useTooltips(root);

// …or dwell 520ms before showing (dock and toolbar chrome)
useTooltips(root, { showDelay: 520 });`;

const vue3Api: [string, string][] = [
  [
    "useTooltips(root, options?)",
    "Composable — wires every [data-tooltip] / [data-tooltip-html] element inside the root ref. Call once in setup().",
  ],
  [
    "options.showDelay",
    "Hover dwell in ms before a tooltip appears. Default 0 (immediate). Any trigger can override it with data-tooltip-delay.",
  ],
  [
    "(dynamic triggers)",
    "The root is watched with a MutationObserver, so triggers added, removed, or re-attributed after mount bind themselves — no manual rescan.",
  ],
  [
    "(automatic cleanup)",
    "Hover listeners, the observer, and the tooltip node are removed on component unmount.",
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

const delayHtml = `<!-- Composable default: useTooltips(root, { showDelay: 520 }) -->

<!-- Per-trigger override wins over the composable default -->
<button data-tooltip="Immediate" data-tooltip-delay="0">0ms</button>
<button data-tooltip="Waited 520ms" data-tooltip-delay="520">520ms</button>

<!-- Dock chrome: denser frost, --vd-tooltip-dock-* custom properties -->
<button data-tooltip="Dock chrome frost"
        data-tooltip-variant="dock"
        data-tooltip-delay="520">
  Dock variant
</button>`;

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
  [
    "--vd-tooltip-dock-bg",
    "color-mix(in srgb, #12141a 78%, transparent)",
    "Dock variant background (flips to a frosted white in light schemes)",
  ],
  ["--vd-tooltip-dock-color", "#f4f4f5", "Dock variant text color"],
  [
    "--vd-tooltip-dock-border",
    "color-mix(in srgb, #fff 22%, transparent)",
    "Dock variant border",
  ],
  [
    "--vd-tooltip-dock-shadow",
    "drop + inset highlight",
    "Dock variant elevation; the arrow reuses --vd-tooltip-dock-bg",
  ],
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
  [
    ".vd-tooltip-dock",
    "Denser frost than glass, sized for icon-only dock and toolbar chrome. Follows the color scheme (ink in dark, frosted white in light) and cancels the per-placement arrow margin, since useTooltips already positions with a gap.",
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
    "Plain text content for the tooltip. Wired by useTooltips(root).",
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
    'data-tooltip-variant="light|dark|glass|dock"',
    "Visual style variant. Default: standard (white). dock is the chrome variant.",
  ],
  ['data-tooltip-size="sm|lg"', "Size modifier. Default: medium."],
  [
    'data-tooltip-delay="520"',
    "Per-trigger hover dwell in ms, overriding the composable's showDelay. Ignored if it is not a non-negative integer.",
  ],
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
          <div class="vd-card-header">
            <h6>Show delay &amp; the dock variant</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Immediate tooltips are noisy on chrome you sweep across — a dock,
              a toolbar — so <code>useTooltips</code> takes a
              <code>showDelay</code> and any trigger can override it with
              <code>data-tooltip-delay</code>. This page wires the composable at
              its default (0ms), so the first two buttons below get their dwell
              from the attribute alone. Pair the delay with
              <code>data-tooltip-variant="dock"</code> for the denser frost that
              reads over ink chrome — the site dock at the edge of this window
              uses exactly this combination at 520ms.
            </p>
            <div
              style="
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                min-height: 100px;
              "
            >
              <button
                class="vd-btn vd-btn-outline"
                data-tooltip="Immediate — no dwell"
              >
                0ms
              </button>
              <button
                class="vd-btn vd-btn-outline"
                data-tooltip="Waited 520ms before showing"
                data-tooltip-delay="520"
              >
                520ms
              </button>
              <button
                class="vd-btn vd-btn-outline"
                data-tooltip="Dock chrome frost"
                data-tooltip-variant="dock"
                data-tooltip-delay="520"
              >
                Dock variant
              </button>
            </div>
            <DocCodeSnippet class="vd-mt-4" :html="delayHtml" />
          </div>
        </div>
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
            <DocCodeSnippet :js="vue3Wiring" :default-open="true" />

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
