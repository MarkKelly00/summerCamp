import React, { useState, useEffect } from 'react';
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

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

interface Student {
  _id: string;
  username: string;
  profile: {
    name: string;
    age: number;
    gradeLevel: number;
  };
  funMoney: number;
  badges: any[];
  totalProgress: number;
}

interface Progress {
  _id: string;
  studentId: string;
  lessonId: {
    title: string;
    subject: string;
    week: number;
    day: number;
  };
  status: string;
  score: number;
  completedAt: Date;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchProgress(selectedStudent);
    }
  }, [selectedStudent]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      // For demo purposes, we'll use the known student IDs
      // In a real app, you'd have an endpoint to get all students
      const studentIds = ['son', 'daughter']; // These would come from an API
      const studentPromises = studentIds.map(id =>
        axios.get<Student>(`http://localhost:5001/api/users/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );
      
      const responses = await Promise.all(studentPromises);
      const studentsData = responses.map(r => r.data);
      setStudents(studentsData);
      if (studentsData.length > 0) {
        setSelectedStudent(studentsData[0]._id);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async (studentId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Progress[]>(
        `http://localhost:5001/api/progress/student/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const progressData = response.data;
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const getSubjectEmoji = (subject: string) => {
    const emojis: { [key: string]: string } = {
      math: '🧮',
      science: '🔬',
      reading: '📚',
      history: '🏛️'
    };
    return emojis[subject] || '📖';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-spin-slow">🌟</div>
          <p className="text-white text-xl font-kid mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="fun-card mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-purple-600 font-kid">
                👨‍💼 Admin Dashboard
              </h1>
              <p className="text-gray-600 font-kid">Monitor your children's learning progress</p>
            </div>
            <button
              onClick={onLogout}
              className="fun-button bg-red-500 text-sm font-kid"
            >
              👋 Logout
            </button>
          </div>
        </div>

        {/* Student Selector */}
        <div className="fun-card mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4 font-kid">
            👥 Select Student
          </h2>
          <div className="flex space-x-4">
            {students.map((student) => (
              <button
                key={student._id}
                onClick={() => setSelectedStudent(student._id)}
                className={`p-4 rounded-lg border-2 transition-all font-kid ${
                  selectedStudent === student._id
                    ? 'border-purple-500 bg-purple-100'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">
                    {student.profile.age === 6 ? '👦' : '👧'}
                  </div>
                  <p className="font-bold">{student.profile.name}</p>
                  <p className="text-sm text-gray-600">Grade {student.profile.gradeLevel}</p>
                  <p className="text-sm text-yellow-600">💰 ${student.funMoney}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Overview */}
        {selectedStudent && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Progress */}
            <div className="fun-card">
              <h3 className="text-xl font-bold text-purple-600 mb-4 font-kid">
                📊 Recent Progress
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {progress.slice(0, 10).map((item) => (
                  <div key={item._id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {getSubjectEmoji(item.lessonId.subject)}
                        </span>
                        <div>
                          <p className="font-bold font-kid text-sm">
                            {item.lessonId.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            Week {item.lessonId.week}, Day {item.lessonId.day}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(item.score)}`}>
                          {item.score}%
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="fun-card">
              <h3 className="text-xl font-bold text-purple-600 mb-4 font-kid">
                📈 Statistics
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-kid font-bold">Total Lessons Completed</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {progress.filter(p => p.status === 'completed').length}
                    </span>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-kid font-bold">Average Score</span>
                    <span className="text-2xl font-bold text-green-600">
                      {progress.length > 0 
                        ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length)
                        : 0}%
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-kid font-bold">Fun Money Earned</span>
                    <span className="text-2xl font-bold text-yellow-600">
                      ${students.find(s => s._id === selectedStudent)?.funMoney || 0}
                    </span>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-kid font-bold">Badges Earned</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {students.find(s => s._id === selectedStudent)?.badges.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 