<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const vue3Usage = `<script setup lang="ts">
import { VdSpinner } from "@vanduo-oss/vue";
<\/script>

<template>
  <VdSpinner />
  <VdSpinner size="lg" label="Loading…" />
</template>`;

const vue3Api: [string, string][] = [
  [":size", "sm | md | lg (default md)."],
  [":label", "Accessible label (visually-hidden text for screen readers)."],
];

const borderHtml = `<!-- Sizes -->
<div class="vd-spinner vd-spinner-xs"></div>
<div class="vd-spinner vd-spinner-sm"></div>
<div class="vd-spinner"></div>
<div class="vd-spinner vd-spinner-lg"></div>
<div class="vd-spinner vd-spinner-xl"></div>

<!-- Colors -->
<div class="vd-spinner vd-spinner-success"></div>
<div class="vd-spinner vd-spinner-warning"></div>
<div class="vd-spinner vd-spinner-error"></div>
<div class="vd-spinner vd-spinner-info"></div>
<div class="vd-spinner vd-spinner-light"></div>
<div class="vd-spinner vd-spinner-dark"></div>

<!-- Inside button -->
<button class="vd-btn vd-btn-primary" disabled>
  <span class="vd-spinner vd-spinner-sm"
        style="border-color:rgba(255,255,255,0.3);
               border-top-color:#fff;">
  </span>
  Loading...
</button>`;

const dotsHtml = `<!-- Dot bounce spinner -->
<div class="vd-spinner-dots"><span></span></div>

<!-- Growing pulse spinner -->
<div class="vd-spinner-grow vd-spinner-sm"></div>
<div class="vd-spinner-grow"></div>
<div class="vd-spinner-grow vd-spinner-lg"
     style="--vd-spinner-color:var(--vd-color-success);"></div>

<!-- Centered loader area -->
<div class="vd-spinner-center">
  <div class="vd-spinner vd-spinner-lg"></div>
</div>`;

const quadHtml = `<!-- Quad loader -->
<div class="vd-dynamic-loader">
  <div class="vd-dynamic-loader-grid">
    <div class="vd-spinner vd-spinner-sm"
         style="--vd-spinner-color:var(--vd-color-primary);"></div>
    <div class="vd-spinner vd-spinner-sm"
         style="--vd-spinner-color:var(--vd-color-secondary);"></div>
    <div class="vd-spinner vd-spinner-sm"
         style="--vd-spinner-color:var(--vd-color-success);"></div>
    <div class="vd-spinner vd-spinner-sm"
         style="--vd-spinner-color:var(--vd-color-warning);"></div>
  </div>
  <div class="vd-dynamic-loader-text">Loading...</div>
</div>

<!-- Overlay on skeleton card -->
<div class="vd-dynamic-loader-card">
  <div class="vd-dynamic-loader">...</div>
  <!-- skeleton placeholders underneath -->
  <div class="vd-skeleton vd-skeleton-text"></div>
</div>`;

const cssVars: [string, string, string][] = [
  ["--vd-spinner-size", "2rem", "Default spinner diameter"],
  ["--vd-spinner-border-width", "3px", "Border spinner track thickness"],
  ["--vd-spinner-color", "var(--vd-color-primary)", "Active/accent color"],
  ["--vd-spinner-speed", "0.65s", "Rotation duration"],
];

