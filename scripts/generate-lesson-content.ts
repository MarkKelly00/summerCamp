/**
 * Generate full lesson content + quizzes for skeleton lessons via OpenAI.
 *
 * What it does:
 *   - Loads lesson(s) from MongoDB that are missing instruction OR quiz.
 *   - For each, asks OpenAI to draft: instruction text, examples,
 *     6-8 multiple-choice quiz questions, an offline activity, a
 *     reflection prompt. Output must match the LessonUpsertSchema shape.
 *   - Saves the result with `published: false` so Mark can review +
 *     publish via the admin UI.
 *
 * Usage:
 *   tsx scripts/generate-lesson-content.ts <slug>          # one lesson
 *   tsx scripts/generate-lesson-content.ts --all-drafts    # every empty lesson
 *
 * Safety:
 *   - Always sets `published: false` so drafts don't leak to the kids
 *     before Mark reviews them.
 *   - Refuses to overwrite a lesson that already has both `instruction`
 *     AND a non-empty `quiz` (unless --force).
 *   - Costs OpenAI credits. The script logs estimated tokens per call.
 *
 * Setup:
 *   - Requires OPENAI_API_KEY in `.env` (already there from Phase 0's
 *     legacy openai integration).
 */

import "dotenv/config";

import { OpenAI } from "openai";

import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../lib/db/mongoose";
import { Lesson } from "../lib/db/models";

const MODEL = process.env.OPENAI_LESSON_MODEL ?? "gpt-4o-mini";
const FORCE = process.argv.includes("--force");
const ALL_DRAFTS = process.argv.includes("--all-drafts");

interface DraftedContent {
  instruction: string;
  examples: string[];
  offlineActivity: string;
  reflectionPrompt: string;
  funFacts: string[];
  quiz: {
    question: string;
    type: "multiple-choice";
    options: string[];
    correctAnswer: string;
    explanation: string;
    points: number;
    skillTag?: string;
  }[];
}

const SYSTEM_PROMPT = `You are a master elementary-school curriculum designer specializing in standards-aligned summer enrichment for grades 3 and 5. You write at the student's reading level (specifically the target grade), with clear pedagogy: hook → instruction → worked examples → quiz with explanations.

Output rules:
- Instruction: 250-450 words. Conversational but precise. Use line breaks between ideas. Define every term. Connect to real life.
- Examples: 3-5 short examples that illustrate the instruction. No more than one sentence each.
- Quiz: EXACTLY 6 multiple-choice questions, each with 4 distinct options. Distractors must be plausible (not silly), and the explanation must say WHY the correct answer is correct AND why the most-tempting wrong answer is wrong. Use the lesson's grade-appropriate vocabulary.
- Difficulty curve: question 1 is easy (recall), questions 2-4 are typical, questions 5-6 are slightly harder application.
- Skill tag every question with one of the lesson's listed skill tags.
- Offline activity: a notebook task a kid can do in 5-10 minutes without a screen.
- Reflection prompt: a single open-ended question.
- Fun facts: 2-3 short surprising real-world facts related to the topic.

Return STRICT JSON only matching the requested schema. No markdown, no commentary.`;

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    instruction: { type: "string" },
    examples: { type: "array", items: { type: "string" } },
    offlineActivity: { type: "string" },
    reflectionPrompt: { type: "string" },
    funFacts: { type: "array", items: { type: "string" } },
    quiz: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          type: { type: "string", enum: ["multiple-choice"] },
          options: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 },
          correctAnswer: { type: "string" },
          explanation: { type: "string" },
          points: { type: "number" },
          skillTag: { type: "string" },
        },
        required: [
          "question",
          "type",
          "options",
          "correctAnswer",
          "explanation",
          "points",
        ],
      },
    },
  },
  required: [
    "instruction",
    "examples",
    "offlineActivity",
    "reflectionPrompt",
    "quiz",
  ],
} as const;

