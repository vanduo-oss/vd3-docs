<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdFab } from "@vanduo-oss/vd3";

const sizesHtml = `<button class="vd-fab vd-fab-sm" aria-label="Small">...</button>   <!-- 40px -->
<button class="vd-fab" aria-label="Default">...</button>            <!-- 56px -->
<button class="vd-fab vd-fab-lg" aria-label="Large">...</button>   <!-- 72px -->`;

const extendedHtml = `<button class="vd-fab vd-fab-extended" aria-label="Create new item">
  <i class="ph ph-plus"></i>
  <span>New</span>
</button>

<button class="vd-fab vd-fab-extended vd-fab-success">
  <i class="ph ph-check"></i><span>Save</span>
</button>`;

const colorsHtml = `<button class="vd-fab"><i class="ph ph-plus"></i></button>
<button class="vd-fab vd-fab-secondary"><i class="ph ph-pencil-simple"></i></button>
<button class="vd-fab vd-fab-success"><i class="ph ph-check"></i></button>
<button class="vd-fab vd-fab-danger"><i class="ph ph-trash"></i></button>
<button class="vd-fab vd-fab-glass"><i class="ph ph-star"></i></button>`;

const positionHtml = `<!-- The position prop pins a FAB (position: fixed) to a viewport spot -->
<VdFab position="bottom-right" aria-label="Compose">
  <i class="ph ph-pencil-simple"></i>
</VdFab>

<!-- Other positions: bottom-left | top-right | top-left | center -->
<VdFab position="top-left" aria-label="Back"><i class="ph ph-arrow-up-left"></i></VdFab>`;

const speedDialHtml = `<VdFab aria-label="Toggle actions">
  <i class="ph ph-plus"></i>
  <template #actions>
    <VdFab size="sm" variant="success" aria-label="Upload">
      <i class="ph ph-upload-simple"></i>
    </VdFab>
    <VdFab size="sm" aria-label="Photo">
      <i class="ph ph-image"></i>
    </VdFab>
    <VdFab size="sm" variant="danger" aria-label="Record">
      <i class="ph ph-microphone"></i>
    </VdFab>
  </template>
</VdFab>`;

const vue3Usage = `<script setup lang="ts">
import { VdFab } from "@vanduo-oss/vd3";
<\/script>

<template>
  <!-- Pinned single-action FAB -->
  <VdFab position="bottom-right" aria-label="Compose" @click="onCompose">
    <i class="ph ph-pencil-simple"></i>
  </VdFab>

  <!-- Extended (pill) FAB with a visible label -->
  <VdFab extended label="New item" variant="success">
    <i class="ph ph-plus"></i>
  </VdFab>
</template>`;

const classRows: [string, string][] = [
  [".vd-fab", "Base FAB. Round, elevated. 56 px by default."],
  [".vd-fab-sm / .vd-fab-lg", "Size variants — 40 px / 72 px."],
  [
    ".vd-fab-secondary / -success / -danger",
    "Color variants — the base .vd-fab is already primary.",
  ],
  [".vd-fab-extended", "Wider pill-shaped variant with an icon + label."],
  [".vd-fab-glass", "Glass-styled variant (uses `--vd-glass-*` tokens)."],
  [
    ".vd-fab-fixed / -top-left / -top-right / -bottom-left / -center",
    "Fixed-position modifiers that pin the FAB to a viewport corner (or center).",
  ],
  [".vd-fab-menu", "Speed-dial wrapper (relative, column layout)."],
  [
    ".vd-fab-actions",
    "Container for the action buttons; revealed when .vd-fab-menu has .is-open.",
  ],
];

const cssVars: [string, string, string][] = [
  ["--vd-fab-size", "3.5rem (56 px)", "Default diameter"],
  ["--vd-fab-size-sm", "2.5rem (40 px)", "Small diameter"],
  ["--vd-fab-size-lg", "4.5rem (72 px)", "Large diameter"],
  ["--vd-fab-menu-gap", "0.8125rem", "Gap between speed-dial buttons"],
  [
    "--vd-fab-shadow",
    "0 3px 8px rgba(0,0,0,.25), 0 1px 3px rgba(0,0,0,.15)",
    "Elevation shadow",
  ],
  ["--vd-fab-z-index", "1030", "Stacking above page content"],
  ["--vd-fab-offset", "1.3125rem", "Distance from viewport edges"],
];

const vue3Api: [string, string][] = [
  [
    ":variant",
    "'primary' | 'secondary' | 'success' | 'danger' | 'error' (default 'primary'; 'error' is an alias of 'danger').",
  ],
  [":size", "'sm' | 'md' | 'lg' — diameter (default 'md')."],
  [
    ":extended",
    "Pill-shaped variant that renders `label` beside the icon slot.",
  ],
  [":glass", "Glass-styled surface (`.vd-fab-glass`)."],
  [
    ":position",
    "'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center' — pins the FAB (position: fixed) to the viewport.",
  ],
  [
    ":label",
    "Visible text for the extended (pill) mode; also the fallback aria-label.",
  ],
  [":aria-label", "Accessible name (takes priority over `label`)."],
  [
    "@click",
    "MouseEvent — emitted on activation. In menu mode it also toggles the speed dial.",
  ],
  ["default slot", "The icon / button content."],
  [
    "actions slot",
    "Speed-dial action buttons. Its presence switches on the .vd-fab-menu wrapper; Escape and outside-click close it.",
  ],
];
</script>

