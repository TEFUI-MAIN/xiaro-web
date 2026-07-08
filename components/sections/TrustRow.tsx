import { BadgeCheck, FileCheck, Radio, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@/components/zd/Eyebrow";
import { Inset } from "@/components/zd/SectionCard";

const badges = [
  { icon: BadgeCheck, label: "Official WhatsApp Business API" },
  { icon: Radio, label: "Carrier-grade SMS delivery" },
  { icon: FileCheck, label: "Audit-grade logging" },
  { icon: ShieldCheck, label: "30-day money-back" }
];

export function TrustRow() {
  return (
    <Inset className="py-14 lg:py-16">
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <Eyebrow className="max-w-[220px] leading-5 text-ink/60">
          Built for Australian fleet operations
        </Eyebrow>
        <div className="flex flex-wrap items-center gap-x-9 gap-y-3">
          {badges.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-2 text-[15px] font-semibold text-ink/70">
              <Icon className="h-4 w-4 text-green-deep/70" aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </div>
    </Inset>
  );
}
