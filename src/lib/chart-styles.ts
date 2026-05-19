export type ChartPalette = {
  /** Bars, pie “spent”, and visited map states — matches header (primary) */
  bar: string;
  barActive: string;
  axis: string;
  grid: string;
  /** Unvisited map states */
  mapUnvisited: string;
  /** Pie “remaining” / unused slice — matches page background (base-200) */
  pieRemaining: string;
  mapStroke: string;
};

type PaletteFallback = ChartPalette;

/** SSR fallbacks: bar = each theme’s primary (same as navbar) */
const THEME_PALETTES: Record<string, PaletteFallback> = {
  concert: {
    bar: "#004e64",
    barActive: "#004e64",
    axis: "#004e64",
    grid: "#d0e4f2",
    mapUnvisited: "#d0e4f2",
    pieRemaining: "#e8f2fa",
    mapStroke: "#f4f9fd",
  },
  "concert-dark": {
    bar: "#00a5cf",
    barActive: "#00a5cf",
    axis: "#d4fbf0",
    grid: "#004e64",
    mapUnvisited: "#004e64",
    pieRemaining: "#003848",
    mapStroke: "#002a36",
  },
  light: {
    bar: "#570df8",
    barActive: "#570df8",
    axis: "#1f2937",
    grid: "#e5e7eb",
    mapUnvisited: "#e5e7eb",
    pieRemaining: "#f2f2f2",
    mapStroke: "#ffffff",
  },
  dark: {
    bar: "#661ae6",
    barActive: "#661ae6",
    axis: "#a6adbb",
    grid: "#374151",
    mapUnvisited: "#374151",
    pieRemaining: "#191e24",
    mapStroke: "#1d232a",
  },
  cupcake: {
    bar: "#65c3c8",
    barActive: "#65c3c8",
    axis: "#291334",
    grid: "#efe4e8",
    mapUnvisited: "#efe4e8",
    pieRemaining: "#faf7f5",
    mapStroke: "#faf7f5",
  },
  synthwave: {
    bar: "#ff7598",
    barActive: "#ff7598",
    axis: "#e779c1",
    grid: "#45345a",
    mapUnvisited: "#45345a",
    pieRemaining: "#24153b",
    mapStroke: "#24153b",
  },
  forest: {
    bar: "#1eb854",
    barActive: "#1eb854",
    axis: "#1f2937",
    grid: "#d5e0d8",
    mapUnvisited: "#d5e0d8",
    pieRemaining: "#e9efe6",
    mapStroke: "#f9fafb",
  },
};

function readCssColor(variable: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
}

function resolveThemeName(themeName?: string | null): string {
  return (
    themeName ??
    (typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme")
      : null) ??
    "concert"
  );
}

/** Charts use header primary for data; pie remainder matches page background */
export function getChartPalette(themeName?: string | null): ChartPalette {
  const theme = resolveThemeName(themeName);
  const fb = THEME_PALETTES[theme] ?? THEME_PALETTES.concert;

  const headerPrimary = readCssColor("--color-primary", fb.bar);
  const pageBackground = readCssColor("--color-base-200", fb.pieRemaining);

  if (typeof window === "undefined") {
    return {
      ...fb,
      bar: headerPrimary,
      barActive: headerPrimary,
      pieRemaining: pageBackground,
    };
  }

  return {
    bar: headerPrimary,
    barActive: headerPrimary,
    axis: readCssColor("--color-base-content", fb.axis),
    grid: readCssColor("--color-base-300", fb.grid),
    mapUnvisited: readCssColor("--color-base-300", fb.mapUnvisited),
    pieRemaining: pageBackground,
    mapStroke: readCssColor("--color-base-100", fb.mapStroke),
  };
}

export const chartMargin = { top: 12, right: 16, left: 8, bottom: 56 };

export function getAxisTickStyle(palette: ChartPalette) {
  return {
    fontSize: 12,
    fill: palette.axis,
  };
}

export function getTooltipStyle(palette: ChartPalette) {
  return {
    contentStyle: {
      borderRadius: "8px",
      border: `1px solid ${palette.grid}`,
      backgroundColor: palette.mapStroke,
      color: palette.axis,
      boxShadow: "0 4px 12px rgb(0 0 0 / 0.12)",
      padding: "10px 14px",
      lineHeight: 1.5,
    },
    labelStyle: {
      fontWeight: 600,
      marginBottom: 6,
    },
    itemStyle: {
      paddingTop: 4,
    },
  };
}
