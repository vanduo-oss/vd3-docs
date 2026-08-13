<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useGlass, VdModal, VdSwitch } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useGlass(root);

const glassModalOpen = ref(false);
const surfaceOptions = [
  { id: "mesh", label: "Mesh" },
  { id: "stripe", label: "Stripe" },
  { id: "noise", label: "Noise" },
  { id: "aurora", label: "Aurora" },
  { id: "dots", label: "Dots" },
  { id: "grid", label: "Grid" },
] as const;

type SurfaceId = (typeof surfaceOptions)[number]["id"];

const surfaceVariant = ref<SurfaceId>("mesh");
const activeStep = ref(5);

const fibSteps = [
  {
    step: 1,
    blur: "2px",
    tint: "0.08",
    border: "0.12",
    use: "Chips, tags, hover hints",
  },
  {
    step: 2,
    blur: "3px",
    tint: "0.12",
    border: "0.16",
    use: "Tooltips, small badges",
  },
  {
    step: 3,
    blur: "5px",
    tint: "0.16",
    border: "0.20",
    use: "Secondary cards, list rows",
  },
  {
    step: 5,
    blur: "8px",
    tint: "0.20",
    border: "0.24",
    use: "Primary cards, panels (default)",
  },
  {
    step: 8,
    blur: "13px",
    tint: "0.28",
    border: "0.30",
    use: "Navigation bars, headers",
  },
  {
    step: 13,
    blur: "16px",
    tint: "0.32",
    border: "0.34",
    use: "Modals, primary CTA surfaces",
  },
  {
    step: 21,
    blur: "20px",
    tint: "0.38",
    border: "0.38",
    use: "Hero accent — GPU blur soft-cap",
  },
  {
    step: 34,
    blur: "22px",
    tint: "0.46",
    border: "0.44",
    use: "Marketing bands — tint escalates more than blur",
  },
  {
    step: 55,
    blur: "24px",
    tint: "0.55",
    border: "0.50",
    use: "Heavy hero frost — prefer sparingly",
  },
  {
    step: 89,
    blur: "26px",
    tint: "0.66",
    border: "0.58",
    use: "Extreme ceiling (~100); next fib 144 omitted",
  },
] as const;

const activeMeta = computed(
  () => fibSteps.find((s) => s.step === activeStep.value) ?? fibSteps[3],
);

const stageFading = ref(false);
const stepFading = ref(false);
const autoplay = ref(true);
/** Docs-only surface pattern motion (default on; user can disable). */
const surfaceMotion = ref(true);
const prefersReducedMotion = ref(false);

/** Fibonacci-flavored dwell (~3.2s steps, ~2.6s surfaces). */
const STEP_INTERVAL_MS = 3200;
const SURFACE_INTERVAL_MS = 2600;
const MANUAL_PAUSE_MS = 8000;

let stepTimer: ReturnType<typeof setInterval> | null = null;
let surfaceTimer: ReturnType<typeof setInterval> | null = null;
let manualResumeTimer: ReturnType<typeof setTimeout> | null = null;
let fadeClearTimer: ReturnType<typeof setTimeout> | null = null;
let motionMq: MediaQueryList | null = null;
let onMotionChange: (() => void) | null = null;

const stageClass = computed(
  () =>
    `vd-surface vd-surface-${surfaceVariant.value} vd-surface-5 seemore-stage${
      surfaceMotion.value ? " seemore-surface-motion" : ""
    }${stageFading.value ? " is-crossfading" : ""}`,
);

const explorerStageClass = computed(
  () =>
    `vd-surface vd-surface-mesh vd-surface-5 seemore-stage${
      surfaceMotion.value ? " seemore-surface-motion" : ""
    }`,
);

const pulseFade = (target: "stage" | "step"): void => {
  if (prefersReducedMotion.value) return;
  if (target === "stage") stageFading.value = true;
  else stepFading.value = true;
  if (fadeClearTimer) clearTimeout(fadeClearTimer);
  fadeClearTimer = setTimeout(() => {
    stageFading.value = false;
    stepFading.value = false;
  }, 420);
};

