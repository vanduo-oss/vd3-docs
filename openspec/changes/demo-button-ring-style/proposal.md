# Demo the button ring modifier — Proposal

## Why

vd3 `1.2.0` adds `.vd-btn-ring` — an opt-in modifier that draws a concentric outer stroke
separated from the button by a transparent gap, for marking one action as the primary one on a
screen already using solid buttons throughout. It layers onto any variant, size and state.

`/components/button` currently documents solid, outline, ghost and icon treatments and knows
nothing about the ring. Since the docs site is how the modifier gets discovered, and since
dogfooding it here is the only way to find out whether it actually holds up next to the rest of
the page, the release is not finished until this page shows it.

The page also carries two tables the modifier must appear in: the class reference (`classRef`)
and the Vue 3 component API (`vue3Api`), which is where the new `ring` prop belongs.

## What

### `/components/button` (`src/pages/components/Button.vue`)

- A new **Ring Buttons** demo card between the existing Ghost Buttons and Icon Buttons cards,
  following their established shape: a `.vd-card.vd-card-glow.demo-card` with a header and a
  body of live buttons, followed by a `DocCodeSnippet`.
- The card demonstrates what the modifier is actually for: the ring composing with the solid
  variants, with an outline and a ghost treatment, and across all three sizes.
- A `.vd-btn-ring` row in the `classRef` table, typed `Modifier` alongside `.vd-btn-icon`.
- A `:ring` row in the `vue3Api` table.
- The intro blurb gains the ring in its list of looks.
- The `vue3Usage` snippet gains a `:ring` example, since that snippet is the page's canonical
  "how do I use this from Vue" block.

### `/changelog` (`src/pages/changelog.vue`)

A `v1.2.0` card in the `@vanduo-oss/vd3` column, taking over the "Latest" marker from `v1.1.0`,
with a `RouterLink` to `/components/button`. Package release only, per changelog policy.

### `src/nav.ts`

The button entry's `keywords` gain `ring` and `outline` so the modifier is reachable from
docs search.

### Live Component Customizer (`src/customizer/` + `src/components/customizer/`)

The drawer launched from `/components/button` via `LaunchCustomizerButton` currently knows
Primary / Secondary / Outline / Ghost only, and its Outline weight slider fakes a thicker
`border-width`. It must gain the real ring modifier:

- A **Ring** on/off toggle (modifier, not a fifth variant segment).
- When ring is on, the preview root carries `.vd-btn-ring`, the generated SFC emits the real
  `ring` prop on `VdButton`, and the existing Outline weight slider drives
  `--vd-btn-ring-width` (labelled **Ring weight**). Flipping ring on seeds the slider to `2px`
  when it was `0`.
- When ring is off, Outline weight keeps today's `border-width` behaviour via `extraCss`.
- A **Width** slider (0.5×–2× horizontal padding) so the preview can be made narrower or
  wider without changing the size tier; scales `--vd-btn-padding-x` / `-sm` / `-lg` and lands
  in the generated CSS only when not at the default `1`.

### Routes

- Added: none.
- Changed: `/components/button`, `/changelog` (content only).
- Removed: none.

### Dependency

`@vanduo-oss/vd3` moves from `^1.1.0` to `^1.2.0`. Because the docs site consumes the published
package, the demo is authored and verified against a local vd3 build and this branch merges once
`1.2.0` is on npm.

## Non-goals

- **No new page and no route changes.** The ring is a button modifier; it belongs on the page
  that already documents buttons.
- **No button-group demo.** vd3 deliberately suppresses the ring inside `.vd-btn-group`, so
  `/components/button-groups` is untouched.
- **No `app.css` changes.** The ring is entirely package CSS; the docs shell adds nothing.
- **No invented API.** The demo uses only `.vd-btn-ring` and the real `ring` prop as shipped.
- **No vd3 package changes.** This branch is docs-only.

## Rollout

1. Land the page changes on `dev-v1.1.3`, verified against a local vd3 `1.2.0` build.
2. Refresh the `/components/button` and `/changelog` visual baselines.
3. Merge once `@vanduo-oss/vd3@1.2.0` is published, so the dependency range resolves.
