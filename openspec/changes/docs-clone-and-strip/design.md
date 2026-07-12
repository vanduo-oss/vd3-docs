# Design — docs-clone-and-strip

## Context

`vd3-docs` is a committed clone of vd2 that still imports the old `@vanduo-oss`
line and runs the dual-engine `EngineSwitch` toggle. Two independent problems
must be solved together so the result builds:

1. **Retarget** every dependency and import onto the two local vd3 packages
   (`@vanduo-oss/vd3`, `@vanduo-oss/vd3-cbun`), which are unpublished — they are
   consumed via pnpm `link:` to sibling working trees.
2. **Strip** the dual-engine machinery so the site documents Vue 3 only, with no
   vanilla runtime, toggle, or `data-engine` filtering.

This document records the non-obvious decisions: how `link:` dev-linking coexists
with Vite/vite-ssg, why the plugin keeps its name but loses the runtime loader,
and how the `EngineSwitch` flatten stays mechanical and lossless.

## Package export surface (verified against the link targets)

Read-only inspection of the sibling trees (never modified) confirms the retarget
map. `@vanduo-oss/vd3` (`../vd3`, v0.1.0):

- `.` → components + composables + **`export { VanduoVue } from "./plugin"`**.
  `VanduoVue` is a `Plugin<VanduoVueOptions>` whose only option is
  `themeDefaults?: Partial<ThemeDefaults>`, applied synchronously on `install`.
- `./css` → the full stylesheet (replaces `@vanduo-oss/framework/css`).
- **No `loadVanduoRuntime` export exists** — the plugin JSDoc states it outright:
  "vd3 is fully standalone: there is no framework IIFE runtime to load (the old
  `loadVanduoRuntime` export is gone)."
- Provides the chrome/page runtime imports the docs use today from
  `@vanduo-oss/vue`: `VdToastContainer`, `VdOffcanvas`, `useFocusTrap`, plus the
  Vd* components the customizer/preview render.

`@vanduo-oss/vd3-cbun` (`../vd3-cbun`, v0.2.0) — the canvas bundle, one package
replacing four:

| old import (vd2)                       | new import (vd3-cbun)                     |
| -------------------------------------- | ----------------------------------------- |
| `@vanduo-oss/charts/vue` (`VdChart`)   | `@vanduo-oss/vd3-cbun/charts`             |
| `@vanduo-oss/charts/css`               | `@vanduo-oss/vd3-cbun/charts/css`         |
| `@vanduo-oss/flowchart/vue`            | `@vanduo-oss/vd3-cbun/flowchart`         |
| `@vanduo-oss/flowchart/css`            | `@vanduo-oss/vd3-cbun/flowchart/css`     |
| `@vanduo-oss/hex-grid/vue`             | `@vanduo-oss/vd3-cbun/hex-grid`          |
| `@vanduo-oss/hex-grid/hex-math`        | `@vanduo-oss/vd3-cbun/hex-grid/hex-math` |
| `@vanduo-oss/music-player/vue`         | `@vanduo-oss/vd3-cbun/music-player`      |
| `@vanduo-oss/music-player/css`         | `@vanduo-oss/vd3-cbun/music-player/css`  |

In cbun the Vue component is the **primary** export of each subpath (`VdChart`,
`VdFlowchart`, `VdHexGrid`, `VdMusicPlayer`) — there is no `/vue` suffix. cbun
exposes **no `hex-grid/css`** subpath (hex-grid ships no stylesheet), matching
today's `main.ts`, which imports only charts/flowchart/music-player CSS.

## Decision 1 — Plugin keeps its name; the runtime loader is deleted

`main.ts` today does two things with `@vanduo-oss/vue`:

```ts
import { VanduoVue, loadVanduoRuntime } from "@vanduo-oss/vue";
app.use(VanduoVue, { themeDefaults: { PRIMARY_DARK: "blue" } });
if (!import.meta.env.SSR) { await loadVanduoRuntime(); }
```

`@vanduo-oss/vd3` re-exports the **same identifier** `VanduoVue` with the **same**
`themeDefaults` option, so the flatten is:

```ts
import { VanduoVue } from "@vanduo-oss/vd3";
app.use(VanduoVue, { themeDefaults: { PRIMARY_DARK: "blue" } });
// loadVanduoRuntime import + the awaited client-only bootstrap block are removed.
```

