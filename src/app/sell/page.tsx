import type { Metadata } from "next";
import Link from "next/link";
import { categories, countByCategory } from "@/app/lib/catalog";
import PageHeader from "@/app/ui/page-header";
import SellForm from "@/app/ui/sell-form";
import { btnGhost, shell } from "@/app/ui/styles";

const steps = [
  {
    title: "Describe the item",
    body: "Use a clear title, honest condition and the details a buyer would ask about.",
  },
  {
    title: "Set a fair price",
    body: "Check what similar items cost in the shop, then leave a little room to negotiate.",
  },
  {
    title: "Hand over and get paid",
    body: "Agree delivery or pickup with the buyer and receive payment at handover.",
  },
];

export const metadata: Metadata = {
  title: "Sell an item",
  description:
    "Create a listing on Omni Market in a minute and reach buyers across Kenya.",
};

export default function SellPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="Start selling"
        title="Give your good stuff a new home"
        description="Turn what you no longer need into someone else's next favourite find. Listings are free and take about a minute."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-2xl border border-[#e6e8df] bg-white p-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf2e8] text-sm font-bold text-[#234b35]">
              {index + 1}
            </span>
            <h2 className="mt-4 text-base font-semibold">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <SellForm />

        <aside className="space-y-5">
          <div className="rounded-3xl border border-[#e6e8df] bg-white p-5">
            <h2 className="text-base font-semibold">What sells well</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {categories.map((category) => (
                <li
                  key={category.slug}
                  className="flex items-center justify-between gap-3"
                >
                  <Link
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="text-gray-600 hover:text-[#234b35]"
                  >
                    {category.emoji} {category.name}
                  </Link>
                  <span className="text-xs text-gray-400">
                    {countByCategory(category.name)} listed
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-[#234b35] p-5 text-white">
            <h2 className="text-base font-semibold">List it well</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>Mention faults honestly — it prevents returns.</li>
              <li>Bundle small items to move them faster.</li>
              <li>Reply quickly; buyers compare sellers on response time.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-dashed border-[#dfe3d9] p-5 text-sm text-gray-600">
            Not sure about delivery? Read{" "}
            <Link href="/shipping" className="font-semibold text-[#234b35] hover:underline">
              delivery and pickup options
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-[#234b35] hover:underline">
              ask our team
            </Link>
            .
          </div>

          <Link href="/products" className={`${btnGhost} w-full`}>
            See what others are selling
          </Link>
        </aside>
      </div>
    </main>
  );
}
