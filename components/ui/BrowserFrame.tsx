import Image from "next/image";

export function BrowserFrame({
  src,
  alt,
  width = 1440,
  height = 900,
  priority = false
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-panel p-2 shadow-[0_1px_0_#E3E1DA,0_12px_32px_rgba(20,24,31,0.10)]">
      <div className="flex items-center gap-2 px-2 pb-2 pt-1">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-3 rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/50">
          app.xiaro.io
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="w-full rounded-md"
      />
    </div>
  );
}
