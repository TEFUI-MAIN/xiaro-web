"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { Display } from "@/components/zd/Display";
import { Eyebrow } from "@/components/zd/Eyebrow";
import { GlowFrame } from "@/components/zd/GlowFrame";
import { Inset, SectionCard } from "@/components/zd/SectionCard";

/** Coded illustration of a driver-approved one-off location share. */
function LocationMock() {
  return (
    <div className="mx-auto w-[280px] rounded-[1.8rem] bg-white p-3">
      <div className="flex items-center gap-3 rounded-t-[1.2rem] bg-[#075E54] px-4 py-3 text-white">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-xs font-semibold">
          AF
        </div>
        <div className="text-sm font-semibold">Acme Freight</div>
      </div>
      <div className="flex flex-col gap-3 bg-[#EFEAE2] p-3 pb-5">
        <div className="max-w-[85%] self-end rounded-lg rounded-tr-none bg-[#D9FDD3] p-2.5 text-[13px]">
          <p className="text-[11px] font-semibold text-[#17834A]">Sarah · on shift</p>
          <p className="mt-0.5 leading-5 text-ink">Can you share your location so the tow finds you?</p>
        </div>
        <div className="max-w-[85%] self-start overflow-hidden rounded-lg rounded-tl-none bg-white">
          <div className="grid h-20 place-items-center bg-[#DDE7DD]">
            <MapPin className="h-6 w-6 text-[#17834A]" />
          </div>
          <p className="p-2.5 text-[13px] leading-5 text-ink">Current location — shared once</p>
        </div>
        <div className="self-center">
          <Chip tone="green">One-time · driver approved</Chip>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  {
    label: "Conversations",
    caption: "WhatsApp and SMS from the same driver land in one thread, tagged with who was on shift when it arrived.",
    image: { src: "/product/conversation.png", width: 1440, height: 900 },
    alt: "Xiaro conversation queue with a WhatsApp thread routed to the on-shift supervisor"
  },
  {
    label: "Rosters",
    caption: "The roster is the routing table. Change the roster and you've changed the routing.",
    image: { src: "/product/roster.png", width: 1440, height: 900 },
    alt: "Xiaro weekly roster grid with shifts, supervisors and escalation timings"
  },
  {
    label: "Audit trail",
    caption: "Every message, route decision and escalation — hash-chained, timestamped, dispute-ready.",
    image: { src: "/product/audit.png", width: 1440, height: 612 },
    alt: "Xiaro audit log with hash-chained events and verified chain integrity"
  },
  {
    label: "Location check-in",
    caption: "Drivers approve a one-off GPS check-in when you ask. No background tracking — and drivers know it.",
    image: null,
    alt: ""
  },
  {
    label: "Dashboard",
    caption: "Who's on shift, what's unanswered, what escalated — and the audit chain verifying all of it.",
    image: { src: "/product/dashboard.png", width: 1440, height: 868 },
    alt: "Xiaro dashboard with shift coverage, live routing activity and chain integrity"
  }
];

export function ForestTour() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  useEffect(() => {
    if (interacted || !inView) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % tabs.length), 6000);
    return () => window.clearInterval(id);
  }, [interacted, inView]);

  const current = tabs[active];

  return (
    <section id="product" className="py-10">
      <Inset>
        <SectionCard tone="forest" className="overflow-hidden">
          <div ref={ref} className="p-6 sm:p-10 lg:p-16">
            <Eyebrow tone="volt">Inside the product</Eyebrow>
            <Display level={2} className="mt-5 max-w-2xl text-cream">
              The dashboard your ops team watches. No app for anyone else.
            </Display>

            {/* Desktop: vertical tabs + panel */}
            <div className="mt-12 hidden gap-12 lg:grid lg:grid-cols-[300px_1fr]">
              <div role="tablist" aria-label="Product areas" className="flex flex-col">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.label}
                    role="tab"
                    aria-selected={active === index}
                    onClick={() => {
                      setInteracted(true);
                      setActive(index);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        setInteracted(true);
                        setActive((a) => (a + 1) % tabs.length);
                      }
                      if (event.key === "ArrowUp") {
                        setInteracted(true);
                        setActive((a) => (a - 1 + tabs.length) % tabs.length);
                      }
                    }}
                    className={`border-l-2 px-5 py-4 text-left text-lg font-medium transition ${
                      active === index
                        ? "border-volt text-cream"
                        : "border-cream/15 text-cream/70 hover:text-cream"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="min-h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlowFrame>
                      {current.image ? (
                        <Image
                          src={current.image.src}
                          alt={current.alt}
                          width={current.image.width}
                          height={current.image.height}
                          sizes="(min-width: 1024px) 60vw, 100vw"
                          className="w-full"
                        />
                      ) : (
                        <div className="grid place-items-center bg-forest py-10">
                          <LocationMock />
                        </div>
                      )}
                    </GlowFrame>
                    <p className="mt-5 max-w-xl text-sm leading-6 text-cream/70">
                      {current.caption}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile: accordion */}
            <div className="mt-10 grid gap-2 lg:hidden">
              {tabs.map((tab, index) => (
                <div key={tab.label} className="border-b border-cream/15 pb-2">
                  <button
                    type="button"
                    aria-expanded={active === index}
                    onClick={() => {
                      setInteracted(true);
                      setActive(index);
                    }}
                    className={`flex w-full items-center justify-between py-3 text-left text-base font-medium ${
                      active === index ? "text-cream" : "text-cream/70"
                    }`}
                  >
                    {tab.label}
                    <span className="text-cream/40">{active === index ? "−" : "+"}</span>
                  </button>
                  {active === index ? (
                    <div className="pb-4">
                      {tab.image ? (
                        <Image
                          src={tab.image.src}
                          alt={tab.alt}
                          width={tab.image.width}
                          height={tab.image.height}
                          sizes="100vw"
                          className="w-full rounded-lg"
                        />
                      ) : (
                        <div className="grid place-items-center rounded-lg bg-ink/20 py-8">
                          <LocationMock />
                        </div>
                      )}
                      <p className="mt-3 text-sm leading-6 text-cream/70">{tab.caption}</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </Inset>
    </section>
  );
}
