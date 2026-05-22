/**
 * Addie — Week 8: Genius Expo capstone.
 *
 * Theme: every day this week is a capstone deliverable. Friday is the
 * Genius Expo family showcase.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  CCSS_W_5_1,
  CCSS_W_5_2,
  CCSS_W_5_7,
  UTAH_MATH_5_OA1,
  UTAH_SEED_5_1_1,
  UTAH_SS_5_3,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-5th" as const;
const GRADE = 5;

export const week08: WeekDefinition = {
  week: 8,
  theme: "Genius Expo",
  learningTrack: TRACK,
  summary: "Research project, science model, persuasive essay, data challenge, family showcase.",
  lessons: [
    lesson({
      slug: "addie-w8-d1-research-presentation",
      title: "Research Presentation Prep",
      questTitle: "Capstone Day 1: Build the Research",
      subject: "writing",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 8,
      day: 1,
      lessonType: "capstone",
      estimatedMinutes: 60,
      standards: [CCSS_W_5_7],
      skillTags: [
        SKILL.RESEARCH_SKILLS,
        SKILL.RESEARCH_SHORT_PROJECT,
        SKILL.CAPSTONE_PRESENTATION,
      ],
      hook: "Pick a question you actually want to answer. Build a presentation that proves the answer.",
      learningGoals: [
        "Define a research question.",
        "Gather facts from at least three sources.",
        "Outline a 3-minute talk with a hook, three points, and a closer.",
      ],
      offlineActivity:
        "Sketch your outline on one card. Practice reading it once.",
    }),

    lesson({
      slug: "addie-w8-d2-science-model",
      title: "Science Model",
      questTitle: "Capstone Day 2: Build to Explain",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 8,
      day: 2,
      lessonType: "capstone",
      estimatedMinutes: 60,
      standards: [UTAH_SEED_5_1_1],
      skillTags: [SKILL.BUILD_AND_EXPLAIN, SKILL.SCIENCE_EXPLANATION],
      hook: "Pick a science idea that excites you. Build a model. Bring it to the Expo.",
      learningGoals: [
        "Build a model from household materials.",
        "Label at least four parts.",
        "Write a one-paragraph explanation that the model 'speaks' for.",
      ],
      offlineActivity:
        "Build the model. Photograph it for the family album.",
    }),

    lesson({
      slug: "addie-w8-d3-persuasive-essay",
      title: "Persuasive Essay",
      questTitle: "Capstone Day 3: Win the Argument",
      subject: "writing",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 8,
      day: 3,
      lessonType: "capstone",
      estimatedMinutes: 60,
      standards: [CCSS_W_5_1, CCSS_W_5_2],
      skillTags: [SKILL.PERSUASIVE_ESSAY, SKILL.OPINION_WITH_REASONS],
      hook: "Pick something you'd genuinely change. Write the essay that could change it.",
      learningGoals: [
        "Open with a thesis statement.",
        "Provide three reasons, each with evidence.",
        "Acknowledge one counterargument and respond.",
        "Close with a call to action.",
      ],
      offlineActivity:
        "Read your essay aloud. Strike three filler words. Rewrite the closing sentence twice.",
    }),

    lesson({
      slug: "addie-w8-d4-data-math-challenge",
      title: "Data and Math Challenge",
      questTitle: "Capstone Day 4: Show the Numbers",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 8,
      day: 4,
      lessonType: "capstone",
      difficulty: "medium",
      estimatedMinutes: 60,
      standards: [UTAH_MATH_5_OA1],
      skillTags: [
        SKILL.MULTI_STEP_WORD_PROBLEM,
        SKILL.DATA_REPRESENTATION,
        SKILL.CAPSTONE_PRESENTATION,
      ],
      hook: "Build one data-rich exhibit for the Expo: a chart, a table, or a calculation that surprised you.",
      learningGoals: [
        "Collect at least 5 data points from real life.",
        "Display them in a chart or table.",
        "Write one insight you discovered.",
      ],
      offlineActivity:
        "Bring your chart to the Expo. Practice describing it in 30 seconds.",
    }),

    lesson({
      slug: "addie-w8-d5-family-presentation",
      title: "Genius Expo Family Showcase",
      questTitle: "Capstone Day 5: Open the Expo",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 8,
      day: 5,
      lessonType: "capstone",
      difficulty: "hard",
      estimatedMinutes: 75,
      standards: [UTAH_SS_5_3],
      skillTags: [SKILL.CAPSTONE_PRESENTATION, SKILL.EVIDENCE_BASED_DEBATE],
      hook: "Tonight you host. Walk the family through the research, the model, the essay, the data.",
      learningGoals: [
        "Set up four stations from this week's work.",
        "Speak clearly for at least 45 seconds at each station.",
        "Take and respond to one audience question.",
        "End with one thing you learned about yourself this summer.",
      ],
      offlineActivity:
        "Open the Genius Expo. Invite the family. Take a photo at each station.",
      creativeMission:
        "Add the photos to a Family Genius Expo binder you can keep.",
    }),
  ],
};
