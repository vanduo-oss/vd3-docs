import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavStore = defineStore("nav", () => {
  const filter = ref("");
  const activeCategoryId = ref<string | null>(null);

  const setFilter = (value: string): void => {
    filter.value = value;
  };

  const setActiveCategory = (id: string | null): void => {
    activeCategoryId.value = id;
  };

  return { filter, activeCategoryId, setFilter, setActiveCategory };
});
