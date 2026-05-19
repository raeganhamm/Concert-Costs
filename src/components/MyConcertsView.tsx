"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ConcertCard } from "@/components/ConcertCard";
import { ConcertListSkeleton } from "@/components/ConcertListSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { useConcerts } from "@/hooks/useConcerts";

export function MyConcertsView() {
  const { concerts, loading, error, refetch } = useConcerts();
  const [parent] = useAutoAnimate();

  if (loading) {
    return <ConcertListSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        message="We could not load your concerts. Please check your connection and try again."
        onRetry={refetch}
      />
    );
  }

  if (concerts.length === 0) {
    return (
      <EmptyState
        title="No concerts yet"
        message="No concerts logged yet. Add your first concert to start seeing your dashboard."
        actionLabel="Add Concert"
        actionHref="/app/add"
        secondaryLabel="View dashboard"
        secondaryHref="/app"
      />
    );
  }

  return (
    <div ref={parent} className="grid gap-6 md:grid-cols-2">
      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert} />
      ))}
    </div>
  );
}
