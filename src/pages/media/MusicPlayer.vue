<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import EngineSwitch from "@/components/EngineSwitch.vue";
import { VdMusicPlayer } from "@vanduo-oss/music-player/vue";

// Stellardrone — "Invent the Universe" (Creative Commons). Audio files ship with
// the site's media assets; the player UI renders from these names regardless.
interface Track {
  name: string;
  url: string;
}

interface MusicPlayerApi {
  play: (el: HTMLElement) => void;
  pause: (el: HTMLElement) => void;
  toggle: (el: HTMLElement) => void;
  next: (el: HTMLElement) => void;
  previous: (el: HTMLElement) => void;
  setVolume: (el: HTMLElement, value: number) => void;
  setTrack: (el: HTMLElement, index: number) => void;
  shuffle: (el: HTMLElement) => void;
  repeat: (el: HTMLElement) => void;
  setRepeat: (el: HTMLElement, mode: "off" | "one" | "all") => void;
  detach: (el: HTMLElement, position?: string) => void;
  attach: (el: HTMLElement) => void;
  minimize: (el: HTMLElement) => void;
  expand: (el: HTMLElement) => void;
  toggleMinimize: (el: HTMLElement) => void;
  setPosition: (
    el: HTMLElement,
    position: string | { x: number; y: number },
  ) => void;
  getState: (el: HTMLElement) => {
    isPlaying: boolean;
    currentIndex: number;
    currentTrack: Track | null;
    volume: number;
    shuffle: boolean;
    repeat: "off" | "one" | "all";
    tracks: Track[];
    isDetached: boolean;
    isMinimized: boolean;
  } | null;
  destroy: (el: HTMLElement) => void;
}

type ComponentExpose = {
  player: MusicPlayerApi;
  container: () => HTMLElement | null;
};

const tracks: Track[] = [
  {
    name: "Pale Blue Dot",
    url: "/music/Stellardrone/Invent the Universe/06 - Pale Blue Dot.mp3",
  },
  {
    name: "Maia Nebula",
    url: "/music/Stellardrone/Invent the Universe/03 - Maia Nebula.mp3",
  },
  {
    name: "Approaching the Heliopause",
    url: "/music/Stellardrone/Invent the Universe/04 - Approaching the Heliopause.mp3",
  },
  {
    name: "An Ocean of Galaxies",
    url: "/music/Stellardrone/Invent the Universe/07 - An Ocean of Galaxies.mp3",
  },
  {
    name: "Infinite Void",
    url: "/music/Stellardrone/Invent the Universe/08 - Infinite Void.mp3",
  },
];

interface VariantDemo {
  key: string;
  title: string;
  blurb: string;
  cls?: string;
  options?: Record<string, unknown>;
  code: string;
}

const variantDemos: VariantDemo[] = [
  {
    key: "minimal",
    title: "Minimal Player",
    blurb: "Default config — play/pause, prev/next, volume, track name.",
    code: `VanduoMusicPlayer.initPlayer(el, { tracks });`,
  },
  {
    key: "progress",
    title: "With Progress Bar",
    blurb: "Enable showProgress for a seek bar + elapsed/duration times.",
    options: { showProgress: true },
    code: `VanduoMusicPlayer.initPlayer(el, {
  tracks,
  showProgress: true,
});`,
  },
  {
    key: "playlist",
    title: "With Playlist + Progress",
    blurb:
      "Enable showPlaylist and showProgress for a fuller player. Shuffle and repeat are always on the control bar.",
    options: { showPlaylist: true, showProgress: true },
    code: `VanduoMusicPlayer.initPlayer(el, {
  tracks,
  showPlaylist: true,
  showProgress: true,
});`,
  },
  {
    key: "compact",
    title: "Compact",
    blurb: "Minimal floating bar, no track name shown.",
    cls: "vd-music-player-compact",
    code: `<div class="vd-music-player vd-music-player-compact"></div>`,
  },
  {
    key: "sm",
    title: "Small (default size)",
    blurb:
      "Standard layout with track name — use vd-music-player-sm or omit size classes.",
    cls: "vd-music-player-sm",
    code: `<div class="vd-music-player vd-music-player-sm"></div>`,
  },
  {
    key: "lg",
    title: "Large",
    blurb:
      "Roomier padding and controls — vd-music-player-lg for featured placement.",
    cls: "vd-music-player-lg",
    code: `<div class="vd-music-player vd-music-player-lg"></div>`,
  },
  {
    key: "inline",
    title: "Inline Layout — All Features",
    blurb: "Full-width bar with progress bar, repeat, shuffle, and playlist.",
    cls: "vd-music-player-inline",
    options: {
      showProgress: true,
      showPlaylist: true,
      shuffle: false,
      repeat: "off",
    },
    code: `VanduoMusicPlayer.initPlayer(el, {
  tracks,
  showProgress: true,
  showPlaylist: true,
  shuffle: false,
  repeat: 'off',
});`,
  },
];

