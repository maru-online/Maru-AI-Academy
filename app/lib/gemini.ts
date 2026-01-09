/**
 * Gemini AI Integration for Maru AI Academy
 * Educational chatbot with appropriate guardrails
 */

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Generate AI response using Gemini 2.5 Flash
 */
export async function generateResponse(
  messages: Message[],
  systemPrompt: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  try {
    // Build the conversation history
    const contents = messages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Prepend system instructions as first user message
    contents.unshift({
      role: 'user',
      parts: [{ text: systemPrompt }],
    });

    // Add a model acknowledgment of the system prompt
    contents.splice(1, 0, {
      role: 'model',
      parts: [{ text: 'Understood. I will act as the Maru AI Learning Assistant with these guidelines.' }],
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7, // Balanced creativity and consistency
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024, // Limit response length
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API Error:', error);
      throw new Error(`Gemini API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No response generated from Gemini');
    }

    return generatedText;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

/**
 * Check if a message appears to be asking for assignment help
 */
export function isAskingForAssignmentHelp(message: string): boolean {
  const assignmentKeywords = [
    'do my',
    'complete my',
    'write my',
    'finish my',
    'solve this for me',
    'build this for me',
    'create this for me',
    'can you do',
    'can you write',
    'can you build',
    'homework',
    'assignment',
    'project for me',
  ];

  const lowerMessage = message.toLowerCase();
  return assignmentKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Check if a message is requesting quiz answers
 */
export function isAskingForQuizAnswers(message: string): boolean {
  const quizKeywords = [
    'quiz answer',
    'test answer',
    'correct answer',
    'what is the answer',
    'which option is correct',
    'tell me the answer to',
  ];

  const lowerMessage = message.toLowerCase();
  return quizKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Add educational guardrails to response
 */
export function addEducationalGuardrails(userMessage: string, aiResponse: string): string {
  // Check if student is trying to get assignment done
  if (isAskingForAssignmentHelp(userMessage)) {
    return `⚠️ **Learning Reminder**: I can't complete assignments for you, but I'm happy to help you understand the concepts!

${aiResponse}

Remember: The goal is to learn and build your own skills. You've got this! 💪`;
  }

  // Check if asking for quiz answers
  if (isAskingForQuizAnswers(userMessage)) {
    return `📚 **Study Tip**: I can't give direct quiz answers, but I can help you understand the material!

${aiResponse}

Once you understand the concept, the quiz will make much more sense. Want me to explain anything else?`;
  }

  return aiResponse;
}
