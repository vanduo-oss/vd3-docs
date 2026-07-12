# Design — docs-content

## Context

`docs-clone-and-strip` retargeted the site's dependencies and runtime onto the
vd3 line and removed the dual-engine machinery, but it was a mechanical
retarget-and-strip: it left the *content* (guide prose, home marketing, changelog
copy, displayed snippet strings) describing the old dual-engine `@vanduo-oss`
line, and it added no pages. This change is the content pass. Two things drive
every decision here:

1. **Dogfooding must be honest.** The six upgraded pages and the new DocSearch
   page render the *real* `@vanduo-oss/vd3` components; the API tables are
   transcribed from the components' own `defineProps` / `defineEmits` /
   `defineSlots`, never invented (repo rule: "no invented APIs; verify against
   package source").
2. **No vanilla anywhere.** After this change the built site contains zero
   `Vanduo.init` / `loadVanduoRuntime` / "IIFE" / "both engines" / "pick an
   engine" references in prose, snippet strings, or the changelog.

## Verified vd3 export surface (read-only against `../vd3`)

Confirmed in `../vd3/src/index.ts` and the component/composable sources — all
targets exist as named exports of `@vanduo-oss/vd3`:

| Doc target | Real export | Props (from source) | Emits | Slots |
| --- | --- | --- | --- | --- |
| Breadcrumb | `VdBreadcrumb` | `items?: BreadcrumbItem[]`, `separator?: slash\|chevron\|arrow\|dot\|pipe`, `size?: sm\|lg`, `ariaLabel?` | — | `default` (custom `li`s); also `BreadcrumbItem` type export |
| Fab | `VdFab` | `variant?: primary\|secondary\|success\|danger\|error`, `size?: sm\|md\|lg`, `extended?`, `glass?`, `position?: bottom-right\|bottom-left\|top-right\|top-left\|center`, `label?`, `ariaLabel?` | `click(MouseEvent)` | `default` (icon), `actions` (speed-dial) |
| Footer | `VdFooter` | `columns?: 2\|3\|4`, `dark?`, `size?: sm\|lg` | — | `default`, `copyright` |
| Navbar | `VdNavbar` | `variant?: solid\|transparent\|glass`, `dark?`, `position?: static\|fixed\|fixed-bottom\|sticky`, `scrollThreshold?`, `toggleLabel?`, `closeOnNavigate?` | `open`, `close`, `toggle(open)` | default; exposes `{ isOpen, open, close, toggle }` |
| ThemeSwitcher | `VdThemeSwitcher` | `menu?` (default `true`), `align?: start\|end` | `change(ThemeMode)` | — |
| ThemeCustomizer | `VdThemeCustomizer` | `showPalette?` (default `true`) | — | — (exposes `{ open, close, toggle }`; opens on the `vd:open-customizer` window event) |
| DocSearch | `VdDocSearch` | `data: DocSearchDoc[]`, `minQueryLength?`, `maxResults?`, `debounceMs?`, `highlightTag?`, `keyboardShortcut?`, `placeholder?`, `emptyTitle?`, `emptyText?`, `ariaLabel?` | `select(DocSearchResult)`, `search(query,results)`, `open`, `close` | — |

Composables for the two demo upgrades:

- `useDocSearch(docs, options)` → controller `{ query, results, isOpen,
  activeIndex, search(), open(), close(), navigate(), select(), handleKeydown(),
  highlight() }`; options include `minQueryLength`/`maxResults`/`debounceMs`/
  `highlightTag`/`keyboardShortcut`/`categoryIcons`/`onSelect`/`onSearch`/
  `onOpen`/`onClose`. Types `DocSearchDoc`, `DocSearchResult`.
- `useLazyLoad(root?)` → `{ observe(el, cb, {threshold,rootMargin}),
  unobserve(el), loadSection(url, container, {placeholder,threshold,rootMargin,
  onLoaded,onError}) }`. `loadSection` sanitizes injected HTML and guards URLs
  (same-origin or https only).
- `useGrid(containerRef, { mode? })` → `{ mode, toggle(), setMode() }` for a
  per-container `standard`⇄`fibonacci` layout mode; `setGridSystem(mode)` flips
  the document-level default. Both back the Fibonacci CSS shipped in
  `@vanduo-oss/vd3/css` (with a `:has()`-support inline fallback).

## Decision 1 — The class-only → dogfood page-upgrade pattern

Today a class-only component page (e.g. `Breadcrumb.vue`) has three parts: a live
demo built from **raw `.vd-*` markup**, a `DocCodeSnippet` showing that HTML, and
a **CSS-class API table**. The upgrade keeps the page's structure and section IDs
(so scrollspy/anchor links and nav are stable) and applies a fixed recipe:

1. **Import the real component** from `@vanduo-oss/vd3` in `<script setup>`.
2. **Render it live** for the primary demo, exercising its real props/slots
   (e.g. `<VdBreadcrumb :items="items" separator="chevron" />`,
   `<VdFab position="bottom-right" @click="…"><i class="ph ph-plus"/></VdFab>`).
   Static raw-markup demos may stay *alongside* the component demo only where they
   illustrate a class the component wraps.
3. **Add a "Component API (Vue 3)" table** — props, emits, and slots transcribed
   verbatim from the component source (the table above is the source of truth).
   Use the two-column `[name, description]` shape the existing dogfood pages use
   (see `components/Badge.vue`), rendered with the page's existing
   `vd-table vd-table-striped` markup.
4. **Keep the CSS-class reference** table where the component is a thin wrapper
   over documented classes (Breadcrumb, Footer, Navbar, Fab all map to
   `breadcrumbs.css` / `footer.css` / `navbar.css` / `fab.css`); drop it only
   where it would be misleading.
5. **Retarget the Usage snippet string** to `import … from "@vanduo-oss/vd3"`.

**SSR / prerender safety.** `VdNavbar` (reads `--vd-breakpoint-lg` +
`resize`), `VdFab` (document listeners), `VdThemeSwitcher` / `VdThemeCustomizer`
(theme singleton, `vd:open-customizer` window listener) all do their DOM work in
`onMounted`/handlers, never at module or `setup` top level — so they prerender
cleanly under vite-ssg. The doc page must not add any `window`/`document` access
outside a lifecycle hook. `VdThemeCustomizer` and `VdThemeSwitcher` share the
`useThemePreference()` singleton, so a page that renders both keeps them in sync
for free; the page passes `:show-palette` / `menu` as documented rather than
reaching into theme state.

## Decision 2 — The DocSearch page

`DocSearch.vue` mirrors the dogfood recipe but for a brand-new page: a small
inline `DocSearchDoc[]` fixture (a handful of the site's own sections), a live
`<VdDocSearch :data="docs" />`, a **props/emits** table for the component, and a
**controller** table for `useDocSearch` (so readers see both the drop-in
component and the composable it is built on). Because `VdDocSearch` renders a
combobox/listbox and `useDocSearch` owns the `Cmd/Ctrl+K` shortcut, the page
demo is the single place that shortcut is live — acceptable, and covered by the
Phase-7 a11y pass, not here.

**Wiring reported to the wiring step** (this change does not touch `nav.ts` /
`router.ts`):

- `nav.ts`: add a section under the **Components** category —
  `{ id: "doc-search", title: "DocSearch", route: "/components/doc-search",
  icon: "magnifying-glass", keywords: ["search", "docsearch", "command palette",
  "cmd k", "combobox"] }`.
- `router.ts`: `import DocSearchPage from "@/pages/components/DocSearch.vue"` and
  register it in the `componentPages` map under key `"doc-search"`.

## Decision 3 — Composable demos replace narrated/reimplemented behavior

- **`LazyLoading.vue`** currently only *narrates* Vite code-splitting with static
  snippets. The upgrade adds a live block that calls `useLazyLoad()` and uses
  `observe(el, cb)` to reveal a deferred card when it scrolls into view (and may
  show `loadSection` for the fetch-and-inject path), keeping the existing
  "tactics" table. The guide reframes from "the Vanilla engine lazy-loads modules
  from a global registry" to the vd3 composable + native tactics.
- **`GridSystem.vue`** today carries a page-local `mode` ref, a `toggleMode()`
  handler, and a block of scoped CSS that *reimplements* Fibonacci proportions
  because the old `data-grid-toggle` was a no-op. The upgrade deletes that
  local reimplementation and drives the toggle container with
  `useGrid(containerRef)` (`mode`, `toggle()`), letting the real
  `@vanduo-oss/vd3/css` Fibonacci rules apply — the demo now proves the shipped
  composable + CSS rather than page-private CSS. `setGridSystem` is shown for the
  document-level default.

## Decision 4 — Guide rewrites are single-package, standalone

The four rewritten guides share one framing: **one Vue 3 package
(`@vanduo-oss/vd3`) plus an optional canvas bundle (`@vanduo-oss/vd3-cbun`)**, no
runtime to bootstrap.

- **vd3 Architecture** (was RuntimeArchitecture): the layered story is
  `@vanduo-oss/vd3` design tokens → generated `@vanduo-oss/vd3/css` → typed
  `Vd*` components + composables. No `Vanduo.init`/`destroy`, no
  `loadVanduoRuntime`, no IIFE, no side-by-side "vanilla vs vue" column.
- **Migrating from vanduo v2 to vd3** (was MigrationComparison): a package map
  (`@vanduo-oss/vue` → `@vanduo-oss/vd3`; `@vanduo-oss/framework/css` →
  `@vanduo-oss/vd3/css`; `@vanduo-oss/{charts,flowchart,hex-grid,music-player}` →
  `@vanduo-oss/vd3-cbun/*`), composable-API diffs, the CSS import change, and the
  headline "one line per app" note (swap the plugin import source; the identifier
  and options are unchanged).
- **Installation & Integration** (was FrameworkIntegration): `pnpm add
  @vanduo-oss/vd3` (+ `@vanduo-oss/vd3-cbun` when needed), `import
  "@vanduo-oss/vd3/css"`, `app.use(VanduoVue, { themeDefaults })`, and the
  vite-ssg / SSR guidance (components are SSR-safe; no client-only bootstrap).
- **The vd3 line** (was VanduoEcosystem): three repos — `vd3-docs` (this site),
  `vd3` (the Vue 3 component library + tokens + CSS), `vd3-cbun` (the canvas
  bundle: charts / flowchart / hex-grid / music-player) — with a short note that
  the old `core`/`framework`/`vue` + four-package line is in maintenance and the
  vd3 line is where new work lands.

## Decision 5 — Changelog curated onto the vd3 packages

`docs-clone-and-strip` already removed the vanilla history partial and the
`data-engine` filter but left the surviving cards + `changelog-vue-content.html`
naming the old packages (a documented Non-goal it deferred here). This change
rewrites those to the vd3 line: the inline cards and the partial name **only**
`@vanduo-oss/vd3` (`0.1.0`) and `@vanduo-oss/vd3-cbun` (`0.2.0`), summarizing the
vd3 line's actual first history (the new components/composables in vd3; the
four-component consolidation in vd3-cbun), with every `data-engine` attribute
removed and the header copy naming the two vd3 packages. Per the
changelog-content policy the page still tracks **package** releases only, never
docs-site content.

## Risks & mitigations

- **API drift between a doc table and the real component.** The API tables are
  transcribed from source and dogfooded by the live render; a wrong prop fails
  typecheck or renders wrong at build. Fix the table (or report a package bug) —
  never edit `../vd3`.
- **A missed stale string.** A repo-wide grep for `@vanduo-oss/vue`,
  `@vanduo-oss/{charts,flowchart,hex-grid,music-player}`, `Vanduo.init`,
  `loadVanduoRuntime`, `data-engine`, and "both engines" must return zero hits in
  `src/` prose/snippets after the pass.
- **Dead links to dropped guides.** After deleting `esm-vs-iife` /
  `lifecycle-manager`, a grep for `/guides/esm-vs-iife` and
  `/guides/lifecycle-manager` must return zero hits in `src/` (home card + the
  ecosystem "next" cards are re-pointed).
- **Visual baselines shift.** Live components replace static markup, so the
  Playwright parity baselines are re-captured — but sign-off is Phase 7; here the
  re-capture is only listed as a follow-up task.
