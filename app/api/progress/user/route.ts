import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * Get all progress for the current user
 * GET /api/progress/user
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get all lesson progress for the user
    const lessonProgress = await prisma.lessonProgress.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Calculate summary statistics
    const totalLessonsCompleted = lessonProgress.filter(p => p.completed).length;
    const totalTimeSpent = lessonProgress.reduce((sum, p) => sum + p.timeSpent, 0);
    
    // Group by module to get module completion percentages
    const moduleStats: Record<string, {
      completedLessons: number;
      totalTime: number;
      averageScore?: number;
    }> = {};

    lessonProgress.forEach(progress => {
      if (!moduleStats[progress.moduleSlug]) {
        moduleStats[progress.moduleSlug] = {
          completedLessons: 0,
          totalTime: 0,
        };
      }

      if (progress.completed) {
        moduleStats[progress.moduleSlug].completedLessons++;
      }
      moduleStats[progress.moduleSlug].totalTime += progress.timeSpent;
    });

    // Calculate current streak (consecutive days with activity)
    const recentProgress = await prisma.lessonProgress.findMany({
      where: {
        userId: session.user.id,
        updatedAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        updatedAt: true,
      },
    });

    let currentStreak = 0;
    if (recentProgress.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let checkDate = new Date(today);
      let foundGap = false;

      while (!foundGap && checkDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
        const hasActivityOnDate = recentProgress.some(p => {
          const progressDate = new Date(p.updatedAt);
          progressDate.setHours(0, 0, 0, 0);
          return progressDate.getTime() === checkDate.getTime();
        });

        if (hasActivityOnDate) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          // Only break if it's not today (allow for no activity yet today)
          if (checkDate.getTime() !== today.getTime()) {
            foundGap = true;
          } else {
            checkDate.setDate(checkDate.getDate() - 1);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        totalLessonsCompleted,
        totalTimeSpent, // in seconds
        currentStreak, // days
        moduleCount: Object.keys(moduleStats).length,
      },
      lessonProgress,
      moduleStats,
    });
  } catch (error) {
    console.error('Get user progress error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to fetch user progress',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
