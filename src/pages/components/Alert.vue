<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const dismissed = ref(false);

const vue3Usage = `<script setup lang="ts">
import { VdAlert } from "@vanduo-oss/vue";
<\/script>

<template>
  <VdAlert variant="success" title="Saved">Your changes are saved.</VdAlert>

  <!-- danger replaces the former error spelling -->
  <VdAlert variant="danger" dismissible @dismiss="onDismiss">
    Unable to connect to the server.
  </VdAlert>
</template>`;

const vanillaUsage = `<div class="vd-alert vd-alert-success">
  <i class="ph ph-check-circle"></i>
  <div>Your changes are saved.</div>
</div>

<div class="vd-alert vd-alert-danger vd-alert-dismissible">
  <i class="ph ph-x-circle"></i>
  <div>Unable to connect to the server.</div>
  <button class="vd-alert-close" aria-label="Close alert">&times;</button>
</div>`;

const vue3Api: [string, string][] = [
  [
    ":variant",
    'primary | secondary | success | warning | danger | info (default "info"). Selects the leading icon automatically.',
  ],
  [":title", "Optional bold title rendered above the slot content."],
  [":dismissible", "Renders a close button that emits dismiss."],
  ["default slot", "Alert body content."],
  ["@dismiss", "Emitted when the close button is clicked."],
];

const variantsHtml = `<!-- Primary alert -->
<div class="vd-alert vd-alert-primary">
  <i class="ph ph-info"></i>
  <div><strong>Primary.</strong> A general message.</div>
</div>

<!-- Success alert -->
<div class="vd-alert vd-alert-success">
  <i class="ph ph-check-circle"></i>
  <div>Your changes have been saved.</div>
</div>

<!-- Warning alert -->
<div class="vd-alert vd-alert-warning">...</div>

<!-- Danger alert (.vd-alert-error remains as an alias) -->
<div class="vd-alert vd-alert-danger">...</div>

<!-- Info alert -->
<div class="vd-alert vd-alert-info">...</div>`;

const dismissibleHtml = `<!-- Dismissible alert -->
<div class="vd-alert vd-alert-success vd-alert-dismissible">
  <i class="ph ph-check-circle"></i>
  <div>Profile updated.</div>
  <button class="vd-alert-close" aria-label="Close alert">&times;</button>
</div>

<!-- Alert with link -->
<div class="vd-alert vd-alert-warning">
  <i class="ph ph-warning"></i>
  <div>
    Storage warning. <a href="#" class="vd-alert-link">Upgrade now</a>
  </div>
</div>

<!-- Alert with heading -->
<div class="vd-alert vd-alert-primary">
  <i class="ph ph-info"></i>
  <div>
    <h5 class="vd-alert-heading">New features</h5>
    <p class="vd-mb-0 vd-text-sm">Dark mode and more.</p>
  </div>
</div>`;

const cssVars: [string, string, string][] = [
  [
    "--vd-alert-padding-x",
    "1.3125rem (21px)",
    "Horizontal padding (Fibonacci)",
  ],
  [
    "--vd-alert-padding-y",
    "0.8125rem (13px)",
    "Vertical padding (Fibonacci, ratio ~phi)",
  ],
  [
    "--vd-alert-border-radius",
    "var(--vd-btn-border-radius)",
    "Corner rounding",
  ],
  ["--vd-alert-border-width", "1px", "Border thickness"],
  [
    "--vd-alert-primary-bg",
    "var(--vd-color-primary-alpha-10)",
    "Primary variant background",
  ],
  [
    "--vd-alert-success-bg",
    "var(--vd-color-success-alpha-10)",
    "Success variant background",
  ],
  [
    "--vd-alert-warning-bg",
    "var(--vd-color-warning-alpha-10)",
    "Warning variant background",
  ],
  [
    "--vd-alert-error-bg",
    "var(--vd-color-error-alpha-10)",
    "Error variant background",
  ],
  [
    "--vd-alert-info-bg",
    "var(--vd-color-info-alpha-10)",
    "Info variant background",
  ],
];

