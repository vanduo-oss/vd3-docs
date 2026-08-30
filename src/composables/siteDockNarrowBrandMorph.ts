import {
  DOCK_MORPH_MS,
  dockOrientationOf,
  type DockOrientation,
  type DockPlacement,
  type DockVisualPhase,
} from "@vanduo-oss/vd3";

export type SiteDockMorphApi = {
  snapToPlacement?: (target: DockPlacement) => void;
  isMorphing?: unknown;
  visualPhase?: unknown;
  placement?: unknown;
  orientation?: unknown;
};

export type SiteDockNarrowBrandMorphOptions = {
  onApplied?: () => void;
  onSettled?: () => void;
};

type MorphPatch = Partial<{
  isMorphing: boolean;
  visualPhase: DockVisualPhase;
  placement: DockPlacement;
  orientation: DockOrientation;
}>;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function hasExpose(field: unknown): boolean {
  return field != null;
}

function readExpose<T>(field: unknown): T | undefined {
  if (field == null) return undefined;
  if (typeof field === "object" && "value" in field) {
    return (field as { value: T }).value;
  }
  return field as T;
}

/** Exposed refs may be Ref objects or plain values on the component proxy. */
function writeMorphApi(api: SiteDockMorphApi, patch: MorphPatch): void {
  for (const [key, value] of Object.entries(patch) as [
    keyof MorphPatch,
    MorphPatch[keyof MorphPatch],
  ][]) {
    if (value === undefined) continue;
    const field = api[key];
    if (field != null && typeof field === "object" && "value" in field) {
      (field as { value: unknown }).value = value;
      continue;
    }
    (api as Record<string, unknown>)[key] = value;
  }
}

/**
 * Package playToPlacement snaps on narrow; site dock needs the same square
 * waypoint morph as desktop for bottom ↔ top brand clicks.
 */
export function playSiteDockNarrowBrandMorph(
  api: SiteDockMorphApi | null | undefined,
  target: DockPlacement,
  options: SiteDockNarrowBrandMorphOptions = {},
): void {
  if (!api) return;

  if (readExpose<boolean>(api.isMorphing)) return;

  if (
    prefersReducedMotion() ||
    !hasExpose(api.visualPhase) ||
    !hasExpose(api.placement) ||
    !hasExpose(api.orientation) ||
    !hasExpose(api.isMorphing)
  ) {
    api.snapToPlacement?.(target);
    options.onApplied?.();
    options.onSettled?.();
    return;
  }

  const nextOrientation = dockOrientationOf(target);

  writeMorphApi(api, { isMorphing: true, visualPhase: "square" });

  window.setTimeout(() => {
    writeMorphApi(api, {
      placement: target,
      orientation: nextOrientation,
      visualPhase: nextOrientation,
    });
    options.onApplied?.();

    window.setTimeout(() => {
      writeMorphApi(api, { isMorphing: false });
      options.onSettled?.();
    }, DOCK_MORPH_MS.grow);
  }, DOCK_MORPH_MS.shrink);
}
