import React, { useEffect, useRef, useState } from 'react';
import '../styles/HeroSection.css';


import bgVideo1 from '../assets/bgvideo9.mp4';
import bgVideo2 from '../assets/bgvideo12.mp4';

import botGif from '../assets/bot.gif'; // Adjust path as needed


const videoList = [bgVideo1, bgVideo2];

// ... (all imports remain the same)

const HeroSection = () => {
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isAActive, setIsAActive] = useState(true);

  // AI Chat States
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Background video cycle logic
  useEffect(() => {
    const currentRef = videoARef.current;
    if (currentRef) {
      currentRef.src = videoList[0];
      currentRef.play();
    }
  }, []);

  useEffect(() => {
    const activeRef = isAActive ? videoARef.current : videoBRef.current;
    const handleEnded = () => {
      const nextIndex = (currentVideo + 1) % videoList.length;
      const inactiveRef = isAActive ? videoBRef.current : videoARef.current;

      inactiveRef.src = videoList[nextIndex];
      inactiveRef.currentTime = 0;
      inactiveRef.play();

      setTimeout(() => {
        setIsAActive(!isAActive);
        setCurrentVideo(nextIndex);
      }, 200);
    };

    activeRef.addEventListener('ended', handleEnded);
    return () => activeRef.removeEventListener('ended', handleEnded);
  }, [currentVideo, isAActive]);

  // 🧠 Ask AI
  const GEMINI_API_BASE_URL = import.meta.env.VITE_GEMINI_API_BASE_URL || 'http://localhost:3001'; // Fallback for local dev if not set
  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }
    setLoading(true);
    setAnswer('');
    setError(null);

    try {
      const response = await fetch(`${GEMINI_API_BASE_URL}/ask-gemini`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error("Error fetching Gemini answer:", err);
      setError('Failed to get an answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Clear everything
  const handleClear = () => {
    setQuestion('');
    setAnswer('');
    setError(null);
  };

  return (
    <section className="hero">
      {/* Background Video Crossfade */}
      <video ref={videoARef} className={`hero-video ${isAActive ? 'active' : 'inactive'}`} muted playsInline />
      <video ref={videoBRef} className={`hero-video ${!isAActive ? 'active' : 'inactive'}`} muted playsInline />
      <div className="overlay"></div>

      <div className="hero-content">
        <h1 className="fancy-heading">Wander Lust</h1>
        <h2 className="fancy-heading">Eager to World Traveler</h2>
        <p>
          Have you ever thought of travelling the world and wanted to explore different places.
          But you did not know anything about the place and cancelled your plan.
        </p>
        <p>
          Dream of exploring far-off lands, but find yourself stuck when you lack information? Don't let a lack of knowledge derail your next adventure.
        </p>

        {/* ✈️ AI Chat Box */}
        <div className="qa-section-glass">
          <div className="qa-heading-with-icon">
            <img src={botGif} alt="Bot" className="bot-gif" />
            <h3 className="qa-heading">Ask SnowAI about a destination!</h3>
          </div>

          <div className="qa-input-wrapper">
            <input
              type="text"
              className="qa-input-glass"
              placeholder="e.g., Best time to visit Paris?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAskQuestion();
              }}
            />
            
            <button
              className="qa-submit-btn"
              onClick={answer ? handleClear : handleAskQuestion}
              disabled={loading}
            >
              {loading ? 'Asking...' : answer ? 'Other Question' : 'Ask'}
            </button>
          </div>

          {/* Lock height to prevent layout shift */}
          {error && <p className="qa-error">{error}</p>}
          {answer && (
            <div className="qa-answer-box">
              <strong>Answer:</strong>
              <p>{answer}</p>
            </div>
          )}

        </div>


      </div>
    </section>
  );
};

export default HeroSection;
