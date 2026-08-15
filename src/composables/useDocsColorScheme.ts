import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  type ComputedRef,
  type Ref,
} from "vue";
import type { DockRadius, DockTint } from "@vanduo-oss/vd3";

/** Docs demo/home dock radius — 2 (one step below pill). Package default stays 1.25. */
export const DOCS_DOCK_RADIUS = "2" as const satisfies DockRadius;

export type DocsColorScheme = "light" | "dark";

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

/** Light = ink (no tint / black frost). Dark = OC-8 green swatch. */
export function docsDockTint(scheme: DocsColorScheme): DockTint | "" {
  return scheme === "dark" ? "green" : "";
}

/**
 * Reactive scheme + default dock tint. Updates when the navbar/package
 * switcher flips `data-theme`, or when OS scheme changes under `system`.
 */
export function useDocsColorScheme(): {
  scheme: Ref<DocsColorScheme>;
  dockTint: ComputedRef<DockTint | "">;
} {
  const scheme = ref<DocsColorScheme>(readDocsColorScheme());
  const dockTint = computed(() => docsDockTint(scheme.value));

  let mq: MediaQueryList | null = null;
  let mo: MutationObserver | null = null;

  const sync = (): void => {
    scheme.value = readDocsColorScheme();
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
        attributeFilter: ["data-theme"],
      });
    }
  });

  onUnmounted(() => {
    mq?.removeEventListener("change", sync);
    mo?.disconnect();
  });

  return { scheme, dockTint };
}
