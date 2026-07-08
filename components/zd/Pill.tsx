import clsx from "clsx";

const variants = {
  volt: "bg-volt text-ink hover:brightness-95",
  outline: "border border-ink/20 text-ink hover:bg-ink/5",
  cream: "border border-cream/30 text-cream hover:bg-cream/10"
} as const;

export function Pill({
  href,
  onClick,
  variant = "volt",
  children,
  className,
  disabled = false
}: {
  href?: string;
  onClick?: () => void;
  variant?: keyof typeof variants;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const cls = clsx(
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-lg font-semibold transition",
    variants[variant],
    disabled && "cursor-not-allowed opacity-70",
    className
  );
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
