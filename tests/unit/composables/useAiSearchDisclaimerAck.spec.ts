import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  AI_SEARCH_DISCLAIMER_ACK_KEY,
  useAiSearchDisclaimerAck,
} from "@/composables/useAiSearchDisclaimerAck";

describe("useAiSearchDisclaimerAck", () => {
  let storage: Record<string, string>;

  beforeEach(() => {
    storage = {};
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => {
        storage[key] = value;
      },
      removeItem: (key: string) => {
        delete storage[key];
      },
      clear: () => {
        storage = {};
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts unacknowledged when localStorage is empty", () => {
    const { isAcknowledged } = useAiSearchDisclaimerAck();
    expect(isAcknowledged.value).toBe(false);
  });

  it("reads acknowledged state from localStorage", () => {
    storage[AI_SEARCH_DISCLAIMER_ACK_KEY] = "1";
    const { isAcknowledged } = useAiSearchDisclaimerAck();
    expect(isAcknowledged.value).toBe(true);
  });

  it("persists acknowledgement and updates ref", () => {
    const { isAcknowledged, acknowledge } = useAiSearchDisclaimerAck();
    expect(isAcknowledged.value).toBe(false);

    acknowledge();

    expect(isAcknowledged.value).toBe(true);
    expect(storage[AI_SEARCH_DISCLAIMER_ACK_KEY]).toBe("1");
  });
});
