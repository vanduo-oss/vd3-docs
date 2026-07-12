<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import LaunchCustomizerButton from "@/components/LaunchCustomizerButton.vue";

const vue3Usage = `<script setup lang="ts">
import { VdBadge } from "@vanduo-oss/vd3";
<\/script>

<template>
  <VdBadge>Primary</VdBadge>            <!-- default variant is primary -->
  <VdBadge variant="success">Done</VdBadge>
  <VdBadge variant="danger" pill>Blocked</VdBadge>
</template>`;

const vue3Api: [string, string][] = [
  [
    ":variant",
    'primary | secondary | success | warning | danger | info (default "primary"). The bare Vanilla .vd-badge is neutral/secondary, but the Vue component defaults to primary.',
  ],
  [":pill", "Fully-rounded pill shape."],
  ["default slot", "Badge content."],
  [
    "(size / outline)",
    "Vanilla-only via .vd-badge-sm / -lg / -outlined — not exposed as VdBadge props.",
  ],
];

const variantsHtml = `<!-- Default (secondary color) -->
<span class="vd-badge">Default</span>

<span class="vd-badge vd-badge-primary">Primary</span>
<span class="vd-badge vd-badge-secondary">Secondary</span>
<span class="vd-badge vd-badge-success">Success</span>
<span class="vd-badge vd-badge-warning">Warning</span>
<span class="vd-badge vd-badge-danger">Danger</span>
<span class="vd-badge vd-badge-info">Info</span>
<span class="vd-badge vd-badge-light">Light</span>
<span class="vd-badge vd-badge-dark">Dark</span>`;

const pillsHtml = `<!-- Pill badges (fully rounded) -->
<span class="vd-badge vd-badge-pill vd-badge-primary">New</span>

<!-- Outlined badges -->
<span class="vd-badge vd-badge-outlined vd-badge-primary">Pro</span>

<!-- Sizes -->
<span class="vd-badge vd-badge-sm vd-badge-primary">Small</span>
<span class="vd-badge vd-badge-lg vd-badge-primary">Large</span>`;

const positionedHtml = `<!-- Badge on a button -->
<button class="vd-btn vd-btn-primary" style="position:relative;">
  Notifications
  <span class="vd-badge vd-badge-danger"
        style="position:absolute; top:-6px; right:-6px;">3</span>
</button>

<!-- Badge on an icon button -->
<button class="vd-btn vd-btn-icon vd-btn-secondary" style="position:relative;">
  <i class="ph ph-envelope"></i>
  <span class="vd-badge vd-badge-pill vd-badge-primary"
        style="position:absolute; top:-4px; right:-4px;">12</span>
</button>`;

const classRows: [string, string][] = [
  [
    ".vd-badge",
    "Base badge. Inline-block with padding, rounded corners, and centered text.",
  ],
  [".vd-badge-primary", "Primary color background with white text."],
  [".vd-badge-secondary", "Secondary (teal/green) background."],
  [".vd-badge-success", "Green success background."],
  [".vd-badge-warning", "Amber warning background."],
  [
    ".vd-badge-danger",
    'Red danger background — the unified status name (matches Vue variant="danger").',
  ],
  [
    ".vd-badge-error",
    "Retained backward-compatible alias for .vd-badge-danger.",
  ],
  [".vd-badge-info", "Cyan info background."],
  [".vd-badge-light", "Light gray background (inverted in dark mode)."],
  [".vd-badge-dark", "Dark gray background with light text."],
  [".vd-badge-pill", "Fully rounded pill shape (border-radius: 50rem)."],
  [
    ".vd-badge-outlined",
    "Transparent background with colored border and text.",
  ],
  [".vd-badge-sm", "Compact size (font-size: 0.65em)."],
  [".vd-badge-lg", "Large size (font-size: 0.875em)."],
];

const varRows: [string, string][] = [
  ["--vd-badge-padding-y", "0.25em"],
  ["--vd-badge-padding-x", "0.4em (ratio ~phi)"],
  ["--vd-badge-padding-y-sm", "0.15em"],
  ["--vd-badge-padding-x-sm", "0.25em (ratio ~phi)"],
  ["--vd-badge-padding-y-lg", "0.35em"],
  ["--vd-badge-padding-x-lg", "0.55em (ratio ~phi)"],
  ["--vd-badge-font-size", "0.75em"],
  ["--vd-badge-font-weight", "var(--vd-font-weight-semibold)"],
  ["--vd-badge-border-radius", "var(--vd-btn-border-radius-sm)"],
  ["--vd-badge-pill-border-radius", "50rem"],
];
</script>

