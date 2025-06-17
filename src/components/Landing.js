import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Landing.css';

const Landing = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      text.classList.add('visible');
    }
  }, []);

  return (
    <div className="landing-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="landing-content"
      >
        <h1 className="main-title">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="highlight"
          >
            My Portfolio
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="subtitle"
        >
          Explore • Create • Innovate
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Landing; 