const apiRows: [string, string][] = [
  [
    ".vd-spinner",
    "Border spinner — a rotating circular border. Default size 2rem.",
  ],
  [".vd-spinner-xs", "1rem diameter, 2px border."],
  [".vd-spinner-sm", "1.5rem diameter, 2px border."],
  [".vd-spinner-lg", "3rem diameter, 4px border."],
  [".vd-spinner-xl", "4rem diameter, 5px border."],
  [".vd-spinner-success", "Green accent color."],
  [".vd-spinner-warning", "Amber accent color."],
  [".vd-spinner-error", "Red accent color."],
  [".vd-spinner-info", "Cyan accent color."],
  [".vd-spinner-light", "White accent (for dark backgrounds)."],
  [".vd-spinner-dark", "Dark text color accent."],
  [".vd-spinner-dots", "Three bouncing dots loader."],
  [".vd-spinner-grow", "Pulsing circle that grows and fades in a loop."],
  [".vd-spinner-center", "Flex container that centers a spinner with padding."],
  [".vd-dynamic-loader", "Signature 2x2 quad spinner grid with label."],
  [".vd-dynamic-loader-grid", "The 2x2 CSS grid of spinners."],
  [".vd-dynamic-loader-text", "Muted label below the quad grid."],
  [
    ".vd-dynamic-loader-card",
    "Relative container that hosts a full-cover .vd-dynamic-loader overlay.",
  ],
];

const flexRow =
  "display:flex; gap:1.5rem; align-items:center; flex-wrap:wrap; margin-bottom:1.5rem;";
</script>

