## ADDED Requirements

### Requirement: global Cmd+K search is hybrid over the full docs corpus

The docs site global search (Cmd+K / `/` / dock Search) MUST use
`@vanduo-oss/vdl-hybrid-search` `HybridSearch` over committed corpus assets at
`/search/search-index.json` and `/search/vectors.json`, covering nav pages,
components, guides, and other documented routes (not title/keyword-only nav
substring matching). Fuzzy MUST be available immediately after index init;
semantic MUST warm in the background and participate in hybrid ranking when
ready. Semantic failure MUST degrade to fuzzy without blocking the palette.

Semantic embeddings MUST use EmbeddingGemma-300M
(`onnx-community/embeddinggemma-300m-ONNX`) with task prefixes: queries as
`task: search result | query: …` and documents (at index time) as
`title: … | text: …`. Display cutoffs MUST be adaptive to the score
distribution so intent queries surface relevant pages while nonsense queries
stay empty.

#### Scenario: exact title still surfaces

- **GIVEN** the search modal is open and the corpus index is loaded
- **WHEN** the user types a known section title (e.g. `modal`)
- **THEN** that page appears in the result listbox

#### Scenario: intent query surfaces Glass

- **GIVEN** semantic search is ready
- **WHEN** the user types an intent query about making UI transparent
  (e.g. `how to make objects transparent?`)
- **THEN** Glass (or an equivalently relevant Effects page) appears among the
  top results

#### Scenario: nonsense query stays empty

- **GIVEN** the search modal is open
- **WHEN** the user types an unrelated nonsense query (e.g. `banana`)
- **THEN** the results list is empty (no confident hits)

#### Scenario: assets are served from /search/

- **GIVEN** a built or previewed docs site
- **WHEN** `/search/search-index.json` and `/search/vectors.json` are requested
- **THEN** both respond successfully with corpus payloads used by `HybridSearch`
  and `vectors.json` records the EmbeddingGemma model id and 768 dimensions

### Requirement: search modal glass is more opaque for readability

The `.global-search-modal` panel MUST raise glass fill opacity to roughly
`--vd-glass-bg-opacity: 0.9` and blur to roughly `--vd-glass-blur: 20px` so
result text remains readable over busy page backgrounds. Other chrome glass
tokens MUST NOT be required to change.

#### Scenario: modal frost tokens

- **GIVEN** the open global search modal
- **WHEN** its computed glass custom properties are inspected
- **THEN** opacity is at least ~0.85 and blur is stronger than the prior 12px
  default

## MODIFIED Requirements

### Requirement: search-index / nav keywords stay maintainable

When pages are added or removed, maintainers MUST update `nav.ts` keywords as
today AND re-run `pnpm index` so `public/search/` assets stay aligned with the
live corpus. Maintainers SHOULD run `pnpm index:eval` after re-indexing to
check labeled intent queries. The DocSearch component demo page MAY continue to
use fixture data and MUST NOT be required to use the site hybrid engine.

#### Scenario: re-index after content change

- **GIVEN** a docs page body or nav entry changed
- **WHEN** a maintainer runs `pnpm index` (optionally with `VD3_DOCS_SITE` pointed
  at local preview)
- **THEN** `public/search/search-index.json` and `vectors.json` are regenerated
  for commit with EmbeddingGemma vectors