Only the **import specifier** changes; no local rename. The entire
`if (!import.meta.env.SSR) { await loadVanduoRuntime(); }` block is deleted — vd3
composables no longer delegate to `window.Vanduo*` globals, so there is nothing to
bootstrap. The SSR `initialState.pinia` guard and the `createApp` factory shape
are untouched.

**No-vanilla-runtime gate.** Because the IIFE and its loader are gone, the built
bundle must contain **zero** `window.Vanduo*` references. This is asserted as a
grep over `dist/` after `vite-ssg build` (the repo's existing bundle gate). Any
surviving reference means a composable or page still assumes the old global API
and must be ported (not in scope here — the vd3 components are self-contained).

## Decision 2 — Dev-linking via `link:` + Vite dedupe/exclude

The vd3 packages are unpublished, so `package.json` uses pnpm's `link:` protocol:

```jsonc
"@vanduo-oss/vd3":      "link:../vd3",
"@vanduo-oss/vd3-cbun": "link:../vd3-cbun"
```

`link:` symlinks the sibling working tree straight into `node_modules` (no copy,
no registry, no `minimum-release-age` delay — and it sidesteps the `.npmrc`
`block-exotic-subdeps` / `minimum-release-age` rules that apply to registry
installs). Two Vite hazards follow from a symlinked, out-of-tree dependency that
ships **its own** `node_modules`:

1. **Duplicate Vue/Pinia.** A linked package resolves `vue`/`pinia` from *its*
   tree, so the app and the library can end up with two copies — Pinia's
   "different pinia instance" error, broken `provide`/`inject`, doubled runtime.
   Fix: `resolve.dedupe: ["vue", "pinia"]` forces a single copy from the docs
   app's `node_modules`.

2. **Pre-bundling a symlinked ESM package.** Vite's dep optimizer may pre-bundle
   the linked package inconsistently between dev and SSG, and won't pick up edits
   to the sibling tree without a cache bust. Fix:
   `optimizeDeps.exclude: ["@vanduo-oss/vd3", "@vanduo-oss/vd3-cbun"]` so both are
   served as source and always reflect the current sibling build.

The existing `optimizeDeps.include: ["@vanduo-oss/framework/css"]` and
`ssr.noExternal: ["@vanduo-oss/framework"]` both name a now-removed package. They
retarget onto the vd3 line: SSG must inline the linked Vue SFCs, so
`ssr.noExternal` lists `["@vanduo-oss/vd3", "@vanduo-oss/vd3-cbun"]` (their `.vue`
components must be transformed, not required as CJS during prerender). The CSS
`optimizeDeps.include` entry is dropped (superseded by `exclude` on the whole
package; the CSS is imported directly in `main.ts`).

At launch the `link:` specifiers flip to published `^1.0.0` ranges and the
`dedupe`/`exclude` entries can stay (harmless for registry installs) — so the
same config serves both the dogfooding and the published phase.

## Decision 3 — `EngineSwitch` flatten is mechanical and lossless

Every usage has the shape:

```html
<EngineSwitch>
  <template #vue3> …Vue 3 usage… </template>
  <template #vanilla> …Vanilla usage… </template>
</EngineSwitch>
```

The component renders exactly one slot (`v-if engine === 'vue3'`), defaulting to
`#vue3`. Flattening = **replace the whole element with the inner content of its
`#vue3` template** and delete the `#vanilla` branch. No page loses any Vue 3
content; only the (never-default-rendered) Vanilla branch and the wrapper go.

The shared-expand-state coordination (`engineSnippetGroup.ts` +
`EngineSwitch`'s ordinal `register()` + `DocCodeSnippet`'s `inject`) existed only
to carry a `DocCodeSnippet`'s expanded state across an engine toggle. With no
toggle, `DocCodeSnippet` falls back to its already-present standalone
`localExpanded` ref — the `inject(ENGINE_SNIPPET_GROUP, null)` path and the whole
group module are removed. `DocCodeSnippet`'s public props (`html/css/js/shell/
defaultOpen`) and rendered markup are unchanged, so its visual baseline is
stable; only the internal expand-state plumbing shrinks.

`EngineBadge` has a single consumer (`guides/RuntimeArchitecture.vue`); its badge
markup is removed with that guide's `EngineSwitch` flatten. `RuntimeArchitecture`
keeps its (vanilla-centric) *prose* — a documented Non-goal — but ends up
Vue3-only-branch and building.

## Decision 4 — Changelog reduces to one engine

`changelog.vue` currently v-html-imports two partials and filters both plus the
inline cards by a `data-engine` attribute driven by the engine store:

- **Drop** `import content from "./changelog-content.html?raw"` and its
  `<div data-engine="vanilla" v-html="content">` block (the ~190 KB Vanilla
  framework history). Delete `changelog-content.html`.
- **Keep** `changelog-vue-content.html` and its `v-html` block (the Vue history).
- **Remove** the whole `applyEngineFilter` routine, its `onMounted`/`watch`
  wiring, the `useEngineStore` import, and the header engine-toggle block.

The inline release cards (framework 1.7.1, vue 0.3.1, "Cool Breeze I") stay in
place; their now-inert `data-engine` attributes are harmless with the filter
gone. Curating the changelog onto the vd3 packages is a Non-goal (deferred to
`docs-content`); this change only removes the vanilla plumbing so the page builds
single-engine. The changelog-content policy (packages only, never docs-site
content) is unchanged.

## Decision 5 — Customizer codegen becomes Vue-only

`customizer/codegen.ts` exports `toVanilla`, `toVueSfc`, and a `generate()`
convenience that returns both. The Live Customizer's `CustomizerCode.vue`
branches on the engine store between a Vanilla HTML+CSS snippet and a Vue SFC.

- Delete `toVanilla` and the `VanillaCode` interface; keep `toVueSfc`.
- Simplify `generate()` to return only the Vue SFC (or remove it if unused after
  the strip — it exists for tests/convenience).
- `CustomizerCode.vue` drops the engine branch and always renders the
  `toVueSfc` output in a single `DocCodeSnippet`.
- `LiveCustomizer.vue` drops its in-panel `.lcc-engine` toggle and the
  `useEngineStore` import; the drawer, focus trap, placement persistence, stage,
  controls, and reset are untouched.

The generated SFC template already emits `import { … } from "@vanduo-oss/vue"`;
that specifier is retargeted to `@vanduo-oss/vd3` as part of the ecosystem/import
retarget so copied snippets install against the vd3 line.

## Decision 6 — Retire the scaffold's "no site code" requirement

`repo-scaffold` (from `init-docs-scaffold`) contains the requirement "no
premature package or site code", asserting the repo holds only `.gitignore`,
`LICENSE`, `README.md`. That was a point-in-time invariant for the scaffold; this
change is exactly the `docs-clone-and-strip` the scaffold pointed to, so the
invariant is intentionally retired via a `## REMOVED Requirements` delta. Leaving
it in the promoted spec would assert something now provably false (the site
exists). No other `repo-scaffold` requirement changes (ignore rules, license,
README status all still hold — the README's "site arrives via docs-clone-and-strip"
line becomes accurate rather than aspirational).

## Risks & mitigations

- **API drift between docs and vd3 packages.** Dogfooding via `link:` surfaces it
  at build time; a failing `vite-ssg build` or a runtime error on a route is the
  signal. Fix belongs in whichever side is wrong — but never by editing the
  read-only vd3 tree from here; drift is reported upward.
- **Visual baselines shift.** Flattening markup and swapping the stylesheet
  source (`framework/css` → `vd3/css`) can move pixels. The Playwright
  visual-parity baselines are re-captured after the build is green; any diff is
  reviewed as intended-vs-regression, not blindly accepted.
- **A stray `window.Vanduo*` reference.** Caught by the post-build grep gate. If
  one survives, a page/composable still assumes the old global runtime and needs
  porting — flagged, not worked around.
- **Missed `EngineSwitch` / `useEngineStore` reference.** A repo-wide grep for
  `EngineSwitch`, `useEngineStore`, `stores/engine`, `EngineBadge`,
  `engineSnippetGroup`, and `data-engine` must return zero hits in `src/` after
  the strip; the deleted `tests/unit/engine.spec.ts` must not leave a dangling
  import.
