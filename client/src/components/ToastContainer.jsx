import React from 'react';
import { useToast } from '../context/ToastContext';

const ToastContainer = () => {
  const { toasts } = useToast();

  const getIcon = (type) => {
    switch(type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'success': return 'var(--accent-green)';
      case 'error': return 'var(--accent-red)';
      default: return 'var(--accent-blue)';
    }
  };

  return (
    <div className="toast-container" id="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span 
            className="material-icons-round" 
            style={{ color: getColor(toast.type) }}
          >
            {getIcon(toast.type)}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
