<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const vue3Usage = `<script setup lang="ts">
import { VdSkeleton } from "@vanduo-oss/vue";
<\/script>

<template>
  <VdSkeleton shape="text" :lines="3" />
  <VdSkeleton shape="circle" size="lg" />
  <VdSkeleton shape="rect" width="200px" />
</template>`;

const vue3Api: [string, string][] = [
  [":shape", "text | circle | rect | card | button (default text)."],
  [":size", "sm | md | lg | xl (default md)."],
  [":width", 'Explicit CSS width, e.g. "200px".'],
  [":lines", 'Number of lines when shape="text" (default 1).'],
];

const textHtml = `<!-- Heading placeholder -->
<div class="vd-skeleton vd-skeleton-heading"></div>

<!-- Text lines (last one auto-shorts to 80%) -->
<div class="vd-skeleton vd-skeleton-text"></div>
<div class="vd-skeleton vd-skeleton-text"></div>
<div class="vd-skeleton vd-skeleton-text"></div>

<!-- Text sizes -->
<div class="vd-skeleton vd-skeleton-text vd-skeleton-text-xs"></div>
<div class="vd-skeleton vd-skeleton-text vd-skeleton-text-sm"></div>
<div class="vd-skeleton vd-skeleton-text vd-skeleton-text-lg"></div>
<div class="vd-skeleton vd-skeleton-text vd-skeleton-text-xl"></div>`;

const shapesHtml = `<!-- Circles (avatars) -->
<div class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-xs"></div>
<div class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-sm"></div>
<div class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-md"></div>
<div class="vd-skeleton vd-skeleton-circle"></div>
<div class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-lg"></div>
<div class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-xl"></div>

<!-- Rectangles (images) -->
<div class="vd-skeleton vd-skeleton-rect" style="width:200px;"></div>
<div class="vd-skeleton vd-skeleton-rect vd-skeleton-rect-lg" style="width:200px;"></div>

<!-- Form placeholders -->
<div class="vd-skeleton vd-skeleton-input"></div>
<div class="vd-skeleton vd-skeleton-button"></div>
<div class="vd-skeleton vd-skeleton-button vd-skeleton-button-sm"></div>`;

const compositeHtml = `<!-- Card placeholder -->
<div class="vd-skeleton vd-skeleton-card">
  <div class="vd-skeleton vd-skeleton-heading vd-mb-3"></div>
  <div class="vd-skeleton vd-skeleton-text"></div>
  <div class="vd-skeleton vd-skeleton-text"></div>
</div>

<!-- List placeholder -->
<div class="vd-skeleton vd-skeleton-list">
  <div class="vd-skeleton-list-item">
    <div class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-sm"></div>
    <div class="vd-skeleton-list-item-content">
      <div class="vd-skeleton vd-skeleton-text vd-skeleton-text-sm"></div>
      <div class="vd-skeleton vd-skeleton-text" style="width:70%;"></div>
    </div>
  </div>
</div>`;

const gridHtml = `<!-- Grid placeholder -->
<div class="vd-skeleton vd-skeleton-grid">
  <div class="vd-skeleton vd-skeleton-rect"></div>
  <div class="vd-skeleton vd-skeleton-rect"></div>
  <div class="vd-skeleton vd-skeleton-rect"></div>
</div>

<!-- Width utilities -->
<div class="vd-skeleton vd-skeleton-text vd-skeleton-w-full"></div>
<div class="vd-skeleton vd-skeleton-text vd-skeleton-w-3-4"></div>
<div class="vd-skeleton vd-skeleton-text vd-skeleton-w-1-2"></div>
<div class="vd-skeleton vd-skeleton-text vd-skeleton-w-1-4"></div>

<!-- Static (no shimmer) -->
<div class="vd-skeleton vd-skeleton-static vd-skeleton-text"></div>

<!-- Pulse animation -->
<div class="vd-skeleton vd-skeleton-pulse vd-skeleton-text"></div>`;

const cssVars: [string, string, string][] = [
  ["--vd-skeleton-bg", "var(--vd-color-gray-200)", "Base placeholder color"],
  [
    "--vd-skeleton-shimmer",
    "var(--vd-color-gray-100)",
    "Shimmer highlight color",
  ],
  [
    "--vd-skeleton-border-radius",
    "var(--vd-btn-border-radius)",
    "Default corner rounding",
  ],
];

