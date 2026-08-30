import { ref, type Ref } from "vue";

/** Docs-site localStorage key for dismissed AI search disclaimer. */
export const AI_SEARCH_DISCLAIMER_ACK_KEY = "vd3-docs:ai-search-disclaimer-ack";

const ACK_VALUE = "1";

function readAcknowledged(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(AI_SEARCH_DISCLAIMER_ACK_KEY) === ACK_VALUE;
  } catch {
    return false;
  }
}

export function useAiSearchDisclaimerAck(): {
  isAcknowledged: Ref<boolean>;
  acknowledge: () => void;
} {
  const isAcknowledged = ref(readAcknowledged());

  const acknowledge = (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(AI_SEARCH_DISCLAIMER_ACK_KEY, ACK_VALUE);
    } catch {
      // Quota / private mode — still hide for this session.
    }
    isAcknowledged.value = true;
  };

  return { isAcknowledged, acknowledge };
}
