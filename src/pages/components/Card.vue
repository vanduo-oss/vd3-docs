<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import LaunchCustomizerButton from "@/components/LaunchCustomizerButton.vue";

const morphFlipped = ref(false);

const vue3Usage = `<script setup lang="ts">
import { VdCard } from "@vanduo-oss/vue";
<\/script>

<template>
  <VdCard interactive>
    <template #header><h6>Project</h6></template>
    Body content goes in the default slot.
    <template #footer>
      <button class="vd-btn vd-btn-primary">Open</button>
    </template>
  </VdCard>
</template>`;

const vue3Api: [string, string][] = [
  [":elevated", "Raised shadow treatment (.vd-card-elevated)."],
  [
    ":interactive",
    "Hover lift + cursor pointer + focus ring (.vd-card-interactive).",
  ],
  [
    "#header / default / #footer",
    "Header, body, and footer slots (header/footer render only when provided).",
  ],
];

const variantsHtml = `<div class="vd-card">
  <div class="vd-card-header">
    <h3>Card Title</h3>
  </div>
  <div class="vd-card-body">
    <p>Card content goes here.</p>
  </div>
  <div class="vd-card-footer">
    <button class="vd-btn vd-btn-primary vd-btn-sm">Action</button>
  </div>
</div>

<!-- Outlined variant -->
<div class="vd-card vd-card-outlined">...</div>

<!-- Filled variant -->
<div class="vd-card vd-card-filled">...</div>`;

const variantsCss = `.vd-card {
  background-color: var(--vd-card-bg);
  border-radius: var(--vd-card-border-radius);
  box-shadow: var(--vd-card-shadow-elevated);
}

.vd-card-outlined {
  box-shadow: none;
  border: 1px solid var(--vd-border-color);
}

.vd-card-filled {
  box-shadow: none;
  background-color: var(--vd-card-bg-filled);
  border: none;
}`;

const groupHtml = `<div class="vd-card-group">
  <div class="vd-card">
    <div class="vd-card-header"><h6>Free</h6></div>
    <div class="vd-card-body">
      <p class="vd-text-2xl vd-font-bold vd-mb-3">$0</p>
      <p class="vd-text-sm vd-text-muted">Basic features</p>
    </div>
  </div>
  <div class="vd-card">
    <div class="vd-card-header"><h6>Pro</h6></div>
    <div class="vd-card-body">
      <p class="vd-text-2xl vd-font-bold vd-mb-3">$12</p>
      <p class="vd-text-sm vd-text-muted">Everything in Free</p>
    </div>
  </div>
  <div class="vd-card">
    <div class="vd-card-header"><h6>Enterprise</h6></div>
    <div class="vd-card-body">
      <p class="vd-text-2xl vd-font-bold vd-mb-3">Custom</p>
      <p class="vd-text-sm vd-text-muted">Dedicated support</p>
    </div>
  </div>
</div>`;

const imageHtml = `<div class="vd-card">
  <div class="vd-card-image-container" style="position: relative;">
    <img src="landscape.jpg" alt="Landscape" class="vd-card-image"
         style="width: 100%; height: 160px; object-fit: cover;">
    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem;
                background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: white;">
      <h5 class="vd-mb-0">Landscape</h5>
    </div>
  </div>
  <div class="vd-card-body">
    <p class="vd-text-sm vd-text-muted vd-mb-0">Cards can hold images, charts, maps, or any media at the top.</p>
  </div>
</div>`;

const actionableHtml = `<div class="vd-card vd-card-interactive vd-card-glow" role="button" tabindex="0">
  <div class="vd-card-body">
    <i class="ph ph-rocket-launch" style="font-size: 2rem; color: var(--vd-color-primary);
       margin-bottom: 0.75rem; display: block;"></i>
    <h5>Get Started</h5>
    <p class="vd-text-sm vd-text-muted vd-mb-0">Click this card to navigate — the whole surface is interactive.</p>
  </div>
</div>`;

