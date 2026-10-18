"use client";

import Link from "next/link";
import {
  categoryTile,
  sellerNames,
  useProducts,
} from "@/app/lib/catalog";
import { btnGhost, card } from "./styles";

export default function SellSidebar() {
  const { status, products } = useProducts();
  const counts = new Map<string, number>();

  products.forEach((product) =>
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
  );

  return (
    <aside className="space-y-5">
      <div className={card}>
        <h2 className="text-base font-semibold">What is on the shelf now</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {status === "loading" && (
            <li className="text-gray-500">Counting live listings...</li>
          )}

          {status === "ready" && counts.size === 0 && (
            <li className="text-gray-500">
              Nothing is listed yet — yours would be the first.
            </li>
          )}

          {[...counts.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([name, count]) => (
              <li key={name} className="flex items-center justify-between gap-3">
                <Link
                  href={`/products?category=${encodeURIComponent(name)}`}
                  className="text-gray-600 hover:text-[#234b35]"
                >
                  {categoryTile(name).emoji} {name}
                </Link>
                <span className="text-xs text-gray-400">
                  {count} {count === 1 ? "listing" : "listings"}
                </span>
              </li>
            ))}
        </ul>
        {status === "ready" && products.length > 0 && (
          <p className="mt-4 border-t border-[#e6e8df] pt-4 text-xs text-gray-500">
            {sellerNames(products).length} sellers are publishing right now.
          </p>
        )}
      </div>

      <div className="rounded-3xl bg-[#234b35] p-5 text-white">
        <h2 className="text-base font-semibold">List it well</h2>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          <li>Mention faults honestly — it prevents arguments at handover.</li>
          <li>Price against what is already on the shelf, not on the receipt.</li>
          <li>
            There is no in-app messaging yet, so agree how to stay in touch at
            the first reply.
          </li>
        </ul>
      </div>

      <div className="rounded-3xl border border-dashed border-[#dfe3d9] p-5 text-sm text-gray-600">
        Listings you save stay on this device until seller publishing is
        connected. Not sure about delivery? Read{" "}
        <Link
          href="/shipping"
          className="font-semibold text-[#234b35] hover:underline"
        >
          delivery and pickup options
        </Link>
        .
      </div>

      <Link href="/products" className={`${btnGhost} w-full`}>
        See what others are selling
      </Link>
    </aside>
  );
}
