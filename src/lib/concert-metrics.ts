import type { Concert } from "@/types/concert";

export const COST_FIELDS = [
  { key: "ticket_cost" as const, label: "Tickets" },
  { key: "ticket_fees" as const, label: "Ticket fees" },
  { key: "parking_cost" as const, label: "Parking" },
  { key: "food_drink_cost" as const, label: "Food & drink" },
  { key: "merchandise_cost" as const, label: "Merchandise" },
  { key: "lodging_cost" as const, label: "Hotel / lodging" },
  { key: "travel_cost" as const, label: "Travel / gas" },
  { key: "other_cost" as const, label: "Other" },
];

export function toNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined || value === "") return 0;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function totalCost(concert: Pick<Concert, (typeof COST_FIELDS)[number]["key"]>): number {
  return COST_FIELDS.reduce((sum, { key }) => sum + toNumber(concert[key]), 0);
}

export function costPerHour(
  concert: Pick<Concert, (typeof COST_FIELDS)[number]["key"] | "hours_at_event">
): number | null {
  const hours = toNumber(concert.hours_at_event);
  if (hours <= 0) return null;
  return totalCost(concert) / hours;
}

export function funPointsPer100(
  concert: Pick<Concert, (typeof COST_FIELDS)[number]["key"] | "fun_rating">
): number | null {
  const cost = totalCost(concert);
  if (cost <= 0) return null;
  return (concert.fun_rating / cost) * 100;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getTopCostCategories(
  concert: Pick<Concert, (typeof COST_FIELDS)[number]["key"]>,
  limit = 3
): { label: string; amount: number }[] {
  return COST_FIELDS.map(({ key, label }) => ({
    label,
    amount: toNumber(concert[key]),
  }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

export function categoryTotals(concerts: Concert[]): { name: string; total: number }[] {
  return COST_FIELDS.map(({ key, label }) => ({
    name: label,
    total: concerts.reduce((sum, c) => sum + toNumber(c[key]), 0),
  })).filter((item) => item.total > 0);
}

export function bestValueConcert(concerts: Concert[]): Concert | null {
  const eligible = concerts.filter((c) => totalCost(c) > 0);
  if (eligible.length === 0) return null;
  return eligible.reduce((best, current) => {
    const bestScore = funPointsPer100(best) ?? 0;
    const currentScore = funPointsPer100(current) ?? 0;
    return currentScore > bestScore ? current : best;
  });
}

export function mostExpensiveConcert(concerts: Concert[]): Concert | null {
  if (concerts.length === 0) return null;
  return concerts.reduce((best, current) =>
    totalCost(current) > totalCost(best) ? current : best
  );
}

export function highestFunConcert(concerts: Concert[]): Concert | null {
  if (concerts.length === 0) return null;
  return concerts.reduce((best, current) =>
    current.fun_rating > best.fun_rating ? current : best
  );
}
