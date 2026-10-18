"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check, Search, ShoppingBag, Sparkles } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const [term, setTerm] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = term.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

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
            A little marketplace with big possibilities
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
              Convenient checkout
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-[#658958]" />
              Made for everyone
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
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85"
                alt="Curated everyday fashion"
                className="h-[300px] w-full object-cover sm:h-[420px]"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 p-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-gray-500">
                  Find your style
                </p>
                <p className="mt-1 text-sm font-semibold sm:text-base">
                  Everyday favourites
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="overflow-hidden rounded-[28px] bg-[#e7e9e0] shadow-[0_18px_45px_rgba(33,58,38,0.10)] ring-1 ring-black/[0.03] sm:rounded-[36px]">
                <img
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85"
                  alt="Laptop and technology"
                  className="h-[175px] w-full object-cover sm:h-[235px]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between rounded-[28px] bg-[#234b35] p-5 text-white sm:rounded-[36px] sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Sparkles size={20} />
                </div>
                <div className="mt-7">
                  <p className="text-xs text-white/70 sm:text-sm">
                    Your next favourite
                  </p>
                  <p className="mt-2 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    Is waiting
                    <br />
                    to be found.
                  </p>
                  <Link
                    href="/products"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#c6dcae] hover:text-white"
                  >
                    Explore finds <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/70 bg-white/95 px-4 py-3 text-xs font-semibold shadow-lg sm:left-0 sm:top-12 sm:translate-x-0 sm:text-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf0e4] text-[#315e43]">
              <ShoppingBag size={14} />
            </span>
            A better way to discover
          </div>
        </motion.div>
      </div>
    </section>
  );
}
