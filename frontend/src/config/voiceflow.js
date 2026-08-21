/**
 * Voiceflow Chatbot Integration Configuration
 * Centralized configuration for official Voiceflow Webchat embed.
 * 
 * IMPORTANT SECURITY NOTE:
 * Only public client embed identifiers (projectID) should be configured here.
 * NEVER expose private Voiceflow API keys in frontend source code.
 */

const getEnvVar = (key, fallback = '') => {
  // Check Create-React-App environment
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  // Check Vite environment safely
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch (e) {
    // Ignore
  }
  return fallback;
};

export const voiceflowConfig = {
  // Public Voiceflow Project ID
  projectID: getEnvVar('REACT_APP_VOICEFLOW_PROJECT_ID') || getEnvVar('VITE_VOICEFLOW_PROJECT_ID') || '6a869ba2aa108d478a890108',

  // Runtime environment version ('production' or 'development')
  versionID: getEnvVar('REACT_APP_VOICEFLOW_VERSION_ID') || getEnvVar('VITE_VOICEFLOW_VERSION_ID') || 'production',

  // Voiceflow Runtime URL
  url: 'https://general-runtime.voiceflow.com',

  // Voice runtime API
  voice: {
    url: 'https://runtime-api.voiceflow.com'
  },

  // Assistant branding & appearance
  assistant: {
    title: "Hari's AI Assistant",
    description: "Ask anything about Hari's background, skills & projects",
    color: '#e8a838'
  }
};

export default voiceflowConfig;
