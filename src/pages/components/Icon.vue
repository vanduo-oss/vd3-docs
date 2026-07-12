<script setup lang="ts">
// The `/components/icon` route has no docs source of its own — nav.ts maps it
// to a non-existent `components/icon.html`. The real icon documentation lives
// at `/core/icons` (core/icons.html). Reuse that page here rather than
// maintaining a divergent duplicate.
import Icons from "@/pages/core/Icons.vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const vue3Usage = `<script setup lang="ts">
import { VdIcon } from "@vanduo-oss/vue";
<\/script>

<template>
  <VdIcon name="rocket" />
  <VdIcon name="heart" filled size="lg" />
</template>`;

const vue3Api: [string, string][] = [
  [":name", 'Phosphor icon name without the ph- prefix (e.g. "rocket").'],
  [":filled", "Use the filled icon weight."],
  [":size", "sm | md | lg (default md)."],
];
</script>

<template>
  <Icons />

  <section>
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Usage</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="vue3Usage" :default-open="true" />

            <h4 class="vd-mt-6">Component API (Vue 3)</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-hover">
                <thead>
                  <tr>
                    <th>Prop</th>
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
