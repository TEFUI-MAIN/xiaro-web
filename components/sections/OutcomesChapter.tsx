import { FileCheck, MessageCircle, Moon, SlidersHorizontal } from "lucide-react";
import { MotionCard } from "@/components/Motion";
import { Chapter, ChapterTitle } from "@/components/zd/Chapter";
import { Inset } from "@/components/zd/SectionCard";
import { Pill } from "@/components/zd/Pill";
import { BOOKING_URL } from "@/lib/links";

const outcomes = [
  {
    icon: Moon,
    title: "Your evenings back",
    copy: "Off-shift means off-shift. Messages route to whoever is actually on — your personal mobile stops being the national hotline.",
    proof: "2:47 am calls to you → 0"
  },
  {
    icon: FileCheck,
    title: "Evidence on tap",
    copy: "Every message, route and escalation lands in a tamper-evident audit trail. Next dispute, you export the receipts instead of scrolling six chats.",
    proof: "Dispute answered in minutes, not days"
  },
  {
    icon: MessageCircle,
    title: "Zero rollout, zero training",
    copy: "Drivers and supervisors keep plain WhatsApp and SMS. There is nothing to install, nothing to teach, nobody to chase.",
    proof: "Adoption on day one — it's just messaging"
  },
  {
    icon: SlidersHorizontal,
    title: "Escalation you set once",
    copy: "Five minutes of silence? It climbs the ladder you configured — escalation contact, duty manager, admin alert — without you refereeing.",
    proof: "Nobody falls through, by design"
  }
];

export function OutcomesChapter() {
  return (
    <Chapter tone="tint">
      <Inset>
        <div className="max-w-3xl">
          <ChapterTitle>
            What changes in <span className="text-brand-gradient-deep">week one.</span>
          </ChapterTitle>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/60">
            Xiaro isn&apos;t another dashboard to babysit. It removes work you&apos;re
            doing right now, tonight, for free.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <MotionCard key={outcome.title} delay={index * 0.06}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-[0_10px_36px_rgba(7,17,31,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(7,17,31,0.12)]">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#F2F5F8]">
                    <Icon className="h-5 w-5 text-azure" />
                  </div>
                  <h3 className="mt-5 text-[22px] font-semibold leading-7">{outcome.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-ink/60">{outcome.copy}</p>
                  <p className="mt-4 font-mono text-[12px] uppercase tracking-wide text-green-deep">
                    ▸ {outcome.proof}
                  </p>
                </div>
              </MotionCard>
            );
          })}
        </div>
        <div className="mt-12">
          <Pill href={BOOKING_URL} variant="outline">
            Book a 15-minute demo
          </Pill>
        </div>
      </Inset>
    </Chapter>
  );
}
