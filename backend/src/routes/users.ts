import { Router, Request, Response } from 'express';

const router = Router();

// Mock Data
const users = [
  { id: 1, name: "User 1", email: "user1@example.com" },
  { id: 2, name: "User 2", email: "user2@example.com" }
];

// GET all users
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    users: users
  });
});

// GET specific user
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  res.status(200).json({
    id,
    name: "Sample User",
    email: "user@example.com",
    progress: {
      completedModules: 2,
      totalModules: 8,
      currentStream: "beginner"
    }
  });
});

// POST create user
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  
  res.status(201).json({
    message: "User created successfully",
    id: Date.now(),
    name,
    email
  });
});

// PUT update user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  res.status(200).json({
    message: "User updated successfully",
    id
  });
});

export default router;
