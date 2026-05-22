/**
 * Dean — Week 6: Reading Guild + Vocabulary Arena.
 *
 * Theme: main idea, key details, cause/effect, text features, character
 * traits + vocabulary practice. Friday is a vocabulary mini-game finale.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import { CCSS_RI_3_2, CCSS_RL_3_2 } from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-3rd" as const;
const GRADE = 3;

export const week06: WeekDefinition = {
  week: 6,
  theme: "Reading Guild",
  learningTrack: TRACK,
  summary: "Main idea, key details, cause/effect, text features, character traits.",
  lessons: [
    lesson({
      slug: "dean-w6-d1-main-idea",
      title: "Main Idea Hunt",
      questTitle: "Join the Reading Guild",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 6,
      day: 1,
      standards: [CCSS_RI_3_2],
      skillTags: [SKILL.MAIN_IDEA_KEY_DETAIL],
      hook: "Every paragraph has a Big Idea. The other sentences are evidence for it.",
      learningGoals: [
        "State the main idea of a 4-6 sentence paragraph.",
        "Recognize the difference between the main idea and a detail.",
        "Spot a 'topic sentence' when one is present.",
      ],
      offlineActivity:
        "Pick a paragraph from a book and underline the topic sentence. Was the main idea in it?",
    }),

    lesson({
      slug: "dean-w6-d2-key-details",
      title: "Key Details that Prove the Point",
      questTitle: "Collect the Evidence",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 6,
      day: 2,
      standards: [CCSS_RI_3_2],
      skillTags: [SKILL.MAIN_IDEA_KEY_DETAIL],
      hook: "Key details aren't every detail. They're the few that prove the main idea.",
      learningGoals: [
        "Pick the strongest 2-3 details that support a main idea.",
        "Ignore details that don't support it.",
        "Connect each key detail to the main idea with 'because' or 'this shows'.",
      ],
      offlineActivity:
        "Reread the paragraph from day 1. Circle three key details and explain one.",
    }),

    lesson({
      slug: "dean-w6-d3-cause-effect",
      title: "Cause and Effect",
      questTitle: "Trace the Why",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 6,
      day: 3,
      standards: [CCSS_RI_3_2],
      skillTags: [SKILL.CAUSE_AND_EFFECT],
      hook: "Stories and articles are full of 'this happened, so that happened'. Today you trace it.",
      learningGoals: [
        "Spot signal words: because, so, as a result, therefore.",
        "Match a cause to its effect in a short text.",
        "Write one cause/effect sentence about something at home (it rained, so I stayed inside).",
      ],
      offlineActivity:
        "Tell a parent three cause/effect sentences from your own day so far.",
    }),

    lesson({
      slug: "dean-w6-d4-text-features",
      title: "Text Features Tour",
      questTitle: "Decode the Page",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 6,
      day: 4,
      standards: [CCSS_RI_3_2],
      skillTags: [SKILL.TEXT_FEATURES],
      hook: "Headings, captions, bold words, diagrams — they all help you read smarter, not harder.",
      learningGoals: [
        "Name five text features (title, heading, caption, bold, diagram).",
        "Use a heading to predict what a section is about.",
        "Use a caption to understand a picture.",
      ],
      offlineActivity:
        "Grab any non-fiction book. List five text features you can find.",
    }),

    lesson({
      slug: "dean-w6-d5-character-traits-vocab",
      title: "Character Traits and Vocabulary",
      questTitle: "Reading Guild Trials",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 6,
      day: 5,
      lessonType: "bonus",
      standards: [CCSS_RL_3_2],
      skillTags: [
        SKILL.CHARACTER_TRAITS,
        SKILL.VOCAB_DEFINITION_MATCH,
        SKILL.BOSS_BATTLE,
      ],
      hook: "Characters show their traits through their actions. Today you read the actions and name the trait.",
      learningGoals: [
        "Describe a character with one trait word (kind, brave, sneaky, curious).",
        "Find one action in the text that proves the trait.",
        "Build a short vocab list of trait words you can use in writing.",
      ],
      offlineActivity:
        "Pick a character in any book at home. Name one trait and one action that proves it.",
    }),
  ],
};