function buildUserPrompt(lesson: {
  title: string;
  subject: string;
  gradeLevel: number;
  learningTrack?: string;
  week: number;
  day: number;
  skillTags: string[];
  standards: { framework: string; code: string; description: string }[];
  content?: { hook?: string; learningGoals?: string[] };
}): string {
  return [
    `Grade target: ${lesson.gradeLevel}`,
    `Learning track: ${lesson.learningTrack ?? "n/a"}`,
    `Subject: ${lesson.subject}`,
    `Week ${lesson.week}, Day ${lesson.day}`,
    `Title: ${lesson.title}`,
    `Hook: ${lesson.content?.hook ?? "(none)"}`,
    `Learning goals:\n${(lesson.content?.learningGoals ?? []).map((g) => `  - ${g}`).join("\n")}`,
    `Standards:\n${lesson.standards.map((s) => `  - ${s.framework} ${s.code}: ${s.description}`).join("\n")}`,
    `Skill tags (pick one per quiz question):\n${lesson.skillTags.map((t) => `  - ${t}`).join("\n")}`,
    "",
    "Generate the full content as JSON.",
  ].join("\n");
}

async function generateForSlug(
  client: OpenAI,
  slug: string,
): Promise<void> {
  const doc = await Lesson.findOne({ slug });
  if (!doc) {
    console.log(`[generate] ${slug}: not found, skipping`);
    return;
  }

  const hasInstruction = !!(doc.content?.instruction || doc.content?.mainContent);
  const hasQuiz = (doc.quiz ?? []).length > 0;
  if (hasInstruction && hasQuiz && !FORCE) {
    console.log(`[generate] ${slug}: already filled in (use --force to overwrite)`);
    return;
  }

  console.log(`[generate] ${slug}: requesting content from ${MODEL}...`);
  const userPrompt = buildUserPrompt({
    title: doc.title,
    subject: doc.subject,
    gradeLevel: doc.gradeLevel,
    learningTrack: doc.learningTrack,
    week: doc.week,
    day: doc.day,
    skillTags: doc.skillTags ?? [],
    standards: doc.standards ?? [],
    content: doc.content,
  });

  const res = await client.chat.completions.create({
    model: MODEL,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "LessonContent",
        schema: OUTPUT_SCHEMA,
        strict: true,
      },
    } as never,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
  });

  const raw = res.choices[0]?.message?.content;
  if (!raw) {
    console.error(`[generate] ${slug}: empty response`);
    return;
  }
  let parsed: DraftedContent;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error(`[generate] ${slug}: invalid JSON:`, err);
    return;
  }

  doc.content = {
    ...doc.content,
    instruction: parsed.instruction,
    examples: parsed.examples,
    offlineActivity: parsed.offlineActivity,
    reflectionPrompt: parsed.reflectionPrompt,
    funFacts: parsed.funFacts ?? [],
  };
  doc.quiz = parsed.quiz.map((q) => ({
    question: q.question,
    type: q.type,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    points: q.points ?? 10,
    skillTag: q.skillTag,
  }));
  // Always set unpublished so Mark reviews in admin first.
  doc.published = false;
  await doc.save();
  console.log(`[generate] ${slug}: saved as DRAFT (${parsed.quiz.length} quiz questions)`);
}

async function main(): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error(
      "[generate] OPENAI_API_KEY is not set. Add it to .env and re-run.",
    );
    process.exit(1);
  }

  await connectToDatabase();
  const client = new OpenAI({ apiKey });

  if (ALL_DRAFTS) {
    const candidates = await Lesson.find({
      $or: [
        { "content.instruction": { $in: [null, ""] } },
        { quiz: { $size: 0 } },
      ],
    })
      .select({ slug: 1 })
      .lean();
    console.log(`[generate] Found ${candidates.length} lesson(s) needing content`);
    for (const c of candidates) {
      if (!c.slug) continue;
      try {
        await generateForSlug(client, c.slug);
      } catch (err) {
        console.error(`[generate] ${c.slug} failed:`, err);
      }
    }
  } else {
    const slug = process.argv.find(
      (arg) => !arg.startsWith("-") && arg !== "tsx" && !arg.endsWith(".ts"),
    );
    if (!slug) {
      console.error(
        "[generate] Pass a lesson slug or --all-drafts.\n  e.g. tsx scripts/generate-lesson-content.ts addie-w1-d2-multi-step-diagnostic",
      );
      process.exit(1);
    }
    await generateForSlug(client, slug);
  }

  await disconnectFromDatabase();
  console.log("[generate] Done. Review drafts in the admin UI before publishing.");
}

main().catch(async (err) => {
  console.error("[generate] FAILED:", err);
  await disconnectFromDatabase().catch(() => {});
  process.exit(1);
});
