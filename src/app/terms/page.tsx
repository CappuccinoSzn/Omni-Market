import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/app/ui/page-header";
import { BulletList, Callout, TextSection } from "@/app/ui/sections";
import { shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "Marketplace rules",
  description:
    "The rules that keep Omni Market listings accurate, buyers protected and sellers accountable.",
};

export default function TermsPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="Legal"
        title="Marketplace rules"
        description="Last updated 18 October 2026. By listing an item or placing an order you agree to these rules."
      />

      <TextSection title="Listings must be accurate">
        <BulletList
          items={[
            "Describe the real condition: new, like new or good, with any marks or faults.",
            "State what is included so buyers are not surprised at handover.",
            "Price what you actually intend to sell. Reserve nothing for a better offer.",
            "Only list items you are entitled to sell and physically have available.",
          ]}
        />
      </TextSection>

      <TextSection title="What cannot be listed">
        <BulletList
          items={[
            "Stolen goods or items you have no right to sell.",
            "Firearms, ammunition and regulated weapons.",
            "Prescription medicine without a licensed pharmacy account.",
            "Wildlife products and items restricted under Kenyan law.",
            "Counterfeit goods presented as originals.",
          ]}
        />
        <Callout>
          Listings that break these rules are removed and repeat accounts are
          closed. Law enforcement handles anything criminal — Omni Market does
          not shield it.
        </Callout>
      </TextSection>

      <TextSection title="Payments between buyers and sellers">
        <p>
          Omni Market does not hold funds. Payment is made directly to the seller
          at handover, by M-Pesa or cash. Keep the payment reference until the
          item is confirmed working. A seller who requests payment before a
          handover is agreed is acting against these rules.
        </p>
      </TextSection>

      <TextSection title="Conduct">
        <BulletList
          items={[
            "Reply honestly to buyer questions; do not misrepresent an item.",
            "No spam, duplicate listings or fake reviews.",
            "Respect the agreed collection point and time, or tell the other party early.",
            "Report anything suspicious through the contact page rather than resolving it in person.",
          ]}
        />
      </TextSection>

      <TextSection title="Disputes">
        <p>
          Raise the issue with the seller first with photos as evidence. If that
          does not resolve it, send us the listing reference, order reference and
          what happened. We can remove listings and close accounts, but we cannot
          reverse a payment made outside the platform.
        </p>
      </TextSection>

      <TextSection title="Availability and changes">
        <p>
          The service is provided as available. We may change features, including
          adding marketplace payment, and will update this page when the rules
          change. Continued use after an update means you accept it.
        </p>
      </TextSection>

      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link href="/privacy" className="font-semibold text-[#234b35] underline underline-offset-4">
          Privacy policy
        </Link>
        <Link href="/help" className="font-semibold text-[#234b35] underline underline-offset-4">
          Help centre
        </Link>
        <Link href="/contact" className="font-semibold text-[#234b35] underline underline-offset-4">
          Report a listing
        </Link>
      </div>
    </main>
  );
}