const detachFixedRef = ref<ComponentExpose | null>(null);
const detachDragRef = ref<ComponentExpose | null>(null);

const detachFixed = (corner: string): void => {
  const r = detachFixedRef.value;
  if (!r) return;
  const el = r.container();
  if (el) r.player.detach(el, corner);
};
const attachFixed = (): void => {
  const r = detachFixedRef.value;
  if (!r) return;
  const el = r.container();
  if (el) r.player.attach(el);
};

const detachAndMinimize = (): void => {
  const r = detachDragRef.value;
  if (!r) return;
  const el = r.container();
  if (!el) return;
  r.player.detach(el, "bottom-right");
  setTimeout(() => r.player.minimize(el), 150);
};
const expandDrag = (): void => {
  const r = detachDragRef.value;
  if (!r) return;
  const el = r.container();
  if (el) r.player.expand(el);
};
const attachDrag = (): void => {
  const r = detachDragRef.value;
  if (!r) return;
  const el = r.container();
  if (el) r.player.attach(el);
};

// Programmatic API demo
const progRef = ref<ComponentExpose | null>(null);
const progState = ref<string>("—");
const refreshProgState = (): void => {
  const r = progRef.value;
  if (!r) return;
  const el = r.container();
  if (!el) return;
  const s = r.player.getState(el);
  progState.value = s
    ? `${s.isPlaying ? "Playing" : "Paused"} · #${s.currentIndex} ${s.currentTrack?.name ?? "—"} · vol ${(s.volume * 100).toFixed(0)}% · repeat ${s.repeat}`
    : "—";
};
const prog = (fn: (p: MusicPlayerApi, el: HTMLElement) => void): void => {
  const r = progRef.value;
  if (!r) return;
  const el = r.container();
  if (!el) return;
  fn(r.player, el);
  setTimeout(refreshProgState, 0);
};
const progPlay = (): void => prog((p, el) => p.play(el));
const progPause = (): void => prog((p, el) => p.pause(el));
const progNext = (): void => prog((p, el) => p.next(el));
const progPrev = (): void => prog((p, el) => p.previous(el));
const progVol = (v: number): void => prog((p, el) => p.setVolume(el, v));
const progTrack = (i: number): void => prog((p, el) => p.setTrack(el, i));

// Live event-log demo
interface LogEntry {
  time: string;
  type: string;
  detail: unknown;
}
const logEntries = ref<LogEntry[]>([]);
const MAX_LOG = 12;
const onLogged = (type: string, detail?: unknown): void => {
  const time = new Date().toLocaleTimeString([], { hour12: false });
  logEntries.value.unshift({ time, type, detail });
  if (logEntries.value.length > MAX_LOG) logEntries.value.length = MAX_LOG;
};
const clearLog = (): void => {
  logEntries.value = [];
};

