<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const cspHtml = `<!-- A strict CSP works with vd2 — no inline scripts are required -->
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src 'self' data:; style-src 'self'">`;

const suggestJs = `// The Suggest/Autocomplete remote source only fetches same-origin
// (or explicitly allow-listed) URLs — cross-origin endpoints are blocked.
<input data-vd-suggest-url="/api/search"
       data-vd-suggest-allowlist="https://api.example.com">`;

const vhtmlJs = `// v-html renders raw HTML — only ever pass trusted, first-party content.
// In vd2 it is used exactly once (the static changelog body). For anything
// user-supplied, render text with {{ }} or sanitise first.`;

const practices: [string, string][] = [
  [
    "Content Security Policy",
    "vd2 ships no inline scripts, so a strict CSP just works.",
  ],
  [
    "Trusted v-html only",
    "Raw-HTML rendering is reserved for first-party static content.",
  ],
  [
    "Same-origin remote data",
    "Suggest fetches are restricted to same-origin or an explicit allowlist.",
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
      <i class="ph ph-shield-check"></i>Security Practices
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      Vanduo is presentation-layer code, but a few habits keep a vd2 app safe.
      The engine is designed to be CSP-friendly and conservative about where it
      will fetch or render external content.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-lock-key"></i> Content Security Policy</h6>
          </div>
          <div class="vd-card-body">
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
            <DocCodeSnippet :html="suggestJs" :default-open="true" />
          </div>
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
