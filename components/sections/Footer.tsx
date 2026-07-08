import { XiaroLogo } from "@/components/XiaroLogo";
import { Display } from "@/components/zd/Display";
import { APP_URL, BOOKING_URL, CONTACT_EMAIL } from "@/lib/links";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Inside the product", href: "/#product" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Try the simulation", href: "/#try-it" }
    ]
  },
  {
    title: "Pricing",
    links: [
      { label: "Plans", href: "/pricing" },
      { label: "Onboarding", href: "/pricing" },
      { label: "30-day guarantee", href: "/pricing" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { label: "Book a demo", href: BOOKING_URL },
      { label: "Log in", href: APP_URL }
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-night px-4 pb-10 pt-20 text-cream sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <XiaroLogo onDark />
            <p className="mt-5 max-w-xs text-sm leading-6 text-cream/60">
              Roster-routed WhatsApp and SMS for shift-based fleets. Built in
              Australia.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.75px] text-cream/50">
                {column.title}
              </h3>
              <div className="grid gap-3 text-[15px] text-cream/80">
                {column.links.map((link) => (
                  <a key={link.label} href={link.href} className="transition hover:text-cream">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-16 pt-12">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,#18D9FF,#1677FF_45%,#84F27A)] opacity-60"
          />
          <Display level={2} as="p">
            Who&apos;s on shift right now?{" "}
            <a
              href={BOOKING_URL}
              className="text-volt underline decoration-2 underline-offset-8 transition hover:decoration-4"
            >
              Find out
            </a>
          </Display>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-cream/15 pt-6 text-[13px] text-cream/50">
          <span>© 2026 Xiaro Pty Ltd · xiaro.com.au</span>
          <a href="/credits.txt" className="transition hover:text-cream/80">
            Photos: Unsplash contributors
          </a>
        </div>
      </div>
    </footer>
  );
}
