import React, { useState } from 'react';
import '../styles/Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = 'https://script.google.com/macros/s/AKfycbydSWYYwafDaIano1WpXA1yTlzQJ_rQzArx2hVtXJMd_UlgDfstQTGSGI84hMwSzudH/exec'; // Replace this!

    const formData = new FormData();
    formData.append('email', email);

    try {
      await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-box">
        <h2>📬 Join Our Newsletter</h2>
        <p>Get travel tips, blog updates & destination guides in your inbox.</p>

        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>

        {submitted && <p className="success-msg">✅ Subscribed! Check your inbox soon.</p>}
      </div>
    </section>
  );
};

export default Newsletter;
