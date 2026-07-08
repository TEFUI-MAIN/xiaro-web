import { MotionCard } from "@/components/Motion";
import { Button } from "@/components/ui/Button";
import { ChatMock } from "@/components/ui/ChatMock";
import { Chip } from "@/components/ui/Chip";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Stat } from "@/components/ui/Stat";
import { BOOKING_URL } from "@/lib/links";

export function Hero() {
  return (
    <section className="border-b border-hairline px-5 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <MotionCard>
          <div className="flex flex-wrap gap-2">
            <Chip tone="green">WhatsApp — primary</Chip>
            <Chip tone="ink">SMS — fallback</Chip>
            <Chip tone="amber">Voice — on the roadmap</Chip>
          </div>
          <h1 className="mt-7 font-display text-5xl leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl">
            One number.
            <br />
            Every channel.
            <br />
            The right person, <span className="text-green-deep">every shift.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Drivers message one company number on WhatsApp or SMS. Xiaro routes it
            to whoever is on shift — and if nobody answers, it escalates until
            someone does.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/pricing">Get started</Button>
            <Button href={BOOKING_URL} variant="outline">
              Book a demo
            </Button>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-hairline pt-7">
            <Stat value="1" label="number for everything" />
            <Stat value="0" label="apps to install" />
            <Stat value="100%" label="of messages logged" />
          </div>
        </MotionCard>
        <MotionCard delay={0.08} className="justify-self-center lg:justify-self-end">
          <div className="rotate-1 rounded-2xl border border-hairline bg-card p-4 sm:p-8">
            <PhoneFrame>
              <ChatMock />
            </PhoneFrame>
          </div>
        </MotionCard>
      </div>
    </section>
  );
}
