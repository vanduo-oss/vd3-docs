<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import LaunchCustomizerButton from "@/components/LaunchCustomizerButton.vue";

const vue3Usage = `<script setup lang="ts">
import { VdButton } from "@vanduo-oss/vd3";
const saving = ref(false);
<\/script>

<template>
  <VdButton variant="primary" @click="save">Primary</VdButton>
  <VdButton variant="danger" size="sm">Delete</VdButton>
  <VdButton variant="ghost" :loading="saving">Save</VdButton>
  <VdButton variant="primary" ring>Checkout</VdButton>
</template>`;

const vue3Api: [string, string][] = [
  [
    ":variant",
    'primary | secondary | success | warning | danger | info, or "ghost" (default "primary").',
  ],
  [":size", 'sm | md | lg (default "md").'],
  [
    ":loading",
    "Shows a spinner and blocks clicks (adds .is-loading and a .vd-btn-spinner child; label is blanked).",
  ],
  [":disabled", "Disables the button."],
  [
    ":ring",
    "Draws a detached outer ring around the button (adds .vd-btn-ring). Layers on any variant and size; default false.",
  ],
  [":type", 'button | submit | reset (default "button").'],
  ["@click", "Emitted on click (suppressed while disabled or loading)."],
  [
    "(outline / ghost-colour / icon)",
    "CSS-only classes (.vd-btn-outline, .vd-btn-ghost-primary…, .vd-btn-icon) that ship in vd3's CSS — not wrapped as VdButton props.",
  ],
];

const variantsHtml = `<button class="vd-btn vd-btn-primary">Primary</button>
<button class="vd-btn vd-btn-secondary">Secondary</button>
<button class="vd-btn vd-btn-success">Success</button>
<button class="vd-btn vd-btn-warning">Warning</button>
<button class="vd-btn vd-btn-danger">Danger</button>
<button class="vd-btn vd-btn-info">Info</button>
<button class="vd-btn vd-btn-outline">Outline</button>
<button class="vd-btn vd-btn-outline-primary">Outline Primary</button>
<button class="vd-btn vd-btn-outline-secondary">Outline Secondary</button>`;

const variantsCss = `.vd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--vd-btn-padding-y) var(--vd-btn-padding-x);
  font-weight: var(--vd-font-weight-medium);
  border-radius: var(--vd-btn-border-radius);
  cursor: pointer;
  transition: all 0.15s ease;
}

.vd-btn-primary {
  background-color: var(--vd-color-primary);
  color: var(--vd-color-white);
}`;

const sizesHtml = `<button class="vd-btn vd-btn-primary vd-btn-sm">Small</button>
<button class="vd-btn vd-btn-primary">Default</button>
<button class="vd-btn vd-btn-primary vd-btn-lg">Large</button>
<button class="vd-btn vd-btn-primary vd-btn-block">Block Button</button>`;

const sizesCss = `.vd-btn-sm {
  padding: var(--vd-btn-padding-y-sm) var(--vd-btn-padding-x-sm);
  font-size: var(--vd-font-size-sm);
}

.vd-btn-lg {
  padding: var(--vd-btn-padding-y-lg) var(--vd-btn-padding-x-lg);
  font-size: var(--vd-font-size-lg);
}

.vd-btn-block {
  display: flex;
  width: 100%;
}`;

const ghostHtml = `<button class="vd-btn vd-btn-ghost">Ghost</button>
<button class="vd-btn vd-btn-ghost-primary">Ghost Primary</button>
<button class="vd-btn vd-btn-ghost-secondary">Ghost Secondary</button>
<button class="vd-btn vd-btn-ghost-success">Ghost Success</button>
<button class="vd-btn vd-btn-ghost-error">Ghost Error</button>
<button class="vd-btn vd-btn-ghost-subtle">Ghost Subtle</button>`;

