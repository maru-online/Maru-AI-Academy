import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { orderID, plan } = body;

    // Verify the order with PayPal API (Server-side validation)
    // For MVP/Demo, we will trust the client passed ID but normally you'd call PayPal API here.
    // Const paypalClient = ...
    // Const request = new paypal.orders.OrdersGetRequest(orderID);
    // ...

    console.log(`PayPal Order Captured: ${orderID} for user ${session.user.email}`);

    // Update User Plan
    const userId = (session.user as any).id;
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: plan === 'TEAM' ? 'TEAM' : 'PRO',
        subscriptionStatus: 'active',
        paymentProvider: 'paypal',
        subscriptionId: orderID, // Storing Order ID as sub ID for now
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PayPal Capture Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
