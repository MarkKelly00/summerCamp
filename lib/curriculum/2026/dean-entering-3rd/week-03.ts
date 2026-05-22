/**
 * Dean — Week 3: Fraction Forest.
 *
 * Theme: enter the Fraction Forest and learn to see fractions on
 * objects, number lines, and a pizza shop. End the week comparing
 * fractions with the same numerator or denominator.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  UTAH_MATH_3_NF1,
  UTAH_MATH_3_NF2,
  UTAH_MATH_3_NF3,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-3rd" as const;
const GRADE = 3;

export const week03: WeekDefinition = {
  week: 3,
  theme: "Fraction Forest",
  learningTrack: TRACK,
  summary: "Equal parts, fractions on number lines, and comparing fractions.",
  lessons: [
    lesson({
      slug: "dean-w3-d1-equal-parts",
      title: "Fractions Are Equal Parts",
      questTitle: "Enter the Fraction Forest",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 3,
      day: 1,
      standards: [UTAH_MATH_3_NF1],
      skillTags: [SKILL.FRACTION_EQUAL_PARTS],
      miniGameSlug: "fraction-pizza-shop-3rd",
      hook: "A fraction names a fair slice of one whole. The slices have to be equal — that's the rule.",
      learningGoals: [
        "Identify whether a shape is split into equal parts.",
        "Name unit fractions: 1/2, 1/3, 1/4, 1/6, 1/8.",
        "Build a fraction by counting equal parts (3/4 = 3 of 4 equal parts).",
      ],
      offlineActivity:
        "Fold a piece of paper into halves, then fourths, then eighths. Label each fold.",
    }),

    lesson({
      slug: "dean-w3-d2-number-lines",
      title: "Fractions on the Number Line",
      questTitle: "The Fraction Trail",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 3,
      day: 2,
      standards: [UTAH_MATH_3_NF2],
      skillTags: [SKILL.FRACTION_NUMBER_LINE],
      hook: "Fractions live between 0 and 1 on the number line. Today you find their addresses.",
      learningGoals: [
        "Place 1/4, 2/4, 3/4 on a number line from 0 to 1.",
        "Mark 1/3, 2/3 on a number line and explain the equal jumps.",
        "Recognize 4/4 = 1 and 6/6 = 1 (whole = denominator on top).",
      ],
      offlineActivity:
        "Draw a 0-to-1 number line and mark every fourth. Then make a 0-to-1 line and mark every third.",
    }),

    lesson({
      slug: "dean-w3-d3-compare-fractions",
      title: "Comparing Fractions",
      questTitle: "Fraction Showdown",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 3,
      day: 3,
      standards: [UTAH_MATH_3_NF3],
      skillTags: [SKILL.FRACTION_COMPARE],
      hook: "Which is bigger: 3/4 of a brownie or 3/8? Today you prove it with a picture.",
      learningGoals: [
        "Compare fractions with the same denominator (3/8 vs 5/8).",
        "Compare fractions with the same numerator (2/3 vs 2/8).",
        "Use < > = symbols correctly.",
      ],
      offlineActivity:
        "Draw two pizzas: one cut into 4 with 3 slices left, one cut into 8 with 3 slices left. Which has more pizza?",
    }),

    lesson({
      slug: "dean-w3-d4-pizza-shop",
      title: "Fraction Pizza Shop",
      questTitle: "Run the Forest Pizza Shop",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 3,
      day: 4,
      standards: [UTAH_MATH_3_NF1, UTAH_MATH_3_NF3],
      skillTags: [SKILL.FRACTION_EQUAL_PARTS, SKILL.FRACTION_COMPARE],
      miniGameSlug: "fraction-pizza-shop-3rd",
      hook: "Customers want exact slices. Fill their orders correctly and the shop stays open.",
      learningGoals: [
        "Build orders like 'one half pepperoni, one fourth cheese'.",
        "Decide if the customer or you got more pizza.",
        "Earn shop coins for accurate, fast orders.",
      ],
      offlineActivity:
        "Plan a real pizza topping split (your favorite half, family favorite half) and draw it.",
    }),

    lesson({
      slug: "dean-w3-d5-fraction-boss",
      title: "Fraction Forest Boss Battle",
      questTitle: "The Half-Eaten Bridge",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 3,
      day: 5,
      lessonType: "bonus",
      difficulty: "medium",
      standards: [UTAH_MATH_3_NF1, UTAH_MATH_3_NF2, UTAH_MATH_3_NF3],
      skillTags: [SKILL.FRACTION_EQUAL_PARTS, SKILL.FRACTION_COMPARE, SKILL.BOSS_BATTLE],
      hook: "The bridge across the Fraction Forest is half eaten. Only fluent fraction fighters cross.",
      learningGoals: [
        "Switch fluidly between number-line, pizza, and bar-model representations.",
        "Explain in one sentence why a fraction is bigger or smaller than another.",
      ],
      offlineActivity:
        "Tell a family member 'these two fractions are equal' and prove it with a picture.",
    }),
  ],
};