const classRows: [string, string][] = [
  [
    ".vd-skeleton",
    "Base placeholder with shimmer animation and overflow hidden.",
  ],
  [
    ".vd-skeleton-text",
    "Single text line (1rem height, 100% width, last sibling auto-shorts to 80%).",
  ],
  [".vd-skeleton-text-xs", "Extra small text line (0.75rem)."],
  [".vd-skeleton-text-sm", "Small text line (0.875rem)."],
  [".vd-skeleton-text-lg", "Large text line (1.25rem)."],
  [".vd-skeleton-text-xl", "Extra large text line (1.5rem)."],
  [
    ".vd-skeleton-paragraph",
    "Column wrapper for multiple text lines with built-in gap and progressive line widths.",
  ],
  [".vd-skeleton-heading", "Heading placeholder (1.5rem, 60% width)."],
  [".vd-skeleton-heading-lg", "Large heading (2rem, 50% width)."],
  [".vd-skeleton-circle", "Circle shape (border-radius: 50%, 3rem default)."],
  [".vd-skeleton-circle-xs … -xl", "Circle sizes from 1.5rem to 5rem."],
  [".vd-skeleton-rect", "Rectangle placeholder (100% width, 200px height)."],
  [".vd-skeleton-rect-sm", "Small rectangle (100px height)."],
  [".vd-skeleton-rect-lg", "Large rectangle (300px height)."],
  [".vd-skeleton-button", "Button placeholder (2.5rem height, 6rem width)."],
  [".vd-skeleton-button-sm", "Small button (2rem height, 4rem width)."],
  [".vd-skeleton-button-lg", "Large button (3rem height, 8rem width)."],
  [".vd-skeleton-input", "Input placeholder (2.5rem height, 100% width)."],
  [".vd-skeleton-card", "Card wrapper with padding and border."],
  [".vd-skeleton-list", "Vertical flex list for rows with avatar + text."],
  [".vd-skeleton-list-item", "Flex row with circle and content columns."],
  [".vd-skeleton-list-item-content", "Content column inside a list item."],
  [".vd-skeleton-grid", "CSS grid container for card/image placeholders."],
  [
    ".vd-skeleton-table-row",
    "Flex row placeholder for table-like loading states, with bottom border spacing.",
  ],
  [
    ".vd-skeleton-w-*",
    "Width utilities: -w-full, -w-3-4, -w-2-3, -w-1-2, -w-1-3, -w-1-4.",
  ],
  [".vd-skeleton-static", "Disables the shimmer animation."],
  [".vd-skeleton-pulse", "Replaces shimmer with an opacity pulse animation."],
];
</script>

