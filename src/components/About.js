import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Me</h1>
      <p className="about-description">
        Hello! I'm a passionate developer with a strong interest in creating beautiful and functional web applications.
        I specialize in React and enjoy building interactive user experiences. My journey in development started with a curiosity for how things work, and it has since evolved into a full-fledged passion for coding and problem-solving.
      </p>
      <p className="about-description">
        Outside of coding, I enjoy learning about new technologies and contributing to open-source projects. I believe in continuous learning and always strive to improve my skills and knowledge.
      </p>
      <div className="about-skills">
        <h2 className="skills-title">Skills</h2>
        <ul className="skills-list">
          <li className="skill-item">React</li>
          <li className="skill-item">JavaScript (ES6+)</li>
          <li className="skill-item">HTML5 & CSS3</li>
          <li className="skill-item">Node.js</li>
          <li className="skill-item">Express.js</li>
          <li className="skill-item">MongoDB</li>
          <li className="skill-item">SQL</li>
          <li className="skill-item">Git & GitHub</li>
          <li className="skill-item">Responsive Design</li>
        </ul>
      </div>
      <p className="about-contact">
        Feel free to connect with me through my projects page or any of my social media links.
      </p>
    </div>
  );
};

export default About; 