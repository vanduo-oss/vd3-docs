import type { InjectionKey, WritableComputedRef } from "vue";

/**
 * Shared expand-state coordination between an {@link EngineSwitch} and the
 * {@link DocCodeSnippet}s rendered inside its engine slots. A snippet calls
 * `register()` once during setup and receives a writable ref bound to its
 * ordinal position; the same position in the other engine slot reads the same
 * ref, so an expanded snippet stays expanded when the engine is switched.
 */
export interface EngineSnippetGroup {
  /** Claim the next ordinal slot. Returns the expanded ref to bind to. */
  register: (defaultOpen: boolean) => WritableComputedRef<boolean>;
}

export const ENGINE_SNIPPET_GROUP: InjectionKey<EngineSnippetGroup> = Symbol(
  "vd-engine-snippet-group",
);
