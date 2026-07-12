import { Ed } from "@/components/ed/Ed";
import { PillLink } from "@/components/ed/PillLink";
import { TwoTone } from "@/components/ed/TwoTone";
import { BOOKING_URL } from "@/lib/links";

const lines = [
  ["From AU$39/mo", "Starter, Crew and Fleet — priced by fleet size, never by features"],
  ["$0 WhatsApp", "unlimited in-conversation messages, passed through at carrier cost"],
  ["7¢ SMS", "backup channel, per message, zero markup — itemised on your dashboard"],
  ["30 days", "not routing your messages? Every dollar back"]
];

export function EdPricing() {
  return (
    <section className="border-t border-line py-24 lg:py-36">
      <Ed>
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-amber-ink">Pricing</p>
        <div className="mt-6 rounded-2xl border-[3px] border-sign-ink bg-amber-panel p-8 text-sign-ink sm:p-12">
          <h2 className="max-w-4xl text-balance font-display text-[30px] font-bold leading-[1.08] tracking-[-0.01em] lg:text-[44px]">
            At cost. Zero markup.{" "}
            <span className="opacity-70">
              That&apos;s the deal — plans from AU$39 a month, and your comms billed at exactly what the carriers charge.
            </span>
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-sign-ink/25 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {lines.map(([value, label]) => (
              <div key={value}>
                <div className="tabular font-display text-[24px] font-bold">{value}</div>
                <p className="mt-1.5 max-w-[28ch] text-[14px] leading-5 text-sign-ink/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <PillLink href="/pricing" variant="solid">
            See pricing
          </PillLink>
          <PillLink href={BOOKING_URL}>Talk to us</PillLink>
        </div>
      </Ed>
    </section>
  );
}
