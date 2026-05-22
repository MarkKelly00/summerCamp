import express, { Request, Response } from 'express';
import Reward from '../models/Reward';
import RewardRedemption from '../models/RewardRedemption';
import User from '../models/User';
import auth from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all available rewards
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const rewards = await Reward.find({ isAvailable: true }).sort({ cost: 1 });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Admin: Create a new reward
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    // Only admin can create rewards
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const { name, description, cost, image } = req.body;
    
    if (!name || !description || !cost) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const newReward = new Reward({
      name,
      description,
      cost,
      image: image || '🎁'
    });
    
    const savedReward = await newReward.save();
    res.status(201).json(savedReward);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Redeem a reward
router.post('/redeem/:rewardId', auth, async (req: Request, res: Response) => {
  try {
    const { rewardId } = req.params;
    
    // Find reward and user
    const reward = await Reward.findById(rewardId);
    const user = await User.findById(req.user.id);
    
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }
    
    if (!reward.isAvailable) {
      return res.status(400).json({ message: 'This reward is not available' });
    }
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user has enough fun money
    if (user.funMoney < reward.cost) {
      return res.status(400).json({ 
        message: 'Not enough fun money', 
        funMoney: user.funMoney, 
        cost: reward.cost 
      });
    }
    
    // Generate a unique code for this redemption
    const rewardCode = generateRewardCode(reward.name);
    
    // Create redemption record
    const redemption = new RewardRedemption({
      userId: user._id,
      rewardId: reward._id,
      rewardName: reward.name,
      cost: reward.cost,
      code: rewardCode
    });
    
    // Deduct fun money from user
    user.funMoney -= reward.cost;
    
    // Add redemption to user's history
    user.rewardHistory.push(redemption._id);
    
    // Save all changes
    await Promise.all([
      redemption.save(),
      user.save()
    ]);
    
    res.status(201).json({ 
      message: 'Reward redeemed successfully!',
      redemption,
      newFunMoney: user.funMoney
    });
    
  } catch (error) {
    console.error('Redemption error:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Get user's redemption history
router.get('/history', auth, async (req: Request, res: Response) => {
  try {
    const redemptions = await RewardRedemption.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
      
    res.json(redemptions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Admin: Mark a redemption as redeemed/used
router.put('/redeem/:redemptionId', auth, async (req: Request, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const redemption = await RewardRedemption.findById(req.params.redemptionId);
    
    if (!redemption) {
      return res.status(404).json({ message: 'Redemption not found' });
    }
    
    redemption.redeemed = true;
    redemption.redeemedAt = new Date();
    
    await redemption.save();
    
    res.json({ message: 'Redemption marked as used', redemption });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Helper function to generate reward codes
function generateRewardCode(rewardName: string): string {
  // Generate a short unique code based on reward name + unique string
  const prefix = rewardName.slice(0, 3).toUpperCase();
  const uniquePart = uuidv4().slice(0, 6).toUpperCase();
  return `${prefix}-${uniquePart}`;
}

export default router;