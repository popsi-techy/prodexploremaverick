import React from 'react';
import '../styles/FeaturedBlog.css';
import croatiaImg from '../assets/croatia.jpg'; // Ensure this path is correct

const FeaturedBlog = () => {
  return (
    <section className="featured-wrapper">
      <div className="featured-blog">
        <div className="featured-content">
          <h2>Explore Croatia</h2>
          <p className="author">By Aman Kumar </p>
          <p>
            Discover the stunning beauty of Croatia, from streets of Dubrovnik
            to the crystal-clear waters. A perfect mix of culture and coastline.
          </p>

          {/* 🔖 Tags Section */}
          <div className="blog-tags">
            <span className="tag">#croatia</span>
            <span className="tag">#adventure</span>
            <span className="tag">#travel</span>
            <span className="tag">#beachlife</span>
          </div>

          <a
            href="/blogs/explore-croatia.html"
            className="read-more-btn"
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
