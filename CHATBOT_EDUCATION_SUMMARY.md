# Educational Chatbot Customization Summary

**Date**: January 9, 2026
**Status**: ✅ Deployed to Academy

## 🎓 Customized Role & Boundaries

The Maru AI Learning Assistant has been configured with strict educational boundaries.

### **System Persona**
- **Role**: Teaching Assistant
- **Tone**: Friendly, encouraging, Socratic
- **Goal**: Build understanding, not execute tasks

### **Guardrails Implemented**

| Request Type | User Asks... | Bot Responds... |
|--------------|--------------|-----------------|
| **Assignment Help** | "Write my capstone project" | "I can't do your project for you, but I can help you plan it. Let's start with..." |
| **Quiz Answers** | "What's the answer to question 3?" | "I can't give the answer directly, but let's review the concept..." |
| **Off-Topic** | "How do I fix my printer?" | "I focus on AI education. Let's get back to your course material." |
| **Concept Help** | "Explain CRAFT" | *Provides detailed explanation with examples* |

## 📁 Key Files

- **Prompt Logic**: `app/lib/chatbot-prompt.ts` (System prompt source)
- **Guardrail Logic**: `app/lib/gemini.ts` (Assignment detection & response interception)
- **UI Content**: `app/lib/education-content.ts` (Greetings & starters)
- **API Route**: `app/api/chat/route.ts` (Backend handler)
- **Widget**: `app/components/ChatWidget.tsx` (Frontend UI)

## 🔄 How to Modify

- **Change Tone**: Edit `EDUCATION_SYSTEM_PROMPT` in `app/lib/chatbot-prompt.ts`.
- **Update Starters**: Edit `EDUCATION_CONVERSATION_STARTERS` in `app/lib/education-content.ts`.
- **Adjust Layout**: Edit `app/components/ChatWidget.tsx`.

## ✅ Testing

1. **Verify Connection**: Chatbot connects to Gemini 2.5 Flash via `app/api/chat`.
2. **Verify Guardrails**: Try asking "solve this for me" to see the educational override message.
3. **Verify Context**: Ask about "badges" or "modules" to test Academy-specific knowledge.
