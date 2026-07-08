import { Eyebrow } from "@/components/zd/Eyebrow";
import { Inset } from "@/components/zd/SectionCard";

const badges = [
  "Official WhatsApp Business API",
  "Carrier-grade SMS delivery",
  "Audit-grade logging",
  "30-day money-back"
];

export function TrustRow() {
  return (
    <Inset className="py-14 lg:py-16">
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <Eyebrow className="max-w-[220px] leading-5 text-ink/60">
          Built for Australian fleet operations
        </Eyebrow>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {badges.map((badge) => (
            <span key={badge} className="text-[15px] font-semibold text-ink/70">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </Inset>
  );
}
