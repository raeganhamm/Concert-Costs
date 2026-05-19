export type ChartPalette = {
  bar: string;
  barActive: string;
  axis: string;
  grid: string;
  mapUnvisited: string;
};

const THEME_PALETTES: Record<string, ChartPalette> = {
  light: {
    bar: "#2563eb",
    barActive: "#1d4ed8",
    axis: "#64748b",
    grid: "#e2e8f0",
    mapUnvisited: "#9ca3af",
  },
  dark: {
    bar: "#60a5fa",
    barActive: "#3b82f6",
    axis: "#94a3b8",
    grid: "#334155",
    mapUnvisited: "#475569",
  },
  cupcake: {
    bar: "#65c3c8",
    barActive: "#4aa8ad",
    axis: "#6b5b6e",
    grid: "#efe4e8",
    mapUnvisited: "#b8a9b4",
  },
  synthwave: {
    bar: "#e779c1",
    barActive: "#d45faf",
    axis: "#cad5e2",
    grid: "#45345a",
    mapUnvisited: "#5a4a6e",
  },
  forest: {
    bar: "#1eb854",
    barActive: "#179443",
    axis: "#5c6b64",
    grid: "#d5e0d8",
    mapUnvisited: "#8fa396",
  },
};

export function getChartPalette(themeName?: string | null): ChartPalette {
  const theme =
    themeName ??
    (typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme")
      : null) ??
    "light";
  return THEME_PALETTES[theme] ?? THEME_PALETTES.light;
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