<template>
  <section id="skeleton">
    <h5 class="demo-title"><i class="ph ph-circles-three"></i>Skeleton</h5>
    <p class="vd-mb-8">
      Loading placeholders that mimic the shape of content before it arrives.
      Skeletons use a shimmering animation by default and support text lines,
      headings, circles (avatars), rectangles (images), buttons, inputs, lists,
      and grids — all composable to match your actual layout.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Text &amp; Heading</h6></div>
          <div class="vd-card-body">
            <div class="vd-skeleton vd-skeleton-heading vd-mb-5"></div>
            <div class="vd-skeleton vd-skeleton-text vd-mb-3"></div>
            <div class="vd-skeleton vd-skeleton-text vd-mb-3"></div>
            <div class="vd-skeleton vd-skeleton-text"></div>
            <p class="vd-text-sm vd-text-muted vd-mt-5 vd-mb-3">Sizes</p>
            <div
              class="vd-skeleton vd-skeleton-text vd-skeleton-text-xs vd-mb-3"
            ></div>
            <div
              class="vd-skeleton vd-skeleton-text vd-skeleton-text-sm vd-mb-3"
            ></div>
            <div class="vd-skeleton vd-skeleton-text vd-mb-3"></div>
            <div
              class="vd-skeleton vd-skeleton-text vd-skeleton-text-lg vd-mb-3"
            ></div>
            <div class="vd-skeleton vd-skeleton-text vd-skeleton-text-xl"></div>
          </div>
        </div>
        <DocCodeSnippet :html="textHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Circles, Rectangles &amp; Form Elements</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">Circles (avatars)</p>
            <div
              style="
                display: flex;
                gap: 1rem;
                align-items: center;
                margin-bottom: 1.5rem;
              "
            >
              <div
                class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-xs"
              ></div>
              <div
                class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-sm"
              ></div>
              <div
                class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-md"
              ></div>
              <div class="vd-skeleton vd-skeleton-circle"></div>
              <div
                class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-lg"
              ></div>
              <div
                class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-xl"
              ></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Rectangles (images)</p>
            <div
              style="
                display: flex;
                gap: 1rem;
                align-items: flex-end;
                margin-bottom: 1.5rem;
              "
            >
              <div
                class="vd-skeleton vd-skeleton-rect vd-skeleton-rect-sm"
                style="width: 120px"
              ></div>
              <div
                class="vd-skeleton vd-skeleton-rect"
                style="width: 120px"
              ></div>
              <div
                class="vd-skeleton vd-skeleton-rect vd-skeleton-rect-lg"
                style="width: 120px"
              ></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Form elements</p>
            <div class="vd-skeleton vd-skeleton-input vd-mb-3"></div>
            <div class="vd-skeleton vd-skeleton-button vd-mb-3"></div>
            <div
              class="vd-skeleton vd-skeleton-button vd-skeleton-button-sm vd-mb-3"
            ></div>
            <div
              class="vd-skeleton vd-skeleton-button vd-skeleton-button-lg"
            ></div>
          </div>
        </div>
        <DocCodeSnippet :html="shapesHtml" />
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Composite: Card &amp; List</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">Card placeholder</p>
            <div class="vd-skeleton vd-skeleton-card vd-mb-5">
              <div class="vd-skeleton vd-skeleton-heading vd-mb-3"></div>
              <div class="vd-skeleton vd-skeleton-text vd-mb-2"></div>
              <div class="vd-skeleton vd-skeleton-text vd-mb-2"></div>
              <div
                class="vd-skeleton vd-skeleton-text"
                style="width: 80%"
              ></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">List placeholder</p>
            <div class="vd-skeleton vd-skeleton-list">
              <div
                v-for="w in ['70%', '60%', '80%']"
                :key="w"
                class="vd-skeleton-list-item"
              >
                <div
                  class="vd-skeleton vd-skeleton-circle vd-skeleton-circle-sm"
                ></div>
                <div class="vd-skeleton-list-item-content">
                  <div
                    class="vd-skeleton vd-skeleton-text vd-skeleton-text-sm vd-mb-2"
                  ></div>
                  <div
                    class="vd-skeleton vd-skeleton-text"
                    :style="{ width: w }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="compositeHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Grid &amp; Width Utilities</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">Grid layout</p>
            <div class="vd-skeleton vd-skeleton-grid vd-mb-5">
              <div class="vd-skeleton vd-skeleton-rect"></div>
              <div class="vd-skeleton vd-skeleton-rect"></div>
              <div class="vd-skeleton vd-skeleton-rect"></div>
              <div class="vd-skeleton vd-skeleton-rect"></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Width utilities</p>
            <div
              v-for="w in ['full', '3-4', '2-3', '1-2', '1-3', '1-4']"
              :key="w"
              class="vd-skeleton vd-skeleton-text vd-mb-3"
              :class="`vd-skeleton-w-${w}`"
            ></div>
            <p class="vd-text-sm vd-text-muted vd-mb-3 vd-mt-5">
              No animation (static)
            </p>
            <div
              class="vd-skeleton vd-skeleton-static vd-skeleton-text vd-mb-3"
            ></div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Pulse animation</p>
            <div class="vd-skeleton vd-skeleton-pulse vd-skeleton-text"></div>
          </div>
        </div>
        <DocCodeSnippet :html="gridHtml" />
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
                ><DocCodeSnippet :html="textHtml" :default-open="true"
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
                        <th>Prop</th>
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
                Always wrap skeleton placeholders in an
                <code>aria-live="polite"</code> region and replace them with
                real content once loaded, so screen readers announce the change.
              </li>
              <li>
                Use <code>aria-busy="true"</code> on the container while
                skeletons are visible to indicate the region is updating.
              </li>
              <li>
                Shimmer animation is disabled when
                <code>prefers-reduced-motion: reduce</code> is active — the
                placeholder becomes a static color block.
              </li>
              <li>
                Avoid leaving skeletons visible for extended periods. If loading
                takes more than a few seconds, show a progress indicator or
                retry option.
              </li>
              <li>
                Ensure skeleton colors maintain sufficient contrast against the
                page background in both light and dark themes.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
