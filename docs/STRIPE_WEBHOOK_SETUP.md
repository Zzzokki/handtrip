# Stripe Webhook Setup

## Environment Variables

Add the following to your `.env.local` file:

```bash
# Stripe Webhook Secret (get this from Stripe Dashboard)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Setup Instructions

1. **Get Webhook Secret from Stripe:**

   - Go to https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - Set the endpoint URL to: `https://yourdomain.com/api/webhooks/stripe`
   - For local testing, use Stripe CLI: `stripe listen --forward-to localhost:3001/api/webhooks/stripe`
   - Select events to listen to:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Copy the webhook signing secret

2. **Add Secret to Environment:**

   - Add `STRIPE_WEBHOOK_SECRET` to `.env.local`
   - Restart your development server

3. **Test Webhook Locally:**

   ```bash
   # Install Stripe CLI
   brew install stripe/stripe-cli/stripe

   # Login to Stripe
   stripe login

   # Forward webhooks to local server
   stripe listen --forward-to localhost:3001/api/webhooks/stripe

   # Trigger a test event
   stripe trigger payment_intent.succeeded
   ```

## Payment Flow

1. User creates an order (without payment)
2. Order is created with status "pending" (0) and payment marked as unpaid
3. User is redirected to payment page
4. Payment intent is created and stored in database
5. User completes payment
6. Stripe webhook receives `payment_intent.succeeded` event
7. Backend automatically updates:
   - Payment record: `isPaid = true`, `paidAt = now()`
   - Order status: changes to "confirmed" (1)

## Webhook Events

### `payment_intent.succeeded`

- Updates payment record to paid
- Updates order status to confirmed
- Logged in console

### `payment_intent.payment_failed`

- Logs failure
- Order remains in pending state
- User can retry payment

## Security

- Webhook signature verification is enforced
- Only valid Stripe events are processed
- User authorization checked for payment updates
