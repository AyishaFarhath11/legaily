// pages/ChatbotPage.js
import React, { useEffect } from 'react';
import legalAIImage from '../Assets/chatbot.png'; // Import the image from Assets folder

export default function ChatbotPage() {
  useEffect(() => {
    // Remove all scrolling from body and html
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Left side - with image in the middle */}
      <div 
        style={{ 
          width: '25%', 
          height: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Image positioned in the middle of the left container */}
        <img
          src={legalAIImage}
          alt="Legal Guidance Advice"
          style={{
            width: '80%',
            height: 'auto',
            objectFit: 'contain',
            maxHeight: '70vh',
          }}
        />
      </div>

      {/* Right side - Chatbot iframe - unchanged */}
      <div style={{ width: '70%', height: '95%' }}>
        <iframe
          src="http://localhost:8501"
          title="Chatbot"
          style={{
            width: '70%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    </div>
  );
}