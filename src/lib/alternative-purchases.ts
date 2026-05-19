export type AlternativePurchase = {
  id: string;
  name: string;
  singularName: string;
  price: number;
  category: "food" | "travel" | "vehicle" | "home" | "everyday";
  emoji: string;
};

/** Approximate U.S. prices for fun comparisons (not live data). */
export const ALTERNATIVE_PURCHASES: AlternativePurchase[] = [
  {
    id: "latte",
    name: "fancy coffee drinks",
    singularName: "fancy coffee drink",
    price: 6,
    category: "food",
    emoji: "☕",
  },
  {
    id: "pizza",
    name: "large pizzas",
    singularName: "large pizza",
    price: 18,
    category: "food",
    emoji: "🍕",
  },
  {
    id: "groceries",
    name: "weeks of groceries",
    singularName: "week of groceries",
    price: 150,
    category: "food",
    emoji: "🛒",
  },
  {
    id: "dinner",
    name: "nice dinners for two",
    singularName: "nice dinner for two",
    price: 120,
    category: "food",
    emoji: "🍽️",
  },
  {
    id: "airpods",
    name: "pairs of wireless earbuds",
    singularName: "pair of wireless earbuds",
    price: 180,
    category: "everyday",
    emoji: "🎧",
  },
  {
    id: "console",
    name: "gaming consoles",
    singularName: "gaming console",
    price: 500,
    category: "everyday",
    emoji: "🎮",
  },
  {
    id: "weekend",
    name: "weekend getaways",
    singularName: "weekend getaway",
    price: 900,
    category: "travel",
    emoji: "🏕️",
  },
  {
    id: "flight",
    name: "round-trip domestic flights",
    singularName: "round-trip domestic flight",
    price: 350,
    category: "travel",
    emoji: "✈️",
  },
  {
    id: "vacation",
    name: "week-long vacations",
    singularName: "week-long vacation",
    price: 2500,
    category: "travel",
    emoji: "🌴",
  },
  {
    id: "cruise",
    name: "Caribbean cruises",
    singularName: "Caribbean cruise",
    price: 1200,
    category: "travel",
    emoji: "🚢",
  },
  {
    id: "scooter",
    name: "quality e-scooters",
    singularName: "quality e-scooter",
    price: 600,
    category: "vehicle",
    emoji: "🛴",
  },
  {
    id: "used-car",
    name: "reliable used cars",
    singularName: "reliable used car",
    price: 12000,
    category: "vehicle",
    emoji: "🚗",
  },
  {
    id: "new-car",
    name: "brand-new cars",
    singularName: "brand-new car",
    price: 35000,
    category: "vehicle",
    emoji: "🚙",
  },
  {
    id: "down-payment",
    name: "home down payments (10%)",
    singularName: "home down payment (10%)",
    price: 40000,
    category: "home",
    emoji: "🏠",
  },
  {
    id: "house",
    name: "median U.S. homes",
    singularName: "median U.S. home",
    price: 420000,
    category: "home",
    emoji: "🏡",
  },
];

export type PurchaseComparison = {
  item: AlternativePurchase;
  quantity: number;
  headline: string;
  detail: string;
};

function formatHeadline(item: AlternativePurchase, quantity: number): string {
  if (quantity === 1) return `1 ${item.singularName}`;
  return `${quantity.toLocaleString()} ${item.name}`;
}

export function getPurchaseComparisons(totalSpent: number): PurchaseComparison[] {
  if (totalSpent <= 0) return [];

  const fullPurchases: PurchaseComparison[] = [];
  const partialPurchases: PurchaseComparison[] = [];

  for (const item of ALTERNATIVE_PURCHASES) {
    const quantity = Math.floor(totalSpent / item.price);

    if (quantity >= 1) {
      fullPurchases.push({
        item,
        quantity,
        headline: formatHeadline(item, quantity),
        detail: `at about ${formatUsd(item.price)} each`,
      });
      continue;
    }

    const percent = (totalSpent / item.price) * 100;
    if (percent >= 20) {
      partialPurchases.push({
        item,
        quantity: 0,
        headline: `${percent.toFixed(0)}% toward a ${item.singularName}`,
        detail: `roughly ${formatUsd(item.price)} total`,
      });
    }
  }

  fullPurchases.sort((a, b) => b.quantity * b.item.price - a.quantity * a.item.price);
  partialPurchases.sort((a, b) => totalSpent / a.item.price - totalSpent / b.item.price).reverse();

  const highlights = [...fullPurchases];
  if (highlights.length < 6 && partialPurchases.length > 0) {
    highlights.push(...partialPurchases.slice(0, 6 - highlights.length));
  }

  return highlights.slice(0, 8);
}

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
