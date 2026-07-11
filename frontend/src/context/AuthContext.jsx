import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('chat_username');
    if (storedUser) {
      setUser({ username: storedUser });
    }
  }, []);

  const login = (username) => {
    localStorage.setItem('chat_username', username);
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem('chat_username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
