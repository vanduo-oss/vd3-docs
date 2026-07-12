import type { RadiusOption } from "@vanduo-oss/vd3";

/** Where the off-canvas drawer slides in from. Persisted per-user. */
export type Placement = "left" | "right" | "top" | "bottom";

/** Box-shadow presets, mapped to the framework's `--vd-shadow-*` scale. */
export type ShadowLevel = "none" | "sm" | "md" | "lg" | "xl";

/** Glass intensity: off, a stronger frost, or a frost tinted by the primary. */
export type GlassMode = "off" | "frosted" | "tinted";

/** Every knob the customizer can expose. A registry entry lists the subset
 *  that applies to its component (in display order). */
export type KnobId =
  | "variant"
  | "size"
  | "primary"
  | "secondary"
  | "radius"
  | "shadow"
  | "font"
  | "fontSize"
  | "glass"
  | "outline";

/** The full live state of one customization session. Serialized 1:1 into the
 *  preview stage AND the generated code, so what you copy is what you see. */
export interface CustomizerState {
  /** Primary accent, a hex string (`#228be6`). Drives `--vd-color-primary`. */
  primary: string;
  /** Secondary accent, a hex string. Drives `--vd-color-secondary`. */
  secondary: string;
  /** One of RADIUS_OPTIONS (`"0" | "0.125" | … | "0.5"`). */
  radius: RadiusOption;
  shadow: ShadowLevel;
  /** A FONT_OPTIONS key (`"ubuntu" | "system" | …`). */
  font: string;
  /** Font-size multiplier applied to the preview (1 = framework default). */
  fontScale: number;
  glass: GlassMode;
  /** Outline (border) weight in px. 0 = no added outline. */
  outline: number;
  /** Component-specific variant class string (`"vd-btn-primary"`, may be ""). */
  variant: string;
  /** Component-specific size class string (`"vd-btn-sm"`, "" = medium). */
  size: string;
}

/** A selectable option in a segmented control / select. `value` is the class
 *  suffix (or "" for the base) applied to the demo root. */
export interface Choice {
  value: string;
  label: string;
}

/** One customizable component. Everything the shell needs is data — adding a
 *  new component is a single new entry, no shell/store/codegen changes. */
export interface CustomizerEntry {
  /** Registry key, e.g. `"button"`. */
  id: string;
  /** Human label, e.g. `"Button"`. */
  label: string;
  /** Phosphor icon name (without the `ph-` prefix is fine — we add `ph ph-`). */
  icon: string;
  /** Which knobs to render, in order. */
  knobs: KnobId[];
  /** Variant options (empty ⇒ no variant control). */
  variants: Choice[];
  /** Size options (empty ⇒ no size control). */
  sizes: Choice[];
  /** Seed values merged over the base defaults when this entry opens. */
  defaults: Partial<CustomizerState>;

  /** Demo root tag: `"button" | "span" | "div"`. */
  tag: string;
  /** Class string for the demo root for a given state (base + variant + glass). */
  rootClass: (s: CustomizerState) => string;
  /** Inner HTML of the demo root. Only framework classes + our own literals,
   *  never user free-text ⇒ safe for `v-html`. */
  inner: (s: CustomizerState) => string;

  /** Component-specific CSS the shared engine can't express as a token the
   *  component already reads (bold-outline border-width and box-shadow on
   *  Button/Badge). Scoped under `scope`. Returns "" when nothing extra. */
  extraCss: (s: CustomizerState, scope: string) => string;

  /** Vue component names to import for the generated SFC. */
  vueImports: string[];
  /** The `<template>` body for the generated Vue SFC (root carries `scope`). */
  vueTemplate: (s: CustomizerState, scope: string) => string;
}
