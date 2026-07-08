import { ROSTER } from "@/lib/sim";

export function RosterMini({ activeIndex }: { activeIndex: number | null }) {
  return (
    <div className="rounded-xl border border-hairline bg-white p-2 shadow-xl">
      {ROSTER.map((row, index) => {
        const active = index === activeIndex;
        return (
          <div
            key={row.name}
            className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-3 ${
              active ? "border-green-deep/40 bg-volt/15" : "border-transparent"
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <span
                className={`h-2 w-2 rounded-full ${active ? "bg-green-deep" : "bg-hairline"}`}
                aria-hidden
              />
              {row.name}
            </span>
            <span className="font-mono text-xs text-ink/50">
              {row.shift} · {row.window}
            </span>
          </div>
        );
      })}
    </div>
  );
}
