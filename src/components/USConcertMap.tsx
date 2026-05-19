"use client";

import { useMemo, useState } from "react";
import usaMap from "@svg-maps/usa";
import { Map } from "lucide-react";
import type { Concert } from "@/types/concert";
import {
  ABBR_TO_NAME,
  getConcertCountByState,
  getVisitedStateAbbrs,
} from "@/lib/us-states";
import { useChartPalette } from "@/hooks/useChartPalette";
import { SectionCard } from "@/components/SectionCard";

type USConcertMapProps = {
  concerts: Concert[];
};

export function USConcertMap({ concerts }: USConcertMapProps) {
  const palette = useChartPalette();
  const visited = useMemo(() => getVisitedStateAbbrs(concerts), [concerts]);
  const counts = useMemo(() => getConcertCountByState(concerts), [concerts]);
  const [hoveredAbbr, setHoveredAbbr] = useState<string | null>(null);

  const hoveredLabel = hoveredAbbr
    ? `${ABBR_TO_NAME[hoveredAbbr] ?? hoveredAbbr}${
        counts.has(hoveredAbbr)
          ? ` — ${counts.get(hoveredAbbr)} concert${counts.get(hoveredAbbr) === 1 ? "" : "s"}`
          : ""
      }`
    : visited.size > 0
      ? `${visited.size} state${visited.size === 1 ? "" : "s"} with concerts`
      : "Add concerts to highlight states on the map";

  return (
    <SectionCard
      title="Concert states"
      description="States with concerts match the header color; other states use your theme surface color."
      icon={Map}
    >
      <p className="min-h-[1.25rem] text-sm font-medium leading-relaxed text-base-content/80">
        {hoveredLabel}
      </p>

      <svg
        viewBox={usaMap.viewBox}
        className="mx-auto w-full max-h-[420px]"
        role="img"
        aria-label="Map of the United States showing states where you have attended concerts"
      >
        <title>US concert map</title>
        {usaMap.locations.map((location) => {
          const abbr = location.id.toUpperCase();
          const isVisited = visited.has(abbr);

          return (
            <path
              key={location.id}
              d={location.path}
              fill={isVisited ? palette.bar : palette.mapUnvisited}
              stroke={palette.mapStroke}
              strokeWidth={0.75}
              className="transition-all duration-150 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label={location.name}
              onMouseEnter={() => setHoveredAbbr(abbr)}
              onMouseLeave={() => setHoveredAbbr(null)}
              onFocus={() => setHoveredAbbr(abbr)}
              onBlur={() => setHoveredAbbr(null)}
              tabIndex={0}
            />
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-6 text-sm leading-relaxed">
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-4 w-6 rounded-sm border border-base-300"
            style={{ backgroundColor: palette.bar }}
            aria-hidden
          />
          State with concerts
        </span>
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-4 w-6 rounded-sm border border-base-300"
            style={{ backgroundColor: palette.mapUnvisited }}
            aria-hidden
          />
          No concerts yet
        </span>
      </div>
    </SectionCard>
  );
}
