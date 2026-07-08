import Image from "next/image";

/** Official Xiaro mark — single source of truth is the product repo's
 *  public/xiaro_logo.png (black tile, gradient X). */
export function XiaroMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/xiaro_logo.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      priority
      className="rounded-[10px] ring-1 ring-white/10"
      style={{ width: size, height: size }}
    />
  );
}

export function XiaroLogo({
  compact = false,
  onDark = false
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <XiaroMark size={compact ? 36 : 44} />
      <span
        className={`text-2xl font-semibold tracking-tight ${onDark ? "text-cream" : "text-ink"}`}
      >
        Xiaro
      </span>
    </div>
  );
}
