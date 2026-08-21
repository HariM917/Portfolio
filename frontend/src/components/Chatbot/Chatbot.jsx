import React, { useEffect, useState } from 'react';
import voiceflowConfig from '../../config/voiceflow';

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

const Chatbot = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);

  useEffect(() => {
    const projectID = voiceflowConfig.projectID;

    if (projectID && projectID !== 'YOUR_VOICEFLOW_PROJECT_ID') {
      setIsConfigured(true);

      const scriptId = 'voiceflow-widget-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'text/javascript';
        script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';

        script.onload = () => {
          if (window.voiceflow && window.voiceflow.chat) {
            window.voiceflow.chat.load({
              verify: { projectID: projectID },
              url: voiceflowConfig.url || 'https://general-runtime.voiceflow.com',
              versionID: voiceflowConfig.versionID || 'production',
              voice: voiceflowConfig.voice || {
                url: "https://runtime-api.voiceflow.com"
              },
              assistant: {
                title: voiceflowConfig.assistant.title,
                description: voiceflowConfig.assistant.description,
                color: voiceflowConfig.assistant.color
              }
            });
          }
        };

        document.body.appendChild(script);
      }
    } else {
      setIsConfigured(false);
    }
  }, []);

  // When configured, Voiceflow renders its own official launcher & UI
  if (isConfigured) {
    return null;
  }

  // Fallback setup guidance button when project ID is not yet provided in .env
  return (
    <div className="chatbot-wrapper">
      {!showSetupModal && (
        <button
          className="chatbot-fab"
          onClick={() => setShowSetupModal(true)}
          aria-label="Open Voiceflow AI Assistant Setup"
          id="voiceflow-chatbot-trigger"
        >
          <div className="fab-icon-glow" />
          <SparklesIcon />
          <span className="fab-text">Ask Hari AI</span>
        </button>
      )}

      {showSetupModal && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-info">
              <div className="header-icon-badge">
                <SparklesIcon />
              </div>
              <div>
                <h3 className="header-title">Voiceflow AI Assistant</h3>
                <p className="header-subtitle">Powered by Voiceflow Knowledge Base</p>
              </div>
            </div>
            <button
              onClick={() => setShowSetupModal(false)}
              className="header-action-btn close-btn"
              title="Close Setup"
              aria-label="Close setup modal"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="voiceflow-setup-body">
            <div className="voiceflow-setup-icon">
              <SparklesIcon />
            </div>
            <h4 className="voiceflow-setup-title">Voiceflow Chatbot Ready</h4>
            <p className="voiceflow-setup-desc">
              Connect your Voiceflow project to activate the AI assistant.
            </p>

            <div className="voiceflow-instructions-box">
              <span className="voiceflow-box-tag">Quick Setup</span>
              <ol>
                <li>Create an assistant on <strong>Voiceflow.com</strong></li>
                <li>Upload <code>voiceflow/Hari_Portfolio_Knowledge.md</code> to Knowledge Base</li>
                <li>Copy your <strong>Public Project ID</strong> from Web Chat Settings</li>
                <li>Add <code>REACT_APP_VOICEFLOW_PROJECT_ID</code> in <code>.env</code> or Vercel</li>
              </ol>
              <p className="voiceflow-box-note">
                See <strong style={{ color: 'var(--accent)' }}>voiceflow/VOICEFLOW_SETUP.md</strong> for step-by-step guide.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
