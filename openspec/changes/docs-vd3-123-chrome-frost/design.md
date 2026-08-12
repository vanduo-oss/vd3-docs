## Decisions

1. **Opacity ladder:** Chess uses `0.88` / `40px`. Docs use `0.78` / `32px`
   (always-on), intensify to `40px` blur when scrolled — more transparent
   than chess, frostier than stock vd3 `0.65`.
2. **Always-on frost:** Override transparent-at-rest `.vd-navbar-glass` so
   the shell matches chess chrome; keep `useNavbarGlassScroll` only for the
   scrolled intensify class.
3. **Bold chrome only:** `ph-bold` for shell/sidebar/triggers; Icons page
   weight demos keep explicit weights; remap vd3 theme-switcher `.ph` glyphs
   to Phosphor-Bold inside navbar actions.
4. **PR publish:** Feature branches (`docs/…`) → PR → merge to `main`. No
   direct pushes to `main`. Deploy workflows unchanged (still fire on `main`).
