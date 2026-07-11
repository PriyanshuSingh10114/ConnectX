import React, { forwardRef } from 'react';
import ChatBubble from './ChatBubble';

const MessageList = forwardRef(({ messages, currentUser }, ref) => {
  return (
    <div className="flex flex-col">
      {messages.map((msg, idx) => (
        <ChatBubble
          key={msg._id || idx}
          message={msg}
          isOwn={msg.username === currentUser.username}
        />
      ))}
      <div ref={ref} />
    </div>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
