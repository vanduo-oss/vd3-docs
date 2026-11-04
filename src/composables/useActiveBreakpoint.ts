import { onMounted, onUnmounted, ref, type Ref } from "vue";

export type GridBreakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

/** Mirrors the vd3 grid's mobile-first min-width breakpoints (grid.css). */
export const GRID_BREAKPOINTS: ReadonlyArray<{
  name: Exclude<GridBreakpoint, "base">;
  minWidth: number;
}> = [
  { name: "sm", minWidth: 576 },
  { name: "md", minWidth: 768 },
  { name: "lg", minWidth: 992 },
  { name: "xl", minWidth: 1200 },
  { name: "2xl", minWidth: 1400 },
];

/**
 * The largest vd3 grid breakpoint the viewport currently matches. Starts at
 * "base" so SSG markup and the first client render agree, then resolves on
 * mount and follows viewport resizes.
 */
export function useActiveBreakpoint(): Ref<GridBreakpoint> {
  const active = ref<GridBreakpoint>("base");
  const queries: MediaQueryList[] = [];

  const update = (): void => {
    let current: GridBreakpoint = "base";
    GRID_BREAKPOINTS.forEach((bp, i) => {
      if (queries[i]?.matches) current = bp.name;
    });
    active.value = current;
  };

  onMounted(() => {
    if (typeof window.matchMedia !== "function") return;
    GRID_BREAKPOINTS.forEach((bp) => {
      const mq = window.matchMedia(`(min-width: ${bp.minWidth}px)`);
      mq.addEventListener("change", update);
      queries.push(mq);
    });
    update();
  });

  onUnmounted(() => {
    queries.forEach((mq) => mq.removeEventListener("change", update));
    queries.length = 0;
  });

  return active;
}
