<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useFlow, VdFlow } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
const slide = ref(0);
useFlow(root);

const vue3ComponentSnippet = `<script setup lang="ts">
import { ref } from 'vue';
import { VdFlow } from '@vanduo-oss/vd3';

const slide = ref(0);
<\/script>

<template>
  <VdFlow v-model="slide" :total="3">
    <template #slide-0>First slide</template>
    <template #slide-1>Second slide</template>
    <template #slide-2>Third slide</template>
  </VdFlow>
</template>`;

const vdFlowComponentApi: [string, string][] = [
  ["v-model (modelValue)", "number — zero-based active slide index."],
  [":total", "number — total number of slides to render."],
  [
    "#slide-{i}",
    "Named scoped slot for slide i (0 to total - 1); receives { index }.",
  ],
  [
    "Exposed (template ref)",
    "{ go(index), prev(), next(), index: Ref<number> } — imperative slide controls.",
  ],
];

const vue3Wiring = `import { ref } from 'vue';
import { useFlow } from "@vanduo-oss/vd3";

const root = ref<HTMLElement | null>(null);
const flow = useFlow(root); // wires every .vd-flow inside root; cleanup on unmount

// programmatic control via returned FlowApi:
// flow.next(el), flow.prev(el), flow.goTo(el, 2), flow.refresh()

// react to slide changes
root.value?.addEventListener('flow:change', (e) => {
  console.log('slide', e.detail.current); // { current, previous, total }
});`;

const vue3Api: [string, string][] = [
  [
    "useFlow(root)",
    "Composable — wires every .vd-flow / .vd-carousel inside the root ref (prev/next, indicators, keyboard, touch swipe, autoplay) and returns a FlowApi controller.",
  ],
  [
    "goTo(el, index)",
    "FlowApi method — jump the given .vd-flow element to zero-based slide index (wraps when data-vd-loop is enabled, clamps otherwise).",
  ],
  [
    "next(el) / prev(el)",
    "FlowApi methods — step the given .vd-flow element forward or backward one slide.",
  ],
  [
    "refresh()",
    "FlowApi method — re-scans root for newly added .vd-flow elements and syncs slide/indicator ARIA.",
  ],
  [
    "(automatic cleanup)",
    "Listeners, live regions, and autoplay timers are cleared on component unmount.",
  ],
];

const basicHtml = `<div class="vd-flow" data-vd-loop="true">
  <div class="vd-flow-track">
    <div class="vd-flow-slide">Slide One</div>
    <div class="vd-flow-slide">Slide Two</div>
    <div class="vd-flow-slide">Slide Three</div>
  </div>
  <button class="vd-flow-prev" aria-label="Previous slide">&lsaquo;</button>
  <button class="vd-flow-next" aria-label="Next slide">&rsaquo;</button>
</div>`;

const fadeHtml = `<!-- Add .vd-flow-fade for crossfade -->
<div class="vd-flow vd-flow-fade">
  <div class="vd-flow-track">
    <div class="vd-flow-slide">...</div>
    <div class="vd-flow-slide">...</div>
  </div>
  <button class="vd-flow-prev">&lsaquo;</button>
  <button class="vd-flow-next">&rsaquo;</button>
</div>`;

const autoplayHtml = `<!-- Autoplay with indicators -->
<div class="vd-flow"
     data-vd-autoplay="true"
     data-vd-interval="4000"
     data-vd-loop="true">
  <div class="vd-flow-track">
    <div class="vd-flow-slide">...</div>
    <div class="vd-flow-slide">...</div>
  </div>
  <button class="vd-flow-prev">...</button>
  <button class="vd-flow-next">...</button>
  <div class="vd-flow-indicators">
    <button aria-label="Go to slide 1"></button>
    <button aria-label="Go to slide 2"></button>
  </div>
</div>`;

const cssClasses: [string, string, string][] = [
  [".vd-flow", "Base carousel container — required", "Base"],
  [".vd-carousel", "Alias for .vd-flow", "Base"],
  [
    ".vd-flow-track",
    "Inner wrapper holding all slides; handles translation",
    "Structure",
  ],
  [".vd-flow-slide", "Individual slide element within the track", "Structure"],
  [".vd-flow-prev", "Previous-slide navigation button", "Control"],
  [".vd-flow-next", "Next-slide navigation button", "Control"],
  [
    ".vd-flow-indicators",
    "Container for dot indicators; one button per slide",
    "Control",
  ],
  [
    ".vd-flow-fade",
    "Crossfade transition instead of horizontal slide",
    "Modifier",
  ],
  [
    ".vd-flow-compact",
    "Reduced padding and height for compact layouts",
    "Size",
  ],
  [
    ".vd-flow-lg",
    "Increased padding and height for hero-style carousels",
    "Size",
  ],
];

