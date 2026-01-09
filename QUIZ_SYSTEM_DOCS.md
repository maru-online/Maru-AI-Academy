# Quiz System Documentation

## Overview

The Maru AI Academy quiz system provides interactive, scored assessments for each lesson. Students receive immediate feedback with explanations, can retry quizzes, and earn badges based on performance.

---

## Features

✅ **Multiple Choice Questions** - Support for 2-10 options per question  
✅ **Immediate Feedback** - Shows correct/incorrect with explanations  
✅ **Score Tracking** - Saves quiz scores to database  
✅ **Passing Criteria** - Configurable passing percentage (default: 70%)  
✅ **Retry Functionality** - Students can retake to improve scores  
✅ **Review Mode** - Review all answers after completion  
✅ **Badge Integration** - Triggers "Perfect Landing" badge for 100% scores  
✅ **Progress Tracking** - Quiz scores stored in LessonProgress table

---

## Architecture

### Components

#### `QuizPlayground.tsx`
Main quiz interface component with three states:
- **Taking** - Answer questions one by one
- **Completed** - View score and stats
- **Reviewing** - Review all answers with explanations

#### API Route: `/api/quiz/submit`
- **POST** - Save quiz score to database
- **GET** - Retrieve quiz score for a lesson

#### Data: `/app/data/quizzes.ts`
- Sample quiz data structure
- Helper functions to retrieve quizzes

---

## Adding a Quiz to a Lesson

### Method 1: Using curriculum.ts (Integrated Lessons)

Add quiz data directly in the lesson's `playground` section:

```typescript
{
  id: 'step-quiz',
  title: 'Knowledge Check',
  type: 'challenge',
  instruction: {
    heading: 'Test Your Understanding',
    body: 'Answer these questions to check your knowledge...'
  },
  playground: {
    type: 'quiz',
    quiz: {
      questions: [
        {
          question: 'What is AI best described as?',
          options: [
            'Magic technology',
            'Pattern recognition at scale',
            'Human-like thinking',
            'Database storage'
          ],
          correctIndex: 1,
          explanation: 'AI is essentially sophisticated pattern matching...'
        },
        // Add more questions
      ],
      passingScore: 70 // percentage
    }
  }
}
```

### Method 2: Using Separate Quiz Data File

1. **Add quiz to `/app/data/quizzes.ts`:**

```typescript
export const module3Lesson1Quiz = {
  questions: [
    {
      question: "Your question here?",
      options: [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      correctIndex: 1, // 0-indexed
      explanation: "Explanation of why this answer is correct..."
    }
  ],
  passingScore: 70
};

// Register in quizzes object
export const quizzes = {
  'mod-3': {
    'les-3-1': module3Lesson1Quiz
  }
};
```

2. **Use in lesson component:**

```typescript
import { QuizPlayground } from '@/components/interactive/QuizPlayground';
import { getQuizForLesson } from '@/data/quizzes';

// In your lesson page
const quiz = getQuizForLesson('mod-3', 'les-3-1');

<QuizPlayground
  questions={quiz.questions}
  passingScore={quiz.passingScore}
  moduleSlug="no-code-quick-wins"
  lessonSlug="choosing-tools"
  onComplete={(score, passed) => {
    console.log(`Quiz completed: ${score}% (${passed ? 'PASSED' : 'FAILED'})`);
  }}
/>
```

---

## Quiz Data Structure

### Question Object

```typescript
interface QuizQuestion {
  question: string;           // The question text
  options: string[];          // Array of answer choices (2-10 options)
  correctIndex: number;       // Index of correct answer (0-based)
  explanation: string;        // Explanation shown after answering
}
```

### Quiz Config

```typescript
interface Quiz {
  questions: QuizQuestion[];
  passingScore: number;       // Percentage required to pass (e.g., 70)
}
```

---

## Best Practices

### Question Writing

1. **Be Clear and Specific**
   - Avoid ambiguous wording
   - One clear correct answer
   - Plausible distractors (wrong answers)

2. **Match Content**
   - Questions should test lesson objectives
   - Reference real examples from the lesson

3. **Write Good Explanations**
   - Explain WHY the answer is correct
   - Reference lesson concepts
   - Keep explanations concise (2-3 sentences)

### Quiz Design

- **3-5 questions per lesson** - Enough to assess but not overwhelming
- **70% passing score** - Industry standard for knowledge checks
- **Mix difficulty** - Include easy, medium, and challenging questions
- **Avoid tricks** - Test understanding, not memory or tricks

### Example: Good vs Bad Question

❌ **Bad:**
```
Question: "What did we learn in this lesson?"
Options: ["A lot", "Some things", "AI stuff", "Everything"]
```

