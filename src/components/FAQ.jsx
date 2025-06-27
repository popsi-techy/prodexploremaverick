import React, { useState } from 'react';
import '../styles/FAQ.css';

const faqs = [
  {
    question: 'How do I write a blog?',
    answer: 'Click on the "Write Blog" button in the navbar or hero section. It will take you to a Google Form where you can submit your blog details.'
  },
  {
    question: 'Is there any approval process for blogs?',
    answer: 'Yes, blogs submitted through the form are reviewed manually before being published on the website.'
  },
  {
    question: 'Can I update or delete my blog after submission?',
    answer: 'Currently, you will need to contact the site admin to make changes or remove a blog post.'
  },
  {
    question: 'What type of content is allowed?',
    answer: 'Travel stories, guides, personal experiences, or destination reviews are encouraged. Avoid promotional or irrelevant content.'
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section id="faqs" className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
