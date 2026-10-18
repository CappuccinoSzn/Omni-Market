import type { Metadata } from "next";
import PageHeader from "@/app/ui/page-header";
import SellForm from "@/app/ui/sell-form";
import SellSidebar from "@/app/ui/sell-sidebar";
import { shell } from "@/app/ui/styles";

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
    "Create a free listing on Omni Market and reach buyers searching the marketplace.",
};

export default function SellPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="Start selling"
        title="Give your good stuff a new home"
        description="Turn what you no longer need into someone else's next favourite find. Listing an item is free."
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
        <SellSidebar />
      </div>
    </main>
  );
}
