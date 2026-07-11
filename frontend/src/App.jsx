import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';

function App() {
  const { user } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-chat-bg dark:bg-chat-darkBg transition-colors duration-200">
      {user ? (
        <ChatScreen toggleTheme={toggleTheme} isDark={isDark} />
      ) : (
        <LoginScreen />
      )}
    </div>
  );
}

export default App;
