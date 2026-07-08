"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "xiaro-announce-dismissed";

export function Announcement() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(KEY)) setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="relative bg-ink px-10 py-2.5 text-center text-[13px] text-cream/80">
      <span className="font-semibold text-cream">New</span> — driver-approved location check-ins.
      Privacy is the point.{" "}
      <a href="/#product" className="font-semibold text-cream underline underline-offset-4">
        See it →
      </a>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          window.localStorage.setItem(KEY, "1");
          setOpen(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-cream/60 transition hover:text-cream"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
