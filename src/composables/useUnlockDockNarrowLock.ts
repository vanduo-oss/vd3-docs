import { onBeforeUnmount } from "vue";
import { DOCK_NARROW_QUERY } from "@vanduo-oss/vd3";

const NATIVE_KEY = "__vdDocsNativeMatchMedia";
const NEVER_NARROW = "(max-width: 0px)";

type DocsWindow = Window & {
  [NATIVE_KEY]?: typeof window.matchMedia;
};

/**
 * VdDock keys the 520px phone lock off window.matchMedia. This playground
 * is contained, so remap that query to one that never matches. Restore on
 * leave so home / other pages keep the real lock.
 */
export function useUnlockDockNarrowLock(): void {
  if (typeof window === "undefined") return;
  const win = window as DocsWindow;
  const current = win.matchMedia;
  if (typeof current !== "function") return;

  const native = win[NATIVE_KEY] ?? current;
  win[NATIVE_KEY] = native;

  const patched: typeof current = (query: string) =>
    native.call(win, query === DOCK_NARROW_QUERY ? NEVER_NARROW : query);

  win.matchMedia = patched;

  onBeforeUnmount(() => {
    if (win.matchMedia !== patched) return;
    win.matchMedia = native;
    delete win[NATIVE_KEY];
  });
}
