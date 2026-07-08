import { MAX_DRIVERS } from "./pricing";

export type CheckoutRequest = {
  interval: "monthly" | "annual";
  drivers: number;
  onboarding: boolean;
};

export function parseCheckoutRequest(body: unknown): CheckoutRequest | null {
  if (typeof body !== "object" || body === null) return null;
  const { interval, drivers, onboarding } = body as Record<string, unknown>;
  if (interval !== "monthly" && interval !== "annual") return null;
  if (typeof drivers !== "number" || !Number.isInteger(drivers)) return null;
  if (drivers < 1 || drivers > MAX_DRIVERS) return null;
  if (typeof onboarding !== "boolean") return null;
  return { interval, drivers, onboarding };
}

export function checkoutEnvReady(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_BASE_MONTHLY_PRICE_ID &&
      process.env.STRIPE_BASE_ANNUAL_PRICE_ID &&
      process.env.STRIPE_ONBOARDING_PRICE_ID
  );
}
