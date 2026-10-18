"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { discountPercent, money, type Product } from "@/app/lib/catalog";
import { useApp } from "@/app/lib/store";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart, favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      className="group min-w-0 rounded-[20px] border border-[#e9eae3]/80 bg-white p-2.5 shadow-[0_5px_20px_rgba(28,54,34,0.025)] transition duration-300 hover:-translate-y-1 hover:border-[#d7e0cf] hover:shadow-[0_18px_38px_rgba(28,54,34,0.09)] sm:rounded-[26px] sm:p-3"
    >
      <div
        className="relative overflow-hidden rounded-[16px] sm:rounded-[20px]"
        style={{ backgroundColor: product.color }}
      >
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View details for ${product.name}`}
          className="block w-full overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/4.5] w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1.5 text-[9px] font-semibold text-[#234b35] shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:text-[10px]">
            {product.badge}
          </span>
        )}

        {product.oldPrice && (
          <span className="absolute bottom-2 left-2 rounded-full bg-[#234b35] px-2.5 py-1.5 text-[9px] font-semibold text-white shadow-sm sm:left-3 sm:bottom-3 sm:text-[10px]">
            −{discountPercent(product)}%
          </span>
        )}

        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={isFavorite}
          className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition sm:right-3 sm:top-3 ${
            isFavorite
              ? "bg-[#234b35] text-white"
              : "bg-white/95 text-gray-700 hover:text-[#234b35]"
          }`}
        >
          <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <button
          onClick={() => addToCart(product.id)}
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#234b35] shadow-[0_6px_18px_rgba(0,0,0,0.13)] transition duration-200 hover:scale-110 hover:bg-[#234b35] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a2bd70] sm:bottom-3 sm:right-3"
        >
          <ShoppingBag size={17} />
        </button>
      </div>

      <div className="px-1 pt-3 sm:px-1.5 sm:pt-4">
        <h3 className="text-sm font-semibold leading-snug text-[#26382a] sm:text-base">
          <Link
            href={`/products/${product.slug}`}
            className="text-left transition hover:text-[#719267] focus-visible:underline"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 text-[11px] text-gray-500 sm:text-xs">
          {product.condition} · {product.category}
        </p>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-sm font-bold sm:text-base">
            {money(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-gray-400 line-through sm:text-xs">
              {money(product.oldPrice)}
            </span>
          )}
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500 sm:text-xs">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#edf0e7] text-[9px] font-bold text-[#315e43]">
            {product.seller.charAt(0)}
          </span>
          {product.seller} · {product.location}
        </p>

        <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
          <span className="text-[#7a6a2e]">★</span> {product.rating.toFixed(1)} ·{" "}
          {product.reviews} ratings
        </p>
      </div>
    </motion.article>
  );
}
