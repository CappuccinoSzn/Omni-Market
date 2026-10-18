import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/app/ui/contact-form";
import PageHeader from "@/app/ui/page-header";
import { site } from "@/app/lib/site";
import { card, shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Put together a message about a listing, an order or selling on Omni Market, with a reference you can copy and send.",
};

const channels = [
  {
    title: "Nothing leaves this browser",
    body: "This is a demo build. The form does not transmit your message to a server, so keep the reference it gives you and send the note yourself.",
  },
  site.supportEmail
    ? {
        title: "Support inbox",
        body: `Write to ${site.supportEmail}${
          site.supportPhone ? ` or call ${site.supportPhone}.` : "."
        }`,
      }
    : {
        title: "No support inbox configured",
        body: "Omni Market has no support email or phone number for this build. Prepare the note in the form, copy it and send it to whoever you are dealing with.",
      },
  {
    title: "Report a listing",
    body: "Pick “Report a listing” in the form and include the listing number from the product page.",
  },
  {
    title: "Sellers and handovers",
    body: "Sellers set the price and the handover. There is no messaging on the site yet, so arrange how you will talk when you first make contact.",
  },
];

type AboutParam = Promise<{ about?: string }>;

function FormSkeleton() {
  return (
    <div className={`${card} h-[420px] animate-pulse`} aria-label="Loading form" />
  );
}

async function ResolvedContactForm({ searchParams }: { searchParams: AboutParam }) {
  const { about } = await searchParams;

  return <ContactForm about={about ?? ""} />;
}

export default function ContactPage({ searchParams }: { searchParams: AboutParam }) {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="Support"
        title="Tell us what happened"
        description="Order trouble, a listing that looks wrong, or a question about selling. Write it down here and keep the reference — this demo prepares the message but does not transmit it."
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Suspense fallback={<FormSkeleton />}>
          <ResolvedContactForm searchParams={searchParams} />
        </Suspense>

        <aside className={`${card} space-y-6`}>
          <h2 className="text-lg font-semibold">How this works</h2>

          <div className="space-y-5">
            {channels.map((channel) => (
              <div key={channel.title}>
                <h3 className="text-sm font-semibold text-[#26382a]">
                  {channel.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  {channel.body}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#e6e8df] pt-5 text-sm text-gray-600">
            Looking for a quick answer?{" "}
            <Link href="/help" className="font-semibold text-[#234b35] hover:underline">
              Check the help centre
            </Link>{" "}
            first — most delivery and pricing questions are covered there.
          </div>
        </aside>
      </div>
    </main>
  );
}
