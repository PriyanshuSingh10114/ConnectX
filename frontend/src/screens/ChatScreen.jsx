import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { useChat } from '../hooks/useChat';
import Header from '../components/Header';
import ChatInput from '../components/ChatInput';
import ChatBubble from '../components/ChatBubble';
import TypingIndicator from '../components/TypingIndicator';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import ErrorBanner from '../components/ErrorBanner';
import MessageList from '../components/MessageList';
import { useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const ChatScreen = ({ toggleTheme, isDark }) => {
  const { user } = useContext(AuthContext);
  const {
    isConnected,
    onlineUsers,
    typingUsers,
    emitTypingStart,
    emitTypingStop,
    sendMessage,
    socket,
  } = useSocket(user?.username);

  const { data: chatHistory, isLoading, isError } = useChat();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);
  
  // Local state to hold merged messages (history + new real-time messages)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatHistory?.data) {
      // Backend returns newest first (descending), so we reverse to show oldest top, newest bottom
      setMessages([...chatHistory.data].reverse());
    }
  }, [chatHistory]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    };

    socket.on('message:new', handleNewMessage);
    return () => {
      socket.off('message:new', handleNewMessage);
    };
  }, [socket]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  const handleSendMessage = async (text) => {
    try {
      // We could use optimistic update here, but we will rely on socket broadcast for consistency.
      // However, the requirement says "Store in MongoDB -> Broadcast".
      // We can directly call API or use Socket to send. Our backend handles socket 'message:send' which saves to DB.
      sendMessage(text);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#efeae2] dark:bg-[#0b141a]">
      <Header
        onlineCount={onlineUsers.length}
        isConnected={isConnected}
        toggleTheme={toggleTheme}
        isDark={isDark}
      />
      
      <main className="flex-1 overflow-y-auto p-4 scroll-smooth" style={{
        backgroundImage: isDark ? 'none' : 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: '400px',
        opacity: isDark ? 1 : 0.6
      }}>
        <div className="max-w-4xl mx-auto flex flex-col min-h-full justify-end">
          {isLoading && <Loader />}
          {isError && <ErrorBanner message="Failed to load chat history." />}
          {!isLoading && messages.length === 0 && <EmptyState />}

          <MessageList 
            messages={messages} 
            currentUser={user} 
            ref={messagesEndRef} 
          />

          <TypingIndicator users={typingUsers.filter((u) => u !== user.username)} />
        </div>
      </main>

      <footer className="mt-auto z-10 sticky bottom-0 w-full max-w-4xl mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-none">
        <ChatInput
          onSendMessage={handleSendMessage}
          onTypingStart={emitTypingStart}
          onTypingStop={emitTypingStop}
        />
      </footer>
    </div>
  );
};

export default ChatScreen;
