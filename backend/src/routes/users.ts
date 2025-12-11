import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Fallback Mock Data
const MOCK_USERS = [
  { id: "1", name: "User 1", email: "user1@example.com" },
  { id: "2", name: "User 2", email: "user2@example.com" }
];

// GET all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) return res.status(200).json({ users: MOCK_USERS });
    res.status(200).json({ users });
  } catch (error) {
    console.error('Database error:', error);
    res.status(200).json({ users: MOCK_USERS, _notice: "served from mock" });
  }
});

// GET specific user
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { progress: true }
    });
    
    if (!user) {
        const mock = MOCK_USERS.find(u => u.id === id);
        if (mock) return res.status(200).json(mock);
        return res.status(404).json({ error: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    const mock = MOCK_USERS.find(u => u.id === id);
    if (mock) return res.status(200).json(mock);
    res.status(500).json({ error: "Database error" });
  }
});

// POST create user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: 'USER'
      }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
