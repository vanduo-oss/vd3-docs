# Findings from vd3-docs — ideas for `@vanduo-oss/vdl-hybrid-search`

Notes from wiring the package into the vd3 docs Cmd+K palette (EmbeddingGemma
upgrade + harness hardening). Written for the package author; nothing here is
blocking the docs site.

## 1. EmbeddingGemma needs task prefixes (docs + pipeline contract)

The package’s semantic path is plain `pipeline('feature-extraction', model)` on
raw query text. EmbeddingGemma-300M materially improves with task prefixes:

- queries: `task: search result | query: …`
- documents (index time): `title: {title} | text: …`

Consider:
- Document the prefix requirement for modern models, or
- Add an optional `queryPrefix` / `documentPrefix` option (or a documented
  pattern for wrapping `loadTransformers` like vd3-docs does in
  `src/search/embeddinggemma.ts`).

## 2. Transformers.js v4 `quantized` deprecation

`HybridSearch` still passes `quantized: true`. With `@huggingface/transformers`
v4, that option is dropped in favor of `dtype` (`'q8' | 'q4' | 'fp32' | …`).
The docs site wraps `pipeline` to map `quantized` → `dtype`. Consider handling
this inside the package (or documenting the shim) so consumers on v4 don’t need
to discover it.

## 3. Fixed thresholds don’t generalize across embedding models

`semanticThreshold` (0.3) and merged-score display cutoffs were calibrated
against MiniLM. EmbeddingGemma’s cosine distribution is much stronger (top hits
~0.54–0.71 on the vd3 corpus, nonsense still ~0.4–0.52), so:

- Fixed `semanticThreshold` is not portable across models.
- vd3-docs added adaptive display filtering in `filterConfidentHits`:
  - require `topScore >= MIN_TOP_SCORE` (0.53) — kills “still-something”
    nonsense like `banana` (top 0.436) while keeping real intent hits
  - keep hits `>= max(0.22, topScore * 0.45)`
  - keep weak body-only fuzzy (`titleMatch: none`) only if near top

Consider an optional adaptive-cutoff helper (or docs guidance) so consumers
don’t hand-tune per model.

## 4. Corpus / evaluation harness pattern

A labeled-query eval (`scripts/hybrid-search-eval.mjs` + `search-eval-queries.json`,
top-1/top-3/MRR + “nonsense must be empty”) made the MiniLM → EmbeddingGemma
swap measurable: intent top-3 went 100% and nonsense stays empty. A similar
fixture-driven eval in the package repo (against a tiny docs corpus) would make
future model/index-text changes verifiable.

## 5. Larger model warm-up UX

EmbeddingGemma q8 is a bigger first-time download than MiniLM. The existing
background `initSemantic()` + fuzzy-first behavior is the right pattern; it may
be worth documenting a recommended warm-up + progress UX (`onSemanticProgress`)
for consumers that surface “smart” search (vd3-docs shows a subtle footer
status).

## 6. Minor: docs base URL

`DEFAULT_DOCS_BASE_URL` still points at `https://vanduo-oss.github.io/vd3-docs`;
live docs are at `https://vd3.vanduo.dev`. Worth updating so demos/hybrids link
correctly by default.

---

Reference implementation in vd3-docs:

- `src/search/embeddinggemma.ts` (prefixes, adaptive cutoff, v4 shim)
- `src/stores/search.ts` (HybridSearch wiring)
- `scripts/hybrid-search-indexer.mjs` (EmbeddingGemma vectors)
- `scripts/hybrid-search-eval.mjs` (labeled eval)
