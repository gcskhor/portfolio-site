import { useEffect, useState } from "react";

// priority:
// stored setting > system setting > light mode

export const THEMES = ["light", "dark", "system"] as const;
export type Theme = (typeof THEMES)[number]; // "light" | "dark" | "system"

const LOCAL_STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function isTheme(value: unknown): value is Theme {
  return (
    typeof value === "string" && (THEMES as readonly string[]).includes(value)
  );
}

function getStoredTheme(): Theme | null {
  const theme = localStorage.getItem(LOCAL_STORAGE_KEY);
  return isTheme(theme) ? theme : null;
}

export function useTheme() {
  // Lazy initializer: React calls this once on mount.
  // Passing the value directly would re-read localStorage on every render and discard the result.
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? "system");
  const [systemIsDark] = useState(() => window.matchMedia(DARK_QUERY).matches);
  const isDark = theme === "dark" || (theme === "system" && systemIsDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function updateTheme(theme: Theme) {
    setTheme(theme);
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);
  }

  return {
    theme,
    updateTheme,
  };
}
