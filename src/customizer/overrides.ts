/**
 * The override engine. Maps a {@link CustomizerState} to the exact set of
 * `--vd-*` custom-property overrides (plus a real `font-family`) that retint /
 * reshape a demo — and nothing else. This is the single source of truth shared
 * by the live preview (bound as inline `:style` on the stage wrapper) and the
 * code generator (serialized into a scoped CSS block), so the copied snippet
 * always reproduces the preview.
 *
 * Why leaf tokens, not ramp anchors: a custom property's `var()` is substituted
 * at the element where it is declared (`:root`) and the *resolved* value
 * inherits down. Overriding an intermediate like `--vd-primary-5` or
 * `--vd-radius-fib-5` on a wrapper does NOT flow into the `:root`-baked
 * `--vd-color-primary` / `--vd-btn-border-radius` that components actually read.
 * So we override the leaf tokens each component consumes, with concrete values —
 * verified against @vanduo-oss/framework css (buttons/badges/cards/tokens).
 */
import type { CustomizerState, ShadowLevel } from "./types";

export type StyleMap = Record<string, string>;

/** `color-mix()` toward black/white (shade/tint) or transparent (alpha). */
const mix = (
  hex: string,
  toward: "black" | "white" | "transparent",
  pct: number,
): string =>
  toward === "transparent"
    ? `color-mix(in srgb, ${hex} ${pct}%, transparent)`
    : `color-mix(in srgb, ${hex}, ${toward} ${pct}%)`;

/**
 * All leaf color tokens a demo reads for one accent role, derived from a single
 * hex via `color-mix`. Emitting the alpha leaves explicitly is required: dark
 * mode hardcodes them to the default blue (tokens.css), so relying on the
 * framework's own `color-mix` would leave ghost/subtle states un-retinted.
 */
export function colorVars(
  role: "primary" | "secondary",
  hex: string,
): StyleMap {
  const vars: StyleMap = {
    [`--vd-color-${role}`]: hex,
    [`--vd-color-${role}-hover`]: mix(hex, "black", 8),
    [`--vd-color-${role}-dark`]: mix(hex, "black", 16),
    [`--vd-color-${role}-active`]: mix(hex, "black", 16),
    [`--vd-color-${role}-light`]: mix(hex, "white", 30),
    [`--vd-color-${role}-alpha-10`]: mix(hex, "transparent", 10),
    [`--vd-color-${role}-alpha-20`]: mix(hex, "transparent", 20),
  };
  // The Card "glow" variant reads dedicated leaf tokens (not the alpha vars).
  // Only the primary accent drives the glow.
  if (role === "primary") {
    vars["--vd-card-glow-color"] = mix(hex, "white", 55);
    vars["--vd-card-glow-border-color"] = mix(hex, "white", 40);
  }
  return vars;
}

/**
 * Literal fibonacci radius values, transcribed from the framework's
 * `[data-radius]` blocks (helpers.css). Keyed by RADIUS_OPTIONS value → the
 * three fib steps components consume: fib-3 (sm/badge), fib-5 (btn), fib-8
 * (lg/card). Emitting literals keeps the copied CSS self-contained (no
 * `data-radius` attribute required on the target element).
 */
const FIB: Record<string, { s: string; m: string; l: string }> = {
  "0": { s: "0", m: "0", l: "0" },
  "0.125": { s: "0.09375rem", m: "0.15625rem", l: "0.25rem" },
  "0.25": { s: "0.1875rem", m: "0.3125rem", l: "0.5rem" },
  "0.375": { s: "0.28125rem", m: "0.46875rem", l: "0.75rem" },
  "0.5": { s: "0.375rem", m: "0.625rem", l: "1rem" },
};

/** Redeclare the component radius leaf tokens as literal rem for the subtree. */
export function radiusVars(radius: string): StyleMap {
  const f = FIB[radius] ?? FIB["0.5"];
  return {
    "--vd-btn-border-radius": f.m,
    "--vd-btn-border-radius-sm": f.s,
    "--vd-btn-border-radius-lg": f.l,
    "--vd-badge-border-radius": f.s,
    "--vd-card-border-radius": f.l,
  };
}

/**
 * Card shadow. `.vd-card` paints `--vd-card-shadow`; `.vd-card-elevated` paints
 * `--vd-card-shadow-elevated` — override both so the knob works across variants.
 * Button/Badge have no default shadow, so their shadow is applied via the
 * per-entry `extraCss` (a real `box-shadow` rule) instead.
 */
