## MODIFIED Requirements

### Requirement: the search modal is interaction-tested

The global command-palette search modal MUST remain covered by a unit interaction
test distinct from the search-store unit test. With `HybridSearch` mocked (or
fixture injectors), the test MUST open the modal via the global Cmd+K path, type
a query that yields results, arrow-navigate the listbox, and close with Escape.
CI MUST NOT require downloading the MiniLM model.

#### Scenario: the search modal is interaction-tested

- **GIVEN** `tests/unit/global-search-modal.spec.ts` with a mocked hybrid engine
- **WHEN** Cmd+K opens the modal and a matching query is entered
- **THEN** a `role="listbox"` with `role="option"` children appears, ArrowDown
  moves `aria-selected`, and Escape closes and clears the query

### Requirement: search store unit tests cover hybrid wiring

`tests/unit/useGlobalSearch.spec.ts` MUST verify store open/close, short-query
guard, and that search results are populated via the hybrid engine path (mocked
`search` / `initFuzzy`), not the retired nav-only substring matcher.

#### Scenario: store returns hybrid-mapped results

- **GIVEN** a mocked `HybridSearch` that returns a merged hit for query `modal`
- **WHEN** the store opens and the query is set to `modal`
- **THEN** `ordered` includes an entry whose title is `Modal` (or the mocked
  title) after the debounced search settles
