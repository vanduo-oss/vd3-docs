<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdBox } from "@vanduo-oss/vd3";
import { VdStack } from "@vanduo-oss/vd3";
import { VdInline } from "@vanduo-oss/vd3";
import { VdCenter } from "@vanduo-oss/vd3";
import { VdCover } from "@vanduo-oss/vd3";
import { VdFrame } from "@vanduo-oss/vd3";
import { VdSwitcher } from "@vanduo-oss/vd3";

// ── Box ──────────────────────────────────────────────────────
const boxVue = `<VdBox pad="fib-13">Padded surface</VdBox>`;

// ── Stack ────────────────────────────────────────────────────
const stackVue = `<VdStack gap="fib-8">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</VdStack>`;

// ── Inline ───────────────────────────────────────────────────
const inlineVue = `<VdInline gap="fib-5">
  <span class="vd-chip">Vue</span>
  <span class="vd-chip">Vanilla</span>
  <span class="vd-chip">Tokens</span>
</VdInline>`;

// ── Center ───────────────────────────────────────────────────
const centerVue = `<VdCenter max="fib-377">Readable, centered column.</VdCenter>`;

// ── Cover ────────────────────────────────────────────────────
const coverVue = `<VdCover min="half" gap="fib-5">
  <p>Vertically centered content</p>
</VdCover>`;

// ── Frame ────────────────────────────────────────────────────
const frameVue = `<VdFrame ratio="16-9">
  <img src="/images/mountains-and-fog.jpg" alt="" />
</VdFrame>`;

// ── Switcher ─────────────────────────────────────────────────
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
            <DocCodeSnippet :html="boxVue" />
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
            <DocCodeSnippet :html="stackVue" />
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
            <DocCodeSnippet :html="inlineVue" />
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
            <DocCodeSnippet :html="centerVue" />
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
            <DocCodeSnippet :html="coverVue" />
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
            <DocCodeSnippet :html="frameVue" />
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
            <DocCodeSnippet :html="switcherVue" />
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