const classRef: [string, string, string][] = [
  [".vd-card", "Base card container — required on all cards", "Base"],
  [
    ".vd-card-elevated",
    "Explicit elevated shadow (same as default .vd-card)",
    "Variant",
  ],
  [".vd-card-outlined", "Outlined card with border, no shadow", "Variant"],
  [
    ".vd-card-filled",
    "Filled card with secondary background, no border",
    "Variant",
  ],
  [
    ".vd-card-glass",
    "Frosted glass surface (see Glass Effects tokens)",
    "Variant",
  ],
  [".vd-card-glow", "Adds soft primary-colored glow on hover", "Modifier"],
  [".vd-card-compact", "Reduces padding on header, body, footer", "Modifier"],
  [
    ".vd-card-spacious",
    "Increases padding on header, body, footer",
    "Modifier",
  ],
  [
    ".vd-card-group",
    "Connects adjacent cards with shared borders, no gaps",
    "Layout",
  ],
  [".vd-card-image", "Image inside a card (typically at top)", "Media"],
  [
    ".vd-card-image-container",
    "Wrapper for image with overlay text support",
    "Media",
  ],
  [
    ".vd-card-interactive",
    "Hover lift + cursor pointer + focus ring for clickable cards (renamed from .vd-card-actionable in framework 1.7.0)",
    "Modifier",
  ],
  [".vd-card-header", "Card header section with bottom border", "Structure"],
  [".vd-card-body", "Card body section with padding", "Structure"],
  [".vd-card-footer", "Card footer section with top border", "Structure"],
];
</script>

