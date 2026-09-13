import { PRIMARY_COLORS } from "@vanduo-oss/vd3";

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

/**
 * Fan hues from The Daily Accretion dock customizer. Filtered through
 * `PRIMARY_COLORS` so blades stay in package rainbow order.
 */
export const DOCS_FAN_HUES = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
  "sky",
  "blue",
  "violet",
  "purple",
  "pink",
  "rose",
] as const;

const FAN_HUE_SET = new Set<string>(DOCS_FAN_HUES);

const FAN_PRIMARY_COLORS = PRIMARY_COLORS.filter((c) => FAN_HUE_SET.has(c.key));

const BLACK_PRIMARY = PRIMARY_COLORS.find((c) => c.key === "black");

/** Accretion fan hues (12) — shared base for swatches / tests. */
export const DOCS_PRIMARY_COLORS = FAN_PRIMARY_COLORS;

const INK_SWATCH: DocsPrimarySwatch = {
  key: "black",
  name: "Ink",
  color: BLACK_PRIMARY?.color ?? "#000000",
};

export function isDocsAllowedPrimary(
  key: string,
  _scheme: DocsColorScheme,
): boolean {
  if (FAN_HUE_SET.has(key)) return true;
  return key === "black";
}

export function coerceDocsPrimary(
  key: string,
  scheme: DocsColorScheme,
): string {
  return isDocsAllowedPrimary(key, scheme) ? key : docsDefaultPrimary(scheme);
}

/**
 * Keys for the package swatches fan — Ink plus the twelve accretion hues. The
 * fan renders in `PRIMARY_COLORS` order regardless of the order given here,
 * which is the same order `docsPrimarySwatches()` produces.
 */
export const DOCS_PRIMARY_SWATCH_KEYS: readonly string[] = [
  "black",
  ...FAN_PRIMARY_COLORS.map((c) => c.key),
];

/**
 * Customizer swatches: Ink (black) + twelve accretion hues in both schemes.
 */
export function docsPrimarySwatches(
  _scheme: DocsColorScheme,
): DocsPrimarySwatch[] {
  const hues = FAN_PRIMARY_COLORS.map((c) => ({
    key: c.key,
    name: c.name,
    color: c.color,
  }));
  return [INK_SWATCH, ...hues];
}