<template>
  <section id="spinner">
    <h5 class="demo-title"><i class="ph ph-spinner"></i>Spinners</h5>
    <p class="vd-mb-8">
      Canonical reference for Vanduo loading spinners: border spinner, dot
      bounce, growing pulse, sizes and color modifiers, plus the signature
      quad-grid loader (<code>.vd-dynamic-loader*</code>). Styles ship in
      <code>framework/css/components/spinner.css</code>, imported by the main
      <code>vanduo.css</code> bundle — copy HTML only; no extra layout CSS is
      required. For loading UX patterns (progress handoff, placeholders), see
      <RouterLink to="/components/preloader">Preloader</RouterLink>.
    </p>

    <!-- Border + Dots/Grow -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-spinner-border" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Border Spinner</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">Sizes</p>
            <div :style="flexRow">
              <div class="vd-spinner vd-spinner-xs"></div>
              <div class="vd-spinner vd-spinner-sm"></div>
              <div class="vd-spinner"></div>
              <div class="vd-spinner vd-spinner-lg"></div>
              <div class="vd-spinner vd-spinner-xl"></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Colors</p>
            <div :style="flexRow">
              <div class="vd-spinner"></div>
              <div class="vd-spinner vd-spinner-success"></div>
              <div class="vd-spinner vd-spinner-warning"></div>
              <div class="vd-spinner vd-spinner-error"></div>
              <div class="vd-spinner vd-spinner-info"></div>
              <div
                class="vd-spinner vd-spinner-light"
                style="
                  background: var(--vd-color-gray-800);
                  padding: 4px;
                  border-radius: 4px;
                "
              ></div>
              <div class="vd-spinner vd-spinner-dark"></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Inside buttons</p>
            <div
              style="
                display: flex;
                gap: 0.75rem;
                flex-wrap: wrap;
                margin-bottom: 1.5rem;
              "
            >
              <button class="vd-btn vd-btn-primary" disabled>
                <span
                  class="vd-spinner vd-spinner-sm"
                  style="
                    border-color: rgba(255, 255, 255, 0.3);
                    border-top-color: #fff;
                    vertical-align: middle;
                    margin-right: 0.5rem;
                  "
                ></span>
                Loading...
              </button>
              <button class="vd-btn vd-btn-outline" disabled>
                <span
                  class="vd-spinner vd-spinner-sm"
                  style="vertical-align: middle; margin-right: 0.5rem"
                ></span>
                Saving
              </button>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="borderHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-spinner-dots-grow" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Dots &amp; Growing Spinner</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">Dot bounce</p>
            <div :style="flexRow">
              <div class="vd-spinner-dots"><span></span></div>
              <div
                class="vd-spinner-dots"
                style="--vd-spinner-color: var(--vd-color-success)"
              >
                <span></span>
              </div>
              <div
                class="vd-spinner-dots"
                style="--vd-spinner-color: var(--vd-color-error)"
              >
                <span></span>
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Growing pulse</p>
            <div :style="flexRow">
              <div class="vd-spinner-grow vd-spinner-sm"></div>
              <div class="vd-spinner-grow"></div>
              <div
                class="vd-spinner-grow vd-spinner-lg"
                style="--vd-spinner-color: var(--vd-color-success)"
              ></div>
              <div
                class="vd-spinner-grow vd-spinner-xl"
                style="--vd-spinner-color: var(--vd-color-error)"
              ></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">Centering helper</p>
            <div
              class="vd-spinner-center vd-mb-0"
              style="
                border: 1px dashed var(--vd-border-color);
                border-radius: var(--vd-btn-border-radius);
              "
            >
              <div class="vd-spinner vd-spinner-lg"></div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="dotsHtml" />
      </div>
    </div>

    <!-- Quad loader -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div id="demo-spinner-quad" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Quad Loader (Signature Vanduo Loader)</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              The grid applies staggered rotation via
              <code>.vd-dynamic-loader-grid</code> (nth-child delays in CSS).
              Optional inline <code>animation-delay</code> overrides are only
              needed if you want custom rhythm.
            </p>
            <div class="vd-dynamic-loader vd-mb-5">
              <div class="vd-dynamic-loader-grid">
                <div
                  class="vd-spinner vd-spinner-sm"
                  style="--vd-spinner-color: var(--vd-color-primary)"
                ></div>
                <div
                  class="vd-spinner vd-spinner-sm"
                  style="--vd-spinner-color: var(--vd-color-secondary)"
                ></div>
                <div
                  class="vd-spinner vd-spinner-sm"
                  style="--vd-spinner-color: var(--vd-color-success)"
                ></div>
                <div
                  class="vd-spinner vd-spinner-sm"
                  style="--vd-spinner-color: var(--vd-color-warning)"
                ></div>
              </div>
              <div class="vd-dynamic-loader-text">
                Loading your workspace...
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Overlay on a skeleton card
            </p>
            <div class="vd-dynamic-loader-card" style="min-height: 180px">
              <div class="vd-dynamic-loader">
                <div class="vd-dynamic-loader-grid">
                  <div
                    class="vd-spinner vd-spinner-sm"
                    style="--vd-spinner-color: var(--vd-color-primary)"
                  ></div>
                  <div
                    class="vd-spinner vd-spinner-sm"
                    style="--vd-spinner-color: var(--vd-color-secondary)"
                  ></div>
                  <div
                    class="vd-spinner vd-spinner-sm"
                    style="--vd-spinner-color: var(--vd-color-success)"
                  ></div>
                  <div
                    class="vd-spinner vd-spinner-sm"
                    style="--vd-spinner-color: var(--vd-color-warning)"
                  ></div>
                </div>
                <div class="vd-dynamic-loader-text">Please wait...</div>
              </div>
              <div class="vd-skeleton vd-skeleton-text vd-mb-3"></div>
              <div class="vd-skeleton vd-skeleton-text vd-mb-3"></div>
              <div class="vd-skeleton vd-skeleton-text"></div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="quadHtml" />
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
                ><DocCodeSnippet :html="borderHtml" :default-open="true"
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
                  <tr v-for="row in apiRows" :key="row[0]">
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
                Always include an <code>aria-label</code> or visually-hidden
                text describing the loading state:
                <code
                  >&lt;div class="vd-spinner"
                  aria-label="Loading..."&gt;&lt;/div&gt;</code
                >.
              </li>
              <li>
                When used inside buttons, the button itself should have
                <code>aria-disabled="true"</code> or <code>disabled</code> to
                prevent repeated submissions.
              </li>
              <li>
                For page-level loading (quad loader), wrap it in an element with
                <code>role="status"</code> and
                <code>aria-live="polite"</code> so screen readers announce the
                loading state.
              </li>
              <li>
                Spinners are decorative for sighted users but meaningful for
                screen reader users — never omit the accessible name.
              </li>
              <li>
                Animations slow down to 1.5s when
                <code>prefers-reduced-motion: reduce</code> is active to
                minimize vestibular discomfort.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