// Ensure no floating widget survives route change.
onBeforeUnmount(() => {
  for (const r of [detachFixedRef.value, detachDragRef.value, progRef.value]) {
    if (!r) continue;
    const el = r.container();
    if (!el) continue;
    try {
      const s = r.player.getState(el);
      if (s?.isDetached) r.player.attach(el);
    } catch {
      /* instance may already be torn down */
    }
  }
});

const installShell = `pnpm add @vanduo-oss/music-player`;

const vue3Usage = `<script setup lang="ts">
import { VdMusicPlayer } from '@vanduo-oss/music-player/vue';

const tracks = [
  { name: 'Pale Blue Dot', url: '/music/pale-blue-dot.mp3' },
  { name: 'Maia Nebula', url: '/music/maia-nebula.mp3' ];
<\/script>

<template>
  <VdMusicPlayer
    :tracks="tracks"
    :options="{ showPlaylist: true, showProgress: true }"
    @trackchange="(d) => console.log(d.name)" />
</template>`;

const vanillaJs = `import VanduoMusicPlayer from '@vanduo-oss/music-player';
import '@vanduo-oss/music-player/css';

VanduoMusicPlayer.initPlayer(document.getElementById('player'), {
  tracks,
  showPlaylist: true,
  showProgress: true,
});`;

const vanillaHtml = `<div class="vd-music-player" data-music-player
  data-music-player-options='{"tracks":[
    {"name":"Pale Blue Dot","url":"/music/pale-blue-dot.mp3"}
  ],"showPlaylist":true}'></div>

<script>VanduoMusicPlayer.init();<\/script>`;

const vue3Api: [string, string][] = [
  [":tracks", "Playlist — [{ name, url }]."],
  [":options", "Player options object (see Options below)."],
  ["@play / @pause / @ended", "Playback lifecycle."],
  ["@trackchange", "Active track changed; detail { index, name, url }."],
  ["@volumechange / @repeatchange", "Volume or repeat-mode changed."],
  ["@detach / @attach / @minimize / @expand", "Floating-mode transitions."],
  ["@ready", "Emitted once with the container element."],
  ["expose: player / container()", "Imperative API + container accessor."],
];

const events: [string, string][] = [
  ["musicplayer:play", "Playback started."],
  ["musicplayer:pause", "Playback paused."],
  [
    "musicplayer:trackchange",
    "Active track changed; detail { index, name, url }.",
  ],
  ["musicplayer:volumechange", "Volume changed; detail { volume }."],
  ["musicplayer:repeatchange", "Repeat mode changed; detail { repeat }."],
  [
    "musicplayer:ended",
    "Fires when repeat is off and autoAdvance is false at track end.",
  ],
  ["musicplayer:detach", "Player floated above the page."],
  ["musicplayer:attach", "Player docked back into place."],
  ["musicplayer:minimize", "Player collapsed to essential transport + volume."],
  ["musicplayer:expand", "Player restored from minimized."],
];

const optionsTable: [string, string, string, string][] = [
  [
    "tracks",
    "Array",
    "[]",
    "Array of { name, url } objects. name is displayed; url is the audio file path.",
  ],
  ["volume", "number", "0.5", "Initial playback volume between 0 and 1."],
  [
    "shuffle",
    "boolean",
    "false",
    "Shuffle the track list on init. Also shows the shuffle toggle button.",
  ],
  [
    "repeat",
    "string",
    "'off'",
    "'off', 'one' (restart current track), or 'all' (wrap playlist). Button cycles modes; repeat-one shows a 1 badge.",
  ],
  [
    "showProgress",
    "boolean",
    "false",
    "Show a seek bar with elapsed/total time display.",
  ],
  [
    "showPlaylist",
    "boolean",
    "false",
    "Show a collapsible track list panel. Also shows the shuffle button.",
  ],
  [
    "autoAdvance",
    "boolean",
    "true",
    "Automatically play the next track when the current one ends. Ignored when repeat is 'one' or 'all'.",
  ],
  [
    "glass",
    "boolean",
    "false",
    "Frosted-glass surface (vd-music-player-glass); pairs with theme --vd-glass-* tokens.",
  ],
  [
    "detachable",
    "boolean",
    "false",
    "Show detach/attach controls and allow detach() to float the player.",
  ],
  [
    "floatingPosition",
    "string",
    "'bottom-right'",
    "After detaching: 'bottom-left', 'bottom-right', 'top-left', or 'top-right'.",
  ],
  [
    "draggable",
    "boolean",
    "false",
    "When detachable is true, show a drag handle and allow pointer-dragging while floating.",
  ],
  [
    "minimizable",
    "boolean",
    "false",
    "Show a control to collapse the player to essential transport + volume.",
  ],
  [
    "startMinimized",
    "boolean",
    "false",
    "On the first detach(), start in the minimized layout.",
  ],
  [
    "persistPosition",
    "boolean",
    "false",
    "Save floating {x, y} to localStorage (via safeStorage when available).",
  ],
  [
    "persistKey",
    "string",
    "'' (from element id)",
    "Storage key suffix for persistPosition; defaults from the element's id attribute.",
  ],
];

