import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/app/ui/page-header";
import { BulletList, CardGrid, StatGrid, TextSection } from "@/app/ui/sections";
import { btnGhost, btnPrimary, shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Omni Market is a Kenyan marketplace built to make discovering, buying and selling everyday items simple and fair.",
};

export default function AboutPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="About Omni Market"
        title="A marketplace built around good finds"
        description="Omni Market started with a simple frustration: finding something fair-priced usually meant knowing the right shop, the right town or the right person. We are building the place where sellers and buyers find each other instead."
      />

      <StatGrid
        items={[
          { value: "0", label: "Listing fees, always" },
          { value: "Direct", label: "Payment between buyer and seller" },
          { value: "On device", label: "Bag, favourites and drafts stay with you" },
        ]}
      />

      <TextSection title="What we care about">
        <CardGrid
          items={[
            {
              title: "Honest listings",
              body: "Every item shows its condition, the seller behind it and where it is located. No hidden surprises at handover.",
            },
            {
              title: "Fair prices",
              body: "Sellers set their own price and buyers can compare similar items in the same category in seconds.",
            },
            {
              title: "Simple handovers",
              body: "Choose rider delivery or agree a collection point. Payment happens directly between you and the seller.",
            },
            {
              title: "Built for everyone",
              body: "Works well on a phone with a modest data plan, in English, and without an account if you prefer.",
            },
          ]}
        />
      </TextSection>

      <TextSection title="How buying works">
        <BulletList
          items={[
            "Browse the shop or search by product, category or town.",
            "Open a product page to read the price, condition, seller and location.",
            "Add to your bag, then fill in your delivery details at checkout.",
            "The order is saved on this device, and you pay the seller directly at handover by M-Pesa or cash.",
          ]}
        />
      </TextSection>

      <TextSection title="How selling works">
        <BulletList
          items={[
            "Describe the item honestly, set a price and pick a condition.",
            "Your listing gets a reference number and appears on your dashboard.",
            "Agree the handover with the buyer yourself — messaging between buyers and sellers is not part of the site yet.",
            "You get paid when the item changes hands — we take no cut.",
          ]}
        />
      </TextSection>

      <TextSection title="Where we are going">
        <p>
          Today Omni Market handles discovery, bagging and checkout preparation,
          and keeps your activity in this browser. Next comes direct seller
          messaging, orders that reach the seller, online payment through the
          marketplace and reviews so buyers can see how a seller performs. We
          build these in the open and ship what buyers and sellers actually ask
          for.
        </p>
      </TextSection>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/products" className={btnPrimary}>
          Browse the shop <ArrowRight size={16} />
        </Link>
        <Link href="/sell" className={btnGhost}>
          Start selling
        </Link>
        <Link href="/contact" className={btnGhost}>
          Talk to us
        </Link>
      </div>
    </main>
  );
}
