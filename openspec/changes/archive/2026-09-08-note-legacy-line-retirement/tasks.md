# Note the legacy line's retirement — Tasks

- [x] 1. Import `VdAlert` from `@vanduo-oss/vd3` in `src/pages/guides/MigrationComparison.vue`
  (the `VanduoVue` plugin registers no global components — verified against
  `dist/plugin.d.ts`).
- [x] 2. Add the `VdAlert variant="info"` retirement notice between the intro paragraph and
  the package map: retirement date, no-further-releases, still-published-and-working, the
  final frozen version of each retired package, the deprecation-notice warning, and the
  link to the archived vd2 repository.
- [x] 3. Confirm no route change is needed — `nav.ts`, the route maps, and search keywords
  are untouched (markup-only change to an existing page).
- [x] 4. `pnpm run format:check` (prettier) and `pnpm lint`.
- [x] 5. `pnpm run typecheck` (vue-tsc).
- [x] 6. `pnpm build` — vite-ssg prerenders all routes clean (94 URLs in the sitemap).
- [x] 7. Verify the alert renders as a real styled alert (box, icon, title, linked vd2
  reference) by inspecting the Playwright actual-screenshot artifact, not by assuming.
- [x] 8. Refresh the `/guides/migration` visual baseline:
  `pnpm exec playwright test visual-parity --project='Chromium Desktop' --update-snapshots`,
  then confirm a clean re-run (93 passed).
- [x] 9. `pnpm test` (165 unit tests), `pnpm run test:a11y` (11 passed), `pnpm run test:size`
  (483.1 KB gz against a 515 KB budget).
- [x] 10. Replace the "maintenance mode" card in `VanduoEcosystem.vue` with retirement copy
  (no package slugs; link to Migration guide).
- [x] 11. Rename stale "vd2" → `vd3` / `vd3-docs` in ProductionBestPractices,
  SecurityPractices, FirstLayout, UtilitiesCheatSheet, comments, and `public/music/README.md`.
- [x] 12. Add `specs/docs-content/spec.md` delta (ecosystem requirement: retired, not
  maintenance) and extend `specs/guides/spec.md` (ecosystem retirement + fix vd2 docs link).
- [x] 13. Re-run format/lint/typecheck/build/tests/openspec validate.
- [x] 14. Refresh visual baselines for `/guides/vanduo-ecosystem`, `/guides/production`,
  `/guides/security`, `/guides/first-layout`, `/guides/utilities-cheat-sheet`; confirm clean
  re-run.
- [x] 15. Commit and push to `main`; the Pages deploy workflow publishes the changes.
