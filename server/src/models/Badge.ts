import mongoose, { Document, Schema } from 'mongoose';

export interface IBadge extends Document {
  name: string;
  description: string;
  icon: string;
  category: 'weekly' | 'subject' | 'streak' | 'special';
  subject?: 'math' | 'science' | 'reading' | 'history';
  gradeLevel: number;
  requirements: {
    type: 'weekly-completion' | 'subject-mastery' | 'streak' | 'perfect-score' | 'bonus-lessons';
    target: number; // e.g., 5 lessons for weekly, 80% for mastery
    timeframe?: string; // e.g., 'week', 'month'
  };
  funMoneyReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  createdAt: Date;
}

const BadgeSchema = new Schema<IBadge>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['weekly', 'subject', 'streak', 'special'],
    required: true
  },
  subject: {
    type: String,
    enum: ['math', 'science', 'reading', 'history']
  },
  gradeLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  requirements: {
    type: {
      type: String,
      enum: ['weekly-completion', 'subject-mastery', 'streak', 'perfect-score', 'bonus-lessons'],
      required: true
    },
    target: {
      type: Number,
      required: true
    },
    timeframe: String
  },
  funMoneyReward: {
    type: Number,
    default: 50
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IBadge>('Badge', BadgeSchema); 