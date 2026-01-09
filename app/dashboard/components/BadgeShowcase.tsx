'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Award } from 'lucide-react';

interface Badge {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  users?: any[]; // In a real app, this would be typed
}

interface UserBadge {
  id: string;
  badge: Badge;
  earnedAt: Date | string;
}

interface BadgeShowcaseProps {
  userBadges: UserBadge[];
}

const ALL_BADGES = [
  // Main Progression Badges
  {
    slug: 'ground-crew',
    name: 'Ground Crew',
    description: 'Completed onboarding and setup. Ready for takeoff!',
    color: 'bg-gray-600',
    borderColor: 'border-gray-700',
    icon: '🎧' // Headset for ground crew
  },
  {
    slug: 'trainee-pilot',
    name: 'Trainee Pilot',
    description: 'Mastered the controls! Completed the Beginner Stream.',
    color: 'bg-blue-500',
    borderColor: 'border-blue-600',
    icon: '✈️'
  },
  {
    slug: 'solo-aviator',
    name: 'Solo Aviator',
    description: 'Flying independently! Completed the Intermediate Stream.',
    color: 'bg-cyan-500',
    borderColor: 'border-cyan-600',
    icon: '🛩️'
  },
  {
    slug: 'wing-commander',
    name: 'Wing Commander',
    description: 'Leading the squadron! Enterprise-scale mastery.',
    color: 'bg-purple-600',
    borderColor: 'border-purple-700',
    icon: '🚁'
  },
  {
    slug: 'sky-captain',
    name: 'Sky Captain',
    description: 'Reached the pinnacle! Full mastery achieved.',
    color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    borderColor: 'border-yellow-500',
    icon: '🛫'
  },
  
  // Achievement Badges
  {
    slug: 'first-flight',
    name: 'First Flight',
    description: 'Completed your first lesson. Welcome aboard!',
    color: 'bg-green-400',
    borderColor: 'border-green-500',
    icon: '🎈'
  },
  {
    slug: 'turbulence-tamer',
    name: 'Turbulence Tamer',
    description: 'Successfully debugged 10+ AI prompts.',
    color: 'bg-orange-500',
    borderColor: 'border-orange-600',
    icon: '⚡'
  },
  {
    slug: 'mach-one',
    name: 'Mach 1',
    description: 'Completed a module in record time with perfect scores.',
    color: 'bg-red-500',
    borderColor: 'border-red-600',
    icon: '🚀'
  },
  {
    slug: 'night-flyer',
    name: 'Night Flyer',
    description: 'Completed 5+ lessons between 10 PM - 6 AM.',
    color: 'bg-indigo-600',
    borderColor: 'border-indigo-700',
    icon: '🌙'
  },
  {
    slug: 'streak-master',
    name: 'Streak Master',
    description: 'Maintained a 7-day learning streak.',
    color: 'bg-pink-500',
    borderColor: 'border-pink-600',
    icon: '🔥'
  },
  {
    slug: 'perfect-landing',
    name: 'Perfect Landing',
    description: 'Achieved 100% on all quizzes in a module.',
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-600',
    icon: '🎯'
  }
];

export function BadgeShowcase({ userBadges }: BadgeShowcaseProps) {
  const earnedSlugs = new Set(userBadges.map(ub => ub.badge.slug));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Award className="w-5 h-5 text-primary-600" />
          My Badges
        </h2>
        <span className="text-sm text-gray-500">
          {userBadges.length} / {ALL_BADGES.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ALL_BADGES.map((badge) => {
          const isUnlocked = earnedSlugs.has(badge.slug);
          const userBadge = userBadges.find(ub => ub.badge.slug === badge.slug);

          return (
            <div
              key={badge.slug}
              className={`relative rounded-xl border-2 p-4 transition-all ${
                isUnlocked
                  ? `${badge.borderColor} bg-opacity-5`
                  : 'border-gray-200 bg-gray-50 opacity-70'
              }`}
            >
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100/50 backdrop-blur-[1px] rounded-xl">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 shadow-lg ${
                    isUnlocked ? badge.color : 'bg-gray-200 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>
                
                <h3 className="font-bold text-gray-900 mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                  {badge.description}
                </p>
                
                {isUnlocked ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Earned {new Date(userBadge?.earnedAt || '').toLocaleDateString()}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                    Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
