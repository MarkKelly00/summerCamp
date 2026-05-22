/**
 * Addie — Week 2: Math Quest: Number Kingdom.
 *
 * Theme: multi-digit multiplication, long division, decimal place value,
 * powers of 10, ending with a multi-step word-problem boss battle.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  UTAH_MATH_5_NBT1,
  UTAH_MATH_5_NBT5,
  UTAH_MATH_5_NBT6,
  UTAH_MATH_5_NBT7,
  UTAH_MATH_5_OA1,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-5th" as const;
const GRADE = 5;

export const week02: WeekDefinition = {
  week: 2,
  theme: "Number Kingdom",
  learningTrack: TRACK,
  summary: "Multi-digit ops, long division, decimal place value, powers of 10, multi-step problems.",
  lessons: [
    lesson({
      slug: "addie-w2-d1-multi-digit-mult",
      title: "Multi-Digit Multiplication",
      questTitle: "Forge a Bigger Number",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 2,
      day: 1,
      standards: [UTAH_MATH_5_NBT5],
      skillTags: [SKILL.MULT_MULTI_DIGIT],
      hook: "Two-digit by two-digit is just a careful sequence of steps. Today you make those steps reliable.",
      learningGoals: [
        "Multiply 2-digit by 2-digit using the area model.",
        "Multiply 3-digit by 1-digit using the standard algorithm.",
        "Estimate first, then compute. Compare the two.",
      ],
      offlineActivity:
        "Multiply your age by your bedroom door number using the area model on paper.",
    }),

    lesson({
      slug: "addie-w2-d2-long-division",
      title: "Long Division",
      questTitle: "The Dividing Edge",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 2,
      day: 2,
      difficulty: "medium",
      standards: [UTAH_MATH_5_NBT6],
      skillTags: [SKILL.LONG_DIVISION],
      hook: "Long division has a beat: divide, multiply, subtract, bring down. Today the beat becomes muscle memory.",
      learningGoals: [
        "Divide a 3-digit number by a 1-digit number with the standard algorithm.",
        "Use 'divide, multiply, subtract, bring down' on every step.",
        "Check your answer by multiplying back.",
      ],
      offlineActivity:
        "Pick any 3-digit number. Divide it by 7 by hand. Show every step.",
    }),

    lesson({
      slug: "addie-w2-d3-decimal-place-value",
      title: "Decimal Place Value",
      questTitle: "Mapping the Decimal Lands",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 2,
      day: 3,
      standards: [UTAH_MATH_5_NBT1, UTAH_MATH_5_NBT7],
      skillTags: [SKILL.PLACE_VALUE_DECIMAL],
      hook: "Decimals follow the same place-value rules as whole numbers, just stretched smaller.",
      learningGoals: [
        "Name each place from thousands to thousandths.",
        "Show that 1.234 has 2 tenths, 3 hundredths, 4 thousandths.",
        "Compare 0.4 and 0.40 using place value.",
      ],
      offlineActivity:
        "Write a decimal that has a 7 in the tenths place and a 3 in the hundredths place. Now read it aloud.",
    }),

    lesson({
      slug: "addie-w2-d4-powers-of-10",
      title: "Powers of 10",
      questTitle: "The 10x Engine",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 2,
      day: 4,
      standards: [UTAH_MATH_5_NBT1],
      skillTags: [SKILL.POWERS_OF_10],
      hook: "Multiplying or dividing by 10 just shifts the decimal. That's a superpower.",
      learningGoals: [
        "Multiply a decimal by 10, 100, 1000 by shifting the decimal point.",
        "Divide a decimal by 10, 100, 1000 the same way.",
        "Write a number using a power of 10 in exponent form.",
      ],
      offlineActivity:
        "Take 4.5. Multiply by 10. By 100. Now divide your answer by 1000. What do you get?",
    }),

    lesson({
      slug: "addie-w2-d5-multistep-boss",
      title: "Multi-Step Word Problem Boss",
      questTitle: "Defend the Number Kingdom",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 2,
      day: 5,
      lessonType: "bonus",
      difficulty: "hard",
      standards: [UTAH_MATH_5_OA1],
      skillTags: [SKILL.MULTI_STEP_WORD_PROBLEM, SKILL.BOSS_BATTLE],
      hook: "End-of-week boss. Real problems mix it all together. Time to combine.",
      learningGoals: [
        "Solve a 3-step problem that mixes multiplication, division, and subtraction.",
        "Show work clearly enough that a parent could follow.",
        "Justify your answer in one sentence.",
      ],
      offlineActivity:
        "Tell a family member your final answer and walk them through how you got it.",
    }),
  ],
};
