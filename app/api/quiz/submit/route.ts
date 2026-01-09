import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkBadgeEligibility } from '@/lib/badges';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { moduleSlug, lessonSlug, score, questionsTotal, questionsCorrect } = body;

    if (!moduleSlug || !lessonSlug || typeof score !== 'number') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update or create lesson progress with quiz score
    const lessonProgress = await prisma.lessonProgress.upsert({
      where: {
        userId_moduleSlug_lessonSlug: {
          userId: user.id,
          moduleSlug,
          lessonSlug
        }
      },
      update: {
        score,
        updatedAt: new Date()
      },
      create: {
        userId: user.id,
        moduleSlug,
        lessonSlug,
        score,
        completed: false // Will be marked complete after lesson ends
      }
    });

    // Check if user earned any badges (Perfect Landing, etc.)
    const newBadges = await checkBadgeEligibility(user.id);

    return NextResponse.json({
      success: true,
      lessonProgress,
      score,
      passed: score >= 70, // Configurable passing score
      newBadges: newBadges.map(badge => ({
        slug: badge.slug,
        name: badge.name,
        description: badge.description
      }))
    });

  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json(
      { error: 'Failed to save quiz score' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve quiz scores for a user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const moduleSlug = searchParams.get('moduleSlug');
    const lessonSlug = searchParams.get('lessonSlug');

    if (!moduleSlug || !lessonSlug) {
      return NextResponse.json(
        { error: 'Missing moduleSlug or lessonSlug' },
        { status: 400 }
      );
    }

    const lessonProgress = await prisma.lessonProgress.findUnique({
      where: {
        userId_moduleSlug_lessonSlug: {
          userId: user.id,
          moduleSlug,
          lessonSlug
        }
      }
    });

    return NextResponse.json({
      score: lessonProgress?.score || null,
      completed: lessonProgress?.completed || false
    });

  } catch (error) {
    console.error('Quiz score retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve quiz score' },
      { status: 500 }
    );
  }
}
