## Context

The Pages deploy builds with `VITE_BASE=/vd3-docs/` ([deploy.yml](../../../.github/workflows/deploy.yml)); dev, `pnpm preview`, and every test suite run at base `/`. Vite copies `public/` verbatim to the deploy root and does **not** rewrite root-absolute references to it — the app is responsible for prefixing `import.meta.env.BASE_URL`. The one exception is the Vue SFC compiler, which rewrites `<img src>` (and other `transformAssetUrls` targets) for `base`. That exception is why the bug is partial and easy to miss: on the ImageBox page the thumbnail `<img src>` rebases correctly while its sibling `data-image-box-full-src` does not.

Three features reference `public/` assets from non-rebased locations and therefore 404 on Pages:
- **MusicPlayer** — `tracks[].url` JS data.
- **ExpandingCards** — `cards[].img` JS data plus an inline `style` `url()`.
- **ImageBox** — `data-image-box-full-src` attributes consumed by the framework's runtime lightbox.

## Goals / Non-Goals

**Goals:**
- Music, expanding-card backgrounds, and image-box zoom load correctly under `/vd3-docs/`.
- Keep dev / preview / test behavior (base `/`) byte-identical — no visual-baseline churn.
- Use the idiom already present in the codebase so the fix reads like existing code.

**Non-Goals:**
- No `withBase()` helper or site-wide asset-reference refactor.
- No change to the base value, `vite.config.ts`, or `deploy.yml`.
- No change to `<img src>` references Vue already handles.

## Decisions

- **Inline `` `${import.meta.env.BASE_URL}<path>` `` at each site, no helper.** Only three files and ~11 references are affected; a shared helper would be more indirection than the fix warrants and would diverge from the existing [VdNavbar.vue](../../../src/layout/VdNavbar.vue) / [VdFooter.vue](../../../src/layout/VdFooter.vue) idiom. `BASE_URL` always has a trailing slash, so paths are written without a leading slash (`music/…`, `images/…`).
  - *Alternative — `<base href>` tag:* rejected; it interacts badly with vue-router hash/relative links and SSG prerender, and would affect far more than these assets.
  - *Alternative — move assets to `src/` and `import` them:* rejected; the music files are large binaries and the ImageBox `data-*` contract expects string URLs the framework reads at runtime, not build-time imports.
- **Leave `<img src>` references untouched.** They already rebase; rewriting them to `BASE_URL` would be redundant and would double-encode nothing but adds noise.
- **Verify against a real production-base build**, not by reading source — the whole class of bug is invisible at base `/`, so the acceptance check must build with `VITE_BASE=/vd3-docs/` and grep the emitted HTML/JS.

## Risks / Trade-offs

- **A future page reintroduces a root-absolute non-`<img>` asset path** → the fix is local, not enforced. Mitigation: the spec documents the rule; a lightweight grep gate could be added later if regressions recur (out of scope here).
- **Music track filenames contain spaces** (`06 - Pale Blue Dot.mp3`) → already the case today and served fine; base-prefixing does not change encoding behavior, the browser encodes the request identically. No new risk.
- **ImageBox depends on the framework reading `data-image-box-full-src` verbatim** → we only change the value's prefix, not the attribute name or the component contract, so runtime wiring is unaffected.

## Migration Plan

Pure edit to three page components; no data migration, no deploy-order constraint. Rollback = revert the three files. Acceptance: `VITE_BASE=/vd3-docs/ pnpm build` then grep the prerendered `dist/` for residual root-absolute `/music/` and `/images/expanding/` and unprefixed `data-image-box-full-src="/images/`.

## Open Questions

None.
