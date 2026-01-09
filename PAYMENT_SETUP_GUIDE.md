# 💳 Payment Integration Guide

We have set up **PayFast** as your primary payment gateway for South African (ZAR) payments, and prepared the ground for **PayPal**.

## 1. PayFast Configuration
Currently, the system is using **Sandbox Credentials** for testing.

To go live, you need to:
1.  Find your PayFast Merchant ID and Key (from your old account).
2.  Update your `maru-ai-academy/.env.local` file with these values:

```bash
# PayFast Production Credentials
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
PAYFAST_PASSPHRASE=your_passphrase
PAYFAST_SANDBOX=false
```

### Testing (Current Mode)
You can test the flow right now!
-   Click "Subscribe" on the Pricing page.
-   It will redirect to the PayFast Sandbox.
-   Use written credentials on the sandbox page to "Complete" the payment.
-   The webhook (ITN) will fire and upgrade your user to PRO.

> **Note on Localhost**: The PayFast ITN (webhook) cannot reach `localhost:3000`. You need to use a tunneling tool like **ngrok** to test the callback locally, or deploy to Vercel.
>
> **Workaround for Local Testing**:
> After "paying" in Sandbox, you can verify the URL parameters on the success page, but the database won't update automatically unless you manually trigger the API or use ngrok.

## 2. PayPal Integration (Currently Paused)
We have implemented the code for PayPal "Smart Payment Buttons", but hidden them in the UI until you have a PayPal Developer Account.

To enable it in the future:
1.  Log in to the [PayPal Developer Dashboard](https://developer.paypal.com).
2.  Create a App (Sandbox for testing, Live for production).
3.  Copy the **Client ID** (you don't strictly need the Secret for the current Client-side flow, but keep it safe).
4.  Update your `.env.local`:

```bash
# PayPal Credentials
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id_here
```

### Testing PayPal
-   The buttons currently default to `clientId: "test"` if no env var is found.
-   This connects to the public PayPal Sandbox.
-   You can click the PayPal button, log in with a **Sandbox Personal Account** (create one in PayPal Developer Dashboard), and "pay".
-   The system will capture the order and upgrade the user.

## 3. Database Updates
We updated your user schema to support multiple payment providers:
-   `paymentProvider`: 'payfast' or 'paypal'
-   `subscriptionId`: The ID from the provider
-   `billingToken`: For recurring billing

## 4. Recurring Billing
The current setup creates a **Subscription** (Recurring) transaction with PayFast.
-   Frequency: Monthly
-   Amount: R550 (Pro) or R1800 (Team)

---
**Next Steps**:
-   Deploy to Vercel (so ITN callbacks work).
-   Find your real PayFast credentials.
