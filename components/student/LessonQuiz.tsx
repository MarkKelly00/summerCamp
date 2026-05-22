"use client";

/**
 * Renders one quiz question of any of the four supported types.
 * Reports the user's answer + correctness via callback to the parent
 * LessonPlayer, which aggregates the score across questions.
 */

import { useState } from "react";

import { CampButton } from "@/components/ui/CampButton";
import { CampChip } from "@/components/ui/CampChip";

export interface QuizQuestion {
  question: string;
  type: "multiple-choice" | "true-false" | "fill-blank" | "short-answer";
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  skillTag?: string;
}

export interface QuizAnswerCallback {
  questionIndex: number;
  answer: string | string[];
  isCorrect: boolean;
  timeSpent: number;
  skillTag?: string;
}

interface LessonQuizQuestionProps {
  question: QuizQuestion;
  questionIndex: number;
  onAnswer(payload: QuizAnswerCallback): void;
}

function normalize(value: string | string[]): string {
  if (Array.isArray(value)) return value.join("|").toLowerCase().trim();
  return String(value).toLowerCase().trim();
}

export function LessonQuizQuestion({
  question,
  questionIndex,
  onAnswer,
}: LessonQuizQuestionProps) {
  const [selected, setSelected] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [start] = useState(Date.now());

  const submit = () => {
    const correct = normalize(question.correctAnswer) === normalize(selected);
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer({
      questionIndex,
      answer: selected,
      isCorrect: correct,
      timeSpent: Date.now() - start,
      skillTag: question.skillTag,
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-base font-semibold text-camp-ink">{question.question}</p>

      {question.type === "multiple-choice" && question.options?.length ? (
        <div className="space-y-2">
          {question.options.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition ${
                selected === opt
                  ? "border-[var(--camp-accent)] bg-[var(--camp-accent)]/10"
                  : "border-[var(--camp-border)] bg-[var(--camp-surface-soft)] hover:border-[var(--camp-accent)]/60"
              } ${submitted ? "cursor-not-allowed opacity-80" : ""}`}
            >
              <input
                type="radio"
                name={`q-${questionIndex}`}
                value={opt}
                checked={selected === opt}
                disabled={submitted}
                onChange={(e) => setSelected(e.target.value)}
                className="h-4 w-4 accent-[var(--camp-accent)]"
              />
              <span className="text-sm text-camp-ink">{opt}</span>
            </label>
          ))}
        </div>
      ) : null}

      {question.type === "true-false" ? (
        <div className="flex gap-2">
          {["True", "False"].map((opt) => (
            <CampButton
              key={opt}
              type="button"
              intent={selected === opt ? "primary" : "secondary"}
              onClick={() => !submitted && setSelected(opt)}
              disabled={submitted}
            >
              {opt}
            </CampButton>
          ))}
        </div>
      ) : null}

      {(question.type === "fill-blank" || question.type === "short-answer") ? (
        <textarea
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          disabled={submitted}
          rows={question.type === "short-answer" ? 4 : 2}
          placeholder="Type your answer..."
          className="w-full rounded-lg border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-3 py-2 text-sm text-camp-ink placeholder:text-camp-ink-muted/60 focus:border-[var(--camp-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--camp-accent)] disabled:opacity-80"
        />
      ) : null}

      {!submitted ? (
        <CampButton
          type="button"
          onClick={submit}
          disabled={!selected.trim()}
          intent="primary"
        >
          Submit answer
        </CampButton>
      ) : (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            isCorrect
              ? "border-[var(--camp-positive)]/50 bg-[var(--camp-positive)]/10"
              : "border-[var(--camp-warning)]/50 bg-[var(--camp-warning)]/10"
          }`}
          role={isCorrect ? "status" : "alert"}
        >
          <div className="flex items-center gap-2">
            <CampChip tone={isCorrect ? "positive" : "warning"}>
              {isCorrect ? "Correct" : "Not quite"}
            </CampChip>
            {!isCorrect ? (
              <span className="text-xs text-camp-ink-muted">
                Correct answer:{" "}
                <span className="font-semibold text-camp-ink">
                  {Array.isArray(question.correctAnswer)
                    ? question.correctAnswer.join(", ")
                    : question.correctAnswer}
                </span>
              </span>
            ) : null}
          </div>
          {question.explanation ? (
            <p className="mt-2 text-camp-ink-muted">{question.explanation}</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
