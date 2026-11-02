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
  <span class="vd-chip">CSS</span>
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
  <img src="/images/mountains-and-fog.jpg" alt="Mountains in fog" />
</VdFrame>
<VdFrame ratio="4-3">
  <img src="/images/forest-boardwalk.jpg" alt="Pine forest boardwalk" />
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
    <p class="vd-mb-8">
      Primitives are unstyled, single-responsibility
      <strong>layout</strong> containers. They express an <em>intent</em> —
      vertical rhythm, a wrapping row, a centered column — instead of one CSS
      property, and sit between utilities and components:
      <code>tokens → (utilities | primitives) → components</code>. Every
      primitive consumes the same Fibonacci spacing tokens, so layouts stay in
      proportion. Configure each through its Vue props — <code>pad</code>,
      <code>gap</code>, <code>max</code>, <code>min</code>, <code>ratio</code>,
      <code>threshold</code>.
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
              A blank surface with Fibonacci padding via the
              <code>pad</code> prop.
            </p>
            <VdBox
              pad="fib-13"
              class="primitive-demo-surface"
              style="margin-bottom: 1rem"
            >
              Padded surface
            </VdBox>
            <DocCodeSnippet :vue="boxVue" />
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
              <code>gap</code> prop between them.
            </p>
            <VdStack gap="fib-8" style="margin-bottom: 1rem">
              <div class="primitive-demo-surface">First</div>
              <div class="primitive-demo-surface">Second</div>
              <div class="primitive-demo-surface">Third</div>
            </VdStack>
            <DocCodeSnippet :vue="stackVue" />
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
              <code>gap</code> prop in both directions.
            </p>
            <VdInline gap="fib-5" style="margin-bottom: 1rem">
              <span class="vd-chip">Vue</span>
              <span class="vd-chip">CSS</span>
              <span class="vd-chip">Tokens</span>
              <span class="vd-chip">Fibonacci</span>
            </VdInline>
            <DocCodeSnippet :vue="inlineVue" />
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
              Caps content width with the <code>max</code> prop and centers it
              horizontally — keeping line lengths readable.
            </p>
            <VdCenter
              max="fib-377"
              class="primitive-demo-surface"
              style="margin-bottom: 1rem; text-align: center"
            >
              A centered column constrained to a readable measure.
            </VdCenter>
            <DocCodeSnippet :vue="centerVue" />
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
              Fills a minimum height (the <code>min</code> prop) and centers its
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
            <DocCodeSnippet :vue="coverVue" />
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
              Locks media to an aspect ratio with the <code>ratio</code> prop
              and crops to fit — no layout shift.
            </p>
            <div
              class="vd-inline"
              data-gap="fib-13"
              data-wrap="wrap"
              style="margin-bottom: 1rem"
            >
              <VdFrame
                ratio="16-9"
                style="
                  width: 320px;
                  max-width: 100%;
                  border-radius: var(--vd-card-border-radius);
                "
              >
                <img
                  src="/images/mountains-and-fog.jpg"
                  alt="Mountains in fog"
                />
              </VdFrame>
              <VdFrame
                ratio="4-3"
                style="
                  width: 280px;
                  max-width: 100%;
                  border-radius: var(--vd-card-border-radius);
                "
              >
                <img
                  src="/images/forest-boardwalk.jpg"
                  alt="Pine forest boardwalk"
                />
              </VdFrame>
            </div>
            <DocCodeSnippet :vue="frameVue" />
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
              container drops below the <code>threshold</code> prop — responsive
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
            <DocCodeSnippet :vue="switcherVue" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card vd-card-glow demo-card vd-mb-6">
      <div class="vd-card-header"><h6>Props &amp; Data Attributes</h6></div>
      <div class="vd-card-body">
        <p class="vd-mb-4">
          Every primitive accepts <code>as</code> (default <code>"div"</code>)
          for the rendered HTML tag and stamps its props onto matching
          <code>data-*</code> attributes so the same CSS rules power both Vue
          components and static markup.
        </p>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Primitive</th>
                <th>Prop</th>
                <th>Data Attribute</th>
                <th>Allowed Values (Default)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="5"><code>VdBox</code> (<code>.vd-box</code>)</td>
                <td><code>as</code></td>
                <td>—</td>
                <td>
                  <code>keyof HTMLElementTagNameMap</code> (<code>"div"</code>)
                </td>
              </tr>
              <tr>
                <td><code>pad</code></td>
                <td><code>data-pad</code></td>
                <td>
                  <code
                    >"0" | "fib-1" | "fib-2" | "fib-3" | "fib-5" | "fib-8" |
                    "fib-13" | "fib-21" | "fib-34" | "fib-55"</code
                  >
                  (<code>"fib-8"</code>)
                </td>
              </tr>
              <tr>
                <td><code>bg</code></td>
                <td><code>data-bg</code></td>
                <td>
                  <code
                    >"primary" | "secondary" | "tertiary" | "dark" |
                    "darker"</code
                  >
                </td>
              </tr>
              <tr>
                <td><code>round</code></td>
                <td><code>data-round</code></td>
                <td>
                  <code
                    >"none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"</code
                  >
                </td>
              </tr>
              <tr>
                <td><code>border</code></td>
                <td><code>data-border</code></td>
                <td><code>boolean</code> (<code>false</code>)</td>
              </tr>
              <tr>
                <td rowspan="3">
                  <code>VdStack</code> (<code>.vd-stack</code>)
                </td>
                <td><code>as</code></td>
                <td>—</td>
                <td>
                  <code>keyof HTMLElementTagNameMap</code> (<code>"div"</code>)
                </td>
              </tr>
              <tr>
                <td><code>gap</code></td>
                <td><code>data-gap</code></td>
                <td>
                  <code>"0" | "fib-1" … "fib-55"</code> (<code>"fib-8"</code>)
                </td>
              </tr>
              <tr>
                <td><code>align</code></td>
                <td><code>data-align</code></td>
                <td><code>"start" | "center" | "end" | "stretch"</code></td>
              </tr>
              <tr>
                <td rowspan="5">
                  <code>VdInline</code> (<code>.vd-inline</code>)
                </td>
                <td><code>as</code></td>
                <td>—</td>
                <td>
                  <code>keyof HTMLElementTagNameMap</code> (<code>"div"</code>)
                </td>
              </tr>
              <tr>
                <td><code>gap</code></td>
                <td><code>data-gap</code></td>
                <td>
                  <code>"0" | "fib-1" … "fib-55"</code> (<code>"fib-5"</code>)
                </td>
              </tr>
              <tr>
                <td><code>align</code></td>
                <td><code>data-align</code></td>
                <td>
                  <code
                    >"start" | "center" | "end" | "baseline" | "stretch"</code
                  >
                </td>
              </tr>
              <tr>
                <td><code>justify</code></td>
                <td><code>data-justify</code></td>
                <td>
                  <code
                    >"start" | "center" | "end" | "between" | "around" |
                    "evenly"</code
                  >
                </td>
              </tr>
              <tr>
                <td><code>wrap</code></td>
                <td><code>data-wrap</code></td>
                <td><code>"nowrap"</code></td>
              </tr>
              <tr>
                <td rowspan="3">
                  <code>VdCenter</code> (<code>.vd-center</code>)
                </td>
                <td><code>as</code></td>
                <td>—</td>
                <td>
                  <code>keyof HTMLElementTagNameMap</code> (<code>"div"</code>)
                </td>
              </tr>
              <tr>
                <td><code>max</code></td>
                <td><code>data-max</code></td>
                <td>
                  <code>"fib-377" | "fib-610" | "fib-987"</code>
                  (<code>"fib-610"</code>)
                </td>
              </tr>
              <tr>
                <td><code>axis</code></td>
                <td><code>data-axis</code></td>
                <td><code>"both" | "horizontal" | "vertical"</code></td>
              </tr>
              <tr>
                <td rowspan="3">
                  <code>VdCover</code> (<code>.vd-cover</code>)
                </td>
                <td><code>as</code></td>
                <td>—</td>
                <td>
                  <code>keyof HTMLElementTagNameMap</code> (<code>"div"</code>)
                </td>
              </tr>
              <tr>
                <td><code>min</code></td>
                <td><code>data-min</code></td>
                <td>
                  <code>"screen" | "half" | "fib-610" | "fib-987"</code>
                  (<code>"fib-610"</code>)
                </td>
              </tr>
              <tr>
                <td><code>gap</code></td>
                <td><code>data-gap</code></td>
                <td>
                  <code
                    >"fib-3" | "fib-5" | "fib-8" | "fib-13" | "fib-21" |
                    "fib-34"</code
                  >
                </td>
              </tr>
              <tr>
                <td rowspan="2">
                  <code>VdFrame</code> (<code>.vd-frame</code>)
                </td>
                <td><code>as</code></td>
                <td>—</td>
                <td>
                  <code>keyof HTMLElementTagNameMap</code> (<code>"div"</code>)
                </td>
              </tr>
              <tr>
                <td><code>ratio</code></td>
                <td><code>data-ratio</code></td>
                <td>
                  <code
                    >"golden" | "golden-portrait" | "square" | "16-9" | "4-3" |
                    "3-2" | "21-9"</code
                  >
                  (<code>"golden"</code>)
                </td>
              </tr>
              <tr>
                <td rowspan="3">
                  <code>VdSwitcher</code> (<code>.vd-switcher</code>)
                </td>
                <td><code>as</code></td>
                <td>—</td>
                <td>
                  <code>keyof HTMLElementTagNameMap</code> (<code>"div"</code>)
                </td>
              </tr>
              <tr>
                <td><code>threshold</code></td>
                <td><code>data-threshold</code></td>
                <td>
                  <code>"fib-377" | "fib-610" | "fib-987"</code>
                  (<code>"fib-610"</code>)
                </td>
              </tr>
              <tr>
                <td><code>gap</code></td>
                <td><code>data-gap</code></td>
                <td>
                  <code
                    >"fib-3" | "fib-5" | "fib-8" | "fib-13" | "fib-21" |
                    "fib-34"</code
                  >
                  (<code>"fib-5"</code>)
                </td>
              </tr>
            </tbody>
          </table>
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
