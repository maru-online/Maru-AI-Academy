# Aviator System - Badge & Achievement Implementation

**Created**: January 9, 2026  
**Status**: In Progress  
**Theme**: Aviation/Sky - Aligns with Maru's cloud/atmospheric branding

---

## 🎯 Overview

The **Aviator System** replaces the traditional karate belt progression with an aviation-themed gamification system. Students progress from **Ground Crew** to **Sky Captain** as they master AI skills, earning achievement badges along the way.

This system perfectly complements Maru's brand identity:
- **Maru** = "circle" or "round" (often sky/cloud-related)
- **AtmosphericBackground** components
- **Cloud Wireframe** visuals
- Sky/flight metaphor for learning journey

---

## 🛫 Main Progression Badges (5 Levels)

### Level 1: Ground Crew 🎧
**Trigger**: Complete onboarding and profile setup  
**Description**: "Completed onboarding and setup. Ready for takeoff into the world of AI!"  
**Color**: Gray (#4B5563)  
**Metaphor**: Support staff preparing for flight

### Level 2: Trainee Pilot ✈️
**Trigger**: Complete all 4 modules in Beginner Stream  
**Description**: "Mastered the controls! Completed the Beginner Stream and learned AI fundamentals and basic prompt engineering."  
**Color**: Blue (#3B82F6)  
**Metaphor**: Learning the basics, first solo flights

### Level 3: Solo Aviator 🛩️
**Trigger**: Complete all 4 modules in Intermediate Stream  
**Description**: "Flying independently! Completed the Intermediate Stream and built advanced AI workflows."  
**Color**: Cyan (#06B6D4)  
**Metaphor**: Independent operator, skilled pilot

### Level 4: Wing Commander 🚁
**Trigger**: Complete Advanced Stream (when available)  
**Description**: "Leading the squadron! Mastered complex systems and can orchestrate enterprise-scale AI implementations."  
**Color**: Purple (#9333EA)  
**Metaphor**: Squad leader, tactical expertise

### Level 5: Sky Captain 🛫
**Trigger**: Complete all streams + special requirements  
**Description**: "Reached the pinnacle! Full mastery of AI governance, strategy, and leadership."  
**Color**: Gold gradient (#FBBF24 → #F97316)  
**Metaphor**: Master of the skies, complete mastery

---

## 🏆 Achievement Badges (Bonus Accomplishments)

### First Flight 🎈
**Trigger**: Complete your first lesson  
**Description**: "Completed your first lesson. Welcome aboard!"  
**Color**: Green (#4ADE80)  
**Purpose**: Instant gratification for new students

### Turbulence Tamer ⚡
**Trigger**: Successfully debug/fix 10+ AI prompts or workflows  
**Description**: "Successfully debugged and fixed 10 AI prompts or workflows."  
**Color**: Orange (#F97316)  
**Purpose**: Reward problem-solving skills
**Status**: TODO - Add debugging tracker

### Mach 1 🚀
**Trigger**: Complete a module in record time with 100% quiz scores  
**Description**: "Completed a module in record time with 100% quiz scores."  
**Color**: Red (#EF4444)  
**Purpose**: Reward speed and excellence
**Status**: TODO - Define "record time" benchmarks

### Night Flyer 🌙
**Trigger**: Complete 5+ lessons between 10 PM - 6 AM  
**Description**: "Completed 5 lessons or more between 10 PM and 6 AM. Dedication!"  
**Color**: Indigo (#4F46E5)  
**Purpose**: Acknowledge dedicated learners
**Status**: IMPLEMENTED

### Streak Master 🔥
**Trigger**: Maintain a 7-day learning streak  
**Description**: "Maintained a 7-day learning streak. Consistency is key!"  
**Color**: Pink (#EC4899)  
**Purpose**: Encourage daily engagement
**Status**: TODO - Add streak tracking

### Perfect Landing 🎯
**Trigger**: Achieve 100% on all quizzes in a module  
**Description**: "Achieved 100% on all quizzes in a module."  
**Color**: Emerald (#10B981)  
**Purpose**: Reward mastery and attention to detail
**Status**: IMPLEMENTED

---

## 📊 Implementation Status

### ✅ Completed
- [x] Badge schema in Prisma (already existed)
- [x] Seed file updated (`prisma/seed-badges.js`)
- [x] Badge eligibility logic updated (`app/lib/badges.ts`)
- [x] UI component updated (`app/dashboard/components/BadgeShowcase.tsx`)
- [x] First Flight badge logic
- [x] Night Flyer badge logic
- [x] Perfect Landing badge logic
- [x] Trainee Pilot badge logic

### 🚧 In Progress
- [ ] Seed badges into database
- [ ] Generate badge images/icons
- [ ] Test badge awarding system

### 📝 TODO
- [ ] Turbulence Tamer tracking system
- [ ] Mach 1 time benchmark definition
- [ ] Streak Master tracking system
- [ ] Ground Crew badge auto-award on signup
- [ ] Solo Aviator logic (when Intermediate curriculum ready)
- [ ] Wing Commander logic (when Advanced curriculum ready)
- [ ] Sky Captain special requirements definition
- [ ] Badge notification system (popup/toast)
- [ ] Social sharing for badges
- [ ] Badge display on certificates

---

## 🎨 Badge Image Design Specifications

### Design Style
- **Format**: PNG with transparency
- **Size**: 256x256px (@2x), 512x512px (@3x)
- **Style**: Flat design with subtle shadows
- **Colors**: Match the badge color scheme
- **Elements**: 
  - Aviation-themed iconography
  - Maru Turquoise accent (#3DD6D0)
  - Cloud/sky elements
  - Professional, modern aesthetic

### Suggested AI Prompt for Badge Generation
```
Create a professional badge icon for [BADGE_NAME] in a flat design style.
Theme: Aviation/aerospace.
Include: [SPECIFIC ICON] with clouds, subtle shadows, and circular badge shape.
Colors: Primary [COLOR], accent Maru Turquoise (#3DD6D0).
Style: Modern, clean, premium feel.
Size: 512x512px PNG with transparency.
```

### Badge Image Files Needed
```
/public/badges/
  ├── ground-crew.png
  ├── trainee-pilot.png
  ├── solo-aviator.png
  ├── wing-commander.png
  ├── sky-captain.png
  ├── first-flight.png
  ├── turbulence-tamer.png
  ├── mach-one.png
  ├── night-flyer.png
  ├── streak-master.png
  └── perfect-landing.png
```

---

## 🗄️ Database Schema

The existing Prisma schema already supports the badge system:

```prisma
model Badge {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String
  imageUrl    String
  users       UserBadge[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model UserBadge {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  badgeId   String
  badge     Badge    @relation(fields: [badgeId], references: [id])
  earnedAt  DateTime @default(now())
  
  @@unique([userId, badgeId])
}
```

**No schema changes required!** ✅

---

## 🔄 Badge Awarding Logic

### Automatic Checks
Badges are automatically checked and awarded when:
1. User completes a lesson (`checkBadgeEligibility()` called)
2. User completes a module
3. User passes a quiz
4. User logs in (for streak tracking - TODO)

### Manual Award (Admin)
Admins can manually award badges through:
- Direct database insert
- Admin API endpoint (TODO)
- Admin dashboard (TODO)

---

## 📈 Gamification Strategy

### Why Aviation Theme Works

1. **Brand Alignment**: Perfect fit with Maru's cloud/sky aesthetic
2. **Clear Progression**: Easy to understand hierarchy (ground → sky)
3. **Universal Appeal**: Aviation imagery is inspiring and aspirational
4. **Metaphor Strength**: Learning = taking flight, mastery = commanding the skies
5. **Visual Opportunities**: Rich iconography (planes, clouds, wings, altitude)

### Engagement Hooks

- **Immediate Reward**: First Flight badge on lesson 1
- **Public Display**: Badge showcase on dashboard
- **Social Proof**: Share badges on social media (future)
- **Progress Visibility**: x/11 badges unlocked counter
- **Rarity**: Higher-tier badges are rare and prestigious
- **Discovery**: Achievement badges surprise and delight

---

## 🚀 Next Steps (Priority Order)

1. **Seed Database**: Run `node prisma/seed-badges.js`
2. **Generate Images**: Create 11 badge PNG files
3. **Test Awards**: Complete a lesson and verify badge appears
4. **Add Notifications**: Toast popup when badge is earned
5. **Implement Missing Trackers**: 
   - Debugging counter for Turbulence Tamer
   - Time tracking for Mach 1
   - Streak system for Streak Master
6. **Admin Features**: Manual award capability
7. **Certificate Integration**: Display earned badges on certificates
8. **Social Sharing**: OpenGraph images for badge sharing

---

## 📝 Messaging & Copy

### Dashboard Header
"Your Flight Progress: [X]/11 Badges Earned"

### First Badge Notification
"🎈 Congratulations! You've earned your first badge: **First Flight**. You're on your way to becoming a Sky Captain!"

### Progression Notification
"✈️ Badge Unlocked: **Trainee Pilot**! You've mastered the fundamentals. Time to take your skills to new heights!"

### Empty State
"Start your journey to earn badges and track your progress. Complete lessons, ace quizzes, and unlock achievements!"

---

## 🎯 Success Metrics

### Track These KPIs
- **Badge distribution**: How many users earn each badge?
- **Time to first badge**: Average time to earn First Flight
- **Completion rates**: Do badges increase module completion?
- **Engagement**: Users with badges vs. without badges activity
- **Rarity**: Which badges are the hardest to earn?

### Expected Outcomes
- **↑ 25% lesson completion rate** with gamification
- **↑ 40% user return rate** for daily streaks
- **↑ 15% quiz scores** with Perfect Landing motivation
- **↑ Social sharing** of achievements

---

**Status**: System designed and core logic implemented  
**Next**: Generate badge images and seed database  
**Timeline**: 2-3 hours to complete initial implementation

---

*"The sky is not the limit—it's just the beginning."*
