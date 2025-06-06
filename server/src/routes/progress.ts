import express, { Request, Response } from 'express';
import Progress from '../models/Progress';
import { authenticateToken } from '../middleware/auth';

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
    
    let progress = await Progress.findOne({
      studentId,
      lessonId: req.params.lessonId
    });

    if (progress) {
      progress.status = status;
      progress.score = score || progress.score;
      progress.attempts += 1;
      progress.timeSpent += timeSpent || 0;
      progress.quizAnswers = quizAnswers || progress.quizAnswers;
      if (status === 'completed') {
        progress.completedAt = new Date();
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
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Error updating progress' });
  }
});

export default router; 