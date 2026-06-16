"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import type { CheckoutPlan } from "@/lib/checkout";

type CheckoutButtonProps = {
  plan: CheckoutPlan;
  children: React.ReactNode;
  featured?: boolean;
};

export function CheckoutButton({ plan, children, featured }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function startCheckout() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan })
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        setMessage(data.error ?? "Stripe checkout not configured yet.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setMessage("Stripe checkout not configured yet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className={
          featured
            ? "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            : "inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan/60 hover:bg-cyan/10 disabled:cursor-not-allowed disabled:opacity-70"
        }
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </button>
      {message ? <p className="text-xs text-cyan">{message}</p> : null}
    </div>
  );
}
