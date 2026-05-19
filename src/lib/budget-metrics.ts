import type { Concert } from "@/types/concert";
import { totalCost } from "@/lib/concert-metrics";

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getYearFromConcertDate(concertDate: string): number {
  const [year] = concertDate.split("-").map(Number);
  return year;
}

export function concertsInYear(concerts: Concert[], year: number): Concert[] {
  return concerts.filter((concert) => getYearFromConcertDate(concert.concert_date) === year);
}

export function yearToDateSpend(concerts: Concert[], year: number): number {
  return concertsInYear(concerts, year).reduce((sum, concert) => sum + totalCost(concert), 0);
}

export function budgetPercentSpent(spent: number, budget: number): number {
  if (budget <= 0) return 0;
  return (spent / budget) * 100;
}

export function budgetRemaining(budget: number, spent: number): number {
  return budget - spent;
}
