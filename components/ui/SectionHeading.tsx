import clsx from "clsx";

export function SectionHeading({
  number,
  eyebrow,
  title,
  copy,
  center = false
}: {
  number?: string;
  eyebrow: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <div className={clsx("max-w-2xl", center && "mx-auto text-center")}>
      <div
        className={clsx(
          "mb-3 flex items-baseline gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-green-deep",
          center && "justify-center"
        )}
      >
        {number ? <span className="font-mono font-normal text-muted">№ {number}</span> : null}
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-muted">{copy}</p> : null}
    </div>
  );
}
