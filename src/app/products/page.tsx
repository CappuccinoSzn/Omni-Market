import { Suspense } from "react";
import type { Metadata } from "next";
import Shop from "@/app/ui/shop";

export const metadata: Metadata = {
  title: "Shop all listings",
  description:
    "Browse every live listing on Omni Market. Filter by category, sort by price and search across sellers in Kenya.",
};

type FilterParams = Promise<{ q?: string; category?: string; sort?: string }>;

function ShopSkeleton() {
  return (
    <div className="px-4 py-24 text-center text-sm text-gray-500">
      Loading listings...
    </div>
  );
}

async function ResolvedShop({ searchParams }: { searchParams: FilterParams }) {
  const { q, category, sort } = await searchParams;

  return (
    <Shop
      key={`${q ?? ""}|${category ?? ""}|${sort ?? ""}`}
      mode="all"
      initialQuery={q ?? ""}
      initialCategory={category ?? ""}
      initialSort={sort ?? ""}
    />
  );
}

export default function ProductsPage({ searchParams }: { searchParams: FilterParams }) {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ResolvedShop searchParams={searchParams} />
    </Suspense>
  );
}
