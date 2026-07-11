<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { VdSwitch } from "@vanduo-oss/vue";

const wifi = ref(true);
const notifications = ref(false);
const sizeSm = ref(true);
const sizeMd = ref(true);
const sizeLg = ref(true);
const locked = ref(true);

const basicHtml = `<label class="vd-form-switch">
  <input type="checkbox" class="vd-form-switch-input" role="switch" checked />
  <span class="vd-form-switch-label">Wi-Fi</span>
</label>`;

const sizesHtml = `<!-- Small -->
<label class="vd-form-switch vd-form-switch-sm">
  <input type="checkbox" class="vd-form-switch-input" role="switch" checked />
  <span class="vd-form-switch-label">Small</span>
</label>

<!-- Default -->
<label class="vd-form-switch">
  <input type="checkbox" class="vd-form-switch-input" role="switch" checked />
  <span class="vd-form-switch-label">Default</span>
</label>

<!-- Large -->
<label class="vd-form-switch vd-form-switch-lg">
  <input type="checkbox" class="vd-form-switch-input" role="switch" checked />
  <span class="vd-form-switch-label">Large</span>
</label>`;

const disabledHtml = `<label class="vd-form-switch">
  <input type="checkbox" class="vd-form-switch-input" role="switch" checked disabled />
  <span class="vd-form-switch-label">Locked on</span>
</label>`;

const cssClasses: [string, string][] = [
  [".vd-form-switch", "The <label> wrapper that styles the track + thumb"],
  [
    ".vd-form-switch-input",
    'The visually-styled checkbox input — pair with role="switch"',
  ],
  [".vd-form-switch-label", "Text label rendered beside the track"],
  [".vd-form-switch-sm", "Small size variant — place on the wrapper"],
  [".vd-form-switch-lg", "Large size variant"],
  [
    ".vd-form-switch-inline",
    "Lays the label and track inline for compact rows",
  ],
];

const vue3Usage = `<script setup lang="ts">
import { VdSwitch } from "@vanduo-oss/vue";
const wifi = ref(true);
<\/script>

<template>
  <VdSwitch v-model="wifi" label="Wi-Fi" />
</template>`;

const vanillaUsage = `<label class="vd-form-switch">
  <input type="checkbox" class="vd-form-switch-input" role="switch" checked />
  <span class="vd-form-switch-label">Wi-Fi</span>
</label>

<!-- No JavaScript required — the switch is a styled native checkbox. -->`;

const vue3Api: [string, string][] = [
  ["v-model (modelValue)", "Two-way bound on/off state (boolean)."],
  [":label", "Text label rendered beside the track (or use the default slot)."],
  [":size", "'sm' | 'md' | 'lg' — track size (default 'md')."],
  [":disabled", "Greys out and blocks interaction when true."],
  [":name / :id", "Forwarded to the underlying input for forms / labels."],
  [
    "@update:modelValue",
    "Fired with the new boolean when the user toggles the switch.",
  ],
];
</script>

<template>
  <section id="switch">
    <h5 class="demo-title"><i class="ph ph-toggle-right"></i>Switch</h5>
    <p class="vd-mb-5">
      <strong>VdSwitch</strong> is an accessible on/off toggle built on a native
      checkbox with <code>role="switch"</code>. It needs no JavaScript in the
      Vanilla engine — just the <code>.vd-form-switch</code> markup — and binds
      with <code>v-model</code> in Vue&nbsp;3.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-switch-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic Toggle</h6></div>
          <div class="vd-card-body">
            <VdSwitch v-model="wifi" label="Wi-Fi" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Wi-Fi is {{ wifi ? "on" : "off" }}.
            </p>
            <VdSwitch
              v-model="notifications"
              label="Notifications"
              class="vd-mt-4"
            />
            <DocCodeSnippet :html="basicHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-switch-sizes" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Size Variants</h6></div>
          <div class="vd-card-body">
            <VdSwitch v-model="sizeSm" label="Small" size="sm" />
            <VdSwitch v-model="sizeMd" label="Default" class="vd-mt-3" />
            <VdSwitch
              v-model="sizeLg"
              label="Large"
              size="lg"
              class="vd-mt-3"
            />
            <DocCodeSnippet :html="sizesHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-switch-disabled" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Disabled</h6></div>
          <div class="vd-card-body">
            <VdSwitch v-model="locked" label="Locked on" disabled />
            <DocCodeSnippet :html="disabledHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-card vd-card-glow demo-card">
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
        <h4>Usage</h4>
        <EngineSwitch>
          <template #vue3
            ><DocCodeSnippet :html="vue3Usage" :default-open="true"
          /></template>
          <template #vanilla
            ><DocCodeSnippet :html="vanillaUsage" :default-open="true"
          /></template>
        </EngineSwitch>

        <h4 class="vd-mt-6">CSS Classes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Class</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in cssClasses" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <EngineSwitch>
          <template #vue3>
            <h4 class="vd-mt-6">Component API</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Prop / event</th>
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
            <h4 class="vd-mt-6">JavaScript</h4>
            <p class="vd-text-muted">
              None — the switch is a CSS-only styled checkbox. Read its state
              from the input's <code>checked</code> property and listen for the
              native <code>change</code> event.
            </p>
          </template>
        </EngineSwitch>

        <h4 class="vd-mt-6">Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>change</code></td>
                <td>
                  Native input event fired on toggle. In Vue, prefer
                  <code>@update:modelValue</code> (via <code>v-model</code>).
                </td>
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
            The input carries <code>role="switch"</code>, so assistive tech
            announces it as an on/off control rather than a checkbox.
          </li>
          <li>
            Wrapping everything in the <code>&lt;label&gt;</code> ties the text
            to the control — clicking the label toggles it. Pass
            <code>id</code>/<code>name</code> when you need an explicit
            association.
          </li>
          <li>
            Fully keyboard operable: <kbd>Tab</kbd> to focus, <kbd>Space</kbd>
            to toggle.
          </li>
          <li>
            <code>:disabled</code> sets the native <code>disabled</code>
            attribute, removing it from the tab order.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
