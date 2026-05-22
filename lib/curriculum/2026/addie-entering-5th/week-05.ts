/**
 * Addie — Week 5: Weather, Earth & Space Academy.
 *
 * Theme: matter states/properties, earth systems, water cycle, stars and
 * the solar system, ending with a build-and-explain model + data writing.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  UTAH_SEED_5_1_1,
  UTAH_SEED_5_3_1,
  UTAH_SEED_5_4_1,
  UTAH_SEED_5_4_2,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-5th" as const;
const GRADE = 5;

export const week05: WeekDefinition = {
  week: 5,
  theme: "Weather, Earth & Space Academy",
  learningTrack: TRACK,
  summary: "Matter properties, earth systems, water cycle, solar system, model-building.",
  lessons: [
    lesson({
      slug: "addie-w5-d1-matter-properties",
      title: "States and Properties of Matter",
      questTitle: "The Matter Lab",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 5,
      day: 1,
      standards: [UTAH_SEED_5_1_1],
      skillTags: [SKILL.MATTER_PROPERTIES],
      hook: "Everything around you is matter, behaving in three classic ways.",
      learningGoals: [
        "Describe solid, liquid, and gas with examples.",
        "Predict what happens to matter when it's heated or cooled.",
        "Use the words 'mass', 'volume', and 'density' correctly.",
      ],
      offlineActivity:
        "Find a solid, a liquid, and a gas at home. Describe one property of each.",
    }),

    lesson({
      slug: "addie-w5-d2-earth-systems",
      title: "Earth Systems",
      questTitle: "Map Spheres of Earth",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 5,
      day: 2,
      standards: [UTAH_SEED_5_3_1, UTAH_SEED_5_4_1],
      skillTags: [SKILL.EARTH_SYSTEMS],
      hook: "Earth's four spheres — geosphere, hydrosphere, atmosphere, biosphere — all interact.",
      learningGoals: [
        "Name and describe each sphere.",
        "Give one example of two spheres interacting (rain hits rock = atmosphere + geosphere).",
        "Predict the effect of a change in one sphere on another.",
      ],
      offlineActivity:
        "Pick one place outside. Identify all four spheres in that one spot.",
    }),

    lesson({
      slug: "addie-w5-d3-water-cycle",
      title: "Water Cycle",
      questTitle: "Trace the Water",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 5,
      day: 3,
      standards: [UTAH_SEED_5_3_1],
      skillTags: [SKILL.WATER_CYCLE],
      hook: "The water you drink today might have been an iceberg or a cloud last week.",
      learningGoals: [
        "Label evaporation, condensation, precipitation, collection.",
        "Use a diagram to predict where water goes next.",
        "Connect the water cycle to weather you actually see.",
      ],
      offlineActivity:
        "Find a puddle (or a glass of cold water sweating). Identify which step of the cycle is happening.",
    }),

    lesson({
      slug: "addie-w5-d4-solar-system",
      title: "Stars and the Solar System",
      questTitle: "Space Cartography",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 5,
      day: 4,
      standards: [UTAH_SEED_5_4_2],
      skillTags: [SKILL.SOLAR_SYSTEM, SKILL.DATA_REPRESENTATION],
      hook: "Our solar system is huge but it has rules. Tonight you read the sky.",
      learningGoals: [
        "Order the 8 planets from the sun.",
        "Explain why we see different stars at different times of year.",
        "Distinguish planet from star.",
      ],
      offlineActivity:
        "Look at the sky tonight. Identify one planet or constellation with a parent or an app.",
    }),

    lesson({
      slug: "addie-w5-d5-build-and-explain",
      title: "Build and Explain a Model",
      questTitle: "Engineer's Notebook",
      subject: "engineering",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 5,
      day: 5,
      lessonType: "bonus",
      difficulty: "medium",
      estimatedMinutes: 60,
      standards: [UTAH_SEED_5_3_1, UTAH_SEED_5_4_1],
      skillTags: [SKILL.BUILD_AND_EXPLAIN, SKILL.SCIENCE_EXPLANATION],
      hook: "Models are how scientists explain invisible things. Build one. Explain it.",
      learningGoals: [
        "Build a model of the water cycle or solar system using household items.",
        "Label each part clearly.",
        "Explain the model out loud in 60 seconds.",
      ],
      offlineActivity:
        "Build the model. Photograph it for the Phase 8 admin gallery once that exists.",
      creativeMission:
        "Show the model to a younger relative and watch them learn from it.",
    }),
  ],
};
