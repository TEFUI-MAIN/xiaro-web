"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const rungs = [
  { time: "0:00", who: "Supervisor" },
  { time: "+5:00", who: "Escalation contact" },
  { time: "+15:00", who: "Duty manager" },
  { time: "+25:00", who: "Admin alert" }
];

/** Quiet looping escalation: rungs light in sequence, then a reply lands. */
export function EdLadderLoop() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 2 : 0); // 0..3 rungs, 4 = resolved beat

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % 6), 1300);
    return () => window.clearInterval(id);
  }, [reduce]);

  const resolvedBeat = step >= 4;

  return (
    <div className="mt-10 border-y border-hairline py-5" aria-hidden>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {rungs.map((rung, index) => {
          const lit = resolvedBeat ? index <= 1 : index <= step;
          const active = !resolvedBeat && index === step;
          return (
            <div key={rung.who} className="flex items-center gap-2.5">
              <span
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  lit ? (index === 0 ? "bg-green-deep" : "bg-amber") : "bg-hairline"
                } ${active ? "animate-pulse" : ""}`}
              />
              <span className={`font-mono text-[12px] ${lit ? "text-ink" : "text-gray"}`}>
                {rung.time}
              </span>
              <span className={`text-[13px] ${lit ? "text-ink" : "text-gray"}`}>{rung.who}</span>
            </div>
          );
        })}
        <span
          className={`ml-auto font-mono text-[12px] transition-opacity duration-300 ${
            resolvedBeat ? "text-green-deep opacity-100" : "opacity-0"
          }`}
        >
          reply logged ✓ — audit row written
        </span>
      </div>
    </div>
  );
}
