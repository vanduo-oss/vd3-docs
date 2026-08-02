<script setup lang="ts">
import { computed, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdModal, VdSlider, VdSwitch } from "@vanduo-oss/vd3";

type ModalId = "sm" | "md" | "lg" | "xl" | "glass" | "static" | null;

const active = ref<ModalId>(null);
const lgTab = ref<"general" | "design" | "notify">("general");
const xlTab = ref<"overview" | "changelog" | "team">("overview");

/** Framework glass token defaults (`tokens.css`). */
const GLASS_DEFAULTS = {
  blur: 12,
  saturate: 1.8,
  bgOpacity: 0.65,
  borderAlpha: 0.18,
} as const;

const glassBlur = ref<number>(GLASS_DEFAULTS.blur);
const glassSaturate = ref<number>(GLASS_DEFAULTS.saturate);
const glassBgOpacity = ref<number>(GLASS_DEFAULTS.bgOpacity);
const glassBorderAlpha = ref<number>(GLASS_DEFAULTS.borderAlpha);
const glassHighContrast = ref(false);
const glassDeepShadow = ref(false);

const glassDemoStyle = computed(() => {
  const bgOpacity = glassHighContrast.value ? 0.82 : glassBgOpacity.value;
  const borderAlpha = glassHighContrast.value ? 0.26 : glassBorderAlpha.value;
  const style: Record<string, string> = {
    "--vd-glass-blur": `${glassBlur.value}px`,
    "--vd-glass-saturate": String(glassSaturate.value),
    "--vd-glass-bg-opacity": String(bgOpacity),
    "--vd-glass-border-alpha": String(borderAlpha),
  };
  if (glassDeepShadow.value) {
    style["--vd-glass-shadow"] = "0 16px 48px rgba(0, 0, 0, 0.35)";
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
  glassBlur.value = 6;
  glassSaturate.value = 1.4;
  glassBgOpacity.value = 0.55;
  glassBorderAlpha.value = 0.18;
  glassHighContrast.value = false;
};

const applyHeavyFrost = (): void => {
  glassBlur.value = 28;
  glassSaturate.value = 2.2;
  glassBgOpacity.value = 0.78;
  glassBorderAlpha.value = 0.18;
  glassHighContrast.value = false;
};

const openModal = (id: Exclude<ModalId, null>): void => {
  active.value = id;
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
      <button class="vd-btn vd-btn-outline-secondary" @click="open = false">
        Cancel
      </button>
      <button class="vd-btn vd-btn-primary" @click="open = false">Save</button>
    </template>
  </VdModal>
</template>`;

const glassSnippet = `<VdModal
  v-model:open="open"
  title="Glass Modal"
  glass
  :style="{
    '--vd-glass-blur': '20px',
    '--vd-glass-saturate': '2',
    '--vd-glass-bg-opacity': '0.72',
  }"
>
  <p class="vd-mb-0">Override glass tokens on the modal root.</p>
</VdModal>`;

const propRows: [string, string][] = [
  [
    "open",
    "boolean (required) — controls visibility. Pair with v-model:open or handle @update:open.",
  ],
  [
    "title",
    'string — header title; also used as the dialog aria-label (falls back to "Dialog").',
  ],
  ["size", '"sm" | "md" | "lg" | "xl" — panel width (default "md").'],
  [
    "closeOnBackdrop",
    "boolean — whether a backdrop click closes the modal (default true).",
  ],
  [
    "glass",
    "boolean — frosted glass panel + backdrop (`.vd-modal-glass` / `.vd-modal-glass-backdrop`, default false).",
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
  ["--vd-modal-width-sm", "233px", "Small width (fib 13)"],
  ["--vd-modal-width", "377px", "Default width (fib 14)"],
  ["--vd-modal-width-lg", "610px", "Large width (fib 15)"],
  ["--vd-modal-width-xl", "987px", "Extra-large width (fib 16)"],
  ["--vd-modal-z-index", "1050", "Modal stacking"],
  ["--vd-modal-backdrop-z-index", "1040", "Backdrop stacking"],
  ["--vd-glass-blur", "12px", "Glass panel blur (backdrop uses half)"],
  ["--vd-glass-saturate", "1.8", "Glass backdrop-filter saturation"],
  [
    "--vd-glass-bg-opacity",
    "0.65",
    "Glass panel fill opacity (feeds --vd-glass-bg-light)",
  ],
  [
    "--vd-glass-border-alpha",
    "0.18",
    "Glass panel border alpha (feeds --vd-glass-border-light)",
  ],
  ["--vd-glass-shadow", "0 8px 32px …", "Glass panel box-shadow"],
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
    "The centered dialog panel holding the header, body, and footer.",
  ],
  [
    ".vd-modal-panel-sm / -md / -lg / -xl",
    "Panel width matching the size prop.",
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
  [".vd-modal-body", "Body region (the default slot)."],
  [".vd-modal-footer", "Footer action bar (the footer slot)."],
];
</script>

<template>
  <section id="modals">
    <h5 class="demo-title"><i class="ph ph-squares-four"></i>Modals</h5>
    <p class="vd-mb-8">
      <strong>VdModal</strong> renders an overlay dialog for confirmations,
      forms, and focused tasks. Drive it from a boolean with
      <code>v-model:open</code>, choose one of four size tiers (or
      <code>glass</code> for a frosted panel), and fill the body /
      <code>#footer</code> slots — the header title and close button are
      rendered for you. It teleports to <code>&lt;body&gt;</code>, traps Escape,
      and closes on a backdrop click unless you opt out.
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
              Small (233px)
            </button>
            <button class="vd-btn vd-btn-primary" @click="openModal('md')">
              Default (377px)
            </button>
            <button class="vd-btn vd-btn-primary" @click="openModal('lg')">
              Large (610px)
            </button>
            <button class="vd-btn vd-btn-primary" @click="openModal('xl')">
              Extra Large (987px)
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
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Pass <code>:glass="true"</code> for a frosted panel and blurred
              backdrop (<code>.vd-modal-glass</code>). Set tokens here, then
              open — the same controls are inside the dialog for live tweaking
              over page content.
            </p>

            <div class="glass-demo-controls vd-mb-4">
              <div class="vd-row vd-gap-3">
                <div class="vd-col-12 vd-col-md-6">
                  <VdSlider
                    v-model="glassBlur"
                    id="glass-blur-page"
                    label="Blur"
                    :min="0"
                    :max="40"
                    :step="1"
                    show-value
                  />
                  <p class="vd-text-sm vd-text-muted vd-mt-1 vd-mb-0">
                    <code>--vd-glass-blur</code> (backdrop uses half)
                  </p>
                </div>
                <div class="vd-col-12 vd-col-md-6">
                  <VdSlider
                    v-model="glassSaturate"
                    id="glass-saturate-page"
                    label="Saturation"
                    :min="1"
                    :max="3"
                    :step="0.1"
                    show-value
                  />
                  <p class="vd-text-sm vd-text-muted vd-mt-1 vd-mb-0">
                    <code>--vd-glass-saturate</code>
                  </p>
                </div>
                <div class="vd-col-12 vd-col-md-6">
                  <VdSlider
                    v-model="glassBgOpacity"
                    id="glass-bg-opacity-page"
                    label="Panel opacity"
                    :min="0.2"
                    :max="0.95"
                    :step="0.05"
                    show-value
                    :disabled="glassHighContrast"
                  />
                  <p class="vd-text-sm vd-text-muted vd-mt-1 vd-mb-0">
                    <code>--vd-glass-bg-opacity</code>
                  </p>
                </div>
                <div class="vd-col-12 vd-col-md-6">
                  <VdSlider
                    v-model="glassBorderAlpha"
                    id="glass-border-alpha-page"
                    label="Border alpha"
                    :min="0"
                    :max="0.5"
                    :step="0.01"
                    show-value
                    :disabled="glassHighContrast"
                  />
                  <p class="vd-text-sm vd-text-muted vd-mt-1 vd-mb-0">
                    <code>--vd-glass-border-alpha</code>
                  </p>
                </div>
              </div>

              <div class="vd-d-flex vd-flex-wrap vd-gap-4 items-center vd-mt-4">
                <VdSwitch
                  v-model="glassHighContrast"
                  id="glass-high-contrast-page"
                  label="High contrast"
                />
                <VdSwitch
                  v-model="glassDeepShadow"
                  id="glass-deep-shadow-page"
                  label="Deep shadow"
                />
              </div>

              <div class="vd-d-flex vd-flex-wrap vd-gap-2 items-center vd-mt-3">
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
                  class="vd-btn vd-btn-sm vd-btn-ghost"
                  @click="resetGlassDemo"
                >
                  Reset
                </button>
              </div>
            </div>

            <button class="vd-btn vd-btn-primary" @click="openModal('glass')">
              Open Glass Modal
            </button>
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
      <button class="vd-btn vd-btn-outline-secondary" @click="closeModal">
        Cancel
      </button>
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
    <p class="vd-mb-4">
      The default modal width (377px) is ideal for focused tasks — quick forms,
      confirmations, and short workflows.
    </p>
    <div class="vd-form-group vd-mb-3">
      <label class="vd-label" for="m-email">Email address</label>
      <input
        type="email"
        id="m-email"
        class="vd-input"
        placeholder="colleague@company.com"
      />
    </div>
    <div class="vd-form-group vd-mb-4">
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
      <button class="vd-btn vd-btn-outline-secondary" @click="closeModal">
        Cancel
      </button>
      <button class="vd-btn vd-btn-primary" @click="closeModal">
        <i class="ph ph-paper-plane-tilt mr-1"></i>Send Invite
      </button>
    </template>
  </VdModal>

  <!-- Large (lg): tabs -->
  <VdModal
    :open="active === 'lg'"
    title="Project Settings"
    size="lg"
    @update:open="closeModal"
    @close="closeModal"
  >
    <p class="vd-mb-4">
      Large modals (610px) give room for structured content — tabbed settings,
      multi-section forms, and rich previews.
    </p>
    <div class="vd-tabs vd-tabs-pills">
      <ul class="vd-tab-list" role="tablist">
        <li class="vd-tab-item" role="presentation">
          <button
            class="vd-tab-link"
            :class="{ 'is-active': lgTab === 'general' }"
            @click="lgTab = 'general'"
          >
            <i class="ph ph-sliders-horizontal mr-1"></i>General
          </button>
        </li>
        <li class="vd-tab-item" role="presentation">
          <button
            class="vd-tab-link"
            :class="{ 'is-active': lgTab === 'design' }"
            @click="lgTab = 'design'"
          >
            <i class="ph ph-palette mr-1"></i>Design
          </button>
        </li>
        <li class="vd-tab-item" role="presentation">
          <button
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
          <div class="vd-form-group vd-mb-3">
            <label class="vd-label" for="m-name">Project name</label>
            <input
              type="text"
              id="m-name"
              class="vd-input"
              value="Vanduo Design System"
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
            <li class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-3">
              <i
                class="ph ph-check-circle"
                style="color: var(--vd-color-success)"
              ></i
              ><span>Email me when a teammate joins</span>
            </li>
            <li class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-0">
              <i class="ph ph-circle"></i
              ><span>Push notifications for mentions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <template #footer>
      <button class="vd-btn vd-btn-outline-secondary" @click="closeModal">
        Cancel
      </button>
      <button class="vd-btn vd-btn-primary" @click="closeModal">
        <i class="ph ph-floppy-disk mr-1"></i>Save Changes
      </button>
    </template>
  </VdModal>

  <!-- Extra Large (xl): dense multi-section dialog -->
  <VdModal
    :open="active === 'xl'"
    title="Release Overview"
    size="xl"
    @update:open="closeModal"
    @close="closeModal"
  >
    <p class="vd-mb-3">
      The extra-large modal (987px, Fibonacci 16) suits wide, multi-column
      workflows — release dashboards, comparison tables, and dense settings.
    </p>
    <div class="vd-d-flex vd-flex-wrap items-center vd-gap-2 vd-mb-4">
      <span class="vd-badge vd-badge-success">Stable</span>
      <span class="vd-badge vd-badge-primary">v1.2.1</span>
      <span class="vd-badge vd-badge-outlined vd-badge-secondary"
        >14 commits</span
      >
      <span class="vd-badge vd-badge-info">3 contributors</span>
    </div>

    <div class="vd-tabs vd-tabs-pills vd-mb-4">
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
            <div class="vd-col-12 vd-col-md-6 vd-mb-4">
              <h6 class="vd-mb-3">Release notes</h6>
              <p class="vd-text-sm vd-text-muted vd-mb-3">
                Ship a roomier dialog for side-by-side layouts. Pair tabs with
                short forms so reviewers can skim status and edit metadata in
                one place.
              </p>
              <div class="vd-form-group vd-mb-3">
                <label class="vd-label" for="xl-title">Release title</label>
                <input
                  id="xl-title"
                  type="text"
                  class="vd-input"
                  value="vd3 1.2.1 — Modal XL + Glass"
                />
              </div>
              <div class="vd-form-group vd-mb-3">
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
Extra-large modal width, glass variant for frosted dialogs, and denser docs demos.</textarea>
              </div>
            </div>
            <div class="vd-col-12 vd-col-md-6 vd-mb-4">
              <h6 class="vd-mb-3">Highlights</h6>
              <ul style="list-style: none; padding: 0; margin: 0">
                <li class="vd-d-flex items-start vd-gap-2 vd-mb-3">
                  <i
                    class="ph ph-check-circle"
                    style="color: var(--vd-color-success); margin-top: 0.125rem"
                  ></i>
                  <div>
                    <strong>size=&quot;xl&quot;</strong>
                    <p class="vd-text-sm vd-text-muted vd-mb-0">
                      Maps to <code>.vd-modal-panel-xl</code> (987px).
                    </p>
                  </div>
                </li>
                <li class="vd-d-flex items-start vd-gap-2 vd-mb-3">
                  <i
                    class="ph ph-check-circle"
                    style="color: var(--vd-color-success); margin-top: 0.125rem"
                  ></i>
                  <div>
                    <strong>Glass prop</strong>
                    <p class="vd-text-sm vd-text-muted vd-mb-0">
                      Frosted panel + blurred backdrop in one boolean.
                    </p>
                  </div>
                </li>
                <li class="vd-d-flex items-start vd-gap-2 vd-mb-0">
                  <i
                    class="ph ph-check-circle"
                    style="color: var(--vd-color-success); margin-top: 0.125rem"
                  ></i>
                  <div>
                    <strong>Focus &amp; Escape</strong>
                    <p class="vd-text-sm vd-text-muted vd-mb-0">
                      Dialog focus trap and Escape-to-close stay unchanged.
                    </p>
                  </div>
                </li>
              </ul>
              <div class="vd-alert vd-alert-primary vd-mt-4 vd-mb-0">
                <i class="ph ph-rocket-launch"></i>
                <div>
                  Use XL when a single column would force awkward scrolling —
                  keep related controls visible together.
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
                  <td>Add <code>size=&quot;xl&quot;</code> panel width</td>
                  <td>
                    <span class="vd-badge vd-badge-success">Feature</span>
                  </td>
                  <td>Design Systems</td>
                </tr>
                <tr>
                  <td>Expose <code>glass</code> on <code>VdModal</code></td>
                  <td>
                    <span class="vd-badge vd-badge-success">Feature</span>
                  </td>
                  <td>Design Systems</td>
                </tr>
                <tr>
                  <td>Enrich Modal docs XL demo</td>
                  <td>
                    <span class="vd-badge vd-badge-info">Docs</span>
                  </td>
                  <td>Docs</td>
                </tr>
                <tr>
                  <td>Clarify static-backdrop copy</td>
                  <td>
                    <span class="vd-badge vd-badge-secondary">Polish</span>
                  </td>
                  <td>Docs</td>
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
          <div class="vd-row">
            <div class="vd-col-12 vd-col-md-4 vd-mb-3">
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
            <div class="vd-col-12 vd-col-md-4 vd-mb-3">
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
            <div class="vd-col-12 vd-col-md-4 vd-mb-3">
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
            <li class="vd-d-flex items-center justify-between vd-mb-3">
              <span class="vd-d-flex items-center vd-gap-2">
                <i class="ph ph-user-circle"></i>Alex Rivera
              </span>
              <span class="vd-badge vd-badge-primary">Owner</span>
            </li>
            <li class="vd-d-flex items-center justify-between vd-mb-3">
              <span class="vd-d-flex items-center vd-gap-2">
                <i class="ph ph-user-circle"></i>Sam Chen
              </span>
              <span class="vd-badge vd-badge-outlined">Reviewer</span>
            </li>
            <li class="vd-d-flex items-center justify-between vd-mb-0">
              <span class="vd-d-flex items-center vd-gap-2">
                <i class="ph ph-user-circle"></i>Jordan Lee
              </span>
              <span class="vd-badge vd-badge-outlined">QA</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <template #footer>
      <button class="vd-btn vd-btn-outline-secondary" @click="closeModal">
        Close
      </button>
      <button class="vd-btn vd-btn-primary" @click="closeModal">
        <i class="ph ph-floppy-disk mr-1"></i>Save draft
      </button>
    </template>
  </VdModal>

  <!-- Glass -->
  <VdModal
    :open="active === 'glass'"
    title="Glass Modal"
    size="lg"
    glass
    :style="glassDemoStyle"
    @update:open="closeModal"
    @close="closeModal"
  >
    <p class="vd-mb-3 vd-text-sm vd-text-muted">
      Same tokens as the docs card — adjust here to preview the frost over the
      page behind this dialog.
    </p>

    <div class="glass-demo-controls vd-mb-4">
      <div class="vd-row vd-gap-3">
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
          <p class="vd-text-sm vd-text-muted vd-mt-1 vd-mb-0">
            <code>--vd-glass-blur</code> · backdrop uses half
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
          <p class="vd-text-sm vd-text-muted vd-mt-1 vd-mb-0">
            <code>--vd-glass-saturate</code>
          </p>
        </div>
        <div class="vd-col-12 vd-col-md-6">
          <VdSlider
            v-model="glassBgOpacity"
            id="glass-bg-opacity"
            label="Panel opacity"
            :min="0.2"
            :max="0.95"
            :step="0.05"
            show-value
            :disabled="glassHighContrast"
          />
          <p class="vd-text-sm vd-text-muted vd-mt-1 vd-mb-0">
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
            :max="0.5"
            :step="0.01"
            show-value
            :disabled="glassHighContrast"
          />
          <p class="vd-text-sm vd-text-muted vd-mt-1 vd-mb-0">
            <code>--vd-glass-border-alpha</code>
            <template v-if="glassHighContrast">
              · locked at 0.26 by high contrast
            </template>
          </p>
        </div>
      </div>

      <div class="vd-d-flex vd-flex-wrap vd-gap-4 items-center vd-mt-4 vd-mb-3">
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

      <div class="vd-d-flex vd-flex-wrap vd-gap-2">
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
        Live: blur {{ glassBlur }}px · saturate {{ glassSaturate }} · opacity
        {{ glassHighContrast ? 0.82 : glassBgOpacity }} · border
        {{ glassHighContrast ? 0.26 : glassBorderAlpha
        }}<template v-if="glassDeepShadow"> · deep shadow</template>
      </div>
    </div>
    <template #footer>
      <button class="vd-btn vd-btn-outline-secondary" @click="closeModal">
        Close
      </button>
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
    <div class="vd-alert vd-alert-warning vd-mb-4">
      <i class="ph ph-warning"></i>
      <div>
        <strong>This action cannot be undone.</strong> Clicking the backdrop
        will not close this modal — you must choose explicitly.
      </div>
    </div>
    <p class="vd-mb-3">
      You are about to permanently delete
      <strong>design-system-v2.fig</strong> and all associated assets.
    </p>
    <template #footer>
      <button class="vd-btn vd-btn-outline-secondary" @click="closeModal">
        Cancel
      </button>
      <button class="vd-btn vd-btn-danger" @click="closeModal">
        <i class="ph ph-trash mr-1"></i>Delete Permanently
      </button>
    </template>
  </VdModal>
</template>
