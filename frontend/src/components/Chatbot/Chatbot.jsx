import React, { useEffect, useState } from 'react';
import { voiceflowConfig } from '../../config/voiceflow';

const Chatbot = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only load once
    if (window.voiceflow || isLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.type = 'text/javascript';
    script.onload = () => {
      if (window.voiceflow) {
        window.voiceflow.chat.load({
          verify: { projectID: voiceflowConfig.projectID },
          url: voiceflowConfig.url,
          versionID: voiceflowConfig.versionID,
          voice: voiceflowConfig.voice,
          assistant: voiceflowConfig.assistant
        });
        setIsLoaded(true);
      }
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount if needed
      // Note: Voiceflow widget might not have a clean unmount method.
      // But adding this ensures React lifecycle safety.
    };
  }, [isLoaded]);

  return null;
};

export default Chatbot;
