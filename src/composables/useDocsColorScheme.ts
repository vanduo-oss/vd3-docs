import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  type ComputedRef,
  type Ref,
} from "vue";
import { DOCK_TINTS, type DockRadius, type DockTint } from "@vanduo-oss/vd3";
import {
  DOCS_DEFAULT_PRIMARY_DARK,
  docsDefaultPrimary,
  type DocsColorScheme,
} from "@/constants/docsPrimary";

export const DOCS_DOCK_TOOLTIP_DELAY_MS = 520;

/** Docs demo/home dock radius — 1.5. Package default stays 1.25. */
export const DOCS_DOCK_RADIUS = "1.5" as const satisfies DockRadius;

export type { DocsColorScheme };

/**
 * Effective light/dark for docs chrome. Same contract as Hex / CBUN hex:
 * `<html data-theme>` from the theme toggle, else `prefers-color-scheme`
 * when the preference is `system` (attribute removed).
 */
export function readDocsColorScheme(): DocsColorScheme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark") return "dark";
  if (attr === "light") return "light";
  if (typeof window.matchMedia !== "function") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function readDocsPrimary(): string {
  const scheme = readDocsColorScheme();
  if (typeof document === "undefined") return docsDefaultPrimary(scheme);
  return (
    document.documentElement.getAttribute("data-primary") ||
    docsDefaultPrimary(scheme)
  );
}

/**
 * Accent hue for dock chrome (active nav icon, --vd-dock-tint). Same in light
 * and dark — only the ink frost background stays untinted.
 */
export function docsDockAccent(
  scheme: DocsColorScheme,
  primary: string = DOCS_DEFAULT_PRIMARY_DARK,
): DockTint | "" {
  if (primary === "black") return "";
  if ((DOCK_TINTS as readonly string[]).includes(primary)) {
    return primary as DockTint;
  }
  const fallback = docsDefaultPrimary(scheme);
  if (fallback === "black") return "";
  if ((DOCK_TINTS as readonly string[]).includes(fallback)) {
    return fallback as DockTint;
  }
  return DOCS_DEFAULT_PRIMARY_DARK;
}

/** Site / story docks always use untinted ink frost. */
export function docsDockBackgroundTint(
  _scheme: DocsColorScheme,
  _primary: string = DOCS_DEFAULT_PRIMARY_DARK,
): DockTint | "" {
  return "";
}

/** @deprecated Use docsDockAccent for icon tint; background is always ink. */
export function docsDockTint(
  scheme: DocsColorScheme,
  primary: string = DOCS_DEFAULT_PRIMARY_DARK,
): DockTint | "" {
  return docsDockBackgroundTint(scheme, primary);
}

/**
 * Reactive scheme + dock tint. Updates when the theme switcher flips
 * `data-theme` / `data-primary`, or when OS scheme changes under `system`.
 */
export function useDocsColorScheme(): {
  scheme: Ref<DocsColorScheme>;
  primary: Ref<string>;
  /** Always "" — ink frost background on site/story docks. */
  dockTint: ComputedRef<DockTint | "">;
  dockAccent: ComputedRef<DockTint | "">;
} {
  const scheme = ref<DocsColorScheme>(readDocsColorScheme());
  const primary = ref<string>(readDocsPrimary());
  const dockTint = computed(() =>
    docsDockBackgroundTint(scheme.value, primary.value),
  );
  const dockAccent = computed(() =>
    docsDockAccent(scheme.value, primary.value),
  );
  let mq: MediaQueryList | null = null;
  let mo: MutationObserver | null = null;

  const sync = (): void => {
    scheme.value = readDocsColorScheme();
    primary.value = readDocsPrimary();
  };

  onMounted(() => {
    sync();
    if (typeof window.matchMedia === "function") {
      mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", sync);
    }
    if (typeof MutationObserver !== "undefined") {
      mo = new MutationObserver(sync);
      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme", "data-primary"],
      });
    }
  });

  onUnmounted(() => {
    mq?.removeEventListener("change", sync);
    mo?.disconnect();
  });

  return { scheme, primary, dockTint, dockAccent };
}
