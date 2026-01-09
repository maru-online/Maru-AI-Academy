'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';

interface PayFastButtonProps {
  plan: string;
  amount: number;
  label?: string;
}

export default function PayFastButton({ plan, amount, label = 'Subscribe' }: PayFastButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payfast/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, amount }),
      });
      
      const { url, data } = await res.json();

      // Create a hidden form and submit it
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = url;
      form.style.display = 'none';

      Object.keys(data).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Payment generation failed', error);
      alert('Failed to initialize payment');
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="primary" 
      fullWidth 
      onClick={handlePayment} 
      disabled={loading}
      className="bg-[#ff4d4d] hover:bg-[#ff3333] border-none text-white" // PayFast Red-ish color
    >
      {loading ? 'Processing...' : `Pay via PayFast (R${amount})`}
    </Button>
  );
}
