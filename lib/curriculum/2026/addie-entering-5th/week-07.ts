/**
 * Addie — Week 7: History Detectives.
 *
 * Theme: early U.S. history, government/civics, geography (with coordinate
 * mapping), primary-source analysis, and an evidence-based debate.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  UTAH_MATH_5_G1,
  UTAH_SS_5_1,
  UTAH_SS_5_2,
  UTAH_SS_5_3,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-5th" as const;
const GRADE = 5;

export const week07: WeekDefinition = {
  week: 7,
  theme: "History Detectives",
  learningTrack: TRACK,
  summary: "Early US history, civics, geography mapping, primary sources, evidence-based debate.",
  lessons: [
    lesson({
      slug: "addie-w7-d1-early-us-history",
      title: "Early U.S. History",
      questTitle: "Detective's First Case",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 7,
      day: 1,
      standards: [UTAH_SS_5_1, UTAH_SS_5_2],
      skillTags: [SKILL.EARLY_US_HISTORY, SKILL.TIMELINES],
      hook: "The story of how the U.S. became the U.S. is full of people, conflict, and ideas.",
      learningGoals: [
        "Place 5 events between 1492 and 1789 in order on a timeline.",
        "Name two groups whose perspectives often get left out.",
        "Explain one cause and one effect of the American Revolution.",
      ],
      offlineActivity:
        "Draw a 5-event timeline of early U.S. history with at least one event from each perspective.",
    }),

    lesson({
      slug: "addie-w7-d2-government-civics",
      title: "Government and Civics",
      questTitle: "Three Branches Tour",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 7,
      day: 2,
      standards: [UTAH_SS_5_3],
      skillTags: [SKILL.GOVERNMENT_CIVICS],
      hook: "The U.S. government is built like a three-legged stool: legislative, executive, judicial.",
      learningGoals: [
        "Name each branch and one job it does.",
        "Explain why power was split this way.",
        "Identify one check or balance between branches.",
      ],
      offlineActivity:
        "Find the names of your two U.S. senators and your representative. Write them down.",
    }),

    lesson({
      slug: "addie-w7-d3-geography-coordinates",
      title: "Geography: Coordinate Mapping",
      questTitle: "Treasure Coordinates",
      subject: "math",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 7,
      day: 3,
      standards: [UTAH_MATH_5_G1],
      skillTags: [
        SKILL.COORDINATE_PLANE_Q1,
        SKILL.GEOGRAPHY_SYSTEMS,
        SKILL.MAPS_AND_SYMBOLS,
      ],
      miniGameSlug: "coordinate-map-5th",
      hook: "Coordinates are how maps and graphs talk. Find the treasure by reading them right.",
      learningGoals: [
        "Plot points in the first quadrant.",
        "Read ordered pairs (x, y) correctly.",
        "Use coordinates to describe locations on a map.",
      ],
      offlineActivity:
        "Draw a grid map of your bedroom. Pick three landmarks and write their coordinates.",
    }),

    lesson({
      slug: "addie-w7-d4-primary-sources",
      title: "Primary Source Analysis",
      questTitle: "Inside the Primary Source Lab",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 7,
      day: 4,
      difficulty: "medium",
      standards: [UTAH_SS_5_1, UTAH_SS_5_2],
      skillTags: [SKILL.PRIMARY_SOURCES],
      miniGameSlug: "primary-source-lab-5th",
      hook: "Real history comes from real documents. Today you read the originals.",
      learningGoals: [
        "Identify the author, audience, and purpose of a primary source.",
        "Quote one line that reveals the author's perspective.",
        "Compare a primary source to a textbook summary on the same event.",
      ],
      offlineActivity:
        "Find a letter, photo, or newspaper at home (older the better). Ask: who wrote/took/printed this, when, and why?",
    }),

    lesson({
      slug: "addie-w7-d5-evidence-debate",
      title: "Evidence-Based Debate",
      questTitle: "Stand and Defend",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 7,
      day: 5,
      lessonType: "bonus",
      difficulty: "hard",
      estimatedMinutes: 60,
      standards: [UTAH_SS_5_3],
      skillTags: [
        SKILL.EVIDENCE_BASED_DEBATE,
        SKILL.PRIMARY_SOURCES,
        SKILL.BOSS_BATTLE,
      ],
      hook: "End of the week. Take a stance on a historical question and defend it with evidence.",
      learningGoals: [
        "Form a clear position on a question.",
        "Cite at least two pieces of evidence from this week.",
        "Anticipate one counterargument and respond to it.",
      ],
      offlineActivity:
        "Debate the question with a parent. They argue the opposite. Switch sides halfway through.",
      creativeMission:
        "Write a closing statement (5 sentences) for the Genius Expo binder.",
    }),
  ],
};
