// Sample Quiz Data for Module 1, Lesson 1
// This demonstrates the quiz structure that can be used in lessons

export const module1Lesson1Quiz = {
  questions: [
    {
      question: "What is the best analogy for how modern AI works?",
      options: [
        "A magic crystal ball that predicts the future",
        "Pattern recognition at scale - like autocomplete on steroids",
        "A robot that thinks and feels like humans",
        "A database that stores all human knowledge"
      ],
      correctIndex: 1,
      explanation: "AI is essentially sophisticated pattern matching based on training data. It doesn't truly 'think' or 'understand' - it predicts probable outputs based on patterns it has learned."
    },
    {
      question: "Why should you think of AI as a 'brilliant intern' rather than an expert?",
      options: [
        "AI is cheaper than hiring real employees",
        "AI needs context and clear instructions to produce good work",
        "AI can only handle simple tasks",
        "AI makes mistakes on purpose to learn"
      ],
      correctIndex: 1,
      explanation: "Like a smart intern, AI needs clear context, specific instructions, and oversight. It's powerful but requires proper guidance to deliver quality results."
    },
    {
      question: "What is the most important factor in getting quality outputs from AI?",
      options: [
        "Using the most expensive AI tool available",
        "Asking the same question multiple times",
        "The quality of your input and instructions",
        "Having a computer science degree"
      ],
      correctIndex: 2,
      explanation: "Quality output depends directly on quality input. Clear, specific prompts with proper context produce much better results than vague or unclear requests."
    },
    {
      question: "According to POPIA, which of these should NEVER be shared with AI tools?",
      options: [
        "Generic market research data",
        "Personal identification numbers and financial details",
        "Your job title and industry",
        "Publicly available company information"
      ],
      correctIndex: 1,
      explanation: "POPIA (Protection of Personal Information Act) requires responsible handling of personal data. Never share ID numbers, financial details, passwords, or confidential personal information with AI tools."
    },
    {
      question: "In the CRAFT prompt framework, what does the 'R' stand for?",
      options: [
        "Results you expect",
        "Role - who the AI should be",
        "Requirements for the output",
        "Revision instructions"
      ],
      correctIndex: 1,
      explanation: "CRAFT stands for: Context, Role, Action, Format, and Tone. The 'Role' element tells the AI who to act as (e.g., 'Act as an experienced copywriter'), which is often the most powerful part of a prompt."
    }
  ],
  passingScore: 70 // 70% required to pass
};

// Sample Quiz for Module 1, Lesson 4 - The 5-Part Prompt Pattern
export const module1Lesson4Quiz = {
  questions: [
    {
      question: "Which element of the CRAFT framework is described as 'often the most powerful'?",
      options: [
        "Context",
        "Role",
        "Action",
        "Format"
      ],
      correctIndex: 1,
      explanation: "Setting the Role (who the AI should act as) is often the most powerful element because it frames all subsequent outputs in the context of that expertise."
    },
    {
      question: "Why is specifying Format important in your prompts?",
      options: [
        "It makes prompts look more professional",
        "It's required by most AI tools",
        "It prevents getting walls of text and ensures organized output",
        "It saves tokens and reduces costs"
      ],
      correctIndex: 2,
      explanation: "Specifying format ensures you get structured, organized outputs instead of unstructured text. For example, asking for 'a numbered list' or 'a table' gives you easily scannable results."
    },
    {
      question: "If you're writing a follow-up email to webinar attendees, which Tone would be most appropriate?",
      options: [
        "Formal and corporate",
        "Casual and funny",
        "Friendly but professional",
        "Technical and detailed"
      ],
      correctIndex: 2,
      explanation: "For most business follow-ups, 'friendly but professional' strikes the right balance - warm enough to build relationships but professional enough for business context."
    }
  ],
  passingScore: 70
};

// Sample Quiz for Module 2, Lesson 1 - Template Thinking
export const module2Lesson1Quiz = {
  questions: [
    {
      question: "What is the main benefit of converting one-off prompts into reusable templates?",
      options: [
        "Templates look more professional",
        "You can reuse them forever, saving time on repeated tasks",
        "Templates use less AI tokens",
        "They're required for advanced AI features"
      ],
      correctIndex: 1,
      explanation: "The power of templates is reusability. Instead of writing a new prompt each time, you fill in variables and get consistent results instantly."
    },
    {
      question: "In a prompt template, what notation is typically used for variable parts?",
      options: [
        "{{DOUBLE_CURLY_BRACES}}",
        "[SQUARE_BRACKETS]",
        "<angle_brackets>",
        "$DOLLAR_SIGNS"
      ],
      correctIndex: 1,
      explanation: "Using [SQUARE BRACKETS] for variables is a common convention that makes it clear which parts need to be filled in each time you use the template."
    },
    {
      question: "How many times should you test a template before considering it 'done'?",
      options: [
        "Once is enough",
        "2 times",
        "3-4 times",
        "10+ times"
      ],
      correctIndex: 2,
      explanation: "Testing a template 3-4 times helps you catch edge cases and refine it to work consistently across different inputs."
    }
  ],
  passingScore: 70
};

// Export all quizzes
export const quizzes = {
  'mod-1': {
    'les-1-1': module1Lesson1Quiz,
    'les-1-4': module1Lesson4Quiz
  },
  'mod-2': {
    'les-2-1': module2Lesson1Quiz
  }
};

// Helper function to get quiz for a lesson
export function getQuizForLesson(moduleId: string, lessonId: string) {
  return quizzes[moduleId as keyof typeof quizzes]?.[lessonId as keyof typeof quizzes[keyof typeof quizzes]];
}
