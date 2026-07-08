import type { Metadata } from "next";
import { Suspense } from "react";
import { Check } from "lucide-react";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustRow } from "@/components/sections/TrustRow";
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
    <main className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />

      <section className="border-b border-hairline px-5 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pricing"
            title="One plan. Your own accounts. No markups."
            copy="AU$79/month covers your first 25 drivers with every feature included. AU$3 per driver after that. That's the whole model."
          />
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Suspense
              fallback={<div className="h-[560px] rounded-2xl border border-hairline bg-card" />}
            >
              <PricingCalculator />
            </Suspense>
            <div className="grid gap-6">
              <div className="rounded-2xl border border-hairline bg-card p-6 sm:p-8">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  Everything included
                </h3>
                <ul className="mt-5 grid gap-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-green-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-green/30 bg-green/5 p-6 sm:p-8">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#136A3E]">
                  Why there are no message fees
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  You own your accounts. You pay carriers directly.{" "}
                  <span className="font-semibold text-ink">
                    We never mark up your messages.
                  </span>{" "}
                  Your carrier and WhatsApp Business accounts stay yours — Xiaro
                  is the routing layer on top, so you&apos;re never locked in.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-hairline bg-card p-6 sm:p-8">
                <div>
                  <h3 className="font-semibold text-ink">Enterprise</h3>
                  <p className="mt-1 text-sm text-muted">
                    Multiple depots, custom integrations, SLAs.
                  </p>
                </div>
                <Button href={BOOKING_URL} variant="outline">
                  Talk to us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustRow />

      <section className="px-5 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Questions fleets actually ask." center />
          <div className="mt-10 divide-y divide-hairline border-y border-hairline">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="font-mono text-muted transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
