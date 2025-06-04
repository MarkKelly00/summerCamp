import express, { Request, Response } from 'express';
import User from '../models/User';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get user profile
router.get('/profile/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('badges');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Update user fun money
router.patch('/funmoney/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $inc: { funMoney: amount } },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating fun money:', error);
    res.status(500).json({ message: 'Error updating fun money' });
  }
});

// Award badge to user
router.patch('/badge/:userId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { badgeId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { badges: badgeId } },
      { new: true }
    ).select('-password').populate('badges');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error awarding badge:', error);
    res.status(500).json({ message: 'Error awarding badge' });
  }
});

export default router; 