import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'student' | 'admin';
  profile: {
    name: string;
    age: number;
    gradeLevel: number;
  };
  badges: mongoose.Types.ObjectId[];
  funMoney: number;
  totalProgress: number;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  profile: {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true,
      min: 5
    },
    gradeLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    }
  },
  badges: [{
    type: Schema.Types.ObjectId,
    ref: 'Badge'
  }],
  funMoney: {
    type: Number,
    default: 0
  },
  totalProgress: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema); 