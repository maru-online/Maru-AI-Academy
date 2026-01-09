import prisma from '@/lib/prisma';
import { beginnerCurriculum } from '@/types/curriculum';

export async function checkBadgeEligibility(userId: string) {
  // 1. Get user's progress using LessonProgress tracker
  const userProgress = await prisma.lessonProgress.findMany({
    where: { 
      userId,
      completed: true
    }
  });

  const completedLessonSlugs = new Set(userProgress.map(p => p.lessonSlug));
  const newBadges: any[] = [];

  // Helper function to award badge
  async function awardBadge(slug: string) {
    // Check if user already has this specific badge
    const existingBadge = await prisma.userBadge.findUnique({
      where: {
        userId_badgeId: undefined, // cannot use composite key easily here without knowing badgeId
      },
    });

    // Better approach: find badge first
    const badge = await prisma.badge.findUnique({ where: { slug } });
    if (!badge) return;

    // Check if user has it
    const hasBadge = await prisma.userBadge.findUnique({
      where: {
        userId_badgeId: {
          userId,
          badgeId: badge.id
        }
      }
    });

    if (!hasBadge) {
      await prisma.userBadge.create({
        data: {
          userId,
          badgeId: badge.id
        }
      });
      newBadges.push(badge);
    }
  }

  // 2. Trainee Pilot: Complete all Beginner Stream lessons
  const beginnerLessonSlugs = beginnerCurriculum.flatMap(module => 
    module.lessons.map(lesson => lesson.slug)
  );
  
  // Only check if there are actually lessons to complete
  if (beginnerLessonSlugs.length > 0) {
    const hasCompletedBeginner = beginnerLessonSlugs.every(slug => completedLessonSlugs.has(slug));
    if (hasCompletedBeginner) {
      // Award Trainee Pilot (formerly Yellow Belt)
      await awardBadge('trainee-pilot');
    }
  }
  
  // 3. First Flight: Complete at least one lesson
  if (completedLessonSlugs.size >= 1) {
    await awardBadge('first-flight');
  }

  // 3. Blue Belt: Complete Intermediate Stream (Placeholder logic)
  /*
  const intermediateLessonSlugs = intermediateCurriculum.flatMap(module => ...);
  if (intermediateLessonSlugs.length > 0 && intermediateLessonSlugs.every(slug => completedLessonSlugs.has(slug))) {
    await awardBadge('blue-belt');
  }
  */

  return newBadges;
}

export async function getUserBadges(userId: string) {
  return await prisma.userBadge.findMany({
    where: { userId },
    include: { badge: true },
    orderBy: { earnedAt: 'desc' }
  });
}
