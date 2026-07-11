<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const vue3Usage = `<script setup lang="ts">
import { VdPreloader } from "@vanduo-oss/vue";
<\/script>

<template>
  <VdPreloader text="Loading…" />
  <VdPreloader variant="success" size="lg" />
</template>`;

const vue3Api: [string, string][] = [
  [
    ":variant",
    "primary | secondary | success | warning | error | info (default primary).",
  ],
  [":size", "sm | md | lg | xl (default md)."],
  [":theme", "light | dark (default light)."],
  [":text", "Optional caption below the loader."],
];

const patternsHtml = `<!-- Standalone quad loader (page / panel) -->
<div class="vd-dynamic-loader">
  <div class="vd-dynamic-loader-grid">
    <div class="vd-spinner vd-spinner-sm vd-spinner-success"></div>
    <div class="vd-spinner vd-spinner-sm vd-spinner-warning"></div>
    <div class="vd-spinner vd-spinner-sm vd-spinner-error"></div>
    <div class="vd-spinner vd-spinner-sm vd-spinner-info"></div>
  </div>
  <div class="vd-dynamic-loader-text">Loading section...</div>
</div>

<!-- Overlay on skeleton (preferred) -->
<div class="vd-dynamic-loader-card">
  <div class="vd-dynamic-loader">
    <div class="vd-dynamic-loader-grid">...</div>
    <div class="vd-dynamic-loader-text">Loading...</div>
  </div>
  <div class="vd-skeleton vd-skeleton-text"></div>
</div>`;
</script>

