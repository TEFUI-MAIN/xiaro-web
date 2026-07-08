import clsx from "clsx";

/** monday.com-style chapter band: full-bleed tint switch + giant headline as the divider. */
export function Chapter({
  tone = "white",
  children,
  className,
  id
}: {
  tone?: "white" | "tint";
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(tone === "tint" ? "bg-[#F2F5F8]" : "bg-white", "py-24 lg:py-36", className)}
    >
      {children}
    </section>
  );
}

export function ChapterTitle({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={clsx(
        "text-balance text-[44px] font-semibold leading-[0.98] tracking-[-0.03em] lg:text-[92px]",
        className
      )}
    >
      {children}
    </h2>
  );
}
