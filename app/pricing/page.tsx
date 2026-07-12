import type { Metadata } from "next";
import { Check } from "lucide-react";
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
    "Honest pricing for fleet messaging. Plans from AU$39/month, priced by fleet size — never by features. Messages and calls passed through at carrier cost, with zero markup.",
  alternates: { canonical: "/pricing" }
};

const tierCards = [
  {
    name: "Starter",
    fleet: "up to 10 drivers",
    price: "$39",
    cadence: "/month",
    perDriver: "from $3.90 per driver",
    highlight: false
  },
  {
    name: "Crew",
    fleet: "up to 25 drivers",
    price: "$79",
    cadence: "/month",
    perDriver: "from $3.16 per driver",
    highlight: false
  },
  {
    name: "Fleet",
    fleet: "up to 100 drivers",
    price: "$249",
    cadence: "/month",
    perDriver: "from $2.49 per driver",
    highlight: true,
    tag: "Best for big fleets"
  },
  {
    name: "Group",
    fleet: "multiple companies, one relationship",
    price: "Fleet pricing",
    cadence: " per entity",
    perDriver: "Separate invoices per company. Group features as they ship.",
    highlight: false
  }
];

const included = [
  "one company number — yours, it ports out with you",
  "smart routing to whoever is rostered right now",
  "automatic escalations — nothing goes unanswered",
  "WhatsApp + SMS with automatic fallback",
  "full conversation history & tamper-evident audit trail",
  "driver-approved GPS check-in (never tracking)",
  "no apps for drivers or supervisors",
  "usage dashboard — your bill matches your screen"
];

const commsStats = [
  { value: "$0", label: "WhatsApp — unlimited, in-conversation*" },
  { value: "7¢", label: "SMS backup, per message" },
  { value: "$8.40/mo", label: "your dedicated AU mobile number" }
];

const addOns = [
  {
    name: "Voice Routing",
    price: "$29/mo + call minutes at carrier cost",
    copy: "Drivers call your number — by WhatsApp or phone — and reach whoever is rostered, with automatic fallback. Typically $20–50/mo in minutes for a 100-driver fleet."
  },
  {
    name: "Call Recording & Audit Vault",
    price: "$15/mo, requires Voice Routing",
    copy: "Every call recorded and playable in the conversation thread. 90-day retention, consent announcements built in."
  },
  {
    name: "Voice + Recording bundle",
    price: "$39/mo + minutes at cost",
    copy: "Both add-ons together, locked at foundation pricing."
  }
];

