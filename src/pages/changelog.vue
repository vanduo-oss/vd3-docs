<script setup lang="ts">
// The changelog documents PACKAGE releases for the vd3 line only —
// @vanduo-oss/vd3 (the Vue 3 design system + component library) and
// @vanduo-oss/vd3-cbun (the components bundle). It NEVER tracks docs-site
// changes (see the changelog-content policy).
//
// The package-release cards are rendered by Vue (so their RouterLinks work);
// the earlier scaffold history is imported verbatim and rendered via v-html
// (its styles live in src/styles/docs.css). Trusted first-party content →
// v-html is safe here.
import { onMounted, ref } from "vue";
import { useAffix } from "@vanduo-oss/vd3";
import vueContent from "./changelog-vue-content.html?raw";

// Sticky column headers via vd3's own affix composable (dogfooding): useAffix
// wires every `.vd-affix` inside `root` — position: sticky + an `.is-stuck`
// border toggled by a sentinel + IntersectionObserver. SSR-safe (onMounted).
// Visual `top` is `--docs-affix-offset`; copy its computed px onto the
// data attribute before useAffix reads it (observer + inline custom prop).
const root = ref<HTMLElement | null>(null);

onMounted(() => {
  const host = root.value;
  if (!host) return;
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none;top:var(--docs-affix-offset)";
  document.documentElement.appendChild(probe);
  const px = Math.round(parseFloat(getComputedStyle(probe).top));
  probe.remove();
  if (!Number.isFinite(px) || px < 0) return;
  host.querySelectorAll<HTMLElement>(".changelog-col-head").forEach((el) => {
    el.setAttribute("data-vd-affix-offset", String(px));
  });
});

useAffix(root);
</script>

