# base-safe-public-assets Specification

## Purpose
Resolve non-`<img>` public asset URLs under Vite `base` via
`` `${import.meta.env.BASE_URL}…` ``.
## Requirements
### Requirement: public assets referenced outside `<img src>` resolve under the deploy base

Docs pages referencing a `public/` asset outside `<img src>` (JS string data, inline `style` `url()`, and `data-*` attributes) SHALL construct the URL as `` `${import.meta.env.BASE_URL}<path>` `` with no leading slash on `<path>` rather than root-absolute paths (`/music/…`, `/images/…`), resolving under both `/` and `VITE_BASE=/vd3-docs/`. Reference `<img src>` attributes MAY remain root-absolute because the Vue SFC compiler rewrites them automatically.

#### Scenario: expanding-cards backgrounds load under the project-page base
- **WHEN** the site is built with `VITE_BASE=/vd3-docs/` and the Expanding Cards page is prerendered
- **THEN** each card image path and the inline `--vd-expanding-card-bg` `url()` begin with `/vd3-docs/images/expanding/`, and neither the prerendered HTML nor the built JS contains a root-absolute `/images/expanding/` path

#### Scenario: image-box lightbox opens the full image under the project-page base
- **WHEN** the site is built with `VITE_BASE=/vd3-docs/` and the Image Box page is prerendered
- **THEN** every `data-image-box-full-src` attribute begins with `/vd3-docs/images/`, so the runtime lightbox loads the full-resolution image instead of a 404

#### Scenario: the same references still work at the root base
- **WHEN** the site is built or served with the default base `/` (dev, `pnpm preview`, Playwright, unit tests)
- **THEN** all of the above references resolve to `/images/…` unchanged, because `import.meta.env.BASE_URL` is `/`

