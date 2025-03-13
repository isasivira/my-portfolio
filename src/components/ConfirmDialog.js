import React from 'react';
import theme from '../theme';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <div style={styles.icon}>⚠️</div>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.message}>{message}</p>
        <div style={styles.actions}>
          <button
            onClick={onClose}
            style={styles.cancelButton}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span style={styles.buttonIcon}>❌</span>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={styles.confirmButton}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span style={styles.buttonIcon}>🗑️</span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)'
  },
  dialog: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '24px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(255, 182, 193, 0.2)',
    border: '1px solid rgba(255, 182, 193, 0.3)',
    animation: 'slideIn 0.3s ease-out'
  },
  icon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  title: {
    margin: '0 0 12px 0',
    fontSize: '20px',
    color: theme.colors.text,
    fontWeight: '600'
  },
  message: {
    margin: '0 0 24px 0',
    color: theme.colors.textLight,
    fontSize: '16px',
    lineHeight: '1.5'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center'
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
    color: '#ff6347',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 2px 8px rgba(255, 99, 71, 0.2)'
  },
  confirmButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 99, 71, 0.2)',
    color: '#ff6347',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 2px 8px rgba(255, 99, 71, 0.3)'
  },
  buttonIcon: {
    fontSize: '16px',
    transition: 'transform 0.3s ease-in-out',
    display: 'inline-block'
  }
};

// Add the keyframe animation to the document
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

export default ConfirmDialog; 