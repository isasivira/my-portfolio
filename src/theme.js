const theme = {
  colors: {
    primary: '#FFA5C0',         // Softer pink (main color)
    secondary: '#FFE2E9',       // Even lighter pink
    accent: '#FFB8D0',          // Soft medium pink
    background: '#FFF9FB',      // Super soft pink background
    text: '#7C5C63',           // Soft mauve for text
    textLight: '#9B7B82',      // Lighter mauve
    white: '#FFFFFF',
    cardBg: '#FFFFFF',
    shadow: 'rgba(255, 182, 193, 0.15)', // Softer pink shadow
    badge: {
      bg: '#FFF0F5',           // Super light pink for badges
      text: '#FF8FAB'          // Cute pink for badge text
    },
    button: {
      primary: '#FFA5C0',
      secondary: '#FFE2E9',
      danger: '#FFB8D0'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FFA5C0 0%, #FFE2E9 100%)',
      secondary: 'linear-gradient(135deg, #FFE2E9 0%, #FFF9FB 100%)',
      card: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9FB 100%)'
    },
    decorative: {
      hearts: '#FFD1DC',       // Light pink for decorative elements
      stars: '#FFE8F0',        // Very light pink for stars
      dots: '#FFC0CB'          // Classic pink for dots
    }
  },
  shadows: {
    small: '0 2px 8px rgba(255, 182, 193, 0.15)',
    medium: '0 4px 12px rgba(255, 182, 193, 0.2)',
    large: '0 8px 20px rgba(255, 182, 193, 0.25)'
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '20px',
    circle: '50%'
  },
  animation: {
    bounce: 'bounce 0.6s infinite',
    float: 'float 3s ease-in-out infinite',
    sparkle: 'sparkle 1.5s ease-in-out infinite'
  }
};

export default theme; 