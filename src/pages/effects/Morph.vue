<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useMorph } from "@vanduo-oss/vue";
import { useMorphBadges } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useMorph(root);
useMorphBadges(root);

// Engine-specific wiring (the markup and classes are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useMorph } from "@vanduo-oss/vue";
import { useMorphBadges } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useMorph(root);        // auto wave/shine + current⇄next swap
useMorphBadges(root);  // manual multi-state badge cycling`;

const vanillaWiring = `// The framework auto-initialises morph effects on Vanduo.init()
VanduoMorph.init();`;

const vue3Api: [string, string][] = [
  [
    "useMorph(root)",
    "Composable — wires every auto-morph element inside the root ref (wave/shine layers, current⇄next content swap). Call once in setup().",
  ],
  [
    "useMorphBadges(root)",
    'Composable — cycles [data-vd-morph="manual"][data-morph-states] badges through their states/classes/icons.',
  ],
];

const toggleHtml = `<button class="vd-morph" data-vd-morph>
  <span class="vd-morph-content vd-morph-current">
    <i class="ph ph-sun"></i> Light Mode
  </span>
  <span class="vd-morph-content vd-morph-next">
    <i class="ph ph-moon"></i> Dark Mode
  </span>
</button>`;

const themeHtml = `<div class="vd-morph theme-card" data-vd-morph>
  <span class="vd-morph-content vd-morph-current">
    <i class="ph ph-sun"></i>
    <span>Light Theme</span>
  </span>
  <span class="vd-morph-content vd-morph-next">
    <i class="ph ph-moon-stars"></i>
    <span>Dark Theme</span>
  </span>
</div>`;

const badgeHtml = `<!-- Override --vd-morph-wave-color per status -->
<span class="vd-morph vd-morph-sm badge-online" data-vd-morph>
  <span class="vd-morph-content vd-morph-current">
    <i class="ph ph-wifi-high"></i> Online
  </span>
  <span class="vd-morph-content vd-morph-next">
    <i class="ph ph-coffee"></i> Away
  </span>
</span>

<!-- CSS: .badge-online { --vd-morph-wave-color: var(--vd-color-success); } -->`;

const captionHtml = `<!-- .vd-morph-lg slows the wave for dramatic reveals -->
<div class="vd-morph vd-morph-lg caption-card" data-vd-morph>
  <span class="vd-morph-content vd-morph-current">
    <span>Mountain Sunrise</span>
    <span>Click to reveal details</span>
  </span>
  <span class="vd-morph-content vd-morph-next">
    <span>Mountain Sunrise</span>
    <span>Golden light spills across alpine ridges...</span>
  </span>
</div>`;

const cssClasses: [string, string, string][] = [
  [".vd-morph", "Enable water morph on an element", "Base"],
  [".vd-morph-sm", "Shorter, snappier morph (0.5s)", "Modifier"],
  [".vd-morph-lg", "Slower, more dramatic morph (1s)", "Modifier"],
  [
    ".vd-morph-wave",
    "Radial wave layer (auto-created by JS if absent)",
    "Internal",
  ],
  [
    ".vd-morph-shine",
    "Light-sweep layer (auto-created by JS if absent)",
    "Internal",
  ],
  [
    ".vd-morph-content",
    "Content wrapper — required on both states",
    "Structure",
  ],
  [".vd-morph-current", "Currently visible content layer", "State"],
  [".vd-morph-next", "Hidden content layer revealed on morph", "State"],
];

const cssVars: [string, string, string][] = [
  ["--vd-morph-duration", "0.75s", "Total animation duration"],
  [
    "--vd-morph-easing",
    "cubic-bezier(0.2, 0.8, 0.35, 1)",
    "Wave expansion timing",
  ],
  [
    "--vd-morph-wave-color",
    "var(--vd-color-primary)",
    "Wave gradient base colour (override per-element)",
  ],
  ["--vd-morph-blur-peak", "11px", "Maximum blur at wave peak"],
];

