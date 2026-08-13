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
