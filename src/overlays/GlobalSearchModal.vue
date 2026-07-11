<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useSearchStore, type SearchResult } from "@/stores/search";

const search = useSearchStore();
const router = useRouter();
const inputRef = ref<HTMLInputElement | null>(null);

const openModal = (): void => {
  search.open();
  void nextTick(() => inputRef.value?.focus());
};

const onSelect = (route: string): void => {
  void router.push(route);
  search.close();
};

/** Highlight the matched query within a label using <mark>. */
const highlight = (text: string): string => {
  const q = search.query.trim();
  if (q.length < 2) return escapeHtml(text);
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return escapeHtml(text);
  return (
    escapeHtml(text.slice(0, idx)) +
    "<mark>" +
    escapeHtml(text.slice(idx, idx + q.length)) +
    "</mark>" +
    escapeHtml(text.slice(idx + q.length))
  );
};

const escapeHtml = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const indexOf = (result: SearchResult): number =>
  search.ordered.findIndex((r) => r.entry.id === result.entry.id);

const onKeydown = (event: KeyboardEvent): void => {
  if (
    (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
    event.key === "/"
  ) {
    if (event.key === "/" && isEditable(event.target)) return;
    event.preventDefault();
    openModal();
    return;
  }
  if (!search.isOpen) return;
  if (event.key === "Escape") {
    event.preventDefault();
    search.close();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    search.move(1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    search.move(-1);
  } else if (event.key === "Enter") {
    const target = search.ordered[search.activeIndex];
    if (target) onSelect(target.entry.route);
  }
};

const isEditable = (el: EventTarget | null): boolean => {
  if (!(el instanceof HTMLElement)) return false;
  return (
    el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable
  );
};

watch(
  () => search.query,
  () => {
    search.activeIndex = 0;
  },
);

const hasQuery = computed(() => search.query.trim().length >= 2);

onMounted(() => {
  window.addEventListener("vd:open-search", openModal);
  window.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  window.removeEventListener("vd:open-search", openModal);
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div
      class="global-search-overlay"
      :class="{ 'is-open': search.isOpen }"
      @click="search.close()"
    ></div>
    <div
      class="global-search-modal"
      :class="{ 'is-open': search.isOpen }"
      role="dialog"
      aria-modal="true"
      aria-label="Search entire site"
    >
      <div class="global-search-header">
        <i class="ph ph-magnifying-glass global-search-icon"></i>
        <input
          ref="inputRef"
          v-model="search.query"
          type="search"
          class="global-search-input"
          placeholder="Search everything…"
          autocomplete="off"
          aria-label="Search"
        />
        <kbd class="global-search-kbd" @click="search.close()">esc</kbd>
      </div>

      <div
        class="global-search-results"
        role="listbox"
        aria-label="Search results"
      >
        <ul
          v-if="search.ordered.length > 0"
          class="global-search-results-list"
          role="listbox"
        >
          <template v-for="group in search.groups" :key="group.categoryPath">
            <li class="global-search-category-label">
              {{ group.categoryPath }}
            </li>
            <li
              v-for="result in group.results"
              :key="result.entry.id"
              class="global-search-result"
              role="option"
              :class="{ 'is-active': indexOf(result) === search.activeIndex }"
              :aria-selected="indexOf(result) === search.activeIndex"
              @click="onSelect(result.entry.route)"
              @mousemove="search.activeIndex = indexOf(result)"
            >
              <div class="global-search-result-icon">
                <i :class="`ph ph-${result.entry.icon}`"></i>
              </div>
              <div class="global-search-result-content">
                <div
                  class="global-search-result-title"
                  v-html="highlight(result.entry.title)"
                ></div>
                <div class="global-search-result-meta">
                  {{ result.entry.category }}
                </div>
              </div>
            </li>
          </template>
        </ul>
        <div v-else-if="hasQuery" class="global-search-empty">
          <div class="global-search-empty-icon">
            <i class="ph ph-magnifying-glass"></i>
          </div>
          <div class="global-search-empty-title">No results found</div>
          <div class="global-search-empty-text">
            Try different keywords or check spelling
          </div>
        </div>
        <div v-else class="global-search-hint">
          <div class="global-search-hint-icon">
            <i class="ph ph-magnifying-glass"></i>
          </div>
          <div class="global-search-hint-text">
            Type to search across all documentation, guides, and pages
          </div>
        </div>
      </div>

      <div class="global-search-footer">
        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
        <span><kbd>↵</kbd> select</span>
        <span><kbd>esc</kbd> close</span>
      </div>
    </div>
  </Teleport>
</template>
