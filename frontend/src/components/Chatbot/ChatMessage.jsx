import React from 'react';

const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Simple formatter to handle bold text, line breaks, and links cleanly without heavy markdown dependencies
const formatMessageText = (text) => {
  if (!text) return '';

  // Process markdown bold (**text**)
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    // Link format [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-link"
        >
          {linkMatch[1]}
        </a>
      );
    }
    // Handle standard line breaks
    return part.split('\n').map((line, lIdx, arr) => (
      <React.Fragment key={`${index}-${lIdx}`}>
        {line}
        {lIdx < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  });
};

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`chat-message-row ${isUser ? 'user-row' : 'bot-row'}`}>
      <div className="chat-avatar">
        {isUser ? <UserIcon /> : <BotIcon />}
      </div>
      <div className="chat-bubble-container">
        <div className={`chat-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
          <div className="chat-text">
            {formatMessageText(message.text)}
          </div>
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="chat-sources">
            <span className="sources-label">Sources:</span>
            {message.sources.map((src, idx) => (
              <span key={idx} className="source-tag">{src}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
