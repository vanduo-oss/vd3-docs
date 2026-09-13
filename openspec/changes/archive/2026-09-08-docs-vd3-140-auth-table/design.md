# Docs vd3 1.4.0 — design

Auth demos MUST set `framed={false}`. `VdAuthCard` defaults to `VdCover min=screen`,
which would steal the docs layout. Full-page cover is for consuming apps.

API tables are transcribed from package source (`VdLogin.vue`, `VdDataTable.vue`,
`VdInput.vue`, `VdCard.vue`). Invented props are forbidden.

The table page keeps presentational CSS demos so `.vd-table` class consumers
are still documented, and adds a live `VdDataTable` as the Vue 3 path.

The dashboard recipe composes published `@vanduo-oss/vd3-cbun/charts` `VdChart`
above the table — composition only, no new cbun API.
