// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  getStoredThemeMode, 
  getResolvedTheme, 
  setThemeMode, 
  applyTheme, 
  initTheme,
  toggleThemeMode,
  THEME_STORAGE_KEY 
} from '../themeManager';

describe('themeManager', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('light', 'dark');
    vi.restoreAllMocks();
  });

  it('should default to dark mode when no preference is saved', () => {
    expect(getStoredThemeMode()).toBe('dark');
    expect(getResolvedTheme('dark')).toBe('dark');
  });

  it('should read stored theme mode from localStorage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    expect(getStoredThemeMode()).toBe('light');

    localStorage.setItem(THEME_STORAGE_KEY, 'system');
    expect(getStoredThemeMode()).toBe('system');
  });

  it('should apply light theme attributes to document.documentElement', () => {
    applyTheme('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should apply dark theme attributes to document.documentElement', () => {
    applyTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('should resolve system mode based on matchMedia preference', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('light'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    expect(getResolvedTheme('system')).toBe('light');
  });

  it('should persist chosen theme mode via setThemeMode', () => {
    setThemeMode('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    setThemeMode('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should initialize theme and clean up listeners', () => {
    const removeEventListener = vi.fn();
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener,
      dispatchEvent: vi.fn(),
    }));

    const cleanup = initTheme();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    cleanup();
    expect(removeEventListener).toHaveBeenCalled();
  });

  it('should toggle between dark and light modes via toggleThemeMode', () => {
    applyTheme('dark');
    toggleThemeMode();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    toggleThemeMode();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
