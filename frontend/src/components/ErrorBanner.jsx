import React from 'react';

const ErrorBanner = ({ message = 'An error occurred.' }) => {
  return (
    <div className="flex justify-center my-4">
      <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-4 py-2 rounded-full shadow text-sm">
        {message}
      </span>
    </div>
  );
};

export default ErrorBanner;
