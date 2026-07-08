import type { Metadata } from "next";
import { Display } from "@/components/zd/Display";
import { Eyebrow } from "@/components/zd/Eyebrow";
import { Pill } from "@/components/zd/Pill";

export const metadata: Metadata = {
  title: "You're in",
  robots: { index: false }
};

export default function ThanksPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-5 py-24 text-ink">
      <div className="max-w-xl text-center">
        <Eyebrow tone="green">Payment received</Eyebrow>
        <Display level={1} className="mt-5">
          You&apos;re in.
        </Display>
        <p className="mx-auto mt-6 max-w-md text-lg leading-7 text-ink/60">
          We&apos;ll contact you within 1 business day to schedule your onboarding —
          connecting your own carrier and WhatsApp Business accounts into Xiaro.
        </p>
        <div className="mt-9 flex justify-center">
          <Pill href="/">Back to xiaro.com.au</Pill>
        </div>
      </div>
    </main>
  );
}
