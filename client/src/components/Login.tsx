import React, { useState } from 'react';
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

interface LoginProps {
  onLogin: (user: User, token: string) => void;
}

interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post<LoginResponse>('http://localhost:5001/api/auth/login', {
        username,
        password
      });

      const { user, token } = response.data;
      onLogin(user, token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 px-4">
      <div className="max-w-md w-full">
        <div className="fun-card text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-600 mb-2 font-kid">
              🌟 Summer Camp Learning! 🌟
            </h1>
            <p className="text-gray-600 text-lg font-kid">
              Let's learn and have fun together!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 font-kid">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg font-kid"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 font-kid">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg font-kid"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded font-kid">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full fun-button bg-gradient-to-r from-purple-500 to-pink-500 disabled:opacity-50 font-kid text-lg"
            >
              {loading ? '🔄 Logging in...' : '🚀 Let\'s Go!'}
            </button>
          </form>

          <div className="mt-8 space-y-2">
            <p className="text-sm text-gray-600 font-kid">Quick Login:</p>
            <div className="flex space-x-2">
              <button
                onClick={() => quickLogin('son', 'son123')}
                className="fun-button bg-blue-500 text-sm font-kid"
              >
                👦 Dean
              </button>
              <button
                onClick={() => quickLogin('daughter', 'daughter123')}
                className="fun-button bg-pink-500 text-sm font-kid"
              >
                👧 Addie
              </button>
              <button
                onClick={() => quickLogin('admin', 'admin123')}
                className="fun-button bg-gray-600 text-sm font-kid"
              >
                👨‍💼 Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 