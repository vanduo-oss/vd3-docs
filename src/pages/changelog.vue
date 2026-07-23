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
import vueContent from "./changelog-vue-content.html?raw";
</script>

<template>
  <section id="changelog">
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

    <!-- @vanduo-oss/vd3 1.0.0 — the standalone Vue 3 design system -->
    <div style="padding: 3rem 0 0">
      <div class="vd-container-responsive" style="max-width: 1200px">
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
            <span class="vd-badge vd-badge-outline" style="font-size: 0.75rem"
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
                  >@vanduo-oss/vd3
                </h4>
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
                          composables and the <code>VanduoVue</code> plugin. See
                          the
                          <RouterLink to="/guides/migration"
                            >migration guide</RouterLink
                          >.
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
    </div>

    <!-- @vanduo-oss/vd3-cbun 1.2.0 — adds the VdDraw drawing tool -->
    <div style="padding: 3rem 0 0">
      <div class="vd-container-responsive" style="max-width: 1200px">
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
            <span class="vd-badge vd-badge-outline" style="font-size: 0.75rem"
              >Latest</span
            >
          </header>
          <div class="version-body">
            <div class="vd-row">
              <div class="vd-col-12">
                <h4>
                  <i
                    class="ph ph-package mr-2"
                    style="color: var(--vd-color-primary)"
                  ></i
                  >@vanduo-oss/vd3-cbun
                </h4>
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
      </div>
    </div>

    <!-- @vanduo-oss/vd3-cbun 1.1.0 — adds the code-editor component -->
    <div style="padding: 3rem 0 0">
      <div class="vd-container-responsive" style="max-width: 1200px">
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
                <h4>
                  <i
                    class="ph ph-package mr-2"
                    style="color: var(--vd-color-primary)"
                  ></i
                  >@vanduo-oss/vd3-cbun
                </h4>
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
      </div>
    </div>

    <!-- @vanduo-oss/vd3-cbun 1.0.0 — the initial components bundle -->
    <div style="padding: 3rem 0 0">
      <div class="vd-container-responsive" style="max-width: 1200px">
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
                <h4>
                  <i
                    class="ph ph-package mr-2"
                    style="color: var(--vd-color-primary)"
                  ></i
                  >@vanduo-oss/vd3-cbun
                </h4>
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
      </div>
    </div>

    <!-- Earlier vd3-line history -->
    <div v-html="vueContent"></div>
  </section>
</template>
