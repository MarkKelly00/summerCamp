/**
 * Dean — Week 2: Math Quest: Number Kingdom.
 *
 * Theme: Dean enters the Number Kingdom and earns his way from arrays to
 * fluent multiplication facts and division-as-sharing. Friday is a boss
 * battle word-problem set powered by Number Muncher.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  UTAH_MATH_3_NBT2,
  UTAH_MATH_3_OA1,
  UTAH_MATH_3_OA3,
  UTAH_MATH_3_OA7,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-3rd" as const;
const GRADE = 3;

export const week02: WeekDefinition = {
  week: 2,
  theme: "Number Kingdom",
  learningTrack: TRACK,
  summary: "Multiplication arrays, equal groups, skip counts, facts, and division.",
  lessons: [
    lesson({
      slug: "dean-w2-d1-arrays",
      title: "Arrays Everywhere",
      questTitle: "Arrival at the Number Kingdom Gates",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 2,
      day: 1,
      standards: [UTAH_MATH_3_OA1],
      skillTags: [SKILL.MULT_FLUENCY_BASIC],
      hook: "Egg cartons, sidewalk squares, brownie pans — arrays are hiding everywhere.",
      learningGoals: [
        "Draw arrays for products through 5 x 5.",
        "Write the matching repeated-addition sentence.",
        "Explain why 4 x 3 and 3 x 4 are equal (commutative property).",
      ],
      offlineActivity:
        "Find three arrays around the house and sketch them with their multiplication sentence.",
    }),

    lesson({
      slug: "dean-w2-d2-equal-groups",
      title: "Equal Groups Workshop",
      questTitle: "Train at the Equal Groups Forge",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 2,
      day: 2,
      standards: [UTAH_MATH_3_OA1],
      skillTags: [SKILL.MULT_FLUENCY_BASIC],
      hook: "Multiplication is a fast way to count equal groups. Today you make those groups yourself.",
      learningGoals: [
        "Translate story problems into equal-group sketches.",
        "Write multiplication sentences from groups (3 groups of 6 = 3 x 6 = 18).",
        "Compare 'groups of' to 'rows of' — same idea, different picture.",
      ],
      offlineActivity:
        "Use cereal or beans to build three different equal groups for the number 24.",
    }),

    lesson({
      slug: "dean-w2-d3-skip-counting-facts",
      title: "Skip Counting to Fluency",
      questTitle: "Speed Run the Skip Counting Path",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 2,
      day: 3,
      standards: [UTAH_MATH_3_OA7],
      skillTags: [SKILL.MULT_FLUENCY_BASIC],
      miniGameSlug: "number-muncher-multiples-5",
      hook: "Skip counting is a shortcut your brain already knows. Today you make it automatic.",
      learningGoals: [
        "Skip count by 2, 3, 5, and 10 fluently to 50.",
        "Use skip counting to derive any 2x, 5x, and 10x fact.",
        "Beat your own time on a Number Muncher Multiples-of-5 board.",
      ],
      offlineActivity:
        "Write the 2s, 5s, and 10s skip count chains across the top of your notebook page.",
    }),

    lesson({
      slug: "dean-w2-d4-division-as-sharing",
      title: "Division as Sharing",
      questTitle: "The Sharing Bridge",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 2,
      day: 4,
      standards: [UTAH_MATH_3_OA3],
      skillTags: [SKILL.DIVISION_AS_SHARING],
      hook: "If multiplication is making groups, division is sharing groups out. Same family.",
      learningGoals: [
        "Solve 'share fairly' problems with a drawing.",
        "Write a division sentence from a sharing story (12 / 3 = 4).",
        "Connect 12 / 3 = 4 to 3 x 4 = 12 (inverse operations).",
      ],
      offlineActivity:
        "Share a snack of 12 pieces among 4 family members. Write the matching division sentence.",
    }),

    lesson({
      slug: "dean-w2-d5-word-problem-boss",
      title: "Word Problem Boss Battle",
      questTitle: "Defeat the Numberless Beast",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 2,
      day: 5,
      lessonType: "bonus",
      difficulty: "medium",
      standards: [UTAH_MATH_3_OA3, UTAH_MATH_3_NBT2],
      skillTags: [SKILL.MULT_FLUENCY_BASIC, SKILL.BOSS_BATTLE],
      miniGameSlug: "number-muncher-multiples-3",
      hook: "End-of-week showdown. Your number skills get tested in stories you haven't seen yet.",
      learningGoals: [
        "Read a word problem and decide: multiplication or division?",
        "Show work using an array, equal group, or number line.",
        "Check your answer by reversing the operation.",
      ],
      offlineActivity:
        "Tell a parent one word problem of your own that uses multiplication.",
    }),
  ],
};
