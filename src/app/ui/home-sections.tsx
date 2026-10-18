"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";
import {
  categorySummary,
  categoryTile,
  dealProducts,
  loadProducts,
  useProducts,
} from "@/app/lib/catalog";
import { money } from "@/app/lib/format";
import { btnPrimary, eyebrow, noticePanel, shell } from "./styles";
import ProductCard from "./product-card";

function SectionHead({
  kicker,
  title,
  copy,
  href,
  cta,
}: {
  kicker: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className={eyebrow}>{kicker}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">{copy}</p>
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full border border-[#e2e5dc] bg-white px-4 py-2.5 text-sm font-medium transition hover:border-[#234b35] hover:text-[#234b35]"
      >
        {cta} <ArrowRight size={15} />
      </Link>
    </div>
  );
}

function Retry() {
  const { error } = useProducts();

  return (
    <div className={`${noticePanel} mt-7`}>
      <p className="font-semibold">Live listings could not be loaded.</p>
      <p className="mt-1 text-[#40544a]">{error}</p>
      <button onClick={() => loadProducts(true)} className={`${btnPrimary} mt-4`}>
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  );
}

function Skeletons({ count, tall = false }: { count: number; tall?: boolean }) {
  return (
    <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${tall ? "h-[320px]" : "h-40"} animate-pulse rounded-[26px] bg-[#eef1e9]`}
        />
      ))}
    </div>
  );
}

export function CategoryStrip() {
  const { status, products } = useProducts();
  const categories = categorySummary(products).slice(0, 5);

  return (
    <section className={`${shell} pb-5 pt-14 sm:pt-20`}>
      <SectionHead
        kicker="Browse your way"
        title="Explore categories"
        copy="Shelves are built from whatever sellers have published right now."
        href="/categories"
        cta="All categories"
      />

      {status === "error" && <Retry />}
      {status === "loading" && <Skeletons count={5} />}

      {status === "ready" && categories.length === 0 && (
        <p className="mt-7 text-sm text-gray-500">
          No listings are published yet, so there are no categories to browse.
        </p>
      )}

      {status === "ready" && categories.length > 0 && (
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const tile = categoryTile(category.name);

            return (
              <Link
                key={category.name}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group rounded-2xl border border-[#e9eae3] p-4 shadow-[0_5px_18px_rgba(28,54,34,0.025)] transition duration-300 hover:-translate-y-1 hover:border-[#cbd7c2] hover:shadow-[0_16px_32px_rgba(28,54,34,0.08)] sm:rounded-[22px] sm:p-5"
                style={{
                  background: `linear-gradient(140deg, ${tile.from}, ${tile.to})`,
                }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-2xl transition group-hover:scale-105">
                  {tile.emoji}
                </span>
                <span className="mt-4 block text-sm font-semibold text-[#203a28]">
                  {category.name}
                </span>
                <span className="mt-1 block text-xs text-[#3f5a46]">
                  {category.count} live {category.count === 1 ? "listing" : "listings"}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function ListingRail({
  kind,
  kicker,
  title,
  copy,
  href,
  cta,
  limit = 4,
}: {
  kind: "featured" | "deals";
  kicker: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
  limit?: number;
}) {
  const { status, products } = useProducts();
  const source = kind === "deals" ? dealProducts(products) : products;
  const items = source.slice(0, limit);

  if (status === "error") {
    return (
      <section className={`${shell} pb-14 pt-14 sm:pb-20`}>
        <SectionHead kicker={kicker} title={title} copy={copy} href={href} cta={cta} />
        <Retry />
      </section>
    );
  }

  if (status === "loading") {
    return (
      <section className={`${shell} pb-14 pt-14 sm:pb-20`}>
        <SectionHead kicker={kicker} title={title} copy={copy} href={href} cta={cta} />
        <Skeletons count={limit} tall />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className={`${shell} pb-14 pt-14 sm:pb-20`}>
        <SectionHead kicker={kicker} title={title} copy={copy} href={href} cta={cta} />
        <p className="mt-7 text-sm text-gray-500">
          {kind === "deals"
            ? "No seller has dropped a price yet, so this shelf is empty."
            : "Nothing is listed yet."}
        </p>
      </section>
    );
  }

  const cheapest = Math.min(...items.map((product) => product.price));

  return (
    <section className={`${shell} pb-14 pt-14 sm:pb-20`}>
      <SectionHead kicker={kicker} title={title} copy={copy} href={href} cta={cta} />
      <p className="mt-3 text-xs text-gray-500" aria-live="polite">
        {items.length} of {source.length} {kind === "deals" ? "reduced" : "live"}{" "}
        listings shown · from {money(cheapest)}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4">
        {items.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
