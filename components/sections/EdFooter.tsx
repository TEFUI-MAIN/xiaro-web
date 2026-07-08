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
    <footer className="border-t border-hairline py-16">
      <Ed>
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <a href="/" className="flex items-center gap-2.5 text-ink">
              <XiaroMark size={30} />
              <span className="text-[17px] font-semibold">Xiaro</span>
            </a>
            <p className="mt-4 max-w-[30ch] text-[14px] leading-5 text-gray">
              Roster-routed WhatsApp and SMS for shift-based fleets. Built in
              Australia.
            </p>
            <p className="mt-8 text-[22px] text-ink">
              Who&apos;s on shift right now?{" "}
              <a href={BOOKING_URL} className="text-[#0D5BD6] underline underline-offset-4">
                Find out →
              </a>
            </p>
          </div>
          <div className="flex gap-16">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[13px] text-gray">{column.title}</h3>
                <div className="mt-4 grid gap-2.5 text-[14px] text-ink">
                  {column.links.map((link) => (
                    <a key={link.label} href={link.href} className="transition hover:text-[#0D5BD6]">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-6 text-[12px] text-gray">
          <span>© 2026 Xiaro Pty Ltd · xiaro.com.au</span>
          <span className="uppercase tracking-[0.12em]">
            Official WhatsApp Business API · Built in Australia
          </span>
          <a href="/credits.txt" className="hover:text-ink">
            Photo credits
          </a>
        </div>
      </Ed>
    </footer>
  );
}
