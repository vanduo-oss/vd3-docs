## Why

`@vanduo-oss/vd3-cbun` gained a fifth component in 1.1.0 — `code-editor` (`VdCodeEditor`). The docs site dogfoods the published cbun components (charts, flowchart, hex-grid, music-player each have a live page); the code editor needs the same treatment so users can see, drive, and copy real usage of it.

## What Changes

**Routes:** +1 `/editors/code-editor` (new "Editors" category under the Components tab). No routes changed or removed.

- Add a new **Editors** `NavCategory` to the Components tab in `src/nav.ts` with one section, `code-editor` → `/editors/code-editor` (icon `code`, search keywords).
- Register the page in `src/router.ts` (import `CodeEditorPage`, add the `"code-editor"` row to `componentPages`).
- Add `src/pages/editors/CodeEditor.vue` — a live demo page rendering the real `VdCodeEditor` from `@vanduo-oss/vd3-cbun/code-editor`: v-model editing, each supported language, read-only, no-gutter, wrap, placeholder, copy button, plus `DocCodeSnippet` install/usage blocks and hand-written props/events/exposed + CSS-vars + accessibility tables.
- Add `import "@vanduo-oss/vd3-cbun/code-editor/css";` to `src/main.ts` (the component ships a stylesheet).

## Non-goals

- No changes to existing pages, routes, or nav categories beyond adding Editors.
- No new shared doc components — reuse `DocCodeSnippet` and upstream `vd-*` primitives (hand-write the API tables, as the other cbun pages do).
- No docs-site changelog entry (packages-only policy; the code-editor release is recorded in the `@vanduo-oss/vd3-cbun` CHANGELOG, not here).
- No `app.css` changes — page-specific styling stays scoped in the SFC or `docs.css`.
- No invented API — the page renders only the real `VdCodeEditor` surface.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `docs-content`: adds a requirement that a live Code Editor page exists under the Editors category, rendering the real `VdCodeEditor` with syntax highlighting.

## Impact

- **Routing/nav:** `src/nav.ts` (new Editors category), `src/router.ts` (import + `componentPages` row). Coordinate with the unimplemented `logo-effects-gallery` change, which also edits these two files (it adds to the Effects category — a different region, no logical conflict).
- **Page:** new `src/pages/editors/CodeEditor.vue`.
- **Styles:** `src/main.ts` gains the `code-editor/css` side-effect import.
- **Deps:** consumes `@vanduo-oss/vd3-cbun`'s `./code-editor` — visible locally only once cbun 1.1.0 is published or linked (`link:../vd3-cbun` during development); revert the link before committing.
- **Search & sidebar:** driven automatically from the new nav section's `keywords`.
