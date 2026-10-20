"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  Heart,
  MapPin,
  PlugZap,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
} from "lucide-react";
import {
  findProduct,
  loadProducts,
  relatedProducts,
  useProducts,
} from "@/app/lib/catalog";
import { discountPercent, money } from "@/app/lib/format";
import { useApp } from "@/app/lib/store";
import ProductCard from "./product-card";
import ProductMedia from "./product-media";
import {
  btnGhost,
  btnPrimary,
  chip,
  kicker,
  panelDark,
  rule,
} from "./styles";

export default function ProductDetail({ id }: { id: number }) {
  const router = useRouter();
  const { addToCart, favorites, toggleFavorite, setCartOpen } = useApp();
  const { status, products, error } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [popKey, setPopKey] = useState(0);

  const product = status === "ready" ? findProduct(products, id) : null;

  if (status === "error") {
    return (
      <main className="relative mx-auto w-full max-w-[760px] px-4 py-16 sm:px-8">
        <span
          className="cuk-blob right-[6%] top-6 h-[220px] w-[220px] opacity-40"
          style={{ background: "#f0b429" }}
          aria-hidden
        />
        <div className="relative rounded-[28px] border border-[#e6d9bd] bg-gradient-to-br from-[#fdf7ea] to-white p-7 text-center shadow-[0_18px_46px_rgba(28,54,34,0.08)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0b429] to-[#dd7a55] text-white shadow-[0_12px_26px_rgba(221,122,85,0.3)]">
            <PlugZap size={26} />
          </span>
          <p className="mt-5 text-lg font-semibold">
            This listing could not be loaded.
          </p>
          <p className="mt-1 text-sm text-[#40544a]">{error}</p>
          <button
            onClick={() => loadProducts(true)}
            className={`${btnPrimary} mt-5`}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (status === "loading") {
    return (
      <main className="mx-auto grid w-full max-w-[1360px] gap-8 px-4 py-14 lg:grid-cols-2 lg:px-12">
        <div className="cuk-skeleton h-[320px] rounded-[28px] sm:h-[520px]" />
        <div className="space-y-4 pt-2">
          <div className="cuk-skeleton h-7 w-36 rounded-full" />
          <div className="cuk-skeleton h-12 w-2/3 rounded-2xl" />
          <div className="cuk-skeleton h-8 w-44 rounded-full" />
          <div className="cuk-skeleton h-28 w-full rounded-3xl" />
          <div className="cuk-skeleton h-14 w-full rounded-full" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="relative mx-auto w-full max-w-[760px] px-4 py-20 text-center sm:px-8">
        <span
          className="cuk-blob left-[10%] top-4 h-[240px] w-[240px] opacity-35"
          style={{ background: "#9ec77f" }}
          aria-hidden
        />
        <div className="relative">
          <span className="cuk-float mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-3xl shadow-[0_14px_34px_rgba(28,54,34,0.12)]">
            🔍
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            This listing is{" "}
            <span className="cuk-grad-text font-serif font-normal italic">
              no longer here
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            It may have been sold or taken down by the seller. Numbers like #{id}
            point at live listings only.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/products" className={btnPrimary}>
              Browse all listings <ArrowRight size={16} />
            </Link>
            <Link href="/categories" className={btnGhost}>
              Explore categories
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const save = product.oldPrice
    ? discountPercent(product.price, product.oldPrice)
    : 0;
  const related = relatedProducts(products, product).filter(
    (item) => item.id !== product.id
  );
  const listingId = product.id;

  const addMany = () => {
    for (let index = 0; index < quantity; index += 1) addToCart(listingId);
    setCartOpen(true);
  };

  const buyNow = () => {
    for (let index = 0; index < quantity; index += 1) addToCart(listingId);
    router.push("/checkout");
  };

  const favorite = () => {
    toggleFavorite(listingId);
    setPopKey((key) => key + 1);
  };

  return (
    <main className="relative mx-auto w-full max-w-[1360px] px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
      <span
        className="cuk-blob right-[-6%] top-10 h-[260px] w-[260px] opacity-30"
        style={{ background: "#9ec77f" }}
        aria-hidden
      />

      <nav className="relative flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <Link
          href="/"
          className="rounded-full bg-white/70 px-2.5 py-1 transition hover:bg-white hover:text-[#234b35]"
        >
          Home
        </Link>
        <span className="text-[#c3ceba]">/</span>
        <Link
          href="/products"
          className="rounded-full bg-white/70 px-2.5 py-1 transition hover:bg-white hover:text-[#234b35]"
        >
          Shop
        </Link>
        <span className="text-[#c3ceba]">/</span>
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="rounded-full bg-white/70 px-2.5 py-1 transition hover:bg-white hover:text-[#234b35]"
        >
          {product.category}
        </Link>
        <span className="text-[#c3ceba]">/</span>
        <span className="font-medium text-[#26382a]">{product.name}</span>
      </nav>

      <div className="relative mt-7 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="cuk-sheen-host relative overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(28,54,34,0.12)] ring-1 ring-black/[0.04]"
        >
          <ProductMedia
            product={product}
            rounded=""
            className="h-[320px] sm:h-[520px]"
          />
          <span className="cuk-sheen rounded-[28px]" aria-hidden />
          {product.badge && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[1.4px] text-[#234b35] shadow-[0_8px_20px_rgba(28,54,34,0.14)] backdrop-blur">
              <span className="cuk-live-dot" aria-hidden />
              {product.badge}
            </span>
          )}
          {save > 0 && (
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#dd7a55] to-[#c25a38] px-3 py-2 text-xs font-bold text-white shadow-[0_10px_26px_rgba(194,90,56,0.34)]">
              <BadgePercent size={14} />
              {save}% off · was {money(product.oldPrice ?? 0)}
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className={`${chip} hover:-translate-y-0.5 hover:border-[#234b35] hover:text-[#234b35]`}
            >
              <Tag size={12} className="text-[#719267]" />
              {product.category}
            </Link>
            <span className={`${chip} bg-white`}>
              <ShieldCheck size={12} className="text-[#719267]" />
              {product.condition}
            </span>
            <span className={`${chip} bg-white`}>
              <MapPin size={12} className="text-[#719267]" />
              {product.location}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[44px]">
            {product.name}
          </h1>
          <div className={rule} />

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <span className="bg-gradient-to-r from-[#234b35] via-[#315e43] to-[#5d8a5b] bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
              {money(product.price)}
            </span>
            {product.oldPrice !== null && product.oldPrice > product.price && (
              <span className="mb-1 rounded-full border border-[#f2d8cd] bg-gradient-to-r from-[#fdf1ea] to-white px-3 py-1.5 text-xs font-semibold text-[#c25a38]">
                <span className="line-through opacity-70">
                  {money(product.oldPrice)}
                </span>{" "}
                · you save {money((product.oldPrice ?? 0) - product.price)}
              </span>
            )}
          </div>

          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            The seller listed this as {product.condition.toLowerCase()} and has
            not added a longer description yet. Ask a question below for
            measurements, availability or the reason for the price.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-[#dfe6d6] bg-white p-1.5 shadow-[0_6px_18px_rgba(28,54,34,0.06)]">
              <button
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f8ef] text-[#315e43] transition hover:scale-105 active:scale-95"
              >
                −
              </button>
              <span
                key={quantity}
                className="cuk-pop min-w-7 text-center text-base font-bold text-[#1f4531]"
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((value) => Math.min(20, value + 1))}
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f8ef] text-[#315e43] transition hover:scale-105 active:scale-95"
              >
                +
              </button>
            </div>
            <p className="text-xs leading-5 text-gray-500">
              Quantity is confirmed with the seller before payment.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={addMany} className={btnPrimary}>
              <ShoppingBag size={17} /> Add to bag
            </button>
            <button onClick={buyNow} className={btnGhost}>
              Buy now <ArrowRight size={16} />
            </button>
            <button
              onClick={favorite}
              aria-pressed={isFavorite}
              className={`flex h-[50px] w-[50px] items-center justify-center rounded-full border shadow-[0_6px_18px_rgba(28,54,34,0.06)] transition hover:-translate-y-0.5 ${
                isFavorite
                  ? "border-transparent bg-gradient-to-br from-[#dd7a55] to-[#c25a38] text-white"
                  : "border-[#dfe3d9] bg-white text-gray-600 hover:border-[#dd7a55] hover:text-[#c25a38]"
              }`}
              aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
            >
              <Heart
                key={popKey}
                size={19}
                fill={isFavorite ? "currentColor" : "none"}
                className={isFavorite && popKey > 0 ? "cuk-pop" : undefined}
              />
            </button>
          </div>

          <div className="relative mt-8 overflow-hidden rounded-[26px] border border-[#e6e9dd] bg-gradient-to-br from-white to-[#f5f8f0] p-5 shadow-[0_10px_30px_rgba(28,54,34,0.06)]">
            <p className={kicker}>
              <span className="cuk-live-dot" aria-hidden />
              Sold by
            </p>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2c5c3f] to-[#173624] text-base font-bold text-[#c5dba9] shadow-[0_8px_18px_rgba(28,64,42,0.24)]">
                  {product.seller.charAt(0)}
                </span>
                <div>
                  <p className="text-base font-semibold">{product.seller}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin size={13} className="text-[#719267]" />
                    {product.location}
                  </p>
                </div>
              </div>
              <Link
                href={`/contact?about=${encodeURIComponent(`Listing #${product.id} — ${product.name}`)}`}
                className="shrink-0 rounded-full border border-[#dbe1d3] bg-white px-3 py-2 text-[11px] font-semibold text-[#234b35] transition hover:-translate-y-0.5 hover:border-[#8fae86] hover:bg-[#f4f8ef]"
              >
                Write about this listing
              </Link>
            </div>
            <div className="mt-4 flex items-start gap-2 border-t border-[#e6e9dd] pt-4 text-xs leading-5 text-gray-500">
              <Truck size={16} className="mt-0.5 shrink-0 text-[#658958]" />
              <span>
                Agree delivery or a collection point with the seller before
                paying.{" "}
                <Link
                  href="/shipping"
                  className="font-semibold text-[#234b35] hover:underline"
                >
                  See delivery options
                </Link>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="relative mt-16 sm:mt-20">
          <p className={kicker}>
            <span className="cuk-live-dot" aria-hidden />
            You may also like
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            More from{" "}
            <span className="cuk-grad-text font-serif font-normal italic">
              {product.category}
            </span>
          </h2>
          <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </section>
      )}

      <div
        className={`${panelDark} mt-14 flex flex-wrap items-center justify-between gap-5 px-6 py-8 sm:px-9`}
      >
        <span className="cuk-dots absolute inset-0 text-white" aria-hidden />
        <div className="relative max-w-lg">
          <h3 className="text-lg font-semibold sm:text-2xl">
            Found it, but it is not quite right?
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/75">
            Message the seller directly — most listings are still open to a
            conversation about price, pickup or a closer look.
          </p>
        </div>
        <Link
          href={`/contact?about=${encodeURIComponent(`Listing #${product.id} — ${product.name}`)}`}
          className="group relative inline-flex items-center gap-3 rounded-full bg-[#c5dba9] px-6 py-3.5 text-sm font-semibold text-[#234b35] shadow-[0_14px_32px_rgba(197,219,169,0.26)] transition hover:-translate-y-1 hover:bg-white active:translate-y-0"
        >
          Ask a question
          <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}
