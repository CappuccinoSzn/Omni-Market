"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/app/lib/catalog";
import { discountPercent, money } from "@/app/lib/format";
import { useApp } from "@/app/lib/store";
import ProductMedia from "./product-media";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart, favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(product.id);
  const save = discountPercent(product.price, product.oldPrice);
  const [popKey, setPopKey] = useState(0);

  function favorite() {
    toggleFavorite(product.id);
    setPopKey((key) => key + 1);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group cuk-sheen-host relative min-w-0 rounded-[20px] border border-[#e9eae3]/90 bg-gradient-to-b from-white to-[#fbfcf7] p-2.5 shadow-[0_5px_20px_rgba(28,54,34,0.03)] transition duration-300 hover:border-[#c7dbc0] hover:shadow-[0_22px_46px_rgba(28,54,34,0.12)] sm:rounded-[26px] sm:p-3"
    >
      <div className="relative overflow-hidden rounded-[16px] sm:rounded-[20px]">
        <Link
          href={`/products/${product.id}`}
          aria-label={`View details for ${product.name}`}
          className="block w-full overflow-hidden"
        >
          <ProductMedia
            product={product}
            rounded=""
            className="aspect-[4/4.5] transition duration-700 ease-out group-hover:scale-[1.06]"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[1px] text-[#234b35] shadow-[0_4px_12px_rgba(28,54,34,0.12)] sm:left-3 sm:top-3 sm:px-3 sm:text-[10px]">
            {product.badge}
          </span>
        )}

        {save > 0 && (
          <span className="absolute bottom-2 left-2 rounded-full bg-gradient-to-r from-[#dd7a55] to-[#c25a38] px-2.5 py-1.5 text-[9px] font-bold text-white shadow-[0_6px_16px_rgba(194,90,56,0.35)] sm:bottom-3 sm:left-3 sm:text-[10px]">
            −{save}% today
          </span>
        )}

        <button
          onClick={favorite}
          aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={isFavorite}
          className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full shadow-[0_4px_14px_rgba(28,54,34,0.14)] backdrop-blur-sm transition sm:right-3 sm:top-3 ${
            isFavorite
              ? "bg-[#234b35] text-white"
              : "bg-white/95 text-gray-700 hover:scale-110 hover:text-[#234b35]"
          }`}
        >
          <Heart
            key={popKey}
            size={17}
            fill={isFavorite ? "currentColor" : "none"}
            className={isFavorite && popKey > 0 ? "cuk-pop" : undefined}
          />
        </button>

        <button
          onClick={() => addToCart(product.id)}
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-2 right-2 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-white text-[#234b35] opacity-0 shadow-[0_8px_22px_rgba(0,0,0,0.16)] transition duration-200 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a2bd70] group-hover:translate-y-0 group-hover:scale-110 group-hover:bg-[#234b35] group-hover:text-white group-hover:opacity-100 sm:bottom-3 sm:right-3"
        >
          <ShoppingBag size={17} />
        </button>
      </div>

      <div className="px-1 pt-3 sm:px-1.5 sm:pt-4">
        <h3 className="text-sm font-semibold leading-snug text-[#26382a] sm:text-base">
          <Link
            href={`/products/${product.id}`}
            className="text-left transition hover:text-[#719267] focus-visible:underline"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 text-[11px] text-gray-500 sm:text-xs">
          {product.condition} · {product.category}
        </p>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-[15px] font-bold text-[#1f4531] sm:text-base">
            {money(product.price)}
          </span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-[11px] text-gray-400 line-through sm:text-xs">
              {money(product.oldPrice)}
            </span>
          )}
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500 sm:text-xs">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#dcead0] to-[#eef4e6] text-[9px] font-bold text-[#315e43]">
            {product.seller.charAt(0)}
          </span>
          {product.seller} · {product.location}
        </p>
      </div>

      <span className="pointer-events-none mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#234b35] opacity-0 transition duration-300 group-hover:opacity-100">
        View listing <ArrowRight size={12} />
      </span>
    </motion.article>
  );
}
