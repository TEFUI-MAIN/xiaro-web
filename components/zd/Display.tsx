import clsx from "clsx";

export function Display({
  level = 2,
  children,
  className,
  as
}: {
  level?: 1 | 2;
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const Tag = as ?? (level === 1 ? "h1" : "h2");
  return (
    <Tag
      className={clsx(
        "font-medium tracking-[-0.01em]",
        level === 1
          ? "text-[40px] leading-[1.05] lg:text-[68px]"
          : "text-[32px] leading-[1.1] lg:text-[44px]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
