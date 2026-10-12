# Changelog

`@vanduo-oss/vd3-docs` is the **private** documentation site for the vd3 line.
It is not published to npm and keeps no package release history of its own.

## Unreleased

### Changed

- Dogfood the published registry package `@vanduo-oss/vd3@1.7.6`, including
  its hardened sanitized-HTML installation and lazy-load lifecycle cleanup.
  This is a docs-site dependency adoption, not a docs package release.

The user-facing release history of the packages this site documents —
[`@vanduo-oss/vd3`](https://www.npmjs.com/package/@vanduo-oss/vd3),
[`@vanduo-oss/vd3-charts`](https://www.npmjs.com/package/@vanduo-oss/vd3-charts),
and
[`@vanduo-oss/vd3-flowchart`](https://www.npmjs.com/package/@vanduo-oss/vd3-flowchart)
— is rendered on the site's [`/changelog`](src/pages/changelog.vue) page.
Canvas widgets come from the published charts and flowchart packages, not a
Labs sibling. Each package's authoritative changelog lives in its own
repository.