<template>
  <section id="changelog" ref="root">
    <div class="changelog-header">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-scroll" style="color: var(--vd-color-primary)"></i>
          Changelog
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Release notes for the <strong>vd3 line packages</strong> —
          <code>@vanduo-oss/vd3</code> (the Vue 3 design system and component
          library) and <code>@vanduo-oss/vd3-cbun</code> (the components bundle:
          charts, code-editor, draw, flowchart, hex-grid, music-player).
          Packages only — never docs-site content.
        </p>
      </div>
    </div>

    <div class="vd-container-responsive changelog-grid">
      <div class="changelog-col">
        <div class="changelog-col-head vd-affix vd-affix-no-shadow">
          <h3 class="changelog-col-title">
            <i class="ph ph-atom" style="color: var(--vd-color-primary)"></i
            ><code>@vanduo-oss/vd3</code>
          </h3>
          <p class="changelog-col-sub">
            The standalone Vue 3 design system &amp; component library.
          </p>
        </div>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.7.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph-bold ph-calendar mr-1"></i>August 2026
            </span>
            <span class="vd-badge vd-badge-outline" style="font-size: 0.75rem"
              >Latest</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Global search palette</strong> — site-wide Cmd+K modal
                  with grouped results, keyboard navigation, and an
                  engine-agnostic adapter hook for hybrid or REST backends. Plus
                  the Oola dock chrome this site had been forking locally:
                  accent tinting, the primary-only swatches fan, and delayed
                  dock tooltips.
                </p>
                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph-bold ph-magnifying-glass-plus"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>VdGlobalSearch + useGlobalSearch</strong>
                        <p>
                          Teleport overlay palette with optional AI opt-in
                          toggle, disclaimer slot, debounced adapter injection,
                          and Cmd/Ctrl+K + <code>/</code> shortcuts. Co-mount
                          with
                          <RouterLink to="/components/doc-search"
                            >VdDocSearch</RouterLink
                          >
                          by setting <code>:keyboard-shortcut="false"</code> on
                          the inline combobox. See
                          <RouterLink to="/components/global-search"
                            ><code>/components/global-search</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph-bold ph-drop-half"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>VdDock <code>tintMode</code></strong>
                        <p>
                          <code>surface</code> (default) keeps the old behaviour
                          — <code>tint</code> paints the pill.
                          <code>accent</code>
                          holds the pill at constant ink and leaves
                          <code>--vd-dock-tint</code> for items and the brand
                          slot to consume, so the hue reads on the icons instead
                          of the glass. This site's dock now uses it in place of
                          a local inline-style override. See
                          <RouterLink to="/components/dock"
                            ><code>/components/dock</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph-bold ph-swatches"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          >VdThemeCustomizer <code>variant="swatches"</code> +
                          controlled <code>primary</code></strong
                        >
                        <p>
                          A primary-only fan hinged at the trigger, for dock and
                          toolbar chrome with no room for the 320px panel.
                          <code>swatches</code> curates the hues,
                          <code>direction</code> sets the axis, and
                          <code>preview</code> applies on hover. Bind
                          <code>:primary</code> and listen to
                          <code>@update:primary</code> to keep an app-side store
                          authoritative instead of the
                          <code>useThemePreference()</code> singleton. See
                          <RouterLink to="/components/theme-customizer"
                            ><code
                              >/components/theme-customizer</code
                            ></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph-bold ph-timer"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          >useTooltips <code>showDelay</code> + dock
                          variant</strong
                        >
                        <p>
                          <code>useTooltips(root, { showDelay })</code> sets the
                          hover dwell before a tip appears, overridable per
                          trigger with <code>data-tooltip-delay</code>. The root
                          is now watched with a <code>MutationObserver</code>,
                          so triggers added after mount bind themselves.
                          <code>data-tooltip-variant="dock"</code> opts into the
                          denser <code>.vd-tooltip-dock</code> frost and its
                          <code>--vd-tooltip-dock-*</code> custom properties.
                          See
                          <RouterLink to="/components/tooltip"
                            ><code>/components/tooltip</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.6.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph-bold ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Snippet chrome</strong> and an
                  <strong>ink</strong> button — tabbed View Code, Copy in the
                  header, and a 2px outline variant. vd3 still does not
                  tokenize.
                </p>
                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph-bold ph-code"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>VdCodeSnippet chrome mode</strong>
                        <p>
                          When any of <code>html</code> / <code>css</code> /
                          <code>js</code> / <code>shell</code> /
                          <code>vue</code> / <code>json</code> is set, the
                          component renders the collapsible tabbed “View Code”
                          widget (toggle, tablist, panes, raw-source copy).
                          Simple mode (<code>code</code> /
                          <code>language</code> / <code>copyable</code>) is
                          unchanged. Optional
                          <code>highlight(code, language)</code> injects escaped
                          HTML; without it, source is text. See
                          <RouterLink to="/components/code-snippet"
                            ><code>/components/code-snippet</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph-bold ph-drop"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>VdButton ink</strong>
                        <p>
                          <code>.vd-btn-ink</code>: transparent fill, a single
                          2px outline (not <code>.vd-btn-ring</code>). Hover
                          fills black in light and primary in dark; the label
                          uses <code>--vd-text-on-primary</code>. Existing
                          <code>outline</code> / <code>ghost</code> / ring
                          treatments are unchanged. See
                          <RouterLink to="/components/button"
                            ><code>/components/button</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph-bold ph-copy"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Copy header + tab ARIA</strong>
                        <p>
                          Copy stays in
                          <code>.vd-code-snippet-header</code> (top-right) for
                          simple and chrome modes. Tabs get
                          <code>aria-controls</code> / pane
                          <code>role="tabpanel"</code> and Left / Right / Home /
                          End navigation, matching <code>VdTabs</code>. A
                          <code>.vd-visually-hidden</code> child inside
                          <code>.vd-btn</code> no longer wraps the label.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.5.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph-bold ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Oola Dock</strong> — a morphing glass pill that is not
                  a navbar. Horizontal ↔ vertical through a square waypoint,
                  dock-own radius past the theme 0.5rem cap.
                </p>
                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph-bold ph-rows"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>VdDock + VdDockItem</strong>
                        <p>
                          Fat Seemore glass chrome with
                          <code>useDockOrientation</code>,
                          <code>position</code> fixed or contained, Open Color
                          <code>tint</code>, Seemore <code>glass</code>, and
                          <code>itemLayout</code>, and
                          <code>placement</code> (bottom / top / left / right).
                          Brand is a slot — demos use ū on the morph-origin
                          corner. See
                          <RouterLink to="/components/dock"
                            ><code>/components/dock</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.4.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph-bold ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  Headless <strong>auth screens</strong> and a client
                  <strong>data table</strong> — still a UI kit, not an app
                  framework. No fetch, no dataProvider, no Resource registry.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph-bold ph-sign-in"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Auth screens</strong>
                        <p>
                          <code>VdAuthCard</code>, <code>VdLogin</code>,
                          <code>VdSignUp</code>, and
                          <code>VdForgotPassword</code> emit
                          <code>submit</code> / <code>social</code>. Password
                          fields use WHATWG autocomplete tokens and a real
                          reveal button. Primitives: <code>VdCheckbox</code>,
                          <code>VdOtpInput</code>, <code>VdInput</code> slots +
                          <code>revealPassword</code>, <code>VdCard</code>
                          <code>glass</code>. See
                          <RouterLink to="/components/login"
                            ><code>/components/login</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph-bold ph-table"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Data table</strong>
                        <p>
                          <code>useTableState</code> (search → sort → page, or
                          <code>manual</code> for server-sliced rows) and
                          <code>VdDataTable</code> (sortable
                          <code>aria-sort</code> headers, cell slots, selection,
                          sticky header, skeleton loading,
                          <code>VdEmptyState</code>, composed
                          <code>VdPagination</code>). Presentational
                          <code>VdTable</code> is unchanged. See
                          <RouterLink to="/components/table"
                            ><code>/components/table</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.3.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph-bold ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Seemore Glass</strong> — Fibonacci strength-step
                  frosted material — plus reusable
                  <strong>decorative Surfaces</strong> for hero backdrops.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph-bold ph-drop-half-bottom"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Seemore Glass</strong>
                        <p>
                          Canonical modifiers
                          <code>.vd-glass-{1,2,3,5,8,13,21}</code> bundle blur,
                          tint, border, saturate, grain, and elevation. Base
                          <code>.vd-glass</code> is step 5; legacy
                          <code>sm|lg|xl</code> alias to 3/8/13. New
                          <code>.vd-glass-adaptive</code>, a11y media-query
                          hardening, and scroll glass that never transitions
                          <code>backdrop-filter</code>. See
                          <RouterLink to="/effects/glass"
                            ><code>/effects/glass</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph-bold ph-checkerboard"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Decorative Surfaces</strong>
                        <p>
                          Layer 5 <code>.vd-surface</code> with mesh, stripe,
                          noise, aurora, dots, and grid — plus intensity
                          <code>.vd-surface-{3,5,8}</code>. Documented at
                          <RouterLink to="/effects/surfaces"
                            ><code>/effects/surfaces</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.2.3</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph-bold ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  Optional theme preference
                  <strong>storage prefix</strong> so multi-app same-origin hosts
                  can isolate <code>localStorage</code> keys without colliding
                  on the default <code>vanduo-*</code> namespace.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph-bold ph-hard-drives"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Theme <code>storagePrefix</code></strong>
                        <p>
                          Pass
                          <code
                            >app.use(VanduoVue, { storagePrefix: "app-" })</code
                          >
                          or call <code>setStoragePrefix</code> /
                          <code>getStoragePrefix</code> at bootstrap to remap
                          the six preference keys. Default remains
                          <code>vanduo-*</code> (back-compat); no automatic
                          migration between prefixes. See
                          <RouterLink to="/guides/css-variables"
                            ><code>/guides/css-variables</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.2.2</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  Adds the theme-aware
                  <strong>Liquid Gradient</strong> WebGL effect, and fixes
                  native select chevron tiling when consumers use the
                  <code>background</code> shorthand.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-wave-sine"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Liquid Gradient effect</strong>
                        <p>
                          Interactive vanilla WebGL atmosphere under
                          <RouterLink to="/effects/liquid-gradient"
                            ><code>/effects/liquid-gradient</code></RouterLink
                          >
                          — <code>.vd-liquid-gradient</code> +
                          <code>useLiquidGradient</code> /
                          <code>createLiquidGradient</code>, bound to primary /
                          neutral / background tokens with
                          <code>--vd-liquid-*</code> knobs. Inspired by Cameron
                          Knight’s MIT CodePen (no Three.js).
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-caret-down"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Native select chevron tiling</strong>
                        <p>
                          Focus / disabled / dark theme caret rules now
                          re-declare <code>background-repeat</code>,
                          <code>background-position</code>, and
                          <code>background-size</code> so a consumer
                          <code>background</code> shorthand cannot leave a
                          tiling SVG caret.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.2.1</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  A patch release: opt-in
                  <strong>glass modal</strong> and
                  <strong>animated stepper</strong>, plus polish across loading
                  buttons, spotlight, morph, button groups, transfer, and
                  collections.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-drop"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          ><code>VdModal</code> <code>glass</code> prop</strong
                        >
                        <p>
                          <RouterLink to="/components/modal"
                            ><code>VdModal</code></RouterLink
                          >
                          gains an opt-in <code>glass</code> prop that applies
                          the existing <code>.vd-modal-glass</code> /
                          <code>.vd-modal-glass-backdrop</code> classes (same
                          idea as <code>VdFab</code>’s <code>glass</code>). CSS
                          was already shipped; the prop wires it for Vue
                          consumers. Fallthrough attrs bind on the dialog root
                          so glass token overrides land correctly through
                          Teleport.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-stairs"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Stepper scroll-reveal</strong>
                        <p>
                          Containers with
                          <code>.vd-stepper-animated</code> get a staggered
                          IntersectionObserver reveal (mirrors timeline).
                          <code>useStepper</code> accepts optional
                          <code>UseStepperOptions</code>
                          (<code>staggerMs</code>,
                          <code>maxStaggerIndex</code>); prefers-reduced-motion
                          and missing <code>IntersectionObserver</code> reveal
                          immediately.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-spinner"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong
                          >Loading spinner on outline / ghost / plain</strong
                        >
                        <p>
                          Outline, ghost, and plain buttons with
                          <code>.is-loading</code> now keep a visible spinner —
                          the legacy <code>currentColor</code> spinner was
                          invisible once the label used
                          <code>color: transparent</code>. Solid variants
                          already pinned their colours; these treatments now pin
                          their accent colours the same way.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-flashlight"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Spotlight cutout</strong>
                        <p>
                          Spotlight uses a body-level
                          <code>.vd-spotlight-highlight</code> instead of a huge
                          box-shadow on the target, so transformed ancestors no
                          longer trap the dimming layer; geometry animates
                          between steps.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-arrows-merge"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Morph settle</strong>
                        <p>
                          Morph no longer reverse-animates at end-of-swap: a
                          short <code>.is-morph-settling</code> freeze +
                          cooldown blocks re-entrant clicks; default
                          duration/easing are snappier. Same settle path for
                          <code>useMorphBadges</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-rows"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Vertical button groups &amp; transfer</strong>
                        <p>
                          <code>.vd-btn-group.vd-btn-group-vertical</code> no
                          longer inherits horizontal edge-sharing margins/radii;
                          labels stay <code>nowrap</code> and the stack sizes to
                          the widest button.
                          <RouterLink to="/components/transfer"
                            >Transfer</RouterLink
                          >
                          move buttons use Phosphor carets via
                          <code>VdIcon</code> with clearer hover/focus-visible
                          styles.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-stack"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong
                          >Collections clip &amp; stepper connectors</strong
                        >
                        <p>
                          Collections flush inside a card body clip to the
                          card’s inner radius so hover backgrounds do not square
                          off past rounded corners. Stepper connector
                          <code>::after</code> is
                          <code>pointer-events: none</code> so decorative lines
                          never steal clicks.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.2.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  A minor release adding an opt-in
                  <strong>button ring modifier</strong>. Additive only — no
                  button without it renders differently.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-circles-three"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Button ring (<code>.vd-btn-ring</code>)</strong>
                        <p>
                          <RouterLink to="/components/button"
                            >Buttons</RouterLink
                          >
                          gain a detached outer ring with a transparent gap, for
                          marking one action as the primary one on a screen that
                          already uses solid buttons throughout. It is a
                          modifier rather than a variant, so it layers onto any
                          existing variant, size and state — via the class or
                          <code>:ring</code> on <code>VdButton</code> — and
                          because the gap is real transparency it reads
                          correctly on cards, glass and imagery. Tunable through
                          the <code>--vd-btn-ring-*</code> custom properties.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.1.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  A minor release: a new extra-large
                  <RouterLink to="/components/modal"
                    ><code>VdModal</code></RouterLink
                  >
                  size, broad
                  <strong>accessibility &amp; lifecycle hardening</strong>, and
                  a security-hardened HTML sanitizer. No breaking changes.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-frame-corners"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          ><code>VdModal</code> <code>xl</code> size</strong
                        >
                        <p>
                          <RouterLink to="/components/modal"
                            ><code>VdModal</code></RouterLink
                          >
                          gains a fourth size tier —
                          <code>size="xl"</code> (987px, via the
                          <code>--vd-modal-width-xl</code> token and
                          <code>.vd-modal-panel-xl</code> class) — for release
                          notes, side-by-side content, and wider forms.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="change-group">
                  <h5>Accessibility</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-keyboard"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Dialogs, tabs, selects &amp; ratings</strong>
                        <p>
                          <RouterLink to="/components/modal"
                            ><code>VdModal</code></RouterLink
                          >
                          and
                          <RouterLink to="/components/offcanvas"
                            ><code>VdOffcanvas</code></RouterLink
                          >
                          now trap focus, restore it to the opener on close, and
                          release the body scroll lock on unmount;
                          <RouterLink to="/components/tabs"
                            ><code>VdTabs</code></RouterLink
                          >
                          implements the full WAI-ARIA tabs pattern (arrow-key
                          navigation + roving tabindex);
                          <code>VdCustomSelect</code> exposes
                          <code>aria-activedescendant</code>;
                          <RouterLink to="/components/rating"
                            ><code>VdRating</code></RouterLink
                          >
                          is a valid single-checked radiogroup; and
                          <RouterLink to="/components/timepicker"
                            ><code>useTimepicker</code></RouterLink
                          >
                          is now keyboard-operable.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="change-group">
                  <h5>Security &amp; fixes</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-shield-check"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>HTML sanitizer hardening</strong>
                        <p>
                          <code>sanitizeHtml</code> now correctly keeps
                          allow-listed inline SVG (a case-mismatched allowlist
                          had silently stripped all SVG) and scrubs dangerous
                          inline <code>style</code> values under
                          <code>allowStyle</code>. <code>useClickOutside</code>
                          now attaches when created already-enabled, and
                          <code>useStepper</code> no longer emits a spurious
                          change on mount.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="change-group">
                  <h5>Internal</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-git-diff"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Token-parity gate</strong>
                        <p>
                          A test-only guard asserts the generated token data
                          stays in sync with the authored token source, catching
                          drift in CI.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header version-initial">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.0.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  The standalone Vue 3 line — one package ships DTCG design
                  tokens, the full CSS tree, and typed <code>Vd*</code>
                  components and composables. Sole peer dependency:
                  <code>vue &gt;= 3.3</code>.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-file-css"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Standalone tokens &amp; CSS</strong>
                        <p>
                          A zero-dependency generator emits
                          <code>@vanduo-oss/vd3/tokens.json</code> and the typed
                          token-data module; the authored CSS tree bundles into
                          <code>@vanduo-oss/vd3/css</code> (full) and
                          <RouterLink to="/guides/css-variables"
                            ><code>@vanduo-oss/vd3/css/core</code></RouterLink
                          >
                          (tokens-only, no icons), with fonts and Phosphor icons
                          shipped in-package.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-stack"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Complete component surface</strong>
                        <p>
                          The full typed <code>Vd*</code> component set —
                          including the seven layout primitives — plus the
                          interactive composables, carried over 1:1 as pure Vue.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-plus-circle"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Seven new components</strong>
                        <p>
                          <RouterLink to="/components/breadcrumb"
                            ><code>VdBreadcrumb</code></RouterLink
                          >,
                          <RouterLink to="/components/footer"
                            ><code>VdFooter</code></RouterLink
                          >,
                          <RouterLink to="/components/fab"
                            ><code>VdFab</code></RouterLink
                          >
                          (speed-dial),
                          <RouterLink to="/components/navbar"
                            ><code>VdNavbar</code></RouterLink
                          >
                          (burger + overlay + body-lock + glass-on-scroll),
                          <RouterLink to="/components/theme-switcher"
                            ><code>VdThemeSwitcher</code></RouterLink
                          >,
                          <RouterLink to="/components/theme-customizer"
                            ><code>VdThemeCustomizer</code></RouterLink
                          >
                          (<code>show-palette</code> prop,
                          <code>vd:open-customizer</code> window event), and
                          <code>VdDocSearch</code> (combobox / listbox).
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-function"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>New composables</strong>
                        <p>
                          <code>useThemePreference</code> (the module-scope
                          theme singleton behind both theme controls),
                          <code>useDocSearch</code>,
                          <RouterLink to="/guides/lazy-loading"
                            ><code>useLazyLoad</code></RouterLink
                          >
                          (IntersectionObserver reveal +
                          <code>loadSection</code>),
                          <RouterLink to="/core/grid-system"
                            ><code>useGrid</code></RouterLink
                          >
                          + <code>setGridSystem</code> (per-container standard /
                          fibonacci mode), and <code>useClickOutside</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-toggle-right"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          >VdMenu &amp; pure-Vue interactive composables</strong
                        >
                        <p>
                          <RouterLink to="/components/menu"
                            ><code>VdMenu</code></RouterLink
                          >
                          ships, and the twelve interactive composables
                          (<code>useRipple</code>, <code>useSearch</code>,
                          <code>useExpandingCards</code>,
                          <code>useValidate</code>, <code>useTimeline</code>,
                          <code>usePopover</code>, <code>useFlow</code>,
                          <code>useTabs</code>, <code>useSpotlight</code>,
                          <code>useDropdown</code>, <code>useImageBox</code>,
                          <code>useDraggable</code>) are pure-Vue rewrites that
                          additively return an optional controller with a
                          <code>refresh()</code> idiom.
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
                        class="ph ph-tree-view"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>VdTree cascade default</strong>
                        <p>
                          <RouterLink to="/components/tree"
                            ><code>VdTree</code></RouterLink
                          >'s <code>cascade</code> prop now genuinely defaults
                          to <code>true</code> via <code>withDefaults</code>:
                          mounting <code>VdTree</code> without it cascades a
                          parent check to its descendants. Pass
                          <code>:cascade="false"</code> to opt out.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="change-group">
                  <h5>Migration notes</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-plug"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Standalone by design</strong>
                        <p>
                          vd3 is pure Vue: there is no separate client-side
                          runtime to bootstrap and no global window objects —
                          theming and interactivity live entirely in typed
                          composables and the <code>VanduoVue</code> plugin.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-database"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Pinia-free toast</strong>
                        <p>
                          <code>useToast</code> is a module-scope singleton with
                          the same documented API (<code>useToastStore</code>,
                          <code>useToast</code>, <code>show()</code>, typed
                          helpers, reactive <code>queue</code>), and
                          <code>pinia</code> is no longer a peer dependency.
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
      <div class="changelog-col">
        <div class="changelog-col-head vd-affix vd-affix-no-shadow">
          <h3 class="changelog-col-title">
            <i class="ph ph-package" style="color: var(--vd-color-primary)"></i
            ><code>@vanduo-oss/vd3-cbun</code>
          </h3>
          <p class="changelog-col-sub">
            The components bundle — charts, code-editor, draw, flowchart,
            hex-grid, music-player.
          </p>
        </div>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.4.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
            </span>
            <span class="vd-badge vd-badge-outline" style="font-size: 0.75rem"
              >Latest</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  A code-editor minor: snippet-safe first-party highlighter and
                  a tokenizer-only subpath. Takes
                  <code>VD_CODE_EDITOR_VERSION</code>
                  <code>1.0.1 → 1.1.0</code>.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-code"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Tokenizer-only highlight</strong>
                        <p>
                          <code
                            >highlight(source, lang, { trailingNewline? })</code
                          >
                          defaults <code>trailingNewline</code> to
                          <code>false</code> (no extra <code>\n</code> inside
                          <code>&lt;pre&gt;</code>).
                          <code
                            >@vanduo-oss/vd3-cbun/code-editor/highlight</code
                          >
                          exports <code>highlight</code>, <code>tokenize</code>,
                          <code>renderTokensToHtml</code>, and
                          <code>LANGUAGES</code> without the editor core.
                          <code>vue</code> is a real SFC tokenizer. See
                          <RouterLink to="/editors/code-editor"
                            ><code>/editors/code-editor</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.3.2</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  A Draw patch: optional smooth line paths and Vue shape CRUD.
                  Additive and backward-compatible —
                  <code>smooth</code> is opt-in, existing documents stay
                  polylines, and <code>VD_DRAW_VERSION</code> remains
                  <code>1.1.0</code>.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-wave-sine"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Smooth lines</strong>
                        <p>
                          Line shapes accept optional <code>smooth</code>;
                          <code>pointsToPath(points, { smooth })</code> then
                          emits Catmull-Rom cubics (tension 1) so dense
                          polylines read as curves. Two-point lines stay sharp;
                          omit the flag and paths stay polylines — the second
                          argument is optional.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-shapes"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Vue shape CRUD</strong>
                        <p>
                          <RouterLink to="/canvas/draw"
                            ><code>VdDraw</code></RouterLink
                          >
                          now exposes <code>addShape</code>,
                          <code>updateShape</code>, <code>removeShape</code>,
                          <code>getShape</code>, <code>getShapes</code>,
                          <code>clear</code>, <code>load</code>, and
                          <code>toJSON</code>. <code>getShapes()</code> returns
                          deep clones so callers cannot mutate the live
                          document.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.3.1</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  A flowchart chrome patch: dark-aware panels, icon toolbar,
                  Arrange select that keeps the active layout, and short-parent
                  sizing. Styling + chrome UX only —
                  <code>VD_FLOWCHART_VERSION</code> remains
                  <code>1.2.0</code> (serialization unchanged).
                </p>

                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-moon-stars"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Dark-aware flowchart chrome</strong>
                        <p>
                          <RouterLink to="/canvas/flowchart"
                            >Flowchart</RouterLink
                          >
                          CSS token mixes no longer blend toward fixed light
                          cream/white; panels, nodes, handles, and inspector
                          chrome follow
                          <code>--vd-bg-primary</code> /
                          <code>--vd-bg-secondary</code> so dark mode stays
                          coherent with the site palette.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-toolbox"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Icon toolbar &amp; shapes rail</strong>
                        <p>
                          Toolbar actions use Draw-style Phosphor icons (zoom /
                          reset / fit / undo / redo / clear) instead of faint
                          text glyphs; the left shapes rail is a compact icon
                          panel with stronger stroke contrast and pressed
                          states.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-tree-structure"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Arrange select (Tree / Radial / Grid)</strong>
                        <p>
                          The layout <code>&lt;select&gt;</code> always shows
                          the active mode instead of resetting to a disabled
                          “Arrange” placeholder (which looked like a fourth
                          option that was not a real layout). Single no-repeat
                          caret.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-arrows-in-simple"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Short-parent shell sizing</strong>
                        <p>
                          Shell <code>min-height</code> no longer forces 560px,
                          so short parents (docs fullscreen) keep the bottom
                          border visible.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.3.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  A minor release: chart mark-click events, hardened document
                  loading, and core bug fixes. Additive and backward-compatible;
                  the saved-document format is unchanged.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-cursor-click"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Chart mark clicks</strong>
                        <p>
                          <RouterLink to="/canvas/charts"
                            ><code>VdChart</code></RouterLink
                          >
                          now forwards mark clicks as Vue events —
                          <code>@bar-click</code>, <code>@point-click</code>,
                          and <code>@slice-click</code>, each carrying the typed
                          <code>ClickEvent</code>. Charts component
                          <code>1.1.0</code>.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="change-group">
                  <h5>Hardened</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-shield-check"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Bounded document loading</strong>
                        <p>
                          <RouterLink to="/canvas/draw"
                            ><code>VdDraw</code></RouterLink
                          >
                          and
                          <RouterLink to="/canvas/flowchart"
                            ><code>VdFlowchart</code></RouterLink
                          >
                          now cap an untrusted or corrupt document on load
                          (truncating, never throwing), so a hostile document
                          cannot freeze the tab. The saved-document format is
                          unchanged.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-bug-beetle"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Core bug fixes</strong>
                        <p>
                          <RouterLink to="/canvas/draw">Draw</RouterLink> undo
                          no longer corrupts history after an undo;
                          <RouterLink to="/canvas/charts"
                            >bar charts</RouterLink
                          >
                          anchor correctly when <code>yMin &gt; 0</code>; the
                          <RouterLink to="/media/music-player"
                            >music player</RouterLink
                          >
                          stops at the end of a playlist instead of looping
                          forever;
                          <RouterLink to="/canvas/hex">hex grid</RouterLink>
                          removes its canvas listeners on destroy; and the
                          <RouterLink to="/editors/code-editor"
                            >code editor</RouterLink
                          >
                          highlights an unterminated block comment correctly.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.2.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  Adds a sixth component — <strong>Drawing tool</strong> — to
                  the bundle. Additive minor release; the five existing
                  components are unchanged. Sole runtime peer:
                  <code>vue &gt;= 3.3</code>.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-pencil-simple"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Drawing tool</strong>
                        <p>
                          <RouterLink to="/canvas/draw"
                            >Drawing tool</RouterLink
                          >
                          on <code>@vanduo-oss/vd3-cbun/draw</code> (+
                          <code>/draw/css</code>), exposing
                          <code>VdDrawCore</code> alongside the component — a
                          vector drawing / painting surface with a
                          variable-width <em>brush engine</em> (pen, pencil,
                          marker, highlighter), a color palette with recents, an
                          eraser, selection / move / resize, a toggleable
                          background grid with adjustable cell size, undo / redo
                          history, self-contained SVG &amp; PNG export, and a
                          Phosphor-icon toolbar. Pure-Vue and SSR-safe with no
                          new runtime dependency. Component <code>1.1.0</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-clock-counter-clockwise"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Forward-compatible documents</strong>
                        <p>
                          Saved documents carry <code>VD_DRAW_VERSION</code>;
                          older constant-width freehand strokes migrate to the
                          brush model on load, so earlier drawings keep
                          rendering unchanged.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.1.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  Adds a fifth component — <strong>Code editor</strong> — to the
                  bundle. Additive minor release; the four existing components
                  are unchanged. Sole runtime peer: <code>vue &gt;= 3.3</code>.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-code"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Code editor</strong>
                        <p>
                          <RouterLink to="/editors/code-editor"
                            >Code editor</RouterLink
                          >
                          on <code>@vanduo-oss/vd3-cbun/code-editor</code> (+
                          <code>/code-editor/css</code>) — a lightweight, secure
                          <em>textarea-overlay</em> editor: a native
                          <code>&lt;textarea&gt;</code> over a syntax-highlight
                          layer painted by first-party, ReDoS-safe tokenizers
                          for JavaScript/TypeScript, HTML, CSS, JSON, Markdown,
                          Shell, and Python. Line-number gutter, auto-indent,
                          bracket/quote auto-close, read-only mode, copy button,
                          placeholder, and a large-input guard. Escaping-safe
                          (no <code>innerHTML</code>), SSR-safe, and no new
                          runtime dependency. Component <code>1.0.0</code>.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.0.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  The canvas components bundle for the vd3 line — charts,
                  flowchart, hex-grid, and music-player consolidated into one
                  package with tree-shakeable subpath exports. Sole runtime
                  peer:
                  <code>vue &gt;= 3.3</code>.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-chart-line"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Charts</strong>
                        <p>
                          <RouterLink to="/canvas/charts">Charts</RouterLink> on
                          <code>@vanduo-oss/vd3-cbun/charts</code> (+
                          <code>/charts/css</code>). Component
                          <code>1.0.0</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-flow-arrow"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Flowchart</strong>
                        <p>
                          <RouterLink to="/canvas/flowchart"
                            >Flowchart</RouterLink
                          >
                          on <code>@vanduo-oss/vd3-cbun/flowchart</code> (+
                          <code>/flowchart/css</code>), exposing
                          <code>VdFlowchartCore</code> alongside the component.
                          Component <code>1.2.0</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-hexagon"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Hex grid</strong>
                        <p>
                          <RouterLink to="/canvas/hex">Hex grid</RouterLink> on
                          <code>@vanduo-oss/vd3-cbun/hex-grid</code> with the
                          <code>/hex-grid/hex-math</code> helpers —
                          canvas-rendered, reading <code>--vd-*</code> tokens
                          (no CSS). Component <code>1.0.0</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-music-notes"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Music player</strong>
                        <p>
                          <RouterLink to="/media/music-player"
                            >Music player</RouterLink
                          >
                          on <code>@vanduo-oss/vd3-cbun/music-player</code> (+
                          <code>/music-player/css</code>). Component
                          <code>1.0.0</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-shield-check"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Subpath isolation &amp; tests</strong>
                        <p>
                          Each subpath re-exports both the Vue component and its
                          framework-agnostic core; a build-time guard bundles
                          every entry separately with <code>vue</code> external
                          and fails if inputs cross a component boundary.
                          Versions surface via <code>VD3_CBUN_VERSIONS</code>,
                          with 261 tests across 15 vitest files plus a
                          Playwright real-canvas smoke.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <div v-html="vueContent"></div>
      </div>
    </div>
  </section>
</template>
