<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type CSSProperties,
} from "vue";
import { RouterLink } from "vue-router";
import {
  createAnimatable,
  createTimer,
  onScroll as observeScroll,
  utils,
  type AnimatableObject,
  type ScrollObserver,
  type Timer,
} from "animejs";
import {
  DOCK_TINTS,
  VdDock,
  VdDockItem,
  type DockPlacement,
  type DockTint,
} from "@vanduo-oss/vd3";
import OolaUMark from "@/components/OolaUMark.vue";
import {
  DOCS_DOCK_RADIUS,
  useDocsColorScheme,
} from "@/composables/useDocsColorScheme";

/**
 * Silk scrollytelling (docs-local anime.js). Dock geometry is interpolated
 * from damped scroll progress — VdDock's 480/720 class morph is only used
 * for the meet ū click, never for scroll.
 *
 *   0.00–0.10  ask copy + horizontal ink dock (under the question)
 *   0.10–0.22  fold → square; icons fade/scale out; U centered
 *   0.22–0.24  hold square
 *   0.24–0.36  square grows to a left vertical bar
 *   0.32–0.40  icons fade/scale in on the bar
 *   0.36–0.42  meet hold: ū click uses VdDock pair toggle (any pose)
 *   0.42–0.54  fold → square from the *current* box (flip-safe)
 *   0.50–0.66  frame eases into the existing fan card
 *   0.54–0.66  square grows to horizontal
 *   0.62–0.70  icons fade/scale in
 *   0.64–0.86  existing OC-8 fan (same clones / rotate)
 *
 * Reduced: snap ask → meet → colors (no fan, no silk morph).
 * Narrow (≤991): stacked chapters + horizontal dock; scroll fans tints
 * first, then fades in meet copy.
 */
type StoryBeat = "ask" | "meet" | "fan";

const ASK_LINE = "is it a navbar or a dock? a floating footer?";
const MEET_TITLE = "It's oola.";
const MEET_TITLE_MOBILE = "Meet Oola Dock.";
const MEET_LEAD =
  "Meet Oola Dock. And if you click it - it becomes horizontal.";
const MEET_HINT = "click ū to flip";
const FAN_TITLE = "oola-lah! look at these colors!";
const FAN_LEAD = "eight tints. same glass. pick a mood.";
const FAN_EXTRA = "customize everything — place, radius, glass, brand.";
const FAN_LEAD_MOBILE = "Horizontal or Vertical — let your users choose.";
const FAN_EXTRA_MOBILE = "Customize everything: place, radius, glass, brand.";
const LIVE_DOCK_HREF = "https://oola.vanduo.dev/";
const LIVE_DOCK_LABEL = "See Oola Dock live";

const SILK_DAMP = 0.14;

/** Narrow: fan completes before meet copy fades in. Desktop silk unchanged. */
const MOBILE_FAN_START = 0.12;
const MOBILE_FAN_END = 0.42;
const MOBILE_MEET_START = 0.45;
const MOBILE_MEET_END = 0.58;

/** Desktop dock morph (copy beats stay on the same ramps). */
const DOCK_FOLD_START = 0.1;
const DOCK_FOLD_END = 0.22;
const DOCK_GROW_V_START = 0.24;
const DOCK_GROW_V_END = 0.36;
const DOCK_ICONS_V_START = 0.32;
const DOCK_ICONS_V_END = 0.4;
const DOCK_REFOLD_START = 0.42;
const DOCK_FOLD2_END = 0.54;
const DOCK_GROW_H_START = 0.54;
const DOCK_GROW_H_END = 0.66;
const DOCK_ICONS_H_START = 0.62;
const DOCK_ICONS_H_END = 0.7;
const DOCK_FRAME_START = 0.5;
const DOCK_FRAME_END = 0.66;
const DOCK_FAN_START = 0.64;
const DOCK_FAN_END = 0.86;
const DOCK_ASK_TOP_REM = 9.75;
const DOCK_BAR_REM = 5.6;

type DockBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type CapturedPose = DockBox & {
  vertical: boolean;
  frameW: number;
  frameH: number;
};

type StoryDockExpose = {
  snapToPlacement: (target: DockPlacement) => void;
  placement: { value: DockPlacement };
};

const docks: { tint: DockTint; label: string }[] = DOCK_TINTS.map((tint) => ({
  tint,
  label: tint,
}));

const { dockTint: inkTint } = useDocsColorScheme();

const root = ref<HTMLElement | null>(null);
const stageEl = ref<HTMLElement | null>(null);
const frameEl = ref<HTMLElement | null>(null);
const storyEl = ref<HTMLElement | null>(null);
const storyDock = ref<StoryDockExpose | null>(null);
const meetHintEl = ref<HTMLElement | null>(null);
const dockHover = ref(false);
const brandFocus = ref(false);
const hintReady = ref(false);
const meetHintStyle = ref<Record<string, string>>({
  position: "fixed",
  top: "-9999px",
  left: "-9999px",
});
const askEl = ref<HTMLElement | null>(null);
const meetEl = ref<HTMLElement | null>(null);
const fanCopyEl = ref<HTMLElement | null>(null);
const progress = ref(0);
const reduced = ref(false);
const narrow = ref(false);
const silk = ref(false);
const placement = ref<DockPlacement>("bottom");
const meetUserOverride = ref(false);

const fanItemEls: HTMLElement[] = [];

function bindFanItem(el: unknown, index: number): void {
  if (el instanceof HTMLElement) {
    fanItemEls[index] = el;
    return;
  }
  delete fanItemEls[index];
}

function ramp(p: number, a: number, b: number): number {
  if (b <= a) return p >= b ? 1 : 0;
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}

