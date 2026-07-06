import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe webhooks not configured" }, { status: 503 });
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const memberId = session.metadata?.memberId;
    const type = session.metadata?.type ?? "membership";

    if (memberId && session.amount_total) {
      const externalId = `PAY-${Date.now()}`;
      await prisma.payment.create({
        data: {
          externalId,
          memberId,
          amount: Math.round(session.amount_total / 100),
          type,
          status: "completed",
          date: new Date(),
          method: "Stripe",
          stripePaymentId: session.payment_intent as string,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
