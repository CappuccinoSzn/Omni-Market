"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { money } from "@/app/lib/catalog";
import { useApp } from "@/app/lib/store";

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useApp();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button
        type="button"
        aria-label="Close shopping cart"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="relative flex h-full w-full max-w-md flex-col bg-[#fcfcf9] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#e6e8df] px-5 py-5">
          <div>
            <h2 id="cart-title" className="text-xl font-bold">
              Your shopping bag
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {cartCount} item(s) selected
            </p>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="rounded-full p-2 hover:bg-[#eef1e9]"
          >
            <X size={21} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag size={42} className="text-[#719267]" />
            <h3 className="mt-4 text-lg font-semibold">Your bag is waiting</h3>
            <p className="mt-2 text-sm text-gray-500">
              Explore the marketplace and add something you love.
            </p>
            <Link
              href="/products"
              onClick={() => setCartOpen(false)}
              className="mt-5 rounded-full bg-[#234b35] px-5 py-3 text-sm font-semibold text-white"
            >
              Explore products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-4 border-b border-[#e6e8df] pb-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="hover:text-[#234b35]"
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {money(item.price)} each
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dfe3d9]"
                      >
                        −
                      </button>

                      <span className="min-w-5 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => addToCart(item.id)}
                        aria-label={`Increase ${item.name} quantity`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dfe3d9]"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-xs font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="shrink-0 text-sm font-bold">
                    {money(item.price * item.quantity)}
                  </p>
                </article>
              ))}
            </div>

            <div className="border-t border-[#e6e8df] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-xl font-bold">{money(cartTotal)}</span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Delivery fees, if applicable, will be calculated at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#234b35] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#315e43]"
              >
                Proceed to checkout <ArrowRight size={17} />
              </Link>

              <Link
                href="/cart"
                onClick={() => setCartOpen(false)}
                className="mt-3 w-full rounded-full border border-[#dfe3d9] px-5 py-3 text-sm font-semibold transition hover:border-[#234b35]"
              >
                View full bag
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
