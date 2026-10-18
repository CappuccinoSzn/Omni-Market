import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/app/ui/page-header";
import { BulletList, Callout, TextSection } from "@/app/ui/sections";
import { shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What Omni Market stores, why it is stored, and how you can see or remove it.",
};

export default function PrivacyPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="Legal"
        title="Privacy policy"
        description="Last updated 18 October 2026. Short version: your shopping data stays on your device, and an account only stores what it needs to sign you in."
      />

      <TextSection title="What we store on your device">
        <p>
          Your shopping bag, favourites, saved listings and order drafts are
          written to your browser&apos;s local storage under keys prefixed with{" "}
          <code className="rounded bg-[#f0f2eb] px-1.5 py-0.5 text-xs">
            omni-market-
          </code>
          . Nothing in that list is sent to us automatically.
        </p>
        <BulletList
          items={[
            "Bag contents: product references and quantities.",
            "Favourites: product references you saved with the heart button.",
            "Listings and orders: what you submitted through the sell and checkout forms.",
          ]}
        />
        <Callout>
          Clearing your browser storage removes all of it immediately. There is
          no server copy to delete.
        </Callout>
      </TextSection>

      <TextSection title="What an account holds">
        <p>
          If you create an account, authentication is handled by Supabase. We
          store your email address and a hashed password. We do not ask for a
          phone number, national ID or address to open an account.
        </p>
      </TextSection>

      <TextSection title="What we do not do">
        <BulletList
          items={[
            "No advertising trackers or third-party analytics cookies.",
            "No sale or rental of personal information.",
            "No payment details collected in the marketplace — payment happens between buyer and seller.",
          ]}
        />
      </TextSection>

      <TextSection title="Delivery and contact information">
        <p>
          When you place an order, the name, phone number, county and address you
          enter are shared with the seller so the handover can happen. That is
          the only time your details leave the marketplace.
        </p>
      </TextSection>

      <TextSection title="Your choices">
        <BulletList
          items={[
            "Browse without an account at any time.",
            "Delete individual listings and orders from your dashboard.",
            "Ask us to delete an account by using the contact page.",
          ]}
        />
      </TextSection>

      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link href="/contact" className="font-semibold text-[#234b35] underline underline-offset-4">
          Contact the team
        </Link>
        <Link href="/terms" className="font-semibold text-[#234b35] underline underline-offset-4">
          Read the marketplace rules
        </Link>
      </div>
    </main>
  );
}
