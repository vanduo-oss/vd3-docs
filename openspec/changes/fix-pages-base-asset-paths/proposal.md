## Why

The GitHub Pages deploy serves the site under a project-page base (`VITE_BASE=/vd3-docs/`), but three docs features reference `public/` assets with **hardcoded root-absolute paths** (`/music/…`, `/images/…`) in places Vite does not rebase: JS string data, inline `style` `url()`, and `data-*` attributes. These 404 in production even though they work in `pnpm dev` (base `/`). Vue's SFC compiler rebases `<img src>` automatically, which masks the bug — the same pages' `<img>` thumbnails resolve correctly while their siblings break.

## What Changes

- **Music player** ([src/pages/media/MusicPlayer.vue](../../../src/pages/media/MusicPlayer.vue)): the five `tracks[].url` values are plain JS data (`/music/Stellardrone/…`) → prefix each with `import.meta.env.BASE_URL` so audio loads under the Pages base.
- **Expanding cards** ([src/pages/components/ExpandingCards.vue](../../../src/pages/components/ExpandingCards.vue)): the `cards[].img` JS data and the inline `style="--vd-expanding-card-bg: url(/images/expanding/0.jpg)"` → base-prefix both so card backgrounds load.
- **Image Box** ([src/pages/media/ImageBox.vue](../../../src/pages/media/ImageBox.vue)): the four `data-image-box-full-src` attributes (read at runtime by the lightbox) are not rebased → base-prefix so click-to-zoom shows the full image. Thumbnails already work.
- Use the existing repo idiom `` `${import.meta.env.BASE_URL}<path-without-leading-slash>` `` (already used in [VdNavbar.vue](../../../src/layout/VdNavbar.vue) / [VdFooter.vue](../../../src/layout/VdFooter.vue)); `BASE_URL` always ends in `/`.

No routes are added, changed, or removed. No public API, no package change, no new dependency. Content and layout are unchanged — only asset URL resolution is corrected, so visual baselines at base `/` are unaffected.

## Capabilities

### New Capabilities
- `base-safe-public-assets`: docs pages that reference `public/` assets from non-`<img src>` locations (JS data, inline `style` `url()`, `data-*` attributes) MUST resolve them relative to the deploy base so they load under both root (`/`) and project-page (`/vd3-docs/`) bases.

### Modified Capabilities
<!-- None: no existing spec requirement changes; docs-build's prerender/visual-parity behavior is unaffected. -->

## Non-goals

- No change to `<img src>` references that Vue already rebases correctly (navbar/footer logos, Primitives, Card OG image, ImageBox thumbnails).
- No change to the deploy base value, `vite.config.ts`, or the `deploy.yml` workflow.
- No introduction of a shared `withBase()` helper or refactor of all asset references site-wide — scope is limited to the three broken features.
- No changelog entry (docs-site content is never tracked in the package changelog).

## Impact

- Files: `src/pages/media/MusicPlayer.vue`, `src/pages/components/ExpandingCards.vue`, `src/pages/media/ImageBox.vue`.
- Verification: a production-base build (`VITE_BASE=/vd3-docs/ pnpm build`) whose prerendered HTML/JS contains no residual root-absolute `/music/` or `/images/expanding/` and no unprefixed `data-image-box-full-src="/images/…"`.
- No runtime deps, no API surface, no route/nav changes; visual-parity baselines (captured at base `/`) remain valid.
