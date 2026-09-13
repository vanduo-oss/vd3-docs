# Design: published cbun 1.4.2 dogfood

## Registry pin

The manifest stays exact and resolves `1.4.2` from npm. The lockfile must contain
the registry integrity entry and no sibling `link:` override, so local QA tests
the same artifact users install.

## Changelog and API copy

The package release belongs on `/changelog`; the root `CHANGELOG.md` remains
unchanged because it explicitly does not track private docs-site revisions.
The Charts API table names Vue `svgRole`, while prose explains that core
factories use `role` and Vue reserves normal `role` for root fallthrough.

## Verification

Use Node 24 through mise. Run dependency audit, OpenSpec validation, static
checks, unit tests, SSG build, size, Chromium and full-browser Playwright, and
axe smoke. Because `/changelog` and `/canvas/charts` markup changes, refresh only
their visual baselines if the expected screenshots differ and inspect the PNGs.

The raw moderate audit currently reports `CVE-2026-76845` /
`GHSA-vwc7-r8mq-g2x9` in transitive
`@huggingface/transformers > onnxruntime-node > adm-zip`. The registry marks it
unfixable (`Patched versions: <0.0.0`), so QA SHALL retain the raw finding and
use pnpm's explicit `--ignore-unfixable` mode for the pass/fail gate. This does
not ignore fixable moderate, high, or critical advisories.
