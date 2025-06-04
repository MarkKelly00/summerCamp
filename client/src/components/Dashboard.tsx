import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

interface Lesson {
  _id: string;
  title: string;
  subject: 'math' | 'science' | 'reading' | 'history';
  week: number;
  day: number;
  estimatedTime: number;
  difficulty: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const subjectColors = {
    math: 'from-blue-400 to-blue-600',
    science: 'from-green-400 to-green-600',
    reading: 'from-purple-400 to-purple-600',
    history: 'from-orange-400 to-orange-600'
  };

  const subjectEmojis = {
    math: '🧮',
    science: '🔬',
    reading: '📚',
    history: '🏛️'
  };

  useEffect(() => {
    fetchLessons();
  }, [currentWeek]);

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Lesson[]>(
        `http://localhost:5001/api/lessons/${user.profile.gradeLevel}/${currentWeek}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const startLesson = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
  };

  const weekData = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fun-card mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-purple-600 font-kid">
                🌟 Welcome back, {user.profile.name}! 🌟
              </h1>
              <p className="text-gray-600 font-kid">Grade {user.profile.gradeLevel} • Ready to learn?</p>
            </div>
            <div className="text-right">
              <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold font-kid mb-2">
                💰 Fun Money: ${user.funMoney}
              </div>
              <button
                onClick={onLogout}
                className="fun-button bg-red-500 text-sm font-kid"
              >
                👋 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Week Selector */}
        <div className="fun-card mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4 font-kid">
            📅 Choose Your Week
          </h2>
          <div className="grid grid-cols-6 gap-2 md:grid-cols-12">
            {weekData.map((week) => (
              <button
                key={week}
                onClick={() => setCurrentWeek(week)}
                className={`p-3 rounded-lg font-bold font-kid transition-all ${
                  currentWeek === week
                    ? 'bg-purple-500 text-white scale-105'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Week {week}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="fun-card">
          <h2 className="text-2xl font-bold text-purple-600 mb-6 font-kid">
            📚 Week {currentWeek} Lessons
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="text-4xl animate-spin-slow">🌟</div>
              <p className="text-gray-600 font-kid mt-2">Loading your lessons...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className={`bg-gradient-to-br ${subjectColors[lesson.subject]} rounded-xl p-6 text-white transform transition-all hover:scale-105 cursor-pointer shadow-lg`}
                  onClick={() => startLesson(lesson._id)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{subjectEmojis[lesson.subject]}</div>
                    <h3 className="text-xl font-bold font-kid mb-2">{lesson.title}</h3>
                    <p className="text-sm opacity-90 font-kid mb-3">
                      Day {lesson.day} • {lesson.estimatedTime} minutes
                    </p>
                    <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-kid">
                      {lesson.difficulty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Badges Section */}
        {user.badges && user.badges.length > 0 && (
          <div className="fun-card mt-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4 font-kid">
              🏆 Your Badges
            </h2>
            <div className="flex flex-wrap gap-4">
              {user.badges.map((badge, index) => (
                <div
                  key={index}
                  className="badge-glow bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-4 text-center"
                >
                  <div className="text-2xl">{badge.icon || '🏆'}</div>
                  <p className="text-xs font-bold font-kid text-yellow-900 mt-1">
                    {badge.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 