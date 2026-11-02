<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useSuggest } from "@vanduo-oss/vd3";

const suggestRoot = ref<HTMLElement | null>(null);
useSuggest(suggestRoot);

const cspHtml = `<!-- vd3 ships no inline scripts, but theme apply writes an inline custom property.
     Allow that write (or theming / radius scale will not apply). -->
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'">`;

const suggestHtml = `<!-- Marker attribute data-vd-suggest is required.
     URL + allowlist alone will not attach the widget. -->
<input
  type="text"
  class="vd-input"
  placeholder="Search…"
  data-vd-suggest
  data-vd-suggest-url="/api/search"
  data-vd-suggest-allowlist="https://api.example.com">`;

const suggestJs = `import { ref } from 'vue';
import { useSuggest } from '@vanduo-oss/vd3';

const root = ref<HTMLElement | null>(null);
useSuggest(root); // wires every [data-vd-suggest] descendant; cleanup on unmount`;

const vhtmlJs = `// v-html renders raw HTML — only ever pass trusted, first-party content.
// For anything user-supplied, render text with {{ }} or sanitise first.
// loadSection() (see Lazy loading) injects fetched HTML through sanitizeHtml
// with inline style denied by default.`;

const sanitizerJs = `import {
  sanitizeHtml,
  installSanitizedHtml,
  installTrustedHtml,
} from '@vanduo-oss/vd3';

// 1. Return sanitized markup string (strips scripts, event handlers, inline style, and SVGs by default)
const safeMarkup = sanitizeHtml(dirty, { allowSvg: false, allowStyle: false });

// 2. Live DOM injection via replaceChildren() — never assigns untrusted markup to innerHTML
installSanitizedHtml(el, html, { allowSvg: false, allowStyle: false });

// 3. Explicit opt-out for repository-owned static placeholders (e.g. skeleton/spinner markup)
installTrustedHtml(el, '<div class="vd-skeleton vd-skeleton-text"></div>');`;

const supplyChainShell = `# Install strictly from the committed lockfile
pnpm install --frozen-lockfile

# Gate CI on moderate+ advisories (with narrow, time-boxed dev-only exceptions documented in SECURITY-AUDIT.md)
pnpm audit --audit-level=moderate
pnpm audit --audit-level=moderate --ignore GHSA-vfj7-8cjw-p6xm`;

const ciWorkflowYaml = `# .github/workflows/ci.yml — least-privilege token + SHA-pinned third-party actions
permissions:
  contents: read

jobs:
  build-test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - uses: pnpm/action-setup@ea17c68df8912ef543352723c149a84f56e3d413 # v6.1.0
        with:
          version: 10.28.2
      - uses: actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1 # v7.1.0
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm audit --audit-level=moderate --ignore GHSA-vfj7-8cjw-p6xm`;

const htmlSinks: [string, string, string][] = [
  [
    "useTooltips",
    "data-tooltip-html",
    "Sanitized via sanitizeHtml (allowStyle: false, allowSvg: false).",
  ],
  [
    "usePopover",
    "data-vd-bubble",
    "Sanitized via sanitizeHtml; opt into inline SVG icons only via data-vd-bubble-allow-svg.",
  ],
  [
    "useToast",
    "title, message",
    "Sanitized via sanitizeHtml (allowStyle: false).",
  ],
  [
    "useLazyLoad",
    "loadSection",
    "Fetched HTML partial is sanitized before DOM insertion (allowStyle: false).",
  ],
  [
    "VdCodeSnippet",
    "highlightCode",
    "Escapes raw source before wrapping token spans.",
  ],
];

