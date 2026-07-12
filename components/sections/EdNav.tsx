"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { XiaroMark } from "@/components/XiaroLogo";
import { PillLink } from "@/components/ed/PillLink";
import { APP_URL, BOOKING_URL } from "@/lib/links";

const links = [
  { label: "What I do", href: "/#capabilities" },
  { label: "Scenarios", href: "/#scenarios" },
  { label: "Try me", href: "/#try-it" },
  { label: "Pricing", href: "/pricing" }
];

/** Cartage-style nav: overlaid on the hero (transparent, white) or solid on white pages. */
export function EdNav({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const text = overlay ? "text-white" : "text-ink";
  const dim = overlay ? "text-white/80 hover:text-white" : "text-ink-soft hover:text-ink";

  return (
    <nav
      className={`${overlay ? "absolute inset-x-0 top-0 z-40" : "border-b border-line bg-paper"} px-5 py-4 sm:px-8`}
    >
      <div className="mx-auto flex max-w-[1270px] items-center justify-between">
        <a href="/" aria-label="Xiaro home" className={`flex min-h-[44px] items-center gap-2.5 ${text}`}>
          <XiaroMark size={30} />
          <span className="font-display text-[17px] font-bold uppercase tracking-[0.14em]">Xiaro</span>
        </a>
        <div className={`hidden items-center gap-7 text-[14px] lg:flex ${dim}`}>
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={APP_URL} className={`text-[14px] ${dim}`}>
            Log in
          </a>
          <PillLink
            href={BOOKING_URL}
            variant={overlay ? "whiteOutline" : "outline"}
            arrow={false}
          >
            Book a demo
          </PillLink>
          <PillLink href="/pricing" variant={overlay ? "white" : "solid"}>
            Get started
          </PillLink>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`grid min-h-[44px] min-w-[44px] place-items-center rounded-md lg:hidden ${text}`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-paper px-6 py-8">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 text-ink" onClick={() => setOpen(false)}>
              <XiaroMark size={30} />
              <span className="font-display text-[17px] font-bold uppercase tracking-[0.14em]">Xiaro</span>
            </a>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid min-h-[44px] min-w-[44px] place-items-center rounded-md text-ink"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-12 grid gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-3xl text-ink"
              >
                {link.label}
              </a>
            ))}
            <a href={APP_URL} className="text-3xl text-ink-soft">
              Log in
            </a>
          </div>
          <div className="mt-auto grid gap-3">
            <PillLink href="/pricing" variant="solid" className="justify-center py-3 text-[15px]">
              Get started
            </PillLink>
            <PillLink href={BOOKING_URL} className="justify-center py-3 text-[15px]" arrow={false}>
              Book a demo
            </PillLink>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
