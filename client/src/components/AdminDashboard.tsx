import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    _id?: string;
    title: string;
    subject: string;
    week: number;
    day: number;
  } | string;
  status: string;
  score: number;
  completedAt: Date;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'management'>('overview');
  
  // Password management state
  const [passwordForm, setPasswordForm] = useState({
    studentId: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  const navigate = useNavigate();

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
      const response = await api.get<Student[]>('/api/users/students');
      setStudents(response.data);
      if (response.data.length > 0) {
        setSelectedStudent(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async (studentId: string) => {
    try {
      const response = await api.get<Progress[]>(
        `/api/progress/student/${studentId}`
      );
      const progressData = response.data;
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('Passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      await api.patch(
        `/api/users/password/${passwordForm.studentId}`,
        { newPassword: passwordForm.newPassword }
      );
      setPasswordMessage('Password updated successfully!');
      setPasswordForm({ studentId: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordMessage(''), 3000);
    } catch (error: any) {
      console.error('Error updating password:', error);
      setPasswordMessage(error.response?.data?.message || 'Error updating password');
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

        {/* Navigation Tabs */}
        <div className="fun-card mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg font-kid font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📊 Progress Overview
            </button>
            <button
              onClick={() => setActiveTab('management')}
              className={`px-6 py-3 rounded-lg font-kid font-bold transition-all ${
                activeTab === 'management'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🔧 User Management
            </button>
          </div>
        </div>

        {/* Progress Overview Tab */}
        {activeTab === 'overview' && (
          <>
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
                    {progress.slice(0, 10).map((item) => {
                      const lessonId = typeof item.lessonId === 'string' ? item.lessonId : (item.lessonId._id || '');
                      const lesson = typeof item.lessonId === 'string' ? null : item.lessonId;
                      
                      return (
                        <button
                          key={item._id}
                          onClick={() => navigate(`/quiz-review/${selectedStudent}/${lessonId}`)}
                          className="w-full bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">
                                {getSubjectEmoji(lesson?.subject || 'reading')}
                              </span>
                              <div className="text-left">
                                <p className="font-bold font-kid text-sm">
                                  {lesson?.title || 'Lesson'}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Week {lesson?.week || 0}, Day {lesson?.day || 0}
                                </p>
                                <p className="text-xs text-blue-600 font-bold">
                                  👁️ Click to view quiz answers
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
                        </button>
                      );
                    })}
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
          </>
        )}

        {/* User Management Tab */}
        {activeTab === 'management' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student List */}
            <div className="fun-card">
              <h3 className="text-xl font-bold text-purple-600 mb-4 font-kid">
                👥 Student Accounts
              </h3>
              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student._id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {student.profile.age === 6 ? '👦' : '👧'}
                        </span>
                        <div>
                          <p className="font-bold font-kid">{student.profile.name}</p>
                          <p className="text-sm text-gray-600">Username: {student.username}</p>
                          <p className="text-sm text-gray-600">Grade {student.profile.gradeLevel}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPasswordForm({ ...passwordForm, studentId: student._id })}
                        className="fun-button bg-blue-500 text-sm font-kid"
                      >
                        🔑 Change Password
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Password Management */}
            <div className="fun-card">
              <h3 className="text-xl font-bold text-purple-600 mb-4 font-kid">
                🔐 Password Management
              </h3>
              {passwordForm.studentId ? (
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <p className="font-kid font-bold text-gray-700 mb-2">
                      Changing password for: {students.find(s => s._id === passwordForm.studentId)?.profile.name}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-kid">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none font-kid"
                      placeholder="Enter new password"
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-kid">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none font-kid"
                      placeholder="Confirm new password"
                      required
                      minLength={6}
                    />
                  </div>

                  {passwordMessage && (
                    <div className={`p-3 rounded font-kid text-sm ${
                      passwordMessage.includes('successfully') 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {passwordMessage}
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="fun-button bg-green-500 font-kid"
                    >
                      ✅ Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordForm({ studentId: '', newPassword: '', confirmPassword: '' });
                        setPasswordMessage('');
                      }}
                      className="fun-button bg-gray-500 font-kid"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 font-kid">
                    Select a student from the list to manage their password
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 