"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Store } from "lucide-react";
import {
  categoryTile,
  sellerNames,
  useProducts,
} from "@/app/lib/catalog";
import { btnGhost, card, kicker, panelDark } from "./styles";

const tips = [
  "Mention faults honestly — it prevents arguments at handover.",
  "Price against what is already on the shelf, not on the receipt.",
  "There is no in-app messaging yet, so agree how to stay in touch at the first reply.",
];

export default function SellSidebar() {
  const { status, products } = useProducts();
  const counts = new Map<string, number>();

  products.forEach((product) =>
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
  );

  const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const busiest = rows.length > 0 ? rows[0][1] : 0;

  return (
    <aside className="space-y-5">
      <div className={`${card} relative overflow-hidden`}>
        <p className={kicker}>
          <span className="cuk-live-dot" aria-hidden />
          On the shelf now
        </p>
        <ul className="mt-4 space-y-3.5 text-sm">
          {status === "loading" && (
            <>
              <li className="cuk-skeleton h-6 rounded-full" />
              <li className="cuk-skeleton h-6 rounded-full" />
              <li className="cuk-skeleton h-6 rounded-full" />
            </>
          )}

          {status === "ready" && rows.length === 0 && (
            <li className="rounded-2xl border border-dashed border-[#d7e3c9] bg-[#f7faf3] px-4 py-5 text-center text-sm text-gray-500">
              Nothing is listed yet — 🧺 yours would be the first.
            </li>
          )}

          {rows.map(([name, count]) => (
            <li key={name}>
              <Link
                href={`/products?category=${encodeURIComponent(name)}`}
                className="group flex items-center justify-between gap-3 text-gray-600 transition hover:text-[#234b35]"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span className="text-base">{categoryTile(name).emoji}</span>
                  {name}
                </span>
                <span className="rounded-full bg-[#eef4e6] px-2 py-0.5 text-[11px] font-bold text-[#3f5a46]">
                  {count} {count === 1 ? "listing" : "listings"}
                </span>
              </Link>
              <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[#eef1e7]">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-[#234b35] via-[#719477] to-[#c5dba9] transition-all duration-700 group-hover:brightness-110"
                  style={{ width: `${Math.max(8, (count / busiest) * 100)}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
        {status === "ready" && products.length > 0 && (
          <p className="mt-5 flex items-center gap-2 border-t border-[#e6e9dd] pt-4 text-xs text-gray-500">
            <Store size={13} className="text-[#719267]" aria-hidden />
            {sellerNames(products).length} sellers are publishing right now.
          </p>
        )}
      </div>

      <div className={`${panelDark} p-6`}>
        <span className="cuk-dots absolute inset-0 text-white" aria-hidden />
        <span
          className="cuk-blob right-[-14%] top-[-45%] h-[180px] w-[180px] opacity-25"
          style={{ background: "#9ec77f" }}
          aria-hidden
        />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[1.6px] text-[#d5e4c8] ring-1 ring-white/15">
            <Sparkles size={12} />
            List it well
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
            {tips.map((tip, index) => (
              <li key={tip} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c5dba9] text-[11px] font-bold text-[#234b35]">
                  {index + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-[#cfd9c4] bg-gradient-to-br from-white/80 to-[#f2f7ec] p-5 text-sm leading-6 text-gray-600">
        Listings you save stay on this device until seller publishing is
        connected. Not sure about delivery? Read{" "}
        <Link
          href="/shipping"
          className="font-semibold text-[#234b35] hover:underline"
        >
          delivery and pickup options
        </Link>
        .
      </div>

      <Link href="/products" className={`${btnGhost} group w-full`}>
        See what others are selling
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </Link>
    </aside>
  );
}
