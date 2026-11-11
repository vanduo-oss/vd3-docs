<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  VdButton,
  VdExpandTransition,
  VdTransition,
  motionMode,
  setMotion,
  useReducedMotion,
  type TransitionPreset,
} from "@vanduo-oss/vd3";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import GuideLinkCards from "@/components/GuideLinkCards.vue";

const { reduced: isReduced } = useReducedMotion();

// Fibonacci Duration Ladder
const durations = [
  {
    name: "instant",
    token: "--vd-duration-instant",
    ms: 55,
    use: "Micro-interactions, haptics, active presses",
  },
  {
    name: "fast",
    token: "--vd-duration-fast",
    ms: 89,
    use: "Icon toggles, checkmarks, reduced-motion crossfades",
  },
  {
    name: "snappy",
    token: "--vd-duration-snappy",
    ms: 144,
    use: "Tooltips, badges, small toggles (< 80px unfolds)",
  },
  {
    name: "normal",
    token: "--vd-duration-normal",
    ms: 233,
    use: "Dropdowns, popovers, select menus, chip dismiss",
  },
  {
    name: "moderate",
    token: "--vd-duration-moderate",
    ms: 377,
    use: "Drawers, modals, offcanvas, alerts (< 450px unfolds)",
  },
  {
    name: "slow",
    token: "--vd-duration-slow",
    ms: 610,
    use: "Accordions, code snippets, large panels (> 450px)",
  },
  {
    name: "gentle",
    token: "--vd-duration-gentle",
    ms: 987,
    use: "Page transitions, hero unfolds, multi-stage choreographies",
  },
];

// Interactive runner for duration tracks
const animatingLadder = ref(false);
const triggerLadder = (): void => {
  animatingLadder.value = false;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animatingLadder.value = true;
    });
  });
};

// Golden Easing Curves
const easings = [
  {
    name: "ease-out",
    token: "--vd-ease-out",
    value: "cubic-bezier(0.16, 1, 0.3, 1)",
    role: "Decelerating entrance: natural arrivals, unfolds, drawer slide-in",
  },
  {
    name: "ease-in",
    token: "--vd-ease-in",
    value: "cubic-bezier(0.7, 0, 0.84, 0)",
    role: "Accelerating exit: dismissals, quick departures, modal closing",
  },
  {
    name: "ease-in-out",
    token: "--vd-ease-in-out",
    value: "cubic-bezier(0.65, 0, 0.35, 1)",
    role: "Symmetric transitions: tabs, loops, morphs, position shifting",
  },
  {
    name: "ease-linear",
    token: "--vd-ease-linear",
    value: "linear",
    role: "Continuous steady animations: spinners, indeterminate loaders",
  },
];

const animatingEasings = ref(false);
const triggerEasings = (): void => {
  animatingEasings.value = false;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animatingEasings.value = true;
    });
  });
};

// Interactive Expand Transition demo
const expandOpen = ref(true);
const expandSize = ref<"short" | "medium" | "tall">("medium");

// Interactive Transition preset demo
const presetVisible = ref(true);
const currentPreset = ref<TransitionPreset>("scale");
const presets: TransitionPreset[] = [
  "fade",
  "scale",
  "slide-up",
  "slide-down",
  "slide-left",
  "slide-right",
];

const presetDuration = ref<number>(233);

// Code snippets
const expandSnippet = `<!-- Smooth WAAPI height & opacity expansion with adaptive Fibonacci duration -->
<script setup>
import { ref } from "vue";
import { VdExpandTransition, VdButton } from "@vanduo-oss/vd3";

const open = ref(false);
<\/script>

<template>
  <VdButton @click="open = !open">Toggle panel</VdButton>

  <VdExpandTransition>
    <div v-show="open" class="my-collapsible-panel">
      <p>Content automatically calculates its natural height and assigns</p>
      <p>a proportional Fibonacci duration: 144ms, 233ms, 377ms, or 610ms.</p>
    </div>
  </VdExpandTransition>
</template>`;

