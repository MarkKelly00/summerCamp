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
      hook: "Where are you with fractions and decimals after fourth grade? Today we find out — no penalty for wrong answers, this just sets the starting line for the summer.",
      learningGoals: [
        "Convert between fractions, decimals, and percents on familiar values (1/2, 1/4, 0.5, 50%).",
        "Compare two decimals to the hundredths place.",
        "Spot one fraction operation that needs more practice this summer.",
      ],
      instruction: `Fractions and decimals are two ways of writing the same idea: a part of something whole. After fourth grade, you should be comfortable moving between them — "1/2 is the same as 0.5 is the same as 50%" should feel automatic.

Three big ideas to keep in mind:

1. The denominator names the size of the piece. 1/4 means each piece is one quarter of the whole. The bigger the denominator, the SMALLER the piece. So 1/8 is smaller than 1/4 — counter-intuitive but worth memorizing.

2. Decimals are fractions with a denominator of 10, 100, or 1000. 0.7 = 7/10. 0.42 = 42/100. The number of digits after the decimal point tells you the denominator.

3. Percent means "per hundred". 35% = 35/100 = 0.35. To turn a decimal into a percent, slide the decimal two places right. To turn a percent back to a decimal, slide it two places left.

You'll see all three forms on the same number throughout fifth grade. Knowing they're the same number in different costumes saves you a lot of time.`,
      examples: [
        "1/2 = 0.5 = 50% (the most-used trio — memorize this)",
        "1/4 = 0.25 = 25%, and 3/4 = 0.75 = 75%",
        "0.6 = 6/10 = 60%",
        "0.03 = 3/100 = 3% (small decimal = small percent)",
      ],
      offlineActivity:
        "Write three fractions you use in real life (cooking measurements, money, sports stats). Convert each to a decimal AND a percent.",
      reflectionPrompt:
        "Which of the three forms (fraction, decimal, percent) feels most natural to you, and which one slows you down? Tell Mark.",
      quiz: [
        {
          question: "Which of these is the same as 1/4?",
          type: "multiple-choice",
          options: ["0.4", "0.25", "0.14", "25"],
          correctAnswer: "0.25",
          explanation: "1/4 means one of four equal parts. 1 ÷ 4 = 0.25.",
          points: 10,
          skillTag: SKILL.FRACTION_DECIMAL_CONVERT,
        },
        {
          question: "Which decimal is the largest?",
          type: "multiple-choice",
          options: ["0.7", "0.07", "0.007"],
          correctAnswer: "0.7",
          explanation:
            "0.7 has a 7 in the tenths slot. 0.07 has a 7 in the hundredths slot — ten times smaller.",
          points: 10,
          skillTag: SKILL.PLACE_VALUE_DECIMAL,
        },
        {
          question: "50% written as a decimal is...",
          type: "multiple-choice",
          options: ["5.0", "0.5", "0.05", "50.0"],
          correctAnswer: "0.5",
          explanation:
            "Percent means 'per hundred', so 50% = 50/100 = 0.5. Slide the decimal point two places left.",
          points: 10,
          skillTag: SKILL.FRACTION_DECIMAL_CONVERT,
        },
        {
          question: "Which fraction is CLOSEST to 1?",
          type: "multiple-choice",
          options: ["1/8", "3/4", "1/2", "1/3"],
          correctAnswer: "3/4",
          explanation:
            "1 = 4/4. 3/4 is just one piece away. 1/2 is two pieces away, 1/3 and 1/8 are even further.",
          points: 10,
          skillTag: SKILL.FRACTION_COMPARE,
        },
        {
          question: "0.25 written as a fraction in lowest terms is...",
          type: "multiple-choice",
          options: ["25/100", "1/4", "2/5", "1/2"],
          correctAnswer: "1/4",
          explanation:
            "0.25 = 25/100. Divide top and bottom by 25 to simplify: 25/25 = 1, 100/25 = 4. So 1/4.",
          points: 10,
          skillTag: SKILL.FRACTION_DECIMAL_CONVERT,
        },
        {
          question: "Which is the same as 60%?",
          type: "multiple-choice",
          options: ["6", "0.06", "0.6", "60/10"],
          correctAnswer: "0.6",
          explanation: "60% = 60/100 = 0.6. The decimal slides two places left.",
          points: 10,
          skillTag: SKILL.FRACTION_DECIMAL_CONVERT,
        },
        {
          question:
            "Order these from smallest to largest: 1/2, 0.6, 25%",
          type: "multiple-choice",
          options: [
            "25%, 1/2, 0.6",
            "0.6, 1/2, 25%",
            "1/2, 25%, 0.6",
            "25%, 0.6, 1/2",
          ],
          correctAnswer: "25%, 1/2, 0.6",
          explanation:
            "Convert each to a decimal first: 25% = 0.25, 1/2 = 0.5, 0.6 = 0.6. Then it's clear: 0.25 < 0.5 < 0.6.",
          points: 15,
          skillTag: SKILL.FRACTION_COMPARE,
        },
        {
          question:
            "Mark says: 'I ate 3/8 of the pizza.' That's roughly what decimal (rounded to the hundredths)?",
          type: "multiple-choice",
          options: ["0.38", "0.83", "0.30", "0.50"],
          correctAnswer: "0.38",
          explanation:
            "3 ÷ 8 = 0.375. Rounded to hundredths that's 0.38. (Notice 3/8 is just less than 1/2.)",
          points: 15,
          skillTag: SKILL.FRACTION_DECIMAL_CONVERT,
        },
      ],
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
