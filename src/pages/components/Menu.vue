<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdMenu } from "@vanduo-oss/vd3";

const lastAction = ref("—");
const lastSort = ref("—");

const actionItems = [
  { label: "Edit", value: "edit" },
  { label: "Duplicate", value: "duplicate" },
  { label: "", divider: true },
  { label: "Archived (disabled)", value: "archive", disabled: true },
  { label: "Delete", value: "delete" },
] as const;

const sortItems = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "A → Z", value: "az" },
] as const;

const linkItems = [
  { label: "Documentation", href: "/docs-landing" },
  { label: "Changelog", href: "/changelog" },
  { label: "GitHub ↗", href: "https://github.com/vanduo-oss" },
] as const;

const basicHtml = `<div class="vd-dropdown">
  <button type="button" class="vd-btn vd-btn-secondary vd-dropdown-toggle"
          data-vd-dropdown-toggle aria-haspopup="menu">Actions</button>
  <div class="vd-dropdown-menu" role="menu">
    <a class="vd-dropdown-item" role="menuitem" href="#">Edit</a>
    <a class="vd-dropdown-item" role="menuitem" href="#">Duplicate</a>
    <div class="vd-dropdown-divider" role="separator"></div>
    <a class="vd-dropdown-item is-disabled" role="menuitem" aria-disabled="true">Archived</a>
    <a class="vd-dropdown-item" role="menuitem" href="#">Delete</a>
  </div>
</div>

<script>VanduoDropdown.init();<\/script>`;

const endHtml = `<div class="vd-dropdown">
  <button type="button" class="vd-btn vd-btn-secondary vd-dropdown-toggle"
          data-vd-dropdown-toggle aria-haspopup="menu">Sort</button>
  <div class="vd-dropdown-menu vd-dropdown-menu-end" role="menu">
    <a class="vd-dropdown-item" role="menuitem" href="#">Newest first</a>
    <a class="vd-dropdown-item" role="menuitem" href="#">Oldest first</a>
    <a class="vd-dropdown-item" role="menuitem" href="#">A → Z</a>
  </div>
</div>`;

const cssClasses: [string, string][] = [
  [".vd-dropdown", "Positioning wrapper around the trigger and the menu"],
  [
    ".vd-dropdown-toggle",
    "The trigger button. `data-vd-dropdown-toggle` wires the Vanilla runtime",
  ],
  [
    ".vd-dropdown-menu",
    "The popup list; absolutely positioned under the toggle",
  ],
  [".vd-dropdown-menu-end", "Aligns the menu to the trigger's end edge"],
  [".vd-dropdown-item", "An individual menu entry (rendered as <a>)"],
  [
    ".vd-dropdown-item.is-disabled",
    "Non-interactive item; pair with aria-disabled",
  ],
  [".vd-dropdown-divider", "A separator rule between groups of items"],
];

const vue3Usage = `<script setup lang="ts">
import { VdMenu } from "@vanduo-oss/vue";

const items = [
  { label: "Edit", value: "edit" },
  { label: "Duplicate", value: "duplicate" },
  { divider: true },
  { label: "Delete", value: "delete" },
];

const onSelect = (value: string) => console.log(value);
<\/script>

<template>
  <VdMenu label="Actions" :items="items" @select="onSelect" />
</template>`;

const vue3Api: [string, string][] = [
  [":label", "Text shown on the trigger button."],
  [
    ":items",
    "Array of { label, value?, href?, disabled?, divider? }. value defaults to label.",
  ],
  [
    ":align",
    "'start' | 'end' — which edge the menu aligns to (default 'start').",
  ],
  [
    "@select",
    "Fired with the chosen item's value (or label). Dividers / disabled items don't emit.",
  ],
];
</script>

<template>
  <section id="menu">
    <h5 class="demo-title"><i class="ph ph-list-dashes"></i>Menu</h5>
    <p class="vd-mb-5">
      <strong>VdMenu</strong> is a declarative dropdown menu: pass a
      <code>label</code> and an <code>items</code> array and it renders an
      accessible <code>role="menu"</code> popup, reusing the framework's
      dropdown runtime for toggle, keyboard and outside-click behaviour. In the
      Vanilla engine, write the dropdown markup and call
      <code>VanduoDropdown.init()</code>.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div
          id="demo-menu-basic"
          class="vd-card vd-card-glow demo-card dropdown-demo-card"
        >
          <div class="vd-card-header"><h6>Actions Menu</h6></div>
          <div class="vd-card-body">
            <VdMenu
              label="Actions"
              :items="actionItems"
              @select="lastAction = $event"
            />
            <p class="vd-text-sm vd-text-muted vd-mt-4">
              Last action: <strong>{{ lastAction }}</strong>
            </p>
            <DocCodeSnippet :html="basicHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div
          id="demo-menu-end"
          class="vd-card vd-card-glow demo-card dropdown-demo-card"
        >
          <div class="vd-card-header"><h6>End-Aligned</h6></div>
          <div class="vd-card-body">
            <div class="vd-text-right">
              <VdMenu
                label="Sort"
                :items="sortItems"
                align="end"
                @select="lastSort = $event"
              />
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-4">
              Sorting by: <strong>{{ lastSort }}</strong>
            </p>
            <DocCodeSnippet :html="endHtml" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div
          id="demo-menu-links"
          class="vd-card vd-card-glow demo-card dropdown-demo-card"
        >
          <div class="vd-card-header"><h6>Link Menu</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Items with an <code>href</code> navigate instead of emitting.
            </p>
            <VdMenu label="Resources" :items="linkItems" />
            <DocCodeSnippet :html="vue3Usage" />
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
        <DocCodeSnippet :html="vue3Usage" :default-open="true" />

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

        <h4 class="vd-mt-6">Component API</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Prop / event</th>
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

        <h4 class="vd-mt-6">Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>select</code></td>
                <td>
                  (Vue) Emitted with the chosen item's <code>value</code> (or
                  its <code>label</code> when no value is set). Items that are
                  dividers, disabled, or links don't emit.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
            The trigger declares <code>aria-haspopup="menu"</code> and the popup
            carries <code>role="menu"</code> with each entry as
            <code>role="menuitem"</code>.
          </li>
          <li>
            Disabled items set <code>aria-disabled="true"</code> and don't fire
            <code>select</code>; dividers use <code>role="separator"</code>.
          </li>
          <li>
            The shared dropdown runtime handles <kbd>Esc</kbd> to close,
            outside-click dismissal, and keyboard focus management.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
