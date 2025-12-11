import { Router, Request, Response } from 'express';

const router = Router();

// Mock Data (migrated from Azure Function)
const modules = [
  { id: 1, title: "AI Made Simple", stream: "beginner" },
  { id: 2, title: "Prompts that work", stream: "beginner" },
  { id: 3, title: "No-code automations", stream: "intermediate" },
  { id: 4, title: "Measurement & governance", stream: "intermediate" }
];

// GET all modules
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    modules: modules
  });
});

// GET specific module
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  res.status(200).json({
    id,
    title: "Sample Module",
    description: "This is a sample module",
    content: "Module content here..."
  });
});

// POST create module
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: "Module created successfully",
    id: Date.now()
  });
});

// PUT update module
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  res.status(200).json({
    message: "Module updated successfully",
    id
  });
});

// DELETE delete module
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  res.status(200).json({
    message: "Module deleted successfully",
    id
  });
});

export default router;
