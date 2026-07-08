import { MotionSection } from "@/components/Motion";
import { Pill } from "@/components/zd/Pill";

export function Statement() {
  return (
    <MotionSection className="px-4 py-24 text-center sm:px-6 lg:py-36">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-balance text-[36px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[56px]">
          Group chats deflect blame.
          <br />
          Fleets need <span className="text-brand-gradient-deep">answers.</span>
        </h2>
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
