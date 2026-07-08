import clsx from "clsx";

const variants = {
  solid: "bg-ink text-white hover:bg-ink/85",
  outline: "border border-ink/25 text-ink hover:border-ink/50",
  white: "bg-white text-ink hover:bg-white/90",
  whiteOutline: "border border-white/50 text-white hover:border-white"
} as const;

/** Cartage-style compact pill. */
export function PillLink({
  href,
  onClick,
  variant = "outline",
  children,
  className,
  arrow = true,
  disabled = false
}: {
  href?: string;
  onClick?: () => void;
  variant?: keyof typeof variants;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
  disabled?: boolean;
}) {
  const cls = clsx(
    "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition",
    variants[variant],
    disabled && "cursor-not-allowed opacity-60",
    className
  );
  const body = (
    <>
      {children}
      {arrow ? <span aria-hidden>→</span> : null}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls}>
        {body}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {body}
    </button>
  );
}
