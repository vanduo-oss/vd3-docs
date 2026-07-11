<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useStepper } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
const stepper = useStepper(root);

// Port of the docs `data-stepper-demo-control` Prev/Next buttons
// (docs/js/modules/demos.js), delegated so the markup stays 1-to-1.
let onControlClick: ((e: Event) => void) | null = null;
onMounted(() => {
  const host = root.value;
  if (!host) return;
  onControlClick = (e: Event): void => {
    const button = (e.target as HTMLElement).closest<HTMLElement>(
      "[data-stepper-demo-control]",
    );
    if (!button) return;
    e.preventDefault();
    const action = button.getAttribute("data-stepper-demo-control");
    const targetSelector = button.getAttribute("data-stepper-target");
    const target = targetSelector ? host.querySelector(targetSelector) : null;
    if (!target) return;
    if (action === "next") stepper.next(target);
    else if (action === "prev") stepper.prev(target);
  };
  host.addEventListener("click", onControlClick);
});
onUnmounted(() => {
  if (onControlClick) root.value?.removeEventListener("click", onControlClick);
  onControlClick = null;
});

const cssClasses: [string, string][] = [
  [
    ".vd-stepper",
    "Base container for the stepper component. Renders a horizontal step track by default.",
  ],
  [
    ".vd-stepper-vertical",
    "Modifier that stacks steps vertically with a connecting line on the left.",
  ],
  [
    ".vd-stepper-clickable",
    "Enables pointer cursor and click-to-navigate behavior on each step.",
  ],
  [
    ".vd-stepper-item",
    "Individual step wrapper. Holds the circle, label, and description.",
  ],
  [
    ".vd-stepper-circle",
    "Circular indicator showing the step number, check icon, or error icon.",
  ],
  [".vd-stepper-label", "Primary text label for the step."],
  [
    ".vd-stepper-description",
    "Secondary text below the label providing additional context.",
  ],
  [
    ".is-active",
    "Marks the currently active step with primary-colored circle and bold label.",
  ],
  [
    ".is-completed",
    "Marks a step as finished. Displays a check icon and success styling.",
  ],
  [
    ".is-error",
    "Marks a step as having an error. Displays danger color and warning icon.",
  ],
];

const jsMethods: [string, string][] = [
  [
    "VanduoStepper.init()",
    "Initializes all stepper instances in the DOM. Call after dynamic content loads.",
  ],
  [
    "VanduoStepper.setStep(el, index)",
    "Sets the active step to the given zero-based index. Previous steps are marked completed.",
  ],
  [
    "VanduoStepper.next(el)",
    "Advances to the next step. Marks the current step as completed.",
  ],
  [
    "VanduoStepper.prev(el)",
    "Returns to the previous step. Reverts the current step to pending.",
  ],
  [
    "VanduoStepper.destroy(el)",
    "Removes event listeners and internal state for the given stepper element.",
  ],
];

const events: [string, string][] = [
  [
    "stepper:change",
    "Fired on the stepper element when the active step changes. event.detail contains { current, previous, total }.",
  ],
];

// Engine-specific wiring (the markup and classes are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useStepper } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
const stepper = useStepper(root);   // wires .vd-stepper inside root; cleanup on unmount

// drive it imperatively
stepper.next(stepperEl);
stepper.setStep(stepperEl, 2);`;

const vanillaWiring = `// Wire every .vd-stepper (document, or a root element)
VanduoStepper.init();

