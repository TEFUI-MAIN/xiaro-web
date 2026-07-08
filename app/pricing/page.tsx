import type { Metadata } from "next";
import { Suspense } from "react";
import { Check } from "lucide-react";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { Announcement } from "@/components/sections/Announcement";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { TrustRow } from "@/components/sections/TrustRow";
import { Display } from "@/components/zd/Display";
import { Eyebrow } from "@/components/zd/Eyebrow";
import { Inset, SectionCard } from "@/components/zd/SectionCard";
import { Pill } from "@/components/zd/Pill";
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
      <Announcement />
      <Header />

      <Inset className="pb-20 pt-16 lg:pt-24">
        <div className="max-w-3xl">
          <Eyebrow tone="green">Pricing</Eyebrow>
          <Display level={1} className="mt-5">
            One plan. Your own accounts. No&nbsp;markups.
          </Display>
          <p className="mt-6 max-w-xl text-lg leading-7 text-ink/60">
            AU$79/month covers your first 25 drivers with every feature included.
            AU$3 per driver after that. That&apos;s the whole model.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Suspense
            fallback={<div className="h-[560px] rounded-3xl bg-cream" />}
          >
            <PricingCalculator />
          </Suspense>

          <div className="grid gap-6">
            <SectionCard tone="gray" className="p-7 sm:p-9">
              <h2 className="text-sm font-bold uppercase tracking-[0.75px] text-ink/60">
                Everything included
              </h2>
              <ul className="mt-5 grid gap-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] leading-6 text-ink/70">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-green-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard tone="navy" className="p-7 sm:p-9">
              <h2 className="text-sm font-bold uppercase tracking-[0.75px] text-volt">Why there are no message fees</h2>
              <p className="mt-4 text-[15px] leading-7 text-cream/80">
                You own your accounts. You pay carriers directly.{" "}
                <span className="font-semibold text-cream">We never mark up your messages.</span>{" "}
                Your carrier and WhatsApp Business accounts stay yours — Xiaro is
                the routing layer on top, so you&apos;re never locked in.
              </p>
            </SectionCard>

            <SectionCard tone="gray" className="flex flex-wrap items-center justify-between gap-4 p-7 sm:p-9">
              <div>
                <h2 className="text-lg font-semibold">Enterprise</h2>
                <p className="mt-1 text-sm text-ink/60">
                  Multiple depots, custom integrations, SLAs.
                </p>
              </div>
              <Pill href={BOOKING_URL} variant="outline">
                Talk to us
              </Pill>
            </SectionCard>
          </div>
        </div>
      </Inset>

      <div className="border-y border-hairline">
        <TrustRow />
      </div>

      <Inset className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow tone="green">FAQ</Eyebrow>
            <Display level={2} className="mt-4">
              Questions fleets actually ask.
            </Display>
          </div>
          <div className="mt-12 divide-y divide-hairline border-y border-hairline">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-[17px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-ink/40 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-7 text-ink/60">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Inset>

      <Footer />
    </main>
  );
}
