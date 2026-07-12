import clsx from "clsx";

const tones = {
  green: "border-good/40 text-good bg-good/10",
  amber: "border-amber/50 text-amber-ink bg-amber/10",
  ink: "border-ink/25 text-ink/70 bg-transparent",
  signal: "border-danger/50 text-[#B03A3A] bg-danger/5"
} as const;

export type ChipTone = keyof typeof tones;

export function Chip({
  tone = "ink",
  children,
  className
}: {
  tone?: ChipTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 tabular text-[11px] font-medium uppercase tracking-[0.14em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
