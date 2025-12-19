import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * Get progress for a specific module
 * GET /api/progress/module/[slug]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { slug } = params;

    // Get all progress for this module
    const userId = (session.user as any).id;
    const moduleProgress = await (prisma as any).lessonProgress.findMany({
      where: {
        userId: userId,
        moduleSlug: slug,
      },
      orderBy: {
        lessonSlug: 'asc',
      },
    });

    // Calculate module statistics
    const completedLessons = moduleProgress.filter((p: any) => p.completed).length;
    const totalTime = moduleProgress.reduce((sum: number, p: any) => sum + (p.timeSpent || 0), 0);
    const scores = moduleProgress.filter((p: any) => p.score !== null).map((p: any) => p.score!);
    const averageScore = scores.length > 0
      ? scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length
      : null;

    return NextResponse.json({
      success: true,
      moduleSlug: slug,
      stats: {
        completedLessons,
        totalTime,
        averageScore,
        totalLessons: moduleProgress.length,
        completionPercentage: moduleProgress.length > 0
          ? Math.round((completedLessons / moduleProgress.length) * 100)
          : 0,
      },
      lessons: moduleProgress,
    });
  } catch (error) {
    console.error('Get module progress error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to fetch module progress',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
