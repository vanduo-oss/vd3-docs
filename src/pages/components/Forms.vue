<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { VdCustomSelect, VdInput } from "@vanduo-oss/vue";

// VdInput component demo state (new ergonomics in @vanduo-oss/vue 0.3.0).
const fullName = ref("Ada Lovelace");
const emailField = ref("ada@");
const amount = ref<string | number>(42);
const handle = ref("");

const vue3InputUsage = `<script setup lang="ts">
import { VdInput } from "@vanduo-oss/vue";
const email = ref("");
const amount = ref(0);
<\/script>

<template>
  <!-- Label + helper text -->
  <VdInput v-model="email" type="email" label="Email"
           hint="We'll never share it." />

  <!-- Error message also styles the field as danger -->
  <VdInput v-model="email" type="email" label="Email"
           error="Enter a valid email address." />

  <!-- Prefix / suffix + number model (emits a number) -->
  <VdInput v-model="amount" type="number" label="Amount"
           prefix="$" suffix="USD" />
</template>`;

const vanillaInputUsage = `<!-- VdInput renders this structure; write it directly in Vanilla -->
<div class="vd-form-group">
  <label class="vd-form-label" for="email">Email</label>
  <div class="vd-input-group">
    <input id="email" type="email" class="vd-input vd-input-danger"
           aria-invalid="true" aria-describedby="email-error" />
  </div>
  <span id="email-error" class="vd-form-error">Enter a valid email address.</span>
</div>`;

const vdInputApi: [string, string][] = [
  [
    "v-model (modelValue)",
    'Two-way value. Emits a number when type="number", otherwise a string.',
  ],
  [":label", "Field label rendered above the input."],
  [":hint", "Helper text below the input (hidden when error is set)."],
  [":error", "Error message; its presence also styles the input as danger."],
  [":prefix / :suffix", "Static text/symbol before / after the input."],
  [":variant", "'success' | 'danger' validation state (error implies danger)."],
  [":size", "'sm' | 'md' | 'lg' input height (default 'md')."],
  [
    "native attrs",
    "type, placeholder, disabled, readonly, required, min/max/step, pattern, autocomplete…",
  ],
  ["@blur / @focus", "Forwarded focus events."],
];

// The custom-select is the one input with engine-specific wiring (plain inputs
// are pure CSS and identical across engines).
const vue3CustomSelect = `<script setup lang="ts">
import { VdCustomSelect } from "@vanduo-oss/vue";
const value = ref('');
const options = [{ value: '1', label: 'Option 1' }];
<\/script>

<template>
  <VdCustomSelect v-model="value" :options="options" />
</template>`;

const vanillaCustomSelect = `<select class="vd-input vd-custom-select-input" data-custom-select>
  <option value="1">Option 1</option>
</select>

<script>VanduoSelect.init();<\/script>`;

const customSelect = ref("");
const rangeValue = ref(50);
const showPassword = ref(false);

