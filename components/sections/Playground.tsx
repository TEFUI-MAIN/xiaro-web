"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { MotionSection } from "@/components/Motion";
import { Chip } from "@/components/ui/Chip";
import { Chapter, ChapterTitle } from "@/components/zd/Chapter";
import { Inset, SectionCard } from "@/components/zd/SectionCard";
import { Pill } from "@/components/zd/Pill";
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
  ink: "bg-ink",
  green: "bg-green-deep",
  amber: "bg-amber",
  signal: "bg-signal"
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
    <Chapter id="try-it" tone="white">
      <MotionSection>
      <Inset>
        <div className="mb-14 max-w-3xl">
          <ChapterTitle>
            Don&apos;t take our word for it.{" "}
            <span className="text-brand-gradient-deep">Route one yourself.</span>
          </ChapterTitle>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/60">
            Pick a message and a time, then watch the decision happen. It&apos;s a
            simulation — the real product does this with your roster, on your
            number.
          </p>
        </div>

        <SectionCard tone="gray" className="overflow-hidden">
          <div className="grid lg:grid-cols-[0.4fr_0.6fr]">
            <div className="relative min-h-[280px] lg:min-h-full">
              <Image
                src="/photos/driver-cab-night.jpg"
                alt="Driver in a truck cab at night reading a message on his phone"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover object-[75%_center]"
              />
              <div className="absolute inset-0 bg-night/20" aria-hidden />
              <div className="absolute left-5 top-5">
                <Chip tone="amber" className="bg-white">
                  Simulation
                </Chip>
              </div>
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 bg-night/85 px-5 py-4">
                {photoStats.map(([value, label]) => (
                  <div key={label}>
                    <div className="font-mono text-lg text-cream">{value}</div>
                    <div className="text-xs text-cream/60">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <label htmlFor="sim-scenario" className="text-sm font-semibold text-ink">
                  Scenario
                </label>
                <select
                  id="sim-scenario"
                  value={scenarioIdx}
                  onChange={(event) => setScenarioIdx(Number(event.target.value))}
                  className="mt-2 w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-sm text-ink"
                >
                  {SCENARIOS.map((scenario, index) => (
                    <option key={scenario.label} value={index}>
                      {scenario.label}
                    </option>
                  ))}
                </select>

                <label htmlFor="sim-custom" className="mt-5 block text-sm font-semibold text-ink">
                  Or type your own message
                </label>
                <input
                  id="sim-custom"
                  type="text"
                  maxLength={80}
                  value={custom}
                  onChange={(event) => setCustom(event.target.value)}
                  placeholder={SCENARIOS[scenarioIdx].message}
                  className="mt-2 w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/40"
                />

                <div className="mt-5 flex rounded-lg border border-hairline bg-white p-1 text-xs font-semibold">
                  {[
                    { value: true, label: "Supervisor answers" },
                    { value: false, label: "Supervisor misses it" }
                  ].map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setAnswers(option.value)}
                      className={`flex-1 rounded-md px-3 py-2 transition ${
                        answers === option.value ? "bg-ink text-cream" : "text-ink/60 hover:text-ink"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <Pill
                  onClick={run}
                  disabled={playing}
                  className="mt-6 w-full"
                >
                  <Play className="h-4 w-4" />
                  Run the routing
                </Pill>
              </div>

              <div
                aria-live="polite"
                className="h-[440px] overflow-y-auto rounded-xl border border-hairline bg-white p-5 sm:h-[460px] sm:p-6"
              >
                {events.length === 0 ? (
                  <p className="font-mono text-xs text-ink/50">
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
                        <span className="font-mono text-xs text-ink/50">{event.clock}</span>
                        <span className="flex-1 text-sm leading-6 text-ink">{event.text}</span>
                      </div>
                    ))}
                    {playing ? (
                      <div className="flex items-center gap-1.5 pl-5" aria-hidden>
                        {[0, 1, 2].map((dot) => (
                          <span
                            key={dot}
                            className="h-1.5 w-1.5 animate-pulse rounded-full bg-azure/60"
                            style={{ animationDelay: `${dot * 200}ms` }}
                          />
                        ))}
                      </div>
                    ) : null}
                    {done ? (
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <Chip tone="green">Logged · audit row written</Chip>
                        <button
                          type="button"
                          onClick={run}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition hover:text-ink"
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
        </SectionCard>

        <div className="mt-8 flex justify-center">
          <Pill href={BOOKING_URL} variant="outline">
            Book a demo
          </Pill>
        </div>
      </Inset>
      </MotionSection>
    </Chapter>
  );
}
