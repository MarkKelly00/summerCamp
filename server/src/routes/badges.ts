import express, { Request, Response } from 'express';
import Badge from '../models/Badge';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get badges by grade level
router.get('/:gradeLevel', authenticateToken, async (req: Request, res: Response) => {
  try {
    const badges = await Badge.find({ gradeLevel: parseInt(req.params.gradeLevel) });
    res.json(badges);
  } catch (error) {
    console.error('Error fetching badges:', error);
    res.status(500).json({ message: 'Error fetching badges' });
  }
});

// Create new badge (admin only)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const badge = new Badge(req.body);
    await badge.save();
    res.status(201).json(badge);
  } catch (error) {
    console.error('Error creating badge:', error);
    res.status(500).json({ message: 'Error creating badge' });
  }
});

export default router; 