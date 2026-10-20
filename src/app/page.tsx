import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import Hero from "@/app/ui/hero";
import {
  CategoryStrip,
  ListingRail,
  SellerSpotlight,
} from "@/app/ui/home-sections";
import { shell } from "@/app/ui/styles";

const trust = [
  {
    icon: ShieldCheck,
    tint: "#2f6b46",
    title: "Shop with confidence",
    body: "Clear listings and account controls",
  },
  {
    icon: Truck,
    tint: "#6fa8c9",
    title: "Convenient ordering",
    body: "Delivery terms set by each seller",
  },
  {
    icon: ShoppingBag,
    tint: "#f0b429",
    title: "A place for everyone",
    body: "Discover and sell across Kenya",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="border-y border-[#e9eae3] bg-white/70 px-4 py-7 shadow-[0_8px_30px_rgba(28,54,34,0.03)] backdrop-blur sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {trust.map((item) => (
            <div
              key={item.title}
              className="group flex items-center justify-center gap-3 transition sm:justify-start"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_8px_18px_rgba(28,54,34,0.16)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                style={{ background: item.tint }}
              >
                <item.icon size={19} />
              </span>
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CategoryStrip />

      <ListingRail
        kind="featured"
        kicker="Just listed"
        title="Fresh on the shelf"
        copy="The newest listings, straight from sellers who published them."
        href="/new"
        cta="See new arrivals"
      />

      <SellerSpotlight />

      <ListingRail
        kind="deals"
        kicker="Save more"
        title="Priced down by sellers"
        copy="Listings whose current price is below the price first set."
        href="/deals"
        cta="See all deals"
        limit={3}
      />

      <section className={`${shell} pb-16 pt-14 sm:pb-24`}>
        <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[28px] bg-[linear-gradient(120deg,#1d3d2b_0%,#234b35_55%,#355f40_100%)] px-6 py-10 text-white shadow-[0_28px_70px_rgba(35,75,53,0.2)] sm:rounded-[36px] sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <span className="cuk-dots absolute inset-0 text-white" aria-hidden />
          <span
            className="cuk-blob left-[62%] top-[-40%] h-[300px] w-[300px] opacity-30"
            style={{ background: "#9ec77f" }}
            aria-hidden
          />
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10 sm:h-96 sm:w-96" />
          <div className="absolute -right-4 -top-12 h-52 w-52 rounded-full border border-white/10 sm:h-72 sm:w-72" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-[#d5e4c8] ring-1 ring-white/15">
                <span className="cuk-live-dot" aria-hidden />
                Your next chapter starts here
                <Sparkles size={14} />
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-tight">
                Got something good?
                <br />
                <span className="font-serif text-[#c5dba9] italic">
                  Give it a new home.
                </span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                Turn the things you no longer need into someone else&apos;s next
                favourite find. Create a listing and meet your next customer.
              </p>
            </div>

            <Link
              href="/sell"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#c5dba9] px-6 py-4 text-sm font-semibold text-[#234b35] shadow-[0_16px_36px_rgba(197,219,169,0.28)] transition hover:-translate-y-1 hover:bg-white active:translate-y-0"
            >
              Start selling today
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
