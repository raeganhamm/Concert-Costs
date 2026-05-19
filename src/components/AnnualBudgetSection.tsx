"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Wallet } from "lucide-react";
import type { Concert } from "@/types/concert";
import { useAnnualBudget } from "@/hooks/useAnnualBudget";
import { useChartPalette } from "@/hooks/useChartPalette";
import {
  budgetPercentSpent,
  budgetRemaining,
  getCurrentYear,
  yearToDateSpend,
} from "@/lib/budget-metrics";
import { formatCurrency } from "@/lib/concert-metrics";
import { SectionCard } from "@/components/SectionCard";
import { btnPrimaryClassName, inputClassName } from "@/lib/ui-classes";

const OVER_BUDGET_COLOR = "#ef4444";

type AnnualBudgetSectionProps = {
  concerts: Concert[];
};

export function AnnualBudgetSection({ concerts }: AnnualBudgetSectionProps) {
  const year = getCurrentYear();
  const palette = useChartPalette();
  const { budget, loading, saving, error, saveBudget } = useAnnualBudget(year);
  const [inputValue, setInputValue] = useState("");

  const spent = useMemo(() => yearToDateSpend(concerts, year), [concerts, year]);
  const annualBudget = budget ? Number(budget.annual_budget) : 0;
  const percentSpent = budgetPercentSpent(spent, annualBudget);
  const remaining = budgetRemaining(annualBudget, spent);
  const isOverBudget = annualBudget > 0 && spent > annualBudget;

  const chartData = useMemo(() => {
    if (annualBudget <= 0) {
      return [{ name: "No budget set", value: 1, fill: palette.mapUnvisited }];
    }

    if (isOverBudget) {
      return [{ name: "Spent", value: 100, fill: OVER_BUDGET_COLOR }];
    }

    const spentPercent = Math.min(percentSpent, 100);
    const remainingPercent = Math.max(100 - spentPercent, 0);

    return [
      { name: "Spent", value: spentPercent, fill: palette.bar },
      { name: "Remaining", value: remainingPercent, fill: palette.mapUnvisited },
    ];
  }, [annualBudget, isOverBudget, percentSpent, palette.bar, palette.mapUnvisited]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(inputValue);
    if (!Number.isFinite(amount) || amount < 0) {
      toast.error("Please enter a valid budget amount.");
      return;
    }

    const ok = await saveBudget(amount);
    if (ok) {
      toast.success(`${year} concert budget saved!`);
      setInputValue("");
    }
  }

  if (loading) {
    return (
      <div className="card bg-base-100 border border-base-300/60 shadow-sm rounded-2xl">
        <div className="card-body gap-4 animate-pulse">
          <div className="skeleton h-6 w-48" />
          <div className="skeleton h-4 w-full max-w-md" />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="skeleton h-40 w-full" />
            <div className="skeleton h-64 w-full rounded-full max-w-[260px] mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <SectionCard
      title={`${year} concert budget`}
      description="Set how much you plan to spend on concerts this year and track your progress."
      icon={Wallet}
    >
      {error && (
        <div role="alert" className="alert alert-error text-sm">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="form-control w-full max-w-xs">
          <span className="label-text font-medium">Annual budget</span>
          <label className={`${inputClassName} flex items-center gap-2 mt-1`}>
            <span className="opacity-60">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              className="grow bg-transparent border-none focus:outline-none min-h-0 h-auto p-0"
              placeholder={annualBudget > 0 ? String(annualBudget) : "e.g. 2000"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>
        </label>
        <button
          type="submit"
          className={`${btnPrimaryClassName} ${saving ? "loading" : ""}`}
          disabled={saving}
        >
          {saving ? "Saving…" : annualBudget > 0 ? "Update budget" : "Save budget"}
        </button>
      </form>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
        <div className="grid gap-4 sm:grid-cols-2">
          <BudgetStat
            label="Annual budget"
            value={annualBudget > 0 ? formatCurrency(annualBudget) : "Not set"}
          />
          <BudgetStat label="Spent this year" value={formatCurrency(spent)} />
          <BudgetStat
            label="Remaining"
            value={
              annualBudget > 0
                ? isOverBudget
                  ? `${formatCurrency(Math.abs(remaining))} over`
                  : formatCurrency(remaining)
                : "—"
            }
            highlight={isOverBudget}
          />
          <BudgetStat
            label="Percent used"
            value={annualBudget > 0 ? `${percentSpent.toFixed(1)}%` : "—"}
            highlight={isOverBudget}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-medium leading-relaxed text-base-content/80 text-center">
            {annualBudget > 0
              ? isOverBudget
                ? `Over budget by ${formatCurrency(Math.abs(remaining))}`
                : `${percentSpent.toFixed(1)}% of your ${year} budget used`
              : "Set a budget to see your spending chart"}
          </p>
          <div className="w-full min-w-[280px] min-h-[260px]">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={annualBudget > 0 && !isOverBudget ? 2 : 0}
                  animationDuration={400}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    annualBudget > 0 ? `${Number(value).toFixed(1)}%` : "—",
                    String(name),
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {annualBudget > 0 && (
            <p className="stat-number text-primary">{percentSpent.toFixed(1)}%</p>
          )}
        </div>
      </div>
    </SectionCard>
  );
}

function BudgetStat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="surface-nested px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide opacity-70 leading-relaxed">
        {label}
      </p>
      <p
        className={`mt-1 text-lg font-semibold leading-snug break-words ${
          highlight ? "text-error" : "text-base-content"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