const advanceStep = (): void => {
  const idx = fibSteps.findIndex((s) => s.step === activeStep.value);
  const next = fibSteps[(idx + 1) % fibSteps.length];
  pulseFade("step");
  activeStep.value = next.step;
};

const advanceSurface = (): void => {
  const idx = surfaceOptions.findIndex((s) => s.id === surfaceVariant.value);
  const next = surfaceOptions[(idx + 1) % surfaceOptions.length];
  pulseFade("stage");
  surfaceVariant.value = next.id;
};

const clearTimers = (): void => {
  if (stepTimer) clearInterval(stepTimer);
  if (surfaceTimer) clearInterval(surfaceTimer);
  stepTimer = null;
  surfaceTimer = null;
};

const startAutoplay = (): void => {
  clearTimers();
  if (!autoplay.value || prefersReducedMotion.value) return;
  stepTimer = setInterval(advanceStep, STEP_INTERVAL_MS);
  surfaceTimer = setInterval(advanceSurface, SURFACE_INTERVAL_MS);
};

const pauseAutoplayBriefly = (): void => {
  autoplay.value = false;
  clearTimers();
  if (manualResumeTimer) clearTimeout(manualResumeTimer);
  if (prefersReducedMotion.value) return;
  manualResumeTimer = setTimeout(() => {
    autoplay.value = true;
    startAutoplay();
  }, MANUAL_PAUSE_MS);
};

const toggleAutoplay = (): void => {
  if (manualResumeTimer) clearTimeout(manualResumeTimer);
  autoplay.value = !autoplay.value;
  if (autoplay.value) startAutoplay();
  else clearTimers();
};

const selectStep = (step: number): void => {
  pulseFade("step");
  activeStep.value = step;
  pauseAutoplayBriefly();
};

const selectSurface = (id: SurfaceId): void => {
  pulseFade("stage");
  surfaceVariant.value = id;
  pauseAutoplayBriefly();
};

watch(autoplay, (on) => {
  if (on) startAutoplay();
  else clearTimers();
});

onMounted(() => {
  motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  onMotionChange = (): void => {
    prefersReducedMotion.value = motionMq!.matches;
    if (motionMq!.matches) {
      autoplay.value = false;
      surfaceMotion.value = false;
      clearTimers();
    } else if (autoplay.value) {
      startAutoplay();
    }
  };
  onMotionChange();
  motionMq.addEventListener("change", onMotionChange);
});

onUnmounted(() => {
  if (motionMq && onMotionChange) {
    motionMq.removeEventListener("change", onMotionChange);
  }
  clearTimers();
  if (manualResumeTimer) clearTimeout(manualResumeTimer);
  if (fadeClearTimer) clearTimeout(fadeClearTimer);
});

const vue3Wiring = `import { ref } from 'vue';
import { useGlass, useNavbarGlassScroll } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useGlass(root); // toggles .is-glass-active on [data-glass-scroll]

const navRef = ref<HTMLElement | null>(null);
const isScrolled = useNavbarGlassScroll(navRef);`;

const fibHtml = `<!-- Seemore Glass — Fibonacci strength steps -->
<div class="vd-glass vd-glass-1">chip</div>
<div class="vd-glass vd-glass-5">card (default)</div>
<div class="vd-glass vd-glass-13 vd-glass-adaptive">modal</div>
<div class="vd-glass vd-glass-21">hero accent (blur soft-cap)</div>
<div class="vd-glass vd-glass-89">extreme marketing ceiling</div>

<!-- Legacy aliases still work: sm→3, md→5, lg→8, xl→13 -->
<div class="vd-glass vd-glass-lg">…</div>`;

const surfacePairHtml = `<div class="vd-surface vd-surface-stripe vd-surface-5">
  <div class="vd-glass vd-glass-8 vd-glass-floating">
    Frosted panel over a reusable Surface
  </div>
</div>`;

const modifiersHtml = `<!-- Behavior modifiers -->
<div class="vd-glass vd-glass-8 vd-glass-tinted">…</div>
<div class="vd-glass vd-glass-5 vd-glass-floating">…</div>
<div class="vd-glass vd-glass-5 vd-glass-contrast">…</div>
<div class="vd-glass vd-glass-8 vd-glass-adaptive">…</div>`;

