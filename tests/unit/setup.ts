import { setThemePersistence } from "@vanduo-oss/vd3";
import { vi } from "vitest";

class MemoryStorage implements Storage {
  #store = new Map<string, string>();

  get length(): number {
    return this.#store.size;
  }
  clear(): void {
    this.#store.clear();
  }
  getItem(key: string): string | null {
    return this.#store.has(key) ? this.#store.get(key)! : null;
  }
  key(index: number): string | null {
    return [...this.#store.keys()][index] ?? null;
  }
  removeItem(key: string): void {
    this.#store.delete(key);
  }
  setItem(key: string, value: string): void {
    this.#store.set(key, String(value));
  }
}

if (
  typeof window !== "undefined" &&
  typeof window.localStorage?.clear !== "function"
) {
  Object.defineProperty(window, "localStorage", {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  });
}

// Match the docs bootstrap: saved preferences belong to the site dock.
setThemePersistence(false);

class IntersectionObserverStub {
  readonly root: Element | null = null;
  readonly rootMargin: string = "0px";
  readonly thresholds: ReadonlyArray<number> = [0];
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver;
}

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// Vite injects this at build time; unit tests need a stand-in.
if (
  typeof (globalThis as unknown as { __APP_VERSION__?: string })
    .__APP_VERSION__ === "undefined"
) {
  (globalThis as unknown as { __APP_VERSION__: string }).__APP_VERSION__ =
    "0.0.0-test";
}
