"use client";

/**
 * LessonPlayer — five-step lesson runner.
 *
 *   Step 0: Intro       hook + learning goals + optional warm-up CTA
 *   Step 1: Instruction main content + examples + checkpoints
 *   Step 2: Activity    offline activity + creative mission
 *   Step 3: Assess      quiz (if questions) or self-assessment fallback
 *   Step 4: Reflect     reflection prompt
 *   Step 5: Result      reward reveal (post-submission)
 *
 * The submission to `awardLessonCompletion` happens once when the student
 * advances past the Assess step. Replay resets to step 0 and reuses the
 * same lesson; `Progress.rewardGranted` prevents double-paying Fun Money.
 */

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2 } from "lucide-react";

import {
  awardLessonCompletion,
  type AwardLessonCompletionState,
} from "@/lib/actions/progress";
import { CampButton } from "@/components/ui/CampButton";
import { CampCard, CampCardSoft, CampKicker } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";

import { LessonQuizQuestion, type QuizAnswerCallback, type QuizQuestion } from "./LessonQuiz";
import { LessonResult } from "./LessonResult";
import { LessonSelfAssess } from "./LessonSelfAssess";

interface LessonForPlayer {
  id: string;
  slug: string;
  title: string;
  questTitle?: string;
  subject: string;
  week: number;
  day: number;
  lessonType: "core" | "bonus" | "capstone";
  estimatedMinutes: number;
  rewardPolicy: {
    xp: number;
    funMoney: number;
    masteryThreshold: number;
  };
  miniGameSlug?: string;
  content: {
    hook: string;
    storyContext?: string;
    learningGoals?: string[];
    instruction?: string;
    mainContent?: string;
    examples?: string[];
    checkpoints?: { prompt: string; expectedAnswer?: string; skillTag?: string }[];
    activities?: string[];
    offlineActivity?: string;
    creativeMission?: string;
    reflectionPrompt?: string;
    funFacts?: string[];
  };
  quiz: QuizQuestion[];
}

const STEP_LABELS = ["Intro", "Learn", "Do", "Assess", "Reflect", "Result"] as const;

interface Props {
  lesson: LessonForPlayer;
  studentId: string;
}

