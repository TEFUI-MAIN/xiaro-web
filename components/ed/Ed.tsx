import clsx from "clsx";

/** Editorial page container — cartage-style 1270px column. */
export function Ed({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("mx-auto max-w-[1060px] px-5 sm:px-8", className)}>{children}</div>;
}

/** Three-column quiet feature trio. */
export function Trio({
  items
}: {
  items: { title: string; copy: string }[];
}) {
  return (
    <div className="mt-10 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="text-[15px] font-medium text-ink">{item.title}</h3>
          <p className="mt-2 max-w-[34ch] text-[15px] leading-6 text-ink-soft">{item.copy}</p>
        </div>
      ))}
    </div>
  );
}
