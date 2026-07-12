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
    <section className="border-t border-hairline py-24 lg:py-36">
      <Ed>
        <TwoTone
          size="xl"
          lead="At cost. Zero markup."
          rest="That's the deal — plans from AU$39 a month, and your comms billed at exactly what the carriers charge."
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {lines.map(([value, label]) => (
            <div key={value}>
              <div className="text-[22px] text-ink">{value}</div>
              <p className="mt-1.5 max-w-[28ch] text-[14px] leading-5 text-gray">{label}</p>
            </div>
          ))}
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
