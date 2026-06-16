"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  mode?: "hero" | "section";
  className?: string;
  overlay?: React.ReactNode;
};

export function ParallaxImage({
  src,
  alt,
  priority,
  mode = "section",
  className = "",
  overlay
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let frame = 0;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const next = 1 - Math.min(Math.max((rect.top + rect.height * 0.35) / (viewport + rect.height * 0.35), 0), 1);
      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const translate = mode === "hero" ? progress * -18 : (progress - 0.35) * -22;
  const scale = mode === "hero" ? 1.08 - progress * 0.035 : 1.09 - progress * 0.055;

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-2xl ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1774}
        height={998}
        priority={priority}
        sizes="(min-width: 1024px) 54vw, 100vw"
        className="h-full w-full object-cover will-change-transform"
        style={{ transform: `translate3d(0, ${translate}px, 0) scale(${scale})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-ink/72 via-ink/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/66 via-transparent to-transparent" />
      {overlay}
    </div>
  );
}
