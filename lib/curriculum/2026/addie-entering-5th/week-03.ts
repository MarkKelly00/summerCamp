/**
 * Addie — Week 3: Fraction Forest.
 *
 * Theme: like denominators, unlike denominators with the Fraction Forge
 * mini-game, mixed numbers, fraction-decimal conversion, and a recipe
 * scaling finale.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  UTAH_MATH_5_NF1,
  UTAH_MATH_5_NF2,
  UTAH_MATH_5_NF3,
  UTAH_MATH_5_NBT7,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-5th" as const;
const GRADE = 5;

export const week03: WeekDefinition = {
  week: 3,
  theme: "Fraction Forest",
  learningTrack: TRACK,
  summary: "Like + unlike denominators, mixed numbers, fraction-decimal conversion, recipe scaling.",
  lessons: [
    lesson({
      slug: "addie-w3-d1-add-sub-like",
      title: "Add / Subtract: Like Denominators",
      questTitle: "Forge Apprentice",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 3,
      day: 1,
      standards: [UTAH_MATH_5_NF1],
      skillTags: [SKILL.FRACTION_ADD_LIKE],
      hook: "Same denominator means same-size pieces. Only the count changes.",
      learningGoals: [
        "Add and subtract fractions with the same denominator.",
        "Simplify the result when possible.",
        "Recognize when an answer needs to become a mixed number.",
      ],
      offlineActivity:
        "Split a sandwich or piece of fruit into 6 equal parts. Eat 2/6. Write the subtraction sentence.",
    }),

    lesson({
      slug: "addie-w3-d2-add-sub-unlike",
      title: "Add / Subtract: Unlike Denominators",
      questTitle: "Fire Up the Forge",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 3,
      day: 2,
      difficulty: "medium",
      standards: [UTAH_MATH_5_NF1, UTAH_MATH_5_NF2],
      skillTags: [SKILL.FRACTION_ADD_UNLIKE],
      miniGameSlug: "fraction-forge-5th",
      hook: "Different-sized pieces won't combine until you find a common piece. The forge handles it.",
      learningGoals: [
        "Find a common denominator using multiples.",
        "Add or subtract fractions with unlike denominators.",
        "Simplify and check.",
      ],
      offlineActivity:
        "Add 1/3 + 1/4 on paper. Then check by drawing both as bars.",
    }),

    lesson({
      slug: "addie-w3-d3-mixed-numbers",
      title: "Mixed Numbers",
      questTitle: "When the Pieces Spill Over",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 3,
      day: 3,
      standards: [UTAH_MATH_5_NF1, UTAH_MATH_5_NF3],
      skillTags: [SKILL.MIXED_NUMBERS],
      hook: "5/4 is more than one whole. Mixed numbers say so cleanly.",
      learningGoals: [
        "Convert improper fractions to mixed numbers and back.",
        "Add and subtract mixed numbers with like denominators.",
        "Recognize when subtraction requires regrouping (borrowing).",
      ],
      offlineActivity:
        "Write 7/2, 9/4, and 11/3 as mixed numbers. Draw one to verify.",
    }),

    lesson({
      slug: "addie-w3-d4-fraction-decimal",
      title: "Fraction / Decimal Conversion",
      questTitle: "Two Faces of the Same Number",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 3,
      day: 4,
      standards: [UTAH_MATH_5_NBT7],
      skillTags: [SKILL.FRACTION_DECIMAL_CONVERT],
      hook: "1/4 = 0.25 = 25%. Three faces, one value. Spot them in the wild.",
      learningGoals: [
        "Convert friendly fractions to decimals (halves, quarters, fifths, tenths).",
        "Convert friendly decimals back to fractions.",
        "Round a decimal to the nearest tenth and hundredth.",
      ],
      offlineActivity:
        "Open a measuring cup. Write three measurements as a fraction AND a decimal.",
    }),

    lesson({
      slug: "addie-w3-d5-recipe-scaling",
      title: "Recipe Scaling Boss",
      questTitle: "Cook for the Camp",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 3,
      day: 5,
      lessonType: "bonus",
      difficulty: "medium",
      standards: [UTAH_MATH_5_NF2],
      skillTags: [
        SKILL.RECIPE_SCALING,
        SKILL.FRACTION_ADD_UNLIKE,
        SKILL.BOSS_BATTLE,
      ],
      miniGameSlug: "fraction-forge-5th",
      hook: "A recipe for 4 needs to feed 6. Or 3. Or 12. Fractions to the rescue.",
      learningGoals: [
        "Double a recipe written in fractions.",
        "Halve a recipe and convert improper fractions to mixed.",
        "Explain why scaling is a multiplication move.",
      ],
      offlineActivity:
        "Pick any recipe at home. Rewrite it scaled to half. Bring the family one tasty result.",
    }),
  ],
};
