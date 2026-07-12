<script setup lang="ts">
const issues: [string, string, string][] = [
  [
    "Components look unstyled",
    "The Vanduo CSS isn't loaded.",
    "Add import '@vanduo-oss/vd3/css'; once in your entry file.",
  ],
  [
    "A widget renders but does nothing",
    "No composable is wired to that subtree.",
    'Call the matching useX(root) composable and bind ref="root" on the section.',
  ],
  [
    "Build fails: 'window is not defined'",
    "A composable touches the DOM during SSR.",
    "Guard with if (typeof window === 'undefined') return; inside onMounted.",
  ],
  [
    "Bare import won't resolve in the browser",
    "@vanduo-oss/vd3 ships ESM only and needs a bundler.",
    "Build with Vite/Rollup (or any ESM bundler); there is no IIFE/CDN bundle.",
  ],
  [
    "Theme doesn't persist on reload",
    "The Vanduo plugin isn't installed, or storage is blocked.",
    "Install VanduoVue via app.use(); useThemePreference() re-hydrates from storage on the client — there is no init() to call.",
  ],
  [
    "Popup appears in the wrong place",
    "Body-appended overlays position on scroll/resize.",
    "Ensure the page is mounted and the input is visible before opening.",
  ],
  [
    "Hydration mismatch warning",
    "Server and client rendered different markup.",
    "Keep render output deterministic; defer client-only DOM work to onMounted.",
  ],
];
</script>

<template>
  <section id="troubleshooting">
    <h5 class="demo-title">
      <i class="ph ph-wrench"></i>Troubleshooting
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      The most common issues when building with vd3, and the one-line fix for
      each. Most trace back to one of three things: the CSS isn't imported, a
      composable isn't wired, or DOM is being touched during server rendering.
    </p>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-first-aid-kit"></i> Symptoms &amp; fixes</h6>
      </div>
      <div class="vd-card-body">
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Likely cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in issues" :key="row[0]">
                <td>
                  <strong>{{ row[0] }}</strong>
                </td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          Still stuck? The
          <a href="/guides/runtime-architecture">vd3 Architecture</a>
          guide explains the wiring model in depth.
        </p>
      </div>
    </div>
  </section>
</template>