function fade(
  p: number,
  inA: number,
  inB: number,
  outA?: number,
  outB?: number,
): number {
  const enter = ramp(p, inA, inB);
  if (outA == null || outB == null) return enter;
  return enter * (1 - ramp(p, outA, outB));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smootherstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function lerpBox(a: DockBox, b: DockBox, t: number): DockBox {
  return {
    left: lerp(a.left, b.left, t),
    top: lerp(a.top, b.top, t),
    width: lerp(a.width, b.width, t),
    height: lerp(a.height, b.height, t),
  };
}

function remPx(): number {
  if (typeof window === "undefined") return 16;
  const value = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return Number.isFinite(value) && value > 0 ? value : 16;
}

function layerStyle(opacity: number): Record<string, string> {
  const o = Math.min(1, Math.max(0, opacity));
  const blur = reduced.value ? 0 : (1 - o) * 7;
  const lift = reduced.value ? 0 : (1 - o) * 0.45;
  return {
    opacity: o.toFixed(3),
    filter: blur > 0.04 ? `blur(${blur.toFixed(2)}px)` : "none",
    transform: `translateY(${lift.toFixed(2)}rem)`,
    pointerEvents: o > 0.5 ? "auto" : "none",
  };
}

const p = progress;

const askOpacity = computed(() => {
  if (narrow.value) return 0;
  if (reduced.value) return p.value < 0.34 ? 1 : 0;
  return fade(p.value, 0, 0, 0.1, 0.26);
});

const meetOpacity = computed(() => {
  if (narrow.value) return 0;
  if (reduced.value) return p.value >= 0.34 && p.value < 0.67 ? 1 : 0;
  return fade(p.value, 0.1, 0.26, 0.4, 0.54);
});

const fanCopyOpacity = computed(() => {
  if (narrow.value) return 0;
  if (reduced.value) return p.value >= 0.67 ? 1 : 0;
  return fade(p.value, 0.42, 0.56);
});

const fanAmount = computed(() => {
  if (reduced.value) return 0;
  if (narrow.value) return ramp(p.value, MOBILE_FAN_START, MOBILE_FAN_END);
  return ramp(p.value, DOCK_FAN_START, DOCK_FAN_END);
});

const mobileMeetOpacity = computed(() => {
  if (!narrow.value) return 0;
  if (reduced.value) return 1;
  if (fanAmount.value < 0.98) return 0;
  return ramp(p.value, MOBILE_MEET_START, MOBILE_MEET_END);
});

const mobileMeetStyle = computed<CSSProperties>(() => {
  const o = Math.min(1, Math.max(0, mobileMeetOpacity.value));
  const lift = reduced.value ? 0 : (1 - o) * 0.4;
  return {
    opacity: o.toFixed(3),
    transform: `translateY(${lift.toFixed(2)}rem)`,
    pointerEvents: o > 0.5 ? "auto" : "none",
    visibility: o < 0.02 ? "hidden" : "visible",
  };
});

const showFanStage = computed(() => !reduced.value);

const beat = computed<StoryBeat>(() => {
  const value = clampProgress(p.value);
  if (narrow.value) return "ask";
  if (reduced.value) {
    if (value < 0.34) return "ask";
    if (value < 0.67) return "meet";
    return "fan";
  }
  if (value < 0.22) return "ask";
  if (value < 0.42) return "meet";
  return "fan";
});

const isFanning = computed(() => {
  if (!showFanStage.value) return false;
  if (narrow.value) return fanAmount.value > 0.02;
  return beat.value === "fan";
});

const wantVertical = computed(() => {
  if (narrow.value) return false;
  if (reduced.value) return p.value >= 0.34;
  return p.value >= 0.22 && p.value < 0.42;
});

const meetClickable = computed(() => {
  if (narrow.value) return false;
  if (!reduced.value && p.value >= DOCK_REFOLD_START) return false;
  if (beat.value === "meet") return true;
  return meetOpacity.value > 0.5;
});

const showMeetHint = computed(
  () => meetClickable.value && (dockHover.value || brandFocus.value),
);

function pauseScrollPlacement(): boolean {
  if (!meetUserOverride.value) return false;
  if (beat.value === "meet") return true;
  return beat.value === "ask" && meetClickable.value;
}

function inStoryDock(node: EventTarget | null): boolean {
  if (!(node instanceof Element)) return false;
  const dock = node.closest(".vd-dock");
  return !!dock && !!storyEl.value?.contains(dock);
}

function inStoryBrand(node: EventTarget | null): boolean {
  if (!(node instanceof Element)) return false;
  const brand = node.closest(".vd-dock-brand");
  return !!brand && !!storyEl.value?.contains(brand);
}

function storyBrand(): HTMLElement | null {
  const el = storyEl.value?.querySelector(".vd-dock-brand");
  return el instanceof HTMLElement ? el : null;
}

function placeMeetHint(): void {
  const brand = storyBrand();
  const tip = meetHintEl.value;
  if (!brand || !tip) return;
  const r = brand.getBoundingClientRect();
  const t = tip.getBoundingClientRect();
  const gap = 8;
  meetHintStyle.value = {
    position: "fixed",
    top: `${Math.max(4, r.top - t.height - gap)}px`,
    left: `${Math.max(4, r.left + r.width / 2 - t.width / 2)}px`,
  };
}

let hintTick = 0;

function stopHintTrack(): void {
  if (!hintTick) return;
  cancelAnimationFrame(hintTick);
  hintTick = 0;
}

function startHintTrack(): void {
  stopHintTrack();
  const step = (): void => {
    placeMeetHint();
    hintTick = requestAnimationFrame(step);
  };
  hintTick = requestAnimationFrame(step);
}

function onMeetBrandClick(event: MouseEvent): void {
  if (!meetClickable.value) return;
  if (!inStoryBrand(event.target)) return;
  meetUserOverride.value = true;
  clearDockMorphStyles();
  const dock = storyDockEl();
  const api = storyDock.value;
  if (dock && api) {
    const rect = dock.getBoundingClientRect();
    const looksVertical = rect.height > rect.width * 1.1;
    api.snapToPlacement(looksVertical ? "left" : "bottom");
  }
}

function onStoryDockOver(event: MouseEvent): void {
  if (inStoryDock(event.target)) dockHover.value = true;
}

function onStoryDockOut(event: MouseEvent): void {
  if (inStoryDock(event.relatedTarget)) return;
  if (inStoryDock(event.target)) dockHover.value = false;
}

function onStoryFocusIn(event: FocusEvent): void {
  if (inStoryBrand(event.target)) brandFocus.value = true;
}

function onStoryFocusOut(event: FocusEvent): void {
  if (inStoryBrand(event.relatedTarget)) return;
  if (inStoryBrand(event.target)) brandFocus.value = false;
}

function fanTune(): { step: number; scale: number } {
  const el = root.value;
  if (!el || typeof getComputedStyle === "undefined") {
    return { step: 10, scale: 1 };
  }
  const cs = getComputedStyle(el);
  const step = parseFloat(cs.getPropertyValue("--oola-fan-step"));
  const scale = parseFloat(cs.getPropertyValue("--oola-fan-scale"));
  return {
    step: Number.isFinite(step) && step > 0 ? step : 10,
    scale: Number.isFinite(scale) && scale > 0 ? scale : 1,
  };
}

function itemStyle(index: number): Record<string, string> {
  const count = docks.length;
  const mid = (count - 1) / 2;
  const t = fanAmount.value;
  const { step, scale } = fanTune();
  // Narrow: left-hinge handheld fan — 0°, step, 2step… clockwise so only
  // the right ends drop. Desktop stays symmetric around mid.
  const angle = (narrow.value ? index : index - mid) * step * t;
  const s = 1 + (scale - 1) * t;
  return {
    opacity: Math.min(1, t * 1.35).toFixed(3),
    transform:
      Math.abs(s - 1) < 0.01
        ? `rotate(${angle.toFixed(2)}deg)`
        : `rotate(${angle.toFixed(2)}deg) scale(${s.toFixed(3)})`,
    zIndex: String(count - index),
  };
}

function clampProgress(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function readRawProgress(): number {
  const el = root.value;
  if (!el) return 0;
  const total = el.offsetHeight - window.innerHeight;
  if (total <= 0) return 0;
  return clampProgress(-el.getBoundingClientRect().top / total);
}

function readNativeProgress(): void {
  progress.value = readRawProgress();
}

let scrollTick = 0;

function onNativeScrollRaf(): void {
  if (scrollTick) return;
  scrollTick = requestAnimationFrame(() => {
    scrollTick = 0;
    readNativeProgress();
  });
}

function attachNativeScroll(): void {
  window.addEventListener("scroll", onNativeScrollRaf, { passive: true });
  window.addEventListener("resize", onNativeScrollRaf, { passive: true });
}

function detachNativeScroll(): void {
  if (scrollTick) {
    cancelAnimationFrame(scrollTick);
    scrollTick = 0;
  }
  window.removeEventListener("scroll", onNativeScrollRaf);
  window.removeEventListener("resize", onNativeScrollRaf);
}

function syncMedia(): void {
  reduced.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  narrow.value = window.matchMedia("(max-width: 991px)").matches;
}

let reduceMql: MediaQueryList | null = null;
let narrowMql: MediaQueryList | null = null;

let scrollObs: ScrollObserver | null = null;
let silkTimer: Timer | null = null;
let copyAnims: AnimatableObject[] = [];
let fanAnims: AnimatableObject[] = [];
let rawProgress = 0;
let smoothProgress = 0;
let capturedPose: CapturedPose | null = null;

function storyDockEl(): HTMLElement | null {
  const el = storyEl.value?.querySelector(".vd-dock");
  return el instanceof HTMLElement ? el : null;
}

function readDockBox(): CapturedPose | null {
  const dock = storyDockEl();
  const frame = frameEl.value;
  if (!dock || !frame) return null;
  const dockRect = dock.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  const width = Math.max(1, dockRect.width);
  const height = Math.max(1, dockRect.height);
  return {
    left: dockRect.left - frameRect.left,
    top: dockRect.top - frameRect.top,
    width,
    height,
    vertical:
      getComputedStyle(dock).flexDirection.includes("column") ||
      height > width * 1.15,
    frameW: Math.max(1, frameRect.width),
    frameH: Math.max(1, frameRect.height),
  };
}

function scaledCapture(frameW: number, frameH: number): DockBox | null {
  if (!capturedPose) return null;
  const sx = frameW / capturedPose.frameW;
  const sy = frameH / capturedPose.frameH;
  return {
    left: capturedPose.left * sx,
    top: capturedPose.top * sy,
    width: capturedPose.width * sx,
    height: capturedPose.height * sy,
  };
}

function frameTargets(stage: HTMLElement): { ask: DockBox; fan: DockBox } {
  const rem = remPx();
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  return {
    ask: {
      left: 1.25 * rem,
      top: 1 * rem,
      width: width - 2.5 * rem,
      height: height - 2.5 * rem,
    },
    fan: {
      left: 0.08 * width,
      top: height / 2 - 2.8 * rem,
      width: Math.min(36 * rem, 0.52 * width),
      height: DOCK_BAR_REM * rem,
    },
  };
}

function clearFrameStyles(frame: HTMLElement): void {
  frame.style.top = "";
  frame.style.left = "";
  frame.style.right = "";
  frame.style.bottom = "";
  frame.style.width = "";
  frame.style.height = "";
  frame.style.transition = "";
}

function clearDockMorphStyles(): void {
  const story = storyEl.value;
  if (story) {
    story.classList.remove("is-silk-dock", "is-silk-square");
    story.style.removeProperty("--silk-left");
    story.style.removeProperty("--silk-top");
    story.style.removeProperty("--silk-width");
    story.style.removeProperty("--silk-height");
    story.style.removeProperty("--silk-pad");
    story.style.removeProperty("--silk-gap");
    story.style.removeProperty("--silk-dir");
    story.style.removeProperty("--silk-justify");
    story.style.removeProperty("--silk-nav-o");
    story.style.removeProperty("--silk-nav-s");
  }
  if (frameEl.value) clearFrameStyles(frameEl.value);
  root.value?.removeAttribute("data-dock-phase");
}

function applyFrameMorph(p: number): void {
  const frame = frameEl.value;
  const stage = stageEl.value;
  if (!frame || !stage) return;
  const t = smootherstep(ramp(p, DOCK_FRAME_START, DOCK_FRAME_END));
  if (t <= 0) {
    clearFrameStyles(frame);
    return;
  }
  const { ask, fan } = frameTargets(stage);
  const box = lerpBox(ask, fan, t);
  frame.style.transition = "none";
  frame.style.top = `${box.top}px`;
  frame.style.left = `${box.left}px`;
  frame.style.right = "auto";
  frame.style.bottom = "auto";
  frame.style.width = `${box.width}px`;
  frame.style.height = `${box.height}px`;
}

function dockPhaseName(p: number): string {
  if (p < DOCK_FOLD_START) return "horizontal";
  if (p < DOCK_GROW_V_START) return "fold-square";
  if (p < DOCK_GROW_V_END) return "grow-vertical";
  if (p < DOCK_REFOLD_START) return "vertical";
  if (p < DOCK_GROW_H_START) return "refold-square";
  if (p < DOCK_GROW_H_END) return "grow-horizontal";
  if (p < DOCK_FAN_START) return "horizontal-fan";
  return "fan";
}

function applyDockMorph(p: number): void {
  const story = storyEl.value;
  const frame = frameEl.value;
  if (!story || !frame) return;

  if (p < DOCK_REFOLD_START) {
    capturedPose = null;
  }

  const inMeetHold = p >= DOCK_GROW_V_END && p < DOCK_REFOLD_START;
  if (pauseScrollPlacement() && inMeetHold) {
    clearDockMorphStyles();
    applyFrameMorph(p);
    return;
  }

  if (p >= DOCK_REFOLD_START && !capturedPose) {
    capturedPose = readDockBox();
    meetUserOverride.value = false;
  }

  if (p < DOCK_FOLD_START) {
    clearDockMorphStyles();
    applyFrameMorph(p);
    syncDockPlacement(p);
    return;
  }

  const rem = remPx();
  const frameW = frame.clientWidth;
  const frameH = frame.clientHeight;
  const dockH = DOCK_BAR_REM * rem;
  const horzAsk: DockBox = {
    left: 0,
    top: DOCK_ASK_TOP_REM * rem,
    width: frameW,
    height: dockH,
  };
  const square: DockBox = {
    left: 0,
    top: Math.max(0, frameH - dockH),
    width: dockH,
    height: dockH,
  };
  const vert: DockBox = {
    left: 0,
    top: 0,
    width: dockH,
    height: frameH,
  };
  const horzFan: DockBox = {
    left: 0,
    top: 0,
    width: frameW,
    height: dockH,
  };

  const fold = smootherstep(ramp(p, DOCK_FOLD_START, DOCK_FOLD_END));
  const growV = smootherstep(ramp(p, DOCK_GROW_V_START, DOCK_GROW_V_END));
  const iconsV = smootherstep(ramp(p, DOCK_ICONS_V_START, DOCK_ICONS_V_END));
  const fold2 = smootherstep(ramp(p, DOCK_REFOLD_START, DOCK_FOLD2_END));
  const growH = smootherstep(ramp(p, DOCK_GROW_H_START, DOCK_GROW_H_END));
  const iconsH = smootherstep(ramp(p, DOCK_ICONS_H_START, DOCK_ICONS_H_END));

  let box: DockBox;
  let icons: number;
  let dir: string;
  let squareish: boolean;

  if (p < DOCK_REFOLD_START) {
    box =
      p < DOCK_GROW_V_START
        ? lerpBox(horzAsk, square, fold)
        : lerpBox(square, vert, growV);
    icons =
      p < DOCK_GROW_V_START
        ? 1 - smootherstep(ramp(p, DOCK_FOLD_START, DOCK_FOLD_END - 0.04))
        : iconsV;
    dir = p < DOCK_FOLD_END ? "row" : "column-reverse";
    squareish = fold > 0.88 && growV < 0.12;
  } else {
    const from = scaledCapture(frameW, frameH) ?? vert;
    const fromDir = capturedPose?.vertical ? "column-reverse" : "row";
    if (p < DOCK_GROW_H_START) {
      box = lerpBox(from, square, fold2);
      icons =
        1 - smootherstep(ramp(p, DOCK_REFOLD_START, DOCK_REFOLD_START + 0.08));
      dir = fold2 < 0.5 ? fromDir : "row";
      squareish = fold2 > 0.88;
    } else {
      box = lerpBox(square, horzFan, growH);
      icons = iconsH;
      dir = "row";
      squareish = growH < 0.12;
    }
  }

  story.classList.add("is-silk-dock");
  story.classList.toggle("is-silk-square", squareish);
  story.style.setProperty("--silk-left", `${box.left}px`);
  story.style.setProperty("--silk-top", `${box.top}px`);
  story.style.setProperty("--silk-width", `${box.width}px`);
  story.style.setProperty("--silk-height", `${box.height}px`);
  story.style.setProperty(
    "--silk-pad",
    squareish
      ? "0.5rem"
      : dir === "row"
        ? "0.65rem 1.25rem"
        : "0.75rem 0.55rem",
  );
  story.style.setProperty("--silk-gap", squareish ? "0px" : "0.65rem");
  story.style.setProperty("--silk-dir", dir);
  story.style.setProperty(
    "--silk-justify",
    squareish
      ? "center"
      : dir === "column-reverse"
        ? "space-between"
        : "flex-start",
  );
  story.style.setProperty("--silk-nav-o", icons.toFixed(3));
  story.style.setProperty("--silk-nav-s", (0.86 + 0.14 * icons).toFixed(3));
  root.value?.setAttribute("data-dock-phase", dockPhaseName(p));
  applyFrameMorph(p);
  syncDockPlacement(p);
}

function syncDockPlacement(p: number): void {
  if (pauseScrollPlacement()) return;
  const api = storyDock.value;
  if (!api) return;
  if (p >= DOCK_GROW_V_END && p < DOCK_REFOLD_START) {
    if (api.placement.value !== "left") api.snapToPlacement("left");
    return;
  }
  if (p < DOCK_FOLD_START || p >= DOCK_ICONS_H_END) {
    if (api.placement.value !== "bottom") api.snapToPlacement("bottom");
  }
}

function setLayerPointer(el: HTMLElement | null, opacity: number): void {
  if (!el) return;
  el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
}

function applySilkVisuals(value: number): void {
  value = clampProgress(value);
  progress.value = value;
  const ask = fade(value, 0, 0, 0.1, 0.26);
  const meet = fade(value, 0.1, 0.26, 0.4, 0.54);
  const fanCopy = fade(value, 0.42, 0.56);
  const fanT = ramp(value, DOCK_FAN_START, DOCK_FAN_END);
  applyDockMorph(value);
  const layers: [AnimatableObject | undefined, number, HTMLElement | null][] = [
    [copyAnims[0], ask, askEl.value],
    [copyAnims[1], meet, meetEl.value],
    [copyAnims[2], fanCopy, fanCopyEl.value],
  ];
  for (const [anim, opacity, el] of layers) {
    if (!anim) continue;
    anim.opacity(opacity);
    anim.y((1 - opacity) * 0.45);
    setLayerPointer(el, opacity);
  }
  const mid = (docks.length - 1) / 2;
  fanAnims.forEach((anim, i) => {
    anim.opacity(Math.min(1, fanT * 1.35));
    anim.rotate((i - mid) * 10 * fanT);
  });
}

function pullSilkRaw(): void {
  rawProgress = readRawProgress();
}

function stopSilk(): void {
  silkTimer?.revert();
  silkTimer = null;
  scrollObs?.revert();
  scrollObs = null;
  window.removeEventListener("scroll", pullSilkRaw);
  window.removeEventListener("resize", pullSilkRaw);
  copyAnims.forEach((anim) => anim.revert());
  fanAnims.forEach((anim) => anim.revert());
  copyAnims = [];
  fanAnims = [];
  silk.value = false;
  rawProgress = 0;
  smoothProgress = 0;
  capturedPose = null;
  clearDockMorphStyles();
}

function startSilk(): void {
  stopSilk();
  if (!root.value || reduced.value || narrow.value) return;

  const layers = [askEl.value, meetEl.value, fanCopyEl.value];
  copyAnims = layers
    .filter((el): el is HTMLElement => el != null)
    .map((el) =>
      createAnimatable(el, {
        opacity: 70,
        y: { duration: 70, unit: "rem" },
        ease: "out(3)",
      }),
    );

  fanAnims = docks
    .map((_, i) => fanItemEls[i])
    .filter((el): el is HTMLElement => el != null)
    .map((el) =>
      createAnimatable(el, {
        opacity: 80,
        rotate: { duration: 90, unit: "deg" },
        ease: "out(3)",
      }),
    );

  silk.value = true;
  rawProgress = readRawProgress();
  smoothProgress = rawProgress;
  applySilkVisuals(rawProgress);

  scrollObs = observeScroll({
    target: root.value,
    enter: "top top",
    leave: "bottom bottom",
    repeat: true,
    onUpdate: pullSilkRaw,
  });
  window.addEventListener("scroll", pullSilkRaw, { passive: true });
  window.addEventListener("resize", pullSilkRaw, { passive: true });

  silkTimer = createTimer({
    loop: true,
    duration: 1000,
    onUpdate: (self) => {
      const dt =
        Number.isFinite(self.deltaTime) && self.deltaTime > 0
          ? self.deltaTime
          : 16;
      const next = utils.damp(smoothProgress, rawProgress, dt, SILK_DAMP);
      smoothProgress = Number.isFinite(next) ? next : rawProgress;
      applySilkVisuals(smoothProgress);
    },
  });
}

watch(wantVertical, (vertical) => {
  if (silk.value) return;
  if (pauseScrollPlacement()) return;
  if (narrow.value) {
    placement.value = "bottom";
    return;
  }
  placement.value = vertical ? "left" : "bottom";
});

watch([beat, meetClickable], ([next]) => {
  if (!meetUserOverride.value) return;
  if (silk.value) {
    if (next === "fan" || next === "ask") meetUserOverride.value = false;
    return;
  }
  if (pauseScrollPlacement()) return;
  meetUserOverride.value = false;
  if (narrow.value || next === "ask") {
    placement.value = "bottom";
    return;
  }
  if (next === "fan") {
    placement.value = reduced.value ? "left" : "bottom";
  }
});

watch(showMeetHint, async (show) => {
  stopHintTrack();
  hintReady.value = false;
  const brand = storyBrand();
  if (show) brand?.setAttribute("aria-describedby", "oola-meet-hint");
  else brand?.removeAttribute("aria-describedby");
  if (!show) return;
  await nextTick();
  placeMeetHint();
  hintReady.value = true;
  startHintTrack();
});

function applyMotionMode(): void {
  syncMedia();
  if (reduced.value || narrow.value) {
    stopSilk();
    detachNativeScroll();
    attachNativeScroll();
    readNativeProgress();
    return;
  }
  detachNativeScroll();
  void nextTick(() => {
    startSilk();
  });
}

onMounted(() => {
  applyMotionMode();
  reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");
  narrowMql = window.matchMedia("(max-width: 991px)");
  reduceMql.addEventListener("change", applyMotionMode);
  narrowMql.addEventListener("change", applyMotionMode);
});

onUnmounted(() => {
  stopHintTrack();
  stopSilk();
  detachNativeScroll();
  reduceMql?.removeEventListener("change", applyMotionMode);
  narrowMql?.removeEventListener("change", applyMotionMode);
});
</script>

<template>
  <section
    id="home-oola"
    ref="root"
    class="oola-home"
    :class="{ 'is-fanning': isFanning, 'is-silk': silk }"
    :data-beat="beat"
    aria-labelledby="oola-home-title"
  >
    <div class="oola-home-pin">
      <div ref="stageEl" class="oola-home-stage">
        <div ref="frameEl" class="oola-home-frame">
          <div
            v-show="showFanStage"
            class="oola-home-fan"
            aria-hidden="true"
            inert
          >
            <div
              v-for="(dock, index) in docks"
              :key="dock.label"
              :ref="(el) => bindFanItem(el, index)"
              class="oola-home-item"
              :style="silk ? undefined : itemStyle(index)"
            >
              <VdDock
                position="contained"
                :tint="dock.tint"
                :radius="DOCS_DOCK_RADIUS"
                :brand-toggles="false"
                :label="`Oola Dock ${dock.label}`"
              >
                <template #brand>
                  <OolaUMark :size="26" />
                </template>
                <VdDockItem icon="house" label="Home" :active="index === 0" />
                <VdDockItem icon="book-open-text" label="Docs" />
                <VdDockItem icon="info" label="About" />
              </VdDock>
            </div>
          </div>

          <div
            ref="storyEl"
            class="oola-home-story"
            @click.capture="onMeetBrandClick"
            @mouseover="onStoryDockOver"
            @mouseout="onStoryDockOut"
            @focusin="onStoryFocusIn"
            @focusout="onStoryFocusOut"
          >
            <VdDock
              ref="storyDock"
              v-model:placement="placement"
              position="contained"
              :tint="inkTint || undefined"
              :radius="DOCS_DOCK_RADIUS"
              :brand-toggles="meetClickable"
              label="Oola Dock"
            >
              <template #brand>
                <OolaUMark :size="26" />
              </template>
              <VdDockItem icon="house" label="Home" active @click.prevent />
              <VdDockItem icon="book-open-text" label="Docs" @click.prevent />
              <VdDockItem icon="info" label="About" @click.prevent />
            </VdDock>
          </div>
        </div>

        <h2 id="oola-home-title" class="vd-visually-hidden">Oola Dock</h2>

        <div
          ref="askEl"
          class="oola-home-copy oola-home-copy-ask"
          :style="silk ? undefined : layerStyle(askOpacity)"
        >
          <p class="oola-home-title">
            {{ ASK_LINE }}
          </p>
        </div>

        <div class="oola-home-copy oola-home-copy-side">
          <div
            ref="meetEl"
            class="oola-home-copy-layer"
            :style="silk ? undefined : layerStyle(meetOpacity)"
          >
            <p class="oola-home-title">{{ MEET_TITLE }}</p>
            <p class="oola-home-lead">
              {{ MEET_LEAD }}
            </p>
          </div>
          <div
            ref="fanCopyEl"
            class="oola-home-copy-layer"
            :style="silk ? undefined : layerStyle(fanCopyOpacity)"
          >
            <p class="oola-home-title">{{ FAN_TITLE }}</p>
            <p class="oola-home-lead">{{ FAN_LEAD }}</p>
            <p class="oola-home-lead">{{ FAN_EXTRA }}</p>
            <div class="oola-home-cta">
              <RouterLink
                to="/components/dock"
                class="vd-btn vd-btn-outline vd-btn-ring"
              >
                Explore Oola Dock
              </RouterLink>
              <a
                :href="LIVE_DOCK_HREF"
                class="vd-btn vd-btn-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ LIVE_DOCK_LABEL }}
                <span class="vd-visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Mobile-only chapters (hidden ≥992px). Dock sits between ask + meet. -->
        <div class="oola-home-mobile oola-home-mobile-ask">
          <p class="oola-home-title">{{ ASK_LINE }}</p>
        </div>

        <div
          class="oola-home-mobile oola-home-mobile-after"
          :style="mobileMeetStyle"
          :inert="mobileMeetOpacity < 0.5"
          :aria-hidden="mobileMeetOpacity < 0.02"
        >
          <div class="oola-home-mobile-chapter">
            <p class="oola-home-title">{{ MEET_TITLE_MOBILE }}</p>
          </div>
          <div class="oola-home-mobile-chapter">
            <p class="oola-home-lead">{{ FAN_LEAD_MOBILE }}</p>
            <p class="oola-home-lead">{{ FAN_EXTRA_MOBILE }}</p>
            <div class="oola-home-cta">
              <RouterLink
                to="/components/dock"
                class="vd-btn vd-btn-outline vd-btn-ring"
              >
                Explore Oola Dock
              </RouterLink>
              <a
                :href="LIVE_DOCK_HREF"
                class="vd-btn vd-btn-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ LIVE_DOCK_LABEL }}
                <span class="vd-visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div
      v-if="showMeetHint"
      id="oola-meet-hint"
      ref="meetHintEl"
      class="vd-tooltip vd-tooltip-top vd-tooltip-sm vd-tooltip-glass oola-meet-hint"
      :class="{ 'is-visible': hintReady }"
      data-placement="top"
      role="tooltip"
      :style="meetHintStyle"
    >
      {{ MEET_HINT }}
    </div>
  </Teleport>
</template>

<style scoped>
.oola-home {
  /* Gap after hero CTAs — outside the sticky runway.
   * Fan knobs: itemStyle reads step/scale; origin is CSS-only.
   * Desktop silk still rotates clones by (i-mid)*10deg in JS. */
  --oola-fan-step: 10deg;
  --oola-fan-scale: 1;
  --oola-fan-origin-x: 1.75rem;
  --oola-fan-origin-y: 50%;

  margin-top: clamp(6rem, 14vh, 10rem);
  min-height: 260vh;
}

.oola-home-pin {
  position: sticky;
  top: var(--docs-main-offset, 5.5rem);
  height: calc(100vh - var(--docs-main-offset, 5.5rem));
  overflow: hidden;
}

.oola-home.is-fanning .oola-home-pin {
  overflow: visible;
}

.oola-home-stage {
  position: relative;
  height: 100%;
  max-width: 88rem;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 2rem;
}

.oola-home-frame {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  bottom: 1.5rem;
  left: 1.25rem;
  width: calc(100% - 2.5rem);
  height: calc(100% - 2.5rem);
  pointer-events: none;
  transition:
    top 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    left 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    width 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

/*
 * Colors beat: collapse the same containing block the ink dock lives in
 * so OC-8 clones fan from that card — not a second cluster.
 */
.oola-home.is-fanning:not(.is-silk) .oola-home-frame {
  top: calc(50% - 2.8rem);
  right: auto;
  bottom: auto;
  left: 8%;
  width: min(36rem, 52%);
  height: 5.6rem;
}

.oola-home-story.is-silk-dock :deep(.vd-dock) {
  transition: none !important;
  left: var(--silk-left) !important;
  right: auto !important;
  top: var(--silk-top) !important;
  bottom: auto !important;
  width: var(--silk-width) !important;
  max-width: none !important;
  height: var(--silk-height) !important;
  min-height: var(--silk-height) !important;
  max-height: var(--silk-height) !important;
  transform: none !important;
  padding: var(--silk-pad) !important;
  gap: var(--silk-gap) !important;
  flex-direction: var(--silk-dir) !important;
  justify-content: var(--silk-justify) !important;
  align-items: center;
}

.oola-home-story.is-silk-dock :deep(.vd-dock-nav),
.oola-home-story.is-silk-dock :deep(.vd-dock-actions) {
  opacity: var(--silk-nav-o) !important;
  visibility: visible !important;
  transform: scale(var(--silk-nav-s));
  transform-origin: center center;
  pointer-events: none;
}

.oola-home-story.is-silk-dock.is-silk-square :deep(.vd-dock-nav),
.oola-home-story.is-silk-dock.is-silk-square :deep(.vd-dock-actions) {
  width: 0;
  height: 0;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  flex: 0 0 0;
  margin: 0;
  padding: 0;
}

.oola-home-story.is-silk-dock.is-silk-square :deep(.vd-dock-brand) {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  max-width: none;
  justify-content: center;
  align-items: center;
}

.oola-home-story {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.oola-home-story :deep(.vd-dock),
.oola-home-frame :deep(.vd-dock) {
  --vd-dock-inset: 0px;
  --vd-dock-height: 5.6rem;
  pointer-events: auto;
}

.oola-home[data-beat="meet"] .oola-home-story :deep(.vd-dock) {
  cursor: default;
}

.oola-home-story :deep(.vd-dock-item) {
  cursor: default;
}

.oola-meet-hint {
  white-space: nowrap;
  pointer-events: none;
}

/*
 * Ask-only rest: sit the bottom-edge dock under the question.
 * Meet click is the package pair morph (left ↔ bottom via square at the
 * shared corner). Do not apply this after morph — `:not(.is-morphing)` on
 * every beat was the 3rd hop (vertical → bottom → jump up to 9.75rem).
 */
.oola-home[data-beat="ask"]
  .oola-home-story
  :deep(
    .vd-dock.vd-dock-contained.vd-dock-edge-bottom:not(.is-square):not(
        .is-morphing
      )
  ) {
  top: 9.75rem;
  bottom: auto;
}

.oola-home-fan {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: visible;
  pointer-events: none;
}

.oola-home-item {
  position: absolute;
  inset: 0;
  transform-origin: var(--oola-fan-origin-x) var(--oola-fan-origin-y);
  opacity: 0;
  will-change: transform, opacity;
}

.oola-home-item :deep(.vd-dock) {
  --vd-dock-inset: 0px;
  --vd-dock-height: 5.6rem;
  pointer-events: none;
}

.oola-home-copy {
  position: absolute;
  z-index: 5;
}

.oola-home-copy-ask {
  left: 50%;
  top: 2.25rem;
  width: min(42rem, 92%);
  /* Independent of transform so Vue/anime translateY cannot un-center. */
  translate: -50% 0;
  text-align: center;
}

.oola-home-copy-side {
  right: 1.35rem;
  top: 50%;
  width: min(26rem, 36%);
  min-height: 13rem;
  translate: 0 -50%;
}

.oola-home-mobile {
  display: none;
}

.oola-home-copy-layer {
  position: absolute;
  inset: auto 0 auto 0;
  top: 0;
}

.oola-home-copy-side .oola-home-copy-layer {
  width: 100%;
}

.oola-home-title {
  margin: 0 0 0.75rem;
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  line-height: 1.15;
  color: var(--vd-color-primary);
}

.oola-home-lead {
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
  line-height: 1.55;
}

.oola-home-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  margin-top: 1.25rem;
}

.oola-home-cta .vd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Flex gap already spaces the pair — drop vd3's sibling bump. */
.oola-home-cta .vd-btn + .vd-btn {
  margin-left: 0;
}

@media (max-width: 991px) {
  .oola-home {
    /* Live vd3.vanduo.dev: origin 1.25rem 0, 4deg steps (0–28°).
     * Same left-hinge clockwise deck; 5deg (0–35°) shows a bit more tint. */
    --oola-fan-step: 5deg;
    --oola-fan-scale: 1;
    --oola-fan-origin-x: 1.25rem;
    --oola-fan-origin-y: 0;

    margin-top: clamp(3rem, 8vh, 5rem);
    /* Runway so native progress can open the fan, then hold it. */
    min-height: 180vh;
    overflow-x: clip;
  }

  .oola-home-pin {
    position: sticky;
    top: var(--docs-main-offset, 5.5rem);
    height: auto;
    overflow: visible;
  }

  .oola-home-stage {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: auto;
    overflow: visible;
  }

  .oola-home-frame,
  .oola-home.is-fanning .oola-home-frame,
  .oola-home.is-fanning:not(.is-silk) .oola-home-frame {
    position: relative;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    width: 100%;
    height: 4.5rem;
    /* Tight to the ask line — left-hinge only drops the right ends.
     * 14rem below so the 35° deck is not clipped short. */
    margin: 0.65rem 0 14rem;
    order: 2;
    opacity: 1 !important;
    overflow: visible;
    outline: none;
    box-shadow: none;
    background: transparent;
    pointer-events: auto;
    transition: none;
  }

  .oola-home-story {
    position: relative;
    inset: auto;
    height: 4.5rem;
  }

  /*
   * Ask beat on desktop lifts the dock under the question (9.75rem). On
   * narrow, data-beat stays "ask" — sit the dock in the frame so fan
   * clones (same containing block) stay aligned.
   */
  .oola-home[data-beat="ask"]
    .oola-home-story
    :deep(
      .vd-dock.vd-dock-contained.vd-dock-edge-bottom:not(.is-square):not(
          .is-morphing
        )
    ) {
    top: auto;
    bottom: 0;
  }

  .oola-home-story :deep(.vd-dock),
  .oola-home-frame :deep(.vd-dock) {
    --vd-dock-height: 4.5rem;
  }

  .oola-home-copy-ask,
  .oola-home-copy-side {
    display: none;
  }

  .oola-home-cta {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    width: 100%;
  }

  .oola-home-cta .vd-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    margin-left: 0;
  }

  .oola-home-cta .vd-btn-ring {
    --vd-btn-ring-offset: calc(
      var(--vd-btn-ring-gap) + var(--vd-btn-ring-width)
    );

    width: calc(100% - 2 * var(--vd-btn-ring-offset));
    margin-left: var(--vd-btn-ring-offset);
    margin-right: var(--vd-btn-ring-offset);
  }

  .oola-home-mobile {
    display: block;
    position: relative;
    width: 100%;
  }

  .oola-home-mobile-ask {
    order: 1;
    z-index: 6;
  }

  .oola-home-mobile-after {
    order: 3;
    z-index: 5;
    /* In-flow under the 14rem fan gap so the pin does not jump on fade-in. */
    min-height: 10rem;
  }

  .oola-home-mobile-chapter + .oola-home-mobile-chapter {
    margin-top: 1.5rem;
  }

  .oola-home-mobile .oola-home-title {
    font-size: clamp(1.25rem, 5.2vw, 1.55rem);
  }
}

@media (max-width: 991px) and (prefers-reduced-motion: reduce) {
  .oola-home {
    min-height: auto;
  }

  .oola-home-pin {
    position: relative;
    top: 0;
  }

  .oola-home-frame,
  .oola-home.is-fanning .oola-home-frame,
  .oola-home.is-fanning:not(.is-silk) .oola-home-frame {
    margin: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .oola-home-frame {
    transition: none;
  }

  .oola-home-story.is-silk-dock :deep(.vd-dock),
  .oola-home-story.is-silk-dock :deep(.vd-dock-nav),
  .oola-home-story.is-silk-dock :deep(.vd-dock-actions) {
    transition: none !important;
  }

  .oola-home-item,
  .oola-home-copy-layer,
  .oola-home-copy-ask {
    filter: none !important;
    will-change: auto;
  }
}
</style>
