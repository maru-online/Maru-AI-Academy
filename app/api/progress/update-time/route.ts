import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * Update time spent on a lesson
 * POST /api/progress/update-time
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { moduleSlug, lessonSlug, timeSpent } = body;

    // Validation
    if (!moduleSlug || !lessonSlug || timeSpent === undefined) {
      return NextResponse.json(
        { error: 'moduleSlug, lessonSlug, and timeSpent are required' },
        { status: 400 }
      );
    }

    if (typeof timeSpent !== 'number' || timeSpent < 0) {
      return NextResponse.json(
        { error: 'timeSpent must be a positive number (seconds)' },
        { status: 400 }
      );
    }

    // to update or create the progress record
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_moduleSlug_lessonSlug: {
          userId: session.user.id,
          moduleSlug,
          lessonSlug,
        },
      },
      update: {
        timeSpent: {
          increment: timeSpent,
        },
      },
      create: {
        userId: session.user.id,
        moduleSlug,
        lessonSlug,
        timeSpent,
        completed: false,
      },
    });

    return NextResponse.json({
      success: true,
      timeSpent: progress.timeSpent,
    });
  } catch (error) {
    console.error('Update time error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to update time spent',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