const programmaticApi: [string, string][] = [
  ["play(el) / pause(el) / toggle(el)", "Transport controls."],
  ["next(el) / previous(el)", "Skip tracks (wraps around)."],
  ["setTrack(el, index)", "Jump to a 0-based track index."],
  ["setVolume(el, 0.75)", "Clamp volume 0–1; fires volumechange."],
  [
    "shuffle(el) / repeat(el) / setRepeat(el, 'one')",
    "Shuffle toggle; cycle/set repeat mode.",
  ],
  [
    "detach(el, 'bottom-right') / attach(el)",
    "Float above the page / dock back (requires detachable).",
  ],
  [
    "setPosition(el, 'top-right') / setPosition(el, { x, y })",
    "Reposition a detached player.",
  ],
  [
    "minimize(el) / expand(el) / toggleMinimize(el)",
    "Collapse/restore (requires minimizable).",
  ],
  [
    "getState(el)",
    "Returns { isPlaying, currentIndex, currentTrack, volume, shuffle, repeat, tracks, isDetached, isMinimized }.",
  ],
  ["destroy(el) / destroyAll()", "Tear down one or all instances."],
];

const cssVars = `:root {
  --vd-music-player-accent: var(--vd-color-primary);
  --vd-music-player-bg: var(--vd-bg-primary);
  --vd-music-player-bg-secondary: var(--vd-bg-secondary);
  --vd-music-player-border: var(--vd-border-color);
  --vd-music-player-text: var(--vd-text-primary);
  --vd-music-player-text-muted: var(--vd-text-muted);
  --vd-music-player-track-bg: var(--vd-border-color);
  --vd-music-player-track-fill: var(--vd-color-primary);
  --vd-music-player-btn-size: 2.125rem;
  --vd-music-player-padding-x: 1.3125rem;
  --vd-music-player-padding-y: 0.8125rem;
  --vd-music-player-glass-bg: var(--vd-glass-bg-light);
  --vd-music-player-glass-border: var(--vd-glass-border-light);
  --vd-music-player-glass-shadow: var(--vd-glass-shadow);
  --vd-music-player-floating-z: 10050;
  --vd-music-player-floating-offset: 1rem;
}`;

const eventsSnippet = `el.addEventListener('musicplayer:play', () => console.log('Playback started'));
el.addEventListener('musicplayer:trackchange', (e) => {
  const { index, name, url } = e.detail;
  console.log('Track changed to:', index, name, url);
});
el.addEventListener('musicplayer:volumechange', (e) => console.log('Volume:', e.detail.volume));
el.addEventListener('musicplayer:repeatchange', (e) => console.log('Repeat mode:', e.detail.repeat));
el.addEventListener('musicplayer:detach', () => console.log('Player is floating'));
el.addEventListener('musicplayer:attach', () => console.log('Player was docked'));
el.addEventListener('musicplayer:minimize', () => console.log('Minimized'));
el.addEventListener('musicplayer:expand', () => console.log('Expanded'));`;

