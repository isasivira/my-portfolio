const theme = {
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1440px'
  },
  fonts: {
    main: '"Inter", sans-serif',
    heading: '"Inter", sans-serif'
  },
  colors: {
    primary: '#FF6384',         // Muted Pink for primary actions
    primaryLight: '#FFE8F0',    // Very light, soft pink for backgrounds/highlights
    primaryDark: '#8B003C',     // Even darker shade for stronger accent and better contrast
    secondary: '#FFD1DC',       // Soft, pastel pink (already good)
    accent: '#FFC0CB',          // Even lighter pink for subtle accents
    background: '#FDF8F0',      // Creamy off-white for main background
    cardBg: '#FFFEFC',          // Very subtle cream for card backgrounds, to aid contrast
    text: '#222222',            // Even darker gray for primary text for maximum contrast
    textLight: '#4A4A4A',       // Darker medium gray for secondary text for better contrast
    textSubtle: '#757575',      // Darker subtle text for improved visibility
    border: '#F0E0D0',          // Soft, creamy border color
    error: '#D32F2F',           // Consistent error color
    success: '#388E3C',         // Consistent success color
    white: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.04)', // Very soft, light shadow
    badge: {
      bg: '#FFE8F0',           // Match primaryLight
      text: '#E91E63'          // Match primaryDark for good contrast
    },
    button: {
      primary: '#FF6384',
      secondary: '#FFE8F0',
      danger: '#D32F2F'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FF6384 0%, #FFC0CB 100%)', // Softer gradient
      secondary: 'linear-gradient(135deg, #FDF8F0 0%, #FFFFFF 100%)',
      card: 'linear-gradient(135deg, #FFFEFC 0%, #FDFDFB 100%)' // Subtle gradient for card
    },
    decorative: {
      hearts: '#FFD1DC',
      stars: '#FFE8F0',
      dots: '#FFC0CB',
      cloud: '#FCE4EC' // New color for cloud-like elements
    }
  },
  shadows: {
    small: '0px 2px 5px rgba(0, 0, 0, 0.03)', // Very soft small shadow
    medium: '0px 6px 15px rgba(0, 0, 0, 0.05)', // Soft medium shadow
    large: '0px 12px 40px rgba(0, 0, 0, 0.08)' // Soft large shadow
  },
  borderRadius: {
    small: '8px',
    medium: '16px',
    large: '24px', // Significantly more rounded
    xl: '36px', // Even more rounded for cards/sections
    pill: '999px', // For pill-like buttons/badges
    cloud: '50px 50px 0 0' // Specific for cloud-like shapes (top corners)
  },
  animation: {
    bounce: 'bounce 0.8s infinite ease-in-out',
    float: 'float 3s ease-in-out infinite',
    sparkle: 'sparkle 1.5s ease-in-out infinite',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)' // Smoother, more organic transition
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px'
  }
};

export default theme; 