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
      <SectionCard tone="night" className="relative overflow-hidden">
        <Image
          src="/photos/xiaro-splash.jpg"
          alt="Convoy of freight trucks at sunset with a connected-network globe on the horizon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,17,31,0.94)_0%,rgba(7,17,31,0.82)_38%,rgba(7,17,31,0.38)_68%,rgba(7,17,31,0.22)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,17,31,0.65),transparent_32%)]"
        />

        <div className="relative grid min-h-[640px] gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-16">
          <div className="flex flex-col justify-center">
            <Eyebrow tone="cream">Roster-routed fleet messaging</Eyebrow>
            <Display level={1} className="mt-6 text-cream">
              Every message finds the{" "}
              <span className="text-brand-gradient whitespace-nowrap">right person.</span> Every
              shift.
            </Display>
            <p className="mt-6 max-w-xl text-lg leading-7 text-cream/80">
              One company number on WhatsApp and SMS — routed by who&apos;s on shift,
              escalated when nobody answers, logged forever. No app to roll out,
              and no more 2:47 am calls to your own mobile.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Pill href="/pricing">Get started</Pill>
              <Pill href={BOOKING_URL} variant="cream">
                Book a demo
              </Pill>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-cream/20 pt-6">
              {proofs.map((proof) => (
                <span key={proof} className="flex items-center gap-2 text-sm text-cream/80">
                  <Check className="h-4 w-4 text-volt" />
                  {proof}
                </span>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[420px] lg:block">
            <MotionCard delay={0.15} className="absolute right-52 top-10 w-[240px]">
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

            <MotionCard delay={0.3} className="absolute bottom-12 right-0 w-[260px]">
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

            <svg
              aria-hidden
              className="absolute right-24 top-28 hidden h-56 w-40 lg:block"
              viewBox="0 0 160 224"
              fill="none"
            >
              <path
                d="M20 10 C 90 40, 130 120, 140 210"
                stroke="url(#hero-route)"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="hero-route" x1="20" y1="10" x2="140" y2="210" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#18D9FF" />
                  <stop offset="0.5" stopColor="#1677FF" />
                  <stop offset="1" stopColor="#84F27A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </SectionCard>
    </Inset>
  );
}
