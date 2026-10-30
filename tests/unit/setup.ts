import { setThemePersistence } from "@vanduo-oss/vd3";
import { vi } from "vitest";

class MemoryStorage implements Storage {
  get length(): number {
    return Object.keys(this).length;
  }
  clear(): void {
    for (const key of Object.keys(this)) {
      delete (this as Record<string, unknown>)[key];
    }
  }
  getItem(key: string): string | null {
    return Object.prototype.hasOwnProperty.call(this, key)
      ? String((this as Record<string, unknown>)[key])
      : null;
  }
  key(index: number): string | null {
    return Object.keys(this)[index] ?? null;
  }
  removeItem(key: string): void {
    delete (this as Record<string, unknown>)[key];
  }
  setItem(key: string, value: string): void {
    (this as Record<string, unknown>)[key] = String(value);
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
