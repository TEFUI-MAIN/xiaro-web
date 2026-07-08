"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { MotionSection } from "@/components/Motion";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  green: "bg-green",
  amber: "bg-amber",
  signal: "bg-signal"
} as const;

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
    <MotionSection id="try-it" className="border-b border-hairline bg-card px-5 py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionHeading
            number="04"
            eyebrow="Try it"
            title="Watch a message find its owner."
            copy="Pick a message and a time. This is a simulation — the real product does this with your roster, on your number."
          />
          <Chip tone="amber">Simulation</Chip>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-hairline bg-paper p-6">
            <label htmlFor="sim-scenario" className="text-sm font-medium text-ink">
              Scenario
            </label>
            <select
              id="sim-scenario"
              value={scenarioIdx}
              onChange={(event) => setScenarioIdx(Number(event.target.value))}
              className="mt-2 w-full rounded-md border border-hairline bg-card px-3 py-2.5 text-sm text-ink"
            >
              {SCENARIOS.map((scenario, index) => (
                <option key={scenario.label} value={index}>
                  {scenario.label}
                </option>
              ))}
            </select>

            <label htmlFor="sim-custom" className="mt-5 block text-sm font-medium text-ink">
              Or type your own message
            </label>
            <input
              id="sim-custom"
              type="text"
              maxLength={80}
              value={custom}
              onChange={(event) => setCustom(event.target.value)}
              placeholder={SCENARIOS[scenarioIdx].message}
              className="mt-2 w-full rounded-md border border-hairline bg-card px-3 py-2.5 text-sm text-ink placeholder:text-muted/60"
            />

            <div className="mt-5 flex rounded-md border border-hairline p-1 font-mono text-xs uppercase tracking-[0.12em]">
              {[
                { value: true, label: "Supervisor answers" },
                { value: false, label: "Supervisor misses it" }
              ].map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setAnswers(option.value)}
                  className={`flex-1 rounded px-3 py-2 transition ${
                    answers === option.value ? "bg-ink text-paper" : "text-muted hover:text-ink"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={run}
              disabled={playing}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-green-deep px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#126A3C] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Play className="h-4 w-4" />
              Run the routing
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div
              aria-live="polite"
              className="min-h-[280px] rounded-lg border border-hairline bg-paper p-6"
            >
              {events.length === 0 ? (
                <p className="font-mono text-xs text-muted">
                  ▸ Event log — hit “Run the routing” to watch the decision happen.
                </p>
              ) : (
                <div className="grid gap-3">
                  {events.map((event) => (
                    <div key={`${event.atSec}-${event.kind}`} className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot[event.tone]}`}
                        aria-hidden
                      />
                      <span className="font-mono text-xs text-muted">{event.clock}</span>
                      <span className="flex-1 text-sm leading-6 text-ink">{event.text}</span>
                    </div>
                  ))}
                  {done ? (
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <Chip tone="green">Logged · audit row written</Chip>
                      <button
                        type="button"
                        onClick={run}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Replay
                      </button>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button href={BOOKING_URL} variant="outline">
                Book a demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