✅ **Good:**
```
Question: "According to POPIA, which data should never be shared with AI tools?"
Options: [
  "Public company information",
  "Personal ID numbers and financial data",
  "Your job title",
  "Industry trends"
]
Explanation: "POPIA requires protecting personal information. ID numbers,
financial details, and passwords should never be input into AI tools."
```

---

## Badge Integration

### Perfect Landing Badge

Awarded when a student achieves 100% on all quizzes in a module.

The badge check runs automatically after each quiz submission in `/api/quiz/submit`:

```typescript
const newBadges = await checkBadgeEligibility(user.id);
```

The logic in `/app/lib/badges.ts`:

```typescript
// Check for Perfect Landing badge (100% on all quizzes in a module)
const moduleScores = lessonProgress.reduce((acc, lesson) => {
  if (lesson.score !== null) {
    if (!acc[lesson.moduleSlug]) {
      acc[lesson.moduleSlug] = [];
    }
    acc[lesson.moduleSlug].push(lesson.score);
  }
  return acc;
}, {} as Record<string, number[]>);

for (const [moduleSlug, scores] of Object.entries(moduleScores)) {
  if (scores.length > 0 && scores.every(score => score === 100)) {
    await awardBadge('perfect-landing');
    break;
  }
}
```

---

## Database Schema

Quiz scores are stored in the `LessonProgress` table:

```prisma
model LessonProgress {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(...)
  moduleSlug  String
  lessonSlug  String
  completed   Boolean   @default(false)
  completedAt DateTime?
  timeSpent   Int       @default(0)
  score       Int?      // Quiz score percentage (0-100)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([userId, moduleSlug, lessonSlug])
}
```

---

## API Endpoints

### POST `/api/quiz/submit`

**Request:**
```json
{
  "moduleSlug": "ai-made-simple",
  "lessonSlug": "what-is-ai",
  "score": 80,
  "questionsTotal": 5,
  "questionsCorrect": 4
}
```

**Response:**
```json
{
  "success": true,
  "score": 80,
  "passed": true,
  "newBadges": [
    {
      "slug": "perfect-landing",
      "name": "Perfect Landing",
      "description": "Achieved 100% on all quizzes in a module"
    }
  ]
}
```

### GET `/api/quiz/submit?moduleSlug=X&lessonSlug=Y`

**Response:**
```json
{
  "score": 80,
  "completed": true
}
```

---

## Testing Checklist

Before deploying a quiz:

- [ ] All questions have 2+ options
- [ ] `correctIndex` points to valid option (0-based)
- [ ] Explanations are clear and helpful
- [ ] Passing score is set (usually 70%)
- [ ] moduleSlug and lessonSlug match curriculum
- [ ] Test quiz submission to database
- [ ] Verify retry functionality works
- [ ] Check review mode displays correctly
- [ ] Test badge awarding logic

---

## Future Enhancements

Potential improvements for the quiz system:

- [ ] Question bank with random selection
- [ ] True/False questions
- [ ] Fill-in-the-blank questions
- [ ] Time limits per quiz
- [ ] Question explanations with video
- [ ] Export quiz results as PDF
- [ ] Admin quiz editor interface
- [ ] Question difficulty ratings
- [ ] Adaptive quizzes (difficulty adjusts)
- [ ] Peer comparison stats

---

## Usage Example (Full Integration)

```typescript
// In a lesson page component
'use client';

import { QuizPlayground } from '@/components/interactive/QuizPlayground';
import { useState } from 'react';

export default function LessonPage() {
  const [quizComplete, setQuizComplete] = useState(false);
  
  const handleQuizComplete = async (score: number, passed: boolean) => {
    console.log(`Quiz completed with ${score}%`);
    setQuizComplete(true);
    
    if (passed) {
      // Mark lesson as complete
      // Show congratulations
      // Unlock next lesson
    }
  };

  return (
    <QuizPlayground
      questions={[
        {
          question: "What is the CRAFT framework?",
          options: [
            "A woodworking technique",
            "Context, Role, Action, Format, Tone",
            "A creative writing method",
            "A project management tool"
          ],
          correctIndex: 1,
          explanation: "CRAFT is a 5-part prompt pattern: Context, Role, Action, Format, and Tone."
        }
      ]}
      passingScore={70}
      moduleSlug="ai-made-simple"
      lessonSlug="five-part-prompt"
      onComplete={handleQuizComplete}
    />
  );
}
```

---

**Status**: Quiz system ready for production use  
**Version**: 1.0  
**Last Updated**: January 9, 2026
