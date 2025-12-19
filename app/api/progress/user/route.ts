import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { STREAMS } from '@/types/modules';

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
    const userId = (session.user as any).id;
    const lessonProgress = await (prisma as any).lessonProgress.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Calculate summary statistics
    const totalLessonsCompleted = lessonProgress.filter((p: any) => p.completed).length;
    const totalTimeSpent = lessonProgress.reduce((sum: number, p: any) => sum + (p.timeSpent || 0), 0);
    
    // Group by module to get enriched stats
    const moduleStatsArray = [];
    const allModules = STREAMS.flatMap(s => s.modules);

    for (const module of allModules) {
      // Find progress for this module (using slug)
      // Note: we support matching by either slug OR id for backward compatibility
      const moduleProgress = lessonProgress.filter((p: any) => 
        p.moduleSlug === module.slug || p.moduleSlug === module.id
      );
      
      const completedCount = moduleProgress.filter((p: any) => p.completed).length;
      
      // Only include started modules or modules with progress
      if (completedCount > 0) {
        const total = module.lessonsCount || module.lessons?.length || 0;
        const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
        
        moduleStatsArray.push({
          slug: module.slug,
          name: module.title,
          completed: completedCount,
          total: total,
          percentage: percentage
        });
      }
    }

    // Calculate current streak (consecutive days with activity)
    const recentProgress = await (prisma as any).lessonProgress.findMany({
      where: {
        userId: (session.user as any).id,
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

      // Check if there's activity today to start the loop
      const hasActivityToday = recentProgress.some((p: any) => {
        const d = new Date(p.updatedAt);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
      });

      if (!hasActivityToday) {
        // If no activity today, check yesterday for streak
        checkDate.setDate(checkDate.getDate() - 1);
      }

      while (!foundGap && checkDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
        const hasActivityOnDate = recentProgress.some((p: any) => {
          const progressDate = new Date(p.updatedAt);
          progressDate.setHours(0, 0, 0, 0);
          return progressDate.getTime() === checkDate.getTime();
        });

        if (hasActivityOnDate) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          foundGap = true;
        }
      }
    }

    return NextResponse.json({
      success: true,
      totalCompleted: totalLessonsCompleted,
      totalTimeSpent, // in seconds
      currentStreak, // days
      moduleStats: moduleStatsArray,
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
