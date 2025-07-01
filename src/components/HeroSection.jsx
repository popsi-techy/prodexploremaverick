import React, { useEffect, useRef, useState } from 'react';
import '../styles/HeroSection.css';

import con1 from '../assets/conlogo1.png';
import con2 from '../assets/conlogo2.png';
import con3 from '../assets/conlogo3.png';
import con4 from '../assets/conlogo4.png';
import con5 from '../assets/conlogo5.png';

import bgVideo1 from '../assets/bgvideo3.mp4';
import bgVideo2 from '../assets/bgvideo2.mp4';
import bgVideo3 from '../assets/bgvideo1.mp4';
import bgVideo4 from '../assets/bgvideo4.mp4';

const videoList = [bgVideo1, bgVideo2, bgVideo3, bgVideo4];

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
          <h3 className="qa-heading">Ask AI about a destination!</h3>

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
            {question && (
              <button className="qa-clear-btn" onClick={handleClear} title="Clear">
                &#x21bb; {/* Unicode for ↻ */}
              </button>
            )}
            <button
              className="qa-submit-btn"
              onClick={handleAskQuestion}
              disabled={loading}
            >
              {loading ? 'Asking...' : 'Ask'}
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

        {/* 🎯 Sponsors (Commented Out) */}
        {/*
        <div className="sponsor-box">
          <p>Explore Places</p>
          <div className="slider-container">
            <div className="slider-track">
              <img src={con1} alt="logo" />
              <img src={con2} alt="logo" />
              <img src={con3} alt="logo" />
              <img src={con4} alt="logo" />
              <img src={con5} alt="logo" />
              <img src={con1} alt="logo" />
              <img src={con2} alt="logo" />
              <img src={con3} alt="logo" />
              <img src={con4} alt="logo" />
              <img src={con5} alt="logo" />
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default HeroSection;
