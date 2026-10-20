"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  Coins,
  RefreshCw,
  Search,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import {
  categorySummary,
  sellerNames,
  useProducts,
  type Product,
} from "@/app/lib/catalog";
import { money } from "@/app/lib/format";
import { panelDark } from "./styles";
import ProductMedia from "./product-media";

// Counts land on screen with a short climb instead of popping in cold.
function useCountUp(target: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target <= 0) return;

    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 900;

    let frame = 0;
    const started = performance.now();

    const step = (now: number) => {
      const progress =
        duration === 0 ? 1 : Math.min((now - started) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return value;
}

const promises = [
  { icon: Sparkles, tint: "#2f6b46", label: "Real sellers, real prices" },
  { icon: Truck, tint: "#6fa8c9", label: "Rider or pickup — you agree it" },
  { icon: BadgePercent, tint: "#f0b429", label: "Zero listing fees" },
  { icon: Store, tint: "#dd7a55", label: "One bag, many sellers" },
];

function Ticker({ items }: { items: Product[] }) {
  if (items.length === 0) return null;

  const line = [...items, ...items];

  return (
    <div className="cuk-marquee mt-10 border-y border-[#e4e9dc] bg-white/50 py-3">
      <div className="cuk-marquee__track">
        {line.map((product, index) => (
          <span
            key={`${product.id}-${index}`}
            className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-[#3f5a46]"
          >
            <span className="cuk-live-dot h-1.5 w-1.5" aria-hidden />
            {product.name}
            <span className="text-[#719267]">{money(product.price)}</span>
            <span className="text-gray-400">{product.location}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const router = useRouter();
  const { status, products } = useProducts();
  const [term, setTerm] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = term.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

  const ready = status === "ready" && products.length > 0;
  const hero = products[0];
  const second = products[1];
  const towns = new Set(products.map((product) => product.location)).size;
  const categories = categorySummary(products).slice(0, 4);
  const liveCount = useCountUp(status === "ready" ? products.length : 0);
  const sellerCount = useCountUp(status === "ready" ? sellerNames(products).length : 0);

  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:px-12 lg:pb-28 lg:pt-20">
      <div aria-hidden>
        <span
          className="cuk-blob left-[-10%] top-[-8%] h-[340px] w-[340px]"
          style={{ background: "#d5e7c2" }}
        />
        <span
          className="cuk-blob right-[-6%] top-[6%] h-[300px] w-[300px] [animation-delay:-6s]"
          style={{ background: "#fbe6bf" }}
        />
        <span
          className="cuk-blob bottom-[-14%] left-[38%] h-[280px] w-[280px] [animation-delay:-11s]"
          style={{ background: "#cfe3ea" }}
        />
        <span className="cuk-grid-lines inset-0 absolute opacity-60" />
      </div>

      <div className="relative mx-auto grid max-w-[1360px] items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dfe9d5] bg-white/85 px-4 py-2 text-xs font-semibold text-[#315e43] shadow-[0_4px_16px_rgba(28,54,34,0.07)] backdrop-blur sm:text-sm">
            <span className="cuk-live-dot" aria-hidden />
            Live now from sellers across Kenya
          </div>

          <h1 className="max-w-2xl text-[44px] font-semibold leading-[1.01] tracking-[-2.9px] sm:text-6xl lg:text-[80px] lg:tracking-[-4.6px]">
            Good finds.
            <br />
            <span className="cuk-grad-text font-serif font-normal italic">
              Better prices.
            </span>
            <br />
            Your kind of shop.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#59645a] sm:text-lg sm:leading-8">
            Everyday essentials and unexpected treasures from independent sellers
            in every town — priced in shillings, handed over your way.
          </p>

          <form
            onSubmit={submit}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-[22px] border border-[#dbe4d2] bg-white/95 p-2 shadow-[0_16px_44px_rgba(25,48,31,0.10)] transition focus-within:border-[#719477] focus-within:shadow-[0_18px_50px_rgba(46,90,60,0.18)]"
          >
            <Search size={20} className="ml-2 shrink-0 text-[#719267]" />
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Headphones? Shoes? A study lamp?"
              aria-label="Search the marketplace"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-br from-[#2c5c3f] to-[#173624] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(28,64,42,0.24)] transition hover:-translate-y-0.5 active:translate-y-0"
            >
              Find it
            </button>
          </form>

          {ready && categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="rounded-full border border-[#e2e8da] bg-white/80 px-3 py-1.5 text-xs font-medium text-[#3f5a46] transition hover:-translate-y-0.5 hover:border-[#9fbb92] hover:bg-[#f2f7ec]"
                >
                  {category.name}
                  <span className="ml-1.5 text-[10px] text-gray-400">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#2c5c3f] via-[#234b35] to-[#173624] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(28,64,42,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(28,64,42,0.32)] active:translate-y-0"
            >
              Explore marketplace
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/sell"
              className="group inline-flex items-center gap-2 rounded-full border border-[#dbe1d3] bg-white/90 px-6 py-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[#8fae86] hover:bg-[#f4f8ef]"
            >
              Sell your stuff
              <Store
                size={16}
                className="text-[#719267] transition group-hover:scale-110"
              />
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {promises.map((promise) => (
              <span
                key={promise.label}
                className="flex items-center gap-2.5 text-[13px] font-medium text-[#46543f]"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-[0_4px_12px_rgba(28,54,34,0.16)]"
                  style={{ background: promise.tint }}
                >
                  <promise.icon size={14} />
                </span>
                {promise.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[620px]"
        >
          <div className="relative grid grid-cols-[1.1fr_0.9fr] gap-3 sm:gap-4">
            <div className="cuk-sheen-host relative mt-10 overflow-hidden rounded-[28px] bg-[#eee6d9] shadow-[0_26px_64px_rgba(33,58,38,0.16)] ring-1 ring-black/[0.04] transition duration-500 hover:shadow-[0_34px_78px_rgba(33,58,38,0.22)] sm:rounded-[36px]">
              {ready && hero ? (
                <Link href={`/products/${hero.id}`} className="block">
                  <ProductMedia
                    product={hero}
                    rounded=""
                    className="h-[300px] sm:h-[430px]"
                  />
                  <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/92 p-3 shadow-[0_10px_28px_rgba(24,44,30,0.16)] backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#719267]">
                      Just listed · {hero.category}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold sm:text-base">
                      {hero.name}
                    </p>
                    <p className="mt-0.5 flex items-center gap-2 text-xs text-[#315e43]">
                      <span className="font-bold">{money(hero.price)}</span>
                      <span className="text-gray-400">{hero.location}</span>
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex h-[300px] items-center justify-center px-6 sm:h-[430px]">
                  {status === "error" ? (
                    <div className="text-center">
                      <p className="text-3xl" aria-hidden>
                        🧺
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#234b35]">
                        Listings are not loading
                      </p>
                      <button
                        onClick={() => router.refresh()}
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#dfe3d9] bg-white px-4 py-2 text-xs font-semibold text-[#234b35] transition hover:border-[#234b35]"
                      >
                        <RefreshCw size={14} />
                        Reload
                      </button>
                    </div>
                  ) : (
                    <div className="cuk-skeleton h-full w-full rounded-[28px]" />
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="cuk-sheen-host overflow-hidden rounded-[28px] bg-[#e7e9e0] shadow-[0_18px_45px_rgba(33,58,38,0.12)] ring-1 ring-black/[0.04] sm:rounded-[36px]">
                {ready && second ? (
                  <Link href={`/products/${second.id}`} className="block">
                    <ProductMedia
                      product={second}
                      rounded=""
                      className="h-[175px] sm:h-[240px]"
                    />
                  </Link>
                ) : (
                  <div className="cuk-skeleton h-[175px] sm:h-[240px]" />
                )}
              </div>

              <div className={`${panelDark} flex flex-1 flex-col justify-between p-5 sm:p-7`}>
                <span
                  className="cuk-dots text-white absolute inset-0"
                  aria-hidden
                />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#a2bd70]/20 text-[#dcecc6] ring-1 ring-white/15">
                  <Sparkles size={20} />
                </div>

                <div className="relative mt-7">
                  <p className="text-xs uppercase tracking-[1.8px] text-white/60">
                    On the shelf right now
                  </p>
                  <p className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-[40px]">
                    <span className="tabular-nums text-[#c5dba9]">
                      {status === "ready" ? liveCount : "…"}
                    </span>
                    <span className="text-lg font-normal text-white/80 sm:text-2xl">
                      {" "}
                      listings
                    </span>
                    <br />
                    <span className="text-xl font-normal text-white/90 sm:text-2xl">
                      across{" "}
                      <span className="font-semibold tabular-nums text-[#c5dba9]">
                        {categories.length > 0
                          ? categorySummary(products).length
                          : "…"}
                      </span>{" "}
                      categories
                    </span>
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-white/70 sm:text-sm">
                    <span className="cuk-live-dot" aria-hidden />
                    {status === "ready"
                      ? `${sellerCount} sellers · ${towns} ${towns === 1 ? "town" : "towns"}`
                      : "counting sellers near you"}
                  </p>
                  <Link
                    href="/categories"
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#c6dcae] transition hover:text-white"
                  >
                    Explore shelves
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="cuk-float absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/70 bg-white/95 px-4 py-3 text-xs font-semibold shadow-[0_12px_30px_rgba(24,44,30,0.16)] sm:left-0 sm:top-12 sm:translate-x-0 sm:text-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf0e4] text-[#315e43]">
              <Coins size={14} />
            </span>
            Prices in Kenyan shillings
          </div>
        </motion.div>
      </div>

      {ready && <Ticker items={products.slice(0, 6)} />}
    </section>
  );
}
