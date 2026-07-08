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
        className="absolute -inset-10 bg-[radial-gradient(closest-side,rgba(168,242,107,0.28),transparent)] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-xl ring-1 ring-cream/10">{children}</div>
    </div>
  );
}
