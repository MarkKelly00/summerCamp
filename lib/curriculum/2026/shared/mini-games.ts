/**
 * Mini-game catalog.
 *
 * Eleven games per the spec. Two (number-muncher, knoword-vocab) have
 * fully-typed configs ready for the Phase 5 renderers. The other nine
 * carry config skeletons so lessons can reference them by `slug` today;
 * each renderer's full config schema lands alongside its implementation.
 */

import type {
  IScoringRules,
  MiniGameType,
} from "@/lib/db/models/MiniGame";
import type { LearningTrack } from "@/lib/db/models/Lesson";

export interface MiniGameSeed {
  slug: string;
  title: string;
  type: MiniGameType;
  gradeLevel: number;
  learningTrack: LearningTrack;
  subject: string;
  skillTags: string[];
  config: Record<string, unknown>;
  scoringRules: IScoringRules;
  active: boolean;
}

const NUMBER_MUNCHER_SCORING: IScoringRules = {
  maxScore: 100,
  masteryThreshold: 70,
  accuracyWeight: 0.7,
  speedWeight: 0.3,
  mistakePenalty: 5,
};

const KNOWORD_SCORING: IScoringRules = {
  maxScore: 100,
  masteryThreshold: 70,
  accuracyWeight: 0.8,
  speedWeight: 0.2,
  mistakePenalty: 5,
};

const DEFAULT_SCORING: IScoringRules = {
  maxScore: 100,
  masteryThreshold: 70,
  accuracyWeight: 1,
  speedWeight: 0,
  mistakePenalty: 0,
};

export const MINI_GAME_SEEDS: MiniGameSeed[] = [
  // ----- Dean (entering 3rd) ------------------------------------------------
  {
    slug: "number-muncher-multiples-3",
    title: "Number Muncher: Multiples of 3",
    type: "number-muncher",
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    subject: "math",
    skillTags: ["multiplication-fluency-basic"],
    config: {
      rule: "multiples-of-3",
      gridSize: 5,
      durationSeconds: 120,
      numberRange: { min: 1, max: 50 },
    },
    scoringRules: NUMBER_MUNCHER_SCORING,
    active: true,
  },
  {
    slug: "number-muncher-multiples-5",
    title: "Number Muncher: Multiples of 5",
    type: "number-muncher",
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    subject: "math",
    skillTags: ["multiplication-fluency-basic"],
    config: {
      rule: "multiples-of-5",
      gridSize: 5,
      durationSeconds: 120,
      numberRange: { min: 1, max: 60 },
    },
    scoringRules: NUMBER_MUNCHER_SCORING,
    active: true,
  },
  {
    slug: "fraction-pizza-shop-3rd",
    title: "Fraction Pizza Shop",
    type: "fraction-pizza",
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    subject: "math",
    skillTags: ["fraction-equal-parts", "fraction-compare"],
    config: { mode: "shop", maxDenominator: 8 },
    scoringRules: DEFAULT_SCORING,
    active: true,
  },
  {
    slug: "creature-lab-3rd",
    title: "Creature Lab",
    type: "ecosystem-sim",
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    subject: "science",
    skillTags: ["life-cycles", "habitats-and-adaptation"],
    config: { mode: "creature-cards" },
    scoringRules: DEFAULT_SCORING,
    active: true,
  },
  {
    slug: "weather-reporter-studio-3rd",
    title: "Weather Reporter Studio",
    type: "weather-studio",
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    subject: "science",
    skillTags: ["weather-patterns", "data-representation"],
    config: { mode: "daily-forecast" },
    scoringRules: DEFAULT_SCORING,
    active: true,
  },
  {
    slug: "timeline-treasure-trail-3rd",
    title: "Timeline Treasure Trail",
    type: "timeline-trail",
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    subject: "history",
    skillTags: ["timelines", "communities-past-and-present"],
    config: { mode: "community-history" },
    scoringRules: DEFAULT_SCORING,
    active: true,
  },

  // ----- Addie (entering 5th) -----------------------------------------------
  {
    slug: "knoword-vocab-tier1",
    title: "Vocabulary Arena: Tier 1",
    type: "knoword-vocab",
    gradeLevel: 5,
    learningTrack: "entering-5th",
    subject: "reading",
    skillTags: ["domain-vocabulary", "vocabulary-context-clues"],
    config: {
      wordList: [
        { word: "abandon", definition: "to leave behind completely" },
        { word: "boundary", definition: "a line that marks a limit" },
        { word: "compromise", definition: "an agreement reached by give and take" },
        { word: "diligent", definition: "showing careful and persistent effort" },
        { word: "emerge", definition: "to come out into view" },
        { word: "fragile", definition: "easily broken or damaged" },
        { word: "generous", definition: "willing to give more than is needed" },
        { word: "harvest", definition: "to gather a crop" },
        { word: "ignite", definition: "to set on fire or set in motion" },
        { word: "justify", definition: "to show or prove to be right" },
      ],
      revealIntervalMs: 2000,
      roundCount: 10,
    },
    scoringRules: KNOWORD_SCORING,
    active: true,
  },
  {
    slug: "fraction-forge-5th",
    title: "Fraction Forge",
    type: "fraction-forge",
    gradeLevel: 5,
    learningTrack: "entering-5th",
    subject: "math",
    skillTags: ["fraction-add-unlike-denominators", "mixed-numbers"],
    config: { mode: "forge", maxDenominator: 12 },
    scoringRules: DEFAULT_SCORING,
    active: true,
  },
  {
    slug: "decimal-dash-5th",
    title: "Decimal Dash",
    type: "decimal-dash",
    gradeLevel: 5,
    learningTrack: "entering-5th",
    subject: "math",
    skillTags: ["decimal-add-subtract", "decimal-multiply"],
    config: { mode: "timed-track", durationSeconds: 120 },
    scoringRules: { ...DEFAULT_SCORING, speedWeight: 0.5, accuracyWeight: 0.5 },
    active: true,
  },
  {
    slug: "evidence-detective-5th",
    title: "Evidence Detective",
    type: "evidence-detective",
    gradeLevel: 5,
    learningTrack: "entering-5th",
    subject: "reading",
    skillTags: ["author-evidence", "theme-inference"],
    config: { mode: "passage-quotes" },
    scoringRules: DEFAULT_SCORING,
    active: true,
  },
  {
    slug: "ecosystem-sim-5th",
    title: "Ecosystem Simulator",
    type: "ecosystem-sim",
    gradeLevel: 5,
    learningTrack: "entering-5th",
    subject: "science",
    skillTags: ["food-webs-and-energy", "producers-consumers-decomposers"],
    config: { mode: "food-web" },
    scoringRules: DEFAULT_SCORING,
    active: true,
  },
  {
    slug: "primary-source-lab-5th",
    title: "Primary Source Lab",
    type: "primary-source-lab",
    gradeLevel: 5,
    learningTrack: "entering-5th",
    subject: "history",
    skillTags: ["primary-source-analysis", "evidence-based-debate"],
    config: { mode: "document-analysis" },
    scoringRules: DEFAULT_SCORING,
    active: true,
  },
  {
    slug: "coordinate-map-5th",
    title: "Coordinate Treasure Map",
    type: "coordinate-map",
    gradeLevel: 5,
    learningTrack: "entering-5th",
    subject: "math",
    skillTags: ["coordinate-plane-first-quadrant"],
    config: { mode: "treasure-hunt", quadrant: 1 },
    scoringRules: DEFAULT_SCORING,
    active: true,
  },
];
