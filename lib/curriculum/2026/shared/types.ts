/**
 * Type definitions for the Summer 2026 curriculum.
 *
 * Each lesson skeleton is upserted by `slug`. Skeletons carry full
 * metadata (standards, skill tags, learning track, mini-game wiring,
 * reward policy) plus a short content stub (hook + learningGoals +
 * optional offline mission). Full prose lands either via the admin
 * authoring UI in Phase 8 or via follow-up content-writing sessions.
 */

import type {
  ICheckpoint,
  IQuiz,
  IRewardPolicy,
  IStandard,
  LearningTrack,
  LessonDifficulty,
  LessonSubject,
  LessonType,
} from "@/lib/db/models/Lesson";

export interface LessonContentStub {
  hook: string;
  learningGoals: string[];
  offlineActivity?: string;
  creativeMission?: string;
  reflectionPrompt?: string;
  // Legacy compat fields. The new app reads `hook` / `instruction`; the
  // legacy app reads `introduction` / `mainContent`. We populate both so
  // either path renders.
  introduction: string;
  mainContent?: string;
  activities?: string[];
  funFacts?: string[];
  storyContext?: string;
  instruction?: string;
  examples?: string[];
  checkpoints?: ICheckpoint[];
}

export interface LessonDefinition {
  slug: string;
  title: string;
  questTitle?: string;
  subject: LessonSubject;
  gradeLevel: number;
  learningTrack: LearningTrack;
  week: number;
  day: number;
  lessonType: LessonType;
  difficulty: LessonDifficulty;
  estimatedMinutes: number;
  standards: IStandard[];
  skillTags: string[];
  miniGameSlug?: string;
  rewardPolicy: IRewardPolicy;
  content: LessonContentStub;
  quiz: IQuiz[];
}

export interface WeekDefinition {
  week: number;
  theme: string;
  learningTrack: LearningTrack;
  /** One-line summary printed by the seed runner. */
  summary: string;
  lessons: LessonDefinition[];
}

/** Default reward policy by lesson type. */
export const REWARD_DEFAULTS: Record<LessonType, IRewardPolicy> = {
  core: {
    xp: 50,
    funMoney: 25,
    masteryThreshold: 70,
    allowReplayPracticeXp: true,
  },
  bonus: {
    xp: 75,
    funMoney: 40,
    masteryThreshold: 70,
    allowReplayPracticeXp: true,
  },
  capstone: {
    xp: 250,
    funMoney: 150,
    masteryThreshold: 80,
    allowReplayPracticeXp: true,
  },
};

/**
 * Compact factory to keep week files readable. Fills in defaults that
 * are predictable from a lesson's track + type, leaving the per-lesson
 * payload to specify only what varies.
 */
export function lesson(args: {
  slug: string;
  title: string;
  questTitle?: string;
  subject: LessonSubject;
  gradeLevel: number;
  learningTrack: LearningTrack;
  week: number;
  day: number;
  lessonType?: LessonType;
  difficulty?: LessonDifficulty;
  estimatedMinutes?: number;
  standards: IStandard[];
  skillTags: string[];
  miniGameSlug?: string;
  hook: string;
  learningGoals: string[];
  offlineActivity?: string;
  creativeMission?: string;
  reflectionPrompt?: string;
  rewardOverride?: Partial<IRewardPolicy>;
}): LessonDefinition {
  const lessonType: LessonType = args.lessonType ?? "core";
  const baseReward = REWARD_DEFAULTS[lessonType];
  return {
    slug: args.slug,
    title: args.title,
    questTitle: args.questTitle,
    subject: args.subject,
    gradeLevel: args.gradeLevel,
    learningTrack: args.learningTrack,
    week: args.week,
    day: args.day,
    lessonType,
    difficulty: args.difficulty ?? "medium",
    estimatedMinutes: args.estimatedMinutes ?? 45,
    standards: args.standards,
    skillTags: args.skillTags,
    miniGameSlug: args.miniGameSlug,
    rewardPolicy: { ...baseReward, ...args.rewardOverride },
    content: {
      hook: args.hook,
      introduction: args.hook, // legacy field mirrors hook for back-compat reads
      learningGoals: args.learningGoals,
      offlineActivity: args.offlineActivity,
      creativeMission: args.creativeMission,
      reflectionPrompt: args.reflectionPrompt,
    },
    quiz: [],
  };
}