<template>
  <section id="badges">
    <div class="lcc-demo-head">
      <h5 class="demo-title"><i class="ph ph-tag"></i>Badges</h5>
      <LaunchCustomizerButton component="badge" />
    </div>
    <p class="vd-mb-8">
      Small inline status indicators, counters, and labels. Badges scale with
      their parent font size and support contextual color variants, pill shapes,
      and three size tiers.
    </p>

    <!-- Variants + Pills/Sizes -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Contextual Variants</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 0.75rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <span class="vd-badge">Default</span>
            <span class="vd-badge vd-badge-primary">Primary</span>
            <span class="vd-badge vd-badge-secondary">Secondary</span>
            <span class="vd-badge vd-badge-success">Success</span>
            <span class="vd-badge vd-badge-warning">Warning</span>
            <span class="vd-badge vd-badge-danger">Danger</span>
            <span class="vd-badge vd-badge-info">Info</span>
            <span class="vd-badge vd-badge-light">Light</span>
            <span class="vd-badge vd-badge-dark">Dark</span>
          </div>
        </div>
        <DocCodeSnippet :html="variantsHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Pill, Outlined &amp; Sizes</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">Pill shape</p>
            <div
              style="
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
                margin-bottom: 1rem;
              "
            >
              <span class="vd-badge vd-badge-pill vd-badge-primary">New</span>
              <span class="vd-badge vd-badge-pill vd-badge-success">Done</span>
              <span class="vd-badge vd-badge-pill vd-badge-danger"
                >Blocked</span
              >
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Outlined</p>
            <div
              style="
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
                margin-bottom: 1rem;
              "
            >
              <span class="vd-badge vd-badge-outlined vd-badge-primary"
                >Pro</span
              >
              <span class="vd-badge vd-badge-outlined vd-badge-warning"
                >Beta</span
              >
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Sizes</p>
            <div
              style="
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
                align-items: center;
              "
            >
              <span class="vd-badge vd-badge-sm vd-badge-primary">Small</span>
              <span class="vd-badge vd-badge-primary">Default</span>
              <span class="vd-badge vd-badge-lg vd-badge-primary">Large</span>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="pillsHtml" />
      </div>
    </div>

    <!-- Positioned -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Positioned Badges (Buttons &amp; Icons)</h6>
          </div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1.5rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <button class="vd-btn vd-btn-primary" style="position: relative">
              Notifications
              <span
                class="vd-badge vd-badge-danger"
                style="position: absolute; top: -6px; right: -6px"
                >3</span
              >
            </button>
            <button
              class="vd-btn vd-btn-icon vd-btn-secondary"
              style="position: relative"
            >
              <i class="ph ph-envelope"></i>
              <span
                class="vd-badge vd-badge-pill vd-badge-primary"
                style="position: absolute; top: -4px; right: -4px"
                >12</span
              >
            </button>
            <span style="position: relative; display: inline-block">
              <i class="ph ph-shopping-cart" style="font-size: 1.5rem"></i>
              <span
                class="vd-badge vd-badge-sm vd-badge-success vd-badge-pill"
                style="position: absolute; top: -4px; right: -8px"
                >New</span
              >
            </span>
          </div>
        </div>
        <DocCodeSnippet :html="positionedHtml" />
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
            <h4>Usage</h4>
            <DocCodeSnippet :html="vue3Usage" :default-open="true" />

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

            <h4 class="vd-mt-6">Component API (Vue 3)</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Prop / slot</th>
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

            <h4 class="vd-mt-6">CSS Variables</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in varRows" :key="row[0]">
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
                Badges are inline elements; ensure they are placed inside a
                parent with sufficient text context.
              </li>
              <li>
                For counter badges (e.g., "3" on a notification bell), wrap the
                parent button in an <code>aria-label</code> that includes the
                count: <code>aria-label="Notifications, 3 unread"</code>.
              </li>
              <li>
                All badge color combinations meet WCAG contrast requirements
                against both light and dark backgrounds.
              </li>
              <li>
                Avoid using badges alone to convey critical status — pair with
                text or tooltips.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
