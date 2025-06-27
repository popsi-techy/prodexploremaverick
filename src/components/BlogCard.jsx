import React from 'react';
import '../styles/BlogCard.css';

const BlogCard = ({ title, image, author, shortDesc, onClick }) => {
  return (
    <div className="blog-card" onClick={onClick}>
      <img src={image} alt={title} className="blog-image" />
      <div className="blog-content">
        <h3>{title}</h3>
        <p className="author">By {author}</p>
        <p className="desc">{shortDesc}</p>
      </div>
    </div>
  );
};

export default BlogCard;
