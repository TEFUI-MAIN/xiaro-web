import { Check, ShieldCheck } from "lucide-react";
import { MotionSection } from "@/components/Motion";
import { Display } from "@/components/zd/Display";
import { Inset, SectionCard } from "@/components/zd/SectionCard";
import { Pill } from "@/components/zd/Pill";
import { BOOKING_URL } from "@/lib/links";

const bullets = [
  "First 25 drivers included",
  "AU$3/driver after",
  "Every feature, every plan"
];

export function PricingTeaser() {
  return (
    <MotionSection className="px-0 py-16 lg:py-24">
      <Inset>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Display level={2}>Pricing built for fleets, not seats.</Display>
        </div>
        <SectionCard tone="gray" className="mx-auto max-w-3xl p-8 text-center sm:p-12">
          <div className="text-[56px] font-medium leading-none">
            AU$79<span className="text-2xl text-ink/50">/mo</span>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {bullets.map((bullet) => (
              <span key={bullet} className="flex items-center gap-2 text-[15px] text-ink/70">
                <Check className="h-4 w-4 text-green-deep" />
                {bullet}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-ink/60">
            You bring your own carrier and WhatsApp Business accounts and pay them
            directly. <span className="font-semibold text-ink">We never mark up your messages.</span>
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-deep">
            <ShieldCheck className="h-4 w-4" />
            30-day money-back guarantee
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Pill href="/pricing">See pricing</Pill>
            <Pill href={BOOKING_URL} variant="outline">
              Talk to us
            </Pill>
          </div>
        </SectionCard>
      </Inset>
    </MotionSection>
  );
}
