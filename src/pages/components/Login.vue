<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import {
  VdCheckbox,
  VdForgotPassword,
  VdLogin,
  VdOtpInput,
  VdSignUp,
} from "@vanduo-oss/vd3";
import type { LoginSubmit, SignUpSubmit } from "@vanduo-oss/vd3";

const lastLogin = ref<string>("");
const lastSignUp = ref<string>("");
const lastForgot = ref<string>("");
const otp = ref("");
const rememberDemo = ref(true);

const onLogin = (payload: LoginSubmit): void => {
  lastLogin.value = `${payload.identifier} (remember: ${payload.remember})`;
};

const onSignUp = (payload: SignUpSubmit): void => {
  lastSignUp.value = `${payload.name} <${payload.email}>`;
};

const vue3Usage = `<script setup lang="ts">
import { VdLogin } from "@vanduo-oss/vd3";
const onSubmit = ({ identifier, password, remember }) => {
  // App-owned: fetch, CSRF, session. The kit never calls the network.
};
<\/script>

<template>
  <VdLogin
    avatar-initials="VD"
    :providers="[{ id: 'github', label: 'GitHub', icon: 'github-logo' }]"
    @submit="onSubmit"
    @social="(id) => signInWith(id)"
  >
    <template #extra>
      <input type="hidden" name="_csrf" value="app-token" />
    </template>
    <template #links>
      <a href="/forgot">Forgot password?</a>
      <a href="/signup">Create an account</a>
    </template>
  </VdLogin>
</template>`;

const loginApi: [string, string][] = [
  [
    ":identifierType",
    "'email' | 'text' (default 'email'). Sets type + autocomplete.",
  ],
  [
    ":identifierLabel / :passwordLabel / :submitLabel / :rememberLabel",
    "Visible field copy.",
  ],
  [":remember", "Show the remember-me VdCheckbox (default true)."],
  [":loading", "Submit button loading spinner."],
  [
    ":error / :message",
    "Parent-provided copy rendered with VdAlert (danger / success).",
  ],
  [
    ":providers",
    "{ id, label, icon? }[] — ghost buttons that emit social with id.",
  ],
  [
    ":title / :glass / :elevated / :framed",
    "Forwarded to VdAuthCard. Docs demos set framed false.",
  ],
  [
    ":avatarSrc / :avatarInitials",
    "Optional VdAvatar in the brand slot (display only).",
  ],
  [
    "#extra / #links / #brand",
    "Hidden CSRF (inside the form), footer links, brand override.",
  ],
  ["@submit", "{ identifier, password, remember } — no network I/O."],
  ["@social", "Provider id string. Does not submit the form."],
];

const signUpApi: [string, string][] = [
  [
    ":nameLabel / :emailLabel / :passwordLabel / :confirmLabel / :termsLabel / :submitLabel",
    "Visible copy.",
  ],
  [
    ":requireTerms",
    "Block submit until the terms VdCheckbox is checked (default true).",
  ],
  [
    ":loading / :error / :message / :title / :glass / :elevated / :framed",
    "Same as VdLogin.",
  ],
  [":avatarSrc / :avatarInitials", "Display-only VdAvatar in the brand slot."],
  ["#extra / #links / #brand", "Same slot contract as VdLogin."],
  [
    "@submit",
    "{ name, email, password, terms }. Suppressed when confirm does not match (useValidate match message).",
  ],
];

const forgotApi: [string, string][] = [
  [":emailLabel / :submitLabel", "Visible copy."],
  [
    ":loading / :error / :message / :title / :glass / :elevated / :framed",
    "Same shell as VdLogin.",
  ],
  ["#extra / #links / #brand", "Same slot contract as VdLogin."],
  ["@submit", "{ email }."],
];

const otpApi: [string, string][] = [
  ["v-model (modelValue)", "Joined digit string."],
  [":length", "Cell count (default 6)."],
  [
    ":disabled / :name / :id / :labelledBy",
    "Forwarded; autocomplete=one-time-code on the first cell.",
  ],
];

