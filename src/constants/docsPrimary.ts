import { PRIMARY_COLORS, getStoragePrefix } from "@vanduo-oss/vd3";

export type DocsColorScheme = "light" | "dark";

export type DocsPrimarySwatch = {
  key: string;
  name: string;
  color: string;
};

export type DocsSchemePrimaries = {
  light: string;
  dark: string;
};

/** Light-mode docs first-visit default — Ink (`black`). */
export const DOCS_DEFAULT_PRIMARY_LIGHT = "black";

/** Dark-mode docs first-visit default — logo green. */
export const DOCS_DEFAULT_PRIMARY_DARK = "green";

/**
 * Former shared docs default written to the single `vanduo-primary-color` key.
 * Legacy `blue` is treated as unset so first-visit remapping can run.
 */
export const DOCS_LEGACY_SHARED_PRIMARY = "blue";

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

export function docsPrimaryStorageKeys(prefix: string = getStoragePrefix()): {
  current: string;
  light: string;
  dark: string;
} {
  return {
    current: `${prefix}primary-color`,
    light: `${prefix}primary-color-light`,
    dark: `${prefix}primary-color-dark`,
  };
}

const readStorage = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(key);
    return value && value.length > 0 ? value : null;
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage may be unavailable (private mode, quota) */
  }
};

export function defaultDocsSchemePrimaries(): DocsSchemePrimaries {
  return {
    light: DOCS_DEFAULT_PRIMARY_LIGHT,
    dark: DOCS_DEFAULT_PRIMARY_DARK,
  };
}

/**
 * Resolve per-scheme primaries. Prefers `vanduo-primary-color-light` /
 * `vanduo-primary-color-dark`. A lone legacy `vanduo-primary-color` is the
 * current scheme's pick unless it is still the old shared `blue` default.
 */
export function hydrateDocsSchemePrimaries(
  scheme: DocsColorScheme,
): DocsSchemePrimaries {
  const keys = docsPrimaryStorageKeys();
  const storedLight = readStorage(keys.light);
  const storedDark = readStorage(keys.dark);

  if (storedLight != null || storedDark != null) {
    return {
      light: coerceDocsPrimary(
        storedLight ?? DOCS_DEFAULT_PRIMARY_LIGHT,
        "light",
      ),
      dark: coerceDocsPrimary(storedDark ?? DOCS_DEFAULT_PRIMARY_DARK, "dark"),
    };
  }

  const legacy = readStorage(keys.current);
  if (legacy == null || legacy === DOCS_LEGACY_SHARED_PRIMARY) {
    return defaultDocsSchemePrimaries();
  }

  const defaults = defaultDocsSchemePrimaries();
  defaults[scheme] = coerceDocsPrimary(legacy, scheme);
  return defaults;
}

export function persistDocsSchemePrimaries(pair: DocsSchemePrimaries): void {
  const keys = docsPrimaryStorageKeys();
  writeStorage(keys.light, pair.light);
  writeStorage(keys.dark, pair.dark);
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
