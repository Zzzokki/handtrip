import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db, orderTable } from "@/app/api/graphql/database";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { amount, orderId } = await req.json();

    // Validate the order exists and amount matches
    if (orderId) {
      const order = await db.query.orderTable.findFirst({
        where: eq(orderTable.id, orderId),
        with: {
          payment: true,
        },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Verify amount matches order total
      if (order.payment.total !== amount) {
        return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
      }

      // Don't create payment intent if already paid
      if (order.payment.isPaid) {
        return NextResponse.json({ error: "Order already paid" }, { status: 400 });
      }
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // MNT doesn't use decimal units, so pass amount as-is
      currency: "mnt", // Mongolian Tugrik
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: orderId?.toString() || "",
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
