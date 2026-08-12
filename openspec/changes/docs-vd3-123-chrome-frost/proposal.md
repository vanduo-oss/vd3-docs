## Why

Dogfood published `@vanduo-oss/vd3@1.2.3` (`storagePrefix`), strengthen docs
shell chrome to match Spindrift Chess frost + Bold icons (slightly more
transparent than chess), and permanently switch this repo from direct
`main` pushes to feature-branch PRs.

## What Changes

- Bump `@vanduo-oss/vd3` to `^1.2.3` and refresh the lockfile.
- Always-on navbar frost at opacity `0.78` / blur `32px` (scrolled `40px`).
- Site chrome icons use Phosphor Bold; Icons weight demos stay multi-weight.
- Changelog page: vd3 `v1.2.3` Latest card for `storagePrefix`.
- CONTRIBUTING + `repo-scaffold`: PR-to-`main` is the publish rule; Pages
  still deploys from `main` after merge.

## Capabilities

### New Capabilities

- _None._

### Modified Capabilities

- `docs-build`: dogfood `^1.2.3`
- `docs-content`: chrome frost + Bold icons; changelog 1.2.3 card
- `repo-scaffold`: feature branch + PR publish policy

## Non-goals

- Changing published vd3 package CSS defaults
- Bumping vd3-cbun
- Package-style `dev-vXXX` branch naming for docs
- Enabling GitHub branch protection in this change
