import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { categories } from "@/app/lib/catalog";
import { btnGhost, btnPrimary, shell } from "@/app/ui/styles";

export default function NotFound() {
  return (
    <main className={`${shell} py-20 sm:py-28`}>
      <div className="max-w-2xl">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf2e8]">
          <Search size={24} className="text-[#234b35]" />
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          That page took a walk
        </h1>
        <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
          The link you followed does not exist on Omni Market any more — or never
          did. The shop is still open, and these are the places people were
          heading.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products" className={btnPrimary}>
            Browse all products <ArrowRight size={16} />
          </Link>
          <Link href="/" className={btnGhost}>
            Back to the homepage
          </Link>
        </div>

        <div className="mt-10 border-t border-[#e6e8df] pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[1.5px] text-gray-500">
            Popular categories
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="rounded-full border border-[#e4e6de] bg-white px-4 py-2.5 text-sm text-gray-600 transition hover:border-[#234b35] hover:text-[#234b35]"
              >
                {category.emoji} {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
