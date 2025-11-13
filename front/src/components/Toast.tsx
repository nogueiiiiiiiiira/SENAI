import React from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const getToastClass = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-danger';
      case 'warning':
        return 'bg-warning';
      case 'info':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '';
    }
  };

  return (
    <div
      className={`toast show text-white ${getToastClass()}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-body d-flex align-items-center">
        <span className="me-2">{getIcon()}</span>
        <span className="flex-grow-1">{toast.message}</span>
        <button
          type="button"
          className="btn-close btn-close-white ms-2"
          onClick={() => onClose(toast.id)}
          aria-label="Fechar"
        />
      </div>
    </div>
  );
};

export default Toast;
