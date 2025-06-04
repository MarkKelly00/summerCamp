import mongoose, { Document, Schema } from 'mongoose';

export interface IQuiz {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface ILesson extends Document {
  title: string;
  subject: 'math' | 'science' | 'reading' | 'history';
  gradeLevel: number;
  week: number;
  day: number;
  content: {
    introduction: string;
    mainContent: string;
    activities: string[];
    funFacts?: string[];
  };
  quiz: IQuiz[];
  estimatedTime: number; // in minutes
  isBonus: boolean;
  funMoneyReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}

const QuizSchema = new Schema<IQuiz>({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'fill-blank', 'short-answer'],
    required: true
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: Schema.Types.Mixed,
    required: true
  },
  explanation: String,
  points: {
    type: Number,
    default: 10
  }
});

const LessonSchema = new Schema<ILesson>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    enum: ['math', 'science', 'reading', 'history'],
    required: true
  },
  gradeLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  week: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  content: {
    introduction: {
      type: String,
      required: true
    },
    mainContent: {
      type: String,
      required: true
    },
    activities: [{
      type: String
    }],
    funFacts: [{
      type: String
    }]
  },
  quiz: [QuizSchema],
  estimatedTime: {
    type: Number,
    default: 30
  },
  isBonus: {
    type: Boolean,
    default: false
  },
  funMoneyReward: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for efficient querying
LessonSchema.index({ subject: 1, gradeLevel: 1, week: 1, day: 1 });

export default mongoose.model<ILesson>('Lesson', LessonSchema); 