const programmaticSnippet = `const el = document.getElementById('my-player');

VanduoMusicPlayer.play(el);
VanduoMusicPlayer.pause(el);
VanduoMusicPlayer.next(el);
VanduoMusicPlayer.previous(el);
VanduoMusicPlayer.setTrack(el, 0);
VanduoMusicPlayer.setVolume(el, 0.75);
VanduoMusicPlayer.shuffle(el);
VanduoMusicPlayer.repeat(el);
VanduoMusicPlayer.setRepeat(el, 'one');
VanduoMusicPlayer.detach(el, 'bottom-right');
VanduoMusicPlayer.attach(el);
VanduoMusicPlayer.minimize(el);
VanduoMusicPlayer.expand(el);

const state = VanduoMusicPlayer.getState(el);
VanduoMusicPlayer.destroy(el);
VanduoMusicPlayer.destroyAll();`;
</script>

<template>
  <section id="music-player">
    <h5 class="demo-title"><i class="ph ph-music-note"></i>Music Player</h5>
    <p class="vd-mb-4">
      A fully accessible HTML5 audio player component with transport controls,
      volume, optional shuffle and repeat modes, seek bar, playlist, glass
      surface, and a detachable floating mode (corner placement, pointer-drag
      reposition, minimizable). Zero external dependencies, powered by the
      native Audio API, and it automatically adapts to the active Vanduo theme.
    </p>
    <p class="vd-text-sm vd-text-muted vd-mb-8">
      Install the player separately from the core framework. All live demos
      below use a bundled sample playlist from <em>Invent the Universe</em>,
      with <em>Pale Blue Dot</em> as the default first track. Ships an optional
      Vue 3 binding (<code>@vanduo-oss/music-player/vue</code>) used here.
    </p>

    <!-- Minimal + progress -->
    <div class="vd-row vd-mb-6">
      <div
        v-for="d in variantDemos.slice(0, 2)"
        :key="d.key"
        class="vd-col-12 vd-col-md-6 vd-mb-6"
      >
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header">
            <h6>{{ d.title }}</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">{{ d.blurb }}</p>
          </div>
          <div class="vd-card-body">
            <VdMusicPlayer
              :tracks="tracks"
              :options="d.options ?? {}"
              :class="d.cls"
            />
            <DocCodeSnippet class="vd-mt-4" :js="d.code" />
          </div>
        </div>
      </div>
    </div>

    <!-- Playlist + progress (full width) -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>{{ variantDemos[2].title }}</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              {{ variantDemos[2].blurb }}
            </p>
          </div>
          <div class="vd-card-body">
            <VdMusicPlayer
              :tracks="tracks"
              :options="{ showPlaylist: true, showProgress: true }"
            />
            <DocCodeSnippet class="vd-mt-4" :js="variantDemos[2].code" />
          </div>
        </div>
      </div>
    </div>

    <!-- Layout variants: compact / sm / lg -->
    <div class="vd-row vd-mb-6">
      <div
        v-for="d in variantDemos.slice(3, 6)"
        :key="d.key"
        class="vd-col-12 vd-col-md-4 vd-mb-6"
      >
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header">
            <h6>{{ d.title }}</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">{{ d.blurb }}</p>
          </div>
          <div class="vd-card-body">
            <VdMusicPlayer :tracks="tracks" :options="{}" :class="d.cls" />
            <DocCodeSnippet class="vd-mt-4" :html="d.code" />
          </div>
        </div>
      </div>
    </div>

    <!-- Inline, all features -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>{{ variantDemos[6].title }}</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              {{ variantDemos[6].blurb }}
            </p>
          </div>
          <div class="vd-card-body">
            <VdMusicPlayer
              :tracks="tracks"
              :options="{
                showProgress: true,
                showPlaylist: true,
                shuffle: false,
                repeat: 'off',
              }"
              class="vd-music-player-inline"
            />
            <DocCodeSnippet class="vd-mt-4" :js="variantDemos[6].code" />
          </div>
        </div>
      </div>
    </div>

    <!-- Glass surface -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Glass surface</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              Add <code>glass: true</code> or the
              <code>vd-music-player-glass</code> class to any player size or
              layout. Uses the same frosted tokens as <code>vd-glass</code> in
              the core framework.
            </p>
          </div>
          <div class="vd-card-body">
            <div
              class="vd-p-4"
              style="
                border-radius: var(--vd-radius-fib-8, 0.5rem);
                background: linear-gradient(
                  120deg,
                  #ff6b6b 0%,
                  #4ecdc4 50%,
                  #45b7d1 100%
                );
                position: relative;
                overflow: hidden;
              "
            >
              <div
                style="
                  position: absolute;
                  inset: 0;
                  background:
                    radial-gradient(
                      circle at 30% 30%,
                      rgba(255, 255, 255, 0.4) 0%,
                      transparent 50%
                    ),
                    radial-gradient(
                      circle at 70% 70%,
                      rgba(255, 215, 0, 0.3) 0%,
                      transparent 40%
                    );
                "
              ></div>
              <VdMusicPlayer
                :tracks="tracks"
                :options="{ showProgress: true, glass: true }"
              />
            </div>
            <DocCodeSnippet
              class="vd-mt-4"
              :js="`VanduoMusicPlayer.initPlayer(el, { tracks, showProgress: true, glass: true });`"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Detachable: fixed corners + draggable -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header">
            <h6>Detachable — fixed corners</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              <code>detachable: true</code>, <code>minimizable: true</code>,
              <code>draggable: false</code>. Snap to a corner via
              <code>floatingPosition</code> or
              <code>detach(el, position)</code>.
            </p>
          </div>
          <div class="vd-card-body">
            <VdMusicPlayer
              ref="detachFixedRef"
              :tracks="tracks"
              :options="{
                showProgress: true,
                detachable: true,
                draggable: false,
                minimizable: true,
                floatingPosition: 'bottom-right',
                persistPosition: true,
                persistKey: 'vd2-mp-fixed',
              }"
            />
            <div class="vd-mt-4 vd-d-flex vd-gap-2 vd-flex-wrap">
              <button
                type="button"
                class="vd-btn vd-btn-primary vd-btn-sm"
                @click="detachFixed('bottom-left')"
              >
                <i class="ph ph-arrows-out"></i> Detach bottom-left
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-primary vd-btn-sm"
                @click="detachFixed('top-right')"
              >
                <i class="ph ph-arrows-out"></i> Detach top-right
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-secondary vd-btn-sm"
                @click="attachFixed()"
              >
                <i class="ph ph-arrows-in"></i> Attach back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header">
            <h6>Detachable — draggable</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              <code>draggable: true</code> adds a drag handle when floating.
              Still supports minimize/expand. Free positioning overrides corner
              presets.
            </p>
          </div>
          <div class="vd-card-body">
            <VdMusicPlayer
              ref="detachDragRef"
              :tracks="tracks"
              :options="{
                showProgress: true,
                showPlaylist: true,
                detachable: true,
                draggable: true,
                minimizable: true,
                floatingPosition: 'bottom-right',
                persistPosition: true,
                persistKey: 'vd2-mp-drag',
              }"
              class="vd-music-player-sm"
            />
            <div class="vd-mt-4 vd-d-flex vd-gap-2 vd-flex-wrap">
              <button
                type="button"
                class="vd-btn vd-btn-primary vd-btn-sm"
                @click="detachAndMinimize"
              >
                <i class="ph ph-arrows-out"></i> Detach &amp; minimize
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-secondary vd-btn-sm"
                @click="expandDrag"
              >
                <i class="ph ph-arrows-in-line-vertical"></i> Expand
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-secondary vd-btn-sm"
                @click="attachDrag"
              >
                <i class="ph ph-arrows-in"></i> Attach back
              </button>
            </div>
            <DocCodeSnippet
              class="vd-mt-4"
              :js="`VanduoMusicPlayer.initPlayer(el, { tracks, showProgress: true, showPlaylist: true, detachable: true, draggable: true, minimizable: true });
