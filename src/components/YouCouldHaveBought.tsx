"use client";

import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import type { Concert } from "@/types/concert";
import { formatCurrency, totalCost } from "@/lib/concert-metrics";
import { getPurchaseComparisons } from "@/lib/alternative-purchases";
import { SectionCard } from "@/components/SectionCard";

type YouCouldHaveBoughtProps = {
  concerts: Concert[];
};

const categoryBadge: Record<string, string> = {
  food: "badge-accent",
  travel: "badge-primary",
  vehicle: "badge-secondary",
  home: "badge-info",
  everyday: "badge-ghost",
};

export function YouCouldHaveBought({ concerts }: YouCouldHaveBoughtProps) {
  const totalSpent = useMemo(
    () => concerts.reduce((sum, concert) => sum + totalCost(concert), 0),
    [concerts]
  );

  const comparisons = useMemo(() => getPurchaseComparisons(totalSpent), [totalSpent]);

  if (totalSpent <= 0 || comparisons.length === 0) {
    return null;
  }

  return (
    <SectionCard
      title="You could've bought…"
      description={
        <>
          With{" "}
          <span className="font-semibold text-primary">{formatCurrency(totalSpent)}</span>{" "}
          spent on the concerts you&apos;ve logged, here are a few other things that money could
          have picked up instead.
        </>
      }
      icon={Sparkles}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {comparisons.map((comparison) => (
          <article
            key={comparison.item.id}
            className="surface-nested p-4 flex flex-col gap-3 transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-3xl" role="img" aria-hidden>
                {comparison.item.emoji}
              </span>
              <span
                className={`badge badge-sm capitalize ${categoryBadge[comparison.item.category] ?? "badge-ghost"}`}
              >
                {comparison.item.category}
              </span>
            </div>
            <div className="space-y-1">
              <p className="font-semibold leading-snug text-base">{comparison.headline}</p>
              <p className="text-helper">{comparison.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="text-helper text-center">
        Prices are rough estimates for fun comparison only — your concert memories might still be
        worth it.
      </p>
    </SectionCard>
  );
}
