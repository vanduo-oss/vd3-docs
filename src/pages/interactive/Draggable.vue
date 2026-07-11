<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { useDraggable } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useDraggable(root);

// The framework fires `draggable:drop` but, by design, leaves the DOM to the
// app so frameworks like Vue keep control. Glue the dropped item into the zone.
const dropZone = ref<HTMLElement | null>(null);
const onDrop = (event: Event): void => {
  const zone = dropZone.value;
  const detail = (event as CustomEvent<{ element?: HTMLElement }>).detail;
  if (zone && event.target === zone && detail?.element) {
    zone.appendChild(detail.element);
  }
};
onMounted(() => document.addEventListener("draggable:drop", onDrop));
onBeforeUnmount(() => document.removeEventListener("draggable:drop", onDrop));

const sortItems = [
  { id: "sort-1", label: "First item" },
  { id: "sort-2", label: "Second item" },
  { id: "sort-3", label: "Third item" },
  { id: "sort-4", label: "Fourth item" },
];

const vanillaWiring = `// Auto-wired on init for every .vd-draggable / .vd-draggable-container / .vd-drop-zone.
VanduoDraggable.init();

// Listen for drag lifecycle events (they bubble from the dragged element)
document.addEventListener('draggable:start', (e) => console.log('start', e.detail));
document.addEventListener('draggable:drag',  (e) => console.log('drag',  e.detail));
document.addEventListener('draggable:end',   (e) => console.log('end',   e.detail));`;

const vue3Wiring = `import { ref } from 'vue';
import { useDraggable } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useDraggable(root);   // wires .vd-draggable / containers / drop-zones inside root`;

const basicHtml = `<div class="vd-draggable" data-draggable="item-1">
  <span class="vd-draggable-handle"><i class="ph ph-dots-six-vertical"></i></span>
  Drag me around
</div>`;

const sortableHtml = `<div class="vd-draggable-container vd-draggable-container-vertical">
  <div class="vd-draggable-item" data-draggable="sort-1">
    <span class="vd-draggable-handle"><i class="ph ph-dots-six-vertical"></i></span>
    First item
  </div>
  <div class="vd-draggable-item" data-draggable="sort-2">…</div>
  <div class="vd-draggable-item" data-draggable="sort-3">…</div>
</div>`;

const dropHtml = `<div class="vd-draggable" data-draggable="drop-item-1">
  <span class="vd-draggable-handle">☰</span> Drag into the zone
</div>

<div class="vd-drop-zone" aria-label="Drop items here"></div>`;

const apiRows: [string, string][] = [
  [".vd-draggable", "Makes an element draggable (pointer + touch + keyboard)."],
  [
    'data-draggable="id"',
    "Stable id carried on the draggable lifecycle events.",
  ],
  [
    ".vd-draggable-handle",
    "Optional grab handle — only the handle starts a drag.",
  ],
  [".vd-draggable-container", "Wraps items into a sortable group."],
  [".vd-draggable-container-vertical", "Stacks the sortable items vertically."],
  [".vd-draggable-item", "A reorderable child inside a container."],
  [
    ".vd-drop-zone",
    "A target area. Shows a placeholder while empty; highlights on drag-over.",
  ],
  [".is-disabled", "Prevents dragging the element."],
];

const eventRows: [string, string][] = [
  ["draggable:start", "Fired on the element when a drag begins."],
  ["draggable:drag", "Fired continuously while dragging."],
  ["draggable:end", "Fired when the drag ends (after any reorder/drop)."],
];
</script>

