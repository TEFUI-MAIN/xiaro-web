import { MotionSection } from "@/components/Motion";
import { Display } from "@/components/zd/Display";
import { Inset, SectionCard } from "@/components/zd/SectionCard";
import { Pill } from "@/components/zd/Pill";
import { BOOKING_URL } from "@/lib/links";

export function FinalCtaBand() {
  return (
    <MotionSection className="pb-16 pt-4 lg:pb-24">
      <Inset>
        <SectionCard tone="navy" className="px-6 py-16 text-center sm:px-10 lg:py-24">
          <Display level={2} className="text-cream">
            Stop chasing who&apos;s on shift.
          </Display>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-cream/70">
            One number for the whole fleet. Routed by roster, escalated on silence,
            logged forever.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Pill href="/pricing">Get started</Pill>
            <Pill href={BOOKING_URL} variant="cream">
              Book a demo
            </Pill>
          </div>
        </SectionCard>
      </Inset>
    </MotionSection>
  );
}