const classRows: [string, string][] = [
  [".vd-alert", "Base alert container. Flex layout with icon + content."],
  [".vd-alert-primary", "Blue accent variant for general information."],
  [".vd-alert-success", "Green accent variant for positive feedback."],
  [".vd-alert-warning", "Amber accent variant for cautionary messages."],
  [
    ".vd-alert-danger",
    'Red accent variant — the unified status name (matches Vue variant="danger").',
  ],
  [
    ".vd-alert-error",
    "Retained backward-compatible alias for .vd-alert-danger.",
  ],
  [".vd-alert-info", "Cyan accent variant for tips and hints."],
  [".vd-alert-dismissible", "Adds right padding for a close button."],
  [".vd-alert-close", "Close button positioned at top-right."],
  [
    ".vd-alert-link",
    "Styled link inside an alert with matching variant color.",
  ],
  [".vd-alert-heading", "Heading style for titled alerts."],
  [".vd-alert-icon", "Flex container for the icon (auto-generated structure)."],
];
</script>

<template>
  <section id="alerts">
    <h5 class="demo-title"><i class="ph ph-bell"></i>Alerts</h5>
    <p class="vd-mb-8">
      Contextual feedback messages for typical user actions. Choose from
      semantic color variants, add dismissible close buttons, or combine icons
      with text for richer communication. Alerts are fully CSS-driven — no
      JavaScript required for static use.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Semantic Variants</h6></div>
          <div class="vd-card-body">
            <div class="vd-alert vd-alert-primary vd-mb-3">
              <i class="ph ph-info"></i>
              <div>
                <strong>Primary.</strong> A general informational message for
                the user.
              </div>
            </div>
            <div class="vd-alert vd-alert-success vd-mb-3">
              <i class="ph ph-check-circle"></i>
              <div>
                <strong>Success.</strong> Your changes have been saved
                successfully.
              </div>
            </div>
            <div class="vd-alert vd-alert-warning vd-mb-3">
              <i class="ph ph-warning"></i>
              <div>
                <strong>Warning.</strong> Your subscription expires in 3 days.
              </div>
            </div>
            <div class="vd-alert vd-alert-danger vd-mb-3">
              <i class="ph ph-x-circle"></i>
              <div>
                <strong>Danger.</strong> Unable to connect to the server. Please
                try again.
              </div>
            </div>
            <div class="vd-alert vd-alert-info vd-mb-0">
              <i class="ph ph-lightbulb"></i>
              <div>
                <strong>Tip.</strong> You can customize alert colors via CSS
                variables.
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="variantsHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Dismissible &amp; With Actions</h6>
          </div>
          <div class="vd-card-body">
            <div
              v-if="!dismissed"
              class="vd-alert vd-alert-success vd-alert-dismissible vd-mb-3"
            >
              <i class="ph ph-check-circle"></i>
              <div>Profile updated successfully.</div>
              <button
                class="vd-alert-close"
                aria-label="Close alert"
                @click="dismissed = true"
              >
                &times;
              </button>
            </div>
            <div class="vd-alert vd-alert-warning vd-mb-3">
              <i class="ph ph-warning"></i>
              <div>
                <strong>Storage warning.</strong> You are using 95% of your
                quota.
                <a href="#" class="vd-alert-link">Upgrade now</a>
              </div>
            </div>
            <div class="vd-alert vd-alert-primary vd-mb-0">
              <i class="ph ph-info"></i>
              <div>
                <h5 class="vd-alert-heading">New features available</h5>
                <p class="vd-mb-0 vd-text-sm">
                  Dark mode, custom themes, and more are now live.
                  <a href="#" class="vd-alert-link">Learn more</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="dismissibleHtml" />
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
            <h4>Usage</h4>
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :html="vue3Usage" :default-open="true"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :html="vanillaUsage" :default-open="true"
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

            <EngineSwitch>
              <template #vue3>
                <h4 class="vd-mt-6">Component API (Vue 3)</h4>
                <div class="vd-table-responsive">
                  <table class="vd-table vd-table-striped">
                    <thead>
                      <tr>
                        <th>Prop / slot / event</th>
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
                <p class="vd-text-muted vd-mt-6">
                  Pure CSS — apply the classes above. No JavaScript API.
                </p>
              </template>
            </EngineSwitch>
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
                Use <code>role="alert"</code> on dynamically injected alerts so
                screen readers announce them immediately.
              </li>
              <li>
                Dismissible alerts should have a <code>button</code> with an
                <code>aria-label="Close alert"</code>, not just an icon.
              </li>
              <li>
                Icons inside alerts should have
                <code>aria-hidden="true"</code>
                if they are decorative; otherwise provide text alternatives.
              </li>
              <li>
                Color is never the sole indicator — pair variants with distinct
                icons and clear text.
              </li>
              <li>
                Alert links (<code>.vd-alert-link</code>) maintain sufficient
                contrast against all variant backgrounds.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
