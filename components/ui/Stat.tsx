import clsx from "clsx";

const tones = {
  ink: "text-ink",
  signal: "text-signal",
  amber: "text-[#9A6A1F]"
} as const;

export function Stat({
  value,
  label,
  tone = "ink"
}: {
  value: string;
  label: string;
  tone?: keyof typeof tones;
}) {
  return (
    <div>
      <div className={clsx("font-mono text-3xl", tones[tone])}>{value}</div>
      <div className="mt-1 text-sm leading-5 text-muted">{label}</div>
    </div>
  );
}
