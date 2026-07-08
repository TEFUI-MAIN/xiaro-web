import Image from "next/image";
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
      <div aria-hidden className="absolute inset-0 bg-night/45" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,17,31,0.55),transparent_40%)]"
      />

      <div className="relative flex min-h-[86vh] flex-col items-center justify-center px-5 pb-24 pt-28 text-center">
        <h1 className="max-w-3xl text-balance text-[42px] font-normal leading-[1.04] text-white lg:text-[66px]">
          I&apos;m the number your whole fleet messages.
        </h1>
        <p className="mt-5 max-w-xl text-balance text-[16px] leading-6 text-white/85">
          Every driver texts me on WhatsApp or SMS. I always know who&apos;s on
          shift, I escalate when nobody answers, and I never forget who said what.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PillLink href="/pricing" variant="white">
            Get started
          </PillLink>
          <PillLink href={BOOKING_URL} variant="whiteOutline">
            Book a demo
          </PillLink>
        </div>
        <p className="absolute bottom-8 left-1/2 w-full -translate-x-1/2 px-5 text-[11px] uppercase tracking-[0.14em] text-white/60">
          Official WhatsApp Business API · Carrier-grade SMS · Audit-grade logging · Built in Australia
        </p>
      </div>
    </header>
  );
}
