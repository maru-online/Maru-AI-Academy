'use client';

import { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
  plan: string;
  amount: number; // In USD usually, but PayPal handles currency conversion
  currency?: string;
  onSuccess?: () => void;
}

export default function PayPalButtonWrapper({ plan, amount, currency = 'USD', onSuccess }: PayPalButtonProps) {
  const [error, setError] = useState<string | null>(null);

  // Initial Options
  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", // "test" uses sandbox
    currency: currency,
    intent: "capture",
  };

  return (
    <div className="w-full z-0 relative">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: `Maru AI Academy - ${plan} Plan`,
                  amount: {
                    currency_code: currency,
                    value: amount.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture();
              console.log('PayPal Approved:', details);
              
              // Call our backend to update the database
              try {
                const res = await fetch('/api/paypal/capture', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    orderID: data.orderID,
                    plan: plan,
                  }),
                });
                
                if (res.ok) {
                   if (onSuccess) onSuccess();
                   // Optional: Redirect to success page
                   window.location.href = '/dashboard?payment=success';
                }
              } catch (err) {
                console.error('Backend capture failed', err);
                setError('Payment recorded failed, please contact support.');
              }
            }
          }}
          onError={(err: any) => {
            console.error('PayPal Error:', err);
            setError('Payment failed. Please try again.');
          }}
        />
      </PayPalScriptProvider>
      {error && <p className="text-xs text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
}
