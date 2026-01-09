import { NextRequest, NextResponse } from 'next/server';
import { generatePayFastSignature, PAYFAST_CONFIG } from '@/lib/payfast';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { plan, amount, frequency = 'monthly' } = body;

  const orderId = `ORDER-${Date.now()}-${session.user.email.split('@')[0]}`;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const data: any = {
    merchant_id: PAYFAST_CONFIG.merchant_id,
    merchant_key: PAYFAST_CONFIG.merchant_key,
    return_url: `${baseUrl}/pricing/success?order_id=${orderId}`,
    cancel_url: `${baseUrl}/pricing/cancel`,
    notify_url: `${baseUrl}/api/payfast/itn`,
    name_first: session.user.name?.split(' ')[0] || 'User',
    name_last: session.user.name?.split(' ').slice(1).join(' ') || '',
    email_address: session.user.email,
    m_payment_id: orderId,
    amount: amount.toFixed(2),
    item_name: `Maru AI Academy - ${plan} Plan`,
    custom_str1: (session.user as any).id, // Pass User ID
    custom_str2: plan,            // Pass Plan (PRO/TEAM)
  };

  // If recurring (Subscription)
  if (frequency === 'monthly') {
    data.subscription_type = '1';
    data.billing_date = new Date().toISOString().split('T')[0]; // Start today
    data.recurring_amount = amount.toFixed(2);
    data.frequency = '3'; // 3 = Monthly
    data.cycles = '0'; // 0 = Indefinite
  }

  const signature = generatePayFastSignature(data, PAYFAST_CONFIG.passphrase);
  data.signature = signature;

  return NextResponse.json({ 
    url: PAYFAST_CONFIG.url,
    data 
  });
}
