import { MapPin } from "lucide-react";
import { MotionCard } from "@/components/Motion";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Chip } from "@/components/ui/Chip";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustStrip } from "@/components/ui/TrustStrip";

const blocks = [
  {
    key: "conversation",
    title: "Every conversation in one thread — whatever the channel.",
    copy: "WhatsApp and SMS from the same driver land in the same thread, tagged with who was on shift when it arrived.",
    image: { src: "/product/conversation.png", width: 1440, height: 900 },
    alt: "Xiaro conversation queue with a WhatsApp thread routed to the on-shift supervisor"
  },
  {
    key: "roster",
    title: "The roster is the routing table.",
    copy: "You already keep a roster. Xiaro reads it: change the roster and you've changed the routing. No contact lists to chase.",
    image: { src: "/product/roster.png", width: 1440, height: 900 },
    alt: "Xiaro weekly roster grid with shifts, supervisors and escalation timings"
  },
  {
    key: "audit",
    title: "When there's a dispute, you have the receipts.",
    copy: "Every message, route decision and escalation is written to a tamper-evident audit trail. Timestamped, exportable, dispute-ready.",
    image: { src: "/product/audit.png", width: 1440, height: 612 },
    alt: "Xiaro audit log with hash-chained events and verified chain integrity"
  },
  {
    key: "location",
    title: "Location when it matters. Never tracking.",
    copy: "Drivers approve a one-off GPS check-in when you ask for one. No background tracking, no surveillance — and drivers know it.",
    image: null,
    alt: ""
  },
  {
    key: "dashboard",
    title: "The whole operation on one screen.",
    copy: "Who's on shift, what's unanswered, what escalated — and the audit chain verifying all of it.",
    image: { src: "/product/dashboard.png", width: 1440, height: 868 },
    alt: "Xiaro dashboard with shift coverage, live routing activity and chain integrity"
  }
];

/** Coded illustration of a driver-approved one-off location share in WhatsApp. */
function LocationMock() {
  return (
    <div className="flex h-[480px] flex-col bg-[#EFEAE2] text-[13px]">
      <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-xs font-semibold">
          AF
        </div>
        <div className="text-sm font-semibold">Acme Freight</div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="max-w-[85%] self-end rounded-lg rounded-tr-none bg-[#D9FDD3] p-2.5 shadow-sm">
          <p className="text-[11px] font-semibold text-[#17834A]">Sarah · on shift</p>
          <p className="mt-0.5 leading-5 text-[#14181F]">
            Can you share your location so the tow finds you?
          </p>
          <div className="mt-1 text-right font-mono text-[10px] text-[#5B6472]">03:02</div>
        </div>
        <div className="max-w-[85%] self-start overflow-hidden rounded-lg rounded-tl-none bg-white shadow-sm">
          <div className="grid h-24 place-items-center bg-[#DDE7DD]">
            <MapPin className="h-7 w-7 text-[#17834A]" />
          </div>
          <div className="p-2.5">
            <p className="leading-5 text-[#14181F]">Current location — shared once</p>
            <div className="mt-1 text-right font-mono text-[10px] text-[#5B6472]">03:04</div>
          </div>
        </div>
        <div className="mt-auto flex flex-col items-center gap-2 pb-1">
          <Chip tone="green">One-time check-in · driver approved</Chip>
        </div>
      </div>
    </div>
  );
}

export function ProductTour() {
  return (
    <section id="product" className="px-5 py-10 lg:px-12">
      <div className="mx-auto max-w-7xl pt-10">
        <SectionHeading
          number="04"
          eyebrow="Inside the product"
          title="The dashboard your ops team watches. No app for anyone else."
          copy="Drivers and supervisors keep using WhatsApp and SMS. Operations gets the screen that shows who owns what, right now."
        />
      </div>
      <div className="mx-auto max-w-7xl">
        {blocks.map((block, index) => {
          const imageFirst = index % 2 === 0;
          return (
            <div
              key={block.key}
              className="grid gap-10 border-b border-hairline py-16 last:border-b-0 lg:grid-cols-2 lg:items-center"
            >
              <MotionCard delay={0.04} className={imageFirst ? "" : "lg:order-2"}>
                {block.image ? (
                  <BrowserFrame
                    src={block.image.src}
                    alt={block.alt}
                    width={block.image.width}
                    height={block.image.height}
                  />
                ) : (
                  <div className="grid place-items-center rounded-2xl border border-hairline bg-card p-8">
                    <PhoneFrame>
                      <LocationMock />
                    </PhoneFrame>
                  </div>
                )}
              </MotionCard>
              <MotionCard delay={0.1} className={imageFirst ? "" : "lg:order-1"}>
                <h3 className="font-display text-2xl leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
                  {block.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-muted">{block.copy}</p>
                {block.key === "location" ? (
                  <blockquote className="mt-6 border-l-2 border-green pl-4 text-sm italic leading-6 text-muted">
                    "Locations shown here are one-time check-ins shared by drivers
                    for operational issues. Xiaro does not continuously track
                    drivers." — the notice in the product itself
                  </blockquote>
                ) : null}
              </MotionCard>
            </div>
          );
        })}
      </div>
      <div className="mx-auto mt-4 max-w-7xl">
        <TrustStrip />
      </div>
    </section>
  );
}
