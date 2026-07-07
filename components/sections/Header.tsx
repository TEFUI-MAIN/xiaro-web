import { XiaroLogo } from "@/components/XiaroLogo";
import { Button } from "@/components/ui/Button";
import { APP_URL, BOOKING_URL } from "@/lib/links";

export function Header() {
  return (
    <nav className="sticky top-0 z-50 border-b border-hairline bg-paper/90 px-5 py-3 backdrop-saturate-150 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="/" aria-label="Xiaro home">
          <XiaroLogo compact />
        </a>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="/#how-it-works" className="transition hover:text-ink">
            How it works
          </a>
          <a href="/#product" className="transition hover:text-ink">
            Product
          </a>
          <a href="/#industries" className="transition hover:text-ink">
            Industries
          </a>
          <a href="/pricing" className="transition hover:text-ink">
            Pricing
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={APP_URL}
            className="hidden text-sm font-medium text-muted transition hover:text-ink sm:inline"
          >
            Log in
          </a>
          <Button
            href={BOOKING_URL}
            variant="outline"
            className="hidden px-4 py-2 sm:inline-flex"
          >
            Book a demo
          </Button>
          <Button href="/pricing" className="px-4 py-2">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}
