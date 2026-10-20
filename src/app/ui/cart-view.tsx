"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useCartView, useFavoriteProducts } from "@/app/lib/cart";
import { money } from "@/app/lib/format";
import { useApp } from "@/app/lib/store";
import ProductMedia from "./product-media";
import {
  btnGhost,
  btnPrimary,
  card,
  kicker,
  rule,
} from "./styles";

export default function CartView() {
  const {
    cartCount,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    favorites,
    toggleFavorite,
  } = useApp();
  const {
    lines,
    itemCount,
    subtotal,
    unavailable,
    sellers,
    ready,
    status,
    error,
  } = useCartView();
  const savedItems = useFavoriteProducts();

  if (status === "error") {
    return (
      <main className="mx-auto w-full max-w-[1360px] px-4 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-xl rounded-[28px] border border-[#e6d9bd] bg-gradient-to-br from-[#fdf7ea] to-white p-7 text-center shadow-[0_18px_46px_rgba(28,54,34,0.08)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0b429] to-[#dd7a55] text-white shadow-[0_12px_26px_rgba(221,122,85,0.3)]">
            <ReceiptText size={26} />
          </span>
          <p className="mt-5 text-lg font-semibold">
            Your bag could not be priced.
          </p>
          <p className="mt-1 text-sm text-[#40544a]">{error}</p>
        </div>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-[1360px] px-4 py-16 sm:px-8 lg:px-12">
        <p className={kicker}>
          <span className="cuk-live-dot" aria-hidden />
          Counting your bag
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Your shopping bag
        </h1>
        <div className={rule} />
        <p className="mt-4 text-sm text-gray-500">
          Matching {cartCount} saved item{cartCount === 1 ? "" : "s"} with live
          listings...
        </p>
        <div className="mt-8 space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="cuk-skeleton h-36 rounded-3xl" />
          ))}
        </div>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto w-full max-w-[1360px] px-4 py-16 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[30px] border border-dashed border-[#cfd9c4] bg-gradient-to-br from-[#f2f7ec] to-white px-6 py-14 text-center">
          <span
            className="cuk-blob right-[4%] top-[-30%] h-[220px] w-[220px] opacity-30"
            style={{ background: "#9ec77f" }}
            aria-hidden
          />
          <motion.span
            initial={{ scale: 0.86, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="cuk-float relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[#315e43] shadow-[0_16px_38px_rgba(28,54,34,0.12)]"
          >
            <ShoppingBag size={34} />
          </motion.span>
          <h1 className="relative mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
            {cartCount > 0 ? (
              <>
                Your bag has{" "}
                <span className="cuk-grad-text font-serif font-normal italic">
                  no live listings
                </span>
              </>
            ) : (
              <>
                Your bag is{" "}
                <span className="cuk-grad-text font-serif font-normal italic">
                  empty
                </span>
              </>
            )}
          </h1>
          <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            {cartCount > 0
              ? `${unavailable} item${unavailable === 1 ? "" : "s"} in your bag point at listings that are no longer published. Nothing was charged.`
              : "Explore the marketplace and add something you love. Your bag is saved on this device, so you can come back any time."}
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/products" className={btnPrimary}>
              Browse listings <ArrowRight size={16} />
            </Link>
            {cartCount > 0 && (
              <button onClick={clearCart} className={btnGhost}>
                Clear saved ids
              </button>
            )}
            <Link href="/sell" className={btnGhost}>
              Sell an item
            </Link>
          </div>
        </div>

        {savedItems.length > 0 && (
          <section className="mt-12">
            <p className={kicker}>
              <Heart size={12} className="text-[#dd7a55]" fill="currentColor" />
              Saved for later
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Your favourites
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedItems.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="flex items-center gap-4 rounded-3xl border border-[#e6e9dd] bg-gradient-to-br from-white to-[#fafcf6] p-3 shadow-[0_6px_20px_rgba(28,54,34,0.05)] transition duration-300 hover:border-[#c7d8b8] hover:shadow-[0_18px_38px_rgba(28,54,34,0.10)]"
                >
                  <div className="w-20 shrink-0 overflow-hidden rounded-2xl">
                    <ProductMedia product={product} rounded="" className="h-20" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-sm font-semibold transition hover:text-[#315e43]"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm font-bold text-[#1f4531]">
                      {money(product.price)}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="rounded-full bg-gradient-to-br from-[#2c5c3f] to-[#173624] px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_18px_rgba(28,64,42,0.22)] transition hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Add to bag
                    </button>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-gray-500 transition hover:bg-[#fdf1f1] hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-[1360px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
      <span
        className="cuk-blob right-[-6%] top-6 h-[240px] w-[240px] opacity-30"
        style={{ background: "#9ec77f" }}
        aria-hidden
      />

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={kicker}>
            <span className="cuk-live-dot" aria-hidden />
            Almost there
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your{" "}
            <span className="cuk-grad-text font-serif font-normal italic">
              shopping bag
            </span>
          </h1>
          <div className={rule} />
          <p className="mt-4 text-sm text-gray-500">
            {itemCount} item{itemCount === 1 ? "" : "s"} from {lines.length}{" "}
            listing{lines.length === 1 ? "" : "s"} · {sellers} seller
            {sellers === 1 ? "" : "s"}.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="rounded-full border border-[#e2e7dc] bg-white/80 px-4 py-2.5 text-xs font-semibold text-gray-500 transition hover:-translate-y-0.5 hover:border-[#dd7a55] hover:text-[#c25a38] sm:text-sm"
        >
          Empty bag
        </button>
      </div>

      <div className="relative mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {unavailable > 0 && (
            <p className="rounded-2xl border border-[#f2d8d8] bg-gradient-to-br from-[#fdf1f1] to-white px-4 py-3 text-xs leading-5 text-red-700 shadow-[0_4px_14px_rgba(190,60,60,0.06)]">
              {unavailable} item{unavailable === 1 ? "" : "s"} you saved are no
              longer listed and are not included below.
            </p>
          )}

          {lines.map((line, index) => (
            <motion.article
              key={line.product.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="flex flex-wrap gap-4 rounded-[26px] border border-[#e6e9dd] bg-gradient-to-br from-white to-[#fafcf6] p-4 shadow-[0_8px_24px_rgba(28,54,34,0.05)] transition duration-300 hover:border-[#c7d8b8] hover:shadow-[0_20px_42px_rgba(28,54,34,0.11)] sm:flex-nowrap sm:p-5"
            >
              <div className="w-28 shrink-0 overflow-hidden rounded-2xl">
                <ProductMedia product={line.product} rounded="" className="h-28" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold">
                      <Link
                        href={`/products/${line.product.id}`}
                        className="transition hover:text-[#315e43]"
                      >
                        {line.product.name}
                      </Link>
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                      {line.product.condition} · {line.product.category} ·{" "}
                      {line.product.seller}, {line.product.location}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(line.product.id)}
                    aria-label={
                      favorites.includes(line.product.id)
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    aria-pressed={favorites.includes(line.product.id)}
                    className={`shrink-0 rounded-full border p-2 transition hover:scale-110 ${
                      favorites.includes(line.product.id)
                        ? "border-transparent bg-gradient-to-br from-[#dd7a55] to-[#c25a38] text-white"
                        : "border-[#dfe3d9] bg-white text-gray-500 hover:border-[#dd7a55] hover:text-[#c25a38]"
                    }`}
                  >
                    <Heart
                      size={16}
                      fill={
                        favorites.includes(line.product.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 rounded-full border border-[#e2e7dc] bg-white p-1.5 shadow-[0_4px_14px_rgba(28,54,34,0.06)]">
                    <button
                      onClick={() => decreaseQuantity(line.product.id)}
                      aria-label={`Decrease ${line.product.name} quantity`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f8ef] text-[#315e43] transition hover:scale-105 active:scale-95"
                    >
                      −
                    </button>
                    <span
                      key={line.quantity}
                      className="cuk-pop min-w-6 text-center text-sm font-bold text-[#1f4531]"
                    >
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(line.product.id)}
                      aria-label={`Increase ${line.product.name} quantity`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f8ef] text-[#315e43] transition hover:scale-105 active:scale-95"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(line.product.id)}
                    className="rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-red-600/80 transition hover:bg-[#fdf1f1] hover:text-red-700"
                  >
                    Remove
                  </button>

                  <p className="ml-auto text-xs text-gray-500 sm:text-sm">
                    {money(line.product.price)} each
                  </p>
                </div>
              </div>

              <p className="w-full shrink-0 text-right text-lg font-bold text-[#1f4531] sm:w-auto sm:self-center">
                {money(line.product.price * line.quantity)}
              </p>
            </motion.article>
          ))}
        </div>

        <aside className={`${card} relative h-fit overflow-hidden lg:sticky lg:top-28`}>
          <span
            className="cuk-blob left-[-14%] top-[-40%] h-[190px] w-[190px] opacity-25"
            style={{ background: "#a2bd70" }}
            aria-hidden
          />
          <div className="relative">
            <p className={kicker}>
              <ReceiptText size={12} className="text-[#315e43]" />
              Order summary
            </p>

            <div className="mt-5 space-y-3 border-t border-[#e6e9dd] pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Delivery</span>
                <span className="text-right text-gray-500">
                  Agreed with each seller
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 border-t border-[#e6e9dd] pt-4">
                <span className="font-semibold">Total</span>
                <span className="bg-gradient-to-r from-[#234b35] to-[#5d8a5b] bg-clip-text text-2xl font-black tracking-tight text-transparent">
                  {money(subtotal)}
                </span>
              </div>
            </div>

            <Link href="/checkout" className={`${btnPrimary} mt-6 w-full`}>
              Go to checkout <ArrowRight size={16} />
            </Link>
            <Link href="/products" className={`${btnGhost} mt-3 w-full`}>
              Continue shopping
            </Link>

            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-gray-500">
              <ShieldCheck
                size={14}
                className="mt-0.5 shrink-0 text-[#658958]"
                aria-hidden
              />
              Omni Market does not take payment. You pay the seller directly when
              you hand over or receive the item.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
