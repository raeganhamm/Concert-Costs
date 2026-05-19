import type { Concert } from "@/types/concert";
import {
  costPerHour,
  formatCurrency,
  formatDate,
  funPointsPer100,
  getTopCostCategories,
  totalCost,
} from "@/lib/concert-metrics";
import { MapPin, Star } from "lucide-react";
import { sectionCardClassName } from "@/lib/ui-classes";

type ConcertCardProps = {
  concert: Concert;
};

export function ConcertCard({ concert }: ConcertCardProps) {
  const total = totalCost(concert);
  const perHour = costPerHour(concert);
  const funPer100 = funPointsPer100(concert);
  const categories = getTopCostCategories(concert);

  return (
    <article
      className={`${sectionCardClassName} border-l-4 border-l-primary transition-all duration-200 hover:shadow-md hover:scale-[1.01]`}
    >
      <div className="card-body gap-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="text-xl font-bold leading-snug break-words">{concert.concert_name}</h3>
            <p className="text-primary font-medium leading-relaxed">{concert.artist}</p>
          </div>
          <div className="badge badge-primary badge-lg gap-1 shrink-0">
            <Star className="h-3 w-3 fill-current" aria-hidden />
            {concert.fun_rating}/10
          </div>
        </div>

        <p className="flex items-center gap-2 text-sm leading-relaxed opacity-80">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          {concert.venue} · {concert.city}, {concert.state}
        </p>
        <p className="text-sm leading-relaxed opacity-70">{formatDate(concert.concert_date)}</p>

        <div className="stats stats-vertical w-full surface-nested sm:stats-horizontal">
          <div className="stat px-4 py-4">
            <div className="stat-title">Total cost</div>
            <div className="stat-value text-lg text-primary">{formatCurrency(total)}</div>
          </div>
          <div className="stat px-4 py-4">
            <div className="stat-title">Cost / hour</div>
            <div className="stat-value text-lg">
              {perHour !== null ? formatCurrency(perHour) : "—"}
            </div>
          </div>
          <div className="stat px-4 py-4">
            <div className="stat-title">Fun Points per $100</div>
            <div className="stat-value text-lg">
              {funPer100 !== null ? funPer100.toFixed(2) : "—"}
            </div>
          </div>
        </div>

        {categories.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-60">
              Main cost categories
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map(({ label, amount }) => (
                <span key={label} className="badge badge-outline">
                  {label}: {formatCurrency(amount)}
                </span>
              ))}
            </div>
          </div>
        )}

        {concert.notes && (
          <p className="surface-nested p-3 text-sm italic leading-relaxed">{concert.notes}</p>
        )}
      </div>
    </article>
  );
}

