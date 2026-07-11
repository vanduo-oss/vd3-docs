<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useValidate } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useValidate(root);

// Engine-specific wiring (the markup, classes and data-* are identical).
const vue3Wiring = `import { ref } from 'vue';
import { useValidate } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useValidate(root);   // wires [data-vd-validate] forms inside root; cleanup on unmount`;

const vanillaWiring = `// Wire every [data-vd-validate] form (document, or a root element)
VanduoValidate.init();

// validate programmatically / add a custom rule
VanduoValidate.validateForm(formEl);
VanduoValidate.addRule('zip', (v) => /^\\d{5}$/.test(v), 'Invalid ZIP');`;

const vue3Api: [string, string][] = [
  [
    "useValidate(root)",
    "Composable — wires every [data-vd-validate] form inside the root ref (blur/input/submit modes, error messages). Call once in setup().",
  ],
  [
    "(automatic cleanup)",
    "Field listeners and error nodes are removed on component unmount.",
  ],
];

const requiredHtml = `<form data-vd-validate novalidate>
  <div class="vd-form-group">
    <label for="name">Full Name</label>
    <input type="text" id="name" class="vd-input"
      data-vd-rules="required"
      data-vd-msg-required="Please enter your name">
  </div>

  <div class="vd-form-group">
    <label for="email">Email</label>
    <input type="email" id="email" class="vd-input"
      data-vd-rules="required|email">
  </div>

  <button type="submit" class="vd-btn vd-btn-primary">Submit</button>
</form>`;

const lengthHtml = `<input class="vd-input"
  data-vd-rules="required|min:3|max:20">

<input type="number" class="vd-input"
  data-vd-rules="required|number|minVal:18|maxVal:120">`;

const passwordHtml = `<input type="password" id="pass" class="vd-input"
  data-vd-rules="required|min:8">

<input type="password" class="vd-input"
  data-vd-rules="required|match:pass"
  data-vd-msg-match="Passwords do not match">`;

const modesHtml = `<!-- Form-level mode: blur -->
<form data-vd-validate data-vd-validate-mode="blur">

  <!-- URL with custom message -->
  <input class="vd-input"
    data-vd-rules="required|url"
    data-vd-msg-url="Enter a valid URL">

  <!-- Per-field mode override: input -->
  <input class="vd-input"
    data-vd-rules="required|pattern:^#[0-9a-fA-F]{6}$"
    data-vd-validate-mode="input"
    data-vd-msg-pattern="Must be a hex color">

</form>`;

const customRuleJs = `VanduoValidate.addRule(
  'noSpaces',
  (value) => !/\\s/.test(value),
  'Value must not contain spaces'
);

// Usage: data-vd-rules="required|noSpaces"`;

const builtInRules: [string, string, string][] = [
  ["required", "required", "Field must not be empty"],
  ["email", "email", "Must be a valid email address"],
  ["url", "url", "Must be a valid URL"],
  ["number", "number", "Must be a numeric value"],
  ["min", "min:N", "Minimum string length of N characters"],
  ["max", "max:N", "Maximum string length of N characters"],
  ["minVal", "minVal:N", "Numeric value must be ≥ N"],
  ["maxVal", "maxVal:N", "Numeric value must be ≤ N"],
  ["pattern", "pattern:REGEX", "Value must match the given regular expression"],
  [
    "match",
    "match:ID",
    "Value must equal the value of the element with the given id",
  ],
];

const cssClasses: [string, string][] = [
  [".vd-validate", "Optional base class applied to forms for scoped styling"],
  [".is-valid", "Added to an input that passes all rules (green border)"],
  [".is-invalid", "Added to an input that fails a rule (red border)"],
  [
    ".vd-validate-error",
    "Auto-generated error message element shown below the invalid input",
  ],
];

const dataAttrs: [string, string][] = [
  ["data-vd-validate", "Place on a <form> to opt-in to validation"],
  [
    "data-vd-rules",
    'Pipe-separated rule string on each input (e.g. "required|email|min:3")',
  ],
  [
    "data-vd-validate-mode",
    'When to validate: "blur" (default), "input", or "submit". Can be set per-form or per-field',
  ],
  [
    "data-vd-msg-*",
    'Custom error message per rule, e.g. data-vd-msg-required="Name is required"',
  ],
];

const jsMethods: [string, string][] = [
  [
    "VanduoValidate.init()",
    "Scans the DOM for [data-vd-validate] forms and attaches validation",
  ],
  [
    "VanduoValidate.validateForm(form)",
    "Programmatically validates all fields in the given <form> element. Returns true if valid",
  ],
  [
    "VanduoValidate.addRule(name, validator, message)",
    "Register a custom rule. validator(value, param) must return true or false",
  ],
];

const noop = (e: Event): void => e.preventDefault();
</script>

