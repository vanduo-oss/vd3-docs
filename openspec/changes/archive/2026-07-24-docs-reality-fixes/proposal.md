## Why

Several component pages and the customizer still document a **nonexistent
vanilla auto-init API** and props that the published `@vanduo-oss/vd3` (`^1.0.0`)
components do not expose — a dogfooding + "no invented APIs / no vanilla-engine
references" violation. Concretely:

- **Modal** never renders `VdModal`; it hand-rolls `<div class="vd-modal is-open">`
  and documents `data-modal="#id"` / `data-dismiss="modal"` triggers and a
  `modal:open` / `modal:close` events table that the real component does not have.
- **Rating** documents a `data-vd-rating` auto-init attribute API and a
  `rating:change` event; `VdRating` is a Vue component (`v-model`, `:max`,
  `:size`, `:readonly`) that emits `update:modelValue` / `change`.
- **Tree** / **Transfer** live-render the real components but their code snippets
  and Data-Attributes tables show `data-vd-tree` / `data-vd-transfer` auto-init
  markup that no processor consumes.
- **ButtonGroups** / **Forms** teach only raw classes and never render four
  exported components: `VdButtonGroup`, `VdCheckboxGroup`, `VdRadioGroup`,
  `VdSelect`.
- The **customizer codegen** emits `variant="outline-primary"` /
  `variant="ghost-primary"` on `VdButton` (whose `Variant` is
  `StatusVariant | "ghost"`) and drops the Badge "Outlined" and Card
  `outlined` / `filled` / `glow` / glass looks entirely, so the "copy-ready" SFC
  neither typechecks nor matches the live preview.
- The **Theme Customizer guide** lists the wrong `localStorage` keys.
- Assorted pages carry leftover dual-engine "Vanilla" framing.

## What Changes

- **Modal.vue**: render the real `<VdModal :open :title :size :close-on-backdrop
  @update:open @close>` with body/`#footer` slots; drop the `data-modal` /
  `data-dismiss` rows, the `modal:open` / `modal:close` events table, the
  hand-rolled `.vd-modal.is-open` markup, and the vanilla comments; rewrite the
  CSS-class table to the panel-based DOM the component actually renders
  (`.vd-modal-panel`, `.vd-modal-backdrop`, `.vd-modal-open`).
- **Rating.vue**: replace the `data-vd-rating` snippets + Data-Attributes table
  with the real component API (`v-model`, `:max`, `:size`, `:readonly`,
  `@change`); fix the "all via data attributes" prose; delete the `rating:change`
  events table.
- **Tree.vue** / **Transfer.vue**: swap the `data-vd-*` HTML snippets for
  `<VdTree :nodes>` / `<VdTransfer :items>` markup, drop the Data-Attributes
  tables, and reword the "single JSON data attribute" prose to the props. The
  real `tree:check` / `tree:toggle` / `transfer:change` CustomEvents are kept.
- **ButtonGroups.vue** / **Forms.vue**: add live `<VdButtonGroup>` and
  `<VdCheckboxGroup>` / `<VdRadioGroup>` / `<VdSelect>` demos with verbatim API
  tables.
- **customizer** (`registry.ts` + `codegen.ts`): emit CSS-only looks as classes
  (`vd-btn-outline-primary`, `vd-badge-outlined`, `vd-card-outlined`,
  `vd-card-glass` / `vd-glass-tinted`, …) on the element's `class`, keeping only
  props that exist (`variant` primary/secondary, `size`, `pill`, `elevated`), so
  the generated SFC typechecks and mirrors the preview. A new unit test asserts
  this.
- **ThemeCustomizerGuide.vue**: correct the persisted `localStorage` keys to the
  real six (`vanduo-palette`, `vanduo-primary-color`, `vanduo-neutral-color`,
  `vanduo-radius`, `vanduo-font-preference`, `vanduo-theme-preference`).
- **Badge.vue** / **Button.vue** / **Primitives.vue** (+ comments in Tree /
  Transfer / Modal): relabel "Vanilla-only" as "CSS-only classes (not wrapped as
  props)" and remove the dual-engine data-attribute framing, keeping the useful
  fact that the classes ship in vd3's CSS.

Pages changed (no routes added / removed): `components/Modal`, `components/Rating`,
`components/Tree`, `components/Transfer`, `components/Button-Groups`,
`components/Forms`, `components/Badge`, `components/Button`,
`components/Primitives`, `guides/ThemeCustomizerGuide`. Because page markup
changes, the Playwright visual baselines for the affected routes are regenerated.

## Non-goals

- No routes/pages/nav entries added, changed, or removed (`nav.ts` is untouched).
- No change to any published package (`@vanduo-oss/vd3` / `@vanduo-oss/vd3-cbun`);
  this is docs-only and dogfoods the installed `^1.0.0` / `^1.2.0` packages.
- No new component-specific rules in `app.css` (stays shell/layout-only).
- No changelog entry — the changelog tracks package releases only, never
  docs-site content.

## Capabilities

### New Capabilities
- _None._

### Modified Capabilities
- `docs-content`: adds requirements that the Modal, Rating, Tree, Transfer,
  Button-Groups, Forms, and customizer surfaces document only the real published
  vd3 API with no vanilla-engine references.

## Impact

- Pages: `src/pages/components/{Modal,Rating,Tree,Transfer,ButtonGroups,Forms,Badge,Button,Primitives}.vue`,
  `src/pages/guides/ThemeCustomizerGuide.vue`.
- Customizer: `src/customizer/registry.ts`, `src/customizer/codegen.ts`.
- Tests: new `tests/unit/customizer-codegen.spec.ts`.
- Visual baselines: regenerated for the affected component/guide routes.