export function shadowVars(level: ShadowLevel): StyleMap {
  const value = level === "none" ? "none" : `var(--vd-shadow-${level})`;
  return {
    "--vd-card-shadow": value,
    "--vd-card-shadow-elevated": value,
  };
}

/** Font stacks mirroring the framework's `[data-font]` blocks (typography.css). */
const FONT_STACKS: Record<string, string> = {
  system: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  ubuntu: "'Ubuntu', -apple-system, BlinkMacSystemFont, sans-serif",
  lato: "'Lato', -apple-system, BlinkMacSystemFont, sans-serif",
  "open-sans": "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  "jetbrains-mono": "'JetBrains Mono', monospace",
};

/**
 * Font. Buttons read `--vd-font-family-sans`; Badge/Card text has no
 * `font-family` of its own and only inherits the resolved body font, so we also
 * set a real `font-family` on the wrapper for it to cascade to.
 */
export function fontVars(fontKey: string): StyleMap {
  const stack = FONT_STACKS[fontKey] ?? FONT_STACKS.system;
  return {
    "--vd-font-family-sans": stack,
    "font-family": "var(--vd-font-family-sans)",
  };
}

/**
 * Font size. A single multiplier scales all three components:
 * - a real `font-size` on the wrapper scales the em-based Badge and the
 *   inherited Card body text;
 * - the Button's rem-based `--vd-btn-font-size*` tokens are scaled explicitly.
 * A multiplier of 1 emits nothing (keeps the framework defaults).
 */
export function fontSizeVars(scale: number): StyleMap {
  if (!scale || scale === 1) return {};
  const s = scale.toFixed(3).replace(/\.?0+$/, "");
  return {
    "font-size": `calc(1rem * ${s})`,
    "--vd-btn-font-size": `calc(var(--vd-font-size-base) * ${s})`,
    "--vd-btn-font-size-sm": `calc(var(--vd-font-size-sm) * ${s})`,
    "--vd-btn-font-size-lg": `calc(var(--vd-font-size-lg) * ${s})`,
  };
}

/**
 * Glass. The default `.vd-card-glass` frost can be hard to see, so both active
 * modes push the blur/saturation up; "tinted" additionally colors the frost
 * with the primary accent. The class itself (`.vd-card-glass[.vd-glass-tinted]`)
 * is added by the registry `rootClass`; these vars only tune it.
 */
export function glassVars(mode: CustomizerState["glass"]): StyleMap {
  if (mode === "off") return {};
  const base: StyleMap = {
    "--vd-glass-blur": "16px",
    "--vd-glass-saturate": "1.9",
  };
  if (mode === "tinted") {
    base["--vd-glass-tint"] = "var(--vd-color-primary-alpha-20)";
  }
  return base;
}

/**
 * Outline weight. For the Card this is a pure token override (border
 * width/color). Button/Badge hardcode their 1px border, so their outline is
 * emitted by the per-entry `extraCss` instead. 0 ⇒ no override (defaults kept).
 */
function outlineVars(state: CustomizerState): StyleMap {
  if (!state.outline) return {};
  return {
    "--vd-card-border-width": `${state.outline}px`,
    "--vd-card-border-color": "var(--vd-color-primary)",
  };
}

/**
 * The complete override map for a state. Superset of every leaf token the three
 * components read — tokens a given component ignores are harmless, which keeps
 * the engine component-agnostic. Assembled once, reused by preview and codegen.
 */
export function stageStyle(state: CustomizerState): StyleMap {
  return {
    ...colorVars("primary", state.primary),
    ...colorVars("secondary", state.secondary),
    ...radiusVars(state.radius),
    ...shadowVars(state.shadow),
    ...fontVars(state.font),
    ...fontSizeVars(state.fontScale),
    ...glassVars(state.glass),
    ...outlineVars(state),
  };
}

/** Serialize a style map to a CSS declaration body (2-space indented lines). */
export function styleToCss(style: StyleMap, indent = "  "): string {
  return Object.entries(style)
    .map(([k, v]) => `${indent}${k}: ${v};`)
    .join("\n");
}

/** Serialize a style map to an inline `style="…"` string (for the Vue tab). */
export function styleToInline(style: StyleMap): string {
  return Object.entries(style)
    .map(([k, v]) => `${k}: ${v}`)
    .join("; ");
}
