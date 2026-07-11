<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { VdSeparator } from "@vanduo-oss/vue";

const basicHtml = `<hr class="vd-separator" />`;

const labeledHtml = `<div class="vd-separator vd-separator-labeled" role="separator" aria-orientation="horizontal">
  <span class="vd-separator-label">OR</span>
</div>`;

const verticalHtml = `<div style="display: flex; align-items: center; gap: 1rem;">
  <span>Edit</span>
  <hr class="vd-separator vd-separator-vertical" aria-orientation="vertical" />
  <span>Duplicate</span>
  <hr class="vd-separator vd-separator-vertical" aria-orientation="vertical" />
  <span>Delete</span>
</div>`;

const cssClasses: [string, string][] = [
  [".vd-separator", "Base divider — a hairline rule using the border token"],
  [
    ".vd-separator-vertical",
    "Vertical orientation for use inside a flex row (give the row a height)",
  ],
  [
    ".vd-separator-labeled",
    "Horizontal divider with a centred label and a rule on each side",
  ],
  [".vd-separator-label", "The text element inside a labeled separator"],
];

const vue3Usage = `<script setup lang="ts">
import { VdSeparator } from "@vanduo-oss/vue";
<\/script>

<template>
  <VdSeparator />
  <VdSeparator label="OR" />
  <VdSeparator vertical />
</template>`;

const vanillaUsage = `<!-- Plain rule -->
<hr class="vd-separator" />

<!-- Labeled -->
<div class="vd-separator vd-separator-labeled" role="separator">
  <span class="vd-separator-label">OR</span>
</div>

<!-- Vertical (inside a flex row) -->
<hr class="vd-separator vd-separator-vertical" aria-orientation="vertical" />`;

const vue3Api: [string, string][] = [
  [
    ":label",
    "Optional centred text; renders the labeled variant (horizontal only).",
  ],
  [
    ":vertical",
    "Renders a vertical divider for use inside a flex row (ignores label).",
  ],
];
</script>

<template>
  <section id="separator">
    <h5 class="demo-title"><i class="ph ph-minus"></i>Separator</h5>
    <p class="vd-mb-5">
      <strong>VdSeparator</strong> is a semantic divider with
      <code>role="separator"</code>. Use it to break up stacked content, label a
      transition (e.g. "OR"), or split inline actions vertically. CSS-only in
      the Vanilla engine.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-separator-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Horizontal</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-0">Account settings</p>
            <VdSeparator />
            <p class="vd-mb-0">Billing</p>
            <VdSeparator />
            <p class="vd-mb-0">Danger zone</p>
            <DocCodeSnippet :html="basicHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-separator-labeled" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Labeled</h6></div>
          <div class="vd-card-body">
            <button class="vd-btn vd-btn-primary vd-btn-block">
              Continue with email
            </button>
            <VdSeparator label="OR" />
            <button class="vd-btn vd-btn-outline vd-btn-block">
              Continue with GitHub
            </button>
            <DocCodeSnippet :html="labeledHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div
          id="demo-separator-vertical"
          class="vd-card vd-card-glow demo-card"
        >
          <div class="vd-card-header"><h6>Vertical (Inline)</h6></div>
          <div class="vd-card-body">
            <div
              style="
                display: flex;
                align-items: center;
                gap: 1rem;
                min-height: 1.5rem;
              "
            >
              <a href="#" @click.prevent>Edit</a>
              <VdSeparator vertical />
              <a href="#" @click.prevent>Duplicate</a>
              <VdSeparator vertical />
              <a href="#" @click.prevent>Delete</a>
            </div>
            <DocCodeSnippet :html="verticalHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-list-dashes mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >API Reference
        </h6>
      </div>
      <div class="vd-card-body">
        <h4>Usage</h4>
        <EngineSwitch>
          <template #vue3
            ><DocCodeSnippet :html="vue3Usage" :default-open="true"
          /></template>
          <template #vanilla
            ><DocCodeSnippet :html="vanillaUsage" :default-open="true"
          /></template>
        </EngineSwitch>

        <h4 class="vd-mt-6">CSS Classes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Class</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in cssClasses" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <EngineSwitch>
          <template #vue3>
            <h4 class="vd-mt-6">Component API</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
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
          </template>
          <template #vanilla>
            <h4 class="vd-mt-6">JavaScript</h4>
            <p class="vd-text-muted">
              None — the separator is purely presentational markup.
            </p>
          </template>
        </EngineSwitch>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-wheelchair mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >Accessibility
        </h6>
      </div>
      <div class="vd-card-body">
        <ul>
          <li>
            The plain and vertical variants render a native
            <code>&lt;hr&gt;</code>, which already exposes
            <code>role="separator"</code>; the vertical one adds
            <code>aria-orientation="vertical"</code>.
          </li>
          <li>
            The labeled variant uses a <code>&lt;div&gt;</code> with an explicit
            <code>role="separator"</code> so the "OR" text is announced.
          </li>
          <li>
            Separators are decorative dividers — keep meaningful structure in
            headings and landmarks rather than relying on the rule alone.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