<template>
  <section id="fab">
    <h5 class="demo-title">
      <i class="ph ph-plus-circle"></i>Floating Action Button
    </h5>
    <p class="vd-mb-8">
      <strong>VdFab</strong> surfaces a primary action as a round, elevated
      button. Pick a <code>variant</code>, <code>size</code>,
      <code>position</code>, or the <code>extended</code> pill; add an
      <code>actions</code> slot to turn it into a self-managing speed-dial menu
      (it owns its own open state, Escape, and outside-click handling).
    </p>

    <!-- Sizes -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Sizes</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1.5rem;
              align-items: center;
              flex-wrap: wrap;
            "
          >
            <VdFab size="sm" aria-label="Small">
              <i class="ph ph-plus"></i>
            </VdFab>
            <VdFab aria-label="Default">
              <i class="ph ph-plus"></i>
            </VdFab>
            <VdFab size="lg" aria-label="Large">
              <i class="ph ph-plus"></i>
            </VdFab>
          </div>
        </div>
        <DocCodeSnippet :html="sizesHtml" />
      </div>
    </div>

    <!-- Extended + Colors -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Extended (with label)</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              align-items: center;
              flex-wrap: wrap;
            "
          >
            <VdFab extended label="New" aria-label="Create new item">
              <i class="ph ph-plus"></i>
            </VdFab>
            <VdFab extended label="Save" variant="success" aria-label="Save">
              <i class="ph ph-check"></i>
            </VdFab>
          </div>
        </div>
        <DocCodeSnippet :html="extendedHtml" />
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Color Variants</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              align-items: center;
              flex-wrap: wrap;
            "
          >
            <VdFab aria-label="New">
              <i class="ph ph-plus"></i>
            </VdFab>
            <VdFab variant="secondary" aria-label="Edit">
              <i class="ph ph-pencil-simple"></i>
            </VdFab>
            <VdFab variant="success" aria-label="Confirm">
              <i class="ph ph-check"></i>
            </VdFab>
            <VdFab variant="danger" aria-label="Delete">
              <i class="ph ph-trash"></i>
            </VdFab>
            <VdFab glass aria-label="Favourite">
              <i class="ph ph-star"></i>
            </VdFab>
          </div>
        </div>
        <DocCodeSnippet :html="colorsHtml" />
      </div>
    </div>

    <!-- Position variants (contained preview) -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Position Variants</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-muted vd-mb-4">
              In production the <code>position</code> prop pins the FAB (<code
                >position: fixed</code
              >) to the viewport. This preview scopes live
              <code>&lt;VdFab&gt;</code> buttons to the box below.
            </p>
            <div
              style="
                position: relative;
                height: 13rem;
                border: 1px dashed var(--vd-border-color);
                border-radius: var(--vd-radius-md);
                background: var(--vd-bg-secondary);
              "
            >
              <div style="position: absolute; top: 1rem; left: 1rem">
                <VdFab size="sm" aria-label="Top-left">
                  <i class="ph ph-arrow-up-left"></i>
                </VdFab>
              </div>
              <div style="position: absolute; top: 1rem; right: 1rem">
                <VdFab size="sm" aria-label="Top-right">
                  <i class="ph ph-arrow-up-right"></i>
                </VdFab>
              </div>
              <div style="position: absolute; bottom: 1rem; left: 1rem">
                <VdFab size="sm" aria-label="Bottom-left">
                  <i class="ph ph-arrow-down-left"></i>
                </VdFab>
              </div>
              <div style="position: absolute; bottom: 1rem; right: 1rem">
                <VdFab aria-label="Bottom-right (default)">
                  <i class="ph ph-pencil-simple"></i>
                </VdFab>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="positionHtml" />
      </div>
    </div>

    <!-- Speed dial -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Speed Dial Menu</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              align-items: flex-end;
              justify-content: center;
              min-height: 14rem;
            "
          >
            <VdFab aria-label="Toggle speed dial">
              <i class="ph ph-plus"></i>
              <template #actions>
                <VdFab size="sm" variant="success" aria-label="Upload">
                  <i class="ph ph-upload-simple"></i>
                </VdFab>
                <VdFab size="sm" aria-label="Photo">
                  <i class="ph ph-image"></i>
                </VdFab>
                <VdFab size="sm" variant="danger" aria-label="Record">
                  <i class="ph ph-microphone"></i>
                </VdFab>
              </template>
            </VdFab>
          </div>
        </div>
        <p class="vd-text-sm vd-text-muted vd-mb-4">
          Click the FAB to toggle the speed dial. The component tracks its own
          open state, reflects it via <code>aria-expanded</code>, and closes on
          <kbd>Esc</kbd> or an outside click — no page-level state required.
        </p>
        <DocCodeSnippet :html="speedDialHtml" />
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-list-dashes"></i> API Reference</h6>
          </div>
          <div class="vd-card-body">
            <h4>Usage</h4>
            <DocCodeSnippet :html="vue3Usage" :default-open="true" />

            <h4 class="vd-mt-6">Component API</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Prop / event / slot</th>
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

            <h4 class="vd-mt-6">Modifier classes</h4>
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
            <h4 class="vd-mt-6">CSS Variables</h4>
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

    <!-- Accessibility -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-wheelchair"></i> Accessibility</h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>
                Always set <code>:aria-label</code> (or <code>:label</code>) on
                an icon-only FAB; it has no accessible name otherwise.
              </li>
              <li>
                In menu mode the trigger carries <code>aria-expanded</code>
                reflecting its open state.
              </li>
              <li>
                FABs are real <code>&lt;button&gt;</code> elements — focus,
                keyboard activation, and form integration work natively.
              </li>
              <li>
                FABs respect <code>prefers-reduced-motion</code>: the hover lift
                and speed-dial stagger are skipped when set.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
