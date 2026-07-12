/**
 * Code generation. Turns a {@link CustomizerState} into a copy-ready Vue SFC
 * that reproduces the live preview exactly, because both consume the same
 * {@link stageStyle} override map. All overrides are emitted as concrete values
 * scoped under one class, so a pasted snippet is self-contained regardless of
 * the page's global `data-*` theme context.
 */
import { stageStyle, styleToCss } from "./overrides";
import type { CustomizerEntry, CustomizerState } from "./types";

/** `.my-demo` → `my-demo` (class attribute form). */
const scopeName = (scope: string): string => scope.replace(/^\./, "");

/** A full Vue SFC using the Vd* components, with an unscoped style block so the
 *  override rules reach the component internals. */
export function toVueSfc(
  entry: CustomizerEntry,
  state: CustomizerState,
  scope: string,
): string {
  const imports = entry.vueImports.join(", ");
  const template = entry.vueTemplate(state, scopeName(scope));
  const css =
    `${scope} {\n${styleToCss(stageStyle(state))}\n}\n` +
    entry.extraCss(state, scope);

  return `<script setup lang="ts">
import { ${imports} } from "@vanduo-oss/vd3";
</${"script"}>

<template>
${template}
</template>

<!-- Unscoped so the overrides reach the component internals; rename .${scopeName(
    scope,
  )} freely. -->
<style>
${css.trimEnd()}
</style>
`;
}
