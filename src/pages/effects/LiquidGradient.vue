<script setup lang="ts">
import { computed, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useLiquidGradient } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useLiquidGradient(root);

const intensity = ref(1.35);
const speed = ref(1.15);
const grain = ref(0.05);
const distort = ref(0.48);

const demoStyle = computed(() => ({
  "--vd-liquid-intensity": String(intensity.value),
  "--vd-liquid-speed": String(speed.value),
  "--vd-liquid-grain": String(grain.value),
  "--vd-liquid-distort": String(distort.value),
}));

const vue3Wiring = `import { ref } from 'vue';
import { useLiquidGradient } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useLiquidGradient(root);
// Scans .vd-liquid-gradient hosts; starts when .vd-liquid-gradient-active
// (or data-vd-liquid-active) is present. Theme + --vd-liquid-* sync automatically.`;

const markupHtml = `<!-- Contained demo -->
<div class="vd-liquid-gradient vd-liquid-gradient-active" aria-hidden="true"
     style="--vd-liquid-intensity: 1.35; min-height: 16rem;">
  <canvas class="vd-liquid-gradient-canvas"></canvas>
</div>

<!-- Full-viewport atmosphere (Labs home style) -->
<div class="vd-liquid-gradient vd-liquid-gradient-fixed vd-liquid-gradient-active"
     aria-hidden="true">
  <canvas class="vd-liquid-gradient-canvas"></canvas>
</div>`;

const factoryHtml = `import { createLiquidGradient } from "@vanduo-oss/vd3";

const canvas = document.querySelector("canvas");
const engine = createLiquidGradient(canvas, { reducedMotion: false });
engine?.start();
// engine.syncThemeColors() / engine.syncKnobs() / engine.destroy()`;

const classRows: [string, string, string][] = [
  [
    ".vd-liquid-gradient",
    "host",
    "Required host. Holds --vd-liquid-* knobs; decorative (pointer-events: none).",
  ],
  [
    ".vd-liquid-gradient-canvas",
    "child",
    "WebGL canvas. Auto-created by useLiquidGradient if missing.",
  ],
  [
    ".vd-liquid-gradient-active",
    "host",
    "Visible + running. Without it the engine stays stopped.",
  ],
  [
    "data-vd-liquid-active",
    "host",
    'Alternate active flag (any value except "false").',
  ],
  [
    ".vd-liquid-gradient-fixed",
    "host",
    "position: fixed; inset: 0 — full-viewport atmosphere.",
  ],
  [
    ".vd-liquid-gradient-fill",
    "host",
    "position: absolute; inset: 0 — fill a positioned parent.",
  ],
];

const tokenRows: [string, string, string][] = [
  ["--vd-liquid-speed", "1.15", "Orbit / animation speed multiplier"],
  ["--vd-liquid-intensity", "1.35", "Overall color intensity"],
  ["--vd-liquid-grain", "0.05", "Film-grain overlay strength"],
  ["--vd-liquid-distort", "0.48", "Pointer UV distortion strength"],
  ["--vd-liquid-gradient-size", "0.48", "Radial blob radius"],
  ["--vd-liquid-primary-weight", "0.85", "Primary color contribution"],
  ["--vd-liquid-neutral-weight", "1.15", "Neutral color contribution"],
  ["--vd-liquid-alpha", "1", "Fragment output alpha"],
];
</script>

