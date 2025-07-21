// src/components/HeroSection.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, Camera, Compass, Mountain, Waves, Star, Globe, Send, Sparkles, Calendar, Users, DollarSign } from 'lucide-react';
import '../styles/HeroSection.css'; // Import HeroSection CSS from styles directory

const floatingIcons = [
  { Icon: Plane, delay: 0, x: 10, y: 20 },
  { Icon: MapPin, delay: 0.5, x: 80, y: 15 },
  { Icon: Camera, delay: 1, x: 15, y: 70 },
  { Icon: Compass, delay: 1.5, x: 85, y: 60 },
  { Icon: Mountain, delay: 2, x: 5, y: 45 },
  { Icon: Waves, delay: 2.5, x: 90, y: 30 },
  { Icon: Star, delay: 3, x: 25, y: 85 },
  { Icon: Globe, delay: 3.5, x: 75, y: 80 },
];

// Suggested questions for AI Chat Interface
const suggestedQuestions = [
  { icon: MapPin, text: "Where should I travel for adventure?", className: "question-slate-gradient" },
  { icon: Calendar, text: "Plan a 7-day itinerary for Japan", className: "question-gray-gradient" },
];

// Initial facts/tips for the AI Chat Interface - Now only one fact
const initialFacts = [
  { id: 'fact-1', text: "Welcome to Wanderlust! Did you know over 80% of all travel is for leisure?", isUser: false },
];

// Nested AIChatInterface component
function AIChatInterface() {
  const [messages, setMessages] = useState(initialFacts);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesAreaRef = useRef(null); // Reference to the messages container

  const GEMINI_API_BASE_URL = import.meta.env.VITE_GEMINI_API_BASE_URL || 'http://localhost:3001';

  const scrollToBottom = () => {
    if (messagesAreaRef.current) {
        messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) {
      setError('Please enter a question.');
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setError(null);

    setTimeout(scrollToBottom, 0);


    try {
      const response = await fetch(`${GEMINI_API_BASE_URL}/ask-gemini`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ question: text }),
       });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);

    } catch (err) {
      console.error("Error fetching Gemini answer:", err);
      setError('Failed to get an answer. Please try again.');
      setMessages(prev => prev.filter(msg => msg !== userMessage));
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = (questionText) => {
    handleSendMessage(questionText);
  };

  return (
    <motion.div
      className="ai-chat-interface-wrapper"
      layout
    >
      {/* Chat Container - Removed whileHover and transition */}
      <motion.div
        className="chat-container"
      >
        {/* Header */}
        <motion.div
          className="chat-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="header-icon-container"
            animate={{
              filter: [
                "hue-rotate(0deg) brightness(1)",
                "hue-rotate(30deg) brightness(1.1)",
                "hue-rotate(0deg) brightness(1)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <Sparkles className="text-slate-300" size={32} />
            </motion.div>
            <h2 className="header-title">Travel AI Assistant</h2>
            <motion.div
              animate={{
                rotate: -360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, delay: 1 }
              }}
            >
              <Sparkles className="text-slate-300" size={32} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Messages Area - Added ref here */}
        <div className="messages-area" ref={messagesAreaRef}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message-row ${message.isUser ? 'user-message' : 'bot-message'}`}
                initial={{ opacity: 0, x: message.isUser ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: message.isUser ? 50 : -50 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <div className="message-bubble">
                  <p>{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>


        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="typing-indicator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="typing-bubble">
                <div className="typing-dots">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="typing-dot"
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Display Error Message */}
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

        {/* Suggested Questions (only shown if messages are initial facts and not actively typing) */}
        {messages === initialFacts && !isTyping && (
          <motion.div
            className="suggested-questions-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {suggestedQuestions.map((question, index) => (
              <motion.button
                key={index}
                className={`suggested-question-button ${question.className}`}
                onClick={() => handleSuggestedQuestion(question.text)}
                whileHover={{
                  y: -2,
                  boxShadow: "0 10px 30px rgba(100,116,139,0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="suggested-question-content">
                  <question.icon size={20} className="suggested-question-icon" />
                  <span>{question.text}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Input Area */}
        <motion.div
          className="input-area"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about travel..."
              className="chat-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(inputValue);
                }
              }}
            />
          </div>
          <button
            onClick={() => handleSendMessage(inputValue)}
            className="send-button"
            disabled={!inputValue.trim() || isTyping}
          >
            <Send size={20} />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}


// HeroSection component remains
export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;

      setMousePosition({ x, y });
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div id="hero-section" className="hero-container">
      {/* Animated Background Gradient */}
      <motion.div
        className="animated-background-gradient"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #374151 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, #475569 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, #1e293b 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, #374151 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Metallic Grid Pattern */}
      <div className="metallic-grid-pattern" />

      {/* Floating Travel Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="floating-icon"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`,
          }}
        >
          <Icon size={48} />
        </motion.div>
      ))}

      {/* Parallax Elements */}
      <motion.div
        className="parallax-elements"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`
        }}
      >
        <div className="parallax-blob parallax-blob-1" />
        <div className="parallax-blob parallax-blob-2" />
        <div className="parallax-blob parallax-blob-3" />
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Title */}
        <motion.div
          className="hero-title-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="fancy-gradient-text"
          >
            WANDERLUST
          </motion.h1>
          {/* Subtitle removed from here */}
        </motion.div>

        {/* AI Chat Interface (Nested) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <AIChatInterface />
        </motion.div>

        {/* Floating CTA Elements */}
        <motion.div
          className="floating-cta"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="cta-content">
            <motion.div
              className="cta-dot"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                boxShadow: [
                  "0 0 0 rgba(148,163,184,0.5)",
                  "0 0 20px rgba(148,163,184,0.8)",
                  "0 0 0 rgba(148,163,184,0.5)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="cta-text">Scroll to explore destinations</span>
            <motion.div
              className="cta-dot"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                boxShadow: [
                  "0 0 0 rgba(148,163,184,0.5)",
                  "0 0 20px rgba(148,163,184,0.8)",
                  "0 0 0 rgba(148,163,184,0.5)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}