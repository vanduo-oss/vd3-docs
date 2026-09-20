import { inject, ref, shallowRef, type InjectionKey } from "vue";
import {
  loadRouteLocation,
  isNavigationFailure,
  NavigationFailureType,
  type RouteLocationNormalized,
  type Router,
} from "vue-router";

function emptyState() {
  return {
    pending: shallowRef<RouteLocationNormalized | null>(null),
    slow: ref(false),
    failure: shallowRef<{ href: string; title: string } | null>(null),
  };
}

export function createNavigation(router: Router, enabled = true) {
  const state = emptyState();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const prefetches = new Map<string, Promise<void>>();
  const clear = () => {
    clearTimeout(timer);
    state.pending.value = null;
    state.slow.value = false;
  };

  const dispose = enabled
    ? [
        router.beforeEach((to, from) => {
          clear();
          state.failure.value = null;
          // SSG already shows the initial page; feedback is for navigation.
          if (!from.matched.length) return;
          state.pending.value = to;
          timer = setTimeout(() => {
            if (state.pending.value === to) state.slow.value = true;
          }, 150);
        }),
        router.afterEach((to, _from, failure) => {
          // An older cancelled navigation must not clear a newer one.
          if (
            state.pending.value === to ||
            isNavigationFailure(failure, NavigationFailureType.duplicated)
          )
            clear();
        }),
        router.onError((_error, to) => {
          if (state.pending.value !== to) return;
          clear();
          state.failure.value = {
            href: router.resolve(to.fullPath).href,
            title: String(to.meta.title ?? "the requested page"),
          };
        }),
      ]
    : [];

  function prefetch(path: string): Promise<void> {
    if (!enabled || typeof navigator === "undefined") return Promise.resolve();
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (
      connection?.saveData ||
      ["slow-2g", "2g"].includes(connection?.effectiveType ?? "")
    )
      return Promise.resolve();

    const route = router.resolve(path);
    if (
      route.path === router.currentRoute.value.path ||
      !route.matched.some(
        (record) => typeof record.components?.default === "function",
      )
    )
      return Promise.resolve();

    const existing = prefetches.get(route.path);
    if (existing) return existing;
    // This public router API fills the same route cache used by navigation.
    // Failed speculation stays silent; an actual navigation reports errors.
    const promise = loadRouteLocation(route)
      .then(() => {})
      .catch(() => {})
      .finally(() => prefetches.delete(route.path));
    prefetches.set(route.path, promise);
    return promise;
  }

  return {
    ...state,
    prefetch,
    dispose() {
      dispose.forEach((remove) => remove());
      clear();
    },
  };
}

export const navigationKey: InjectionKey<ReturnType<typeof createNavigation>> =
  Symbol("docs-navigation");

export function useNavigation() {
  return inject(
    navigationKey,
    () => ({
      ...emptyState(),
      prefetch: () => Promise.resolve(),
      dispose: () => {},
    }),
    true,
  );
}
