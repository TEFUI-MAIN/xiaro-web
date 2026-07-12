import { PillLink } from "@/components/ed/PillLink";
import { TwoTone } from "@/components/ed/TwoTone";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-5 py-24 text-ink">
      <div className="max-w-xl">
        <p className="tabular font-sans text-[13px] font-medium text-ink-soft">404 · no route found</p>
        <TwoTone
          as="h1"
          size="xl"
          className="mt-4"
          lead="Wrong turn."
          rest="I route thousands of messages a day, but this page isn't one of them."
        />
        <div className="mt-9 flex gap-3">
          <PillLink href="/" variant="solid">
            Back home
          </PillLink>
          <PillLink href="/pricing">See pricing</PillLink>
        </div>
      </div>
    </main>
  );
}
