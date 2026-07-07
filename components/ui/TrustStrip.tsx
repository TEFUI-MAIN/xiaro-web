import { BadgeCheck, FileCheck, MapPin, Radio } from "lucide-react";

const items = [
  { icon: BadgeCheck, label: "Official WhatsApp Business API" },
  { icon: Radio, label: "Carrier-grade SMS delivery" },
  { icon: MapPin, label: "Built in Australia" },
  { icon: FileCheck, label: "Audit-grade logging" }
];

export function TrustStrip() {
  return (
    <div className="border-y border-hairline bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-hairline sm:grid-cols-4 sm:divide-x">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2.5 px-4 py-5 font-mono text-xs uppercase tracking-[0.12em] text-muted"
          >
            <Icon className="h-4 w-4 shrink-0 text-green-deep" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
