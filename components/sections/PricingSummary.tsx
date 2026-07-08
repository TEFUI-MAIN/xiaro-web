import { Check } from "lucide-react";
import { MotionSection } from "@/components/Motion";
import { Button } from "@/components/ui/Button";
import { MoneyBackBadge } from "@/components/ui/MoneyBackBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BOOKING_URL } from "@/lib/links";

const included = [
  "1 depot",
  "25 drivers included",
  "All channels — WhatsApp primary, SMS fallback",
  "Escalation ladder included",
  "Tamper-evident audit trail included",
  "+AU$3/driver/month after 25",
  "Annual billing: 2 months free"
];

export function PricingSummary() {
  return (
    <MotionSection className="border-b border-hairline bg-card px-5 py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="06"
          eyebrow="Pricing"
          title="One plan. Your own accounts. No markups."
          center
        />
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-hairline bg-paper p-8 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Base</div>
              <div className="mt-2 font-mono text-5xl text-ink">
                AU$79<span className="text-xl text-muted">/mo</span>
              </div>
            </div>
            <MoneyBackBadge />
          </div>
          <ul className="mt-8 grid gap-3 border-t border-hairline pt-7 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                <Check className="mt-1 h-4 w-4 shrink-0 text-green-deep" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-7 border-t border-hairline pt-6 text-sm leading-6 text-muted">
            You bring your own carrier and WhatsApp Business accounts and pay them
            directly. <span className="font-semibold text-ink">We never mark up your messages.</span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/pricing">See full pricing</Button>
            <Button href={BOOKING_URL} variant="outline">
              Talk to us (Enterprise)
            </Button>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
