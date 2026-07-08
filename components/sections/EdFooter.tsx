import { XiaroMark } from "@/components/XiaroLogo";
import { Ed } from "@/components/ed/Ed";
import { APP_URL, BOOKING_URL, CONTACT_EMAIL } from "@/lib/links";

const columns = [
  {
    title: "Product",
    links: [
      { label: "What I do", href: "/#capabilities" },
      { label: "Scenarios", href: "/#scenarios" },
      { label: "Try me", href: "/#try-it" },
      { label: "Pricing", href: "/pricing" }
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

export function EdFooter() {
  return (
    <footer className="bg-night pb-10 pt-20">
      <Ed>
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <a href="/" className="flex min-h-[44px] items-center gap-2.5 text-cream">
              <XiaroMark size={30} />
              <span className="text-[17px] font-semibold">Xiaro</span>
            </a>
            <p className="mt-4 max-w-[30ch] text-[15px] leading-6 text-graylt">
              Roster-routed WhatsApp and SMS for shift-based fleets. Built in
              Australia.
            </p>
            <p className="mt-8 text-[22px] text-cream">
              Who&apos;s on shift right now?{" "}
              <a href={BOOKING_URL} className="text-volt underline underline-offset-4">
                Find out →
              </a>
            </p>
          </div>
          <div className="flex gap-16">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[13px] uppercase tracking-[0.12em] text-cream/50">{column.title}</h3>
                <div className="mt-4 grid gap-2.5 text-[14px] text-cream/85">
                  {column.links.map((link) => (
                    <a key={link.label} href={link.href} className="inline-block py-1 transition hover:text-white max-sm:py-3">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-[12px] text-cream/50">
          <span>© 2026 Xiaro Pty Ltd · xiaro.com.au</span>
          <span className="uppercase tracking-[0.12em]">
            Official WhatsApp Business API · Built in Australia
          </span>
          <a href="/credits.txt" className="inline-block hover:text-cream max-sm:py-3">
            Photo credits
          </a>
        </div>
      </Ed>
    </footer>
  );
}
