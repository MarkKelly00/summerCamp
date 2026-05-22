/**
 * Dean — Week 1: Camp Launch + Diagnostics.
 *
 * Goal of the week: warm Dean up across all four core subjects, get a
 * read on where he is after grade 2, and set the camp tone with a
 * personal-narrative writing piece + community-mapping kickoff.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  CCSS_RI_3_2,
  CCSS_W_3_3,
  UTAH_MATH_3_NBT1,
  UTAH_MATH_3_OA1,
  UTAH_SS_3_2,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-3rd" as const;
const GRADE = 3;

export const week01: WeekDefinition = {
  week: 1,
  theme: "Camp Launch",
  learningTrack: TRACK,
  summary: "Diagnostics across math, reading, writing, history.",
  lessons: [
    lesson({
      slug: "dean-w1-d1-place-value",
      title: "Place Value Power-Up",
      questTitle: "Mission 1: Crack the Code of Three Digits",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 1,
      day: 1,
      difficulty: "easy",
      estimatedMinutes: 30,
      standards: [UTAH_MATH_3_NBT1],
      skillTags: [SKILL.PLACE_VALUE_3_DIGIT, SKILL.ROUNDING_10_100, SKILL.DIAGNOSTIC],
      hook: "Every number has secret slots — hundreds, tens, ones. Today you crack the code.",
      learningGoals: [
        "Read 3-digit numbers like 247 and say what each digit is worth.",
        "Round a 3-digit number to the nearest 10.",
        "Notice that the same digit in different slots has different values.",
      ],
      instruction: `Every number has hidden slots that tell you how much each digit is worth. The number 247 doesn't just mean "two hundred forty-seven" — it means 2 hundreds + 4 tens + 7 ones.

Here's the trick: the SAME DIGIT means different things in different slots.

The 7 in 247 is worth seven.
The 7 in 724 is worth seven HUNDRED.
The 7 in 27 is worth seventy.

Same digit, three different values, all because of where it sits.

The three slots in a 3-digit number, from right to left:

1. ONES — the rightmost slot. Counts up by 1.
2. TENS — the middle slot. Counts up by 10.
3. HUNDREDS — the leftmost slot in a 3-digit number. Counts up by 100.

Why this matters: when you add or subtract, you line up the slots. When you round to the nearest 10, you look at the ONES slot to decide whether to round up or down (5 or higher rounds up; 4 or lower rounds down). When you compare 482 vs 428, you check the slots one at a time from the left.

Practice naming slots out loud — "the 4 is in the tens slot, so it's worth 40" — and it becomes automatic fast.`,
      examples: [
        "365 = 3 hundreds + 6 tens + 5 ones",
        "80 = 8 tens + 0 ones (no hundreds — we just don't write a zero in front)",
        "902 = 9 hundreds + 0 tens + 2 ones (the zero holds the tens slot open!)",
        "374 rounded to the nearest ten = 370 (because the 4 in the ones slot is less than 5)",
      ],
      offlineActivity:
        "Pick any three numbers between 100 and 999. Write each one in expanded form (like 365 = 300 + 60 + 5) in your camp notebook.",
      reflectionPrompt:
        "Which slot feels easiest to read — ones, tens, or hundreds? Which one slows you down?",
      quiz: [
        {
          question: "In the number 538, which digit is in the TENS slot?",
          type: "multiple-choice",
          options: ["5", "3", "8", "none"],
          correctAnswer: "3",
          explanation:
            "Slots go right-to-left: 8 is ones, 3 is tens, 5 is hundreds.",
          points: 10,
          skillTag: SKILL.PLACE_VALUE_3_DIGIT,
        },
        {
          question: "The 4 in 472 is worth how much?",
          type: "multiple-choice",
          options: ["4", "40", "400", "4000"],
          correctAnswer: "400",
          explanation:
            "The 4 is in the leftmost (hundreds) slot of a 3-digit number, so it's worth 4 hundreds = 400.",
          points: 10,
          skillTag: SKILL.PLACE_VALUE_3_DIGIT,
        },
        {
          question: "Which number has a 6 in the HUNDREDS slot?",
          type: "multiple-choice",
          options: ["168", "612", "296", "60"],
          correctAnswer: "612",
          explanation:
            "In 612, the 6 is the leftmost digit — that's the hundreds slot, worth 600.",
          points: 10,
          skillTag: SKILL.PLACE_VALUE_3_DIGIT,
        },
        {
          question: "Round 374 to the nearest TEN.",
          type: "multiple-choice",
          options: ["370", "380", "400", "300"],
          correctAnswer: "370",
          explanation:
            "Look at the ones slot — that's a 4. Since 4 is less than 5, round DOWN to 370.",
          points: 10,
          skillTag: SKILL.ROUNDING_10_100,
        },
        {
          question: "Which is the correct EXPANDED FORM of 423?",
          type: "multiple-choice",
          options: [
            "4 + 2 + 3",
            "4 hundreds + 2 tens + 3 ones",
            "4 + 20 + 300",
            "4 tens + 2 ones + 3 hundreds",
          ],
          correctAnswer: "4 hundreds + 2 tens + 3 ones",
          explanation:
            "Reading 423 left-to-right: 4 in hundreds, 2 in tens, 3 in ones. That's 400 + 20 + 3.",
          points: 10,
          skillTag: SKILL.PLACE_VALUE_3_DIGIT,
        },
        {
          question: "What is the LARGEST 3-digit number?",
          type: "multiple-choice",
          options: ["999", "900", "1000", "100"],
          correctAnswer: "999",
          explanation:
            "All three slots filled with the biggest digit (9): 9 hundreds + 9 tens + 9 ones = 999. (1000 has FOUR digits.)",
          points: 10,
          skillTag: SKILL.PLACE_VALUE_3_DIGIT,
        },
      ],
    }),

    lesson({
      slug: "dean-w1-d2-multiplication-readiness",
      title: "Arrays, Groups, and Skip Counts",
      questTitle: "Mission 2: Build the Multiplication Engine",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 1,
      day: 2,
      difficulty: "easy",
      estimatedMinutes: 35,
      standards: [UTAH_MATH_3_OA1],
      skillTags: [SKILL.MULT_FLUENCY_BASIC, SKILL.DIAGNOSTIC],
      miniGameSlug: "number-muncher-multiples-5",
      hook: "Multiplication is just fast addition with style. Today you learn the three big tricks.",
      learningGoals: [
        "Read an array as rows x columns and connect it to repeated addition.",
        "Skip count by 2s, 5s, and 10s and explain the pattern.",
        "Translate a story (3 baskets of 4 apples) into 3 x 4 = 12.",
      ],
      offlineActivity:
        "Draw an array for 4 x 6 using stickers, dots, or coins. Label rows and columns.",
    }),

    lesson({
      slug: "dean-w1-d3-reading-fluency",
      title: "Reading Fluency and Main Idea",
      questTitle: "Mission 3: Capture the Big Idea",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 1,
      day: 3,
      difficulty: "easy",
      estimatedMinutes: 35,
      standards: [CCSS_RI_3_2],
      skillTags: [SKILL.READING_FLUENCY, SKILL.MAIN_IDEA_KEY_DETAIL, SKILL.DIAGNOSTIC],
      hook: "Every story and article has a Big Idea hiding in plain sight. Today you learn how to spot it.",
      learningGoals: [
        "Read aloud a short paragraph with accuracy and good pacing.",
        "Name the main idea in one sentence.",
        "Pick two key details that support that main idea.",
      ],
      offlineActivity:
        "Read one page of any book at home. Write the main idea in one sentence in your notebook.",
    }),

    lesson({
      slug: "dean-w1-d4-personal-narrative",
      title: "My Summer Camp Goal",
      questTitle: "Mission 4: Tell Your Camp Story",
      subject: "writing",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 1,
      day: 4,
      difficulty: "easy",
      estimatedMinutes: 40,
      standards: [CCSS_W_3_3],
      skillTags: [SKILL.PERSONAL_NARRATIVE, SKILL.GROWTH_MINDSET],
      hook: "Heroes always pick a goal before the adventure starts. What's yours for Summer Camp 2026?",
      learningGoals: [
        "Write a 4-6 sentence paragraph with a beginning, middle, and end.",
        "Use first-person voice (I, my, we) consistently.",
        "Include one sensory detail (something you see, hear, or feel).",
      ],
      offlineActivity:
        "Draw a picture of yourself at the end of summer doing the thing your goal will help you with.",
      creativeMission:
        "Share your goal paragraph with a family member and ask them to share theirs.",
    }),

    lesson({
      slug: "dean-w1-d5-maps-and-community",
      title: "My Community Map",
      questTitle: "Mission 5: Map the Neighborhood",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 1,
      day: 5,
      difficulty: "easy",
      estimatedMinutes: 40,
      standards: [UTAH_SS_3_2],
      skillTags: [SKILL.MAPS_AND_SYMBOLS, SKILL.COMMUNITIES_PAST_PRESENT],
      hook: "Every community has its own shape. Time to map yours.",
      learningGoals: [
        "Identify common map symbols (road, school, park, water).",
        "Use a compass rose to label north, south, east, and west.",
        "Draw and label your block or street with at least five symbols.",
      ],
      offlineActivity:
        "Walk one loop around the block with a parent. Draw the map you saw using symbols and a compass rose.",
    }),
  ],
};
