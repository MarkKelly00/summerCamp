"use client";

/**
 * LessonEditor — single form covering every field on a Lesson plus a
 * dynamic Quiz editor.
 *
 * Design choices:
 *   - One big client component keeps state predictable across sections.
 *   - Lists (learningGoals, examples, skillTags, funFacts) are
 *     textareas, one item per line. Easier to author than a chip UI.
 *   - Standards are entered as JSON — they're rare to edit and a typed
 *     UI here is overkill.
 *   - Quiz array is a real dynamic editor with add/remove.
 *   - The Server Action returns `fieldErrors` keyed by Zod path; we
 *     surface them under their inputs.
 */

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  upsertLesson,
  setLessonPublished,
  deleteLesson,
  type AdminLessonState,
} from "@/lib/actions/admin-lessons";
import {
  DIFFICULTIES,
  LEARNING_TRACKS,
  LESSON_TYPES,
  QUIZ_TYPES,
  STANDARDS_FRAMEWORKS,
  SUBJECTS,
  type LessonUpsertInput,
} from "@/lib/schemas/lesson";
import { CampButton } from "@/components/ui/CampButton";
import { CampCard, CampCardSoft } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";

export interface LessonEditorInitial {
  slug?: string;
  title?: string;
  questTitle?: string;
  subject?: (typeof SUBJECTS)[number];
  gradeLevel?: number;
  learningTrack?: (typeof LEARNING_TRACKS)[number];
  week?: number;
  day?: number;
  lessonType?: (typeof LESSON_TYPES)[number];
  difficulty?: (typeof DIFFICULTIES)[number];
  estimatedMinutes?: number;
  skillTags?: string[];
  standards?: { framework: string; code: string; description: string }[];
  content?: {
    hook?: string;
    storyContext?: string;
    learningGoals?: string[];
    instruction?: string;
    mainContent?: string;
    examples?: string[];
    offlineActivity?: string;
    creativeMission?: string;
    reflectionPrompt?: string;
    funFacts?: string[];
  };
  quiz?: {
    question: string;
    type: (typeof QUIZ_TYPES)[number];
    options?: string[];
    correctAnswer: string | string[];
    explanation?: string;
    points: number;
    skillTag?: string;
  }[];
  rewardPolicy?: {
    xp: number;
    funMoney: number;
    masteryThreshold: number;
    allowReplayPracticeXp: boolean;
  };
  miniGameSlug?: string;
  published?: boolean;
}

interface Props {
  initial: LessonEditorInitial;
  mode: "create" | "edit";
  miniGames: { slug: string; title: string }[];
}

