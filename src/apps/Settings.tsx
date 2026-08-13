import { useThemeContext } from "../ThemeContext";
import { THEMES, type Theme } from "../hooks/useTheme";

export default function Settings() {
  const { theme, updateTheme } = useThemeContext();

  return (
    <div className="px-4.5 py-4 text-left">
      <label className="mb-2 block text-[10.5px] tracking-[0.14em] text-muted uppercase">
        Theme
      </label>

      <div className="relative">
        <select
          id="settings-appearance"
          value={theme}
          onChange={(e) => updateTheme(e.target.value as Theme)}
          className="w-full cursor-pointer appearance-none rounded-[7px] border border-divider bg-chip-bg py-2.25 pr-7.5 pl-2.75 text-sm text-fg hover:border-accent/40 focus:border-accent focus:outline-2 focus:outline-offset-2 focus:outline-accent"
        >
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        {/* Custom caret — clicks fall through to the select */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.25 -translate-y-1/2 text-muted"
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
            <path d="M0 0l5 6 5-6z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
