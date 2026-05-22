import mongoose, { Document, Schema } from 'mongoose';

export interface IRewardRedemption extends Document {
  userId: Schema.Types.ObjectId;
  rewardId: Schema.Types.ObjectId;
  rewardName: string;
  cost: number;
  redeemed: boolean;
  redeemedAt: Date;
  code: string;
}

const RewardRedemptionSchema = new Schema<IRewardRedemption>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rewardId: {
      type: Schema.Types.ObjectId,
      ref: 'Reward',
      required: true
    },
    rewardName: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    redeemed: {
      type: Boolean,
      default: false
    },
    redeemedAt: {
      type: Date
    },
    code: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRewardRedemption>('RewardRedemption', RewardRedemptionSchema);