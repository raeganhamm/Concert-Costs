"use client";

import { useEffect, useState } from "react";
import { getChartPalette, type ChartPalette } from "@/lib/chart-styles";

export function useChartPalette(): ChartPalette {
  const [palette, setPalette] = useState<ChartPalette>(() => getChartPalette());

  useEffect(() => {
    const update = () => setPalette(getChartPalette());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return palette;
}
