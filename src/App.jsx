import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BlogsSection from './components/BlogsSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FeaturedBlog from './components/FeaturedBlog';
import Newsletter from './components/Newsletter';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedBlog />
      <BlogsSection />
      <FAQ />
      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
