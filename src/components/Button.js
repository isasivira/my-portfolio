import React from 'react';
import theme from '../theme';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: theme.colors.gradients.primary,
          color: theme.colors.white,
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: `${theme.shadows.medium}, 0 0 10px ${theme.colors.primary}40`
          }
        };
      case 'secondary':
        return {
          background: theme.colors.gradients.secondary,
          color: theme.colors.primary,
          border: `2px solid ${theme.colors.primary}20`,
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: `${theme.shadows.medium}, 0 0 10px ${theme.colors.secondary}40`
          }
        };
      case 'danger':
        return {
          background: theme.colors.button.danger,
          color: theme.colors.white,
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: `${theme.shadows.medium}, 0 0 10px ${theme.colors.button.danger}40`
          }
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { 
          padding: '8px 16px', 
          fontSize: '0.875rem',
          borderRadius: theme.borderRadius.small
        };
      case 'large':
        return { 
          padding: '14px 28px', 
          fontSize: '1.125rem',
          borderRadius: theme.borderRadius.large
        };
      default:
        return { 
          padding: '10px 20px', 
          fontSize: '1rem',
          borderRadius: theme.borderRadius.medium
        };
    }
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles.button,
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...props.style,
      }}
      {...props}
    >
      <span style={styles.content}>
        {variant === 'primary' && <span style={styles.sparkle}>✨</span>}
        {children}
      </span>
    </button>
  );
};

const styles = {
  button: {
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: theme.shadows.small,
    position: 'relative',
    overflow: 'hidden',
    '&:active': {
      transform: 'translateY(0) scale(0.98)',
      boxShadow: theme.shadows.small
    },
    '&:focus': {
      outline: 'none',
      boxShadow: `${theme.shadows.medium}, 0 0 0 2px ${theme.colors.primary}30`
    }
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  sparkle: {
    fontSize: '0.8em',
    animation: theme.animation.sparkle
  }
};

export default Button; 