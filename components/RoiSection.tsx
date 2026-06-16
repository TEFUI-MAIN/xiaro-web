"use client";

import { useMemo, useState } from "react";
import { BarChart3, Check, Download, FileText, PhoneOff, Timer, X, Zap } from "lucide-react";
import { MotionCard, MotionSection } from "@/components/Motion";

function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString("en-AU")}`;
}

function getPlanForFleet(drivers: number, depots: number) {
  if (drivers <= 20 && depots <= 1) {
    return { name: "Starter", monthlyCost: 149, description: "$149/mo · 1 depot · up to 20 drivers" };
  }
  if (drivers <= 150 && depots <= 2) {
    return { name: "Operations", monthlyCost: 349, description: "$349/mo · 1-2 depots · up to 150 drivers" };
  }
  if (drivers <= 500 && depots <= 5) {
    return { name: "Business", monthlyCost: 699, description: "$699/mo · 3-5 depots · up to 500 drivers" };
  }
  return { name: "Enterprise", monthlyCost: null, description: "Custom pricing · 500+ drivers or national operators" };
}

const statCards = [
  {
    value: "$130,156",
    tone: "text-red-400",
    label: "Annual loss — 100-driver fleet",
    copy: "From mis-routes, SLA breaches, idle time and admin overhead."
  },
  {
    value: "$1,300",
    tone: "text-amber-300",
    label: "Per SLA breach",
    copy: "Service credits and support overtime per incident."
  },
  {
    value: "2-4 hrs",
    tone: "text-red-400",
    label: "Lost per mis-routed call",
    copy: "Time lost when a call reaches the wrong or off-shift supervisor."
  },
  {
    value: "29x",
    tone: "text-cyan-300",
    label: "Return on investment",
    copy: "$2,503/wk saved vs $87/wk Xiaro cost on the Operations plan."
  }
];

const scenarios = [
  {
    icon: PhoneOff,
    tone: "red",
    title: "Breakdown on M7 at 2am — driver can't reach anyone",
    copy: "Driver calls the 1300 number. It goes to voicemail. They call the day supervisor's personal mobile. No answer. The driver waits roadside before anyone responds.",
    tags: ["Idle time", "Delayed delivery", "Customer complaint"]
  },
  {
    icon: Timer,
    tone: "amber",
    title: "Shift changeover at 2pm — nobody updates the roster",
    copy: "Day supervisor finishes. Drivers message them between 2-4pm. Messages sit unread and a time-sensitive delivery window is missed.",
    tags: ["SLA breach", "Missed window"]
  },
  {
    icon: BarChart3,
    tone: "red",
    title: "Public holiday — wrong supervisor on call all day",
    copy: "Holiday roster was not updated. Drivers reach the weekday supervisor who has no authority, and calls bounce between staff.",
    tags: ["Repeat delays", "Missed window"]
  },
  {
    icon: FileText,
    tone: "amber",
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

export function RoiSection() {
  const [drivers, setDrivers] = useState(100);
  const [depots, setDepots] = useState(2);
  const [shifts, setShifts] = useState(3);
  const [misroutes, setMisroutes] = useState(5);

  const roi = useMemo(() => {
    const selectedPlan = getPlanForFleet(drivers, depots);
    const misrouteLoss = misroutes * 19 * 365;
    const slaLoss = (drivers / 100) * 1300 * 52 * 0.01 * shifts;
    const breakdownLoss = (drivers / 50) * 250 * 52;
    const adminLoss = (drivers / 100) * 228 * 52;
    const annualLoss = Math.round(misrouteLoss + slaLoss + breakdownLoss + adminLoss);
    const xiaroCost = selectedPlan.monthlyCost ? selectedPlan.monthlyCost * 12 : null;
    return {
      annualLoss,
      selectedPlan,
      xiaroCost,
      netSaving: xiaroCost === null ? null : Math.max(0, annualLoss - xiaroCost)
    };
  }, [drivers, depots, shifts, misroutes]);

  return (
    <MotionSection id="roi" className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0f] px-5 py-24 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(239,68,68,0.09),transparent_36%),radial-gradient(ellipse_at_70%_20%,rgba(6,182,212,0.12),transparent_44%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">The business case</div>
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
            What communication failure is costing your fleet right now
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
            Every miscommunication, missed call and wrong routing decision has a real dollar cost. For a 100-driver fleet, it can add up to over $130,000 a year.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <MotionCard key={stat.label} delay={index * 0.04} className="rounded-2xl border border-white/10 bg-[#13131f]/90 p-6">
              <div className={`text-3xl font-semibold tracking-[-0.04em] ${stat.tone}`}>{stat.value}</div>
              <div className="mt-3 text-sm font-semibold text-white">{stat.label}</div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{stat.copy}</p>
            </MotionCard>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/12 bg-[#13131f]/92 p-6 shadow-2xl sm:p-8">
          <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
            <BarChart3 className="h-4 w-4" />
            Calculate your fleet&apos;s cost
          </div>
          <div className="grid gap-5">
            <RoiSlider label="Fleet size" value={drivers} min={10} max={500} step={10} suffix="drivers" onChange={setDrivers} />
            <RoiSlider label="Depots / sites" value={depots} min={1} max={10} step={1} suffix={depots === 1 ? "depot" : "depots"} onChange={setDepots} />
            <RoiSlider label="Shifts per day" value={shifts} min={1} max={4} step={1} suffix="shifts" onChange={setShifts} />
            <RoiSlider label="Mis-routes per day" value={misroutes} min={1} max={20} step={1} suffix="/day" onChange={setMisroutes} />
          </div>
          <div className="mt-6 rounded-xl border border-cyan-300/20 bg-cyan-400/10 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Recommended plan</div>
            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div className="text-xl font-semibold text-white">{roi.selectedPlan.name}</div>
              <div className="text-sm text-slate-300">{roi.selectedPlan.description}</div>
            </div>
          </div>
          <div className="my-7 h-px bg-white/10" />
          <div className="grid gap-4 md:grid-cols-3">
            <ResultCard value={formatCurrency(roi.annualLoss)} label="Estimated annual loss" tone="text-red-400" />
            <ResultCard value={roi.xiaroCost === null ? "Custom" : formatCurrency(roi.xiaroCost)} label="Xiaro annual cost" tone="text-slate-300" />
            <ResultCard value={roi.netSaving === null ? "Contact sales" : formatCurrency(roi.netSaving)} label="Net annual saving" tone="text-emerald-300" />
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Real-world scenarios</div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">This happens in Australian fleets every week</h3>
          <p className="mt-4 text-base leading-8 text-slate-400">These are not edge cases. They are the daily reality of shift-based operations without intelligent routing.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            const isRed = scenario.tone === "red";
            return (
              <MotionCard key={scenario.title} delay={index * 0.04} className="rounded-2xl border border-white/10 bg-[#13131f]/90 p-6">
                <div className="flex items-start gap-4">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${isRed ? "border-red-400/25 bg-red-500/10 text-red-300" : "border-amber-300/25 bg-amber-300/10 text-amber-200"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold leading-6 text-white">{scenario.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{scenario.copy}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {scenario.tags.map((tag) => (
                        <span key={tag} className={`rounded-md border px-2.5 py-1 text-xs font-medium ${isRed ? "border-red-400/20 bg-red-500/10 text-red-200" : "border-amber-300/20 bg-amber-300/10 text-amber-200"}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionCard>
            );
          })}
        </div>

        <div className="mt-16 max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Before vs after</div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">The real problem isn&apos;t your people. It&apos;s your routing.</h3>
          <p className="mt-4 text-base leading-8 text-slate-400">Poor communication is a systems problem. Xiaro fixes the system.</p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <CompareCard title="Without Xiaro" items={withoutXiaro} good={false} />
          <CompareCard title="With Xiaro" items={withXiaro} good />
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#13131f]/90 p-6 sm:p-8">
          <div className="mb-6 text-sm font-medium text-slate-400">Annual cost comparison — 100 driver fleet</div>
          <RoiBar label="Current communication loss" value="$130,156" width="100%" color="#ef4444" />
          <RoiBar label="Xiaro subscription (Operations)" value="$4,188/yr" width="3.2%" color="#3b82f6" />
          <RoiBar label="Third-party services (est.)" value="$1,800/yr" width="1.4%" color="#64748b" />
          <RoiBar label="Onboarding package (once-off)" value="$399" width="0.3%" color="#64748b" />
          <div className="my-4 h-px bg-white/10" />
          <RoiBar label="Net saving — year 1" value="$123,769" width="95%" color="#10b981" strong />
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-blue-400/20 bg-blue-500/[0.07] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-white">See what Xiaro saves your fleet</h4>
            <p className="mt-2 text-sm leading-6 text-slate-400">14-day free trial. No credit card required. Live in under 48 hours.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/Xiaro-ROI-Business-Case.pptx" download className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
              <Download className="h-4 w-4" />
              Download ROI report
            </a>
            <a href="#pricing" className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
              Start free trial
            </a>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function RoiSlider({ label, value, min, max, step, suffix, onChange }: { label: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (value: number) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[160px_1fr_92px] sm:items-center">
      <label className="text-sm text-slate-400">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-cyan-400"
      />
      <span className="text-left text-sm font-semibold text-white sm:text-right">
        {value} {suffix}
      </span>
    </div>
  );
}

