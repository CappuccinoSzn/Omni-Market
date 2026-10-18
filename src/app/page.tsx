import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import {
  categories,
  countByCategory,
  deals,
  featuredProducts,
} from "@/app/lib/catalog";
import Hero from "@/app/ui/hero";
import ProductCard from "@/app/ui/product-card";
import { eyebrow, shell } from "@/app/ui/styles";

const trust = [
  {
    icon: ShieldCheck,
    title: "Shop with confidence",
    body: "Clear listings and account controls",
  },
  {
    icon: Truck,
    title: "Convenient ordering",
    body: "Delivery options at checkout",
  },
  {
    icon: ShoppingBag,
    title: "A place for everyone",
    body: "Discover and sell across Kenya",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="border-y border-[#e9eae3] bg-white/85 px-4 py-6 shadow-[0_8px_30px_rgba(28,54,34,0.025)] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {trust.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-center gap-3 sm:justify-start"
            >
              <item.icon className="text-[#658958]" size={23} />
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${shell} pb-5 pt-14 sm:pt-20`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={eyebrow}>Browse your way</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Explore categories
            </h2>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              A little something for every part of life.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-[#e2e5dc] bg-white px-4 py-2.5 text-sm font-medium transition hover:border-[#234b35] hover:text-[#234b35]"
          >
            View all products <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group rounded-2xl border border-[#e9eae3] bg-white p-4 shadow-[0_5px_18px_rgba(28,54,34,0.025)] transition duration-300 hover:-translate-y-1 hover:border-[#cbd7c2] hover:shadow-[0_16px_32px_rgba(28,54,34,0.08)] sm:rounded-[22px] sm:p-5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f2eb] text-2xl transition group-hover:scale-105">
                {category.emoji}
              </span>
              <span className="mt-4 block text-sm font-semibold">
                {category.name}
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                {countByCategory(category.name)} live listings
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${shell} pb-14 pt-14 sm:pb-20 sm:pt-20`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={eyebrow}>Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Worth a closer look
            </h2>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Fresh finds, good deals and everyday favourites.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-[#e2e5dc] bg-white px-4 py-2.5 text-sm font-medium transition hover:border-[#234b35] hover:text-[#234b35]"
          >
            Browse the shop <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className={`${shell} pb-14 sm:pb-20`}>
        <div className="rounded-[28px] border border-[#e6e8df] bg-white p-5 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={eyebrow}>Save more</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Priced down this week
              </h2>
            </div>
            <Link
              href="/products?sort=deals"
              className="text-sm font-semibold text-[#234b35] underline underline-offset-4 hover:text-[#315e43]"
            >
              See all deals
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-3">
            {deals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${shell} pb-16 sm:pb-24`}>
        <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[28px] bg-[linear-gradient(120deg,#1d3d2b_0%,#234b35_55%,#355f40_100%)] px-6 py-10 text-white shadow-[0_28px_70px_rgba(35,75,53,0.18)] sm:rounded-[36px] sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10 sm:h-96 sm:w-96" />
          <div className="absolute -right-4 -top-12 h-52 w-52 rounded-full border border-white/10 sm:h-72 sm:w-72" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-[#d5e4c8]">
                <Sparkles size={14} /> Your next chapter starts here
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-tight">
                Got something good?
                <br />
                Give it a new home.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                Turn the things you no longer need into someone else&apos;s next
                favourite find. Create a listing and meet your next customer.
              </p>
            </div>

            <Link
              href="/sell"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-[#c5dba9] px-6 py-4 text-sm font-semibold text-[#234b35] transition hover:-translate-y-1 hover:bg-white"
            >
              Start selling today <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
