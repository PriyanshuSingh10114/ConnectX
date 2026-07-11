import { useEffect, useState } from 'react';
import socketService from '../services/socket.service';

export const useSocket = (username) => {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());

  useEffect(() => {
    if (!username) return;

    const socket = socketService.connect();

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join', username);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('user:online', (users) => {
      setOnlineUsers(users);
    });

    socket.on('user:offline', (users) => {
      setOnlineUsers(users);
    });

    const handleTypingStart = (user) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.add(user);
        return newSet;
      });
    };

    const handleTypingStop = (user) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(user);
        return newSet;
      });
    };

    socket.on('typing:start', handleTypingStart);
    socket.on('typing:stop', handleTypingStop);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('user:online');
      socket.off('user:offline');
      socket.off('typing:start', handleTypingStart);
      socket.off('typing:stop', handleTypingStop);
      socketService.disconnect();
    };
  }, [username]);

  const emitTypingStart = () => {
    const socket = socketService.getSocket();
    if (socket) socket.emit('typing:start', username);
  };

  const emitTypingStop = () => {
    const socket = socketService.getSocket();
    if (socket) socket.emit('typing:stop', username);
  };

  const sendMessage = (message) => {
    const socket = socketService.getSocket();
    if (socket) socket.emit('message:send', { username, message });
  };

  return {
    isConnected,
    onlineUsers,
    typingUsers: Array.from(typingUsers),
    emitTypingStart,
    emitTypingStop,
    sendMessage,
    socket: socketService.getSocket(),
  };
};
