import clsx from "clsx";

export function Button({
  href,
  variant = "primary",
  children,
  className
}: {
  href: string;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition",
        variant === "primary"
          ? "bg-green-deep text-white hover:bg-[#126A3C]"
          : "border border-ink/20 text-ink hover:bg-ink/5",
        className
      )}
    >
      {children}
    </a>
  );
}
