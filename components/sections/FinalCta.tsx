import { MotionSection } from "@/components/Motion";
import { Button } from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/links";

export function FinalCta() {
  return (
    <MotionSection className="px-5 py-24 text-center lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl tracking-[-0.03em] text-ink sm:text-5xl">
          Stop chasing who&apos;s on shift.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted">
          One number for the whole fleet. Routed by roster, escalated on silence,
          logged forever.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/pricing">Get started</Button>
          <Button href={BOOKING_URL} variant="outline">
            Book a demo
          </Button>
        </div>
      </div>
    </MotionSection>
  );
}
