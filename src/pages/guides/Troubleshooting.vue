<script setup lang="ts">
const issues: [string, string, string][] = [
  [
    "Components look unstyled",
    "The framework CSS isn't loaded.",
    "Add import '@vanduo-oss/framework/css'; once in your entry file.",
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
    "@vanduo-oss/* needs a bundler.",
    "Use Vite/Rollup, or switch to the IIFE/CDN build for static pages.",
  ],
  [
    "Theme doesn't persist on reload",
    "The theme store wasn't initialised.",
    "Call theme.init() once in App.vue onMounted.",
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
      The most common issues when building with vd2, and the one-line fix for
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
          <a href="/guides/runtime-architecture">Runtime architecture</a> and
          <a href="/guides/lifecycle-manager">Lifecycle</a>
          guides explain the wiring model in depth.
        </p>
      </div>
    </div>
  </section>
</template>