const promises = [
  {
    title: "Your number is yours",
    copy: "Leave any time — it ports out with you, in the contract."
  },
  {
    title: "No caps, no overage penalties",
    copy: "A busy month adds cents, never a fee."
  },
  {
    title: "No surprise bills",
    copy: "Alerts at 50/80/100% of expected volume."
  },
  {
    title: "Audit us any time",
    copy: "Every counted message visible on your own dashboard."
  },
  {
    title: "The 30-day guarantee",
    copy: "If Xiaro isn't routing your messages within 30 days, full refund."
  }
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
    <main className="min-h-screen overflow-x-clip bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <EdNav />

      <Ed className="pt-16 lg:pt-24">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-amber-ink">
          Foundation pricing — early customers keep their rate forever
        </p>
        <TwoTone
          size="xl"
          as="h1"
          className="mt-4"
          lead="Honest pricing for fleet messaging."
          rest="One number your drivers already know how to use. Every message answered, everything on the record — and the communication costs passed straight through at carrier cost, with zero markup."
        />

        {/* Tiers */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tierCards.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-xl bg-panel p-7 shadow-card ${
                tier.highlight ? "border-2 border-[rgb(var(--hl))]" : "border border-line"
              }`}
            >
              {tier.highlight ? (
                <span className="absolute -top-3 left-6 rounded-[3px] bg-amber-panel px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-sign-ink">
                  {tier.tag}
                </span>
              ) : null}
              <h2 className="text-[16px] font-medium text-ink">{tier.name}</h2>
              <p className="mt-1 text-[14px] text-ink-soft">{tier.fleet}</p>
              <div className="tabular mt-6 font-display text-[34px] font-bold leading-none text-ink">
                {tier.price}
                <span className="text-[15px] text-ink-soft">{tier.cadence}</span>
              </div>
              <p className="mt-3 text-[13px] leading-5 text-ink-soft">{tier.perDriver}</p>
              <div className="mt-auto pt-7">
                <PillLink
                  href={BOOKING_URL}
                  variant={tier.highlight ? "solid" : "outline"}
                  className="w-full justify-center"
                >
                  {tier.name === "Group" ? "Talk to us" : "Get started"}
                </PillLink>
              </div>
            </div>
          ))}
        </div>

        {/* Everything included */}
        <div className="mt-20">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-amber-ink">
            Every plan includes everything — tiers gate fleet size, never features
          </h2>
          <ul className="mt-6 grid gap-x-10 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] leading-6 text-ink/80">
                <Check className="mt-1 h-4 w-4 shrink-0 text-good" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Communications banner */}
        <div className="mt-20 rounded-2xl border-[3px] border-sign-ink bg-amber-panel p-8 text-sign-ink sm:p-12">
          <h2 className="max-w-4xl text-balance font-display text-[26px] font-bold leading-[1.1] tracking-[-0.01em] text-sign-ink lg:text-[34px]">At cost. Zero markup. <span className="opacity-70">That&apos;s the deal.</span></h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-7 text-sign-ink/85">
            Messages and calls are billed at exactly what the carriers charge us,
            itemised on your dashboard where you can audit every one.
          </p>
          <div className="mt-9 grid gap-8 border-t border-sign-ink/25 pt-8 sm:grid-cols-3">
            {commsStats.map((stat) => (
              <div key={stat.label}>
                <div className="tabular font-display text-[30px] font-bold text-sign-ink">{stat.value}</div>
                <p className="mt-1.5 text-[14px] leading-5 text-sign-ink/80">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[13px] leading-6 text-sign-ink/80">
            *Any conversation a driver starts, and every reply within it — including
            photos and documents when media launches. Reaching a driver silent for
            24+ hours travels as SMS (7¢) or a WhatsApp notification (~1¢) — always
            at cost, always counted.
          </p>
        </div>

        {/* Add-ons */}
        <div className="mt-20">
          <TwoTone lead="Add-ons." rest="Voice, on the same honest terms." as="h2" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {addOns.map((addOn) => (
              <div key={addOn.name} className="flex flex-col rounded-xl border border-line bg-panel p-7 shadow-card">
                <span className="self-start border border-amber bg-amber/15 px-2 py-1 tabular text-[11px] font-medium uppercase tracking-[0.1em] text-amber-ink">
                  Launching soon — priced today
                </span>
                <h3 className="mt-5 text-[16px] font-medium text-ink">{addOn.name}</h3>
                <p className="mt-1 text-[15px] text-ink">{addOn.price}</p>
                <p className="mt-3 text-[14px] leading-6 text-ink-soft">{addOn.copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Promises */}
        <div className="mt-20 pb-24">
          <TwoTone lead="Our promises, in writing." as="h2" />
          <div className="mt-10 grid gap-x-12 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map((promise) => (
              <div key={promise.title} className="border-l-[3px] border-amber pl-5">
                <h3 className="text-[15px] font-medium text-ink">{promise.title}</h3>
                <p className="mt-2 max-w-[36ch] text-[15px] leading-6 text-ink-soft">
                  {promise.copy}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-14 border-t border-line pt-6 text-[13px] leading-6 text-ink-soft">
            Per-driver rates shown at full tier size. Prices in AUD, excluding GST.
            Month-to-month — no lock-in contracts. Carrier rates shown are
            today&apos;s verified rates and are published whenever they change; a
            one-time $9.90 number setup applies in your first month. Voice add-ons
            launch after messaging and media; prices shown are locked for
            foundation customers.
          </p>
        </div>
      </Ed>

      <div className="border-t border-line py-20 lg:py-28">
        <Ed>
          <div className="max-w-3xl">
            <TwoTone lead="Questions fleets actually ask." />
            <div className="mt-10 divide-y divide-line border-y border-line">
              {faq.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex min-h-[44px] cursor-pointer items-center justify-between gap-4 py-5 text-left text-[16px] text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="text-ink-soft transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 text-[15px] leading-7 text-ink-soft">{item.a}</p>
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
