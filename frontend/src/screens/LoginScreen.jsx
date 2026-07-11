import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MessageSquare } from 'lucide-react';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed.length < 3 || trimmed.length > 20) {
      setError('Username must be between 3 and 20 characters.');
      return;
    }
    login(trimmed);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-chat-bg dark:bg-chat-darkBg p-4">
      <div className="bg-white dark:bg-chat-secondary p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-chat-primary text-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <MessageSquare size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome to ConnectX</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
            Enter a username to join the global chat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-chat-primary focus:border-transparent transition"
              placeholder="e.g. JohnDoe"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-chat-primary hover:bg-[#008f6f] text-white font-semibold py-3 px-4 rounded-lg shadow transition transform active:scale-95"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
