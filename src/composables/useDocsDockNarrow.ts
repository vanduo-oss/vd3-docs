import { onUnmounted, ref, type Ref } from "vue";
import { DOCK_NARROW_QUERY } from "@vanduo-oss/vd3";

type UseDocsDockNarrowOptions = {
  /** Runs synchronously when exiting narrow, before isNarrow updates. */
  onExitNarrow?: () => void;
};

/**
 * Tracks whether the viewport matches VdDock's phone lock query (520px).
 * Keep CSS @media for narrow dock in sync with DOCK_NARROW_QUERY.
 *
 * Listener registers during setup (before VdDock onMounted) so optional
 * onExitNarrow can patch storage ahead of the package's restore handler.
 */
export function useDocsDockNarrow(
  options: UseDocsDockNarrowOptions = {},
): Ref<boolean> {
  const isNarrow = ref(false);
  let mq: MediaQueryList | null = null;

  const onChange = (event: MediaQueryListEvent): void => {
    if (!event.matches) {
      options.onExitNarrow?.();
    }
    isNarrow.value = event.matches;
  };

  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    mq = window.matchMedia(DOCK_NARROW_QUERY);
    isNarrow.value = mq.matches;
    mq.addEventListener("change", onChange);
  }

  onUnmounted(() => {
    mq?.removeEventListener("change", onChange);
    mq = null;
  });

  return isNarrow;
}
