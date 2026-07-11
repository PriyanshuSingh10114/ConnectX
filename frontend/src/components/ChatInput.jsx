import React, { useState, useEffect, useRef } from 'react';
import { Send, Smile } from 'lucide-react';

const ChatInput = ({ onSendMessage, onTypingStart, onTypingStop }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      onTypingStart();
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTypingStop();
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage('');
    setIsTyping(false);
    onTypingStop();
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-chat-bg dark:bg-chat-darkBg p-3 flex items-center gap-2">
      <button
        type="button"
        className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
        title="Emoji support coming soon"
      >
        <Smile size={24} />
      </button>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="flex-1 bg-white dark:bg-chat-secondary text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-chat-primary transition"
        maxLength={500}
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="p-2.5 bg-chat-primary text-white rounded-lg hover:bg-[#008f6f] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
      >
        <Send size={20} className="ml-1" />
      </button>
    </form>
  );
};

export default ChatInput;
