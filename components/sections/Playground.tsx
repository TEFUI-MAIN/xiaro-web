"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { MotionSection } from "@/components/Motion";
import { Chip } from "@/components/ui/Chip";
import { Ed } from "@/components/ed/Ed";
import { PillLink } from "@/components/ed/PillLink";
import { TwoTone } from "@/components/ed/TwoTone";
import { BOOKING_URL } from "@/lib/links";
import { buildTimeline, type SimEvent } from "@/lib/sim";

const SCENARIOS = [
  {
    label: "Flat tyre on the M7 — 2:47 AM",
    message: "Truck 41 — flat tyre on the M7, need a tow",
    minutes: 2 * 60 + 47
  },
  {
    label: "Customer not at dock 4 — 10:18 AM",
    message: "Customer not at dock 4. Need alternate contact.",
    minutes: 10 * 60 + 18
  },
  {
    label: "Temp alarm at changeover — 2:05 PM",
    message: "Temperature alarm showing on trailer display",
    minutes: 14 * 60 + 5
  }
];

const toneDot = {
  ink: "bg-panel/70",
  green: "bg-good",
  amber: "bg-amber",
  signal: "bg-danger"
} as const;

const photoStats = [
  ["02:47", "inbound"],
  ["5:00", "escalation armed"],
  ["100%", "logged"]
];

export function Playground() {
  const reduce = useReducedMotion();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [custom, setCustom] = useState("");
  const [answers, setAnswers] = useState(true);
  const [events, setEvents] = useState<SimEvent[]>([]);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  useEffect(() => {
    const onScenario = (event: Event) => {
      const detail = (event as CustomEvent<{ idx: number; answers: boolean }>).detail;
      if (!detail) return;
      setScenarioIdx(detail.idx);
      setAnswers(detail.answers);
      setCustom("");
    };
    window.addEventListener("xiaro:scenario", onScenario);
    return () => window.removeEventListener("xiaro:scenario", onScenario);
  }, []);

  function run() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    const scenario = SCENARIOS[scenarioIdx];
    const timeline = buildTimeline({
      message: custom.trim() || scenario.message,
      sendMinutes: scenario.minutes,
      answers
    });
    setEvents([]);
    setDone(false);

    if (reduce) {
      setEvents(timeline);
      setDone(true);
      return;
    }

    setPlaying(true);
    timeline.forEach((event, index) => {
      const id = window.setTimeout(() => {
        setEvents((prev) => [...prev, event]);
        if (index === timeline.length - 1) {
          setPlaying(false);
          setDone(true);
        }
      }, event.atSec * 1000);
      timers.current.push(id);
    });
  }

  return (
    <section id="try-it" className="bg-asphalt py-24 lg:py-36">
      <MotionSection>
      <Ed>
        <div className="mb-12">
          <TwoTone
            dark
            lead="Don't take my word for it."
            rest="Pick a message and a time, then watch me work. It's a simulation — the real me does this with your roster, on your number."
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-paperlit/15 bg-[#141E2A]">
          <div className="grid lg:grid-cols-[0.4fr_0.6fr]">
            <div className="relative min-h-[280px] lg:min-h-full">
              <Image
                src="/photos/driver-cab-night.jpg"
                alt="Driver in a truck cab at night reading a message on his phone"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover object-[75%_center]"
              />
              <div className="absolute inset-0 bg-asphalt/25" aria-hidden />
              <div className="absolute left-5 top-5">
                <Chip tone="amber" className="bg-panel">
                  Simulation
                </Chip>
              </div>
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 bg-asphalt/85 px-5 py-4">
                {photoStats.map(([value, label]) => (
                  <div key={label}>
                    <div className="tabular font-display text-lg font-semibold text-paperlit">{value}</div>
                    <div className="text-xs text-paperlit/60">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <label htmlFor="sim-scenario" className="text-sm font-semibold text-paperlit">
                  Scenario
                </label>
                <select
                  id="sim-scenario"
                  value={scenarioIdx}
                  onChange={(event) => setScenarioIdx(Number(event.target.value))}
                  className="mt-2 w-full rounded-md border border-paperlit/25 bg-paperlit/10 px-3 py-2.5 text-sm text-paperlit max-sm:min-h-[44px] [&>option]:text-ink"
                >
                  {SCENARIOS.map((scenario, index) => (
                    <option key={scenario.label} value={index}>
                      {scenario.label}
                    </option>
                  ))}
                </select>

                <label htmlFor="sim-custom" className="mt-5 block text-sm font-semibold text-paperlit">
                  Or type your own message
                </label>
                <input
                  id="sim-custom"
                  type="text"
                  maxLength={80}
                  value={custom}
                  onChange={(event) => setCustom(event.target.value)}
                  placeholder={SCENARIOS[scenarioIdx].message}
                  className="mt-2 w-full rounded-md border border-paperlit/25 bg-paperlit/10 px-3 py-2.5 text-sm text-paperlit placeholder:text-paperlit/40 max-sm:min-h-[44px]"
                />

                <div className="mt-5 flex rounded-md border border-paperlit/25 p-1 text-xs font-semibold">
                  {[
                    { value: true, label: "Supervisor answers" },
                    { value: false, label: "Supervisor misses it" }
                  ].map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setAnswers(option.value)}
                      className={`flex-1 rounded-md px-3 py-2 transition max-sm:min-h-[44px] ${
                        answers === option.value ? "bg-panel text-asphalt" : "text-paperlit/75 hover:text-paperlit"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <PillLink
                  onClick={run}
                  disabled={playing}
                  variant="white"
                  arrow={false}
                  className="mt-6 w-full justify-center !bg-amber-panel py-3 text-[14px] !text-sign-ink"
                >
                  <Play className="h-4 w-4" />
                  Run the routing
                </PillLink>
              </div>

              <div
                aria-live="polite"
                className="h-[440px] overflow-y-auto rounded-md border border-paperlit/15 bg-asphalt p-5 sm:h-[460px] sm:p-6"
              >
                {events.length === 0 ? (
                  <p className="tabular font-sans text-[13px] font-medium text-paperlit/60">
                    ▸ Event log — hit &ldquo;Run the routing&rdquo; to watch the decision happen.
                  </p>
                ) : (
                  <div className="grid gap-3">
                    {events.map((event) => (
                      <div key={`${event.atSec}-${event.kind}`} className="flex items-start gap-3">
                        <span
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot[event.tone]}`}
                          aria-hidden
                        />
                        <span className="tabular text-xs font-medium text-ink/60">{event.clock}</span>
                        <span className="flex-1 text-sm leading-6 text-paperlit/90">{event.text}</span>
                      </div>
                    ))}
                    {playing ? (
                      <div className="flex items-center gap-1.5 pl-5" aria-hidden>
                        {[0, 1, 2].map((dot) => (
                          <span
                            key={dot}
                            className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber/70"
                            style={{ animationDelay: `${dot * 200}ms` }}
                          />
                        ))}
                      </div>
                    ) : null}
                    {done ? (
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-[3px] border border-amber/60 bg-amber/15 px-2 py-1 tabular text-[11px] font-medium uppercase tracking-[0.14em] text-amber">
                          Logged · audit row written
                        </span>
                        <button
                          type="button"
                          onClick={run}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-paperlit/70 transition hover:text-paperlit"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Replay
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <PillLink href={BOOKING_URL} variant="whiteOutline">Book a demo</PillLink>
        </div>
      </Ed>
      </MotionSection>
    </section>
  );
}
