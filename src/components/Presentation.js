import React from 'react';
import theme from '../theme';
import './Presentation.css';

const Presentation = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.decorativeStars}>✨</div>
        <h1 style={styles.title}>Welcome to My Portfolio</h1>
        <p style={styles.subtitle}>Showcasing My Creative Work</p>
        <div style={styles.decorativeHearts}>♡</div>
      </header>

      <section className="presentation-section" style={styles.section}>
        <div style={styles.content}>
          <div style={styles.sectionIcon}>🌸</div>
          <h2 style={styles.sectionTitle}>About Me</h2>
          <p style={styles.text}>
            I'm a passionate developer dedicated to creating beautiful and functional applications.
            My portfolio showcases various projects across different platforms and technologies.
          </p>
          <div style={styles.decorativeDots}></div>
        </div>
      </section>

      <section className="presentation-section" style={styles.section}>
        <div style={styles.content}>
          <div style={styles.sectionIcon}>✨</div>
          <h2 style={styles.sectionTitle}>My Work</h2>
          <p style={styles.text}>
            Browse through my collection of projects to see my skills and experience in action.
            Each project demonstrates my commitment to quality and attention to detail.
          </p>
          <div style={styles.decorativeDots}></div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: theme.colors.background,
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      minHeight: 'calc(100vh - 56px)'
    }
  },
  header: {
    textAlign: 'center',
    padding: '80px 20px',
    background: theme.colors.gradients.primary,
    color: theme.colors.white,
    position: 'relative',
    '@media (max-width: 768px)': {
      padding: '60px 16px'
    }
  },
  title: {
    fontSize: '3.5rem',
    marginBottom: '16px',
    fontWeight: '700',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    animation: theme.animation.float,
    '@media (max-width: 768px)': {
      fontSize: '2.5rem',
      marginBottom: '12px'
    }
  },
  subtitle: {
    fontSize: '1.5rem',
    color: theme.colors.white,
    fontWeight: '300',
    opacity: 0.9,
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      fontSize: '1.25rem',
      marginBottom: '16px'
    }
  },
  section: {
    padding: '60px 20px',
    position: 'relative',
    '@media (max-width: 768px)': {
      padding: '40px 16px'
    }
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px',
    borderRadius: theme.borderRadius.large,
    background: theme.colors.gradients.card,
    boxShadow: theme.shadows.medium,
    position: 'relative',
    transition: 'transform 0.3s ease-in-out',
    '@media (max-width: 768px)': {
      padding: '24px',
      borderRadius: theme.borderRadius.medium
    },
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows.large
    }
  },
  sectionIcon: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '20px',
    animation: theme.animation.bounce,
    '@media (max-width: 768px)': {
      fontSize: '1.75rem',
      marginBottom: '16px'
    }
  },
  sectionTitle: {
    fontSize: '2.2rem',
    color: theme.colors.primary,
    marginBottom: '24px',
    textAlign: 'center',
    position: 'relative',
    '@media (max-width: 768px)': {
      fontSize: '1.75rem',
      marginBottom: '20px'
    },
    '&:after': {
      content: '""',
      display: 'block',
      width: '60px',
      height: '3px',
      background: theme.colors.gradients.primary,
      margin: '10px auto 0',
      borderRadius: theme.borderRadius.small,
      '@media (max-width: 768px)': {
        width: '40px',
        margin: '8px auto 0'
      }
    }
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: theme.colors.text,
    textAlign: 'center',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      lineHeight: '1.6'
    }
  },
  decorativeStars: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '24px',
    animation: theme.animation.sparkle,
    '@media (max-width: 768px)': {
      top: '16px',
      right: '16px',
      fontSize: '20px'
    }
  },
  decorativeHearts: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    fontSize: '24px',
    color: theme.colors.decorative.hearts,
    animation: theme.animation.float,
    '@media (max-width: 768px)': {
      bottom: '16px',
      left: '16px',
      fontSize: '20px'
    }
  },
  decorativeDots: {
    position: 'absolute',
    bottom: '-10px',
    right: '-10px',
    width: '50px',
    height: '50px',
    background: `radial-gradient(circle, ${theme.colors.decorative.dots} 20%, transparent 20%) 0 0,
                radial-gradient(circle, ${theme.colors.decorative.dots} 20%, transparent 20%) 10px 10px`,
    backgroundSize: '20px 20px',
    opacity: 0.2,
    '@media (max-width: 768px)': {
      width: '40px',
      height: '40px',
      backgroundSize: '16px 16px'
    }
  }
};

export default Presentation; 