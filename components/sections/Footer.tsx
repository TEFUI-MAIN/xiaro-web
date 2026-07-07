import { XiaroLogo } from "@/components/XiaroLogo";
import { APP_URL, BOOKING_URL, CONTACT_EMAIL } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-hairline px-5 py-12 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <XiaroLogo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Workforce communications for shift-based operations, built in
            Australia.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Product
          </h3>
          <div className="grid gap-2 text-sm text-muted">
            <a href="/#how-it-works" className="transition hover:text-ink">
              How it works
            </a>
            <a href="/#product" className="transition hover:text-ink">
              Product
            </a>
            <a href="/pricing" className="transition hover:text-ink">
              Pricing
            </a>
            <a href={APP_URL} className="transition hover:text-ink">
              Log in
            </a>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Contact
          </h3>
          <div className="grid gap-2 text-sm text-muted">
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-ink">
              {CONTACT_EMAIL}
            </a>
            <a href={BOOKING_URL} className="transition hover:text-ink">
              Book a demo
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-between gap-3 border-t border-hairline pt-6 font-mono text-xs text-muted">
        <span>© 2026 Xiaro Pty Ltd</span>
        <span>xiaro.com.au</span>
      </div>
    </footer>
  );
}
