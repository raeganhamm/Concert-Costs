"use client";

import type { Concert } from "@/types/concert";
import {
  bestValueConcert,
  costPerHour,
  formatCurrency,
  funPointsPer100,
  highestFunConcert,
  mostExpensiveConcert,
  totalCost,
} from "@/lib/concert-metrics";
import { StaggerItem } from "@/components/FadeIn";
import { sectionCardClassName } from "@/lib/ui-classes";

type DashboardStatsProps = {
  concerts: Concert[];
};

export function DashboardStats({ concerts }: DashboardStatsProps) {
  const count = concerts.length;
  const totalSpent = concerts.reduce((sum, c) => sum + totalCost(c), 0);
  const avgCost = count > 0 ? totalSpent / count : 0;
  const avgFun = count > 0 ? concerts.reduce((s, c) => s + c.fun_rating, 0) / count : 0;

  const hourValues = concerts
    .map((c) => costPerHour(c))
    .filter((v): v is number => v !== null);
  const avgCostPerHour =
    hourValues.length > 0 ? hourValues.reduce((a, b) => a + b, 0) / hourValues.length : 0;

  const best = bestValueConcert(concerts);
  const expensive = mostExpensiveConcert(concerts);
  const mostFun = highestFunConcert(concerts);

  const stats = [
    { title: "Total concerts", value: String(count), desc: "Shows logged" },
    { title: "Total spent", value: formatCurrency(totalSpent), desc: "All concerts" },
    { title: "Avg cost / concert", value: formatCurrency(avgCost), desc: "Per show" },
    { title: "Avg fun rating", value: count > 0 ? avgFun.toFixed(1) : "—", desc: "Out of 10" },
    {
      title: "Avg cost / hour",
      value: hourValues.length > 0 ? formatCurrency(avgCostPerHour) : "—",
      desc: "Across shows",
    },
    {
      title: "Best value",
      value: best ? best.concert_name : "—",
      desc: best
        ? `${(funPointsPer100(best) ?? 0).toFixed(2)} Fun Points per $100`
        : "Add concerts with costs",
    },
    {
      title: "Most expensive",
      value: expensive ? expensive.concert_name : "—",
      desc: expensive ? formatCurrency(totalCost(expensive)) : "—",
    },
    {
      title: "Highest fun",
      value: mostFun ? mostFun.concert_name : "—",
      desc: mostFun ? `${mostFun.fun_rating}/10` : "—",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <StaggerItem key={stat.title} index={index}>
          <div className={`${sectionCardClassName} h-full`}>
            <div className="card-body p-5">
              <div className="stat-title text-xs font-medium uppercase tracking-wide opacity-70">
                {stat.title}
              </div>
              <div className="stat-value text-lg font-semibold break-words mt-1">
                {stat.value}
              </div>
              <div className="stat-desc text-sm leading-relaxed mt-1">{stat.desc}</div>
            </div>
          </div>
        </StaggerItem>
      ))}
    </div>
  );
}