const jsApi: [string, string][] = [
  [
    "VanduoMorph.init()",
    "Auto-initialize all .vd-morph / [data-vd-morph] elements",
  ],
  [
    "VanduoMorph.morph(el)",
    "Trigger morph programmatically (wave from center)",
  ],
  ["VanduoMorph.destroy(el)", "Remove listeners from one element"],
  ["VanduoMorph.destroyAll()", "Tear down all instances"],
];
</script>

<template>
  <section id="morph" ref="root">
    <h5 class="demo-title"><i class="ph ph-drop"></i>Water Morph</h5>
    <p class="vd-mb-6">
      A liquid wave content-swap effect. Click triggers an expanding radial wave
      from the pointer position while the old content dissolves and the new
      content emerges. Works on any element.
    </p>

    <!-- Demo 1 + 2 -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-morph-toggle" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Mode Toggle</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Click to morph between two labeled states. The wave originates
              from your pointer.
            </p>
            <div class="morph-demo-row">
              <button
                class="vd-morph morph-demo-toggle"
                data-vd-morph
                id="demo-morph-toggle-btn"
              >
                <span class="vd-morph-content vd-morph-current"
                  ><i class="ph ph-sun" style="margin-right: 0.4rem"></i> Light
                  Mode</span
                >
                <span class="vd-morph-content vd-morph-next"
                  ><i class="ph ph-moon" style="margin-right: 0.4rem"></i> Dark
                  Mode</span
                >
              </button>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="toggleHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-morph-theme" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Theme Preview Card</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Morph works on any container. This card-sized element swaps its
              entire surface.
            </p>
            <div
              class="vd-morph morph-theme-card"
              data-vd-morph
              id="demo-morph-theme-card"
              style="background: var(--vd-bg-secondary)"
            >
              <span class="vd-morph-content vd-morph-current">
                <i
                  class="ph ph-sun morph-theme-icon"
                  style="color: var(--vd-color-warning, #f59e0b)"
                ></i>
                <span class="morph-theme-label">Light Theme</span>
                <span class="morph-theme-sub">Clean and bright</span>
              </span>
              <span class="vd-morph-content vd-morph-next">
                <i
                  class="ph ph-moon-stars morph-theme-icon"
                  style="color: var(--vd-color-primary)"
                ></i>
                <span class="morph-theme-label">Dark Theme</span>
                <span class="morph-theme-sub">Easy on the eyes</span>
              </span>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="themeHtml" />
      </div>
    </div>

    <!-- Demo 3 + 4 -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-morph-badge" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Status Badge Morph</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Click any badge to cycle. Each state overrides
              <code>--vd-morph-wave-color</code> for a matching wave.
            </p>
            <div class="morph-badge-stack">
              <span
                class="vd-morph morph-badge morph-badge-online"
                data-vd-morph="manual"
                id="demo-morph-badge-btn"
                data-morph-states='["Online","Away","Offline"]'
                data-morph-classes='["morph-badge-online","morph-badge-away","morph-badge-offline"]'
                data-morph-icons='["ph-wifi-high","ph-coffee","ph-wifi-slash"]'
              >
                <span class="vd-morph-wave" aria-hidden="true"></span>
                <span class="vd-morph-shine" aria-hidden="true"></span>
                <span class="vd-morph-content vd-morph-current"
                  ><i class="ph ph-wifi-high"></i> Online</span
                >
                <span class="vd-morph-content vd-morph-next"
                  ><i class="ph ph-coffee"></i> Away</span
                >
              </span>
              <span
                class="vd-morph morph-badge morph-badge-priority-low"
                data-vd-morph="manual"
                id="demo-morph-badge-priority"
                data-morph-states='["Low","Medium","High","Urgent"]'
                data-morph-classes='["morph-badge-priority-low","morph-badge-priority-medium","morph-badge-priority-high","morph-badge-priority-urgent"]'
                data-morph-icons='["ph-circle","ph-warning-circle","ph-fire","ph-flag"]'
              >
                <span class="vd-morph-wave" aria-hidden="true"></span>
                <span class="vd-morph-shine" aria-hidden="true"></span>
                <span class="vd-morph-content vd-morph-current"
                  ><i class="ph ph-circle"></i> Low</span
                >
                <span class="vd-morph-content vd-morph-next"
                  ><i class="ph ph-warning-circle"></i> Medium</span
                >
              </span>
              <span
                class="vd-morph morph-badge morph-badge-build-passing"
                data-vd-morph="manual"
                id="demo-morph-badge-build"
                data-morph-states='["Passing","Running","Failed"]'
                data-morph-classes='["morph-badge-build-passing","morph-badge-build-running","morph-badge-build-failed"]'
                data-morph-icons='["ph-check-circle","ph-spinner-gap","ph-x-circle"]'
              >
                <span class="vd-morph-wave" aria-hidden="true"></span>
                <span class="vd-morph-shine" aria-hidden="true"></span>
                <span class="vd-morph-content vd-morph-current"
                  ><i class="ph ph-check-circle"></i> Passing</span
                >
                <span class="vd-morph-content vd-morph-next"
                  ><i class="ph ph-spinner-gap"></i> Running</span
                >
              </span>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="badgeHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-morph-caption" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Caption Reveal</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Morph text-heavy content with <code>.vd-morph-lg</code> for a
              slower, dramatic effect.
            </p>
            <div
              class="vd-morph vd-morph-lg morph-caption-card"
              data-vd-morph
              id="demo-morph-caption-card"
            >
              <span class="vd-morph-content vd-morph-current">
                <span class="morph-caption-title">Mountain Sunrise</span>
                <span class="morph-caption-body">Click to reveal details</span>
              </span>
              <span class="vd-morph-content vd-morph-next">
                <span class="morph-caption-title">Mountain Sunrise</span>
                <span class="morph-caption-body"
                  >Golden light spills across alpine ridges at 5,200m elevation.
                  Shot at f/8, 1/250s during the September equinox.</span
                >
              </span>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="captionHtml" />
      </div>
    </div>

    <!-- API Reference -->
    <div id="demo-morph-api" class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-list-dashes mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >API Reference
        </h6>
      </div>
      <div class="vd-card-body">
        <h4>Wiring</h4>
        <EngineSwitch>
          <template #vue3
            ><DocCodeSnippet :js="vue3Wiring" :default-open="true"
          /></template>
          <template #vanilla
            ><DocCodeSnippet :js="vanillaWiring" :default-open="true"
          /></template>
        </EngineSwitch>

        <h4 class="vd-mt-6">CSS Classes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Class</th>
                <th>Description</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in cssClasses" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>CSS Custom Properties</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in cssVars" :key="row[0]">
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
            <h4>Composable API</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Symbol</th>
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
          </template>
          <template #vanilla>
            <h4>JavaScript API</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in jsApi" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </EngineSwitch>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-wheelchair mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >Accessibility
        </h6>
      </div>
      <div class="vd-card-body">
        <ul>
          <li>
            Wave and shine layers use <code>aria-hidden="true"</code> and carry
            no semantic content
          </li>
          <li>
            Animation fully respects
            <code>prefers-reduced-motion: reduce</code> — content swaps
            instantly with no wave
          </li>
          <li>
            Non-button morph elements should include <code>role</code> and
            <code>tabindex</code> for keyboard access
          </li>
          <li>
            The component works with <code>Enter</code> and
            <code>Space</code> keys on natively focusable elements
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
#morph .morph-demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}
#morph .morph-demo-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  min-height: 2.5rem;
  padding: 0.65rem 1.25rem;
  border: 1px solid
    color-mix(in srgb, var(--vd-color-primary) 35%, var(--vd-border-color));
  border-radius: var(--vd-btn-border-radius);
  background: color-mix(
    in srgb,
    var(--vd-color-primary) 12%,
    var(--vd-bg-secondary)
  );
  color: var(--vd-color-primary);
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 2px 8px
    color-mix(in srgb, var(--vd-color-primary) 14%, transparent);
  transition:
    border-color 0.3s,
    background 0.3s,
    box-shadow 0.3s;
}
#morph .morph-demo-toggle:hover {
  border-color: color-mix(
    in srgb,
    var(--vd-color-primary) 55%,
    var(--vd-border-color)
  );
  background: color-mix(
    in srgb,
    var(--vd-color-primary) 18%,
    var(--vd-bg-secondary)
  );
  box-shadow: 0 3px 12px
    color-mix(in srgb, var(--vd-color-primary) 22%, transparent);
}
#morph .morph-theme-card {
  width: 260px;
  height: 160px;
  border-radius: var(--vd-card-border-radius);
  border: 1px solid var(--vd-border-color);
}
#morph .morph-theme-card .vd-morph-content {
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
}
#morph .morph-theme-card .morph-theme-icon {
  font-size: 2rem;
}
#morph .morph-theme-card .morph-theme-label {
  font-weight: 700;
  font-size: 1rem;
}
#morph .morph-theme-card .morph-theme-sub {
  font-size: 0.8rem;
  opacity: 0.7;
}
#morph .morph-badge-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
#morph .morph-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 9rem;
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
}
#morph .morph-badge i {
  font-size: 1.1rem;
  margin-right: 0.35rem;
}
#morph .morph-badge-online {
  background: var(--vd-color-success-alpha-10, rgba(16, 185, 129, 0.1));
  color: var(--vd-color-success, #10b981);
  --vd-morph-wave-color: var(--vd-color-success, #10b981);
}
#morph .morph-badge-away {
  background: var(--vd-color-warning-alpha-10, rgba(245, 158, 11, 0.1));
  color: var(--vd-color-warning, #f59e0b);
  --vd-morph-wave-color: var(--vd-color-warning, #f59e0b);
}
#morph .morph-badge-offline {
  background: var(--vd-color-error-alpha-10, rgba(239, 68, 68, 0.1));
  color: var(--vd-color-error, #ef4444);
  --vd-morph-wave-color: var(--vd-color-error, #ef4444);
}
#morph .morph-badge-priority-low {
  background: color-mix(
    in srgb,
    var(--vd-color-info, #0ea5e9) 12%,
    transparent
  );
  color: var(--vd-color-info, #0ea5e9);
  --vd-morph-wave-color: var(--vd-color-info, #0ea5e9);
}
#morph .morph-badge-priority-medium {
  background: var(--vd-color-warning-alpha-10, rgba(245, 158, 11, 0.1));
  color: var(--vd-color-warning, #f59e0b);
  --vd-morph-wave-color: var(--vd-color-warning, #f59e0b);
}
#morph .morph-badge-priority-high {
  background: color-mix(in srgb, #ea580c 14%, transparent);
  color: #ea580c;
  --vd-morph-wave-color: #ea580c;
}
#morph .morph-badge-priority-urgent {
  background: var(--vd-color-error-alpha-10, rgba(239, 68, 68, 0.1));
  color: var(--vd-color-error, #ef4444);
  --vd-morph-wave-color: var(--vd-color-error, #ef4444);
}
#morph .morph-badge-build-passing {
  background: var(--vd-color-success-alpha-10, rgba(16, 185, 129, 0.1));
  color: var(--vd-color-success, #10b981);
  --vd-morph-wave-color: var(--vd-color-success, #10b981);
}
#morph .morph-badge-build-running {
  background: color-mix(
    in srgb,
    var(--vd-color-primary) 12%,
    var(--vd-bg-secondary)
  );
  color: var(--vd-color-primary);
  --vd-morph-wave-color: var(--vd-color-primary);
}
#morph .morph-badge-build-failed {
  background: var(--vd-color-error-alpha-10, rgba(239, 68, 68, 0.1));
  color: var(--vd-color-error, #ef4444);
  --vd-morph-wave-color: var(--vd-color-error, #ef4444);
}
#morph .morph-caption-card {
  width: 100%;
  max-width: 340px;
  border-radius: var(--vd-card-border-radius);
  border: 1px solid var(--vd-border-color);
  background: var(--vd-bg-secondary);
  min-height: 120px;
}
#morph .morph-caption-card .vd-morph-content {
  padding: 1.5rem 1.75rem;
  text-align: left;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
#morph .morph-caption-title {
  font-weight: 700;
  font-size: 0.95rem;
}
#morph .morph-caption-body {
  font-size: 0.82rem;
  color: var(--vd-text-secondary);
  line-height: 1.5;
}
</style>
