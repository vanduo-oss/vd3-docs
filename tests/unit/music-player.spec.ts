import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { VdMusicPlayer } from "@vanduo-oss/music-player/vue";
import MusicPlayerPage from "@/pages/media/MusicPlayer.vue";

const DocsLayoutStub = {
  name: "DocsLayout",
  template: '<div><slot /></div>',
};
const DocCodeSnippetStub = {
  name: "DocCodeSnippet",
  template: '<div class="doc-code-snippet-stub"></div>',
};
const EngineSwitchStub = {
  name: "EngineSwitch",
  template: '<div class="engine-switch-stub"><slot name="vue3" /><slot name="vanilla" /></div>',
};

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

describe("VdMusicPlayer (@vanduo-oss/music-player/vue integration)", () => {
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

describe("Music player page (parity-plus)", () => {
  it("renders multiple player instances and layout-variant classes", async () => {
    const wrapper = mount(MusicPlayerPage, {
      global: {
        stubs: {
          DocsLayout: DocsLayoutStub,
          DocCodeSnippet: DocCodeSnippetStub,
          EngineSwitch: EngineSwitchStub,
        },
      },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();

    const players = wrapper.findAll(".vd-music-player");
    expect(players.length).toBeGreaterThanOrEqual(10);

    expect(wrapper.find(".vd-music-player-compact").exists()).toBe(true);
    expect(wrapper.find(".vd-music-player-sm").exists()).toBe(true);
    expect(wrapper.find(".vd-music-player-lg").exists()).toBe(true);
    expect(wrapper.find(".vd-music-player-inline").exists()).toBe(true);

    wrapper.unmount();
  });

  it("renders the programmatic-API and live event-log cards", () => {
    const wrapper = mount(MusicPlayerPage, {
      global: {
        stubs: {
          DocsLayout: DocsLayoutStub,
          DocCodeSnippet: DocCodeSnippetStub,
          EngineSwitch: EngineSwitchStub,
        },
      },
      attachTo: document.body,
    });

    const cards = wrapper.findAll("h4, h5, h6");
    const titles = cards.map((c) => c.text());
    expect(titles).toContain("Programmatic API");
    expect(titles).toContain("Live event log");
    expect(titles).toContain("Glass surface");
    expect(titles).toContain("Detachable — fixed corners");
    expect(titles).toContain("Detachable — draggable");
    expect(titles).toContain("Options");
    expect(titles).toContain("Events");
    expect(titles).toContain("Accessibility");

    // Programmatic demo exposes a state line and action buttons.
    expect(wrapper.find("code").text()).not.toBe("");
    expect(wrapper.findAll("button").length).toBeGreaterThan(8);

    wrapper.unmount();
  });

  it("renders the options table with Type and Default columns", () => {
    const wrapper = mount(MusicPlayerPage, {
      global: {
        stubs: {
          DocsLayout: DocsLayoutStub,
          DocCodeSnippet: DocCodeSnippetStub,
          EngineSwitch: EngineSwitchStub,
        },
      },
      attachTo: document.body,
    });
    const tables = wrapper.findAll("table");
    const optionsTable = tables.find((t) => {
      const ths = t.findAll("thead th").map((th) => th.text());
      return ths.includes("Option") && ths.includes("Type") && ths.includes("Default");
    });
    expect(optionsTable, "Options table with Type/Default columns should exist").toBeTruthy();
    if (optionsTable) {
      const rows = optionsTable.findAll("tbody tr");
      expect(rows.length).toBe(15);
    }
    wrapper.unmount();
  });
});
