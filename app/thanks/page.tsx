import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "You're in",
  robots: { index: false }
};

export default function ThanksPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-5 py-24">
      <div className="max-w-xl text-center">
        <SectionHeading
          eyebrow="Payment received"
          title="You're in."
          copy="We'll contact you within 1 business day to schedule your onboarding — connecting your own carrier and WhatsApp Business accounts into Xiaro."
          center
        />
        <div className="mt-8 flex justify-center">
          <Button href="/">Back to xiaro.com.au</Button>
        </div>
      </div>
    </main>
  );
}
