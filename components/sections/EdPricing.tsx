import { Ed } from "@/components/ed/Ed";
import { PillLink } from "@/components/ed/PillLink";
import { TwoTone } from "@/components/ed/TwoTone";
import { BOOKING_URL } from "@/lib/links";

const lines = [
  ["AU$79/month", "covers your first 25 drivers, every feature included"],
  ["AU$3/driver", "after that — no tiers, no feature gates"],
  ["AU$0 markups", "you own your carrier accounts and pay them directly"],
  ["30 days", "not routing your messages? Every dollar back"]
];

export function EdPricing() {
  return (
    <section className="border-t border-hairline py-24 lg:py-36">
      <Ed>
        <TwoTone
          size="xl"
          lead="AU$79 a month. No markups."
          rest="One roadside hour costs more than I do."
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {lines.map(([value, label]) => (
            <div key={value}>
              <div className="text-[22px] text-ink">{value}</div>
              <p className="mt-1.5 max-w-[26ch] text-[14px] leading-5 text-gray">{label}</p>
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
