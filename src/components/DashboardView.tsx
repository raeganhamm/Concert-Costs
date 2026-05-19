"use client";

import { AnnualBudgetSection } from "@/components/AnnualBudgetSection";
import { DashboardCharts } from "@/components/DashboardCharts";
import { DashboardSectionLabel } from "@/components/DashboardSectionLabel";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { DashboardStats } from "@/components/DashboardStats";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { FadeIn } from "@/components/FadeIn";
import { USConcertMap } from "@/components/USConcertMap";
import { YouCouldHaveBought } from "@/components/YouCouldHaveBought";
import { useConcerts } from "@/hooks/useConcerts";

export function DashboardView() {
  const { concerts, loading, error, refetch } = useConcerts();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        message="We could not load your concerts. Please check your connection and try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-12">
      <FadeIn>
        <AnnualBudgetSection concerts={concerts} />
      </FadeIn>

      {concerts.length === 0 ? (
        <FadeIn delay={0.05}>
          <EmptyState
            title="No concerts yet"
            message="No concerts logged yet. Add your first concert to start seeing your dashboard."
          />
        </FadeIn>
      ) : (
        <>
          <section className="space-y-6">
            <DashboardSectionLabel>Overview</DashboardSectionLabel>
            <FadeIn delay={0.05}>
              <DashboardStats concerts={concerts} />
            </FadeIn>
          </section>

          <section className="space-y-6">
            <DashboardSectionLabel>Charts</DashboardSectionLabel>
            <FadeIn delay={0.08}>
              <DashboardCharts concerts={concerts} />
            </FadeIn>
          </section>

          <section className="space-y-6">
            <DashboardSectionLabel>Explore</DashboardSectionLabel>
            <div className="space-y-8">
              <FadeIn delay={0.1}>
                <USConcertMap concerts={concerts} />
              </FadeIn>
              <FadeIn delay={0.12}>
                <YouCouldHaveBought concerts={concerts} />
              </FadeIn>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
