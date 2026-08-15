<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch, type CSSProperties } from "vue";
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
 * Silk scrollytelling (docs-local anime.js). VdDock owns the 480/720
 * square-waypoint edge morph — we only trigger placement / toggle().
 *   0.00–0.14  ask copy + horizontal ink dock
 *   0.10–0.28  crossfade ask → meet; one real morph to left at 0.22
 *   0.22–0.42  meet: ū / brand click pair-toggles bottom ↔ left
 *   0.42–1.00  colors last: same ink dock is the fan origin; CTA
 * Reduced: snap ask → meet → colors (no fan). Narrow (≤991): stacked
 * chapters + horizontal dock; scroll fans the eight tints first, then
 * fades in meet copy and holds both.
 * Meet ū click uses VdDock brand toggle (pair morph). Scroll placement
 * pauses while meetUserOverride is set, then resumes when progress
 * leaves meet.
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

const SILK_DAMP = 0.14;

/** Narrow: fan completes before meet copy fades in. Desktop silk unchanged. */
const MOBILE_FAN_START = 0.12;
const MOBILE_FAN_END = 0.42;
const MOBILE_MEET_START = 0.45;
const MOBILE_MEET_END = 0.58;

const docks: { tint: DockTint; label: string }[] = DOCK_TINTS.map((tint) => ({
  tint,
  label: tint,
}));

const { dockTint: inkTint } = useDocsColorScheme();

const root = ref<HTMLElement | null>(null);
const storyEl = ref<HTMLElement | null>(null);
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
  return ramp(p.value, 0.48, 0.78);
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

function itemStyle(index: number): Record<string, string> {
  const count = docks.length;
  const mid = (count - 1) / 2;
  const t = fanAmount.value;
  const angle = narrow.value
    ? (count > 1 ? (index / (count - 1)) * 28 : 0) * t
    : (index - mid) * 10 * t;
  return {
    opacity: Math.min(1, t * 1.35).toFixed(3),
    transform: `rotate(${angle.toFixed(2)}deg)`,
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
  const fanT = ramp(value, 0.48, 0.78);
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
  if (pauseScrollPlacement()) return;
  if (narrow.value) {
    placement.value = "bottom";
    return;
  }
  if (reduced.value) {
    placement.value = vertical ? "left" : "bottom";
    return;
  }
  placement.value = vertical ? "left" : "bottom";
});

watch([beat, meetClickable], ([next]) => {
  if (pauseScrollPlacement()) return;
  if (!meetUserOverride.value) return;
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
    :class="{ 'is-fanning': isFanning }"
    :data-beat="beat"
    aria-labelledby="oola-home-title"
  >
    <div class="oola-home-pin">
      <div class="oola-home-stage">
        <div class="oola-home-frame">
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
  /* Gap after hero CTAs — outside the sticky runway. */
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
.oola-home.is-fanning .oola-home-frame {
  top: calc(50% - 2.8rem);
  right: auto;
  bottom: auto;
  left: 8%;
  width: min(36rem, 52%);
  height: 5.6rem;
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
  pointer-events: none;
}

.oola-home-item {
  position: absolute;
  inset: 0;
  transform-origin: 1.75rem 50%;
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
  gap: 1.25rem;
  margin-top: 1.25rem;
}

@media (max-width: 991px) {
  .oola-home {
    margin-top: clamp(3rem, 8vh, 5rem);
    /* Runway so native progress can open the fan, then hold it. */
    min-height: 180vh;
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
  }

  .oola-home-frame,
  .oola-home.is-fanning .oola-home-frame {
    position: relative;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    width: 100%;
    height: 4.5rem;
    /* Tight to the ask line; reserve room for a ~28° downward fan. */
    margin: 0.65rem 0 12rem;
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

  .oola-home-item {
    transform-origin: 1.25rem 0;
  }

  .oola-home-copy-ask,
  .oola-home-copy-side {
    display: none;
  }

  .oola-home-mobile {
    display: block;
    position: relative;
    width: 100%;
  }

  .oola-home-mobile-ask {
    order: 1;
  }

  .oola-home-mobile-after {
    order: 3;
    /* In-flow under the 12rem fan gap so the pin does not jump on fade-in. */
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
  .oola-home.is-fanning .oola-home-frame {
    margin: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .oola-home-frame {
    transition: none;
  }

  .oola-home-item,
  .oola-home-copy-layer,
  .oola-home-copy-ask {
    filter: none !important;
    will-change: auto;
  }
}
</style>
