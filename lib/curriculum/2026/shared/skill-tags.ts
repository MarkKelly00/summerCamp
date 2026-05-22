/**
 * Skill tag taxonomy.
 *
 * Skill tags are the fine-grained learning signal that the dashboards and
 * the parent reports key off in Phase 7. Lessons declare which tags they
 * exercise; mini-games declare the same; per-question quiz answers can
 * also tag the skill exercised. Aggregating across these surfaces lets us
 * say things like "Dean is mastering multiplication-by-3, struggling with
 * multiplication-by-7."
 *
 * Convention:
 *   - kebab-case
 *   - no track or grade prefix (the lesson's `learningTrack` provides it)
 *   - skill verbs preferred over topic nouns ("decode-cvc" over "phonics")
 */

export const SKILL = {
  // ---- Math: number sense + place value ----
  PLACE_VALUE_3_DIGIT: "place-value-3-digit",
  PLACE_VALUE_DECIMAL: "place-value-decimal",
  ROUNDING_10_100: "rounding-to-10-and-100",
  POWERS_OF_10: "powers-of-10",

  // ---- Math: operations ----
  ADD_SUBTRACT_WITHIN_1000: "add-subtract-within-1000",
  MULT_FLUENCY_BASIC: "multiplication-fluency-basic",
  DIVISION_AS_SHARING: "division-as-sharing",
  MULT_MULTI_DIGIT: "multi-digit-multiplication",
  LONG_DIVISION: "long-division",
  ORDER_OF_OPERATIONS: "order-of-operations",
  ESTIMATION: "estimation",

  // ---- Math: fractions + decimals ----
  FRACTION_EQUAL_PARTS: "fraction-equal-parts",
  FRACTION_NUMBER_LINE: "fraction-number-line",
  FRACTION_COMPARE: "fraction-compare",
  FRACTION_ADD_LIKE: "fraction-add-like-denominators",
  FRACTION_ADD_UNLIKE: "fraction-add-unlike-denominators",
  MIXED_NUMBERS: "mixed-numbers",
  FRACTION_DECIMAL_CONVERT: "fraction-decimal-conversion",
  DECIMAL_ADD_SUBTRACT: "decimal-add-subtract",
  DECIMAL_MULTIPLY: "decimal-multiply",
  DECIMAL_DIVIDE: "decimal-divide",
  COORDINATE_PLANE_Q1: "coordinate-plane-first-quadrant",

  // ---- Math: word problems ----
  MULTI_STEP_WORD_PROBLEM: "multi-step-word-problem",
  RECIPE_SCALING: "recipe-scaling",

  // ---- Reading ----
  READING_FLUENCY: "reading-fluency",
  MAIN_IDEA_KEY_DETAIL: "main-idea-and-key-details",
  CHARACTER_TRAITS: "character-traits",
  CAUSE_AND_EFFECT: "cause-and-effect",
  TEXT_FEATURES: "text-features",
  THEME_INFERENCE: "theme-inference",
  POINT_OF_VIEW: "point-of-view",
  AUTHOR_EVIDENCE: "author-evidence",
  COMPARING_TEXTS: "comparing-texts",
  DOMAIN_VOCAB: "domain-vocabulary",
  VOCAB_DEFINITION_MATCH: "vocabulary-definition-match",
  VOCAB_CONTEXT_CLUES: "vocabulary-context-clues",

  // ---- Writing ----
  PERSONAL_NARRATIVE: "personal-narrative",
  OPINION_WITH_REASONS: "opinion-with-reasons",
  INFORMATIVE_WRITING: "informative-writing",
  PERSUASIVE_ESSAY: "persuasive-essay",
  RESEARCH_SHORT_PROJECT: "research-short-project",

  // ---- Science ----
  LIFE_CYCLES: "life-cycles",
  TRAITS_VARIATION: "traits-and-variation",
  HABITATS_ADAPTATION: "habitats-and-adaptation",
  FOOD_CHAINS_BASIC: "food-chains-basic",
  FOOD_WEBS_ENERGY: "food-webs-and-energy",
  PRODUCERS_CONSUMERS: "producers-consumers-decomposers",
  WEATHER_PATTERNS: "weather-patterns",
  CLIMATE_BASICS: "climate-basics",
  FORCES_AND_MOTION: "forces-and-motion",
  MATTER_PROPERTIES: "matter-properties",
  WATER_CYCLE: "water-cycle",
  EARTH_SYSTEMS: "earth-systems",
  SOLAR_SYSTEM: "solar-system",
  SCIENCE_EXPLANATION: "scientific-explanation-writing",
  DATA_REPRESENTATION: "data-representation",

  // ---- Engineering / coding ----
  SIMPLE_ENGINEERING_CHALLENGE: "simple-engineering-challenge",
  BUILD_AND_EXPLAIN: "build-and-explain-model",

  // ---- Social Studies ----
  COMMUNITIES_PAST_PRESENT: "communities-past-and-present",
  TIMELINES: "timelines",
  MAPS_AND_SYMBOLS: "maps-and-symbols",
  STATE_NATION_SYMBOLS: "state-and-nation-symbols",
  EARLY_US_HISTORY: "early-us-history",
  GOVERNMENT_CIVICS: "government-and-civics",
  GEOGRAPHY_SYSTEMS: "geography-and-systems",
  PRIMARY_SOURCES: "primary-source-analysis",
  EVIDENCE_BASED_DEBATE: "evidence-based-debate",

  // ---- Cross-cutting ----
  GROWTH_MINDSET: "growth-mindset",
  CAPSTONE_PRESENTATION: "capstone-presentation",
  CREATIVE_EXPRESSION: "creative-expression",
  RESEARCH_SKILLS: "research-skills",
  DIAGNOSTIC: "diagnostic-checkpoint",
  BOSS_BATTLE: "weekly-boss-battle",
} as const;

export type SkillTag = (typeof SKILL)[keyof typeof SKILL];
