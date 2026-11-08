<script setup lang="ts">
// The changelog documents PACKAGE releases for the vd3 line only —
// @vanduo-oss/vd3, @vanduo-oss/vd3-charts, and @vanduo-oss/vd3-flowchart.
// It NEVER tracks docs-site changes (see the changelog-content policy).
import { onMounted, ref } from "vue";
import { useAffix } from "@vanduo-oss/vd3";

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
    <div class="changelog-header vd-surface vd-surface-noise">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-scroll" style="color: var(--vd-color-primary)"></i>
          Changelog
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Release notes for the <strong>vd3 line packages</strong> —
          <code>@vanduo-oss/vd3</code> (the Vue 3 design system and component
          library), <code>@vanduo-oss/vd3-charts</code>, and
          <code>@vanduo-oss/vd3-flowchart</code>.
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
        <article class="version-card" id="vd3-1-8-2">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.8.2</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>November 2026
            </span>
            <span class="vd-badge vd-badge-outline" style="font-size: 0.75rem"
              >Latest</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Text fonts leave the package</strong>
                  — <code>data-font</code> still switches the stack, and apps
                  host only the faces they offer.
                </p>
                <div class="change-group">
                  <h5>Changed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-text-aa"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Bundled text fonts removed</strong>
                        <p>
                          <code>fonts/</code> and
                          <code>css/core/fonts.css</code> are gone from the
                          package and from <code>dist/</code>. Built-in
                          <code>data-font</code> keys still switch
                          <code>--vd-font-family-*</code> stacks. Host the faces
                          yourself, or use <code>system</code>. See
                          <RouterLink to="/core/typography"
                            ><code>/core/typography</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-paint-roller"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Custom font catalogs</strong>
                        <p>
                          <code>app.use(VanduoVue, { fontOptions })</code>,
                          <code>setFontOptions()</code> /
                          <code>getFontOptions()</code>, and
                          <RouterLink to="/components/theme-customizer"
                            ><code>VdThemeCustomizer</code></RouterLink
                          >
                          props <code>fonts</code> and <code>showFont</code> let
                          an app offer any faces. A font entry may set
                          <code>family</code> and <code>mono</code> to apply
                          those stacks inline; omit them to keep the stylesheet
                          <code>[data-font]</code> rules.
                          <code>system</code> and the configured default font
                          stay valid when they are absent from the catalog.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-sidebar"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Sidenav &amp; waypoint link polish</strong>
                        <p>
                          <RouterLink to="/components/sidenav"
                            ><code>.vd-sidenav-link</code></RouterLink
                          >
                          gains an icon/text gap, a 1.25rem icon box, weight 500
                          (600 when active), and a rounded highlight;
                          <code>.vd-waypoint-border</code> links also follow
                          <code>--vd-btn-border-radius</code>.
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
                        class="ph ph-calendar-dots"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong
                          >Datepicker popup sizing &amp; weekday
                          alignment</strong
                        >
                        <p>
                          <RouterLink to="/components/datepicker"
                            ><code>useDatepicker</code></RouterLink
                          >
                          keeps <code>.vd-datepicker-popup</code> calendar-sized
                          and anchored to the input’s left edge instead of
                          stretching to wide inputs, and
                          <code>.vd-datepicker-weekdays</code> /
                          <code>.vd-datepicker-row</code> share 7 equal
                          <code>--vd-dp-cell-size</code> tracks so weekday
                          labels sit directly above their date columns.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-arrows-out"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Offcanvas &amp; Sidenav body padding</strong>
                        <p>
                          <RouterLink to="/components/offcanvas"
                            ><code>.vd-sidenav-body</code></RouterLink
                          >
                          adds horizontal
                          <code>--vd-sidenav-padding-x</code> spacing so prose
                          and custom content no longer touch the panel edges; a
                          direct <code>.vd-sidenav-nav</code> is inset so its
                          rounded highlights align with the header.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-map-trifold"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Waypoint overflow-container scrolling</strong>
                        <p>
                          <RouterLink to="/components/scrollspy"
                            ><code>useWaypoint</code></RouterLink
                          >
                          scrolls the resolved
                          <code>data-vd-waypoint-nav</code> container on link
                          click instead of scrolling the document via
                          <code>scrollIntoView()</code>, and respects
                          <code>prefers-reduced-motion</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-lock-open"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Sidenav scroll lock &amp; trigger state</strong>
                        <p>
                          <RouterLink to="/components/sidenav"
                            ><code>VdSidenav</code></RouterLink
                          >
                          releases the body scroll lock when unmounted while
                          open, and <code>useSidenav</code> triggers get
                          <code>aria-controls</code> plus an
                          <code>aria-expanded</code> that tracks every
                          open/close path. The datepicker range tint now uses
                          <code>--vd-color-primary-alpha-10</code>, and
                          un-tinted
                          <RouterLink to="/components/badge"
                            ><code>.vd-badge-outlined</code></RouterLink
                          >
                          badges use <code>--vd-text-secondary</code> /
                          <code>--vd-border-color</code> so they stay legible in
                          dark mode.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="vd3-1-8-1">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.8.1</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>November 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong
                    >Gallery lightboxes, Oola Dock affordances, and Tailwind CSS
                    &amp; Nuxt UI cascade layer coexistence</strong
                  >
                  — declarative <code>VdImageBox</code> galleries with grouped
                  lightbox navigation, Oola Dock brand spin and auto edge
                  layouts, and <code>@layer vd3</code> stylesheet wrapping with
                  <code>useThemeBridge</code> dark-class sync.
                </p>
                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-image-square"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          ><code>VdImageBox</code> &amp; gallery
                          lightbox</strong
                        >
                        <p>
                          <RouterLink to="/media/image-box"
                            ><code>VdImageBox</code></RouterLink
                          >
                          adds declarative <code>grid</code>,
                          <code>masonry</code>, <code>bento</code>,
                          <code>filmstrip</code>, and
                          <code>single</code> gallery layouts;
                          <code>useImageBox</code> adds
                          <code>data-image-box-group</code> navigation with
                          Prev/Next buttons, arrow keys, a
                          <code>"1 / N"</code> counter,
                          <code>imageBox:change</code> events, and an
                          <code>{ open, close, next, prev, refresh }</code>
                          controller; dialog focus is trapped via
                          <code>useFocusTrap</code>, custom trigger
                          <code>aria-label</code> attributes are preserved, and
                          desktop lightbox bounds expand to
                          <code>85vw</code> &times; <code>85vh</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-rows"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Oola Dock polish &amp; brand spin</strong>
                        <p>
                          <RouterLink to="/components/dock"
                            ><code>VdDock</code></RouterLink
                          >
                          gains <code>itemLayout="auto"</code>,
                          <code>brandCorner="consistent"</code>,
                          <code>brandSpin</code> +
                          <code>useDockBrandSpin</code> continuous brand
                          rotation with upright ease-out settle, and a mobile
                          horizontal touch scrollport;
                          <code>VdDockItem</code> gains
                          <code>activeIconFill</code>, automatic vertical
                          <code>.vd-tooltip-dock</code> tooltips,
                          <code>badge</code>, and polymorphic
                          <code>href</code>/<code>as</code> support.
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
                        class="ph ph-squares-four"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Tailwind CSS &amp; Nuxt UI coexistence</strong>
                        <p>
                          Bundled CSS is wrapped in <code>@layer vd3</code>,
                          grid column selectors use prefixed
                          <code>[class*="vd-col-"]</code> matchers so Tailwind
                          <code>col-span-*</code> utilities never collide, and
                          <code>useThemeBridge</code> accepts
                          <code>{ syncDarkClass: true }</code> to keep
                          <code>data-theme</code> synchronized with
                          <code>html.dark</code>. See
                          <RouterLink to="/guides/framework-integration"
                            ><code
                              >/guides/framework-integration</code
                            ></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-shield-check"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong
                          >Dependency &amp; lockfile security refresh</strong
                        >
                        <p>
                          Upgraded <code>vite</code> and
                          <code>vitest</code> toolchain floors and regenerated
                          the lockfile so patched transitive dependencies
                          install cleanly. See
                          <RouterLink to="/guides/security"
                            ><code>/guides/security</code></RouterLink
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
        <article class="version-card" id="vd3-1-8-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.8.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>October 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong
                    >Atomic layer prop parity, theme runtime resilience, and
                    composable hardening</strong
                  >
                  — layout primitives and UI atoms gain full prop parity,
                  explicit primary selections persist across theme flips, and
                  form, overlay, and keyboard composables are hardened.
                </p>
                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-layout"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Layout primitive prop parity</strong>
                        <p>
                          <code>VdBox</code> gains <code>bg</code>,
                          <code>round</code>, and <code>border</code> props;
                          <code>VdStack</code> gains <code>align</code> and
                          polymorphic <code>as</code> tag support;
                          <code>VdInline</code> gains <code>as</code>,
                          <code>align</code>, <code>justify</code>, and
                          <code>wrap</code> props; <code>VdCover</code> and
                          <code>VdSwitcher</code> widen <code>Gap</code> to
                          <code>fib-13|21|34</code> and
                          <code>VdSwitcher</code> gains <code>as</code>;
                          <code>VdFrame</code> gains <code>21-9</code> aspect
                          ratio and <code>as</code>. See
                          <RouterLink to="/components/primitives"
                            ><code>/components/primitives</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-toggle-right"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>UI atom prop parity &amp; form types</strong>
                        <p>
                          <RouterLink to="/components/button"
                            ><code>VdButton</code></RouterLink
                          >
                          gains <code>outline</code>, <code>block</code>,
                          <code>icon</code> props and
                          <code>aria-busy</code> reflection;
                          <RouterLink to="/components/badge"
                            ><code>VdBadge</code></RouterLink
                          >
                          gains <code>size</code> and <code>outlined</code>;
                          <RouterLink to="/components/spinner"
                            ><code>VdSpinner</code></RouterLink
                          >
                          gains <code>xs</code> and <code>xl</code> sizes plus
                          <code>variant</code>;
                          <RouterLink to="/components/progress"
                            ><code>VdProgress</code></RouterLink
                          >
                          gains <code>variant</code> and <code>size</code>; and
                          <RouterLink to="/components/forms"
                            >form option types</RouterLink
                          >
                          (<code>VdRadioOption</code>,
                          <code>VdRadioGroupProps</code>,
                          <code>VdSelectOption</code>,
                          <code>VdSelectProps</code>) are re-exported from the
                          package root.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-drop"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Ripple attributes &amp; Nunito font</strong>
                        <p>
                          <RouterLink to="/components/ripple"
                            ><code>useRipple</code></RouterLink
                          >
                          supports custom wave colors
                          (<code>data-vd-ripple-color</code>), centered ripples
                          (<code>data-vd-ripple-centered</code>), touch/mouse
                          deduplication, and reduced-motion preferences;
                          <code>@font-face</code> declarations are added for
                          <code>nunito</code> alongside the
                          <code>data-font="system"</code> OS stack in
                          <RouterLink to="/core/typography"
                            ><code>/core/typography</code></RouterLink
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
                        class="ph ph-palette"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          >Theme runtime, shadows &amp; neutral tokens</strong
                        >
                        <p>
                          Explicit primary selection via
                          <code>setPrimary()</code> now persists across scheme
                          flips, unrelated preference setters, and page reloads
                          (including <code>amber</code> in light mode and
                          <code>black</code> in dark mode).
                          <code>loadPreference()</code> validates fields against
                          permitted options, <code>useThemeBridge</code> routes
                          through the shared singleton,
                          <code>data-neutral="gray"</code> uses palette-aware
                          variables,
                          <RouterLink to="/components/theme-customizer"
                            ><code>VdThemeCustomizer</code></RouterLink
                          >
                          uses a 6-column neutral swatch grid, and system-theme
                          dark shadow bleed in
                          <RouterLink to="/core/shadows-glow"
                            ><code>/core/shadows-glow</code></RouterLink
                          >
                          is resolved.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-wheelchair"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Accessibility &amp; DOM cleanups</strong>
                        <p>
                          <RouterLink to="/components/spinner"
                            ><code>VdSpinner</code></RouterLink
                          >
                          renders a single CSS border spinner with
                          visually-hidden status text;
                          <RouterLink to="/components/chip"
                            ><code>VdChip</code></RouterLink
                          >
                          removes the duplicate close glyph and supports
                          keyboard activation; <code>VdSelect</code> is a clean
                          single-root element;
                          <RouterLink to="/components/avatar"
                            ><code>VdAvatar</code></RouterLink
                          >
                          clips status dots cleanly with fallback error
                          handling;
                          <RouterLink to="/components/skeleton"
                            ><code>VdSkeleton</code></RouterLink
                          >
                          supports the <code>rect</code> shape.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-keyboard"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Composable hardening</strong>
                        <p>
                          <RouterLink to="/components/form-validation"
                            ><code>useValidate</code></RouterLink
                          >
                          resolves wrapper elements (such as
                          <code>VdInput</code>) for seamless delegated
                          validation; <code>useFocusTrap</code> filters hidden
                          DOM elements; and
                          <code>useKeyboardNav</code> synchronizes active focus
                          and skips disabled items. See
                          <RouterLink to="/guides/accessibility"
                            ><code>/guides/accessibility</code></RouterLink
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
        <article class="version-card" id="vd3-1-7-6">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.7.6</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>October 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong
                    >Sanitized HTML installation and lazy-load cleanup</strong
                  >
                  — detached-document parsing with
                  <code>replaceChildren</code>, instance-scoped observer and
                  abort cleanup in <code>useLazyLoad</code>, and refreshed audit
                  gates.
                </p>
                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-shield-check"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Detached-DOM HTML sanitization</strong>
                        <p>
                          Lazy-loaded responses and caller-supplied placeholders
                          are sanitized in a detached document, then installed
                          with <code>replaceChildren</code> instead of assigning
                          untrusted markup to <code>innerHTML</code>. Non-DOM
                          environments fail closed to escaped text, and
                          sanitized content follows the element and attribute
                          allowlists in
                          <RouterLink to="/guides/security"
                            ><code>/guides/security</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-arrows-clockwise"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong
                          >Instance-scoped
                          <code>useLazyLoad</code> lifecycle</strong
                        >
                        <p>
                          Each
                          <RouterLink to="/guides/lazy-loading"
                            ><code>useLazyLoad</code></RouterLink
                          >
                          instance owns its observers, fetch abort controllers,
                          and timers; unmount now disconnects observations,
                          aborts in-flight requests, and clears pending
                          timeouts.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-lock-key"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Dependency &amp; audit hardening</strong>
                        <p>
                          Development dependencies and lockfile floors were
                          refreshed while retaining narrow exceptions for
                          reviewed, development-only advisories. See
                          <RouterLink to="/guides/production"
                            ><code>/guides/production</code></RouterLink
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
        <article class="version-card" id="vd3-1-7-5">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.7.5</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>October 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong
                    >Theme persistence control, customizer commit events, and
                    component polish</strong
                  >
                  — opt-out <code>themePersistence</code>, committed swatch
                  selection events, gradient <code>VdSeparator</code>, and fixes
                  across Dock, Footer, Navbar, Popover, and Fibonacci contrast.
                </p>
                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-sliders-horizontal"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          >Bootstrap
                          <code>themePersistence: false</code></strong
                        >
                        <p>
                          Opt out of automatic theme storage at bootstrap with
                          <code>themePersistence: false</code>; ordinary library
                          persistence remains the default. See
                          <RouterLink to="/guides/theme-customizer"
                            ><code>/guides/theme-customizer</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-swatches"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          >Customizer <code>select:primary</code> &amp; gradient
                          <code>VdSeparator</code></strong
                        >
                        <p>
                          <RouterLink to="/components/theme-customizer"
                            ><code>VdThemeCustomizer</code></RouterLink
                          >
                          fans report committed selections separately from hover
                          previews with <code>select:primary</code>, and
                          <RouterLink to="/components/separator"
                            ><code>VdSeparator</code></RouterLink
                          >
                          adds an optional theme-aware
                          <code>gradient</code> variant.
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
                        class="ph ph-layout"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Dock, Footer &amp; Navbar chrome</strong>
                        <p>
                          <RouterLink to="/components/dock"
                            ><code>VdDock</code></RouterLink
                          >
                          accent mode colors the brand and active icon;
                          <RouterLink to="/components/footer"
                            ><code>VdFooter</code></RouterLink
                          >
                          columns lay out inside the wrapper and dark footer
                          text stays readable; closed mobile
                          <RouterLink to="/components/navbar"
                            ><code>VdNavbar</code></RouterLink
                          >
                          menus stay hidden and within bounds while desktop
                          links remain exposed to assistive technology.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-palette"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong
                          >Palette RGB helpers &amp; Fibonacci hover
                          contrast</strong
                        >
                        <p>
                          Primary and status RGB helpers follow the active
                          <RouterLink to="/core/color-palette"
                            >palette</RouterLink
                          >, dark alpha accents follow the selected primary, and
                          <RouterLink to="/guides/fibonacci"
                            >Fibonacci</RouterLink
                          >
                          light-theme hover fills use readable foreground
                          colors.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-chat-centered-text"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong
                          >Popover anchor tracking, SSR guidance &amp; release
                          checks</strong
                        >
                        <p>
                          Open target-panel
                          <RouterLink to="/components/popover"
                            >popovers</RouterLink
                          >
                          follow scrolling and resizing anchors even when
                          flipping is disabled, and dismissal keeps ARIA closed
                          if a positioning frame is pending. Public API and
                          <RouterLink to="/guides/framework-integration"
                            >SSR guidance</RouterLink
                          >
                          clarify shared module state, and release tooling
                          documents the dev-only
                          <code>CVE-2026-93687</code> audit exception while
                          keeping all other moderate+ checks enabled.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="vd3-1-7-4">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.7.4</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>September 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Sanitizer, tooltip, search hydration, tokens</strong>
                  — allowed <code>&lt;a&gt;</code> attributes share the tag
                  whitelist; tooltips leave the trigger in flow; global search
                  mounts on the client; muted and syntax ink stay readable.
                </p>
                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-shield-check"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Anchor sanitizer</strong>
                        <p>
                          Allowed <code>&lt;a&gt;</code> attributes now use the
                          same whitelist as other tags. Event handler and
                          <code>style</code> attributes are stripped by default.
                          See
                          <RouterLink to="/guides/security"
                            ><code>/guides/security</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-chat-teardrop-text"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Tooltip</strong>
                        <p>
                          The trigger stays in normal flow; the
                          <RouterLink to="/components/tooltip"
                            >tooltip</RouterLink
                          >
                          is a separate surface with one placement contract,
                          hover/focus/Escape behavior, and
                          <code>aria-describedby</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-magnifying-glass"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Global search overlay</strong>
                        <p>
                          The
                          <RouterLink to="/components/global-search"
                            ><code>VdGlobalSearch</code></RouterLink
                          >
                          palette is client-mounted so SSG hydration cannot wipe
                          a query typed into the server-rendered input.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-circle-half"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Shared foreground tokens</strong>
                        <p>
                          Muted text, syntax colors, and swatch ink stay
                          distinguishable in default light/dark themes. See
                          <RouterLink to="/core/color-palette"
                            ><code>/core/color-palette</code></RouterLink
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
        <article class="version-card" id="vd3-1-7-3">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.7.3</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>September 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Snippet highlighter + on-fill utilities</strong> —
                  tree-shakeable <code>@vanduo-oss/vd3/highlight</code> for
                  <code>VdCodeSnippet</code>, and color-utility surfaces that
                  complete the <code>1.7.2</code> button/badge on-fill work.
                </p>
                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-code"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong><code>@vanduo-oss/vd3/highlight</code></strong>
                        <p>
                          Tree-shakeable minimal syntax highlighter for
                          <RouterLink to="/components/code-snippet"
                            ><code>VdCodeSnippet</code></RouterLink
                          >
                          (<code>html</code> / <code>css</code> /
                          <code>js</code>+TS / <code>shell</code> /
                          <code>vue</code> / <code>json</code> →
                          <code>vd-tk-*</code> spans). Opt-in via the existing
                          <code>highlight</code> prop; importing
                          <code>VdCodeSnippet</code> alone does not pull the
                          tokenizer.
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
                        class="ph ph-circle-half"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>On-fill contrast for color utilities</strong>
                        <p>
                          <code>.vd-bg-primary</code> /
                          <code>.vd-bg-accent</code> and status fills
                          (<code>.vd-bg-success|warning|error|info</code>) set
                          <code>--vd-text-on-primary</code> /
                          <code>--vd-text-on-status</code> so bright hues no
                          longer need hardcoded white ink. Adds
                          <code>.vd-text-on-primary</code> /
                          <code>.vd-text-on-status</code> utilities. Completes
                          the <code>1.7.2</code> button/badge on-fill work.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="vd3-1-7-2">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.7.2</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>September 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Contrast-aware on-fill ink</strong> — bright filled
                  surfaces (yellow, orange, and similarly light primaries) use
                  dark ink via <code>--vd-text-on-primary</code>,
                  <code>--vd-text-on-primary-hover</code>, and
                  <code>--vd-text-on-status</code> instead of hardcoded white.
                  CSS-only; no API change.
                </p>
                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-circle-half"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Contrast-aware on-fill ink</strong>
                        <p>
                          Filled primary and status chrome reads
                          <code>--vd-text-on-primary</code> /
                          <code>--vd-text-on-primary-hover</code> /
                          <code>--vd-text-on-status</code> so yellow, orange,
                          and other light fills get dark, high-contrast
                          foreground instead of white. Applies to buttons
                          (including hover-filled outline / ink and loading
                          spinners) and other filled surfaces — chips, badges,
                          alerts, and similar. Dark theme does not flip those
                          bright fills back to white text. See
                          <RouterLink to="/components/button"
                            ><code>/components/button</code></RouterLink
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
        <article class="version-card" id="vd3-1-7-1">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.7.1</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>September 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Snippet Copy header</strong> — on phones, Copy stays
                  on the same row as the language tabs. CSS-only; no API change.
                </p>
                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-code"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Snippet Copy header (mobile)</strong>
                        <p>
                          At viewports ≤640px, Copy and language tabs stay on
                          one
                          <code>.vd-code-snippet-header</code> row instead of
                          wrapping Copy onto its own row above the tablist. See
                          <RouterLink to="/components/code-snippet"
                            ><code>/components/code-snippet</code></RouterLink
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
        <article class="version-card" id="vd3-1-7-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.7.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Global search palette</strong> — site-wide Cmd+K modal
                  with grouped results, keyboard navigation, and an
                  engine-agnostic adapter hook for hybrid or REST backends. Plus
                  new Oola dock capabilities: accent tinting, the primary-only
                  swatches fan, and delayed dock tooltips.
                </p>
                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-magnifying-glass-plus"
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
                        class="ph ph-drop-half"
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
                          of the glass. See
                          <RouterLink to="/components/dock"
                            ><code>/components/dock</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-swatches"
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
                        class="ph ph-timer"
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
        <article class="version-card" id="vd3-1-6-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.6.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
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
                        class="ph ph-code"
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
                        class="ph ph-drop"
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
                        class="ph ph-copy"
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
        <article class="version-card" id="vd3-1-5-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.5.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
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
                        class="ph ph-rows"
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
        <article class="version-card" id="vd3-1-4-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.4.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
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
                        class="ph ph-sign-in"
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
                        class="ph ph-table"
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
        <article class="version-card" id="vd3-1-3-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.3.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Seemore Glass</strong> — Fibonacci strength-step
                  frosted material — plus reusable
                  <strong>decorative Surfaces</strong> and an opt-in
                  <strong>floating navbar</strong> capsule.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-drop-half-bottom"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Seemore Glass</strong>
                        <p>
                          Canonical modifiers
                          <code>.vd-glass-{1,2,3,5,8,13,21,34,55,89}</code>
                          bundle blur, tint, border, saturate, grain, and
                          elevation. Base <code>.vd-glass</code> is step 5;
                          legacy <code>sm|lg|xl</code> alias to 3/8/13. New
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
                        class="ph ph-checkerboard"
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
                    <li class="change-item">
                      <i
                        class="ph ph-app-window"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Floating navbar capsule</strong>
                        <p>
                          Opt-in <code>.vd-navbar-float</code> (and
                          <RouterLink to="/components/navbar"
                            ><code>VdNavbar</code></RouterLink
                          >
                          <code>float</code> prop) insets fixed/sticky top bars
                          with responsive Fibonacci spacing and a capsule radius
                          while preserving unprefixed
                          <code>backdrop-filter</code> in Chromium.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="vd3-1-2-3">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.2.3</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>August 2026
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
                        class="ph ph-hard-drives"
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
        <article class="version-card" id="vd3-1-2-2">
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

        <article class="version-card" id="vd3-1-2-1">
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

        <article class="version-card" id="vd3-1-2-0">
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

        <article class="version-card" id="vd3-1-1-0">
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
        <article class="version-card" id="vd3-1-0-0">
          <header class="version-header version-initial">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.0.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
            <span class="vd-badge vd-badge-outline" style="font-size: 0.75rem"
              >Initial</span
            >
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
            <i
              class="ph ph-chart-bar"
              style="color: var(--vd-color-primary)"
            ></i
            ><code>@vanduo-oss/vd3-charts</code>
          </h3>
          <p class="changelog-col-sub">
            Dedicated SVG charts package — bar, line, area, scatter, donut, pie.
          </p>
        </div>
        <article class="version-card" id="charts-1-2-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.2.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>November 2026
            </span>
            <span class="vd-badge vd-badge-outline" style="font-size: 0.75rem"
              >Latest</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong
                    >Vue wrapper prop parity, CSS color strings, legend
                    positioning, and automatic theme reactivity</strong
                  >
                  — <code>VdChart</code> and typed convenience wrappers expose
                  all 14 core styling, layout, and scale options;
                  <code>color</code> accepts CSS color strings and callbacks
                  across Cartesian and polar charts; and charts observe theme
                  token mutations automatically.
                </p>
                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-sliders-horizontal"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Full Vue wrapper prop parity</strong>
                        <p>
                          <RouterLink to="/canvas/charts"
                            ><code>VdChart</code></RouterLink
                          >
                          and typed wrappers (<code>VdBarChart</code>,
                          <code>VdLineChart</code>, <code>VdAreaChart</code>,
                          <code>VdScatterChart</code>,
                          <code>VdDonutChart</code>, <code>VdPieChart</code>)
                          now declare, forward, and reactively watch
                          <code>ariaLabel</code>, <code>margin</code>,
                          <code>xScale</code>, <code>barPadding</code>,
                          <code>stroke</code>, <code>strokeWidth</code>,
                          <code>points</code>, <code>pointRadius</code>,
                          <code>pointFill</code>, <code>pointOpacity</code>,
                          <code>fill</code>, <code>fillOpacity</code>,
                          <code>centerLabel</code>, and
                          <code>centerSubLabel</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-moon-stars"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Automatic theme reactivity</strong>
                        <p>
                          <code>ChartInstance</code> observes
                          <code>data-theme</code>, <code>data-primary</code>,
                          <code>data-palette</code>, <code>data-neutral</code>,
                          <code>class</code>, and <code>style</code> mutations
                          on <code>document.documentElement</code> and the
                          chart's target container via
                          <code>MutationObserver</code>, re-rendering
                          automatically when resolved <code>--vd-*</code> tokens
                          change. <code>refresh()</code> remains available for
                          imperative redraws.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-palette"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          >Polar <code>color</code> &amp;
                          <code>legend.position</code></strong
                        >
                        <p>
                          <code>DonutChart</code> and <code>PieChart</code> now
                          honor <code>color</code> (CSS color string, field
                          name, or <code>(row) =&gt; color</code> callback) and
                          <code>legend: { position: 'top' | 'right' }</code>;
                          Cartesian charts now honor
                          <code>legend: { position: 'right' }</code> in addition
                          to <code>'top'</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-shield-check"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Release &amp; pack consumer checks</strong>
                        <p>
                          Added <code>pnpm run release:check</code>, packed
                          tarball ESM/CJS consumer smoke verification, strict
                          OpenSpec validation, and a Node
                          <code>20.19.0</code> engine-floor CI job.
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
                        class="ph ph-paint-brush"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>CSS color strings in <code>color</code></strong>
                        <p>
                          Passing a CSS color string (such as
                          <code>'#40c057'</code>, <code>'rgb(...)'</code>, or
                          <code>'var(--vd-color-success)'</code>) to
                          <code>color</code> now styles marks across bar, line,
                          area, scatter, donut, and pie charts instead of
                          treating the string as a row property name.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-cursor-click"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Typed wrapper click emits</strong>
                        <p>
                          <code>VdBarChart</code>..<code>VdPieChart</code>
                          explicitly declare and forward
                          <code>@bar-click</code>, <code>@point-click</code>,
                          and <code>@slice-click</code>.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-text-aa"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          ><code>centerLabel: true</code> renders the
                          total</strong
                        >
                        <p>
                          Passing <code>true</code> previously fell through to
                          <code>String(true)</code> and drew the literal text
                          <code>true</code> in the donut center.
                          <code>true</code> now means "show the computed total";
                          a string still overrides it and <code>false</code>
                          still hides it.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-chart-bar"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong
                          ><code>xScale: 'band'</code> is implemented</strong
                        >
                        <p>
                          The option advertised <code>'band'</code> but fell
                          through to the point scale. <code>'band'</code> now
                          builds a real band scale, centers marks and axis ticks
                          within each band, and keeps categorical tick labels.
                          Bar charts continue to always use a band scale.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-polygon"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong
                          >Multi-series area honors <code>fill</code></strong
                        >
                        <p>
                          <code>fill: false</code> and a custom fill color were
                          honored on single-series area charts but ignored on
                          multi-series ones. Both paths now agree.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-sidebar"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Right-side legends reserve a gutter</strong>
                        <p>
                          Cartesian
                          <code>legend: { position: 'right' }</code> previously
                          drew inside the plot and overlapped marks near the
                          right edge. The plot now reserves a gutter for it,
                          matching donut and pie. Narrow charts fall back to the
                          top legend.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-eye"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Theme observer coalesces and re-arms</strong>
                        <p>
                          The observer coalesces mutations into one theme
                          resolution per animation frame, disconnects when the
                          chart's target detaches, and
                          <code>update()</code> re-arms it so a re-attached
                          chart keeps theme reactivity.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="charts-1-1-1">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.1.1</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>September 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Pie defaults and live updates</strong> — omitting
                  <code>innerRadiusRatio</code> keeps a filled pie; resize,
                  focus, theme refresh, and touch follow the live chart.
                </p>
                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-chart-pie"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Pie defaults</strong>
                        <p>
                          Omitting <code>innerRadiusRatio</code> (or removing
                          the Vue prop on
                          <RouterLink to="/canvas/charts"
                            ><code>VdPieChart</code></RouterLink
                          >) keeps a filled pie, while
                          <code>VdDonutChart</code> still opens a center hole.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-arrows-clockwise"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Updates</strong>
                        <p>
                          The resize observer follows
                          <code>responsive</code> false→true→false. Data redraws
                          keep logical keyboard focus when the mark still
                          exists. Vue <code>refresh()</code> redraws after
                          CSS-only theme changes. Touch can reveal details.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="charts-1-1-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.1.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>September 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  Standalone extract from the former
                  <code>@vanduo-oss/vd3-cbun</code> charts subpath, carrying
                  mark-click emits plus folded-in accessibility, sizing, and
                  <code>svgRole</code> fixes.
                  <code>VD_CHARTS_VERSION</code> remains <code>1.1.0</code>.
                </p>

                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-package"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          >Standalone
                          <code>@vanduo-oss/vd3-charts</code></strong
                        >
                        <p>
                          Vue wrappers and core factories extracted as their own
                          package. Install with
                          <code>pnpm add @vanduo-oss/vd3-charts</code> and
                          import <code>@vanduo-oss/vd3-charts/css</code>. See
                          <RouterLink to="/canvas/charts"
                            ><code>/canvas/charts</code></RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-cursor-click"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Chart mark clicks</strong>
                        <p>
                          <RouterLink to="/canvas/charts"
                            ><code>VdChart</code></RouterLink
                          >
                          forwards mark clicks as Vue events —
                          <code>@bar-click</code>, <code>@point-click</code>,
                          and <code>@slice-click</code>, each carrying the typed
                          <code>ClickEvent</code>.
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
                        class="ph ph-wheelchair"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Accessibility, sizing, and SVG roles</strong>
                        <p>
                          WAI-ARIA Graphics roles, keyboard mark navigation, and
                          an accessible data table; responsive height ignores
                          visible table growth; additive core
                          <code>role</code> / Vue <code>svgRole</code> override
                          the inner SVG without consuming the wrapper's standard
                          <code>role</code> attribute.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="charts-1-0-1">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.0.1</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  Patch: bar baselines clamp into the rendered y-domain.
                </p>

                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-chart-bar"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Bar baseline clamp</strong>
                        <p>
                          <RouterLink to="/canvas/charts"
                            >Bar charts</RouterLink
                          >
                          anchor to a baseline clamped into the rendered
                          y-domain, so an explicit <code>yMin &gt; 0</code> (or
                          <code>yMax &lt; 0</code>) no longer extrapolates bars
                          past the axis floor.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="charts-1-0-0">
          <header class="version-header version-initial">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.0.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
            <span class="vd-badge vd-badge-outline" style="font-size: 0.75rem"
              >Initial</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  First charts ship — historically on
                  <code>@vanduo-oss/vd3-cbun/charts</code> (+
                  <code>/charts/css</code>).
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
                          <RouterLink to="/canvas/charts">Charts</RouterLink>
                          — bar, line, area, scatter, donut, and pie factories
                          with Vue wrappers. Component <code>1.0.0</code>.
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
            <i
              class="ph ph-flow-arrow"
              style="color: var(--vd-color-primary)"
            ></i
            ><code>@vanduo-oss/vd3-flowchart</code>
          </h3>
          <p class="changelog-col-sub">
            Dedicated SVG flowchart editor — nodes, edges, layout, undo/redo.
          </p>
        </div>
        <article class="version-card" id="flowchart-1-6-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.6.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>November 2026
            </span>
            <span class="vd-badge vd-badge-outline" style="font-size: 0.75rem"
              >Latest</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong
                    >Theme-adaptive color presets, layer order, alignment, edge
                    stroke styles, node locking, SVG export, and exact arrowhead
                    docking</strong
                  >
                  — color nodes and edges with 12 light/dark-aware semantic
                  presets or custom CSS overrides, reorder layers, align and
                  distribute multi-selections, lock nodes, export standalone
                  SVGs, and dock arrowheads cleanly at shape borders. Document
                  format stays <code>1.3.0</code>.
                </p>
                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-palette"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          >12 theme-adaptive color presets and custom
                          overrides</strong
                        >
                        <p>
                          <code>FLOWCHART_COLOR_PRESETS</code> adds
                          <code>default</code>, <code>primary</code>,
                          <code>secondary</code>, <code>success</code>,
                          <code>warning</code>, <code>danger</code>,
                          <code>info</code>, <code>violet</code>,
                          <code>teal</code>, <code>orange</code>,
                          <code>pink</code>, and <code>neutral</code> for nodes
                          and edges, plus optional custom <code>fill</code>,
                          <code>stroke</code>, and <code>textColor</code>
                          overrides. Includes a built-in toolbar color popover,
                          Inspector swatches, and programmatic
                          <code>setNodeColor</code>, <code>setEdgeColor</code>,
                          <code>setSelectionColor</code>, and
                          <code>clearSelectionColor</code>. See
                          <RouterLink to="/canvas/flowchart"
                            >Flowchart</RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-stack"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong
                          >Layer order, multi-select align/distribute, stroke
                          styles, node locking, and SVG export</strong
                        >
                        <p>
                          Reorder overlapping nodes and edges via
                          <code>bringToFront</code>, <code>bringForward</code>,
                          <code>sendBackward</code>, and
                          <code>sendToBack</code> (<code>Cmd/Ctrl+]</code> /
                          <code>[</code>); align and distribute multi-selected
                          nodes with <code>alignNodes</code> and
                          <code>distributeNodes</code>; style edges with
                          <code>FLOWCHART_EDGE_STROKE_STYLES</code>
                          (<code>solid</code>, <code>dashed</code>,
                          <code>dotted</code>, <code>animated</code>); lock
                          nodes via <code>setNodeLocked</code> /
                          <code>toggleNodeLocked</code>
                          (<code>Cmd/Ctrl+L</code>); and export standalone SVGs
                          with <code>exportSvg()</code>.
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
                        class="ph ph-flow-arrow"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong
                          >Arrowheads stop cleanly at outer shape
                          borders</strong
                        >
                        <p>
                          Edge path endpoints retract by the active arrowhead
                          and outer stroke geometry (including diamond miter
                          vertices) so marker tips meet node borders without
                          poking underneath semi-transparent fills.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="flowchart-1-5-1">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.5.1</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>November 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Editing, contrast, and routing</strong> — shapes keep
                  their silhouette while you type, dark idle outlines stay
                  visible, the canvas no longer frames the whole viewport on
                  focus, and tree layout plus orthogonal connectors leave room
                  between nodes. Document format stays <code>1.3.0</code>.
                </p>
                <div class="change-group">
                  <h5>Fixed</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-circle"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Shape editors stay transparent</strong>
                        <p>
                          Circles and diamonds keep their SVG silhouette while
                          the label is edited. Text boxes, edge labels, and
                          title labels still use an opaque editor.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-moon"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong
                          >Dark outlines and no viewport focus ring</strong
                        >
                        <p>
                          Idle node strokes lean on the accent color in dark
                          theme. While a node is selected the canvas does not
                          draw a focus outline, so Enter and Tab no longer frame
                          the whole screen. An empty focused canvas still shows
                          the accent ring. See
                          <RouterLink to="/canvas/flowchart"
                            >Flowchart</RouterLink
                          >.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-arrows-out"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong
                          >Room between nodes, direct orthogonal routes</strong
                        >
                        <p>
                          Tree layout measures node size and keeps rank and
                          sibling gaps clear of the boxes. A decision with one
                          deep branch stays on that spine. Facing orthogonal
                          stubs shorten when shapes sit close, so the connector
                          does not loop around the pair. Diamond side branches
                          and reverse loops leave the quieter side ports.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="flowchart-1-5-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.5.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>October 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Opt-in camera and node bounds</strong> —
                  <code>minScale</code> / <code>maxScale</code> default to
                  <code>0.35</code> and <code>3</code>;
                  <code>minNodeSize</code> / <code>maxNodeSize</code> default to
                  <code>56</code> and <code>420</code>. Hosts can pass both
                  ends, for example <code>0.05</code>–<code>20</code> and
                  <code>6</code>–<code>4800</code>. Document format stays
                  <code>1.3.0</code>.
                </p>
                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-magnifying-glass-plus"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Opt-in bounds and fitNode</strong>
                        <p>
                          Pass both ends of a pair on
                          <RouterLink to="/canvas/flowchart"
                            ><code>VdFlowchart</code></RouterLink
                          >. Omitting one end on a later update keeps that end;
                          an invalid pair falls back to the whole default pair.
                          <code>fitNode(nodeId)</code> frames one visible node.
                          Unknown or hidden nodes do nothing. Viewport scale is
                          stored to four decimal places.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-resize"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Small-node rendering and adaptive grid</strong>
                        <p>
                          Nodes smaller than their default size scale text,
                          wrapping, radius, stroke, markers, curve arms,
                          orthogonal routes, labels, and inline editors. Larger
                          nodes do not grow that chrome. Junctions stay 28.
                          Wider camera bounds use a 240,000-unit grid; the
                          default bounds keep the 12,000-unit grid.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="change-group">
                  <h5>Unchanged</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-file-code"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Document format 1.3.0</strong>
                        <p>
                          Package <code>1.5.0</code> still writes document
                          format <code>1.3.0</code>. Older 1.x documents still
                          load. No nested containers, suggestion overlays,
                          floating panels, or export API.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="flowchart-1-4-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.4.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>October 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong
                    >Ports, mind-map keyboard, and canvas productivity</strong
                  >
                  — outward connection handles; default
                  <code>keyboardShortcuts: 'mindmap'</code>; multi-select,
                  collapsible branches, snap guides, minimap, edge labels, and
                  optional <code>autoLayout</code>. Saved JSON moves to document
                  format <code>1.3.0</code> (<code>collapsed</code>).
                </p>
                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-git-branch"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Connection ports and mind-map keys</strong>
                        <p>
                          Hover handles outside each side on
                          <RouterLink to="/canvas/flowchart"
                            ><code>VdFlowchart</code></RouterLink
                          >
                          to connect or insert. Tab / Enter grow a mind map;
                          <code>keyboardShortcuts: 'basic'</code> keeps the
                          1.3.0 keys.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-selection-all"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong>Multi-select and collapse</strong>
                        <p>
                          Shift+click / Shift+drag marquee, Cmd/Ctrl+A, group
                          edit, and collapsible branches with a
                          <code>+N</code> badge (Cmd/Ctrl+/).
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-map-trifold"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Guides, minimap, labels, autoLayout</strong>
                        <p>
                          Alignment snap while dragging (Alt to bypass), corner
                          minimap, keyboard edge-label editing, and
                          <code>autoLayout</code> after insertions.
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
                        class="ph ph-file-code"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Document format 1.3.0</strong>
                        <p>
                          Collapsed nodes may write
                          <code>collapsed: true</code>. Every older 1.x document
                          still loads; packages before 1.4.0 reject 1.3.0 files
                          as a future version.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="flowchart-1-3-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.3.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>September 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  <strong>Keyboard, outline, and live-editor fixes</strong> —
                  arrows and Graph outline for navigation; saved JSON stays on
                  document format <code>1.2.0</code>; option updates, load
                  errors, self-connect, and node drag stay on the live editor.
                </p>
                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-keyboard"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Keyboard canvas navigation</strong>
                        <p>
                          Arrows, Home/End, and Enter to edit on
                          <RouterLink to="/canvas/flowchart"
                            ><code>VdFlowchart</code></RouterLink
                          >, plus a native <strong>Graph outline</strong> with
                          labelled Edit/Connect controls.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-file-code"
                        style="color: var(--vd-color-info)"
                      ></i>
                      <div>
                        <strong><code>FLOWCHART_DOCUMENT_VERSION</code></strong>
                        <p>
                          Owns saved <code>version</code>. Package release stays
                          on <code>VD_FLOWCHART_VERSION</code>.
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
                        class="ph ph-arrows-clockwise"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Option updates</strong>
                        <p>
                          Read-only, grid, and history keep the live editor,
                          camera, selection, and applicable history. Parent
                          echoes of emitted documents do not loop.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-warning-circle"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Malformed JSON</strong>
                        <p>
                          Malformed JSON and unsupported future documents throw
                          before the active document, selection, or history
                          change.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-prohibit"
                        style="color: var(--vd-color-warning)"
                      ></i>
                      <div>
                        <strong>Self-connection</strong>
                        <p>Graph outline refuses self-connection.</p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-arrows-out-cardinal"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Node drag</strong>
                        <p>
                          Node drag translates the moved SVG node and rebuilds
                          only incident edges; pointer-up still records history.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="flowchart-1-2-0">
          <header class="version-header">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.2.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>September 2026
            </span>
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  Standalone extract from the former
                  <code>@vanduo-oss/vd3-cbun</code> flowchart subpath, folding
                  in dark-aware chrome, icon toolbar, Arrange select, and
                  bounded load — all under the same
                  <code>VD_FLOWCHART_VERSION</code> <code>1.2.0</code>
                  serialization.
                </p>

                <div class="change-group">
                  <h5>Added</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-package"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong
                          >Standalone
                          <code>@vanduo-oss/vd3-flowchart</code></strong
                        >
                        <p>
                          Vue wrapper plus <code>VdFlowchartCore</code>,
                          <code>computeLayout</code>, and
                          <code>{ version, viewport, nodes, edges }</code>
                          serialization. Install with
                          <code>pnpm add @vanduo-oss/vd3-flowchart</code> and
                          import <code>@vanduo-oss/vd3-flowchart/css</code>. See
                          <RouterLink to="/canvas/flowchart"
                            ><code>/canvas/flowchart</code></RouterLink
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
                        class="ph ph-moon-stars"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Dark-aware flowchart chrome</strong>
                        <p>
                          Panels, nodes, handles, and inspector chrome follow
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
                        <strong>Icon toolbar &amp; Arrange select</strong>
                        <p>
                          Toolbar actions use Phosphor icons; the layout
                          <code>&lt;select&gt;</code> always shows the active
                          Tree / Radial / Grid mode instead of a placeholder
                          “Arrange” option.
                        </p>
                      </div>
                    </li>
                    <li class="change-item">
                      <i
                        class="ph ph-shield-check"
                        style="color: var(--vd-color-success)"
                      ></i>
                      <div>
                        <strong>Bounded document loading</strong>
                        <p>
                          <RouterLink to="/canvas/flowchart"
                            ><code>VdFlowchart</code></RouterLink
                          >
                          caps an untrusted or corrupt document on load
                          (truncating, never throwing). The saved-document
                          format is unchanged.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="version-card" id="flowchart-1-2-0-initial">
          <header class="version-header version-initial">
            <span
              class="vd-badge vd-badge-primary"
              style="font-size: 1rem; padding: 0.5rem 1rem"
              >v1.2.0</span
            >
            <span style="color: var(--vd-text-secondary); font-size: 0.95rem">
              <i class="ph ph-calendar mr-1"></i>July 2026
            </span>
            <span class="vd-badge vd-badge-outline" style="font-size: 0.75rem"
              >Initial</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <p class="vd-text-muted" style="margin: 0 0 1.25rem">
                  First flowchart ship — historically on
                  <code>@vanduo-oss/vd3-cbun/flowchart</code> (+
                  <code>/flowchart/css</code>), exposing
                  <code>VdFlowchartCore</code> alongside the component.
                  Serialization version <code>1.2.0</code> from day one.
                </p>

                <div class="change-group">
                  <h5>New</h5>
                  <ul class="change-list">
                    <li class="change-item">
                      <i
                        class="ph ph-flow-arrow"
                        style="color: var(--vd-color-primary)"
                      ></i>
                      <div>
                        <strong>Flowchart</strong>
                        <p>
                          <RouterLink to="/canvas/flowchart"
                            >Flowchart</RouterLink
                          >
                          — nodes, edges, layout, and undo/redo with
                          <code>VdFlowchartCore</code>. Component
                          <code>1.2.0</code>.
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
  </section>
</template>