const customOptions = [
  { value: "", label: "Choose an option" },
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

const inputsHtml = `<!-- Text Input -->
<div class="vd-form-group">
  <label for="text-input">Text Input</label>
  <input type="text" id="text-input" class="vd-input"
      placeholder="Enter text">
</div>

<!-- Select -->
<div class="vd-form-group">
  <label for="select-input">Select</label>
  <select id="select-input" class="vd-input">
    <option>Option 1</option>
  </select>
</div>

<!-- Custom Select -->
<div class="vd-form-group">
  <label for="custom-select-input">Custom Select</label>
  <select id="custom-select-input" class="vd-input vd-custom-select-input"
      data-custom-select>
    <option>Choose an option</option>
    <option>Option 1</option>
  </select>
</div>`;

const controlsHtml = `<!-- Checkbox -->
<div class="vd-form-group">
  <label class="checkbox">
    <input type="checkbox" checked>
    <span>Checked checkbox</span>
  </label>
</div>

<!-- Radio -->
<div class="vd-form-group">
  <label class="radio">
    <input type="radio" name="radio-demo" checked>
    <span>Radio option 1</span>
  </label>
</div>

<!-- Switch -->
<div class="vd-form-group">
  <label class="switch">
    <input type="checkbox" checked>
    <span class="switch-slider"></span>
    <span>Toggle switch</span>
  </label>
</div>

<!-- Range -->
<div class="vd-form-group">
  <label for="range-input">Range: <span id="range-value">50</span></label>
  <input type="range" id="range-input" class="range" min="0" max="100"
      value="50">
</div>`;

const validationHtml = `<!-- Valid state -->
<div class="vd-form-group">
  <label for="valid-input">Valid Input</label>
  <input type="text" id="valid-input" class="vd-input vd-input-valid"
      value="Valid value">
  <div class="vd-form-feedback vd-form-feedback-valid">Looks good!</div>
</div>

<!-- Invalid state -->
<div class="vd-form-group">
  <label for="invalid-input">Invalid Input</label>
  <input type="text" id="invalid-input" class="vd-input vd-input-invalid"
      value="Invalid value">
  <div class="vd-form-feedback vd-form-feedback-invalid">Please provide a
    valid value.</div>
</div>`;

const inputGroupsHtml = `<div class="vd-form-group">
  <label for="input-prefix">With prefix</label>
  <div class="vd-input-group">
    <span class="vd-input-group-prefix"><i class="ph ph-at"></i></span>
    <input type="text" id="input-prefix" class="vd-input" placeholder="username">
  </div>
</div>
<div class="vd-form-group">
  <label for="input-suffix">With suffix</label>
  <div class="vd-input-group">
    <input type="text" id="input-suffix" class="vd-input" placeholder="0.00">
    <span class="vd-input-group-suffix">USD</span>
  </div>
</div>
<div class="vd-form-group vd-mb-0">
  <label for="input-both">Prefix + suffix</label>
  <div class="vd-input-group">
    <span class="vd-input-group-prefix">https://</span>
    <input type="text" id="input-both" class="vd-input" placeholder="example.com">
    <span class="vd-input-group-suffix">/api</span>
  </div>
</div>`;

const inputSizesHtml = `<div class="vd-form-group">
  <label for="input-sm">Small</label>
  <input type="text" id="input-sm" class="vd-input vd-input-sm" placeholder="Small input">
</div>
<div class="vd-form-group">
  <label for="input-default">Default</label>
  <input type="text" id="input-default" class="vd-input" placeholder="Default input">
</div>
<div class="vd-form-group vd-mb-0">
  <label for="input-lg">Large</label>
  <input type="text" id="input-lg" class="vd-input vd-input-lg" placeholder="Large input">
</div>`;

const passwordHtml = `<div class="vd-form-group vd-mb-0">
  <label for="password-toggle">Password</label>
  <div class="vd-input-group">
    <input type="password" id="password-toggle" class="vd-input" placeholder="Enter password">
    <button type="button" class="vd-btn vd-btn-outline vd-input-group-suffix"
        data-toggle="password" aria-label="Toggle password visibility">
      <i class="ph ph-eye"></i>
    </button>
  </div>
</div>`;

const classRef: [string, string, string][] = [
  [
    ".vd-form-group",
    "Wrapper for form controls (adds margin, stacking)",
    "Structure",
  ],
  [".vd-input", "Base styling for text, email, password, select", "Base"],
  [".vd-input-sm", "Compact input height and font size", "Size"],
  [".vd-input-lg", "Taller input height and larger font size", "Size"],
  [
    ".vd-input-group",
    "Wrapper for input + prefix/suffix buttons or text",
    "Structure",
  ],
  [
    ".vd-input-group-prefix",
    "Text or icon before the input inside a group",
    "Structure",
  ],
  [
    ".vd-input-group-suffix",
    "Text or icon after the input inside a group",
    "Structure",
  ],
  [".textarea", "Base styling for multiline text inputs", "Base"],
  [".checkbox", "Wrapper for custom checkbox controls", "Structure"],
  [".radio", "Wrapper for custom radio button controls", "Structure"],
  [".switch", "Wrapper for toggle switch controls", "Structure"],
  [".range", "Custom styling for range/slider inputs", "Base"],
  [".vd-input-valid", "Applies success indicator and green border", "State"],
  [".vd-input-invalid", "Applies error indicator and red border", "State"],
  [".vd-form-feedback", "Base class for validation message text", "Structure"],
  [".vd-form-feedback-valid", "Success validation message (green)", "State"],
  [".vd-form-feedback-invalid", "Error validation message (red)", "State"],
  ["disabled", "Native attribute to disable any form control", "State (attr)"],
];
</script>

<template>
  <section id="forms">
    <h5 class="demo-title"><i class="ph ph-textbox"></i>Forms</h5>
    <div class="vd-alert vd-alert-info vd-mb-6">
      <i class="ph ph-info"></i>
      <div>
        Vanduo ships framework-wide defaults for native form controls. Use the
        documented <code>.vd-*</code> form classes for stable component markup,
        and load app-specific overrides after Vanduo when embedding into an
        existing design system. In Vue&nbsp;3, the
        <code>&lt;VdInput&gt;</code> component (below) wraps this markup with
        label / hint / error / prefix / suffix props.
      </div>
    </div>

    <!-- VdInput component (new ergonomics in @vanduo-oss/vue 0.3.0) -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div id="demo-form-vd-input" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i
                class="ph ph-text-aa mr-2"
                style="color: var(--vd-color-primary)"
              ></i
              >VdInput — label / hint / error / prefix / suffix
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-muted vd-mb-5">
              The Vue&nbsp;3 <code>&lt;VdInput&gt;</code> bundles the common
              field anatomy — label, helper text, validation message and affixes
              — into one component on the unified status-variant palette.
              <code>type="number"</code> binds a real number.
            </p>
            <div class="vd-row">
              <div class="vd-col-12 vd-col-md-6">
                <VdInput
                  v-model="fullName"
                  label="Full name"
                  hint="As it appears on your card."
                />
                <VdInput
                  v-model="emailField"
                  type="email"
                  label="Email"
                  error="Enter a valid email address."
                  class="vd-mt-4"
                />
              </div>
              <div class="vd-col-12 vd-col-md-6">
                <VdInput
                  v-model="amount"
                  type="number"
                  label="Amount"
                  prefix="$"
                  suffix="USD"
                  :min="0"
                  :step="1"
                />
                <p class="vd-text-sm vd-text-muted vd-mt-2">
                  Bound value: <strong>{{ amount }}</strong> ({{
                    typeof amount
                  }})
                </p>
                <VdInput
                  v-model="handle"
                  label="Handle"
                  prefix="@"
                  variant="success"
                  hint="That username is available."
                  class="vd-mt-4"
                />
              </div>
            </div>

            <h4 class="vd-mt-6">Usage</h4>
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :html="vue3InputUsage" :default-open="true"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :html="vanillaInputUsage" :default-open="true"
              /></template>
            </EngineSwitch>

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
                      <tr v-for="row in vdInputApi" :key="row[0]">
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
                <p class="vd-text-muted vd-mt-4">
                  In the Vanilla engine, compose the same look with
                  <code>.vd-form-group</code>, <code>.vd-form-label</code>,
                  <code>.vd-input-group</code> (+
                  <code>.vd-input-group-prefix</code> / <code>-suffix</code>),
                  the <code>.vd-input-danger</code> /
                  <code>.vd-input-success</code> state classes, and
                  <code>.vd-form-error</code> / <code>.vd-form-help</code> text.
                </p>
              </template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <!-- Input Fields -->
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Input Fields</h6></div>
          <div class="vd-card-body">
            <div class="vd-form-group">
              <label for="text-input">Text Input</label>
              <input
                type="text"
                id="text-input"
                class="vd-input"
                placeholder="Enter text"
              />
            </div>
            <div class="vd-form-group">
              <label for="email-input">Email Input</label>
              <input
                type="email"
                id="email-input"
                class="vd-input"
                placeholder="email@example.com"
              />
            </div>
            <div class="vd-form-group">
              <label for="password-input">Password Input</label>
              <input
                type="password"
                id="password-input"
                class="vd-input"
                placeholder="Password"
              />
            </div>
            <div class="vd-form-group">
              <label for="textarea-input">Textarea</label>
              <textarea
                id="textarea-input"
                class="textarea"
                rows="4"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div class="vd-form-group">
              <label for="select-input">Select</label>
              <select id="select-input" class="vd-input">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div class="vd-form-group">
              <label id="custom-select-input">Custom Select</label>
              <VdCustomSelect
                v-model="customSelect"
                :options="customOptions"
                id="custom-select-field"
              />
            </div>
            <p class="vd-text-sm vd-text-muted vd-mb-2">
              Custom-select wiring (other inputs are pure CSS):
            </p>
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :html="vue3CustomSelect"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :html="vanillaCustomSelect"
              /></template>
            </EngineSwitch>
            <DocCodeSnippet :html="inputsHtml" />
          </div>
        </div>
      </div>

      <!-- Form Controls -->
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Form Controls</h6></div>
          <div class="vd-card-body">
            <div class="vd-form-group">
              <label class="checkbox">
                <input type="checkbox" checked />
                <span>Checked checkbox</span>
              </label>
            </div>
            <div class="vd-form-group">
              <label class="checkbox">
                <input type="checkbox" />
                <span>Unchecked checkbox</span>
              </label>
            </div>
            <div class="vd-form-group">
              <label class="checkbox">
                <input type="checkbox" disabled />
                <span>Disabled checkbox</span>
              </label>
            </div>
            <div class="vd-form-group">
              <label class="radio">
                <input type="radio" name="radio-demo" checked />
                <span>Radio option 1</span>
              </label>
            </div>
            <div class="vd-form-group">
              <label class="radio">
                <input type="radio" name="radio-demo" />
                <span>Radio option 2</span>
              </label>
            </div>
            <div class="vd-form-group">
              <label class="switch">
                <input type="checkbox" checked />
                <span class="switch-slider"></span>
                <span>Toggle switch</span>
              </label>
            </div>
            <div class="vd-form-group">
              <label for="range-input"
                >Range: <span id="range-value">{{ rangeValue }}</span></label
              >
              <input
                v-model="rangeValue"
                type="range"
                id="range-input"
                class="range"
                min="0"
                max="100"
              />
            </div>
            <DocCodeSnippet :html="controlsHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Validation States -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Form Validation States</h6></div>
          <div class="vd-card-body">
            <div class="vd-form-group">
              <label for="valid-input">Valid Input</label>
              <input
                type="text"
                id="valid-input"
                class="vd-input vd-input-valid"
                value="Valid value"
              />
              <div class="vd-form-feedback vd-form-feedback-valid">
                Looks good!
              </div>
            </div>
            <div class="vd-form-group">
              <label for="invalid-input">Invalid Input</label>
              <input
                type="text"
                id="invalid-input"
                class="vd-input vd-input-invalid"
                value="Invalid value"
              />
              <div class="vd-form-feedback vd-form-feedback-invalid">
                Please provide a valid value.
              </div>
            </div>
            <DocCodeSnippet :html="validationHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Input Groups + Sizes -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-form-input-groups" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Input Groups</h6></div>
          <div class="vd-card-body">
            <div class="vd-form-group">
              <label for="input-prefix">With prefix</label>
              <div class="vd-input-group">
                <span class="vd-input-group-prefix"
                  ><i class="ph ph-at"></i
                ></span>
                <input
                  type="text"
                  id="input-prefix"
                  class="vd-input"
                  placeholder="username"
                />
              </div>
            </div>
            <div class="vd-form-group">
              <label for="input-suffix">With suffix</label>
              <div class="vd-input-group">
                <input
                  type="text"
                  id="input-suffix"
                  class="vd-input"
                  placeholder="0.00"
                />
                <span class="vd-input-group-suffix">USD</span>
              </div>
            </div>
            <div class="vd-form-group vd-mb-0">
              <label for="input-both">Prefix + suffix</label>
              <div class="vd-input-group">
                <span class="vd-input-group-prefix">https://</span>
                <input
                  type="text"
                  id="input-both"
                  class="vd-input"
                  placeholder="example.com"
                />
                <span class="vd-input-group-suffix">/api</span>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet class="vd-mt-5" :html="inputGroupsHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-form-input-sizes" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Input Sizes</h6></div>
          <div class="vd-card-body">
            <div class="vd-form-group">
              <label for="input-sm">Small</label>
              <input
                type="text"
                id="input-sm"
                class="vd-input vd-input-sm"
                placeholder="Small input"
              />
            </div>
            <div class="vd-form-group">
              <label for="input-default">Default</label>
              <input
                type="text"
                id="input-default"
                class="vd-input"
                placeholder="Default input"
              />
            </div>
            <div class="vd-form-group vd-mb-0">
              <label for="input-lg">Large</label>
              <input
                type="text"
                id="input-lg"
                class="vd-input vd-input-lg"
                placeholder="Large input"
              />
            </div>
          </div>
        </div>
        <DocCodeSnippet class="vd-mt-5" :html="inputSizesHtml" />
      </div>
    </div>

    <!-- Password Toggle -->
    <div class="vd-row vd-mt-8">
      <div class="vd-col-12">
        <div id="demo-form-password" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Password Toggle</h6></div>
          <div class="vd-card-body">
            <div class="vd-form-group vd-mb-0">
              <label for="password-toggle">Password</label>
              <div class="vd-input-group">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password-toggle"
                  class="vd-input"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  class="vd-btn vd-btn-outline vd-input-group-suffix"
                  data-toggle="password"
                  aria-label="Toggle password visibility"
                  @click="showPassword = !showPassword"
                >
                  <i
                    class="ph"
                    :class="showPassword ? 'ph-eye-slash' : 'ph-eye'"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet class="vd-mt-5" :html="passwordHtml" />
      </div>
    </div>

    <!-- Class Reference -->
    <div class="vd-row vd-mt-8">
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
