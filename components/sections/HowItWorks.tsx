import { MessageCircle, CalendarCheck, Eye } from "lucide-react";
import { MotionCard, MotionSection } from "@/components/Motion";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: MessageCircle,
    title: "A driver messages the company number",
    copy: "WhatsApp or SMS — same number, same thread."
  },
  {
    icon: CalendarCheck,
    title: "Xiaro checks the roster",
    copy: "Site, shift window, time of day. The message lands with the supervisor actually on duty."
  },
  {
    icon: Eye,
    title: "Delivered — and watched",
    copy: "Read receipts, reply tracking, and a timer. Everything logged."
  }
];

const ladder = [
  { time: "0:00", who: "Supervisor (on shift)", status: "Notified", tone: "green" as const },
  { time: "+5:00", who: "Escalation contact", status: "Notified", tone: "amber" as const },
  { time: "+15:00", who: "Duty manager", status: "Notified", tone: "amber" as const },
  { time: "+25:00", who: "Admin alert", status: "Flagged", tone: "signal" as const }
];

export function HowItWorks() {
  return (
    <MotionSection id="how-it-works" className="border-b border-hairline px-5 py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="03"
          eyebrow="How it works"
          title="One routing decision between every message and every shift."
          copy="Xiaro turns messy inbound communication into a clean question: who is responsible right now — and what happens if they don't answer?"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <MotionCard
                key={step.title}
                delay={index * 0.06}
                className="rounded-lg border border-hairline bg-card p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-md border border-green/30 bg-green/5 text-green-deep">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-muted">{step.copy}</p>
              </MotionCard>
            );
          })}
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h3 className="font-display text-2xl tracking-[-0.02em] text-ink sm:text-3xl">
              Nobody answers? It climbs the ladder.
            </h3>
            <p className="mt-4 max-w-md text-base leading-7 text-muted">
              Unanswered messages climb the escalation ladder until a human owns
              them. Timings are yours to set.
            </p>
          </div>
          <MotionCard delay={0.08} className="rounded-lg border border-hairline bg-card p-6 sm:p-8">
            <div className="relative">
              <div className="absolute bottom-3 left-[4.5rem] top-3 w-px bg-hairline" aria-hidden />
              <div className="grid gap-5">
                {ladder.map((rung) => (
                  <div key={rung.who} className="grid grid-cols-[3.5rem_1rem_1fr_auto] items-center gap-3">
                    <span className="text-right font-mono text-sm text-muted">{rung.time}</span>
                    <span
                      className={`relative z-10 h-2.5 w-2.5 justify-self-center rounded-full ${
                        rung.tone === "green"
                          ? "bg-green"
                          : rung.tone === "amber"
                            ? "bg-amber"
                            : "bg-signal"
                      }`}
                      aria-hidden
                    />
                    <span className="text-sm font-medium text-ink">{rung.who}</span>
                    <Chip tone={rung.tone}>{rung.status}</Chip>
                  </div>
                ))}
              </div>
            </div>
          </MotionCard>
        </div>
      </div>
    </MotionSection>
  );
}
