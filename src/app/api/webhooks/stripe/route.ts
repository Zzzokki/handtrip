import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db, orderTable, paymentTable, seatTable } from "@/app/api/graphql/database";
import { eq, inArray } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    // Validate webhook secret is configured
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not configured");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature provided" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("PaymentIntent succeeded:", paymentIntent.id);

        // Find the payment record by payment intent ID
        const payment = await db.query.paymentTable.findFirst({
          where: eq(paymentTable.stripePaymentIntentId, paymentIntent.id),
        });

        if (payment) {
          // Extract payment method ID (handle both string and object)
          const paymentMethodId = typeof paymentIntent.payment_method === "string" ? paymentIntent.payment_method : paymentIntent.payment_method?.id || null;

          // Update payment as paid
          await db
            .update(paymentTable)
            .set({
              isPaid: true,
              paidAt: new Date(),
              stripePaymentMethod: paymentMethodId,
            })
            .where(eq(paymentTable.id, payment.id));

          // Find and update the order
          const order = await db.query.orderTable.findFirst({
            where: eq(orderTable.paymentId, payment.id),
            with: {
              travelers: {
                with: {
                  seat: true,
                },
              },
            },
          });

          if (order) {
            // Mark seats as occupied now that payment succeeded
            const seatIds = order.travelers.map((t) => t.seat.id);
            if (seatIds.length > 0) {
              await db.update(seatTable).set({ status: "occupied" }).where(inArray(seatTable.id, seatIds));
            }

            // Update order to confirmed
            await db
              .update(orderTable)
              .set({
                orderStatus: 1, // Confirmed
              })
              .where(eq(orderTable.id, order.id));

            console.log(`Order ${order.id} confirmed after payment`);
          }
        } else {
          console.warn(`Payment not found for intent: ${paymentIntent.id}`);
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("PaymentIntent failed:", paymentIntent.id);

        // Optionally handle failed payments
        const payment = await db.query.paymentTable.findFirst({
          where: eq(paymentTable.stripePaymentIntentId, paymentIntent.id),
        });

        if (payment) {
          const order = await db.query.orderTable.findFirst({
            where: eq(orderTable.paymentId, payment.id),
          });

          if (order && order.orderStatus === 0) {
            // Keep it as pending, user can retry payment
            console.log(`Payment failed for order ${order.id}, keeping as pending`);
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
