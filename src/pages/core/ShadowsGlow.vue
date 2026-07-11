<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const elevations = [
  { cls: "elevation-0", badge: "flat", flat: true },
  { cls: "elevation-1", badge: "1 / 2" },
  { cls: "elevation-2", badge: "2 / 3" },
  { cls: "elevation-3", badge: "3 / 5" },
  { cls: "elevation-4", badge: "8 / 13" },
  { cls: "elevation-5", badge: "13 / 21" },
];

const shadowUtils = [
  "vd-shadow-none vd-border",
  "vd-shadow-sm",
  "vd-shadow",
  "vd-shadow-md",
  "vd-shadow-lg",
  "vd-shadow-xl",
  "vd-shadow-2xl",
];
const shadowLabel = (cls: string): string =>
  "." + (cls.split(" ")[0]?.replace("vd-", "") ?? "");

const glowHtml = `<!-- Basic glow on any element -->
<div class="vd-hover-glow">Hover for primary glow</div>

<!-- Glow with specific color -->
<button class="vd-btn vd-btn-success vd-hover-glow-success">Success Glow</button>
<button class="vd-btn vd-btn-warning vd-hover-glow-warning">Warning Glow</button>
<button class="vd-btn vd-btn-error vd-hover-glow-error">Error Glow</button>

<!-- Glow intensity variants -->
<div class="vd-hover-glow-sm">Subtle glow</div>
<div class="vd-hover-glow-md">Medium glow</div>
<div class="vd-hover-glow-lg">Strong glow</div>`;

const varsCss = `:root {
  /* Glow colors */
  --vd-glow-primary-color: rgba(34, 184, 207, 0.25);
  --vd-glow-success-color: rgba(64, 192, 87, 0.25);
  --vd-glow-warning-color: rgba(250, 176, 5, 0.25);
  --vd-glow-error-color: rgba(250, 82, 82, 0.25);

  /* Card glow (uses primary by default) */
  --vd-card-glow-color: rgba(34, 184, 207, 0.25);
  --vd-card-glow-border-color: rgba(34, 184, 207, 0.4);
}`;
</script>

