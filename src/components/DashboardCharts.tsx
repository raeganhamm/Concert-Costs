"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Concert } from "@/types/concert";
import {
  categoryTotals,
  formatCurrency,
  funPointsPer100,
  totalCost,
} from "@/lib/concert-metrics";
import { chartMargin, getAxisTickStyle, getTooltipStyle } from "@/lib/chart-styles";
import { useChartPalette } from "@/hooks/useChartPalette";
import { SectionCard } from "@/components/SectionCard";
import { BarChart3 } from "lucide-react";

type DashboardChartsProps = {
  concerts: Concert[];
};

export function DashboardCharts({ concerts }: DashboardChartsProps) {
  const palette = useChartPalette();
  const axisTick = getAxisTickStyle(palette);
  const tooltip = getTooltipStyle(palette);
  const barProps = {
    fill: palette.bar,
    radius: [6, 6, 0, 0] as [number, number, number, number],
    activeBar: { fill: palette.barActive },
  };

  const categoryData = categoryTotals(concerts);
  const byConcert = concerts.map((c) => ({
    name: c.concert_name.length > 18 ? `${c.concert_name.slice(0, 16)}…` : c.concert_name,
    fullName: c.concert_name,
    total: totalCost(c),
    fun: c.fun_rating,
    funPer100: funPointsPer100(c) ?? 0,
  }));

  if (concerts.length === 0) return null;

  const charts = [
    { title: "Spending by cost category", data: categoryData, dataKey: "total" as const, yFormat: (v: number) => `$${v}` },
    { title: "Total cost by concert", data: byConcert, dataKey: "total" as const, yFormat: (v: number) => `$${v}`, fullName: true },
    { title: "Fun rating by concert", data: byConcert, dataKey: "fun" as const, domain: [0, 10] as [number, number], fullName: true },
    { title: "Fun Points per $100 by concert", data: byConcert, dataKey: "funPer100" as const, valueFormat: (v: number) => v.toFixed(2), fullName: true },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {charts.map((chart) => (
        <SectionCard key={chart.title} title={chart.title} icon={BarChart3}>
          <div className="overflow-x-auto -mx-1 px-1">
            <div className="min-w-[280px] w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chart.data} margin={chartMargin}>
                  <CartesianGrid
                    stroke={palette.grid}
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    angle={-25}
                    textAnchor="end"
                    height={72}
                    interval={0}
                    tick={axisTick}
                    tickMargin={10}
                  />
                  <YAxis
                    domain={chart.domain}
                    tick={axisTick}
                    tickMargin={8}
                    tickFormatter={chart.yFormat}
                  />
                  <Tooltip
                    formatter={(value) =>
                      chart.valueFormat
                        ? chart.valueFormat(Number(value))
                        : formatCurrency(Number(value))
                    }
                    labelFormatter={
                      chart.fullName
                        ? (_, payload) => payload?.[0]?.payload?.fullName ?? ""
                        : undefined
                    }
                    {...tooltip}
                  />
                  <Bar dataKey={chart.dataKey} {...barProps} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}
