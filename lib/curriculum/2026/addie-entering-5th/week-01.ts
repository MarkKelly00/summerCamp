/**
 * Addie — Week 1: Camp Launch + Diagnostics.
 *
 * Goal: read where Addie is after grade 4 across math, reading evidence,
 * writing, and systems-thinking history. Frames the summer as an
 * explorer's research expedition.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  CCSS_RI_5_1,
  CCSS_W_5_1,
  UTAH_MATH_5_NBT7,
  UTAH_MATH_5_OA1,
  UTAH_SS_5_3,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-5th" as const;
const GRADE = 5;

export const week01: WeekDefinition = {
  week: 1,
  theme: "Camp Launch — Explorer Expedition",
  learningTrack: TRACK,
  summary: "Diagnostics: fractions/decimals, multi-step problems, evidence, opinion writing, systems thinking.",
  lessons: [
    lesson({
      slug: "addie-w1-d1-fraction-decimal-diagnostic",
      title: "Fraction and Decimal Diagnostic",
      questTitle: "Mission 1: Calibrate the Math Compass",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 1,
      day: 1,
      estimatedMinutes: 35,
      standards: [UTAH_MATH_5_NBT7],
      skillTags: [
        SKILL.FRACTION_DECIMAL_CONVERT,
        SKILL.PLACE_VALUE_DECIMAL,
        SKILL.DIAGNOSTIC,
      ],
      hook: "Where are you with fractions and decimals after fourth grade? Today we find out.",
      learningGoals: [
        "Convert between fractions, decimals, and percents on familiar values (1/2, 1/4, 0.5, 50%).",
        "Compare two decimals to the hundredths place.",
        "Spot one fraction operation that needs more practice this summer.",
      ],
      offlineActivity:
        "Write three fractions you use in real life (cooking, money, sports). Convert each to a decimal.",
    }),

    lesson({
      slug: "addie-w1-d2-multi-step-diagnostic",
      title: "Multi-Step Problem Diagnostic",
      questTitle: "Mission 2: Stress-Test the Problem Solver",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 1,
      day: 2,
      estimatedMinutes: 40,
      standards: [UTAH_MATH_5_OA1],
      skillTags: [SKILL.MULTI_STEP_WORD_PROBLEM, SKILL.DIAGNOSTIC],
      hook: "Real problems don't come in one step. Today you stretch into the kind of thinking 5th grade asks for.",
      learningGoals: [
        "Read a 2-3 step word problem and write a plan before computing.",
        "Use parentheses and the order of operations correctly.",
        "Check your answer with a reverse step.",
      ],
      offlineActivity:
        "Write a 3-step word problem about something you did this week. Trade with a parent and solve theirs.",
    }),

    lesson({
      slug: "addie-w1-d3-evidence-and-inference",
      title: "Reading: Evidence and Inference",
      questTitle: "Mission 3: Detective Mode",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 1,
      day: 3,
      estimatedMinutes: 40,
      standards: [CCSS_RI_5_1],
      skillTags: [
        SKILL.AUTHOR_EVIDENCE,
        SKILL.THEME_INFERENCE,
        SKILL.DIAGNOSTIC,
      ],
      hook: "Authors don't always say it outright. Today you read between the lines.",
      learningGoals: [
        "Answer an inference question with a direct text quote.",
        "Distinguish 'in the text' from 'I think because…'.",
        "Use the phrase 'the text says…' in writing.",
      ],
      offlineActivity:
        "Pick a short article and answer one inference question with a sentence and a quote.",
    }),

    lesson({
      slug: "addie-w1-d4-opinion-paragraph",
      title: "Opinion / Informative Paragraph",
      questTitle: "Mission 4: Take a Stand",
      subject: "writing",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 1,
      day: 4,
      estimatedMinutes: 45,
      standards: [CCSS_W_5_1],
      skillTags: [SKILL.OPINION_WITH_REASONS, SKILL.DIAGNOSTIC],
      hook: "Pick a stance you actually have. Today you write the paragraph that proves it.",
      learningGoals: [
        "Open with a clear opinion sentence.",
        "Give two reasons, each with one supporting detail.",
        "Close with a sentence that restates the opinion in new words.",
      ],
      offlineActivity:
        "Write the paragraph. Read it aloud to a parent. Did your reasons sound convincing?",
      creativeMission:
        "Sketch a small headline-style poster of your opinion (one phrase, big letters).",
    }),

    lesson({
      slug: "addie-w1-d5-geography-systems",
      title: "Geography and Systems Thinking",
      questTitle: "Mission 5: See the Whole System",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 1,
      day: 5,
      estimatedMinutes: 40,
      standards: [UTAH_SS_5_3],
      skillTags: [SKILL.GEOGRAPHY_SYSTEMS, SKILL.MAPS_AND_SYMBOLS],
      hook: "Where people live shapes how they live. Today you start thinking in systems.",
      learningGoals: [
        "Identify how a region's geography (mountains, rivers, coasts) shapes its economy.",
        "Read a thematic map (population, climate, agriculture).",
        "Predict one effect of a geographic change.",
      ],
      offlineActivity:
        "Find a world atlas or use a map app. Pick one country and write two ways geography shapes life there.",
    }),
  ],
};
