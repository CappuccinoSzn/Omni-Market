import { Suspense } from "react";
import type { Metadata } from "next";
import Shop from "@/app/ui/shop";

export const metadata: Metadata = {
  title: "Deals and price drops",
  description:
    "Live Omni Market listings whose current price is below the price the seller first set.",
};

type FilterParams = Promise<{ q?: string; category?: string; sort?: string }>;

function Skeleton() {
  return (
    <div className="px-4 py-24 text-center text-sm text-gray-500">
      Loading deals...
    </div>
  );
}

async function ResolvedShop({ searchParams }: { searchParams: FilterParams }) {
  const { q, category, sort } = await searchParams;

  return (
    <Shop
      key={`${q ?? ""}|${category ?? ""}|${sort ?? ""}`}
      mode="deals"
      initialQuery={q ?? ""}
      initialCategory={category ?? ""}
      initialSort={sort || "savings"}
    />
  );
}

export default function DealsPage({ searchParams }: { searchParams: FilterParams }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <ResolvedShop searchParams={searchParams} />
    </Suspense>
  );
}
