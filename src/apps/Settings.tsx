import { useThemeContext } from "../ThemeContext";
import { THEMES, type Theme } from "../hooks/useTheme";

export default function Settings() {
  const { theme, updateTheme } = useThemeContext();

  return (
    <>
      <div>Theme</div>
      <select
        value={theme}
        onChange={(e) => updateTheme(e.target.value as Theme)}
      >
        {THEMES.map((t) => (
          <option value={t} key={t}>
            {t}
          </option>
        ))}
      </select>
    </>
  );
}
