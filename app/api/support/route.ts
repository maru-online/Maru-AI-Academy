import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendSupportTicketConfirmation, sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { email, subject, message, priority = 'normal' } = body;

    // Validation
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: 'Email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create support ticket
    const ticket = await prisma.supportTicket.create({
      data: {
        userId: session?.user?.id,
        email,
        subject,
        message,
        priority,
        status: 'open',
      },
    });

    // Send confirmation email to user
    await sendSupportTicketConfirmation({
      email,
      subject,
      ticketId: ticket.id,
    });

    // Send notification to admin
    await sendContactNotification({
      name: session?.user?.name || 'Support User',
      email,
      message: `SUPPORT TICKET #${ticket.id.substring(0, 8).toUpperCase()}\n\nSubject: ${subject}\nPriority: ${priority}\n\n${message}`,
      type: 'Support',
    });

    return NextResponse.json({
      success: true,
      message: 'Support ticket created successfully. We\'ll respond within 24 hours.',
      ticket: {
        id: ticket.id,
        subject: ticket.subject,
        status: ticket.status,
        createdAt: ticket.createdAt,
      },
    });
  } catch (error) {
    console.error('Support ticket error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to create support ticket',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Get user's support tickets
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!session && !email) {
      return NextResponse.json(
        { error: 'Authentication required or email must be provided' },
        { status: 401 }
      );
    }

    const tickets = await prisma.supportTicket.findMany({
      where: {
        OR: [
          session?.user?.id ? { userId: session.user.id } : {},
          email ? { email } : {},
        ].filter(obj => Object.keys(obj).length > 0),
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        subject: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error('Failed to fetch support tickets:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to fetch support tickets',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