const transitionSnippet = `<!-- Preset transition wrapper with Fibonacci durations -->
<script setup>
import { ref } from "vue";
import { VdTransition, VdButton } from "@vanduo-oss/vd3";

const show = ref(true);
<\/script>

<template>
  <VdButton @click="show = !show">Toggle</VdButton>

  <!-- Presets: 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' -->
  <VdTransition name="scale" :duration="233">
    <div v-if="show" class="my-dialog">
      Dialog or popover content
    </div>
  </VdTransition>
</template>`;

const composableSnippet = `import { setMotion, motionMode, useReducedMotion } from "@vanduo-oss/vd3";

// Set user preference (persisted to localStorage & html[data-motion])
// Options: 'auto' (OS default) | 'full' | 'reduce' | 'off'
setMotion("reduce");

// Reactive state: current mode ('auto' | 'full' | 'reduce' | 'off')
console.log(motionMode.value);

// Reactive boolean tracking whether reduced motion is currently in effect
const { reduced: isReduced, off: isOff } = useReducedMotion();`;

const cssTokensSnippet = `/* Fibonacci Motion Duration Tokens */
:root {
  --vd-duration-instant: 55ms;   /* micro-interactions */
  --vd-duration-fast: 89ms;      /* toggles, checkmarks, reduced-motion crossfade */
  --vd-duration-snappy: 144ms;   /* tooltips, small popovers */
  --vd-duration-normal: 233ms;   /* dropdowns, selects, chips */
  --vd-duration-moderate: 377ms; /* modals, drawers, alerts */
  --vd-duration-slow: 610ms;     /* accordions, code snippets, large unfolds */
  --vd-duration-gentle: 987ms;   /* page transitions, hero reveals */

  /* Golden Easing Curves */
  --vd-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --vd-ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --vd-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --vd-ease-linear: linear;
}`;

const relatedComponents = [
  {
    to: "/core/golden-ratio",
    icon: "ph-shapes",
    title: "Golden ratio",
    desc: "The φ proportion powering spacing, scale, and motion curves.",
    badge: "Core",
  },
  {
    to: "/guides/fibonacci",
    icon: "ph-spiral",
    title: "Fibonacci guide",
    desc: "Harmonic spacing, grid layouts, and mathematical proportions.",
    badge: "Guide",
  },
  {
    to: "/guides/accessibility",
    icon: "ph-wheelchair",
    title: "Accessibility",
    desc: "Reduced-motion accommodations, contrast, and ARIA patterns.",
    badge: "Guide",
  },
  {
    to: "/components/theme-customizer",
    icon: "ph-sliders",
    title: "Theme customizer",
    desc: "Interactive live customizer with the Motion selector.",
    badge: "Component",
  },
];

onMounted(() => {
  triggerLadder();
});
</script>

