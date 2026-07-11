<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const patternJs = `import { onMounted, onUnmounted, type Ref } from 'vue';

export function useFeature(root: Ref<HTMLElement | null>) {
  // collect every teardown so unmount is exhaustive
  const cleanups: Array<() => void> = [];

  onMounted(() => {
    if (typeof window === 'undefined') return;   // SSR guard
    const host = root.value;
    if (!host) return;

    const onClick = () => { /* ... */ };
    document.addEventListener('click', onClick, true);
    cleanups.push(() => document.removeEventListener('click', onClick, true));
  });

  onUnmounted(() => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  });
}`;

const ssrJs = `// vite-ssg renders on the server, where window/document don't exist.
// Guard any DOM access so the build doesn't crash:
onMounted(() => {
  if (typeof window === 'undefined') return;
  // safe to touch document here
});`;

const rules: [string, string][] = [
  [
    "Set up in onMounted",
    "DOM exists only after mount; this is the equivalent of Vanduo.init.",
  ],
  [
    "Tear down in onUnmounted",
    "Mirror every listener/observer/timer with a cleanup — the equivalent of Vanduo.destroy.",
  ],
  [
    "Collect teardowns in an array",
    "Push each cleanup as you create it so unmount can't miss one.",
  ],
  [
    "Guard window/document",
    "vite-ssg builds server-side; unguarded DOM access breaks the SSG build.",
  ],
  [
    "Append overlays to body",
    "Popups/portals appended to document.body must be removed in cleanup.",
  ],
];
</script>

<template>
  <section id="lifecycle-manager">
    <h5 class="demo-title">
      <i class="ph ph-arrows-clockwise"></i>Lifecycle &amp; Cleanup
      <code class="vd-text-sm">Guide</code>
    </h5>
    <p class="vd-mb-6">
      The Vanilla engine has an explicit lifecycle manager:
      <code>Vanduo.init</code> wires a subtree and
      <code>Vanduo.destroy</code> tears it down. In vd2 that lifecycle
      <em>is</em> the Vue component lifecycle — <code>onMounted</code> and
      <code>onUnmounted</code> — so cleanup is automatic and scoped to the
      component that created it.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-code"></i> The standard composable shape</h6>
          </div>
          <div class="vd-card-body">
            <p>Every vd2 behaviour composable follows the same skeleton:</p>
            <DocCodeSnippet :js="patternJs" :default-open="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-checks"></i> Rules of thumb</h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Rule</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in rules" :key="row[0]">
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
      </div>
    </div>

    <div class="vd-card demo-card">
      <div class="vd-card-header">
        <h6><i class="ph ph-shield-check"></i> Server-side rendering guard</h6>
      </div>
      <div class="vd-card-body">
        <p>
          Because this site is built with <code>vite-ssg</code>, pages are
          pre-rendered on the server. Always guard DOM access so the build stays
          green:
        </p>
        <DocCodeSnippet :js="ssrJs" :default-open="true" />
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          Related:
          <a href="/guides/runtime-architecture">Runtime architecture</a> and
          <a href="/guides/production-best-practices"
            >Production best practices</a
          >.
        </p>
      </div>
    </div>
  </section>
</template>
