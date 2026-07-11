<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useDropdown } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useDropdown(root);

const vanillaWiring = `// Wire every .vd-dropdown under document (or pass a root element)
VanduoDropdown.init();

// Programmatic control
VanduoDropdown.open(document.querySelector('#my-dropdown'));
VanduoDropdown.close(document.querySelector('#my-dropdown'));

// Tear down
VanduoDropdown.destroyAll();`;

const vue3Wiring = `import { ref } from 'vue';
import { useDropdown } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useDropdown(root);   // wires every .vd-dropdown inside root; cleanup on unmount

// Programmatic control (delegates to the framework global)
window.VanduoDropdown.open(root.value?.querySelector('#my-dropdown'));`;

const apiRows: [string, string][] = [
  [".vd-dropdown", "Root container. Holds toggle + menu."],
  [
    ".vd-dropdown-toggle",
    "Clickable trigger (button or anchor). `data-vd-dropdown-toggle` is also accepted.",
  ],
  [".vd-dropdown-menu", "The menu element. Visibility toggled via `.is-open`."],
  [
    ".vd-dropdown-item",
    "A menu item. Disabled variants: `.is-disabled` / `.disabled`.",
  ],
  [".vd-dropdown-divider", "Horizontal rule between item groups."],
  [".vd-dropdown-item-danger", "Item styled as destructive action."],
  [
    ".vd-dropdown-split",
    "Container modifier: split-button variant (action + caret toggle).",
  ],
  [
    ".vd-dropdown-glass",
    "Container modifier: glass-styled menu (uses `--vd-glass-*` tokens).",
  ],
  [
    ".vd-dropdown-dropup",
    "Container modifier: opens upward instead of downward.",
  ],
  [
    ".vd-dropdown-dropright / .vd-dropdown-dropleft",
    "Container modifier: horizontal placement.",
  ],
  [
    ".vd-dropdown-menu-end / .vd-dropdown-menu-start / .vd-dropdown-menu-top",
    "Auto-applied to position the menu; can also be set statically.",
  ],
];

const classRows: [string, string][] = [
  [
    ".vd-dropdown",
    "Container with `position: relative`. Click capture boundary.",
  ],
  [
    ".vd-dropdown-toggle",
    'Button with caret; receives `aria-haspopup="true"` and `aria-expanded` toggling.',
  ],
  [
    ".vd-dropdown-menu",
    "Absolute-positioned menu, hidden by default, fade-in on `.is-open`.",
  ],
  [
    ".vd-dropdown-item",
    "Block-level link/button. Focusable. Hover/focus highlight via `--vd-color-primary-rgb`.",
  ],
  [
    ".vd-dropdown-divider",
    "1px line via `--vd-border-color`; vertical margin uses Fibonacci scale.",
  ],
  [
    ".vd-dropdown-item-danger",
    "Foreground `--vd-color-red-6` / `--vd-color-red-5`; signals destructive action.",
  ],
];

const cssVars: [string, string, string][] = [
  ["--vd-dropdown-bg", "var(--vd-color-gray-0)", "Menu background"],
  ["--vd-dropdown-text", "var(--vd-color-gray-9)", "Menu foreground"],
  ["--vd-dropdown-border-color", "var(--vd-border-color)", "Menu border"],
  ["--vd-dropdown-radius", "var(--vd-border-radius)", "Menu corner radius"],
  ["--vd-dropdown-shadow", "var(--vd-shadow-md)", "Menu elevation shadow"],
  ["--vd-dropdown-min-width", "12rem", "Menu minimum width"],
  ["--vd-dropdown-padding", "0.5rem", "Item vertical/horizontal padding"],
  ["--vd-dropdown-z-index", "1050", "Stacking above page content"],
];

const basicHtml = `<!-- Basic dropdown -->
<div class="vd-dropdown">
  <button class="vd-btn vd-btn-primary vd-dropdown-toggle" data-vd-dropdown-toggle>
    Actions <i class="ph ph-caret-down"></i>
  </button>
  <ul class="vd-dropdown-menu">
    <li><a class="vd-dropdown-item" href="#">Edit</a></li>
    <li><a class="vd-dropdown-item" href="#">Duplicate</a></li>
    <li><a class="vd-dropdown-item" href="#">Archive</a></li>
    <li><div class="vd-dropdown-divider"></div></li>
    <li><a class="vd-dropdown-item vd-dropdown-item-danger" href="#">Delete</a></li>
  </ul>
</div>`;

const splitHtml = `<!-- Split button: primary action + caret -->
<div class="vd-dropdown vd-dropdown-split">
  <button class="vd-btn vd-btn-primary">Save</button>
  <button class="vd-btn vd-btn-primary vd-dropdown-toggle" data-vd-dropdown-toggle aria-label="Save options">
    <i class="ph ph-caret-down"></i>
  </button>
  <ul class="vd-dropdown-menu">
    <li><a class="vd-dropdown-item" href="#">Save & Publish</a></li>
    <li><a class="vd-dropdown-item" href="#">Save as Draft</a></li>
  </ul>
</div>

<!-- Glass variant -->
<div class="vd-dropdown vd-dropdown-glass">
  <button class="vd-btn vd-btn-outline vd-dropdown-toggle" data-vd-dropdown-toggle>
    Glass Menu <i class="ph ph-caret-down"></i>
  </button>
  <ul class="vd-dropdown-menu">
    <li><a class="vd-dropdown-item" href="#">Profile</a></li>
    <li><a class="vd-dropdown-item" href="#">Settings</a></li>
  </ul>
</div>`;

