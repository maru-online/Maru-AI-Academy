import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, type = 'general' } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        type,
      },
    });

    // Send notification email to admin
    await sendContactNotification({
      name,
      email,
      message,
      type,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.',
      id: contactMessage.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to submit contact form',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
