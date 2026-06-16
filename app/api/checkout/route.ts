import { NextResponse } from "next/server";
import Stripe from "stripe";
import { isCheckoutPlan, stripePriceEnvByPlan } from "@/lib/checkout";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const plan = body?.plan;

  if (!isCheckoutPlan(plan)) {
    return NextResponse.json({ error: "Invalid plan selected." }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const priceId = process.env[stripePriceEnvByPlan[plan]];

  if (!secretKey || !appUrl || !priceId) {
    return NextResponse.json(
      { error: "Stripe checkout not configured yet." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secretKey);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/?checkout=success`,
    cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    allow_promotion_codes: true
  });

  return NextResponse.json({ url: session.url });
}
