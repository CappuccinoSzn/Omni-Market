"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles, X } from "lucide-react";
import { useCartView } from "@/app/lib/cart";
import { money } from "@/app/lib/format";
import { useApp } from "@/app/lib/store";
import ProductMedia from "./product-media";

const spring = { type: "spring", stiffness: 320, damping: 30 } as const;

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartCount,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useApp();
  const { lines, itemCount, subtotal, unavailable, sellers, ready } = useCartView();

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close shopping cart"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-[#0f2217]/45 backdrop-blur-[3px]"
          />

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={spring}
            className="relative flex h-full w-full max-w-md flex-col bg-gradient-to-b from-[#fbfcf6] via-white to-[#f3f7ee] shadow-[-24px_0_60px_rgba(18,41,29,0.22)]"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1d3d2b] via-[#234b35] to-[#315e43] px-5 py-5 text-white">
              <span className="cuk-dots absolute inset-0 text-white" aria-hidden />
              <span
                className="cuk-blob right-[-10%] top-[-60%] h-[190px] w-[190px] opacity-30"
                style={{ background: "#9ec77f" }}
                aria-hidden
              />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[1.6px] text-[#d5e4c8] ring-1 ring-white/15">
                    <span className="cuk-live-dot" aria-hidden />
                    On this device
                  </p>
                  <h2 id="cart-title" className="mt-2 text-xl font-bold tracking-tight">
                    Your shopping bag
                  </h2>
                  <p className="mt-1 text-sm text-white/70">
                    {cartCount} item{cartCount === 1 ? "" : "s"} added
                  </p>
                </div>

                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="rounded-full bg-white/12 p-2 text-white ring-1 ring-white/15 transition hover:rotate-90 hover:bg-white/20"
                >
                  <X size={21} />
                </button>
              </div>
            </div>

            {cartCount === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <motion.span
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={spring}
                  className="cuk-float flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[#315e43] shadow-[0_16px_38px_rgba(28,54,34,0.12)]"
                >
                  <ShoppingBag size={34} />
                </motion.span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#234b35]">
                  Your bag is waiting
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                  Explore the marketplace and add something you love.
                </p>
                <Link
                  href="/products"
                  onClick={() => setCartOpen(false)}
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2c5c3f] to-[#173624] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(28,64,42,0.24)] transition hover:-translate-y-0.5 active:translate-y-0"
                >
                  Explore listings
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </Link>
              </div>
            ) : !ready ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-sm text-gray-500">
                  Matching your saved ids with live listings...
                </p>
                <div className="cuk-skeleton h-1.5 w-40 rounded-full" />
              </div>
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <span className="cuk-float flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-3xl shadow-[0_16px_38px_rgba(28,54,34,0.12)]">
                  🧺
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#234b35]">
                  These listings are no longer live
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                  {unavailable} item{unavailable === 1 ? "" : "s"} in your bag point at
                  listings that have been taken down.
                </p>
                <Link
                  href="/products"
                  onClick={() => setCartOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2c5c3f] to-[#173624] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(28,64,42,0.24)] transition hover:-translate-y-0.5"
                >
                  Find a replacement <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {unavailable > 0 && (
                    <p className="rounded-2xl border border-[#f2d8d8] bg-gradient-to-br from-[#fdf1f1] to-white px-4 py-3 text-xs leading-5 text-red-700 shadow-[0_4px_14px_rgba(190,60,60,0.06)]">
                      {unavailable} item{unavailable === 1 ? "" : "s"} in your bag is no
                      longer listed and will not be charged.
                    </p>
                  )}

                  {lines.map((line, index) => (
                    <motion.article
                      key={line.product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, delay: index * 0.05 }}
                      whileHover={{ y: -3 }}
                      className="group relative overflow-hidden rounded-3xl border border-[#e6e9dd] bg-white/90 p-3 shadow-[0_6px_20px_rgba(28,54,34,0.05)] transition hover:border-[#c7d8b8] hover:shadow-[0_16px_34px_rgba(28,54,34,0.10)]"
                    >
                      <div className="flex gap-3">
                        <div className="w-24 shrink-0 overflow-hidden rounded-2xl">
                          <ProductMedia
                            product={line.product}
                            rounded=""
                            className="h-24"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold leading-snug text-[#26382a] sm:text-[15px]">
                            <Link
                              href={`/products/${line.product.id}`}
                              onClick={() => setCartOpen(false)}
                              className="transition hover:text-[#315e43]"
                            >
                              {line.product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            {money(line.product.price)} each · {line.product.location}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full border border-[#e2e7dc] bg-[#f7f9f2] p-1">
                              <button
                                onClick={() => decreaseQuantity(line.product.id)}
                                aria-label={`Decrease ${line.product.name} quantity`}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#315e43] shadow-[0_2px_8px_rgba(28,54,34,0.08)] transition hover:scale-105 active:scale-95"
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
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#315e43] shadow-[0_2px_8px_rgba(28,54,34,0.08)] transition hover:scale-105 active:scale-95"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(line.product.id)}
                              className="ml-auto rounded-full px-2 py-1 text-[11px] font-semibold text-red-600/80 transition hover:bg-[#fdf1f1] hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <p className="shrink-0 self-start text-sm font-bold text-[#1f4531]">
                          {money(line.product.price * line.quantity)}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>

                <div className="relative overflow-hidden border-t border-[#e6e9dd] bg-white px-5 py-5">
                  <span
                    className="cuk-blob left-[-12%] bottom-[-70%] h-[180px] w-[180px] opacity-25"
                    style={{ background: "#a2bd70" }}
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="flex items-end justify-between gap-3">
                      <span className="text-xs leading-5 text-gray-500 sm:text-sm">
                        Subtotal · {itemCount} item{itemCount === 1 ? "" : "s"} from{" "}
                        {sellers} seller{sellers === 1 ? "" : "s"}
                      </span>
                      <span className="bg-gradient-to-r from-[#234b35] to-[#5d8a5b] bg-clip-text text-2xl font-black tracking-tight text-transparent">
                        {money(subtotal)}
                      </span>
                    </div>

                    <p className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500">
                      <Sparkles size={12} className="text-[#a2bd70]" aria-hidden />
                      Delivery fees, if applicable, are agreed with each seller.
                    </p>

                    <Link
                      href="/checkout"
                      onClick={() => setCartOpen(false)}
                      className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#2c5c3f] via-[#234b35] to-[#173624] px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(28,64,42,0.26)] transition hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Proceed to checkout
                      <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href="/cart"
                      onClick={() => setCartOpen(false)}
                      className="mt-3 w-full rounded-full border border-[#dfe3d9] bg-white px-5 py-3 text-sm font-semibold text-[#26382a] transition hover:-translate-y-0.5 hover:border-[#8fae86] hover:bg-[#f4f8ef]"
                    >
                      View full bag
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