const componentsHtml = `<nav class="vd-navbar vd-navbar-glass vd-navbar-float vd-navbar-fixed">…</nav>
<div class="vd-card vd-card-glass">…</div>
<div class="vd-toast vd-toast-glass">…</div>
<button class="vd-fab vd-fab-glass"><i class="ph ph-plus"></i></button>
<div class="vd-modal vd-modal-glass">…</div>`;

const tokens: [string, string, string][] = [
  ["--vd-glass-blur", "Backdrop blur (step-driven)", "8px @ step 5"],
  ["--vd-glass-bg-opacity", "Tint opacity", "0.20 @ step 5"],
  ["--vd-glass-border-alpha", "Edge opacity", "0.24 @ step 5"],
  ["--vd-glass-saturate", "Backdrop saturation", "1.7 @ step 5"],
  ["--vd-glass-highlight-alpha", "Rim sheen", "0.22 @ step 5"],
  ["--vd-glass-shadow", "Elevation shadow", "step-scaled"],
  ["--vd-glass-noise-opacity", "Grain overlay", "0.035 @ step 5"],
];

const primitives = [
  {
    title: "Blur",
    body: "backdrop-filter softens the Surface behind the panel. Soft-cap ~20px for UI; 34/55/89 rise modestly to 26px.",
  },
  {
    title: "Tint",
    body: "Semi-transparent fill so blur never ships alone. Opacity rises with the same Fibonacci index.",
  },
  {
    title: "Edge",
    body: "A light border + single-direction rim highlight separates glass from the backdrop.",
  },
  {
    title: "Elevation",
    body: "Soft box-shadow scales with the step so thicker glass also floats a little higher.",
  },
] as const;

const glassComponents = [
  {
    label: "Modal",
    to: "/components/modal",
    blurb: "Overlay frost — prefer steps 8–13",
  },
  {
    label: "Card",
    to: "/components/card",
    blurb: ".vd-card-glass panels",
  },
  {
    label: "Toast",
    to: "/components/toast",
    blurb: ".vd-toast-glass notices",
  },
  {
    label: "FAB",
    to: "/components/fab",
    blurb: ".vd-fab-glass actions",
  },
  {
    label: "Navbar",
    to: "/components/navbar",
    blurb: "Glass + optional .vd-navbar-float",
  },
] as const;
</script>