function linesToArray(s: string): string[] {
  return s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function arrayToLines(a: string[] | undefined): string {
  return (a ?? []).join("\n");
}

export function LessonEditor({ initial, mode, miniGames }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<AdminLessonState | null>(null);

  // ---- Field state -----------------------------------------------------
  const [slug, setSlug] = useState(initial.slug ?? "");
  const [title, setTitle] = useState(initial.title ?? "");
  const [questTitle, setQuestTitle] = useState(initial.questTitle ?? "");
  const [subject, setSubject] = useState<(typeof SUBJECTS)[number]>(
    initial.subject ?? "math",
  );
  const [gradeLevel, setGradeLevel] = useState(initial.gradeLevel ?? 3);
  const [learningTrack, setLearningTrack] = useState<
    (typeof LEARNING_TRACKS)[number]
  >(initial.learningTrack ?? "entering-3rd");
  const [week, setWeek] = useState(initial.week ?? 1);
  const [day, setDay] = useState(initial.day ?? 1);
  const [lessonType, setLessonType] = useState<(typeof LESSON_TYPES)[number]>(
    initial.lessonType ?? "core",
  );
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>(
    initial.difficulty ?? "medium",
  );
  const [estimatedMinutes, setEstimatedMinutes] = useState(
    initial.estimatedMinutes ?? 45,
  );

  const [skillTagsText, setSkillTagsText] = useState(
    arrayToLines(initial.skillTags),
  );
  const [standardsJson, setStandardsJson] = useState(
    JSON.stringify(initial.standards ?? [], null, 2),
  );

  // Content
  const [hook, setHook] = useState(initial.content?.hook ?? "");
  const [storyContext, setStoryContext] = useState(
    initial.content?.storyContext ?? "",
  );
  const [learningGoalsText, setLearningGoalsText] = useState(
    arrayToLines(initial.content?.learningGoals),
  );
  const [instruction, setInstruction] = useState(
    initial.content?.instruction ?? "",
  );
  const [mainContent, setMainContent] = useState(
    initial.content?.mainContent ?? "",
  );
  const [examplesText, setExamplesText] = useState(
    arrayToLines(initial.content?.examples),
  );
  const [offlineActivity, setOfflineActivity] = useState(
    initial.content?.offlineActivity ?? "",
  );
  const [creativeMission, setCreativeMission] = useState(
    initial.content?.creativeMission ?? "",
  );
  const [reflectionPrompt, setReflectionPrompt] = useState(
    initial.content?.reflectionPrompt ?? "",
  );
  const [funFactsText, setFunFactsText] = useState(
    arrayToLines(initial.content?.funFacts),
  );

  // Reward policy
  const [xp, setXp] = useState(initial.rewardPolicy?.xp ?? 50);
  const [funMoney, setFunMoney] = useState(
    initial.rewardPolicy?.funMoney ?? 25,
  );
  const [masteryThreshold, setMasteryThreshold] = useState(
    initial.rewardPolicy?.masteryThreshold ?? 70,
  );
  const [allowReplayXp, setAllowReplayXp] = useState(
    initial.rewardPolicy?.allowReplayPracticeXp ?? true,
  );

  // Mini-game
  const [miniGameSlug, setMiniGameSlug] = useState(initial.miniGameSlug ?? "");

  // Quiz
  const [quiz, setQuiz] = useState(initial.quiz ?? []);

  const fieldError = (path: string) => state?.fieldErrors?.[path];

  const buildPayload = (): LessonUpsertInput | { error: string } => {
    let standards: { framework: string; code: string; description: string }[];
    try {
      standards = JSON.parse(standardsJson || "[]");
      if (!Array.isArray(standards)) {
        return { error: "Standards must be a JSON array." };
      }
    } catch {
      return { error: "Standards is not valid JSON." };
    }

    return {
      slug: slug.trim(),
      title: title.trim(),
      questTitle: questTitle.trim() || undefined,
      subject,
      gradeLevel,
      learningTrack,
      week,
      day,
      lessonType,
      difficulty,
      estimatedMinutes,
      // @ts-expect-error -- zod enum will validate; we just pass through user input
      standards,
      skillTags: linesToArray(skillTagsText),
      content: {
        introduction: hook,
        mainContent,
        activities: [],
        funFacts: linesToArray(funFactsText),
        hook,
        storyContext: storyContext || undefined,
        learningGoals: linesToArray(learningGoalsText),
        instruction: instruction || undefined,
        examples: linesToArray(examplesText),
        offlineActivity: offlineActivity || undefined,
        creativeMission: creativeMission || undefined,
        reflectionPrompt: reflectionPrompt || undefined,
      },
      quiz: quiz.map((q) => ({
        question: q.question,
        type: q.type,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        points: q.points,
        skillTag: q.skillTag,
      })),
      rewardPolicy: {
        xp,
        funMoney,
        masteryThreshold,
        allowReplayPracticeXp: allowReplayXp,
      },
      miniGameSlug: miniGameSlug || undefined,
    };
  };

  const submit = (published: boolean) => {
    const payload = buildPayload();
    if ("error" in payload) {
      setState({ ok: false, error: payload.error });
      return;
    }
    startTransition(async () => {
      const res = await upsertLesson({ ...payload, published });
      setState(res);
      if (res.ok && mode === "create") {
        router.push(`/admin/lessons/${res.slug}`);
      }
    });
  };

  const togglePublish = (published: boolean) => {
    if (!initial.slug) return;
    startTransition(async () => {
      const res = await setLessonPublished(initial.slug!, published);
      setState(res);
      router.refresh();
    });
  };

  const confirmDelete = () => {
    if (!initial.slug) return;
    if (!window.confirm(`Delete lesson "${initial.slug}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const res = await deleteLesson(initial.slug!);
      if (res.ok) {
        router.push("/admin/lessons");
      } else {
        setState(res);
      }
    });
  };

  // ---- Render ----------------------------------------------------------

  const isLive = initial.published === true;

  return (
    <div className="space-y-4">
      {/* Status banner */}
      {state ? (
        <div
          role={state.ok ? "status" : "alert"}
          aria-live="polite"
          className={`rounded-lg border px-4 py-2 text-sm ${
            state.ok
              ? "border-[var(--camp-positive)]/50 bg-[var(--camp-positive)]/10"
              : "border-[var(--camp-danger)]/50 bg-[var(--camp-danger)]/10"
          }`}
        >
          {state.ok
            ? `Saved · ${state.slug ?? ""}`
            : state.error ?? "Save failed."}
          {state.fieldErrors ? (
            <ul className="mt-1 list-disc pl-5 text-xs">
              {Object.entries(state.fieldErrors).map(([k, v]) => (
                <li key={k}>
                  <span className="font-mono">{k}</span>: {v}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {/* Sticky action bar */}
      <CampCard className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {isLive ? (
            <CampChip tone="positive">Live</CampChip>
          ) : (
            <CampChip tone="warning">Draft</CampChip>
          )}
          {mode === "edit" && initial.slug ? (
            <Link
              href={`/student/lesson/${initial.slug}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[var(--camp-accent)] underline-offset-2 hover:underline"
            >
              Preview as student ↗
            </Link>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <CampButton intent="secondary" onClick={() => submit(false)} disabled={pending}>
            {pending ? "Saving..." : mode === "create" ? "Save as draft" : "Save"}
          </CampButton>
          <CampButton intent="primary" onClick={() => submit(true)} disabled={pending}>
            {pending ? "Saving..." : "Save & publish"}
          </CampButton>
          {mode === "edit" && initial.slug ? (
            <>
              {isLive ? (
                <CampButton intent="ghost" onClick={() => togglePublish(false)} disabled={pending}>
                  Unpublish
                </CampButton>
              ) : (
                <CampButton intent="ghost" onClick={() => togglePublish(true)} disabled={pending}>
                  Publish
                </CampButton>
              )}
              <CampButton intent="danger" onClick={confirmDelete} disabled={pending}>
                Delete
              </CampButton>
            </>
          ) : null}
        </div>
      </CampCard>

      {/* Basic info */}
      <Section title="Basics">
        <Grid>
          <Field label="Slug" path="slug" error={fieldError("slug")}>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              minLength={1}
              className="input"
              placeholder="dean-w1-d1-place-value"
              readOnly={mode === "edit"}
            />
          </Field>
          <Field label="Title" path="title" error={fieldError("title")}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input"
            />
          </Field>
          <Field label="Quest title (optional)">
            <input
              type="text"
              value={questTitle}
              onChange={(e) => setQuestTitle(e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Learning track">
            <SelectInput
              value={learningTrack}
              onChange={(v) => setLearningTrack(v as typeof learningTrack)}
              options={LEARNING_TRACKS.map((t) => ({ value: t, label: t }))}
            />
          </Field>
          <Field label="Subject">
            <SelectInput
              value={subject}
              onChange={(v) => setSubject(v as typeof subject)}
              options={SUBJECTS.map((s) => ({ value: s, label: s }))}
            />
          </Field>
          <Field label="Grade level">
            <NumberInput value={gradeLevel} onChange={setGradeLevel} min={1} max={12} />
          </Field>
          <Field label="Week">
            <NumberInput value={week} onChange={setWeek} min={1} max={12} />
          </Field>
          <Field label="Day">
            <NumberInput value={day} onChange={setDay} min={1} max={5} />
          </Field>
          <Field label="Type">
            <SelectInput
              value={lessonType}
              onChange={(v) => setLessonType(v as typeof lessonType)}
              options={LESSON_TYPES.map((t) => ({ value: t, label: t }))}
            />
          </Field>
          <Field label="Difficulty">
            <SelectInput
              value={difficulty}
              onChange={(v) => setDifficulty(v as typeof difficulty)}
              options={DIFFICULTIES.map((d) => ({ value: d, label: d }))}
            />
          </Field>
          <Field label="Estimated minutes">
            <NumberInput
              value={estimatedMinutes}
              onChange={setEstimatedMinutes}
              min={1}
              max={240}
            />
          </Field>
          <Field label="Mini-game (optional)">
            <SelectInput
              value={miniGameSlug}
              onChange={setMiniGameSlug}
              options={[
                { value: "", label: "None" },
                ...miniGames.map((m) => ({ value: m.slug, label: m.title })),
              ]}
            />
          </Field>
        </Grid>
      </Section>

      {/* Reward policy */}
      <Section title="Reward policy">
        <Grid>
          <Field label="XP">
            <NumberInput value={xp} onChange={setXp} min={0} />
          </Field>
          <Field label="Fun Money">
            <NumberInput value={funMoney} onChange={setFunMoney} min={0} />
          </Field>
          <Field label="Mastery threshold (0–100)">
            <NumberInput
              value={masteryThreshold}
              onChange={setMasteryThreshold}
              min={0}
              max={100}
            />
          </Field>
          <Field label="Allow replay practice XP">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={allowReplayXp}
                onChange={(e) => setAllowReplayXp(e.target.checked)}
                className="h-4 w-4 accent-[var(--camp-accent)]"
              />
              Yes
            </label>
          </Field>
        </Grid>
      </Section>

      {/* Tags + standards */}
      <Section title="Tags & standards">
        <Field label="Skill tags (one per line)">
          <textarea
            value={skillTagsText}
            onChange={(e) => setSkillTagsText(e.target.value)}
            rows={4}
            className="input font-mono"
            placeholder="place-value-3-digit&#10;rounding-to-10-and-100"
          />
        </Field>
        <Field
          label="Standards (JSON array)"
          path="standards"
          error={fieldError("standards")}
          hint={`Frameworks: ${STANDARDS_FRAMEWORKS.join(", ")}`}
        >
          <textarea
            value={standardsJson}
            onChange={(e) => setStandardsJson(e.target.value)}
            rows={6}
            className="input font-mono text-xs"
          />
        </Field>
      </Section>

      {/* Content */}
      <Section title="Content">
        <Field label="Hook">
          <textarea
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            rows={2}
            className="input"
          />
        </Field>
        <Field label="Story context (optional)">
          <textarea
            value={storyContext}
            onChange={(e) => setStoryContext(e.target.value)}
            rows={2}
            className="input"
          />
        </Field>
        <Field label="Learning goals (one per line)">
          <textarea
            value={learningGoalsText}
            onChange={(e) => setLearningGoalsText(e.target.value)}
            rows={4}
            className="input"
          />
        </Field>
        <Field label="Instruction">
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            rows={6}
            className="input"
            placeholder="Plain text or markdown-ish; newlines preserved in the lesson player."
          />
        </Field>
        <Field label="Main content (legacy field — leave blank if using Instruction)">
          <textarea
            value={mainContent}
            onChange={(e) => setMainContent(e.target.value)}
            rows={3}
            className="input"
          />
        </Field>
        <Field label="Examples (one per line)">
          <textarea
            value={examplesText}
            onChange={(e) => setExamplesText(e.target.value)}
            rows={3}
            className="input"
          />
        </Field>
        <Field label="Offline activity">
          <textarea
            value={offlineActivity}
            onChange={(e) => setOfflineActivity(e.target.value)}
            rows={2}
            className="input"
          />
        </Field>
        <Field label="Creative mission (optional)">
          <textarea
            value={creativeMission}
            onChange={(e) => setCreativeMission(e.target.value)}
            rows={2}
            className="input"
          />
        </Field>
        <Field label="Reflection prompt">
          <textarea
            value={reflectionPrompt}
            onChange={(e) => setReflectionPrompt(e.target.value)}
            rows={2}
            className="input"
          />
        </Field>
        <Field label="Fun facts (one per line)">
          <textarea
            value={funFactsText}
            onChange={(e) => setFunFactsText(e.target.value)}
            rows={3}
            className="input"
          />
        </Field>
      </Section>

      {/* Quiz */}
      <QuizSection quiz={quiz} setQuiz={setQuiz} />

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: var(--camp-surface-soft);
          color: var(--camp-ink);
          border: 1px solid var(--camp-border);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        }
        :global(.input:focus) {
          outline: none;
          border-color: var(--camp-accent);
          box-shadow: 0 0 0 1px var(--camp-accent);
        }
      `}</style>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <CampCard className="space-y-3">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="space-y-3">{children}</div>
    </CampCard>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  children,
  error,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  path?: string;
  error?: string;
  hint?: string;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-semibold uppercase tracking-widest text-camp-ink-muted">
        {label}
      </span>
      {children}
      {hint ? <span className="text-[0.7rem] text-camp-ink-muted">{hint}</span> : null}
      {error ? (
        <span
          role="alert"
          className="text-[0.7rem] text-[var(--camp-danger)]"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange(v: number): void;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      className="input"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange(v: string): void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    >
      {options.map((o) => (
        <option
          key={o.value}
          value={o.value}
          className="bg-[var(--camp-surface)] text-camp-ink"
        >
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ----- Quiz section ----------------------------------------------------

type QuizDraft = LessonEditorInitial["quiz"];

function QuizSection({
  quiz,
  setQuiz,
}: {
  quiz: NonNullable<QuizDraft>;
  setQuiz(q: NonNullable<QuizDraft>): void;
}) {
  const addQuestion = () => {
    setQuiz([
      ...quiz,
      {
        question: "",
        type: "multiple-choice",
        options: [],
        correctAnswer: "",
        explanation: "",
        points: 10,
        skillTag: "",
      },
    ]);
  };

  const update = (i: number, patch: Partial<NonNullable<QuizDraft>[number]>) => {
    setQuiz(quiz.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));
  };

  const remove = (i: number) => {
    setQuiz(quiz.filter((_, idx) => idx !== i));
  };

  return (
    <CampCard className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold">Quiz</h2>
        <CampButton intent="secondary" size="sm" onClick={addQuestion}>
          + Add question
        </CampButton>
      </div>
      {quiz.length === 0 ? (
        <p className="text-sm text-camp-ink-muted">
          No quiz questions yet. The Lesson Player falls back to a
          self-assessment when quiz is empty.
        </p>
      ) : null}
      <div className="space-y-3">
        {quiz.map((q, i) => (
          <QuizQuestionEditor
            key={i}
            index={i}
            question={q}
            onChange={(patch) => update(i, patch)}
            onRemove={() => remove(i)}
          />
        ))}
      </div>
    </CampCard>
  );
}

function QuizQuestionEditor({
  index,
  question,
  onChange,
  onRemove,
}: {
  index: number;
  question: NonNullable<QuizDraft>[number];
  onChange(patch: Partial<NonNullable<QuizDraft>[number]>): void;
  onRemove(): void;
}) {
  const options = useMemo(() => question.options ?? [], [question.options]);
  const optionsText = options.join("\n");

  return (
    <CampCardSoft className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-camp-ink-muted">
          Question {index + 1}
        </p>
        <CampButton intent="ghost" size="sm" onClick={onRemove}>
          Remove
        </CampButton>
      </div>
      <Field label="Question">
        <textarea
          value={question.question}
          onChange={(e) => onChange({ question: e.target.value })}
          rows={2}
          className="input"
        />
      </Field>
      <div className="grid gap-2 sm:grid-cols-2">
        <Field label="Type">
          <SelectInput
            value={question.type}
            onChange={(v) => onChange({ type: v as typeof question.type })}
            options={QUIZ_TYPES.map((t) => ({ value: t, label: t }))}
          />
        </Field>
        <Field label="Points">
          <NumberInput
            value={question.points ?? 10}
            onChange={(v) => onChange({ points: v })}
            min={1}
            max={100}
          />
        </Field>
      </div>
      {question.type === "multiple-choice" || question.type === "true-false" ? (
        <Field label="Options (one per line)">
          <textarea
            value={optionsText}
            onChange={(e) =>
              onChange({
                options: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
              })
            }
            rows={3}
            className="input"
            placeholder={question.type === "true-false" ? "True\nFalse" : "Option A\nOption B\nOption C"}
          />
        </Field>
      ) : null}
      <Field label="Correct answer">
        <input
          type="text"
          value={
            Array.isArray(question.correctAnswer)
              ? question.correctAnswer.join(", ")
              : String(question.correctAnswer ?? "")
          }
          onChange={(e) => onChange({ correctAnswer: e.target.value })}
          className="input"
          placeholder={
            question.type === "true-false" ? "True or False" : "Exact answer text"
          }
        />
      </Field>
      <Field label="Explanation (shown after answer)">
        <textarea
          value={question.explanation ?? ""}
          onChange={(e) => onChange({ explanation: e.target.value })}
          rows={2}
          className="input"
        />
      </Field>
      <Field label="Skill tag (optional)">
        <input
          type="text"
          value={question.skillTag ?? ""}
          onChange={(e) => onChange({ skillTag: e.target.value })}
          className="input"
          placeholder="e.g. place-value-3-digit"
        />
      </Field>
    </CampCardSoft>
  );
}
