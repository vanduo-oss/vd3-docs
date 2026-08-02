<script setup lang="ts">
import { computed, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useRipple, VdSlider } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useRipple(root);

/** Demo default ~2.5× the framework's 600ms so the wave is easy to see. */
const durationMs = ref(1500);

const demoStyle = computed(() => ({
  "--vd-ripple-duration": `${durationMs.value}ms`,
}));

const vue3Wiring = `import { ref } from 'vue';
import { useRipple } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
useRipple(root);   // wires every .vd-ripple inside root; cleanup on unmount`;

const apiRows: [string, string][] = [
  [".vd-ripple", "Adds click-spawned ripple. Works on buttons, links, cards."],
  ["data-vd-ripple", "Attribute equivalent of `.vd-ripple`."],
  ["data-vd-ripple-color", "Override the ripple color (any CSS color value)."],
  [
    "--vd-ripple-duration",
    "CSS custom property for animation length (framework default `0.6s`).",
  ],
  [
    "data-vd-ripple-centered",
    "Force the ripple to spawn at the element's center.",
  ],
];

const basicHtml = `<!-- Button with ripple -->
<button class="vd-btn vd-btn-primary vd-ripple">Click me</button>

<!-- Card with ripple on click -->
<div class="vd-card vd-card-glow vd-ripple" style="cursor:pointer; padding: 1.5rem;">
  Click anywhere on this card
</div>

<!-- Custom color via attribute -->
<button class="vd-btn vd-ripple" data-vd-ripple-color="#22c55e">
  Green Ripple
</button>

<!-- Centered ripple -->
<button class="vd-btn vd-btn-outline vd-ripple" data-vd-ripple-centered>
  Centered
</button>

<!-- Slow the wave via CSS variable -->
<div style="--vd-ripple-duration: 1.5s;">
  <button class="vd-btn vd-btn-primary vd-ripple">Gentle ripple</button>
</div>`;
</script>

<template>
  <section id="ripple">
    <h5 class="demo-title"><i class="ph ph-drop"></i>Ripple</h5>
    <p class="vd-mb-8">
      Material-style click ripples with zero JavaScript cost for the consumer.
      Drop <code>vd-ripple</code> on any element and the framework spawns a
      radial fill from the click point, animates it outward, and cleans up.
      Custom color and duration are first-class via attributes and CSS
      variables.
    </p>

    <div class="vd-row vd-mb-6" ref="root">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Buttons &amp; Cards</h6></div>
          <div class="vd-card-body" :style="demoStyle">
            <div class="vd-mb-5" style="max-width: 28rem">
              <VdSlider
                v-model="durationMs"
                id="ripple-duration"
                label="Ripple duration (ms)"
                :min="400"
                :max="3000"
                :step="100"
                show-value
              />
              <p class="vd-text-sm vd-text-muted vd-mt-2" style="margin: 0">
                Sets <code>--vd-ripple-duration</code> on this demo ({{
                  (durationMs / 1000).toFixed(1)
                }}s). Default here is 1500&nbsp;ms — about 2.5× the framework’s
                600&nbsp;ms.
              </p>
            </div>
            <div
              style="
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                align-items: center;
              "
            >
              <button class="vd-btn vd-btn-primary vd-ripple">Click me</button>
              <button
                class="vd-btn vd-btn-outline vd-ripple"
                data-vd-ripple-color="#22c55e"
              >
                Green Ripple
              </button>
              <button class="vd-btn vd-ripple" data-vd-ripple-centered>
                Centered
              </button>
              <div
                class="vd-card vd-ripple"
                style="
                  cursor: pointer;
                  padding: 1.5rem;
                  min-width: 220px;
                  text-align: center;
                "
              >
                Click anywhere on this card
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="basicHtml" />
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-code"></i> Engine wiring</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="vue3Wiring" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-list-dashes"></i> API Reference</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class / Attribute</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in apiRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-wheelchair"></i> Accessibility</h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>
                Ripples are purely decorative. The element's underlying
                click/keyboard semantics are unchanged.
              </li>
              <li>
                The framework respects
                <code>prefers-reduced-motion: reduce</code> and skips the
                animation when set.
              </li>
              <li>
                Ripples carry <code>aria-hidden="true"</code> so screen readers
                ignore them.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
