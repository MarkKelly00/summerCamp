import express, { Request, Response } from 'express';
import Progress from '../models/Progress';
import User from '../models/User';
import Lesson from '../models/Lesson';
import { authenticateToken } from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();

// Get student progress
router.get('/student/:studentId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const progress = await Progress.find({ studentId: req.params.studentId })
      .populate('lessonId')
      .sort({ createdAt: -1 });
    res.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

// Get detailed quiz answers for a specific lesson
router.get('/quiz-review/:studentId/:lessonId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const progress = await Progress.findOne({
      studentId: req.params.studentId,
      lessonId: req.params.lessonId
    }).populate('lessonId');
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    res.json({
      progress,
      quizAnswers: progress.quizAnswers,
      score: progress.score,
      completedAt: progress.completedAt
    });
  } catch (error) {
    console.error('Error fetching quiz review:', error);
    res.status(500).json({ message: 'Error fetching quiz review' });
  }
});

// Update lesson progress
router.post('/lesson/:lessonId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { studentId, status, score, quizAnswers, timeSpent } = req.body;
    
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Find lesson to get reward amount
      const lesson = await Lesson.findById(req.params.lessonId);
      if (!lesson) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'Lesson not found' });
      }
      
      // Find user
      const user = await User.findById(studentId);
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Check if lesson has already been completed by user to prevent double rewards
      const alreadyCompleted = user.completedLessons && 
        user.completedLessons.some(item => 
          item.lessonId.toString() === req.params.lessonId && item.funMoneyEarned > 0
        );
      
      let progress = await Progress.findOne({
        studentId,
        lessonId: req.params.lessonId
      });

      let funMoneyAwarded = 0;

      if (progress) {
        progress.status = status;
        progress.score = score || progress.score;
        progress.attempts += 1;
        progress.timeSpent += timeSpent || 0;
        progress.quizAnswers = quizAnswers || progress.quizAnswers;
        
        if (status === 'completed') {
          progress.completedAt = new Date();
          
          // Only award fun money if not already completed
          if (!alreadyCompleted) {
            // Calculate fun money based on score
            funMoneyAwarded = Math.floor((lesson.funMoneyReward || 10) * (score / 100));
            
            // Add fun money to user
            user.funMoney += funMoneyAwarded;
            
            // Add to completed lessons
            user.completedLessons.push({
              lessonId: new mongoose.Types.ObjectId(req.params.lessonId),
              completedAt: new Date(),
              funMoneyEarned: funMoneyAwarded
            });
            
            await user.save({ session });
          }
        }
      } else {
        progress = new Progress({
          studentId,
          lessonId: req.params.lessonId,
          status,
          score: score || 0,
          attempts: 1,
          timeSpent: timeSpent || 0,
          quizAnswers: quizAnswers || [],
          completedAt: status === 'completed' ? new Date() : undefined
        });
        
        if (status === 'completed' && !alreadyCompleted) {
          // Calculate fun money based on score
          funMoneyAwarded = Math.floor((lesson.funMoneyReward || 10) * (score / 100));
          
          // Add fun money to user
          user.funMoney += funMoneyAwarded;
          
          // Add to completed lessons
          user.completedLessons.push({
            lessonId: new mongoose.Types.ObjectId(req.params.lessonId),
            completedAt: new Date(),
            funMoneyEarned: funMoneyAwarded
          });
          
          await user.save({ session });
        }
      }

      await progress.save({ session });
      
      // Commit transaction
      await session.commitTransaction();
      session.endSession();
      
      // Return progress and fun money awarded
      res.json({ 
        progress, 
        funMoneyAwarded,
        newFunMoneyBalance: user.funMoney,
        alreadyCompleted
      });
    } catch (error) {
      // Abort transaction on error
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Error updating progress', error });
  }
});

export default router; 