const ringHtml = `<button class="vd-btn vd-btn-primary vd-btn-ring">Primary</button>
<button class="vd-btn vd-btn-success vd-btn-ring">Success</button>
<button class="vd-btn vd-btn-danger vd-btn-ring">Danger</button>
<button class="vd-btn vd-btn-outline vd-btn-ring">Outline</button>
<button class="vd-btn vd-btn-ghost-primary vd-btn-ring">Ghost</button>

<button class="vd-btn vd-btn-primary vd-btn-ring vd-btn-sm">Small</button>
<button class="vd-btn vd-btn-primary vd-btn-ring">Default</button>
<button class="vd-btn vd-btn-primary vd-btn-ring vd-btn-lg">Large</button>`;

const ringCss = `/* The ring is drawn on ::before, outside the border box, so the
 * gap is real transparency — it works on cards, glass and imagery.
 * Retune it with the custom properties rather than overriding rules.
 * The stroke is px (a hairline is physical, not typographic); the
 * gap is rem, so it scales with your type scale. */
.vd-btn-ring {
  --vd-btn-ring-width: 2px;
  --vd-btn-ring-gap: 0.25rem;     /* 4px - fib */
  --vd-btn-ring-color: currentcolor;
}`;

const iconHtml = `<button class="vd-btn vd-btn-icon vd-btn-primary" aria-label="Add item"><i class="ph ph-plus"></i></button>
<button class="vd-btn vd-btn-icon vd-btn-secondary" aria-label="Edit"><i class="ph ph-pencil-simple"></i></button>
<button class="vd-btn vd-btn-icon vd-btn-success" aria-label="Confirm"><i class="ph ph-check"></i></button>
<button class="vd-btn vd-btn-icon vd-btn-danger" aria-label="Delete"><i class="ph ph-trash"></i></button>
<button class="vd-btn vd-btn-icon vd-btn-outline" aria-label="More options"><i class="ph ph-dots-three"></i></button>`;

const loadingHtml = `<button class="vd-btn vd-btn-primary is-loading" aria-busy="true">
  <span class="vd-btn-spinner" aria-hidden="true"></span>
  Loading
</button>
<button class="vd-btn vd-btn-primary vd-btn-sm is-loading" aria-busy="true">
  <span class="vd-btn-spinner" aria-hidden="true"></span>
  Small
</button>
<button class="vd-btn vd-btn-outline is-loading" aria-busy="true">
  <span class="vd-btn-spinner" aria-hidden="true"></span>
  Outline
</button>`;

interface ClassRef {
  cls: string;
  desc: string;
  type: string;
}
const classRef: ClassRef[] = [
  {
    cls: ".vd-btn",
    desc: "Base button class — required on all buttons",
    type: "Base",
  },
  { cls: ".vd-btn-primary", desc: "Primary action color", type: "Variant" },
  {
    cls: ".vd-btn-secondary",
    desc: "Secondary/neutral action color",
    type: "Variant",
  },
  {
    cls: ".vd-btn-success",
    desc: "Success/positive action color",
    type: "Variant",
  },
  {
    cls: ".vd-btn-warning",
    desc: "Warning/caution action color",
    type: "Variant",
  },
  {
    cls: ".vd-btn-danger",
    desc: 'Danger/destructive action color — unified status name (matches Vue variant="danger")',
    type: "Variant",
  },
  {
    cls: ".vd-btn-error",
    desc: "Retained backward-compatible alias for .vd-btn-danger",
    type: "Variant",
  },
  { cls: ".vd-btn-info", desc: "Informational action color", type: "Variant" },
  {
    cls: ".vd-btn-outline",
    desc: "Outlined button (neutral border)",
    type: "Variant",
  },
  {
    cls: ".vd-btn-outline-primary",
    desc: "Outlined button with primary color",
    type: "Variant",
  },
  {
    cls: ".vd-btn-outline-secondary",
    desc: "Outlined button with secondary color",
    type: "Variant",
  },
  { cls: ".vd-btn-sm", desc: "Small button size", type: "Size" },
  { cls: ".vd-btn-lg", desc: "Large button size", type: "Size" },
  { cls: ".vd-btn-block", desc: "Full-width block button", type: "Size" },
  {
    cls: ".vd-btn-ghost",
    desc: "Transparent background with hover tint",
    type: "Variant",
  },
  {
    cls: ".vd-btn-ghost-primary … .vd-btn-ghost-subtle",
    desc: "Ghost with color-tinted hover states",
    type: "Variant",
  },
  { cls: ".vd-btn-icon", desc: "Circular icon-only button", type: "Modifier" },
  {
    cls: ".vd-btn-ring",
    desc: "Detached outer ring with a transparent gap — layers on any variant and size. Suppressed inside .vd-btn-group. Tune with --vd-btn-ring-width / -gap / -color",
    type: "Modifier",
  },
  {
    cls: ".is-loading",
    desc: "Loading state — blanks the label and shows a spinner (prefer a .vd-btn-spinner child, matching VdButton; legacy ::after alone is fine for outline/ghost)",
    type: "State (class)",
  },
  {
    cls: ".vd-btn-spinner",
    desc: "Real spinner element used by VdButton :loading — suppresses the legacy ::after and keeps solid-variant colours correct",
    type: "State (child)",
  },
  {
    cls: ".vd-btn-full",
    desc: "Full-width button (inline-block)",
    type: "Size",
  },
  {
    cls: "disabled",
    desc: "Disables interaction and dims button",
    type: "State (attr)",
  },
];
</script>

