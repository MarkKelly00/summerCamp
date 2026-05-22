/**
 * Dean — Week 8: Explorer Museum Capstone Expo.
 *
 * Theme: every day this week is a capstone deliverable. Friday is the
 * family presentation.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  CCSS_RI_3_2,
  CCSS_W_3_3,
  UTAH_MATH_3_OA7,
  UTAH_SEED_3_3_1,
  UTAH_SS_3_3,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-3rd" as const;
const GRADE = 3;

export const week08: WeekDefinition = {
  week: 8,
  theme: "Explorer Museum",
  learningTrack: TRACK,
  summary: "Capstone projects: math badge, animal poster, short story, weather report, family showcase.",
  lessons: [
    lesson({
      slug: "dean-w8-d1-math-badge",
      title: "Math Badge Challenge",
      questTitle: "Capstone Day 1: Show Your Math",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 8,
      day: 1,
      lessonType: "capstone",
      difficulty: "medium",
      estimatedMinutes: 60,
      standards: [UTAH_MATH_3_OA7],
      skillTags: [SKILL.MULT_FLUENCY_BASIC, SKILL.CAPSTONE_PRESENTATION],
      hook: "Capstone week. You earn the Multiplication Ranger badge by showing your fluency.",
      learningGoals: [
        "Solve a mixed set of multiplication problems within 5 minutes.",
        "Explain one strategy you used.",
        "Capture your best time for the family showcase.",
      ],
      offlineActivity:
        "Practice the fact family that gave you the most trouble. Three rounds.",
      creativeMission: "Decorate your math results page to bring to the showcase.",
    }),

    lesson({
      slug: "dean-w8-d2-animal-poster",
      title: "Animal Poster",
      questTitle: "Capstone Day 2: Build the Field Guide",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 8,
      day: 2,
      lessonType: "capstone",
      estimatedMinutes: 60,
      standards: [],
      skillTags: [SKILL.HABITATS_ADAPTATION, SKILL.CREATIVE_EXPRESSION],
      hook: "Pick an animal you love. Today you make a poster that teaches the family about it.",
      learningGoals: [
        "Include: habitat, diet, life cycle, two adaptations, one cool fact.",
        "Add at least two labeled drawings.",
        "Cite at least one source (book, article, video).",
      ],
      offlineActivity:
        "Gather your supplies (paper, markers, printouts). Build the poster.",
    }),

    lesson({
      slug: "dean-w8-d3-short-story",
      title: "Short Story",
      questTitle: "Capstone Day 3: Tell a Story",
      subject: "writing",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 8,
      day: 3,
      lessonType: "capstone",
      estimatedMinutes: 60,
      standards: [CCSS_W_3_3, CCSS_RI_3_2],
      skillTags: [SKILL.PERSONAL_NARRATIVE, SKILL.CREATIVE_EXPRESSION],
      hook: "Write a short story (one page) that has a beginning, middle, and end. Real or invented.",
      learningGoals: [
        "Open with a hook sentence that makes the reader curious.",
        "Include a problem and how it was solved.",
        "End with a sentence that wraps it up.",
      ],
      offlineActivity:
        "Read your story aloud to yourself. Did the hook still work the second time?",
    }),

    lesson({
      slug: "dean-w8-d4-weather-report",
      title: "Weather Report Final",
      questTitle: "Capstone Day 4: Forecast for the Family",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 8,
      day: 4,
      lessonType: "capstone",
      estimatedMinutes: 50,
      standards: [UTAH_SEED_3_3_1],
      skillTags: [SKILL.WEATHER_PATTERNS, SKILL.SCIENCE_EXPLANATION],
      hook: "You've been a Weather Watcher. Today you deliver a polished report for the showcase.",
      learningGoals: [
        "Use a chart or drawing to show this week's weather.",
        "Predict tomorrow with evidence from the chart.",
        "Use three science words you learned this summer.",
      ],
      offlineActivity:
        "Practice your forecast out loud once. Aim for under 90 seconds.",
    }),

    lesson({
      slug: "dean-w8-d5-family-presentation",
      title: "Explorer Museum Family Showcase",
      questTitle: "Capstone Day 5: Open the Museum",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 8,
      day: 5,
      lessonType: "capstone",
      difficulty: "hard",
      estimatedMinutes: 75,
      standards: [UTAH_SS_3_3],
      skillTags: [SKILL.CAPSTONE_PRESENTATION, SKILL.CREATIVE_EXPRESSION],
      hook: "Tonight the Explorer Museum opens. You guide the family through your summer work.",
      learningGoals: [
        "Show one project from each subject (math, science, reading, writing, history).",
        "Speak clearly for at least 30 seconds about each station.",
        "End with one thing you're most proud of from the summer.",
      ],
      offlineActivity:
        "Set up your stations on a table. Invite the family. Open the museum.",
      creativeMission:
        "Photograph each station for a Family Field Guide keepsake.",
    }),
  ],
};
