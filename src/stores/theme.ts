import { defineStore } from "pinia";
import { computed, onScopeDispose, reactive, ref, watch } from "vue";
import {
  applyPreference,
  defaultPreference,
  loadPreference,
  persistPreference,
  useThemePreference,
  type Palette,
  type RadiusOption,
  type ThemeMode,
  type ThemePreference,
} from "@vanduo-oss/vd3";
import {
  coerceDocsPrimary,
  defaultDocsSchemePrimaries,
  hydrateDocsSchemePrimaries,
  persistDocsSchemePrimaries,
  type DocsColorScheme,
  type DocsSchemePrimaries,
} from "@/constants/docsPrimary";

/** Saved site-dock choices and temporary component previews have separate owners.
 * main.ts disables the package singleton's automatic persistence. Its shared
 * state is the active preview; only dock setters below write saved preferences.
 */
export const useThemeStore = defineStore("theme", () => {
  const engine = useThemePreference();
  const prefs = engine.state;
  const ready = ref(false);
  const savedMode = ref<ThemeMode>("system");
  const schemePrimaries = reactive<DocsSchemePrimaries>(
    defaultDocsSchemePrimaries(),
  );
  const DOCS_NEUTRAL = { light: "stone", dark: "charcoal" } as const;
  const resolveScheme = (mode: ThemeMode): DocsColorScheme =>
    mode === "system"
      ? typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;
  const docsDefaultNeutral = (mode: ThemeMode): string =>
    DOCS_NEUTRAL[resolveScheme(mode)];
  const brandPreference = (mode: ThemeMode): ThemePreference => ({
    ...defaultPreference(),
    theme: mode,
    palette: "open-color",
    font: "nunito",
    radius: "0.5",
    neutral: docsDefaultNeutral(mode),
    primary: schemePrimaries[resolveScheme(mode)],
  });

  const stampResolvedScheme = (): void => {
    if (typeof document === "undefined") return;
    const scheme = resolveScheme(prefs.theme);
    const root = document.documentElement;
    if (root.getAttribute("data-theme") !== scheme)
      root.setAttribute("data-theme", scheme);
    root.style.colorScheme = scheme;
  };
  const applyPreview = (): void => {
    // applyPreference auto-remaps generic default primaries. Preserve the active
    // choice here: dock choices are curated; full customizer previews are not.
    const primary = prefs.primary;
    applyPreference(prefs);
    prefs.primary = primary;
    if (typeof document !== "undefined")
      document.documentElement.setAttribute("data-primary", primary);
    stampResolvedScheme();
  };
  const saveDock = (): void => {
    persistPreference(brandPreference(savedMode.value));
    persistDocsSchemePrimaries(schemePrimaries);
  };

  // No broad preference watcher: package controls already apply their fields.
  // Scheme stamping follows their mode without restoring the saved dock mode.
  watch(
    () => prefs.theme,
    (mode) => {
      if (!ready.value) return;
      if (prefs.neutral === "stone" || prefs.neutral === "charcoal")
        prefs.neutral = docsDefaultNeutral(mode);
      applyPreview();
    },
  );

  let mq: MediaQueryList | null = null;
  const onSchemeChange = (): void => {
    if (prefs.theme !== "system") return;
    if (prefs.neutral === "stone" || prefs.neutral === "charcoal")
      prefs.neutral = docsDefaultNeutral("system");
    prefs.primary = schemePrimaries[resolveScheme("system")];
    applyPreview();
  };
  const init = (): void => {
    if (ready.value) return;
    const stored = loadPreference();
    savedMode.value = stored.theme;
    Object.assign(
      schemePrimaries,
      hydrateDocsSchemePrimaries(resolveScheme(savedMode.value)),
    );
    Object.assign(prefs, brandPreference(savedMode.value));
    applyPreview();
    ready.value = true;
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function"
    ) {
      mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener?.("change", onSchemeChange);
    }
  };
  onScopeDispose(() => mq?.removeEventListener?.("change", onSchemeChange));

  const setTheme = (mode: ThemeMode): void => {
    savedMode.value = mode;
    prefs.theme = mode;
    prefs.primary = schemePrimaries[resolveScheme(mode)];
    if (prefs.neutral === "stone" || prefs.neutral === "charcoal")
      prefs.neutral = docsDefaultNeutral(mode);
    applyPreview();
    saveDock();
  };
  const previewPrimary = (primary: string): void => {
    prefs.primary = coerceDocsPrimary(primary, resolveScheme(prefs.theme));
    applyPreview();
  };
  const setPrimary = (primary: string): void => {
    previewPrimary(primary);
    // A hue selected in a temporary demo mode does not persist that mode.
    schemePrimaries[resolveScheme(prefs.theme)] = prefs.primary;
    saveDock();
  };
  const reset = (): void => {
    Object.assign(prefs, brandPreference(savedMode.value));
    applyPreview();
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
    setTheme,
    setPrimary,
    previewPrimary,
    reset,
    setPalette: (value: Palette): void => engine.setPalette(value),
    setNeutral: (value: string): void => engine.setNeutral(value),
    setRadius: (value: RadiusOption): void => engine.setRadius(value),
    setFont: (value: string): void => engine.setFont(value),
  };
});