const practices: [string, string][] = [
  [
    "Content Security Policy",
    "No inline scripts are required. Theme apply sets --vd-radius-scale as an inline style on <html>, so style-src needs 'unsafe-inline' (or an equivalent exception) or radius theming blanks out.",
  ],
  [
    "Trusted v-html only",
    "Raw-HTML rendering is reserved for first-party static content.",
  ],
  [
    "Same-origin remote data",
    "Suggest fetches are restricted to same-origin or an explicit allowlist. The input still needs data-vd-suggest (or data-vd-autocomplete).",
  ],
  [
    "Sanitized HTML injection",
    "loadSection sanitizes fetched markup before inject. Do not bypass it with v-html of that response.",
  ],
  [
    "Dependency hygiene",
    "pnpm's strict lockfile + isolated node_modules limit supply-chain risk.",
  ],
  [
    "No secrets in the bundle",
    "Anything imported into the client is public — keep keys server-side.",
  ],
  [
    "Auth UI is headless",
    "VdLogin / VdSignUp / VdForgotPassword emit submit and social; they never fetch. Sessions, CSRF tokens, OAuth SDKs, captchas, and lockout timers stay in the app. Credential fields use WHATWG autocomplete tokens — never autocomplete=off.",
  ],
  [
    "Snyk SAST & SCA scanning",
    "Run Snyk Code (SAST) and Snyk Open Source (SCA) in CI and inside the IDE (Snyk extension / MCP server) to catch DOM sinks, regex issues, and vulnerable dependencies before commit.",
  ],
  [
    "Pinned CI actions & frozen lockfile",
    "Enforce permissions: contents: read, pin third-party GitHub Actions to full 40-char commit SHAs, and run pnpm install --frozen-lockfile with narrow, time-boxed SECURITY-AUDIT.md exceptions.",
  ],
  [
    "Workstation & IDE agent guardrails",
    "Pair endpoint protection with IDE/agent hooks (e.g. Norton / Gen guardrails for Cursor) to block indirect prompt injection and automatic reads of .npmrc, .env, or SSH keys; use OIDC trusted publishing instead of static registry tokens.",
  ],
  [
    "SSR state isolation",
    "useToast queues and useThemePreference live at module scope. Never enqueue user-specific notifications or mutate theme state with per-request data during SSR; register VanduoVue in a .client.ts plugin and pass auth errors via props.",
  ],
];
</script>

