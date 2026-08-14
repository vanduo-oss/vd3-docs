# Docs: vd3 1.4.0 auth screens and data table

## Why

vd3 1.4.0 adds headless auth screens and `VdDataTable`. The docs site still has
no login page, the table page is CSS-class-only (and lies about `columns.variant`),
and the forms password demo fakes a reveal with hand-rolled markup.

## What Changes

- Live `/components/login` page dogfooding `VdLogin` / `VdSignUp` /
  `VdForgotPassword` / `VdOtpInput` / `VdCheckbox` (`framed=false` inside docs cards).
- Upgrade `/components/table` to live `VdDataTable` (sort, search, selection,
  avatar cell slot) plus a cbun chart recipe. Keep CSS table demos. Fix the
  `columns.variant` API row.
- Forms password demo uses `VdInput revealPassword`. Card API documents `glass`.
- Security guide: Auth UI subsection (kit vs app responsibility).
- Changelog card for `@vanduo-oss/vd3` 1.4.0.
- Depend on published `@vanduo-oss/vd3` `^1.4.0` (lockfile refresh after npm
  publish). Site version `1.3.0`.

## Capabilities

### Modified Capabilities

- `docs-content`: login page, table upgrade, forms reveal, security note, changelog
- `docs-build`: nav/router/keywords/ROUTES for `/components/login`

## Semver

Docs-site content plus a minor site version bump to `1.3.0`. Package changelog
tracks vd3 1.4.0 only (no docs-package changelog card).

## Non-goals

- Publishing vd3 or pushing remotes until local gates pass and the human reviews.
- Auth backend, dataProvider, or a vd3-admin package.
- Virtualized tables.
