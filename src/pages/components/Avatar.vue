<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";

const vue3Usage = `<script setup lang="ts">
import { VdAvatar } from "@vanduo-oss/vue";
<\/script>

<template>
  <VdAvatar initials="AL" />
  <VdAvatar src="/ada.jpg" alt="Ada Lovelace" size="lg" status="online" />
  <VdAvatar initials="JS" variant="success" shape="rounded" />
</template>`;

const vue3Api: [string, string][] = [
  [":src / :alt", "Image source and alt text."],
  [":initials", "Fallback initials shown when there is no image."],
  [":size", "xs | sm | md | lg | xl | 2xl (default md)."],
  [
    ":variant",
    "Initials background colour: primary | secondary | success | warning | error | info (default primary).",
  ],
  [":shape", "circle | rounded | square (default circle)."],
  [":status", "online | offline | away | busy — renders a presence dot."],
];

const usageHtml = `<!-- Avatar Sizes -->
<span class="vd-avatar vd-avatar-xs">XS</span>
<span class="vd-avatar vd-avatar-sm">SM</span>
<span class="vd-avatar">MD</span>
<span class="vd-avatar vd-avatar-lg">LG</span>
<span class="vd-avatar vd-avatar-xl">XL</span>
<span class="vd-avatar vd-avatar-2xl">2XL</span>

<!-- With Status -->
<span class="vd-avatar vd-avatar-status-online">JD</span>
<span class="vd-avatar vd-avatar-status-offline">AB</span>
<span class="vd-avatar vd-avatar-status-busy">CD</span>
<span class="vd-avatar vd-avatar-status-away">EF</span>

<!-- Avatar Group -->
<div class="vd-avatar-group">
  <span class="vd-avatar">A</span>
  <span class="vd-avatar">B</span>
  <span class="vd-avatar">+5</span>
</div>`;

const apiRows: [string, string, string][] = [
  [
    ".vd-avatar",
    "Base component class required for all Vanduo avatars.",
    "Component",
  ],
  [
    ".vd-avatar-[size]",
    "Size modifier class (e.g., -xs, -sm, -lg, -xl, -2xl). Defaults to medium if omitted.",
    "Modifier",
  ],
  [
    ".vd-avatar-status-[status]",
    "Adds a status indicator badge (e.g., -online, -offline, -busy, -away).",
    "Modifier",
  ],
  [
    ".vd-avatar-group",
    "Wrapper class for grouping multiple avatars together with overlapping margins.",
    "Layout",
  ],
];
</script>

<template>
  <section id="avatars">
    <h5 class="demo-title"><i class="ph ph-user-circle"></i>Avatars</h5>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Avatar Sizes</h6></div>
          <div class="vd-card-body">
            <span
              class="vd-avatar vd-avatar-xs"
              style="background: var(--vd-color-primary); color: white"
              >XS</span
            >
            <span
              class="vd-avatar vd-avatar-sm"
              style="background: var(--vd-color-secondary); color: white"
              >SM</span
            >
            <span
              class="vd-avatar"
              style="background: var(--vd-color-success); color: white"
              >MD</span
            >
            <span
              class="vd-avatar vd-avatar-lg"
              style="background: var(--vd-color-warning); color: white"
              >LG</span
            >
            <span
              class="vd-avatar vd-avatar-xl"
              style="background: var(--vd-color-error); color: white"
              >XL</span
            >
            <span
              class="vd-avatar vd-avatar-2xl"
              style="background: var(--vd-color-info); color: white"
              >2XL</span
            >
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Avatar with Status</h6></div>
          <div class="vd-card-body">
            <span
              class="vd-avatar vd-avatar-lg vd-avatar-status-online"
              style="background: var(--vd-color-primary); color: white"
              >JD</span
            >
            <span
              class="vd-avatar vd-avatar-lg vd-avatar-status-offline"
              style="background: var(--vd-color-secondary); color: white"
              >AB</span
            >
            <span
              class="vd-avatar vd-avatar-lg vd-avatar-status-busy"
              style="background: var(--vd-color-success); color: white"
              >CD</span
            >
            <span
              class="vd-avatar vd-avatar-lg vd-avatar-status-away"
              style="background: var(--vd-color-warning); color: white"
              >EF</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Avatar Group</h6></div>
          <div class="vd-card-body">
            <div class="vd-avatar-group">
              <span
                class="vd-avatar"
                style="background: var(--vd-color-primary); color: white"
                >A</span
              >
              <span
                class="vd-avatar"
                style="background: var(--vd-color-success); color: white"
                >B</span
              >
              <span
                class="vd-avatar"
                style="background: var(--vd-color-warning); color: white"
                >C</span
              >
              <span
                class="vd-avatar"
                style="background: var(--vd-color-error); color: white"
                >D</span
              >
              <span
                class="vd-avatar"
                style="background: var(--vd-color-info); color: white"
                >+5</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Usage</h6></div>
          <div class="vd-card-body">
            <EngineSwitch>
              <template #vue3
                ><DocCodeSnippet :html="vue3Usage" :default-open="true"
              /></template>
              <template #vanilla
                ><DocCodeSnippet :html="usageHtml" :default-open="true"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <h4 id="api" class="docs-heading">API Reference</h4>
    <div class="vd-table-responsive">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 25%">Class Name</th>
            <th style="width: 55%">Description</th>
            <th style="width: 20%">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in apiRows" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
            <td>{{ row[2] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <EngineSwitch>
      <template #vue3>
        <h4 class="docs-heading vd-mt-6">Component API (Vue 3)</h4>
        <div class="vd-table-responsive" style="margin-bottom: 3rem">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th style="width: 25%">Prop</th>
                <th style="width: 75%">Description</th>
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
      </template>
      <template #vanilla><div style="margin-bottom: 3rem"></div></template>
    </EngineSwitch>
  </section>
</template>
