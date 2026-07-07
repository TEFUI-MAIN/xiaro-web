// Transitional stub: the old per-plan checkout is gone; this button now just
// links to /pricing. Deleted entirely when the new landing page lands.
export function CheckoutButton({
  featured = false,
  children
}: {
  plan?: unknown;
  featured?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href="/pricing"
      className={`inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition ${
        featured ? "bg-green text-white hover:bg-green-deep" : "border border-ink/20 text-ink hover:bg-ink/5"
      }`}
    >
      {children}
    </a>
  );
}
