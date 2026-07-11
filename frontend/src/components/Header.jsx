import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ConnectionBadge from './ConnectionBadge';
import { LogOut, Sun, Moon } from 'lucide-react';

const Header = ({ onlineCount, isConnected, toggleTheme, isDark }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white dark:bg-chat-secondary shadow px-4 py-3 flex items-center justify-between sticky top-0 z-10 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-chat-primary text-white flex items-center justify-center font-bold text-lg">
          {user?.username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            {user?.username}
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <ConnectionBadge isConnected={isConnected} />
            <span>{onlineCount} users online</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
        </button>
        <button
          onClick={logout}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 transition"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
