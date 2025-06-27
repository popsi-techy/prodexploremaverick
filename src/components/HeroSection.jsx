import React from 'react';
import '../styles/HeroSection.css';
import con1 from '../assets/conlogo1.png';
import con2 from '../assets/conlogo2.png';
import con3 from '../assets/conlogo3.png';
import con4 from '../assets/conlogo4.png';
import con5 from '../assets/conlogo5.png';
import bgVideo from '../assets/bgvideo.mp4';

const HeroSection = () => {
  return (
    <section className="hero">
      {/* Background Video */}
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <h1>Wander Lust</h1>
        <h2>Eager to World Traveler</h2>

        <p>
          Have you ever thought of travelling the world and wanted to explore different places.
          But you did not know anything about the place and cancelled your plan.
        </p>

        <p>
          Have you ever thought of travelling the world and wanted to explore different places.
          But you did not know anything about the place and cancelled your plan.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons">
          <a href="#blogs" className="explore-btn">Explore Blogs</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSd107lNGDM35NqvolP3u7MU0jeeVlzxb_5Wa0PIYuKA5BAyQg/viewform?usp=header" target="_blank" className="write-btn">Write Blog</a>
        </div>

        {/* Sponsor Logos */}
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
