"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import {
  applyTheme,
  DAISY_THEMES,
  getStoredTheme,
  THEME_LABELS,
  type DaisyTheme,
} from "@/components/themes";

type ThemeSelectorProps = {
  className?: string;
  compact?: boolean;
  /** Solid select on the navy header */
  onPrimaryHeader?: boolean;
};

export function ThemeSelector({
  className = "",
  compact = false,
  onPrimaryHeader = false,
}: ThemeSelectorProps) {
  const [theme, setTheme] = useState<DaisyTheme>("concert");

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  function handleChange(next: string) {
    const value = next as DaisyTheme;
    setTheme(value);
    applyTheme(value);
  }

  const selectClass = [
    "theme-select-solid",
    "select select-bordered select-sm w-full bg-base-100 text-base-content border-base-300",
    onPrimaryHeader ? "shadow-sm" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={`form-control w-full max-w-xs ${className}`}>
      {!compact && (
        <div className="label">
          <span className="label-text flex items-center gap-2">
            <Palette className="h-4 w-4" aria-hidden />
            Theme
          </span>
        </div>
      )}
      <select
        className={selectClass}
        value={theme}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Choose app theme"
      >
        {DAISY_THEMES.map((item) => (
          <option key={item} value={item} className="bg-base-100 text-base-content">
            {THEME_LABELS[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
