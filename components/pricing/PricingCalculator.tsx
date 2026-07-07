"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import {
  annualPriceAud,
  formatAud,
  INCLUDED_DRIVERS,
  MAX_DRIVERS,
  monthlyPriceAud,
  ONBOARDING_AUD,
  PER_DRIVER_AUD
} from "@/lib/pricing";
import { BOOKING_URL } from "@/lib/links";

type Interval = "monthly" | "annual";

export function PricingCalculator() {
  const [drivers, setDrivers] = useState(INCLUDED_DRIVERS);
  const [interval, setInterval] = useState<Interval>("monthly");
  const [onboarding, setOnboarding] = useState(true);
  const [pending, setPending] = useState(false);
  const [unconfigured, setUnconfigured] = useState(false);
  const [error, setError] = useState("");

  const monthly = monthlyPriceAud(drivers);
  const annual = annualPriceAud(drivers);
  const extra = Math.max(0, drivers - INCLUDED_DRIVERS);

  function handleDriversInput(raw: string) {
    const n = Number(raw);
    if (!Number.isFinite(n)) return;
    setDrivers(Math.min(MAX_DRIVERS, Math.max(1, Math.round(n))));
  }

  async function startCheckout() {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval, drivers, onboarding })
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 503) {
        setUnconfigured(true);
        return;
      }
      if (!response.ok || !data.url) {
        setError("Something went wrong starting checkout. Try again, or book a setup call instead.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong starting checkout. Try again, or book a setup call instead.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-hairline bg-card p-6 sm:p-8">
      <div className="flex rounded-md border border-hairline p-1 font-mono text-xs uppercase tracking-[0.12em]">
        {(["monthly", "annual"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setInterval(option)}
            className={`flex-1 rounded px-3 py-2 transition ${
              interval === option ? "bg-ink text-paper" : "text-muted hover:text-ink"
            }`}
          >
            {option === "monthly" ? "Monthly" : "Annual — 2 months free"}
          </button>
        ))}
      </div>

      <div className="mt-7">
        <label htmlFor="drivers" className="text-sm font-medium text-ink">
          How many drivers?
        </label>
        <div className="mt-3 flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={300}
            value={Math.min(drivers, 300)}
            onChange={(event) => handleDriversInput(event.target.value)}
            className="h-2 w-full cursor-pointer accent-green"
            aria-label="Driver count slider"
          />
          <input
            id="drivers"
            type="number"
            min={1}
            max={MAX_DRIVERS}
            value={drivers}
            onChange={(event) => handleDriversInput(event.target.value)}
            className="w-24 rounded-md border border-hairline bg-paper px-3 py-2 text-right font-mono text-sm text-ink"
          />
        </div>
      </div>

      <div className="mt-7 border-t border-hairline pt-6">
        {interval === "monthly" ? (
          <div className="font-mono text-5xl text-ink">
            {formatAud(monthly)}
            <span className="text-xl text-muted">/mo</span>
          </div>
        ) : (
          <div className="flex items-end gap-3">
            <div className="font-mono text-5xl text-ink">
              {formatAud(annual)}
              <span className="text-xl text-muted">/yr</span>
            </div>
            <div className="pb-1 font-mono text-sm text-muted line-through">
              {formatAud(monthly * 12)}
            </div>
          </div>
        )}
        <p className="mt-3 font-mono text-xs text-muted">
          AU$79 base ({INCLUDED_DRIVERS} drivers included)
          {extra > 0 ? ` + ${extra} × AU$${PER_DRIVER_AUD}` : ""}
          {interval === "annual" ? " · billed yearly, 2 months free" : ""}
        </p>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-lg border border-hairline bg-paper p-4">
        <input
          type="checkbox"
          checked={onboarding}
          onChange={(event) => setOnboarding(event.target.checked)}
          className="mt-1 h-4 w-4 accent-green"
        />
        <span className="text-sm leading-6 text-muted">
          <span className="font-semibold text-ink">
            Onboarding — {formatAud(ONBOARDING_AUD)} once-off.
          </span>{" "}
          We connect your own carrier and WhatsApp Business accounts into Xiaro:
          number provisioning, SMS sender registration, WhatsApp Business
          verification, plus roster and escalation setup.
        </span>
      </label>

      <div className="mt-7">
        {unconfigured ? (
          <div className="space-y-3">
            <Button href={BOOKING_URL} className="w-full">
              Book a setup call
            </Button>
            <p className="text-center text-xs text-muted">
              Online checkout is almost ready — book a call and we&apos;ll get you started today.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={startCheckout}
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-green px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get started"}
          </button>
        )}
        {error ? <p className="mt-3 text-sm text-signal">{error}</p> : null}
        <div className="mt-4 flex justify-center">
          <Chip tone="green">30-day money-back guarantee</Chip>
        </div>
      </div>
    </div>
  );
}
