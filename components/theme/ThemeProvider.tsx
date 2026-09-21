"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { THEME_STORAGE_KEY } from "./theme-script";

export type Theme = "light" | "dark";

const THEME_EVENT = "synceri:themechange";

type ThemeContextValue = {
  theme: Theme;
  /** True until hydration completes, so SSR output stays theme-neutral. */
  pending: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* --------------------------------------------------------------------------
   The <html data-theme> attribute is the source of truth — it is set before
   first paint by ThemeScript, so React subscribes to it rather than owning it.
   -------------------------------------------------------------------------- */

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

const getServerSnapshot = (): Theme => "dark";

function applyTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  window.dispatchEvent(new Event(THEME_EVENT));
}

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

const noopSubscribe = () => () => {};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  // Honour OS changes until the user makes an explicit choice. This only
  // writes to an external system (the DOM), which then notifies the store.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) return;
      applyTheme(event.matches ? "light" : "dark");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* private mode — the theme still applies for this session */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(getSnapshot() === "light" ? "dark" : "light");
  }, [setTheme]);

  const value = useMemo(
    () => ({ theme, pending: !hydrated, setTheme, toggleTheme }),
    [theme, hydrated, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
