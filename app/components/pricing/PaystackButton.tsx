'use client';

import { usePaystackPayment } from 'react-paystack';
import { Button } from '@/components/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaystackButtonProps {
  email: string;
  amount: number; // in Rands (e.g. 550 for $29 approx)
  metadata: {
    plan: 'PRO' | 'TEAM';
    userId: string;
  };
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
  label?: string;
}

export default function PaystackSubscriptionButton({
  email,
  amount,
  metadata,
  onSuccess,
  onClose,
  label = 'Pay Now'
}: PaystackButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: amount * 100, // Paystack expects cents
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    metadata: {
      custom_fields: [
        {
          display_name: "Plan",
          variable_name: "plan",
          value: metadata.plan
        },
        {
          display_name: "User ID",
          variable_name: "user_id",
          value: metadata.userId
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    setLoading(true);
    initializePayment({
      onSuccess: (reference) => {
        setLoading(false);
        if (onSuccess) onSuccess(reference);
        router.refresh(); // Refresh to show new plan
      },
      onClose: () => {
        setLoading(false);
        if (onClose) onClose();
      }
    });
  };

  return (
    <Button 
      variant="primary" 
      fullWidth 
      onClick={handlePayment} 
      disabled={loading || !config.publicKey}
    >
      {loading ? 'Processing...' : label}
    </Button>
  );
}
