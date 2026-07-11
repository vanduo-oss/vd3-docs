<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

type ModalId = "sm" | "default" | "lg" | "xl" | "glass" | "static" | null;

const openModal = ref<ModalId>(null);
const lgTab = ref<"general" | "design" | "notify">("general");
const xlTab = ref<"overview" | "team" | "activity" | "settings">("overview");

const open = (id: Exclude<ModalId, null>): void => {
  openModal.value = id;
};
const close = (): void => {
  openModal.value = null;
};
/** Backdrop click closes everything except the static-backdrop modal. */
const backdrop = (id: Exclude<ModalId, null>): void => {
  if (id !== "static") close();
};

const onKeydown = (e: KeyboardEvent): void => {
  if (e.key === "Escape" && openModal.value && openModal.value !== "static") {
    close();
  }
};

watch(openModal, (val) => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = val ? "hidden" : "";
});

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  if (typeof document !== "undefined") document.body.style.overflow = "";
});

const triggerHtml = `<!-- Trigger button -->
<button class="vd-btn vd-btn-primary" data-modal="#my-modal">
  Open Modal
</button>

<!-- Modal markup -->
<div class="vd-modal" id="my-modal">
  <div class="vd-modal-dialog vd-modal-lg">
    <div class="vd-modal-content">
      <div class="vd-modal-header">
        <h5 class="vd-modal-title">Modal Title</h5>
        <button class="vd-modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="vd-modal-body">
        <p>Modal content goes here.</p>
      </div>
      <div class="vd-modal-footer">
        <button class="vd-btn vd-btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button class="vd-btn vd-btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>`;

const cssVars: [string, string, string][] = [
  ["--vd-modal-bg", "var(--vd-color-white)", "Modal content background"],
  ["--vd-modal-backdrop-bg", "rgba(0,0,0,0.5)", "Backdrop overlay color"],
  ["--vd-modal-border-color", "var(--vd-border-color)", "Content border color"],
  ["--vd-modal-padding", "1.3125rem (21px)", "Content padding (Fibonacci)"],
  ["--vd-modal-header-padding", "1.3125rem", "Header padding"],
  ["--vd-modal-body-padding", "1.3125rem", "Body padding"],
  ["--vd-modal-footer-padding", "1.3125rem", "Footer padding"],
  ["--vd-modal-width-sm", "233px", "Small width (fib 13)"],
  ["--vd-modal-width", "377px", "Default width (fib 14)"],
  ["--vd-modal-width-lg", "610px", "Large width (fib 15)"],
  ["--vd-modal-width-xl", "987px", "XL width (fib 16)"],
  ["--vd-modal-z-index", "1050", "Modal stacking"],
  ["--vd-modal-backdrop-z-index", "1040", "Backdrop stacking"],
];
const classRows: [string, string][] = [
  [
    ".vd-modal",
    "Base modal container. Hidden by default; shown with .is-open.",
  ],
  [
    ".vd-modal-dialog",
    "Centered wrapper that constrains width and handles entrance animation.",
  ],
  [
    ".vd-modal-content",
    "White/glass card containing header, body, and footer.",
  ],
  [".vd-modal-header", "Top bar with title and close button."],
  [".vd-modal-title", "Heading style for the modal title."],
  [".vd-modal-close", "Close button positioned at top-right of the header."],
  [".vd-modal-body", "Scrollable content area."],
  [".vd-modal-footer", "Bottom action bar, typically for buttons."],
  [".vd-modal-sm", "Small width modifier on .vd-modal-dialog."],
  [".vd-modal-lg", "Large width modifier."],
  [".vd-modal-xl", "Extra large width modifier."],
  [".vd-modal-glass", "Frosted glass backdrop and translucent panel."],
  [".vd-modal-static", "Backdrop click does not close the modal."],
  [
    ".vd-modal-scrollable",
    "Allows the modal body to scroll independently when content overflows.",
  ],
  [".is-open", "State class toggled by JavaScript to show the modal."],
];
const dataAttrs: [string, string][] = [
  [
    'data-modal="#id"',
    "Placed on a trigger button to open the targeted modal.",
  ],
  [
    'data-dismiss="modal"',
    "Placed on any button inside the modal to close it when clicked.",
  ],
];
const jsMethods: [string, string][] = [
  ["VanduoModals.open(el)", "Open the modal element programmatically."],
  ["VanduoModals.close(el)", "Close the modal element."],
  ["VanduoModals.toggle(el)", "Toggle open/closed state."],
  [
    "VanduoModals.init()",
    'Wire up all [data-modal] and [data-dismiss="modal"] triggers.',
  ],
];
const events: [string, string][] = [
  ["modal:open", "Fired on the modal element when it opens."],
  ["modal:close", "Fired on the modal element when it closes."],
];

