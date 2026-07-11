<script setup lang="ts">
import { storeToRefs } from "pinia";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import EngineBadge from "@/components/EngineBadge.vue";
import { useEngineStore } from "@/stores/engine";

// This guide is a side-by-side comparison, but it should still lead with the
// engine the reader has selected: the active engine's column comes first and is
// flagged, and the intro speaks to it.
const { engine } = storeToRefs(useEngineStore());

const vanillaJs = `// Vanilla engine: one global, imperative, scoped to a DOM root
Vanduo.init(root);          // scan + wire every component under root
Vanduo.reinit('tooltip', root);
Vanduo.destroy(root);       // tear down listeners under root
Vanduo.getComponent('toast').show({ title: 'Saved' });`;

const composableJs = `// vd2 engine: a composable scans the same DOM contract on mount
import { onMounted, onUnmounted, type Ref } from 'vue';

export function useTooltips(root: Ref<HTMLElement | null>) {
  const cleanups: Array<() => void> = [];
  onMounted(() => {
    root.value?.querySelectorAll('[data-tooltip]').forEach((el) => {
      // wire listeners, push teardown into cleanups[]
    });
  });
  onUnmounted(() => cleanups.forEach((fn) => fn()));
}`;

const usageJs = `// In a page/component, point the composable at a root ref
const root = ref<HTMLElement | null>(null);
useTooltips(root);   // replaces Vanduo.init(root) for this subtree`;

const mapping: [string, string][] = [
  ["Vanduo.init(root)", "useX(root) composables scan root on onMounted"],
  ["Vanduo.destroy(root)", "onUnmounted cleanup inside each composable"],
  [
    "Vanduo.reinit(name, root)",
    "Reactive props / re-running the composable on a new root",
  ],
  [
    "Vanduo.getComponent('toast')",
    "useToastStore() Pinia store (show / success / error)",
  ],
  ["Global registry of components", "Per-feature composables + Pinia stores"],
  [
    "data-* attributes read by JS",
    "Same data-* attributes read by composables",
  ],
];
</script>

<template>
  <section id="runtime-architecture">
    <h5 class="demo-title">
      <i class="ph ph-circuitry"></i>Runtime Architecture
      <code class="vd-text-sm">Guide</code>
    </h5>
    <EngineSwitch>
      <template #vue3>
        <p class="vd-mb-6">
          In vd2, every interaction gets its own Vue composable or Pinia store,
          wired on mount and torn down on unmount — reactive, tree-shakeable,
          and tied to component lifecycle. It keeps the
          <strong>same DOM and <code>data-*</code> contracts</strong> as the
          Vanilla engine — which centres its runtime on one public global
          (<code>Vanduo</code>) — so the two stay mechanically identical; only
          <em>who</em> wires the behaviour changes.
        </p>
      </template>
      <template #vanilla>
        <p class="vd-mb-6">
          The Vanilla engine centres its runtime on one public global
          (<code>Vanduo</code>) with scoped, imperative initialisation. vd2
          keeps the <strong>same DOM and <code>data-*</code> contracts</strong>
          but replaces that runtime with Vue composables and Pinia stores — so
          behaviour is reactive, tree-shakeable, and tied to component
          lifecycle.
        </p>
      </template>
    </EngineSwitch>

    <div class="vd-row vd-mb-6">
      <div
        class="vd-col-12 vd-col-md-6"
        :style="{ order: engine === 'vanilla' ? 0 : 1 }"
      >
        <div
          class="vd-card demo-card"
          :class="{ 'runtime-card-active': engine === 'vanilla' }"
        >
          <div class="vd-card-header">
            <h6 class="runtime-head">
              <i class="ph ph-terminal-window"></i> Vanilla runtime
              <EngineBadge engine="vanilla" style="margin-left: auto" />
            </h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="vanillaJs" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Pass a <code>Document</code> or <code>Element</code> to scope
              work; everything hangs off one global object.
            </p>
          </div>
        </div>
      </div>
      <div
        class="vd-col-12 vd-col-md-6"
        :style="{ order: engine === 'vue3' ? 0 : 1 }"
      >
        <div
          class="vd-card demo-card"
          :class="{ 'runtime-card-active': engine === 'vue3' }"
        >
          <div class="vd-card-header">
            <h6 class="runtime-head">
              <i class="ph ph-atom"></i> vd2 composable
              <EngineBadge engine="vue3" style="margin-left: auto" />
            </h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :js="composableJs" :default-open="true" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Each composable owns its own listeners and tears them down on
              unmount — no global registry to leak.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-arrows-left-right"></i> Mental-model mapping
            </h6>
          </div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Vanilla concept</th>
                    <th>vd2 equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in mapping" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
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
        <h6><i class="ph ph-plug"></i> Wiring a composable</h6>
      </div>
      <div class="vd-card-body">
        <p>
          Because the CSS reads the same classes and attributes, the only thing
          that changes is <em>who</em> wires the behaviour. A page points a
          composable at its root and the rest is automatic:
        </p>
        <DocCodeSnippet :js="usageJs" :default-open="true" />
        <p class="vd-text-sm vd-text-muted vd-mt-3">
          See <a href="/guides/lifecycle-manager">Lifecycle &amp; cleanup</a>
          for the mount/unmount details, and
          <a href="/guides/vanduo-ecosystem">The Vanduo Ecosystem</a> for why
          both engines coexist.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.runtime-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.runtime-card-active {
  border-color: rgba(var(--vd-color-primary-rgb), 0.5);
  box-shadow: 0 0 0 1px rgba(var(--vd-color-primary-rgb), 0.18);
}
</style>