<template>
  <section id="preloader">
    <h5 class="demo-title">
      <i class="ph ph-circle-notch"></i>Preloader &amp; loading patterns
    </h5>
    <p class="vd-mb-8 vd-text-muted">
      Patterns for showing progress during navigation, lazy-loaded sections, and
      async work. Spinner markup, modifiers, quad loader
      (<code>.vd-dynamic-loader*</code>), accessibility notes, and the full CSS
      class reference live on
      <RouterLink to="/components/spinner">Spinners</RouterLink>. Determinate
      bars (sizes, stripes, indeterminate, stacked fills, API) are documented
      under <RouterLink to="/components/progress">Progress</RouterLink>.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Inline loading</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Use beside controls or inside buttons while work completes.
            </p>
            <div
              class="vd-mb-3"
              style="
                display: flex;
                gap: 1rem;
                align-items: center;
                flex-wrap: wrap;
              "
            >
              <div class="vd-spinner"></div>
              <div class="vd-spinner vd-spinner-sm"></div>
              <div class="vd-spinner-dots"><span></span></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              <RouterLink to="/components/spinner"
                >Spinners — sizes, colors, grow, dots, centered layouts
                →</RouterLink
              >
            </p>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Progress handoff</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Switch from indeterminate spinners to a bar once you know
              completion percentage.
            </p>
            <div class="vd-progress vd-mb-3">
              <div class="vd-progress-bar" style="width: 35%"></div>
            </div>
            <div class="vd-progress vd-mb-3">
              <div
                class="vd-progress-bar vd-progress-success"
                style="width: 65%"
              ></div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              <RouterLink to="/components/progress"
                >Progress — variants, stripes, sizes, API →</RouterLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Page-level quad loader</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Same structure as this documentation site's placeholders:
              semantic-colored spinners inside
              <code>.vd-dynamic-loader</code>. Staggered rotation comes from
              <code>spinner.css</code>
              (<code>.vd-dynamic-loader-grid</code>); extra
              <code>animation-delay</code> on each cell is optional.
            </p>
            <div class="vd-dynamic-loader vd-mb-0" style="padding: 2rem 1rem">
              <div class="vd-dynamic-loader-grid">
                <div class="vd-spinner vd-spinner-sm vd-spinner-success"></div>
                <div class="vd-spinner vd-spinner-sm vd-spinner-warning"></div>
                <div class="vd-spinner vd-spinner-sm vd-spinner-error"></div>
                <div class="vd-spinner vd-spinner-sm vd-spinner-info"></div>
              </div>
              <div class="vd-dynamic-loader-text">Loading section...</div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-3 vd-mb-0">
              <RouterLink to="/components/spinner"
                >Quad loader markup &amp; overlay variant →</RouterLink
              >
            </p>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Skeleton + quad overlay</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Use <code>.vd-dynamic-loader-card</code> so the loader sits above
              skeleton placeholders with the built-in scrim (see
              <RouterLink to="/components/spinner">Spinners</RouterLink>).
            </p>
            <div class="vd-dynamic-loader-card" style="min-height: 200px">
              <div class="vd-dynamic-loader">
                <div class="vd-dynamic-loader-grid">
                  <div
                    class="vd-spinner vd-spinner-sm vd-spinner-success"
                  ></div>
                  <div
                    class="vd-spinner vd-spinner-sm vd-spinner-warning"
                  ></div>
                  <div class="vd-spinner vd-spinner-sm vd-spinner-error"></div>
                  <div class="vd-spinner vd-spinner-sm vd-spinner-info"></div>
                </div>
                <div class="vd-dynamic-loader-text">Loading section...</div>
              </div>
              <div class="vd-skeleton vd-skeleton-heading-lg vd-mb-3"></div>
              <div class="vd-skeleton vd-skeleton-paragraph">
                <div class="vd-skeleton vd-skeleton-text vd-mb-3"></div>
                <div class="vd-skeleton vd-skeleton-text vd-mb-3"></div>
                <div class="vd-skeleton vd-skeleton-text"></div>
              </div>
              <div class="vd-skeleton vd-skeleton-rect-sm vd-mt-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Copy-paste patterns</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              These snippets rely only on classes from the Vanduo bundle (<code
                >vanduo.css</code
              >
              imports <code>spinner.css</code>). No separate "required CSS"
              block.
            </p>
            <EngineSwitch>
              <template #vanilla
                ><DocCodeSnippet :html="patternsHtml"
              /></template>
              <template #vue3><DocCodeSnippet :html="vue3Usage" /></template>
            </EngineSwitch>
            <EngineSwitch>
              <template #vue3>
                <h4 class="vd-mt-6">VdPreloader API (Vue 3)</h4>
                <div class="vd-table-responsive">
                  <table class="vd-table vd-table-hover">
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
              <template #vanilla><span></span></template>
            </EngineSwitch>
            <p class="vd-text-sm vd-text-muted vd-mt-3 vd-mb-0">
              <strong>This documentation site</strong> builds similar
              placeholders in <code>docs/js/app.js</code> (section fetch, scroll
              loader, page transitions), intentionally separate from the
              reusable <code>VanduoLazyLoad</code> helper in
              <code>docs/js/components/lazy-load.js</code>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <h4 id="api" class="docs-heading">API reference</h4>
    <p class="vd-text-muted vd-mb-4">
      Spinner and quad-loader CSS classes are fully listed on
      <RouterLink to="/components/spinner">Spinners</RouterLink>. Progress bar
      classes and examples are on
      <RouterLink to="/components/progress">Progress</RouterLink>.
    </p>
    <div class="vd-table-responsive vd-mb-6">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 28%">Topic</th>
            <th style="width: 72%">Where to read more</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>.vd-spinner*</code>, <code>.vd-spinner-dots</code>,
              <code>.vd-spinner-grow</code>, <code>.vd-spinner-center</code>
            </td>
            <td>
              <RouterLink to="/components/spinner">Spinners</RouterLink> —
              demos, variables, accessibility
            </td>
          </tr>
          <tr>
            <td>
              <code>.vd-dynamic-loader</code>,
              <code>.vd-dynamic-loader-grid</code>,
              <code>.vd-dynamic-loader-text</code>,
              <code>.vd-dynamic-loader-card</code>
            </td>
            <td>
              <RouterLink to="/components/spinner">Spinners</RouterLink> (quad
              loader section)
            </td>
          </tr>
          <tr>
            <td>
              <code>.vd-progress</code>, <code>.vd-progress-bar</code>,
              modifiers
            </td>
            <td>
              <RouterLink to="/components/progress">Progress</RouterLink>
            </td>
          </tr>
          <tr>
            <td><code>VanduoPreloader</code> DOM helpers</td>
            <td>
              <code>framework/js/components/preloader.js</code> — initializes
              modern <code>.vd-progress-bar[data-progress]</code> and legacy
              <code>.progress-bar[data-progress]</code> for compatibility.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
