import React from 'react';
import BlogCard from './BlogCard';
import '../styles/BlogsSection.css';
import blogImg1 from '../assets/blog1.jpg';
import blogImg2 from '../assets/blog2.jpg';
import blogImg3 from '../assets/blog3.jpg';

const blogs = [
  {
    id: 1,
    title: 'Exploring the Alps',
    author: 'Aman Kumar',
    shortDesc: 'Discover the beautiful landscapes and cozy towns of the Alps.',
    image: blogImg1,
    content: 'Full content for Exploring the Alps blog...'
  },
  {
    id: 2,
    title: 'Beaches of Bali',
    author: 'Sneha Sinha',
    shortDesc: 'Relax in the sun and surf of Bali’s tropical paradise.',
    image: blogImg2,
    content: 'Full content for Beaches of Bali blog...'
  },
  {
    id: 3,
    title: 'Tokyo Nightlife',
    author: 'Rahul Mehra',
    shortDesc: 'Dive into the futuristic vibes of Tokyo after dark.',
    image: blogImg3,
    content: 'Full content for Tokyo Nightlife blog...'
  },

];

const BlogsSection = () => {
  const openBlog = (blog) => {
    // Save blog to localStorage and navigate
    localStorage.setItem('selectedBlog', JSON.stringify(blog));
    window.location.href = '/blog-details.html'; // We'll create this
  };

  return (
    <section id="blogs" className="blogs-section">
      <h2>Recent Blogs</h2>
      <div className="blogs-grid">
        {blogs.map(blog => (
          <BlogCard key={blog.id} {...blog} onClick={() => openBlog(blog)} />
        ))}
      </div>
    </section>
  );
};

export default BlogsSection;
