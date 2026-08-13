import { type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import { useTheme } from "./hooks/useTheme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useTheme();
  return <ThemeContext value={value}>{children}</ThemeContext>;
}