<template>
  <section id="glass" ref="root">
    <h5 class="demo-title">
      <i class="ph ph-drop-half-bottom"></i>Seemore Glass
    </h5>
    <p class="vd-mb-6">
      Seemore Glass is vd3’s frosted material system: every strength step
      follows the Fibonacci sequence so blur, tint, edge, and elevation move
      together — the same harmonic language as the rest of the kit. Opt in with
      <code>.vd-glass</code> and a step class; stage demos on package
      <RouterLink to="/effects/surfaces"><code>.vd-surface-*</code></RouterLink>
      backdrops. Steps run through
      <strong>89</strong> (extreme marketing ceiling); prefer
      <strong>1–21</strong> for everyday UI.
    </p>

    <!-- Hero -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div id="demo-glass-hero" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Hero — live Surface + Glass</h6>
          </div>
          <div class="vd-card-body">
            <div class="seemore-controls vd-mb-4">
              <span class="vd-text-muted" style="font-size: 0.85rem"
                >Backdrop</span
              >
              <label
                v-for="opt in surfaceOptions"
                :key="opt.id"
                class="seemore-chip"
              >
                <input
                  :checked="surfaceVariant === opt.id"
                  type="radio"
                  name="seemore-surface"
                  :value="opt.id"
                  @change="selectSurface(opt.id)"
                />
                {{ opt.label }}
              </label>
              <div class="seemore-controls-end">
                <VdSwitch
                  id="seemore-hero-motion"
                  v-model="surfaceMotion"
                  size="sm"
                  label="Motion"
                  :disabled="prefersReducedMotion"
                />
                <button
                  type="button"
                  class="seemore-play-btn"
                  :aria-pressed="autoplay"
                  :aria-label="autoplay ? 'Pause autoplay' : 'Play autoplay'"
                  @click="toggleAutoplay"
                >
                  <i
                    class="ph"
                    :class="autoplay ? 'ph-pause' : 'ph-play'"
                    aria-hidden="true"
                  ></i>
                  {{ autoplay ? "Pause" : "Play" }}
                </button>
              </div>
            </div>
            <div :class="stageClass">
              <div
                class="vd-glass vd-glass-8 vd-glass-tinted seemore-hero-panel"
                :class="{ 'is-crossfading': stepFading }"
              >
                <h4 class="seemore-hero-title">GlassSurface</h4>
                <p>
                  Use <code>.vd-glass</code> with a Fibonacci step, then layer
                  tinted / floating / adaptive modifiers. Surfaces stay reusable
                  — not one-off demo CSS.
                </p>
                <div class="seemore-hero-actions">
                  <button type="button" class="vd-btn vd-btn-primary">
                    Primary Action
                  </button>
                  <button type="button" class="vd-btn vd-btn-outline">
                    Secondary
                  </button>
                </div>
              </div>
            </div>
            <p
              v-if="prefersReducedMotion"
              class="vd-text-muted vd-mt-3"
              style="font-size: 0.8rem; margin-bottom: 0"
            >
              Autoplay paused — <code>prefers-reduced-motion</code> is on.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Four primitives -->
    <div class="vd-row vd-mb-6">
      <div
        v-for="p in primitives"
        :key="p.title"
        class="vd-col-12 vd-col-md-6 vd-col-lg-3"
      >
        <div class="vd-card vd-card-glow demo-card seemore-primitive-card">
          <div class="vd-card-body">
            <h6 style="color: var(--vd-color-primary)">{{ p.title }}</h6>
            <p class="vd-text-muted" style="margin: 0; font-size: 0.9rem">
              {{ p.body }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Fib explorer -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Fibonacci strength explorer</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-muted vd-mb-4">
              Steps auto-advance so you can watch thickness change. Click any
              step to jump (pauses briefly). Default
              <code>.vd-glass</code> is step <strong>5</strong>. Past 21, blur
              rises only a little — tint, edge, and elevation do the heavy
              lifting through <strong>89</strong>.
            </p>
            <div class="seemore-step-rail vd-mb-4">
              <button
                v-for="s in fibSteps"
                :key="s.step"
                type="button"
                class="seemore-step-btn"
                :class="{ 'is-active': activeStep === s.step }"
                @click="selectStep(s.step)"
              >
                {{ s.step }}
              </button>
              <div class="seemore-controls-end">
                <VdSwitch
                  id="seemore-explorer-motion"
                  v-model="surfaceMotion"
                  size="sm"
                  label="Motion"
                  :disabled="prefersReducedMotion"
                />
                <button
                  type="button"
                  class="seemore-play-btn"
                  :aria-pressed="autoplay"
                  :aria-label="autoplay ? 'Pause autoplay' : 'Play autoplay'"
                  @click="toggleAutoplay"
                >
                  <i
                    class="ph"
                    :class="autoplay ? 'ph-pause' : 'ph-play'"
                    aria-hidden="true"
                  ></i>
                  {{ autoplay ? "Pause" : "Play" }}
                </button>
              </div>
            </div>
            <div class="vd-row" style="align-items: stretch">
              <div class="vd-col-12 vd-col-lg-7">
                <div :class="explorerStageClass">
                  <div
                    class="vd-glass seemore-hero-panel"
                    :class="[
                      `vd-glass-${activeStep}`,
                      { 'is-crossfading': stepFading },
                    ]"
                  >
                    <h4 class="seemore-hero-title">
                      .vd-glass-{{ activeStep }}
                    </h4>
                    <p>{{ activeMeta.use }}</p>
                    <ul class="seemore-readout">
                      <li>
                        Blur <code>{{ activeMeta.blur }}</code>
                      </li>
                      <li>
                        Tint <code>{{ activeMeta.tint }}</code>
                      </li>
                      <li>
                        Border <code>{{ activeMeta.border }}</code>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="vd-col-12 vd-col-lg-5">
                <div class="seemore-table-wrap">
                  <table class="vd-table seemore-table">
                    <thead>
                      <tr>
                        <th>Step</th>
                        <th>Blur</th>
                        <th>Tint</th>
                        <th>Edge</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="s in fibSteps"
                        :key="s.step"
                        :class="{ 'is-active-row': activeStep === s.step }"
                        @click="selectStep(s.step)"
                      >
                        <td>
                          <code>.vd-glass-{{ s.step }}</code>
                        </td>
                        <td>{{ s.blur }}</td>
                        <td>{{ s.tint }}</td>
                        <td>{{ s.border }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="vd-text-muted" style="font-size: 0.8rem">
                    Aliases: <code>.vd-glass-sm</code>→3,
                    <code>.vd-glass-md</code>→5, <code>.vd-glass-lg</code>→8,
                    <code>.vd-glass-xl</code>→13. Ceiling:
                    <code>.vd-glass-89</code>.
                  </p>
                </div>
              </div>
            </div>
            <DocCodeSnippet class="vd-mt-4" :html="fibHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Surfaces pairing -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Surfaces make glass sing</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-muted vd-mb-4">
              Mesh, stripe, noise, aurora, dots, and grid ship as
              <code>.vd-surface-*</code> — see the
              <RouterLink to="/effects/surfaces">Surfaces</RouterLink> page for
              the full assorti.
            </p>
            <div class="vd-row">
              <div
                v-for="opt in surfaceOptions"
                :key="`grid-${opt.id}`"
                class="vd-col-12 vd-col-md-6 vd-col-lg-4 vd-mb-4"
              >
                <div
                  class="vd-surface vd-surface-5 seemore-mini-stage"
                  :class="`vd-surface-${opt.id}`"
                >
                  <div class="vd-glass vd-glass-5 seemore-mini-panel">
                    <strong>{{ opt.label }}</strong>
                    <span class="vd-text-muted" style="font-size: 0.75rem"
                      >.vd-surface-{{ opt.id }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <DocCodeSnippet :html="surfacePairHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modifiers -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-lg-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Modifiers</h6></div>
          <div class="vd-card-body">
            <div
              class="vd-surface vd-surface-aurora vd-surface-5 seemore-stage"
            >
              <div class="seemore-mod-grid">
                <div
                  class="vd-glass vd-glass-5 vd-glass-tinted seemore-mini-panel"
                >
                  tinted
                </div>
                <div
                  class="vd-glass vd-glass-5 vd-glass-floating seemore-mini-panel"
                >
                  floating
                </div>
                <div
                  class="vd-glass vd-glass-5 vd-glass-contrast seemore-mini-panel"
                >
                  contrast
                </div>
                <div
                  class="vd-glass vd-glass-5 vd-glass-adaptive seemore-mini-panel"
                >
                  adaptive
                </div>
              </div>
            </div>
            <DocCodeSnippet class="vd-mt-4" :html="modifiersHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Accessibility</h6></div>
          <div class="vd-card-body">
            <ul class="seemore-a11y-list">
              <li>
                <code>prefers-reduced-transparency</code> — near-opaque solid,
                no blur
              </li>
              <li>
                <code>prefers-contrast: more</code> — thicker border, higher
                tint
              </li>
              <li>
                <code>prefers-reduced-motion</code> — floating / scroll proxies
                stop; explorer autoplay pauses
              </li>
              <li>
                <code>@supports not (backdrop-filter)</code> — solid
                <code>--vd-bg-primary</code> fallback
              </li>
              <li>
                Scroll glass never transitions <code>backdrop-filter</code> —
                GPU-friendly proxy only
              </li>
            </ul>
            <p class="vd-text-muted" style="font-size: 0.85rem; margin: 0">
              Tip: never put long-form body copy on raw glass; keep one fib step
              per surface type; limit overlapping frost layers to two.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Component integration -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Component integration</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-muted vd-mb-4">
              Glass modifiers on kit components — open the modal over a rich
              Surface so frost reads light, not opaque chrome.
            </p>
            <div
              class="vd-surface vd-surface-aurora vd-surface-5 seemore-integration-stage vd-mb-4"
            >
              <div class="seemore-integration-grid">
                <div class="vd-card vd-card-glass seemore-mini-panel">
                  <strong
                    ><RouterLink to="/components/card"
                      >.vd-card-glass</RouterLink
                    ></strong
                  >
                  <p class="vd-text-muted" style="margin: 0.35rem 0 0">
                    Card surface frost
                  </p>
                </div>
                <div
                  class="vd-toast vd-toast-glass"
                  style="position: static; width: 100%"
                >
                  <div class="vd-toast-body">
                    <RouterLink to="/components/toast"
                      >.vd-toast-glass</RouterLink
                    >
                    sample
                  </div>
                </div>
                <div class="seemore-fab-row">
                  <button type="button" class="vd-fab vd-fab-glass">
                    <i class="ph ph-plus" aria-hidden="true"></i>
                  </button>
                  <RouterLink to="/components/fab" class="vd-text-muted"
                    >.vd-fab-glass</RouterLink
                  >
                </div>
              </div>
              <div class="seemore-integration-links">
                <RouterLink
                  v-for="c in glassComponents"
                  :key="c.to"
                  :to="c.to"
                  class="seemore-comp-link"
                >
                  <strong>{{ c.label }}</strong>
                  <span>{{ c.blurb }}</span>
                </RouterLink>
              </div>
              <button
                type="button"
                class="vd-btn vd-btn-primary"
                @click="glassModalOpen = true"
              >
                Open glass modal
              </button>
            </div>
            <DocCodeSnippet :html="componentsHtml" />
            <DocCodeSnippet class="vd-mt-4" :js="vue3Wiring" />
          </div>
        </div>
      </div>
    </div>

    <!-- Tokens -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Theming tokens</h6></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Role</th>
                  <th>Default (step 5)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="[name, role, def] in tokens" :key="name">
                  <td>
                    <code>{{ name }}</code>
                  </td>
                  <td>{{ role }}</td>
                  <td>
                    <code>{{ def }}</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll demo -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Scroll-activated glass</h6></div>
          <div class="vd-card-body">
            <div id="seemore-scroll-sentinel" class="seemore-sentinel">
              Sentinel — scroll until this leaves view
            </div>
            <div
              class="vd-glass vd-glass-8"
              data-glass-scroll
              data-glass-sentinel="#seemore-scroll-sentinel"
              style="padding: 1.25rem; margin-top: 1rem"
            >
              Transparent at rest; frosts when the sentinel exits (blur enables
              instantly — no <code>backdrop-filter</code> transition).
            </div>
          </div>
        </div>
      </div>
    </div>

    <VdModal
      :open="glassModalOpen"
      title="Seemore glass modal"
      glass
      size="md"
      @update:open="glassModalOpen = $event"
      @close="glassModalOpen = false"
    >
      <p>
        Light frosted overlay (step-13 defaults) — glass over whatever Surface
        or page content sits behind the soft wash backdrop.
      </p>
      <div
        class="vd-card vd-card-glass"
        style="padding: 0.85rem; margin: 1rem 0"
      >
        <strong>Related glass components</strong>
        <ul style="margin: 0.5rem 0 0; padding-left: 1.1rem">
          <li>
            <RouterLink to="/components/modal">Modal</RouterLink> —
            <code>glass</code> prop
          </li>
          <li>
            <RouterLink to="/components/card">Card</RouterLink> —
            <code>.vd-card-glass</code>
          </li>
          <li>
            <RouterLink to="/components/toast">Toast</RouterLink> —
            <code>.vd-toast-glass</code>
          </li>
          <li>
            <RouterLink to="/components/fab">FAB</RouterLink> —
            <code>.vd-fab-glass</code>
          </li>
          <li>
            <RouterLink to="/components/navbar">Navbar</RouterLink> — glass +
            <code>.vd-navbar-float</code>
          </li>
        </ul>
      </div>
    </VdModal>
  </section>
</template>

<style scoped>
.seemore-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
}
.seemore-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.7rem;
  border-radius: var(--vd-radius-fib-5, 0.5rem);
  border: 1px solid var(--vd-border-color);
  background: var(--vd-bg-secondary);
  font-size: 0.82rem;
  cursor: pointer;
  user-select: none;
}
.seemore-chip input {
  accent-color: var(--vd-color-primary);
}
.seemore-play-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: var(--vd-radius-fib-5, 0.5rem);
  border: 1px solid var(--vd-border-color);
  background: var(--vd-bg-secondary);
  color: var(--vd-text-primary);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}
