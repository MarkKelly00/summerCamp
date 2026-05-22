/**
 * Dean — Week 4: Creature Lab Science.
 *
 * Theme: life cycles, traits, habitats, food chains. Friday is an
 * Animal Research Card capstone-style mini-project.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  UTAH_SEED_3_2_1,
  UTAH_SEED_3_2_2,
  UTAH_SEED_3_2_4,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-3rd" as const;
const GRADE = 3;

export const week04: WeekDefinition = {
  week: 4,
  theme: "Creature Lab",
  learningTrack: TRACK,
  summary: "Life cycles, traits, habitats, food chains, animal research.",
  lessons: [
    lesson({
      slug: "dean-w4-d1-life-cycles",
      title: "Life Cycles",
      questTitle: "Inside the Creature Lab",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 4,
      day: 1,
      standards: [UTAH_SEED_3_2_1],
      skillTags: [SKILL.LIFE_CYCLES],
      hook: "Every living thing starts somewhere and changes over time. Today you map those changes.",
      learningGoals: [
        "Sketch the four-stage life cycle of a butterfly.",
        "Compare butterfly vs frog life cycles.",
        "Use the words 'larva', 'pupa', and 'adult' correctly.",
      ],
      offlineActivity:
        "Find any living thing outside and sketch where it might be in its life cycle.",
    }),

    lesson({
      slug: "dean-w4-d2-traits",
      title: "Traits and Variation",
      questTitle: "Spot the Family Resemblance",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 4,
      day: 2,
      standards: [UTAH_SEED_3_2_2],
      skillTags: [SKILL.TRAITS_VARIATION],
      hook: "Why do puppies in one litter look different from each other? Traits.",
      learningGoals: [
        "Define 'trait' as an inherited feature.",
        "Give three examples of traits in humans (eye color, hair color, height).",
        "Compare traits in a litter of animals (dogs, cats, rabbits).",
      ],
      offlineActivity:
        "List five traits you share with someone in your family and one trait you don't.",
    }),

    lesson({
      slug: "dean-w4-d3-habitats",
      title: "Habitats and Adaptations",
      questTitle: "The Habitat Match-Up",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 4,
      day: 3,
      standards: [UTAH_SEED_3_2_4],
      skillTags: [SKILL.HABITATS_ADAPTATION],
      miniGameSlug: "creature-lab-3rd",
      hook: "A polar bear in a desert wouldn't last a week. Habitats and bodies have to match.",
      learningGoals: [
        "Name three habitats and one animal that thrives in each.",
        "Identify an adaptation (fur, gills, camouflage) and the habitat it suits.",
        "Predict what would happen if an animal moved to the wrong habitat.",
      ],
      offlineActivity:
        "Pick an animal at home (pet, stuffed, or imagined) and describe the habitat it would need.",
    }),

    lesson({
      slug: "dean-w4-d4-food-chains",
      title: "Food Chain Basics",
      questTitle: "Who Eats Whom?",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 4,
      day: 4,
      standards: [UTAH_SEED_3_2_4],
      skillTags: [SKILL.FOOD_CHAINS_BASIC],
      hook: "Energy flows from sun to plants to plant-eaters to meat-eaters. That chain has rules.",
      learningGoals: [
        "Draw a 3-link food chain (sun, grass, rabbit, fox).",
        "Use 'producer' and 'consumer' correctly.",
        "Explain what happens if one link disappears.",
      ],
      offlineActivity:
        "Draw a food chain that ends with you. What did you eat that ate something else?",
    }),

    lesson({
      slug: "dean-w4-d5-animal-research-card",
      title: "Animal Research Card",
      questTitle: "Build Your Field Guide Entry",
      subject: "science",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 4,
      day: 5,
      lessonType: "bonus",
      estimatedMinutes: 50,
      standards: [UTAH_SEED_3_2_1, UTAH_SEED_3_2_4],
      skillTags: [SKILL.HABITATS_ADAPTATION, SKILL.CREATIVE_EXPRESSION],
      hook: "Real biologists make field cards. Today you make yours.",
      learningGoals: [
        "Pick an animal and gather: habitat, diet, life cycle, two adaptations.",
        "Draw it with at least two labeled features.",
        "Present the card to a family member.",
      ],
      offlineActivity:
        "Fold a sheet of paper in fourths. Each quarter holds one fact (habitat / diet / life cycle / fun fact).",
      creativeMission:
        "Add your animal card to a 'Family Field Guide' folder you can grow all summer.",
    }),
  ],
};
