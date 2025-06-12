import React from 'react';
// import theme from '../theme'; // Remove theme import as styles are now in CSS
import './Button.css'; // Import the new CSS file

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  fullWidth = false,
  type = 'button'
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'button-secondary';
      case 'danger':
        return 'button-danger';
      default:
        return 'button-primary';
    }
  };

  const buttonClasses = `button ${getVariantClass()} ${fullWidth ? 'button-full-width' : ''}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button; 