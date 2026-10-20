"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw, Store } from "lucide-react";
import {
  categorySummary,
  categoryTile,
  dealProducts,
  loadProducts,
  sellerNames,
  useProducts,
} from "@/app/lib/catalog";
import { money } from "@/app/lib/format";
import { btnPrimary, kicker, noticePanel, panelDark, shell } from "./styles";
import ProductCard from "./product-card";

function SectionHead({
  kicker: label,
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
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        <p className={kicker}>
          <span className="cuk-live-dot" aria-hidden />
          {label}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-1px] sm:text-4xl">
          {title}
        </h2>
        <span
          className="mt-3 block h-1.5 w-20 rounded-full bg-gradient-to-r from-[#234b35] via-[#719477] to-[#c5dba9]"
          aria-hidden
        />
        <p className="mt-3 text-sm text-gray-500 sm:text-base">{copy}</p>
      </div>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-full border border-[#e2e5dc] bg-white px-4 py-2.5 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:border-[#8fae86] hover:bg-[#f4f8ef] hover:text-[#234b35]"
      >
        {cta}
        <ArrowRight size={15} className="transition group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}

function Retry() {
  const { error } = useProducts();

  return (
    <div className={`${noticePanel} mt-7`}>
      <p className="text-2xl" aria-hidden>
        🔌
      </p>
      <p className="mt-2 font-semibold">Live listings could not be loaded.</p>
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
          className={`${tall ? "h-[320px]" : "h-40"} cuk-skeleton rounded-[26px]`}
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
        <div className="mt-7 flex items-center gap-4 rounded-[26px] border border-dashed border-[#d7e0cd] bg-[#f7faf2] p-6">
          <span className="text-4xl" aria-hidden>
            🧺
          </span>
          <p className="text-sm text-gray-600">
            No listings are published yet, so there are no categories to browse.
            Be the first —{" "}
            <Link href="/sell" className="font-semibold text-[#234b35] hover:underline">
              list something
            </Link>
            .
          </p>
        </div>
      )}

      {status === "ready" && categories.length > 0 && (
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => {
            const tile = categoryTile(category.name);

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="cuk-sheen-host group relative block overflow-hidden rounded-2xl p-4 shadow-[0_8px_22px_rgba(28,54,34,0.05)] ring-1 ring-black/[0.03] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(28,54,34,0.14)] sm:rounded-[22px] sm:p-5"
                  style={{
                    background: `radial-gradient(circle at 24% 16%, ${tile.to}, ${tile.from})`,
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute -bottom-5 -right-2 rotate-[-10deg] text-[74px] leading-none opacity-20 transition duration-500 group-hover:scale-110 group-hover:opacity-30 sm:text-[92px]"
                  >
                    {tile.emoji}
                  </span>
                  <span aria-hidden className="cuk-sheen" />

                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-[0_4px_14px_rgba(35,75,53,0.12)]">
                    {tile.emoji}
                  </span>
                  <span className="relative mt-4 block text-sm font-semibold text-[#203a28]">
                    {category.name}
                  </span>
                  <span className="relative mt-1 block text-xs text-[#3f5a46]">
                    {category.count} live{" "}
                    {category.count === 1 ? "listing" : "listings"}
                  </span>
                  <span className="relative mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#234b35] opacity-0 transition group-hover:opacity-100">
                    Browse <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function ListingRail({
  kind,
  kicker: label,
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
        <SectionHead kicker={label} title={title} copy={copy} href={href} cta={cta} />
        <Retry />
      </section>
    );
  }

  if (status === "loading") {
    return (
      <section className={`${shell} pb-14 pt-14 sm:pb-20`}>
        <SectionHead kicker={label} title={title} copy={copy} href={href} cta={cta} />
        <Skeletons count={limit} tall />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className={`${shell} pb-14 pt-14 sm:pb-20`}>
        <SectionHead kicker={label} title={title} copy={copy} href={href} cta={cta} />
        <div className="mt-7 flex items-center gap-4 rounded-[26px] border border-dashed border-[#d7e0cd] bg-[#f7faf2] p-6">
          <span className="text-4xl" aria-hidden>
            {kind === "deals" ? "🏷️" : "🌱"}
          </span>
          <p className="text-sm text-gray-600">
            {kind === "deals"
              ? "No seller has dropped a price yet, so this shelf is empty."
              : "Nothing is listed yet."}{" "}
            <Link href="/sell" className="font-semibold text-[#234b35] hover:underline">
              Publish the first one
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  const cheapest = Math.min(...items.map((product) => product.price));

  return (
    <section className={`${shell} pb-14 pt-14 sm:pb-20`}>
      <SectionHead kicker={label} title={title} copy={copy} href={href} cta={cta} />
      <p
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#eef4e6] px-3 py-1.5 text-xs font-semibold text-[#315e43]"
        aria-live="polite"
      >
        <span className="cuk-live-dot h-1.5 w-1.5" aria-hidden />
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

export function SellerSpotlight() {
  const { status, products } = useProducts();

  if (status !== "ready" || products.length === 0) return null;

  const names = sellerNames(products);
  const rows = names
    .map((seller) => {
      const listings = products.filter((product) => product.seller === seller);
      return {
        seller,
        count: listings.length,
        town: listings[0].location,
        from: Math.min(...listings.map((product) => product.price)),
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <section className={`${shell} pb-6 pt-14 sm:pb-10 sm:pt-20`}>
      <div className={`${panelDark} p-6 sm:p-9`}>
        <span className="cuk-dots absolute inset-0 text-white" aria-hidden />
        <span
          className="cuk-blob right-[-8%] top-[-30%] h-[240px] w-[240px] opacity-30"
          style={{ background: "#7fae6d" }}
          aria-hidden
        />

        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1.6px] text-[#dcecc6]">
              <span className="cuk-live-dot" aria-hidden />
              Publishing right now
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              The sellers behind these shelves
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">
              {rows.length} of {names.length} sellers with live listings. Prices
              and handovers are theirs to set, not ours.
            </p>
          </div>
          <Link
            href="/sell"
            className="group inline-flex items-center gap-2 rounded-full bg-[#a2bd70] px-5 py-3 text-sm font-semibold text-[#183a24] shadow-[0_12px_28px_rgba(162,189,112,0.3)] transition hover:-translate-y-0.5 hover:bg-[#c5dba9]"
          >
            Join them
            <Store size={15} className="transition group-hover:scale-110" />
          </Link>
        </div>

        <div className="relative mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row, index) => (
            <motion.div
              key={row.seller}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#a2bd70]/60 hover:bg-white/[0.12]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c5dba9] to-[#6f9a6b] text-base font-bold text-[#183a24] ring-2 ring-white/20">
                {row.seller.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{row.seller}</p>
                <p className="mt-0.5 text-xs text-white/65">
                  {row.count} {row.count === 1 ? "listing" : "listings"} · {row.town}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-[#c6dcae]">
                  from {money(row.from)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
