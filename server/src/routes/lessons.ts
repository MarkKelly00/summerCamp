import express, { Request, Response } from 'express';
import Lesson from '../models/Lesson';
import { authenticateToken } from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();

// Get specific lesson (MUST come before /:gradeLevel/:week route)
router.get('/lesson/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid lesson ID format' });
    }
    
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ message: 'Error fetching lesson' });
  }
});

// Get lessons by grade level and week
router.get('/:gradeLevel/:week?', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { gradeLevel, week } = req.params;
    
    // Validate gradeLevel
    const parsedGradeLevel = parseInt(gradeLevel);
    if (isNaN(parsedGradeLevel)) {
      return res.status(400).json({ message: 'Invalid grade level' });
    }
    
    const query: any = { gradeLevel: parsedGradeLevel };
    
    if (week) {
      const parsedWeek = parseInt(week);
      if (isNaN(parsedWeek)) {
        return res.status(400).json({ message: 'Invalid week number' });
      }
      query.week = parsedWeek;
    }

    const lessons = await Lesson.find(query).sort({ week: 1, day: 1, subject: 1 });
    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ message: 'Error fetching lessons' });
  }
});

// Create new lesson (admin only)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ message: 'Error creating lesson' });
  }
});

export default router; 