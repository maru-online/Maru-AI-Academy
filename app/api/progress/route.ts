import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { lessonId, moduleId, completed } = await request.json()

    if (!lessonId || !moduleId) {
      return NextResponse.json({ error: 'Missing required fields: lessonId, moduleId' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Upsert progress record
    // Using userId_lessonId composite key
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId
        }
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
        // Ensure moduleId is set in case it was missing
        moduleId 
      },
      create: {
        userId: user.id,
        lessonId,
        moduleId,
        completed,
        completedAt: completed ? new Date() : null,
      }
    })

    return NextResponse.json(progress)
    
  } catch (error: any) {
    console.error('Progress update error:', error)
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    )
  }
}
