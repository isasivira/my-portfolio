import React from 'react';
// import theme from '../theme'; // Remove theme import as styles are now in CSS
import './ConfirmDialog.css'; // Import the new CSS file

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog-content">
        <div className="dialog-icon">⚠️</div>
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button
            onClick={onClose}
            className="dialog-button dialog-button-cancel"
          >
            <span className="dialog-button-icon">❌</span>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="dialog-button dialog-button-confirm"
          >
            <span className="dialog-button-icon">🗑️</span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 