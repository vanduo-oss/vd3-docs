# Sync shipped docs specs — design

## Approach

Treat the live site as source of truth and write tight ADDED/MODIFIED deltas
only. When a finished change never archived, fold its normative outcome into
the matching capability rather than inventing new product work.

## Decisions

1. **Exact pins** — committed deps are `"1.7.2"` / `"1.4.0"` with
   `save-exact=true`; `^` ranges are obsolete. Temporary `pnpm link` remains
   allowed locally; committed manifest stays exact published versions.
2. **Baselines** — only `vd3-*-Chromium-Desktop-darwin.png` are committed;
   Mobile darwin PNGs are gitignored so `test:e2e:full` noise cannot land.
3. **Shell** — `App.vue` mounts `VdSiteDock` only; no site `VdNavbar` /
   `VdFooter`. Library demo pages for Navbar/Footer stay.
4. **Retirement** — ecosystem guide may state v2 retirement; it MUST NOT
   link to `/guides/migration` (page must stay gone).
5. **Indexer** — `pnpm index` / `pnpm index:eval` are maintainer scripts;
   deploy does not regenerate vectors in CI.
6. **Stale actives** — after this change archives, folder-move the ten old
   active change dirs into `archive/` without running `openspec archive` on
   them (their deltas conflict with current truth).