const dataAttrs: [string, string, string][] = [
  [
    "data-vd-autoplay",
    'Enable automatic slide advancement when set to "true"',
    "false",
  ],
  ["data-vd-interval", "Time in milliseconds between auto-advances", "5000"],
  [
    "data-vd-loop",
    'Loops back to the first slide after the last; set to "false" to disable',
    "true",
  ],
];
</script>

<template>
  <section id="carousel" ref="root">
    <h5 class="demo-title"><i class="ph ph-slideshow"></i>Flow / Carousel</h5>
    <p class="vd-mb-8">
      A carousel for stepping through a sequence of slides, with previous and
      next controls and optional looping.
    </p>

    <div class="vd-card vd-card-glow demo-card vd-mb-6">
      <div class="vd-card-header"><h6>VdFlow Component</h6></div>
      <div class="vd-card-body">
        <VdFlow v-model="slide" :total="3">
          <template #slide-0>
            <div
              style="
                background: linear-gradient(
                  135deg,
                  var(--vd-color-primary),
                  var(--vd-color-info)
                );
                color: #fff;
                padding: 2.5rem;
                text-align: center;
                border-radius: var(--vd-radius-fib-5);
              "
            >
              <h4 style="margin: 0 0 0.35rem">First Slide</h4>
              <p style="margin: 0; opacity: 0.85">
                Controlled via <code>v-model</code> (slide {{ slide + 1 }} of 3)
              </p>
            </div>
          </template>
          <template #slide-1>
            <div
              style="
                background: linear-gradient(
                  135deg,
                  var(--vd-color-success),
                  var(--vd-color-primary)
                );
                color: #fff;
                padding: 2.5rem;
                text-align: center;
                border-radius: var(--vd-radius-fib-5);
              "
            >
              <h4 style="margin: 0 0 0.35rem">Second Slide</h4>
              <p style="margin: 0; opacity: 0.85">
                Rendered in named slot <code>#slide-1</code>
              </p>
            </div>
          </template>
          <template #slide-2>
            <div
              style="
                background: linear-gradient(
                  135deg,
                  var(--vd-color-warning),
                  var(--vd-color-error)
                );
                color: #fff;
                padding: 2.5rem;
                text-align: center;
                border-radius: var(--vd-radius-fib-5);
              "
            >
              <h4 style="margin: 0 0 0.35rem">Third Slide</h4>
              <p style="margin: 0; opacity: 0.85">
                Exposes <code>{ go, prev, next, index }</code> on template ref
              </p>
            </div>
          </template>
        </VdFlow>
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          <code>v-model</code> is the slide index. Slots are
          <code>#slide-0</code> through <code>#slide-n</code>. The exposed
          controller is <code>go</code>, <code>prev</code>, <code>next</code>,
          and <code>index</code>.
        </p>
        <DocCodeSnippet class="vd-mt-4" :vue="vue3ComponentSnippet" />
      </div>
    </div>

    <!-- Basic -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-flow-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic Carousel</h6></div>
          <div class="vd-card-body">
            <div class="vd-flow" data-vd-loop="true">
              <div class="vd-flow-track">
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(
                      135deg,
                      var(--vd-color-primary),
                      var(--vd-color-info)
                    );
                    color: #fff;
                    padding: 3rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0 0 0.5rem">Slide One</h4>
                  <p style="margin: 0; opacity: 0.85">
                    Horizontal slide transition
                  </p>
                </div>
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(
                      135deg,
                      var(--vd-color-success),
                      var(--vd-color-primary)
                    );
                    color: #fff;
                    padding: 3rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0 0 0.5rem">Slide Two</h4>
                  <p style="margin: 0; opacity: 0.85">
                    Swipe or use controls to navigate
                  </p>
                </div>
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(
                      135deg,
                      var(--vd-color-warning),
                      var(--vd-color-error)
                    );
                    color: #fff;
                    padding: 3rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0 0 0.5rem">Slide Three</h4>
                  <p style="margin: 0; opacity: 0.85">
                    Fully responsive and accessible
                  </p>
                </div>
              </div>
              <button class="vd-flow-prev" aria-label="Previous slide">
                <i class="ph ph-caret-left"></i>
              </button>
              <button class="vd-flow-next" aria-label="Next slide">
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="basicHtml" />
      </div>
    </div>

    <!-- Fade + Autoplay -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-flow-fade" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Fade Variant</h6></div>
          <div class="vd-card-body">
            <div class="vd-flow vd-flow-fade" data-vd-loop="true">
              <div class="vd-flow-track">
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: #fff;
                    padding: 3rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0">Cross-fade transition</h4>
                </div>
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(135deg, #f093fb, #f5576c);
                    color: #fff;
                    padding: 3rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0">Smooth opacity blend</h4>
                </div>
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(135deg, #4facfe, #00f2fe);
                    color: #fff;
                    padding: 3rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0">Elegant transitions</h4>
                </div>
              </div>
              <button class="vd-flow-prev" aria-label="Previous slide">
                <i class="ph ph-caret-left"></i>
              </button>
              <button class="vd-flow-next" aria-label="Next slide">
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="fadeHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-flow-autoplay" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Autoplay with Indicators</h6></div>
          <div class="vd-card-body">
            <div
              class="vd-flow"
              data-vd-autoplay="true"
              data-vd-interval="4000"
              data-vd-loop="true"
            >
              <div class="vd-flow-track">
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(135deg, #0c3483, #a2b6df);
                    color: #fff;
                    padding: 3rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0">Auto-advances every 4s</h4>
                </div>
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(135deg, #fc5c7d, #6a82fb);
                    color: #fff;
                    padding: 3rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0">Pauses on hover</h4>
                </div>
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(135deg, #11998e, #38ef7d);
                    color: #fff;
                    padding: 3rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0">Click indicator to jump</h4>
                </div>
              </div>
              <button class="vd-flow-prev" aria-label="Previous slide">
                <i class="ph ph-caret-left"></i>
              </button>
              <button class="vd-flow-next" aria-label="Next slide">
                <i class="ph ph-caret-right"></i>
              </button>
              <div class="vd-flow-indicators">
                <button aria-label="Go to slide 1"></button>
                <button aria-label="Go to slide 2"></button>
                <button aria-label="Go to slide 3"></button>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="autoplayHtml" />
      </div>
    </div>

    <!-- Compact + Large -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-flow-compact" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Compact Size</h6></div>
          <div class="vd-card-body">
            <div class="vd-flow vd-flow-compact" data-vd-loop="true">
              <div class="vd-flow-track">
                <div
                  class="vd-flow-slide"
                  style="
                    background: var(--vd-bg-secondary);
                    padding: 1.5rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <p style="margin: 0">Compact slide A</p>
                </div>
                <div
                  class="vd-flow-slide"
                  style="
                    background: var(--vd-bg-secondary);
                    padding: 1.5rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <p style="margin: 0">Compact slide B</p>
                </div>
              </div>
              <button class="vd-flow-prev" aria-label="Previous slide">
                <i class="ph ph-caret-left"></i>
              </button>
              <button class="vd-flow-next" aria-label="Next slide">
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-flow-lg" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Large Size</h6></div>
          <div class="vd-card-body">
            <div class="vd-flow vd-flow-lg" data-vd-loop="true">
              <div class="vd-flow-track">
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(135deg, #232526, #414345);
                    color: #fff;
                    padding: 4rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0 0 0.5rem">Hero-size Carousel</h4>
                  <p style="margin: 0; opacity: 0.8">
                    Great for feature showcases and landing pages
                  </p>
                </div>
                <div
                  class="vd-flow-slide"
                  style="
                    background: linear-gradient(135deg, #1a2a6c, #b21f1f);
                    color: #fff;
                    padding: 4rem;
                    text-align: center;
                    border-radius: var(--vd-radius-fib-5);
                  "
                >
                  <h4 style="margin: 0 0 0.5rem">Full-width Content</h4>
                  <p style="margin: 0; opacity: 0.8">
                    Increased padding and height for impact
                  </p>
                </div>
              </div>
              <button class="vd-flow-prev" aria-label="Previous slide">
                <i class="ph ph-caret-left"></i>
              </button>
              <button class="vd-flow-next" aria-label="Next slide">
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div id="demo-flow-api" class="vd-card vd-card-glow demo-card">
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
        <DocCodeSnippet :js="vue3Wiring" :default-open="true" />

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

        <h4>Data Attributes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in dataAttrs" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
                <td>
                  <code>{{ row[2] }}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>VdFlow Component API</h4>
        <div class="vd-table-responsive vd-mb-6">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Prop / Slot / Exposed</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in vdFlowComponentApi" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>Composable API (useFlow)</h4>
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

        <h4>Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>flow:change</code></td>
                <td>
                  Fired on the <code>.vd-flow</code> element after a slide
                  transition completes
                </td>
                <td><code>{ current, previous, total }</code></td>
              </tr>
            </tbody>
          </table>
        </div>
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
            Navigation buttons include <code>aria-label</code> attributes for
            screen readers
          </li>
          <li>
            Indicator buttons use <code>aria-label="Go to slide N"</code> for
            identification
          </li>
          <li>
            Active indicator receives <code>aria-current="true"</code> and
            <code>.is-active</code> class
          </li>
          <li>
            Autoplay pauses on <code>:hover</code> and
            <code>:focus-within</code> to respect user interaction
          </li>
          <li>
            Keyboard navigation: <kbd>ArrowLeft</kbd> /
            <kbd>ArrowRight</kbd> move between slides when focused
          </li>
          <li>
            The carousel container uses <code>role="region"</code> and
            <code>aria-roledescription="carousel"</code>
          </li>
          <li>
            Each slide uses <code>role="group"</code> and
            <code>aria-roledescription="slide"</code>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
