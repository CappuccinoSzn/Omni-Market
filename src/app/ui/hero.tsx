"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  RefreshCw,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { categorySummary, sellerNames, useProducts } from "@/app/lib/catalog";
import { money } from "@/app/lib/format";
import ProductMedia from "./product-media";

export default function Hero() {
  const router = useRouter();
  const { status, products } = useProducts();
  const [term, setTerm] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = term.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

  const showListings = status === "ready" && products.length > 0;
  const hero = products[0];
  const second = products[1];
  const towns = new Set(products.map((product) => product.location)).size;

  return (
    <section className="relative px-4 pb-12 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:px-12 lg:pb-24 lg:pt-16">
      <div className="relative mx-auto grid max-w-[1360px] items-center gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dfe7d7] bg-white/80 px-4 py-2 text-xs font-semibold text-[#315e43] shadow-sm sm:text-sm">
            <Sparkles size={15} />
            Live listings from sellers near you
          </div>

          <h1 className="max-w-2xl text-[43px] font-semibold leading-[1.02] tracking-[-2.8px] sm:text-6xl lg:text-[78px] lg:tracking-[-4.5px]">
            Good finds.
            <br />
            <span className="font-serif font-normal italic text-[#73965e]">
              Better prices.
            </span>
            <br />
            Your kind of shop.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#59645a] sm:text-lg sm:leading-8">
            From everyday essentials to unexpected treasures, discover products
            from sellers across Kenya — all in one place.
          </p>

          <form
            onSubmit={submit}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-[#e4e6dd] bg-white p-2 shadow-[0_10px_35px_rgba(25,48,31,0.06)]"
          >
            <Search size={20} className="ml-2 shrink-0 text-gray-400" />
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="What are you looking for?"
              aria-label="Search the marketplace"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#234b35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#315e43]"
            >
              Find
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 rounded-full bg-[#234b35] px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#315e43]"
            >
              Explore marketplace
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/sell"
              className="rounded-full border border-[#dfe2d9] bg-white px-6 py-4 text-sm font-semibold transition hover:border-[#234b35]"
            >
              Sell your stuff
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-gray-500 sm:text-sm">
            <span className="flex items-center gap-2">
              <Check size={16} className="text-[#658958]" />
              Easy discovery
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-[#658958]" />
              One bag, many sellers
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-[#658958]" />
              No listing fees
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[620px]"
        >
          <div className="absolute -right-5 -top-5 h-36 w-36 rounded-full bg-[#e9efdf] blur-3xl" />
          <div className="absolute -bottom-8 -left-5 h-40 w-40 rounded-full bg-[#f3e7d7] blur-3xl" />

          <div className="relative grid grid-cols-[1.1fr_0.9fr] gap-3 sm:gap-4">
            <div className="relative mt-10 overflow-hidden rounded-[28px] bg-[#eee6d9] shadow-[0_24px_60px_rgba(33,58,38,0.13)] ring-1 ring-black/[0.03] sm:rounded-[36px]">
              {showListings && hero ? (
                <Link href={`/products/${hero.id}`} className="block">
                  <ProductMedia
                    product={hero}
                    rounded=""
                    className="h-[300px] sm:h-[420px]"
                  />
                  <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 p-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-gray-500">
                      Just listed · {hero.category}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold sm:text-base">
                      {hero.name}
                    </p>
                    <p className="mt-0.5 text-xs text-[#315e43]">
                      {money(hero.price)} · {hero.location}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex h-[300px] items-center justify-center px-6 text-center sm:h-[420px]">
                  {status === "error" ? (
                    <div>
                      <p className="text-sm font-semibold text-[#234b35]">
                        Listings are not loading
                      </p>
                      <button
                        onClick={() => router.refresh()}
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#dfe3d9] bg-white px-4 py-2 text-xs font-semibold text-[#234b35]"
                      >
                        <RefreshCw size={14} />
                        Reload
                      </button>
                    </div>
                  ) : (
                    <div className="h-full w-full animate-pulse rounded-[28px] bg-[#e6e9df]" />
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="overflow-hidden rounded-[28px] bg-[#e7e9e0] shadow-[0_18px_45px_rgba(33,58,38,0.10)] ring-1 ring-black/[0.03] sm:rounded-[36px]">
                {showListings && second ? (
                  <Link href={`/products/${second.id}`} className="block">
                    <ProductMedia
                      product={second}
                      rounded=""
                      className="h-[175px] sm:h-[235px]"
                    />
                  </Link>
                ) : (
                  <div className="h-[175px] animate-pulse bg-[#dfe3d9] sm:h-[235px]" />
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between rounded-[28px] bg-[#234b35] p-5 text-white sm:rounded-[36px] sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Sparkles size={20} />
                </div>
                <div className="mt-7">
                  <p className="text-xs text-white/70 sm:text-sm">
                    On the shelf right now
                  </p>
                  <p className="mt-2 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    {status === "ready"
                      ? `${products.length} listings`
                      : "Loading live count"}
                    <br />
                    {status === "ready"
                      ? `across ${categorySummary(products).length} categories`
                      : "from sellers near you"}
                  </p>
                  <p className="mt-2 text-xs text-white/60 sm:text-sm">
                    {status === "ready"
                      ? `${sellerNames(products).length} sellers · ${towns} ${towns === 1 ? "town" : "towns"}`
                      : ""}
                  </p>
                  <Link
                    href="/categories"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#c6dcae] hover:text-white"
                  >
                    Explore shelves <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/70 bg-white/95 px-4 py-3 text-xs font-semibold shadow-lg sm:left-0 sm:top-12 sm:translate-x-0 sm:text-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf0e4] text-[#315e43]">
              <ShoppingBag size={14} />
            </span>
            Prices in Kenyan shillings
          </div>
        </motion.div>
      </div>
    </section>
  );
}