VanduoMusicPlayer.detach(el, 'bottom-right');
VanduoMusicPlayer.minimize(el);
VanduoMusicPlayer.attach(el);`"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Programmatic API + Live event log -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header">
            <h6>Programmatic API</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              Drive the player through the exposed
              <code>player</code> instance.
            </p>
          </div>
          <div class="vd-card-body">
            <VdMusicPlayer
              ref="progRef"
              :tracks="tracks"
              :options="{ showProgress: true, showPlaylist: true }"
              @trackchange="refreshProgState"
              @play="refreshProgState"
              @pause="refreshProgState"
              @volumechange="refreshProgState"
              @repeatchange="refreshProgState"
            />
            <p class="vd-text-sm vd-mt-4 vd-mb-2">
              <strong>State:</strong> <code>{{ progState }}</code>
            </p>
            <div class="vd-d-flex vd-gap-2 vd-flex-wrap">
              <button
                type="button"
                class="vd-btn vd-btn-outline vd-btn-sm"
                @click="progPlay"
              >
                <i class="ph ph-play"></i> Play
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline vd-btn-sm"
                @click="progPause"
              >
                <i class="ph ph-pause"></i> Pause
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline vd-btn-sm"
                @click="progPrev"
              >
                <i class="ph ph-skip-back"></i> Prev
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline vd-btn-sm"
                @click="progNext"
              >
                <i class="ph ph-skip-forward"></i> Next
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline vd-btn-sm"
                @click="progTrack(0)"
              >
                Track 1
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline vd-btn-sm"
                @click="progTrack(2)"
              >
                Track 3
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline vd-btn-sm"
                @click="progVol(0.25)"
              >
                Vol 25%
              </button>
              <button
                type="button"
                class="vd-btn vd-btn-outline vd-btn-sm"
                @click="progVol(0.75)"
              >
                Vol 75%
              </button>
            </div>
            <DocCodeSnippet class="vd-mt-4" :js="programmaticSnippet" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6 vd-mb-6">
        <div class="vd-card vd-card-glow demo-card" style="height: 100%">
          <div class="vd-card-header">
            <h6>Live event log</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              All 10 player emits are captured here in real time.
            </p>
          </div>
          <div class="vd-card-body">
            <VdMusicPlayer
              :tracks="tracks"
              :options="{
                showProgress: true,
                showPlaylist: true,
                detachable: true,
                minimizable: true,
              }"
              @play="onLogged('play')"
              @pause="onLogged('pause')"
              @trackchange="(d: unknown) => onLogged('trackchange', d)"
              @volumechange="(d: unknown) => onLogged('volumechange', d)"
              @repeatchange="(d: unknown) => onLogged('repeatchange', d)"
              @ended="onLogged('ended')"
              @detach="onLogged('detach')"
              @attach="onLogged('attach')"
              @minimize="onLogged('minimize')"
              @expand="onLogged('expand')"
            />
            <div
              class="vd-d-flex vd-align-items-center vd-justify-content-between vd-mt-4 vd-mb-2"
            >
              <span class="vd-text-sm vd-text-muted"
                >Most recent {{ logEntries.length }} event(s):</span
              >
              <button
                type="button"
                class="vd-btn vd-btn-sm vd-btn-outline"
                @click="clearLog"
              >
                Clear
              </button>
            </div>
            <ul
              class="vd-mb-0"
              style="
                list-style: none;
                padding: 0;
                max-height: 180px;
                overflow-y: auto;
              "
            >
              <li
                v-for="(e, i) in logEntries"
                :key="`${e.time}-${i}-${e.type}`"
                class="vd-text-sm vd-mb-1"
              >
                <code>{{ e.time }}</code>
                <span class="vd-badge vd-badge-secondary vd-ml-2">{{
                  e.type
                }}</span>
                <span v-if="e.detail" class="vd-text-muted vd-ml-2">{{
                  e.detail
                }}</span>
              </li>
              <li
                v-if="logEntries.length === 0"
                class="vd-text-sm vd-text-muted"
              >
                No events yet — interact with the player above.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- API reference -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-list-dashes mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >API Reference
        </h6>
      </div>
      <div class="vd-card-body">
        <h4>Install</h4>
        <DocCodeSnippet :shell="installShell" />

        <h4 class="vd-mt-6">Usage</h4>
        <EngineSwitch>
          <template #vue3
            ><DocCodeSnippet :html="vue3Usage" :default-open="true"
          /></template>
          <template #vanilla>
            <DocCodeSnippet :js="vanillaJs" :default-open="true" />
            <DocCodeSnippet :html="vanillaHtml" />
          </template>
        </EngineSwitch>

        <EngineSwitch>
          <template #vue3>
            <h4 class="vd-mt-6">Component API</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Prop / event</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in vue3Api" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template #vanilla>
            <h4 class="vd-mt-6">Programmatic API</h4>
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in programmaticApi" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>{{ row[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </EngineSwitch>

        <h4 class="vd-mt-6">Options</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Option</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in optionsTable" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
                <td>
                  <code>{{ row[2] }}</code>
                </td>
                <td>{{ row[3] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Events</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in events" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <DocCodeSnippet class="vd-mt-4" :js="eventsSnippet" />

        <h4 class="vd-mt-6">CSS Variables</h4>
        <DocCodeSnippet :css="cssVars" />

        <h4 class="vd-mt-6">
          <i
            class="ph ph-wheelchair mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >Accessibility
        </h4>
        <ul>
          <li>
            The container is a <code>role="region"</code> labeled
            <strong>Music Player</strong>; transport controls sit in a
            <code>role="group"</code> labeled
            <strong>Playback controls</strong>.
          </li>
          <li>
            Buttons expose <code>aria-label</code> text (Play/Pause,
            Previous/Next, Volume, Seek, playlist toggle with
            <code>aria-expanded</code>, shuffle and repeat with
            <code>aria-pressed</code>). Repeat uses labels
            <strong>Repeat</strong>, <strong>Repeat one</strong>, and
            <strong>Repeat all</strong>; repeat-one shows a visible
            <code>1</code> badge.
          </li>
          <li>
            The current track name uses <code>aria-live="polite"</code> and
            <code>aria-atomic="true"</code> so screen readers announce track
            changes.
          </li>
          <li>
            Playlist items set <code>aria-current</code> on the active row;
            decorative icons use <code>aria-hidden="true"</code>.
          </li>
          <li>
            Play/Pause supports <kbd>Space</kbd> and <kbd>Enter</kbd> on the
            play button; range inputs are keyboard-focusable with visible
            <code>:focus-visible</code> outlines.
          </li>
          <li>
            Floating toolbar controls include descriptive
            <code>aria-label</code> values; minimize toggles
            <code>aria-expanded</code>.
          </li>
          <li>
            Glass and floating transitions respect
            <code>prefers-reduced-transparency</code> and
            <code>prefers-reduced-motion</code>.
          </li>
        </ul>
      </div>
    </div>

    <!-- Attribution -->
    <div class="vd-row vd-mt-6">
      <div class="vd-col-12">
        <div class="vd-alert vd-alert-info">
          <i class="ph ph-music-notes"></i>
          <div>
            <strong>Attribution — bundled demo audio</strong>
            <p class="vd-mb-0 vd-mt-1">
              A curated track set from
              <a
                href="https://stellardrone.bandcamp.com/"
                target="_blank"
                rel="noopener noreferrer"
                >Stellardrone</a
              >, from the album <em>Invent the Universe</em>. Source:
              <a
                href="https://stellardrone.bandcamp.com/album/invent-the-universe"
                target="_blank"
                rel="noopener noreferrer"
                >Bandcamp</a
              >. Licensed under
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                >CC BY 4.0</a
              >. No changes were made to the bundled audio files.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