.seemore-controls-end {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}
.seemore-controls-end :deep(.vd-form-switch) {
  margin: 0;
  font-size: 0.82rem;
  gap: 0.4rem;
}
.seemore-play-btn[aria-pressed="true"] {
  border-color: var(--vd-color-primary);
  color: var(--vd-color-primary);
}
.seemore-stage {
  min-height: 16rem;
  border-radius: var(--vd-radius-fib-8, 0.75rem);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.4s ease;
}
.seemore-stage.is-crossfading,
.seemore-hero-panel.is-crossfading {
  opacity: 0.62;
}
.seemore-hero-panel {
  max-width: 32rem;
  width: 100%;
  border-radius: var(--vd-radius-fib-8, 0.75rem);
  padding: 1.5rem;
  /* Calm step/surface swaps: opacity + soft chrome only — no transform bounce */
  transform: none !important;
  transition:
    opacity 0.45s ease,
    box-shadow 0.45s ease,
    border-color 0.45s ease,
    background-color 0.45s ease;
}
.seemore-hero-panel.vd-glass-floating:hover,
.seemore-hero-panel.vd-glass-floating:focus-within {
  box-shadow: inherit;
}
.seemore-hero-title {
  color: var(--vd-color-primary);
  margin: 0 0 0.5rem;
}
.seemore-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1rem;
}
.seemore-primitive-card {
  height: 100%;
  margin-bottom: 1rem;
}
.seemore-step-rail {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
}
.seemore-step-btn {
  min-width: 2.75rem;
  padding: 0.45rem 0.7rem;
  border-radius: var(--vd-radius-fib-5, 0.5rem);
  border: 1px solid var(--vd-border-color);
  background: var(--vd-bg-secondary);
  color: var(--vd-text-primary);
  cursor: pointer;
  font-weight: 600;
}
.seemore-step-btn.is-active {
  border-color: var(--vd-color-primary);
  background: color-mix(in srgb, var(--vd-color-primary) 18%, transparent);
  color: var(--vd-color-primary);
}
.seemore-readout {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.85rem;
}
.seemore-table-wrap {
  padding: 0.25rem 0 0.25rem 0.5rem;
  max-height: 22rem;
  overflow: auto;
}
.seemore-table tbody tr {
  cursor: pointer;
}
.seemore-table tbody tr.is-active-row {
  background: color-mix(in srgb, var(--vd-color-primary) 12%, transparent);
}
.seemore-mini-stage {
  min-height: 8.5rem;
  border-radius: var(--vd-radius-fib-5, 0.5rem);
  padding: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.seemore-mini-panel {
  width: 100%;
  border-radius: var(--vd-radius-fib-5, 0.5rem);
  padding: 0.75rem;
  text-align: center;
}
.seemore-mod-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  width: 100%;
}
.seemore-a11y-list {
  margin: 0 0 1rem;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.55rem;
  font-size: 0.9rem;
}
.seemore-sentinel {
  padding: 1rem;
  border: 1px dashed var(--vd-border-color);
  border-radius: var(--vd-radius-fib-5, 0.5rem);
  background: var(--vd-bg-secondary);
}
.seemore-integration-stage {
  border-radius: var(--vd-radius-fib-8, 0.75rem);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.seemore-integration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 0.85rem;
  align-items: center;
}
.seemore-fab-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.seemore-integration-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}
.seemore-comp-link {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.55rem 0.75rem;
  border-radius: var(--vd-radius-fib-5, 0.5rem);
  background: color-mix(in srgb, var(--vd-bg-primary) 55%, transparent);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: inherit;
  text-decoration: none;
  font-size: 0.82rem;
  min-width: 7.5rem;
}
.seemore-comp-link:hover {
  border-color: var(--vd-color-primary);
}
.seemore-comp-link span {
  opacity: 0.75;
  font-size: 0.75rem;
}
@media (prefers-reduced-motion: reduce) {
  .seemore-stage,
  .seemore-hero-panel {
    transition: none;
  }
  .seemore-stage.is-crossfading,
  .seemore-hero-panel.is-crossfading {
    opacity: 1;
  }
}
</style>