<template>
  <section id="draggable" ref="root">
    <h5 class="demo-title">
      <i class="ph ph-arrows-out-cardinal"></i>Draggable
    </h5>
    <p class="vd-mb-8">
      Pointer-, touch-, and keyboard-friendly drag-and-drop. Make any element
      draggable, group items into a sortable list, or drop items into a zone —
      the framework fires bubbling <code>draggable:start</code>,
      <code>draggable:drag</code>, and <code>draggable:end</code> events.
    </p>

    <!-- Basic + With Handle -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic Draggable</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Add <code>.vd-draggable</code> to any element to make it
              draggable.
            </p>
            <div class="vd-draggable" data-draggable="item-1">
              <span class="vd-draggable-handle"
                ><i class="ph ph-dots-six-vertical"></i
              ></span>
              Drag me around
            </div>
            <div class="vd-draggable" data-draggable="item-2">
              <span class="vd-draggable-handle"
                ><i class="ph ph-dots-six-vertical"></i
              ></span>
              And me too
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="basicHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>With Handle</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Use <code>.vd-draggable-handle</code> so only the handle starts a
              drag — the rest of the element stays selectable.
            </p>
            <div class="vd-draggable" data-draggable="handle-1">
              <span class="vd-draggable-handle"
                ><i class="ph ph-dots-six-vertical"></i
              ></span>
              <i class="ph ph-image"></i> Photo block
            </div>
            <div class="vd-draggable" data-draggable="handle-2">
              <span class="vd-draggable-handle"
                ><i class="ph ph-dots-six-vertical"></i
              ></span>
              <i class="ph ph-textbox"></i> Text block
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sortable container -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Sortable Container</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Wrap items in
              <code
                >.vd-draggable-container.vd-draggable-container-vertical</code
              >
              to reorder them by dragging.
            </p>
            <div class="vd-draggable-container vd-draggable-container-vertical">
              <div
                v-for="item in sortItems"
                :key="item.id"
                class="vd-draggable-item"
                :data-draggable="item.id"
              >
                <span class="vd-draggable-handle"
                  ><i class="ph ph-dots-six-vertical"></i
                ></span>
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="sortableHtml" />
      </div>

      <!-- Drop zone -->
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Drop Zone</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Drag the item below into the <code>.vd-drop-zone</code>. Empty
              zones show a placeholder and highlight while you drag over them.
            </p>
            <div class="vd-draggable" data-draggable="drop-item-1">
              <span class="vd-draggable-handle"
                ><i class="ph ph-dots-six-vertical"></i
              ></span>
              <i class="ph ph-package"></i> Drag me into the zone
            </div>
            <div
              ref="dropZone"
              class="vd-drop-zone vd-mt-4"
              aria-label="Drop items here"
            ></div>
          </div>
        </div>
        <DocCodeSnippet :html="dropHtml" />
      </div>
    </div>

    <!-- Disabled -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Disabled State</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-4">
              Add <code>.is-disabled</code> to lock an item in place.
            </p>
            <div class="vd-draggable" data-draggable="enabled-1">
              <span class="vd-draggable-handle"
                ><i class="ph ph-dots-six-vertical"></i
              ></span>
              Draggable
            </div>
            <div class="vd-draggable is-disabled" data-draggable="disabled-1">
              <span class="vd-draggable-handle"
                ><i class="ph ph-lock"></i
              ></span>
              Disabled (can't move)
            </div>
          </div>
        </div>
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
              <template #vue3><DocCodeSnippet :js="vue3Wiring" /></template>
              <template #vanilla
                ><DocCodeSnippet :js="vanillaWiring"
              /></template>
            </EngineSwitch>
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-list-dashes"></i> API Reference</h6>
          </div>
          <div class="vd-card-body">
            <h4>Classes &amp; Attributes</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class / Attribute</th>
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
                  <tr v-for="row in eventRows" :key="row[0]">
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
                Containers receive a <code>aria-label</code> and items are
                keyboard-reorderable — focus an item and use the arrow keys.
              </li>
              <li>
                Handles keep the rest of the item text selectable for users who
                don't drag.
              </li>
              <li>
                <code>.is-disabled</code> items are skipped by both pointer and
                keyboard interaction.
              </li>
              <li>
                Drag uses pointer/touch events (not legacy HTML5 DnD) for
                consistent behaviour across devices.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
