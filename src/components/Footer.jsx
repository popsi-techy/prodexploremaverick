// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* 🧭 Brand */}
        <div className="footer-brand">
          <h2>Wander Lust</h2>
          <p>Explore the world, one blog at a time.</p>
        </div>

        {/* 🔗 Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="#blogs">Blogs</a>
          <a href="#faqs">FAQs</a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd107lNGDM35NqvolP3u7MU0jeeVlzxb_5Wa0PIYuKA5BAyQg/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
          >
            Write Blog
          </a>
        </div>

        {/* 📬 Contact / Credits */}
        <div className="footer-contact">
          <h4>Connect</h4>
          <p>Email: wanderlust@travel.com</p>
          <p>Made with ❤️ by Aman</p>
          <p>&copy; {new Date().getFullYear()} Wander Lust</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
