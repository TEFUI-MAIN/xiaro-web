"use client";

import { useMemo, useState } from "react";
import { BarChart3, Check, FileText, PhoneOff, Timer, X } from "lucide-react";
import { MotionCard, MotionSection } from "@/components/Motion";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatAud, monthlyPriceAud, ONBOARDING_AUD } from "@/lib/pricing";

const statCards = [
  {
    value: "$130,156",
    tone: "text-signal",
    label: "Annual loss — 100-driver fleet",
    copy: "From mis-routes, SLA breaches, idle time and admin overhead."
  },
  {
    value: "$1,300",
    tone: "text-[#9A6A1F]",
    label: "Per SLA breach",
    copy: "Service credits and support overtime per incident."
  },
  {
    value: "2–4 hrs",
    tone: "text-signal",
    label: "Lost per mis-routed call",
    copy: "Time lost when a call reaches the wrong or off-shift supervisor."
  },
  {
    value: "AU$79/mo",
    tone: "text-ink",
    label: "Xiaro base price",
    copy: "Less than one hour of roadside idle time."
  }
];

const scenarios = [
  {
    icon: PhoneOff,
    tone: "signal" as const,
    title: "Breakdown on M7 at 2am — driver can't reach anyone",
    copy: "Driver calls the company number. It goes to voicemail. They call the day supervisor's personal mobile. No answer. The driver waits roadside before anyone responds.",
    tags: ["Idle time", "Delayed delivery", "Customer complaint"]
  },
  {
    icon: Timer,
    tone: "amber" as const,
    title: "Shift changeover at 2pm — nobody updates the roster",
    copy: "Day supervisor finishes. Drivers message them between 2-4pm. Messages sit unread and a time-sensitive delivery window is missed.",
    tags: ["SLA breach", "Missed window"]
  },
  {
    icon: BarChart3,
    tone: "signal" as const,
    title: "Public holiday — wrong supervisor on call all day",
    copy: "Holiday roster was not updated. Drivers reach the weekday supervisor who has no authority, and calls bounce between staff.",
    tags: ["Repeat delays", "Missed window"]
  },
  {
    icon: FileText,
    tone: "amber" as const,
    title: "Disputed delivery — no audit trail to defend the claim",
    copy: "Messages are scattered across group chats and personal threads. There is no timestamp evidence, so the customer withholds payment.",
    tags: ["Invoice dispute", "No evidence"]
  }
];

const withoutXiaro = [
  "Drivers save personal supervisor mobiles",
  "Roster changes are manual and error-prone",
  "Messages go to group chats with no owner",
  "Off-shift supervisors receive calls at home",
  "No audit trail for disputes or incidents",
  "Response time depends on whoever picks up"
];

const withXiaro = [
  "One number for every driver, every channel",
  "Roster changes automatically update routing",
  "Every message routes to the on-shift supervisor",
  "Supervisors only receive calls during their shift",
  "Full audit trail, timestamped and searchable",
  "Response time defined by rules, not luck"
];

