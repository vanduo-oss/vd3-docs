import {
  dockMorphCornerOf,
  dockOrientationOf,
  type DockCorner,
  type DockOrientation,
  type DockPlacement,
  type DockVisualPhase,
} from "@vanduo-oss/vd3";

export type SiteDockMorphApi = {
  snapToPlacement?: (target: DockPlacement) => void;
  isMorphing?: unknown;
  visualPhase?: unknown;
  morphCorner?: unknown;
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
  morphCorner: DockCorner | null;
  placement: DockPlacement;
  orientation: DockOrientation;
}>;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  const mode =
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-motion")
      : null;
  if (mode === "off" || mode === "reduce") return true;
  if (mode === "full") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

/** Package `--vd-duration-slower` / `--vd-duration-610`. */
const SLOW_MORPH_FALLBACK_MS = 610;

/**
 * Logo stays on the leading edge: the square shrinks there, then slides
 * along that side. Other pairs keep the package shared-corner waypoint.
 */
function travelCorners(
  from: DockPlacement,
  to: DockPlacement,
): { origin: DockCorner; destination: DockCorner } {
  if (
    (from === "top" || from === "bottom") &&
    (to === "top" || to === "bottom")
  ) {
    return {
      origin: from === "bottom" ? "bottom-left" : "top-left",
      destination: to === "bottom" ? "bottom-left" : "top-left",
    };
  }
  const corner = dockMorphCornerOf(from, to);
  return { origin: corner, destination: corner };
}

/** Used value of a duration token, so JS beats match the CSS transition. */
function readCssDurationMs(token: string, fallback: number): number {
  if (typeof document === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
  if (!raw) return fallback;
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value) || value < 0) return fallback;
  return raw.endsWith("ms") ? value : value * 1000;
}

/**
 * Package playToPlacement snaps on narrow. Compact top ↔ bottom brand clicks
 * shrink to a square, slide that square to the other edge, then grow.
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
  const currentPlacement = readExpose<DockPlacement>(api.placement) ?? "top";
  const { origin, destination } = travelCorners(currentPlacement, target);
  const beat = readCssDurationMs(
    "--vd-duration-slower",
    SLOW_MORPH_FALLBACK_MS,
  );

  // Arm width in the transition list, paint that frame, then shrink.
  // Setting the square in the same Vue patch snaps the width.
  writeMorphApi(api, {
    isMorphing: true,
    morphCorner: origin,
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      writeMorphApi(api, {
        visualPhase: "square",
        morphCorner: origin,
      });

      window.setTimeout(() => {
        writeMorphApi(api, {
          visualPhase: "square",
          morphCorner: destination,
        });

        window.setTimeout(() => {
          writeMorphApi(api, {
            placement: target,
            orientation: nextOrientation,
            visualPhase: nextOrientation,
            morphCorner: destination,
          });
          options.onApplied?.();

          window.setTimeout(() => {
            writeMorphApi(api, { isMorphing: false, morphCorner: null });
            options.onSettled?.();
          }, beat);
        }, beat);
      }, beat);
    });
  });
}
