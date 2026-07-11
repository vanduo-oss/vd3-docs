/**
 * Code generation. Turns a {@link CustomizerState} into copy-ready snippets that
 * reproduce the live preview exactly, because both consume the same
 * {@link stageStyle} override map. All overrides are emitted as concrete values
 * scoped under one class, so a pasted snippet is self-contained regardless of
 * the page's global `data-*` theme context.
 */
import { CUSTOMIZER_REGISTRY, renderDemo } from "./registry";
import { stageStyle, styleToCss } from "./overrides";
import type { CustomizerEntry, CustomizerState } from "./types";

export interface VanillaCode {
  html: string;
  css: string;
}

/** `.my-demo` → `my-demo` (class attribute form). */
const scopeName = (scope: string): string => scope.replace(/^\./, "");

/** Indent every line of a block by `pad`. */
const indent = (block: string, pad = "  "): string =>
  block
    .split("\n")
    .map((line) => (line.trim() ? pad + line : line))
    .join("\n");

/** Vanilla HTML (demo wrapped in the scope element) + a scoped CSS override block. */
export function toVanilla(
  entry: CustomizerEntry,
  state: CustomizerState,
  scope: string,
): VanillaCode {
  const demo = renderDemo(entry, state).trim();
  const html = `<div class="${scopeName(scope)}">\n${indent(demo)}\n</div>`;

  const css =
    `${scope} {\n${styleToCss(stageStyle(state))}\n}\n` +
    entry.extraCss(state, scope);

  return { html, css: css.trimEnd() + "\n" };
}

/** A full Vue SFC using the Vd* components, with an unscoped style block so the
 *  override rules reach the component internals (mirrors the Vanilla CSS). */
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
import { ${imports} } from "@vanduo-oss/vue";
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

/** Convenience: generate both engines for an id + state. */
export function generate(
  id: string,
  state: CustomizerState,
  scope: string,
): { vanilla: VanillaCode; vue: string } | null {
  const entry = CUSTOMIZER_REGISTRY[id];
  if (!entry) return null;
  return {
    vanilla: toVanilla(entry, state, scope),
    vue: toVueSfc(entry, state, scope),
  };
}
