import { NextResponse } from "next/server";
import Stripe from "stripe";
import { checkoutEnvReady, parseCheckoutRequest } from "@/lib/checkout";

export async function POST(request: Request) {
  if (!checkoutEnvReady()) {
    return NextResponse.json({ error: "checkout_unconfigured" }, { status: 503 });
  }

  const parsed = parseCheckoutRequest(await request.json().catch(() => null));
  if (!parsed) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const basePrice =
    parsed.interval === "annual"
      ? (process.env.STRIPE_BASE_ANNUAL_PRICE_ID as string)
      : (process.env.STRIPE_BASE_MONTHLY_PRICE_ID as string);

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: basePrice, quantity: parsed.drivers }
  ];
  if (parsed.onboarding) {
    line_items.push({
      price: process.env.STRIPE_ONBOARDING_PRICE_ID as string,
      quantity: 1
    });
  }

  const origin = request.headers.get("origin") ?? "https://xiaro.com.au";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items,
      allow_promotion_codes: true,
      success_url: `${origin}/thanks`,
      cancel_url: `${origin}/pricing?checkout=cancelled`
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session failed", error);
    return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
  }
}
