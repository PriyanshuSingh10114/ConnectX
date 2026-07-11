import React from 'react';

const EmptyState = () => {
  return (
    <div className="flex justify-center my-4">
      <span className="bg-white dark:bg-chat-secondary px-4 py-2 rounded-full shadow text-sm text-gray-500 dark:text-gray-400">
        No messages yet. Start the conversation!
      </span>
    </div>
  );
};

export default EmptyState;
