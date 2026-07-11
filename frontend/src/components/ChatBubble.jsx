import React from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { cn } from '../utils/cn';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const ChatBubble = ({ message, isOwn }) => {
  const formatTime = (dateString) => {
    const date = dayjs(dateString);
    if (date.isToday()) return date.format('h:mm A');
    if (date.isYesterday()) return `Yesterday, ${date.format('h:mm A')}`;
    return date.format('D MMM, h:mm A');
  };

  return (
    <div className={cn('flex w-full mb-3', isOwn ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] md:max-w-[65%] rounded-2xl px-4 py-2 relative group shadow-sm',
          isOwn
            ? 'bg-chat-bubbleOut text-gray-900 rounded-tr-none dark:bg-chat-bubbleOutDark dark:text-gray-100'
            : 'bg-chat-bubbleIn text-gray-900 rounded-tl-none dark:bg-chat-bubbleInDark dark:text-gray-100'
        )}
      >
        {!isOwn && (
          <div className="text-xs font-semibold text-chat-primary mb-1">
            {message.username}
          </div>
        )}
        <div className="text-[15px] leading-relaxed break-words">
          {message.message}
        </div>
        <div
          className={cn(
            'text-[11px] mt-1 text-right select-none',
            isOwn ? 'text-green-700/70 dark:text-green-300/60' : 'text-gray-500/80 dark:text-gray-400/80'
          )}
        >
          {formatTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
