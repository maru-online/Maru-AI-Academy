import { NextRequest, NextResponse } from 'next/server';
import { generateResponse } from '@/lib/chatbot/gemini';
import SYSTEM_PROMPT from '@/lib/chatbot/prompt';

// Demo responses when API key is not configured
const DEMO_RESPONSES: Record<string, string> = {
  default: "Thanks for trying the Maru AI Academy Chatbot! This is a demo response. To get real AI-powered responses, please add your GEMINI_API_KEY. You can explore our courses at /modules or contact us at hello@maruonline.com.",
  beginner: "Our Beginner Stream is perfect for getting started with AI! It covers AI fundamentals, prompt engineering, no-code tools, and building your first workflow. Best of all, it's free! Would you like to start learning?",
  pro: "The Pro plan unlocks our Intermediate Stream with advanced topics like semantic search, RAG, governance, and team-scale automation. You also get priority support and professional certificates. Want to learn more about pricing?",
  pricing: "We offer three plans: Starter (Free) for the Beginner Stream, Pro for full access to all modules, and Team for organizations. The Beginner Stream is completely free - you can start learning right away!",
  certificate: "Yes! You earn a certificate after completing each module. Pro members receive enhanced professional certificates that you can share on LinkedIn. Would you like to start your learning journey?",
};

function getDemoResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  if (msg.includes('beginner') || msg.includes('start') || msg.includes('new')) return DEMO_RESPONSES.beginner;
  if (msg.includes('pro') || msg.includes('advanced') || msg.includes('intermediate')) return DEMO_RESPONSES.pro;
  if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing') || msg.includes('free')) return DEMO_RESPONSES.pricing;
  if (msg.includes('certificate') || msg.includes('credential')) return DEMO_RESPONSES.certificate;
  return DEMO_RESPONSES.default;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    let response: string;

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      // Demo mode - use pre-defined responses
      const lastMessage = messages[messages.length - 1];
      response = getDemoResponse(lastMessage.content);
      console.log('⚠️  Running in DEMO mode - GEMINI_API_KEY not set');
    } else {
      // Generate response using Gemini AI
      response = await generateResponse(messages, SYSTEM_PROMPT);
    }

    return NextResponse.json({ 
      response,
      success: true 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
