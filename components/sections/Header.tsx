"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { XiaroLogo } from "@/components/XiaroLogo";
import { Pill } from "@/components/zd/Pill";
import { APP_URL, BOOKING_URL } from "@/lib/links";

const links = [
  { label: "Product", href: "/#product" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Try it", href: "/#try-it" },
  { label: "Pricing", href: "/pricing" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-hairline bg-white/95 px-4 py-3 transition-shadow sm:px-6 lg:px-10 ${
        scrolled ? "shadow-[0_4px_20px_rgba(7,17,31,0.08)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <a href="/" aria-label="Xiaro home">
          <XiaroLogo compact />
        </a>
        <div className="hidden items-center gap-8 text-[15px] font-medium text-ink/80 lg:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-ink">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={APP_URL} className="mr-1 text-[15px] font-medium text-ink/70 transition hover:text-ink">
            Log in
          </a>
          <Pill href={BOOKING_URL} variant="outline" className="px-4 py-2 text-base">
            Book a demo
          </Pill>
          <Pill href="/pricing" className="px-4 py-2 text-base">
            Get started
          </Pill>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-ink lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 top-[61px] z-40 flex flex-col bg-night px-6 py-10 lg:hidden">
          <div className="grid gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-3xl font-medium text-cream"
              >
                {link.label}
              </a>
            ))}
            <a href={APP_URL} className="text-3xl font-medium text-cream/70">
              Log in
            </a>
          </div>
          <div className="mt-auto grid gap-3">
            <Pill href="/pricing" className="w-full">
              Get started
            </Pill>
            <Pill href={BOOKING_URL} variant="cream" className="w-full">
              Book a demo
            </Pill>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