export function LessonPlayer({ lesson, studentId }: Props) {
  const [step, setStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswerCallback[]>([]);
  const [submitState, setSubmitState] =
    useState<AwardLessonCompletionState | null>(null);
  const [submitting, startTransition] = useTransition();
  const [startedAt] = useState(() => Date.now());

  const hasQuiz = lesson.quiz.length > 0;

  // Score calc:
  //   - quiz: weighted by points across answered questions
  //   - self-assess: takes the student's selection directly
  const quizScore = useMemo(() => {
    if (!hasQuiz || quizAnswers.length === 0) return null;
    const total = lesson.quiz.reduce((acc, q) => acc + (q.points || 10), 0);
    const earned = quizAnswers.reduce((acc, a) => {
      const q = lesson.quiz[a.questionIndex];
      if (!q) return acc;
      return a.isCorrect ? acc + (q.points || 10) : acc;
    }, 0);
    return Math.round((earned / Math.max(total, 1)) * 100);
  }, [hasQuiz, quizAnswers, lesson.quiz]);

  const canAdvanceAssess = hasQuiz
    ? quizAnswers.length >= lesson.quiz.length
    : false; // self-assess advances itself by calling submit()

  const handleQuizAnswer = (a: QuizAnswerCallback) => {
    setQuizAnswers((prev) => {
      // Replace prior answer to same question if user changed mind.
      const without = prev.filter((p) => p.questionIndex !== a.questionIndex);
      return [...without, a];
    });
  };

  const submit = (finalScore: number) => {
    setStep(5);
    startTransition(async () => {
      const res = await awardLessonCompletion({
        studentId,
        lessonId: lesson.id,
        score: finalScore,
        quizAnswers: quizAnswers.map((a) => ({
          questionIndex: a.questionIndex,
          answer: a.answer,
          isCorrect: a.isCorrect,
          timeSpent: a.timeSpent,
          skillTag: a.skillTag,
        })),
        timeSpent: Math.floor((Date.now() - startedAt) / 1000),
      });
      setSubmitState(res);
    });
  };

  const handleAdvanceAssess = () => {
    if (!hasQuiz) return;
    if (!canAdvanceAssess) return;
    setStep(4);
  };

  const handleReflectComplete = () => {
    const finalScore = hasQuiz ? (quizScore ?? 0) : 0;
    submit(finalScore);
  };

  const handleReplay = () => {
    setSubmitState(null);
    setQuizAnswers([]);
    setStep(0);
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <CampKicker>
            Week {lesson.week} · Day {lesson.day} · {lesson.subject}
          </CampKicker>
          <h1 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">
            {lesson.questTitle ?? lesson.title}
          </h1>
          <p className="mt-1 text-sm text-camp-ink-muted">{lesson.title}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {lesson.lessonType === "capstone" ? (
            <CampChip tone="accent">Capstone</CampChip>
          ) : lesson.lessonType === "bonus" ? (
            <CampChip tone="quest">Bonus</CampChip>
          ) : null}
          <CampChip tone="neutral">~{lesson.estimatedMinutes} min</CampChip>
          <Link href="/student/dashboard" className="text-xs text-camp-ink-muted underline-offset-2 hover:underline">
            ← Back to trail
          </Link>
        </div>
      </header>

      <Stepper current={step} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {step === 0 ? (
            <IntroStep lesson={lesson} onNext={() => setStep(1)} />
          ) : step === 1 ? (
            <InstructionStep
              lesson={lesson}
              onBack={() => setStep(0)}
              onNext={() => setStep(2)}
            />
          ) : step === 2 ? (
            <ActivityStep
              lesson={lesson}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          ) : step === 3 ? (
            <AssessStep
              lesson={lesson}
              quizAnswers={quizAnswers}
              onQuizAnswer={handleQuizAnswer}
              onBack={() => setStep(2)}
              onNext={hasQuiz ? handleAdvanceAssess : undefined}
              onSelfAssess={(score) => {
                // Self-assessment skips the explicit reflection step; we
                // still capture the prompt on screen but immediately move
                // to submission.
                submit(score);
              }}
              canAdvance={canAdvanceAssess}
              quizScore={quizScore}
            />
          ) : step === 4 ? (
            <ReflectStep
              lesson={lesson}
              onBack={() => setStep(3)}
              onComplete={handleReflectComplete}
            />
          ) : (
            <LessonResult
              state={submitState}
              submitting={submitting}
              onReplay={handleReplay}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ----- Stepper ----------------------------------------------------------

function Stepper({ current }: { current: number }) {
  return (
    <ol
      className="flex flex-wrap items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.16em]"
      aria-label="Lesson progress"
    >
      {STEP_LABELS.map((label, i) => (
        <li
          key={label}
          aria-current={i === current ? "step" : undefined}
          className={`rounded-full border px-2.5 py-1 ${
            i === current
              ? "border-[var(--camp-accent)] bg-[var(--camp-accent)]/15 text-[var(--camp-accent)]"
              : i < current
                ? "border-[var(--camp-positive)]/40 bg-[var(--camp-positive)]/10 text-[var(--camp-positive)]"
                : "border-[var(--camp-border)] bg-[var(--camp-surface-soft)]/60 text-camp-ink-muted"
          }`}
        >
          {label}
        </li>
      ))}
    </ol>
  );
}

// ----- Steps ------------------------------------------------------------

function IntroStep({
  lesson,
  onNext,
}: {
  lesson: LessonForPlayer;
  onNext(): void;
}) {
  return (
    <CampCard className="space-y-4">
      <div>
        <CampKicker>Start the quest</CampKicker>
        <p className="mt-2 text-base text-camp-ink">{lesson.content.hook}</p>
        {lesson.content.storyContext ? (
          <p className="mt-2 text-sm text-camp-ink-muted">
            {lesson.content.storyContext}
          </p>
        ) : null}
      </div>

      {lesson.content.learningGoals?.length ? (
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
            What you&apos;ll do
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-camp-ink">
            {lesson.content.learningGoals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {lesson.miniGameSlug ? (
        <CampCardSoft className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-camp-ink">
            <Gamepad2 className="h-4 w-4 text-[var(--camp-quest)]" />
            <span>
              Want a quick warm-up? Open the linked mini-game in a new tab.
            </span>
          </div>
          <Link
            href={`/student/mini-games/${lesson.miniGameSlug}`}
            target="_blank"
            rel="noreferrer"
          >
            <CampButton intent="secondary" size="sm">
              Open mini-game
            </CampButton>
          </Link>
        </CampCardSoft>
      ) : null}

      <StepFooter onNext={onNext} />
    </CampCard>
  );
}

function InstructionStep({
  lesson,
  onBack,
  onNext,
}: {
  lesson: LessonForPlayer;
  onBack(): void;
  onNext(): void;
}) {
  const text =
    lesson.content.instruction ||
    lesson.content.mainContent ||
    "Your instructor has not added detailed instruction for this quest yet — use the activity step to put it into practice.";

  return (
    <CampCard className="space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-[var(--camp-accent)]" />
        <h2 className="text-lg font-bold">Learn</h2>
      </div>
      <div className="prose prose-invert max-w-none text-sm text-camp-ink-muted prose-headings:text-camp-ink prose-strong:text-camp-ink">
        <p className="whitespace-pre-line text-base text-camp-ink">{text}</p>
      </div>

      {lesson.content.examples?.length ? (
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
            Examples
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-camp-ink-muted">
            {lesson.content.examples.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {lesson.content.checkpoints?.length ? (
        <div className="space-y-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
            Checkpoints
          </p>
          {lesson.content.checkpoints.map((c, i) => (
            <details
              key={i}
              className="rounded-lg border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-3 py-2 text-sm text-camp-ink"
            >
              <summary className="cursor-pointer font-semibold">
                {c.prompt}
              </summary>
              {c.expectedAnswer ? (
                <p className="mt-2 text-camp-ink-muted">{c.expectedAnswer}</p>
              ) : null}
            </details>
          ))}
        </div>
      ) : null}

      {lesson.content.funFacts?.length ? (
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
            Fun facts
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-camp-ink-muted">
            {lesson.content.funFacts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <StepFooter onBack={onBack} onNext={onNext} />
    </CampCard>
  );
}

function ActivityStep({
  lesson,
  onBack,
  onNext,
}: {
  lesson: LessonForPlayer;
  onBack(): void;
  onNext(): void;
}) {
  return (
    <CampCard className="space-y-4">
      <h2 className="text-lg font-bold">Do the work</h2>
      {lesson.content.offlineActivity ? (
        <CampCardSoft className="text-sm text-camp-ink">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
            Offline activity
          </p>
          <p className="mt-1">{lesson.content.offlineActivity}</p>
        </CampCardSoft>
      ) : null}
      {lesson.content.activities?.length ? (
        <ol className="list-decimal space-y-1 pl-5 text-sm text-camp-ink">
          {lesson.content.activities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ol>
      ) : null}
      {lesson.content.creativeMission ? (
        <CampCardSoft className="text-sm text-camp-ink">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--camp-quest)]">
            Creative mission
          </p>
          <p className="mt-1">{lesson.content.creativeMission}</p>
        </CampCardSoft>
      ) : null}
      <p className="text-xs text-camp-ink-muted">
        Take your notebook break here. When you&apos;re done, head to Assess.
      </p>
      <StepFooter onBack={onBack} onNext={onNext} nextLabel="I'm ready to assess" />
    </CampCard>
  );
}

function AssessStep({
  lesson,
  quizAnswers,
  onQuizAnswer,
  onBack,
  onNext,
  onSelfAssess,
  canAdvance,
  quizScore,
}: {
  lesson: LessonForPlayer;
  quizAnswers: QuizAnswerCallback[];
  onQuizAnswer(a: QuizAnswerCallback): void;
  onBack(): void;
  onNext?: () => void;
  onSelfAssess(score: number): void;
  canAdvance: boolean;
  quizScore: number | null;
}) {
  const hasQuiz = lesson.quiz.length > 0;
  return (
    <CampCard className="space-y-4">
      <h2 className="text-lg font-bold">Assess</h2>
      {hasQuiz ? (
        <>
          <p className="text-sm text-camp-ink-muted">
            Answer each question. You can change a previous answer if you
            change your mind.
          </p>
          <div className="space-y-6">
            {lesson.quiz.map((q, i) => (
              <div key={i}>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
                  Question {i + 1} / {lesson.quiz.length}
                </p>
                <div className="mt-2">
                  <LessonQuizQuestion
                    question={q}
                    questionIndex={i}
                    onAnswer={onQuizAnswer}
                  />
                </div>
              </div>
            ))}
          </div>
          {quizScore != null ? (
            <p className="text-sm text-camp-ink-muted">
              Running score:{" "}
              <span className="font-bold text-camp-ink">{quizScore} / 100</span>{" "}
              ({quizAnswers.length} / {lesson.quiz.length} answered)
            </p>
          ) : null}
          <StepFooter
            onBack={onBack}
            onNext={onNext}
            nextDisabled={!canAdvance}
            nextLabel="On to reflection"
          />
        </>
      ) : (
        <>
          <LessonSelfAssess onChoose={onSelfAssess} />
          <div className="flex justify-start">
            <CampButton intent="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-3 w-3" /> Back
            </CampButton>
          </div>
        </>
      )}
    </CampCard>
  );
}

function ReflectStep({
  lesson,
  onBack,
  onComplete,
}: {
  lesson: LessonForPlayer;
  onBack(): void;
  onComplete(): void;
}) {
  const prompt =
    lesson.content.reflectionPrompt ??
    "What's one thing you learned that you didn't know this morning?";
  return (
    <CampCard className="space-y-4">
      <h2 className="text-lg font-bold">Reflect</h2>
      <p className="text-base text-camp-ink">{prompt}</p>
      <p className="text-xs text-camp-ink-muted">
        Take a moment, then hit Finish to log your work and see your rewards.
      </p>
      <StepFooter
        onBack={onBack}
        onNext={onComplete}
        nextLabel="Finish quest"
      />
    </CampCard>
  );
}

function StepFooter({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
      {onBack ? (
        <CampButton intent="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-3 w-3" /> Back
        </CampButton>
      ) : (
        <span />
      )}
      {onNext ? (
        <CampButton intent="primary" onClick={onNext} disabled={nextDisabled}>
          {nextLabel} <ArrowRight className="h-3 w-3" />
        </CampButton>
      ) : null}
    </div>
  );
}
