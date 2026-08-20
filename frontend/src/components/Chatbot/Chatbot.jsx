import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const SUGGESTIONS = [
  "Tell me about Hari",
  "What projects has he built?",
  "What are his AI/ML skills?",
  "Tell me about TalentFlow",
  "What is Hari's education?",
  "How can I contact Hari?"
];

const INITIAL_WELCOME = {
  id: 'welcome-msg',
  sender: 'bot',
  text: "👋 Hi! I'm **Hari's AI Assistant**, powered by a local RAG pipeline with FAISS vector search.\n\nAsk me anything about Hari's **skills, AI systems, background, or projects**!"
};

const getApiBaseUrl = () => {
  // Support both Create-React-App and Vite env variables, with Render production fallback
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL.replace(/\/$/, '');
  }
  // Check Vite env safely
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL.replace(/\/$/, '');
    }
  } catch (e) {
    // Ignore
  }
  return 'https://portfolio-rag-backend-8c9f.onrender.com';
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      sender: 'user',
      text: text.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setStatusMessage('');

    // Cold-start timer notification for Render free-tier wakeups
    const wakeUpTimer = setTimeout(() => {
      setStatusMessage('AI assistant is waking up on Render (may take ~15s)...');
    }, 4000);

    const baseUrl = getApiBaseUrl();

    try {
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text.trim() })
      });

      clearTimeout(wakeUpTimer);
      setStatusMessage('');

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.answer || "I received your question but couldn't generate a response.",
        sources: data.sources || []
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      clearTimeout(wakeUpTimer);
      console.warn('RAG Chatbot request failed:', err);

      const errorMsg = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: "The AI assistant is currently waking up or connecting to the RAG backend. Please try again in a moment, or reach out to Hari directly via email or LinkedIn!"
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setStatusMessage('');
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_WELCOME]);
    setStatusMessage('');
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          className="chatbot-fab"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <div className="fab-icon-glow" />
          <SparklesIcon />
          <span className="fab-text">Ask AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="header-info">
              <div className="header-icon-badge">
                <SparklesIcon />
              </div>
              <div>
                <h3 className="header-title">Hari's AI Assistant</h3>
                <p className="header-subtitle">Powered by RAG & FAISS Vector Search</p>
              </div>
            </div>

            <div className="header-actions">
              <button
                onClick={handleClearChat}
                className="header-action-btn"
                title="Clear Chat History"
                aria-label="Clear chat"
              >
                <TrashIcon />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="header-action-btn close-btn"
                title="Close Chat"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="chatbot-body">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Loading / Status State */}
            {isLoading && (
              <div className="chat-loading-row">
                <div className="chat-avatar bot-avatar">
                  <SparklesIcon />
                </div>
                <div className="chat-typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            {statusMessage && (
              <div className="chat-status-banner">
                <span>{statusMessage}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="chatbot-suggestions">
            <span className="suggestions-label">Suggestions:</span>
            <div className="suggestions-scroll">
              {SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  className="suggestion-chip"
                  onClick={() => handleSendMessage(sug)}
                  disabled={isLoading}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="chatbot-footer">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
              isConnecting={Boolean(statusMessage)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