<template>
  <section id="security-practices">
    <h5 class="demo-title">
      <i class="ph ph-shield-check"></i>Security
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      vd3 is presentation-layer code, but a few habits keep an app safe. The
      library is conservative about where it will fetch or render external
      content — copy the samples below as they are; a stricter CSP than this
      will blank the theme.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-lock-key"></i> Content Security Policy</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              <code>useThemePreference</code> /
              <code>applyPreference</code> writes
              <code>--vd-radius-scale</code> with
              <code>element.style.setProperty</code>. A
              <code>style-src 'self'</code> policy without
              <code>'unsafe-inline'</code> blocks that write.
            </p>
            <DocCodeSnippet :html="cspHtml" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-globe-hemisphere-west"></i> Remote data is
              allow-listed
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Vue path: call <code>useSuggest(root)</code> once (see
              <RouterLink to="/components/autocomplete">Autocomplete</RouterLink
              >). There is no <code>VdAutocomplete</code> component.
            </p>
            <DocCodeSnippet :html="suggestHtml" :default-open="true" />
            <DocCodeSnippet class="vd-mt-3" :js="suggestJs" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-sign-in"></i> Auth UI vs app responsibility</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-text-sm vd-text-muted vd-mb-3">
          The kit paints login screens and sets autocomplete / reveal /
          <code>aria-invalid</code>. It does not mint JWTs, set cookies,
          generate CSRF tokens, talk to Google/GitHub SDKs, or enforce lockout.
          Pass <code>error</code> / <code>message</code> from the parent; hide
          CSRF in the <code>#extra</code> slot. Live screens live on
          <RouterLink to="/components/login">Login</RouterLink>.
        </p>
        <ul class="vd-text-sm">
          <li>
            Kit: visible labels, WHATWG autocomplete tokens, a real
            <code>type="button"</code> password reveal, <code>VdAlert</code> for
            parent copy.
          </li>
          <li>
            App: session, CSRF, rate limits, OAuth, captcha vendors, password
            policy.
          </li>
        </ul>
      </div>
    </div>

    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6><i class="ph ph-magnifying-glass"></i> Suggest, wired</h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-text-sm vd-text-muted vd-mb-3">
          Static JSON on <code>data-vd-suggest</code> — type “ap” or “ba”:
        </p>
        <div ref="suggestRoot">
          <input
            type="text"
            class="vd-input"
            placeholder="Type a fruit…"
            data-vd-suggest='["Apple","Apricot","Avocado","Banana","Blackberry","Blueberry"]'
          />
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-code-block"></i> Treat v-html as a sharp tool
            </h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="vhtmlJs" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Deferred HTML from
              <RouterLink to="/guides/lazy-loading">Lazy loading</RouterLink>
              goes through the same sanitizer — do not re-inject the response
              with <code>v-html</code>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card vd-mb-6">
      <div class="vd-card-header">
        <h6>
          <i class="ph ph-funnel"></i> Rich-Text &amp; HTML sanitizer
          (<code>sanitizeHtml</code>)
        </h6>
      </div>
      <div class="vd-card-body">
        <p class="vd-text-sm vd-text-muted vd-mb-3">
          <code>sanitizeHtml</code> strips unsafe markup before insertion,
          keeping a small allowlist of inline formatting tags and restricting
          <code>&lt;a href&gt;</code> to <code>http:</code>,
          <code>https:</code>, and <code>mailto:</code>.
          <code>installSanitizedHtml</code> wires that policy for live DOM nodes
          via <code>replaceChildren()</code> without assigning untrusted strings
          to <code>Element.innerHTML</code>.
        </p>
        <DocCodeSnippet :js="sanitizerJs" :default-open="true" />
        <p class="vd-text-sm vd-text-muted vd-mt-3 vd-mb-3">
          <strong>Why keep <code>allowStyle: false</code> by default:</strong>
          <code>allowStyle: true</code> applies only a lightweight blocklist
          heuristic (dropping styles containing <code>url(</code>,
          <code>expression(</code>, <code>position: fixed|sticky</code>, or CSS
          backslash escapes) rather than a full CSS parser. Enabling inline
          styles or calling <code>installTrustedHtml</code> on untrusted strings
          opens the door to CSS injection and UI redressing (e.g. overlaying
          fake login prompts or exfiltrating attribute values). Reserve both
          strictly for trusted, first-party static markup.
        </p>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Composable / Component</th>
                <th>HTML Sink / Prop</th>
                <th>Default Policy</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sink in htmlSinks" :key="sink[0]">
                <td>
                  <code>{{ sink[0] }}</code>
                </td>
                <td>
                  <code>{{ sink[1] }}</code>
                </td>
                <td>{{ sink[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-package"></i> Supply-chain &amp; dependency
              hardening
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              <code>@vanduo-oss/vd3</code> ships with a
              <strong>zero-runtime-dependency</strong> posture:
              <code>vue &gt;= 3.3</code> is its sole peer dependency, and all UI
              fonts and Phosphor icon weights are self-hosted in the package
              with zero external CDN requests at runtime.
            </p>
            <DocCodeSnippet :shell="supplyChainShell" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              When an unpatched advisory affects a build-only tool, record it in
              <code>SECURITY-AUDIT.md</code> with an explicit advisory ID (<code
                >--ignore GHSA-...</code
              >), documented <code>devDependencies</code>-only scope, and a
              mandatory review / expiry date — never blanket-suppress audit
              gates.
            </p>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-scan"></i> Continuous scanning (Snyk SAST/SCA)
              &amp; hardened CI
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Run <strong>Snyk Code (SAST)</strong> and
              <strong>Snyk Open Source (SCA)</strong> both in CI and directly
              inside the IDE (via the Snyk extension or MCP server) so DOM
              sinks, regular-expression hazards, and vulnerable transitive
              packages are caught before commit. Pair scans with hardened GitHub
              Actions workflows: set top-level
              <code>permissions: contents: read</code> and pin every third-party
              action to a full 40-character commit SHA instead of a mutable tag.
            </p>
            <DocCodeSnippet :js="ciWorkflowYaml" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-desktop-tower"></i> Developer workstation &amp;
              AI-assisted coding guardrails
            </h6>
          </div>
          <div class="vd-card-body">
            <ul class="vd-text-sm">
              <li class="vd-mb-2">
                <strong>Endpoint &amp; IDE agent hooks:</strong> Run host
                protection with IDE and AI-agent guardrails (such as Norton /
                Gen guardrails for Cursor) that inspect file reads and edits,
                block indirect prompt injection hidden in HTML comments or
                untrusted test fixtures, and block automatic agent reads of
                sensitive credential files (<code>.npmrc</code>,
                <code>.env</code>, SSH keys).
              </li>
              <li>
                <strong>Token-free local configs:</strong> Keep registry publish
                tokens out of project <code>.npmrc</code> files. Prefer OIDC
                trusted publishing in CI or short-lived, environment-scoped
                tokens that never rest on disk in plaintext.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-hard-drives"></i> SSR cross-request state
              isolation
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              In SSR environments (Nuxt, Vite SSR, Node or Worker isolates),
              <code>useToast</code> notification queues and
              <code>useThemePreference</code> state live at module scope and are
              shared across concurrent requests handled by the same isolate.
            </p>
            <ul class="vd-text-sm">
              <li class="vd-mb-2">
                Never enqueue user-specific notifications or mutate
                module-scoped theme state with per-request user data during
                server rendering.
              </li>
              <li>
                Keep <code>VanduoVue</code> plugin registration in a
                <code>.client.ts</code> plugin and pass auth or validation
                errors as component props (<code>:error</code> /
                <code>:message</code> on <code>VdLogin</code> or
                <code>VdAlert</code>).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-list-checks"></i> Checklist</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Practice</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in practices" :key="row[0]">
                <td>
                  <strong>{{ row[0] }}</strong>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