function ResultCard({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 text-center">
      <div className={`text-2xl font-semibold tracking-[-0.035em] ${tone}`}>{value}</div>
      <div className="mt-2 text-xs text-slate-500">{label}</div>
    </div>
  );
}

function CompareCard({ title, items, good }: { title: string; items: string[]; good: boolean }) {
  return (
    <div className={`rounded-2xl border bg-[#13131f]/90 p-6 ${good ? "border-cyan-300/25" : "border-red-400/20"}`}>
      <div className={`mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] ${good ? "text-cyan-300" : "text-red-300"}`}>
        {good ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        {title}
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-400">
            {good ? <Check className="mt-1 h-4 w-4 shrink-0 text-cyan-300" /> : <X className="mt-1 h-4 w-4 shrink-0 text-red-300" />}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoiBar({ label, value, width, color, strong }: { label: string; value: string; width: string; color: string; strong?: boolean }) {
  return (
    <div className="mb-4 grid gap-2 sm:grid-cols-[220px_1fr_100px] sm:items-center sm:gap-4">
      <span className={`text-sm ${strong ? "font-semibold text-white" : "text-slate-400"}`}>{label}</span>
      <div className="hidden h-2 overflow-hidden rounded-full bg-white/[0.06] sm:block">
        <div className="h-full rounded-full" style={{ width, backgroundColor: color }} />
      </div>
      <span className={`text-sm font-semibold sm:text-right ${strong ? "text-emerald-300" : ""}`} style={strong ? undefined : { color }}>
        {value}
      </span>
    </div>
  );
}
