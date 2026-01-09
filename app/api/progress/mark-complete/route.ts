import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { checkBadgeEligibility } from '@/lib/badges';

/**
 * Mark a lesson as complete
 * POST /api/progress/mark-complete
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
    const { moduleSlug, lessonSlug, timeSpent = 0, score } = body;

    // Validation
    if (!moduleSlug || !lessonSlug) {
      return NextResponse.json(
        { error: 'moduleSlug and lessonSlug are required' },
        { status: 400 }
      );
    }

    // Upsert lesson progress (create or update)
    const userId = (session.user as any).id;
    const progress = await (prisma as any).lessonProgress.upsert({
      where: {
        userId_moduleSlug_lessonSlug: {
          userId: userId,
          moduleSlug,
          lessonSlug,
        },
      },
      update: {
        completed: true,
        completedAt: new Date(),
        timeSpent: {
          increment: timeSpent,
        },
        score: score !== undefined ? score : undefined,
      },
      create: {
        userId: userId,
        moduleSlug,
        lessonSlug,
        completed: true,
        completedAt: new Date(),
        timeSpent,
        score,
      },
    });



    // Check for badges
    let newBadges: any[] = [];
    try {
      newBadges = await checkBadgeEligibility(userId);
    } catch (badgeError) {
      console.error('Badge check failed (non-blocking):', badgeError);
    }

    return NextResponse.json({
      success: true,
      message: 'Lesson marked as complete',
      progress,
      newBadges
    });
  } catch (error) {
    console.error('Mark complete error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to mark lesson as complete',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
