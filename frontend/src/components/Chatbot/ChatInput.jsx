import React, { useState, useRef, useEffect } from 'react';

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ChatInput = ({ onSendMessage, disabled, isConnecting }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || disabled) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Auto-resize textarea up to max height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={isConnecting ? "Connecting to AI assistant..." : "Ask about Hari's skills, projects, background..."}
        disabled={disabled}
        className="chat-textarea"
        aria-label="Ask a question about Hari's portfolio"
      />
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className="chat-send-btn"
        aria-label="Send message"
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default ChatInput;
