"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { RosterMini } from "@/components/hero/JourneyLoop";
import { EscalationLadderCard, HowItWorks } from "@/components/sections/HowItWorks";
import { HOW_STEPS } from "@/components/sections/how-it-works-content";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";

function InboundPanel() {
  return (
    <div className="rounded-lg border border-hairline bg-card p-6">
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        02:47 — Inbound
      </div>
      <div className="max-w-[85%] rounded-lg rounded-tl-none border border-hairline bg-paper p-3">
        <p className="text-sm leading-6 text-ink">Truck 41 — flat tyre on the M7, need a tow</p>
        <div className="mt-1 text-right font-mono text-[10px] text-muted">02:47</div>
      </div>
      <div className="mt-5">
        <Chip tone="ink">Company number · WhatsApp or SMS</Chip>
      </div>
    </div>
  );
}

function RosterPanel() {
  return (
    <div className="rounded-lg border border-hairline bg-card p-6">
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        02:47 — Roster check
      </div>
      <RosterMini activeIndex={2} />
      <div className="mt-5">
        <Chip tone="green">Routed by roster</Chip>
      </div>
    </div>
  );
}

function WatchedPanel() {
  return (
    <div className="rounded-lg border border-hairline bg-card p-6">
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        Delivered — and watched
      </div>
      <div className="flex flex-col items-start gap-3">
        <Chip tone="green">Read 02:47</Chip>
        <Chip tone="green">Reply logged 02:49</Chip>
        <Chip tone="amber">Escalation timer armed · 5:00</Chip>
      </div>
    </div>
  );
}

const panels = [InboundPanel, RosterPanel, WatchedPanel, EscalationLadderCard];

export function HowItWorksScrolly() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.8"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.max(0, Math.min(3, Math.floor(value * 4))));
  });

  if (reduce) {
    return <HowItWorks />;
  }

  const Panel = panels[active];

  return (
    <section id="how-it-works" className="border-b border-hairline">
      {/* Mobile and tablet keep the static Phase A layout. */}
      <div className="lg:hidden">
        <HowItWorks withId={false} />
      </div>

      <div className="hidden px-12 py-24 lg:block">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            number="03"
            eyebrow="How it works"
            title="One routing decision between every message and every shift."
            copy="Xiaro turns messy inbound communication into a clean question: who is responsible right now — and what happens if they don't answer?"
          />
          <div ref={ref} className="relative mt-8 grid grid-cols-2 gap-16">
            <div>
              {HOW_STEPS.map((step, index) => {
                const isActive = active === index;
                return (
                  <div
                    key={step.title}
                    className={`flex min-h-[80vh] flex-col justify-center border-l-2 pl-6 transition-colors duration-300 ${
                      isActive ? "border-green" : "border-hairline"
                    }`}
                  >
                    <span className="font-mono text-xs text-muted">0{index + 1}</span>
                    <h3
                      className={`mt-3 font-display text-3xl tracking-[-0.02em] transition-colors duration-300 ${
                        isActive ? "text-ink" : "text-muted"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-7 text-muted">{step.copy}</p>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="sticky top-24 flex h-[70vh] items-center">
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Panel />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
