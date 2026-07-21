## Context

The docs site gives every published cbun component a live page assembled from a fixed pattern (see `src/pages/media/MusicPlayer.vue`): a `<section>` with intro copy, live demos inside `vd-card vd-card-glow demo-card` shells, `DocCodeSnippet` for install/usage blocks, and hand-written `vd-table` API tables. Routes flow from `src/nav.ts` (data) through `src/router.ts` (`componentPages[section.id]` → SFC). The site consumes the **published** `@vanduo-oss/vd3-cbun`, so the new component is only visible locally via a temporary `link:../vd3-cbun`.

## Goals / Non-Goals

**Goals:**
- A live, dogfooded Code Editor page at `/editors/code-editor` rendering the real `VdCodeEditor`, matching the existing cbun-page pattern.
- Demonstrate v-model, every supported language, and the read-only / wrap / gutter / placeholder / copy features; document props / events / exposed / CSS vars / a11y.

**Non-Goals:**
- No new shared doc components; no `app.css` changes; no invented API; no docs-site changelog entry.

## Decisions

**New "Editors" category rather than folding into Canvas/Media.** Charts/flowchart/hex live under Canvas (SVG/canvas) and music-player under Media; a code editor is neither. A dedicated `editors` category (route prefix `/editors/…`, page dir `src/pages/editors/`) mirrors how the other rich cbun components get a topical home and leaves room for future editor-family components. *Alternative rejected:* `/components/code-editor` under an existing category — muddies the taxonomy.

**Drive the demos with local reactive state.** The page holds `ref`s for the v-model value and the interactive control toggles (language, readOnly, wrap, lineNumbers), so the live editor and a shown "bound value" stay in sync — the clearest way to dogfood v-model and prop reactivity. Static per-feature demos use plain `<VdCodeEditor>` instances with fixed props.

**Registration touches nav + router together.** `buildRoutes` skips a nav section with no `componentPages[id]`, so both files change in lockstep. This is the same two-file surface the unimplemented `logo-effects-gallery` change edits (Effects category) — no logical conflict; whichever lands second re-applies against a different array region.

## Risks / Trade-offs

- **Link vs published dep** → the page only renders once cbun 1.1.0 is published or linked; the `link:../vd3-cbun` is temporary and MUST be reverted before commit (docs ships the published caret range). Mitigation: called out in tasks.
- **SSR prerender** → `VdCodeEditor` is SSR-safe (emits an empty container on the server, hydrates on mount), so `vite-ssg` prerenders the route cleanly with no `ClientOnly` wrapper. Verified by `pnpm build`.
- **Nav/router collision with `logo-effects-gallery`** → coordinate the two edits; different regions, so a clean re-apply.
