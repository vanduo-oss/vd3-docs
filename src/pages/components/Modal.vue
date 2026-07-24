<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdModal } from "@vanduo-oss/vd3";

type ModalId = "sm" | "md" | "lg" | "static" | null;

const active = ref<ModalId>(null);
const lgTab = ref<"general" | "design" | "notify">("general");

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

const propRows: [string, string][] = [
  [
    "open",
    "boolean (required) — controls visibility. Pair with v-model:open or handle @update:open.",
  ],
  [
    "title",
    'string — header title; also used as the dialog aria-label (falls back to "Dialog").',
  ],
  ["size", '"sm" | "md" | "lg" — panel width (default "md").'],
  [
    "closeOnBackdrop",
    "boolean — whether a backdrop click closes the modal (default true).",
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
  ["--vd-modal-z-index", "1050", "Modal stacking"],
  ["--vd-modal-backdrop-z-index", "1040", "Backdrop stacking"],
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
  [".vd-modal-panel-sm / -md / -lg", "Panel width matching the size prop."],
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
      <code>v-model:open</code>, choose one of three size tiers, and fill the
      body / <code>#footer</code> slots — the header title and close button are
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
          </div>
        </div>
        <DocCodeSnippet :html="usageSnippet" />
      </div>
    </div>

    <!-- Static backdrop -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
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
