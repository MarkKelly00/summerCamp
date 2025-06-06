import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

interface Quiz {
  question: string;
  type: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
}

interface Lesson {
  _id: string;
  title: string;
  subject: string;
  quiz: Quiz[];
}

interface QuizAnswer {
  questionIndex: number;
  answer: string;
  isCorrect: boolean;
  timeSpent: number;
}

interface Progress {
  _id: string;
  score: number;
  completedAt: Date;
  quizAnswers: QuizAnswer[];
  lessonId: Lesson;
}

interface QuizReviewData {
  progress: Progress;
  quizAnswers: QuizAnswer[];
  score: number;
  completedAt: Date;
}

const QuizReview: React.FC = () => {
  const { studentId, lessonId } = useParams<{ studentId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState<QuizReviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId, lessonId]);

  const fetchQuizReview = async () => {
    try {
      const response = await api.get<QuizReviewData>(
        `/api/progress/quiz-review/${studentId}/${lessonId}`
      );
      setReviewData(response.data);
    } catch (error) {
      console.error('Error fetching quiz review:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSubjectEmoji = (subject: string) => {
    switch (subject) {
      case 'math': return '🔢';
      case 'science': return '🔬';
      case 'reading': return '📚';
      case 'history': return '🏛️';
      default: return '📖';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-spin-slow">🌟</div>
          <p className="text-white text-xl font-kid mt-4">Loading quiz review...</p>
        </div>
      </div>
    );
  }

  if (!reviewData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl">😕</div>
          <p className="text-white text-xl font-kid mt-4">Quiz review not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 fun-button bg-purple-500 font-kid"
          >
            ⬅️ Go Back
          </button>
        </div>
      </div>
    );
  }

  const { progress } = reviewData;
  const lesson = progress.lessonId;

  // Get quiz answers - check both sources
  const quizAnswers = reviewData.quizAnswers || progress.quizAnswers || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="fun-card mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{getSubjectEmoji(lesson.subject)}</span>
              <div>
                <h1 className="text-2xl font-bold text-purple-600 font-kid">
                  Quiz Review: {lesson.title}
                </h1>
                <p className="text-gray-600 font-kid">
                  Completed on {new Date(progress.completedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="fun-button bg-gray-500 font-kid"
            >
              ⬅️ Back
            </button>
          </div>

          {/* Score Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-kid font-bold text-lg">Final Score:</span>
              <span className={`px-4 py-2 rounded-full font-bold text-xl ${getScoreColor(progress.score)}`}>
                {progress.score}%
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600 font-kid">
              {quizAnswers.filter(qa => qa.isCorrect).length} out of {lesson.quiz.length} questions correct
            </div>
          </div>
        </div>

        {/* Question by Question Review */}
        <div className="space-y-6">
          {lesson.quiz.map((question, index) => {
            const studentAnswer = quizAnswers.find(qa => qa.questionIndex === index);
            const isCorrect = studentAnswer?.isCorrect || false;
            
            return (
              <div key={index} className="fun-card">
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 font-kid mb-3">
                      Question {index + 1}: {question.question}
                    </h3>
                    
                    {/* Answer Options */}
                    <div className="space-y-2 mb-4">
                      {question.options?.map((option, optionIndex) => {
                        const isStudentAnswer = studentAnswer?.answer === option;
                        const isCorrectAnswer = question.correctAnswer === option;
                        
                        let optionClass = 'p-3 rounded-lg border-2 font-kid ';
                        if (isCorrectAnswer) {
                          optionClass += 'border-green-500 bg-green-100 text-green-800';
                        } else if (isStudentAnswer && !isCorrect) {
                          optionClass += 'border-red-500 bg-red-100 text-red-800';
                        } else {
                          optionClass += 'border-gray-200 bg-gray-50 text-gray-600';
                        }
                        
                        return (
                          <div key={optionIndex} className={optionClass}>
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              <div className="flex space-x-2">
                                {isCorrectAnswer && (
                                  <span className="text-green-600 font-bold">✓ Correct</span>
                                )}
                                {isStudentAnswer && (
                                  <span className="text-blue-600 font-bold">👤 Your Answer</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Explanation */}
                    {question.explanation && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                        <h4 className="font-bold text-blue-800 font-kid mb-2">💡 Explanation:</h4>
                        <p className="text-blue-700 font-kid">{question.explanation}</p>
                      </div>
                    )}
                    
                    {/* Points */}
                    <div className="mt-3 text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isCorrect ? `+${question.points}` : '0'} points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="fun-card mt-6">
          <h3 className="text-xl font-bold text-purple-600 font-kid mb-4">📊 Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {quizAnswers.filter(qa => qa.isCorrect).length}
              </div>
              <div className="text-green-700 font-kid">Correct Answers</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">
                {quizAnswers.filter(qa => !qa.isCorrect).length}
              </div>
              <div className="text-red-700 font-kid">Incorrect Answers</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {quizAnswers.filter(qa => qa.isCorrect).reduce((sum, qa) => {
                  const question = lesson.quiz[qa.questionIndex];
                  return sum + (question?.points || 0);
                }, 0)}
              </div>
              <div className="text-blue-700 font-kid">Points Earned</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizReview; 