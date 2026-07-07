import { ShieldCheck } from "lucide-react";

export function MoneyBackBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-[3px] border border-green/40 bg-green/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-green-deep">
      <ShieldCheck className="h-4 w-4" />
      30-day money-back guarantee
    </span>
  );
}
