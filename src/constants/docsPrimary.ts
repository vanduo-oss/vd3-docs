import { DOCK_TINTS, PRIMARY_COLORS } from "@vanduo-oss/vd3";

export type DocsColorScheme = "light" | "dark";

export type DocsPrimarySwatch = {
  key: string;
  name: string;
  color: string;
};

/** Light-mode docs default — blue accents (dock stays untinted ink frost). */
export const DOCS_DEFAULT_PRIMARY_LIGHT = "blue";

/** Dark-mode docs default — blue (dock tint follows when primary is a DOCK_TINT). */
export const DOCS_DEFAULT_PRIMARY_DARK = "blue";

/**
 * Shared docs default primary. Prefer `docsDefaultPrimary(scheme)` when scheme
 * is known; both schemes currently resolve to blue.
 */
export const DOCS_DEFAULT_PRIMARY = DOCS_DEFAULT_PRIMARY_DARK;

export function docsDefaultPrimary(_scheme: DocsColorScheme): string {
  return DOCS_DEFAULT_PRIMARY;
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
