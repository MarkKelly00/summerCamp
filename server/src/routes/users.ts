import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { authenticateToken } from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();

// Middleware to check if user is admin
const requireAdmin = (req: any, res: Response, next: any) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Get all students (admin only)
router.get('/students', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password').populate('badges');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Get user by username (for compatibility)
router.get('/username/:username', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('-password').populate('badges');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Get user profile
router.get('/profile/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if it's a valid ObjectId, if not, try finding by username
    let user;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id).select('-password').populate('badges');
    } else {
      user = await User.findOne({ username: id }).select('-password').populate('badges');
    }
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Update user password (admin only)
router.patch('/password/:id', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'Password updated successfully', user });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Error updating password' });
  }
});

// Update user fun money
router.patch('/funmoney/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;
    
    // Check if it's a valid ObjectId, if not, try finding by username
    let user;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findByIdAndUpdate(
        id,
        { $inc: { funMoney: amount } },
        { new: true }
      ).select('-password');
    } else {
      user = await User.findOneAndUpdate(
        { username: id },
        { $inc: { funMoney: amount } },
        { new: true }
      ).select('-password');
    }
    
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
    const { userId } = req.params;
    
    // Check if it's a valid ObjectId, if not, try finding by username
    let user;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { badges: badgeId } },
        { new: true }
      ).select('-password').populate('badges');
    } else {
      user = await User.findOneAndUpdate(
        { username: userId },
        { $addToSet: { badges: badgeId } },
        { new: true }
      ).select('-password').populate('badges');
    }
    
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