<template>
  <section id="motion-system">
    <h5 class="demo-title"><i class="ph ph-wave-sine"></i>Motion</h5>
    <p class="vd-mb-8">
      vd3 provides a harmonic, lightweight motion system built on the Fibonacci
      ladder and golden ratio curves. Transitional animations are enabled by
      default across all unfoldable and moving components—delivering fluid,
      natural physics without heavy external runtimes.
    </p>

    <!-- Philosophical overview & AnimeJS comparison -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-lg-7 vd-mb-4 mb-lg-0">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Harmonic Fibonacci Timing</h6>
          </div>
          <div class="vd-card-body">
            <p>
              Rather than picking arbitrary timings like <code>200ms</code> or
              <code>300ms</code>, vd3 synchronizes every transition to
              consecutive terms of the Fibonacci sequence:
            </p>
            <div class="vd-text-center vd-mt-4 vd-mb-4">
              <span class="motion-sequence-highlight">
                55ms → 89ms → 144ms → 233ms → 377ms → 610ms → 987ms
              </span>
            </div>
            <p class="vd-text-sm vd-text-secondary">
              Each step is approximately 1.618 times the previous duration,
              ensuring that transitions feel proportionate to the physical
              distance and surface area of the moving element.
            </p>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-lg-5">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>Lightweight vs External Engines</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-alert vd-alert-info vd-mb-4">
              <i class="ph ph-info"></i>
              <div>
                <strong>~2.5 KB zero-dependency footprint.</strong>
                Built with native CSS custom properties, Web Animations API
                (WAAPI), and Vue 3 Transition primitives.
              </div>
            </div>
            <p class="vd-text-sm">
              <strong>Need complex keyframe sequencing or SVG morphing?</strong>
              vd3 does not bundle heavy animation engines. You can install
              <code>animejs</code> or GSAP whenever specialized timelines or
              canvas physics are required; vd3's components seamlessly integrate
              alongside them.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Duration Ladder Demo -->
    <div class="vd-card vd-card-glow demo-card vd-mb-8">
      <div
        class="vd-card-header vd-d-flex justify-between items-center vd-flex-wrap vd-gap-4"
      >
        <h6>Fibonacci Duration Ladder</h6>
        <VdButton size="sm" variant="primary" outline @click="triggerLadder">
          <i class="ph ph-play mr-1"></i> Replay ladder
        </VdButton>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-6 vd-text-sm vd-text-secondary">
          Click <em>Replay ladder</em> to watch each duration animate across its
          track with <code>--vd-ease-out</code>.
        </p>

        <div class="motion-ladder">
          <div
            v-for="dur in durations"
            :key="dur.name"
            class="motion-ladder-row"
          >
            <div class="motion-ladder-meta">
              <span class="motion-ladder-badge">{{ dur.ms }}ms</span>
              <code class="motion-ladder-token">{{ dur.token }}</code>
              <span class="motion-ladder-use">{{ dur.use }}</span>
            </div>
            <div class="motion-ladder-track">
              <div
                class="motion-ladder-bar"
                :class="{ 'is-animating': animatingLadder }"
                :style="{
                  animationDuration: `${dur.ms}ms`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Golden Easing Demo -->
    <div class="vd-card vd-card-glow demo-card vd-mb-8">
      <div
        class="vd-card-header vd-d-flex justify-between items-center vd-flex-wrap vd-gap-4"
      >
        <h6>Golden Easing Curves</h6>
        <VdButton size="sm" variant="primary" outline @click="triggerEasings">
          <i class="ph ph-play mr-1"></i> Compare curves
        </VdButton>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-6 vd-text-sm vd-text-secondary">
          Golden cubic-bezier curves match the golden ratio deceleration curve
          (φ = 1.618), providing responsive initial velocity and buttery-smooth
          settling.
        </p>

        <div class="motion-easings">
          <div v-for="e in easings" :key="e.name" class="motion-easing-row">
            <div class="motion-easing-meta">
              <strong>{{ e.name }}</strong>
              <code>{{ e.token }}</code>
              <small class="vd-text-muted">{{ e.role }}</small>
            </div>
            <div class="motion-easing-track">
              <div
                class="motion-easing-ball"
                :class="{ 'is-animating': animatingEasings }"
                :style="{
                  animationTimingFunction: e.value,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Component Transitions -->
    <div class="vd-row vd-mb-8">
      <!-- VdExpandTransition Demo -->
      <div class="vd-col-12 vd-col-lg-6 vd-mb-6 mb-lg-0">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>&lt;VdExpandTransition&gt;</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-secondary vd-mb-4">
              Smooth WAAPI height/opacity collapse for accordions, code blocks,
              and trees. Automatically measures natural content height and picks
              the matching Fibonacci duration.
            </p>

            <div class="vd-d-flex vd-gap-4 vd-mb-4 items-center vd-flex-wrap">
              <VdButton
                size="sm"
                variant="primary"
                @click="expandOpen = !expandOpen"
              >
                {{ expandOpen ? "Collapse panel" : "Expand panel" }}
              </VdButton>

              <div class="vd-btn-group" role="group">
                <button
                  type="button"
                  class="vd-btn vd-btn-sm"
                  :class="
                    expandSize === 'short'
                      ? 'vd-btn-primary'
                      : 'vd-btn-outline-primary'
                  "
                  @click="expandSize = 'short'"
                >
                  Short (144ms)
                </button>
                <button
                  type="button"
                  class="vd-btn vd-btn-sm"
                  :class="
                    expandSize === 'medium'
                      ? 'vd-btn-primary'
                      : 'vd-btn-outline-primary'
                  "
                  @click="expandSize = 'medium'"
                >
                  Medium (233ms)
                </button>
                <button
                  type="button"
                  class="vd-btn vd-btn-sm"
                  :class="
                    expandSize === 'tall'
                      ? 'vd-btn-primary'
                      : 'vd-btn-outline-primary'
                  "
                  @click="expandSize = 'tall'"
                >
                  Tall (377ms)
                </button>
              </div>
            </div>

            <div class="demo-expand-box">
              <VdExpandTransition>
                <div v-show="expandOpen" class="demo-expand-content">
                  <div class="vd-alert vd-alert-info vd-mb-3">
                    <i class="ph ph-check-circle"></i>
                    <div>
                      Adaptive duration based on content height:
                      <strong>{{
                        expandSize === "short"
                          ? "144ms (snappy)"
                          : expandSize === "medium"
                            ? "233ms (normal)"
                            : "377ms (moderate)"
                      }}</strong>
                    </div>
                  </div>
                  <p class="vd-text-sm vd-mb-2">
                    VdExpandTransition calculates actual scroll height and
                    gracefully manages interruptions without sudden jumps.
                  </p>
                  <template
                    v-if="expandSize === 'medium' || expandSize === 'tall'"
                  >
                    <p class="vd-text-sm vd-text-secondary vd-mb-2">
                      When reduced-motion is requested, spatial height sliding
                      is gracefully replaced with a rapid 89ms opacity
                      crossfade.
                    </p>
                  </template>
                  <template v-if="expandSize === 'tall'">
                    <div class="vd-p-3 vd-bg-secondary vd-rounded vd-text-sm">
                      Tall panels automatically ramp up to Fibonacci
                      <code>377ms</code> or <code>610ms</code> to keep the
                      apparent expansion speed natural and pleasing.
                    </div>
                  </template>
                </div>
              </VdExpandTransition>
            </div>
          </div>
        </div>
      </div>

      <!-- VdTransition Preset Demo -->
      <div class="vd-col-12 vd-col-lg-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>&lt;VdTransition&gt; Presets</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-secondary vd-mb-4">
              Declarative Vue transition wrapper providing GPU-accelerated
              presets configured with Fibonacci tokens.
            </p>

            <div class="vd-d-flex vd-gap-4 vd-mb-4 items-center vd-flex-wrap">
              <VdButton
                size="sm"
                variant="primary"
                @click="presetVisible = !presetVisible"
              >
                {{ presetVisible ? "Hide box" : "Show box" }}
              </VdButton>

              <select
                v-model="currentPreset"
                class="vd-input vd-input-sm"
                style="max-width: 140px"
                aria-label="Transition preset"
              >
                <option v-for="p in presets" :key="p" :value="p">
                  {{ p }}
                </option>
              </select>

              <select
                v-model="presetDuration"
                class="vd-input vd-input-sm"
                style="max-width: 140px"
                aria-label="Transition duration"
              >
                <option v-for="d in durations" :key="d.name" :value="d.ms">
                  {{ d.name }} ({{ d.ms }}ms)
                </option>
              </select>
            </div>

            <div class="demo-preset-stage">
              <VdTransition :name="currentPreset" :duration="presetDuration">
                <div v-if="presetVisible" class="demo-preset-card">
                  <i
                    class="ph ph-sparkle vd-text-primary"
                    style="font-size: 1.5rem"
                  ></i>
                  <div>
                    <strong>Preset: {{ currentPreset }}</strong>
                    <div class="vd-text-xs vd-text-secondary">
                      Duration: {{ presetDuration }}ms
                    </div>
                  </div>
                </div>
              </VdTransition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Motion Accessibility & Modes -->
    <div class="vd-card vd-card-glow demo-card vd-mb-8">
      <div class="vd-card-header">
        <h6>Accessibility &amp; Motion Modes</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-mb-4">
          vd3 respects user intent at all times. Motion is fully customizable
          via <code>setMotion()</code>, <code>useReducedMotion()</code>, and the
          <code>&lt;VdThemeCustomizer&gt;</code> component.
        </p>

        <div class="vd-row vd-mb-6">
          <div class="vd-col-12 vd-col-md-6 vd-mb-4 mb-md-0">
            <div class="vd-p-4 vd-rounded vd-border vd-bg-light">
              <h6 class="vd-mb-3">Live Motion Controller</h6>
              <div class="vd-btn-group vd-mb-3" role="group">
                <button
                  type="button"
                  class="vd-btn vd-btn-sm"
                  :class="
                    motionMode === 'auto'
                      ? 'vd-btn-primary'
                      : 'vd-btn-outline-primary'
                  "
                  @click="setMotion('auto')"
                >
                  auto
                </button>
                <button
                  type="button"
                  class="vd-btn vd-btn-sm"
                  :class="
                    motionMode === 'full'
                      ? 'vd-btn-primary'
                      : 'vd-btn-outline-primary'
                  "
                  @click="setMotion('full')"
                >
                  full
                </button>
                <button
                  type="button"
                  class="vd-btn vd-btn-sm"
                  :class="
                    motionMode === 'reduce'
                      ? 'vd-btn-primary'
                      : 'vd-btn-outline-primary'
                  "
                  @click="setMotion('reduce')"
                >
                  reduce
                </button>
                <button
                  type="button"
                  class="vd-btn vd-btn-sm"
                  :class="
                    motionMode === 'off'
                      ? 'vd-btn-primary'
                      : 'vd-btn-outline-primary'
                  "
                  @click="setMotion('off')"
                >
                  off
                </button>
              </div>

              <div class="vd-text-sm">
                <div>
                  Current mode: <code>data-motion="{{ motionMode }}"</code>
                </div>
                <div class="mt-1">
                  Active motion state:
                  <span
                    class="vd-badge"
                    :class="isReduced ? 'vd-badge-warning' : 'vd-badge-success'"
                  >
                    {{
                      motionMode === "off"
                        ? "Transitions disabled (0ms)"
                        : isReduced
                          ? "Reduced motion (opacity only)"
                          : "Full motion active"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="vd-col-12 vd-col-md-6">
            <table class="vd-table vd-table-striped vd-mb-0">
              <thead>
                <tr>
                  <th>Mode</th>
                  <th>Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>auto</code></td>
                  <td>
                    Follows OS <code>prefers-reduced-motion</code> automatically
                    (default).
                  </td>
                </tr>
                <tr>
                  <td><code>full</code></td>
                  <td>Enables all spatial, sliding, and scale animations.</td>
                </tr>
                <tr>
                  <td><code>reduce</code></td>
                  <td>
                    Eliminates movement; transforms becomes crossfades at 89ms.
                  </td>
                </tr>
                <tr>
                  <td><code>off</code></td>
                  <td>Disables all transitions outright (<code>0ms</code>).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <DocCodeSnippet
          :js="composableSnippet"
          :toggle-label="'View Composable Code'"
        />
      </div>
    </div>

    <!-- Code Examples & API Reference -->
    <div class="vd-card demo-card vd-mb-8">
      <div class="vd-card-header">
        <h6>Code Snippets &amp; Token Reference</h6>
      </div>
      <div class="vd-card-body">
        <h6 class="vd-mb-3">VdExpandTransition Usage</h6>
        <DocCodeSnippet :vue="expandSnippet" class="vd-mb-6" />

        <h6 class="vd-mb-3">VdTransition Presets</h6>
        <DocCodeSnippet :vue="transitionSnippet" class="vd-mb-6" />

        <h6 class="vd-mb-3">CSS Motion Variables</h6>
        <DocCodeSnippet :css="cssTokensSnippet" />
      </div>
    </div>

    <!-- Related Links -->
    <GuideLinkCards
      class="vd-mt-8"
      icon="ph-wave-sine"
      title="Explore related foundations"
      :links="relatedComponents"
    />
  </section>
</template>

<style scoped>
/* Cards inside vd-row columns stretch to equal height (vd-h-100 does not exist) */
.demo-card {
  height: 100%;
}

.motion-sequence-highlight {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--vd-color-primary-subtle, rgba(34, 184, 207, 0.1));
  color: var(--vd-color-primary);
  font-family: var(--vd-font-family-mono, monospace);
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: var(--vd-radius-fib-3, 0.5rem);
  letter-spacing: 0.04em;
}

/* Ladder styling */
.motion-ladder {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.motion-ladder-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.motion-ladder-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  flex-wrap: wrap;
}

.motion-ladder-badge {
  display: inline-block;
  min-width: 58px;
  text-align: right;
  font-family: var(--vd-font-family-mono, monospace);
  font-weight: 700;
  color: var(--vd-color-primary);
}

.motion-ladder-token {
  font-size: 0.8rem;
}

.motion-ladder-use {
  color: var(--vd-text-secondary);
  font-size: 0.8rem;
}

.motion-ladder-track {
  width: 100%;
  height: 10px;
  background: var(--vd-bg-secondary);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.motion-ladder-bar {
  width: 0%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--vd-color-primary),
    var(--vd-color-primary-light, #3bc9db)
  );
  border-radius: 999px;
}

.motion-ladder-bar.is-animating {
  animation-name: ladderFill;
  animation-timing-function: var(--vd-ease-out, cubic-bezier(0.16, 1, 0.3, 1));
  animation-fill-mode: forwards;
}

@keyframes ladderFill {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

/* Easings styling */
.motion-easings {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.motion-easing-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.motion-easing-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  flex-wrap: wrap;
}

.motion-easing-track {
  width: 100%;
  height: 28px;
  background: var(--vd-bg-secondary);
  border-radius: var(--vd-radius-fib-3, 0.5rem);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 4px;
  /* Makes 100cqw below resolve to the track width, not the viewport */
  container-type: inline-size;
}

.motion-easing-ball {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vd-color-primary);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transform: translateX(0);
}

.motion-easing-ball.is-animating {
  animation-name: ballSlide;
  animation-duration: 987ms;
  animation-fill-mode: forwards;
}

/* Travel to the end of the track, hold, then return to the start */
@keyframes ballSlide {
  0% {
    transform: translateX(0);
  }
  45%,
  55% {
    transform: translateX(calc(100cqw - 28px));
  }
  100% {
    transform: translateX(0);
  }
}

/* Interactive expand demo box */
.demo-expand-box {
  min-height: 120px;
  border: 1px dashed var(--vd-border-color);
  border-radius: var(--vd-radius-fib-3, 0.5rem);
  padding: 1rem;
  background: var(--vd-bg-primary);
}

.demo-expand-content {
  overflow: hidden;
}

/* Interactive preset demo stage */
.demo-preset-stage {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--vd-border-color);
  border-radius: var(--vd-radius-fib-3, 0.5rem);
  background: var(--vd-bg-primary);
  overflow: hidden;
}

.demo-preset-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--vd-bg-secondary);
  border: 1px solid var(--vd-border-color);
  border-radius: var(--vd-radius-fib-3, 0.5rem);
  box-shadow: var(--vd-shadow-sm);
}
</style>
