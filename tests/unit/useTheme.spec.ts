import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import {
  applyPreference,
  defaultPreference,
  loadPreference,
} from "@vanduo-oss/vue";
import { useThemeStore } from '@/stores/theme';

const clearThemeAttrs = (): void => {
  for (const attr of ['data-palette', 'data-theme', 'data-primary', 'data-neutral', 'data-radius', 'data-font']) {
    document.documentElement.removeAttribute(attr);
  }
};

describe('useTheme model', () => {
  beforeEach(() => {
    window.localStorage.clear();
    clearThemeAttrs();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not throw and returns defaults without window (SSR)', () => {
    const originalWindow = globalThis.window;
    try {
      delete (globalThis as { window?: unknown }).window;
      const prefs = loadPreference();
      expect(prefs).toEqual(defaultPreference());
    } finally {
      (globalThis as { window?: unknown }).window = originalWindow;
    }
  });

  it('applies framework-faithful defaults', () => {
    applyPreference(defaultPreference());
    // theme "system" removes data-theme; primary defaults to black on light OS.
    expect(document.documentElement.getAttribute('data-palette')).toBe('open-color');
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    expect(document.documentElement.getAttribute('data-neutral')).toBe('charcoal');
    expect(document.documentElement.getAttribute('data-radius')).toBe('0.5');
    expect(document.documentElement.getAttribute('data-font')).toBe('ubuntu');
  });

  it('defaults the palette to Open Color', () => {
    expect(defaultPreference().palette).toBe('open-color');
  });

  it('restores a stored preference', () => {
    window.localStorage.setItem('vanduo-palette', 'open-color');
    window.localStorage.setItem('vanduo-theme-preference', 'dark');
    window.localStorage.setItem('vanduo-primary-color', 'blue');
    window.localStorage.setItem('vanduo-neutral-color', 'slate');
    window.localStorage.setItem('vanduo-radius', '0.25');
    window.localStorage.setItem('vanduo-font-preference', 'lato');
    const prefs = loadPreference();
    applyPreference(prefs);
    expect(document.documentElement.getAttribute('data-palette')).toBe('open-color');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-primary')).toBe('blue');
    expect(document.documentElement.getAttribute('data-neutral')).toBe('slate');
    expect(document.documentElement.getAttribute('data-radius')).toBe('0.25');
    expect(document.documentElement.getAttribute('data-font')).toBe('lato');
  });

  it('falls back to the default palette for an unknown stored value', () => {
    window.localStorage.setItem('vanduo-palette', 'bogus');
    expect(loadPreference().palette).toBe('open-color');
  });
});

describe('useThemeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.localStorage.clear();
    clearThemeAttrs();
  });

  it('persists setTheme to localStorage and the DOM', () => {
    const theme = useThemeStore();
    theme.init();
    theme.setTheme('dark');
    expect(window.localStorage.getItem('vanduo-theme-preference')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('persists setPalette to localStorage and the DOM', () => {
    const theme = useThemeStore();
    theme.init();
    theme.setPalette('open-color');
    expect(theme.palette).toBe('open-color');
    expect(window.localStorage.getItem('vanduo-palette')).toBe('open-color');
    expect(document.documentElement.getAttribute('data-palette')).toBe('open-color');
  });

  it('reset returns to defaults', () => {
    const theme = useThemeStore();
    theme.init();
    theme.setPrimary('rose');
    expect(theme.primary).toBe('rose');
    theme.setPalette('open-color');
    theme.reset();
    expect(theme.theme).toBe('system');
    expect(theme.radius).toBe('0.5');
    expect(theme.palette).toBe('open-color');
  });
});
