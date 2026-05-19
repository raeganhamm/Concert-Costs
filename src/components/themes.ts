export const DAISY_THEMES = [
  "concert",
  "concert-dark",
  "light",
  "dark",
  "cupcake",
  "synthwave",
  "forest",
] as const;

export type DaisyTheme = (typeof DAISY_THEMES)[number];

export const THEME_LABELS: Record<DaisyTheme, string> = {
  concert: "Ocean Light",
  "concert-dark": "Ocean Dark",
  light: "Light",
  dark: "Dark",
  cupcake: "Cupcake",
  synthwave: "Synthwave",
  forest: "Forest",
};

export const THEME_STORAGE_KEY = "concert-cost-tracker-theme";

export function getStoredTheme(): DaisyTheme {
  if (typeof window === "undefined") return "concert";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored && DAISY_THEMES.includes(stored as DaisyTheme)) {
    return stored as DaisyTheme;
  }
  return "concert";
}

export function applyTheme(theme: DaisyTheme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
