/**
 * Dean — Week 5: Weather, Earth & Space Academy.
 *
 * Theme: weather patterns, climate, forces and motion, a simple
 * engineering challenge, and a Weather Reporter Studio finale.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  UTAH_SEED_3_1_1,
  UTAH_SEED_3_3_1,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-3rd" as const;
const GRADE = 3;

export const week05: WeekDefinition = {
  week: 5,
  theme: "Weather, Earth & Space Academy",
  learningTrack: TRACK,
  summary: "Weather patterns, climate, forces and motion, engineering build, weather studio.",
  lessons: [
    lesson({
      slug: "dean-w5-d1-weather-patterns",
      title: "Weather Patterns",
      questTitle: "Day 1 at the Weather Academy",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 5,
      day: 1,
      standards: [UTAH_SEED_3_3_1],
      skillTags: [SKILL.WEATHER_PATTERNS, SKILL.DATA_REPRESENTATION],
      miniGameSlug: "weather-reporter-studio-3rd",
      hook: "Weather changes — but it changes in patterns you can predict.",
      learningGoals: [
        "Identify three measurable weather variables (temperature, precipitation, wind).",
        "Use a thermometer and explain how it works.",
        "Predict tomorrow's weather using today's data.",
      ],
      offlineActivity:
        "Record today's temperature in the morning and the evening. Did it go up or down?",
    }),

    lesson({
      slug: "dean-w5-d2-climate-basics",
      title: "Climate vs Weather",
      questTitle: "Map the Climate Zones",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 5,
      day: 2,
      standards: [UTAH_SEED_3_3_1],
      skillTags: [SKILL.CLIMATE_BASICS],
      hook: "Weather is what happens today. Climate is what usually happens for a long, long time.",
      learningGoals: [
        "Describe the difference between weather and climate in your own words.",
        "Name three climate zones (tropical, temperate, polar) and a city in each.",
        "Predict what to pack for a trip to each climate.",
      ],
      offlineActivity:
        "On a world map, point out one place that is always hot and one that is always cold.",
    }),

    lesson({
      slug: "dean-w5-d3-forces-and-motion",
      title: "Forces and Motion",
      questTitle: "Push, Pull, Stop, Spin",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 5,
      day: 3,
      standards: [UTAH_SEED_3_1_1],
      skillTags: [SKILL.FORCES_AND_MOTION],
      hook: "Nothing moves on its own. Today you investigate the push and pull behind the motion.",
      learningGoals: [
        "Identify push, pull, and friction in everyday objects.",
        "Predict how a ball rolls on carpet vs hardwood.",
        "Sketch the forces acting on a swing.",
      ],
      offlineActivity:
        "Roll a toy car on three different surfaces. Which one slowed it down fastest? Why?",
    }),

    lesson({
      slug: "dean-w5-d4-engineering-challenge",
      title: "Wind Catcher Engineering Challenge",
      questTitle: "Catch the Wind",
      subject: "engineering",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 5,
      day: 4,
      lessonType: "bonus",
      estimatedMinutes: 50,
      standards: [UTAH_SEED_3_1_1],
      skillTags: [
        SKILL.SIMPLE_ENGINEERING_CHALLENGE,
        SKILL.FORCES_AND_MOTION,
      ],
      hook: "Engineers test, fail, and try again. Today you design something that catches the wind.",
      learningGoals: [
        "Plan a simple wind catcher using paper, tape, and a straw.",
        "Test, observe, and improve once.",
        "Explain what changed between test 1 and test 2.",
      ],
      offlineActivity:
        "Build the wind catcher. Take it outside on a breezy moment and watch it move.",
      creativeMission:
        "Photograph or sketch your final design and label one improvement you made.",
    }),

    lesson({
      slug: "dean-w5-d5-weather-reporter-studio",
      title: "Weather Reporter Studio",
      questTitle: "Go Live on Camp News",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 5,
      day: 5,
      standards: [UTAH_SEED_3_3_1],
      skillTags: [SKILL.WEATHER_PATTERNS, SKILL.SCIENCE_EXPLANATION],
      miniGameSlug: "weather-reporter-studio-3rd",
      hook: "You collected the data all week. Now you deliver the forecast.",
      learningGoals: [
        "Read your weather log and pick the most important pattern.",
        "Deliver a 3-sentence weather report aloud to a family member.",
        "Use one science word from this week (temperature, climate, pattern).",
      ],
      offlineActivity:
        "Record your weather report on a phone (60 seconds). Watch it back once for fun.",
    }),
  ],
};
