import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import {
  applyPreference,
  defaultPreference,
  loadPreference,
  persistPreference,
  type Palette,
  type RadiusOption,
  type ThemeMode,
  type ThemePreference,
} from "@vanduo-oss/vd3";
import {
  coerceDocsPrimary,
  docsDefaultPrimary,
  isDocsAllowedPrimary,
  type DocsColorScheme,
} from "@/constants/docsPrimary";

/** Docs chrome locks — only primary (and theme mode via switcher) stay user-editable. */
const DOCS_LOCKED_PALETTE = "open-color" as const;
const DOCS_LOCKED_FONT = "nunito";
const DOCS_LOCKED_RADIUS = "0.5" as RadiusOption;

export const useThemeStore = defineStore("theme", () => {
  const prefs = reactive<ThemePreference>(defaultPreference());
  const ready = ref(false);

  // Per-mode default neutral. The engine has a single NEUTRAL default (no
  // NEUTRAL_DARK), so we mirror the package's per-mode default-primary
  // behaviour: stone in light, charcoal in dark, auto-following the mode while
  // the neutral is still one of those two defaults — an explicit pick
  // (slate / gray / zinc / neutral) sticks across mode changes.
  const DOCS_NEUTRAL = { light: "stone", dark: "charcoal" } as const;
  const resolveScheme = (theme: ThemeMode): DocsColorScheme =>
    theme === "system"
      ? typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : (theme as DocsColorScheme);
  const docsDefaultNeutral = (theme: ThemeMode): string =>
    DOCS_NEUTRAL[resolveScheme(theme)];
  // Auto-primary follows docs defaults (Ink in light, green in dark). An
  // explicit hue or Ink sticks across reloads and theme flips.
  const isDocsDefaultPrimary = (
    primary: string,
    scheme: DocsColorScheme,
  ): boolean =>
    primary === docsDefaultPrimary(scheme) ||
    !isDocsAllowedPrimary(primary, scheme);

  /** Force palette / font / radius / neutral to docs defaults (primary untouched). */
  const applyDocsLockedPrefs = (): void => {
    prefs.palette = DOCS_LOCKED_PALETTE;
    prefs.font = DOCS_LOCKED_FONT;
    prefs.radius = DOCS_LOCKED_RADIUS;
    prefs.neutral = docsDefaultNeutral(prefs.theme);
  };

  const commit = (): void => {
    const scheme = resolveScheme(prefs.theme);
    const intended = coerceDocsPrimary(prefs.primary, scheme);
    applyPreference(prefs);
    // Package `applyPreference` remaps PRIMARY_LIGHT/DARK values to the
    // scheme default. Re-assert the docs-allowed primary for the docs shell.
    prefs.primary = intended;
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-primary", prefs.primary);
    }
    persistPreference(prefs);
  };

  const syncDocsPrimary = (): void => {
    const scheme = resolveScheme(prefs.theme);
    if (isDocsDefaultPrimary(prefs.primary, scheme)) {
      prefs.primary = docsDefaultPrimary(scheme);
    } else {
      prefs.primary = coerceDocsPrimary(prefs.primary, scheme);
    }
  };

  /** Hydrate from localStorage; call once on the client after mount. */
  const init = (): void => {
    if (ready.value) return;
    Object.assign(prefs, loadPreference());
    applyDocsLockedPrefs();
    syncDocsPrimary();
    commit();
    ready.value = true;

    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function"
    ) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (!mq || typeof mq.addEventListener !== "function") return;
      mq.addEventListener("change", () => {
        // Re-evaluate the auto-default primary/neutral when the OS scheme flips.
        let dirty = false;
        if (prefs.theme === "system") {
          const scheme = resolveScheme("system");
          if (isDocsDefaultPrimary(prefs.primary, scheme)) {
            prefs.primary = docsDefaultPrimary(scheme);
            dirty = true;
          }
          prefs.neutral = docsDefaultNeutral("system");
          dirty = true;
        }
        if (dirty) commit();
      });
    }
  };

  const setPalette = (palette: Palette): void => {
    prefs.palette = palette;
    commit();
  };
  const setTheme = (theme: ThemeMode): void => {
    // Keep the auto-default primary/neutral in step with the chosen scheme.
    const nextScheme = resolveScheme(theme);
    if (isDocsDefaultPrimary(prefs.primary, resolveScheme(prefs.theme))) {
      prefs.primary = docsDefaultPrimary(nextScheme);
    }
    prefs.theme = theme;
    prefs.neutral = docsDefaultNeutral(theme);
    commit();
  };
  const setPrimary = (primary: string): void => {
    prefs.primary = coerceDocsPrimary(primary, resolveScheme(prefs.theme));
    commit();
  };
  const setNeutral = (neutral: string): void => {
    prefs.neutral = neutral;
    commit();
  };
  const setRadius = (radius: RadiusOption): void => {
    prefs.radius = radius;
    commit();
  };
  const setFont = (font: string): void => {
    prefs.font = font;
    commit();
  };
  const reset = (): void => {
    Object.assign(prefs, defaultPreference());
    applyDocsLockedPrefs();
    prefs.primary = docsDefaultPrimary(resolveScheme(prefs.theme));
    commit();
  };

  return {
    prefs,
    ready,
    palette: computed(() => prefs.palette),
    theme: computed(() => prefs.theme),
    primary: computed(() => prefs.primary),
    neutral: computed(() => prefs.neutral),
    radius: computed(() => prefs.radius),
    font: computed(() => prefs.font),
    init,
    setPalette,
    setTheme,
    setPrimary,
    setNeutral,
    setRadius,
    setFont,
    reset,
  };
});
