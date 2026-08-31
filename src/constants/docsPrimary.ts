import { DOCK_TINTS, PRIMARY_COLORS } from "@vanduo-oss/vd3";

export type DocsColorScheme = "light" | "dark";

export type DocsPrimarySwatch = {
  key: string;
  name: string;
  color: string;
};

/** Light-mode docs default — Ink (black); dock accent stays grayscale. */
export const DOCS_DEFAULT_PRIMARY_LIGHT = "black";

/** Dark-mode docs default — green (dock tint follows when primary is a DOCK_TINT). */
export const DOCS_DEFAULT_PRIMARY_DARK = "green";

/**
 * Shared docs default primary. Prefer `docsDefaultPrimary(scheme)` when scheme
 * is known.
 */
export const DOCS_DEFAULT_PRIMARY = DOCS_DEFAULT_PRIMARY_DARK;

export function docsDefaultPrimary(scheme: DocsColorScheme): string {
  return scheme === "light"
    ? DOCS_DEFAULT_PRIMARY_LIGHT
    : DOCS_DEFAULT_PRIMARY_DARK;
}

const DOCK_PRIMARY_COLORS = PRIMARY_COLORS.filter((c) =>
  (DOCK_TINTS as readonly string[]).includes(c.key),
);

const BLACK_PRIMARY = PRIMARY_COLORS.find((c) => c.key === "black");

/** Dock-tint hues only (8) — shared base for swatches / tests. */
export const DOCS_PRIMARY_COLORS = DOCK_PRIMARY_COLORS;

const INK_SWATCH: DocsPrimarySwatch = {
  key: "black",
  name: "Ink",
  color: BLACK_PRIMARY?.color ?? "#000000",
};

export function isDocsAllowedPrimary(
  key: string,
  _scheme: DocsColorScheme,
): boolean {
  if ((DOCK_TINTS as readonly string[]).includes(key)) return true;
  return key === "black";
}

export function coerceDocsPrimary(
  key: string,
  scheme: DocsColorScheme,
): string {
  return isDocsAllowedPrimary(key, scheme) ? key : docsDefaultPrimary(scheme);
}

/**
 * Keys for the package swatches fan — black plus the eight dock tints. The fan
 * renders in `PRIMARY_COLORS` order regardless of the order given here, which
 * is the same order `docsPrimarySwatches()` produces.
 */
export const DOCS_PRIMARY_SWATCH_KEYS: readonly string[] = [
  "black",
  ...DOCK_PRIMARY_COLORS.map((c) => c.key),
];

/**
 * Customizer swatches: Ink (black) + eight dock hues in both schemes.
 */
export function docsPrimarySwatches(
  _scheme: DocsColorScheme,
): DocsPrimarySwatch[] {
  const hues = DOCK_PRIMARY_COLORS.map((c) => ({
    key: c.key,
    name: c.name,
    color: c.color,
  }));
  return [INK_SWATCH, ...hues];
}
