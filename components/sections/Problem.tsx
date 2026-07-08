import { Clock3, EyeOff, FileText, MessageCircle, PhoneCall, Zap } from "lucide-react";
import { MotionCard, MotionSection } from "@/components/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const painPoints = [
  {
    title: "Drivers call the wrong person",
    copy: "Personal mobile numbers become the operating system, so off-shift supervisors still get dragged into live incidents.",
    icon: PhoneCall
  },
  {
    title: "Messages go unanswered",
    copy: "WhatsApp groups create noise, but no owner. Critical updates sit beside chatter with no clear accountability.",
    icon: MessageCircle
  },
  {
    title: "Supervisors change shifts",
    copy: "Day, afternoon, night and weekend rosters change faster than contact lists can be updated.",
    icon: Clock3
  },
  {
    title: "No visibility",
    copy: "Operations managers cannot see who received the call, who replied, or how long the response took.",
    icon: EyeOff
  },
  {
    title: "No audit trail",
    copy: "When something goes wrong, there is no clean history of calls, messages, routing and ownership.",
    icon: FileText
  },
  {
    title: "Delayed responses",
    copy: "Every minute spent finding the right person delays the load, the customer and the recovery plan.",
    icon: Zap
  }
];

export function Problem() {
  return (
    <MotionSection className="border-b border-hairline px-5 py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="01"
          eyebrow="The problem"
          title="A shift changes. The responsibility trail disappears."
          copy="Transport teams rarely fail because nobody cares. They fail because the right person is hard to find when rosters, sites and escalation paths keep moving."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point, index) => (
            <MotionCard
              key={point.title}
              delay={index * 0.04}
              className="rounded-lg border border-hairline bg-card p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-md border border-signal/25 bg-signal/5 text-signal">
                  <point.icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-muted">0{index + 1}</span>
              </div>
              <h3 className="font-semibold text-ink">{point.title}</h3>
              <p className="mt-2.5 text-sm leading-6 text-muted">{point.copy}</p>
            </MotionCard>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