<template>
  <section id="form-validation" ref="root">
    <h5 class="demo-title">
      <i class="ph ph-shield-check"></i>Form Validation
    </h5>
    <p class="vd-mb-5">
      The <strong>VanduoValidate</strong> component provides declarative,
      attribute-driven form validation. Chain rules with pipe syntax
      (<code>required|email|min:3</code>), choose when validation triggers, and
      customise every error message — all without writing JavaScript.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-validate-required" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Required &amp; Email</h6></div>
          <div class="vd-card-body">
            <form data-vd-validate novalidate @submit="noop">
              <div class="vd-form-group">
                <label for="val-name">Full Name</label>
                <input
                  type="text"
                  id="val-name"
                  class="vd-input"
                  placeholder="Jane Doe"
                  data-vd-rules="required"
                  data-vd-msg-required="Please enter your name"
                />
              </div>
              <div class="vd-form-group">
                <label for="val-email">Email Address</label>
                <input
                  type="email"
                  id="val-email"
                  class="vd-input"
                  placeholder="jane@example.com"
                  data-vd-rules="required|email"
                />
              </div>
              <button type="submit" class="vd-btn vd-btn-primary">
                Submit
              </button>
            </form>
            <DocCodeSnippet :html="requiredHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-validate-length" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Min / Max Length &amp; Number Range</h6>
          </div>
          <div class="vd-card-body">
            <form data-vd-validate novalidate @submit="noop">
              <div class="vd-form-group">
                <label for="val-username">Username (3–20 chars)</label>
                <input
                  type="text"
                  id="val-username"
                  class="vd-input"
                  placeholder="vanduo_user"
                  data-vd-rules="required|min:3|max:20"
                />
              </div>
              <div class="vd-form-group">
                <label for="val-age">Age (18–120)</label>
                <input
                  type="number"
                  id="val-age"
                  class="vd-input"
                  placeholder="25"
                  data-vd-rules="required|number|minVal:18|maxVal:120"
                />
              </div>
              <button type="submit" class="vd-btn vd-btn-primary">
                Submit
              </button>
            </form>
            <DocCodeSnippet :html="lengthHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-validate-password" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Password Match</h6></div>
          <div class="vd-card-body">
            <form data-vd-validate novalidate @submit="noop">
              <div class="vd-form-group">
                <label for="val-pass">Password</label>
                <input
                  type="password"
                  id="val-pass"
                  class="vd-input"
                  placeholder="••••••••"
                  data-vd-rules="required|min:8"
                />
              </div>
              <div class="vd-form-group">
                <label for="val-pass-confirm">Confirm Password</label>
                <input
                  type="password"
                  id="val-pass-confirm"
                  class="vd-input"
                  placeholder="••••••••"
                  data-vd-rules="required|match:val-pass"
                  data-vd-msg-match="Passwords do not match"
                />
              </div>
              <button type="submit" class="vd-btn vd-btn-primary">
                Create Account
              </button>
            </form>
            <DocCodeSnippet :html="passwordHtml" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-validate-modes" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Validation Modes &amp; Custom Messages</h6>
          </div>
          <div class="vd-card-body">
            <form
              data-vd-validate
              data-vd-validate-mode="blur"
              novalidate
              @submit="noop"
            >
              <div class="vd-form-group">
                <label for="val-website">Website (validate on blur)</label>
                <input
                  type="text"
                  id="val-website"
                  class="vd-input"
                  placeholder="https://example.com"
                  data-vd-rules="required|url"
                  data-vd-msg-url="Please enter a valid URL starting with http:// or https://"
                />
              </div>
              <div class="vd-form-group">
                <label for="val-pattern">Hex Color (validate on input)</label>
                <input
                  type="text"
                  id="val-pattern"
                  class="vd-input"
                  placeholder="#ff6600"
                  data-vd-rules="required|pattern:^#[0-9a-fA-F]{6}$"
                  data-vd-validate-mode="input"
                  data-vd-msg-pattern="Must be a valid 6-digit hex color (e.g. #ff6600)"
                />
              </div>
              <button type="submit" class="vd-btn vd-btn-primary">
                Submit
              </button>
            </form>
            <DocCodeSnippet :html="modesHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Built-in Rules -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-list-checks mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >Built-in Validation Rules
        </h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th>Rule</th>
                <th>Syntax</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in builtInRules" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>
                  <code>{{ row[1] }}</code>
                </td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
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
          <table class="vd-table vd-table-hover">
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

        <h4 class="vd-mt-6">Data Attributes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in dataAttrs" :key="row[0]">
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
            <h4 class="vd-mt-6">Composable API</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-hover">
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
            <h4 class="vd-mt-6">JavaScript Methods</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-hover">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in jsMethods" :key="row[0]">
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

        <h4 class="vd-mt-6">Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>validate:submit</code></td>
                <td>
                  Fired on the form on submit. <code>event.detail</code> is
                  <code>{ valid }</code> — a boolean indicating whether every
                  field passed validation.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Custom Rule Example</h4>
        <DocCodeSnippet :js="customRuleJs" />
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
            Invalid fields receive <code>aria-invalid="true"</code>; valid
            fields get <code>aria-invalid="false"</code>
          </li>
          <li>
            Error messages are linked via <code>aria-describedby</code> so
            screen readers announce them
          </li>
          <li>
            Error elements use <code>role="alert"</code> for immediate
            announcement on live changes
          </li>
          <li>
            Native <code>&lt;form&gt;</code> semantics preserved —
            <code>novalidate</code> disables browser UI, not semantics
          </li>
          <li>
            Focus moves to the first invalid field on submit for keyboard users
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
