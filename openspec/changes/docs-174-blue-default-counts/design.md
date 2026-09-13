## Defaults

`blue` is the published `PRIMARY_COLORS` key (customizer name “Blue”), not a
hex. Both `PRIMARY_LIGHT` and `PRIMARY_DARK` are set so the existing
per-scheme API stays; first-visit users no longer flip Ink ↔ green.

Persisted hues (including former auto-defaults `black` / `green`) stay
explicit. Dark+green logo-stop pins in `docs.css` remain for users who pick
green.

## Counts

- **63** = `export { default as Vd* }` in `@vanduo-oss/vd3@1.7.2`.
- **39** = composable modules re-exported from that barrel.
- Landing “reference pages” / “guided walkthroughs” come from `nav.ts`
  (Components tab minus Guides, and the Guides category).
