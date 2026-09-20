import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createMemoryHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";
import { createNavigation } from "@/navigation";

const page = { render: () => null };
const flush = async () => {
  for (let i = 0; i < 30; i++) await Promise.resolve();
};
function deferred() {
  let resolve!: (value: typeof page) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<typeof page>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
const cleanups: Array<() => void> = [];
afterEach(() => {
  cleanups.splice(0).forEach((fn) => fn());
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

async function setup(routes: RouteRecordRaw[] = []) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", component: page }, ...routes],
  });
  const navigation = createNavigation(router);
  cleanups.push(navigation.dispose);
  await router.push("/");
  return { router, ...navigation };
}

describe("navigation feedback", () => {
  it("keeps initial SSG quiet; shows delayed feedback while a lazy page resolves", async () => {
    vi.useFakeTimers();
    const load = deferred();
    const n = await setup([{ path: "/slow", component: () => load.promise }]);
    expect(n.pending.value).toBeNull();
    const push = n.router.push("/slow");
    await flush();
    expect(n.pending.value?.path).toBe("/slow");
    expect(n.slow.value).toBe(false);
    vi.advanceTimersByTime(150);
    expect(n.slow.value).toBe(true);
    load.resolve(page);
    await push;
    expect(n.pending.value).toBeNull();
    expect(n.slow.value).toBe(false);
  });

  it("does not let an older cancelled load clear the latest navigation", async () => {
    const a = deferred();
    const b = deferred();
    const n = await setup([
      { path: "/a", component: () => a.promise },
      { path: "/b", component: () => b.promise },
    ]);
    const first = n.router.push("/a");
    await flush();
    const second = n.router.push("/b");
    await flush();
    a.resolve(page);
    await first;
    expect(n.pending.value?.path).toBe("/b");
    b.resolve(page);
    await second;
    expect(n.pending.value).toBeNull();
  });

  it("ignores a stale failure but reports the current failure with a reload destination", async () => {
    const a = deferred();
    const b = deferred();
    const n = await setup([
      { path: "/a", component: () => a.promise },
      { path: "/b", component: () => b.promise, meta: { title: "B" } },
    ]);
    const first = n.router.push("/a").catch(() => {});
    await flush();
    const second = n.router.push("/b").catch(() => {});
    await flush();
    a.reject(new Error("old load failed"));
    await first;
    expect(n.failure.value).toBeNull();
    expect(n.pending.value?.path).toBe("/b");
    b.reject(new Error("offline"));
    await second;
    expect(n.pending.value).toBeNull();
    expect(n.failure.value).toEqual({ href: "/b", title: "B" });
  });

  it("clears feedback after an abort and when returning to the current page", async () => {
    const load = deferred();
    const n = await setup([
      { path: "/abort", component: page, beforeEnter: () => false },
      { path: "/slow", component: () => load.promise },
    ]);
    await n.router.push("/abort");
    expect(n.pending.value).toBeNull();
    const push = n.router.push("/slow");
    await flush();
    await n.router.push("/");
    expect(n.pending.value).toBeNull();
    load.resolve(page);
    await push;
    expect(n.router.currentRoute.value.path).toBe("/");
  });

  it("deduplicates prefetches, caches the page, and never shows speculative loading", async () => {
    const load = deferred();
    const loader = vi.fn(() => load.promise);
    const n = await setup([{ path: "/prefetch", component: loader }]);
    const first = n.prefetch("/prefetch");
    const second = n.prefetch("/prefetch");
    expect(first).toBe(second);
    expect(n.pending.value).toBeNull();
    load.resolve(page);
    await first;
    await n.router.push("/prefetch");
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it("keeps speculative errors silent and retries on navigation", async () => {
    const loader = vi
      .fn()
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValue(page);
    const n = await setup([{ path: "/retry", component: loader }]);
    await n.prefetch("/retry");
    expect(n.failure.value).toBeNull();
    await n.router.push("/retry");
    expect(loader).toHaveBeenCalledTimes(2);
    expect(n.router.currentRoute.value.path).toBe("/retry");
  });

  it("respects data saving and disables hooks and prefetching for SSG", async () => {
    const loader = vi.fn().mockResolvedValue(page);
    vi.stubGlobal("navigator", { connection: { saveData: true } });
    const n = await setup([{ path: "/limited", component: loader }]);
    await n.prefetch("/limited");
    expect(loader).not.toHaveBeenCalled();
    const server = createNavigation(n.router, false);
    await server.prefetch("/limited");
    expect(loader).not.toHaveBeenCalled();
    server.dispose();
  });
});
