/**
 * Addie — Week 4: Creature Lab Science.
 *
 * Theme: producers/consumers/decomposers, food webs, matter and energy
 * in ecosystems, the Ecosystem Simulator, and scientific explanation
 * writing.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  UTAH_SEED_5_2_1,
  UTAH_SEED_5_2_2,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-5th" as const;
const GRADE = 5;

export const week04: WeekDefinition = {
  week: 4,
  theme: "Creature Lab",
  learningTrack: TRACK,
  summary: "Producers, consumers, decomposers, food webs, energy flow, science writing.",
  lessons: [
    lesson({
      slug: "addie-w4-d1-producers-consumers",
      title: "Producers, Consumers, Decomposers",
      questTitle: "Inside the Ecosystem",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 4,
      day: 1,
      standards: [UTAH_SEED_5_2_1],
      skillTags: [SKILL.PRODUCERS_CONSUMERS],
      miniGameSlug: "ecosystem-sim-5th",
      hook: "Every ecosystem has three jobs: make food, eat food, recycle the leftovers.",
      learningGoals: [
        "Define producer, consumer (1st, 2nd, 3rd level), and decomposer.",
        "Sort 8 organisms into the right role.",
        "Explain why decomposers matter even though no one wants to eat them.",
      ],
      offlineActivity:
        "Look in the yard or kitchen. Find one producer, one consumer, and one decomposer. Sketch them.",
    }),

    lesson({
      slug: "addie-w4-d2-food-webs",
      title: "Food Webs",
      questTitle: "Map the Web",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 4,
      day: 2,
      standards: [UTAH_SEED_5_2_1],
      skillTags: [SKILL.FOOD_WEBS_ENERGY],
      miniGameSlug: "ecosystem-sim-5th",
      hook: "A food chain is just one line. A food web is the messy truth — everything is connected.",
      learningGoals: [
        "Draw a food web with at least 6 organisms.",
        "Predict what happens when one species disappears.",
        "Use arrows to show energy flow (eaten by → eater).",
      ],
      offlineActivity:
        "Sketch a backyard or pond food web you can actually see at home.",
    }),

    lesson({
      slug: "addie-w4-d3-matter-energy",
      title: "Matter and Energy in Ecosystems",
      questTitle: "Where Does the Energy Go?",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 4,
      day: 3,
      difficulty: "medium",
      standards: [UTAH_SEED_5_2_2],
      skillTags: [SKILL.FOOD_WEBS_ENERGY, SKILL.SCIENCE_EXPLANATION],
      hook: "Plants don't eat dirt. Where does their stuff come from? Air and water — that's the argument.",
      learningGoals: [
        "Explain that plants get most of their mass from CO2 and water, not soil.",
        "Trace energy from the sun through a 4-level food chain.",
        "Use the words 'matter' and 'energy' correctly.",
      ],
      offlineActivity:
        "Find a plant. Predict where each part came from (leaf, stem, roots). Verify with a parent.",
    }),

    lesson({
      slug: "addie-w4-d4-ecosystem-simulator",
      title: "Ecosystem Simulator",
      questTitle: "Build a Stable World",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 4,
      day: 4,
      standards: [UTAH_SEED_5_2_1],
      skillTags: [SKILL.FOOD_WEBS_ENERGY, SKILL.PRODUCERS_CONSUMERS],
      miniGameSlug: "ecosystem-sim-5th",
      hook: "Players who balance producers, consumers, and decomposers survive. Imbalance crashes the world.",
      learningGoals: [
        "Stabilize a simulated ecosystem for at least 10 turns.",
        "Identify the species that collapse first.",
        "Explain one rebalancing move you made.",
      ],
      offlineActivity:
        "Watch a real ecosystem video (parent-approved). Note one example of producers + consumers in action.",
    }),

    lesson({
      slug: "addie-w4-d5-science-explanation",
      title: "Scientific Explanation Writing",
      questTitle: "The Field Notebook",
      subject: "writing",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 4,
      day: 5,
      lessonType: "bonus",
      standards: [UTAH_SEED_5_2_2],
      skillTags: [
        SKILL.SCIENCE_EXPLANATION,
        SKILL.INFORMATIVE_WRITING,
      ],
      hook: "Scientists win arguments with evidence. Today you write like one.",
      learningGoals: [
        "Write a Claim - Evidence - Reasoning (CER) paragraph.",
        "Cite at least two facts from the week.",
        "End with a reasoning sentence that connects evidence to claim.",
      ],
      offlineActivity:
        "Pick a claim ('Plants get mass from air'). Write a CER paragraph defending it.",
      creativeMission:
        "Read your paragraph to a parent. They have to find the claim, evidence, and reasoning.",
    }),
  ],
};
