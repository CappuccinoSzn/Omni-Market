"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";
import {
  categorySummary,
  categoryTile,
  loadProducts,
  useProducts,
} from "@/app/lib/catalog";
import { money } from "@/app/lib/format";
import { btnGhost, btnPrimary, card, eyebrow, noticePanel, shell } from "./styles";

export default function CategoriesExplorer() {
  const { status, products, error } = useProducts();
  const categories = categorySummary(products);

  if (status === "error") {
    return (
      <main className={`${shell} py-16`}>
        <div className={noticePanel}>
          <p className="font-semibold">Categories could not be loaded.</p>
          <p className="mt-1 text-[#40544a]">{error}</p>
          <button
            onClick={() => loadProducts(true)}
            className={`${btnPrimary} mt-4`}
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (status === "loading") {
    return (
      <main className={`${shell} py-16`}>
        <p className={eyebrow}>Browse by category</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Explore categories
        </h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-40 animate-pulse rounded-3xl bg-[#eef1e9]" />
          ))}
        </div>
      </main>
    );
  }

  if (categories.length === 0) {
    return (
      <main className={`${shell} py-16`}>
        <div className={`${card} text-center`}>
          <h1 className="text-2xl font-semibold tracking-tight">
            No categories yet
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Categories are built from live listings, and none are published at
            the moment.
          </p>
          <Link href="/sell" className={`${btnPrimary} mt-5`}>
            List the first item
          </Link>
        </div>
      </main>
    );
  }

  const lowestPrice = new Map<string, number>();

  products.forEach((product) =>
    lowestPrice.set(
      product.category,
      Math.min(lowestPrice.get(product.category) ?? Infinity, product.price)
    )
  );

  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={eyebrow}>Browse by category</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Explore categories
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            {categories.length} categories hold the {products.length} listings
            sellers have published right now.
          </p>
        </div>
        <Link href="/products" className={btnGhost}>
          See everything
        </Link>
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const tile = categoryTile(category.name);

          return (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group relative overflow-hidden rounded-3xl border border-[#e6e8df] p-5 shadow-[0_5px_20px_rgba(28,54,34,0.03)] transition hover:-translate-y-1 hover:border-[#d7e0cf] hover:shadow-[0_18px_38px_rgba(28,54,34,0.09)]"
              style={{
                background: `linear-gradient(140deg, ${tile.from}, ${tile.to})`,
                minHeight: 170,
              }}
            >
              <span className="text-3xl leading-none">{tile.emoji}</span>
              <h2 className="mt-4 text-lg font-semibold text-[#203a28]">
                {category.name}
              </h2>
              <p className="mt-1 text-xs font-medium text-[#3f5a46]">
                {category.count} {category.count === 1 ? "listing" : "listings"}
                {lowestPrice.has(category.name) &&
                  ` · from ${money(lowestPrice.get(category.name) ?? 0)}`}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#234b35]">
                Open shelf
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-1"
                />
              </span>
              <span className="absolute right-4 top-4 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#3f5a46]/70">
                {index + 1}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl bg-[#edf2e8] px-5 py-8 text-center sm:px-8">
        <h2 className="text-xl font-semibold text-[#234b35] sm:text-2xl">
          Not sure where your item fits?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#40544a]">
          Pick the closest category when you list it — buyers search names,
          sellers and towns as well as shelves.
        </p>
        <Link href="/sell" className={`${btnPrimary} mt-5`}>
          Start selling
        </Link>
      </div>
    </main>
  );
}
