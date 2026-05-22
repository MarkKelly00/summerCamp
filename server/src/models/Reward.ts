import mongoose, { Document, Schema } from 'mongoose';

export interface IReward extends Document {
  name: string;
  description: string;
  cost: number;
  image: string;
  isAvailable: boolean;
}

const RewardSchema = new Schema<IReward>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      default: '🎁'
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IReward>('Reward', RewardSchema);