import { onUnmounted, ref, type Ref } from "vue";

/**
 * Compact site-dock strip (short labels, theme controls in the scroll row).
 * Wider than the package phone lock so tablet portrait does not switch to
 * inline desktop labels before they fit. Keep the CSS @media in sync.
 */
export const DOCS_DOCK_NARROW_QUERY = "(max-width: 767px)";

type UseDocsDockNarrowOptions = {
  /** Runs synchronously when exiting narrow, before isNarrow updates. */
  onExitNarrow?: () => void;
};

/**
 * Tracks the site dock's compact-strip query (through tablet portrait).
 * Keep CSS @media for the narrow site dock in sync with DOCS_DOCK_NARROW_QUERY.
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

  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function"
  ) {
    mq = window.matchMedia(DOCS_DOCK_NARROW_QUERY);
    isNarrow.value = mq.matches;
    mq.addEventListener("change", onChange);
  }

  onUnmounted(() => {
    mq?.removeEventListener("change", onChange);
    mq = null;
  });

  return isNarrow;
}
