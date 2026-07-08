import Image from "next/image";
import { Check } from "lucide-react";
import { MotionCard } from "@/components/Motion";
import { Chip } from "@/components/ui/Chip";
import { Display } from "@/components/zd/Display";
import { Eyebrow } from "@/components/zd/Eyebrow";
import { GlowFrame } from "@/components/zd/GlowFrame";
import { Inset, SectionCard } from "@/components/zd/SectionCard";
import { Pill } from "@/components/zd/Pill";
import { BOOKING_URL } from "@/lib/links";

const proofs = ["AU$79/mo to 25 drivers", "No message markups", "No apps to install"];

export function HeroCard() {
  return (
    <Inset className="pt-4">
      <SectionCard tone="ink" className="overflow-hidden">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-16">
          <div className="flex flex-col justify-center">
            <Eyebrow tone="cream">Roster-routed fleet messaging</Eyebrow>
            <Display level={1} className="mt-6 text-cream">
              Every message finds
              <br />
              the <span className="text-volt">right&nbsp;person.</span>
              <br />
              Every shift.
            </Display>
            <p className="mt-6 max-w-xl text-lg leading-7 text-cream/75">
              One company number on WhatsApp and SMS. Routed by who&apos;s on shift,
              escalated when nobody answers, logged forever.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Pill href="/pricing">Get started</Pill>
              <Pill href={BOOKING_URL} variant="cream">
                Book a demo
              </Pill>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-cream/15 pt-6">
              {proofs.map((proof) => (
                <span key={proof} className="flex items-center gap-2 text-sm text-cream/70">
                  <Check className="h-4 w-4 text-volt" />
                  {proof}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image
              src="/photos/hero-truck-dusk.jpg"
              alt="Freight truck crossing a steel bridge at dusk"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="rounded-2xl object-cover saturate-[.85]"
            />
            <div className="absolute inset-0 rounded-2xl bg-ink/25" aria-hidden />

            <MotionCard
              delay={0.15}
              className="absolute left-0 top-8 w-[240px] -translate-x-2 sm:-translate-x-6"
            >
              <div className="rounded-xl bg-white p-4 shadow-2xl">
                <p className="text-sm leading-5 text-ink">
                  Truck 41 — flat tyre on the M7, need a tow
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-ink/50">WhatsApp · company number</span>
                  <span className="font-mono text-xs text-ink/60">02:47</span>
                </div>
              </div>
            </MotionCard>

            <MotionCard
              delay={0.3}
              className="absolute bottom-8 right-0 w-[260px] translate-x-2 sm:translate-x-6"
            >
              <GlowFrame>
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.75px] text-ink/50">
                    Roster check
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium text-ink">
                    <span className="h-2 w-2 rounded-full bg-green-deep" aria-hidden />
                    Emma Wilson · night shift
                  </p>
                  <div className="mt-3">
                    <Chip tone="green">Delivered 02:47</Chip>
                  </div>
                </div>
              </GlowFrame>
            </MotionCard>
          </div>
        </div>
      </SectionCard>
    </Inset>
  );
}
