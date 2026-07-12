import Image from "next/image";
import { CalendarCheck, FileCheck, MapPin, TimerReset } from "lucide-react";
import { MotionCard } from "@/components/Motion";
import { EdLadderLoop } from "@/components/ed/EdLadderLoop";
import { Ed, Trio } from "@/components/ed/Ed";
import { PillLink } from "@/components/ed/PillLink";
import { TwoTone } from "@/components/ed/TwoTone";

const blocks = [
  {
    icon: CalendarCheck,
    label: "Router",
    lead: "I always know who's on shift.",
    rest: "Site, shift window, time of day. Change the roster and you've changed my routing — no contact lists, no guessing.",
    trios: [
      {
        title: "The 2:47 am flat tyre",
        copy: "Truck 41 messages me at 2:47 am. I check the roster, find Emma on nights, and she has it before the driver locks his phone."
      },
      {
        title: "The 2 pm changeover",
        copy: "Day ends, afternoon begins. Messages follow the shift automatically — nothing sits unread in a finished shift's pocket."
      },
      {
        title: "The public holiday",
        copy: "Holiday roster loaded means holiday routing applied. The weekday supervisor sleeps in; the right one answers."
      }
    ],
    cta: { label: "How routing works", href: "/#try-it" }
  },
  {
    icon: TimerReset,
    label: "Escalator",
    widget: "ladder",
    lead: "I don't let silence win.",
    rest: "No reply in five minutes and I move up your ladder — escalation contact, duty manager, admin alert — until a human owns it.",
    trios: [
      {
        title: "+5:00",
        copy: "The escalation contact is notified with the full thread, not a cold start."
      },
      {
        title: "+15:00",
        copy: "The duty manager steps in. Everyone can see who was pinged, and when."
      },
      {
        title: "Your timings",
        copy: "Five minutes or fifty — the rungs and the clock are yours to set, once."
      }
    ],
    cta: { label: "Watch an escalation", href: "/#try-it" }
  },
  {
    icon: FileCheck,
    label: "Recorder",
    lead: "I remember everything.",
    rest: "Every message, route decision and escalation lands in a tamper-evident audit trail. Next dispute, you export receipts instead of scrolling six group chats.",
    trios: [
      {
        title: "Hash-chained",
        copy: "Each audit row is chained to the last. Nobody edits history — including us."
      },
      {
        title: "Timestamped",
        copy: "Who was notified, when they read it, when they replied. To the second."
      },
      {
        title: "Export-ready",
        copy: "A dispute answered in minutes with a clean, dated record — not days of chat archaeology."
      }
    ],
    cta: { label: "See the audit trail", href: "/#product-peek" }
  },
  {
    icon: MapPin,
    label: "Locator",
    lead: "I ask before I look.",
    rest: "Need a tow to find a driver? I request a one-time location check-in. The driver approves it, shares once, and I stop looking. No background tracking — ever.",
    trios: [
      {
        title: "Driver-approved",
        copy: "Every check-in is a request the driver accepts. Consent isn't a setting; it's the design."
      },
      {
        title: "One-time only",
        copy: "One share, one purpose, then nothing. I am not a tracking dot on a map."
      },
      {
        title: "Drivers know it",
        copy: "Privacy that's visible builds the trust that makes drivers actually use the number."
      }
    ],
    cta: { label: "Why privacy wins", href: "/#scenarios" }
  }
];

const interstitials = [
  { after: 0, src: "/photos/driver-cab-night.jpg", alt: "Driver in a truck cab at night reading a message", h: "h-[380px] lg:h-[520px]" },
  { after: 2, src: "/photos/hero-truck-dusk.jpg", alt: "Freight truck crossing a steel bridge at dusk", h: "h-[340px] lg:h-[460px]" }
];

export function EdCapabilities() {
  return (
    <section id="capabilities" className="py-24 lg:py-36">
      <Ed>
        <TwoTone
          size="xl"
          lead="Fully roster-aware."
          rest="Give me your roster and your escalation ladder. I'll handle the rest."
        />
      </Ed>

      <div className="mt-8">
        {blocks.map((block, index) => {
          const Icon = block.icon;
          const art = interstitials.find((i) => i.after === index);
          return (
            <div key={block.label}>
              <Ed className="py-16 lg:py-24">
                <MotionCard>
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-ink">
                    <Icon className="h-5 w-5 text-paper" />
                  </div>
                  <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-amber-ink">{block.label}</p>
                  <TwoTone className="mt-3" lead={block.lead} rest={block.rest} />
                  {"widget" in block && block.widget === "ladder" ? <EdLadderLoop /> : null}
                  <Trio items={block.trios} />
                  <div className="mt-9">
                    <PillLink href={block.cta.href}>{block.cta.label}</PillLink>
                  </div>
                </MotionCard>
              </Ed>
              {art ? (
                <Ed>
                  <div className={`relative w-full overflow-hidden ${art.h}`}>
                    <Image src={art.src} alt={art.alt} fill sizes="(min-width: 1270px) 1270px, 100vw" className="object-cover" />
                  </div>
                </Ed>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