// Engine-specific usage: Vue state-driven vs Vanilla data-attribute triggers.
const vue3Usage = `<script setup lang="ts">
import { ref } from 'vue';
const open = ref(false);
<\/script>

<template>
  <button class="vd-btn vd-btn-primary" @click="open = true">Open Modal</button>

  <div v-if="open" class="vd-modal is-open" @click.self="open = false">
    <div class="vd-modal-dialog">
      <div class="vd-modal-content">
        <div class="vd-modal-header">
          <h5 class="vd-modal-title">Modal Title</h5>
          <button class="vd-modal-close" @click="open = false">&times;</button>
        </div>
        <div class="vd-modal-body">Modal content goes here.</div>
      </div>
    </div>
  </div>
</template>`;

const vue3Api: [string, string][] = [
  [
    "ref + v-if / .is-open",
    "Drive the modal from a boolean ref — toggle visibility and the .is-open class from component state; no global API needed.",
  ],
  [
    "@click.self / Escape",
    "Close on backdrop click (skip for static) and Escape, wired with @click and a keydown listener in your component.",
  ],
  [
    "modal:open / modal:close",
    "Optional native events if you prefer the data-attribute flow over refs.",
  ],
];
</script>

<template>
  <section id="modals">
    <h5 class="demo-title"><i class="ph ph-squares-four"></i>Modals</h5>
    <p class="vd-mb-8">
      Overlay dialogs for confirmations, forms, and focused user tasks. Modals
      support four size tiers, glassmorphism styling, scrollable content, static
      backdrops, and are fully keyboard accessible.
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
            <button class="vd-btn vd-btn-primary" @click="open('sm')">
              Small (233px)
            </button>
            <button class="vd-btn vd-btn-primary" @click="open('default')">
              Default (377px)
            </button>
            <button class="vd-btn vd-btn-primary" @click="open('lg')">
              Large (610px)
            </button>
            <button class="vd-btn vd-btn-primary" @click="open('xl')">
              Extra Large (987px)
            </button>
          </div>
        </div>
        <DocCodeSnippet :html="triggerHtml" />
      </div>
    </div>

    <!-- Glass + Static -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Glass Modal</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <button class="vd-btn vd-btn-primary" @click="open('glass')">
              Open Glass Modal
            </button>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Static Backdrop</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <button class="vd-btn vd-btn-primary" @click="open('static')">
              Static Backdrop
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reference tables -->
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
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :html="vue3Usage" :default-open="true"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :html="triggerHtml" :default-open="true"
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
                  <tr v-for="r in classRows" :key="r[0]">
                    <td>
                      <code>{{ r[0] }}</code>
                    </td>
                    <td>{{ r[1] }}</td>
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
                  <tr v-for="r in dataAttrs" :key="r[0]">
                    <td>
                      <code>{{ r[0] }}</code>
                    </td>
                    <td>{{ r[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <EngineSwitch>
              <template #vue3>
                <h4 class="vd-mt-6">Component Approach</h4>
                <div class="vd-table-responsive">
                  <table class="vd-table vd-table-striped">
                    <thead>
                      <tr>
                        <th>Pattern</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="r in vue3Api" :key="r[0]">
                        <td>
                          <code>{{ r[0] }}</code>
                        </td>
                        <td>{{ r[1] }}</td>
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
                      <tr v-for="r in jsMethods" :key="r[0]">
                        <td>
                          <code>{{ r[0] }}</code>
                        </td>
                        <td>{{ r[1] }}</td>
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
                  <tr v-for="r in events" :key="r[0]">
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
                When opened, focus moves to the first focusable element inside
                the modal (typically the close button).
              </li>
              <li>
                Focus is trapped within the modal while open —
                <kbd>Tab</kbd> cycles through modal contents only.
              </li>
              <li>
                <kbd>Escape</kbd> closes the modal unless
                <code>.vd-modal-static</code> is present.
              </li>
              <li>
                The modal container receives <code>role="dialog"</code> and
                <code>aria-modal="true"</code>.
              </li>
              <li>
                Use <code>aria-labelledby</code> on
                <code>.vd-modal</code> pointing to
                <code>.vd-modal-title</code> so screen readers announce the
                title.
              </li>
              <li>
                On close, focus returns to the trigger element that opened the
                modal.
              </li>
              <li>
                The backdrop blocks interaction with the rest of the page and is
                marked <code>aria-hidden="true"</code>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Modals (teleported to escape stacking contexts) ── -->
  <Teleport to="body">
    <!-- Small -->
    <div
      class="vd-modal"
      :class="{ 'is-open': openModal === 'sm' }"
      role="dialog"
      aria-modal="true"
      @click.self="backdrop('sm')"
    >
      <div class="vd-modal-dialog vd-modal-sm">
        <div class="vd-modal-content">
          <div class="vd-modal-header">
            <h5 class="vd-modal-title">Small Modal</h5>
            <button class="vd-modal-close" aria-label="Close" @click="close">
              &times;
            </button>
          </div>
          <div class="vd-modal-body">
            <p class="vd-mb-0">
              This is the small modal size. Perfect for confirmations and short
              messages.
            </p>
          </div>
          <div class="vd-modal-footer">
            <button class="vd-btn vd-btn-outline-secondary" @click="close">
              Cancel
            </button>
            <button class="vd-btn vd-btn-primary" @click="close">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Default: form -->
    <div
      class="vd-modal"
      :class="{ 'is-open': openModal === 'default' }"
      role="dialog"
      aria-modal="true"
      @click.self="backdrop('default')"
    >
      <div class="vd-modal-dialog">
        <div class="vd-modal-content">
          <div class="vd-modal-header">
            <h5 class="vd-modal-title">
              <i
                class="ph ph-user-plus mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >Invite Teammate
            </h5>
            <button class="vd-modal-close" aria-label="Close" @click="close">
              &times;
            </button>
          </div>
          <div class="vd-modal-body">
            <p class="vd-mb-4">
              The default modal width (377px) is ideal for focused tasks — quick
              forms, confirmations, and short workflows.
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
          </div>
          <div class="vd-modal-footer">
            <button class="vd-btn vd-btn-outline-secondary" @click="close">
              Cancel
            </button>
            <button class="vd-btn vd-btn-primary" @click="close">
              <i class="ph ph-paper-plane-tilt mr-1"></i>Send Invite
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Large: tabs -->
    <div
      class="vd-modal"
      :class="{ 'is-open': openModal === 'lg' }"
      role="dialog"
      aria-modal="true"
      @click.self="backdrop('lg')"
    >
      <div class="vd-modal-dialog vd-modal-lg">
        <div class="vd-modal-content">
          <div class="vd-modal-header">
            <h5 class="vd-modal-title">
              <i
                class="ph ph-gear-six mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >Project Settings
            </h5>
            <button class="vd-modal-close" aria-label="Close" @click="close">
              &times;
            </button>
          </div>
          <div class="vd-modal-body">
            <p class="vd-mb-4">
              Large modals (610px) give room for structured content — tabbed
              settings, multi-section forms, and rich previews.
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
                  <div class="vd-row">
                    <div class="vd-col-12 vd-col-md-6">
                      <div class="vd-form-group vd-mb-3">
                        <label class="vd-label" for="m-name">Project name</label
                        ><input
                          type="text"
                          id="m-name"
                          class="vd-input"
                          value="Vanduo Design System"
                        />
                      </div>
                    </div>
                    <div class="vd-col-12 vd-col-md-6">
                      <div class="vd-form-group vd-mb-3">
                        <label class="vd-label" for="m-url">Project URL</label
                        ><input
                          type="text"
                          id="m-url"
                          class="vd-input"
                          value="vanduo.dev/design"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="vd-form-group vd-mb-0">
                    <label class="vd-label" for="m-desc">Description</label
                    ><textarea id="m-desc" class="vd-input" rows="3">
A Fibonacci-scaled component library for modern web apps.</textarea>
                  </div>
                </div>
                <div
                  class="vd-tab-pane"
                  :class="{ 'is-active': lgTab === 'design' }"
                  role="tabpanel"
                >
                  <div class="vd-d-flex vd-gap-3 vd-flex-wrap vd-mb-4">
                    <div
                      class="vd-card vd-card-glow"
                      style="flex: 1; min-width: 140px"
                    >
                      <div class="vd-card-body vd-text-center">
                        <i
                          class="ph ph-sun"
                          style="
                            font-size: 1.75rem;
                            color: var(--vd-color-warning);
                          "
                        ></i>
                        <p class="vd-mb-0 vd-mt-2"><strong>Light</strong></p>
                      </div>
                    </div>
                    <div
                      class="vd-card vd-card-glow"
                      style="
                        flex: 1;
                        min-width: 140px;
                        border-color: var(--vd-color-primary);
                      "
                    >
                      <div class="vd-card-body vd-text-center">
                        <i
                          class="ph ph-moon-stars"
                          style="
                            font-size: 1.75rem;
                            color: var(--vd-color-primary);
                          "
                        ></i>
                        <p class="vd-mb-0 vd-mt-2"><strong>Dark</strong></p>
                      </div>
                    </div>
                    <div
                      class="vd-card vd-card-glow"
                      style="flex: 1; min-width: 140px"
                    >
                      <div class="vd-card-body vd-text-center">
                        <i
                          class="ph ph-desktop"
                          style="
                            font-size: 1.75rem;
                            color: var(--vd-color-info);
                          "
                        ></i>
                        <p class="vd-mb-0 vd-mt-2"><strong>System</strong></p>
                      </div>
                    </div>
                  </div>
                  <div class="vd-alert vd-alert-primary vd-mb-0">
                    <i class="ph ph-sparkle"></i>
                    <div>
                      Theme changes apply instantly across all connected
                      components.
                    </div>
                  </div>
                </div>
                <div
                  class="vd-tab-pane"
                  :class="{ 'is-active': lgTab === 'notify' }"
                  role="tabpanel"
                >
                  <ul style="list-style: none; padding: 0; margin: 0">
                    <li
                      class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-3"
                    >
                      <i
                        class="ph ph-check-circle"
                        style="color: var(--vd-color-success)"
                      ></i
                      ><span>Email me when a teammate joins</span>
                    </li>
                    <li
                      class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-3"
                    >
                      <i
                        class="ph ph-check-circle"
                        style="color: var(--vd-color-success)"
                      ></i
                      ><span>Weekly activity digest</span>
                    </li>
                    <li
                      class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-0"
                    >
                      <i class="ph ph-circle"></i
                      ><span>Push notifications for mentions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="vd-modal-footer">
            <button class="vd-btn vd-btn-outline-secondary" @click="close">
              Cancel
            </button>
            <button class="vd-btn vd-btn-primary" @click="close">
              <i class="ph ph-floppy-disk mr-1"></i>Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- XL: tabs -->
    <div
      class="vd-modal"
      :class="{ 'is-open': openModal === 'xl' }"
      role="dialog"
      aria-modal="true"
      @click.self="backdrop('xl')"
    >
      <div class="vd-modal-dialog vd-modal-xl">
        <div class="vd-modal-content">
          <div class="vd-modal-header">
            <h5 class="vd-modal-title">
              <i
                class="ph ph-rocket-launch mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >Launch Campaign
            </h5>
            <button class="vd-modal-close" aria-label="Close" @click="close">
              &times;
            </button>
          </div>
          <div class="vd-modal-body">
            <p class="vd-mb-5">
              Extra large modals (987px) span most of the viewport — perfect for
              dashboards, preview panes, and data-rich workflows.
            </p>
            <div class="vd-tabs">
              <ul class="vd-tab-list" role="tablist">
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    :class="{ 'is-active': xlTab === 'overview' }"
                    @click="xlTab = 'overview'"
                  >
                    <i class="ph ph-chart-line-up mr-1"></i>Overview
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    :class="{ 'is-active': xlTab === 'team' }"
                    @click="xlTab = 'team'"
                  >
                    <i class="ph ph-users-three mr-1"></i>Team
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    :class="{ 'is-active': xlTab === 'activity' }"
                    @click="xlTab = 'activity'"
                  >
                    <i class="ph ph-pulse mr-1"></i>Activity
                  </button>
                </li>
                <li class="vd-tab-item" role="presentation">
                  <button
                    class="vd-tab-link"
                    :class="{ 'is-active': xlTab === 'settings' }"
                    @click="xlTab = 'settings'"
                  >
                    <i class="ph ph-gear mr-1"></i>Settings
                  </button>
                </li>
              </ul>
              <div class="vd-tab-content">
                <div
                  class="vd-tab-pane"
                  :class="{ 'is-active': xlTab === 'overview' }"
                  role="tabpanel"
                >
                  <div class="vd-row vd-mb-5">
                    <div class="vd-col-12 vd-col-md-4">
                      <div class="vd-card vd-card-glow">
                        <div class="vd-card-body">
                          <div
                            class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-2"
                          >
                            <i
                              class="ph ph-eye"
                              style="
                                color: var(--vd-color-primary);
                                font-size: 1.25rem;
                              "
                            ></i
                            ><span class="vd-text-muted">Impressions</span>
                          </div>
                          <h4 class="vd-mb-0">24,891</h4>
                          <small style="color: var(--vd-color-success)"
                            ><i class="ph ph-trend-up mr-1"></i>+12.4%</small
                          >
                        </div>
                      </div>
                    </div>
                    <div class="vd-col-12 vd-col-md-4">
                      <div class="vd-card vd-card-glow">
                        <div class="vd-card-body">
                          <div
                            class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-2"
                          >
                            <i
                              class="ph ph-cursor-click"
                              style="
                                color: var(--vd-color-info);
                                font-size: 1.25rem;
                              "
                            ></i
                            ><span class="vd-text-muted">Click-through</span>
                          </div>
                          <h4 class="vd-mb-0">3.8%</h4>
                          <small style="color: var(--vd-color-success)"
                            ><i class="ph ph-trend-up mr-1"></i>+0.6%</small
                          >
                        </div>
                      </div>
                    </div>
                    <div class="vd-col-12 vd-col-md-4">
                      <div class="vd-card vd-card-glow">
                        <div class="vd-card-body">
                          <div
                            class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-2"
                          >
                            <i
                              class="ph ph-shopping-cart"
                              style="
                                color: var(--vd-color-warning);
                                font-size: 1.25rem;
                              "
                            ></i
                            ><span class="vd-text-muted">Conversions</span>
                          </div>
                          <h4 class="vd-mb-0">847</h4>
                          <small style="color: var(--vd-color-success)"
                            ><i class="ph ph-trend-up mr-1"></i>+8.2%</small
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="vd-alert vd-alert-success vd-mb-0">
                    <i class="ph ph-check-circle"></i>
                    <div>
                      <strong>Campaign is live.</strong> All channels are active
                      and tracking is enabled across web, email, and social.
                    </div>
                  </div>
                </div>
                <div
                  class="vd-tab-pane"
                  :class="{ 'is-active': xlTab === 'team' }"
                  role="tabpanel"
                >
                  <div class="vd-table-responsive">
                    <table class="vd-table vd-table-striped vd-mb-0">
                      <thead>
                        <tr>
                          <th>Member</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Last active</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <i class="ph ph-user-circle mr-1"></i> Alex Rivera
                          </td>
                          <td>Lead Designer</td>
                          <td>
                            <span style="color: var(--vd-color-success)"
                              ><i
                                class="ph ph-circle-fill"
                                style="font-size: 0.5rem"
                              ></i>
                              Online</span
                            >
                          </td>
                          <td>Just now</td>
                        </tr>
                        <tr>
                          <td>
                            <i class="ph ph-user-circle mr-1"></i> Jordan Lee
                          </td>
                          <td>Developer</td>
                          <td>
                            <span style="color: var(--vd-color-success)"
                              ><i
                                class="ph ph-circle-fill"
                                style="font-size: 0.5rem"
                              ></i>
                              Online</span
                            >
                          </td>
                          <td>2 min ago</td>
                        </tr>
                        <tr>
                          <td>
                            <i class="ph ph-user-circle mr-1"></i> Sam Patel
                          </td>
                          <td>Product Manager</td>
                          <td>
                            <span class="vd-text-muted"
                              ><i
                                class="ph ph-circle-fill"
                                style="font-size: 0.5rem"
                              ></i>
                              Away</span
                            >
                          </td>
                          <td>1 hr ago</td>
                        </tr>
                        <tr>
                          <td>
                            <i class="ph ph-user-circle mr-1"></i> Casey Morgan
                          </td>
                          <td>Marketing</td>
                          <td>
                            <span class="vd-text-muted"
                              ><i
                                class="ph ph-circle-fill"
                                style="font-size: 0.5rem"
                              ></i>
                              Offline</span
                            >
                          </td>
                          <td>Yesterday</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  class="vd-tab-pane"
                  :class="{ 'is-active': xlTab === 'activity' }"
                  role="tabpanel"
                >
                  <ul style="list-style: none; padding: 0; margin: 0">
                    <li class="vd-d-flex vd-gap-3 vd-mb-4">
                      <i
                        class="ph ph-pencil-simple"
                        style="
                          color: var(--vd-color-primary);
                          font-size: 1.25rem;
                          margin-top: 2px;
                        "
                      ></i>
                      <div>
                        <strong>Alex updated the hero banner</strong>
                        <p class="vd-mb-0 vd-text-muted">
                          Changed headline copy and CTA color · 12 min ago
                        </p>
                      </div>
                    </li>
                    <li class="vd-d-flex vd-gap-3 vd-mb-4">
                      <i
                        class="ph ph-upload"
                        style="
                          color: var(--vd-color-info);
                          font-size: 1.25rem;
                          margin-top: 2px;
                        "
                      ></i>
                      <div>
                        <strong>Jordan deployed v1.4.4</strong>
                        <p class="vd-mb-0 vd-text-muted">
                          Production build with modal size fixes · 45 min ago
                        </p>
                      </div>
                    </li>
                    <li class="vd-d-flex vd-gap-3 vd-mb-4">
                      <i
                        class="ph ph-chat-circle"
                        style="
                          color: var(--vd-color-warning);
                          font-size: 1.25rem;
                          margin-top: 2px;
                        "
                      ></i>
                      <div>
                        <strong>Sam approved the launch checklist</strong>
                        <p class="vd-mb-0 vd-text-muted">
                          All 12 items verified · 2 hr ago
                        </p>
                      </div>
                    </li>
                    <li class="vd-d-flex vd-gap-3 vd-mb-0">
                      <i
                        class="ph ph-envelope"
                        style="
                          color: var(--vd-color-success);
                          font-size: 1.25rem;
                          margin-top: 2px;
                        "
                      ></i>
                      <div>
                        <strong>Casey sent the announcement email</strong>
                        <p class="vd-mb-0 vd-text-muted">
                          Delivered to 12,400 subscribers · Yesterday
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div
                  class="vd-tab-pane"
                  :class="{ 'is-active': xlTab === 'settings' }"
                  role="tabpanel"
                >
                  <div class="vd-row">
                    <div class="vd-col-12 vd-col-md-6">
                      <h6 class="vd-mb-3">
                        <i class="ph ph-calendar mr-1"></i>Schedule
                      </h6>
                      <div class="vd-form-group vd-mb-3">
                        <label class="vd-label" for="m-start">Start date</label
                        ><input
                          type="text"
                          id="m-start"
                          class="vd-input"
                          value="May 23, 2026"
                        />
                      </div>
                      <div class="vd-form-group vd-mb-0">
                        <label class="vd-label" for="m-end">End date</label
                        ><input
                          type="text"
                          id="m-end"
                          class="vd-input"
                          value="Jun 30, 2026"
                        />
                      </div>
                    </div>
                    <div class="vd-col-12 vd-col-md-6">
                      <h6 class="vd-mb-3">
                        <i class="ph ph-broadcast mr-1"></i>Channels
                      </h6>
                      <ul style="list-style: none; padding: 0; margin: 0">
                        <li
                          class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-2"
                        >
                          <i
                            class="ph ph-check-square"
                            style="color: var(--vd-color-primary)"
                          ></i>
                          Website landing page
                        </li>
                        <li
                          class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-2"
                        >
                          <i
                            class="ph ph-check-square"
                            style="color: var(--vd-color-primary)"
                          ></i>
                          Email newsletter
                        </li>
                        <li
                          class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-2"
                        >
                          <i
                            class="ph ph-check-square"
                            style="color: var(--vd-color-primary)"
                          ></i>
                          Social media posts
                        </li>
                        <li
                          class="vd-d-flex vd-align-items-center vd-gap-2 vd-mb-0"
                        >
                          <i class="ph ph-square"></i> Paid search ads
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="vd-modal-footer">
            <button class="vd-btn vd-btn-outline-secondary" @click="close">
              <i class="ph ph-x mr-1"></i>Cancel
            </button>
            <button class="vd-btn vd-btn-outline-primary" @click="close">
              <i class="ph ph-floppy-disk mr-1"></i>Save Draft
            </button>
            <button class="vd-btn vd-btn-primary" @click="close">
              <i class="ph ph-rocket-launch mr-1"></i>Launch Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Glass -->
    <div
      class="vd-modal vd-modal-glass"
      :class="{ 'is-open': openModal === 'glass' }"
      role="dialog"
      aria-modal="true"
      @click.self="backdrop('glass')"
    >
      <div class="vd-modal-dialog">
        <div class="vd-modal-content">
          <div class="vd-modal-header">
            <h5 class="vd-modal-title">Glass Modal</h5>
            <button class="vd-modal-close" aria-label="Close" @click="close">
              &times;
            </button>
          </div>
          <div class="vd-modal-body">
            <p class="vd-mb-0">
              Add <code>.vd-modal-glass</code> to the modal root for a
              frosted-glass backdrop and panel.
            </p>
          </div>
          <div class="vd-modal-footer">
            <button class="vd-btn vd-btn-outline-secondary" @click="close">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Static backdrop -->
    <div
      class="vd-modal vd-modal-static"
      :class="{ 'is-open': openModal === 'static' }"
      role="dialog"
      aria-modal="true"
    >
      <div class="vd-modal-dialog">
        <div class="vd-modal-content">
          <div class="vd-modal-header">
            <h5 class="vd-modal-title">
              <i
                class="ph ph-trash mr-2"
                style="color: var(--vd-color-error)"
              ></i
              >Confirm Delete
            </h5>
            <button class="vd-modal-close" aria-label="Close" @click="close">
              &times;
            </button>
          </div>
          <div class="vd-modal-body">
            <div class="vd-alert vd-alert-warning vd-mb-4">
              <i class="ph ph-warning"></i>
              <div>
                <strong>This action cannot be undone.</strong> Clicking the
                backdrop will not close this modal — you must choose explicitly.
              </div>
            </div>
            <p class="vd-mb-3">
              You are about to permanently delete
              <strong>design-system-v2.fig</strong> and all associated assets:
            </p>
            <ul class="vd-mb-4" style="padding-left: 1.25rem">
              <li>12 component variants</li>
              <li>4 shared color styles</li>
              <li>Team comments and version history</li>
            </ul>
            <div class="vd-card" style="background: var(--vd-bg-secondary)">
              <div
                class="vd-card-body vd-d-flex vd-align-items-center vd-gap-3"
              >
                <i
                  class="ph ph-file-dashed"
                  style="font-size: 2rem; color: var(--vd-color-error)"
                ></i>
                <div>
                  <strong>design-system-v2.fig</strong>
                  <p class="vd-mb-0 vd-text-muted">
                    Last modified May 20, 2026 · 4.2 MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="vd-modal-footer">
            <button class="vd-btn vd-btn-outline-secondary" @click="close">
              Cancel
            </button>
            <button class="vd-btn vd-btn-danger" @click="close">
              <i class="ph ph-trash mr-1"></i>Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
