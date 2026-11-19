<script setup lang="ts">
import { computed, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdModal, VdSlider, VdSwitch } from "@vanduo-oss/vd3";

type ModalId = "sm" | "md" | "lg" | "xl" | "2xl" | "glass" | "static" | null;

const active = ref<ModalId>(null);
const lgTab = ref<"general" | "design" | "notify">("general");
const xlTab = ref<"overview" | "changelog" | "team">("overview");

/** Default glass studio values tuned for visible live refraction in light & dark themes. */
const GLASS_DEFAULTS = {
  blur: 16,
  saturate: 2.05,
  bgOpacity: 0.32,
  borderAlpha: 0.36,
} as const;

const glassBlur = ref<number>(GLASS_DEFAULTS.blur);
const glassSaturate = ref<number>(GLASS_DEFAULTS.saturate);
const glassBgOpacity = ref<number>(GLASS_DEFAULTS.bgOpacity);
const glassBorderAlpha = ref<number>(GLASS_DEFAULTS.borderAlpha);
const glassHighContrast = ref(false);
const glassDeepShadow = ref(false);

const glassDemoStyle = computed(() => {
  const bgOpacity = glassHighContrast.value ? 0.82 : glassBgOpacity.value;
  const borderAlpha = glassHighContrast.value ? 0.36 : glassBorderAlpha.value;
  const style: Record<string, string> = {
    "--vd-glass-blur": `${glassBlur.value}px`,
    "--vd-glass-saturate": String(glassSaturate.value),
    "--vd-glass-bg-opacity": String(bgOpacity),
    "--vd-glass-border-alpha": String(borderAlpha),
  };
  if (glassDeepShadow.value) {
    style["--vd-glass-shadow"] = "0 20px 55px rgba(0, 0, 0, 0.42)";
  }
  return style;
});

const resetGlassDemo = (): void => {
  glassBlur.value = GLASS_DEFAULTS.blur;
  glassSaturate.value = GLASS_DEFAULTS.saturate;
  glassBgOpacity.value = GLASS_DEFAULTS.bgOpacity;
  glassBorderAlpha.value = GLASS_DEFAULTS.borderAlpha;
  glassHighContrast.value = false;
  glassDeepShadow.value = false;
};

const applySoftFrost = (): void => {
  glassBlur.value = 8;
  glassSaturate.value = 1.4;
  glassBgOpacity.value = 0.22;
  glassBorderAlpha.value = 0.24;
  glassHighContrast.value = false;
  glassDeepShadow.value = false;
};

const applyHeavyFrost = (): void => {
  glassBlur.value = 28;
  glassSaturate.value = 2.4;
  glassBgOpacity.value = 0.65;
  glassBorderAlpha.value = 0.42;
  glassHighContrast.value = false;
  glassDeepShadow.value = true;
};

const applyCrystalClear = (): void => {
  glassBlur.value = 12;
  glassSaturate.value = 2.2;
  glassBgOpacity.value = 0.1;
  glassBorderAlpha.value = 0.45;
  glassHighContrast.value = false;
  glassDeepShadow.value = true;
};

const openModal = (id: Exclude<ModalId, null>): void => {
  active.value = id;
};

const openGlassPreset = (
  preset: "default" | "soft" | "heavy" | "crystal",
): void => {
  if (preset === "soft") applySoftFrost();
  else if (preset === "heavy") applyHeavyFrost();
  else if (preset === "crystal") applyCrystalClear();
  else resetGlassDemo();
  openModal("glass");
};

const closeModal = (): void => {
  active.value = null;
};

const usageSnippet = `<script setup lang="ts">
import { ref } from "vue";
import { VdModal } from "@vanduo-oss/vd3";

const open = ref(false);
<\/script>

<template>
  <button class="vd-btn vd-btn-primary" @click="open = true">Open Modal</button>

  <VdModal v-model:open="open" title="Modal Title" size="md">
    <p class="vd-mb-0">Modal content goes here.</p>
    <template #footer>
      <button class="vd-btn vd-btn-outline" @click="open = false">
        Cancel
      </button>
      <button class="vd-btn vd-btn-primary" @click="open = false">Save</button>
    </template>
  </VdModal>
</template>`;

const glassSnippet = computed(
  () => `<VdModal
  v-model:open="open"
  title="Glass Modal"
  glass
  :style="{
    '--vd-glass-blur': '${glassBlur.value}px',
    '--vd-glass-saturate': '${glassSaturate.value}',
    '--vd-glass-bg-opacity': '${glassHighContrast.value ? 0.82 : glassBgOpacity.value}',
    '--vd-glass-border-alpha': '${glassHighContrast.value ? 0.36 : glassBorderAlpha.value}',
  }"
>
  <p class="vd-mb-0">Live tokens apply immediately on the glass panel.</p>
</VdModal>`,
);

