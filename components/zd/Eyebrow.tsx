import clsx from "clsx";

const tones = {
  ink: "text-ink",
  cream: "text-cream",
  volt: "text-volt",
  green: "text-green-deep"
} as const;

export function Eyebrow({
  tone = "ink",
  children,
  className
}: {
  tone?: keyof typeof tones;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("text-sm font-bold uppercase tracking-[0.75px]", tones[tone], className)}>
      {children}
    </div>
  );
}
