<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { DOCK_TINTS, VdDock, VdDockItem, type DockTint } from "@vanduo-oss/vd3";
import OolaUMark from "@/components/OolaUMark.vue";
import {
  DOCS_DOCK_RADIUS,
  useDocsColorScheme,
} from "@/composables/useDocsColorScheme";

/**
 * Home Oola presentation — scroll-driven tint fan only (final beat of the
 * former silk story). Copy is always on; reduced motion skips the fan scroll.
 */
const FAN_TITLE = "Oola Dock — in all its shapes and colors.";
const FAN_LEAD = "eight tints. same glass. pick a mood.";
const FAN_EXTRA = "customize everything — place, radius, glass, brand.";
const FAN_LEAD_MOBILE = "Horizontal or Vertical — let your users choose.";
const FAN_EXTRA_MOBILE = "Customize everything: place, radius, glass, brand.";

/** Desktop: start on approach; finish near the sticky pin so scroll can play the fan. */
const DESKTOP_FAN_START = 0;
const DESKTOP_FAN_END = 0.7;

/** Narrow: same left-hinge fan, stretched across the approach. */
const MOBILE_FAN_START = 0.06;
const MOBILE_FAN_END = 0.46;

/** Approach window (viewport fraction) so the fan starts before the section sticks. */
const DESKTOP_FAN_LEAD = 0.62;
const MOBILE_FAN_LEAD = 0.38;

const docks: { tint: DockTint; label: string }[] = DOCK_TINTS.map((tint) => ({
  tint,
  label: tint,
}));

const { dockAccent } = useDocsColorScheme();

const root = ref<HTMLElement | null>(null);
const progress = ref(0);
const reduced = ref(false);
const narrow = ref(false);

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

function smootherstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

const fanAmount = computed(() => {
  if (reduced.value) return 1;
  const p = progress.value;
  if (narrow.value) return ramp(p, MOBILE_FAN_START, MOBILE_FAN_END);
  return ramp(p, DESKTOP_FAN_START, DESKTOP_FAN_END);
});

const isFanning = computed(() => fanAmount.value > 0.02);

/** Narrow: hinge eases right as the deck opens (CSS --oola-fan-progress). */
const narrowFanStyle = computed<Record<string, string> | undefined>(() => {
  if (!narrow.value) return undefined;
  return {
    "--oola-fan-progress": smootherstep(fanAmount.value).toFixed(4),
  };
});

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

function readNativeProgress(): void {
  const el = root.value;
  if (!el) return;
  const viewH = window.innerHeight;
  const lead = viewH * (narrow.value ? MOBILE_FAN_LEAD : DESKTOP_FAN_LEAD);
  const total = el.offsetHeight - viewH + lead;
  progress.value =
    total <= 0
      ? 0
      : clampProgress((-el.getBoundingClientRect().top + lead) / total);
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
  readNativeProgress();
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

onMounted(() => {
  syncMedia();
  attachNativeScroll();
  reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");
  narrowMql = window.matchMedia("(max-width: 991px)");
  reduceMql.addEventListener("change", syncMedia);
  narrowMql.addEventListener("change", syncMedia);
});

onUnmounted(() => {
  detachNativeScroll();
  reduceMql?.removeEventListener("change", syncMedia);
  narrowMql?.removeEventListener("change", syncMedia);
});
</script>

<template>
  <section
    id="home-oola"
    ref="root"
    class="oola-home oola-home-fan-only"
    :class="{ 'is-fanning': isFanning }"
    :style="narrowFanStyle"
    aria-labelledby="oola-home-title"
  >
    <div class="oola-home-pin">
      <div class="oola-home-stage">
        <div class="oola-home-frame">
          <div class="oola-home-fan" aria-hidden="true" inert>
            <div
              v-for="(dock, index) in docks"
              :key="dock.label"
              :ref="(el) => bindFanItem(el, index)"
              class="oola-home-item"
              :style="itemStyle(index)"
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

          <div class="oola-home-story">
            <VdDock
              position="contained"
              placement="bottom"
              :tint="dockAccent"
              tint-mode="accent"
              :radius="DOCS_DOCK_RADIUS"
              :brand-toggles="false"
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

        <div class="oola-home-copy oola-home-copy-side">
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

        <div class="oola-home-mobile oola-home-mobile-after">
          <p class="oola-home-title">{{ FAN_TITLE }}</p>
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
  </section>
</template>

<style scoped>
.oola-home {
  --oola-fan-step: 10deg;
  --oola-fan-scale: 1;
  --oola-fan-origin-x: 1.75rem;
  --oola-fan-origin-y: 50%;

  margin-top: clamp(2.25rem, 5vh, 3.75rem);
  min-height: 130vh;
}

.oola-home-pin {
  position: sticky;
  top: var(--docs-main-offset, 5.5rem);
  height: min(32rem, calc(100vh - var(--docs-main-offset, 5.5rem)));
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
  padding: 1.25rem 1.25rem 1.5rem;
}

/* Fan card position — always the presentation frame (no ask/meet morph). */
.oola-home-frame {
  position: absolute;
  top: calc(50% - 2.8rem);
  right: auto;
  bottom: auto;
  left: 8%;
  width: min(36rem, 52%);
  height: 5.6rem;
  pointer-events: none;
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

.oola-home-story :deep(.vd-dock-item) {
  cursor: default;
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

.oola-home-cta .vd-btn + .vd-btn {
  margin-left: 0;
}

@media (max-width: 991px) {
  .oola-home {
    --oola-fan-step: 5deg;
    --oola-fan-scale: 1;
    --oola-fan-origin-x: 1.25rem;
    --oola-fan-origin-x-open: 20%;
    --oola-fan-origin-y: 0;
    --oola-fan-progress: 0;

    margin-top: clamp(2rem, 5vh, 3.25rem);
    min-height: 140vh;
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

  .oola-home-frame {
    position: relative;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    width: 100%;
    height: 4.5rem;
    margin: 0 0 14rem;
    order: 1;
    opacity: 1 !important;
    overflow: visible;
    outline: none;
    box-shadow: none;
    background: transparent;
    pointer-events: auto;
  }

  .oola-home-item {
    transform-origin: calc(
        var(--oola-fan-origin-x) +
          (var(--oola-fan-origin-x-open) - var(--oola-fan-origin-x)) *
          var(--oola-fan-progress)
      )
      var(--oola-fan-origin-y);
  }

  .oola-home-story {
    position: relative;
    inset: auto;
    height: 4.5rem;
  }

  .oola-home-story :deep(.vd-dock),
  .oola-home-frame :deep(.vd-dock) {
    --vd-dock-height: 4.5rem;
  }

  .oola-home-copy-side {
    display: none;
  }

  .oola-home-cta {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
  }

  .oola-home-cta .vd-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-self: center;
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
    order: 2;
    z-index: 5;
    min-height: 10rem;
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

  .oola-home-frame {
    margin: 0 0 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .oola-home {
    min-height: auto;
  }

  .oola-home-item,
  .oola-home-copy-side,
  .oola-home-mobile {
    filter: none !important;
    will-change: auto;
  }
}
</style>
