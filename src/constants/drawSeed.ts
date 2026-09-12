// Shared showcase seed document for vd3 Draw demos.
// Used by both the full doc page (Draw.vue) and the showcase card (CbunPreviewDraw.vue).
//
// Composition: a playful abstract frame/character inspired by a geometric
// stick figure (top bar + diamond torso + diverging legs), rendered with
// curved freehand strokes and a soft vd3 color palette — centered in ~800×420.

/** Sample a chord with a gentle perpendicular sine bow. */
function bowedLine(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  bow: number,
  samples = 40,
): [number, number][] {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return Array.from({ length: samples }, (_, i) => {
    const t = i / (samples - 1);
    const bend = Math.sin(t * Math.PI) * bow;
    const x = x0 + dx * t + nx * bend;
    const y = y0 + dy * t + ny * bend;
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
  });
}

/** Polyline through waypoints, each segment gently bowed. */
function bowedPath(
  waypoints: [number, number][],
  bows: number[],
  samplesPerSeg = 28,
): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const [x0, y0] = waypoints[i];
    const [x1, y1] = waypoints[i + 1];
    const seg = bowedLine(x0, y0, x1, y1, bows[i] ?? 0, samplesPerSeg);
    if (i > 0) seg.shift();
    out.push(...seg);
  }
  return out;
}

/** Stage center for an ~800×420 viewport. */
const CX = 400;
const CY = 210;

export const drawSeedDoc = {
  version: "1.1.0",
  // Frame the centered figure without requiring the user to pan.
  viewport: { x: 0, y: 0, scale: 1 },
  shapes: [
    // ── Soft caption sticky (tasteful accent, not the old feature dump) ──
    {
      id: "sticky-caption",
      type: "sticky",
      x: 56,
      y: 48,
      w: 128,
      h: 72,
      fill: "#fff4e6",
      text: "frame\nv1.1.0",
    },

    // ── Small accent rect near the crown (hat / highlight block) ─────────
    {
      id: "accent-hat",
      type: "rectangle",
      x: CX - 22,
      y: 58,
      w: 44,
      h: 10,
      color: "#f06595",
      strokeWidth: 2,
      fill: "rgba(240, 101, 149, 0.12)",
    },

    // ── Subtle coral connector under the sticky ──────────────────────────
    {
      id: "line-caption",
      type: "line",
      points: [
        [184, 84],
        [248, 84],
      ],
      color: "#ff6b6b",
      strokeWidth: 2,
      arrowEnd: true,
    },

    // ── 1. Crown / top bar — gently arched teal marker ───────────────────
    {
      id: "stroke-crown",
      type: "freehand",
      brush: "marker",
      color: "#12b886",
      size: 16,
      points: bowedLine(CX - 110, 92, CX + 110, 92, -14, 44),
    },

    // ── 2. Diamond torso — left side (violet calligraphy) ────────────────
    {
      id: "stroke-torso-left",
      type: "freehand",
      brush: "calligraphy",
      color: "#7950f2",
      size: 12,
      points: bowedPath(
        [
          [CX, 98],
          [CX - 78, CY - 8],
          [CX, CY + 58],
        ],
        [18, -16],
        32,
      ),
    },

    // ── 3. Diamond torso — right side (violet pen, thinner) ──────────────
    {
      id: "stroke-torso-right",
      type: "freehand",
      brush: "pen",
      color: "#5f3dc4",
      size: 9,
      points: bowedPath(
        [
          [CX, 98],
          [CX + 78, CY - 8],
          [CX, CY + 58],
        ],
        [-18, 16],
        32,
      ),
    },

    // ── 4. Left leg — amber marker, flowing outward ──────────────────────
    {
      id: "stroke-leg-left",
      type: "freehand",
      brush: "marker",
      color: "#f59f00",
      size: 14,
      points: bowedLine(CX - 4, CY + 58, CX - 118, CY + 148, 22, 40),
    },

    // ── 5. Right leg — coral highlighter, broader stroke ─────────────────
    {
      id: "stroke-leg-right",
      type: "freehand",
      brush: "highlighter",
      color: "#ff8787",
      size: 22,
      points: bowedLine(CX + 4, CY + 58, CX + 118, CY + 148, -22, 40),
    },

    // ── 6. Soft pencil whisper across the waist (brush variety) ──────────
    {
      id: "stroke-waist",
      type: "freehand",
      brush: "pencil",
      color: "#868e96",
      size: 5,
      points: bowedLine(CX - 42, CY - 6, CX + 42, CY - 6, 8, 28),
    },
  ],
};
