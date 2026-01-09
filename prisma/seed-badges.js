
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const badges = [
    // AVIATOR SYSTEM - Main Progression Badges
    {
      slug: 'ground-crew',
      name: 'Ground Crew',
      description: 'Completed onboarding and setup. Ready for takeoff into the world of AI!',
      imageUrl: '/badges/ground-crew.png'
    },
    {
      slug: 'trainee-pilot',
      name: 'Trainee Pilot',
      description: 'Mastered the controls! Completed the Beginner Stream and learned AI fundamentals and basic prompt engineering.',
      imageUrl: '/badges/trainee-pilot.png'
    },
    {
      slug: 'solo-aviator',
      name: 'Solo Aviator',
      description: 'Flying independently! Completed the Intermediate Stream and built advanced AI workflows.',
      imageUrl: '/badges/solo-aviator.png'
    },
    {
      slug: 'wing-commander',
      name: 'Wing Commander',
      description: 'Leading the squadron! Mastered complex systems and can orchestrate enterprise-scale AI implementations.',
      imageUrl: '/badges/wing-commander.png'
    },
    {
      slug: 'sky-captain',
      name: 'Sky Captain',
      description: 'Reached the pinnacle! Full mastery of AI governance, strategy, and leadership.',
      imageUrl: '/badges/sky-captain.png'
    },

    // ACHIEVEMENT BADGES - Special Accomplishments
    {
      slug: 'first-flight',
      name: 'First Flight',
      description: 'Completed your first lesson. Welcome aboard!',
      imageUrl: '/badges/first-flight.png'
    },
    {
      slug: 'turbulence-tamer',
      name: 'Turbulence Tamer',
      description: 'Successfully debugged and fixed 10 AI prompts or workflows.',
      imageUrl: '/badges/turbulence-tamer.png'
    },
    {
      slug: 'mach-one',
      name: 'Mach 1',
      description: 'Completed a module in record time with 100% quiz scores.',
      imageUrl: '/badges/mach-one.png'
    },
    {
      slug: 'night-flyer',
      name: 'Night Flyer',
      description: 'Completed 5 lessons or more between 10 PM and 6 AM. Dedication!',
      imageUrl: '/badges/night-flyer.png'
    },
    {
      slug: 'streak-master',
      name: 'Streak Master',
      description: 'Maintained a 7-day learning streak. Consistency is key!',
      imageUrl: '/badges/streak-master.png'
    },
    {
      slug: 'perfect-landing',
      name: 'Perfect Landing',
      description: 'Achieved 100% on all quizzes in a module.',
      imageUrl: '/badges/perfect-landing.png'
    }
  ]

  console.log('🌱 Seeding badges...')

  for (const badge of badges) {
    const upsertedBadge = await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: badge,
      create: badge,
    })
    console.log(`Created badge: ${upsertedBadge.name}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
