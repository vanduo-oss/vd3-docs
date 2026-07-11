<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useParallax } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useParallax(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useParallax } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useParallax(root);   // rAF scroll handler + reduced-motion guard; cleanup on unmount`;

const vanillaWiring = `// The framework auto-initialises parallax on Vanduo.init()
VanduoParallax.init();

// after layout changes
VanduoParallax.refresh();`;

const markupHtml = `<!-- Slow background drift + fixed foreground content -->
<div class="vd-parallax vd-parallax-md vd-parallax-slow">
  <div class="vd-parallax-bg" style="background-image: url('hero.jpg')"></div>
  <div class="vd-parallax-content">
    <h2>Title over a moving backdrop</h2>
  </div>
</div>

<!-- Multiple layers, each with its own rate via data-parallax-speed -->
<div class="vd-parallax vd-parallax-lg">
  <div class="vd-parallax-layer" data-parallax-speed="0.3"></div>
  <div class="vd-parallax-layer" data-parallax-speed="0.8"></div>
  <div class="vd-parallax-content">…</div>
</div>`;

const apiRows: [string, string, string][] = [
  [
    ".vd-parallax",
    "container",
    "Required. Marks the scroll-reactive container (position: relative; overflow: hidden).",
  ],
  [".vd-parallax-layer", "child", "An absolutely-positioned moving layer."],
  [
    ".vd-parallax-bg",
    "child",
    "A moving background layer (120% height; set background-image).",
  ],
  [
    ".vd-parallax-content",
    "child",
    "Foreground content that stays in normal flow (z-index above layers).",
  ],
  [
    ".vd-parallax-slow / .vd-parallax-medium / .vd-parallax-fast",
    "container",
    "Container speed multiplier — 0.5 / 1 / 1.5.",
  ],
  [
    ".vd-parallax-horizontal",
    "container",
    "Translate layers on the X axis instead of Y (default is vertical).",
  ],
  [
    ".vd-parallax-sm / -md / -lg / -full",
    "container",
    "Fibonacci min-heights — 377px / 610px / 987px / 100vh.",
  ],
  [
    ".vd-parallax-disable-mobile",
    "container",
    "Freeze layers at ≤767px viewports.",
  ],
  [
    'data-parallax-speed="N"',
    "layer",
    "Per-layer rate multiplier (applied on top of the container speed).",
  ],
];
</script>

<template>
  <section id="parallax" ref="root">
    <h5 class="demo-title"><i class="ph ph-stack"></i>Parallax</h5>
    <p class="vd-mb-6">
      Depth-on-scroll. Layers inside a <code>.vd-parallax</code> container
      translate at different rates as the container moves through the viewport,
      creating a sense of depth. Movement is driven by JavaScript on a
      <code>requestAnimationFrame</code>-throttled scroll listener and is fully
      disabled when the visitor requests reduced motion.
    </p>

    <!-- Rendered demo -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Depth from layered speeds</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-5">
              Scroll the page — the colour band (<code>.vd-parallax-bg</code>,
              slow) and the dot grid (<code>.vd-parallax-layer</code>, fast)
              translate at different rates via
              <code>data-parallax-speed</code>, while the foreground
              <code>.vd-parallax-content</code> stays put. That difference in
              rates is what reads as depth. The colour band also shifts as the
              panel scrolls through the viewport — a CSS scroll-driven flourish
              layered on top.
            </p>
            <div
              class="vd-parallax vd-parallax-md vd-parallax-fast parallax-demo"
            >
              <div
                class="vd-parallax-bg pd-layer-back"
                data-parallax-speed="0.4"
              ></div>
              <div
                class="vd-parallax-layer pd-layer-dots"
                data-parallax-speed="1.5"
              ></div>
              <div class="vd-parallax-content">
                <span
                  ><i class="ph ph-arrows-down-up"></i>Scroll — the colour band
                  shifts as the dot grid races ahead</span
                >
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-5">
              <strong>Reduced motion:</strong> if your OS requests reduced
              motion, the component does not initialize and layers render
              statically.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Markup -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Markup</h6></div>
          <div class="vd-card-body">
            <p>
              Wrap layers in a <code>.vd-parallax</code> container. Movement
              initializes automatically on <code>Vanduo.init()</code>.
            </p>
            <DocCodeSnippet :html="markupHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- API reference -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Classes &amp; attributes</h6></div>
          <div class="vd-card-body">
            <h4 class="vd-mt-0">Wiring</h4>
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :js="vue3Wiring" :default-open="true"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :js="vanillaWiring" :default-open="true"
              /></template>
            </EngineSwitch>

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
                  <tr v-for="row in apiRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <EngineSwitch>
              <template #vue3>
                <p class="vd-text-sm vd-text-muted vd-mt-5">
                  <strong>Composable API:</strong>
                  <code>useParallax(root)</code> wires every
                  <code>.vd-parallax</code> inside the root ref. The rAF scroll
                  handler and <code>prefers-reduced-motion</code>
                  guard are set up automatically and torn down on unmount — no
                  manual refresh/destroy needed.
                </p>
              </template>
              <template #vanilla>
                <p class="vd-text-sm vd-text-muted vd-mt-5">
                  <strong>JavaScript API:</strong> components auto-initialize on
                  <code>Vanduo.init()</code>.
                  <code>VanduoParallax.refresh()</code>
                  recalculates positions (call after layout changes),
                  <code>VanduoParallax.destroy(el)</code> resets a single
                  container, and <code>VanduoParallax.destroyAll()</code> tears
                  down all listeners.
                </p>
              </template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
#parallax .parallax-demo {
  border-radius: var(--vd-card-border-radius, 0.5rem);
  border: 1px solid var(--vd-border-color);
  view-timeline-name: --pd-panel;
  view-timeline-axis: block;
}
#parallax .parallax-demo .vd-parallax-bg,
#parallax .parallax-demo .vd-parallax-layer {
  top: -30%;
  height: 160%;
}
#parallax .parallax-demo .pd-layer-back {
  background: linear-gradient(
    150deg,
    var(--vd-color-primary) 0%,
    var(--vd-color-info) 35%,
    var(--vd-color-success, var(--vd-color-info)) 50%,
    var(--vd-color-info) 65%,
    var(--vd-color-primary) 100%
  );
  background-size: 100% 260%;
  background-position: 50% 0%;
}
#parallax .parallax-demo .pd-layer-dots {
  background-image: radial-gradient(
    color-mix(in srgb, var(--vd-text-on-primary, #fff) 70%, transparent) 2.5px,
    transparent 2.5px
  );
  background-size: 30px 30px;
  opacity: 0.6;
}
@keyframes pd-colour-drift {
  from {
    background-position: 50% 0%;
  }
  to {
    background-position: 50% 100%;
  }
}
@supports (animation-timeline: view()) {
  #parallax .parallax-demo .pd-layer-back {
    animation-name: pd-colour-drift;
    animation-duration: auto;
    animation-timing-function: linear;
    animation-fill-mode: both;
    animation-timeline: --pd-panel;
  }
}
@media (prefers-reduced-motion: reduce) {
  #parallax .parallax-demo .pd-layer-back {
    animation-name: none;
  }
}
#parallax .parallax-demo .vd-parallax-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: inherit;
  padding: 1.5rem;
  text-align: center;
  color: var(--vd-text-on-primary, #fff);
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}
#parallax .parallax-demo .vd-parallax-content i {
  margin-right: 0.4rem;
}
</style>
