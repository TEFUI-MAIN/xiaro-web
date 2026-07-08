"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { buildTimeline } from "@/lib/sim";

/** Live routing ticker for the hero — the product demonstrating itself. */
export function EdTicker() {
  const reduce = useReducedMotion();

  const lines = useMemo(() => {
    const answered = buildTimeline({
      message: "Truck 41 — flat tyre on the M7, need a tow",
      sendMinutes: 2 * 60 + 47,
      answers: true
    });
    const missed = buildTimeline({
      message: "Customer not at dock 4. Need alternate contact.",
      sendMinutes: 10 * 60 + 18,
      answers: false
    });
    return [...answered, ...missed].map((e) => `${e.clock} · ${e.text}`);
  }, []);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % lines.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce, lines.length]);

  return (
    <div
      aria-hidden
      className="pointer-events-none flex h-9 w-full max-w-xl items-center justify-center overflow-hidden bg-night/60 px-4"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="truncate font-mono text-[12px] text-white/85"
        >
          {lines[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
