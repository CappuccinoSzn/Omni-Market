"use client";

import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { useCartView, useFavoriteProducts } from "@/app/lib/cart";
import { money } from "@/app/lib/format";
import { useApp } from "@/app/lib/store";
import ProductMedia from "./product-media";
import { btnGhost, btnPrimary, card, eyebrow, noticePanel } from "./styles";

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
        <div className={noticePanel}>
          <p className="font-semibold">Your bag could not be priced.</p>
          <p className="mt-1 text-[#40544a]">{error}</p>
        </div>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-[1360px] px-4 py-16 sm:px-8 lg:px-12">
        <h1 className="text-3xl font-semibold tracking-tight">
          Your shopping bag
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Matching {cartCount} saved item{cartCount === 1 ? "" : "s"} with live
          listings...
        </p>
        <div className="mt-8 space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-36 animate-pulse rounded-3xl bg-[#eef1e9]" />
          ))}
        </div>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto w-full max-w-[1360px] px-4 py-16 sm:px-8 lg:px-12">
        <div className={`${card} text-center`}>
          <ShoppingBag size={44} className="mx-auto text-[#719267]" />
          <h1 className="mt-5 text-2xl font-semibold sm:text-3xl">
            {cartCount > 0 ? "Your bag has no live listings" : "Your bag is empty"}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            {cartCount > 0
              ? `${unavailable} item${unavailable === 1 ? "" : "s"} in your bag point at listings that are no longer published. Nothing was charged.`
              : "Explore the marketplace and add something you love. Your bag is saved on this device, so you can come back any time."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
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
            <p className={eyebrow}>Saved for later</p>
            <h2 className="mt-3 text-2xl font-semibold">Your favourites</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedItems.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-2xl border border-[#e6e8df] bg-white p-3"
                >
                  <div className="w-20 shrink-0">
                    <ProductMedia
                      product={product}
                      rounded="rounded-xl"
                      className="h-20"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-sm font-semibold hover:text-[#234b35]"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">
                      {money(product.price)}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="rounded-full bg-[#234b35] px-3 py-2 text-xs font-semibold text-white hover:bg-[#315e43]"
                    >
                      Add to bag
                    </button>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="text-xs font-medium text-gray-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1360px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={eyebrow}>Almost there</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your shopping bag
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {itemCount} item{itemCount === 1 ? "" : "s"} from {lines.length}{" "}
            listing{lines.length === 1 ? "" : "s"} · {sellers} seller
            {sellers === 1 ? "" : "s"}.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-gray-500 underline underline-offset-4 hover:text-red-600"
        >
          Empty bag
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {unavailable > 0 && (
            <p className="rounded-2xl bg-[#fdf1f1] px-4 py-3 text-xs text-red-700">
              {unavailable} item{unavailable === 1 ? "" : "s"} you saved are no
              longer listed and are not included below.
            </p>
          )}

          {lines.map((line) => (
            <article
              key={line.product.id}
              className="flex flex-wrap gap-4 rounded-3xl border border-[#e6e8df] bg-white p-4 sm:flex-nowrap sm:p-5"
            >
              <div className="w-28 shrink-0">
                <ProductMedia
                  product={line.product}
                  rounded="rounded-2xl"
                  className="h-28"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold">
                      <Link
                        href={`/products/${line.product.id}`}
                        className="hover:text-[#234b35]"
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
                    className={`shrink-0 rounded-full border p-2 transition ${
                      favorites.includes(line.product.id)
                        ? "border-[#234b35] bg-[#edf2e8] text-[#234b35]"
                        : "border-[#dfe3d9] text-gray-500 hover:border-[#234b35]"
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
                  <div className="flex items-center gap-2 rounded-full border border-[#dfe3d9] px-2 py-1.5">
                    <button
                      onClick={() => decreaseQuantity(line.product.id)}
                      aria-label={`Decrease ${line.product.name} quantity`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dfe3d9]"
                    >
                      −
                    </button>
                    <span className="min-w-5 text-center text-sm font-semibold">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(line.product.id)}
                      aria-label={`Increase ${line.product.name} quantity`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dfe3d9]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(line.product.id)}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>

                  <p className="ml-auto text-sm text-gray-500">
                    {money(line.product.price)} each
                  </p>
                </div>
              </div>

              <p className="w-full shrink-0 text-right text-lg font-bold sm:w-auto sm:self-center">
                {money(line.product.price * line.quantity)}
              </p>
            </article>
          ))}
        </div>

        <aside className={`${card} h-fit lg:sticky lg:top-28`}>
          <h2 className="text-lg font-semibold">Order summary</h2>

          <div className="mt-5 space-y-3 border-t border-[#e6e8df] pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">{money(subtotal)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Delivery</span>
              <span className="text-gray-500">Agreed with each seller</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-[#e6e8df] pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">{money(subtotal)}</span>
            </div>
          </div>

          <Link href="/checkout" className={`${btnPrimary} mt-6 w-full`}>
            Go to checkout <ArrowRight size={16} />
          </Link>
          <Link href="/products" className={`${btnGhost} mt-3 w-full`}>
            Continue shopping
          </Link>

          <p className="mt-5 text-xs leading-5 text-gray-500">
            Omni Market does not take payment. You pay the seller directly when
            you hand over or receive the item.
          </p>
        </aside>
      </div>
    </main>
  );
}
