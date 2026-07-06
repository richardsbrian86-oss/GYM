import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      {
        error: "Stripe not configured",
        message: "Set STRIPE_SECRET_KEY in your environment to enable payments.",
      },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { memberId, amount, type, description } = body as {
    memberId?: string;
    amount?: number;
    type?: string;
    description?: string;
  };

  if (!memberId || !amount || !type) {
    return NextResponse.json(
      { error: "memberId, amount, and type are required" },
      { status: 400 }
    );
  }

  const member = await prisma.member.findUnique({ where: { id: memberId } });
  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: description ?? `${type} payment`,
            description: `Payment for ${member.name}`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      memberId,
      type,
    },
    success_url: `${process.env.AUTH_URL}/payments?success=true`,
    cancel_url: `${process.env.AUTH_URL}/payments?canceled=true`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
