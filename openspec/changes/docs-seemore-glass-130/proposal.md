## Why

`@vanduo-oss/vd3@1.3.0` ships Seemore Glass (Fibonacci strength steps) and
decorative Surfaces. The docs site needs a flagship Glass page, a Surfaces
effects page, and a homepage story (“See more glass, Seymour!”) so the
material system is discoverable and dogfooded.

## What Changes

- Bump site to **1.2.0**; dogfood `@vanduo-oss/vd3` `^1.3.0` (local `pnpm link`
  allowed until publish).
- Rewrite `/effects/glass` as Seemore Glass flagship (fib explorer, primitives,
  package surfaces, a11y, component integration).
- Add `/effects/surfaces` page + nav entry.
- Homepage post-hero section titled **See more glass, Seymour!** with live
  surface + glass demo and CTAs.
- Changelog card for vd3 1.3.0; refresh visual-parity baselines locally.

## Capabilities

### Modified Capabilities

- `docs-build`: dogfood `^1.3.0`; site version `1.2.0`
- `docs-content`: Seemore Glass page, Surfaces page, homepage story, changelog

## Semver

Docs site minor **1.2.0** (middle bump), release-trained with vd3 1.3.0.

## Non-goals

- Publishing vd3 or opening PRs until local gates pass.
- Enabling GitHub Actions e2e (local Playwright only).
