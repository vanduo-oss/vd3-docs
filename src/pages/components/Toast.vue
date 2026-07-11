<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useToast } from "@vanduo-oss/vue";

const toast = useToast();

const typesJs = `import { useToast } from "@vanduo-oss/vue";
const toast = useToast();

toast.success('Operation completed successfully!');
toast.error('An error occurred!');
toast.warning('Please review your input.');
toast.info('Here is some information.');`;

const vanillaTypesJs = `// Global runtime
VanduoToast.success('Operation completed successfully!');
VanduoToast.error('An error occurred!');
VanduoToast.warning('Please review your input.');
VanduoToast.info('Here is some information.');`;

const optionsJs = `const toast = useToast();

// Toast with title
toast.show({ title: 'With Title', message: 'This toast has a title and message.', type: 'info' });

// Long duration (10 seconds)
toast.show({ message: 'This toast will stay for 10 seconds.', type: 'success', duration: 10000 });

// Custom position
toast.show({ message: 'Bottom left position.', type: 'warning', position: 'bottom-left' });`;

const vanillaOptionsJs = `// Global runtime
VanduoToast.show({ title: 'With Title', message: 'This toast has a title and message.', type: 'info' });
VanduoToast.show({ message: 'This toast will stay for 10 seconds.', type: 'success', duration: 10000 });
VanduoToast.show({ message: 'Bottom left position.', type: 'warning', position: 'bottom-left' });`;

const apiRows: [string, string, string][] = [
  [
    "message",
    "The main text content displayed in the toast notification.",
    "string (required)",
  ],
  [
    "title",
    "An optional bolder heading displayed above the message.",
    "string",
  ],
  ["type", "Visual variant (success, error, warning, info).", "info"],
  [
    "duration",
    "Time in milliseconds before the toast automatically dismisses.",
    "5000",
  ],
  ["position", "Screen placement (e.g., top-right, bottom-left).", "top-right"],
];
</script>

<template>
  <section id="toasts">
    <h5 class="demo-title">
      <i class="ph ph-bell-ringing"></i>Toast Notifications
    </h5>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Toast Types</h6></div>
          <div class="vd-card-body">
            <button
              class="vd-btn vd-btn-success"
              @click="toast.success('Operation completed successfully!')"
            >
              Success Toast
            </button>
            <button
              class="vd-btn vd-btn-danger"
              @click="toast.error('An error occurred!')"
            >
              Error Toast
            </button>
            <button
              class="vd-btn vd-btn-warning"
              @click="toast.warning('Please review your input.')"
            >
              Warning Toast
            </button>
            <button
              class="vd-btn vd-btn-info"
              @click="toast.info('Here is some information.')"
            >
              Info Toast
            </button>
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :js="typesJs" /></template>
              <template #vanilla
                ><DocCodeSnippet :js="vanillaTypesJs"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Toast Options</h6></div>
          <div class="vd-card-body">
            <button
              class="vd-btn vd-btn-primary"
              @click="
                toast.show({
                  title: 'With Title',
                  message: 'This toast has a title and message.',
                  type: 'info',
                })
              "
            >
              With Title
            </button>
            <button
              class="vd-btn vd-btn-primary"
              @click="
                toast.show({
                  message: 'This toast will stay for 10 seconds.',
                  type: 'success',
                  duration: 10000,
                })
              "
            >
              Long Duration
            </button>
            <button
              class="vd-btn vd-btn-primary"
              @click="
                toast.show({
                  message: 'Bottom left position.',
                  type: 'warning',
                  position: 'bottom-left',
                })
              "
            >
              Bottom Left
            </button>
            <EngineSwitch>
              <template #vue3><DocCodeSnippet :js="optionsJs" /></template>
              <template #vanilla
                ><DocCodeSnippet :js="vanillaOptionsJs"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <h4 id="api" class="docs-heading">Toast API Reference</h4>
    <p class="vd-mb-5">
      Toasts are generated dynamically via JavaScript. The configuration object
      accepts the following fields:
    </p>
    <div class="vd-table-responsive" style="margin-bottom: 3rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 25%">Property</th>
            <th style="width: 55%">Description</th>
            <th style="width: 20%">Default / Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in apiRows" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
            <td>
              <code>{{ row[2] }}</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="vd-alert vd-alert-info vd-mb-6">
      <i class="ph ph-shield-check"></i>
      <div>
        v1.4.1 sanitizes toast title and message HTML with inline styles
        disabled for framework call sites. Prefer plain text strings for
        user-provided notification content.
      </div>
    </div>
  </section>
</template>
