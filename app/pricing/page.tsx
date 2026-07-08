import type { Metadata } from "next";
import { Suspense } from "react";
import { Check } from "lucide-react";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { Ed } from "@/components/ed/Ed";
import { PillLink } from "@/components/ed/PillLink";
import { TwoTone } from "@/components/ed/TwoTone";
import { EdFooter } from "@/components/sections/EdFooter";
import { EdNav } from "@/components/sections/EdNav";
import { faq } from "@/lib/faq";
import { BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "AU$79/month for your first 25 drivers — every channel, escalation and audit included. AU$3 per extra driver. No message markups, ever.",
  alternates: { canonical: "/pricing" }
};

const included = [
  "1 depot",
  "All channels — WhatsApp primary, SMS fallback",
  "Escalation ladder — supervisor, escalation contact, duty manager, admin alert",
  "Tamper-evident audit trail",
  "Driver-approved GPS check-in (never tracking)",
  "No apps for drivers or supervisors"
];

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <EdNav />

      <Ed className="pb-24 pt-16 lg:pt-24">
        <TwoTone
          size="xl"
          as="h1"
          lead="One plan. Your own accounts."
          rest="AU$79 a month covers your first 25 drivers with everything included. AU$3 per driver after that. That's the whole model."
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Suspense fallback={<div className="h-[560px] border border-hairline bg-cream/50" />}>
            <PricingCalculator />
          </Suspense>

          <div className="grid gap-10">
            <div>
              <h2 className="text-[13px] uppercase tracking-[0.12em] text-gray">
                Everything included
              </h2>
              <ul className="mt-5 grid gap-3 border-t border-hairline pt-5">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] leading-6 text-ink/80">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-green-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[13px] uppercase tracking-[0.12em] text-gray">
                Why there are no message fees
              </h2>
              <p className="mt-5 border-t border-hairline pt-5 text-[15px] leading-7 text-gray">
                <span className="text-ink">
                  You own your accounts. You pay carriers directly. We never mark
                  up your messages.
                </span>{" "}
                Your carrier and WhatsApp Business accounts stay yours — Xiaro is
                the routing layer on top, so you&apos;re never locked in.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border border-hairline p-6">
              <div>
                <h2 className="text-[16px] font-medium text-ink">Enterprise</h2>
                <p className="mt-1 text-[14px] text-gray">
                  Multiple depots, custom integrations, SLAs.
                </p>
              </div>
              <PillLink href={BOOKING_URL}>Talk to us</PillLink>
            </div>
          </div>
        </div>
      </Ed>

      <div className="border-t border-hairline py-20 lg:py-28">
        <Ed>
          <div className="max-w-3xl">
            <TwoTone lead="Questions fleets actually ask." />
            <div className="mt-10 divide-y divide-hairline border-y border-hairline">
              {faq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-[16px] text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="text-gray transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-7 text-gray">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Ed>
      </div>

      <EdFooter />
    </main>
  );
}