<template>
  <section id="liquid-gradient" ref="root">
    <h5 class="demo-title"><i class="ph ph-wave-sine"></i>Liquid Gradient</h5>
    <p class="vd-mb-6">
      Interactive liquid atmosphere rendered with vanilla WebGL (no Three.js).
      Colors follow vd3 <strong>primary</strong>, <strong>neutral</strong>, and
      background tokens and update live with light/dark theme changes. Move the
      pointer over the demo to ripple the surface.
    </p>

    <!-- Live demo -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Live demo</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-4">
              Use the site theme switcher to flip light/dark and primary — the
              gradient rebinds automatically. Drag the knobs to override
              <code>--vd-liquid-*</code> on this host.
            </p>
            <div
              class="vd-liquid-gradient vd-liquid-gradient-active liquid-demo-host"
              aria-hidden="true"
              :style="demoStyle"
            >
              <canvas class="vd-liquid-gradient-canvas"></canvas>
            </div>
            <div class="liquid-demo-overlay">
              <span>Move pointer · theme-aware primary + neutrals</span>
            </div>
            <div class="liquid-knobs vd-mt-5">
              <label>
                Intensity
                <input
                  v-model.number="intensity"
                  type="range"
                  min="0.6"
                  max="2"
                  step="0.05"
                />
                <code>{{ intensity.toFixed(2) }}</code>
              </label>
              <label>
                Speed
                <input
                  v-model.number="speed"
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                />
                <code>{{ speed.toFixed(2) }}</code>
              </label>
              <label>
                Grain
                <input
                  v-model.number="grain"
                  type="range"
                  min="0"
                  max="0.2"
                  step="0.01"
                />
                <code>{{ grain.toFixed(2) }}</code>
              </label>
              <label>
                Distort
                <input
                  v-model.number="distort"
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                />
                <code>{{ distort.toFixed(2) }}</code>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Markup -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Markup</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="markupHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- API -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>API reference</h6></div>
          <div class="vd-card-body">
            <h4 class="vd-mt-0">Wiring</h4>
            <DocCodeSnippet :js="vue3Wiring" :default-open="true" />

            <h4 class="vd-mt-6">Factory (framework-agnostic)</h4>
            <DocCodeSnippet :js="factoryHtml" />

            <h4 class="vd-mt-6">Classes &amp; attributes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table">
                <thead>
                  <tr>
                    <th>Class / attribute</th>
                    <th>Applies to</th>
                    <th>Effect</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in classRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="vd-mt-6">Customization tokens</h4>
            <div class="vd-table-responsive">
              <table class="vd-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Default</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in tokenRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>
                      <code>{{ row[1] }}</code>
                    </td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="vd-text-sm vd-text-muted vd-mt-5">
              Theme colors come from
              <code>--vd-color-primary-rgb</code> /
              <code>--vd-color-primary</code>, <code>--vd-neutral-2/6/8</code>,
              and <code>--vd-bg-primary</code>, mixed differently for
              <code>data-theme="light"</code> vs <code>dark</code>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- A11y -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Accessibility</h6></div>
          <div class="vd-card-body">
            <ul class="vd-mb-0">
              <li>
                Mark the host <code>aria-hidden="true"</code> — it is
                decorative.
              </li>
              <li>
                <code>prefers-reduced-motion: reduce</code> draws a static frame
                (speed/distort = 0, no pointer trails).
              </li>
              <li>
                If WebGL is unavailable, the factory returns <code>null</code>
                and the composable no-ops without throwing.
              </li>
              <li>
                Host uses <code>pointer-events: none</code> so UI above remains
                clickable; pointer sampling is window-level while active.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Attribution -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-alert vd-alert-info">
          <i class="ph ph-info"></i>
          <div>
            <strong>Attribution</strong>
            <p class="vd-mb-0 vd-mt-1">
              Inspired by the MIT-licensed CodePen
              <a
                href="https://codepen.io/cameronknight/pen/ogxWmBP"
                target="_blank"
                rel="noopener noreferrer"
                >“Interactive Liquid Gradient using Three.js”</a
              >
              by Cameron Knight. Vanduo ships a vanilla WebGL reimplementation
              bound to theme tokens and <code>--vd-liquid-*</code> knobs — no
              Three.js CDN.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
#liquid-gradient .liquid-demo-host {
  position: relative;
  min-height: 18rem;
  border-radius: var(--vd-card-border-radius, 0.5rem);
  border: 1px solid var(--vd-border-color);
  overflow: hidden;
}

#liquid-gradient .liquid-demo-overlay {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: var(--vd-color-muted, var(--vd-text-muted, #888));
}

#liquid-gradient .liquid-knobs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 0.75rem 1.25rem;
}

#liquid-gradient .liquid-knobs label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.8125rem;
  color: var(--vd-text-secondary, inherit);
}

#liquid-gradient .liquid-knobs input[type="range"] {
  width: 100%;
}

#liquid-gradient .liquid-knobs code {
  font-size: 0.75rem;
}
</style>
