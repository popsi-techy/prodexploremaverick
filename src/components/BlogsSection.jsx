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
    shortDesc: 'Discover the beautiful landscapes and cozy towns of the Alps, explore mountains.',
    image: blogImg1,
    content: 'The Alps are one of the most iconic and breathtaking mountain ranges in the world, stretching across eight countries in Europe, including France, Switzerland, Italy, and Austria. Known for their snow-capped peaks, pristine alpine lakes, and charming mountain villages, the Alps attract millions of tourists and adventurers each year. Whether it is skiing in winter, hiking in summer, or simply enjoying the panoramic views, the region offers a perfect blend of natural beauty and cultural richness. The Alps are not only a hub for outdoor activities but also home to diverse wildlife and centuries-old traditions, making them a must-visit destination for nature lovers and explorers alike.'
  },
  {
    id: 2,
    title: 'Beaches of Bali',
    author: 'Sneha Sinha',
    shortDesc: 'Relax in the sun and surf of Bali’s tropical paradise, explore stunning beaches.',
    image: blogImg2,
    content: 'Bali, often referred to as the "Island of the Gods," is a tropical paradise in Indonesia known for its stunning beaches, lush rice terraces, vibrant culture, and spiritual atmosphere. Whether you are seeking adventure through surfing and hiking, relaxation in luxurious beach resorts, or cultural immersion in traditional temples and ceremonies, Bali offers something for every traveler. Its warm hospitality, delicious cuisine, and breathtaking landscapes make it a dream destination for explorers and peace-seekers alike.'
  },
  {
    id: 3,
    title: 'Tokyo Nightlife',
    author: 'Rahul Mehra',
    shortDesc: 'Dive into the futuristic vibes of Tokyo after dark, best city to travel.',
    image: blogImg3,
    content: 'Tokyo, the bustling capital of Japan, is a mesmerizing blend of tradition and modernity. From ancient temples like Senso-ji in Asakusa to the neon-lit skyscrapers of Shibuya and Shinjuku, the city offers a unique cultural contrast. Known for its efficient public transport, cutting-edge technology, and world-renowned cuisine—from sushi to ramen—Tokyo is a paradise for travelers. Whether you are exploring cherry blossom-lined parks, shopping in Harajuku, or experiencing the tranquility of a tea ceremony, Tokyo seamlessly fuses the old with the new in a way few cities can.'
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
