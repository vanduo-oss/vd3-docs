## ADDED Requirements

### Requirement: the Modal page renders the real VdModal

`src/pages/components/Modal.vue` SHALL import and live-render `VdModal` from
`@vanduo-oss/vd3`, driving it with only the real props (`open`, `title`, `size`
of `sm`/`md`/`lg`, `closeOnBackdrop`) and handling `@update:open` / `@close`. The
page SHALL NOT document a `data-modal` / `data-dismiss` attribute API, SHALL NOT
list `modal:open` / `modal:close` events, and SHALL NOT hand-roll a
`<div class="vd-modal is-open">` dialog. Any CSS-class reference SHALL describe
the DOM the component actually renders (`.vd-modal`, `.vd-modal-open`,
`.vd-modal-backdrop`, `.vd-modal-panel[-sm|-md|-lg]`, `.vd-modal-header`,
`.vd-modal-title`, `.vd-modal-body`, `.vd-modal-footer`).

#### Scenario: the modal page uses the component, not a vanilla attribute API

- **GIVEN** `src/pages/components/Modal.vue` after this change
- **WHEN** its `<script setup>` and template are read
- **THEN** it imports `VdModal` from `@vanduo-oss/vd3`, live-renders it with
  `:open` bound to reactive state and `@update:open` / `@close` closing it, and
  the file contains no `data-modal`, `data-dismiss`, `modal:open`, `modal:close`,
  or `vd-modal is-open` string

#### Scenario: only real modal props and events are documented

- **GIVEN** the Modal page's API-reference tables
- **WHEN** the props / events tables are read
- **THEN** every documented prop is one of `open` / `title` / `size` /
  `closeOnBackdrop` and every documented event is `update:open` or `close`, each
  present on `VdModal` in `@vanduo-oss/vd3`

### Requirement: the Rating page documents the VdRating component API

`src/pages/components/Rating.vue` SHALL present `VdRating` usage through its real
component API — `v-model` (`modelValue`), `:max`, `:size` (`sm`/`lg`),
`:readonly`, and the `@change` / `@update:modelValue` events. It SHALL NOT show a
`data-vd-rating` auto-init snippet, SHALL NOT include a Data-Attributes table for
rating, and SHALL NOT document a `rating:change` event (which `VdRating` never
emits).

#### Scenario: rating snippets and tables use the component API

- **GIVEN** `src/pages/components/Rating.vue` after this change
- **WHEN** its code snippets and API tables are read
- **THEN** no `data-vd-rating` string and no `rating:change` row remain, and the
  documented props/events are exactly those on `VdRating` (`modelValue`, `max`,
  `size`, `readonly`, `name`; emits `update:modelValue` and `change`)

### Requirement: the Tree and Transfer pages document props, not data-attributes

`src/pages/components/Tree.vue` and `src/pages/components/Transfer.vue` SHALL show
their usage snippets as `<VdTree :nodes>` / `<VdTransfer :items>` component
markup and SHALL NOT present `data-vd-tree` / `data-vd-transfer` auto-init markup
or a Data-Attributes table describing such an API. The real `tree:check`,
`tree:toggle`, and `transfer:change` CustomEvents (dispatched by the components)
SHALL be retained in the events tables. Any CSS-class reference SHALL name only
classes the component renders.

#### Scenario: tree/transfer snippets reference the real props

- **GIVEN** the Tree and Transfer pages after this change
- **WHEN** their code snippets and reference tables are read
- **THEN** each page live-renders its component with the `:nodes` / `:items`
  prop, contains no `data-vd-tree` / `data-vd-transfer` string and no
  Data-Attributes table, and still documents the real
  `tree:check` / `tree:toggle` / `transfer:change` events

### Requirement: the exported form/group components are dogfooded

