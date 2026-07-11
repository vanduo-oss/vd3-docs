import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import {
  applyPreference,
  defaultPreference,
  defaultPrimary,
  isDefaultPrimary,
  loadPreference,
  persistPreference,
  type Palette,
  type RadiusOption,
  type ThemeMode,
  type ThemePreference,
} from "@vanduo-oss/vue";

export const useThemeStore = defineStore("theme", () => {
  const prefs = reactive<ThemePreference>(defaultPreference());
  const ready = ref(false);

  // Per-mode default neutral. The engine has a single NEUTRAL default (no
  // NEUTRAL_DARK), so we mirror the package's per-mode default-primary
  // behaviour: stone in light, charcoal in dark, auto-following the mode while
  // the neutral is still one of those two defaults — an explicit pick
  // (slate / gray / zinc / neutral) sticks across mode changes.
  const DOCS_NEUTRAL = { light: "stone", dark: "charcoal" } as const;
  const resolveScheme = (theme: ThemeMode): "light" | "dark" =>
    theme === "system"
      ? typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : (theme as "light" | "dark");
  const docsDefaultNeutral = (theme: ThemeMode): string =>
    DOCS_NEUTRAL[resolveScheme(theme)];
  const isDocsDefaultNeutral = (neutral: string): boolean =>
    neutral === DOCS_NEUTRAL.light || neutral === DOCS_NEUTRAL.dark;

  const commit = (): void => {
    applyPreference(prefs);
    persistPreference(prefs);
  };

  /** Hydrate from localStorage; call once on the client after mount. */
  const init = (): void => {
    if (ready.value) return;
    Object.assign(prefs, loadPreference());
    if (isDocsDefaultNeutral(prefs.neutral)) {
      prefs.neutral = docsDefaultNeutral(prefs.theme);
    }
    applyPreference(prefs);
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
        if (prefs.theme === "system" && isDefaultPrimary(prefs.primary)) {
          prefs.primary = defaultPrimary("system");
          dirty = true;
        }
        if (prefs.theme === "system" && isDocsDefaultNeutral(prefs.neutral)) {
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
    if (isDefaultPrimary(prefs.primary)) {
      prefs.primary = defaultPrimary(theme);
    }
    if (isDocsDefaultNeutral(prefs.neutral)) {
      prefs.neutral = docsDefaultNeutral(theme);
    }
    prefs.theme = theme;
    commit();
  };
  const setPrimary = (primary: string): void => {
    prefs.primary = primary;
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
