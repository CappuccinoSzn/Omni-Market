import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ProductDetail from "@/app/ui/product-detail";
import { btnGhost, btnPrimary, shell } from "@/app/ui/styles";

type Props = { params: Promise<{ id: string }> };

function isListingId(value: number) {
  return Number.isInteger(value) && value > 0;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);

  if (!isListingId(numericId)) {
    return { title: "Listing not found", robots: { index: false } };
  }

  // Listings load on the client, so the title cannot name the product yet.
  return {
    title: `Listing #${numericId}`,
    description:
      "Live listing details, price and seller on Omni Market. Prices are in Kenyan shillings.",
  };
}

function DetailSkeleton() {
  return (
    <main className="mx-auto grid w-full max-w-[1360px] gap-8 px-4 py-14 lg:grid-cols-2 lg:px-12">
      <div className="h-[320px] animate-pulse rounded-[28px] bg-[#eceee6] sm:h-[520px]" />
      <div className="space-y-4">
        <div className="h-6 w-32 animate-pulse rounded-full bg-[#eceee6]" />
        <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-[#eceee6]" />
        <div className="h-6 w-40 animate-pulse rounded-full bg-[#eceee6]" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-[#eceee6]" />
      </div>
    </main>
  );
}

function InvalidLink({ id }: { id: string }) {
  return (
    <main className={`${shell} py-20 text-center`}>
      <h1 className="text-3xl font-semibold tracking-tight">
        That is not a listing link
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
        Omni Market product links look like /products/12. You asked for{" "}
        <span className="font-semibold">/products/{id}</span>. Use the shop to
        find what you were looking for.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/products" className={btnPrimary}>
          Browse all listings
        </Link>
        <Link href="/categories" className={btnGhost}>
          Explore categories
        </Link>
      </div>
    </main>
  );
}

async function ResolvedProduct({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  if (!isListingId(numericId)) return <InvalidLink id={id} />;

  return <ProductDetail id={numericId} />;
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ResolvedProduct params={params} />
    </Suspense>
  );
}