`src/pages/components/ButtonGroups.vue` SHALL live-render `VdButtonGroup` and
`src/pages/components/Forms.vue` SHALL live-render `VdCheckboxGroup`,
`VdRadioGroup`, and `VdSelect`, each imported from `@vanduo-oss/vd3`. Every
prop / emit / slot documented for these components SHALL exist on the installed
`@vanduo-oss/vd3` source — no invented API.

#### Scenario: the four previously-unrendered exports are shown live

- **GIVEN** the Button-Groups and Forms pages after this change
- **WHEN** their templates are read
- **THEN** `VdButtonGroup`, `VdCheckboxGroup`, `VdRadioGroup`, and `VdSelect` are
  each imported from `@vanduo-oss/vd3` and rendered in at least one demo, with API
  tables listing only real props (`VdButtonGroup`: `size`/`vertical`/`fullWidth`;
  the group inputs: `options`/`modelValue`/`name` and their optional
  `inline`/`size`/`disabled`; `VdSelect`: `modelValue`/`options` plus optional
  `name`/`id`/`placeholder`/`disabled`/`required`)

### Requirement: the customizer emits valid, preview-matching Vue code

`src/customizer/registry.ts` and `src/customizer/codegen.ts` SHALL generate a
copy-ready Vue SFC that typechecks against the real component prop types and
reproduces the live preview. CSS-only looks (button `outline-*` / `ghost-*`,
badge `outlined`, card `outlined` / `filled` / `glow`, and the glass
`vd-card-glass` / `vd-glass-tinted` modifiers) SHALL be emitted as classes on the
element's `class` attribute, not as component props. Only props that exist on the
components SHALL be emitted: `VdButton` `variant` (limited to `primary` /
`secondary`) and `size`; `VdBadge` `variant` (`primary` / `secondary`) and
`pill`; `VdCard` `elevated`.

#### Scenario: generated SFC contains valid props and the preview classes

- **GIVEN** a customizer state that selects an outlined/ghost/glass look
- **WHEN** `toVueSfc(entry, state, scope)` runs for the button, badge, and card
  entries
- **THEN** the emitted template contains no `variant="outline-primary"` /
  `variant="ghost-primary"` and no non-existent Card/Badge props, and instead
  carries the corresponding `vd-btn-outline-primary` / `vd-badge-outlined` /
  `vd-card-outlined` / `vd-card-glass` classes on the element — matching the
  preview's `rootClass`

#### Scenario: a unit test guards the codegen output

- **GIVEN** `tests/unit/customizer-codegen.spec.ts`
- **WHEN** `pnpm test` runs
- **THEN** the test asserts the generated button/badge/card SFCs contain only
  valid props and the expected CSS classes, and it passes

### Requirement: docs prose carries no dual-engine vanilla framing

The Theme Customizer guide (`src/pages/guides/ThemeCustomizerGuide.vue`) SHALL
list the real persisted `localStorage` keys — `vanduo-palette`,
`vanduo-primary-color`, `vanduo-neutral-color`, `vanduo-radius`,
`vanduo-font-preference`, `vanduo-theme-preference`. Across the touched pages
(`Badge.vue`, `Button.vue`, `Primitives.vue`, and comments in `Tree.vue` /
`Transfer.vue` / `Modal.vue`) "Vanilla-only" / "engine-specific" dual-engine
framing SHALL be removed, reworded to name CSS-only classes that ship in vd3's
CSS. `app.css` SHALL remain shell/layout-only.

#### Scenario: the guide lists the real storage keys

- **GIVEN** `src/pages/guides/ThemeCustomizerGuide.vue` after this change
- **WHEN** its persistence snippet is read
- **THEN** it names the six real keys and no longer lists `vanduo-theme`,
  `vanduo-primary`, `vanduo-neutral`, or `vanduo-font`

#### Scenario: no "Vanilla"/"engine-specific" framing remains on the touched pages

- **GIVEN** the touched component pages after this change
- **WHEN** they are grepped for `Vanilla` / `engine-specific`
- **THEN** no dual-engine framing remains; CSS-only class notes describe the
  classes as shipping in vd3's CSS rather than as a second-engine API
