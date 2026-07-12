import Image from "next/image";
import { EdTicker } from "@/components/ed/EdTicker";
import { PillLink } from "@/components/ed/PillLink";
import { BOOKING_URL } from "@/lib/links";

export function EdHero() {
  return (
    <header className="relative min-h-[86vh]">
      <Image
        src="/photos/xiaro-splash.jpg"
        alt="Convoy of freight trucks at sunset with a connected-network globe on the horizon"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />
      <div aria-hidden className="absolute inset-0 bg-asphalt/65" />

      <div className="relative mx-auto flex min-h-[86vh] max-w-[1060px] flex-col justify-center px-5 pb-24 pt-28 sm:px-8">
        <h1 className="max-w-[14ch] text-balance font-display text-[36px] font-bold leading-[1.05] tracking-[-0.01em] text-paperlit lg:text-[56px]">
          I&apos;m the number your whole fleet messages.
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-6 text-paperlit/85">
          Every driver texts me on WhatsApp or SMS. I always know who&apos;s on
          shift, I escalate when nobody answers, and I never forget who said what.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PillLink href="/pricing" variant="white">
            Get started
          </PillLink>
          <PillLink href={BOOKING_URL} variant="whiteOutline">
            See your roster routing in 15 minutes
          </PillLink>
        </div>
        <div className="mt-12">
          <EdTicker />
        </div>
        <p className="absolute bottom-8 left-0 w-full px-5 text-[11px] uppercase tracking-[0.14em] text-paperlit/60 sm:px-8">
          Official WhatsApp Business API · Carrier-grade SMS · Audit-grade logging · Built in Australia
        </p>
      </div>
    </header>
  );
}
