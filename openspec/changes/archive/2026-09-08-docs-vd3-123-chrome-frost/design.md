## Decisions

1. **Opacity ladder:** Chess uses `0.88` / `40px` always-on. Docs keep
   frost strength at `0.78` / `40px` **when scrolled** only — transparent
   at rest (stock vd3 scroll-activated glass).
2. **Scroll-activated frost:** Do not force frost before scroll. Light
   scrolled glass is opaque/neutral (no primary tint). Dark scrolled glass
   tints with docs `--vd-color-primary` (green), not a violet `30 30 45`
   base.
3. **Bold chrome only:** `ph-bold` for shell/sidebar/triggers; Icons page
   weight demos keep explicit weights; remap vd3 theme-switcher `.ph` glyphs
   to Phosphor-Bold inside navbar actions.
4. **PR publish:** Feature branches (`docs/…`) → PR → merge to `main`. No
   direct pushes to `main` for normal work. Deploy workflows unchanged
   (still fire on `main`).
