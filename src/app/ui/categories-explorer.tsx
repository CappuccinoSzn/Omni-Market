"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlugZap, RefreshCw, ShoppingBasket } from "lucide-react";
import {
  categorySummary,
  categoryTile,
  loadProducts,
  useProducts,
} from "@/app/lib/catalog";
import { money } from "@/app/lib/format";
import {
  btnGhost,
  btnPrimary,
  kicker,
  panelDark,
  shell,
} from "./styles";

function Head({ count, listings }: { count: number; listings: number }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className={kicker}>
          <span className="cuk-live-dot" aria-hidden />
          Browse by category
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Explore{" "}
          <span className="cuk-grad-text font-serif font-normal italic">
            categories
          </span>
        </h1>
        <p className="mt-3 text-sm text-gray-500 sm:text-base">
          {count === 0
            ? "Shelves appear as soon as a seller publishes something."
            : `${count} ${count === 1 ? "category holds" : "categories hold"} the ${listings} listings sellers have published right now.`}
        </p>
      </div>
      <Link href="/products" className={btnGhost}>
        See everything <ArrowRight size={15} />
      </Link>
    </div>
  );
}

export default function CategoriesExplorer() {
  const { status, products, error } = useProducts();
  const categories = categorySummary(products);

  if (status === "error") {
    return (
      <main className={`${shell} relative py-16`}>
        <span
          className="cuk-blob left-[55%] top-4 h-[240px] w-[240px] opacity-40"
          style={{ background: "#f0b429" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-xl rounded-[28px] border border-[#e6d9bd] bg-gradient-to-br from-[#fdf7ea] to-white p-7 text-center shadow-[0_18px_46px_rgba(28,54,34,0.08)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0b429] to-[#dd7a55] text-white shadow-[0_12px_26px_rgba(221,122,85,0.3)]">
            <PlugZap size={26} />
          </span>
          <p className="mt-5 text-lg font-semibold">
            Categories could not be loaded.
          </p>
          <p className="mt-1 text-sm text-[#40544a]">{error}</p>
          <button
            onClick={() => loadProducts(true)}
            className={`${btnPrimary} mt-5`}
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
      <main className={`${shell} py-14 sm:py-16`}>
        <Head count={0} listings={0} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="cuk-skeleton h-[178px] rounded-3xl"
            />
          ))}
        </div>
      </main>
    );
  }

  if (categories.length === 0) {
    return (
      <main className={`${shell} py-14 sm:py-16`}>
        <Head count={0} listings={0} />
        <div className="mt-9 rounded-[28px] border border-dashed border-[#cfd9c4] bg-gradient-to-br from-[#f2f7ec] to-white px-6 py-14 text-center">
          <span className="cuk-float mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-3xl shadow-[0_12px_30px_rgba(28,54,34,0.10)]">
            🧺
          </span>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#234b35]">
            No categories yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Categories are built from live listings, and none are published at
            the moment.
          </p>
          <Link href="/sell" className={`${btnPrimary} mt-6`}>
            List the first item <ArrowRight size={15} />
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
    <main className={`${shell} relative py-12 sm:py-16`}>
      <span
        className="cuk-blob right-[-6%] top-2 h-[280px] w-[280px] opacity-35"
        style={{ background: "#9ec77f" }}
        aria-hidden
      />

      <div className="relative">
        <Head count={categories.length} listings={products.length} />

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const tile = categoryTile(category.name);
            const from = lowestPrice.get(category.name);

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <Link
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="cuk-sheen-host group relative flex h-full min-h-[184px] flex-col overflow-hidden rounded-[26px] border border-[#e2e8d9] p-5 shadow-[0_8px_26px_rgba(28,54,34,0.05)] transition duration-300 hover:-translate-y-1.5 hover:border-[#c3d5b4] hover:shadow-[0_24px_50px_rgba(28,54,34,0.13)] sm:p-6"
                  style={{
                    background: `radial-gradient(120% 120% at 0% 0%, ${tile.from}, ${tile.to})`,
                  }}
                >
                  <span className="cuk-dots absolute inset-0 text-[#234b35]" aria-hidden />
                  <span
                    className="pointer-events-none absolute -bottom-6 -right-3 rotate-[-12deg] text-[92px] leading-none opacity-20 transition duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:opacity-30"
                    aria-hidden
                  >
                    {tile.emoji}
                  </span>
                  <span className="cuk-sheen rounded-[26px]" aria-hidden />

                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/75 text-2xl shadow-[0_6px_16px_rgba(28,54,34,0.10)] transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                    {tile.emoji}
                  </span>
                  <h2 className="relative mt-4 text-lg font-semibold text-[#203a28]">
                    {category.name}
                  </h2>
                  <p className="relative mt-1 text-xs font-medium text-[#3f5a46]">
                    {category.count}{" "}
                    {category.count === 1 ? "listing" : "listings"}
                    {from !== undefined && ` · from ${money(from)}`}
                  </p>
                  <span className="relative mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-[#234b35]">
                    {from !== undefined && (
                      <span className="mr-1 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[1px] text-[#3f5a46]">
                        <ShoppingBasket size={10} className="mr-1 inline" />
                        Hot
                      </span>
                    )}
                    Browse shelf
                    <ArrowRight
                      size={14}
                      className="transition group-hover:translate-x-1.5"
                    />
                  </span>
                  <span className="absolute right-4 top-4 text-[10px] font-bold uppercase tracking-[1.6px] text-[#3f5a46]/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div
          className={`${panelDark} mt-12 px-6 py-10 text-center sm:px-10 sm:py-12`}
        >
          <span className="cuk-dots absolute inset-0 text-white" aria-hidden />
          <span
            className="cuk-blob left-[8%] top-[-45%] h-[240px] w-[240px] opacity-25"
            style={{ background: "#9ec77f" }}
            aria-hidden
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1.6px] text-[#d5e4c8] ring-1 ring-white/15">
              <span className="cuk-live-dot" aria-hidden />
              Shelves are open
            </span>
            <h2 className="mt-4 text-xl font-semibold sm:text-3xl">
              Not sure where your item fits?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/75">
              Pick the closest category when you list it — buyers search names,
              sellers and towns as well as shelves.
            </p>
            <Link
              href="/sell"
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-[#c5dba9] px-6 py-3.5 text-sm font-semibold text-[#234b35] shadow-[0_14px_32px_rgba(197,219,169,0.26)] transition hover:-translate-y-1 hover:bg-white active:translate-y-0"
            >
              Start selling
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
