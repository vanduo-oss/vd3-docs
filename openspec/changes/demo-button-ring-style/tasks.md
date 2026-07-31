# Demo the button ring modifier — Tasks

- [x] 1. Point `node_modules/@vanduo-oss/vd3` at the local vd3 build so the demo can be
  authored and verified before `1.2.0` is published. This is a `node_modules`-only symlink —
  `package.json` is not touched, and `pnpm install` reverses it.
- [x] 2. Add the **Ring Buttons** demo card to `src/pages/components/Button.vue`, between the
  Ghost Buttons and Icon Buttons cards, matching their `.vd-card.vd-card-glow.demo-card` shape
  with a `DocCodeSnippet` beneath.
- [x] 3. Add the matching `ringHtml` snippet string, kept identical to the rendered markup.
- [x] 4. Add the `.vd-btn-ring` row to `classRef` (type `Modifier`) and the `:ring` row to
  `vue3Api`; extend the `vue3Usage` snippet with a `:ring` example.
- [x] 5. Update the page intro blurb to mention the ring alongside outline, ghost and icon.
- [x] 6. Add `ring` to the button entry's `keywords` in `src/nav.ts`.
- [x] 7. Add the `v1.2.0` card to the `@vanduo-oss/vd3` column of `src/pages/changelog.vue`,
  moving the "Latest" marker off `v1.1.0` and linking to `/components/button`.
- [x] 8. Bump `package.json` to `1.1.3` and the `@vanduo-oss/vd3` dependency to `^1.2.0`.
- [x] 9. `pnpm run format:check`, `pnpm lint`, `pnpm stylelint`, `pnpm run typecheck`.
- [x] 10. `pnpm build` — vite-ssg prerenders every route clean.
- [x] 11. `pnpm test` (unit) and verify the ring renders as a real detached ring by inspecting
  the rendered page, not by assuming.
- [x] 12. Refresh the `/components/button` and `/changelog` visual baselines
  (`pnpm exec playwright test visual-parity --project='Chromium Desktop' --update-snapshots`),
  then confirm a clean re-run.
- [x] 13. `pnpm run test:a11y` and `pnpm run test:size`.
- [x] 14. Live customizer: add `ring` to `CustomizerState` / `KnobId` / store defaults; wire
  the button registry (`knobs`, `rootClass`, `vdBtnAttrs`, `extraCss` for
  `--vd-btn-ring-width` vs `border-width`); add Ring Off/On control and relabel the outline
  slider to Ring weight when ring is on.
- [x] 15. Extend `tests/unit/customizer-codegen.spec.ts` for ring prop/class and outline CSS
  branching; run format/lint/typecheck/test.
- [ ] 16. Restore `node_modules/@vanduo-oss/vd3` to the registry package.
- [ ] 17. Open the PR `dev-v1.1.3 → main`; merge only once `@vanduo-oss/vd3@1.2.0` is published.
