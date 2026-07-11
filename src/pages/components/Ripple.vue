<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useRipple } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useRipple(root);

const vanillaWiring = `// Wire every .vd-ripple under document (or pass a root element)
VanduoRipple.init();

// Programmatically destroy (e.g. when tearing down a route)
VanduoRipple.destroyAll();`;

const vue3Wiring = `import { ref } from 'vue';
import { useRipple } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useRipple(root);   // wires every .vd-ripple inside root; cleanup on unmount`;

const apiRows: [string, string][] = [
  [".vd-ripple", "Adds click-spawned ripple. Works on buttons, links, cards."],
  ["data-vd-ripple", "Attribute equivalent of `.vd-ripple`."],
  ["data-vd-ripple-color", "Override the ripple color (any CSS color value)."],
  [
    "data-vd-ripple-duration",
    "Override animation duration in ms (default 600).",
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
</button>`;
</script>

<template>
  <section id="ripple">
    <h5 class="demo-title"><i class="ph ph-drop"></i>Ripple</h5>
    <p class="vd-mb-8">
      Material-style click ripples with zero JavaScript cost for the consumer.
      Drop <code>vd-ripple</code> on any element and the framework spawns a
      radial fill from the click point, animates it outward, and cleans up.
      Custom color and duration are first-class attributes.
    </p>

    <div class="vd-row vd-mb-6" ref="root">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Buttons &amp; Cards</h6></div>
          <div
            class="vd-card-body"
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
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :js="vue3Wiring" /></template>
              <template #vanilla
                ><DocCodeSnippet :js="vanillaWiring"
              /></template>
            </EngineSwitch>
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
