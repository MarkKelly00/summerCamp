/**
 * Addie — Week 6: Reading Guild + Vocabulary Arena.
 *
 * Theme: theme, point of view, author's evidence with Evidence Detective,
 * comparing texts, ending with a Knoword-style vocabulary boss battle.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  CCSS_RI_5_1,
  CCSS_RI_5_9,
  CCSS_RL_5_2,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-5th" as const;
const GRADE = 5;

export const week06: WeekDefinition = {
  week: 6,
  theme: "Reading Guild & Vocabulary Arena",
  learningTrack: TRACK,
  summary: "Theme, point of view, evidence, comparing texts, vocabulary.",
  lessons: [
    lesson({
      slug: "addie-w6-d1-theme",
      title: "Theme of a Story",
      questTitle: "Read for the Lesson",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 6,
      day: 1,
      standards: [CCSS_RL_5_2],
      skillTags: [SKILL.THEME_INFERENCE],
      miniGameSlug: "knoword-vocab-tier1",
      hook: "Theme isn't the topic. It's the lesson the story is teaching.",
      learningGoals: [
        "Name the theme of a short story in one sentence.",
        "Distinguish 'topic' (what it's about) from 'theme' (what it teaches).",
        "Find one passage that signals the theme.",
      ],
      offlineActivity:
        "Pick a movie you love. Write the theme in one sentence.",
    }),

    lesson({
      slug: "addie-w6-d2-point-of-view",
      title: "Point of View",
      questTitle: "Whose Story Is This?",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 6,
      day: 2,
      standards: [CCSS_RL_5_2],
      skillTags: [SKILL.POINT_OF_VIEW],
      hook: "The same event looks different depending on who's telling it.",
      learningGoals: [
        "Identify first, second, and third person.",
        "Spot a narrator's bias or limitation.",
        "Retell the same event from two different points of view.",
      ],
      offlineActivity:
        "Tell a parent about your day from your point of view, then theirs. Compare.",
    }),

    lesson({
      slug: "addie-w6-d3-evidence-detective",
      title: "Author's Evidence",
      questTitle: "Evidence Detective Field Day",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 6,
      day: 3,
      standards: [CCSS_RI_5_1],
      skillTags: [SKILL.AUTHOR_EVIDENCE],
      miniGameSlug: "evidence-detective-5th",
      hook: "Strong claims need strong evidence. Today you find the evidence in the text.",
      learningGoals: [
        "Quote the text accurately when answering.",
        "Distinguish weak vs strong evidence for a claim.",
        "Cite line or paragraph numbers where possible.",
      ],
      offlineActivity:
        "Pick an article. Write a claim and the strongest quote that supports it.",
    }),

    lesson({
      slug: "addie-w6-d4-comparing-texts",
      title: "Comparing Texts",
      questTitle: "Two Sources, One Topic",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 6,
      day: 4,
      difficulty: "medium",
      standards: [CCSS_RI_5_9],
      skillTags: [SKILL.COMPARING_TEXTS],
      hook: "Two articles on the same topic rarely agree perfectly. Today you see why.",
      learningGoals: [
        "Read two short articles on the same topic.",
        "Identify one fact they agree on and one they disagree on.",
        "Decide which source you trust more, and explain why.",
      ],
      offlineActivity:
        "Find two short news articles about the same event. Note one agreement and one disagreement.",
    }),

    lesson({
      slug: "addie-w6-d5-vocab-boss",
      title: "Vocabulary Arena Boss",
      questTitle: "Knoword Showdown",
      subject: "reading",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 6,
      day: 5,
      lessonType: "bonus",
      standards: [],
      skillTags: [
        SKILL.DOMAIN_VOCAB,
        SKILL.VOCAB_DEFINITION_MATCH,
        SKILL.BOSS_BATTLE,
      ],
      miniGameSlug: "knoword-vocab-tier1",
      hook: "Definitions drop in, words have to come out fast. Vocabulary Arena boss battle.",
      learningGoals: [
        "Match 10 definitions to their words under time pressure.",
        "Use context clues for unfamiliar words.",
        "Add three new words to your camp vocabulary list.",
      ],
      offlineActivity:
        "Write the three new words and use each in a sentence about your day.",
    }),
  ],
};
