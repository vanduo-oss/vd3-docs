## 1. Fix asset references

- [x] 1.1 `src/pages/media/MusicPlayer.vue`: base-prefix all five `tracks[].url` values with `` `${import.meta.env.BASE_URL}music/…` `` (drop the leading slash). Leave the fictional `/music/pale-blue-dot.mp3` code-snippet strings shown in the docs prose unchanged.
- [x] 1.2 `src/pages/components/ExpandingCards.vue`: base-prefix the five `cards[].img` values and the inline `style="--vd-expanding-card-bg: url(…)"` with `` `${import.meta.env.BASE_URL}images/expanding/N.jpg` ``.
- [x] 1.3 `src/pages/media/ImageBox.vue`: base-prefix the four live `data-image-box-full-src` attributes with the `BASE_URL` prefix; bind them (`:data-image-box-full-src="…"`) since they are now expressions. Leave the `/images/thumb.jpg` / `/images/full.jpg` example snippet in the "View Code" block untouched.

## 2. Verify at both bases

- [x] 2.1 Root base unchanged: `mise exec node@24 -- pnpm build` (base `/`) succeeds and prerenders all 93 routes; rendered asset paths stay `/music/…` and `/images/…`, so committed Playwright visual baselines remain valid (no `--update-snapshots` needed).
- [x] 2.2 Production base correct: `VITE_BASE=/vd3-docs/ mise exec node@24 -- pnpm build`, then grep `dist/` to assert **zero** residual root-absolute `/music/Stellardrone`, `/images/expanding/`, and unprefixed `data-image-box-full-src="/images/…"`, and that the base-prefixed `/vd3-docs/music/`, `/vd3-docs/images/expanding/`, `/vd3-docs/images/…` forms are present.
- [x] 2.3 Gates: `pnpm typecheck` and `pnpm lint` pass. Restore local `dist/` to the default base (final `pnpm build`) so `pnpm preview` is left consistent.

## 3. Close out

- [x] 3.1 `openspec validate fix-pages-base-asset-paths --strict` passes.
- [x] 3.2 No changelog entry (docs-site content is never tracked in the package changelog).
