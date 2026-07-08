"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, Check, MessageCircle, TimerReset } from "lucide-react";
import { MotionCard } from "@/components/Motion";
import { EscalationLadderCard } from "@/components/zd/EscalationLadderCard";
import { RosterMini } from "@/components/zd/RosterMini";
import { Chip } from "@/components/ui/Chip";
import { Chapter, ChapterTitle } from "@/components/zd/Chapter";
import { Inset, SectionCard } from "@/components/zd/SectionCard";

function ChatVignette() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-xl">
      <div className="max-w-[90%] rounded-lg rounded-tl-none bg-cream p-3">
        <p className="text-sm leading-6 text-ink">Truck 41 — flat tyre on the M7, need a tow</p>
        <div className="mt-1 text-right font-mono text-[10px] text-ink/50">02:47</div>
      </div>
      <div className="mt-4">
        <Chip tone="ink">Company number · WhatsApp or SMS</Chip>
      </div>
    </div>
  );
}

function ConnectorNode({
  icon: Icon,
  tone = "ink"
}: {
  icon: typeof MessageCircle;
  tone?: "ink" | "volt";
}) {
  return (
    <div className="relative z-10 mx-auto grid h-11 w-11 place-items-center rounded-full border-4 border-white shadow-md"
      style={{ backgroundColor: tone === "volt" ? "#84F27A" : "#07111F" }}
    >
      <Icon className={`h-5 w-5 ${tone === "volt" ? "text-night" : "text-cream"}`} />
    </div>
  );
}

const cards = [
  {
    title: "02:47. Truck 41 hits trouble.",
    copy: "The driver messages the company number they already have — WhatsApp on a good night, SMS in a black spot. No group chat, no guessing whose turn it is.",
    vignette: <ChatVignette />,
    glow: false
  },
  {
    title: "Xiaro reads the roster, not a contact list.",
    copy: "Site, shift window, time of day. At 02:47 that means Emma Wilson — not the day supervisor asleep at home, not a group of twelve people assuming someone else has it.",
    vignette: <RosterMini activeIndex={2} />,
    glow: true
  },
  {
    title: "Silence climbs the ladder until a human owns it.",
    copy: "No reply in five minutes? The escalation contact is notified. Then the duty manager. Every hop timestamped in a tamper-evident audit trail.",
    vignette: <EscalationLadderCard />,
    glow: false
  }
];

export function StorySpine() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.9"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Chapter id="how-it-works" tone="tint">
      <Inset>
        <div className="mb-16 max-w-3xl">
          <ChapterTitle>
            One number.
            <br />
            <span className="text-brand-gradient-deep">Zero guessing.</span>
          </ChapterTitle>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/60">
            Here&apos;s the same 2:47 am — with Xiaro sitting between the message and
            the chaos.
          </p>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-hairline lg:block" aria-hidden />
          {!reduce ? (
            <motion.div
              aria-hidden
              style={{
                scaleY,
                backgroundImage: "linear-gradient(180deg, #18D9FF, #1677FF 55%, #84F27A)"
              }}
              className="absolute inset-y-0 left-1/2 hidden w-[2px] origin-top -translate-x-1/2 lg:block"
            />
          ) : null}

          <div className="grid gap-8">
            {cards.map((card, index) => (
              <div key={card.title}>
                {index > 0 ? (
                  <div className="relative -my-2 hidden py-4 lg:block">
                    <ConnectorNode icon={index === 1 ? CalendarCheck : TimerReset} />
                  </div>
                ) : null}
                <MotionCard>
                  <SectionCard tone="white" className="relative overflow-visible">
                    {card.glow ? (
                      <div
                        aria-hidden
                        className="absolute -inset-10 -z-10 bg-[radial-gradient(closest-side_at_35%_40%,rgba(24,217,255,0.25),transparent)] blur-2xl"
                      />
                    ) : null}
                    <div className="grid items-center gap-10 p-6 sm:p-12 lg:grid-cols-2 lg:p-16">
                      <div className="min-w-0">
                        <span className="font-mono text-sm text-ink/40">0{index + 1}</span>
                        <h3 className="mt-3 text-[26px] font-medium leading-[1.25]">{card.title}</h3>
                        <p className="mt-4 max-w-md text-base leading-7 text-ink/60">{card.copy}</p>
                      </div>
                      <div className="min-w-0 lg:px-6">{card.vignette}</div>
                    </div>
                  </SectionCard>
                </MotionCard>
              </div>
            ))}
          </div>

          <div className="relative mt-6 hidden lg:block">
            <ConnectorNode icon={Check} tone="volt" />
          </div>
        </div>
      </Inset>
    </Chapter>
  );
}
