import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="bg-white dark:bg-chat-secondary px-4 py-2 rounded-full shadow flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-chat-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Loading messages...
        </span>
      </div>
    </div>
  );
};

export default Loader;