<template>
  <section id="shadows-glow">
    <h5 class="demo-title"><i class="ph ph-sun"></i>Shadows &amp; Glow</h5>
    <p class="vd-mb-8">
      Vanduo provides a comprehensive shadow system based on Fibonacci
      proportions, plus glow effects for interactive elements. Shadows create
      depth and visual hierarchy, while glow effects add emphasis on hover.
    </p>

    <!-- Elevation ladder -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>Fibonacci elevation ladder</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-alert vd-alert-info vd-mb-6">
              <i class="ph ph-info"></i>
              <div>
                <strong
                  >Each level's Y-offset and blur are a Fibonacci pair.</strong
                >
                Depth steps through the sequence —
                <code>1/2 → 2/3 → 3/5 → 8/13 → 13/21 → 21/34</code> — so
                elevation grows at a natural rate rather than in arbitrary
                jumps. <code>.elevation-0…5</code> map onto the shadow scale.
              </div>
            </div>
            <div class="vd-row">
              <div
                v-for="el in elevations"
                :key="el.cls"
                class="vd-col-6 vd-col-md-4 vd-col-lg-2 vd-mb-5"
              >
                <div
                  :class="`${el.cls} vd-p-5 vd-rounded-md vd-text-center`"
                  :style="
                    el.flat
                      ? 'background: var(--vd-bg-primary); border: 1px solid var(--vd-border-color);'
                      : 'background: var(--vd-bg-primary);'
                  "
                >
                  <code class="vd-text-sm">.{{ el.cls }}</code>
                  <div class="vd-mt-2">
                    <span class="vd-badge vd-badge-secondary">{{
                      el.badge
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              The same pairs drive the <code>.vd-shadow-*</code> utilities below
              (<code>.vd-shadow-2xl</code> reaches 21/34). These proportions
              come from the
              <RouterLink to="/core/golden-ratio">Golden Ratio</RouterLink>
              system.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Shadow + Glow utilities -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Shadow Utilities</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-3">Apply shadows with utility classes:</p>
            <div class="vd-d-flex vd-flex-col vd-gap-3">
              <div
                v-for="cls in shadowUtils"
                :key="cls"
                :class="`vd-p-3 vd-rounded-md ${cls}`"
                style="background: var(--vd-bg-primary)"
              >
                <code>{{ shadowLabel(cls) }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Glow Utilities</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-3">Add glowing effects to any element:</p>
            <div class="vd-d-flex vd-flex-col vd-gap-4">
              <div
                class="vd-p-4 vd-rounded-md vd-glow vd-hover-glow"
                style="
                  background: var(--vd-bg-primary);
                  border: 1px solid var(--vd-border-color);
                "
              >
                <code>.glow</code> or <code>.glow-primary</code> - permanent
                glow
              </div>
              <div
                class="vd-p-4 vd-rounded-md vd-hover-glow"
                style="
                  background: var(--vd-bg-primary);
                  border: 1px solid var(--vd-border-color);
                "
              >
                <code>.hover-glow</code> - glow on hover only
              </div>
              <div
                class="vd-p-4 vd-rounded-md vd-hover-glow-success"
                style="
                  background: var(--vd-bg-primary);
                  border: 1px solid var(--vd-border-color);
                "
              >
                <code>.hover-glow-success</code> - green glow
              </div>
              <div
                class="vd-p-4 vd-rounded-md vd-hover-glow-warning"
                style="
                  background: var(--vd-bg-primary);
                  border: 1px solid var(--vd-border-color);
                "
              >
                <code>.hover-glow-warning</code> - yellow glow
              </div>
              <div
                class="vd-p-4 vd-rounded-md vd-hover-glow-error"
                style="
                  background: var(--vd-bg-primary);
                  border: 1px solid var(--vd-border-color);
                "
              >
                <code>.hover-glow-error</code> - red glow
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Glow intensity -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Glow Intensity Variants</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-4">
              Control the glow intensity with size variants:
            </p>
            <div class="vd-d-flex vd-flex-wrap vd-gap-5">
              <div
                class="vd-p-4 vd-rounded-md vd-hover-glow-sm"
                style="
                  background: var(--vd-bg-primary);
                  border: 1px solid var(--vd-border-color);
                "
              >
                <code>.hover-glow-sm</code><br /><small
                  >Subtle (10px blur)</small
                >
              </div>
              <div
                class="vd-p-4 vd-rounded-md vd-hover-glow-md"
                style="
                  background: var(--vd-bg-primary);
                  border: 1px solid var(--vd-border-color);
                "
              >
                <code>.hover-glow-md</code><br /><small
                  >Medium (20px blur)</small
                >
              </div>
              <div
                class="vd-p-4 vd-rounded-md vd-hover-glow-lg"
                style="
                  background: var(--vd-bg-primary);
                  border: 1px solid var(--vd-border-color);
                "
              >
                <code>.hover-glow-lg</code><br /><strong
                  >Strong (30px blur)</strong
                >
              </div>
            </div>
            <DocCodeSnippet class="vd-mt-5" :html="glowHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Colored shadows + CSS variables -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Colored Shadows</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-3">Semantic color shadows for emphasis:</p>
            <div class="vd-d-flex vd-flex-col vd-gap-3">
              <div
                class="vd-p-3 vd-rounded-md vd-shadow-primary vd-text-white vd-bg-primary"
              >
                <code>.shadow-primary</code>
              </div>
              <div
                class="vd-p-3 vd-rounded-md vd-shadow-success vd-text-white vd-bg-success"
              >
                <code>.shadow-success</code>
              </div>
              <div class="vd-p-3 vd-rounded-md vd-shadow-warning vd-bg-warning">
                <code>.shadow-warning</code>
              </div>
              <div
                class="vd-p-3 vd-rounded-md vd-shadow-error vd-text-white vd-bg-error"
              >
                <code>.shadow-error</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>CSS Variables</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-3">Customize glow colors via CSS variables:</p>
            <DocCodeSnippet :css="varsCss" />
            <p class="vd-mt-3 vd-text-sm vd-text-muted">
              Note: Glow intensity is automatically increased in dark mode for
              better visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