// drive it imperatively
VanduoStepper.next(stepperEl);
VanduoStepper.setStep(stepperEl, 2);`;

const vue3Api: [string, string][] = [
  [
    "useStepper(root)",
    "Composable — wires every .vd-stepper inside the root ref; returns an imperative API. Call once in setup().",
  ],
  [
    "stepper.next(el) / prev(el)",
    "Advance or rewind the given stepper element.",
  ],
  [
    "stepper.setStep(el, index)",
    "Set the active step (zero-based); earlier steps are marked completed.",
  ],
];
</script>

<template>
  <section id="stepper" ref="root">
    <h5 class="demo-title"><i class="ph ph-steps"></i>Stepper</h5>
    <p class="vd-mb-8">
      Multi-step progress indicators for wizards, checkout flows, and onboarding
      sequences. Supports horizontal, vertical, and clickable variants with
      built-in state management.
    </p>

    <!-- Horizontal Stepper -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div
          id="demo-stepper-horizontal"
          class="vd-card vd-card-glow demo-card"
        >
          <div class="vd-card-header">
            <h6><i class="ph ph-arrow-right"></i> Horizontal Stepper</h6>
          </div>
          <div class="vd-card-body">
            <div id="stepper-h-demo" class="vd-stepper" role="list">
              <div class="vd-stepper-item is-completed" role="listitem">
                <div class="vd-stepper-circle">
                  <i class="ph ph-check"></i>
                </div>
                <div class="vd-stepper-label">
                  Account
                  <span class="vd-stepper-description"
                    >Create your credentials</span
                  >
                </div>
              </div>
              <div class="vd-stepper-item is-completed" role="listitem">
                <div class="vd-stepper-circle">
                  <i class="ph ph-check"></i>
                </div>
                <div class="vd-stepper-label">
                  Profile
                  <span class="vd-stepper-description"
                    >Personal information</span
                  >
                </div>
              </div>
              <div class="vd-stepper-item is-active" role="listitem">
                <div class="vd-stepper-circle">3</div>
                <div class="vd-stepper-label">
                  Preferences
                  <span class="vd-stepper-description"
                    >Customize your experience</span
                  >
                </div>
              </div>
              <div class="vd-stepper-item" role="listitem">
                <div class="vd-stepper-circle">4</div>
                <div class="vd-stepper-label">
                  Confirmation
                  <span class="vd-stepper-description"
                    >Review &amp; submit</span
                  >
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                gap: 0.5rem;
                justify-content: center;
                margin-top: 1.5rem;
              "
            >
              <button
                class="vd-btn vd-btn-outline vd-btn-sm"
                data-stepper-demo-control="prev"
                data-stepper-target="#stepper-h-demo"
              >
                <i class="ph ph-caret-left"></i> Previous
              </button>
              <button
                class="vd-btn vd-btn-primary vd-btn-sm"
                data-stepper-demo-control="next"
                data-stepper-target="#stepper-h-demo"
              >
                Next <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vertical + Clickable -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-stepper-vertical" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-arrow-down"></i> Vertical Stepper</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-stepper vd-stepper-vertical" role="list">
              <div class="vd-stepper-item is-completed" role="listitem">
                <div class="vd-stepper-circle">
                  <i class="ph ph-check"></i>
                </div>
                <div class="vd-stepper-label">
                  Order Placed
                  <span class="vd-stepper-description"
                    >Your order has been confirmed</span
                  >
                </div>
              </div>
              <div class="vd-stepper-item is-active" role="listitem">
                <div class="vd-stepper-circle">2</div>
                <div class="vd-stepper-label">
                  Processing
                  <span class="vd-stepper-description"
                    >We're preparing your items</span
                  >
                </div>
              </div>
              <div class="vd-stepper-item" role="listitem">
                <div class="vd-stepper-circle">3</div>
                <div class="vd-stepper-label">
                  Shipped
                  <span class="vd-stepper-description"
                    >On the way to your address</span
                  >
                </div>
              </div>
              <div class="vd-stepper-item" role="listitem">
                <div class="vd-stepper-circle">4</div>
                <div class="vd-stepper-label">
                  Delivered
                  <span class="vd-stepper-description">Package received</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-stepper-clickable" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-cursor-click"></i> Clickable Stepper</h6>
          </div>
          <div class="vd-card-body">
            <div
              id="stepper-click-demo"
              class="vd-stepper vd-stepper-clickable"
              role="list"
            >
              <div
                class="vd-stepper-item is-completed"
                role="listitem"
                tabindex="0"
              >
                <div class="vd-stepper-circle">
                  <i class="ph ph-check"></i>
                </div>
                <div class="vd-stepper-label">
                  Plan
                  <span class="vd-stepper-description"
                    >Choose a subscription</span
                  >
                </div>
              </div>
              <div
                class="vd-stepper-item is-active"
                role="listitem"
                tabindex="0"
              >
                <div class="vd-stepper-circle">2</div>
                <div class="vd-stepper-label">
                  Billing
                  <span class="vd-stepper-description">Payment details</span>
                </div>
              </div>
              <div
                class="vd-stepper-item is-error"
                role="listitem"
                tabindex="0"
              >
                <div class="vd-stepper-circle">
                  <i class="ph ph-warning"></i>
                </div>
                <div class="vd-stepper-label">
                  Verification
                  <span class="vd-stepper-description"
                    >Identity check failed</span
                  >
                </div>
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-4">
              <i class="ph ph-info"></i> Click any step to navigate directly.
              The error state on step 3 shows validation feedback.
            </p>
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
                The stepper container uses <code>role="list"</code> and each
                step uses <code>role="listitem"</code> for assistive technology.
              </li>
              <li>
                Active step is announced via <code>aria-current="step"</code>.
              </li>
              <li>
                Completed steps convey state through
                <code>aria-label="Completed"</code> on the circle.
              </li>
              <li>
                Error steps include <code>aria-label="Error"</code> for screen
                reader feedback.
              </li>
              <li>
                Clickable steppers add <code>tabindex="0"</code> and respond to
                <kbd>Enter</kbd> and <kbd>Space</kbd> key presses.
              </li>
              <li>
                Focus order follows the visual step sequence from first to last.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
