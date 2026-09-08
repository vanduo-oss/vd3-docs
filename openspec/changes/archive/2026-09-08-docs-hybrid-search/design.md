# Docs hybrid search — design

## Runtime

`useSearchStore` owns a lazy `HybridSearch` instance:

- `indexUrl` / `vectorsUrl`: `/search/search-index.json`, `/search/vectors.json`
- `modelName`: `onnx-community/embeddinggemma-300m-ONNX` (768-dim, q8)
- Injected `loadFuse` / prefix-aware `loadTransformers` (bundled peers; Transformers
  v4 `quantized`→`dtype` shim; query text prefixed with
  `task: search result | query: ` before feature-extraction)
- On first modal open: `initFuzzy()`, then background `initSemantic()`
- Query watch (debounced ~350ms): `search(q, { mode })` with `fuzzy` until
  semantic is ready, then `hybrid`; semantic failure degrades to fuzzy

Merged hits map to the existing `SearchEntry` shape so `GlobalSearchModal`
keeps listbox / keyboard / category grouping. `categoryPath` uses
`tabTitle › category` (Pages for top-level nav pages).

**Adaptive display cutoff** (EmbeddingGemma score scales differ from MiniLM):

- Keep hits only when `topScore >= MIN_TOP_SCORE` (~0.53); then
  `score >= max(0.45 * topScore, ABS_FLOOR)` where `ABS_FLOOR` ≈ 0.22
- Drop fuzzy `titleMatch: none` weak body-only matches unless score is strong
  relative to top (`>= 0.85 * topScore`)

## Corpus pipeline

`scripts/hybrid-search-indexer.mjs`:

1. Parse `src/nav.ts` (via `VD3_DOCS_PATH`, default repo root)
2. Fetch prerendered HTML from `VD3_DOCS_SITE` (default `https://vd3.vanduo.dev`)
3. Extract `.doc-content` / `#main-content` body, headings, chunks
4. Embed each doc as `title: {title} | text: {keywords + headings + body}`
   (cap ~1600 chars) with EmbeddingGemma-300M q8
5. Write `public/search/search-index.json` + 768-dim `vectors.json`

Assets are committed; maintainers re-run `pnpm index` after nav/content changes.
Local refresh: `pnpm build && pnpm preview` then
`VD3_DOCS_SITE=http://127.0.0.1:8787 pnpm index`.

Quality gate: `pnpm index:eval` runs `scripts/hybrid-search-eval.mjs` against
`scripts/search-eval-queries.json` (top-1 / top-3 / MRR).

## Glass

Scoped on `.global-search-modal` only:

- `--vd-glass-bg-opacity: 0.9`
- `--vd-glass-blur: 20px`

Overlay scrim unchanged. Dock / other chrome glass tokens unchanged.

## Tests

Unit tests mock `HybridSearch` (no model download). Modal ⌘K / Esc / arrows stay
covered. E2e may smoke fuzzy path without EmbeddingGemma download in CI.
