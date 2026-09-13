# Note the legacy line's retirement — Proposal

## Why

The Vanduo legacy line (the dual-engine Vanilla + Vue 3 system — `@vanduo-oss/core`,
`@vanduo-oss/framework`, `@vanduo-oss/vue`, and the four satellites) was retired on
2026-07-25. vd3 is now the only line that is maintained, improved, and released.

Two gaps remain in vd3-docs:

1. **`/guides/migration`** described v2 as "the earlier line" without stating end-of-life.
   (Addressed: a `VdAlert` retirement notice is in place.)
2. **`/guides/vanduo-ecosystem`** still says the old line is in **maintenance mode** and
   **receives critical fixes** — wrong since retirement. A reader can finish that page
   believing v2 is still actively supported.
3. Several guides still say **"vd2"** when they mean this docs site or a vd3 Vue app —
   leftover clone-and-strip wording.

## What

### `/guides/migration` (`src/pages/guides/MigrationComparison.vue`) — done

A `VdAlert variant="info"` beneath the intro paragraph, above the package map. It states:

- the retirement date (2026-07-25) and that v2 receives no further releases;
- that the v2 packages stay published and keep working;
- the final frozen version of each v2 package;
- that installing a v2 package now prints a deprecation notice;
- that the v2 documentation site is offline and the archived source lives at
  <https://github.com/vanduo-oss/vd2>.

### `/guides/vanduo-ecosystem` (`src/pages/guides/VanduoEcosystem.vue`)

Replace the "maintenance mode" card with a brief retirement note aligned to vanduo.dev:

- vd3 is the only line under active development;
- vanduo v2 was retired on 2026-07-25;
- npm packages stay published at final versions and keep working;
- link to the Migration guide for the package map.

The card SHALL NOT name individual retired package slugs (`core`, `framework`, `vue`, etc.)
— that detail stays on `/guides/migration`.

### Stale "vd2" → `vd3` / `vd3-docs` rename

Guides that say "vd2" when they mean this site or a consumer vd3 app:

- `ProductionBestPractices.vue` — vite-ssg build intro
- `SecurityPractices.vue` — CSP / v-html / app-safety copy
- `FirstLayout.vue` — drop dual-engine "engine-agnostic" framing
- `UtilitiesCheatSheet.vue` — template wording
- `VdThemeCustomizer.vue`, `DocsLayout.vue` — comments only
- `public/music/README.md` — demo audio note

Leave unchanged: migration-page v2 references, MusicPlayer `persistKey` values, CSS
"Legacy alias" labels.

### Routes

- Added: none.
- Changed: `/guides/migration`, `/guides/vanduo-ecosystem`, `/guides/production`,
  `/guides/security`, `/guides/first-layout`, `/guides/utilities-cheat-sheet` (prose only).
- Removed: none.

No nav, route-map, or search-index changes.

### On the vanilla-engine prose rule

The migration guide names `@vanduo-oss/framework` among frozen versions — the one page
where naming old packages is the page's entire purpose. The ecosystem card names v2 at a
high level only and points to the migration guide for package details.

## Non-goals

- **No new page.** The migration guide is the canonical deep reference for the retired line.
- **No changes to `vd3` or `vd3-cbun`.** No package version bump.
- **No changelog entry.** Changelog policy tracks package releases only.
- **No edits to legacy repos or `home/`.**
- **No `app.css` changes.**
- **No MusicPlayer `persistKey` renames** (would reset demo localStorage with no benefit).

## Rollout

1. Land all page changes on `main`.
2. Refresh Playwright visual baselines for the five affected guide routes.
3. The Pages deploy publishes automatically.
