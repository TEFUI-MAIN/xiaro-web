import clsx from "clsx";

const variants = {
  solid:
    "bg-[rgb(var(--btn-bg))] text-[rgb(var(--btn-fg))] hover:brightness-95",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink/5",
  white: "bg-paperlit text-asphalt hover:brightness-95",
  whiteOutline: "border-[1.5px] border-paperlit/60 text-paperlit hover:bg-paperlit/10"
} as const;

/** MASTER §5 buttons: 6px radius, Barlow 600, 200ms bg transition, amber focus ring (global). */
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
    "group inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[14px] font-medium transition-[background-color,filter] duration-200 max-sm:min-h-[44px] max-sm:px-5",
    variants[variant],
    disabled && "cursor-not-allowed opacity-60",
    className
  );
  const body = (
    <>
      {children}
      {arrow ? (
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      ) : null}
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
