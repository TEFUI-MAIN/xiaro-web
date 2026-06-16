export type CheckoutPlan = "starter" | "operations" | "business";

export const stripePriceEnvByPlan: Record<CheckoutPlan, string> = {
  starter: "STRIPE_STARTER_PRICE_ID",
  operations: "STRIPE_OPERATIONS_PRICE_ID",
  business: "STRIPE_BUSINESS_PRICE_ID"
};

export function isCheckoutPlan(value: unknown): value is CheckoutPlan {
  return value === "starter" || value === "operations" || value === "business";
}