const checkboxApi: [string, string][] = [
  ["v-model (modelValue)", "Boolean checked state."],
  [":label", "Associated label (or the default slot)."],
  [":size", "'sm' | 'md' | 'lg' (default 'md')."],
  [":disabled / :name / :id", "Forwarded to the native checkbox."],
];
</script>

<template>
  <section id="login">
    <h5 class="demo-title"><i class="ph ph-sign-in"></i>Login</h5>
    <p class="vd-mb-8">
      Headless auth screens for Vue 3. They emit <code>submit</code> /
      <code>social</code> and never fetch — sessions, CSRF tokens, OAuth SDKs,
      and lockout copy stay in the app. Docs demos set
      <code>:framed="false"</code> so the cover shell does not steal the layout;
      apps use the default framed glass card.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-lg-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>VdLogin</h6></div>
          <div class="vd-card-body">
            <VdLogin
              :framed="false"
              avatar-initials="VD"
              :providers="[
                {
                  id: 'github',
                  label: 'Continue with GitHub',
                  icon: 'github-logo',
                },
              ]"
              @submit="onLogin"
              @social="(id) => (lastLogin = `social:${id}`)"
            >
              <template #links>
                <a href="#forgot">Forgot password?</a>
                <a href="#signup">Create an account</a>
              </template>
            </VdLogin>
            <p v-if="lastLogin" class="vd-text-sm vd-text-muted vd-mt-3">
              Last emit: {{ lastLogin }}
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-6">
        <div id="signup" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>VdSignUp</h6></div>
          <div class="vd-card-body">
            <VdSignUp :framed="false" @submit="onSignUp">
              <template #links>
                <a href="#login">Already have an account?</a>
              </template>
            </VdSignUp>
            <p v-if="lastSignUp" class="vd-text-sm vd-text-muted vd-mt-3">
              Last emit: {{ lastSignUp }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mt-6">
      <div id="forgot" class="vd-col-12 vd-col-lg-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>VdForgotPassword</h6></div>
          <div class="vd-card-body">
            <VdForgotPassword
              :framed="false"
              @submit="(p) => (lastForgot = p.email)"
            />
            <p v-if="lastForgot" class="vd-text-sm vd-text-muted vd-mt-3">
              Last emit: {{ lastForgot }}
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>OTP + checkbox</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              <code>VdOtpInput</code> paste-fills digits and marks the first
              cell <code>autocomplete="one-time-code"</code>.
              <code>VdCheckbox</code> is the boolean control (remember-me /
              terms); use <code>VdCheckboxGroup</code> for named sets.
            </p>
            <VdOtpInput v-model="otp" name="otp" class="vd-mb-4" />
            <p class="vd-text-sm vd-mb-4">
              Value: <code>{{ otp || "∅" }}</code>
            </p>
            <VdCheckbox v-model="rememberDemo" label="Remember this device" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mt-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Usage</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="vue3Usage" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <h4 class="docs-heading vd-mt-6">VdLogin API</h4>
    <div class="vd-table-responsive" style="margin-bottom: 2rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 35%">Prop / slot / event</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in loginApi" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="docs-heading">VdSignUp API</h4>
    <div class="vd-table-responsive" style="margin-bottom: 2rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 35%">Prop / slot / event</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in signUpApi" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="docs-heading">VdForgotPassword API</h4>
    <div class="vd-table-responsive" style="margin-bottom: 2rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 35%">Prop / slot / event</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in forgotApi" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="docs-heading">VdOtpInput API</h4>
    <div class="vd-table-responsive" style="margin-bottom: 2rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 35%">Prop</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in otpApi" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="docs-heading">VdCheckbox API</h4>
    <div class="vd-table-responsive" style="margin-bottom: 3rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 35%">Prop</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in checkboxApi" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
