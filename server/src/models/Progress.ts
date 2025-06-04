import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
  studentId: mongoose.Types.ObjectId;
  lessonId: mongoose.Types.ObjectId;
  status: 'not-started' | 'in-progress' | 'completed';
  score: number;
  attempts: number;
  timeSpent: number; // in minutes
  quizAnswers: Array<{
    questionIndex: number;
    answer: string | string[];
    isCorrect: boolean;
    timeSpent: number;
  }>;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgress>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lessonId: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started'
  },
  score: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  attempts: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  quizAnswers: [{
    questionIndex: {
      type: Number,
      required: true
    },
    answer: {
      type: Schema.Types.Mixed,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    },
    timeSpent: {
      type: Number,
      default: 0
    }
  }],
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ProgressSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create compound index for efficient querying
ProgressSchema.index({ studentId: 1, lessonId: 1 }, { unique: true });
ProgressSchema.index({ studentId: 1, status: 1 });

export default mongoose.model<IProgress>('Progress', ProgressSchema); 