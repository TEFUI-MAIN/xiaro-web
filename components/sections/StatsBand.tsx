"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Display } from "@/components/zd/Display";
import { Inset } from "@/components/zd/SectionCard";

const stats = [
  { end: 1, suffix: "", label: "company number" },
  { end: 0, suffix: "", label: "apps to install" },
  { end: 100, suffix: "%", label: "of messages logged" }
];

function CountUp({ end, suffix, run }: { end: number; suffix: string; run: boolean }) {
  const [value, setValue] = useState(run ? 0 : end);

  useEffect(() => {
    if (!run) {
      setValue(end);
      return;
    }
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1200);
      setValue(Math.round(end * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, run]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="px-4 py-24 sm:px-6 lg:py-36">
      <Inset>
        <div className="mx-auto max-w-3xl text-center">
          <Display level={2}>One number. Zero apps. Everything on the record.</Display>
        </div>
        <div ref={ref} className="mx-auto mt-16 grid max-w-4xl gap-12 text-center sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-brand-gradient-deep text-[64px] font-medium leading-none">
                <CountUp end={stat.end} suffix={stat.suffix} run={inView && !reduce} />
              </div>
              <div className="mt-3 text-base text-ink/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </Inset>
    </section>
  );
}
