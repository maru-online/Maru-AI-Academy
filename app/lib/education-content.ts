/**
 * Education-Focused Conversation Starters
 * For Maru AI Academy Learning Assistant
 */

export const EDUCATION_GREETING = `👋 Hi! I'm your Maru AI Learning Assistant.

I'm here to help you **understand** the concepts in your AI courses – not do your work for you!

**I can help with:**
✓ Explaining lesson concepts
✓ Clarifying terminology  
✓ Breaking down the CRAFT framework
✓ Understanding how AI tools work
✓ Finding relevant lessons

**I can't help with:**
✗ Completing your assignments
✗ Writing your capstone project
✗ Giving quiz answers
✗ Doing research for you

Ask me about any concept you're struggling with!`;

export const EDUCATION_CONVERSATION_STARTERS = [
  { 
    icon: '🤔', 
    text: 'Explain a concept',
    query: 'Can you explain what the CRAFT framework is and how to use it?' 
  },
  { 
    icon: '🎯', 
    text: 'Help with prompts',
    query: 'I\'m struggling to write good prompts. What makes a prompt effective?' 
  },
  { 
    icon: '📚', 
    text: 'Find a lesson',
    query: 'Which lesson covers no-code automation basics?' 
  },
  { 
    icon: '💡', 
    text: 'Study tips',
    query: 'What\'s the best way to practice prompt engineering?' 
  },
];

export const BOUNDARY_REMINDERS = {
  doingWork: "I can't complete this for you, but I can help you understand how to approach it! Let me guide you through the concepts...",
  offTopic: "That's outside our course scope. Let's focus on AI and prompt engineering concepts from your lessons.",
  quizAnswers: "I can't give you direct quiz answers, but I can explain the concepts so you can figure it out yourself!",
  assignments: "This looks like an assignment question. Instead of giving you the answer, let me help you understand the concept so you can complete it yourself.",
};
