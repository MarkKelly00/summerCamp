/**
 * Dean — Week 7: History Detectives.
 *
 * Theme: communities past and present, timelines, maps, local/state/
 * national symbols, ending with a history mystery challenge using the
 * Timeline Treasure Trail mini-game.
 */

import { lesson, type WeekDefinition } from "../shared/types";
import {
  UTAH_SS_3_1,
  UTAH_SS_3_2,
  UTAH_SS_3_3,
} from "../shared/standards";
import { SKILL } from "../shared/skill-tags";

const TRACK = "entering-3rd" as const;
const GRADE = 3;

export const week07: WeekDefinition = {
  week: 7,
  theme: "History Detectives",
  learningTrack: TRACK,
  summary: "Communities past and present, timelines, maps, symbols, history mystery.",
  lessons: [
    lesson({
      slug: "dean-w7-d1-communities-past-present",
      title: "Communities Past and Present",
      questTitle: "Detective Academy Day 1",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 7,
      day: 1,
      standards: [UTAH_SS_3_3],
      skillTags: [SKILL.COMMUNITIES_PAST_PRESENT],
      hook: "Your town has been here a long time. Today you look at how it used to be.",
      learningGoals: [
        "Compare one feature of your town today vs 100 years ago (transportation, school, food).",
        "Use the words 'past', 'present', and 'change' correctly.",
        "Identify one thing that has stayed the same.",
      ],
      offlineActivity:
        "Ask a grandparent (or older family friend) one thing that was different about their town as a kid.",
    }),

    lesson({
      slug: "dean-w7-d2-timelines",
      title: "Building Timelines",
      questTitle: "Walk the Timeline Trail",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 7,
      day: 2,
      standards: [UTAH_SS_3_3],
      skillTags: [SKILL.TIMELINES],
      miniGameSlug: "timeline-treasure-trail-3rd",
      hook: "A timeline is a story laid flat. Today you read one and build one.",
      learningGoals: [
        "Read a timeline left-to-right and put events in order.",
        "Build a timeline of your own life (born, started school, today).",
        "Mark the year that's 'now' on the timeline.",
      ],
      offlineActivity:
        "Draw a five-event timeline of your life. Use dates if you can; ask a parent if you need help.",
    }),

    lesson({
      slug: "dean-w7-d3-maps",
      title: "Maps: Reading the Land",
      questTitle: "The Detective's Map",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 7,
      day: 3,
      standards: [UTAH_SS_3_2],
      skillTags: [SKILL.MAPS_AND_SYMBOLS],
      hook: "Maps look simple but they pack a lot of information. Today you learn the secret keys.",
      learningGoals: [
        "Use a map key to identify common features (roads, water, forest).",
        "Use a scale bar to estimate distance.",
        "Use a compass rose for direction.",
      ],
      offlineActivity:
        "Find a map at home (paper or app). Identify the key, scale, and compass.",
    }),

    lesson({
      slug: "dean-w7-d4-symbols",
      title: "Local, State, and National Symbols",
      questTitle: "Symbols Tell the Story",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 7,
      day: 4,
      standards: [UTAH_SS_3_1],
      skillTags: [SKILL.STATE_NATION_SYMBOLS],
      hook: "Every place has symbols that stand for what it cares about. Yours do too.",
      learningGoals: [
        "Identify the U.S. flag and explain what its colors and stars mean.",
        "Name your state's bird, flower, or animal (Utah: California gull, sego lily, Rocky Mountain elk).",
        "Pick one symbol that means a lot to your family.",
      ],
      offlineActivity:
        "Sketch a small flag or symbol that represents your family. Explain it to a parent.",
    }),

    lesson({
      slug: "dean-w7-d5-history-mystery",
      title: "History Mystery Challenge",
      questTitle: "Crack the Case",
      subject: "history",
      gradeLevel: GRADE,
      learningTrack: TRACK,
      week: 7,
      day: 5,
      lessonType: "bonus",
      standards: [UTAH_SS_3_3],
      skillTags: [SKILL.TIMELINES, SKILL.COMMUNITIES_PAST_PRESENT, SKILL.BOSS_BATTLE],
      miniGameSlug: "timeline-treasure-trail-3rd",
      hook: "End of the week. Use your map, timeline, and symbol skills to solve a small history mystery.",
      learningGoals: [
        "Use clues to place events in order on a timeline.",
        "Use a map to find where the clues happened.",
        "Explain your answer with at least two pieces of evidence.",
      ],
      offlineActivity:
        "Tell a family member the mystery you solved today using a timeline word and a map word.",
    }),
  ],
};
