import React from 'react';
import { cn } from '../utils/cn';

const ConnectionBadge = ({ isConnected }) => {
  return (
    <div className="flex items-center gap-1.5">
      <span className="relative flex h-2.5 w-2.5">
        {!isConnected && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        )}
        <span
          className={cn(
            'relative inline-flex rounded-full h-2.5 w-2.5 transition-colors duration-300',
            isConnected ? 'bg-green-500' : 'bg-red-500'
          )}
        ></span>
      </span>
      <span className={cn('text-xs font-medium', isConnected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
        {isConnected ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};

export default ConnectionBadge;
