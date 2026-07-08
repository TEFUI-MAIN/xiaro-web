import { MailWarning, PhoneMissed } from "lucide-react";
import { MotionCard } from "@/components/Motion";
import { Chapter, ChapterTitle } from "@/components/zd/Chapter";
import { Inset } from "@/components/zd/SectionCard";

const costs = [
  { value: "$130,156", label: "estimated annual loss, typical 100-driver fleet" },
  { value: "$1,300", label: "per SLA breach in credits and overtime" },
  { value: "2–4 hrs", label: "lost every time a call reaches the wrong person" }
];

function GroupChatCard() {
  return (
    <div className="w-[250px] -rotate-2 rounded-xl bg-white p-4 shadow-[0_18px_50px_rgba(7,17,31,0.14)]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">Depot drivers 🚚</span>
        <span className="rounded-full bg-signal px-2 py-0.5 text-[11px] font-bold text-white">
          87
        </span>
      </div>
      <div className="mt-3 grid gap-2 text-[13px] leading-5 text-ink/70">
        <p>anyone know who&apos;s on tonight??</p>
        <p>is Dave working? Dave??</p>
        <p className="font-medium text-ink">Truck 41 — flat tyre on the M7, need a tow</p>
        <p>🎂🎂 happy birthday leggo!!</p>
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-signal">
        Nobody owns it
      </p>
    </div>
  );
}

function MissedCallsCard() {
  return (
    <div className="w-[230px] rotate-1 rounded-xl bg-white p-4 shadow-[0_18px_50px_rgba(7,17,31,0.14)]">
      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
        <PhoneMissed className="h-4 w-4 text-signal" />
        Your mobile · 02:51
      </div>
      <div className="mt-3 grid gap-2 text-[13px] text-ink/70">
        <p className="flex justify-between">
          <span>Truck 41 (Luke)</span>
          <span className="font-mono text-signal">4 missed</span>
        </p>
        <p className="flex justify-between">
          <span>Day supervisor</span>
          <span className="font-mono text-ink/40">off shift</span>
        </p>
        <p className="flex justify-between">
          <span>You</span>
          <span className="font-mono text-signal">awake</span>
        </p>
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-signal">
        The roster lives in your head
      </p>
    </div>
  );
}

function DisputeCard() {
  return (
    <div className="w-[250px] rotate-2 rounded-xl bg-white p-4 shadow-[0_18px_50px_rgba(7,17,31,0.14)]">
      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
        <MailWarning className="h-4 w-4 text-amber" />
        RE: Missed delivery window
      </div>
      <p className="mt-3 text-[13px] leading-5 text-ink/70">
        &ldquo;We were never notified of the delay. Payment withheld pending
        evidence.&rdquo;
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-amber">
        Your proof is in six group chats
      </p>
    </div>
  );
}

export function PainChapter() {
  return (
    <Chapter tone="white" className="pt-16 lg:pt-24">
      <Inset>
        <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <ChapterTitle>
              2:47 am.
              <br />
              Truck 41 has a flat.
              <br />
              <span className="text-brand-gradient-deep">Who answers?</span>
            </ChapterTitle>
            <p className="mt-8 max-w-xl text-lg leading-8 text-ink/60">
              Right now the answer lives in a group chat with 87 unread messages, a
              laminated roster nobody updated, and your personal mobile. Every
              missed handover is idle trucks, blown SLAs, and disputes you can&apos;t
              prove.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {costs.map((cost) => (
                <div key={cost.label} className="border-t-2 border-hairline pt-4">
                  <div className="font-mono text-2xl text-signal">{cost.value}</div>
                  <p className="mt-1.5 text-[13px] leading-5 text-ink/60">{cost.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[420px] w-full max-w-[440px] flex-col items-center gap-6 pt-4 lg:items-end">
            <MotionCard delay={0.05} className="lg:-mr-4">
              <GroupChatCard />
            </MotionCard>
            <MotionCard delay={0.15} className="lg:mr-36">
              <MissedCallsCard />
            </MotionCard>
            <MotionCard delay={0.25} className="lg:-mr-2">
              <DisputeCard />
            </MotionCard>
          </div>
        </div>
      </Inset>
    </Chapter>
  );
}
