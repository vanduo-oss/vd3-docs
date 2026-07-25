# Note the legacy line's retirement in the migration guide — Proposal

## Why

The Vanduo legacy line (the dual-engine Vanilla + Vue 3 system — `@vanduo-oss/core`,
`@vanduo-oss/framework`, `@vanduo-oss/vue`, and the four satellites) was retired on
2026-07-25. vd3 is now the only line that is maintained, improved, and released.

`/guides/migration` is where a reader coming from the old line lands, but its prose only
described v2 as "the earlier line" — it never said v2 is end-of-life. A reader could
finish the page believing v2 remains a supported choice and that migrating is optional
housekeeping. It is not: v2 receives no further releases, and installing a v2 package now
prints a registry deprecation notice that the guide never mentioned.

## What

One page changed: **`/guides/migration`** (`src/pages/guides/MigrationComparison.vue`).

A `VdAlert variant="info"` is added directly beneath the page's intro paragraph, above the
existing package map. It states:

- the retirement date (2026-07-25) and that v2 receives no further releases;
- that the v2 packages stay published and keep working, so nothing breaks for a reader who
  has not migrated — retirement is a stop to development, not a removal;
- the final frozen version of each v2 package, so a reader can recognise whether they are
  already on the last one;
- that installing a v2 package now prints a deprecation notice;
- that the v2 documentation stays online as a frozen reference at
  <https://vanduo-oss.github.io/vd2/>.

`VdAlert` is imported explicitly from `@vanduo-oss/vd3` — the `VanduoVue` plugin applies
`themeDefaults` and nothing else, so it registers no global components. This matches how
`src/pages/core/GridSystem.vue` and `src/pages/components/ThemeSwitcher.vue` pull in real
components, and it keeps the page dogfooding a published vd3 component rather than
hand-rolling `.vd-alert` markup.

### Routes

- Added: none.
- Changed: `/guides/migration` (markup only — one alert block).
- Removed: none.

Because no route is added or removed, `nav.ts`, the route maps, and the search index are
untouched, and no search-keyword update is needed.

### On the vanilla-engine prose rule

The design rules forbid vanilla-engine references in prose. The alert names
`@vanduo-oss/framework 1.7.1` among the frozen versions. This is the one page where naming
the old packages is the page's entire purpose — the existing intro paragraph and package
map already reference `@vanduo-oss/framework` — and the reference is strictly
retrospective: it tells a reader which frozen version they are leaving, and documents no
vanilla usage, API, or snippet. No other page gains such a reference.

## Non-goals

- **No new page.** A dedicated "legacy line" or EOL page would give the retired line more
  prominence in the vd3 docs than it warrants; the migration guide is the correct and only
  home for this.
- **No changes to `vd3` or `vd3-cbun`.** The retirement is a fact about the *other* line;
  neither published package changes, and no version is bumped.
- **No changelog entry.** Changelog policy tracks package releases only, never docs-site
  content, and nothing about a package release changed here.
- **No edits to the legacy repos from this repo.** Their own retirement notices are landed
  in those repos independently; the old-line repos stay read-only reference material here.
- **No `app.css` changes.** The alert is styled entirely by the vd3 package.

## Rollout

1. Land the page change on `main` (this repo deploys on push to `main`).
2. Refresh the `/guides/migration` Playwright visual baseline, which shifts by one block.
3. The Pages deploy publishes the note automatically.
