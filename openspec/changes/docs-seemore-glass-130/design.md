## Context

vd3 1.3.0 introduces Seemore Glass fib steps and `.vd-surface*` utilities.
Docs currently embed one-off mesh/stripe/noise CSS inside `Glass.vue`.

## Decisions

1. Glass demos use package `.vd-surface-*` classes — no private stage CSS for
   the three original patterns (extras may still use package variants).
2. Homepage Seemore section sits **after** the hero (hero budget preserved).
3. Surfaces get their own Effects nav entry next to Glass.
4. Local dogfood via `pnpm link ../vd3` until 1.3.0 is published; OpenSpec
   already permits temporary link.

## Risks

Visual baselines for `/`, `/effects/glass`, and new `/effects/surfaces` will
need full local refresh.
