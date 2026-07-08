import clsx from "clsx";

/** Cartage-style two-tone sentence: ink lead, warm-gray continuation. */
export function TwoTone({
  lead,
  rest,
  size = "lg",
  className,
  as: Tag = "h2",
  dark = false
}: {
  lead: string;
  rest?: string;
  size?: "xl" | "lg" | "md";
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  dark?: boolean;
}) {
  return (
    <Tag
      className={clsx(
        "max-w-4xl text-balance font-normal",
        size === "xl" && "text-[38px] leading-[1.06] lg:text-[64px]",
        size === "lg" && "text-[30px] leading-[1.12] lg:text-[44px]",
        size === "md" && "text-[24px] leading-[1.2] lg:text-[30px]",
        className
      )}
    >
      <span className={dark ? "text-cream" : "text-ink"}>{lead}</span>
      {rest ? <span className="text-graylt"> {rest}</span> : null}
    </Tag>
  );
}