<template>
  <section id="buttons">
    <div class="lcc-demo-head">
      <h5 class="demo-title"><i class="ph ph-cursor-click"></i>Buttons</h5>
      <LaunchCustomizerButton component="button" />
    </div>
    <p class="vd-mb-8">
      Clickable actions in contextual color variants, three sizes, and outline,
      ghost, ring, and icon looks, with built-in loading and disabled states.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Button Variants</h6></div>
          <div class="vd-card-body">
            <button class="vd-btn vd-btn-primary">Primary</button>
            <button class="vd-btn vd-btn-secondary">Secondary</button>
            <button class="vd-btn vd-btn-success">Success</button>
            <button class="vd-btn vd-btn-warning">Warning</button>
            <button class="vd-btn vd-btn-danger">Danger</button>
            <button class="vd-btn vd-btn-info">Info</button>
            <button class="vd-btn vd-btn-outline">Outline</button>
            <button class="vd-btn vd-btn-outline-primary">
              Outline Primary
            </button>
            <button class="vd-btn vd-btn-outline-secondary">
              Outline Secondary
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="variantsHtml" :css="variantsCss" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Button Sizes</h6></div>
          <div class="vd-card-body">
            <button class="vd-btn vd-btn-primary vd-btn-sm">Small</button>
            <button class="vd-btn vd-btn-primary">Default</button>
            <button class="vd-btn vd-btn-primary vd-btn-lg">Large</button>
            <button class="vd-btn vd-btn-primary vd-btn-block">
              Block Button
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="sizesHtml" :css="sizesCss" />
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Button States</h6></div>
          <div class="vd-card-body">
            <button class="vd-btn vd-btn-primary">Normal</button>
            <button class="vd-btn vd-btn-primary" disabled>Disabled</button>
            <button class="vd-btn vd-btn-primary" aria-pressed="true">
              Active
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Ghost Buttons</h6></div>
          <div class="vd-card-body">
            <button class="vd-btn vd-btn-ghost">Ghost</button>
            <button class="vd-btn vd-btn-ghost-primary">Ghost Primary</button>
            <button class="vd-btn vd-btn-ghost-secondary">
              Ghost Secondary
            </button>
            <button class="vd-btn vd-btn-ghost-success">Ghost Success</button>
            <button class="vd-btn vd-btn-ghost-error">Ghost Error</button>
            <button class="vd-btn vd-btn-ghost-subtle">Ghost Subtle</button>
          </div>
        </div>
        <DocCodeSnippet :html="ghostHtml" />
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Ring Buttons</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-6">
              A detached outer ring for the one action you want read first on a
              screen that already uses solid buttons everywhere. It is a
              modifier, not a variant — add <code>.vd-btn-ring</code> to
              whatever button you already have. The gap is transparent, so it
              keeps working on cards, glass and imagery.
            </p>
            <button class="vd-btn vd-btn-primary vd-btn-ring">Primary</button>
            <button class="vd-btn vd-btn-success vd-btn-ring">Success</button>
            <button class="vd-btn vd-btn-danger vd-btn-ring">Danger</button>
            <button class="vd-btn vd-btn-outline vd-btn-ring">Outline</button>
            <button class="vd-btn vd-btn-ghost-primary vd-btn-ring">
              Ghost
            </button>

            <div class="vd-mt-6">
              <button class="vd-btn vd-btn-primary vd-btn-ring vd-btn-sm">
                Small
              </button>
              <button class="vd-btn vd-btn-primary vd-btn-ring">Default</button>
              <button class="vd-btn vd-btn-primary vd-btn-ring vd-btn-lg">
                Large
              </button>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="ringHtml" :css="ringCss" />
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Icon Buttons</h6></div>
          <div class="vd-card-body">
            <button
              class="vd-btn vd-btn-icon vd-btn-primary"
              aria-label="Add item"
            >
              <i class="ph ph-plus"></i>
            </button>
            <button
              class="vd-btn vd-btn-icon vd-btn-secondary"
              aria-label="Edit"
            >
              <i class="ph ph-pencil-simple"></i>
            </button>
            <button
              class="vd-btn vd-btn-icon vd-btn-success"
              aria-label="Confirm"
            >
              <i class="ph ph-check"></i>
            </button>
            <button
              class="vd-btn vd-btn-icon vd-btn-danger"
              aria-label="Delete"
            >
              <i class="ph ph-trash"></i>
            </button>
            <button
              class="vd-btn vd-btn-icon vd-btn-outline"
              aria-label="More options"
            >
              <i class="ph ph-dots-three"></i>
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="iconHtml" />
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Loading State</h6></div>
          <div class="vd-card-body">
            <button class="vd-btn vd-btn-primary is-loading" aria-busy="true">
              <span class="vd-btn-spinner" aria-hidden="true"></span>
              Loading
            </button>
            <button
              class="vd-btn vd-btn-primary vd-btn-sm is-loading"
              aria-busy="true"
            >
              <span class="vd-btn-spinner" aria-hidden="true"></span>
              Small
            </button>
            <button class="vd-btn vd-btn-outline is-loading" aria-busy="true">
              <span class="vd-btn-spinner" aria-hidden="true"></span>
              Outline
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="loadingHtml" />
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i
                class="ph ph-list-dashes mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >Class Reference
            </h6>
          </div>
          <div class="vd-card-body">
            <h4>Usage</h4>
            <DocCodeSnippet :html="vue3Usage" :default-open="true" />

            <h4 class="vd-mt-6">Classes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-hover">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Description</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in classRef" :key="row.cls">
                    <td>
                      <code>{{ row.cls }}</code>
                    </td>
                    <td>{{ row.desc }}</td>
                    <td>{{ row.type }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="vd-mt-6">Component API (Vue 3)</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-hover">
                <thead>
                  <tr>
                    <th>Prop / event</th>
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
  vd3 1.2.2 centers .vd-btn-spinner with top/left 50% + negative margin.
  That sits optically low in these demos (filled + outline). Re-center with the
  independent `translate` property so the rotate animation keeps working.
  Temporary docs dogfood override until package CSS is fixed.
*/
:deep(.vd-btn.is-loading .vd-btn-spinner),
:deep(.vd-btn.is-loading::after) {
  top: 50%;
  left: 50%;
  margin: 0;
  translate: -50% -50%;
}
</style>
