## 1. OpenSpec

- [ ] 1.1 Add change artifacts under `openspec/changes/logo-effects-gallery/`
- [ ] 1.2 Run `openspec validate logo-effects-gallery --strict`

## 2. Mark component

- [ ] 2.1 Add `src/components/Vd3Mark.vue` (inline SVG, unique ids, inner/outer hooks)
- [ ] 2.2 Add `src/styles/logo-fx.css` (~30 `data-fx` variants + bloom-spin + reduced-motion)

## 3. Page + wiring

- [ ] 3.1 Add `src/pages/effects/Logo.vue` (featured bloom-spin + grid + Replay)
- [ ] 3.2 Register `/effects/logo` in `src/router.ts` and `src/nav.ts`

## 4. Validate

- [ ] 4.1 `mise exec node@24 -- pnpm build` in `vd3-docs`
- [ ] 4.2 Manual check: bloom-spin sequence, Replay, reduced-motion static pose
