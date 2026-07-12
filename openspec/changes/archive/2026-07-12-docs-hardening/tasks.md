# Tasks

> Run all tooling under Node 24 (`mise exec node@24 -- <cmd>`; the shell's own
> node is v22). Old-line repos (`core`, `framework`, `vue`, `vd2`, `charts`,
> `flowchart`, `hex-grid`, `music-player`) and the `link:` targets `../vd3` /
> `../vd3-cbun` are strictly read-only — never write into them. Do not commit or
> push (the orchestrator commits). This change touches `tests/` and one size
> script only — no `src/`, `nav.ts`, or `router.ts` edits.
>
> DEVIATION (authorized): two docs-owned components were fixed for REAL
> `critical` a11y bugs surfaced by the new a11y smoke —
> `src/overlays/GlobalSearchModal.vue` and `src/components/DocCodeSnippet.vue`
> (attribute-only ARIA fixes, zero visual change; visual baselines re-verified
> green). `nav.ts` / `router.ts` / `styles/*.css` remain untouched.

## 1. Rebrand the visual-parity spec (`docs-build`)

- [x] 1.1 `tests/e2e/visual-parity.spec.ts`: rename the `Route` field `vd2Path`
      → `path` (and every reference in the loop: `page.goto(route.path…)`).
- [x] 1.2 Change the snapshot name template `vd2-${route.label}.png` →
      `vd3-${route.label}.png`.
- [x] 1.3 Change the test title `` `vd2 ${route.vd2Path} baseline regression` `` →
      `` `vd3 ${route.path} baseline` ``.
- [x] 1.4 Grep gate: `grep -n vd2 tests/e2e/visual-parity.spec.ts` returns
      **zero** hits.

## 2. Reconcile the visual-parity route list (`docs-build`)

- [x] 2.1 Add `{ path: '/components/doc-search', label: 'components-doc-search' }`
      to `ROUTES` (the DocSearch page added since the clone).
- [x] 2.2 Verify no enumerated `path` resolves to the 404 page — cross-checked
      each against `src/nav.ts` `route:` values (all 70 resolve); confirmed
      neither `/guides/esm-vs-iife` nor `/guides/lifecycle-manager` appears.
- [x] 2.3 Confirm the list stays a curated **representative** parity set — did
      **not** expand to one entry per route. NOTE: the reconciled list is **70**
      routes (proposal estimated 71; the pre-existing base was 69, not 70, so
      base 69 + doc-search = 70). Invariants hold: synced to nav, doc-search
      added, dropped guides absent.

## 3. Recapture fresh vd3 baselines (`docs-build`)

- [x] 3.1 Built the site: `mise exec node@24 -- pnpm build` (`../vd3` + `../vd3-cbun`
      built + linked; `vite-ssg` prerenders every route, sitemap 92 URLs).
- [x] 3.2 Deleted all 70 stale `vd2-*-Chromium-Desktop-darwin.png` files under
      `tests/e2e/visual-parity.spec.ts-snapshots/`.
- [x] 3.3 Captured fresh baselines against the built site
      (`--update-snapshots`, Chromium Desktop).
- [x] 3.4 Reviewed captured `vd3-*.png` as intended vd3 output (spot-checked
      home + doc-search: correct vanduo branding/markup). Snapshot dir contains
      only `vd3-*` files, one per enumerated route (**70**), no `vd2-*` remains.
- [x] 3.5 Re-ran `pnpm test:e2e -- visual-parity` (no `--update`) → green
      (70 passed), re-verified again after the docs-component ARIA fixes.

## 4. Add the accessibility smoke (`docs-build`)

- [x] 4.1 `package.json`: added `@axe-core/playwright` `4.12.1` and `axe-core`
      `4.12.1` (exact) to `devDependencies`; `pnpm install` ran.
- [x] 4.2 Added `tests/e2e/a11y-smoke.spec.ts`: per route `page.goto(path,
      { waitUntil: 'networkidle' })`, `new AxeBuilder({ page })` (WCAG 2.0/2.1
      A+AA tags) `.analyze()`, filter to `serious`/`critical`, assert the
      non-allow-listed set `toEqual([])`.
- [x] 4.3 Route set (10, one per archetype): `/`, `/components/button`,
      `/components/forms`, `/guides/getting-started`, `/canvas/charts`,
      `/media/music-player`, `/changelog`, `/components/theme-customizer`,
      `/components/theme-switcher`, `/core/color-palette`.
- [x] 4.4 `package.json`: added `"test:a11y": "playwright test a11y-smoke --project='Chromium Desktop'"`.
- [x] 4.5 `mise exec node@24 -- pnpm test:a11y` → green (10 passed). The audit
      surfaced REAL serious/critical findings: two docs-owned `aria-required-children`
      (critical) bugs were FIXED (GlobalSearchModal empty `role="listbox"`;
      DocCodeSnippet `role="tablist"` with no `role="tab"` children — that rule
      is now fully enforced). Three findings live in vd3 tokens / global docs
      theme / a home flip-card design and are reported upward + documented in a
      test-scoping allow-list (`color-contrast`, `link-in-text-block`,
      `nested-interactive`) — cannot be fixed here (vd3 read-only / global
      restyle would invalidate baselines / design change).

## 5. Re-baseline the gzip size budget (`docs-build`)

- [x] 5.1 Measured the current dist: `app-*.js` 342.5 KB gz + `app-*.css`
      103.8 KB gz = **446.4 KB gz** total.
- [x] 5.2 `tests/scripts/size.mjs`: keeps the per-asset raw/gz printout; sums the
      gzipped `app-*` bytes; `MAX_GZIP_KB = 515` (measured + ~15% headroom);
      `process.exit(1)` with a clear message when the total exceeds the budget.
- [x] 5.3 `mise exec node@24 -- pnpm test:size` → passes and prints total vs
      budget (446.4 KB gz <= 515 KB gz).

## 6. Verification

- [x] 6.1 `mise exec node@24 -- pnpm typecheck` and `pnpm lint` pass (new spec
      typechecks; `@axe-core/playwright` types resolve).
- [x] 6.2 `mise exec node@24 -- pnpm test:e2e` (Chromium Desktop) runs
      visual-parity + layout-navigation + a11y-smoke green (**85 passed**).
- [x] 6.3 `mise exec node@24 -- pnpm test:size` green.
- [x] 6.4 DEVIATION (authorized): besides `tests/**`, `tests/scripts/size.mjs`,
      and `package.json`, two docs-owned components were fixed for real
      `critical` a11y bugs (`src/overlays/GlobalSearchModal.vue`,
      `src/components/DocCodeSnippet.vue`; attribute-only, zero visual change).
      `nav.ts`, `router.ts`, and `styles/*.css` were NOT changed.

## 7. Spec bookkeeping

- [x] 7.1 `openspec validate docs-hardening --strict` passes.
- [x] 7.2 No edits to any old-line repo or to `../vd3` / `../vd3-cbun`; no
      publish, deploy, or CNAME; no commit/push (orchestrator commits).
