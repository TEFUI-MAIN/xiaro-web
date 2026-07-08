import { Check, ShieldCheck } from "lucide-react";
import { MotionCard } from "@/components/Motion";
import { Chapter, ChapterTitle } from "@/components/zd/Chapter";
import { Inset } from "@/components/zd/SectionCard";
import { Pill } from "@/components/zd/Pill";
import { BOOKING_URL } from "@/lib/links";

const bullets = [
  "First 25 drivers included",
  "AU$3/driver after that",
  "Every feature on every plan",
  "You pay carriers directly — we never mark up messages"
];

export function PricingTeaser() {
  return (
    <Chapter tone="tint">
      <Inset>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <ChapterTitle>
              The <span className="text-brand-gradient-deep">no-brainer</span> part.
            </ChapterTitle>
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink/60">
              One roadside hour costs more than a month of Xiaro. If it isn&apos;t
              routing your messages within 30 days, you get every dollar back.
            </p>
          </div>
          <MotionCard>
            <div className="rounded-2xl bg-white p-8 shadow-[0_18px_50px_rgba(7,17,31,0.10)] sm:p-10">
              <div className="flex items-end justify-between gap-4">
                <div className="text-[56px] font-semibold leading-none">
                  AU$79<span className="text-2xl font-medium text-ink/50">/mo</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2F5F8] px-3 py-1.5 text-[12px] font-semibold text-green-deep">
                  <ShieldCheck className="h-4 w-4" />
                  30-day money-back
                </span>
              </div>
              <ul className="mt-7 grid gap-3 border-t border-hairline pt-6">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[15px] leading-6 text-ink/70">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-green-deep" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Pill href="/pricing" className="flex-1">
                  See pricing
                </Pill>
                <Pill href={BOOKING_URL} variant="outline" className="flex-1">
                  Talk to us
                </Pill>
              </div>
            </div>
          </MotionCard>
        </div>
      </Inset>
    </Chapter>
  );
}