const propRows: [string, string][] = [
  [
    "open",
    "boolean (required) — controls visibility. Pair with v-model:open or handle @update:open.",
  ],
  [
    "title",
    'string — header title; also used as the dialog aria-label (falls back to "Dialog").',
  ],
  [
    "size",
    '"sm" | "md" | "lg" | "xl" | "2xl" — landscape Fibonacci width tier (default "md"; "2xl" fills 95% of viewport in golden ratio).',
  ],
  [
    "golden",
    "boolean — maintain a 1.618:1 landscape Golden Ratio minimum proportion clamped to the viewport (default true).",
  ],
  [
    "stableHeight",
    "boolean — keep panel height steady when switching tabs so dialogs do not jump (default true).",
  ],
  [
    "closeOnBackdrop",
    "boolean — whether a backdrop click closes the modal (default true).",
  ],
  [
    "glass",
    "boolean — frosted glass panel + backdrop (`.vd-modal-glass` / `.vd-modal-glass-backdrop`, default false).",
  ],
  [
    "animated",
    "boolean — enable smooth Fibonacci scale & fade transition (233ms enter, 144ms fade-out; default true).",
  ],
  [
    "duration",
    "number — optional transition duration override in milliseconds.",
  ],
];

const eventRows: [string, string][] = [
  [
    "update:open",
    "Emitted with false when the modal requests to close (backdrop, Escape, or the close button). Enables v-model:open.",
  ],
  ["close", "Emitted alongside update:open whenever the modal closes."],
];

const slotRows: [string, string][] = [
  ["header", "Optional extra header content, rendered after the title."],
  ["default", "The modal body content."],
  ["footer", "Footer action bar — rendered only when provided."],
];

const cssVars: [string, string, string][] = [
  ["--vd-modal-bg", "var(--vd-color-white)", "Panel background"],
  ["--vd-modal-backdrop-bg", "rgba(0,0,0,0.5)", "Backdrop overlay color"],
  ["--vd-modal-border-color", "var(--vd-border-color)", "Panel border color"],
  ["--vd-modal-padding", "1.3125rem (21px)", "Panel padding (Fibonacci)"],
  ["--vd-modal-header-padding", "1.3125rem", "Header padding"],
  ["--vd-modal-body-padding", "1.3125rem", "Body padding"],
  ["--vd-modal-footer-padding", "1.3125rem", "Footer padding"],
  ["--vd-modal-golden-ratio", "1.618034", "Default landscape proportion ratio"],
  [
    "--vd-modal-max-height",
    "min(95dvh, calc(100dvh - 2*margin))",
    "Viewport-safe maximum height",
  ],
  ["--vd-modal-width-sm", "377px", "Small width (fib 14, golden 233px tall)"],
  ["--vd-modal-width", "610px", "Default width (fib 15, golden 377px tall)"],
  ["--vd-modal-width-lg", "987px", "Large width (fib 16, golden 610px tall)"],
  ["--vd-modal-width-xl", "1280px", "Extra-large wide workspace width"],
  [
    "--vd-modal-width-2xl",
    "min(95dvw, 95dvh × φ)",
    "95% viewport-bounded golden width",
  ],
  ["--vd-modal-enter-duration", "233ms (--vd-duration-233)", "Enter timing"],
  [
    "--vd-modal-leave-duration",
    "144ms (--vd-duration-144)",
    "Smooth exit timing",
  ],
  ["--vd-modal-z-index", "1050", "Modal stacking"],
  ["--vd-modal-backdrop-z-index", "1040", "Backdrop stacking"],
  ["--vd-glass-blur", "16px", "Glass modal blur (backdrop uses 55%)"],
  ["--vd-glass-saturate", "2.05", "Glass backdrop-filter saturation"],
  [
    "--vd-glass-bg-opacity",
    "0.42 (0.18 dark)",
    "Glass modal panel fill opacity",
  ],
  [
    "--vd-glass-border-alpha",
    "0.4 (0.34 dark)",
    "Glass modal panel border alpha",
  ],
  ["--vd-glass-shadow", "0 14px 40px …", "Glass panel box-shadow"],
];

const classRows: [string, string][] = [
  [
    ".vd-modal",
    "Root overlay container (present only while the modal is open).",
  ],
  [".vd-modal-open", "Marks the overlay as open — drives the visible state."],
  [
    ".vd-modal-backdrop",
    "Full-screen backdrop; a click closes the modal unless close-on-backdrop is false.",
  ],
  [
    ".vd-modal-panel",
    "The centered dialog panel holding the header, scrollable body, and pinned footer.",
  ],
  [
    ".vd-modal-panel-sm / -md / -lg / -xl / -2xl",
    "Panel width & golden ratio sizing matching the size prop.",
  ],
  [
    ".vd-modal-auto-height",
    'Opt-out modifier added when :golden="false" (lets short modals shrink to content).',
  ],
  [
    ".vd-modal-dynamic-height",
    'Opt-out modifier added when :stable-height="false" (lets tab switches resize height).',
  ],
  [
    ".vd-modal-glass",
    "Root modifier for the frosted glass panel (set via the glass prop).",
  ],
  [
    ".vd-modal-glass-backdrop",
    "Backdrop blur companion to `.vd-modal-glass` (set via the glass prop).",
  ],
  [
    ".vd-modal-header",
    "Header bar with the title and the auto-rendered close button.",
  ],
  [".vd-modal-title", "Heading element populated from the title prop."],
  [".vd-modal-body", "Scrollable body region (the default slot)."],
  [".vd-modal-footer", "Pinned footer action bar (the footer slot)."],
];
</script>

