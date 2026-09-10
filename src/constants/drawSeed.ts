// Shared showcase seed document for vd3 Draw demos.
// Used by both the full doc page (Draw.vue) and the showcase card (CbunPreviewDraw.vue).

export const drawSeedDoc = {
  version: "1.1.0",
  viewport: { x: 0, y: 0, scale: 1 },
  shapes: [
    // ── 1. Warm sticky note with multi-line formatted text ───────────────
    {
      id: "sticky-features",
      type: "sticky",
      x: 60,
      y: 40,
      w: 230,
      h: 155,
      fill: "#fff9db",
      text: "✨ vd3 Draw\n\n• Smooth EMA smoothing\n• 5 dynamic brush presets\n• Compass resize handles\n• SVG + PNG live export",
    },

    // ── 2. Connecting arrow with custom stroke color ─────────────────────
    {
      id: "arrow-concept",
      type: "line",
      points: [
        [290, 115],
        [360, 115],
      ],
      color: "#f59f00",
      strokeWidth: 3,
      arrowEnd: true,
    },

    // ── 3. Architecture card box with tint fill ───────────────────────────
    {
      id: "box-engine",
      type: "rectangle",
      x: 360,
      y: 40,
      w: 240,
      h: 155,
      color: "#0ca678",
      strokeWidth: 2,
      fill: "rgba(12, 166, 120, 0.08)",
    },
    {
      id: "text-engine",
      type: "text",
      x: 380,
      y: 55,
      w: 200,
      h: 130,
      color: "#0ca678",
      text: "📐 Vector Core\n\n• Zero runtime dependencies\n• Pure CSS design tokens\n• Full undo/redo history\n• Multi-line text wrapping",
    },

    // ── 4. Accent status badge in top right ──────────────────────────────
    {
      id: "badge-version",
      type: "ellipse",
      x: 640,
      y: 65,
      w: 120,
      h: 100,
      color: "#7048e8",
      strokeWidth: 2,
      fill: "rgba(112, 72, 232, 0.08)",
    },
    {
      id: "text-badge",
      type: "text",
      x: 668,
      y: 102,
      w: 70,
      h: 40,
      color: "#7048e8",
      text: "v1.4.1\nReady",
    },

    // ── 5. Five Brush Presets Showcase ───────────────────────────────────

    // Pen (deep forest green)
    {
      id: "stroke-pen",
      type: "freehand",
      brush: "pen",
      color: "#245f52",
      size: 10,
      points: Array.from({ length: 25 }, (_, i) => {
        const t = i / 24;
        const x = 70 + t * 110;
        const y = 275 + Math.sin(t * Math.PI * 2) * 18;
        return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
      }),
    },
    {
      id: "label-pen",
      type: "text",
      x: 105,
      y: 312,
      w: 60,
      h: 25,
      color: "#67746a",
      text: "Pen",
    },

    // Pencil (textured graphite)
    {
      id: "stroke-pencil",
      type: "freehand",
      brush: "pencil",
      color: "#868e96",
      size: 6,
      points: Array.from({ length: 25 }, (_, i) => {
        const t = i / 24;
        const x = 210 + t * 110;
        const y = 275 + Math.cos(t * Math.PI * 3) * 16;
        return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
      }),
    },
    {
      id: "label-pencil",
      type: "text",
      x: 242,
      y: 312,
      w: 60,
      h: 25,
      color: "#67746a",
      text: "Pencil",
    },

    // Marker (bold ocean blue)
    {
      id: "stroke-marker",
      type: "freehand",
      brush: "marker",
      color: "#1971c2",
      size: 14,
      points: Array.from({ length: 25 }, (_, i) => {
        const t = i / 24;
        const x = 350 + t * 110;
        const y = 275 - Math.sin(t * Math.PI) * 22;
        return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
      }),
    },
    {
      id: "label-marker",
      type: "text",
      x: 382,
      y: 312,
      w: 60,
      h: 25,
      color: "#67746a",
      text: "Marker",
    },

    // Highlighter (translucent amber)
    {
      id: "stroke-highlighter",
      type: "freehand",
      brush: "highlighter",
      color: "#fab005",
      size: 24,
      points: Array.from({ length: 20 }, (_, i) => {
        const t = i / 19;
        const x = 490 + t * 120;
        const y = 275 + Math.sin(t * Math.PI) * 4;
        return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
      }),
    },
    {
      id: "label-highlighter",
      type: "text",
      x: 512,
      y: 312,
      w: 80,
      h: 25,
      color: "#67746a",
      text: "Highlighter",
    },

    // Calligraphy (chisel-nib violet)
    {
      id: "stroke-calligraphy",
      type: "freehand",
      brush: "calligraphy",
      color: "#7048e8",
      size: 16,
      points: Array.from({ length: 25 }, (_, i) => {
        const t = i / 24;
        const x = 640 + t * 120;
        const y = 275 + Math.sin(t * Math.PI * 2) * 22;
        return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
      }),
    },
    {
      id: "label-calligraphy",
      type: "text",
      x: 662,
      y: 312,
      w: 80,
      h: 25,
      color: "#67746a",
      text: "Calligraphy",
    },
  ],
};
