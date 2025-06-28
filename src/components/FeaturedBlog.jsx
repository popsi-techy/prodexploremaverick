// FeaturedBlog.jsx
import React from 'react';
import '../styles/FeaturedBlog.css';
import croatiaImg from '../assets/blog1.jpg';

const FeaturedBlog = () => {
  return (
    <section className="featured-wrapper">
      <div className="featured-blog">
        <div className="featured-content">
          <h2>Explore Croatia</h2>
          <p>
            Discover the stunning beauty of Croatia — from the historic streets of Dubrovnik
            to the crystal-clear waters of the Adriatic Sea. A perfect mix of culture and coastline.
          </p>
          <a
            href="/blogs/explore-croatia.html"
            className="read-more-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More →
          </a>
        </div>

        <div className="featured-image">
          <img src={croatiaImg} alt="Explore Croatia" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;