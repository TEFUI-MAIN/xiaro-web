import clsx from "clsx";

/** Volt radial glow behind a framed child — the Zendesk-style lit device treatment. */
export function GlowFrame({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("relative", className)}>
      <div
        aria-hidden
        className="absolute -inset-10 bg-[radial-gradient(closest-side_at_30%_30%,rgba(24,217,255,0.22),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -inset-10 bg-[radial-gradient(closest-side_at_75%_75%,rgba(132,242,122,0.22),transparent)] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-xl ring-1 ring-cream/10">{children}</div>
    </div>
  );
}
