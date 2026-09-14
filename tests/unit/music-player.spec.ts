import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { VdMusicPlayer } from "@vanduo-oss/vdl-cbun/music-player";

beforeAll(() => {
  type G = Record<string, unknown>;
  if (typeof (globalThis as G).ResizeObserver === "undefined") {
    (globalThis as G).ResizeObserver = class {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    };
  }
});

describe("VdMusicPlayer (@vanduo-oss/vdl-cbun/music-player)", () => {
  it("mounts and initializes the player into the container", async () => {
    const wrapper = mount(VdMusicPlayer, {
      props: {
        tracks: [
          { name: "A", url: "/a.mp3" },
          { name: "B", url: "/b.mp3" },
        ],
        options: { showPlaylist: true, showProgress: true },
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    const container = wrapper.find(".vd-music-player");
    expect(container.exists()).toBe(true);
    expect(container.attributes("data-music-player-initialized")).toBe("true");
    expect(container.element.children.length).toBeGreaterThan(0);
    wrapper.unmount();
  });
});
