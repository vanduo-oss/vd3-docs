<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const buildShell = `# vd2 is built with vite-ssg: pre-rendered HTML per route + hydration
pnpm build        # runs vite-ssg build → static dist/
pnpm preview      # serve the built output locally before deploying`;

const checksShell = `pnpm vue-tsc --noEmit   # type safety
pnpm vitest run         # unit tests
pnpm build              # SSG build also catches unguarded window/document`;

const practices: [string, string][] = [
  [
    "Pre-render with vite-ssg",
    "Each route ships static HTML for fast first paint + SEO, then hydrates.",
  ],
  [
    "Pin framework/core versions",
    "Lock @vanduo-oss/* versions so visual output is reproducible.",
  ],
  [
    "Ship only used CSS",
    "Import @vanduo-oss/framework/css once; avoid duplicating core CSS in vd2.",
  ],
  [
    "Code-split heavy routes",
    "Dynamic import() keeps the initial bundle small (see Lazy loading).",
  ],
  [
    "Guard DOM in composables",
    "SSR has no window; the build fails loudly if a composable forgets.",
  ],
  ["Run the full gate in CI", "vue-tsc + vitest + build before every deploy."],
];
</script>

<template>
  <section id="production-best-practices">
    <h5 class="demo-title">
      <i class="ph ph-rocket"></i>Production Best Practices
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      vd2 ships as a statically pre-rendered site. A small, repeatable build and
      verification gate keeps deploys fast, accessible, and reproducible.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-hammer"></i> Build &amp; preview</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :shell="buildShell" :default-open="true" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-shield-check"></i> The verification gate</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :shell="checksShell" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              The SSG build is also a correctness check — it renders every page
              on the server and surfaces any unguarded DOM access.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-list-checks"></i> Production checklist</h6>
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
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          See also <a href="/guides/lazy-loading">Lazy loading</a> and
          <a href="/guides/troubleshooting">Troubleshooting</a>.
        </p>
      </div>
    </div>
  </section>
</template>
