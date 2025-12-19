import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';

// Debug logging function
function debugLog(message: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage.trim());
  try {
    fs.appendFileSync('/tmp/gemini-debug.log', logMessage);
  } catch (e) {
    // Ignore file write errors
  }
}

// Only initialize if API key is present
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (process.env.GEMINI_API_KEY) {
  try {
    debugLog(`Initializing with key: ${process.env.GEMINI_API_KEY.substring(0, 20)}...`);
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Use Gemini 2.5 Flash - latest stable model
    model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });
    
    debugLog('✅ Gemini AI initialized successfully with model: gemini-2.5-flash');
  } catch (error) {
    debugLog(`❌ Failed to initialize Gemini: ${error}`);
  }
} else {
  debugLog('⚠️  GEMINI_API_KEY not found - running in demo mode');
}

export { model };

/**
 * Generate a response from the Gemini API
 */
export async function generateResponse(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  systemPrompt: string
): Promise<string> {
  if (!model) {
    debugLog('ERROR: model is null');
    throw new Error('Gemini model not initialized. Please set GEMINI_API_KEY.');
  }

  try {
    debugLog(`Generating response for: ${messages[messages.length - 1].content}`);
    
    // Prepend system prompt as the first message in history instead of using systemInstruction
    const systemMessage = {
      role: 'user' as const,
      parts: [{ text: `System instructions: ${systemPrompt}\n\nPlease follow these instructions in all your responses.` }],
    };
    
    const systemResponse = {
      role: 'model' as const,
      parts: [{ text: 'Understood. I will follow these instructions.' }],
    };
    
    const history = [
      systemMessage,
      systemResponse,
      ...messages.slice(0, -1).map((msg) => ({
        role: msg.role === 'assistant' ? ('model' as const) : ('user' as const),
        parts: [{ text: msg.content }],
      }))
    ];
    
    const chat = model.startChat({
      history,
    });

    const lastMessage = messages[messages.length - 1];
    debugLog('Sending message to Gemini API...');
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;
    const text = response.text();
    
    debugLog(`✅ Got response: ${text.substring(0, 50)}...`);
    return text;
  } catch (error) {
    debugLog(`❌ Error generating response: ${error}`);
    // Log more details for debugging
    if (error instanceof Error) {
      debugLog(`Error message: ${error.message}`);
      debugLog(`Error stack: ${error.stack}`);
    }
    if (typeof error === 'object' && error !== null) {
      debugLog(`Error object: ${JSON.stringify(error, null, 2)}`);
    }
    throw new Error('Failed to generate response from AI');
  }
}
