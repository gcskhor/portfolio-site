import { createContext, use } from "react";
import { useTheme } from "./hooks/useTheme";

type ThemeContextValue = ReturnType<typeof useTheme>;

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeContext(): ThemeContextValue {
  const value = use(ThemeContext);
  if (!value) {
    throw new Error("useThemeContext must be called inside a <ThemeProvider>");
  }
  return value;
}
