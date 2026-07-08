import clsx from "clsx";

const tones = {
  night: "bg-night text-cream",
  navy: "bg-navy text-cream",
  azure: "bg-[linear-gradient(140deg,#1677FF,#0E56D6_70%)] text-white",
  gray: "bg-cream text-ink",
  white: "bg-white text-ink shadow-[0_10px_36px_rgba(7,17,31,0.07)]"
} as const;

export function SectionCard({
  tone,
  children,
  className
}: {
  tone: keyof typeof tones;
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("rounded-3xl", tones[tone], className)}>{children}</div>;
}

/** Standard inset wrapper for section cards and section content. */
export function Inset({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("mx-auto max-w-[1400px] px-4 sm:px-6", className)}>{children}</div>;
}