const placementHtml = `<!-- Dropup (opens above) -->
<div class="vd-dropdown vd-dropdown-dropup">
  <button class="vd-btn vd-dropdown-toggle" data-vd-dropdown-toggle>Dropup</button>
  <ul class="vd-dropdown-menu"><li><a class="vd-dropdown-item" href="#">Item</a></li></ul>
</div>

<!-- Dropright (opens to the right) -->
<div class="vd-dropdown vd-dropdown-dropright">
  <button class="vd-btn vd-dropdown-toggle" data-vd-dropdown-toggle>Dropright</button>
  <ul class="vd-dropdown-menu"><li><a class="vd-dropdown-item" href="#">Item</a></li></ul>
</div>

<!-- Static alignment override -->
<div class="vd-dropdown">
  <button class="vd-btn vd-dropdown-toggle" data-vd-dropdown-toggle>End-aligned</button>
  <ul class="vd-dropdown-menu vd-dropdown-menu-end">
    <li><a class="vd-dropdown-item" href="#">Item</a></li>
  </ul>
</div>`;
</script>

<template>
  <section id="dropdown" ref="root">
    <h5 class="demo-title"><i class="ph ph-caret-down"></i>Dropdown</h5>
    <p class="vd-mb-8">
      Toggleable contextual overlays for displaying lists of links, actions, or
      custom content. Dropdowns support directional placement, glass styling,
      split buttons, and dark mode out of the box.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card dropdown-demo-card">
          <div class="vd-card-header"><h6>Basic Dropdown</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <div class="vd-dropdown">
              <button
                class="vd-btn vd-btn-primary vd-dropdown-toggle"
                data-vd-dropdown-toggle
              >
                Actions <i class="ph ph-caret-down"></i>
              </button>
              <ul class="vd-dropdown-menu">
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent>Edit</a>
                </li>
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent
                    >Duplicate</a
                  >
                </li>
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent
                    >Archive</a
                  >
                </li>
                <li><div class="vd-dropdown-divider"></div></li>
                <li>
                  <a
                    class="vd-dropdown-item vd-dropdown-item-danger"
                    href="#"
                    @click.prevent
                    >Delete</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="basicHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card dropdown-demo-card">
          <div class="vd-card-header"><h6>Split Button &amp; Glass</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <div class="vd-dropdown vd-dropdown-split">
              <button class="vd-btn vd-btn-primary">Save</button>
              <button
                class="vd-btn vd-btn-primary vd-dropdown-toggle"
                data-vd-dropdown-toggle
                aria-label="Save options"
              >
                <i class="ph ph-caret-down"></i>
              </button>
              <ul class="vd-dropdown-menu">
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent
                    >Save &amp; Publish</a
                  >
                </li>
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent
                    >Save as Draft</a
                  >
                </li>
              </ul>
            </div>
            <div class="vd-dropdown vd-dropdown-glass">
              <button
                class="vd-btn vd-btn-outline vd-dropdown-toggle"
                data-vd-dropdown-toggle
              >
                Glass Menu <i class="ph ph-caret-down"></i>
              </button>
              <ul class="vd-dropdown-menu">
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent
                    >Profile</a
                  >
                </li>
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent
                    >Settings</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="splitHtml" />
      </div>
    </div>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Placement Variants</h6></div>
          <div
            class="vd-card-body"
            style="
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              min-height: 14rem;
            "
          >
            <div class="vd-dropdown vd-dropdown-dropup">
              <button class="vd-btn vd-dropdown-toggle" data-vd-dropdown-toggle>
                Dropup
              </button>
              <ul class="vd-dropdown-menu">
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent>Item</a>
                </li>
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent
                    >Another</a
                  >
                </li>
              </ul>
            </div>
            <div class="vd-dropdown vd-dropdown-dropright">
              <button class="vd-btn vd-dropdown-toggle" data-vd-dropdown-toggle>
                Dropright
              </button>
              <ul class="vd-dropdown-menu">
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent>Item</a>
                </li>
              </ul>
            </div>
            <div class="vd-dropdown">
              <button class="vd-btn vd-dropdown-toggle" data-vd-dropdown-toggle>
                End-aligned
              </button>
              <ul class="vd-dropdown-menu vd-dropdown-menu-end">
                <li>
                  <a class="vd-dropdown-item" href="#" @click.prevent>Item</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="placementHtml" />
      </div>
    </div>

    <!-- Engine wiring -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-code"></i> Engine wiring</h6>
          </div>
          <div class="vd-card-body">
            <EngineSwitch>
              <template #vue3>
                <DocCodeSnippet :js="vue3Wiring" />
              </template>
              <template #vanilla>
                <DocCodeSnippet :js="vanillaWiring" />
              </template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- API + CSS + Vars -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-list-dashes"></i> API Reference</h6>
          </div>
          <div class="vd-card-body">
            <h4>Modifier classes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in apiRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4>Base classes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in classRows" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4>CSS Variables</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in cssVars" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>
                      <code>{{ row[1] }}</code>
                    </td>
                    <td>{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-wheelchair"></i> Accessibility</h6>
          </div>
          <div class="vd-card-body">
            <ul>
              <li>
                Trigger carries <code>aria-haspopup="true"</code> and toggles
                <code>aria-expanded</code>.
              </li>
              <li>
                Menu carries <code>role="menu"</code> and
                <code>aria-hidden</code> mirroring its open state.
              </li>
              <li>
                Arrow keys cycle items, <kbd>Home</kbd>/<kbd>End</kbd> jump,
                <kbd>Escape</kbd> closes, typeahead jumps to the first matching
                label.
              </li>
              <li>Focus is restored to the trigger when the menu closes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
