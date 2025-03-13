import React from 'react';
import theme from '../theme';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  fullWidth = false,
  type = 'button'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme.colors.button.secondary,
          color: theme.colors.text,
          ':hover': {
            backgroundColor: 'rgba(255, 182, 193, 0.2)'
          }
        };
      case 'danger':
        return {
          backgroundColor: theme.colors.button.danger,
          color: '#ff6347',
          ':hover': {
            backgroundColor: 'rgba(255, 99, 71, 0.2)'
          }
        };
      default:
        return {
          backgroundColor: theme.colors.button.primary,
          color: theme.colors.white,
          ':hover': {
            backgroundColor: theme.colors.accent
          }
        };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.button,
        ...getVariantStyles(),
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        '@media (max-width: 768px)': {
          padding: '8px 16px',
          fontSize: '14px'
        }
      }}
    >
      {children}
    </button>
  );
};

const styles = {
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: theme.borderRadius.medium,
    fontSize: '16px',
    fontWeight: '500',
    border: 'none',
    transition: 'all 0.3s ease-in-out',
    boxShadow: theme.shadows.small,
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.medium
    },
    ':active': {
      transform: 'translateY(0)',
      boxShadow: theme.shadows.small
    },
    ':focus': {
      outline: 'none',
      boxShadow: `0 0 0 3px ${theme.colors.primary}40`
    }
  }
};

export default Button; 