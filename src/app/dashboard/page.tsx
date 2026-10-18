import { Suspense } from "react";
import type { Metadata } from "next";
import Dashboard from "@/app/ui/dashboard";

export const metadata: Metadata = {
  title: "My dashboard",
  description:
    "Track your Omni Market listings, orders, favourites and bag in one place.",
};

type TabParam = Promise<{ tab?: string }>;

function DashboardSkeleton() {
  return (
    <div className="px-4 py-24 text-center text-sm text-gray-500">
      Loading your dashboard...
    </div>
  );
}

async function ResolvedDashboard({ searchParams }: { searchParams: TabParam }) {
  const { tab } = await searchParams;

  return <Dashboard key={tab ?? "overview"} initialTab={tab ?? "overview"} />;
}

export default function DashboardPage({ searchParams }: { searchParams: TabParam }) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <ResolvedDashboard searchParams={searchParams} />
    </Suspense>
  );
}
