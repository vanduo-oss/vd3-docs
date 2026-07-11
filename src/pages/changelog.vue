<script setup lang="ts">
// The changelog is ~4,000 lines of static, hand-written release notes with no
// framework JS behaviour. The static body (the Framework / Vanilla history) is
// imported verbatim and rendered via v-html (its styles already live in
// src/styles/docs.css). The page header and engine toggle are rendered by Vue
// (outside the v-html so they aren't wiped). Trusted first-party content →
// v-html is safe here.
//
// The changelog documents PACKAGE releases only (core / framework / vue / the
// ecosystem packages) — never docs-site changes (see the changelog-content-policy
// OpenSpec change). Filtering is STRICT and engine-driven: every release block
// carries a data-engine tag (the v-html body is the `vanilla` framework history;
// the latest "Cool Breeze I" card is `vanilla vue3` with per-package columns
// tagged by engine). An entry shows only when its own — or nearest ancestor's —
// tag includes the active engine; untagged entries are hidden, and any
// group/column left empty is collapsed so no shell remains.
import { nextTick, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import content from "./changelog-content.html?raw";
import vueContent from "./changelog-vue-content.html?raw";
import { useEngineStore } from "@/stores/engine";

const engineStore = useEngineStore();
const { engine } = storeToRefs(engineStore);

const rootRef = ref<HTMLElement | null>(null);

const applyEngineFilter = (active: string): void => {
  const root = rootRef.value;
  if (!root) return;

  // Reset everything we manage so switching engines is idempotent.
  root
    .querySelectorAll<HTMLElement>(
      "[data-engine], .change-group, .version-body .vd-col-12",
    )
    .forEach((el) => {
      el.hidden = false;
    });

  // 1. Hide a tagged element whose tag set excludes the active engine. Tags
  //    inherit down the tree, so a per-package column can override its card.
  root.querySelectorAll<HTMLElement>("[data-engine]").forEach((el) => {
    const tags = (el.dataset.engine ?? "").split(/\s+/).filter(Boolean);
    if (!tags.includes(active)) el.hidden = true;
  });
  // 2. Collapse a change-group whose items were all filtered out…
  root.querySelectorAll<HTMLElement>(".change-group").forEach((group) => {
    const items = [...group.querySelectorAll<HTMLElement>(".change-item")];
    if (items.length > 0 && items.every((i) => i.hidden)) group.hidden = true;
  });
  // 3. …and a version-body column whose groups all collapsed (only ever sets
  //    hidden, so a column already hidden by its own engine tag stays hidden).
  root
    .querySelectorAll<HTMLElement>(".version-body .vd-col-12")
    .forEach((col) => {
      const groups = [...col.querySelectorAll<HTMLElement>(".change-group")];
      if (groups.length > 0 && groups.every((g) => g.hidden)) col.hidden = true;
    });
};

onMounted(async () => {
  await nextTick();
  applyEngineFilter(engine.value);
});
watch(engine, applyEngineFilter);
</script>

<template>
  <section id="changelog" ref="rootRef">
    <div class="changelog-header">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-scroll" style="color: var(--vd-color-primary)"></i>
          Changelog
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Release notes for the <strong>Vanduo packages</strong> —
          <code>@vanduo-oss/core</code>, <code>framework</code>,
          <code>vue</code>, and the ecosystem (<code>charts</code>,
          <code>hex-grid</code>, <code>music-player</code>,
          <code>flowchart</code>). The engine toggle filters by engine:
          <em>Vanilla</em> shows the framework history; <em>Vue 3</em> shows the
          <code>@vanduo-oss/vue</code> releases. Shared packages appear in both.
        </p>
        <div class="changelog-engine-toggle">
          <div
            class="doc-engine-toggle"
            role="group"
            aria-label="Documentation engine"
          >
            <button
              type="button"
              class="doc-engine-option"
              :class="{ active: engine === 'vue3' }"
              :aria-pressed="engine === 'vue3'"
              @click="engineStore.setEngine('vue3')"
            >
              <i class="ph ph-atom" aria-hidden="true"></i> Vue 3
            </button>
            <button
              type="button"
              class="doc-engine-option"
              :class="{ active: engine === 'vanilla' }"
              :aria-pressed="engine === 'vanilla'"
              @click="engineStore.setEngine('vanilla')"
            >
              <i class="ph ph-file-html" aria-hidden="true"></i> Vanilla
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Framework 1.7.1 — patch after Cool Breeze I (both engines; vue ships framework CSS) -->
    <div style="padding: 3rem 0 0" data-engine="vanilla vue3">
      <div class="vd-container-responsive" style="max-width: 1200px">
        <article class="version-card" data-engine="vanilla vue3">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.7.1</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 5, 2026
            </span>
            <span class="vd-badge vd-badge-info" style="font-size: 0.75rem"
              >Latest</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <h4>
                  <i
                    class="ph ph-cube mr-2"
                    style="color: var(--vd-color-primary)"
                  ></i
                  >@vanduo-oss/framework
                </h4>
                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-warning-circle"
                        style="color: var(--vd-color-error)"
                      ></i>
                      <div>
                        <strong>Button danger alias</strong>
                        <p>
                          <code>.vd-btn-danger</code>,
                          <code>.vd-btn-outline-danger</code>, and
                          <code>.vd-btn-ghost-danger</code> now share the same
                          rules as the existing <code>-error</code> variants,
                          matching badges, alerts, and chips after the unified
                          status vocabulary migration.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- @vanduo-oss/vue 0.3.1 — CSS rebundle (Vue 3 engine) -->
    <div style="padding: 3rem 0 0" data-engine="vue3">
      <div class="vd-container-responsive" style="max-width: 1200px">
        <article class="version-card" data-engine="vue3">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v0.3.1</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 5, 2026
            </span>
            <span class="vd-badge vd-badge-info" style="font-size: 0.75rem"
              >Latest</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <h4>
                  <i
                    class="ph ph-atom mr-2"
                    style="color: var(--vd-color-primary)"
                  ></i
                  >@vanduo-oss/vue
                </h4>
                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-warning-circle"
                        style="color: var(--vd-color-error)"
                      ></i>
                      <div>
                        <strong>Bundled CSS refresh</strong>
                        <p>
                          Rebundled <code>@vanduo-oss/vue/css</code> from
                          <code>@vanduo-oss/framework@1.7.1</code> so
                          <code>VdButton</code> <code>danger</code>, outline,
                          and ghost variants pick up the missing danger-button
                          alias styles.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Cool Breeze I — coordinated package release (Vanilla + Vue 3) -->
    <div style="padding: 3rem 0 0" data-engine="vanilla vue3">
      <div class="vd-container-responsive" style="max-width: 1200px">
        <article class="version-card" data-engine="vanilla vue3">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >Cool Breeze I</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>June 29, 2026
            </span>
            <span class="vd-badge vd-badge-info" style="font-size: 0.75rem"
              >framework 1.7.0 · vue 0.3.0 · charts 0.2.0</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <!-- @vanduo-oss/framework (Vanilla engine) -->
              <div class="vd-col-12 vd-col-lg-4" data-engine="vanilla">
                <h4>
                  <i
                    class="ph ph-cube mr-2"
                    style="color: var(--vd-color-primary)"
                  ></i
                  >@vanduo-oss/framework <code>1.7.0</code>
                </h4>
                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-rows"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Separator &amp; Slider styles</strong>
                        <p>
                          <RouterLink to="/components/separator"
                            ><code>.vd-separator</code></RouterLink
                          >
                          (with <code>-vertical</code> / <code>-labeled</code>)
                          and a styled range
                          <RouterLink to="/components/slider"
                            ><code>.vd-slider</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-swatches"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Unified status-palette aliases</strong>
                        <p>
                          Additive <code>.vd-*-danger</code> /
                          <code>-secondary</code> aliases plus
                          <code>.vd-form-label</code>, backing the shared
                          <code
                            >primary/secondary/success/warning/danger/info</code
                          >
                          vocabulary. Fully additive — vanilla markup is
                          unchanged.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- @vanduo-oss/vue (Vue 3 engine) -->
              <div class="vd-col-12 vd-col-lg-4" data-engine="vue3">
                <h4>
                  <i
                    class="ph ph-atom mr-2"
                    style="color: var(--vd-color-primary)"
                  ></i
                  >@vanduo-oss/vue <code>0.3.0</code>
                </h4>
                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-toggle-right"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Switch, Slider, Separator &amp; Menu</strong>
                        <p>
                          Four new components —
                          <RouterLink to="/components/switch"
                            ><code>VdSwitch</code></RouterLink
                          >,
                          <RouterLink to="/components/slider"
                            ><code>VdSlider</code></RouterLink
                          >,
                          <RouterLink to="/components/separator"
                            ><code>VdSeparator</code></RouterLink
                          >, and
                          <RouterLink to="/components/menu"
                            ><code>VdMenu</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-text-aa"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Form-control ergonomics</strong>
                        <p>
                          <RouterLink to="/components/forms"
                            ><code>VdInput</code></RouterLink
                          >
                          gains <code>label</code> / <code>hint</code> /
                          <code>error</code> / <code>prefix</code> /
                          <code>suffix</code> and a number model;
                          <code>VdSelect</code> / <code>VdRadioGroup</code> are
                          generic over their value; new
                          <RouterLink to="/guides/css-variables"
                            ><code>useThemeBridge</code></RouterLink
                          >
                          composable.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="change-group">
                  <h5>Changed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-arrows-merge"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Unified variant vocabulary (breaking)</strong>
                        <p>
                          <code>VdButton</code> / <code>VdAlert</code> /
                          <code>VdBadge</code> / <code>VdChip</code> share
                          <code
                            >primary/secondary/success/warning/danger/info</code
                          >
                          (<code>error</code> → <code>danger</code>); the Node
                          engine floor is relaxed to current LTS.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- @vanduo-oss/charts (both engines) -->
              <div class="vd-col-12 vd-col-lg-4">
                <h4>
                  <i
                    class="ph ph-chart-line mr-2"
                    style="color: var(--vd-color-primary)"
                  ></i
                  ><RouterLink to="/canvas/charts"
                    >@vanduo-oss/charts</RouterLink
                  >
                  <code>0.2.0</code>
                </h4>
                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-tag"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Data labels &amp; annotations</strong>
                        <p>
                          <code>dataLabels</code> on every mark and
                          <code>annotations</code> reference lines.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-chart-scatter"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong
                          >Types, multi-series &amp; per-point colour</strong
                        >
                        <p>
                          A typed main entry (<code>.d.ts</code>),
                          <code>series[]</code>, a per-datum
                          <code>color</code> accessor, axis <code>yMin</code> /
                          <code>yMax</code>, and a typed tooltip context.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Vue 3 engine history -->
    <div data-engine="vue3" v-html="vueContent"></div>

    <!-- Framework / Vanilla engine history (every card is a framework release) -->
    <div data-engine="vanilla" v-html="content"></div>
  </section>
</template>
