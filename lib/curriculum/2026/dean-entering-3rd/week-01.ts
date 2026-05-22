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
        "Read and write 3-digit numbers in standard, expanded, and word form.",
        "Round to the nearest 10 and the nearest 100.",
        "Show that the digit's place changes its value 10 times over.",
      ],
      offlineActivity:
        "Write your three favorite numbers in expanded form on the camp notebook.",
      reflectionPrompt:
        "Which place value feels easiest to you, and which one needs more practice?",
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
