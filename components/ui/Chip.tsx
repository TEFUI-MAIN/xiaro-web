import clsx from "clsx";

const tones = {
  green: "border-green/40 text-green-deep bg-green/5",
  amber: "border-amber/50 text-[#9A6A1F] bg-amber/10",
  ink: "border-ink/25 text-ink/70 bg-transparent",
  signal: "border-signal/40 text-signal bg-signal/5"
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
        "inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
