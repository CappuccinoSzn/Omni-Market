import { Suspense } from "react";
import type { Metadata } from "next";
import Shop from "@/app/ui/shop";

export const metadata: Metadata = {
  title: "Fresh arrivals",
  description:
    "The newest listings published on Omni Market, most recent first.",
};

type FilterParams = Promise<{ q?: string; category?: string; sort?: string }>;

function Skeleton() {
  return (
    <div className="px-4 py-24 text-center text-sm text-gray-500">
      Loading new arrivals...
    </div>
  );
}

async function ResolvedShop({ searchParams }: { searchParams: FilterParams }) {
  const { q, category, sort } = await searchParams;

  return (
    <Shop
      key={`${q ?? ""}|${category ?? ""}|${sort ?? ""}`}
      mode="new"
      initialQuery={q ?? ""}
      initialCategory={category ?? ""}
      initialSort={sort ?? ""}
    />
  );
}

export default function NewPage({ searchParams }: { searchParams: FilterParams }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <ResolvedShop searchParams={searchParams} />
    </Suspense>
  );
}
