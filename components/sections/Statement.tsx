import { MotionSection } from "@/components/Motion";
import { Display } from "@/components/zd/Display";
import { Pill } from "@/components/zd/Pill";

export function Statement() {
  return (
    <MotionSection className="px-4 py-24 text-center sm:px-6 lg:py-36">
      <div className="mx-auto max-w-4xl">
        <Display level={2} as="h2">
          Group chats deflect blame.
          <br />
          Fleets need <span className="text-brand-gradient-deep">answers.</span>
        </Display>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-ink/60">
          Xiaro turns every inbound driver message into one clean decision: who owns
          this right now — and what happens if they don&apos;t answer.
        </p>
        <div className="mt-9 flex justify-center">
          <Pill href="/#how-it-works">See how it works</Pill>
        </div>
      </div>
    </MotionSection>
  );
}
