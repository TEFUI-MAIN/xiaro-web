"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Ed } from "@/components/ed/Ed";
import { PillLink } from "@/components/ed/PillLink";
import { TwoTone } from "@/components/ed/TwoTone";
import { formatAud, tierFor } from "@/lib/pricing";

/** Industry-typical mis-route, SLA and idle costs — anchors to the published
 *  $130,156/yr estimate for a 100-driver fleet. */
const LOSS_PER_DRIVER_YEAR = 1302;

function money(value: number) {
  return `$${Math.round(value).toLocaleString("en-AU")}`;
}

function Bar({
  label,
  value,
  max,
  className,
  reduce
}: {
  label: string;
  value: number;
  max: number;
  className: string;
  reduce: boolean;
}) {
  const pct = Math.max(1.2, (value / max) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[14px] text-gray">{label}</span>
        <span className="font-mono text-[15px] text-ink">{money(value)}/yr</span>
      </div>
      <div className="mt-2 border-l border-hairline">
        <motion.div
          className={`h-[10px] rounded-r-[4px] ${className}`}
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
          style={reduce ? { width: `${pct}%` } : undefined}
        />
      </div>
    </div>
  );
}

export function EdRoi() {
  const reduce = !!useReducedMotion();
  const [drivers, setDrivers] = useState(100);

  const loss = drivers * LOSS_PER_DRIVER_YEAR;
  const cost = tierFor(drivers).monthly * 12;
  const saving = loss - cost;

  return (
    <section id="arithmetic" className="border-t border-hairline py-24 lg:py-36">
      <Ed>
        <TwoTone lead="The arithmetic." rest="Slide to your fleet size. The bars do the talking." />

        <div className="mt-12 max-w-2xl">
          <div className="flex items-center gap-5">
            <label htmlFor="roi-drivers" className="shrink-0 text-[14px] text-gray">
              Fleet size
            </label>
            <input
              id="roi-drivers"
              type="range"
              min={10}
              max={100}
              step={10}
              value={drivers}
              onChange={(event) => setDrivers(Number(event.target.value))}
              className="h-6 w-full cursor-pointer accent-[#17834A] max-sm:h-11"
            />
            <span className="w-24 shrink-0 text-right font-mono text-[15px] text-ink">
              {drivers} drivers
            </span>
          </div>

          <div className="mt-10 grid gap-7">
            <Bar
              label="What silence costs you (estimated)"
              value={loss}
              max={loss}
              className="bg-signal"
              reduce={reduce}
            />
            <Bar
              label="What Xiaro costs"
              value={cost}
              max={loss}
              className="bg-green-deep"
              reduce={reduce}
            />
          </div>

          <p className="mt-10 border-t border-hairline pt-6 text-[22px] text-ink lg:text-[26px]">
            Net, you keep <span className="font-mono text-green-deep">≈ {money(saving)}</span> a
            year.
          </p>
          <p className="mt-3 max-w-[52ch] text-[13px] leading-5 text-gray">
            Estimates from industry-typical mis-route, SLA-breach and idle-time
            costs (~{formatAud(LOSS_PER_DRIVER_YEAR)}/driver/yr). Your numbers will
            differ — that&apos;s what the 30-day guarantee is for.
          </p>

          <div className="mt-9">
            <PillLink href="/pricing" variant="solid">
              See your exact price
            </PillLink>
          </div>
        </div>
      </Ed>
    </section>
  );
}
