# Changelog

`@vanduo-oss/vd3-docs` is the **private** documentation site for the vd3 line.
It is not published to npm and keeps no package release history of its own.

## Unreleased

### Changed

- Note on the typography page that text fonts leave the package in v1.8.2, and
  document that release on the changelog page.
- Dogfood `@vanduo-oss/vd3@1.8.1` with `VdImageBox` gallery layouts (`grid`, `masonry`,
  `bento`, `filmstrip`), `useImageBox` lightbox navigation, OolaDock parity (`brandSpin`,
  `itemLayout="auto"`), `@layer vd3` Tailwind CSS / Nuxt UI coexistence guide, expanded
  Security guide, completed component API/accessibility references, and refreshed search index.
- Dogfood `@vanduo-oss/vd3@1.8.0` with atomic layer parity, live Vue atom showcases,
  corrected snippet tabs (`:vue`), updated guides, and refreshed search index.

The user-facing release history of the packages this site documents —
[`@vanduo-oss/vd3`](https://www.npmjs.com/package/@vanduo-oss/vd3),
[`@vanduo-oss/vd3-charts`](https://www.npmjs.com/package/@vanduo-oss/vd3-charts),
and
[`@vanduo-oss/vd3-flowchart`](https://www.npmjs.com/package/@vanduo-oss/vd3-flowchart)
— is rendered on the site's [`/changelog`](src/pages/changelog.vue) page.
Canvas widgets come from the published charts and flowchart packages, not a
Labs sibling. Each package's authoritative changelog lives in its own
repository.
