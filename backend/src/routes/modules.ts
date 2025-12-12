import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Fallback Mock Data
const MOCK_MODULES = [
  { 
    id: "b-m1", 
    title: "AI Made Simple", 
    stream: "BEGINNER", 
    description: "Foundations & Safety. Understand what AI is, how it works, and how to use it securely in your workplace.", 
    slug: "ai-made-simple", 
    order: 1, 
    icon: 'bulb', 
    duration: '2 hours',
    lessonsCount: 5
  },
  { 
    id: "b-m2", 
    title: "Prompts That Work at Work", 
    stream: "BEGINNER", 
    description: "Master the art of prompting. Learn techniques to get consistent, high-quality results from AI models.", 
    slug: "prompts-that-work", 
    order: 2, 
    icon: 'message', 
    duration: '2.5 hours',
    lessonsCount: 6 
  },
  { 
    id: "b-m3", 
    title: "Picking Tools & No-Code Quick Wins", 
    stream: "BEGINNER", 
    description: "Navigate the AI tool landscape and build simple automations without writing any code.", 
    slug: "no-code-quick-wins", 
    order: 3, 
    icon: 'tool', 
    duration: '3 hours',
    lessonsCount: 4 
  },
  { 
    id: "b-m4", 
    title: "Your First Live Workflow", 
    stream: "BEGINNER", 
    description: "Capstone Project. Build and deploy a real-world AI workflow that solves a specific business problem.", 
    slug: "first-live-workflow", 
    order: 4, 
    icon: 'rocket', 
    duration: '4 hours',
    lessonsCount: 3 
  },
  { 
    id: "i-m1", 
    title: "From Ad-Hoc to Repeatable", 
    stream: "INTERMEDIATE", 
    description: "Transform one-off success into reliable systems. Standardize your prompts and workflows.", 
    slug: "ad-hoc-to-repeatable", 
    order: 1, 
    icon: 'repeat', 
    duration: '3 hours',
    lessonsCount: 5 
  },
  { 
    id: "i-m2", 
    title: "Semantic Search & Private Knowledge", 
    stream: "INTERMEDIATE", 
    description: "Unlock your company data. Learn about RAG, vector databases, and chatting with your documents.", 
    slug: "semantic-search-private-knowledge", 
    order: 2, 
    icon: 'search', 
    duration: '3.5 hours',
    lessonsCount: 6 
  },
  { 
    id: "i-m3", 
    title: "No-Code Automations That Stick", 
    stream: "INTERMEDIATE", 
    description: "Advanced no-code strategies. Build robust, error-handled automations that run reliably.", 
    slug: "no-code-automations", 
    order: 3, 
    icon: 'puzzle', 
    duration: '4 hours',
    lessonsCount: 8 
  },
  { 
    id: "i-m4", 
    title: "Measurement, Governance & Handover", 
    stream: "INTERMEDIATE", 
    description: "Leading AI initiatives. How to measure ROI, ensure compliance, and manage team adoption.',", 
    slug: "measurement-governance", 
    order: 4, 
    icon: 'shield', 
    duration: '3 hours',
    lessonsCount: 4 
  }
];

// GET all modules
router.get('/', async (req: Request, res: Response) => {
  try {
    const modules = await prisma.module.findMany({
      orderBy: { order: 'asc' }
    });
    
    // If DB is empty or connection failed (handled by catch), usage fallback
    if (modules.length === 0) {
      console.log('No modules found in DB, returning mock data');
      return res.status(200).json({ modules: MOCK_MODULES });
    }

    res.status(200).json({ modules });
  } catch (error) {
    console.error('Database error (Using fallback):', error);
    res.status(200).json({ 
      modules: MOCK_MODULES,
      _notice: "Served from Mock Data (Database Connection Failed)" 
    });
  }
});

// GET specific module
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const module = await prisma.module.findUnique({
      where: { id },
      include: { lessons: true }
    });

    if (!module) {
       // Fallback check
       const mock = MOCK_MODULES.find(m => m.id === id);
       if (mock) return res.status(200).json(mock);
       return res.status(404).json({ error: "Module not found" });
    }

    res.status(200).json(module);
  } catch (error) {
    console.error('Database error:', error);
    // Fallback
    const mock = MOCK_MODULES.find(m => m.id === id);
    if (mock) return res.status(200).json(mock);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST create module
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, stream, slug, order } = req.body;
    const module = await prisma.module.create({
      data: {
        title,
        description,
        stream, // Ensure this matches enum 'BEGINNER' | 'INTERMEDIATE'
        slug,
        order
      }
    });
    res.status(201).json(module);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: "Failed to create module" });
  }
});

export default router;
