import { MotionCard } from "@/components/Motion";
import { Chip } from "@/components/ui/Chip";
import { GlowFrame } from "@/components/zd/GlowFrame";
import { Inset, SectionCard } from "@/components/zd/SectionCard";
import { Pill } from "@/components/zd/Pill";
import { BOOKING_URL } from "@/lib/links";

function OpsVignette() {
  return (
    <GlowFrame>
      <div className="rounded-xl bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-[0.75px] text-ink/50">Today</p>
        <div className="mt-3 grid gap-2 text-sm text-ink">
          <div className="flex justify-between gap-8">
            <span>Messages routed</span>
            <span className="font-mono">37</span>
          </div>
          <div className="flex justify-between gap-8">
            <span>Open alerts</span>
            <span className="font-mono">2</span>
          </div>
          <div className="flex justify-between gap-8">
            <span>Audit chain</span>
            <span className="font-mono text-green-deep">✓ verified</span>
          </div>
        </div>
      </div>
    </GlowFrame>
  );
}

function DriverVignette() {
  return (
    <GlowFrame>
      <div className="rounded-xl bg-white p-5">
        <div className="max-w-full rounded-lg rounded-tl-none bg-cream p-3">
          <p className="text-sm leading-6 text-ink">No app. No login. Just WhatsApp.</p>
        </div>
        <div className="mt-3">
          <Chip tone="green">On shift · routed</Chip>
        </div>
      </div>
    </GlowFrame>
  );
}

const cards = [
  {
    title: "For operations managers",
    copy: "One screen with the whole operation on it: who's on shift, what's unanswered, what escalated — and an audit trail that ends arguments before they start.",
    vignette: <OpsVignette />,
    ctas: (
      <>
        <Pill href="/pricing">See pricing</Pill>
        <Pill href={BOOKING_URL} variant="outline">
          Book a demo
        </Pill>
      </>
    )
  },
  {
    title: "For drivers and supervisors",
    copy: "They keep the phone and the apps they already use. Messages just start landing with the right person — and stop landing with the wrong one.",
    vignette: <DriverVignette />,
    ctas: (
      <>
        <Pill href="/#how-it-works">How routing works</Pill>
        <Pill href="/#try-it" variant="outline">
          Try the simulation
        </Pill>
      </>
    )
  }
];

export function AudienceCards() {
  return (
    <section className="py-16 lg:py-24">
      <Inset>
        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((card, index) => (
            <MotionCard key={card.title} delay={index * 0.08}>
              <SectionCard tone="gray" className="overflow-hidden">
                <div className="grid min-h-[280px] place-items-center bg-forest p-10">
                  <div className="w-full max-w-[300px]">{card.vignette}</div>
                </div>
                <div className="p-8 sm:p-10">
                  <h3 className="text-[26px] font-medium leading-[1.25]">{card.title}</h3>
                  <p className="mt-4 text-base leading-7 text-ink/60">{card.copy}</p>
                  <div className="mt-7 flex flex-wrap gap-3">{card.ctas}</div>
                </div>
              </SectionCard>
            </MotionCard>
          ))}
        </div>
      </Inset>
    </section>
  );
}
