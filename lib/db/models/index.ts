/**
 * Mongoose model registry barrel.
 *
 * Import models from this file rather than each individual file to make
 * future model swaps (e.g. typed factories, multi-tenancy) a one-place
 * change.
 */

export { User, type IUser, type UserRole } from "./User";
export {
  Family,
  type IFamily,
  type IFamilySettings,
} from "./Family";
export {
  Lesson,
  type ILesson,
  type LessonSubject,
  type LessonType,
  type LearningTrack,
  type IStandard,
  type IQuiz,
  type ICheckpoint,
  type IRewardPolicy,
} from "./Lesson";
export {
  Progress,
  type IProgress,
  type MasteryLevel,
  type ProgressStatus,
  type IQuizAnswer,
  masteryLevelForScore,
} from "./Progress";
export {
  Reward,
  type IReward,
  type RewardCategory,
} from "./Reward";
export {
  RewardRedemption,
  type IRewardRedemption,
  type RedemptionStatus,
} from "./RewardRedemption";
export {
  MiniGame,
  type IMiniGame,
  type MiniGameType,
  type IScoringRules,
} from "./MiniGame";
export {
  MiniGameAttempt,
  type IMiniGameAttempt,
  type IMiniGameMistakeRecord,
} from "./MiniGameAttempt";
export {
  Badge,
  type IBadge,
  type BadgeCategory,
  type BadgeRarity,
  type IBadgeRequirement,
} from "./Badge";
