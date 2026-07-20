## ADDED Requirements

### Requirement: public assets referenced outside `<img src>` resolve under the deploy base

Docs pages that reference a `public/` asset from a location Vite does **not**
rebase for `base` — JavaScript string data, inline `style` `url()`, and `data-*`
attributes — SHALL construct the URL as `` `${import.meta.env.BASE_URL}<path>` ``
with `<path>` having **no** leading slash. Such references MUST NOT be authored as
root-absolute paths (`/music/…`, `/images/…`). This guarantees the asset resolves
under both the root base (`/`, used by dev, preview, and the test suites) and the
project-page base (`/vd3-docs/`, used by the GitHub Pages deploy).

Reference `<img src>` attributes are exempt: the Vue SFC compiler rewrites those
for `base` automatically, so they MAY remain root-absolute.

#### Scenario: music player track URLs load under the project-page base
- **WHEN** the site is built with `VITE_BASE=/vd3-docs/` and the Music Player page is served
- **THEN** every audio track URL begins with `/vd3-docs/music/` and the built JS contains no root-absolute `/music/` track path

#### Scenario: expanding-cards backgrounds load under the project-page base
- **WHEN** the site is built with `VITE_BASE=/vd3-docs/` and the Expanding Cards page is prerendered
- **THEN** each card image path and the inline `--vd-expanding-card-bg` `url()` begin with `/vd3-docs/images/expanding/`, and neither the prerendered HTML nor the built JS contains a root-absolute `/images/expanding/` path

#### Scenario: image-box lightbox opens the full image under the project-page base
- **WHEN** the site is built with `VITE_BASE=/vd3-docs/` and the Image Box page is prerendered
- **THEN** every `data-image-box-full-src` attribute begins with `/vd3-docs/images/`, so the runtime lightbox loads the full-resolution image instead of a 404

#### Scenario: the same references still work at the root base
- **WHEN** the site is built or served with the default base `/` (dev, `pnpm preview`, Playwright, unit tests)
- **THEN** all of the above references resolve to `/music/…` and `/images/…` unchanged, because `import.meta.env.BASE_URL` is `/`
