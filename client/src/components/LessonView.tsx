import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

interface User {
  id: string;
  username: string;
  role: 'student' | 'admin';
  profile: {
    name: string;
    age: number;
    gradeLevel: number;
  };
  funMoney: number;
  badges: any[];
}

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
  introduction: string;
  content: string;
  activities: string[];
  funFacts: string[];
  vocabulary: string[];
  quiz: Quiz[];
  estimatedTime: number;
  difficulty: string;
  funMoney: number;
}

interface LessonViewProps {
  user: User;
  token: string;
  onUserUpdate: (user: User) => void;
}

const LessonView: React.FC<LessonViewProps> = ({ user, token, onUserUpdate }) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lessonId) {
      fetchLesson();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const response = await api.get<Lesson>(
        `/api/lessons/lesson/${lessonId}`
      );
      setLesson(response.data);
      setQuizAnswers(new Array(response.data.quiz.length).fill(''));
    } catch (error) {
      console.error('Error fetching lesson:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answer;
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    if (!lesson) return;

    let correctCount = 0;
    let totalPoints = 0;
    const detailedQuizAnswers: Array<{
      questionIndex: number;
      answer: string;
      isCorrect: boolean;
      timeSpent: number;
    }> = [];
    
    lesson.quiz.forEach((question, index) => {
      const correctAnswerText = typeof question.correctAnswer === 'number' 
        ? question.options?.[question.correctAnswer] 
        : question.correctAnswer;
      const isCorrect = quizAnswers[index] === correctAnswerText;
      
      if (isCorrect) {
        correctCount++;
        totalPoints += question.points;
      }
      
      detailedQuizAnswers.push({
        questionIndex: index,
        answer: quizAnswers[index],
        isCorrect,
        timeSpent: 0 // Could be enhanced to track actual time per question
      });
    });

    const finalScore = Math.round((correctCount / lesson.quiz.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    // Save progress with detailed quiz answers
    try {
      await api.post(`/api/progress/lesson/${lessonId}`, {
        studentId: user.id,
        status: 'completed',
        score: finalScore,
        quizAnswers: detailedQuizAnswers,
        timeSpent: lesson.estimatedTime
      });

      // Update user's fun money in the database
      if (totalPoints > 0) {
        const funMoneyResponse = await api.patch<User>(`/api/users/funmoney/${user.id}`, {
          amount: totalPoints
        });
        
        // Update local user state with the response from the server
        onUserUpdate(funMoneyResponse.data);
      }
    } catch (error) {
      console.error('Error submitting lesson:', error);
    }
  };

  // Helper function to parse markdown-style content
  const parseMarkdownContent = (content: string) => {
    if (!content) return null;

    // Split content by double newlines to get paragraphs
    const sections = content.split('\n\n');
    
    return sections.map((section, index) => {
      // Check for headers
      if (section.startsWith('## ')) {
        return (
          <h3 key={index} className="text-xl font-bold text-purple-700 font-kid mt-6 mb-3">
            {section.replace('## ', '')}
          </h3>
        );
      } else if (section.startsWith('### ')) {
        return (
          <h4 key={index} className="text-lg font-bold text-purple-600 font-kid mt-4 mb-2">
            {section.replace('### ', '')}
          </h4>
        );
      }
      
      // Check for lists
      if (section.includes('\n-') || section.startsWith('-')) {
        const listItems = section.split('\n').filter(line => line.trim().startsWith('-'));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-800 font-kid leading-relaxed">
                {item.replace(/^-\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .split(/<strong>|<\/strong>/).map((part, i) => 
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
              </li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraphs with bold text support
      const parts = section.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={index} className="text-gray-800 font-kid leading-relaxed text-lg mb-4">
          {parts.map((part, i) => 
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          )}
        </p>
      );
    });
  };

  const getStepTitle = () => {
    if (currentStep === 0) return 'Introduction';
    if (currentStep === 1) return 'Learn';
    if (currentStep === 2) return 'Activities';
    if (currentStep === 3) return 'Fun Facts';
    return 'Quiz Time!';
  };

  const renderCurrentStep = () => {
    if (!lesson) {
      return (
        <div className="text-center">
          <div className="text-6xl animate-spin-slow">🌟</div>
          <p className="text-gray-700 font-kid">Loading lesson content...</p>
        </div>
      );
    }

    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-purple-600 font-kid">
              {lesson.title}
            </h2>
            <p className="text-lg text-gray-700 font-kid leading-relaxed">
              {lesson.introduction}
            </p>
            <div className="text-6xl animate-bounce-slow">📚</div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-600 font-kid">
              Let's Learn! 🎓
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
              {parseMarkdownContent(lesson.content)}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-600 font-kid">
              Fun Activities! 🎯
            </h2>
            <div className="space-y-4">
              {lesson.activities && lesson.activities.length > 0 ? (
                lesson.activities.map((activity, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-gray-800 font-kid">{activity}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 font-kid">No activities available for this lesson.</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-600 font-kid">
              Fun Facts! 🤓
            </h2>
            <div className="space-y-4">
              {lesson.funFacts && lesson.funFacts.length > 0 ? (
                lesson.funFacts.map((fact, index) => (
                  <div key={index} className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">💡</span>
                      <p className="text-gray-800 font-kid">{fact}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 font-kid">No fun facts available for this lesson.</p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-600 font-kid">
              Quiz Time! 🧠
            </h2>
            {showResults ? (
              <div className="text-center space-y-6">
                <div className="text-6xl">
                  {score >= 80 ? '🎉' : score >= 60 ? '😊' : '😅'}
                </div>
                <h3 className="text-3xl font-bold font-kid">
                  Your Score: {score}%
                </h3>
                <p className="text-lg font-kid">
                  {score >= 80 ? 'Excellent work!' : score >= 60 ? 'Good job!' : 'Keep practicing!'}
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="fun-button bg-green-500 font-kid"
                >
                  🏠 Back to Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {lesson.quiz && lesson.quiz.length > 0 ? (
                  lesson.quiz.map((question, qIndex) => (
                    <div key={qIndex} className="bg-white border-2 border-purple-200 p-6 rounded-lg">
                      <h4 className="text-lg font-bold text-gray-800 font-kid mb-4">
                        Question {qIndex + 1}: {question.question}
                      </h4>
                      <div className="space-y-2">
                        {question.options?.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            onClick={() => handleQuizAnswer(qIndex, option)}
                            className={`w-full p-3 text-left rounded-lg border-2 transition-all font-kid ${
                              quizAnswers[qIndex] === option
                                ? 'border-purple-500 bg-purple-100'
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 font-kid">No quiz available for this lesson.</p>
                )}
                {lesson.quiz && lesson.quiz.length > 0 && (
                  <button
                    onClick={submitQuiz}
                    disabled={quizAnswers.some(answer => !answer)}
                    className="w-full fun-button bg-purple-500 disabled:opacity-50 font-kid"
                  >
                    🚀 Submit Quiz
                  </button>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-spin-slow">🌟</div>
          <p className="text-white text-xl font-kid mt-4">Loading your lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="fun-card mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-600 font-kid">
              {getStepTitle()}
            </h1>
            <button
              onClick={() => navigate('/')}
              className="fun-button bg-red-500 text-sm font-kid"
            >
              🏠 Home
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 font-kid mt-1">
              Step {currentStep + 1} of 5
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="fun-card mb-6 min-h-96">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="fun-button bg-gray-500 disabled:opacity-50 font-kid"
          >
            ⬅️ Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            disabled={currentStep === 4}
            className="fun-button bg-purple-500 disabled:opacity-50 font-kid"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonView; 