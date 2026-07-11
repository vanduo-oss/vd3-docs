<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { VdBox } from "@vanduo-oss/vue";
import { VdStack } from "@vanduo-oss/vue";
import { VdInline } from "@vanduo-oss/vue";
import { VdCenter } from "@vanduo-oss/vue";
import { VdCover } from "@vanduo-oss/vue";
import { VdFrame } from "@vanduo-oss/vue";
import { VdSwitcher } from "@vanduo-oss/vue";

// ── Box ──────────────────────────────────────────────────────
const boxVanilla = `<div class="vd-box" data-pad="fib-13">
  Padded surface
</div>`;
const boxVue = `<VdBox pad="fib-13">Padded surface</VdBox>`;

// ── Stack ────────────────────────────────────────────────────
const stackVanilla = `<div class="vd-stack" data-gap="fib-8">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</div>`;
const stackVue = `<VdStack gap="fib-8">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</VdStack>`;

// ── Inline ───────────────────────────────────────────────────
const inlineVanilla = `<div class="vd-inline" data-gap="fib-5">
  <span class="vd-chip">Vue</span>
  <span class="vd-chip">Vanilla</span>
  <span class="vd-chip">Tokens</span>
</div>`;
const inlineVue = `<VdInline gap="fib-5">
  <span class="vd-chip">Vue</span>
  <span class="vd-chip">Vanilla</span>
  <span class="vd-chip">Tokens</span>
</VdInline>`;

// ── Center ───────────────────────────────────────────────────
const centerVanilla = `<div class="vd-center" data-max="fib-377">
  Readable, centered column.
</div>`;
const centerVue = `<VdCenter max="fib-377">Readable, centered column.</VdCenter>`;

// ── Cover ────────────────────────────────────────────────────
const coverVanilla = `<!-- data-min presets: screen | half | fib-610 | fib-987 -->
<div class="vd-cover" data-min="half" data-gap="fib-5">
  <p>Vertically centered content</p>
</div>`;
const coverVue = `<VdCover min="half" gap="fib-5">
  <p>Vertically centered content</p>
</VdCover>`;

// ── Frame ────────────────────────────────────────────────────
const frameVanilla = `<!-- data-ratio: golden | golden-portrait | square | 16-9 | 4-3 | 3-2 -->
<div class="vd-frame" data-ratio="16-9">
  <img src="/images/mountains-and-fog.jpg" alt="" />
</div>`;
const frameVue = `<VdFrame ratio="16-9">
  <img src="/images/mountains-and-fog.jpg" alt="" />
</VdFrame>`;

// ── Switcher ─────────────────────────────────────────────────
const switcherVanilla = `<!-- Rows above the threshold, stacked below it -->
<div class="vd-switcher" data-threshold="fib-610" data-gap="fib-5">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</div>`;
const switcherVue = `<VdSwitcher threshold="fib-610" gap="fib-5">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</VdSwitcher>`;
</script>

<template>
  <section id="primitives">
    <h5 class="demo-title"><i class="ph ph-shapes"></i>Primitives</h5>
    <p class="vd-mb-6">
      Primitives are unstyled, single-responsibility
      <strong>layout</strong> containers. They express an <em>intent</em> —
      vertical rhythm, a wrapping row, a centered column — instead of one CSS
      property, and sit between utilities and components:
      <code>tokens → (utilities | primitives) → components</code>. Every
      primitive consumes the same Fibonacci spacing tokens, so layouts stay in
      proportion. Configure them with <code>data-*</code> attributes in Vanilla,
      or the matching props on the Vue components.
    </p>

    <!-- Box -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-square"></i> Box — padding &amp; surface</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              A blank surface with Fibonacci padding via
              <code>data-pad</code>.
            </p>
            <VdBox
              pad="fib-13"
              class="primitive-demo-surface"
              style="margin-bottom: 1rem"
            >
              Padded surface
            </VdBox>
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :html="boxVue" /></template>
              <template #vanilla
                ><DocCodeSnippet :html="boxVanilla"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- Stack -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-rows"></i> Stack — vertical rhythm</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Stacks children vertically with a consistent
              <code>data-gap</code> between them.
            </p>
            <VdStack gap="fib-8" style="margin-bottom: 1rem">
              <div class="primitive-demo-surface">First</div>
              <div class="primitive-demo-surface">Second</div>
              <div class="primitive-demo-surface">Third</div>
            </VdStack>
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :html="stackVue" /></template>
              <template #vanilla
                ><DocCodeSnippet :html="stackVanilla"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- Inline -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-dots-three-outline"></i> Inline — wrapping row
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Lays items in a row that wraps, with an even
              <code>data-gap</code> in both directions.
            </p>
            <VdInline gap="fib-5" style="margin-bottom: 1rem">
              <span class="vd-chip">Vue</span>
              <span class="vd-chip">Vanilla</span>
              <span class="vd-chip">Tokens</span>
              <span class="vd-chip">Fibonacci</span>
            </VdInline>
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :html="inlineVue" /></template>
              <template #vanilla
                ><DocCodeSnippet :html="inlineVanilla"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- Center -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-text-align-center"></i> Center — measure</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Caps content width with <code>data-max</code> and centers it
              horizontally — keeping line lengths readable.
            </p>
            <VdCenter
              max="fib-377"
              class="primitive-demo-surface"
              style="margin-bottom: 1rem; text-align: center"
            >
              A centered column constrained to a readable measure.
            </VdCenter>
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :html="centerVue" /></template>
              <template #vanilla
                ><DocCodeSnippet :html="centerVanilla"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- Cover -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-frame-corners"></i> Cover — fill &amp; center
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Fills a minimum height (<code>data-min</code>) and centers its
              content vertically — ideal for heroes. Shown shorter here for
              space.
            </p>
            <VdCover
              gap="fib-5"
              class="primitive-demo-surface"
              style="--vd-cover-min: 11rem; margin-bottom: 1rem"
            >
              <p style="margin: 0; text-align: center">
                Vertically centered content
              </p>
            </VdCover>
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :html="coverVue" /></template>
              <template #vanilla
                ><DocCodeSnippet :html="coverVanilla"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- Frame -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-crop"></i> Frame — aspect ratio</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Locks media to an aspect ratio with <code>data-ratio</code> and
              crops to fit — no layout shift.
            </p>
            <VdFrame
              ratio="16-9"
              style="
                max-width: 420px;
                margin-bottom: 1rem;
                border-radius: var(--vd-card-border-radius);
              "
            >
              <img src="/images/mountains-and-fog.jpg" alt="Mountains in fog" />
            </VdFrame>
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :html="frameVue" /></template>
              <template #vanilla
                ><DocCodeSnippet :html="frameVanilla"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- Switcher -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-arrows-left-right"></i> Switcher — auto row/stack
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Lays children in a row, then flips them to a stack once the
              container drops below <code>data-threshold</code> — responsive
              with no media query. Resize the window to see it switch.
            </p>
            <VdSwitcher
              threshold="fib-610"
              gap="fib-5"
              style="margin-bottom: 1rem"
            >
              <div class="primitive-demo-surface">One</div>
              <div class="primitive-demo-surface">Two</div>
              <div class="primitive-demo-surface">Three</div>
            </VdSwitcher>
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :html="switcherVue" /></template>
              <template #vanilla
                ><DocCodeSnippet :html="switcherVanilla"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.primitive-demo-surface {
  background: var(--vd-bg-secondary);
  border: 1px solid var(--vd-border-color);
  border-radius: var(--vd-card-border-radius);
  padding: 0.75rem 1rem;
}
</style>
