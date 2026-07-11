<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const speedDialOpen = ref(false);

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

const positionHtml = `<!-- Pin a FAB to a viewport corner (base .vd-fab is already primary) -->
<button class="vd-fab vd-fab-bottom-left" aria-label="Compose">
  <i class="ph ph-pencil-simple"></i>
</button>

<!-- Other positions -->
<button class="vd-fab vd-fab-top-left">…</button>
<button class="vd-fab vd-fab-top-right">…</button>
<button class="vd-fab vd-fab-center">…</button>`;

const speedDialHtml = `<div class="vd-fab-menu" :class="{ 'is-open': open }">
  <button class="vd-fab"
          aria-label="Toggle actions"
          :aria-expanded="open"
          @click="open = !open">
    <i class="ph ph-plus"></i>
  </button>
  <div class="vd-fab-actions">
    <button class="vd-fab vd-fab-sm vd-fab-success" aria-label="Upload">
      <i class="ph ph-upload-simple"></i>
    </button>
    <button class="vd-fab vd-fab-sm" aria-label="Photo">
      <i class="ph ph-image"></i>
    </button>
    <button class="vd-fab vd-fab-sm vd-fab-danger" aria-label="Record">
      <i class="ph ph-microphone"></i>
    </button>
  </div>
</div>`;

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
    ".vd-fab-top-left / -top-right / -bottom-left / -center",
    "Fixed-position modifiers that pin the FAB to a viewport corner (or bottom-center).",
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
</script>

<template>
  <section id="fab">
    <h5 class="demo-title">
      <i class="ph ph-plus-circle"></i>Floating Action Button
    </h5>
    <p class="vd-mb-8">
      Floating Action Buttons (FABs) surface a primary action. Vanduo's FAB is
      pure CSS — drop <code>vd-fab</code> on a <code>&lt;button&gt;</code> and
      pick a size, color, or position modifier. The speed-dial menu is a simple
      <code>.is-open</code> toggle.
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
            <button class="vd-fab vd-fab-sm" aria-label="Small">
              <i class="ph ph-plus"></i>
            </button>
            <button class="vd-fab" aria-label="Default">
              <i class="ph ph-plus"></i>
            </button>
            <button class="vd-fab vd-fab-lg" aria-label="Large">
              <i class="ph ph-plus"></i>
            </button>
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
            <button class="vd-fab vd-fab-extended" aria-label="Create new item">
              <i class="ph ph-plus"></i><span>New</span>
            </button>
            <button
              class="vd-fab vd-fab-extended vd-fab-success"
              aria-label="Save"
            >
              <i class="ph ph-check"></i><span>Save</span>
            </button>
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
            <button class="vd-fab" aria-label="New">
              <i class="ph ph-plus"></i>
            </button>
            <button class="vd-fab vd-fab-secondary" aria-label="Edit">
              <i class="ph ph-pencil-simple"></i>
            </button>
            <button class="vd-fab vd-fab-success" aria-label="Confirm">
              <i class="ph ph-check"></i>
            </button>
            <button class="vd-fab vd-fab-danger" aria-label="Delete">
              <i class="ph ph-trash"></i>
            </button>
            <button class="vd-fab vd-fab-glass" aria-label="Favourite">
              <i class="ph ph-star"></i>
            </button>
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
              In production the corner modifiers pin to the viewport. This
              preview scopes them to the box below.
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
              <button
                class="vd-fab vd-fab-sm"
                style="position: absolute; top: 1rem; left: 1rem"
                aria-label="Top-left"
              >
                <i class="ph ph-arrow-up-left"></i>
              </button>
              <button
                class="vd-fab vd-fab-sm"
                style="position: absolute; top: 1rem; right: 1rem"
                aria-label="Top-right"
              >
                <i class="ph ph-arrow-up-right"></i>
              </button>
              <button
                class="vd-fab vd-fab-sm"
                style="position: absolute; bottom: 1rem; left: 1rem"
                aria-label="Bottom-left"
              >
                <i class="ph ph-arrow-down-left"></i>
              </button>
              <button
                class="vd-fab"
                style="position: absolute; bottom: 1rem; right: 1rem"
                aria-label="Bottom-right (default)"
              >
                <i class="ph ph-pencil-simple"></i>
              </button>
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
            <div class="vd-fab-menu" :class="{ 'is-open': speedDialOpen }">
              <button
                class="vd-fab"
                aria-label="Toggle speed dial"
                :aria-expanded="speedDialOpen"
                @click="speedDialOpen = !speedDialOpen"
              >
                <i class="ph" :class="speedDialOpen ? 'ph-x' : 'ph-plus'"></i>
              </button>
              <div class="vd-fab-actions">
                <button
                  class="vd-fab vd-fab-sm vd-fab-success"
                  aria-label="Upload"
                >
                  <i class="ph ph-upload-simple"></i>
                </button>
                <button class="vd-fab vd-fab-sm" aria-label="Photo">
                  <i class="ph ph-image"></i>
                </button>
                <button
                  class="vd-fab vd-fab-sm vd-fab-danger"
                  aria-label="Record"
                >
                  <i class="ph ph-microphone"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <p class="vd-text-sm vd-text-muted vd-mb-4">
          Click the FAB to toggle the speed dial. It uses a simple
          <code>.is-open</code> class toggle and <code>aria-expanded</code> — no
          framework JS required.
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
            <h4>Modifier classes</h4>
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
                Always set <code>aria-label</code> on an icon-only FAB; it has
                no accessible name otherwise.
              </li>
              <li>
                The speed-dial toggle carries
                <code>aria-expanded</code> reflecting its open state.
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
