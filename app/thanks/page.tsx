import type { Metadata } from "next";
import { PillLink } from "@/components/ed/PillLink";
import { TwoTone } from "@/components/ed/TwoTone";

export const metadata: Metadata = {
  title: "You're in",
  robots: { index: false }
};

export default function ThanksPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-5 py-24 text-ink">
      <div className="max-w-xl">
        <p className="text-[13px] uppercase tracking-[0.12em] text-gray">Payment received</p>
        <TwoTone
          as="h1"
          size="xl"
          className="mt-4"
          lead="You're in."
          rest="We'll contact you within 1 business day to connect your own carrier and WhatsApp Business accounts into Xiaro."
        />
        <div className="mt-9">
          <PillLink href="/" variant="solid">
            Back to xiaro.com.au
          </PillLink>
        </div>
      </div>
    </main>
  );
}