<template>
  <section id="cards">
    <div class="lcc-demo-head">
      <h5 class="demo-title"><i class="ph ph-rectangle"></i>Cards</h5>
      <LaunchCustomizerButton component="card" />
    </div>
    <p class="vd-text-muted vd-mb-6">
      Cards group content with consistent padding, borders, and elevation.
      Combine variants with <code>.vd-card-glow</code>,
      <code>.vd-card-glass</code>, or the Water Morph effect for richer demos.
    </p>

    <!-- Variants -->
    <h5 class="vd-mb-3"><i class="ph ph-squares-four mr-1"></i>Variants</h5>
    <p class="vd-text-sm vd-text-muted vd-mb-4">
      <strong>Elevated</strong> is the default: medium shadow (stronger in dark
      mode). <strong>Outlined</strong> drops the shadow for a crisp border.
      <strong>Filled</strong> uses a subtle surface tint and no border.
    </p>
    <div class="vd-row vd-mb-10">
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card vd-card-elevated demo-card">
          <div class="vd-card-header"><h6>Elevated Card</h6></div>
          <div class="vd-card-body">
            <p>
              Default elevated surface — compare the shadow to outlined and
              filled.
            </p>
          </div>
          <div class="vd-card-footer">
            <button type="button" class="vd-btn vd-btn-primary vd-btn-sm">
              Action
            </button>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card vd-card-outlined demo-card">
          <div class="vd-card-header"><h6>Outlined Card</h6></div>
          <div class="vd-card-body">
            <p>Border only, no drop shadow — ideal on busy backgrounds.</p>
          </div>
          <div class="vd-card-footer">
            <button type="button" class="vd-btn vd-btn-outline vd-btn-sm">
              Action
            </button>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card vd-card-filled demo-card">
          <div class="vd-card-header"><h6>Filled Card</h6></div>
          <div class="vd-card-body">
            <p>Secondary background fill, no border — reads as a soft panel.</p>
          </div>
          <div class="vd-card-footer">
            <button type="button" class="vd-btn vd-btn-primary vd-btn-sm">
              Action
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Glow -->
    <h5 class="vd-mb-3"><i class="ph ph-sparkle mr-1"></i>Glow on hover</h5>
    <p class="vd-text-sm vd-text-muted vd-mb-4">
      Add <code>.vd-card-glow</code> for a soft primary-tinted halo and border
      shift on hover (in addition to the elevated hover lift when applicable).
    </p>
    <div class="vd-row vd-mb-10">
      <div class="vd-col-12 vd-col-md-6 vd-col-lg-4">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-body vd-text-center">
            <p class="vd-mb-0"><strong>Hover this card</strong></p>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              Glow uses <code>--vd-card-glow-color</code> /
              <code>--vd-card-glow-border-color</code>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Glass -->
    <h5 class="vd-mb-3">
      <i class="ph ph-drop-half-bottom mr-1"></i>Glass (frosted)
    </h5>
    <p class="vd-text-sm vd-text-muted vd-mb-4">
      <code>.vd-card-glass</code> applies the glass token stack from the Glass
      Effects system — best seen over imagery or gradients. Respects
      <code>prefers-reduced-transparency</code> via the glass utilities.
    </p>
    <div class="vd-row vd-mb-10">
      <div class="vd-col-12">
        <div class="cards-glass-stage vd-mb-4">
          <div class="vd-card vd-card-glass demo-card" style="max-width: 420px">
            <div class="vd-card-header"><h6>Glass Card</h6></div>
            <div class="vd-card-body">
              <p class="vd-mb-0">
                Backdrop blur and translucent fill let the stage show through.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Morph -->
    <h5 class="vd-mb-3"><i class="ph ph-drop mr-1"></i>Morph inside a card</h5>
    <p class="vd-text-sm vd-text-muted vd-mb-4">
      Pair a card shell with the Water Morph effect to swap summary ↔ detail.
      Uses <code>.vd-morph-lg</code> for a slower wave.
    </p>
    <div class="vd-row vd-mb-10">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Interactive surface</h6></div>
          <div class="vd-card-body">
            <div
              class="vd-morph vd-morph-lg cards-morph-inner"
              role="button"
              tabindex="0"
              @click="morphFlipped = !morphFlipped"
              @keydown.enter.prevent="morphFlipped = !morphFlipped"
              @keydown.space.prevent="morphFlipped = !morphFlipped"
            >
              <span
                class="vd-morph-content"
                :class="morphFlipped ? 'vd-morph-next' : 'vd-morph-current'"
              >
                <span class="vd-font-semibold">Fibonacci spacing</span>
                <span class="vd-text-sm vd-text-muted">Click to read more</span>
              </span>
              <span
                class="vd-morph-content"
                :class="morphFlipped ? 'vd-morph-current' : 'vd-morph-next'"
              >
                <span class="vd-font-semibold">Fibonacci spacing</span>
                <span class="vd-text-sm vd-text-muted"
                  >Margins and padding use the golden-ratio scale for harmonious
                  rhythm across components.</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Density -->
    <h5 class="vd-mb-3">
      <i class="ph ph-arrows-out-line-horizontal mr-1"></i>Compact &amp;
      spacious
    </h5>
    <div class="vd-row vd-mb-10">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-compact demo-card">
          <div class="vd-card-header"><h6>Compact</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-0">
              <code>.vd-card-compact</code> tightens header, body, and footer
              padding.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-spacious demo-card">
          <div class="vd-card-header"><h6>Spacious</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-0">
              <code>.vd-card-spacious</code> uses larger Fibonacci padding for
              airy layouts.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-mb-10">
      <DocCodeSnippet :html="variantsHtml" :css="variantsCss" />
    </div>

    <!-- Card Groups -->
    <h5 class="vd-mb-3"><i class="ph ph-cards mr-1"></i>Card Groups</h5>
    <p class="vd-text-sm vd-text-muted vd-mb-4">
      Use <code>.vd-card-group</code> to connect cards with shared borders and
      no gaps — great for pricing tiers or feature lists.
    </p>
    <div class="vd-row vd-mb-10">
      <div class="vd-col-12">
        <div class="vd-card-group">
          <div class="vd-card">
            <div class="vd-card-header"><h6>Free</h6></div>
            <div class="vd-card-body">
              <p class="vd-text-2xl vd-font-bold vd-mb-3">$0</p>
              <p class="vd-text-sm vd-text-muted">Basic features</p>
            </div>
          </div>
          <div class="vd-card">
            <div class="vd-card-header"><h6>Pro</h6></div>
            <div class="vd-card-body">
              <p class="vd-text-2xl vd-font-bold vd-mb-3">$12</p>
              <p class="vd-text-sm vd-text-muted">Everything in Free</p>
            </div>
          </div>
          <div class="vd-card">
            <div class="vd-card-header"><h6>Enterprise</h6></div>
            <div class="vd-card-body">
              <p class="vd-text-2xl vd-font-bold vd-mb-3">Custom</p>
              <p class="vd-text-sm vd-text-muted">Dedicated support</p>
            </div>
          </div>
        </div>
        <div class="vd-mt-5">
          <DocCodeSnippet :html="groupHtml" />
        </div>
      </div>
    </div>

    <!-- Image Cards -->
    <h5 class="vd-mb-3"><i class="ph ph-image mr-1"></i>Image Cards</h5>
    <p class="vd-text-sm vd-text-muted vd-mb-4">
      Cards with top images using <code>.vd-card-image</code> or
      <code>.vd-card-image-container</code> for overlay text.
    </p>
    <div class="vd-row vd-mb-10">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card">
          <div class="vd-card-image-container" style="position: relative">
            <img
              src="/images/og-docs.png"
              alt="Landscape"
              class="vd-card-image"
              style="
                width: 100%;
                height: 160px;
                object-fit: cover;
                border-radius: var(--vd-card-border-radius)
                  var(--vd-card-border-radius) 0 0;
              "
            />
            <div
              style="
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 1rem;
                background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
                color: white;
              "
            >
              <h5 class="vd-mb-0">Landscape</h5>
            </div>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              Cards can hold images, charts, maps, or any media at the top.
            </p>
          </div>
        </div>
        <div class="vd-mt-5">
          <DocCodeSnippet :html="imageHtml" />
        </div>
      </div>
    </div>

    <!-- Actionable Cards -->
    <h5 class="vd-mb-3">
      <i class="ph ph-hand-pointing mr-1"></i>Actionable Cards
    </h5>
    <p class="vd-text-sm vd-text-muted vd-mb-4">
      Add <code>.vd-card-interactive</code> for hover lift, cursor pointer, and
      focus ring — perfect for clickable cards that navigate or trigger modals.
    </p>
    <div class="vd-row vd-mb-10">
      <div class="vd-col-12 vd-col-md-6 vd-col-lg-4">
        <div
          class="vd-card vd-card-interactive vd-card-glow"
          role="button"
          tabindex="0"
        >
          <div class="vd-card-body">
            <i
              class="ph ph-rocket-launch"
              style="
                font-size: 2rem;
                color: var(--vd-color-primary);
                margin-bottom: 0.75rem;
                display: block;
              "
            ></i>
            <h5>Get Started</h5>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              Click this card to navigate — the whole surface is interactive.
            </p>
          </div>
        </div>
        <div class="vd-mt-5">
          <DocCodeSnippet :html="actionableHtml" />
        </div>
      </div>
    </div>

    <!-- Class Reference -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i
                class="ph ph-list-dashes mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >Class Reference
            </h6>
          </div>
          <div class="vd-card-body">
            <h4>Usage</h4>
            <DocCodeSnippet :html="vue3Usage" :default-open="true" />

            <h4 class="vd-mt-6">CSS Classes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-hover">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Description</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in classRef" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="vd-mt-6">Component API (Vue 3)</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Prop / slot</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in vue3Api" :key="row[0]">
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
  </section>
</template>

<style scoped>
#cards .cards-glass-stage {
  border-radius: var(--vd-card-border-radius);
  padding: 2rem;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--vd-color-primary) 35%, transparent) 0%,
    color-mix(in srgb, var(--vd-color-primary) 8%, var(--vd-bg-secondary)) 45%,
    color-mix(in srgb, var(--vd-color-success) 20%, var(--vd-bg-secondary)) 100%
  );
  border: 1px solid var(--vd-border-color);
}
#cards .cards-morph-inner {
  min-height: 7rem;
  border-radius: calc(var(--vd-card-border-radius) - 2px);
  border: 1px solid var(--vd-border-color);
  background: var(--vd-bg-secondary);
}
#cards .cards-morph-inner .vd-morph-content {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.35rem;
  padding: 1.25rem 1.5rem;
  text-align: left;
}
</style>
