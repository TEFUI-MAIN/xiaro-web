import { Chip } from "@/components/ui/Chip";
import { LADDER } from "@/components/sections/how-it-works-content";

export function EscalationLadderCard() {
  return (
    <div className="rounded-xl border border-hairline bg-white p-6 shadow-xl sm:p-8">
      <div className="relative">
        <div className="absolute bottom-3 left-[4.5rem] top-3 w-px bg-hairline" aria-hidden />
        <div className="grid gap-5">
          {LADDER.map((rung) => (
            <div
              key={rung.who}
              className="grid grid-cols-[3.5rem_1rem_1fr_auto] items-center gap-3"
            >
              <span className="text-right font-mono text-sm text-ink/50">{rung.time}</span>
              <span
                className={`relative z-10 h-2.5 w-2.5 justify-self-center rounded-full ${
                  rung.tone === "green"
                    ? "bg-green-deep"
                    : rung.tone === "amber"
                      ? "bg-amber"
                      : "bg-signal"
                }`}
                aria-hidden
              />
              <span className="text-sm font-medium text-ink">{rung.who}</span>
              <Chip tone={rung.tone}>{rung.status}</Chip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
