"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChatMock } from "@/components/ui/ChatMock";
import { Chip } from "@/components/ui/Chip";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ROSTER } from "@/lib/sim";

const SCENE_MS = 3000;
const RAIL = ["02:47:00", "02:47:01", "02:49:12", "+5:00"];

export function RosterMini({ activeIndex }: { activeIndex: number | null }) {
  return (
    <div className="rounded-lg border border-hairline bg-paper p-2">
      {ROSTER.map((row, index) => {
        const active = index === activeIndex;
        return (
          <div
            key={row.name}
            className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2.5 ${
              active ? "border-green/40 bg-green/5" : "border-transparent"
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <span
                className={`h-2 w-2 rounded-full ${active ? "bg-green" : "bg-hairline"}`}
                aria-hidden
              />
              {row.name}
            </span>
            <span className="font-mono text-xs text-muted">
              {row.shift} · {row.window}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SceneShell({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {eyebrow}
      </div>
      {children}
    </div>
  );
}

function InboundScene() {
  return (
    <SceneShell eyebrow="02:47 — Inbound">
      <div className="max-w-[90%] self-start rounded-lg rounded-tl-none border border-hairline bg-card p-3 shadow-sm">
        <p className="text-sm leading-6 text-ink">Truck 41 — flat tyre on the M7, need a tow</p>
        <div className="mt-1 text-right font-mono text-[10px] text-muted">02:47</div>
      </div>
      <div className="mt-auto self-center pb-1">
        <Chip tone="ink">Company number · WhatsApp</Chip>
      </div>
    </SceneShell>
  );
}

function RosterScene() {
  return (
    <SceneShell eyebrow="02:47 — Roster check">
      <RosterMini activeIndex={2} />
      <div className="mt-auto self-center pb-1">
        <Chip tone="green">Emma Wilson · on shift</Chip>
      </div>
    </SceneShell>
  );
}

function DeliveredScene() {
  return (
    <SceneShell eyebrow="02:47 — Delivered">
      <div className="flex items-center gap-2.5 rounded-lg border border-hairline bg-paper px-3 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-panel text-[10px] font-semibold text-white">
          EW
        </span>
        <span className="text-sm font-medium text-ink">Emma Wilson</span>
        <span className="font-mono text-xs text-muted">· night shift</span>
      </div>
      <div className="max-w-[90%] self-start rounded-lg rounded-tl-none border border-hairline bg-card p-3 shadow-sm">
        <p className="text-sm leading-6 text-ink">Truck 41 — flat tyre on the M7, need a tow</p>
      </div>
      <div className="max-w-[90%] self-end rounded-lg rounded-tr-none bg-[#D9FDD3] p-3 shadow-sm">
        <p className="text-sm leading-6 text-ink">Tow booked, ETA 40 min. Sit tight.</p>
        <div className="mt-1 text-right font-mono text-[10px] text-muted">
          02:49 <span className="text-[#53BDEB]">✓✓</span>
        </div>
      </div>
      <div className="mt-auto self-center pb-1">
        <Chip tone="green">Reply logged 02:49</Chip>
      </div>
    </SceneShell>
  );
}

function EscalationScene() {
  const rungs = [
    { time: "+5:00", who: "Escalation contact" },
    { time: "+15:00", who: "Duty manager" }
  ];
  return (
    <SceneShell eyebrow="If Emma hadn't answered">
      <div className="grid gap-3">
        {rungs.map((rung, index) => (
          <motion.div
            key={rung.who}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.5, duration: 0.3 }}
            className="flex items-center justify-between gap-3 rounded-lg border border-amber/40 bg-amber/10 px-3 py-2.5"
          >
            <span className="font-mono text-sm text-[#7E5512]">{rung.time}</span>
            <span className="flex-1 text-sm font-medium text-ink">{rung.who}</span>
            <Chip tone="amber">Notified</Chip>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.3 }}
        className="mt-auto self-center pb-1"
      >
        <Chip tone="green">Nobody falls through</Chip>
      </motion.div>
    </SceneShell>
  );
}

const scenes = [InboundScene, RosterScene, DeliveredScene, EscalationScene];

export function JourneyLoop() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = window.setInterval(() => setScene((s) => (s + 1) % scenes.length), SCENE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, inView]);

  if (reduce) {
    return (
      <div className="rotate-1 rounded-2xl border border-hairline bg-card p-4 sm:p-8">
        <PhoneFrame>
          <ChatMock />
        </PhoneFrame>
      </div>
    );
  }

  const Scene = scenes[scene];

  return (
    <div>
      <div
        ref={ref}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative h-[560px] w-[320px] overflow-hidden rounded-2xl border border-hairline bg-card p-5 sm:w-[380px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="h-full"
          >
            <Scene />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center justify-between px-1">
        <div className="flex gap-1.5" aria-hidden>
          {scenes.map((_, index) => (
            <button
              key={index}
              type="button"
              tabIndex={-1}
              onClick={() => setScene(index)}
              className={`h-1.5 w-1.5 rounded-full transition ${
                index === scene ? "bg-green" : "bg-hairline"
              }`}
            />
          ))}
        </div>
        <div className="font-mono text-[10px] text-muted" aria-live="off">
          {RAIL.map((stamp, index) => (
            <span key={stamp} className={index === scene ? "text-ink" : "text-muted"}>
              {stamp}
              {index < RAIL.length - 1 ? " · " : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