<template>
  <section id="modals">
    <h5 class="demo-title"><i class="ph ph-squares-four"></i>Modals</h5>
    <p class="vd-mb-8">
      <strong>VdModal</strong> renders a viewport-safe overlay dialog sized by
      the Fibonacci ladder and landscape Golden Ratio (1.618:1) by default.
      Drive it from a boolean with <code>v-model:open</code>, choose one of five
      size tiers (<code>sm</code> through <code>2xl</code>), or add
      <code>glass</code> for a frosted panel. Tabbed bodies keep a steady height
      without jumping, and closing triggers an immediate smooth Fibonacci
      fade-out.
    </p>

    <!-- Sizes -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Modal Sizes</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <button class="vd-btn vd-btn-primary" @click="openModal('sm')">
              Small (377px · φ)
            </button>
            <button class="vd-btn vd-btn-primary" @click="openModal('md')">
              Default (610px · φ)
            </button>
            <button class="vd-btn vd-btn-primary" @click="openModal('lg')">
              Large (987px · φ)
            </button>
            <button class="vd-btn vd-btn-primary" @click="openModal('xl')">
              Extra Large (1280px · φ)
            </button>
            <button
              class="vd-btn vd-btn-outline-primary"
              @click="openModal('2xl')"
            >
              Screen 2XL (95% Viewport · φ)
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="usageSnippet" />
      </div>
    </div>

    <!-- Glass + Static backdrop -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-lg-7">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Glass Modal</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-6">
              Pass <code>:glass="true"</code> for a frosted panel and blurred
              backdrop (<code>.vd-modal-glass</code>). Open the live Glass
              Studio below and pull any slider while the modal is open — every
              <code>--vd-glass-*</code> token updates immediately in real time.
            </p>

            <div class="glass-refraction-stage vd-mb-6">
              <div class="glass-refraction-orb glass-refraction-orb-a" />
              <div class="glass-refraction-orb glass-refraction-orb-b" />
              <div class="glass-refraction-orb glass-refraction-orb-c" />
              <div class="glass-refraction-stage-content">
                <div class="glass-stage-badges">
                  <span class="vd-badge vd-badge-primary"
                    >blur {{ glassBlur }}px</span
                  >
                  <span class="vd-badge vd-badge-info"
                    >saturate {{ glassSaturate }}</span
                  >
                  <span class="vd-badge vd-badge-secondary"
                    >opacity
                    {{ glassHighContrast ? 0.82 : glassBgOpacity }}</span
                  >
                  <span class="vd-badge vd-badge-outlined"
                    >border
                    {{ glassHighContrast ? 0.36 : glassBorderAlpha }}</span
                  >
                </div>
                <div class="glass-stage-actions">
                  <button
                    type="button"
                    class="vd-btn vd-btn-primary"
                    @click="openModal('glass')"
                  >
                    <i class="ph ph-sparkle mr-1"></i>Open Live Glass Studio
                  </button>
                  <button
                    type="button"
                    class="vd-btn vd-btn-sm vd-btn-outline-secondary"
                    @click="openGlassPreset('soft')"
                  >
                    Soft Frost
                  </button>
                  <button
                    type="button"
                    class="vd-btn vd-btn-sm vd-btn-outline-secondary"
                    @click="openGlassPreset('heavy')"
                  >
                    Heavy Frost
                  </button>
                  <button
                    type="button"
                    class="vd-btn vd-btn-sm vd-btn-outline-secondary"
                    @click="openGlassPreset('crystal')"
                  >
                    Crystal Clear
                  </button>
                </div>
              </div>
            </div>

            <DocCodeSnippet :html="glassSnippet" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-5">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Static Backdrop</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Pass <code>:close-on-backdrop="false"</code> so a backdrop click
              does not dismiss a destructive confirmation.
            </p>
            <button class="vd-btn vd-btn-primary" @click="openModal('static')">
              Static Backdrop
            </button>
          </div>
        </div>
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
            <h4>Usage</h4>
            <DocCodeSnippet :html="usageSnippet" :default-open="true" />

            <h4 class="vd-mt-6">Props</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in propRows" :key="r[0]">
                    <td>
                      <code>{{ r[0] }}</code>
                    </td>
                    <td>{{ r[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
                  <tr v-for="r in eventRows" :key="r[0]">
                    <td>
                      <code>{{ r[0] }}</code>
                    </td>
                    <td>{{ r[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="vd-mt-6">Slots</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Slot</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in slotRows" :key="r[0]">
                    <td>
                      <code>{{ r[0] }}</code>
                    </td>
                    <td>{{ r[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
                The overlay is a <code>role="dialog"</code> with
                <code>aria-modal="true"</code>; its accessible name comes from
                the <code>title</code> prop (falling back to "Dialog").
              </li>
              <li>
                On open, focus moves to the dialog panel so keyboard users start
                inside the modal.
              </li>
              <li>
                <kbd>Escape</kbd> closes the modal (emitting
                <code>update:open</code> and <code>close</code>).
              </li>
              <li>
                A backdrop click closes the modal unless
                <code>:close-on-backdrop="false"</code>.
              </li>
              <li>
                The auto-rendered close button carries
                <code>aria-label="Close"</code>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Live modals (VdModal teleports each to <body> itself) ── -->

  <!-- Small -->
  <VdModal
    :open="active === 'sm'"
    title="Small Modal"
    size="sm"
    @update:open="closeModal"
    @close="closeModal"
  >
    <p class="vd-mb-0">
      This is the small modal size. Perfect for confirmations and short
      messages.
    </p>
    <template #footer>
      <button class="vd-btn vd-btn-outline" @click="closeModal">Cancel</button>
      <button class="vd-btn vd-btn-primary" @click="closeModal">Confirm</button>
    </template>
  </VdModal>

  <!-- Default (md): form -->
  <VdModal
    :open="active === 'md'"
    title="Invite Teammate"
    size="md"
    @update:open="closeModal"
    @close="closeModal"
  >
    <p class="vd-mb-6">
      The default modal width (610px, Golden Ratio 377px min-height) is ideal
      for focused tasks — forms, confirmations, and short workflows.
    </p>
    <div class="vd-form-group vd-mb-6">
      <label class="vd-label" for="m-email">Email address</label>
      <input
        type="email"
        id="m-email"
        class="vd-input"
        placeholder="colleague@company.com"
      />
    </div>
    <div class="vd-form-group vd-mb-6">
      <label class="vd-label" for="m-role">Role</label>
      <select id="m-role" class="vd-input">
        <option>Editor</option>
        <option>Viewer</option>
        <option>Admin</option>
      </select>
    </div>
    <div class="vd-alert vd-alert-info vd-mb-0">
      <i class="ph ph-lightbulb"></i>
      <div>
        Invited members receive a link to join your workspace instantly.
      </div>
    </div>
    <template #footer>
      <button class="vd-btn vd-btn-outline" @click="closeModal">Cancel</button>
      <button class="vd-btn vd-btn-primary" @click="closeModal">
        <i class="ph ph-paper-plane-tilt mr-1"></i>Send Invite
      </button>
    </template>
  </VdModal>

  <!-- Large (lg): tabs (stable height by default) -->
  <VdModal
    :open="active === 'lg'"
    title="Project Settings"
    size="lg"
    @update:open="closeModal"
    @close="closeModal"
  >
    <p class="vd-mb-6">
      Large modals (987px, Fibonacci 16) give room for structured content —
      tabbed settings keep a rock-solid height with zero layout jumping when
      switching tabs.
    </p>
    <div class="vd-tabs vd-tabs-pills">
      <ul class="vd-tab-list" role="tablist">
        <li class="vd-tab-item" role="presentation">
          <button
            type="button"
            role="tab"
            :aria-selected="lgTab === 'general'"
            class="vd-tab-link"
            :class="{ 'is-active': lgTab === 'general' }"
            @click="lgTab = 'general'"
          >
            <i class="ph ph-sliders-horizontal mr-1"></i>General
          </button>
        </li>
        <li class="vd-tab-item" role="presentation">
          <button
            type="button"
            role="tab"
            :aria-selected="lgTab === 'design'"
            class="vd-tab-link"
            :class="{ 'is-active': lgTab === 'design' }"
            @click="lgTab = 'design'"
          >
            <i class="ph ph-palette mr-1"></i>Design
          </button>
        </li>
        <li class="vd-tab-item" role="presentation">
          <button
            type="button"
            role="tab"
            :aria-selected="lgTab === 'notify'"
            class="vd-tab-link"
            :class="{ 'is-active': lgTab === 'notify' }"
            @click="lgTab = 'notify'"
          >
            <i class="ph ph-bell mr-1"></i>Notifications
          </button>
        </li>
      </ul>
      <div class="vd-tab-content">
        <div
          class="vd-tab-pane"
          :class="{ 'is-active': lgTab === 'general' }"
          role="tabpanel"
        >
          <div class="vd-form-group vd-mb-6">
            <label class="vd-label" for="m-name">Project name</label>
            <input
              type="text"
              id="m-name"
              class="vd-input"
              value="VD3 UI Design System"
            />
          </div>
          <div class="vd-form-group vd-mb-0">
            <label class="vd-label" for="m-desc">Description</label>
            <textarea id="m-desc" class="vd-input" rows="3">
A Fibonacci-scaled component library for modern web apps.</textarea>
          </div>
        </div>
        <div
          class="vd-tab-pane"
          :class="{ 'is-active': lgTab === 'design' }"
          role="tabpanel"
        >
          <div class="vd-alert vd-alert-primary vd-mb-0">
            <i class="ph ph-sparkle"></i>
            <div>
              Theme changes apply instantly across all connected components.
            </div>
          </div>
        </div>
        <div
          class="vd-tab-pane"
          :class="{ 'is-active': lgTab === 'notify' }"
          role="tabpanel"
        >
          <ul style="list-style: none; padding: 0; margin: 0">
            <li class="vd-d-flex vd-align-items-center vd-gap-5 vd-mb-6">
              <i
                class="ph ph-check-circle"
                style="color: var(--vd-color-success)"
              ></i
              ><span>Email me when a teammate joins</span>
            </li>
            <li class="vd-d-flex vd-align-items-center vd-gap-5 vd-mb-0">
              <i class="ph ph-circle"></i
              ><span>Push notifications for mentions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <template #footer>
      <button class="vd-btn vd-btn-outline" @click="closeModal">Cancel</button>
      <button class="vd-btn vd-btn-primary" @click="closeModal">
        <i class="ph ph-floppy-disk mr-1"></i>Save Changes
      </button>
    </template>
  </VdModal>

  <!-- Extra Large (xl): dense multi-section dialog (stable tabs) -->
  <VdModal
    :open="active === 'xl'"
    title="Release Overview"
    size="xl"
    @update:open="closeModal"
    @close="closeModal"
  >
    <p class="vd-mb-6">
      The extra-large modal (1280px, clamped gracefully to your viewport) suits
      wide, multi-column workflows — release dashboards, comparison tables, and
      dense tabbed views with zero height jump.
    </p>
    <div class="vd-d-flex vd-flex-wrap items-center vd-gap-5 vd-mb-8">
      <span class="vd-badge vd-badge-success">Stable</span>
      <span class="vd-badge vd-badge-primary">v1.9.2</span>
      <span class="vd-badge vd-badge-outlined vd-badge-secondary"
        >14 commits</span
      >
      <span class="vd-badge vd-badge-info">3 contributors</span>
    </div>

    <div class="vd-tabs vd-tabs-pills vd-mb-6">
      <ul class="vd-tab-list" role="tablist">
        <li class="vd-tab-item" role="presentation">
          <button
            class="vd-tab-link"
            :class="{ 'is-active': xlTab === 'overview' }"
            type="button"
            role="tab"
            :aria-selected="xlTab === 'overview'"
            @click="xlTab = 'overview'"
          >
            <i class="ph ph-squares-four mr-1"></i>Overview
          </button>
        </li>
        <li class="vd-tab-item" role="presentation">
          <button
            class="vd-tab-link"
            :class="{ 'is-active': xlTab === 'changelog' }"
            type="button"
            role="tab"
            :aria-selected="xlTab === 'changelog'"
            @click="xlTab = 'changelog'"
          >
            <i class="ph ph-list-dashes mr-1"></i>Changelog
          </button>
        </li>
        <li class="vd-tab-item" role="presentation">
          <button
            class="vd-tab-link"
            :class="{ 'is-active': xlTab === 'team' }"
            type="button"
            role="tab"
            :aria-selected="xlTab === 'team'"
            @click="xlTab = 'team'"
          >
            <i class="ph ph-users mr-1"></i>Team
          </button>
        </li>
      </ul>
      <div class="vd-tab-content">
        <div
          class="vd-tab-pane"
          :class="{ 'is-active': xlTab === 'overview' }"
          role="tabpanel"
        >
          <div class="vd-row">
            <div class="vd-col-12 vd-col-md-6 vd-mb-6">
              <h6 class="vd-mb-6">Release notes</h6>
              <p class="vd-text-sm vd-text-muted vd-mb-6">
                Ship a roomier dialog for side-by-side layouts. Pair tabs with
                short forms so reviewers can skim status and edit metadata in
                one place without vertical layout jumps.
              </p>
              <div class="vd-form-group vd-mb-6">
                <label class="vd-label" for="xl-title">Release title</label>
                <input
                  id="xl-title"
                  type="text"
                  class="vd-input"
                  value="VD3 UI 1.9.2 — Golden Modals + Live Glass"
                />
              </div>
              <div class="vd-form-group vd-mb-6">
                <label class="vd-label" for="xl-channel">Channel</label>
                <select id="xl-channel" class="vd-input">
                  <option>Stable</option>
                  <option>Beta</option>
                  <option>Canary</option>
                </select>
              </div>
              <div class="vd-form-group vd-mb-0">
                <label class="vd-label" for="xl-summary">Summary</label>
                <textarea id="xl-summary" class="vd-input" rows="3">
Viewport-bounded Golden Ratio proportions, stable tab heights, 2xl near-fullscreen size, and instant Fibonacci fade-out.</textarea>
              </div>
            </div>
            <div class="vd-col-12 vd-col-md-6 vd-mb-6">
              <h6 class="vd-mb-6">Highlights</h6>
              <ul style="list-style: none; padding: 0; margin: 0">
                <li class="vd-d-flex items-start vd-gap-5 vd-mb-6">
                  <i
                    class="ph ph-check-circle"
                    style="color: var(--vd-color-success); margin-top: 0.125rem"
                  ></i>
                  <div>
                    <strong>size=&quot;xl&quot; &amp; &quot;2xl&quot;</strong>
                    <p class="vd-text-sm vd-text-muted vd-mb-0">
                      Maps to <code>.vd-modal-panel-xl</code> (1280px) and
                      <code>.vd-modal-panel-2xl</code> (95% viewport golden).
                    </p>
                  </div>
                </li>
                <li class="vd-d-flex items-start vd-gap-5 vd-mb-6">
                  <i
                    class="ph ph-check-circle"
                    style="color: var(--vd-color-success); margin-top: 0.125rem"
                  ></i>
                  <div>
                    <strong>Stable tabbed height</strong>
                    <p class="vd-text-sm vd-text-muted vd-mb-0">
                      Sizes once to the tallest tab so switching tabs never
                      jumps.
                    </p>
                  </div>
                </li>
                <li class="vd-d-flex items-start vd-gap-5 vd-mb-0">
                  <i
                    class="ph ph-check-circle"
                    style="color: var(--vd-color-success); margin-top: 0.125rem"
                  ></i>
                  <div>
                    <strong>Focus &amp; Escape</strong>
                    <p class="vd-text-sm vd-text-muted vd-mb-0">
                      Focus trap ignores hidden tab panes and closes smoothly on
                      Escape.
                    </p>
                  </div>
                </li>
              </ul>
              <div class="vd-alert vd-alert-primary vd-mt-6 vd-mb-0">
                <i class="ph ph-rocket-launch"></i>
                <div>
                  Every modal automatically fits inside the viewport and scrolls
                  internally inside <code>.vd-modal-body</code>.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="vd-tab-pane"
          :class="{ 'is-active': xlTab === 'changelog' }"
          role="tabpanel"
        >
          <div class="vd-table-responsive">
            <table class="vd-table vd-table-striped vd-mb-0">
              <thead>
                <tr>
                  <th>Change</th>
                  <th>Type</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Landscape Golden Ratio default + <code>2xl</code> tier
                  </td>
                  <td>
                    <span class="vd-badge vd-badge-success">Feature</span>
                  </td>
                  <td>Design Systems</td>
                </tr>
                <tr>
                  <td>Viewport-fit cap + internal body scroll</td>
                  <td>
                    <span class="vd-badge vd-badge-success">Feature</span>
                  </td>
                  <td>Design Systems</td>
                </tr>
                <tr>
                  <td>Stable tab sizing across panes</td>
                  <td>
                    <span class="vd-badge vd-badge-info">Polish</span>
                  </td>
                  <td>Design Systems</td>
                </tr>
                <tr>
                  <td>Immediate 144ms Fibonacci fade-out</td>
                  <td>
                    <span class="vd-badge vd-badge-secondary">Fix</span>
                  </td>
                  <td>Motion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          class="vd-tab-pane"
          :class="{ 'is-active': xlTab === 'team' }"
          role="tabpanel"
        >
          <div class="vd-row vd-mb-6">
            <div class="vd-col-12 vd-col-md-4 vd-mb-5">
              <div class="vd-form-group vd-mb-0">
                <label class="vd-label" for="xl-reviewer"
                  >Primary reviewer</label
                >
                <input
                  id="xl-reviewer"
                  type="text"
                  class="vd-input"
                  value="Alex Rivera"
                />
              </div>
            </div>
            <div class="vd-col-12 vd-col-md-4 vd-mb-5">
              <div class="vd-form-group vd-mb-0">
                <label class="vd-label" for="xl-qa">QA contact</label>
                <input
                  id="xl-qa"
                  type="email"
                  class="vd-input"
                  value="qa@vanduo.dev"
                />
              </div>
            </div>
            <div class="vd-col-12 vd-col-md-4 vd-mb-5">
              <div class="vd-form-group vd-mb-0">
                <label class="vd-label" for="xl-window">Ship window</label>
                <select id="xl-window" class="vd-input">
                  <option>This week</option>
                  <option>Next sprint</option>
                  <option>Hold</option>
                </select>
              </div>
            </div>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0">
            <li class="vd-d-flex items-center justify-between vd-mb-6">
              <span class="vd-d-flex items-center vd-gap-5">
                <i class="ph ph-user-circle"></i>Alex Rivera
              </span>
              <span class="vd-badge vd-badge-primary">Owner</span>
            </li>
            <li class="vd-d-flex items-center justify-between vd-mb-6">
              <span class="vd-d-flex items-center vd-gap-5">
                <i class="ph ph-user-circle"></i>Sam Chen
              </span>
              <span class="vd-badge vd-badge-outlined">Reviewer</span>
            </li>
            <li class="vd-d-flex items-center justify-between vd-mb-0">
              <span class="vd-d-flex items-center vd-gap-5">
                <i class="ph ph-user-circle"></i>Jordan Lee
              </span>
              <span class="vd-badge vd-badge-outlined">QA</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <template #footer>
      <button class="vd-btn vd-btn-outline" @click="closeModal">Close</button>
      <button class="vd-btn vd-btn-primary" @click="closeModal">
        <i class="ph ph-floppy-disk mr-1"></i>Save draft
      </button>
    </template>
  </VdModal>

  <!-- Screen 2XL (2xl): 95% viewport golden studio -->
  <VdModal
    :open="active === '2xl'"
    title="Workspace Studio — 95% Golden Viewport"
    size="2xl"
    @update:open="closeModal"
    @close="closeModal"
  >
    <p class="vd-mb-6">
      <code>size="2xl"</code> expands up to
      <strong>95% of your viewport</strong>
      while locking its bounding frame to the landscape Golden Ratio
      (<code>1.618:1</code>). Header and footer stay pinned while rich workspace
      content scrolls cleanly inside the modal body.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-4 vd-mb-5">
        <div class="vd-card vd-h-100">
          <div class="vd-card-body">
            <span class="vd-badge vd-badge-primary vd-mb-5">Golden Ratio</span>
            <h6 class="vd-mb-5">1.618 : 1</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              Computed as <code>min(95dvw, 95dvh × φ)</code> wide by
              <code>min(95dvh, 95dvw / φ)</code> tall.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4 vd-mb-5">
        <div class="vd-card vd-h-100">
          <div class="vd-card-body">
            <span class="vd-badge vd-badge-success vd-mb-5">Viewport Fit</span>
            <h6 class="vd-mb-5">Always Bounded</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              Safe <code>margin: auto</code> centering prevents top-edge
              clipping even on compact laptop screens.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4 vd-mb-5">
        <div class="vd-card vd-h-100">
          <div class="vd-card-body">
            <span class="vd-badge vd-badge-info vd-mb-5">Scroll Guard</span>
            <h6 class="vd-mb-5">Overscroll Contained</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              <code>overscroll-behavior: contain</code> isolates wheel and touch
              scroll inside the dialog.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-table-responsive">
      <table class="vd-table vd-table-striped vd-mb-0">
        <thead>
          <tr>
            <th>Size Tier</th>
            <th>Width</th>
            <th>Golden Height Floor</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>sm</code></td>
            <td>377px (fib 14)</td>
            <td>233px (fib 13)</td>
            <td>Confirmations, short prompts, side-by-side actions</td>
          </tr>
          <tr>
            <td><code>md</code></td>
            <td>610px (fib 15)</td>
            <td>377px (fib 14)</td>
            <td>Focused forms, invitations, alerts</td>
          </tr>
          <tr>
            <td><code>lg</code></td>
            <td>987px (fib 16)</td>
            <td>610px (fib 15)</td>
            <td>Tabbed settings, multi-section inspectors</td>
          </tr>
          <tr>
            <td><code>xl</code></td>
            <td>1280px</td>
            <td>791px (clamped to viewport)</td>
            <td>Release dashboards, multi-column comparisons</td>
          </tr>
          <tr>
            <td><code>2xl</code></td>
            <td>min(95dvw, 95dvh × φ)</td>
            <td>min(95dvh, 95dvw / φ)</td>
            <td>Near-fullscreen studios, canvases, large data editors</td>
          </tr>
        </tbody>
      </table>
    </div>

    <template #footer>
      <button class="vd-btn vd-btn-outline" @click="closeModal">Cancel</button>
      <button class="vd-btn vd-btn-primary" @click="closeModal">
        Apply Workspace
      </button>
    </template>
  </VdModal>

  <!-- Glass: immediate live token playground -->
  <VdModal
    :open="active === 'glass'"
    title="Live Glass Studio"
    size="lg"
    glass
    :style="glassDemoStyle"
    @update:open="closeModal"
    @close="closeModal"
  >
    <p class="vd-mb-6 vd-text-sm">
      Pull any slider or toggle below — the frosted surface and backdrop update
      immediately over the page behind this dialog.
    </p>

    <div class="glass-demo-controls vd-mb-6">
      <div class="vd-row vd-gap-6">
        <div class="vd-col-12 vd-col-md-6">
          <VdSlider
            v-model="glassBlur"
            id="glass-blur"
            label="Blur"
            :min="0"
            :max="40"
            :step="1"
            show-value
          />
          <p class="vd-text-sm vd-text-muted vd-mt-5 vd-mb-0">
            <code>--vd-glass-blur</code> · backdrop uses 55%
          </p>
        </div>
        <div class="vd-col-12 vd-col-md-6">
          <VdSlider
            v-model="glassSaturate"
            id="glass-saturate"
            label="Saturation"
            :min="1"
            :max="3"
            :step="0.1"
            show-value
          />
          <p class="vd-text-sm vd-text-muted vd-mt-5 vd-mb-0">
            <code>--vd-glass-saturate</code>
          </p>
        </div>
        <div class="vd-col-12 vd-col-md-6">
          <VdSlider
            v-model="glassBgOpacity"
            id="glass-bg-opacity"
            label="Panel opacity"
            :min="0.05"
            :max="0.95"
            :step="0.05"
            show-value
            :disabled="glassHighContrast"
          />
          <p class="vd-text-sm vd-text-muted vd-mt-5 vd-mb-0">
            <code>--vd-glass-bg-opacity</code>
            <template v-if="glassHighContrast">
              · locked at 0.82 by high contrast
            </template>
          </p>
        </div>
        <div class="vd-col-12 vd-col-md-6">
          <VdSlider
            v-model="glassBorderAlpha"
            id="glass-border-alpha"
            label="Border alpha"
            :min="0"
            :max="0.8"
            :step="0.02"
            show-value
            :disabled="glassHighContrast"
          />
          <p class="vd-text-sm vd-text-muted vd-mt-5 vd-mb-0">
            <code>--vd-glass-border-alpha</code>
            <template v-if="glassHighContrast">
              · locked at 0.36 by high contrast
            </template>
          </p>
        </div>
      </div>

      <div class="vd-d-flex vd-flex-wrap vd-gap-6 items-center vd-mt-6 vd-mb-6">
        <VdSwitch
          v-model="glassHighContrast"
          id="glass-high-contrast"
          label="High contrast"
        />
        <VdSwitch
          v-model="glassDeepShadow"
          id="glass-deep-shadow"
          label="Deep shadow"
        />
      </div>

      <div class="vd-d-flex vd-flex-wrap vd-gap-5">
        <button
          type="button"
          class="vd-btn vd-btn-sm vd-btn-outline-secondary"
          @click="applySoftFrost"
        >
          Soft frost
        </button>
        <button
          type="button"
          class="vd-btn vd-btn-sm vd-btn-outline-secondary"
          @click="applyHeavyFrost"
        >
          Heavy frost
        </button>
        <button
          type="button"
          class="vd-btn vd-btn-sm vd-btn-outline-secondary"
          @click="applyCrystalClear"
        >
          Crystal clear
        </button>
        <button
          type="button"
          class="vd-btn vd-btn-sm vd-btn-ghost"
          @click="resetGlassDemo"
        >
          Reset
        </button>
      </div>
    </div>

    <div class="vd-alert vd-alert-info vd-mb-0">
      <i class="ph ph-drop"></i>
      <div>
        Live CSS tokens: <code>blur: {{ glassBlur }}px</code> ·
        <code>saturate: {{ glassSaturate }}</code> ·
        <code>bg-opacity: {{ glassHighContrast ? 0.82 : glassBgOpacity }}</code>
        ·
        <code
          >border-alpha: {{ glassHighContrast ? 0.36 : glassBorderAlpha }}</code
        ><template v-if="glassDeepShadow"> · <code>deep shadow</code></template>
      </div>
    </div>
    <template #footer>
      <button class="vd-btn vd-btn-outline" @click="closeModal">Close</button>
      <button class="vd-btn vd-btn-primary" @click="closeModal">Confirm</button>
    </template>
  </VdModal>

  <!-- Static backdrop -->
  <VdModal
    :open="active === 'static'"
    title="Confirm Delete"
    size="md"
    :close-on-backdrop="false"
    @update:open="closeModal"
    @close="closeModal"
  >
    <div class="vd-alert vd-alert-warning vd-mb-6">
      <i class="ph ph-warning"></i>
      <div>
        <strong>This action cannot be undone.</strong> Clicking the backdrop
        will not close this modal — you must choose explicitly.
      </div>
    </div>
    <p class="vd-mb-5">
      You are about to permanently delete
      <strong>design-system-v2.fig</strong> and all associated assets.
    </p>
    <template #footer>
      <button class="vd-btn vd-btn-outline" @click="closeModal">Cancel</button>
      <button class="vd-btn vd-btn-danger" @click="closeModal">
        <i class="ph ph-trash mr-1"></i>Delete Permanently
      </button>
    </template>
  </VdModal>
</template>

<style scoped>
.glass-refraction-stage {
  position: relative;
  overflow: hidden;
  min-height: 8.5rem;
  display: flex;
  align-items: center;
  border-radius: var(--vd-border-radius-lg, 0.75rem);
  border: 1px solid var(--vd-border-color);
  padding: 1.625rem;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--vd-color-primary) 18%, transparent),
    color-mix(in srgb, var(--vd-color-info, #3b82f6) 14%, transparent)
  );
}

.glass-refraction-stage-content {
  position: relative;
  z-index: 1;
  width: 100%;
}

.glass-stage-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1.3125rem;
}

.glass-stage-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.glass-refraction-orb {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
  filter: blur(14px);
  opacity: 0.7;
}

.glass-refraction-orb-a {
  width: 8rem;
  height: 8rem;
  top: -2rem;
  left: -1rem;
  background: var(--vd-color-primary);
}

.glass-refraction-orb-b {
  width: 7rem;
  height: 7rem;
  bottom: -2.5rem;
  right: 2rem;
  background: #a855f7;
}

.glass-refraction-orb-c {
  width: 5.5rem;
  height: 5.5rem;
  top: 0.5rem;
  right: -1rem;
  background: #10b981;
}
</style>
