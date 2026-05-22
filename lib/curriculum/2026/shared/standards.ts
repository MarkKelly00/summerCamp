/**
 * Standards catalog — reusable IStandard records.
 *
 * Curriculum files import named constants here rather than inlining code +
 * description strings, so corrections propagate to every lesson that cites
 * a given standard. Codes follow Utah Core / Utah SEEd / Utah Social
 * Studies / CCSS / NGSS conventions.
 *
 * Coverage is intentionally focused on grades 3 and 5 (the two learning
 * tracks). Extending to other grades is straightforward — copy the
 * pattern below.
 */

import type { IStandard } from "@/lib/db/models/Lesson";

// ---------------------------------------------------------------------------
// Grade 3 — Utah Core Math (Dean's track: entering 3rd uses end-of-2nd +
// early-3rd targets as the learning band).
// ---------------------------------------------------------------------------

export const UTAH_MATH_3_OA1: IStandard = {
  framework: "Utah Core",
  code: "3.OA.1",
  description:
    "Interpret products of whole numbers (e.g., 5 x 7 as 5 groups of 7).",
};

export const UTAH_MATH_3_OA3: IStandard = {
  framework: "Utah Core",
  code: "3.OA.3",
  description:
    "Use multiplication and division within 100 to solve word problems.",
};

export const UTAH_MATH_3_OA7: IStandard = {
  framework: "Utah Core",
  code: "3.OA.7",
  description:
    "Fluently multiply and divide within 100 using strategies and properties.",
};

export const UTAH_MATH_3_NBT1: IStandard = {
  framework: "Utah Core",
  code: "3.NBT.1",
  description: "Round whole numbers to the nearest 10 or 100.",
};

export const UTAH_MATH_3_NBT2: IStandard = {
  framework: "Utah Core",
  code: "3.NBT.2",
  description:
    "Fluently add and subtract within 1000 using strategies and algorithms.",
};

export const UTAH_MATH_3_NF1: IStandard = {
  framework: "Utah Core",
  code: "3.NF.1",
  description:
    "Understand a fraction 1/b as the quantity formed by 1 part of a whole partitioned into b equal parts.",
};

export const UTAH_MATH_3_NF2: IStandard = {
  framework: "Utah Core",
  code: "3.NF.2",
  description: "Represent fractions on a number line.",
};

export const UTAH_MATH_3_NF3: IStandard = {
  framework: "Utah Core",
  code: "3.NF.3",
  description: "Compare two fractions with the same numerator or denominator.",
};

// ---------------------------------------------------------------------------
// Grade 5 — Utah Core Math (Addie's track).
// ---------------------------------------------------------------------------

export const UTAH_MATH_5_NBT5: IStandard = {
  framework: "Utah Core",
  code: "5.NBT.5",
  description: "Fluently multiply multi-digit whole numbers.",
};

export const UTAH_MATH_5_NBT6: IStandard = {
  framework: "Utah Core",
  code: "5.NBT.6",
  description: "Find whole-number quotients of multi-digit numbers.",
};

export const UTAH_MATH_5_NBT7: IStandard = {
  framework: "Utah Core",
  code: "5.NBT.7",
  description:
    "Add, subtract, multiply, and divide decimals to hundredths.",
};

export const UTAH_MATH_5_NBT1: IStandard = {
  framework: "Utah Core",
  code: "5.NBT.1",
  description:
    "Place value: a digit in one place represents 10 times what it represents in the place to its right.",
};

export const UTAH_MATH_5_NF1: IStandard = {
  framework: "Utah Core",
  code: "5.NF.1",
  description:
    "Add and subtract fractions with unlike denominators.",
};

export const UTAH_MATH_5_NF2: IStandard = {
  framework: "Utah Core",
  code: "5.NF.2",
  description: "Solve word problems involving addition and subtraction of fractions.",
};

export const UTAH_MATH_5_NF3: IStandard = {
  framework: "Utah Core",
  code: "5.NF.3",
  description:
    "Interpret a fraction as division of the numerator by the denominator.",
};

export const UTAH_MATH_5_OA1: IStandard = {
  framework: "Utah Core",
  code: "5.OA.1",
  description:
    "Use parentheses, brackets, or braces in numerical expressions and evaluate them.",
};

export const UTAH_MATH_5_G1: IStandard = {
  framework: "Utah Core",
  code: "5.G.1",
  description:
    "Use a coordinate system; plot points in the first quadrant.",
};

// ---------------------------------------------------------------------------
// Reading / Writing — CCSS ELA (used for both tracks at appropriate grade).
// ---------------------------------------------------------------------------

export const CCSS_RL_3_2: IStandard = {
  framework: "CCSS",
  code: "RL.3.2",
  description:
    "Recount stories and determine the central message, lesson, or moral.",
};

export const CCSS_RI_3_2: IStandard = {
  framework: "CCSS",
  code: "RI.3.2",
  description:
    "Determine the main idea of a text; recount the key details.",
};

