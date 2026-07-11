import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { nav, type NavSection, type NavTree } from "@/nav";

export interface SearchEntry {
  id: string;
  title: string;
  route: string;
  icon: string;
  category: string;
  categoryPath: string;
  keywords: string[];
}

export interface SearchResult {
  entry: SearchEntry;
  score: number;
}

export interface SearchGroup {
  category: string;
  categoryPath: string;
  results: SearchResult[];
}

const buildIndex = (tree: NavTree): SearchEntry[] => {
  const entries: SearchEntry[] = [];
  for (const page of tree.pages) {
    entries.push({
      id: page.id,
      title: page.title,
      route: page.route,
      icon: page.icon ?? "file",
      category: "Pages",
      categoryPath: "Pages",
      keywords: page.keywords,
    });
  }
  for (const tab of tree.tabs) {
    for (const category of tab.categories) {
      for (const section of category.sections) {
        entries.push({
          id: `${tab.id}-${category.id}-${section.id}`,
          title: section.title,
          route: section.route,
          icon: section.icon ?? "file",
          category: category.title,
          categoryPath: `${tab.title} › ${category.title}`,
          keywords: (section as NavSection).keywords ?? [],
        });
      }
    }
  }
  return entries;
};

export const useSearchStore = defineStore("search", () => {
  const isOpen = ref(false);
  const query = ref("");
  const activeIndex = ref(0);
  const entries = buildIndex(nav);

  const results = computed<SearchResult[]>(() => {
    const q = query.value.trim().toLowerCase();
    if (q.length < 2) return [];
    const out: SearchResult[] = [];
    for (const entry of entries) {
      const titleHit = entry.title.toLowerCase().includes(q);
      const keywordHit = entry.keywords.some((k) =>
        k.toLowerCase().includes(q),
      );
      const routeHit = entry.route.toLowerCase().includes(q);
      if (titleHit || keywordHit || routeHit) {
        const score = titleHit ? 3 : keywordHit ? 2 : 1;
        out.push({ entry, score });
      }
    }
    return out.sort((a, b) => b.score - a.score).slice(0, 20);
  });

  /** Flat ordered list (matches keyboard navigation order) grouped by category. */
  const groups = computed<SearchGroup[]>(() => {
    const map = new Map<string, SearchGroup>();
    for (const result of results.value) {
      const key = result.entry.categoryPath;
      let group = map.get(key);
      if (!group) {
        group = {
          category: result.entry.category,
          categoryPath: result.entry.categoryPath,
          results: [],
        };
        map.set(key, group);
      }
      group.results.push(result);
    }
    return [...map.values()];
  });

  /** Results in the same visual/keyboard order as the grouped render. */
  const ordered = computed<SearchResult[]>(() =>
    groups.value.flatMap((g) => g.results),
  );

  const open = (): void => {
    isOpen.value = true;
    activeIndex.value = 0;
  };
  const close = (): void => {
    isOpen.value = false;
    query.value = "";
    activeIndex.value = 0;
  };
  const move = (delta: number): void => {
    const count = ordered.value.length;
    if (count === 0) return;
    activeIndex.value = (activeIndex.value + delta + count) % count;
  };

  return {
    isOpen,
    query,
    activeIndex,
    results,
    groups,
    ordered,
    open,
    close,
    move,
  };
});
