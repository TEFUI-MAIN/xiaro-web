import clsx from "clsx";

/** Two-tone display sentence on the MASTER §2 scale: Barlow Semi Condensed,
 *  ink lead + ink-soft continuation, balanced, never centered. */
export function TwoTone({
  lead,
  rest,
  size = "lg",
  className,
  dark = false,
  as: Tag = "h2"
}: {
  lead: string;
  rest?: string;
  size?: "xl" | "lg" | "md";
  className?: string;
  dark?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag
      className={clsx(
        "max-w-4xl text-balance font-display font-semibold tracking-[-0.01em]",
        size === "xl" && "text-[36px] leading-[1.05] lg:text-[56px]",
        size === "lg" && "text-[26px] leading-[1.1] lg:text-[34px]",
        size === "md" && "text-[19px] leading-[1.15] lg:text-[22px]",
        className
      )}
    >
      <span className={dark ? "text-paperlit" : "text-ink"}>{lead}</span>
      {rest && size === "xl" ? (
        <span
          className={`mt-5 block max-w-2xl font-sans text-[17px] font-normal leading-relaxed tracking-normal ${
            dark ? "text-paperlit/75" : "text-ink-soft"
          }`}
        >
          {rest}
        </span>
      ) : rest ? (
        <span className={dark ? "text-paperlit/60" : "text-ink-soft"}> {rest}</span>
      ) : null}
    </Tag>
  );
}
