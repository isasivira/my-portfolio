import React from 'react';
import './Presentation.css';

const Presentation = () => {
  return (
    <div className="presentation-container">
      <h1 className="presentation-title">Welcome to My Portfolio</h1>
      <p className="presentation-subtitle">Showcasing My Creative Work</p>
      <p className="presentation-description">
            I'm a passionate developer dedicated to creating beautiful and functional applications.
            My portfolio showcases various projects across different platforms and technologies.
            Browse through my collection of projects to see my skills and experience in action.
            Each project demonstrates my commitment to quality and attention to detail.
          </p>
      <button className="presentation-cta" onClick={() => window.location.href = '/projects'}>
        View My Projects
      </button>
    </div>
  );
};

export default Presentation; 