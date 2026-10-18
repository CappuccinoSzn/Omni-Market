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
          { value: "47", label: "Counties our sellers ship across" },
          { value: "1 min", label: "Average time to publish a listing" },
          { value: "0", label: "Listing fees, always" },
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
            "Browse the shop or search by product, seller or town.",
            "Open a product page to read condition, highlights and seller details.",
            "Add to your bag, then confirm delivery details at checkout.",
            "The seller confirms and you pay at handover by M-Pesa or cash.",
          ]}
        />
      </TextSection>

      <TextSection title="How selling works">
        <BulletList
          items={[
            "Describe the item honestly, set a price and pick a condition.",
            "Your listing gets a reference number and appears on your dashboard.",
            "Buyers message you through the listing to agree a handover.",
            "You get paid when the item changes hands — we take no cut.",
          ]}
        />
      </TextSection>

      <TextSection title="Where we are going">
        <p>
          Today Omni Market handles discovery, bagging and checkout preparation.
          Next comes direct seller messaging, online payment through the
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
