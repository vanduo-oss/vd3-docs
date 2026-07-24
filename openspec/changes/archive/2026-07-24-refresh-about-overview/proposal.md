## Why

The `/about` page still carried the pre-strip vd2 clone's "The Shape of the Water" founder's message — long-form, dual-line/mission framing that no longer matches the standalone vd3 line. It reads as legacy marketing rather than a useful description of what the package is.

## What Changes

- **Rewrite the `/about` page** ([src/pages/about.vue](../../../src/pages/about.vue)) as a concise, plain-language overview of the vd3 line: *What it is*, *How it's built*, *What you get*, *Open source*. Content describes only real facts about `@vanduo-oss/vd3` and `@vanduo-oss/vd3-cbun` (single package, Vue-3-only peer, tokens + CSS + `Vd*` components + `useX` composables, `data-*` theming, SSR-safety, the cbun canvas bundle) — no invented APIs, no vanilla-engine references.
- Replace the bespoke `.founders-message*` markup/styles with a lighter `.about-intro*` layout (scoped styles only; no `app.css` shell changes).
- **Update `/about` search keywords** in [src/nav.ts](../../../src/nav.ts) from `["about","vanduo","mission"]` to `["about","vanduo","vd3","overview"]`.

Routes: the `/about` route is **changed** (content/markup); none added or removed.

## Capabilities

### New Capabilities
<!-- None. -->

### Modified Capabilities
- `docs-content`: adds a requirement fixing the `/about` page's content to the vd3 overview (previously unspecified / carried vd2 founder copy).

## Non-goals

- No new route, no nav-tree structure change (only the `/about` keyword list).
- No `app.css` / shell/layout changes; all styling stays scoped to `about.vue`.
- No component/API additions and no vd3/vd3-cbun package change — this is docs-site content only, so no changelog entry.
- Not a redesign of any other page.

## Impact

- Files: `src/pages/about.vue` (content + scoped styles), `src/nav.ts` (keywords).
- The committed Playwright visual baseline for `/about` (`vd3-about-*`) must be refreshed since the page markup changed.
- No runtime deps, no API surface, no route/nav-structure change.