export const CCSS_W_3_3: IStandard = {
  framework: "CCSS",
  code: "W.3.3",
  description: "Write narratives to develop real or imagined experiences.",
};

export const CCSS_RL_5_2: IStandard = {
  framework: "CCSS",
  code: "RL.5.2",
  description:
    "Determine a theme of a story from details in the text.",
};

export const CCSS_RI_5_1: IStandard = {
  framework: "CCSS",
  code: "RI.5.1",
  description:
    "Quote accurately from a text when explaining and drawing inferences.",
};

export const CCSS_RI_5_9: IStandard = {
  framework: "CCSS",
  code: "RI.5.9",
  description:
    "Integrate information from several texts on the same topic.",
};

export const CCSS_W_5_1: IStandard = {
  framework: "CCSS",
  code: "W.5.1",
  description: "Write opinion pieces supporting a point of view with reasons.",
};

export const CCSS_W_5_2: IStandard = {
  framework: "CCSS",
  code: "W.5.2",
  description: "Write informative/explanatory texts.",
};

export const CCSS_W_5_7: IStandard = {
  framework: "CCSS",
  code: "W.5.7",
  description: "Conduct short research projects using several sources.",
};

// ---------------------------------------------------------------------------
// Science — Utah SEEd.
// ---------------------------------------------------------------------------

export const UTAH_SEED_3_2_1: IStandard = {
  framework: "Utah SEEd",
  code: "3.2.1",
  description:
    "Develop and use models to describe how organisms have unique life cycles.",
};

export const UTAH_SEED_3_2_2: IStandard = {
  framework: "Utah SEEd",
  code: "3.2.2",
  description:
    "Analyze inheritance of traits and variation within a species.",
};

export const UTAH_SEED_3_2_4: IStandard = {
  framework: "Utah SEEd",
  code: "3.2.4",
  description:
    "Construct an explanation of how variations in characteristics provide advantages in surviving in a habitat.",
};

export const UTAH_SEED_3_1_1: IStandard = {
  framework: "Utah SEEd",
  code: "3.1.1",
  description:
    "Plan and carry out investigations of forces and motion.",
};

export const UTAH_SEED_3_3_1: IStandard = {
  framework: "Utah SEEd",
  code: "3.3.1",
  description:
    "Represent data describing typical weather conditions and climate.",
};

export const UTAH_SEED_5_1_1: IStandard = {
  framework: "Utah SEEd",
  code: "5.1.1",
  description:
    "Develop and use a model to describe the properties of matter.",
};

export const UTAH_SEED_5_2_1: IStandard = {
  framework: "Utah SEEd",
  code: "5.2.1",
  description:
    "Develop a model that describes the movement of matter among plants, animals, decomposers, and the environment.",
};

export const UTAH_SEED_5_2_2: IStandard = {
  framework: "Utah SEEd",
  code: "5.2.2",
  description:
    "Construct an argument that plants get materials needed for growth chiefly from air and water.",
};

export const UTAH_SEED_5_3_1: IStandard = {
  framework: "Utah SEEd",
  code: "5.3.1",
  description:
    "Use models to describe the cycling of water through Earth's systems.",
};

export const UTAH_SEED_5_4_1: IStandard = {
  framework: "Utah SEEd",
  code: "5.4.1",
  description:
    "Support an argument that the gravitational force exerted by Earth on objects is directed down.",
};

export const UTAH_SEED_5_4_2: IStandard = {
  framework: "Utah SEEd",
  code: "5.4.2",
  description:
    "Represent data to describe patterns of daily changes in length and direction of shadows, day and night, and the seasonal appearance of stars.",
};

// ---------------------------------------------------------------------------
// Social Studies — Utah Social Studies.
// ---------------------------------------------------------------------------

export const UTAH_SS_3_1: IStandard = {
  framework: "Utah Social Studies",
  code: "3.1",
  description:
    "Identify ways communities reflect the cultural background of their inhabitants.",
};

export const UTAH_SS_3_2: IStandard = {
  framework: "Utah Social Studies",
  code: "3.2",
  description:
    "Examine how geography shapes communities.",
};

export const UTAH_SS_3_3: IStandard = {
  framework: "Utah Social Studies",
  code: "3.3",
  description:
    "Investigate how communities change over time.",
};

export const UTAH_SS_5_1: IStandard = {
  framework: "Utah Social Studies",
  code: "5.1",
  description:
    "Analyze the experiences of early American Indians and the people who first came to the Americas.",
};

export const UTAH_SS_5_2: IStandard = {
  framework: "Utah Social Studies",
  code: "5.2",
  description:
    "Examine the causes and effects of the American Revolution.",
};

export const UTAH_SS_5_3: IStandard = {
  framework: "Utah Social Studies",
  code: "5.3",
  description:
    "Analyze the structure and function of the United States government.",
};