function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString("en-AU")}`;
}

export function CostAndScenarios() {
  const [drivers, setDrivers] = useState(100);
  const [shifts, setShifts] = useState(3);
  const [misroutes, setMisroutes] = useState(5);

  const roi = useMemo(() => {
    const misrouteLoss = misroutes * 19 * 365;
    const slaLoss = (drivers / 100) * 1300 * 52 * 0.01 * shifts;
    const breakdownLoss = (drivers / 50) * 250 * 52;
    const adminLoss = (drivers / 100) * 228 * 52;
    const annualLoss = Math.round(misrouteLoss + slaLoss + breakdownLoss + adminLoss);
    const xiaroCost = monthlyPriceAud(drivers) * 12;
    return {
      annualLoss,
      xiaroCost,
      netSaving: Math.max(0, annualLoss - xiaroCost)
    };
  }, [drivers, shifts, misroutes]);

  const fleet100Cost = monthlyPriceAud(100) * 12;

  return (
    <MotionSection className="border-b border-hairline bg-card px-5 py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="02"
          eyebrow="The cost"
          title="Every unanswered message has a dollar value."
          copy="Every miscommunication, missed call and wrong routing decision has a real cost. For a 100-driver fleet, it can add up to over $130,000 a year."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <MotionCard
              key={stat.label}
              delay={index * 0.04}
              className="rounded-lg border border-hairline bg-paper p-6"
            >
              <div className={`font-mono text-3xl ${stat.tone}`}>{stat.value}</div>
              <div className="mt-3 text-sm font-semibold text-ink">{stat.label}</div>
              <p className="mt-1.5 text-sm leading-6 text-muted">{stat.copy}</p>
            </MotionCard>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-hairline bg-paper p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-green-deep">
            <BarChart3 className="h-4 w-4" />
            Calculate your fleet&apos;s cost
          </div>
          <div className="grid gap-5">
            <CostSlider label="Fleet size" value={drivers} min={10} max={500} step={10} suffix="drivers" onChange={setDrivers} />
            <CostSlider label="Shifts per day" value={shifts} min={1} max={4} step={1} suffix="shifts" onChange={setShifts} />
            <CostSlider label="Mis-routes per day" value={misroutes} min={1} max={20} step={1} suffix="/day" onChange={setMisroutes} />
          </div>
          <div className="my-7 h-px bg-hairline" />
          <div className="grid gap-4 md:grid-cols-3">
            <ResultCard value={formatCurrency(roi.annualLoss)} label="Estimated annual loss" tone="text-signal" />
            <ResultCard value={formatAud(roi.xiaroCost)} label="Xiaro annual cost (billed monthly)" tone="text-ink" />
            <ResultCard value={formatCurrency(roi.netSaving)} label="Net annual saving" tone="text-green-deep" />
          </div>
          <p className="mt-4 font-mono text-[11px] text-muted">
            {formatAud(monthlyPriceAud(drivers))}/mo at {drivers} drivers — AU$79 base
            {drivers > 25 ? ` + ${drivers - 25} × AU$3` : " (25 drivers included)"}
          </p>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Real-world scenarios"
            title="This happens in Australian fleets every week."
            copy="These are not edge cases. They are the daily reality of shift-based operations without intelligent routing."
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            const isSignal = scenario.tone === "signal";
            return (
              <MotionCard
                key={scenario.title}
                delay={index * 0.04}
                className="rounded-lg border border-hairline bg-paper p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-md border ${
                      isSignal
                        ? "border-signal/25 bg-signal/5 text-signal"
                        : "border-amber/40 bg-amber/10 text-[#9A6A1F]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold leading-6 text-ink">{scenario.title}</h4>
                    <p className="mt-2.5 text-sm leading-6 text-muted">{scenario.copy}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {scenario.tags.map((tag) => (
                        <Chip key={tag} tone={scenario.tone}>
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionCard>
            );
          })}
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Before vs after"
            title="The real problem isn't your people. It's your routing."
            copy="Poor communication is a systems problem. Xiaro fixes the system."
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <CompareCard title="Without Xiaro" items={withoutXiaro} good={false} />
          <CompareCard title="With Xiaro" items={withXiaro} good />
        </div>

        <div className="mt-10 rounded-lg border border-hairline bg-paper p-6 sm:p-8">
          <div className="mb-6 text-sm font-medium text-muted">
            Annual cost comparison — 100 driver fleet
          </div>
          <CostBar label="Current communication loss" value="$130,156" width="100%" barClass="bg-signal" valueClass="text-signal" />
          <CostBar label="Xiaro subscription" value={`${formatAud(fleet100Cost)}/yr`} width="2.8%" barClass="bg-green" valueClass="text-green-deep" />
          <CostBar label="Your carrier costs (est., paid directly)" value="$1,800/yr" width="1.4%" barClass="bg-muted" valueClass="text-muted" />
          <CostBar label={`Onboarding package (once-off)`} value={formatAud(ONBOARDING_AUD)} width="0.3%" barClass="bg-muted" valueClass="text-muted" />
          <div className="my-4 h-px bg-hairline" />
          <CostBar
            label="Net saving — year 1"
            value={formatCurrency(130156 - fleet100Cost - 1800 - ONBOARDING_AUD)}
            width="95%"
            barClass="bg-green"
            valueClass="text-green-deep"
            strong
          />
        </div>
      </div>
    </MotionSection>
  );
}

function CostSlider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[160px_1fr_110px] sm:items-center">
      <label className="text-sm text-muted">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-green"
      />
      <span className="text-left font-mono text-sm text-ink sm:text-right">
        {value} {suffix}
      </span>
    </div>
  );
}

function ResultCard({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <div className="rounded-md border border-hairline bg-card p-5 text-center">
      <div className={`font-mono text-2xl ${tone}`}>{value}</div>
      <div className="mt-2 text-xs text-muted">{label}</div>
    </div>
  );
}

function CompareCard({ title, items, good }: { title: string; items: string[]; good: boolean }) {
  return (
    <div className={`rounded-lg border bg-paper p-6 ${good ? "border-green/40" : "border-signal/25"}`}>
      <div
        className={`mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] ${
          good ? "text-green-deep" : "text-signal"
        }`}
      >
        {good ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        {title}
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-muted">
            {good ? (
              <Check className="mt-1 h-4 w-4 shrink-0 text-green-deep" />
            ) : (
              <X className="mt-1 h-4 w-4 shrink-0 text-signal" />
            )}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function CostBar({
  label,
  value,
  width,
  barClass,
  valueClass,
  strong
}: {
  label: string;
  value: string;
  width: string;
  barClass: string;
  valueClass: string;
  strong?: boolean;
}) {
  return (
    <div className="mb-4 grid gap-2 sm:grid-cols-[240px_1fr_120px] sm:items-center sm:gap-4">
      <span className={`text-sm ${strong ? "font-semibold text-ink" : "text-muted"}`}>{label}</span>
      <div className="hidden h-2 overflow-hidden rounded-full bg-hairline sm:block">
        <div className={`h-full rounded-full ${barClass}`} style={{ width }} />
      </div>
      <span className={`font-mono text-sm sm:text-right ${valueClass}`}>{value}</span>
    </div>
  );
}
