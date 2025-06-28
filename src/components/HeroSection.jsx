import React, { useEffect, useRef, useState } from 'react';
import '../styles/HeroSection.css';

import con1 from '../assets/conlogo1.png';
import con2 from '../assets/conlogo2.png';
import con3 from '../assets/conlogo3.png';
import con4 from '../assets/conlogo4.png';
import con5 from '../assets/conlogo5.png';

import bgVideo1 from '../assets/bgvideo1.mp4';
import bgVideo2 from '../assets/bgvideo2.mp4';
import bgVideo3 from '../assets/bgvideo3.mp4';
import bgVideo4 from '../assets/bgvideo4.mp4';

const videoList = [bgVideo1, bgVideo2, bgVideo3, bgVideo4];

const HeroSection = () => {
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isAActive, setIsAActive] = useState(true);

  // Play the first video on mount
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

      // Set next video source on inactive player
      inactiveRef.src = videoList[nextIndex];
      inactiveRef.currentTime = 0;
      inactiveRef.play();

      // After a short delay, switch active player
      setTimeout(() => {
        setIsAActive(!isAActive);
        setCurrentVideo(nextIndex);
      }, 200); // small buffer before switching
    };

    activeRef.addEventListener('ended', handleEnded);
    return () => activeRef.removeEventListener('ended', handleEnded);
  }, [currentVideo, isAActive]);

  return (
    <section className="hero">
      {/* Two videos for crossfade */}
      <video
        ref={videoARef}
        className={`hero-video ${isAActive ? 'active' : 'inactive'}`}
        muted
        playsInline
      />
      <video
        ref={videoBRef}
        className={`hero-video ${!isAActive ? 'active' : 'inactive'}`}
        muted
        playsInline
      />

      <div className="overlay"></div>

      {/* Main content stays the same */}
      <div className="hero-content">
        <h1>Wander Lust</h1>
        <h2>Eager to World Traveler</h2>
        <p>
          Have you ever thought of travelling the world and wanted to explore different places.
          But you did not know anything about the place and cancelled your plan.
        </p>
        <p>
          Dream of exploring far-off lands, but find yourself stuck when you lack information? Don't let a lack of knowledge derail your next adventure.
        </p>
        <div className="hero-buttons">
          <a href="#blogs" className="explore-btn">Explore Blogs</a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd107lNGDM35NqvolP3u7MU0jeeVlzxb_5Wa0PIYuKA5BAyQg/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="write-btn"
          >
            Write Blog
          </a>
        </div>
        <div className="sponsor-box">
          <p>Explore 100+ countries</p>
          <div className="sponsor-logos">
            <img src={con1} alt="logo" />
            <img src={con2} alt="logo" />
            <img src={con3} alt="logo" />
            <img src={con4} alt="logo" />
            <img src={con5} alt="logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
