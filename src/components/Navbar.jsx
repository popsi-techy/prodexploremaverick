// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

// Import your PNG logos (assuming you've placed them in src/assets)
import WanderlustLogoWhite from '../assets/wanderlust-logo-white.png';
import WanderlustLogoBlack from '../assets/wanderlust-logo-black.png';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroSectionHeight = heroSection.offsetHeight;
        // Adjust this value if you want the color change to happen earlier or later
        if (window.scrollY > heroSectionHeight - 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        // Fallback if hero-section ID isn't found, just check general scroll
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="/" className="logo">
          {/* Conditionally render the correct PNG based on scroll state */}
          <img
            src={isScrolled ? WanderlustLogoBlack : WanderlustLogoWhite}
            alt="Wanderlust Logo"
            className="logo-image"
          />
        </a>

        {/* Hamburger menu icon */}
        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="/" onClick={() => setIsMenuOpen(false)}>Home</a></li>
          <li><a href="#blogs" onClick={() => setIsMenuOpen(false)}>Blogs</a></li>
          <li><a href="#faqs" onClick={() => setIsMenuOpen(false)}>FAQs</a></li>
          {/* Removed the redundant 'Write Blog' text link from here */}
          {/* The dynamic-border-button-mobile is now the ONLY "Write Blog" button in the mobile menu */}
          <li>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd107lNGDM35NqvolP3u7MU0jeeVlzxb_5Wa0PIYuKA5BAyQg/viewform?usp=header"
              className="dynamic-border-button-mobile" // This is the button for mobile view
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              Write Blog
            </a>
          </li>
        </ul>
        {/* This is the main "Write Blog" button for desktop view */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd107lNGDM35NqvolP3u7MU0jeeVlzxb_5Wa0PIYuKA5BAyQg/viewform?usp=header"
          className="dynamic-border-button" // This is the button for desktop view
          target="_blank"
          rel="noopener noreferrer"
        >
          Write Blog
        </a>
      </div>
    </nav>
  );
};

export default Navbar;