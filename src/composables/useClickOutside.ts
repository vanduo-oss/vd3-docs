import { onUnmounted, watch, type Ref } from "vue";

type MaybeEl = HTMLElement | null;

/**
 * Calls `handler` when a `pointerdown` lands outside ALL of `refs`. Active only
 * while `enabled` is true.
 *
 * The listener is attached on the next tick after `enabled` flips true so the
 * very click that opened the target can't immediately close it, and it runs in
 * the capture phase so it fires even if inner handlers stop propagation.
 */
export function useClickOutside(
  refs: Ref<MaybeEl>[],
  handler: () => void,
  enabled: Ref<boolean>,
): void {
  let attached = false;

  const onPointerDown = (event: Event): void => {
    const target = event.target as Node;
    const inside = refs.some((r) => r.value?.contains(target));
    if (!inside) handler();
  };

  const attach = (): void => {
    if (attached || typeof document === "undefined") return;
    attached = true;
    document.addEventListener("pointerdown", onPointerDown, true);
  };

  const detach = (): void => {
    if (!attached) return;
    attached = false;
    document.removeEventListener("pointerdown", onPointerDown, true);
  };

  watch(enabled, (on) => {
    if (on) {
      // Defer so the opening click doesn't bubble straight into this listener.
      setTimeout(() => {
        if (enabled.value) attach();
      }, 0);
    } else {
      detach();
    }
  });

  onUnmounted(detach);
}
