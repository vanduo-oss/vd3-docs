<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const variants = [
  {
    id: "mesh",
    title: "Mesh",
    blurb:
      "Soft radials + micro-stripes over a warm spectrum — classic glass stage.",
  },
  {
    id: "stripe",
    title: "Stripe",
    blurb:
      "Bold diagonal bands on blue → purple → orange. High-energy hero fill.",
  },
  {
    id: "noise",
    title: "Noise",
    blurb: "Grainy stipple over slate / indigo / magenta for editorial depth.",
  },
  {
    id: "aurora",
    title: "Aurora",
    blurb: "Overlapping color ribbons — calm atmosphere for marketing bands.",
  },
  {
    id: "dots",
    title: "Dots",
    blurb: "Polka lattice on a cool field — playful without fighting frost.",
  },
  {
    id: "grid",
    title: "Grid",
    blurb: "Fine technical lattice for dashboards and product chrome.",
  },
] as const;

const intensities = [
  { step: 3, label: "Soft" },
  { step: 5, label: "Default" },
  { step: 8, label: "Bold" },
] as const;

const baseHtml = `<!-- Decorative Surface + Seemore Glass -->
<section class="vd-surface vd-surface-mesh vd-surface-5">
  <div class="vd-glass vd-glass-8 vd-glass-floating">
    Frosted content
  </div>
</section>`;

const intensityHtml = `<div class="vd-surface vd-surface-aurora vd-surface-3">…</div>
<div class="vd-surface vd-surface-aurora vd-surface-5">…</div>
<div class="vd-surface vd-surface-aurora vd-surface-8">…</div>`;

const tokens: [string, string, string][] = [
  ["--vd-surface-intensity", "Pattern layer strength", "1 (step 5)"],
  ["--vd-surface-contrast", "Dark-layer punch", "1 (step 5)"],
  ["--vd-surface-min-height", "Default min-height", "12rem"],
  ["--vd-surface-base", "Variant base gradient", "set per variant"],
];
</script>

<template>
  <section id="surfaces">
    <h5 class="demo-title">
      <i class="ph ph-checkerboard"></i>Decorative Surfaces
    </h5>
    <p class="vd-mb-6">
      Surfaces are reusable backdrop fills for heroes, marketing bands, and
      <RouterLink to="/effects/glass">Seemore Glass</RouterLink> demos. Ship
      <code>.vd-surface</code> plus a variant — mesh, stripe, noise, aurora,
      dots, or grid — then tune Fibonacci intensity with
      <code>.vd-surface-3|5|8</code>.
    </p>

    <div class="vd-row vd-mb-6">
      <div
        v-for="v in variants"
        :key="v.id"
        class="vd-col-12 vd-col-md-6 vd-col-lg-4 vd-mb-4"
      >
        <div class="vd-card vd-card-glow demo-card surface-card">
          <div
            class="vd-surface vd-surface-5 surface-preview"
            :class="`vd-surface-${v.id}`"
          >
            <div class="vd-glass vd-glass-5 surface-glass">
              <strong>{{ v.title }}</strong>
              <code>.vd-surface-{{ v.id }}</code>
            </div>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-muted" style="margin: 0; font-size: 0.9rem">
              {{ v.blurb }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Intensity modifiers</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-muted vd-mb-4">
              Intensity adjusts pattern opacity/contrast — not blur — so
              Surfaces stay cheap under glass.
            </p>
            <div class="vd-row">
              <div
                v-for="i in intensities"
                :key="i.step"
                class="vd-col-12 vd-col-md-4 vd-mb-4"
              >
                <div
                  class="vd-surface vd-surface-stripe surface-preview"
                  :class="`vd-surface-${i.step}`"
                >
                  <div class="vd-glass vd-glass-5 surface-glass">
                    <strong>{{ i.label }}</strong>
                    <code>.vd-surface-{{ i.step }}</code>
                  </div>
                </div>
              </div>
            </div>
            <DocCodeSnippet
              title="Intensity"
              language="html"
              :code="intensityHtml"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Pairing recipe</h6></div>
          <div class="vd-card-body">
            <div class="vd-surface vd-surface-aurora vd-surface-5 surface-hero">
              <div
                class="vd-glass vd-glass-8 vd-glass-adaptive vd-glass-floating surface-hero-panel"
              >
                <h4 style="color: var(--vd-color-primary); margin-top: 0">
                  Surface + Seemore Glass
                </h4>
                <p>
                  Put busy color in the Surface; keep one Fibonacci glass step
                  on the content panel. Consumers get the same classes we use in
                  docs.
                </p>
                <RouterLink to="/effects/glass" class="vd-btn vd-btn-primary">
                  Explore Seemore Glass
                </RouterLink>
              </div>
            </div>
            <DocCodeSnippet
              class="vd-mt-4"
              title="Markup"
              language="html"
              :code="baseHtml"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Tokens</h6></div>
          <div class="vd-card-body">
            <table class="vd-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Role</th>
                  <th>Default</th>
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
  </section>
</template>

<style scoped>
.surface-card {
  overflow: hidden;
}
.surface-preview {
  min-height: 10rem;
  border-radius: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.surface-glass {
  border-radius: var(--vd-radius-fib-5, 0.5rem);
  padding: 0.85rem 1rem;
  text-align: center;
  display: grid;
  gap: 0.25rem;
}
.surface-hero {
  min-height: 16rem;
  border-radius: var(--vd-radius-fib-8, 0.75rem);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.surface-hero-panel {
  max-width: 28rem;
  width: 100%;
  border-radius: var(--vd-radius-fib-8, 0.75rem);
  padding: 1.5rem;
}
</style>
