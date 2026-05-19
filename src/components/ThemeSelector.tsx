"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import {
  applyTheme,
  DAISY_THEMES,
  getStoredTheme,
  type DaisyTheme,
} from "@/components/themes";

type ThemeSelectorProps = {
  className?: string;
  compact?: boolean;
};

export function ThemeSelector({ className = "", compact = false }: ThemeSelectorProps) {
  const [theme, setTheme] = useState<DaisyTheme>("light");

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  function handleChange(next: string) {
    const value = next as DaisyTheme;
    setTheme(value);
    applyTheme(value);
  }

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
        className="select select-bordered select-sm w-full capitalize"
        value={theme}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Choose app theme"
      >
        {DAISY_THEMES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

