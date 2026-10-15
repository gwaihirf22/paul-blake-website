import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

// The <html data-theme> attribute is the single source of truth. The bootstrap
// script in pages/_document.js sets it before first paint; this provider reads
// it, lets components change it, and persists the choice.
const STORAGE_KEY = "theme";
const THEME_COLOR = { light: "#f8fafc", dark: "#0f172a" };

const ThemeContext = createContext({ theme: null, setTheme: () => {}, toggle: () => {} });

function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  const t = document.documentElement.dataset.theme;
  return t === "light" || t === "dark" ? t : null;
}

// Server render and first client render both see null, so markup matches.
function getServerSnapshot() {
  return null;
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLOR[theme]));
}

function storedTheme() {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next) => {
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice lasts for this page view only.
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  }, [setTheme]);

  // Follow OS changes only while the visitor has not chosen explicitly.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (!storedTheme()) applyTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, setTheme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
