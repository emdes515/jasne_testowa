import { useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light' | 'system';

export const THEME_STORAGE_KEY = 'jasne_theme_mode';

const THEME_CHANGE_EVENT = 'jasne:theme-change';

/**
 * Returns the currently stored user theme mode ('dark' | 'light' | 'system').
 * Defaults to 'dark' (Nocturne Luminary) if nothing is saved.
 */
export function getStoredThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // localStorage not accessible
  }
  return 'dark';
}

/**
 * Resolves whether the active visual presentation should be 'dark' or 'light',
 * considering the system OS preference when mode is 'system'.
 */
export function getResolvedTheme(mode: ThemeMode = getStoredThemeMode()): 'dark' | 'light' {
  if (mode === 'light') return 'light';
  if (mode === 'dark') return 'dark';
  if (typeof window !== 'undefined' && window.matchMedia) {
    const isSystemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return isSystemLight ? 'light' : 'dark';
  }
  return 'dark';
}

/**
 * Applies the given theme mode to the DOM:
 * - Sets data-theme="light" | "dark" on document.documentElement
 * - Toggles 'light' and 'dark' classes on html
 * - Dispatches custom event for reactive subscribers
 */
export function applyTheme(mode: ThemeMode): void {
  if (typeof document === 'undefined') return;
  const resolved = getResolvedTheme(mode);
  const root = document.documentElement;

  root.setAttribute('data-theme', resolved);
  if (resolved === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
  }

  // Update meta theme-color for mobile address bar
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const targetColor = resolved === 'light' ? '#F8F9FC' : '#070A0F';
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', targetColor);
  }

  // Notify listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { mode, resolved } }));
  }
}

/**
 * Persists the chosen theme mode to localStorage and applies it.
 */
export function setThemeMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // ignore
  }
  applyTheme(mode);
}

/**
 * Initializes theme on app startup, listening for system color scheme shifts
 * when user is on 'system' mode. Returns a teardown function.
 */
export function initTheme(): () => void {
  if (typeof window === 'undefined') return () => {};

  const currentMode = getStoredThemeMode();
  applyTheme(currentMode);

  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  const handleSystemChange = () => {
    if (getStoredThemeMode() === 'system') {
      applyTheme('system');
    }
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleSystemChange);
  } else {
    mediaQuery.addListener(handleSystemChange);
  }

  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', handleSystemChange);
    } else {
      mediaQuery.removeListener(handleSystemChange);
    }
  };
}

/**
 * Quick toggler between light and dark modes.
 */
export function toggleThemeMode(): void {
  const current = getResolvedTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setThemeMode(next);
}

/**
 * React hook to read and update theme state with instant reactivity.
 */
export function useTheme(): {
  themeMode: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
} {
  const [themeMode, setMode] = useState<ThemeMode>(() => getStoredThemeMode());
  const [resolvedTheme, setResolved] = useState<'dark' | 'light'>(() => getResolvedTheme(getStoredThemeMode()));

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: ThemeMode; resolved: 'dark' | 'light' }>;
      if (customEvent.detail) {
        setMode(customEvent.detail.mode);
        setResolved(customEvent.detail.resolved);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handler);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handler);
  }, []);

  const handleSetTheme = (newMode: ThemeMode) => {
    setThemeMode(newMode);
    setMode(newMode);
    setResolved(getResolvedTheme(newMode));
  };

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    handleSetTheme(next);
  };

  return {
    themeMode,
    resolvedTheme,
    setTheme: handleSetTheme,
    toggleTheme,
  };
}
