import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Wanderlust</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#blogs">Blogs</a></li>
          <li><a href="#faqs">FAQs</a></li>
        </ul>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd107lNGDM35NqvolP3u7MU0jeeVlzxb_5Wa0PIYuKA5BAyQg/viewform?usp=header"
          className="write-blog-button"
          target="_blank"
        >
          Write Blog
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
